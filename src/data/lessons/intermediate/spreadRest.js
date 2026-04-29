export const spreadRest = {
  id: "m2",
  title: "Spread & Rest",
  theory: `## Spread va Rest operatori
\`...\` belgisi ikki xil maqsadda ishlaydi. Spread mavjud qiymatlarni yoyadi, rest esa qolgan argumentlarni bitta joyga yig'adi. Ikkalasi ham massivlar, obyektlar va funksiyalar bilan ishlashda juda ko'p qo'llanadi.

## Spread
\`\`\`javascript
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];
console.log(arr2);
\`\`\`

## Obyektda spread
\`\`\`javascript
const eski = { ism: "Ali", yosh: 20 };
const yangi = { ...eski, yosh: 30 };
console.log(yangi);
\`\`\`

## Rest
\`\`\`javascript
function yig(a, b, ...qolgan) {
  return qolgan;
}
\`\`\`

## Eslatma
Spread ko'pincha nusxa olish va birlashtirishda ishlatiladi. Rest esa funksiyaga noma'lum miqdorda argument kelganda foydali.

## Quiz
1. Spread va rest farqi nima?
2. Nega obyektni spread bilan nusxalash qulay?
3. Rest parametr qachon kerak bo'ladi?`,
  task: `// Spread yordamida 2 massivni birlashtiring.

const sabzavotlar = ['pomidor', 'bodring'];
const mevalar = ['olma', 'banan'];

// birlashtirilgan massiv yarating
const hammasi = [];
console.log(hammasi);`,
  hint: `const sabzavotlar = ['pomidor', 'bodring'];
const mevalar = ['olma', 'banan'];

const hammasi = [...sabzavotlar, ...mevalar];
console.log(hammasi);`
};
