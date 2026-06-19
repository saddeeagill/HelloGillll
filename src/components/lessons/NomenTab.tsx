"use client";
import React, { useState } from "react";
import { Lesson } from "@/data/lessons";

const NOMEN_LIST = [
  { id: 1, singular: 'Anruf', plural: 'Anrufe', english: 'phone call' },
  { id: 2, singular: 'Ausweis', plural: 'Ausweise', english: 'ID card' },
  { id: 3, singular: 'Baby', plural: 'Babys', english: 'baby' },
  { id: 4, singular: 'Bekannte', plural: 'Bekannten', english: 'acquaintance (female)' },
  { id: 5, singular: 'Ehefrau', plural: 'Ehefrauen', english: 'wife' },
  { id: 6, singular: 'Ehemann', plural: 'Ehemänner', english: 'husband' },
  { id: 7, singular: 'Erwachsene', plural: 'Erwachsenen', english: 'adult' },
  { id: 8, singular: 'Heimat', plural: '-', english: 'homeland' },
  { id: 9, singular: 'Herr', plural: 'Herren', english: 'mister/gentleman' },
  { id: 10, singular: 'Hochzeit', plural: 'Hochzeiten', english: 'wedding' },
  { id: 11, singular: 'Hund', plural: 'Hunde', english: 'dog' },
  { id: 12, singular: 'Jugendliche', plural: 'Jugendlichen', english: 'teenager' },
  { id: 13, singular: 'Kind', plural: 'Kinder', english: 'child' },
  { id: 14, singular: 'Mutter', plural: 'Mütter', english: 'mother' },
  { id: 15, singular: 'Partner', plural: 'Partner', english: 'partner (male)' },
  { id: 16, singular: 'Partnerin', plural: 'Partnerinnen', english: 'partner (female)' },
  { id: 17, singular: 'Vater', plural: 'Väter', english: 'father' },
];

export default function NomenTab({ lesson }: { lesson: Lesson }) {
  const [activeTopicId, setActiveTopicId] = useState(lesson.topics[0]?.id || "");
  const activeTopic = lesson.topics.find((t) => t.id === activeTopicId);

  // Helper to highlight specific nouns in the text
  const highlightNouns = (text: string) => {
    // Collect all singular and plural forms to highlight
    const wordsToHighlight = new Set<string>();
    NOMEN_LIST.forEach(n => {
      wordsToHighlight.add(n.singular);
      if (n.plural !== '-') wordsToHighlight.add(n.plural);
    });

    // We split by non-word boundaries to keep punctuation intact
    return text.split(/(\b)/).map((segment, i) => {
      if (wordsToHighlight.has(segment)) {
        return (
          <span key={i} className="bg-[#0f7650] text-white px-1 py-0.5 rounded font-bold mx-px shadow-sm">
            {segment}
          </span>
        );
      }
      return <React.Fragment key={i}>{segment}</React.Fragment>;
    });
  };

  const playAudio = (word: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = "de-DE";
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Text-to-speech is not supported in your browser.");
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Nouns Table Area */}
      <div className="w-full">
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#0f7650]">Nomen (Nouns)</h2>
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-gray-100 border-b-2 border-gray-200 text-black">
                <th className="py-3 px-4 font-semibold text-sm w-16">Nr.</th>
                <th className="py-3 px-4 font-semibold text-sm">Singular</th>
                <th className="py-3 px-4 font-semibold text-sm">Plural</th>
                <th className="py-3 px-4 font-semibold text-sm">English</th>
              </tr>
            </thead>
            <tbody>
              {NOMEN_LIST.map((item, index) => (
                <tr 
                  key={item.id} 
                  className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                  }`}
                >
                  <td className="py-3 px-4 text-sm font-medium text-gray-500 align-middle">
                    {item.id}
                  </td>
                  <td className="py-3 px-4 align-middle">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => playAudio(item.singular)}
                        className="w-6 h-6 rounded-full bg-[#0f7650] text-white flex items-center justify-center hover:bg-[#0a5237] transition-colors flex-shrink-0"
                        title="Hören (Listen)"
                      >
                        <svg className="w-3 h-3 ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                          <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                          <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                        </svg>
                      </button>
                      <span className="text-sm font-bold text-black">{item.singular}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-black align-middle">
                    {item.plural}
                  </td>
                  <td className="py-3 px-4 text-sm text-black align-middle">
                    {item.english}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* Story Text with Highlights */}
      <div className="w-full flex flex-col">
        <h3 className="text-lg font-bold mb-4 flex items-center justify-between">
          <span>Geschichte mit Nomen</span>
          <div className="flex bg-gray-100 rounded-lg p-1">
            {lesson.topics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => setActiveTopicId(topic.id)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                  activeTopicId === topic.id
                    ? "bg-white text-black shadow-sm"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                {topic.title}
              </button>
            ))}
          </div>
        </h3>
        
        <div className="prose max-w-none text-black leading-relaxed md:text-lg bg-gray-50 p-6 rounded-xl border border-gray-100">
          <p className="whitespace-pre-wrap">{activeTopic ? highlightNouns(activeTopic.content) : ""}</p>
        </div>
      </div>
    </div>
  );
}
