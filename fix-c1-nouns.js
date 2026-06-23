const fs = require('fs');

const file = 'src/data/c1-nouns-part1.ts';
let content = fs.readFileSync(file, 'utf8');

const lines = content.split('\n');

const updates = {
  1: { t: "dismantling", u: "ختم کرنا" },
  2: { t: "dinner", u: "رات کا کھانا" },
  3: { t: "dinner", u: "رات کا کھانا" },
  4: { t: "occident", u: "مغرب" },
  5: { t: "adventurer", u: "مہم جو" },
  6: { t: "seclusion", u: "تنہائی" },
  7: { t: "demarcation", u: "حد بندی" },
  8: { t: "sequence", u: "ترتیب" },
  9: { t: "rejection", u: "نامنظوری" },
  10: { t: "losing weight", u: "وزن کم کرنا" },
  11: { t: "retrieval process", u: "بازیافت کا عمل" },
  12: { t: "sales market", u: "سیلز مارکیٹ" },
  13: { t: "digression", u: "موضوع سے ہٹنا" },
  14: { t: "graduate (female)", u: "گریجویٹ (خاتون)" },
  15: { t: "descent", u: "نزول" },
  16: { t: "smear / swab", u: "نمونہ / مسح" },
  17: { t: "deviation", u: "انحراف" },
  18: { t: "nobility", u: "شرافت" },
  19: { t: "adolescence", u: "لڑکپن" },
  20: { t: "aerodynamics", u: "ایروڈینامکس" },
  21: { t: "academic couple", u: "علمی جوڑا" },
  22: { t: "accumulator / battery", u: "بیٹری" },
  23: { t: "actor / player", u: "اداکار" },
  24: { t: "acceptance", u: "قبولیت" },
  25: { t: "algorithm", u: "الگورتھم" },
  26: { t: "bare necessities", u: "انتہائی ضروری اشیاء" },
  27: { t: "everyday stress", u: "روزمرہ کا تناؤ" },
  28: { t: "altar", u: "قربان گاہ" },
  29: { t: "age recommendation", u: "عمر کی سفارش" },
  30: { t: "peer / contemporary", u: "ہم عمر" },
  31: { t: "age group", u: "عمر کا گروپ" },
  32: { t: "age difference", u: "عمر کا فرق" },
  33: { t: "anatomy", u: "تشریح الابدان" },
  34: { t: "recognition", u: "اعتراف" },
  35: { t: "requirement", u: "تقاضا" },
  36: { t: "person addressed", u: "مخاطب" },
  37: { t: "fear hierarchy", u: "خوف کی درجہ بندی" },
  38: { t: "tingling from fear", u: "خوف سے جھرجھری" },
  39: { t: "state of anxiety", u: "بے چینی کی حالت" },
  40: { t: "investment opportunity", u: "سرمایہ کاری کا موقع" },
  41: { t: "occasion", u: "موقع" },
  42: { t: "issue / request", u: "درخواست / مسئلہ" },
  43: { t: "assumption", u: "مفروضہ" },
  44: { t: "adaptation process", u: "موافقت کا عمل" },
  45: { t: "incentive", u: "ترغیب" },
  46: { t: "opinion / view", u: "رائے" },
  47: { t: "tension", u: "تناؤ" },
  48: { t: "speech", u: "تقریر" },
  49: { t: "claim", u: "دعویٰ" },
  50: { t: "increase", u: "اضافہ" },
  51: { t: "effort", u: "کوشش" },
  52: { t: "portion / share", u: "حصہ" },
  53: { t: "anthropologist", u: "ماہر بشریات" },
  54: { t: "antiquity", u: "عہد قدیم" },
  55: { t: "user", u: "صارف" },
  56: { t: "signs", u: "نشانیاں" },
  57: { t: "app", u: "ایپ" },
  58: { t: "employer", u: "آجر" },
  59: { t: "employee", u: "ملازم" },
  60: { t: "work requirement", u: "کام کی ضرورت" },
  61: { t: "working conditions", u: "کام کے حالات" },
  62: { t: "workload", u: "کام کا بوجھ" },
  63: { t: "workflow", u: "ورک فلو" },
  64: { t: "labor research", u: "لیبر ریسرچ" },
  65: { t: "labor force potential", u: "لیبر فورس کی صلاحیت" },
  66: { t: "labor market", u: "لیبر مارکیٹ" },
  67: { t: "occupational physician", u: "پیشہ ورانہ معالج" },
  68: { t: "work stress", u: "کام کا تناؤ" },
  69: { t: "employment relationship", u: "روزگار کے تعلقات" },
  70: { t: "working world", u: "کام کی دنیا" },
  71: { t: "working hours", u: "کام کے اوقات" },
  72: { t: "working time model", u: "ورکنگ ٹائم ماڈل" },
  73: { t: "archaeology", u: "آثار قدیمہ" },
  74: { t: "archaeological park", u: "آثار قدیمہ کا پارک" },
  75: { t: "argument", u: "دلیل" },
  76: { t: "poverty", u: "غربت" },
  77: { t: "risk of poverty", u: "غربت کا خطرہ" },
  78: { t: "biodiversity", u: "حیاتیاتی تنوع" },
  79: { t: "aspect", u: "پہلو" },
  80: { t: "assistant", u: "معاون" },
  81: { t: "breathing strength", u: "سانس لینے کی طاقت" },
  82: { t: "atmosphere", u: "ماحول" },
  83: { t: "processing", u: "پروسیسنگ" },
  84: { t: "emergence", u: "ظہور" },
  85: { t: "attention", u: "توجہ" },
  86: { t: "getting up", u: "بیدار ہونا / اٹھنا" },
  87: { t: "ascent", u: "چڑھائی" },
  88: { t: "advancement opportunities", u: "ترقی کے مواقع" },
  89: { t: "boost / buoyancy", u: "فروغ" },
  90: { t: "growing up", u: "پرورش پانا" },
  91: { t: "moment", u: "لمحہ" },
  92: { t: "manner of expression", u: "اظہار کا طریقہ" },
  93: { t: "dispute / debate", u: "تنازعہ / بحث" },
  94: { t: "being well-rested", u: "خوب آرام کیا ہوا" },
  95: { t: "compensation / balance", u: "توازن / معاوضہ" },
  96: { t: "fear of exclusion", u: "خارج ہونے کا خوف" },
  97: { t: "living out", u: "جی بھر کر جینا" },
  98: { t: "extent", u: "حد / پیمانہ" },
  99: { t: "state of emergency", u: "ہنگامی حالت" },
  100: { t: "extinction", u: "معدومیت" }
};

let modifiedLines = [];
for (let i = 0; i < lines.length; i++) {
  let line = lines[i];
  const match = line.match(/\{ id: (\d+),/);
  if (match) {
    const id = parseInt(match[1]);
    if (updates[id]) {
      line = line.replace(/translation:\s*"[^"]+"/, `translation: "${updates[id].t}"`);
      line = line.replace(/urdu:\s*"[^"]+"/, `urdu: "${updates[id].u}"`);
    }
  }
  modifiedLines.push(line);
}

fs.writeFileSync(file, modifiedLines.join('\n'));
console.log('Fixed 1-100');
