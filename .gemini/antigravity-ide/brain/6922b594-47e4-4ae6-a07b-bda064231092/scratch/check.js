const fs = require('fs');
const path = require('path');
const dir = 'C:\\\\Users\\\\Hashir Mehboob\\\\Desktop\\\\HelloGillApp\\\\src\\\\data';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts') && !f.includes('types') && !f.includes('lessons') && !f.includes('vocabulary') && !f.includes('exam') && !f.includes('languages'));

let total = 0;
let urduPresent = 0;
let withoutUrdu = 0;

files.forEach(f => {
  const content = fs.readFileSync(path.join(dir, f), 'utf-8');
  // Simple check for urdu
  if (content.includes('urdu:')) {
    urduPresent++;
  } else {
    withoutUrdu++;
  }
});
console.log({ totalFiles: files.length, urduPresent, withoutUrdu });
