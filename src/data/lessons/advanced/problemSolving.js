export const problemSolving = {
  id: "problem-solving",
  title: "Muammolarni Yechish va Algoritmlar (Problem Solving & Algorithms)",
  level: "Murakkab",
  description: "Massivlar va obyektlar bilan ishlash, rekursiya, qidiruv va saralash algoritmlari, hamda asosiy ma'lumotlar tuzilmalari.",
  theory: `## 1. NEGA kerak?
Muammolarni dasturlash orqali hal qilish (Problem Solving) va samarali algoritmlarni tanlash har qanday dasturchining eng muhim ko'nikmasidir. Dastur nafaqat to'g'ri ishlashi, balki tez va kam resurs (xotira) sarflagan holda ishlashi lozim. Ushbu darsda biz intervyularda eng ko'p so'raladigan algoritmlar, ma'lumotlar tuzilmalari va murakkab masalalarni bosqichma-bosqich yechish usullarini o'rganamiz.

## 2. SODDALIK (Analogiya)
Tasavvur qiling, sizga **minglab kitoblar** aralashib yotgan kutubxonadan bitta kitobni topish topshirildi.
1. Agar kitoblarni birma-bir tekshirib chiqsangiz (Chiziqli qidiruv - Linear Search), bu juda ko'p vaqt oladi.
2. Agar kitoblar alifbo tartibida joylashtirilgan bo'lsa, siz kitob javonini o'rtasidan ochib, qidirayotgan kitobingiz qaysi tomonda ekanligini aniqlaysiz va qolgan yarmini chetga surasiz. Keyin yana o'rtasidan ochib qidirasiz (Binar qidiruv - Binary Search). Bu kitobni juda tez topish imkonini beradi.

Algoritmlar — bu kutubxonadagi kitoblarni tartibga solish va ularni eng tez topish yo'llaridir.

## 3. STRUKTURA

### A. Massivlar va Obyektlar (Arrays & Objects in Problem Solving)
Masalalarni yechishda ma'lumotlarni saqlash va ulardan foydalanish tezligi juda muhimdir.
- **Massivlar (Arrays):** Tartiblangan ma'lumotlar to'plami. Indeks orqali elementga murojaat qilish tezligi: O(1). Ammo qidirish yoki boshiga element qo'shish O(N) vaqt oladi.
- **Obyektlar (Objects / Hash Maps):** Kalit-qiymat (Key-Value) juftligi. Kalit orqali qiymatni topish, qo'shish va o'chirish o'rtacha O(1) vaqt oladi. Bu xususiyat ko'p hollarda nested loop (ichma-ich tsikl) orqali yozilgan O(N^2) kodlarni O(N) ga tushirishga yordam beradi.

### B. Rekursiya (Recursion)
Rekursiya — funksiyaning o'z-o'zini chaqirishi. Har qanday rekursiv funksiyada ikkita asosiy qism bo'lishi shart:
1. **Base Case (To'xtash sharti):** Rekursiyani to'xtatuvchi va cheksiz chaqiruvdan saqlovchi shart.
2. **Recursive Step (Rekursiv chaqiruv):** Muammoni kichikroq qismlarga bo'lib, funksiyani qayta chaqirish.
\`\`\`javascript
function factorial(n) {
  if (n === 1) return 1; // Base case
  return n * factorial(n - 1); // Recursive step
}
\`\`\`

### C. Qidiruv algoritmlari (Searching Algorithms)
- **Linear Search (Chiziqli qidiruv):** Massivning boshidan oxirigacha har bir elementni birma-bir solishtirib chiqadi. Vaqt murakkabligi: O(N).
- **Binary Search (Binar qidiruv):** Faqat tartiblangan (sorted) massivlar uchun ishlaydi. Har safar qidiruv doirasini o'rtasidan ikkiga bo'lish orqali ishlaydi. Vaqt murakkabligi: O(log N).

### D. Saralash algoritmlari (Sorting Algorithms)
- **Bubble Sort (Pufakchali saralash):** Qo'shni elementlarni solishtirib, noto'g'ri bo'lsa joyini almashtiradi. Eng oddiy, ammo sekin saralash usuli. Vaqt murakkabligi: O(N^2).
- **Quick Sort va Merge Sort:** Bo'lib ol va hukmronlik qil (Divide and Conquer) tamoyiliga asoslangan tezroq algoritmlar. Vaqt murakkabligi: O(N log N).

### E. Asosiy algoritmlar (Basic Algorithms)
- **Two Sum:** Berilgan massivdan yig'indisi ma'lum bir targetga teng bo'lgan juftlikni topish.
- **Anagram:** Ikki so'zning harflari va ularning soni mutlaqo bir xil ekanini tekshirish.
- **Palindrome:** So'zni chapdan va o'ngdan o'qilganda bir xilligini tekshirish (masalan: "kiyik", "non").

### F. Ma'lumotlar Tuzilmalari Asoslari (Data Structures Basics)
- **Stack (Stek):** LIFO (Last In, First Out - Oxirgi kirgan, birinchi chiqadi) tamoyilida ishlaydi. Misol: orqaga qaytish (undo) tarixi yoki brauzer tarixi.
- **Queue (Navbat):** FIFO (First In, First Out - Birinchi kirgan, birinchi chiqadi) tamoyilida ishlaydi. Misol: printer navbati yoki chipta sotib olish navbati.
- **Linked List (Bog'langan ro'yxat):** Elementlar xotirada ketma-ket joylashishi shart emas, har bir element (Node) o'zida qiymat va keyingi elementga ishora (next) ni saqlaydi.

## 4. AMALIYOT (Mashqlar pastda)

## 5. XATOLAR (Common mistakes)
1. **Rekursiyada to'xtash sharti (Base Case) bo'lmasligi:** Bu brauzerda **"Maximum call stack size exceeded"** xatosiga (Stack Overflow) olib keladi.
2. **Binary Search-ni tartiblanmagan massivda ishlatish:** Binary search faqat va faqat saralangan (sorted) massivlar uchun to'g'ri natija beradi.
3. **Massivlarni solishtirishda to'g'ridan-to'g'ri tenglik ishlatish:** \`[1,2] === [1,2]\` har doim \`false\` beradi, chunki ular alohida obyektlardir. Elementma-element solishtirish talab etiladi.

## 6. SAVOLLAR VA JAVOBLAR

**1. Algoritmning vaqt murakkabligi (Time Complexity) nima?**
Bu algoritm bajarilishi uchun ketadigan vaqtning kiruvchi ma'lumotlar hajmi (N) o'sishiga qanday bog'liqligini ko'rsatadigan o'lchovdir (Big O notation yordamida ifodalanadi).

**2. Rekursiyaning afzalligi va kamchiligi nimada?**
Afzalligi — kodning qisqa va tushunarli bo'lishi (ayniqsa daraxtsimon tuzilmalarda). Kamchiligi — har bir chaqiruv xotiradan (call stack) joy olgani uchun xotira sarfi yuqoriligi va sekinroq ishlashidir.

**3. Binary Search qanday ishlaydi?**
Tartiblangan massivning o'rtasidagi element olinadi. Agar maqsadli qiymat o'rtadagi elementdan kichik bo'lsa, qidiruv chap yarimda, katta bo'lsa o'ng yarimda davom ettiriladi. Bu jarayon qiymat topilguncha yoki qidiruv doirasi tugaguncha takrorlanadi.

**4. Stek (Stack) va Navbat (Queue) farqi nima?**
Stek LIFO (oxirgi kirgan birinchi chiqadi) tamoyilida ishlaydi va elementlar bir tomondan qo'shiladi va olinadi. Navbat esa FIFO (birinchi kirgan birinchi chiqadi) tamoyilida ishlaydi, elementlar oxiridan qo'shilib, boshidan olinadi.

**5. Linked List massivdan nimasi bilan farq qiladi?**
Massiv elementlari xotirada ketma-ket joylashgan bo'lib, o'lchami odatda statikdir. Linked List elementlari esa xotiraning ixtiyoriy joyida bo'lishi mumkin va bir-biriga ishora (pointer) orqali bog'lanadi, bu esa elementlarni oson qo'shish va o'chirish imkonini beradi.

**6. Anagrammani aniqlashning eng tez usuli qanday?**
Eng samarali usul — ikkala so'zdagi harflar chastotasini obyekt (hash map) yordamida hisoblash va ularni solishtirishdir (O(N) vaqt murakkabligi).

**7. Space Complexity (Fazo murakkabligi) nima?**
Bu algoritmning ishlashi davomida kiruvchi ma'lumotlardan tashqari qo'shimcha ravishda xotiradan qancha joy talab qilishini ko'rsatadigan o'lchovdir.

**8. Stack Overflow nima va u qachon yuz beradi?**
Stack Overflow - Call Stack-ning to'lib ketishi bo'lib, odatda rekursiv funksiyaning to'xtash sharti (base case) bajarilmay cheksiz marta o'zini chaqirishi natijasida yuz beradi.

**9. Bubble sort algoritmining vaqt murakkabligi qanday va nega u amaliyotda kam qo'llaniladi?**
Bubble sort eng yomon va o'rtacha holatda O(N^2) vaqt talab qiladi. U juda ko'p almashtirishlar bajargani uchun sekin ishlaydi va katta ma'lumotlar bilan ishlashga to'g'ri kelmaydi. Amaliyotda Quick/Merge sort ishlatiladi.

**10. Ikki ko'rsatkich (Two pointers) texnikasi nima?**
Bu massiv ustida bir vaqtning o'zida ikkita har xil indeksda turgan ko'rsatkichlar (masalan boshida va oxirida) yordamida amallar bajarish usuli bo'lib, u asosan saralangan massivlarda qidiruv qilishni tezlashtirish uchun qo'llaniladi.

**11. Nima uchun obyektlarda (Hash Map) qidirish O(1) tezlikka ega?**
Chunki kalit (key) maxsus hashing funksiyasi orqali to'g'ridan-to'g'ri xotiradagi manzilga aylantiriladi va qiymat massivdagi kabi indeks orqali to'g'ridan-to'g'ri o'qiladi.

**12. Rekursiyani har doim loop (tsikl) ga o'tkazish mumkinmi?**
Ha, har qanday rekursiv algoritmni qo'shimcha stack ma'lumotlar tuzilmasi yoki oddiy loop yordamida iterativ ko'rinishga keltirish mumkin va bu xotira samaradorligini oshiradi.`,
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
      instruction: "LIFO (Last In First Out) tamoyili asosida ishlaydigan `Stack` klassini yozing. U quyidagi metodlarga ega bo'lishi shart:\n- `push(element)`: element qo'shish\n- `pop()`: oxirgi elementni o'chirish va qaytarish (stek bo'sh bo'lsa null yoki undefined qaytarsin)\n- `peek()`: oxirgi elementni ko'rish (o'chirmasdan)\n- `isEmpty()`: stek bo'shligini tekshirish (true/false)",
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
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Massiv elementiga indeks orqali to'g'ridan-to'g'ri murojaat qilishning vaqt murakkabligi (Time Complexity) qanday?",
      options: ["O(1)", "O(log N)", "O(N)", "O(N^2)"],
      correctAnswer: 0,
      explanation: "Massivlar xotirada ketma-ket joylashganligi sababli, indeks orqali elementni o'qish xotira manzilini hisoblash yordamida to'g'ridan-to'g'ri va bir zumda amalga oshiriladi, ya'ni O(1) vaqt oladi."
    },
    {
      id: 2,
      question: "Obyektlarda (Hash Map) kalit bo'yicha qiymatni qidirish, qo'shish va o'chirishning o'rtacha vaqt murakkabligi qanday?",
      options: ["O(N)", "O(log N)", "O(1)", "O(N log N)"],
      correctAnswer: 2,
      explanation: "Obyektlar kalitlarni maxsus xesh-funksiya yordamida to'g'ridan-to'g'ri xotira indeksiga aylantiradi, shuning uchun o'rtacha holatda barcha amallar O(1) tezlikda bajariladi."
    },
    {
      id: 3,
      question: "Binary Search algoritmining eng muhim sharti nima?",
      options: [
        "Massiv faqat musbat sonlardan iborat bo'lishi kerak",
        "Massiv tartiblangan (saralangan) bo'lishi kerak",
        "Massiv uzunligi juft son bo'lishi kerak",
        "Massivda takrorlanuvchi elementlar bo'lmasligi kerak"
      ],
      correctAnswer: 1,
      explanation: "Binary Search har safar o'rtadagi elementni solishtirib, qidiruv doirasini ikki qismga bo'lishga tayanadi. Bu printsip faqat massiv elementlari tartiblangan (sorted) bo'lgandagina to'g'ri ishlaydi."
    },
    {
      id: 4,
      question: "Rekursiv funksiyada 'Base Case' (to'xtash sharti) bo'lmasa nima sodir bo'ladi?",
      options: [
        "Funksiya avtomatik ravishda loop-ga aylanadi",
        "Kompilyatsiya xatosi yuz beradi",
        "Stack Overflow (chaqiriqlar stekining to'lib ketishi) xatosi yuz beradi",
        "Funksiya faqat bir marta ishlab to'xtaydi"
      ],
      correctAnswer: 2,
      explanation: "To'xtash sharti bo'lmasa, funksiya o'zini cheksiz ravishda chaqiraveradi, bu esa Call Stack xotirasini to'ldirib, 'Maximum call stack size exceeded' xatosiga sabab bo'ladi."
    },
    {
      id: 5,
      question: "Stek (Stack) ma'lumotlar tuzilmasi qaysi tamoyil asosida ishlaydi?",
      options: ["FIFO (First In, First Out)", "LIFO (Last In, First Out)", "LILO (Last In, Last Out)", "Random Access"],
      correctAnswer: 1,
      explanation: "Stek LIFO (oxirgi kirgan, birinchi chiqadi) printsipida ishlaydi. Unga eng oxirgi qo'shilgan element birinchi bo'lib qaytarib olinadi."
    },
    {
      id: 6,
      question: "Navbat (Queue) ma'lumotlar tuzilmasi qaysi tamoyil asosida ishlaydi?",
      options: ["LIFO (Last In, First Out)", "FIFO (First In, First Out)", "Random Access", "Key-Value Access"],
      correctAnswer: 1,
      explanation: "Navbat FIFO (birinchi kirgan, birinchi chiqadi) printsipida ishlaydi. Xuddi real hayotdagi do'kon navbati kabi, birinchi kelgan odamga birinchi xizmat ko'rsatiladi."
    },
    {
      id: 7,
      question: "Bubble Sort algoritmining o'rtacha va eng yomon holatdagi vaqt murakkabligi qanday?",
      options: ["O(N log N)", "O(N)", "O(N^2)", "O(1)"],
      correctAnswer: 2,
      explanation: "Bubble sort har bir elementni o'zidan keyingi element bilan solishtirish uchun ichma-ich ikkita loop ishlatadi. Shuning uchun uning o'rtacha va eng yomon vaqt murakkabligi O(N^2) ga teng."
    },
    {
      id: 8,
      question: "Sodda Bog'langan Ro'yxat (Singly Linked List) tuguni (Node) odatda nimalarni o'z ichiga oladi?",
      options: [
        "Faqat elementning qiymatini",
        "Elementning qiymati va undan oldingi hamda keyingi tugunlarga ishorani",
        "Elementning qiymati va keyingi tugunga ishorani (next pointer)",
        "Tugunning xotiradagi absolyut manzili va massiv indeksini"
      ],
      correctAnswer: 2,
      explanation: "Singly Linked List tuguni (Node) ikkita narsadan iborat: tugunda saqlanadigan ma'lumot (value) va keyingi tugunga ko'rsatuvchi ishora (next)."
    },
    {
      id: 9,
      question: "N o'lchamli tartiblanmagan massivdan biror qiymatni qidirishning eng yomon holatdagi vaqt murakkabligi qanday?",
      options: ["O(1)", "O(log N)", "O(N)", "O(N^2)"],
      correctAnswer: 2,
      explanation: "Massiv tartiblanmagan bo'lgani uchun binar qidiruvni ishlatib bo'lmaydi. Biz elementni faqat boshidan oxirigacha birma-bir solishtirib chiqishimiz mumkin (Linear Search), bu eng yomon holatda O(N) vaqt oladi."
    },
    {
      id: 10,
      question: "Recursion chuqurligi juda katta bo'lganda, iterativ (loop) yondashuvdan foydalanishning asosiy sababi nima?",
      options: [
        "Iterativ yondashuv har doim kamroq kod yozishni talab qiladi",
        "Iterativ yondashuv Call Stack xotirasini band qilmaydi va Stack Overflow xavfini kamaytiradi",
        "Iterativ yondashuvda o'zgaruvchilardan foydalanib bo'lmaydi",
        "Looplar rekursiyaga qaraganda har doim O(1) vaqt murakkabligiga ega bo'ladi"
      ],
      correctAnswer: 1,
      explanation: "Looplar Call Stack xotirasida yangi ramka (frame) yaratmaydi, shuning uchun ular juda ko'p iteratsiyalar davomida ham xotiradan oshib ketish xavfisiz va samarali ishlaydi."
    },
    {
      id: 11,
      question: "N elementdan iborat massivning to'liq nusxasini (Deep Copy) yaratishning fazo murakkabligi (Space Complexity) qanday bo'ladi?",
      options: ["O(1)", "O(N)", "O(N^2)", "O(log N)"],
      correctAnswer: 1,
      explanation: "Massivning to'liq nusxasini yaratish kiruvchi ma'lumotlar soniga mutanosib ravishda yangi xotira talab qiladi. N elementli yangi massiv uchun O(N) qo'shimcha joy kerak bo'ladi."
    },
    {
      id: 12,
      question: "Quyidagi rekursiv funksiyaning `factorial(3)` chaqiruvidagi natijasi nima bo'ladi?\n```javascript\nfunction factorial(n) {\n  if (n <= 1) return 1;\n  return n * factorial(n - 1);\n}\n```",
      options: ["3", "6", "9", "2"],
      correctAnswer: 1,
      explanation: " factorial(3) = 3 * factorial(2) = 3 * 2 * factorial(1) = 3 * 2 * 1 = 6."
    }
  ]
};
