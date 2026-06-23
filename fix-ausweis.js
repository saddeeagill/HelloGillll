const fs = require('fs');

let a1 = fs.readFileSync('src/data/a1-nouns.ts', 'utf8');
a1 = a1.replace(/"translation": "ID card","urdu": "شناختی کارڈ",/g, '"translation": "ID card",\n    "urdu": "شناختی کارڈ",');
fs.writeFileSync('src/data/a1-nouns.ts', a1);

let a2 = fs.readFileSync('src/data/a2-nouns.ts', 'utf8');
a2 = a2.replace(/urdu: "کارڈ شناختی"/g, 'urdu: "شناختی کارڈ"');
fs.writeFileSync('src/data/a2-nouns.ts', a2);

let b1 = fs.readFileSync('src/data/b1-nouns-partial.ts', 'utf8');
b1 = b1.replace(/word: "Ausweis", plural: "Ausweise", translation: "ID card", urdu: ""/g, 'word: "Ausweis", plural: "Ausweise", translation: "ID card", urdu: "شناختی کارڈ"');
fs.writeFileSync('src/data/b1-nouns-partial.ts', b1);

console.log('Fixed Ausweis in a1, a2, b1');
