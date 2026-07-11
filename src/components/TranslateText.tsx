"use client";
import React, { useEffect, useState, useRef } from 'react';
import { translateText } from '@/utils/translate';

interface TranslateTextProps {
  text: string;
  targetLang: string;
}

export default function TranslateText({ text, targetLang }: TranslateTextProps) {
  const [translated, setTranslated] = useState<string>("...");
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px' }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let isMounted = true;
    if (isVisible) {
      setTranslated("...");
      translateText(text, targetLang).then((res) => {
        if (isMounted) setTranslated(res);
      });
    }
    return () => { isMounted = false; };
  }, [text, targetLang, isVisible]);

  return <span ref={ref} className="text-sm font-medium text-black mt-1 block animate-fade-in">{translated}</span>;
}
