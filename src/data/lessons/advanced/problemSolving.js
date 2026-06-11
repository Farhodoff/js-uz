export const problemSolving = {
  id: "problem-solving",
  title: "Muammolarni Yechish va Algoritmlar (Problem Solving & Algorithms)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

Muammolarni dasturlash orqali hal qilish (Problem Solving) va samarali algoritmlarni tanlash har qanday dasturchining eng muhim ko'nikmasidir. Dastur nafaqat to'g'ri ishlashi, balki tez va kam resurs (xotira) sarflagan holda ishlashi lozim. Ushbu darsda biz intervyularda eng ko'p so'raladigan algoritmlar, ma'lumotlar tuzilmalari va murakkab masalalarni bosqichma-bosqich yechish usullarini o'rganamiz.

Tasavvur qiling, sizga **minglab kitoblar** aralashib yotgan kutubxonadan bitta kitobni topish topshirildi.
1. Agar kitoblarni birma-bir tekshirib chiqsangiz (Chiziqli qidiruv - Linear Search), bu juda ko'p vaqt oladi.
2. Agar kitoblar alifbo tartibida joylashtirilgan bo'lsa, siz kitob javonini o'rtasidan ochib, qidirayotgan kitobingiz qaysi tomonda ekanligini aniqlaysiz va qolgan yarmini chetga surasiz. Keyin yana o'rtasidan ochib qidirasiz (Binar qidiruv - Binary Search). Bu kitobni juda tez topish imkonini beradi.

Algoritmlar — bu kutubxonadagi kitoblarni tartibga solish va ularni eng tez topish yo'llaridir.

---

## 2. 💻 Real Kod Misollari

Mavzuga oid amaliy kod misollari.

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### A. Massivlar va Obyektlar (Arrays & Objects in Problem Solving)
Masalalarni yechishda ma'lumotlarni saqlash va ulardan foydalanish tezligi juda muhimdir.
- **Massivlar (Arrays):** Tartiblangan ma'lumotlar to'plami. Indeks orqali elementga murojaat qilish tezligi: O(1). Ammo qidirish yoki boshiga element qo'shish O(N) vaqt oladi.
- **Obyektlar (Objects / Hash Maps):** Kalit-qiymat (Key-Value) juftligi. Kalit orqali qiymatni topish, qo'shish va o'chirish o'rtacha O(1) vaqt oladi. Bu xususiyat ko'p hollarda nested loop (ichma-ich tsikl) orqali yozilgan O(N^2) kodlarni O(N) ga tushirishga yordam beradi.

### B. Two Pointers (Ikki ko'rsatkich) Texnikasi
Saralangan massivlarda qidiruv qilishni optimallashtirish uchun ikki tomondan (boshi va oxiri) ko'rsatkichlar qo'yib tekshiriladi.
\`\`\`javascript
function hasPairWithSum(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    const sum = arr[left] + arr[right];
    if (sum === target) return true;
    if (sum < target) left++;
    else right--;
  }
  return false;
}
\`\`\`

### C. Sliding Window (Sirpanuvchi oyna) Texnikasi
Ketma-ket sub-array yig'indilarini dynamic hisoblashda ishlatiladi. Har safar oynadan chiquvchi eski qiymat ayirib tashlanadi va yangi kiruvchi qiymat qo'shiladi.

\`\`\`mermaid
graph LR
    %% Styling
    classDef windowStyle fill:#3498db,stroke:#fff,stroke-width:2px,color:#fff;
    classDef normalStyle fill:#95a5a6,stroke:#fff,stroke-width:1px,color:#fff;
    
    subgraph Step_1 ["1-qadam: Oyna boshida (k = 3)"]
        A1["[ 1 ]"]:::windowStyle
        A2["[ 2 ]"]:::windowStyle
        A3["[ 5 ]"]:::windowStyle
        A4["[ 2 ]"]:::normalStyle
        A5["[ 8 ]"]:::normalStyle
    end

    subgraph Step_2 ["2-qadam: Oyna siljiganda (k = 3)"]
        B1["[ 1 ]"]:::normalStyle
        B2["[ 2 ]"]:::windowStyle
        B3["[ 5 ]"]:::windowStyle
        B4["[ 2 ]"]:::windowStyle
        B5["[ 8 ]"]:::normalStyle
    end
\`\`\`

### D. Rekursiya va Memoization (Kesh-optimallashtirish)
Rekursiv funksiyalar keraksiz takroriy chaqiruvlarni chetlab o'tish uchun kesh orqali tezlashtiriladi (Memoization).

\`\`\`mermaid
graph TD
    %% Styling
    classDef compStyle fill:#e74c3c,stroke:#fff,color:#fff;
    classDef cachedStyle fill:#2ecc71,stroke:#fff,color:#fff;

    F5["fib(5)"]:::compStyle
    F5 --> F4["fib(4)"]:::compStyle
    F5 --> F3_cached["fib(3) - Cached"]:::cachedStyle
    
    F4 --> F3["fib(3)"]:::compStyle
    F4 --> F2_cached["fib(2) - Cached"]:::cachedStyle
    
    F3 --> F2["fib(2)"]:::compStyle
    F3 --> F1["fib(1)"]:::compStyle
\`\`\`

\`\`\`javascript
function fibMemo(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  return memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
}
\`\`\`

### E. Qidiruv va Saralash algoritmlari
- **Linear Search (Chiziqli qidiruv):** Massiv elementlarini boshidan boshlab birma-bir tekshiradi. Vaqt murakkabligi: O(N).
- **Binary Search (Binar qidiruv):** Faqat tartiblangan massivlarda o'rtadagi elementdan foydalanib ishlaydi. Vaqt murakkabligi: O(log N).
- **Bubble Sort (Pufakchali saralash):** Qo'shni elementlarni solishtirib, noto'g'ri bo'lsa joyini almashtiradi. Vaqt murakkabligi: O(N^2).

### F. Ma'lumotlar Tuzilmalari Asoslari
- **Stack (Stek):** LIFO (Last In, First Out) tamoyili.
- **Queue (Navbat):** FIFO (First In, First Out) tamoyili.
- **Linked List (Bog'langan ro'yxat):** Har bir element (Node) o'zida qiymat va keyingi elementga ishora (next) ni saqlaydi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

1. **Rekursiyada to'xtash sharti (Base Case) bo'lmasligi:** Bu brauzerda \`Maximum call stack size exceeded\` xatosiga olib keladi.
2. **Binary Search-ni tartiblanmagan massivda ishlatish:** Binary search faqat va faqat saralangan (sorted) massivlar uchun to'g'ri natija beradi.
3. **Massivlarni solishtirishda to'g'ridan-to'g'ri tenglik ishlatish:** \`[1,2] === [1,2]\` har doim \`false\` beradi.

---

## 5. 💬 12 ta Intervyu Savollari

**1. Algoritmning vaqt murakkabligi (Time Complexity) nima?**
Bu algoritm bajarilishi uchun ketadigan vaqtning kiruvchi ma'lumotlar hajmi (N) o'sishiga qanday bog'liqligini ko'rsatadigan o'lchovdir (Big O notation yordamida ifodalanadi).

**2. Rekursiyaning afzalligi va kamchiligi nimada?**
Afzalligi — kodning qisqa va tushunarli bo'lishi. Kamchiligi — har bir chaqiruv xotiradan (call stack) joy olgani uchun xotira sarfi yuqoriligi va sekinroq ishlashidir.

**3. Binary Search qanday ishlaydi?**
Tartiblangan massivning o'rtasidagi element olinadi. Agar maqsadli qiymat o'rtadagi elementdan kichik bo'lsa, qidiruv chap yarimda, katta bo'lsa o'ng yarimda davom ettiriladi.

**4. Stek (Stack) va Navbat (Queue) farqi nima?**
Stek LIFO (oxirgi kirgan birinchi chiqadi) tamoyilida ishlaydi. Navbat esa FIFO (birinchi kirgan birinchi chiqadi) tamoyilida ishlaydi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Amaliy mashqlar quyida exercises bo'limida berilgan. Ularni bajarib ko'nikmalaringizni sinab ko'ring.

---

## 7. 📝 12 ta Mini Test

Dars oxirida quizzes bo'limidagi testlar orqali bilimingizni tekshirib oling.

---

## 8. 🎯 Real Project Case Study

### Case Study: Optimal Substring Search (Sliding Window)
Ketma-ket sub-array yig'indisini dynamic hisoblashda Sliding Window texnikasi O(N^2) dan O(N) ga tushiradi:
\`\`\`javascript
function maxSubArray(arr, k) {
  let maxSum = 0, tempSum = 0;
  for(let i=0; i<k; i++) maxSum += arr[i];
  tempSum = maxSum;
  for(let i=k; i<arr.length; i++) {
    tempSum = tempSum - arr[i-k] + arr[i];
    maxSum = Math.max(maxSum, tempSum);
  }
  return maxSum;
}
\`\`\`

---

## 9. 🧠 Vizual ko'rinish (Architecture Diagram)

\`\`\`mermaid
graph LR
    Left[Left Pointer (0)] -->|Yig'indi kichik bo'lsa o'ngga suriladi| Target
    Right[Right Pointer (N-1)] -->|Yig'indi katta bo'lsa chapga suriladi| Target
\`\`\`

---

## 10. 📌 Cheat Sheet

| Algoritm | Vaqt Murakkabligi | Qachon ishlatiladi |
| :--- | :--- | :--- |
| **Binary Search** | O(log N) | Saralangan massivda qidirishda |
| **Linear Search** | O(N) | Saralanmagan massivda qidirishda |
| **Bubble Sort** | O(N^2) | Oddiy saralash ishlarida |
`,
  exercises: [
    {
      id: 1,
      title: "Ikki son yig'indisi (Two Sum)",
      instruction: "Berilgan tartiblangan massiv `nums` va maqsadli son `target` berilgan. Yig'indisi `target` ga teng bo'lgan ikkita sonning indekslarini massiv ko'rinishida qaytaruvchi `twoSum(nums, target)` funksiyasini yozing. (Faqat bitta yechim bor deb hisoblang).",
      startingCode: "function twoSum(nums, target) {\n  // Kodni shu yerga yozing\n}\n",
      hint: "Ikki ko'rsatkich (two pointers) usulidan foydalaning. left = 0 va right = nums.length - 1 deb oling.",
      test: "const res1 = twoSum([2, 7, 11, 15], 9);\nconst res2 = twoSum([1, 3, 4, 6, 8, 10], 10);\nif (Array.isArray(res1) && res1[0] === 0 && res1[1] === 1 && Array.isArray(res2) && res2[0] === 2 && res2[1] === 3) return null;\nreturn \"twoSum funksiyasi to'g'ri ishlamadi yoki indekslarni noto'g'ri qaytardi.\";"
    },
    {
      id: 2,
      title: "Anagramani aniqlash",
      instruction: "Ikkita string `s` va `t` berilgan. Agar `t` string `s` ning anagrammasi (bir xil harflardan tashkil topgan, tartibi har xil bo'lgan so'z) bo'lsa `true`, aks holda `false` qaytaruvchi `isAnagram(s, t)` funksiyasini yozing.",
      startingCode: "function isAnagram(s, t) {\n  // Kodni shu yerga yozing\n}\n",
      hint: "Ikkala stringdagi harflar sonini hisoblash uchun obyekt (frequency map) ishlating yoki ularni saralab solishtiring.",
      test: "if (isAnagram(\"anagram\", \"nagaram\") === true && isAnagram(\"rat\", \"car\") === false && isAnagram(\"a\", \"ab\") === false) return null;\nreturn \"isAnagram funksiyasi anagrammalarni noto'g'ri aniqladi.\";"
    },
    {
      id: 3,
      title: "Fibonachchi soni (Rekursiya)",
      instruction: "Rekursiya yordamida n-chi Fibonachchi sonini hisoblovchi `fibonacci(n)` funksiyasini yozing. Masalan, n=0 bo'lsa 0, n=1 bo'lsa 1, n=2 bo'lsa 1, n=3 bo'lsa 2 va hokazo. (n >= 0)",
      startingCode: "function fibonacci(n) {\n  // Kodni shu yerga yozing\n}\n",
      hint: "Base case: agar n < 2 bo'lsa, n ning o'zini qaytaring. Aks holda fibonacci(n-1) + fibonacci(n-2) ni qaytaring.",
      test: "if (fibonacci(0) === 0 && fibonacci(1) === 1 && fibonacci(6) === 8) {\n  if (code.includes(\"fibonacci\") && (code.match(/fibonacci/g) || []).length >= 2) {\n    return null;\n  }\n  return \"Funksiya rekursiv bo'lishi shart!\";\n}\nreturn \"Fibonachchi soni noto'g'ri hisoblandi.\";"
    },
    {
      id: 4,
      title: "Rekursiv Yig'indi",
      instruction: "Berilgan sonli massiv elementlarining yig'indisini rekursiv tarzda hisoblaydigan `recursiveSum(arr)` funksiyasini yozing. Loop (for, while) yoki `reduce` ishlatish taqiqlanadi!",
      startingCode: "function recursiveSum(arr) {\n  // Kodni shu yerga yozing\n}\n",
      hint: "Base case: agar massiv uzunligi 0 bo'lsa, 0 qaytaring. Aks holda birinchi elementni massivning qolgan qismi yig'indisiga qo'shing: arr[0] + recursiveSum(arr.slice(1)).",
      test: "if (code.includes(\"for\") || code.includes(\"while\") || code.includes(\"reduce\")) {\n  return \"Loop (for, while) yoki reduce ishlatish mumkin emas! Faqat rekursiya.\";\n}\nif (recursiveSum([1, 2, 3, 4]) === 10 && recursiveSum([]) === 0 && recursiveSum([5]) === 5) return null;\nreturn \"recursiveSum to'g'ri yig'indi qaytarmadi.\";"
    },
    {
      id: 5,
      title: "Chiziqli qidiruv (Linear Search)",
      instruction: "Berilgan obyektlar massivi `arr` ichidan ma'lum bir `key` xususiyati bo'yicha `value` qiymatga ega bo'lgan birinchi obyektning indeksini qaytaruvchi `linearSearch(arr, key, value)` funksiyasini yozing. Agar topilmasa `-1` qaytarsin.",
      startingCode: "function linearSearch(arr, key, value) {\n  // Kodni shu yerga yozing\n}\n",
      hint: "Massiv bo'ylab oddiy tsikl aylaning va item[key] === value ekanini tekshiring.",
      test: "const list = [{id: 1, name: 'Ali'}, {id: 2, name: 'Vali'}, {id: 3, name: 'Ali'}];\nif (linearSearch(list, 'name', 'Vali') === 1 && linearSearch(list, 'id', 3) === 2 && linearSearch(list, 'name', 'Hasan') === -1) return null;\nreturn \"linearSearch funksiyasi obyektni to'g'ri qidira olmadi.\";"
    },
    {
      id: 6,
      title: "Binar qidiruv (Binary Search)",
      instruction: "O'sib borish tartibida joylashgan massiv `arr` va qidirilayotgan son `target` berilgan. Binary Search (ikki bo'lish qidiruvi) yordamida `target` ning indeksini qaytaruvchi `binarySearch(arr, target)` funksiyasini yozing. Agar qiymat massivda bo'lmasa `-1` qaytarsin.",
      startingCode: "function binarySearch(arr, target) {\n  // Kodni shu yerga yozing\n}\n",
      hint: "Chap (low) va o'ng (high) chegaralarni belgilab, o'rtadagi element (mid) targetdan kichik yoki kattaligiga qarab chegaralarni toraytiring.",
      test: "const sorted = [1, 3, 5, 7, 9, 11, 13];\nif (binarySearch(sorted, 7) === 3 && binarySearch(sorted, 1) === 0 && binarySearch(sorted, 13) === 6 && binarySearch(sorted, 4) === -1) return null;\nreturn \"binarySearch algoritmi to'g'ri ishlamadi.\";"
    },
    {
      id: 7,
      title: "Pufakchali saralash (Bubble Sort)",
      instruction: "Berilgan tartibsiz sonlar massivini o'sib borish tartibida pufakchali saralash (Bubble Sort) yordamida saralab, saralangan massivni qaytaruvchi `bubbleSort(arr)` funksiyasini yozing.",
      startingCode: "function bubbleSort(arr) {\n  // Kodni shu yerga yozing\n}\n",
      hint: "Ikkita ichma-ich for tsikli yozing. Agar qo'shni elementlar noto'g'ri tartibda bo'lsa (arr[j] > arr[j+1]), ularning joyini almashtiring (swap).",
      test: "const sorted = bubbleSort([5, 3, 8, 4, 2]);\nif (Array.isArray(sorted) && sorted.join(\",\") === \"2,3,4,5,8\") return null;\nreturn \"bubbleSort funksiyasi massivni to'g'ri saralamadi.\";"
    },
    {
      id: 8,
      title: "Palindrom tekshiruvi",
      instruction: "Berilgan string `str` palindrom (chapdan ham, o'ngdan ham bir xil o'qiladigan so'z yoki gap) ekanligini tekshiruvchi `isPalindrome(str)` funksiyasini yozing. Bo'shliqlar, tinish belgilari va harflar registri (katta-kichikligi) inobatga olimasligi kerak.",
      startingCode: "function isPalindrome(str) {\n  // Kodni shu yerga yozing\n}\n",
      hint: "Regex yordamida faqat harf va sonlarni saqlab qoling: str.toLowerCase().replace(/[^a-z0-9]/g, ''), keyin uni teskarisi bilan solishtiring.",
      test: "if (isPalindrome(\"A man, a plan, a canal: Panama\") === true && isPalindrome(\"race a car\") === false && isPalindrome(\"Abba\") === true) return null;\nreturn \"isPalindrome gaplarni palindromlikka to'g'ri tekshira olmadi.\";"
    },
    {
      id: 9,
      title: "FizzBuzz",
      instruction: "Berilgan musbat butun son `n` gacha bo'lgan sonlar massivini qaytaradigan `fizzBuzz(n)` funksiyasini yozing. Bunda: 3 ga bo'linadigan sonlar o'rniga 'Fizz', 5 ga bo'linadigan sonlar o'rniga 'Buzz', ham 3 ga ham 5 ga bo'linadigan sonlar o'rniga esa 'FizzBuzz' yozilishi lozim.",
      startingCode: "function fizzBuzz(n) {\n  // Kodni shu yerga yozing\n}\n",
      hint: "1 dan n gacha tsikl aylantiring. % 3 === 0 && % 5 === 0 tekshiruvidan boshlang.",
      test: "const res = fizzBuzz(15);\nif (Array.isArray(res) && res[2] === \"Fizz\" && res[4] === \"Buzz\" && res[14] === \"FizzBuzz\" && res[0] === 1) return null;\nreturn \"fizzBuzz funksiyasi kutilgan massivni qaytarmadi.\";"
    },
    {
      id: 10,
      title: "Stek (Stack) tuzilmasi",
      instruction: "LIFO (Last In First Out) tamoyili asosida ishlaydigan `Stack` klassini yozing. U quyidagi metodlarga ega bo'lik bo'lishi shart:\n- `push(element)`: element qo'shish\n- `pop()`: oxirgi elementni o'chirish va qaytarish (stek bo'sh bo'lsa null yoki undefined qaytarsin)\n- `peek()`: oxirgi elementni ko'rish (o'chirmasdan)\n- `isEmpty()`: stek bo'shligini tekshirish (true/false)",
      startingCode: "class Stack {\n  constructor() {\n    this.items = [];\n  }\n\n  push(element) {\n    // Kodni yozing\n  }\n\n  pop() {\n    // Kodni yozing\n  }\n\n  peek() {\n    // Kodni yozing\n  }\n\n  isEmpty() {\n    // Kodni yozing\n  }\n}\n",
      hint: "this.items massividan va uning push, pop metodlaridan foydalaning. peek uchun this.items[this.items.length - 1] ni ishlating.",
      test: "const stack = new Stack();\nif (!stack.isEmpty()) return \"Boshlanishida stack bo'sh bo'lishi kerak.\";\nstack.push(10);\nstack.push(20);\nif (stack.peek() !== 20) return \"peek() oxirgi qo'shilgan elementni qaytarishi kerak.\";\nif (stack.pop() !== 20 || stack.pop() !== 10) return \"LIFO tartibida elementlar pop qilinishi kerak.\";\nif (!stack.isEmpty()) return \"Barcha elementlar olingach stack bo'sh bo'lishi kerak.\";\nreturn null;"
    },
    {
      id: 11,
      title: "Navbat (Queue) tuzilmasi",
      instruction: "FIFO (First In First Out) tamoyili asosida ishlaydigan `Queue` klassini yarating. U quyidagi metodlarga ega bo'lishi lozim:\n- `enqueue(element)`: navbat oxiriga element qo'shish\n- `dequeue()`: navbat boshidagi elementni o'chirish va qaytarish (bo'sh bo'lsa null/undefined)\n- `peek()`: navbat boshidagi elementni o'chirmasdan ko'rish\n- `isEmpty()`: navbat bo'shligini tekshirish",
      startingCode: "class Queue {\n  constructor() {\n    this.items = [];\n  }\n\n  enqueue(element) {\n    // Kodni yozing\n  }\n\n  dequeue() {\n    // Kodni yozing\n  }\n\n  peek() {\n    // Kodni yozing\n  }\n\n  isEmpty() {\n    // Kodni yozing\n  }\n}\n",
      hint: "enqueue uchun this.items.push(element) va dequeue uchun this.items.shift() dan foydalanishingiz mumkin.",
      test: "const queue = new Queue();\nif (!queue.isEmpty()) return \"Boshlanishida navbat bo'sh bo'lishi kerak.\";\nqueue.enqueue(10);\nqueue.enqueue(20);\nif (queue.peek() !== 10) return \"peek() navbat boshidagi elementni qaytarishi kerak.\";\nif (queue.dequeue() !== 10 || queue.dequeue() !== 20) return \"FIFO tartibida elementlar dequeue qilinishi kerak.\";\nif (!queue.isEmpty()) return \"Queue bo'sh bo'lishi kerak.\";\nreturn null;"
    },
    {
      id: 12,
      title: "Bog'langan ro'yxat (Linked List)",
      instruction: "Sodda bog'langan ro'yxat (Linked List) yaratish uchun `Node` klassini va `LinkedList` klassini yozing. `LinkedList` klassida `head` (boshlang'ich node, default null) va quyidagi metodlar bo'lishi kerak:\n- `append(value)`: ro'yxat oxiriga yangi Node qo'shish.\n- `toArray()`: barcha node qiymatlarini massiv ko'rinishida qaytarish.\nHar bir Node obyekti `value` va `next` (default null) xususiyatlariga ega bo'lishi kerak.",
      startingCode: "class Node {\n  constructor(value) {\n    this.value = value;\n    this.next = null;\n  }\n}\n\nclass LinkedList {\n  constructor() {\n    this.head = null;\n  }\n\n  append(value) {\n    // Kodni yozing\n  }\n\n  toArray() {\n    // Kodni yozing\n  }\n}\n",
      hint: "append metodida agar head === null bo'lsa, head = new Node(value) qiling. Aks holda oxirgi nodegacha borib (current.next !== null tsikli orqali), uning nextiga vaqtinchalik node biriktiring.",
      test: "const list = new LinkedList();\nlist.append(1);\nlist.append(2);\nlist.append(3);\nconst arr = list.toArray();\nif (Array.isArray(arr) && arr.join(\",\") === \"1,2,3\") {\n  if (list.head && list.head.value === 1 && list.head.next && list.head.next.value === 2) {\n    return null;\n  }\n  return \"Bog'langan ro'yxat strukturasida bog'liqliklar to'g'ri o'rnatilmagan.\";\n}\nreturn \"toArray() metodi to'g'ri massiv qaytarmadi.\";"
    },
    {
      id: 13,
      title: "Sliding Window - Maksimal yig'indi",
      instruction: "Sirpanuvchi oyna (Sliding Window) texnikasi yordamida massivdagi ketma-ket `k` ta elementning maksimal yig'indisini O(N) vaqt murakkabligida aniqlaydigan `maxSubArraySum(arr, k)` funksiyasini yozing. (Agar `arr.length < k` bo'lsa, `0` qaytaring).",
      startingCode: "function maxSubArraySum(arr, k) {\n  // k ta ketma-ket elementlarning maksimal yig'indisini toping\n}",
      hint: "if (arr.length < k) return 0;\nlet maxSum = 0, tempSum = 0;\nfor (let i = 0; i < k; i++) maxSum += arr[i];\ntempSum = maxSum;\nfor (let i = k; i < arr.length; i++) {\n  tempSum = tempSum - arr[i - k] + arr[i];\n  maxSum = Math.max(maxSum, tempSum);\n}\nreturn maxSum;",
      test: "if (maxSubArraySum([1, 2, 5, 2, 8, 1, 5], 3) === 15 && maxSubArraySum([4, 2, 1, 6], 1) === 6 && maxSubArraySum([4, 2, 1, 6], 5) === 0) return null;\nreturn 'maxSubArraySum to\\'g\\'ri yig\\'indi qaytarmadi yoki O(N) ishlatilmadi';"
    },
    {
      id: 14,
      title: "Deep Object Comparison",
      instruction: "Ikkita obyekt yoki massivni ularning barcha ichki nested qiymatlari va tuzilishi jihatidan chuqur (deep) solishtiruvchi `deepEqual(a, b)` rekursiv funksiyasini yozing.",
      startingCode: "function deepEqual(a, b) {\n  // a va b obyektlari chuqur tengligini tekshiring\n}",
      hint: "if (a === b) return true;\nif (typeof a !== 'object' || a === null || typeof b !== 'object' || b === null) return false;\nconst keysA = Object.keys(a), keysB = Object.keys(b);\nif (keysA.length !== keysB.length) return false;\nfor (let key of keysA) {\n  if (!keysB.includes(key) || !deepEqual(a[key], b[key])) return false;\n}\nreturn true;",
      test: "if (deepEqual({a: 1, b: {c: 2}}, {a: 1, b: {c: 2}}) === true && deepEqual({a: 1}, {a: 2}) === false) return null;\nreturn 'deepEqual funksiyasi obyektlarni chuqur solishtira olmadi';"
    }
  ],
  quizzes: [
  {
    "id": 1,
    "question": "Massiv elementiga indeks orqali to'g'ridan-to'g'ri murojaat qilishning vaqt murakkabligi (Time Complexity) qanday?",
    "options": [
      "O(1)",
      "O(log N)",
      "O(N)",
      "O(N^2)"
    ],
    "correctAnswer": 0,
    "explanation": "Massivlar xotirada ketma-ket joylashganligi sababli, indeks orqali elementni o'qish xotira manzilini hisoblash yordamida to'g'ridan-to'g'ri va bir zumda amalga oshiriladi, ya'ni O(1) vaqt oladi."
  },
  {
    "id": 2,
    "question": "Obyektlarde (Hash Map) kalit bo'yicha qiymatni qidirish, qo'shish va o'chirishning o'rtacha vaqt murakkabligi qanday?",
    "options": [
      "O(N)",
      "O(log N)",
      "O(1)",
      "O(N log N)"
    ],
    "correctAnswer": 2,
    "explanation": "Obyektlar kalitlarni maxsus xesh-funksiya yordamida to'g'ridan-to'g'ri xotira indeksiga aylantiradi, shuning uchun o'rtacha holatda barcha amallar O(1) tezlikda bajariladi."
  },
  {
    "id": 3,
    "question": "Binary Search algoritmining eng muhim sharti nima?",
    "options": [
      "Massiv faqat musbat sonlardan iborat bo'lishi kerak",
      "Massiv tartiblangan (saralangan) bo'lishi kerak",
      "Massiv uzunligi juft son bo'lishi kerak",
      "Massivda takrorlanuvchi elementlar bo'lmasligi kerak"
    ],
    "correctAnswer": 1,
    "explanation": "Binary Search har safar o'rtadagi elementni solishtirib, qidiruv doirasini ikki qismga bo'lishga tayanadi. Bu printsip faqat massiv elementlari tartiblangan (sorted) bo'lgandagina to'g'ri ishlaydi."
  },
  {
    "id": 4,
    "question": "Rekursiv funksiyada 'Base Case' (to'xtash sharti) bo'lmasa nima sodir bo'ladi?",
    "options": [
      "Funksiya avtomatik ravishda loop-ga aylanadi",
      "Kompilyatsiya xatosi yuz beradi",
      "Stack Overflow (chaqiriqlar stekining to'lib ketishi) xatosi yuz beradi",
      "Funksiya faqat bir marta ishlab to'xtaydi"
    ],
    "correctAnswer": 2,
    "explanation": "To'xtash sharti bo'lmasa, funksiya o'zini cheksiz ravishda chaqiraveradi, bu esa Call Stack xotirasini to'ldirib, 'Maximum call stack size exceeded' xatosiga sabab bo'ladi."
  },
  {
    "id": 5,
    "question": "Stek (Stack) ma'lumotlar tuzilmasi qaysi tamoyil asosida ishlaydi?",
    "options": [
      "FIFO (First In, First Out)",
      "LIFO (Last In, First Out)",
      "LILO (Last In, Last Out)",
      "Random Access"
    ],
    "correctAnswer": 1,
    "explanation": "Stek LIFO (oxirgi kirgan, birinchi chiqadi) printsipida ishlaydi. Unga eng oxirgi qo'shilgan element birinchi bo'lib qaytarib olinadi."
  },
  {
    "id": 6,
    "question": "Navbat (Queue) ma'lumotlar tuzilmasi qaysi tamoyil asosida ishlaydi?",
    "options": [
      "LIFO (Last In, First Out)",
      "FIFO (First In, First Out)",
      "Random Access",
      "Key-Value Access"
    ],
    "correctAnswer": 1,
    "explanation": "Navbat FIFO (birinchi kirgan, birinchi chiqadi) printsipida ishlaydi. Xuddi real hayotdagi do'kon navbati kabi, birinchi kelgan odamga birinchi xizmat ko'rsatiladi."
  },
  {
    "id": 7,
    "question": "Bubble Sort algoritmining o'rtacha va eng yomon holatdagi vaqt murakkabligi qanday?",
    "options": [
      "O(N log N)",
      "O(N)",
      "O(N^2)",
      "O(1)"
    ],
    "correctAnswer": 2,
    "explanation": "Bubble sort har bir elementni o'zidan keyingi element bilan solishtirish uchun ichma-ich ikkita loop ishlatadi. Shuning uchun uning o'rtacha va eng yomon vaqt murakkabligi O(N^2) ga teng."
  },
  {
    "id": 8,
    "question": "Sodda Bog'langan Ro'yxat (Singly Linked List) tuguni (Node) odatda nimalarni o'z ichiga oladi?",
    "options": [
      "Faqat elementning qiymatini",
      "Elementning qiymati va undan oldingi hamda keyingi tugunlarga ishorani",
      "Elementning qiymati va keyingi tugunga ishorani (next pointer)",
      "Tugunning xotiradagi absolyut manzili va massiv indeksini"
    ],
    "correctAnswer": 2,
    "explanation": "Singly Linked List tuguni (Node) ikkita narsadan iborat: tugunda saqlanadigan ma'lumot (value) va keyingi tugunga ko'rsatuvchi ishora (next)."
  },
  {
    "id": 9,
    "question": "N o'lchamli tartiblanmagan massivdan biror qiymatni qidirishning eng yomon holatdagi vaqt murakkabligi qanday?",
    "options": [
      "O(1)",
      "O(log N)",
      "O(N)",
      "O(N^2)"
    ],
    "correctAnswer": 2,
    "explanation": "Massiv tartiblanmagan bo'lgani uchun binar qidiruvni ishlatib bo'lmaydi. Biz elementni faqat boshidan oxirigacha birma-bir solishtirib chiqishimiz mumkin (Linear Search), bu eng yomon holatda O(N) vaqt oladi."
  },
  {
    "id": 10,
    "question": "Recursion chuqurligi juda katta bo'lganda, iterativ (loop) yondashuvdan foydalanishning asosiy sababi nima?",
    "options": [
      "Iterativ yondashuv har doim kamroq kod yozishni talab qiladi",
      "Iterativ yondashuv Call Stack xotirasini band qilmaydi va Stack Overflow xavfini kamaytiradi",
      "Iterativ yondashuvda o'zgaruvchilardan foydalanib bo'lmaydi",
      "Looplar rekursiyaga qaraganda har doim O(1) vaqt murakkabligiga ega bo'ladi"
    ],
    "correctAnswer": 1,
    "explanation": "Looplar Call Stack xotirasida yangi ramka (frame) yaratmaydi, shuning uchun ular juda ko'p iteratsiyalar davomida ham xotiradan oshib ketish xavfisiz va samarali ishlaydi."
  },
  {
    "id": 11,
    "question": "N elementdan iborat massivning to'liq nusxasini (Deep Copy) yaratishning fazo murakkabligi (Space Complexity) qanday bo'ladi?",
    "options": [
      "O(1)",
      "O(N)",
      "O(N^2)",
      "O(log N)"
    ],
    "correctAnswer": 1,
    "explanation": "Massivning to'liq nusxasini yaratish kiruvchi ma'lumotlar soniga mutanosib ravishda yangi xotira talab qiladi. N elementli yangi massiv uchun O(N) qo'shimcha joy kerak bo'ladi."
  },
  {
    "id": 12,
    "question": "Quyidagi rekursiv funksiyaning `factorial(3)` chaqiruvidagi natijasi nima bo'ladi?\n```javascript\nfunction factorial(n) {\n  if (n <= 1) return 1;\n  return n * factorial(n - 1);\n}\n```",
    "options": [
      "3",
      "6",
      "9",
      "2"
    ],
    "correctAnswer": 1,
    "explanation": "factorial(3) = 3 * factorial(2) = 3 * 2 * factorial(1) = 3 * 2 * 1 = 6."
  }
]
};
