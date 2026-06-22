const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'src', 'data');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));

let fixedCount = 0;
files.forEach(f => {
  const p = path.join(dir, f);
  let content = fs.readFileSync(p, 'utf-8');
  const original = content;
  
  // Replace instances where "urdu": "something" is immediately followed by a newline and "category" or "level"
  content = content.replace(/("urdu":\s*"[^"]+")(\s*)("category"|"level")/g, '$1,$2$3');

  if (content !== original) {
    fs.writeFileSync(p, content, 'utf-8');
    fixedCount++;
    console.log('Fixed commas in', f);
  }
});
console.log('Total files fixed:', fixedCount);
