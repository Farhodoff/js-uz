export const sqlStoredProcedures = {
  id: "sqlStoredProcedures",
  title: "Saqlanadigan Proseduralar (Stored Procedures)",
  language: "sql",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

### Saqlanadigan Prosedura (Stored Procedure) nima?
**Saqlanadigan Prosedura (Stored Procedure)** — bu ma'lumotlar bazasi ichida saqlanadigan va ma'lum bir vazifani bajarish uchun yozilgan SQL kodlari to'plamidir (dasturlash tillaridagi funksiyalarga o'xshash).

### Nima uchun kerak?
1. **Tezlik:** Proseduralar bazaning o'zida kompilyatsiya qilinadi va bajariladi. Bu tarmoq orqali ko'plab SQL so'rovlarni yuborish yuklamasini kamaytiradi.
2. **Xavfsizlik:** Tashqi backend tizimlariga jadvallarni o'qish/yozish huquqini bermasdan, faqat maxsus proseduralarni ishga tushirish huquqini (EXECUTE) berish mumkin.
3. **Biznes mantiqini markazlashtirish:** Agar loyiha har xil dasturlash tillarida yozilgan backend xizmatlaridan iborat bo'lsa, umumiy bazaviy mantiqni baza ichida bir marta yozib qo'yish kifoya.

