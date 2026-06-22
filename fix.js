const fs = require('fs');
const file = 'src/data/b1-adjectives.ts';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/urdu:\s*"[^"]*"\s*urdu:/g, 'urdu:');
fs.writeFileSync(file, content);
console.log("Fixed b1-adjectives");
