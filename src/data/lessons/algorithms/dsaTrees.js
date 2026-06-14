export const dsaTrees = {
  id: "dsaTrees",
  title: "Daraxtlar: Iyerarxik Tuzilmalar va Aylanishlar (Trees & Traversals)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

Daraxtlar (Trees) - bu chiziqli bo'lmagan, iyerarxik (bo'ysunuvchi) bog'lanishga ega bo'lgan ma'lumotlar tuzilmasidir. Ular elementlarni zanjir kabi emas, balki shoxlangan ko'rinishda saqlaydi.

### Shajara (Oilaviy daraxt) o'xshatishi:
- **Root (Ildiz node):** Oiladagi eng katta bobo (eng yuqori node). Undan boshqa barcha a'zolar tarqaladi.
- **Parent & Child (Ota va Farzand):** Har bir ota-ona o'z farzandlariga havola beradi. Masalan, boboning farzandlari (ota-onalar), ularning esa o'z farzandlari (nabiralar) bor.
- **Leaf (Barg node):** Farzandi bo'lmagan, eng oxirida turgan nabiralar (daraxtning tugallanish nuqtalari).
- **Subtree (Qism-daraxt):** Oilaning birgina shoxi (masalan, faqat amakining oilasi va uning farzandlari).

---

## 2. 💻 Real Kod Misollari

Javaskriptda oddiy daraxt tuguni (Node) klassi va uning aylanishlari (DFS - Depth First Search):

