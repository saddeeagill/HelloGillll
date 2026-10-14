import { NextResponse } from 'next/server';

// Server-side in-memory translation cache (persists across requests)
const SERVER_CACHE = new Map<string, string>();

async function fetchFromGoogle(text: string, targetLang: string): Promise<string[] | null> {
  const clients = ['gtx', 'dict-chrome-ex'];

  for (let attempt = 0; attempt < 3; attempt++) {
    const client = clients[attempt % clients.length];
    try {
      const url = `https://translate.googleapis.com/translate_a/single?client=${client}&sl=de&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
        },
      });

      if (response.ok) {
        const data = await response.json();
        const combined = data[0].map((item: any) => item[0]).join('');
        return combined.split('\n');
      }

      if (response.status === 429) {
        // Rate limited — back off before retrying with alternative client
        await new Promise((resolve) => setTimeout(resolve, 300 * (attempt + 1)));
      }
    } catch {
      // Continue to next attempt
    }
  }

  return null;
}

export async function POST(request: Request) {
  try {
    const { text, targetLang } = await request.json();

    if (!text || !targetLang) {
      return NextResponse.json({ error: 'Missing text or targetLang' }, { status: 400 });
    }

    const lines: string[] = text.split('\n');
    const results: string[] = new Array(lines.length);
    const uncachedIndices: number[] = [];
    const uncachedLines: string[] = [];

    // Step 1: Check server cache
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const key = `${targetLang}:${line.trim()}`;
      if (SERVER_CACHE.has(key)) {
        results[i] = SERVER_CACHE.get(key)!;
      } else {
        uncachedIndices.push(i);
        uncachedLines.push(line);
      }
    }

    // Step 2: Fetch any missing translations from Google Translate
    if (uncachedLines.length > 0) {
      const translated = await fetchFromGoogle(uncachedLines.join('\n'), targetLang);

      if (translated) {
        uncachedIndices.forEach((origIdx, pos) => {
          const transLine = translated[pos]?.trim() || lines[origIdx];
          const key = `${targetLang}:${lines[origIdx].trim()}`;
          SERVER_CACHE.set(key, transLine);
          results[origIdx] = transLine;
        });
      } else {
        // Graceful fallback to original lines if rate-limited
        uncachedIndices.forEach((origIdx) => {
          results[origIdx] = lines[origIdx];
        });
      }
    }

    return NextResponse.json({ translatedLines: results });
  } catch (error) {
    console.error('Translation API Route Error:', error);
    // Return original text rather than a 500 error to avoid breaking the client UI
    return NextResponse.json({ translatedLines: [] }, { status: 200 });
  }
}
