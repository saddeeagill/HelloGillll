"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import VocabularyView from '@/components/VocabularyView';
import ExamView from '@/components/ExamView';
import LessonView from '@/components/lessons/LessonView';
import Logo from '@/components/Logo';

export default function LevelPage() {
  const params = useParams();
  const level = typeof params?.level === 'string' ? params.level : 'A1';
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState('vocabulary');
  const [vocabCategory, setVocabCategory] = useState('Nouns');
  const [vocabExpanded, setVocabExpanded] = useState(true);
  const [lessonsExpanded, setLessonsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const levelUpper = level.toUpperCase();
  
  const a1Lektionen = Array.from({ length: 16 }, (_, i) => i + 1);
  // We'll prepare an array for A2 lessons as well (currently empty or placeholder)
  const a2Lektionen = [1]; 


  return (
    <div className="min-h-screen bg-white font-sans flex flex-col md:pl-48">
      {/* Header Container */}
      <div className="w-full bg-white flex flex-col z-20 shadow-sm relative">
        <div className="relative w-full flex items-center justify-center">
          <div className="w-full">
            <Logo showBack={true} />
          </div>
          
          {/* Mobile Sidebar Toggle Button */}
          <button 
            className="md:hidden absolute right-4 top-1/2 -translate-y-1/2 text-gray-800 hover:text-black transition-colors z-30"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            ) : (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            )}
          </button>

          {/* Search Bar on Desktop (Absolute Right) */}
          <div className="hidden md:block absolute right-6 top-1/2 -translate-y-1/2 w-64 lg:w-80 z-30">
            <div className="relative group w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-gray-400 group-focus-within:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Suchen..."
                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm text-black placeholder-gray-400 focus:outline-none focus:border-black transition-all shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

      </div>
      
      <div className="w-full h-[3px] bg-[#e5e7eb] relative z-10"></div>

      <div className="flex flex-1 relative">
        {/* Sidebar Overlay for Mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" 
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Sidebar */}
        <aside className={`
          fixed top-0 left-0 h-screen w-48 bg-gray-50 border-r border-gray-200 z-50
          transform transition-transform duration-300 ease-in-out overflow-y-auto
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-6 text-[#000000]">{levelUpper}</h2>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => { 
                    if (activeView === 'vocabulary') {
                      setVocabExpanded(!vocabExpanded);
                    } else {
                      setActiveView('vocabulary');
                      setVocabExpanded(true);
                    }
                  }}
                  className={`w-full text-left px-3 py-3 border-2 rounded-xl font-bold flex justify-between items-center transition-all text-sm ${
                    activeView === 'vocabulary' 
                      ? 'bg-[#e5e7eb] border-[#e5e7eb] text-black shadow-md' 
                      : 'bg-white border-gray-200 text-black hover:border-gray-400 hover:shadow-md'
                  }`}
                >
                  <span>Wortschatz</span>
                  <svg className={`w-4 h-4 transition-transform flex-shrink-0 ${vocabExpanded && activeView === 'vocabulary' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${vocabExpanded && activeView === 'vocabulary' ? 'max-h-[500px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                  <ul className="pl-1 border-l-2 border-gray-200 ml-2 space-y-1 py-1">
                    {["Nouns", "Adjectives", "Adverbs", "Regular Verbs", "Irregular Verbs", "Modal Verbs"].map(cat => {
                      const CATEGORY_MAP: Record<string, string> = { "Nouns": "Nomen", "Adjectives": "Adjektive", "Adverbs": "Adverbien", "Regular Verbs": "Regelmäßige Verben", "Irregular Verbs": "Unregelmäßige Verben", "Modal Verbs": "Modalverben" };
                      return (
                      <li key={cat}>
                        <button
                          onClick={() => {
                            setVocabCategory(cat);
                            setSidebarOpen(false);
                          }}
                          className={`w-full text-left px-2 py-2 rounded-lg font-medium transition-colors text-xs ${
                            vocabCategory === cat
                              ? 'bg-gray-200 text-black shadow-sm'
                              : 'text-gray-600 hover:text-black hover:bg-gray-100'
                          }`}
                        >
                          {CATEGORY_MAP[cat]}
                        </button>
                      </li>
                      );
                    })}
                  </ul>
                </div>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveView('haben_sein'); setSidebarOpen(false); }}
                  className={`w-full text-left px-3 py-3 border-2 rounded-xl font-bold transition-all text-sm ${
                    activeView === 'haben_sein' 
                      ? 'bg-[#e5e7eb] border-[#e5e7eb] text-black shadow-md' 
                      : 'bg-white border-gray-200 text-black hover:border-gray-400 hover:shadow-md'
                  }`}
                >
                  haben & sein
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveView('exam'); setSidebarOpen(false); }}
                  className={`w-full text-left px-3 py-3 border-2 rounded-xl font-bold transition-all text-sm ${
                    activeView === 'exam' 
                      ? 'bg-[#e5e7eb] border-[#e5e7eb] text-black shadow-md' 
                      : 'bg-white border-gray-200 text-black hover:border-gray-400 hover:shadow-md'
                  }`}
                >
                  Prüfung
                </button>
              </li>
            </ul>

            {levelUpper === 'A1' && (
              <div className="mt-8">
                <button 
                  onClick={() => setLessonsExpanded(!lessonsExpanded)}
                  className="w-full text-left px-3 py-3 border-2 border-gray-200 bg-white rounded-xl font-bold flex justify-between items-center hover:border-gray-400 transition-all text-[#000000] text-sm"
                >
                  <span>Lektionen</span>
                  <svg className={`w-4 h-4 transition-transform flex-shrink-0 ${lessonsExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${lessonsExpanded ? 'max-h-[1000px] opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
                  <ul className="space-y-1 pl-1 border-l-2 border-gray-200 ml-2 py-1">
                    {a1Lektionen.map(num => (
                      <li key={`a1_lektion_${num}`}>
                        <button 
                          onClick={() => { setActiveView(`lektion_${num}`); setSidebarOpen(false); }}
                          className={`w-full text-left px-2 py-2 font-semibold rounded-lg transition-all text-xs ${
                            activeView === `lektion_${num}`
                              ? 'bg-[#e5e7eb] text-black shadow-sm'
                              : 'text-gray-600 hover:text-black hover:bg-gray-100'
                          }`}
                        >
                          Lektion {num}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {levelUpper === 'A2' && (
              <div className="mt-8">
                <button 
                  onClick={() => setLessonsExpanded(!lessonsExpanded)}
                  className="w-full text-left px-3 py-3 border-2 border-gray-200 bg-white rounded-xl font-bold flex justify-between items-center hover:border-gray-400 transition-all text-[#000000] text-sm"
                >
                  <span>Lektionen (A2)</span>
                  <svg className={`w-4 h-4 transition-transform flex-shrink-0 ${lessonsExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${lessonsExpanded ? 'max-h-[1000px] opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
                  <ul className="space-y-1 pl-1 border-l-2 border-gray-200 ml-2 py-1">
                    {a2Lektionen.map(num => (
                      <li key={`a2_lektion_${num}`}>
                        <button 
                          onClick={() => { setActiveView(`a2_lektion_${num}`); setSidebarOpen(false); }}
                          className={`w-full text-left px-2 py-2 font-semibold rounded-lg transition-all text-xs ${
                            activeView === `a2_lektion_${num}`
                              ? 'bg-[#e5e7eb] text-black shadow-sm'
                              : 'text-gray-600 hover:text-black hover:bg-gray-100'
                          }`}
                        >
                          Lektion {num} (A2)
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-grow p-4 md:p-8 lg:p-12 text-black overflow-y-auto w-full bg-gray-50/30">
          <div className="w-full max-w-5xl mx-auto h-full">
            {activeView === 'vocabulary' && (
              <VocabularyView level={levelUpper} activeCategory={vocabCategory} searchQuery={searchQuery} />
            )}
            {activeView === 'exam' && <ExamView />}
            
            {/* A1 Lessons */}
            {levelUpper === 'A1' && a1Lektionen.map(num => (
              activeView === `lektion_${num}` && <LessonView key={`a1_${num}`} lessonId={`lektion_${num}`} />
            ))}

            {/* A2 Lessons */}
            {levelUpper === 'A2' && a2Lektionen.map(num => (
              activeView === `a2_lektion_${num}` && <LessonView key={`a2_${num}`} lessonId={`a2_lektion_${num}`} />
            ))}

            {activeView === 'haben_sein' && (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <h2 className="text-2xl font-bold text-gray-500 mb-2">haben & sein coming soon!</h2>
                <p className="text-gray-400">This section is under construction.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
