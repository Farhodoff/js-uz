require("dotenv").config({ path: require("path").join(__dirname, "../.env") });
const { Telegraf } = require("telegraf");
const { syncChallenges, syncHistory } = require("./scraper.cjs");
const { mergeChallenges, getChallengesStats } = require("./merge_challenges.cjs");

const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token || token === "YOUR_TELEGRAM_BOT_TOKEN_HERE" || token === "") {
  console.error("Xatolik: TELEGRAM_BOT_TOKEN o'rnatilmagan yoki noto'g'ri!");
  console.error("Iltimos, loyiha ildizidagi .env faylga bot tokenini yozing.");
  process.exit(1);
}

const bot = new Telegraf(token);

bot.start((ctx) => {
  const welcomeMessage = `
👋 Salom! Men JS-UZ Challenges Botiman.

Mening asosiy vazifam: @javascript telegram kanalidagi JavaScript coding challenges (kodli testlar) ni parse qilib, loyihamiz bazasiga saqlashdir.

Buyruqlar:
🚀 /sync <sahifalar_soni> - Kanaldan eng yangi challenge-larni yuklash va saytga qo'shish (sukut bo'yicha: 5 sahifa)
⏳ /sync_history <sahifalar_soni> - Bazada mavjud eng eski savoldan ham orqaga qarab tarixiy savollarni yuklash (sukut bo'yicha: 5 sahifa)
📊 /status - Sayt bazasidagi savollar soni va holatini ko'rish
ℹ️ /help - Yordam xabari
  `;
  ctx.reply(welcomeMessage);
});

// Sync from the latest posts backward
bot.command("sync", (ctx) => {
  const args = ctx.message.text.split(" ");
  const limitPages = args[1] ? parseInt(args[1], 10) : 5;
  
  if (isNaN(limitPages) || limitPages < 1) {
    return ctx.reply("Iltimos, sahifalar sonini musbat son ko'rinishida kiriting. Masalan: /sync 5");
  }
  
  ctx.reply(`⏳ @javascript kanalidan oxirgi ${limitPages} sahifa tahlil qilinmoqda. Sinxronizatsiya va bazaga birlashtirish orqa fonda boshlandi. Tugagandan so'ng xabar beraman...`);
  
  syncChallenges(limitPages)
    .then((syncResult) => {
      try {
        const mergeResult = mergeChallenges();
        
        ctx.reply(`
✅ Sinxronizatsiya va Birlashtirish muvaffaqiyatli yakunlandi!

📊 Hisobot:
• Kanaldan yuklab olingan yangi savollar: ${syncResult.newCount} ta
• Sayt bazasiga yangi qo'shilgan savollar: ${mergeResult.addedCount} ta

📈 Baza statistikasi:
• Sayt bazasidagi jami savollar: ${mergeResult.stats.total} ta
• Bot orqali qo'shilgan (Telegram): ${mergeResult.stats.bot} ta
• Qo'lda qo'shilgan (Manual/Seed): ${mergeResult.stats.manual} ta
        `);
      } catch (mergeError) {
        ctx.reply(`⚠️ Kanaldan yuklandi (${syncResult.newCount} ta), lekin bazaga birlashtirishda xatolik yuz berdi: ${mergeError.message}`);
      }
    })
    .catch((error) => {
      ctx.reply(`❌ Sinxronizatsiya vaqtida xatolik yuz berdi: ${error.message}`);
    });
});

// Sync history (posts older than the lowest ID we have)
bot.command("sync_history", (ctx) => {
  const args = ctx.message.text.split(" ");
  const limitPages = args[1] ? parseInt(args[1], 10) : 5;
  
  if (isNaN(limitPages) || limitPages < 1) {
    return ctx.reply("Iltimos, sahifalar sonini musbat son ko'rinishida kiriting. Masalan: /sync_history 5");
  }
  
  ctx.reply(`⏳ Bazadagi eng eski savoldan orqaga qarab ${limitPages} sahifa tarixiy savollar tahlil qilinmoqda. Sinxronizatsiya boshlandi. Tugagandan so'ng xabar beraman...`);
  
  syncHistory(limitPages)
    .then((syncResult) => {
      try {
        const mergeResult = mergeChallenges();
        
        ctx.reply(`
✅ Tarixiy sinxronizatsiya va Birlashtirish muvaffaqiyatli yakunlandi!

📊 Hisobot:
• Kanaldan yuklab olingan yangi tarixiy savollar: ${syncResult.newCount} ta
• Sayt bazasiga yangi qo'shilgan savollar: ${mergeResult.addedCount} ta

📈 Baza statistikasi:
• Sayt bazasidagi jami savollar: ${mergeResult.stats.total} ta
• Bot orqali qo'shilgan (Telegram): ${mergeResult.stats.bot} ta
• Qo'lda qo'shilgan (Manual/Seed): ${mergeResult.stats.manual} ta
        `);
      } catch (mergeError) {
        ctx.reply(`⚠️ Kanaldan yuklandi (${syncResult.newCount} ta), lekin bazaga birlashtirishda xatolik yuz berdi: ${mergeError.message}`);
      }
    })
    .catch((error) => {
      ctx.reply(`❌ Tarixiy sinxronizatsiya vaqtida xatolik yuz berdi: ${error.message}`);
    });
});

bot.command("status", (ctx) => {
  try {
    const stats = getChallengesStats();
    ctx.reply(`
📊 JS-UZ Challenge Baza Holati:

• Sayt bazasidagi jami savollar: ${stats.total} ta
• Bot orqali qo'shilgan (Telegram): ${stats.bot} ta
• Qo'lda qo'shilgan (Manual/Seed): ${stats.manual} ta
    `);
  } catch (error) {
    ctx.reply(`❌ Statistika olishda xatolik: ${error.message}`);
  }
});

bot.help((ctx) => {
  ctx.reply("• Yangi postlarni yuklash: /sync 10\n• Tarixiy (eski) postlarni yuklash: /sync_history 15\n• Bazadagi savollar soni va holati: /status");
});

bot.launch().then(() => {
  console.log("🤖 Telegram bot muvaffaqiyatli ishga tushdi!");
  console.log("Bot xabarlarni tinglamoqda...");
}).catch((err) => {
  console.error("Botni ishga tushirishda xatolik:", err);
});

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
