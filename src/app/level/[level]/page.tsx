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
  const levelUpper = level.toUpperCase();

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      {/* Top Header Bars */}
      <div className="w-full h-12 bg-[#3d313f] flex items-center px-4 md:px-6 z-30 relative justify-between">
        <button 
          className="md:hidden text-white hover:text-gray-300 transition-colors"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          ) : (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          )}
        </button>
        <div className="hidden md:block"></div>
        <Link href="/" className="text-white hover:underline text-sm font-semibold ml-auto">
          Zurück
        </Link>
      </div>
      
      <Logo />
      
      <div className="w-full h-[3px] bg-[#ffe400] relative z-10"></div>

      <div className="flex flex-1 relative overflow-hidden">
        {/* Sidebar Overlay for Mobile */}
        {sidebarOpen && (
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 z-20 md:hidden" 
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Sidebar */}
        <aside className={`
          absolute md:static top-0 left-0 h-full w-72 bg-gray-50 border-r border-gray-200 z-30
          transform transition-transform duration-300 ease-in-out overflow-y-auto
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-[#0f7650]">{levelUpper} Level</h2>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => { setActiveView('vocabulary'); setSidebarOpen(false); }}
                  className={`w-full text-left px-5 py-4 border-2 rounded-xl font-bold transition-all ${
                    activeView === 'vocabulary' 
                      ? 'bg-[#ffe400] border-[#ffe400] text-black shadow-md' 
                      : 'bg-white border-gray-200 text-black hover:border-gray-400 hover:shadow-md'
                  }`}
                >
                  Wortschatz {levelUpper}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveView('exam'); setSidebarOpen(false); }}
                  className={`w-full text-left px-5 py-4 border-2 rounded-xl font-bold transition-all ${
                    activeView === 'exam' 
                      ? 'bg-[#ffe400] border-[#ffe400] text-black shadow-md' 
                      : 'bg-white border-gray-200 text-black hover:border-gray-400 hover:shadow-md'
                  }`}
                >
                  {levelUpper} Prüfung
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveView('haben_sein'); setSidebarOpen(false); }}
                  className={`w-full text-left px-5 py-4 border-2 rounded-xl font-bold transition-all ${
                    activeView === 'haben_sein' 
                      ? 'bg-[#ffe400] border-[#ffe400] text-black shadow-md' 
                      : 'bg-white border-gray-200 text-black hover:border-gray-400 hover:shadow-md'
                  }`}
                >
                  haben & sein
                </button>
              </li>
            </ul>

            <h2 className="text-xl font-bold mt-10 mb-4 text-[#0f7650]">Lektionen</h2>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => { setActiveView('lektion_1'); setSidebarOpen(false); }}
                  className={`w-full text-left px-5 py-3 font-semibold rounded-lg transition-all ${
                    activeView === 'lektion_1'
                      ? 'bg-[#ffe400] text-black shadow-sm'
                      : 'text-gray-800 hover:text-black hover:bg-gray-200'
                  }`}
                >
                  Lektion 1
                </button>
              </li>
              <li>
                <button className="w-full text-left px-5 py-3 text-gray-800 font-semibold hover:text-black hover:bg-gray-200 rounded-lg transition-all">
                  Lektion 2
                </button>
              </li>
              <li>
                <button className="w-full text-left px-5 py-3 text-gray-800 font-semibold hover:text-black hover:bg-gray-200 rounded-lg transition-all">
                  Lektion 3
                </button>
              </li>
            </ul>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-grow p-4 md:p-8 lg:p-12 text-black overflow-y-auto w-full bg-gray-50/30">
          <div className="w-full max-w-5xl mx-auto h-full">
            {activeView === 'vocabulary' && <VocabularyView />}
            {activeView === 'exam' && <ExamView />}
            {activeView === 'lektion_1' && <LessonView lessonId="lektion_1" />}
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
