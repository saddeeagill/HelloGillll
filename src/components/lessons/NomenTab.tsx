"use client";
import React, { useState } from "react";
import { Lesson } from "@/data/lessons";
import { SUPPORTED_LANGUAGES } from "@/data/languages";
import TranslateText from "../TranslateText";



export default function NomenTab({ lesson }: { lesson: Lesson }) {
  const [activeTopicId, setActiveTopicId] = useState(lesson.topics[0]?.id || "");
  const [selectedLangCode, setSelectedLangCode] = useState("en");
  const activeTopic = lesson.topics.find((t) => t.id === activeTopicId);

  // Helper to highlight specific nouns in the text
  const highlightNouns = (text: string) => {
    // Collect all singular and plural forms to highlight
    const wordsToHighlight = new Set<string>();
    const nomenList = lesson.nomenList || [];
    nomenList.forEach(n => {
      wordsToHighlight.add(n.singular);
      if (n.plural !== '-') wordsToHighlight.add(n.plural);
    });

    // We split by non-word boundaries to keep punctuation intact
    return text.split(/(\b)/).map((segment, i) => {
      if (wordsToHighlight.has(segment)) {
        return (
          <span key={i} className="bg-[#000000] text-white px-1 py-0.5 rounded font-bold mx-px shadow-sm">
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-[#000000]">Nomen (Nouns)</h2>
          
          {/* Language Selector */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-bold text-gray-500 uppercase tracking-wide">Language:</label>
            <select 
              value={selectedLangCode}
              onChange={(e) => setSelectedLangCode(e.target.value)}
              className="bg-white border border-gray-200 text-black text-sm rounded-lg focus:ring-[#000000] focus:border-[#000000] block p-2 font-medium cursor-pointer shadow-sm"
            >
              {SUPPORTED_LANGUAGES.map(lang => (
                <option key={lang.code} value={lang.code}>
                  {lang.name} ({lang.nativeName})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-gray-100 border-b-2 border-gray-200 text-black">
                <th className="py-3 px-4 font-semibold text-sm w-16">Nr.</th>
                <th className="py-3 px-4 font-semibold text-sm">Singular</th>
                <th className="py-3 px-4 font-semibold text-sm">Plural</th>
                <th className="py-3 px-4 font-semibold text-sm">
                  {SUPPORTED_LANGUAGES.find(l => l.code === selectedLangCode)?.nativeName || "Translation"}
                </th>
              </tr>
            </thead>
            <tbody>
              {(lesson.nomenList || []).map((item, index) => (
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
                        className="w-6 h-6 rounded-full bg-[#000000] text-white flex items-center justify-center hover:bg-[#333333] transition-colors flex-shrink-0"
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
                    {selectedLangCode === 'en' ? (
                      <span className="font-medium text-black">
                        {item.english}
                      </span>
                    ) : (
                      <TranslateText text={item.singular} targetLang={selectedLangCode} />
                    )}
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
