// Fix A2 regular verbs - renumber IDs and fix translation issues
const fs = require('fs');
const path = require('path');

const filepath = path.join(__dirname, 'src', 'data', 'a2-regularverbs.ts');
const content = fs.readFileSync(filepath, 'utf-8');

// Parse entries by finding objects between { and }
// Use a more careful regex for this format
const lines = content.split('\n');
const entries = [];
let currentObj = '';
let braceCount = 0;

for (const line of lines) {
  for (const ch of line) {
    if (ch === '{') {
      braceCount++;
      currentObj += ch;
    } else if (ch === '}') {
      braceCount--;
      currentObj += ch;
      if (braceCount === 0 && currentObj.includes('id:')) {
        // Parse this object
        const obj = {};
        const idMatch = currentObj.match(/id:\s*(\d+)/);
        const wordMatch = currentObj.match(/word:\s*"([^"]+)"/);
        const translationMatch = currentObj.match(/translation:\s*"([^"]+)"/);
        const urduMatch = currentObj.match(/urdu:\s*"([^"]+)"/);
        const categoryMatch = currentObj.match(/category:\s*'([^']+)'/);
        const levelMatch = currentObj.match(/level:\s*'([^']+)'/);
        const ppMatch = currentObj.match(/principalParts:\s*"([^"]+)"/);
        const conjMatch = currentObj.match(/conjugation:\s*"([^"]+)"/);
        
        if (idMatch && wordMatch) {
          obj.id = parseInt(idMatch[1]);
          obj.word = wordMatch[1];
          obj.translation = translationMatch ? translationMatch[1] : '';
          obj.urdu = urduMatch ? urduMatch[1] : '';
          obj.category = categoryMatch ? categoryMatch[1] : 'Regular Verbs';
          obj.level = levelMatch ? levelMatch[1] : 'A2';
          obj.principalParts = ppMatch ? ppMatch[1] : '';
          obj.conjugation = conjMatch ? conjMatch[1] : '';
          entries.push(obj);
        }
        currentObj = '';
      }
    } else if (braceCount > 0) {
      currentObj += ch;
    }
  }
}

console.log(`Parsed ${entries.length} entries`);
console.log(`ID range: ${Math.min(...entries.map(e => e.id))} to ${Math.max(...entries.map(e => e.id))}`);

// Find and report issues
let issueCount = 0;

// Fix corrupted entries
for (const e of entries) {
  // Fix corrupted word field (id 17 has conjugation data in word)
  if (e.word.includes(' ich ') || e.word.includes(' du ') || e.word.includes(' wir ')) {
    const cleanWord = e.word.split(' ')[0] + ' ' + e.word.split(' ')[1];
    console.log(`FIX CORRUPTED WORD: "${e.word}" -> "${cleanWord.replace(/\s+sich\s+.*/, '').trim()}"`);
    // Try to extract just "sich ausruhen" or similar
    if (e.word.startsWith('sich ')) {
      e.word = 'sich ' + e.word.split(' ')[1];
    } else {
      e.word = e.word.split(' ')[0];
    }
    issueCount++;
  }
  
  // Fix corrupted translations that contain conjugation data
  if (e.translation.length > 60 || e.translation.includes('wir ') || e.translation.includes('ihr ') || e.translation.includes('Sie/sie')) {
    // Try to extract meaningful translation from the end
    const parts = e.translation.split(' ');
    // The actual translation is usually at the end after "to"
    const toIndex = parts.lastIndexOf('to');
    if (toIndex >= 0 && toIndex < parts.length - 1) {
      e.translation = 'to ' + parts.slice(toIndex + 1).join(' ');
      console.log(`FIX CORRUPTED TRANSLATION id:${e.id} -> "${e.translation}"`);
    } else {
      // Just take last few words
      e.translation = parts.slice(-3).join(' ');
      console.log(`FIX CORRUPTED TRANSLATION id:${e.id} -> "${e.translation}" (best guess)`);
    }
    issueCount++;
  }
  
  // Fix "X to" pattern -> "to X" pattern
  if (e.translation.match(/^\w+ to$/) || e.translation.match(/^[\w/]+ to$/)) {
    const oldTrans = e.translation;
    e.translation = 'to ' + e.translation.replace(/ to$/, '');
    console.log(`FIX ORDER: "${oldTrans}" -> "${e.translation}"`);
    issueCount++;
  }
  
  // Fix slash translations
  if (e.translation.includes('/') && !e.translation.startsWith('to ')) {
    // "to visit/tour" -> keep as is, it starts with "to"
    // "lock/complete to" -> "to lock"
    if (e.translation.endsWith(' to')) {
      const meaningful = e.translation.replace(/ to$/, '').split('/')[0];
      const oldTrans = e.translation;
      e.translation = 'to ' + meaningful;
      console.log(`FIX SLASH+ORDER: "${oldTrans}" -> "${e.translation}"`);
      issueCount++;
    }
  }
  
  // Fix remaining slash in translations
  if (e.translation.includes('/')) {
    const oldTrans = e.translation;
    // "to visit/tour" -> "to visit"
    // "to pass/exist" -> "to pass"
    const parts = e.translation.split('/');
    e.translation = parts[0];
    console.log(`FIX SLASH: "${oldTrans}" -> "${e.translation}"`);
    issueCount++;
  }
}

