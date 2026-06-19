'use client';

import React, { useState } from 'react';
import { A1_VOCABULARY } from '../data/vocabulary';

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

const CATEGORIES = ['Nouns', 'Adjectives', 'Adverbs', 'Irregular Verbs', 'Regular Verbs', 'Modal Verbs'];

export default function VocabularyView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Nouns');

  // Filter logic
  const filteredWords = A1_VOCABULARY.filter(item => {
    const matchesSearch = item.word.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.translation.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const playAudio = (word: string) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech to prevent queuing up too many
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'de-DE';
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Text-to-speech is not supported in your browser.");
    }
  };

  return (
    <div className="flex flex-col h-full w-full max-w-4xl mx-auto pb-20 px-3 md:px-0">
      
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 md:mb-8 pt-4">
        <div className="flex items-center gap-3 md:gap-4">
          <h1 className="text-2xl md:text-4xl font-extrabold text-[#0f7650] drop-shadow-sm tracking-tight">
            Vocabulary
          </h1>
        </div>
      </div>

      {/* Controls: Search and Categories */}
      <div className="flex flex-col gap-3 md:gap-4 mb-6">
        {/* Search Bar */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 md:pl-5 flex items-center pointer-events-none">
            <svg className="h-4 w-4 md:h-6 md:w-6 text-gray-400 group-focus-within:text-[#e30613] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search in German or English..."
            className="w-full pl-10 md:pl-14 pr-4 md:pr-6 py-2.5 md:py-4 bg-white border-2 border-gray-100 rounded-2xl text-base md:text-lg text-black placeholder-gray-400 focus:outline-none focus:border-[#e30613] focus:ring-4 focus:ring-[#e30613]/10 transition-all shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Categories Carousel */}
        <div className="flex overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide gap-1.5 md:gap-2 snap-x">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`snap-start whitespace-nowrap px-4 py-1.5 md:px-6 md:py-2.5 rounded-full font-bold text-xs md:text-sm transition-all shadow-sm border-2 ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-[#0f7650] to-[#0a5237] text-white border-transparent transform scale-105 shadow-md'
                  : 'bg-white text-gray-600 border-gray-100 hover:border-gray-200 hover:bg-gray-50 active:scale-95'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Word Table */}
      <div className="mt-1 md:mt-2 px-0 md:px-1">
        <div className="bg-white border-2 border-gray-100 rounded-xl md:rounded-2xl shadow-sm overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[500px] md:min-w-[800px]">
            <thead>
              <tr className="bg-gray-50 border-b-2 border-gray-100 text-gray-500">
                <th className="py-2 px-3 md:py-4 md:px-6 font-bold text-xs md:text-lg w-1/4">Deutsch</th>
                {activeCategory === 'All' || activeCategory === 'Nouns' ? (
                  <th className="py-2 px-3 md:py-4 md:px-6 font-bold text-xs md:text-lg w-1/6">Plural</th>
                ) : null}
                {(activeCategory === 'All' || activeCategory === 'Irregular Verbs' || activeCategory === 'Regular Verbs' || activeCategory === 'Modal Verbs') && (
                  <>
                    <th className="py-2 px-3 md:py-4 md:px-6 font-bold text-xs md:text-lg w-1/6">Stammformen</th>
                    <th className="py-2 px-3 md:py-4 md:px-6 font-bold text-xs md:text-lg w-1/4">Konjugationen</th>
                  </>
                )}
                <th className="py-2 px-3 md:py-4 md:px-6 font-bold text-xs md:text-lg w-1/4">English</th>
              </tr>
            </thead>
            <tbody>
              {filteredWords.length > 0 ? (
                filteredWords.map((item, index) => {
                  const uniqueId = `${item.category}-${item.id}`;
                  const isVerb = item.category === 'Irregular Verbs' || item.category === 'Regular Verbs' || item.category === 'Modal Verbs';
                  const isNoun = item.category === 'Nouns';
                  const showVerbColumns = activeCategory === 'All' || activeCategory === 'Irregular Verbs' || activeCategory === 'Regular Verbs' || activeCategory === 'Modal Verbs';
                  const showNounColumns = activeCategory === 'All' || activeCategory === 'Nouns';
                  
                  return (
                    <tr 
                      key={uniqueId}
                      className={`border-b border-gray-100 hover:bg-yellow-50/50 transition-colors ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                      }`}
                    >
                      <td className="py-2 px-3 md:py-4 md:px-6 align-top">
                        <div className="flex items-start gap-2 md:gap-4 pt-0.5 md:pt-1">
                          <button 
                            onClick={(e) => { e.stopPropagation(); playAudio(item.word); }}
                            className="w-6 h-6 md:w-10 md:h-10 rounded-full bg-[#e30613]/10 text-[#e30613] flex items-center justify-center hover:bg-[#e30613] hover:text-white transition-all flex-shrink-0 active:scale-95 shadow-sm mt-0.5"
                            title="Hören (Listen)"
                          >
                            <svg className="w-3 h-3 md:w-[18px] md:h-[18px]" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                              <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                            </svg>
                          </button>
                          <span className="text-sm md:text-xl font-bold text-black mt-0.5 md:mt-1">
                            {item.id}) {item.word}
                          </span>
                        </div>
                      </td>

                      {showNounColumns && (
                        <td className="py-2 px-3 md:py-4 md:px-6 align-top">
                          {isNoun && (item as VocabItem).plural ? (
                            <span className="text-xs md:text-base text-gray-700 font-medium leading-snug block mt-1 md:mt-2">
                              {(item as VocabItem).plural}
                            </span>
                          ) : (
                            <span className="text-gray-300 mt-1 md:mt-2 block">-</span>
                          )}
                        </td>
                      )}
                      
                      {showVerbColumns && (
                        <>
                          <td className="py-2 px-3 md:py-4 md:px-6 align-top">
                            {isVerb && (item as VocabItem).principalParts ? (
                              <span className="text-xs md:text-base text-blue-800 font-medium leading-snug block mt-1 md:mt-2">
                                {(item as VocabItem).principalParts}
                              </span>
                            ) : (
                              <span className="text-gray-300 mt-1 md:mt-2 block">-</span>
                            )}
                          </td>
                          <td className="py-2 px-3 md:py-4 md:px-6 align-top">
                            {isVerb && (item as VocabItem).conjugation ? (
                              <div className="text-[10px] md:text-sm text-gray-700 whitespace-pre-line leading-tight md:leading-relaxed mt-1 md:mt-2 font-medium bg-blue-50/50 p-1.5 md:p-3 rounded-lg border border-blue-100/50 inline-block w-full">
                                {(item as VocabItem).conjugation}
                              </div>
                            ) : (
                              <span className="text-gray-300 mt-1 md:mt-2 block">-</span>
                            )}
                          </td>
                        </>
                      )}

                      <td className="py-2 px-3 md:py-4 md:px-6 align-top">
                        <span className="text-sm md:text-lg text-[#0f7650] font-bold mt-1 md:mt-2 block">{item.translation}</span>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan={
                    1 + // Deutsch
                    1 + // English
                    (activeCategory === 'All' || activeCategory === 'Nouns' ? 1 : 0) +
                    (activeCategory === 'All' || activeCategory === 'Irregular Verbs' || activeCategory === 'Regular Verbs' || activeCategory === 'Modal Verbs' ? 2 : 0)
                  } className="py-12 text-center">
                    <div className="text-5xl mb-4">🔍</div>
                    <h3 className="text-xl font-bold text-gray-600">No words found</h3>
                    <p className="text-gray-400 mt-2">Try a different search or category.</p>
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
