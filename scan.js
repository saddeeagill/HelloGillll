const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'src', 'data');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));

let missingPlurals = [];
let missingTranslations = [];

files.forEach(f => {
  const p = path.join(dir, f);
  let content = fs.readFileSync(p, 'utf-8');
  
  const regex = /\{[^{}]*"word"\s*:\s*"([^"]+)"[^{}]*\}/g;
  let m;
  while ((m = regex.exec(content)) !== null) {
    const objStr = m[0];
    const word = m[1];
    
    if (objStr.includes('"category": "Nouns"')) {
      const pluralMatch = objStr.match(/"plural"\s*:\s*"([^"]*)"/);
      if (!pluralMatch || !pluralMatch[1] || pluralMatch[1].trim() === '') {
        missingPlurals.push({ file: f, word });
      }
    }
    
    const translationMatch = objStr.match(/"translation"\s*:\s*"([^"]*)"/);
    if (!translationMatch || !translationMatch[1] || translationMatch[1].trim() === '') {
      missingTranslations.push({ file: f, word });
    }
  }
});

console.log('Missing Plurals:', missingPlurals.length);
if (missingPlurals.length > 0) {
  console.log('Sample missing plurals:', missingPlurals.slice(0, 10));
}

console.log('Missing Translations:', missingTranslations.length);
if (missingTranslations.length > 0) {
  console.log('Sample missing translations:', missingTranslations.slice(0, 10));
}
