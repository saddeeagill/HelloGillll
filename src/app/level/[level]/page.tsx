"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import VocabularyView from '@/components/VocabularyView';
import ExamView from '@/components/ExamView';
import LessonView from '@/components/lessons/LessonView';
import HabenSeinView from '@/components/HabenSeinView';
import Logo from '@/components/Logo';

import { SUPPORTED_LANGUAGES } from '@/data/languages';
import { VOCABULARY } from '@/data/vocabulary';

const CATEGORY_LABELS: Record<string, string> = {
  "Nouns": "Nomen",
  "Adjectives": "Adjektive",
  "Adverbs": "Adverbien",
  "Regular Verbs": "Regelmäßige Verben",
  "Irregular Verbs": "Unregelmäßige Verben",
  "Modal Verbs": "Modalverben",
};

export default function LevelPage() {
  const params = useParams();
  const level = typeof params?.level === 'string' ? params.level : 'A1';
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState('vocabulary');
  const [vocabCategory, setVocabCategory] = useState('Nouns');
  const [vocabExpanded, setVocabExpanded] = useState(true);
  const [lessonsExpanded, setLessonsExpanded] = useState(false);

  // Hoisted Vocabulary State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLangCode, setSelectedLangCode] = useState("pt");
  const [showNomenQuiz, setShowNomenQuiz] = useState(false);

  const levelUpper = level.toUpperCase();
  
  const a1Lektionen = Array.from({ length: 16 }, (_, i) => i + 1);
  // We'll prepare an array for A2 lessons as well (currently empty or placeholder)
  const a2Lektionen = [1];

  const handleVocabPrint = () => {
    const filteredWords = VOCABULARY.filter(
      (item) => item.level === levelUpper && item.category === vocabCategory
    );
    const langLabel = SUPPORTED_LANGUAGES.find(l => l.code === selectedLangCode)?.nativeName || 'Translation';
    const categoryLabel = CATEGORY_LABELS[vocabCategory] || vocabCategory;

    const isNoun = vocabCategory === 'Nouns';
    const headerCols = isNoun
      ? `<th>Nr.</th><th>Wort</th><th>Plural</th><th>Artikel</th><th>English</th><th>${langLabel}</th>`
      : `<th>Nr.</th><th>Wort</th><th>English</th><th>${langLabel}</th>`;

    const rows = filteredWords.map((item: any, i) => {
      if (isNoun) {
        return `<tr>
          <td>${i + 1}</td>
          <td><strong>${item.word}</strong></td>
          <td>${item.plural || '-'}</td>
          <td>${item.article || '-'}</td>
          <td>${item.translation}</td>
          <td>${item.translation}</td>
        </tr>`;
      }
      return `<tr>
        <td>${i + 1}</td>
        <td><strong>${item.word}</strong></td>
        <td>${item.translation}</td>
        <td>${item.translation}</td>
      </tr>`;
    }).join('');

    const printHtml = `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <title>${levelUpper} – ${categoryLabel}</title>
  <style>
    @page { size: A4 portrait; margin: 15mm 12mm; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Arial, Helvetica, sans-serif; font-size: 12pt; color: #000; background: #fff; }
    h1 { font-size: 20pt; font-weight: bold; border-bottom: 2px solid #000; padding-bottom: 8px; margin-bottom: 20px; }
    h2 { font-size: 14pt; font-weight: bold; margin-bottom: 12px; }
    table { width: 100%; border-collapse: collapse; font-size: 10pt; page-break-inside: auto; }
    thead { display: table-header-group; }
    thead tr { background: #f0f0f0; border-bottom: 2px solid #ccc; }
    th { padding: 6px 8px; font-weight: bold; text-align: left; }
    td { padding: 5px 8px; border-bottom: 1px solid #eee; text-align: left; }
    tr { page-break-inside: avoid; }
  </style>
</head>
<body>
  <h1>${levelUpper} – ${categoryLabel}</h1>
  <table>
    <thead><tr>${headerCols}</tr></thead>
    <tbody>${rows}</tbody>
  </table>
  <script>window.onload = function(){ window.print(); };<\/script>
</body>
</html>`;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.open();
      printWindow.document.write(printHtml);
      printWindow.document.close();
    }
  };


  return (
    <div className="min-h-screen bg-white font-sans flex flex-col md:pl-48 print:block print:min-h-0 print:pl-0">
      {/* Header Container */}
      <div className="w-full bg-white flex flex-col z-20 shadow-sm relative print:hidden">
        <div className="relative w-full flex items-center justify-center">
          <div className="w-full">
            <Logo showBack={true} />
          </div>
          
          {/* Mobile Level Title (Removed from here, moved to main content) */}

          {/* Mobile Sidebar Toggle Button */}
          <button 
            className="md:hidden absolute right-4 top-1/2 -translate-y-1/2 text-gray-800 hover:text-black transition-colors z-30 flex items-center gap-1.5 bg-gray-50/80 px-2.5 py-1.5 rounded-lg border border-gray-200"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <span className="font-semibold text-sm">Menü</span>
          </button>
        </div>

      </div>
      
      <div className="w-full h-[3px] bg-[#e5e7eb] relative z-10 print:hidden"></div>

      <div className="flex flex-1 relative">
        {/* Sidebar Overlay for Mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden print:hidden" 
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Sidebar */}
        <aside className={`
          fixed top-0 left-0 h-screen w-48 bg-gray-50 border-r border-gray-200 z-50
          transform transition-transform duration-300 ease-in-out overflow-y-auto print:hidden
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
                  <span>Vokabular</span>
                  <svg className={`w-4 h-4 transition-transform flex-shrink-0 ${vocabExpanded && activeView === 'vocabulary' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${vocabExpanded && activeView === 'vocabulary' ? 'max-h-[1500px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                  <ul className="pl-1 border-l-2 border-gray-200 ml-2 space-y-1 py-1">
                    {["Nouns", "Adjectives", "Adverbs", "Regular Verbs", "Irregular Verbs", "Modal Verbs"].map(cat => {
                      const CATEGORY_MAP: Record<string, string> = { "Nouns": "Nomen", "Adjectives": "Adjektive", "Adverbs": "Adverbien", "Regular Verbs": "Regelmäßige Verben", "Irregular Verbs": "Unregelmäßige Verben", "Modal Verbs": "Modalverben" };
                      return (
                      <li key={cat}>
                        <button
                          onClick={() => {
                            setVocabCategory(cat);
                            setSidebarOpen(false);
                            setShowNomenQuiz(false); // Reset nomen quiz view when changing category
                          }}
                          className={`w-full text-left px-2 py-2 rounded-lg font-medium transition-colors text-xs ${
                            vocabCategory === cat && !showNomenQuiz
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

                  {/* Vokabular Extra Controls (Sidebar Injection) */}
                  <div className="mt-4 px-2 flex flex-col gap-3">
                    <button 
                      onClick={() => {
                        setShowNomenQuiz(true);
                        setSidebarOpen(false);
                      }}
                      className={`w-full py-2 font-bold rounded-xl transition-all text-xs shadow-sm ${showNomenQuiz ? 'bg-black text-white' : 'bg-white border-2 border-gray-200 text-black hover:border-black'}`}
                    >
                      Nomen Quiz
                    </button>
                    <button 
                      onClick={handleVocabPrint}
                      className="w-full py-2 bg-gray-100 text-black border border-gray-200 font-bold rounded-xl shadow-sm hover:bg-gray-200 transition-all text-xs flex justify-center items-center gap-2"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
                      PDF / Drucken
                    </button>
                    <hr className="border-gray-200 my-1" />
                    
                    <div className="flex flex-col gap-1 w-full">
                      <label className="text-xs font-bold text-gray-500">Suchen</label>
                      <input
                        type="text"
                        placeholder="Wort suchen..."
                        className="w-full px-2 py-1.5 bg-white border border-gray-200 rounded-lg text-xs text-black placeholder-gray-400 focus:outline-none focus:border-black transition-all shadow-sm"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    
                    <div className="flex flex-col gap-1 w-full">
                      <label className="text-xs font-bold text-gray-500">Sprache</label>
                      <select 
                        value={selectedLangCode}
                        onChange={(e) => setSelectedLangCode(e.target.value)}
                        className="bg-white border border-gray-200 text-black text-xs rounded-lg block w-full p-1.5 cursor-pointer shadow-sm focus:outline-none focus:border-black"
                      >
                        {SUPPORTED_LANGUAGES.map(lang => (
                          <option key={lang.code} value={lang.code}>
                            {lang.name === 'English' ? 'Englisch' : lang.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </li>
              {levelUpper === 'A1' && (
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
              )}
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

            {/* Removed A2 Lektionen explicitly for levels > A1 per request */}
            {levelUpper === 'A1' && (
              <div className="mt-8">
                <button 
                  onClick={() => { setActiveView('exam'); setSidebarOpen(false); }}
                  className={`w-full text-left px-3 py-3 border-2 rounded-xl font-bold transition-all text-sm ${
                    activeView === 'exam' 
                      ? 'bg-[#e5e7eb] border-[#e5e7eb] text-black shadow-md' 
                      : 'bg-white border-gray-200 text-black hover:border-gray-400 hover:shadow-md'
                  }`}
                >
                  Prüfung {levelUpper}
                </button>
              </div>
            )}
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-grow p-4 md:p-8 lg:p-12 text-black overflow-y-auto w-full bg-gray-50/30">
          <div className="w-full max-w-5xl mx-auto h-full">
            {/* Mobile Level Title placed above the active view */}
            <h2 className="md:hidden text-2xl font-bold mb-4 text-[#000000]">{levelUpper}</h2>
            
            {activeView === 'vocabulary' && (
              <VocabularyView 
                level={levelUpper} 
                activeCategory={vocabCategory}
                searchQuery={searchQuery}
                selectedLangCode={selectedLangCode}
                showNomenQuiz={showNomenQuiz}
                setShowNomenQuiz={setShowNomenQuiz}
              />
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

            {activeView === 'haben_sein' && <HabenSeinView />}
          </div>
        </main>
      </div>
    </div>
  );
}
