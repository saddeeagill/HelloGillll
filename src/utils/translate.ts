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
  // We chunk by 10 items to prevent URI Too Long or Rate Limit errors.
  const CHUNK_SIZE = 10;
  for (let i = 0; i < currentQueue.length; i += CHUNK_SIZE) {
    const chunk = currentQueue.slice(i, i + CHUNK_SIZE);
    
    // We use newline to separate words. Google preserves newlines.
    const combinedWithNewlines = chunk.map(q => q.text).join('\n');
    
    try {
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: combinedWithNewlines, targetLang }),
      });
      
      if (!res.ok) throw new Error("Network response was not ok");
      
      const data = await res.json();
      const translatedLines = data.translatedLines;
      
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

    // Add a small delay between requests to avoid rate limits
    if (i + CHUNK_SIZE < currentQueue.length) {
      await new Promise(r => setTimeout(r, 500));
    }
  }
}

/**
 * Bulk-translate an array of strings for print/export.
 * Uses the shared CACHE first (words already shown on screen are instantly resolved),
 * then fetches all remaining misses in large parallel chunks with no inter-chunk delay.
 */
export async function translateBatch(texts: string[], targetLang: string): Promise<string[]> {
  if (targetLang === 'en' || targetLang === 'de') return texts;

  const results: string[] = new Array(texts.length);
  const uncachedIndices: number[] = [];

  // Step 1: resolve from cache synchronously — instant for already-viewed words
  texts.forEach((text, i) => {
    const cacheKey = `${targetLang}:${text}`;
    if (CACHE[cacheKey]) {
      results[i] = CACHE[cacheKey];
    } else {
      uncachedIndices.push(i);
    }
  });

  if (uncachedIndices.length === 0) return results;

  // Step 2: fetch cache-misses in 50-word chunks, all in parallel (no delay)
  const PRINT_CHUNK_SIZE = 50;
  const chunkPromises: Promise<void>[] = [];

  for (let i = 0; i < uncachedIndices.length; i += PRINT_CHUNK_SIZE) {
    const chunkIndices = uncachedIndices.slice(i, i + PRINT_CHUNK_SIZE);
    const chunkTexts = chunkIndices.map(idx => texts[idx]);

    const promise = (async () => {
      try {
        const res = await fetch('/api/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: chunkTexts.join('\n'), targetLang }),
        });

        if (!res.ok) throw new Error('Network response was not ok');

        const data = await res.json();
        const translatedLines: string[] = data.translatedLines;

        chunkIndices.forEach((originalIdx, chunkPos) => {
          const translated = translatedLines[chunkPos]?.trim() || texts[originalIdx];
          CACHE[`${targetLang}:${texts[originalIdx]}`] = translated;
          results[originalIdx] = translated;
        });
      } catch {
        // Fallback to original text on error
        chunkIndices.forEach(idx => {
          results[idx] = texts[idx];
        });
      }
    })();

    chunkPromises.push(promise);
  }

  await Promise.all(chunkPromises);
  return results;
}
