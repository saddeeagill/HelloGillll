import React, { useState } from 'react';
import HabenLevel1Quiz from './HabenLevel1Quiz';
import Logo from './Logo';

export default function HabenSeinView() {
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null);
  const [selectedVerb, setSelectedVerb] = useState<string | null>(null);
  const [activeLevel, setActiveLevel] = useState<number | null>(null);

  if (activeLevel === 1) {
    return <HabenLevel1Quiz onBack={() => setActiveLevel(null)} />;
  }

  if (selectedVerb === 'haben') {
    return (
      <div className="flex flex-col h-full w-full max-w-4xl mx-auto pb-20 px-4 md:px-0 pt-8">
        <button onClick={() => setSelectedVerb(null)} className="flex items-center gap-2 text-gray-500 hover:text-black mb-8 w-fit transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          <span className="font-semibold">Zurück</span>
        </button>

        <div className="flex flex-col md:flex-row gap-8 mb-10 items-start">
          {/* Header Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2 w-full md:w-auto">
            <div className="w-24 h-24 rounded-full bg-black flex items-center justify-center text-4xl font-black text-white shadow-lg mb-2">
              H
            </div>
            <h1 className="text-3xl font-black text-black">haben</h1>
            <p className="text-gray-500 font-medium">Conjugation Quiz</p>
          </div>

          {/* Stats Dashboard */}
          <div className="flex-grow grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
            <div className="bg-white border-2 border-gray-100 rounded-2xl p-4 flex flex-col justify-center items-center text-center shadow-sm">
              <span className="text-3xl font-black text-black">0</span>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Points</span>
            </div>
            <div className="bg-white border-2 border-gray-100 rounded-2xl p-4 flex flex-col justify-center items-center text-center shadow-sm">
              <span className="text-3xl font-black text-black">0/5</span>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Level</span>
            </div>
            <div className="bg-white border-2 border-gray-100 rounded-2xl p-4 flex flex-col justify-center items-center text-center shadow-sm">
              <span className="text-lg font-bold text-blue-500">In progress</span>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Status</span>
            </div>
            <div className="bg-white border-2 border-gray-100 rounded-2xl p-4 flex flex-col justify-center items-center text-center shadow-sm bg-gradient-to-br from-yellow-50 to-orange-50 border-orange-100">
              <span className="text-2xl mb-1">🏅</span>
              <span className="text-xs font-bold text-orange-600 uppercase tracking-widest leading-tight">Teacher Access</span>
            </div>
          </div>
        </div>

        {/* Levels List */}
        <div className="space-y-4 mb-10">
          <button 
            onClick={() => setActiveLevel(1)}
            className="w-full flex items-center justify-between p-5 bg-white border-2 border-yellow-200 rounded-2xl shadow-sm hover:shadow-md transition-all text-left group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">🟡</div>
              <div>
                <h3 className="text-lg font-bold text-black mb-0.5">Level 1: Person table</h3>
                <p className="text-sm text-gray-500 font-medium">The start</p>
              </div>
            </div>
            <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          </button>

          <button className="w-full flex items-center justify-between p-5 bg-white border-2 border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all text-left opacity-60">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-xl">🟠</div>
              <div>
                <h3 className="text-lg font-bold text-black mb-0.5">Level 2: Mixed persons</h3>
              </div>
            </div>
            <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
          </button>

          <button className="w-full flex items-center justify-between p-5 bg-white border-2 border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all text-left opacity-60">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-xl">🟣</div>
              <div>
                <h3 className="text-lg font-bold text-black mb-0.5">Level 3: Conjugation of person</h3>
              </div>
            </div>
            <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
          </button>

          <button className="w-full flex items-center justify-between p-5 bg-white border-2 border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all text-left opacity-60">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-xl border-2 border-gray-200">⚪</div>
              <div>
                <h3 className="text-lg font-bold text-black mb-0.5">Level 4: Mixed conjugation</h3>
              </div>
            </div>
            <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
          </button>

          <button className="w-full flex items-center justify-between p-5 bg-white border-2 border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all text-left opacity-60">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-xl border-2 border-gray-200">⚪</div>
              <div>
                <h3 className="text-lg font-bold text-black mb-0.5">Level 5: Translation of native language → German</h3>
              </div>
            </div>
            <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
          </button>
        </div>

        <div className="text-center bg-gray-50 rounded-xl p-4 border border-gray-200">
          <p className="text-sm font-semibold text-gray-500">
            At least <span className="text-black">80%</span> (8 out of 10) correct to advance to the next level
          </p>
        </div>
      </div>
    );
  }

  if (selectedQuiz === 'conjugation') {
    return (
      <div className="flex flex-col h-full w-full max-w-4xl mx-auto pb-20 px-4 md:px-0 pt-8">
        <button onClick={() => setSelectedQuiz(null)} className="flex items-center gap-2 text-gray-500 hover:text-black mb-8 w-fit transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          <span className="font-semibold">Zurück</span>
        </button>

        <div className="text-center mb-12">
          <h3 className="text-lg font-semibold text-gray-500 uppercase tracking-widest mb-2">Konjugations Quiz</h3>
          <h1 className="text-3xl md:text-5xl font-black text-black drop-shadow-sm tracking-tight">
            Wähle ein Verb aus
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto w-full">
          <button 
            onClick={() => setSelectedVerb('haben')}
            className="flex items-center p-6 bg-white border-2 border-gray-100 rounded-2xl shadow-sm hover:shadow-lg hover:border-gray-300 transition-all text-left group gap-6"
          >
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-2xl font-black text-gray-600 group-hover:bg-black group-hover:text-white transition-colors flex-shrink-0">
              H
            </div>
            <div>
              <h2 className="text-2xl font-bold text-black mb-1">haben</h2>
              <p className="text-gray-500 font-medium">Konjugation üben</p>
            </div>
          </button>

          <button 
            onClick={() => setSelectedVerb('sein')}
            className="flex items-center p-6 bg-white border-2 border-gray-100 rounded-2xl shadow-sm hover:shadow-lg hover:border-gray-300 transition-all text-left group gap-6"
          >
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-2xl font-black text-gray-600 group-hover:bg-black group-hover:text-white transition-colors flex-shrink-0">
              S
            </div>
            <div>
              <h2 className="text-2xl font-bold text-black mb-1">sein</h2>
              <p className="text-gray-500 font-medium">Konjugation üben</p>
            </div>
          </button>
        </div>
      </div>
    );
  }

  if (selectedQuiz === 'noun') {
    return (
      <div className="flex flex-col h-full w-full max-w-4xl mx-auto pb-20 px-4 md:px-0 pt-8">
        <button onClick={() => setSelectedQuiz(null)} className="flex items-center gap-2 text-gray-500 hover:text-black mb-8 w-fit transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          <span className="font-semibold">Zurück</span>
        </button>

        <div className="flex flex-col md:flex-row gap-8 mb-10 items-start">
          {/* Header Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2 w-full md:w-auto">
            <div className="mb-4 transform scale-150 origin-left md:origin-left scale-100 flex justify-center md:justify-start">
               <Logo showBack={false} />
            </div>
            <h1 className="text-3xl font-black text-black">Haben / Sein Quiz</h1>
          </div>

          {/* Stats Dashboard */}
          <div className="flex-grow grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
            <div className="bg-white border-2 border-gray-100 rounded-2xl p-4 flex flex-col justify-center items-center text-center shadow-sm">
              <span className="text-3xl font-black text-black">0</span>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Punkte</span>
            </div>
            <div className="bg-white border-2 border-gray-100 rounded-2xl p-4 flex flex-col justify-center items-center text-center shadow-sm">
              <span className="text-3xl font-black text-black">0/5</span>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Level</span>
            </div>
            <div className="bg-white border-2 border-gray-100 rounded-2xl p-4 flex flex-col justify-center items-center text-center shadow-sm">
              <span className="text-lg font-bold text-blue-500">In Arbeit</span>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Status</span>
            </div>
            <div className="bg-white border-2 border-gray-100 rounded-2xl p-4 flex flex-col justify-center items-center text-center shadow-sm bg-gradient-to-br from-yellow-50 to-orange-50 border-orange-100 relative">
              <span className="absolute -top-3 bg-orange-100 text-orange-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-orange-200">Abzeichen</span>
              <span className="text-2xl mb-1 mt-2">🏅</span>
              <span className="text-[10px] font-bold text-orange-600 uppercase tracking-widest leading-tight">Lehrer<br/>Zugang</span>
            </div>
          </div>
        </div>

        {/* Levels List */}
        <div className="space-y-4 mb-10">
          <button className="w-full flex items-center justify-between p-5 bg-white border-2 border-yellow-200 rounded-2xl shadow-sm hover:shadow-md transition-all text-left group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">🟡</div>
              <div>
                <h3 className="text-lg font-bold text-black mb-0.5">Level 1: Einfach</h3>
                <p className="text-sm text-gray-500 font-medium">Präsens, Singular, konkrete Nomen</p>
              </div>
            </div>
            <span className="font-bold text-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity">Starten ➔</span>
          </button>

          <button className="w-full flex items-center justify-between p-5 bg-white border-2 border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all text-left opacity-60">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-xl">🟠</div>
              <div>
                <h3 className="text-lg font-bold text-black mb-0.5">Level 2: Etwas schwieriger</h3>
                <p className="text-sm text-gray-500 font-medium">Plural, Besitz & Zustand gemischt</p>
              </div>
            </div>
            <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
          </button>

          <button className="w-full flex items-center justify-between p-5 bg-white border-2 border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all text-left opacity-60">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-xl">🟣</div>
              <div>
                <h3 className="text-lg font-bold text-black mb-0.5">Level 3: Alltagssituationen</h3>
                <p className="text-sm text-gray-500 font-medium">Zeit, Ort, Familie, Gefühle</p>
              </div>
            </div>
            <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
          </button>

          <button className="w-full flex items-center justify-between p-5 bg-white border-2 border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all text-left opacity-60">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-xl border-2 border-gray-200">⚪</div>
              <div>
                <h3 className="text-lg font-bold text-black mb-0.5">Level 4: Alltag + Verbindung</h3>
                <p className="text-sm text-gray-500 font-medium">aber / und / oder</p>
              </div>
            </div>
            <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
          </button>

          <button className="w-full flex items-center justify-between p-5 bg-white border-2 border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all text-left opacity-60">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-xl border-2 border-gray-200">⚪</div>
              <div>
                <h3 className="text-lg font-bold text-black mb-0.5">Level 5: Alltag mit Situationen & kleinen Sätzen</h3>
              </div>
            </div>
            <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
          </button>
        </div>

        <div className="text-center bg-gray-50 rounded-xl p-4 border border-gray-200">
          <p className="text-sm font-semibold text-gray-500">
            Mindestens <span className="text-black">80%</span> (8 von 10) richtig für das nächste Level
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full max-w-4xl mx-auto pb-20 px-4 md:px-0 pt-8">
      <div className="text-center mb-12">
        <h3 className="text-lg font-semibold text-gray-500 uppercase tracking-widest mb-2">Welcome</h3>
        <h1 className="text-3xl md:text-5xl font-black text-black drop-shadow-sm tracking-tight">
          Choose a quiz
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto w-full">
        {/* Conjugation Quiz Card */}
        <button 
          onClick={() => setSelectedQuiz('conjugation')}
          className="flex flex-col items-start p-8 bg-white border-2 border-gray-100 rounded-2xl shadow-sm hover:shadow-lg hover:border-gray-300 transition-all text-left group"
        >
          <span className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3 group-hover:text-black transition-colors">
            Haben / Sein
          </span>
          <h2 className="text-2xl font-bold text-black mb-4">
            Konjugations Quiz
          </h2>
          <p className="text-gray-500 font-medium leading-relaxed">
            Übe die Konjugation von "haben" / "sein"
          </p>
        </button>

        {/* Noun Quiz Card */}
        <button 
          onClick={() => setSelectedQuiz('noun')}
          className="flex flex-col items-start p-8 bg-white border-2 border-gray-100 rounded-2xl shadow-sm hover:shadow-lg hover:border-gray-300 transition-all text-left group"
        >
          <span className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3 group-hover:text-black transition-colors">
            Haben / Sein
          </span>
          <h2 className="text-2xl font-bold text-black mb-4">
            Nomen Quiz
          </h2>
          <p className="text-gray-500 font-medium leading-relaxed">
            Übe "haben" / "sein" mit Nomen in Lückentexten
          </p>
        </button>
      </div>
    </div>
  );
}
