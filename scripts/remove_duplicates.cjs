const fs = require("fs");
const path = require("path");

const challengesFilePath = path.join(__dirname, "../src/data/challenges.js");
const scrapedFilePath = path.join(__dirname, "scraped_challenges.json");

if (!fs.existsSync(challengesFilePath)) {
  console.error("challenges.js fayli topilmadi!");
  process.exit(1);
}

const normalizeCode = (codeStr) => {
  if (!codeStr) return "";
  return codeStr
    .replace(/\/\/.*$/gm, "") // Remove single-line comments
    .replace(/\/\*[\s\S]*?\*\//g, "") // Remove multi-line comments
    .replace(/['"`\s]/g, "") // Remove quotes and spaces
    .toLowerCase();
};

const isBotScraped = (id) => /^tg-\d+$/.test(id);

// 1. Clean src/data/challenges.js
try {
  let content = fs.readFileSync(challengesFilePath, "utf-8").trim();
  content = content.replace(/^export\s+const\s+challenges\s*=\s*/, "");
  
  if (content.endsWith(";")) {
    content = content.slice(0, -1);
  }

  const challenges = eval(`(${content})`);
  console.log(`🔍 challenges.js tahlil qilinmoqda... Birlamchi savollar: ${challenges.length} ta.`);

  // Group by normalized code
  const groups = new Map();
  challenges.forEach((c) => {
    const norm = normalizeCode(c.code);
    if (!groups.has(norm)) {
      groups.set(norm, []);
    }
    groups.get(norm).push(c);
  });

  const cleanedChallenges = [];
  let deletedCount = 0;

  for (const [normCode, list] of groups.entries()) {
    if (list.length === 1) {
      cleanedChallenges.push(list[0]);
    } else {
      let best = list[0];
      for (let i = 1; i < list.length; i++) {
        const current = list[i];
        
        const bestIsBot = isBotScraped(best.id);
        const currentIsBot = isBotScraped(current.id);

        if (bestIsBot && !currentIsBot) {
          best = current;
        } else if (!bestIsBot && currentIsBot) {
          // Keep best
        } else if (bestIsBot && currentIsBot) {
          const bestIdNum = parseInt(best.id.replace("tg-", ""), 10);
          const currentIdNum = parseInt(current.id.replace("tg-", ""), 10);
          if (currentIdNum < bestIdNum) {
            best = current;
          }
        }
      }

      cleanedChallenges.push(best);
      deletedCount += (list.length - 1);
      
      const deletedIds = list.filter(item => item !== best).map(item => item.id);
      console.log(`   O'chirildi: [${deletedIds.join(", ")}] -> Saqlab qolindi: "${best.id}" (Sarlavha: "${best.title || ''}")`);
    }
  }

  // Preserve the original order of challenges
  const originalOrder = new Map(challenges.map((c, index) => [c.id, index]));
  cleanedChallenges.sort((a, b) => originalOrder.get(a.id) - originalOrder.get(b.id));

  // Serialize back to challenges.js
  let newContent = "export const challenges = [\n";
  cleanedChallenges.forEach((c, index) => {
    const formattedCode = (c.code || "").replace(/`/g, "\\`").replace(/\$/g, "\\$");
    const escapedExplanation = (c.explanation || "").replace(/`/g, "\\`").replace(/\$/g, "\\$");
    const escapedTitle = (c.title || "").replace(/"/g, '\\"');
    const escapedCorrectAnswer = (c.correctAnswer || "").replace(/"/g, '\\"');
    
    newContent += `  {\n    id: "${c.id}",\n    title: "${escapedTitle}",\n    difficulty: "${c.difficulty || 'medium'}",\n    category: "${c.category || 'basics'}",\n    code: \`${formattedCode}\`,\n    options: ${JSON.stringify(c.options || [], null, 6)},\n    correctAnswer: "${escapedCorrectAnswer}",\n    explanation: \`${escapedExplanation}\`\n  }`;
    
    if (index < cleanedChallenges.length - 1) {
      newContent += ",\n";
    } else {
      newContent += "\n";
    }
  });
  newContent += "];\n";

  fs.writeFileSync(challengesFilePath, newContent, "utf-8");
  console.log(`✅ challenges.js tozalandi! O'chirildi: ${deletedCount} ta, Qoldi: ${cleanedChallenges.length} ta.`);

} catch (error) {
  console.error("❌ challenges.js tozalashda xatolik yuz berdi:", error.message);
}

// 2. Clean scraped_challenges.json
if (fs.existsSync(scrapedFilePath)) {
  try {
    const scrapedList = JSON.parse(fs.readFileSync(scrapedFilePath, "utf-8"));
    console.log(`\n🔍 scraped_challenges.json tahlil qilinmoqda... Birlamchi savollar: ${scrapedList.length} ta.`);
    
    const scrapedGroups = new Map();
    scrapedList.forEach((c) => {
      const norm = normalizeCode(c.code);
      if (!scrapedGroups.has(norm)) {
        scrapedGroups.set(norm, []);
      }
      scrapedGroups.get(norm).push(c);
    });
    
    const cleanedScraped = [];
    let deletedScrapedCount = 0;
    
    for (const [normCode, list] of scrapedGroups.entries()) {
      if (list.length === 1) {
        cleanedScraped.push(list[0]);
      } else {
        // Keep the one with the smallest post ID (earliest post)
        let best = list[0];
        for (let i = 1; i < list.length; i++) {
          const current = list[i];
          const bestIdNum = parseInt(best.id.replace("tg-", ""), 10);
          const currentIdNum = parseInt(current.id.replace("tg-", ""), 10);
          if (currentIdNum < bestIdNum) {
            best = current;
          }
        }
        cleanedScraped.push(best);
        deletedScrapedCount += (list.length - 1);
      }
    }
    
    fs.writeFileSync(scrapedFilePath, JSON.stringify(cleanedScraped, null, 2), "utf-8");
    console.log(`✅ scraped_challenges.json tozalandi! O'chirildi: ${deletedScrapedCount} ta, Qoldi: ${cleanedScraped.length} ta.`);
  } catch (err) {
    console.error("❌ scraped_challenges.json ni tozalashda xatolik:", err.message);
  }
}
