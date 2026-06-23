const fs = require('fs');
const path = require('path');

const filepath = path.join(__dirname, 'src', 'data', 'a1-nouns.ts');
const content = fs.readFileSync(filepath, 'utf-8');

// The fixes provided by the user
const fixes = {
  3: { urdu: 'توجہ / دھیان' }, // Achtung
  5: { urdu: 'عمر' }, // Alter
  36: { urdu: 'وینڈنگ مشین' }, // Automat
  61: { urdu: 'کاغذ کا ورق' }, // Bogen
  101: { urdu: 'کھانا' }, // Essen
  124: { urdu: 'سوال' }, // Frage
  149: { urdu: 'قسمت' }, // Glück
  162: { urdu: 'بس اسٹاپ' }, // Haltestelle
  203: { urdu: 'دکان' }, // Laden
  214: { urdu: 'لڑکی' }, // Mädchen
  223: { urdu: 'لمحہ' }, // Moment
  224: { urdu: 'صبح' }, // Morgen
  232: { urdu: 'ترتیب' }, // Ordnung
  240: { urdu: 'وقفہ' }, // Pause
  267: { urdu: 'نشان / بورڈ' }, // Schild
  285: { urdu: 'منزل' }, // Stock
  343: { urdu: 'انگلی' }, // Finger
  345: { urdu: 'کمر / پیٹھ' }, // Rücken
  355: { urdu: 'اسکرٹ' }, // Rock
};

const arrayStart = content.indexOf('[');
const arrayEnd = content.lastIndexOf(']');
const arrayContent = content.substring(arrayStart, arrayEnd + 1);

const entries = [];
const objectRegex = /\{[^}]+\}/g;
let match;
while ((match = objectRegex.exec(arrayContent)) !== null) {
  const obj = {};
  const idMatch = match[0].match(/"id":\s*(\d+)/);
  const wordMatch = match[0].match(/"word":\s*"([^"]+)"/);
  const pluralMatch = match[0].match(/"plural":\s*"([^"]*)"/);
  const translationMatch = match[0].match(/"translation":\s*"([^"]+)"/);
  const urduMatch = match[0].match(/"urdu":\s*"([^"]+)"/);
  const categoryMatch = match[0].match(/"category":\s*"([^"]+)"/);
  const levelMatch = match[0].match(/"level":\s*"([^"]+)"/);
  
  if (idMatch && wordMatch && translationMatch) {
    obj.id = parseInt(idMatch[1]);
    obj.word = wordMatch[1];
    obj.plural = pluralMatch ? pluralMatch[1] : '';
    obj.translation = translationMatch[1];
    obj.urdu = urduMatch ? urduMatch[1] : '';
    obj.category = categoryMatch ? categoryMatch[1] : 'Nouns';
    obj.level = levelMatch ? levelMatch[1] : 'A1';
    entries.push(obj);
  }
}

let updatedCount = 0;
for (const entry of entries) {
  if (fixes[entry.id]) {
    entry.urdu = fixes[entry.id].urdu;
    updatedCount++;
  }
}

// Generate output
let output = 'export const A1_NOUNS = [\n';
for (let i = 0; i < entries.length; i++) {
  const e = entries[i];
  output += '  {\n';
  output += `    "id": ${e.id},\n`;
  output += `    "word": "${e.word}",\n`;
  output += `    "plural": "${e.plural}",\n`;
  if (e.urdu) {
    output += `    "translation": "${e.translation}","urdu": "${e.urdu}",\n`;
  } else {
    output += `    "translation": "${e.translation}",\n`;
  }
  output += `    "category": "${e.category}",\n`;
  output += `    "level": "${e.level}"\n`;
  if (i < entries.length - 1) {
    output += '  },\n';
  } else {
    output += '  }\n';
  }
}
output += '];\n';

fs.writeFileSync(filepath, output);
console.log(`Done! Updated ${updatedCount} entries.`);