\`\`\`javascript
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;  // Chap shox
    this.right = null; // O'ng shox
  }
}

// In-order traversal: Chap -> Ildiz -> O'ng
function inOrder(node, result = []) {
  if (node !== null) {
    inOrder(node.left, result);
    result.push(node.value);
    inOrder(node.right, result);
  }
  return result;
}
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### Daraxt turlari va tuzilishi:
- **Ikkilik Daraxt (Binary Tree):** Har bir tugun ko'pi bilan 2 ta farzandga (chap va o'ng) ega bo'lishi mumkin bo'lgan daraxt turi.
- **Aylanishlar (Traversals):**
  1. **Pre-order (Ildiz -> Chap -> O'ng):** Daraxt nusxasini yaratishda ishlatiladi.
  2. **In-order (Chap -> Ildiz -> O'ng):** Binary Search Tree'da elementlarni saralangan tartibda chiqarib beradi.
  3. **Post-order (Chap -> O'ng -> Ildiz):** O'chirish va xotirani bo'shatish amallarida (tagidan boshlab o'chirish) qulay.
  4. **Level-order (Kenglik bo'yicha - BFS):** Navbat (Queue) yordamida daraxtni qavatma-qavat aylanib chiqish.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Rekursiya davomida cheksiz aylanishga tushib qolish
Daraxtda chap yoki o'ng shoxni tekshirishda \`null\` bo'lish shartini yozmaslik dasturni Stack Overflow qiladi.
* **Tuzatish:** Har bir rekursiv metod boshida \`if (node === null) return;\` kabi to'xtash shartini yozish shart.

---

## 5. 💬 12 ta Intervyu Savollari

1. **Tree (Daraxt) ma'lumotlar tuzilmasi nima?**
   * *Javob:* Tugunlar (nodes) iyerarxik bog'langan chiziqli bo'lmagan ma'lumotlar strukturasi.
2. **Binary Tree (Ikkilik daraxt) nima?**
   * *Javob:* Har bir tugunning ko'pi bilan ikkita farzandi (chap va o'ng child) bo'lishi mumkin bo'lgan daraxt.
3. **In-order traversal algoritmi qanday ishlaydi?**
   * *Javob:* Chap shoxni aylanadi, keyin joriy (ildiz) tugunni oladi, keyin o'ng shoxga o'tadi.
4. **Pre-order va Post-order traversallarning asosiy farqi nimada?**
   * *Javob:* Pre-orderda ildiz tugun shoxlardan oldin qayta ishlanadi. Post-orderda esa ildiz shoxlar to'liq aylanib bo'lingach, eng oxirida olinadi.
5. **Daraxt balandligi (Height of a Tree) nima?**
   * *Javob:* Ildiz tugundan eng uzoqdagi barg tugungacha bo'lgan yo'ldagi shoxlar (edges) soni.
6. **Leaf Node (Barg tugun) nima?**
   * *Javob:* Hech qanday farzandi bo'lmagan (left === null && right === null) eng chekka tugun.
7. **Balanced Tree (Muvozanatlangan daraxt) nima?**
   * *Javob:* Ixtiyoriy tugunning chap va o'ng qism-daraxtlari balandliklari farqi ko'pi bilan 1 ga teng bo'lgan daraxt.
8. **Level-order traversal qanday amalga oshiriladi?**
   * *Javob:* Navbat (Queue) ma'lumotlar tuzilmasi yordamida har bir qavatdagi elementlar ketma-ket aylanib chiqiladi.
9. **Full Binary Tree va Complete Binary Tree farqi nima?**
   * *Javob:* Full Binary Tree-da har bir tugun 0 yoki 2 ta farzandga ega bo'ladi. Complete Binary Tree-da esa oxirgi qavatdan tashqari barcha qavatlar to'liq to'lgan bo'ladi.
10. **Daraxtdagi 'Depth' (Chuqurlik) nima?**
    * *Javob:* Ildiz tugundan berilgan joriy tugungacha bo'lgan yo'ldagi shoxlar soni.
11. **Daraxt aylanishlarida (DFS) xotira murakkabligi nima uchun O(H) bo'ladi?**
    * *Javob:* Rekursiv chaqiriqlar steki eng ko'pida daraxtning balandligi (H) darajasida Stack Frame saqlagani uchun.
12. **Daraxt va Graf (Graph) farqi nimada?**
    * *Javob:* Daraxt - bu sikli (yopiq aylanma yo'li) bo'lmagan va barcha tugunlari o'zaro bog'langan yo'naltirilmagan maxsus grafdir.

---

## 6. 🎨 Interaktiv Vizual

### Ikkilik Daraxt Aylanishlari (Traversals)
Tugunlarning bog'lanish ko'rinishi:

\`\`\`mermaid
graph TD
    Root((1 - Ildiz))
    Left((2 - Chap))
    Right((3 - O'ng))
    Root --> Left
    Root --> Right
    style Root fill:#e8f8f5,stroke:#27ae60,stroke-width:2px
    style Left fill:#ebf5fb,stroke:#2980b9,stroke-width:2px
    style Right fill:#fcf3cf,stroke:#f39c12,stroke-width:2px
\`\`\`

---

## 7. 🛠️ Amaliy Topshiriqlar

Mashqlar orqali daraxt algoritmlarini o'rganing.

---

## 8. 📝 12 ta Mini Test

Daraxtlar bo'yicha bilimingizni tekshiring.

---

## 9. 🚀 Performance va Optimization

- **Balandlikni nazorat qilish:** Balandligi $H$ bo'lgan daraxtda qidirish $O(H)$ vaqt oladi. Muvozanatlashmagan daraxtda bu $O(N)$ ga tushib qolishi mumkin. Iloji bo'lsa muvozanatlangan daraxtlardan foydalaning.

---

## 10. 📌 Cheat Sheet

| Aylanish turi | Tartibi | Qo'llanilishi | Murakkabligi |
| :--- | :--- | :--- | :--- |
| **Pre-Order** | Ildiz -> Chap -> O'ng | Daraxtni nusxalash / klonlash | O(N) vaqt, O(H) xotira |
| **In-Order** | Chap -> Ildiz -> O'ng | BST'da saralangan elementlar | O(N) vaqt, O(H) xotira |
| **Post-Order** | Chap -> O'ng -> Ildiz | Daraxtni o'chirish / Postfix | O(N) vaqt, O(H) xotira |
`,
  exercises: [
    {
      id: 1,
      title: "Daraxt Balandligini Topish (Height of Tree)",
      instruction: "Daraxt ildizi `root` berilgan. Rekursiv yordamida daraxtning umumiy balandligini (maksimal chuqurligini) hisoblaydigan `maxDepth(root)` funksiyasini yozing. Agar root `null` bo'lsa, balandlik `0` bo'lsin.",
      startingCode: "function maxDepth(root) {\n  // Kodni yozing\n}",
      hint: "Base case: `if (root === null) return 0;` Recursive step: `return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;`",
      test: "const sandbox = new Function(code + '; return maxDepth;'); const fn = sandbox(); const tree = { value: 1, left: { value: 2, left: null, right: null }, right: null }; if (fn(tree) === 2 && fn(null) === 0) return null; return 'Daraxt balandligi noto\\'g\\'ri hisoblandi';"
    },
    {
      id: 2,
      title: "Pre-order Aylanish (Pre-order Traversal)",
      instruction: "Ikkilik daraxt ildizi `root` berilgan. Elementlarni Pre-order (Ildiz -> Chap -> O'ng) tartibida aylanib, qiymatlarni massiv ko'rinishida qaytaradigan `preOrderTraversal(root)` funksiyasini yozing.",
      startingCode: "function preOrderTraversal(root) {\n  const res = [];\n  // Kodni yozing\n  return res;\n}",
      hint: "Yordamchi rekursiv funksiya yozing. U joriy node null bo'lmasa, avval `res.push(node.value)` qilib, keyin chap va o'ng shoxlarni chaqirsin.",
      test: "const sandbox = new Function(code + '; return preOrderTraversal;'); const fn = sandbox(); const tree = { value: 1, left: { value: 2, left: null, right: null }, right: { value: 3, left: null, right: null } }; const res = fn(tree); if (res && res[0] === 1 && res[1] === 2 && res[2] === 3) return null; return 'Pre-order aylanish xato natija berdi';"
    },
    {
      id: 3,
      title: "Level-order (Kenglik Bo'yicha) Aylanish",
      instruction: "Daraxt ildizi `root` berilgan. Navbat (Queue) yordamida Level-order (BFS) aylanishini amalga oshiring va elementlarni darajalar bo'yicha massiv qilib qaytaradigan `levelOrder(root)` funksiyasini yozing. Masalan: `[1, 2, 3]` ko'rinishida.",
      startingCode: "function levelOrder(root) {\n  if (!root) return [];\n  const res = [];\n  const queue = [root];\n  // Kodni yozing\n  return res;\n}",
      hint: "Queue bo'sh bo'lmaguncha loop ishlasin. `queue.shift()` orqali nodeni oling, uning value'sini resga qo'shing va chap/o'ng childlari bo'lsa queue'ga push qiling.",
      test: "const sandbox = new Function(code + '; return levelOrder;'); const fn = sandbox(); const tree = { value: 1, left: { value: 2, left: null, right: null }, right: { value: 3, left: null, right: null } }; const res = fn(tree); if (res && res[0] === 1 && res[1] === 2 && res[2] === 3) return null; return 'Level-order aylanish xato ishladi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Daraxt (Tree) ma'lumotlar tuzilmasining root (ildiz) tuguni nima?",
      options: [
        "Hech qanday farzandi bo'lmagan barg tugun",
        "Daraxtning eng yuqori darajasida turgan va ota (parent) tuguni bo'lmagan asosiy tugun",
        "Daraxtning o'rtasidagi tugun",
        "Chap shoxning oxirgi elementi"
      ],
      correctAnswer: 1,
      explanation: "Root - shajara yoki daraxtning eng yuqoridagi eng birinchi boshlang'ich tuguni bo'lib, uning ota tuguni mavjud bo'lmaydi."
    },
    {
      id: 2,
      question: "Complete Binary Tree deganda nimani tushunasiz?",
      options: [
        "Barcha barglari har xil sathda bo'lgan daraxt",
        "Oxirgi darajadan tashqari barcha sathlar to'liq to'ldirilgan va oxirgi sath elementlari iloji boricha chap tomonda joylashgan daraxt",
        "Faqat bitta farzandi bor tugunlar to'plami",
        "Butunlay bo'sh daraxt"
      ],
      correctAnswer: 1,
      explanation: "Complete Binary Tree oxirgi sathgacha to'liq to'ladi va oxirgi sathdagilar chapdan o'ngga qarab joylashadi."
    },
    {
      id: 3,
      question: "In-order traversal (Chap -> Ildiz -> O'ng) bo'yicha quyidagi daraxt aylanish natijasi qanday bo'ladi: Ildiz(1), Chap(2), O'ng(3)?",
      options: [
        "[1, 2, 3]",
        "[2, 1, 3]",
        "[3, 2, 1]",
        "[2, 3, 1]"
      ],
      correctAnswer: 1,
      explanation: "In-order tartibida avval chap shox (2), keyin ildiz (1) va oxirida o'ng shox (3) aylaniladi, natija: [2, 1, 3]."
    },
    {
      id: 4,
      question: "Daraxt balandligi (Height) nima?",
      options: [
        "Daraxtdagi jami barglar soni",
        "Ildizdan eng uzoqdagi barg tugungacha bo'lgan eng uzun yo'ldagi shoxlar (edges) soni",
        "Koddagi funksiyalar soni",
        "Daraxtdagi jami elementlar soni"
      ],
      correctAnswer: 1,
      explanation: "Height - ildizdan boshlab eng chuqur joylashgan barg tugungacha bo'lgan masofa yoki qadamlar sonidir."
    },
    {
      id: 5,
      question: "Daraxtda 'Leaf' (Barg) node nima?",
      options: [
        "Ildiz tugun",
        "Hech qanday farzandlari bo'lmagan (left === null && right === null) chetki tugun",
        "Daraxtning o'rtasidagi tugun",
        "Xatoliklarni ushlovchi funksiya"
      ],
      correctAnswer: 1,
      explanation: "Leaf - daraxtning eng chekkasida turgan shoxlanish tugagan va farzandsiz tugundir."
    },
    {
      id: 6,
      question: "Binary Search Tree'da (BST) in-order traversal ishlatilsa, elementlar qanday tartibda chiqadi?",
      options: [
        "Tasodifiy tartibda",
        "O'sish tartibida saralangan holda",
        "Kamayish tartibida",
        "Faqat manfiy sonlar birinchi chiqadi"
      ],
      correctAnswer: 1,
      explanation: "BST xususiyatiga ko'ra, chap tomon kichik, o'ng tomon katta qiymatlarni saqlaydi. In-order (Chap -> Ildiz -> O'ng) aylanish esa bu elementlarni o'sish tartibida saralab beradi."
    },
    {
      id: 7,
      question: "Post-order traversal tartibi qanday?",
      options: [
        "Ildiz -> Chap -> O'ng",
        "Chap -> O'ng -> Ildiz",
        "Chap -> Ildiz -> O'ng",
        "Ildiz -> O'ng -> Chap"
      ],
      correctAnswer: 1,
      explanation: "Post-order aylanishda avval chap va o'ng qismlar to'liq tugatilib, joriy ildiz eng oxirida olinadi."
    },
    {
      id: 8,
      question: "Daraxtni kenglik bo'yicha aylanish (BFS / Level-order) qaysi ma'lumotlar tuzilmasiga tayanadi?",
      options: [
        "Stek (Stack)",
        "Navbat (Queue)",
        "Xesh-jadval",
        "Graf"
      ],
      correctAnswer: 1,
      explanation: "Level-order (BFS) aylanish qavatma-qavat borish uchun FIFO xususiyatiga ega bo'lgan Navbat (Queue) tuzilmasidan foydalanadi."
    },
    {
      id: 9,
      question: "Pre-order traversal tartibi qanday?",
      options: [
        "Ildiz -> Chap -> O'ng",
        "Chap -> Ildiz -> O'ng",
        "Chap -> O'ng -> Ildiz",
        "O'ng -> Ildiz -> Chap"
      ],
      correctAnswer: 0,
      explanation: "Pre-orderda ildiz eng birinchi olinadi, keyin chap va o'ng shoxlarga chuqurlashiladi."
    },
    {
      id: 10,
      question: "Balanced Binary Tree (Muvozanatlangan daraxt) nima?",
      options: [
        "Faqat bitta shoxdan iborat daraxt",
        "Ixtiyoriy tugun uchun uning chap va o'ng qism-daraxtlari balandliklari farqi ko'pi bilan 1 ga teng bo'lgan daraxt",
        "Barcha barglari chapda joylashgan daraxt",
        "Faqat juft sonli tugunlari bor daraxt"
      ],
      correctAnswer: 1,
      explanation: "Muvozanatli daraxtlarda chap va o'ng tomonlar balandligi deyarli teng saqlanadi, bu esa qidiruvni tezkor O(log N) bo'lishini ta'minlaydi."
    },
    {
      id: 11,
      question: "Daraxt balandligi H bo'lsa, rekursiv DFS traversallarning Space Complexity'si nega O(H) bo'ladi?",
      options: [
        "Chunki u butun daraxtni nusxalaydi",
        "Chunki rekursiya davomida chaqiriqlar steki (Call Stack) maksimal daraxt balandligi darajasida faol ramkalarni saqlab turadi",
        "Chunki H har doim N ga teng",
        "Xotira ishlatmaydi"
      ],
      correctAnswer: 1,
      explanation: "DFS rekursiyasi ildizdan barggacha chuqurlikka kirganda stek xotirada eng ko'pida o'sha yo'ldagi tugunlar sonicha (balandlik H) chaqiriqlar saqlanadi."
    },
    {
      id: 12,
      question: "Daraxt (Tree) va Graf (Graph) o'rtasidagi asosiy farq nima?",
      options: [
        "Daraxt faqat sonlarni saqlaydi",
        "Daraxt - bu sikl (aylanma yo'llar) mavjud bo'lmagan va barcha tugunlari bog'langan maxsus yo'naltirilmagan grafdir",
        "Grafda shoxlar bo'lmaydi",
        "Ular mutlaqo bir xil narsa"
      ],
      correctAnswer: 1,
      explanation: "Daraxt - bu siklsiz bog'langan grafning xususiy ko'rinishidir. Grafda esa aylanma sikllar bo'lishi mumkin va ildiz tushunchasi bo'lmaydi."
    }
  ]
};
