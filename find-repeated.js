// Find all repeated/duplicated translations like "ID ID", "house house" etc.
const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'src', 'data');
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.ts') && !f.includes('types') && !f.includes('vocabulary') && !f.includes('lessons') && !f.includes('exam') && !f.includes('languages'));

for (const file of files) {
  const filepath = path.join(dataDir, file);
  const content = fs.readFileSync(filepath, 'utf-8');
  const lines = content.split('\n');
  
  let found = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Find translation values
    const transMatch = line.match(/translation:\s*["']([^"']+)["']/);
    if (!transMatch) continue;
    
    const trans = transMatch[1].trim();
    
    // Check for repeated words: "ID ID", "house house"
    const words = trans.split(/\s+/);
    if (words.length >= 2) {
      // Check if all words are the same
      const allSame = words.every(w => w.toLowerCase() === words[0].toLowerCase());
      if (allSame && words.length >= 2) {
        const wordMatch = line.match(/word:\s*["']([^"']+)["']/);
        const idMatch = line.match(/id:\s*(\d+)/i) || line.match(/"id":\s*(\d+)/);
        found.push({
          line: i + 1,
          id: idMatch ? idMatch[1] : '?',
          word: wordMatch ? wordMatch[1] : '?',
          translation: trans,
          type: 'REPEATED_WORD'
        });
        continue;
      }
      
      // Check for consecutive duplicate words like "the the"
      for (let j = 0; j < words.length - 1; j++) {
        if (words[j].toLowerCase() === words[j + 1].toLowerCase() && words[j].length > 1) {
          const wordMatch = line.match(/word:\s*["']([^"']+)["']/);
          const idMatch = line.match(/id:\s*(\d+)/i) || line.match(/"id":\s*(\d+)/);
          found.push({
            line: i + 1,
            id: idMatch ? idMatch[1] : '?',
            word: wordMatch ? wordMatch[1] : '?',
            translation: trans,
            type: 'CONSECUTIVE_DUPE'
          });
          break;
        }
      }
    }
    
    // Also check for translations that contain the German word (leaking)
    const wordMatch = line.match(/word:\s*["']([^"']+)["']/);
    if (wordMatch) {
      const germanWord = wordMatch[1].toLowerCase();
      if (trans.toLowerCase().includes(germanWord) && germanWord.length > 3) {
        const idMatch = line.match(/id:\s*(\d+)/i) || line.match(/"id":\s*(\d+)/);
        found.push({
          line: i + 1,
          id: idMatch ? idMatch[1] : '?',
          word: wordMatch[1],
          translation: trans,
          type: 'GERMAN_IN_TRANSLATION'
        });
      }
    }
    
    // Check for very short duplicated translations like just a word repeated
    if (trans.match(/^(\w{2,})\s+\1$/i)) {
      const wordMatch2 = line.match(/word:\s*["']([^"']+)["']/);
      const idMatch = line.match(/id:\s*(\d+)/i) || line.match(/"id":\s*(\d+)/);
      if (!found.some(f => f.line === i + 1)) {
        found.push({
          line: i + 1,
          id: idMatch ? idMatch[1] : '?',
          word: wordMatch2 ? wordMatch2[1] : '?',
          translation: trans,
          type: 'EXACT_REPEAT'
        });
      }
    }
  }
  
  if (found.length > 0) {
    console.log(`\n=== ${file} ===`);
    found.forEach(f => {
      console.log(`  [${f.type}] Line ${f.line}, id:${f.id} "${f.word}" -> "${f.translation}"`);
    });
  }
}
