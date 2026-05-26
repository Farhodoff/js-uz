const fs = require("fs");
const path = require("path");

const challengesFilePath = path.join(__dirname, "../src/data/challenges.js");

if (!fs.existsSync(challengesFilePath)) {
  console.error("challenges.js fayli topilmadi!");
  process.exit(1);
}

try {
  let content = fs.readFileSync(challengesFilePath, "utf-8").trim();
  content = content.replace(/^export\s+const\s+challenges\s*=\s*/, "");
  
  // Clean trailing semicolons if present
  if (content.endsWith(";")) {
    content = content.slice(0, -1);
  }

  // Eval the array safely (it's our own file)
  const challenges = eval(`(${content})`);
  console.log(`Baza tahlil qilinmoqda. Jami savollar soni: ${challenges.length} ta.`);

  const idMap = new Map();
  const codeMap = new Map();
  
  const duplicateIds = [];
  const duplicateCodes = [];

  // Helper to normalize code (remove all whitespace, comments, quotes to compare structure)
  const normalizeCode = (codeStr) => {
    if (!codeStr) return "";
    return codeStr
      .replace(/\/\/.*$/gm, "") // Remove single-line comments
      .replace(/\/\*[\s\S]*?\*\//g, "") // Remove multi-line comments
      .replace(/['"`\s]/g, "") // Remove quotes and spaces
      .toLowerCase();
  };

  challenges.forEach((c, index) => {
    // Check ID duplicate
    if (idMap.has(c.id)) {
      duplicateIds.push({
        id: c.id,
        firstIndex: idMap.get(c.id).index,
        secondIndex: index,
        firstTitle: idMap.get(c.id).title,
        secondTitle: c.title
      });
    } else {
      idMap.set(c.id, { index, title: c.title });
    }

    // Check Code duplicate (structural similarity)
    const normCode = normalizeCode(c.code);
    if (normCode) {
      if (codeMap.has(normCode)) {
        duplicateCodes.push({
          code: c.code,
          firstId: codeMap.get(normCode).id,
          secondId: c.id,
          firstTitle: codeMap.get(normCode).title,
          secondTitle: c.title
        });
      } else {
        codeMap.set(normCode, { id: c.id, title: c.title });
      }
    }
  });

  console.log("\n------------------------------------------------");
  console.log("🔍 DUBLIKAT ID'LAR TEKSHIRUVI:");
  if (duplicateIds.length === 0) {
    console.log("✅ Dublikat ID'lar topilmadi!");
  } else {
    console.log(`⚠️ ${duplicateIds.length} ta dublikat ID topildi:`);
    duplicateIds.forEach((dup, i) => {
      console.log(`${i+1}. ID: "${dup.id}"`);
      console.log(`   - 1-savol: Index ${dup.firstIndex}, Title: "${dup.firstTitle}"`);
      console.log(`   - 2-savol: Index ${dup.secondIndex}, Title: "${dup.secondTitle}"`);
    });
  }

  console.log("\n------------------------------------------------");
  console.log("🔍 DUBLIKAT KODLAR (O'XSHASH SAVOLLAR) TEKSHIRUVI:");
  if (duplicateCodes.length === 0) {
    console.log("✅ Dublikat kodli savollar topilmadi!");
  } else {
    console.log(`⚠️ ${duplicateCodes.length} ta o'xshash kodli savollar topildi (Kanalda bir xil kodli savollar takroran e'lon qilingan bo'lishi mumkin):`);
    duplicateCodes.forEach((dup, i) => {
      console.log(`${i+1}. O'xshashlik aniqlangan:`);
      console.log(`   - 1-savol: ID: "${dup.firstId}", Title: "${dup.firstTitle}"`);
      console.log(`   - 2-savol: ID: "${dup.secondId}", Title: "${dup.secondTitle}"`);
    });
  }
  console.log("------------------------------------------------\n");

} catch (error) {
  console.error("Xatolik tahlil qilishda yuz berdi:", error.message);
}
