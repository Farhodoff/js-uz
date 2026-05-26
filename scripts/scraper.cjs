const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

// Decode HTML entities commonly found in Telegram preview markup
function decodeHTMLEntities(str) {
  if (!str) return "";
  return str
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;/g, "'")
    .replace(/&#33;/g, '!')
    .replace(/&#036;/g, '$')
    .replace(/&#x2F;/g, '/')
    .replace(/&nbsp;/g, ' ');
}

// Register global crash prevention handlers for unhandled promise rejections and uncaught errors
process.on("uncaughtException", (err) => {
  console.error("Orqa fonda kutilmagan xatolik (Uncaught Exception):", err.message);
});

process.on("unhandledRejection", (reason) => {
  console.error("Orqa fonda kutilmagan xatolik (Unhandled Rejection):", reason?.message || reason);
});

// Execute JS code inside a VM sandbox to capture console.log output
function runCodeInSandbox(code) {
  return new Promise((resolve) => {
    let logs = [];
    let activeTimers = 0;
    let done = false;
    
    // Safety overall timeout of 1200ms
    const overallTimeoutId = setTimeout(() => {
      onDone();
    }, 1200);

    const onDone = () => {
      if (done) return;
      done = true;
      clearTimeout(overallTimeoutId);
      resolve({ logs });
    };

    const logHandler = (...args) => {
      logs.push(args.map(arg => {
        if (arg === null) return "null";
        if (arg === undefined) return "undefined";
        if (typeof arg === 'object') {
          try { return JSON.stringify(arg); } catch(e) { return String(arg); }
        }
        return String(arg);
      }).join(' '));
    };

    const sandboxConsole = new Proxy({}, {
      get: (target, prop) => {
        if (typeof prop === "string" && ["log", "error", "warn", "info", "debug"].includes(prop)) {
          return logHandler;
        }
        return () => {};
      }
    });

    const wrappedSetTimeout = (fn, delay, ...args) => {
      activeTimers++;
      return setTimeout(() => {
        try {
          if (typeof fn === 'function') fn(...args);
        } catch (err) {
          logHandler(`Error: ${err.message}`);
        } finally {
          activeTimers--;
          if (activeTimers === 0) {
            setImmediate(() => {
              if (activeTimers === 0) onDone();
            });
          }
        }
      }, delay);
    };

    const wrappedClearTimeout = (id) => {
      clearTimeout(id);
      activeTimers = Math.max(0, activeTimers - 1);
      if (activeTimers === 0) {
        setImmediate(() => {
          if (activeTimers === 0) onDone();
        });
      }
    };

    const sandbox = {
      console: sandboxConsole,
      setTimeout: wrappedSetTimeout,
      clearTimeout: wrappedClearTimeout,
      setInterval: setInterval,
      clearInterval: clearInterval,
      setImmediate: (fn, ...args) => {
        activeTimers++;
        return setImmediate(() => {
          try {
            if (typeof fn === 'function') fn(...args);
          } catch (err) {
            logHandler(`Error: ${err.message}`);
          } finally {
            activeTimers--;
            if (activeTimers === 0) onDone();
          }
        });
      },
      clearImmediate: clearImmediate,
      queueMicrotask: (fn) => {
        queueMicrotask(() => {
          try {
            if (typeof fn === 'function') fn();
          } catch (err) {
            logHandler(`Error: ${err.message}`);
          }
        });
      },
      Promise: Promise,
      Object: Object,
      WeakMap: WeakMap,
      Map: Map,
      Set: Set,
      Array: Array,
      String: String,
      Number: Number,
      Boolean: Boolean,
      RegExp: RegExp,
      Date: Date,
      Error: Error,
      TypeError: TypeError,
      RangeError: RangeError,
      ReferenceError: ReferenceError,
      SyntaxError: SyntaxError,
      JSON: JSON,
      Math: Math,
      Symbol: Symbol,
      Reflect: Reflect,
      Proxy: Proxy,
      Intl: Intl
    };
    sandbox.global = sandbox;
    sandbox.globalThis = sandbox;

    try {
      vm.createContext(sandbox);
      vm.runInContext(code, sandbox, { timeout: 1000 });
      
      // Check immediately after microtasks if we can resolve
      setImmediate(() => {
        if (activeTimers === 0) {
          onDone();
        }
      });
    } catch (err) {
      resolve({ error: err.message, logs });
    }
  });
}

// Normalize strings for comparison
function normalizeString(str) {
  if (!str) return "";
  // Strip spaces, single quotes, double quotes, and make lowercase
  return str.toLowerCase().replace(/['"\s]/g, "");
}

async function scrapePage(url) {
  console.log(`Scraping URL: ${url}`);
  try {
    const response = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      }
    });
    
    const $ = cheerio.load(response.data);
    const rawMessages = [];
    
    // Extract prev cursor
    const prevLink = $('link[rel="prev"]').attr("href");
    let beforeCursor = null;
    if (prevLink) {
      const match = prevLink.match(/before=(\d+)/);
      if (match) {
        beforeCursor = match[1];
      }
    }
    
    // Parse all messages on this page into a list
    $(".tgme_widget_message").each((_, element) => {
      const $msg = $(element);
      const postAttr = $msg.attr("data-post") || "";
      const postId = parseInt(postAttr.split("/")[1], 10) || null;
      
      const $codePre = $msg.find(".tgme_widget_message_text pre");
      const $poll = $msg.find(".tgme_widget_message_poll");
      
      rawMessages.push({
        id: postId,
        code: $codePre.length > 0 ? $codePre.text() : null,
        poll: $poll.length > 0 ? {
          question: $msg.find(".tgme_widget_message_poll_question").text().trim(),
          options: $msg.find(".tgme_widget_message_poll_option_text").map((_, optEl) => $(optEl).text().trim()).get()
        } : null
      });
    });
    
    const challengesFound = [];
    
    // Match code messages with subsequent sibling poll messages
    for (let i = 0; i < rawMessages.length - 1; i++) {
      const current = rawMessages[i];
      const next = rawMessages[i + 1];
      
      if (current.code && next.poll && next.id === current.id + 1) {
        let rawCode = decodeHTMLEntities(current.code);
        
        // Extract options and clean them
        const options = next.poll.options.map(opt => decodeHTMLEntities(opt));
        
        // Run code inside vm sandbox to get output logs
        const execution = await runCodeInSandbox(rawCode);
        let correctAnswer = "";
        let executionLog = "";
        
        if (execution.error) {
          correctAnswer = "TypeError"; 
          executionLog = `Error: ${execution.error}`;
        } else if (execution.logs.length > 0) {
          executionLog = execution.logs.join("\n");
          
          // Compare normalized strings to find correct answer
          const normLog = normalizeString(executionLog);
          for (const opt of options) {
            const normOpt = normalizeString(opt);
            if (normLog === normOpt || normLog.includes(normOpt) || normOpt.includes(normLog)) {
              correctAnswer = opt;
              break;
            }
          }
        }
        
        challengesFound.push({
          id: `tg-${current.id}`,
          title: next.poll.question === "What is the output?" ? `JS Challenge #${current.id}` : next.poll.question,
          difficulty: "medium",
          category: "basics",
          code: rawCode,
          options,
          correctAnswer: correctAnswer || (options.length > 0 ? options[0] : ""),
          scrapedLog: executionLog,
          scrapedAt: new Date().toISOString()
        });
      }
    }
    
    return { challenges: challengesFound, beforeCursor };
  } catch (error) {
    console.error(`Scrape error: ${error.message}`);
    return { challenges: [], beforeCursor: null };
  }
}

async function syncChallenges(limitPages = 5, startBefore = null) {
  const filePath = path.join(__dirname, "scraped_challenges.json");
  let existing = [];
  if (fs.existsSync(filePath)) {
    existing = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  }
  const existingIds = new Set(existing.map(c => c.id));

  // Find lowest ID in existing database to allow auto-jumping past the duplicates
  let lowestId = null;
  if (existing.length > 0) {
    const ids = existing.map(c => parseInt(c.id.replace("tg-", ""))).filter(id => !isNaN(id));
    if (ids.length > 0) {
      lowestId = Math.min(...ids);
    }
  }

  let currentUrl = startBefore 
    ? `https://t.me/s/javascript?before=${startBefore}`
    : "https://t.me/s/javascript";
  let allScraped = [];
  let pagesCount = 0;
  let jumped = false;
  
  while (currentUrl && pagesCount < limitPages) {
    const result = await scrapePage(currentUrl);
    
    let foundExisting = false;
    const newPageChallenges = [];
    
    for (const challenge of result.challenges) {
      if (existingIds.has(challenge.id)) {
        foundExisting = true;
      } else {
        newPageChallenges.push(challenge);
      }
    }
    
    if (newPageChallenges.length > 0) {
      allScraped = [...allScraped, ...newPageChallenges];
    }
    
    if (foundExisting) {
      // If we found existing challenges, and we haven't jumped yet, and we have a lowestId,
      // we can jump directly past our existing block to continue scraping older history!
      if (!jumped && lowestId && !startBefore) {
        console.log(`Mavjud savollarga duch keldik. Bazadagi eng eski savolga (ID: ${lowestId}) sakrab o'tilmoqda...`);
        currentUrl = `https://t.me/s/javascript?before=${lowestId}`;
        jumped = true;
        // Wait 1.5 seconds to respect rate limits
        await new Promise(res => setTimeout(res, 1500));
        continue; // Skip the rest of the loop and scrape the jumped URL
      } else {
        console.log("Mavjud (oldin olingan) savollarga yetib keldik. Skraping yakunlandi.");
        break;
      }
    }
    
    if (result.beforeCursor) {
      currentUrl = `https://t.me/s/javascript?before=${result.beforeCursor}`;
      pagesCount++;
      // Wait 1.5 seconds to respect rate limits
      await new Promise(res => setTimeout(res, 1500));
    } else {
      break;
    }
  }
  
  const mergedMap = new Map();
  existing.forEach(c => mergedMap.set(c.id, c));
  allScraped.forEach(c => mergedMap.set(c.id, c));
  
  const mergedList = Array.from(mergedMap.values());
  fs.writeFileSync(filePath, JSON.stringify(mergedList, null, 2), "utf-8");
  
  const newAdded = mergedList.length - existing.length;
  console.log(`Sync complete. Scraped ${allScraped.length} new challenges. Total saved: ${mergedList.length}`);
  return { newCount: newAdded, totalCount: mergedList.length };
}

async function syncHistory(limitPages = 5) {
  const filePath = path.join(__dirname, "scraped_challenges.json");
  let lowestId = null;
  if (fs.existsSync(filePath)) {
    const existing = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    if (existing.length > 0) {
      const ids = existing.map(c => parseInt(c.id.replace("tg-", ""))).filter(id => !isNaN(id));
      if (ids.length > 0) {
        lowestId = Math.min(...ids);
      }
    }
  }
  
  if (lowestId) {
    console.log(`Tarixiy sinxronizatsiya boshlanmoqda. Mavjud eng eski post ID: ${lowestId}. Undan oldingi postlar yuklanadi.`);
    return syncChallenges(limitPages, lowestId);
  } else {
    console.log("Mavjud savollar topilmadi. Yuklash noldan (eng oxirgi xabardan) boshlanadi.");
    return syncChallenges(limitPages);
  }
}

module.exports = { syncChallenges, syncHistory };
