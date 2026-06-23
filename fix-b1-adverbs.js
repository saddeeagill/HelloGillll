const fs = require('fs');
const path = require('path');

const data = {
  1: { word: 'abwärts', translation: 'downwards', urdu: 'نیچے کی طرف' },
  2: { word: 'allein', translation: 'alone', urdu: 'اکیلا' },
  3: { word: 'allerdings', translation: 'however / indeed', urdu: 'تاہم / درحقیقت' },
  4: { word: 'allzu', translation: 'too (excessively)', urdu: 'حد سے زیادہ' },
  5: { word: 'also', translation: 'so / thus', urdu: 'تو / اس طرح' },
  6: { word: 'andernfalls', translation: 'otherwise', urdu: 'ورنہ' },
  7: { word: 'angesichts', translation: 'in view of', urdu: 'کے پیش نظر' },
  8: { word: 'auch', translation: 'also / too', urdu: 'بھی' },
  9: { word: 'ausschließlich', translation: 'exclusively', urdu: 'صرف / خاص طور پر' },
  10: { word: 'außerdem', translation: 'furthermore', urdu: 'اس کے علاوہ' },
  11: { word: 'äußerst', translation: 'extremely', urdu: 'انتہائی' },
  12: { word: 'bald', translation: 'soon', urdu: 'جلد' },
  13: { word: 'beinahe', translation: 'almost', urdu: 'تقریباً' },
  14: { word: 'besonders', translation: 'especially', urdu: 'خاص طور پر' },
  15: { word: 'bloß', translation: 'merely / only', urdu: 'صرف / محض' },
  16: { word: 'da', translation: 'there / since', urdu: 'وہاں / کیونکہ' },
  17: { word: 'dabei', translation: 'thereby / during it', urdu: 'اس کے ساتھ / اسی دوران' },
  18: { word: 'dafür', translation: 'for it / in favor of', urdu: 'اس کے حق میں / اس کے لیے' },
  19: { word: 'dagegen', translation: 'against it', urdu: 'اس کے خلاف' },
  20: { word: 'daher', translation: 'therefore', urdu: 'لہٰذا / اسی وجہ سے' },
  21: { word: 'danach', translation: 'afterwards', urdu: 'اس کے بعد' },
  22: { word: 'daneben', translation: 'beside / moreover', urdu: 'اس کے علاوہ / پاس میں' },
  23: { word: 'dann', translation: 'then', urdu: 'پھر' },
  24: { word: 'diesmal', translation: 'this time', urdu: 'اس بار' },
  25: { word: 'dort', translation: 'there', urdu: 'وہاں' },
  26: { word: 'drüben', translation: 'over there', urdu: 'وہاں / دوسری طرف' },
  27: { word: 'durcheinander', translation: 'mixed up', urdu: 'گڈمڈ / الجھا ہوا' },
  28: { word: 'eben', translation: 'just / exactly', urdu: 'بالکل / ابھی' },
  29: { word: 'ebenfalls', translation: 'likewise', urdu: 'بھی / اسی طرح' },
  30: { word: 'ebenso', translation: 'likewise', urdu: 'اسی طرح' },
  31: { word: 'eher', translation: 'rather / sooner', urdu: 'زیادہ تر / نسبتاً' },
  32: { word: 'eigentlich', translation: 'actually', urdu: 'دراصل' },
  33: { word: 'einmal', translation: 'once', urdu: 'ایک بار' },
  34: { word: 'endlich', translation: 'finally', urdu: 'آخرکار' },
  35: { word: 'erst', translation: 'only / not until', urdu: 'صرف / تب ہی' },
  36: { word: 'etwa', translation: 'about / approximately', urdu: 'تقریباً' },
  37: { word: 'eventuell', translation: 'possibly', urdu: 'ممکنہ طور پر' },
  38: { word: 'extra', translation: 'specially', urdu: 'خاص طور پر / اضافی' },
  39: { word: 'fälschlicherweise', translation: 'mistakenly', urdu: 'غلطی سے' },
  40: { word: 'fast', translation: 'almost', urdu: 'تقریباً' },
  41: { word: 'folglich', translation: 'consequently', urdu: 'نتیجتاً' },
  42: { word: 'früh', translation: 'early', urdu: 'جلد / صبح سویرے' },
  43: { word: 'genauso', translation: 'exactly the same', urdu: 'بالکل اسی طرح' },
  44: { word: 'genug', translation: 'enough', urdu: 'کافی' },
  45: { word: 'gerade', translation: 'exactly / straight', urdu: 'سیدھا / بالکل' },
  46: { word: 'geradeaus', translation: 'straight ahead', urdu: 'سیدھا آگے' },
  47: { word: 'gerne', translation: 'gladly', urdu: 'خوشی سے' },
  48: { word: 'gestern', translation: 'yesterday', urdu: 'کل' },
  49: { word: 'gleichfalls', translation: 'likewise / same to you', urdu: 'آپ کو بھی' },
  50: { word: 'gleichzeitig', translation: 'simultaneously', urdu: 'ایک ہی وقت میں' },
  51: { word: 'größtenteils', translation: 'mostly', urdu: 'زیادہ تر' },
  52: { word: 'immer', translation: 'always', urdu: 'ہمیشہ' },
  53: { word: 'insbesondere', translation: 'especially', urdu: 'خاص طور پر' },
  54: { word: 'inzwischen', translation: 'meanwhile', urdu: 'اس دوران' },
  55: { word: 'irgendwann', translation: 'sometime', urdu: 'کبھی نہ کبھی' },
  56: { word: 'irgendwo', translation: 'somewhere', urdu: 'کہیں' },
  57: { word: 'kaum', translation: 'hardly', urdu: 'بمشکل' },
  58: { word: 'kürzlich', translation: 'recently', urdu: 'حال ہی میں' },
  59: { word: 'leider', translation: 'unfortunately', urdu: 'بدقسمتی سے' },
  60: { word: 'mittlerweile', translation: 'in the meantime', urdu: 'اس دوران' },
  61: { word: 'nahezu', translation: 'almost', urdu: 'تقریباً' },
  62: { word: 'nein', translation: 'no', urdu: 'نہیں' },
  63: { word: 'netterweise', translation: 'kindly', urdu: 'مہربانی سے' },
  64: { word: 'nicht', translation: 'not', urdu: 'نہیں' },
  65: { word: 'nie', translation: 'never', urdu: 'کبھی نہیں' },
  66: { word: 'niemals', translation: 'never', urdu: 'کبھی بھی نہیں' },
  67: { word: 'noch', translation: 'still / yet', urdu: 'ابھی / ابھی تک' },
  68: { word: 'nochmal', translation: 'again', urdu: 'دوبارہ' },
  69: { word: 'normalerweise', translation: 'normally', urdu: 'عام طور پر' },
  70: { word: 'nötigenfalls', translation: 'if necessary', urdu: 'ضرورت پڑنے پر' },
  71: { word: 'nun', translation: 'now', urdu: 'اب' },
  72: { word: 'nur', translation: 'only', urdu: 'صرف' },
  73: { word: 'oftmals', translation: 'often', urdu: 'اکثر' },
  74: { word: 'schlimmstenfalls', translation: 'worst case', urdu: 'بدترین صورت میں' },
  75: { word: 'ständig', translation: 'constantly', urdu: 'مسلسل' },
  76: { word: 'stets', translation: 'always', urdu: 'ہمیشہ' },
  77: { word: 'tagsüber', translation: 'during the day', urdu: 'دن کے وقت' },
  78: { word: 'überaus', translation: 'extremely', urdu: 'انتہائی' },
  79: { word: 'übrigens', translation: 'by the way', urdu: 'ویسے' },
  80: { word: 'ungewiss', translation: 'uncertain', urdu: 'غیر یقینی' },
  81: { word: 'vermehrt', translation: 'increasingly', urdu: 'بڑھتا ہوا' },
  82: { word: 'vorüber', translation: 'over / past', urdu: 'ختم / گزر گیا' },
  83: { word: 'weiterhin', translation: 'furthermore', urdu: 'مزید / جاری طور پر' },
  84: { word: 'zugleich', translation: 'at the same time', urdu: 'ایک ہی وقت میں' },
  85: { word: 'zumeist', translation: 'mostly', urdu: 'زیادہ تر' },
  86: { word: 'zumindest', translation: 'at least', urdu: 'کم از کم' },
  87: { word: 'zunehmend', translation: 'increasingly', urdu: 'تیزی سے بڑھتا ہوا' },
  88: { word: 'zwischendurch', translation: 'in between', urdu: 'درمیان میں' }
};

const filepath = path.join(__dirname, 'src', 'data', 'b1-adverbs.ts');
let content = fs.readFileSync(filepath, 'utf-8');

// The original file uses some unicode escapes like \u00e4 for ä. 
// We will simply replace the translations and urdu fields for each id.

// Parse each object manually
const objectRegex = /\{\s*id:\s*(\d+)[^}]+\}/g;

let updatedContent = content.replace(objectRegex, (match, idStr) => {
  const id = parseInt(idStr, 10);
  const entry = data[id];
  if (!entry) return match; // fallback if id not in our list
  
  // Try to preserve the word format exactly as it was, but use our new translation/urdu.
  // Actually, we can just rewrite the object to ensure the word uses correct characters without unicode escapes if desired.
  // Or keep it simple:
  // We'll replace the whole object string. We need to be careful with quotes.
  return `{ id: ${id}, word: "${entry.word}", translation: "${entry.translation}", urdu: "${entry.urdu}", category: 'Adverbs', level: 'B1' }`;
});

fs.writeFileSync(filepath, updatedContent, 'utf-8');
console.log('Fixed b1-adverbs.ts');
