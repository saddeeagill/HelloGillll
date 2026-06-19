"use client";
import React, { useEffect, useState } from 'react';
import { translateText } from '@/utils/translate';

interface TranslateTextProps {
  text: string;
  targetLang: string;
}

export default function TranslateText({ text, targetLang }: TranslateTextProps) {
  const [translated, setTranslated] = useState<string>("...");

  useEffect(() => {
    let isMounted = true;
    setTranslated("...");
    translateText(text, targetLang).then((res) => {
      if (isMounted) setTranslated(res);
    });
    return () => { isMounted = false; };
  }, [text, targetLang]);

  return <span className="text-sm font-medium text-black mt-1 block animate-fade-in">{translated}</span>;
}