### Prosedura (Procedure) va Funksiya (Function) farqi nima?
* **Funksiya (Function):** Har doim bitta qiymat qaytarishi shart, tranzaksiyani boshqara olmaydi (\`COMMIT\`/\`ROLLBACK\` qila olmaydi). Uni oddiy so'rov ichida \`SELECT function_name(...)\` deb ishlatish mumkin.
* **Prosedura (Procedure):** Qiymat qaytarishi shart emas (hech narsa qaytarmasa ham bo'ladi), lekin tranzaksiyalarni to'liq boshqara oladi. Uni \`CALL procedure_name(...)\` deb chaqiramiz.

### Real hayotiy analogiya
Tasavvur qiling, sizda **avtomatlashtirilgan qahva mashinasi** bor:
* **Oddiy SQL:** Siz har safar qahva ichmoqchi bo'lganingizda, mashinani qismlarga ajratib, suv solib, qahva maydalab, stakanni joylashtirib, tugmani bosasiz (ko'p vaqt va harakat ketadi).
* **Stored Procedure:** Mashinada tayyor "Kapuchino" tugmasi bor. Siz faqat tugmani bosasiz va mashina orqa fonda barcha qadamlarni (maydalash, suv isitish, quyish) avtomatik bajarib, sizga tayyor qahva beradi. Siz faqat parametr berasiz (shakar soni = 2).

---

## 2. 💻 Real SQL Kod Misollari

### 1. Basic Example (Sodda Funksiya - Function)
Foydalanuvchi yoshi bo'yicha u balog'atga yetganini tekshiruvchi sodda funksiya (PostgreSQL - PL/pgSQL):
\`\`\`sql
-- Balog'atga yetganini tekshiruvchi funksiya
CREATE OR REPLACE FUNCTION is_adult(user_age INT) 
RETURNS BOOLEAN AS $$
BEGIN
    IF user_age >= 18 THEN
        RETURN TRUE;
    ELSE
        RETURN FALSE;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Ishlatish
SELECT name, is_adult(age) FROM users;
\`\`\`
* **Natija:** Har bir foydalanuvchining ismi va balog'atga yetganligi haqida Boolean qiymat chiqadi.
* **Qachon ishlatiladi:** Bazadagi ma'lumotlarni o'qiyotganda hisob-kitoblarni baza darajasida soddalashtirish uchun.
* **Performance jihati:** Bu funksiya juda tez ishlaydi, lekin SELECT so'rovi ichida millionlab qatorlar uchun chaqirilganda biroz yuklama keltirishi mumkin.

### 2. Intermediate Example (Parametrli Stored Procedure)
Yangi foydalanuvchi qo'shadigan va avtomatik hamyon yaratadigan prosedura:
\`\`\`sql
-- Foydalanuvchi qo'shuvchi prosedura
CREATE OR REPLACE PROCEDURE create_user_with_wallet(
    p_name VARCHAR,
    p_email VARCHAR,
    p_initial_balance DECIMAL
) AS $$
DECLARE
    new_user_id INT;
BEGIN
    -- 1. Foydalanuvchini qo'shish va uning avtomatik ID sini olish
    INSERT INTO users (name, email) 
    VALUES (p_name, p_email) 
    RETURNING id INTO new_user_id;

    -- 2. Unga hamyon ochish
    INSERT INTO wallets (user_id, balance) 
    VALUES (new_user_id, p_initial_balance);
    
    -- Tranzaksiyani saqlash
    COMMIT;
END;
$$ LANGUAGE plpgsql;

-- Ishlatish
CALL create_user_with_wallet('Ali', 'ali@mail.uz', 100000.00);
\`\`\`
* **Natija:** Baza darajasida foydalanuvchi yaratiladi va uning balansi to'ldiriladi.
* **Qachon ishlatiladi:** Ro'yxatdan o'tish kabi ko'p bosqichli amallarni soddalashtirishda.

### 3. Advanced Example (Loop-lar va kursorlar bilan ishlash)
Barcha foydalanuvchilar balansiga 5% dan yillik foiz qo'shib chiqadigan prosedura:
\`\`\`sql
-- Foiz hisoblovchi prosedura
CREATE OR REPLACE PROCEDURE apply_monthly_interest() AS $$
DECLARE
    r RECORD;
BEGIN
    -- Hamyonlar bo'yicha aylanib chiqish (Loop)
    FOR r IN SELECT user_id, balance FROM wallets LOOP
        UPDATE wallets 
        SET balance = balance * 1.05 
        WHERE user_id = r.user_id;
    END LOOP;
    
    COMMIT;
END;
$$ LANGUAGE plpgsql;

-- Ishlatish
CALL apply_monthly_interest();
\`\`\`
* **Natija:** Barcha foydalanuvchilar balansi 5 foizga oshadi.
* **Qachon ishlatiladi:** Bank yoki investitsiya tizimlarida davriy foizlarni qo'shib borishda.
* **Performance jihati:** \`FOR LOOP\` ko'plab yakka yangilanishlarni (UPDATE) ketma-ket bajaradi. Agar foydalanuvchilar millionlab bo'lsa, so'rov uzoq davom etadi. Bunday holda loop o'rniga bitta umumiy \`UPDATE wallets SET balance = balance * 1.05\` yozish ming marta tezroq ishlaydi (Set-based operations).

### 4. Production Example (Exception Handling - Xatoliklarni boshqarish)
To'lov jarayonini xatoliklarni chetlab o'tib amalga oshirish:
\`\`\`sql
CREATE OR REPLACE PROCEDURE execute_secure_payment(
    p_from INT,
    p_to INT,
    p_amount DECIMAL
) AS $$
BEGIN
    -- Pul yechish
    UPDATE wallets SET balance = balance - p_amount WHERE user_id = p_from;
    -- Pul qo'shish
    UPDATE wallets SET balance = balance + p_amount WHERE user_id = p_to;
    
    COMMIT;
EXCEPTION
    WHEN OTHERS THEN
        -- Har qanday xatolik bo'lsa tranzaksiyani orqaga qaytarish
        ROLLBACK;
        RAISE NOTICE 'To''lov bajarilmadi, bekor qilindi.';
END;
$$ LANGUAGE plpgsql;
\`\`\`
* **Natija:** Xavfsiz to'lov amali bajariladi. Agar biror muammo bo'lsa, xato yashirilmasdan logga yoziladi va bekor qilinadi.
* **Qachon ishlatiladi:** Ishonchli billing tizimlarida.

### 5. Enterprise Example (Dynamic SQL - Dinamik so'rovlar yozish)
Jadval nomini parametr sifatida qabul qilib, undagi qatorlar sonini hisoblovchi funksiya:
\`\`\`sql
-- Dinamik SQL funksiyasi
CREATE OR REPLACE FUNCTION get_table_row_count(target_table_name VARCHAR)
RETURNS INT AS $$
DECLARE
    total_rows INT;
BEGIN
    -- SQL-ni dinamik ravishda string yordamida yig'ib bajarish
    EXECUTE 'SELECT COUNT(*) FROM ' || quote_ident(target_table_name)
    INTO total_rows;
    
    RETURN total_rows;
END;
$$ LANGUAGE plpgsql;

-- Ishlatish
SELECT get_table_row_count('users');
\`\`\`
* **Natija:** \`users\` jadvalidagi jami qatorlar soni son shaklida qaytadi.
* **Qachon ishlatiladi:** Admin panellarda har xil dinamik hisobotlarni shakllantirishda.
* **Performance jihati:** \`EXECUTE\` ishlatilganda baza so'rovni oldindan tayyorlab qo'ya olmaydi (Query plan keshi ishlamaydi), bu esa uning tezligini biroz kamaytiradi. Shuningdek SQL Injection xavfini oldini olish uchun \`quote_ident()\` funksiyasidan foydalanish shart.

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Qaysi muammoni hal qiladi?
* **Network Roundtrip Time (Tarmoq kechikishi):** Agar backend dasturi bir amalni bajarish uchun bazaga 10 ta ketma-ket SQL so'rovi yuborsa, tarmoq tufayli 10 marta vaqt yo'qotiladi. Stored procedure yordamida barcha mantiq bazaga bitta chaqiruv bilan yuboriladi va baza ichida yashin tezligida ishlaydi.
* **Biznes mantiq xavfsizligi:** Dasturchilar adashib noto'g'ri so'rov yozib balansni buzib qo'ymasligi uchun, ularga jadvallarga ruxsat berilmaydi, faqat tayyor, testdan o'tgan Stored Procedure-lar beriladi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Funksiya (Function) ichida tranzaksiyalar (COMMIT/ROLLBACK) ishlatish
#### Xato:
\`\`\`sql
CREATE OR REPLACE FUNCTION update_data() RETURNS VOID AS $$
BEGIN
    UPDATE users SET status = 'active';
    COMMIT; -- XATO!
END;
$$ LANGUAGE plpgsql;
\`\`\`
#### Nima uchun noto'g'ri:
PostgreSQL va standart SQL da Funksiyalar tranzaksiya mantiqini boshqara olmaydi. Tranzaksiyani boshqarish faqat Proseduralarga (Procedure) tegishlidir.
#### To'g'ri usul:
Funksiya o'rniga \`CREATE PROCEDURE\` ishlating va uni \`CALL\` orqali chaqiring.
#### Izoh:
Farqni doimo yodda tuting.

### 2. Barcha biznes mantiqni baza ichiga (Stored Procedure-larga) yozib tashlash
#### Xato:
Ilovaning barcha mantiqlarini, xat yuborish, log yozish, hisob-kitoblarni to'liq bazadagi proseduralarga yozish.
#### Nima uchun noto'g'ri:
Bazani vertikal kengaytirish (scale) juda qiyin va qimmat. Agar baza faqat hisob-kitob bilan band bo'lib qolsa, butun loyiha qulflanadi. Shuningdek, SQL kodlarni testlash (Unit testing) va Git-da versiyalash ancha murakkab.
#### To'g'ri usul:
Bazada faqat ma'lumotlar bilan bog'liq eng muhim amallarni (masalan billing) qoldiring. Qolgan biznes mantiqni backend (Node.js, Python, Go) kodida bajaring.
#### Izoh:
Baza protsessori hisob-kitob uchun emas, ma'lumotlarni saqlash va tartibga solish uchun optimallashtirilgan.

### 3. Dynamic SQL yozganda SQL Injection xavfini yaratish
#### Xato:
\`\`\`sql
EXECUTE 'SELECT * FROM users WHERE name = ''' || user_input || '''';
\`\`\`
#### Nima uchun noto'g'ri:
Foydalanuvchi kiritgan matn so'rov matniga to'g'ridan-to'g'ri ulanishi SQL Injection xavfini tug'diradi.
#### To'g'ri usul:
\`USING\` kalit so'zi bilan parametrlashni ishlatish:
\`\`\`sql
EXECUTE 'SELECT * FROM users WHERE name = $1' USING user_input;
\`\`\`
#### Izoh:
Dinamik SQL-da har doim parametrlardan foydalaning.

### 4. Loop-lar yordamida sekin ishlovchi so'rovlar yozish (RBAR - Row By Agonizing Row)
#### Xato:
Barcha foydalanuvchilar balansini yangilash uchun Loop (aylanma) ichida birma-bir \`UPDATE\` qilish.
#### Nima uchun noto'g'ri:
Bu bazani keraksiz yuklaydi. SQL set-based (to'plamlar bilan ishlovchi) tildir.
#### To'g'ri usul:
Bitta toza va indeksli UPDATE so'rovi bilan hamma qatorni yangilash:
\`\`\`sql
UPDATE wallets SET balance = balance * 1.05;
\`\`\`
#### Izoh:
Loop-lardan faqat boshqa iloj qolmagan holatlardagina foydalaning.

### 5. \`CREATE OR REPLACE\` yordamida parametrlar soni yoki turlarini mos kelmasligi
#### Xato:
Eski funksiyada 2 ta parametr bor edi, biz yangisiga 3 ta parametr qo'shib \`CREATE OR REPLACE\` qildik. Baza xato bermasdan yangi funksiya yaratadi (overloading), eski funksiya esa o'chmaydi. Bu chalkashliklarga sabab bo'ladi.
#### To'g'ri usul:
Avval \`DROP FUNCTION/PROCEDURE\` qilib, keyin yangisini yaratish.
#### Izoh:
Parametrlar o'zgarganda eski funksiyani o'chirib tashlash xavfsizroq.

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** Stored Procedure (Saqlanadigan Prosedura) nima?
   * **Javob:** Stored Procedure — ma'lumotlar bazasida oldindan yozib va kompilyatsiya qilib qo'yilgan SQL kodlari to'plamidir.
   * **Intervyuda qanday javob berish kerak:** *"U dasturlash tilidagi funksiyalarga o'xshash bo'lib, bazada biznes mantiqini yagona joyda saqlash va tarmoq trafigini kamaytirish uchun ishlatiladi."*

2. **Savol:** Prosedura va Funksiya farqi nimada?
   * **Javob:** Funksiya doimo qiymat qaytaradi va tranzaksiyani boshqara olmaydi. Prosedura esa qiymat qaytarmasligi ham mumkin va tranzaksiyalarni (COMMIT/ROLLBACK) to'liq boshqara oladi.
   * **Intervyuda qanday javob berish kerak:** *"Funksiyalarni SELECT ichida runs qila olamiz, proseduralarni esa faqat CALL buyrug'i bilan chaqiramiz."*

3. **Savol:** Saqlanadigan proseduraning qanday afzalligi bor?
   * **Javob:** Tezkor bajarilish (pre-compiled), yuqori xavfsizlik va tarmoq yuklamasini kamaytirishi.
   * **Intervyuda qanday javob berish kerak:** *"Barcha SQL so'rovlar bitta paket bo'lib bazaning o'zida ishlagani uchun tarmoq kechikishlarining (network roundtrip) oldi olinadi."*

4. **Savol:** Prosedurani ishga tushirish qaysi operator yordamida bajariladi?
   * **Javob:** \`CALL procedure_name(parameters);\`
   * **Intervyuda qanday javob berish kerak:** *"MySQL va PostgreSQL-da proseduralar CALL kalit so'zi bilan ishga tushiriladi."*

### Middle (5–8)
5. **Savol:** PL/pgSQL yoki T-SQL nima?
   * **Javob:** Bu relyatsion ma'lumotlar bazalarining ichidagi dasturlash tillaridir (PostgreSQL va SQL Server uchun).
   * **Intervyuda qanday javob berish kerak:** *"Ular standart SQL-ga o'zgaruvchilar, shartlar (IF/ELSE), loop-lar (FOR/WHILE) va xatolarni ushlash (Exception Handling) imkoniyatlarini qo'shadi."*

6. **Savol:** Prosedurada \`IN\`, \`OUT\` va \`INOUT\` parametrlari nima uchun ishlatiladi?
   * **Javob:**
     * \`IN\`: Proseduraga kiruvchi parametr.
     * \`OUT\`: Natijani tashqariga qaytaruvchi parametr.
     * \`INOUT\`: Homi kiruvchi ham chiquvchi parametr.
   * **Intervyuda qanday javob berish kerak:** *"Prosedura RETURN ishlatmagani sababli, tashqariga ma'lumot qaytarish uchun OUT parametrlaridan foydalanamiz."*

7. **Savol:** Proseduralarda xatoliklarni ushlash (Exception Handling) qanday bajariladi?
   * **Javob:** \`BEGIN ... EXCEPTION WHEN ... THEN\` bloklari yordamida.
   * **Intervyuda qanday javob berish kerak:** *"Agar biror SQL xato yuz bersa, EXCEPTION bloki ishga tushadi va biz u yerda tranzaksiyani xavfsiz ROLLBACK qilib, xato xabarini yozishimiz mumkin."*

8. **Savol:** Dynamic SQL nima va u qachon kerak?
   * **Javob:** SQL so'rovi matnini string ko'rinishida yig'ib, so'ngra ishga tushirish (EXECUTE).
   * **Intervyuda qanday javob berish kerak:** *"Jadval nomi yoki ustun nomi oldindan noma'lum bo'lib, runtime paytida aniqlanadigan bo'lsa Dinamik SQL ishlatiladi."*

### Senior (9–12)
9. **Savol:** SQL-da Stored Procedure-lardan haddan tashqari ko'p foydalanish loyihani kengaytirishda (scaling) qanday muammolarga olib keladi?
   * **Javob:** Protsessor (CPU) yuklamasini oshiradi, chunki baza serverini gorizontal kengaytirish oson emas. Shuningdek kodni versiyalash va CI/CD tizimlariga integratsiya qilish murakkablashadi.
   * **Intervyuda qanday javob berish kerak:** *"Barcha hisob-kitoblarni bazaga yuklash noto'g'ri arxitekturadir. Biznes mantiqni backend ilovalarda bajarib, bazadan faqat ma'lumot saqlash va indekslash uchun foydalanish kengayish imkoniyatini (scalability) oshiradi."*

10. **Savol:** SQL Injection xavfini Dynamic SQL-da qanday butunlay bartaraf qilish mumkin?
    * **Javob:** \`EXECUTE ... USING\` yordamida parametrlardan foydalanish hamda jadval nomlari uchun \`quote_ident()\` funksiyasini qo'llash orqali.
    * **Intervyuda qanday javob berish kerak:** *"Matnlarni oddiy string ulanishi bilan yozish xavfli. Biz PostgreSQL-da quote_literal() yoki quote_ident() funksiyalaridan va majburiy ravishda USING parametrlaridan foydalanamiz."*

11. **Savol:** \`SQL standard security contexts\` bo'lgan \`SECURITY DEFINER\` va \`SECURITY INVOKER\` farqi nimada va qaysi biri xavfsizroq?
    * **Javob:**
      * \`SECURITY INVOKER\` (default): Funksiya uni chaqirgan foydalanuvchining huquqlari (permissions) bilan ishlaydi.
      * \`SECURITY DEFINER\`: Funksiya uni yaratgan foydalanuvchining (odatda superuser/admin) cheksiz huquqlari bilan ishlaydi.
    * **Intervyuda qanday javob berish kerak:** *"SECURITY DEFINER xavfli hisoblanadi, chunki oddiy foydalanuvchi u orqali ruxsat berilmagan amallarni bajarib yuborishi mumkin (Privilege Escalation). Imkon qadar SECURITY INVOKER ishlatish xavfsizroq."*

12. **Savol:** Tranzaksiyalar yopilishida (COMMIT) Stored Procedure ichida orqa fonda nimalar sodir bo'ladi?
    * **Javob:** Tranzaksiya davomida olingan barcha qator blokirovkalari (Locks) bo'shatiladi, o'zgarishlar WAL (Write-Ahead Log) fayliga yoziladi va sessiya tozalanadi.
    * **Intervyuda qanday javob berish kerak:** *"COMMIT bo'lganda baza barcha bloklarni bo'shatib, ma'lumotlar butunligini yakuniy tekshiradi. Agar ziddiyat bo'lmasa, diskka yozish amali tasdiqlanadi."*

---

## 6. 🛠️ Amaliy Topshiriqlar

Mashqlar interaktiv muhitda bajariladi.

---

## 7. 📝 12 ta Mini Test

Dars yakunidagi testlar.

---

## 8. 🎯 Real Project Case Study

### SaaS loyihalarida oylik abonent to'lovini avtomatlashtirish
Loyiha obuna tizimi asosida ishlaydi (masalan Netflix). Har oyning 1-sanasida barcha faol foydalanuvchilar balansidan obuna to'lovi avtomatik yechilishi shart.

#### Muammo:
Agar backend kodi 100,000 ta foydalanuvchini birma-bir o'qib, ularga API orqali balans yangilash so'rovi yuborsa, bu tarmoq yuklamasini oshiradi va soatlab vaqt olishi mumkin.

#### Yechim:
Baza darajasida bitta Stored Procedure yaratamiz:
\`\`\`sql
CREATE OR REPLACE PROCEDURE charge_monthly_subscriptions(p_fee DECIMAL) AS $$
BEGIN
    -- Balansi yetarli bo'lgan barcha faol obunachilardan pul yechish
    UPDATE user_wallets w
    SET balance = balance - p_fee
    FROM users u
    WHERE w.user_id = u.id 
      AND u.subscription_status = 'active'
      AND w.balance >= p_fee;

    -- Obunasi muddati tugaganlarni statusini o'zgartirish
    UPDATE users u
    SET subscription_status = 'expired'
    FROM user_wallets w
    WHERE u.id = w.user_id
      AND u.subscription_status = 'active'
      AND w.balance < p_fee;

    COMMIT;
END;
$$ LANGUAGE plpgsql;
\`\`\`
Ushbu prosedura 100,000 foydalanuvchini soniyaning ulushlarida yangilab chiqadi va hisob-kitob butunligini ta'minlaydi.

---

## 9. 🚀 Performance va Optimization

* **Set-based Operations:** Stored procedure ichida iloji boricha Loop-lardan qoching. Buning o'rniga bitta umumiy SQL (UPDATE, INSERT) so'rovi yozing. Bu so'rovlarni 100 barobargacha tezlashtiradi.
* **Query Caching:** RDBMS prosedura ichidagi SQL so'rovlar rejasini keshlab oladi va ikkinchi safar ularni qayta tahlil qilmasdan tezkor bajaradi.

---

## 10. 📌 Cheat Sheet

| Tushuncha | Sintaksis | Vazifasi | Eslatma |
| :--- | :--- | :--- | :--- |
| **CREATE PROCEDURE** | \`CREATE PROCEDURE name(...)\` | Tranzaksiyali protsedura yaratish | CALL orqali chaqiriladi |
| **CREATE FUNCTION** | \`CREATE FUNCTION name(...) RETURNS...\` | Qiymat qaytaruvchi funksiya | SELECT ichida ishlatiladi |
| **CALL** | \`CALL proc_name(args);\` | Prosedurani ishga tushirish | Tranzaksiyalarni boshqara oladi |
| **plpgsql** | \`LANGUAGE plpgsql;\` | PostgreSQL dasturlash tili | IF, LOOP, EXCEPTION qo'shadi |
| **quote_ident** | \`quote_ident(table_name)\` | Dinamik SQL-ni himoya qilish | SQL Injection oldini oladi |
`,
  exercises: [
  {
    "id": 1,
    "title": "Soliq Hisoblash Funksiyasi",
    "instruction": "Mahsulot narxiga 10% soliq qo'shib qaytaruvchi `add_tax` nomli funksiya yarating (AlaSQL formatida: `CREATE FUNCTION add_tax AS \"function(p) { return p * 1.1; }\"`).",
    "startingCode": "-- Funksiyani yaratuvchi SQL so'rovini yozing\n",
    "hint": "CREATE FUNCTION add_tax AS \"function(p) { return p * 1.1; }\"",
    "test": "try { db.exec('CREATE FUNCTION add_tax AS \"function(p) { return p * 1.1; }\"'); const res = db.exec('SELECT add_tax(100) AS val'); if(Math.round(res[0].val) !== 110) return 'Funksiya noto\\'g\\'ri hisobladi'; } catch(e) { return 'Xato: ' + e.message; } return null;"
  },
  {
    "id": 2,
    "title": "Foydalanuvchi Salomlash Funksiyasi",
    "instruction": "Foydalanuvchi ismiga 'Salom, ' so'zini qo'shib qaytaruvchi `greet_user` nomli funksiya yarating (AlaSQL formatida: `CREATE FUNCTION greet_user AS \"function(name) { return 'Salom, ' + name; }\"`).",
    "startingCode": "-- Funksiyani yaratuvchi SQL so'rovini yozing\n",
    "hint": "CREATE FUNCTION greet_user AS \"function(name) { return 'Salom, ' + name; }\"",
    "test": "try { db.exec('CREATE FUNCTION greet_user AS \"function(name) { return \\'Salom, \\' + name; }\"'); const res = db.exec('SELECT greet_user(\\'Ali\\') AS val'); if(res[0].val !== 'Salom, Ali') return 'Funksiya noto\\'g\\'ri salomlashdi'; } catch(e) { return 'Xato: ' + e.message; } return null;"
  },
  {
    "id": 3,
    "title": "Keshbek Hisoblash",
    "instruction": "Xarid summasidan 5% keshbek miqdorini hisoblab qaytaruvchi `calc_cashback` nomli funksiya yarating (AlaSQL formatida: `CREATE FUNCTION calc_cashback AS \"function(amt) { return amt * 0.05; }\"`).",
    "startingCode": "-- Funksiyani yaratuvchi SQL so'rovini yozing\n",
    "hint": "CREATE FUNCTION calc_cashback AS \"function(amt) { return amt * 0.05; }\"",
    "test": "try { db.exec('CREATE FUNCTION calc_cashback AS \"function(amt) { return amt * 0.05; }\"'); const res = db.exec('SELECT calc_cashback(1000) AS val'); if(Math.round(res[0].val) !== 50) return 'Funksiya noto\\'g\\'ri hisobladi'; } catch(e) { return 'Xato: ' + e.message; } return null;"
  }
]
,
  quizzes: [
  {
    "id": 1,
    "question": "Stored Procedure (Saqlanadigan Prosedura) nima?",
    "options": [
      "Bazada oldindan kompilyatsiya qilingan SQL kodlari to'plami",
      "Faqat ma'lumotlarni o'chiruvchi kod",
      "Node.js loyiha fayli",
      "Avtomatik yaratiladigan indeks turi"
    ],
    "correctAnswer": 0,
    "explanation": "Stored Procedure — bu ma'lumotlar bazasining ichida saqlanadigan, oldindan kompilyatsiya qilingan va ma'lum bir biznes mantiqni bajaruvchi SQL blokidir."
  },
  {
    "id": 2,
    "question": "Stored Procedure va Database Function (Funksiya) o'rtasidagi eng asosiy mantiqiy farq nimada?",
    "options": [
      "Funksiya faqat MySQL da ishlaydi, Prosedura esa PostgreSQL da",
      "Prosedura tranzaksiyalarni (COMMIT/ROLLBACK) boshqara oladi, Funksiya esa boshqara olmaydi va doimo qiymat qaytarishi shart",
      "Funksiya diskda joy egallaydi, Prosedura esa egallamaydi",
      "Hech qanday farq yo'q"
    ],
    "correctAnswer": 1,
    "explanation": "Database Function (Funksiya) har doim bitta qiymat qaytarishi shart va u tranzaksiyani boshqara olmaydi. Prosedura esa tranzaksiyani (BEGIN/COMMIT/ROLLBACK) to'liq boshqara oladi."
  },
  {
    "id": 3,
    "question": "Stored Prosedurani ishga tushirish (chaqirish) uchun qaysi kalit so'z ishlatiladi?",
    "options": ["RUN", "CALL", "EXECUTE", "START"],
    "correctAnswer": 1,
    "explanation": "SQL standartida va ko'plab dialektlarda (MySQL, PostgreSQL) proseduralarni chaqirish uchun 'CALL procedure_name(args);' sintaksisi ishlatiladi."
  },
  {
    "id": 4,
    "question": "Stored Proseduralardan foydalanishning qanday performance (tezkorlik) afzalligi bor?",
    "options": [
      "Ular avtomatik ravishda barcha select so'rovlarini keshlaydi",
      "Tarmoq kechikishi va so'rovlar aylanma vaqtini (Network Roundtrip Time) keskin kamaytiradi",
      "Ular RAM sarflamaydi",
      "Ular disk tezligini oshiradi"
    ],
    "correctAnswer": 1,
    "explanation": "Barcha SQL amallar bazaning o'zida yagona chaqiruv bilan bajarilgani sababli, backend va baza serveri o'rtasidagi tarmoq kechikishlarining oldi olinadi."
  },
  {
    "id": 5,
    "question": "Prosedurada natijalarni tashqariga qaytarish uchun qaysi parametr turi ishlatiladi?",
    "options": ["IN", "OUT", "INOUT", "RETURN"],
    "correctAnswer": 1,
    "explanation": "Prosedurada an'anaviy RETURN bo'lmagani sababli, qiymatlarni tashqariga uzatish uchun 'OUT' (chiquvchi) parametrlaridan foydalaniladi."
  },
  {
    "id": 6,
    "question": "PostgreSQL bazasida Stored Procedure va Funksiyalarni yozish uchun sukut bo'yicha qaysi dasturlash tili ishlatiladi?",
    "options": ["T-SQL", "PL/SQL", "PL/pgSQL", "JavaScript"],
    "correctAnswer": 2,
    "explanation": "PostgreSQL-da procedural til sifatida PL/pgSQL (Procedural Language/PostgreSQL Structured Query Language) ishlatiladi."
  },
  {
    "id": 7,
    "question": "Dynamic SQL nima?",
    "options": [
      "Avtomatik o'zgaruvchi jadvallar tizimi",
      "SQL so'rovi matnini string ko'rinishida yig'ib, so'ngra EXECUTE yordamida bajarish",
      "O'ta tez ishlaydigan so'rov",
      "Faqat NoSQL da ishlaydigan SQL"
    ],
    "correctAnswer": 1,
    "explanation": "Dinamik SQL dastur bajarilayotgan paytda SQL so'rovini string ko'rinishida yig'ib, orqa fonda ishga tushirish (EXECUTE) jarayonidir."
  },
  {
    "id": 8,
    "question": "Dynamic SQL-da SQL Injection xavfini qanday butunlay bartaraf qilish mumkin?",
    "options": [
      "Faqat administrator huquqidan foydalanish",
      "USING kalit so'zi bilan parametrlashdan va quote_ident/quote_literal funksiyalaridan foydalanish",
      "Stringlarni oddiy '+' orqali ulash",
      "Baza xavfsizlik devorini yoqish"
    ],
    "correctAnswer": 1,
    "explanation": "USING orqali so'rovga parametrlar xavfsiz beriladi, quote_ident esa jadval nomlarini xavfsiz qobiqqa oladi, bu esa Injection hujumlarini to'xtatadi."
  },
  {
    "id": 9,
    "question": "RBAR (Row By Agonizing Row) muammosi nima?",
    "options": [
      "Jadvalda bo'sh qatorlar paydo bo'lishi",
      "Prosedura ichida Loop yordamida minglab qatorlarni birma-bir UPDATE/INSERT qilish natijasida so'rovning o'ta sekinlashishi",
      "Sanalarni noto'g'ri solishtirish",
      "Ma'lumotlar o'chib ketishi"
    ],
    "correctAnswer": 1,
    "explanation": "SQL to'plamlar (set-based) bilan ishlashga mo'ljallangan. Uni loop ichida birma-bir (row-by-row) yangilash bazani og'ir yuklab qo'yadi va RBAR deb ataladi."
  },
  {
    "id": 10,
    "question": "SECURITY DEFINER konteksti qanday ishlaydi?",
    "options": [
      "Funksiya uni chaqirgan foydalanuvchining huquqlari bilan ishlaydi",
      "Funksiya uni yaratgan foydalanuvchining (odatda superuser) cheksiz huquqlari bilan ishlaydi",
      "Funksiya faqat o'qish uchun ishlaydi",
      "Funksiya parollarni tekshiradi"
    ],
    "correctAnswer": 1,
    "explanation": "SECURITY DEFINER funksiya yoki prosedura kim tomonidan yaratilgan bo'lsa (definer), aynan o'shaning huquqi bilan ishga tushishini bildiradi (xavfsizlikka e'tibor berish lozim)."
  },
  {
    "id": 11,
    "question": "Stored Procedure-lardan haddan tashqari ko'p foydalanish loyihani kengaytirishda (scaling) qanday muammoga sabab bo'ladi?",
    "options": [
      "Baza hajmi to'lib qoladi",
      "Baza CPU yuklamasini oshiradi, chunki bazani gorizontal kengaytirish (scale) oson emas",
      "So'rovlar sintaksisi buziladi",
      "Hech qanday muammo bo'lmaydi"
    ],
    "correctAnswer": 1,
    "explanation": "Barcha biznes mantiqni bazaga yuklash bazaning protsessorini band qiladi. Baza serverini gorizontal kengaytirish (scale) backend serverlarga qaraganda ancha qiyin va qimmat."
  },
  {
    "id": 12,
    "question": "Prosedura yoki Funksiyani butunlay o'chirish uchun qaysi SQL operatorlari ishlatiladi?",
    "options": [
      "DELETE FUNCTION / DELETE PROCEDURE",
      "DROP FUNCTION / DROP PROCEDURE",
      "REMOVE FUNCTION / REMOVE PROCEDURE",
      "CLEAR FUNCTION / CLEAR PROCEDURE"
    ],
    "correctAnswer": 1,
    "explanation": "SQL-da saqlanadigan ob'ektlarni o'chirish uchun 'DROP FUNCTION function_name;' yoki 'DROP PROCEDURE procedure_name;' buyruqlari ishlatiladi."
  }
]

};
