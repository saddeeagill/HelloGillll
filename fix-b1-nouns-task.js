const fs = require('fs');
const path = require('path');

const filepath = path.join(__dirname, 'src', 'data', 'b1-nouns-partial.ts');
let content = fs.readFileSync(filepath, 'utf-8');

// Parse the array - extract everything between the first [ and last ]
const arrayStart = content.indexOf('[');
const arrayEnd = content.lastIndexOf(']');
const arrayContent = content.substring(arrayStart, arrayEnd + 1);

// Parse each object manually
const entries = [];
const objectRegex = /\{\s*id:\s*(\d+),\s*word:\s*"([^"]*)",\s*plural:\s*"([^"]*)",\s*translation:\s*"([^"]*)",\s*urdu:\s*"([^"]*)",\s*category:\s*'([^']*)',\s*level:\s*'([^']*)'\s*\}/g;

let match;
while ((match = objectRegex.exec(arrayContent)) !== null) {
  entries.push({
    id: parseInt(match[1]),
    word: match[2],
    plural: match[3],
    translation: match[4],
    urdu: match[5],
    category: match[6],
    level: match[7],
    originalStr: match[0]
  });
}

console.log(`Parsed ${entries.length} entries in b1-nouns-partial.ts`);

// Specific manual fixes
const specificFixes = {
  5: { urdu: 'ٹریفک لائٹ' },
  11: { translation: 'answering machine' },
  27: { translation: 'fishing rod', urdu: 'مچھلی پکڑنے کی چھڑی' }, // Angel
  186: { translation: 'overalls / boiler suit', urdu: 'ڈانگری' }, // Blaumann
  336: { translation: 'feuilletonist' }, // Feuilletonistin
  471: { translation: 'university entrance qualification' }, // Hochschulreife
  564: { urdu: 'دقیانوسی تصور' }, // Klischee
  // 568 Know-how handled separately if id shifted
  62: { urdu: 'ایٹمی بجلی گھر' }, // Atomkraftwerk
  63: { translation: 'nuclear reactor', urdu: 'ایٹمی ری ایکٹر' }, // Atommeiler
  132: { translation: 'notice / announcement' }, // Bekanntmachung
  153: { translation: 'notification / official decision' }, // Bescheid
  467: { translation: 'hint / pointer' }, // Hinweis
  174: { urdu: 'کور لیٹر' }, // Bewerbungsbrief
  175: { translation: 'application letter', urdu: 'درخواست خط' }, // Bewerbungsschreiben
  447: { urdu: 'مرکزی کردار' }, // Hauptfigur
  449: { urdu: 'مرکزی رول' }, // Hauptrolle
  463: { urdu: 'نمایاں کریں' }, // Highlight
  475: { translation: 'peak / climax', urdu: 'عروج / بلندی' }, // Höhepunkt
  529: { urdu: 'مارشل آرٹس' }, // Kampfkunst
  530: { translation: 'combat sport', urdu: 'مارشل کھیل' }, // Kampfsport
  572: { urdu: 'مواصلات کی مہارت' }, // Kommunikationsfähigkeit
  574: { urdu: 'مواصلات میں مضبوطی' }, // Kommunikationsstärke
  663: { urdu: 'سیکھنے کا مواد' }, // Lernmaterial
  665: { urdu: 'سیکھنے کا مواد' }, // Lernstoff
  732: { urdu: 'دوپہر کی جھپکی' }, // Mittagsschlaf
  733: { translation: 'short midday nap', urdu: 'دوپہر کی چھوٹی جھپکی' }, // Mittagsschläfchen
  124: { translation: 'celebration / party' }, // Fest
  311: { translation: 'placard / billboard' }, // Plakat
  400: { urdu: 'ورزش / کھیل کود' }, // Sport
  138: { urdu: 'ڈرائیونگ لائسنس' }, // Führerschein
};

// Check for Know / how
const knowhow = entries.find(e => e.word === 'Know / how' || e.word === 'Know-how');
if (knowhow) {
  knowhow.word = 'Know-how';
  knowhow.translation = 'know-how / expertise';
}

for (const entry of entries) {
  // Apply RTL reverse for Urdu if it's more than 1 word, EXCEPT for the ones we manually fix
  const manualFix = specificFixes[entry.id];
  
  if (manualFix) {
    if (manualFix.translation) entry.translation = manualFix.translation;
    if (manualFix.urdu) entry.urdu = manualFix.urdu;
  } else {
    // Reverse Urdu words
    const words = entry.urdu.trim().split(' ');
    if (words.length > 1) {
      entry.urdu = words.reverse().join(' ');
    }
    
    // Also, if english has reversed words like "machine answering", let's fix known ones
    // We already fixed id 11.
  }
}

// Write back
let output = 'export const B1_NOUNS_PARTIAL = [\n';
for (let i = 0; i < entries.length; i++) {
  const e = entries[i];
  output += `  { id: ${e.id}, word: "${e.word}", plural: "${e.plural}", translation: "${e.translation}", urdu: "${e.urdu}", category: '${e.category}', level: '${e.level}' }`;
  if (i < entries.length - 1) {
    output += ',\n';
  } else {
    output += '\n';
  }
}
output += '];\n';

fs.writeFileSync(filepath, output);
console.log(`Done! Written b1-nouns-partial.ts`);