console.log(`\nFixed ${issueCount} issues`);

// Check for and add missing entries
// ID 18 was "backen" - it got merged into ID 17's corrupted data
// Let's check if "backen" exists
const hasBacken = entries.some(e => e.word === 'backen');
if (!hasBacken) {
  console.log(`Adding missing entry: backen (to bake)`);
  // Find where to insert (after the corrupted entry that was id:17)
  const idx = entries.findIndex(e => e.word === 'sich ausruhen' || e.word.startsWith('sich ausruhen'));
  if (idx >= 0) {
    entries.splice(idx + 1, 0, {
      id: 0, // will be renumbered
      word: 'backen',
      translation: 'to bake',
      urdu: 'سینکنا',
      category: 'Regular Verbs',
      level: 'A2',
      principalParts: 'backen - backte - gebacken',
      conjugation: 'ich backe\\ndu backst\\ner/sie/es backt\\nwir backen\\nihr backt\\nSie/sie backen'
    });
  }
}

// Fix the corrupted "sich ausruhen" entry's translation
const ausruhen = entries.find(e => e.word.startsWith('sich ausruhen'));
if (ausruhen) {
  ausruhen.word = 'sich ausruhen';
  ausruhen.translation = 'to rest';
  ausruhen.urdu = 'آرام کرنا';
  console.log('Fixed "sich ausruhen" entry');
}

// Also fix "sich beschweren" (id 32)  
const beschweren = entries.find(e => e.word === 'sich beschweren');
if (beschweren && beschweren.translation.includes('beschwert')) {
  beschweren.translation = 'to complain';
  console.log('Fixed "sich beschweren" translation');
}

// Also fix "sich anmelden" (id 4)
const anmelden = entries.find(e => e.word === 'sich anmelden');
if (anmelden && anmelden.translation.includes('anmeldet')) {
  anmelden.translation = 'to register';
  console.log('Fixed "sich anmelden" translation');
}

// Renumber sequentially
for (let i = 0; i < entries.length; i++) {
  entries[i].id = i + 1;
}

// Generate output
let output = 'export const A2_REGULAR_VERBS = [\n';
for (let i = 0; i < entries.length; i++) {
  const e = entries[i];
  let line = `  { id: ${e.id}, word: "${e.word}", translation: "${e.translation}"`;
  if (e.urdu) line += `, urdu: "${e.urdu}"`;
  line += `, category: 'Regular Verbs', level: 'A2'`;
  if (e.principalParts) line += `, principalParts: "${e.principalParts}"`;
  if (e.conjugation) line += `, conjugation: "${e.conjugation}"`;
  line += ' }';
  if (i < entries.length - 1) line += ',';
  output += line + '\n';
}
output += '];\n';

fs.writeFileSync(filepath, output);
console.log(`\nDone! Written ${entries.length} entries with sequential IDs (1 to ${entries.length})`);
