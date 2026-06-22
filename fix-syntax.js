const fs = require('fs');
const path = 'src/data/b1-nouns-partial.ts';
let data = fs.readFileSync(path, 'utf8');

// Replace duplicate urdu keys like:
// urdu: "امیدوار" urdu: "\u0627..."
// with a single key-value:
// urdu: "\u0627..."

data = data.replace(/,urdu:\s*"[^"]*"\s*urdu:/g, ', urdu:');

fs.writeFileSync(path, data);
console.log('Fixed duplicate keys in b1-nouns-partial.ts');
