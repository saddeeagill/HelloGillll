const fs = require('fs');

let content = fs.readFileSync('src/data/lessons.ts', 'utf8');

// Replace all occurrences of ** with nothing
content = content.replace(/\*\*/g, '');

fs.writeFileSync('src/data/lessons.ts', content);
console.log('Removed all ** from lessons.ts');
