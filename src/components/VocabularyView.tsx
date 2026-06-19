"use client";

import React, { useState } from "react";
import { VOCABULARY } from "../data/vocabulary";
import { SUPPORTED_LANGUAGES, getGoogleTranslateUrl } from "../data/languages";

interface VocabItem {
  id: number;
  word: string;
  translation: string;
  category: string;
  level: string;
  article?: string;
  plural?: string;
  principalParts?: string;
  conjugation?: string;
}

const CATEGORIES = [
  "All",
  "Nouns",
  "Adjectives",
  "Adverbs",
  "Regular Verbs",
  "Irregular Verbs",
  "Modal Verbs",
];

export default function VocabularyView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedLangCode, setSelectedLangCode] = useState("en");

  // Filter logic
  const filteredWords = VOCABULARY.filter((item) => {
    const matchesSearch =
      item.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.translation.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const playAudio = (word: string) => {
    if ("speechSynthesis" in window) {
      // Cancel any ongoing speech to prevent queuing up too many
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = "de-DE";
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Text-to-speech is not supported in your browser.");
    }
  };

  return (
    <div className="flex flex-col h-full w-full max-w-4xl mx-auto pb-20 px-3 md:px-0">
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 md:mb-6 pt-2">
        <div className="flex items-center gap-2">
          <h1 className="text-xl md:text-2xl font-bold text-black drop-shadow-sm tracking-tight">
            Vocabulary
          </h1>
        </div>
        
        {/* Language Selector */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-bold text-gray-500 uppercase tracking-wide">Language:</label>
          <select 
            value={selectedLangCode}
            onChange={(e) => setSelectedLangCode(e.target.value)}
            className="bg-white border border-gray-200 text-black text-sm rounded-lg focus:ring-[#0f7650] focus:border-[#0f7650] block p-2 font-medium cursor-pointer shadow-sm"
          >
            {SUPPORTED_LANGUAGES.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.name} ({lang.nativeName})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Controls: Search and Categories */}
      <div className="flex flex-col gap-3 mb-5">
        {/* Search Bar */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 md:pl-4 flex items-center pointer-events-none">
            <svg
              className="h-4 w-4 md:h-5 md:w-5 text-gray-400 group-focus-within:text-black transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search in German or English..."
            className="w-full pl-9 md:pl-11 pr-4 py-2 md:py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-black placeholder-gray-400 focus:outline-none focus:border-black transition-all shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Categories Carousel */}
        <div className="flex overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide gap-2 snap-x">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`snap-start whitespace-nowrap px-3 py-1.5 rounded-lg font-medium text-xs md:text-sm transition-colors border ${
                activeCategory === cat
                  ? "bg-[#0f7650] text-white border-[#0f7650] shadow-sm"
                  : "bg-white text-black border-gray-200 hover:border-black hover:bg-gray-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Word Table */}
      <div className="mt-1 md:mt-2 px-0">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[500px] md:min-w-[800px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-black">
                <th className="py-2 px-3 md:py-3 md:px-4 font-semibold text-xs md:text-sm w-1/4">
                  Deutsch
                </th>
                {activeCategory === "All" || activeCategory === "Nouns" ? (
                  <th className="py-2 px-3 md:py-3 md:px-4 font-semibold text-xs md:text-sm w-1/6">
                    Plural
                  </th>
                ) : null}
                {(activeCategory === "All" ||
                  activeCategory === "Irregular Verbs" ||
                  activeCategory === "Regular Verbs" ||
                  activeCategory === "Modal Verbs") && (
                  <>
                    <th className="py-2 px-3 md:py-3 md:px-4 font-semibold text-xs md:text-sm w-1/6">
                      Stammformen
                    </th>
                    <th className="py-2 px-3 md:py-3 md:px-4 font-semibold text-xs md:text-sm w-1/4">
                      Konjugationen
                    </th>
                  </>
                )}
                <th className="py-2 px-3 md:py-3 md:px-4 font-semibold text-xs md:text-sm w-1/4">
                  {SUPPORTED_LANGUAGES.find(l => l.code === selectedLangCode)?.nativeName || "Translation"}
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredWords.length > 0 ? (
                filteredWords.map((item, index) => {
                  const uniqueId = `${item.category}-${item.id}`;
                  const isVerb =
                    item.category === "Irregular Verbs" ||
                    item.category === "Regular Verbs" ||
                    item.category === "Modal Verbs";
                  const isNoun = item.category === "Nouns";
                  const showVerbColumns =
                    activeCategory === "All" ||
                    activeCategory === "Irregular Verbs" ||
                    activeCategory === "Regular Verbs" ||
                    activeCategory === "Modal Verbs";
                  const showNounColumns =
                    activeCategory === "All" || activeCategory === "Nouns";

                  return (
                    <tr
                      key={uniqueId}
                      className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                      }`}
                    >
                      <td className="py-2 px-3 md:py-3 md:px-4 align-middle">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-black whitespace-nowrap">{item.id})</span>
                          <button 
                            onClick={(e) => { e.stopPropagation(); playAudio(item.word); }}
                            className="w-6 h-6 rounded-full bg-[#0f7650] text-white flex items-center justify-center hover:bg-[#0a5237] transition-colors flex-shrink-0"
                            title="Hören (Listen)"
                          >
                            <svg className="w-3 h-3 ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                              <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                            </svg>
                          </button>
                          <span className="text-sm font-medium text-black">{item.word}</span>
                        </div>
                      </td>

                      {showNounColumns && (
                        <td className="py-2 px-3 md:py-3 md:px-4 align-top">
                          {isNoun && (item as VocabItem).plural ? (
                            <span className="text-xs text-black block mt-1">
                              {(item as VocabItem).plural}
                            </span>
                          ) : (
                            <span className="text-gray-400 mt-1 block">-</span>
                          )}
                        </td>
                      )}

                      {showVerbColumns && (
                        <>
                          <td className="py-2 px-3 md:py-3 md:px-4 align-top">
                            {isVerb && (item as VocabItem).principalParts ? (
                              <span className="text-xs text-black block mt-1">
                                {(item as VocabItem).principalParts}
                              </span>
                            ) : (
                              <span className="text-gray-400 mt-1 block">
                                -
                              </span>
                            )}
                          </td>
                          <td className="py-2 px-3 md:py-3 md:px-4 align-top">
                            {isVerb && (item as VocabItem).conjugation ? (
                              <div className="text-xs text-black whitespace-pre-line leading-relaxed mt-1 bg-white border border-gray-200 p-2 rounded-lg inline-block w-full">
                                {(item as VocabItem).conjugation}
                              </div>
                            ) : (
                              <span className="text-gray-400 mt-1 block">
                                -
                              </span>
                            )}
                          </td>
                        </>
                      )}

                      <td className="py-2 px-3 md:py-3 md:px-4 align-top">
                        {selectedLangCode === 'en' ? (
                          <span className="text-sm font-medium text-black mt-1 block">
                            {item.translation}
                          </span>
                        ) : selectedLangCode === 'ur' && (item as any).urdu ? (
                          <span className="text-sm font-medium text-black mt-1 block">
                            {(item as any).urdu}
                          </span>
                        ) : (
                          <a 
                            href={getGoogleTranslateUrl(item.word, selectedLangCode)} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm font-bold text-[#0f7650] hover:underline flex items-center gap-1 mt-1"
                          >
                            Translate
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                          </a>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={
                      1 + // Deutsch
                      1 + // English
                      (activeCategory === "All" || activeCategory === "Nouns"
                        ? 1
                        : 0) +
                      (activeCategory === "All" ||
                      activeCategory === "Irregular Verbs" ||
                      activeCategory === "Regular Verbs" ||
                      activeCategory === "Modal Verbs"
                        ? 2
                        : 0)
                    }
                    className="py-12 text-center"
                  >
                    <div className="text-5xl mb-4">🔍</div>
                    <h3 className="text-xl font-bold text-gray-600">
                      No words found
                    </h3>
                    <p className="text-gray-400 mt-2">
                      Try a different search or category.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
