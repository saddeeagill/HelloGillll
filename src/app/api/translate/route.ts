import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { text, targetLang } = await request.json();

    if (!text || !targetLang) {
      return NextResponse.json({ error: 'Missing text or targetLang' }, { status: 400 });
    }

    const response = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=de&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0', // Sometimes helps avoid rate limits
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Google Translate API returned ${response.status}`);
    }

    const data = await response.json();
    const translatedLines = data[0].map((item: any) => item[0]).join('').split('\n');

    return NextResponse.json({ translatedLines });
  } catch (error) {
    console.error('Translation API Route Error:', error);
    return NextResponse.json({ error: 'Failed to translate' }, { status: 500 });
  }
}
