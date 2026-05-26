const fs = require("fs");
const path = require("path");

const challengesFilePath = path.join(__dirname, "../src/data/challenges.js");
const scrapedFilePath = path.join(__dirname, "scraped_challenges.json");

const normalizeCode = (codeStr) => {
  if (!codeStr) return "";
  return codeStr
    .replace(/\/\/.*$/gm, "") // Remove single-line comments
    .replace(/\/\*[\s\S]*?\*\//g, "") // Remove multi-line comments
    .replace(/['"`\s]/g, "") // Remove quotes and spaces
    .toLowerCase();
};

function getChallengesStats() {
  if (!fs.existsSync(challengesFilePath)) {
    return { total: 0, bot: 0, manual: 0 };
  }
  const challengesJS = fs.readFileSync(challengesFilePath, "utf-8");
  const idRegex = /id:\s*"([^"]+)"/g;
  let match;
  let total = 0;
  let bot = 0;
  let manual = 0;
  while ((match = idRegex.exec(challengesJS)) !== null) {
    total++;
    if (match[1].startsWith("tg-")) {
      bot++;
    } else {
      manual++;
    }
  }
  return { total, bot, manual };
}

function mergeChallenges() {
  if (!fs.existsSync(scrapedFilePath)) {
    throw new Error("Scraped challenges fayli topilmadi: scripts/scraped_challenges.json. Avval botda /sync buyrug'ini bering.");
  }

  const scrapedList = JSON.parse(fs.readFileSync(scrapedFilePath, "utf-8"));
  let challengesJS = fs.readFileSync(challengesFilePath, "utf-8");

  const existingIds = [];
  const idRegex = /id:\s*"([^"]+)"/g;
  let match;
  while ((match = idRegex.exec(challengesJS)) !== null) {
    existingIds.push(match[1]);
  }

  // Parse the existing challenges array to extract their normalized codes
  let challengesJSContent = challengesJS.trim().replace(/^export\s+const\s+challenges\s*=\s*/, "");
  if (challengesJSContent.endsWith(";")) {
    challengesJSContent = challengesJSContent.slice(0, -1);
  }
  let existingChallenges = [];
  try {
    existingChallenges = eval(`(${challengesJSContent})`);
  } catch (e) {
    console.error("challenges.js ni eval qilishda xatolik:", e.message);
  }

  const existingCodes = new Set(existingChallenges.map(c => normalizeCode(c.code)));

  // Filter out challenges that have duplicate IDs OR duplicate code
  const newChallenges = scrapedList.filter(c => {
    if (existingIds.includes(c.id)) return false;
    const norm = normalizeCode(c.code);
    if (existingCodes.has(norm)) return false;
    return true;
  });

  if (newChallenges.length === 0) {
    const stats = getChallengesStats();
    return {
      addedCount: 0,
      stats
    };
  }

  let newChallengesStr = "";
  newChallenges.forEach(c => {
    const uzen = `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: ${c.id.replace("tg-", "")}).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`${c.scrapedLog.trim()}\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`;
    
    const formattedCode = c.code.replace(/`/g, "\\`").replace(/\$/g, "\\$");
    const escapedExplanation = uzen.replace(/`/g, "\\`").replace(/\$/g, "\\$");

    newChallengesStr += `,\n  {\n    id: "${c.id}",\n    title: "${c.title.replace(/"/g, '\\"')}",\n    difficulty: "${c.difficulty}",\n    category: "${c.category}",\n    code: \`${formattedCode}\`,\n    options: ${JSON.stringify(c.options, null, 6)},\n    correctAnswer: "${c.correctAnswer.replace(/"/g, '\\"')}",\n    explanation: \`${escapedExplanation}\`\n  }`;
  });

  const lastIndex = challengesJS.lastIndexOf("];");
  if (lastIndex === -1) {
    throw new Error("Xatolik: challenges.js faylida '];' yopiluvchi qavs topilmadi.");
  }

  challengesJS = challengesJS.substring(0, lastIndex) + newChallengesStr + "\n];\n";

  fs.writeFileSync(challengesFilePath, challengesJS, "utf-8");
  
  const stats = getChallengesStats();
  return {
    addedCount: newChallenges.length,
    stats
  };
}

// Running as a script directly
if (require.main === module) {
  try {
    const res = mergeChallenges();
    if (res.addedCount === 0) {
      console.log(`Hamma yangi savollar allaqachon challenges.js fayliga qo'shilgan.\nJami sayt bazasidagi savollar: ${res.stats.total} ta (shundan Telegram orqali bot qo'shgan: ${res.stats.bot} ta, qo'lda qo'shilgan: ${res.stats.manual} ta).`);
    } else {
      console.log(`Muvaffaqiyatli: ${res.addedCount} ta yangi savol challenges.js fayliga qo'shildi! Jami savollar: ${res.stats.total} ta (shundan Telegram orqali bot qo'shgan: ${res.stats.bot} ta, qo'lda qo'shilgan: ${res.stats.manual} ta).`);
    }
  } catch (error) {
    console.error("Birlashtirishda xatolik yuz berdi:", error.message);
    process.exit(1);
  }
}

module.exports = { mergeChallenges, getChallengesStats };
