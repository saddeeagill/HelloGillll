// Fix script for A1 Nouns
// Removes duplicate entries and fixes translation issues
const fs = require('fs');
const path = require('path');

const filepath = path.join(__dirname, 'src', 'data', 'a1-nouns.ts');
const content = fs.readFileSync(filepath, 'utf-8');

// Parse the array - extract everything between the first [ and last ]
const arrayStart = content.indexOf('[');
const arrayEnd = content.lastIndexOf(']');
const arrayContent = content.substring(arrayStart, arrayEnd + 1);

// Parse each object manually
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

console.log(`Parsed ${entries.length} entries`);

// Track seen words (case-insensitive) to find duplicates
const seenWords = new Map();
const duplicateIds = new Set();

for (const entry of entries) {
  const key = entry.word.toLowerCase();
  if (seenWords.has(key)) {
    const first = seenWords.get(key);
    console.log(`DUPLICATE: "${entry.word}" (id:${entry.id}) is duplicate of id:${first.id}`);
    duplicateIds.add(entry.id);
    
    // If the first one is missing urdu but duplicate has it, copy it
    if (!first.urdu && entry.urdu) {
      first.urdu = entry.urdu;
      console.log(`  -> Copied urdu from duplicate to first occurrence`);
    }
  } else {
    seenWords.set(key, entry);
  }
}

console.log(`\nFound ${duplicateIds.size} duplicates to remove`);

// Remove duplicates
const filtered = entries.filter(e => !duplicateIds.has(e.id));

// Fix translation issues
const translationFixes = {
  'Alter': { translation: 'age', urdu: 'عمر' },
  'Buchstabe': { translation: 'letter (alphabet)', urdu: 'حرف' },
  'Bahnhof': { translation: 'train station', urdu: 'ریلوے اسٹیشن' },
  'Ausflug': { translation: 'excursion', urdu: 'سیر' },
  'Bogen': { translation: 'sheet (of paper)', urdu: 'شیٹ' },
  'Automat': { translation: 'vending machine', urdu: 'وینڈنگ مشین' },
  'Achtung': { translation: 'attention', urdu: 'توجہ' },
  'Lokal': { translation: 'restaurant/pub', urdu: 'ریسٹورنٹ' },
  'Hals': { translation: 'neck', urdu: 'گردن' },
  'Herbst': { translation: 'autumn', urdu: 'خزاں' },
  'Hose': { translation: 'trousers', urdu: 'پتلون' },
  'Bauch': { translation: 'belly', urdu: 'پیٹ' },
  'Salat': { translation: 'salad', urdu: 'سلاد' },
  'Nudeln': { translation: 'noodles', urdu: 'نوڈلز' },
};

// Also fix some non-noun-like translations
// "Dank" as noun = gratitude, not "thanks to"
translationFixes['Dank'] = { translation: 'gratitude', urdu: 'شکریہ' };
// "Bisschen" is more of a pronoun, but if kept: "a little bit"
// "Blick" = glance/look, not just "view"

for (const entry of filtered) {
  if (translationFixes[entry.word]) {
    const fix = translationFixes[entry.word];
    console.log(`FIX: "${entry.word}" translation: "${entry.translation}" -> "${fix.translation}"`);
    entry.translation = fix.translation;
    if (fix.urdu && !entry.urdu) {
      entry.urdu = fix.urdu;
    }
  }
}

// Also fix duplicate translation issue: "Schüler" = pupil/schoolboy, "Student" = university student
const schueler = filtered.find(e => e.word === 'Schüler');
if (schueler) {
  schueler.translation = 'pupil';
  console.log(`FIX: "Schüler" translation: "student" -> "pupil"`);
}

const platz = filtered.find(e => e.word === 'Platz');
if (platz) {
  platz.translation = 'seat';
  console.log(`FIX: "Platz" translation: "place" -> "seat" (Ort already means place)`);
}

const bahn = filtered.find(e => e.word === 'Bahn');
if (bahn) {
  bahn.translation = 'railway';
  console.log(`FIX: "Bahn" translation: "train" -> "railway" (Zug already means train)`);
}

const abflug = filtered.find(e => e.word === 'Abflug');
if (abflug) {
  abflug.translation = 'flight departure';
  console.log(`FIX: "Abflug" translation: "departure" -> "flight departure" (Abfahrt already means departure)`);
}

const durchsage = filtered.find(e => e.word === 'Durchsage');
if (durchsage) {
  durchsage.translation = 'public announcement';
  console.log(`FIX: "Durchsage" translation: "announcement" -> "public announcement"`);
}

const wohnung = filtered.find(e => e.word === 'Wohnung');
if (wohnung) {
  wohnung.translation = 'flat';
  console.log(`FIX: "Wohnung" translation: "apartment" -> "flat" (Apartment already means apartment)`);
}

const schluss = filtered.find(e => e.word === 'Schluss');
if (schluss) {
  schluss.translation = 'conclusion';
  console.log(`FIX: "Schluss" translation: "end" -> "conclusion" (Ende already means end)`);
}

const ticket = filtered.find(e => e.word === 'Ticket');
if (ticket) {
  ticket.translation = 'ticket (event)';
  console.log(`FIX: "Ticket" translation: "ticket" -> "ticket (event)" (Fahrkarte is transport ticket)`);
}

const tuete = filtered.find(e => e.word === 'Tüte');
if (tuete) {
  tuete.translation = 'plastic bag';
  console.log(`FIX: "Tüte" translation: "bag" -> "plastic bag" (Tasche already means bag)`);
}

const auskunft = filtered.find(e => e.word === 'Auskunft');
if (auskunft) {
  auskunft.translation = 'information desk';
  console.log(`FIX: "Auskunft" translation: "information" -> "information desk" (Information already means information)`);
}

const partnerin = filtered.find(e => e.word === 'Partnerin');
if (partnerin) {
  partnerin.translation = 'female partner';
  console.log(`FIX: "Partnerin" translation: "partner" -> "female partner"`);
}

// Re-number IDs sequentially
console.log(`\nRe-numbering ${filtered.length} entries sequentially 1 to ${filtered.length}`);
for (let i = 0; i < filtered.length; i++) {
  filtered[i].id = i + 1;
}

// Generate output
let output = 'export const A1_NOUNS = [\n';
for (let i = 0; i < filtered.length; i++) {
  const e = filtered[i];
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
  if (i < filtered.length - 1) {
    output += '  },\n';
  } else {
    output += '  }\n';
  }
}
output += '];\n';

fs.writeFileSync(filepath, output);
console.log(`\nDone! Written ${filtered.length} entries (was ${entries.length})`);
