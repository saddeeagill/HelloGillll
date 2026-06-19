export const CACHE: Record<string, string> = {};
const queueMap: Record<string, { text: string; resolve: (val: string) => void }[]> = {};
const timeoutMap: Record<string, any> = {};

export function translateText(text: string, targetLang: string): Promise<string> {
  if (targetLang === 'en' || targetLang === 'de') return Promise.resolve(text);
  
  const cacheKey = `${targetLang}:${text}`;
  if (CACHE[cacheKey]) return Promise.resolve(CACHE[cacheKey]);

  return new Promise((resolve) => {
    if (!queueMap[targetLang]) queueMap[targetLang] = [];
    queueMap[targetLang].push({ text, resolve });
    
    if (!timeoutMap[targetLang]) {
      timeoutMap[targetLang] = setTimeout(() => {
        processQueue(targetLang);
      }, 100);
    }
  });
}

async function processQueue(targetLang: string) {
  timeoutMap[targetLang] = null;
  const currentQueue = [...queueMap[targetLang]];
  queueMap[targetLang] = [];
  
  if (currentQueue.length === 0) return;

  // Google Translate API has a ~2000 char limit for GET requests.
  // We chunk by 40 items.
  const CHUNK_SIZE = 40;
  for (let i = 0; i < currentQueue.length; i += CHUNK_SIZE) {
    const chunk = currentQueue.slice(i, i + CHUNK_SIZE);
    
    // We use newline to separate words. Google preserves newlines.
    const combinedWithNewlines = chunk.map(q => q.text).join('\n');
    
    try {
      const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=de&tl=${targetLang}&dt=t&q=${encodeURIComponent(combinedWithNewlines)}`);
      if (!res.ok) throw new Error("Network response was not ok");
      const data = await res.json();
      
      const translatedLines = data[0].map((item: any) => item[0]).join('').split('\n');
      
      chunk.forEach((item, index) => {
        const translated = translatedLines[index]?.trim() || item.text;
        CACHE[`${targetLang}:${item.text}`] = translated;
        item.resolve(translated);
      });
    } catch (error) {
      console.error("Translation error", error);
      // Fallback to original text on error
      chunk.forEach(item => item.resolve(item.text));
    }
  }
}
