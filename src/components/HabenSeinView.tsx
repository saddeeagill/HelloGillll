import React, { useState } from 'react';
import HabenLevel1Quiz from './HabenLevel1Quiz';
import HabenLevel2Quiz from './HabenLevel2Quiz';
import HabenLevel3Quiz from './HabenLevel3Quiz';
import HabenLevel4Quiz from './HabenLevel4Quiz';
import HabenLevel5Quiz from './HabenLevel5Quiz';
import SeinLevel1Quiz from './SeinLevel1Quiz';
import SeinLevel2Quiz from './SeinLevel2Quiz';
import SeinLevel3Quiz from './SeinLevel3Quiz';
import SeinLevel4Quiz from './SeinLevel4Quiz';
import SeinLevel5Quiz from './SeinLevel5Quiz';
import NounLevel1Quiz from './NounLevel1Quiz';
import NounLevel2Quiz from './NounLevel2Quiz';
import NounLevel3Quiz from './NounLevel3Quiz';
import NounLevel4Quiz from './NounLevel4Quiz';
import NounLevel5Quiz from './NounLevel5Quiz';
import Logo from './Logo';

export default function HabenSeinView() {
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null);
  const [selectedVerb, setSelectedVerb] = useState<string | null>(null);
  const [activeLevel, setActiveLevel] = useState<number | null>(null);

  const [unlockedLevel, setUnlockedLevel] = useState(1);
  const [unlockedLevelSein, setUnlockedLevelSein] = useState(1);
  const [unlockedLevelNoun, setUnlockedLevelNoun] = useState(1);
  const [activeLevelNoun, setActiveLevelNoun] = useState<number | null>(null);

  const handleLevelBack = (passed?: boolean) => {
    if (passed && activeLevel) {
      if (selectedVerb === 'haben') {
        setUnlockedLevel(prev => Math.max(prev, activeLevel + 1));
      } else if (selectedVerb === 'sein') {
        setUnlockedLevelSein(prev => Math.max(prev, activeLevel + 1));
      }
    }
    setActiveLevel(null);
  };

  const handleLevelBackNoun = (passed?: boolean) => {
    if (passed && activeLevelNoun) {
      setUnlockedLevelNoun(prev => Math.max(prev, activeLevelNoun + 1));
    }
    setActiveLevelNoun(null);
  };

  const renderLevelButton = (
    level: number, 
    title: string, 
    subtitle: string, 
    borderColor: string, 
    textColor: string, 
    unlockedStatus: number,
    setLvlAction: (l: number) => void
  ) => {
    const isUnlocked = unlockedStatus >= level;
    
    return (
      <button 
        onClick={() => isUnlocked && setLvlAction(level)}
        className={`w-full flex items-center justify-between p-5 bg-white border-2 ${isUnlocked ? borderColor : 'border-gray-100 opacity-60'} rounded-2xl shadow-sm hover:shadow-md transition-all text-left group`}
      >
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-full ${isUnlocked ? 'bg-yellow-100' : 'bg-gray-100'} flex items-center justify-center text-xl`}>
            {isUnlocked ? '🟡' : '🔒'}
          </div>
          <div>
            <h3 className="text-lg font-bold text-black mb-0.5">{title}</h3>
            {subtitle && <p className="text-sm text-gray-500 font-medium">{subtitle}</p>}
          </div>
        </div>
        {isUnlocked && <span className={`font-bold ${textColor} opacity-0 group-hover:opacity-100 transition-opacity`}>Starten ➔</span>}
      </button>
    );
  };

  if (activeLevel) {
    if (selectedVerb === 'haben') {
      if (activeLevel === 1) return <HabenLevel1Quiz onBack={handleLevelBack} />;
      if (activeLevel === 2) return <HabenLevel2Quiz onBack={handleLevelBack} />;
      if (activeLevel === 3) return <HabenLevel3Quiz onBack={handleLevelBack} />;
      if (activeLevel === 4) return <HabenLevel4Quiz onBack={handleLevelBack} />;
      if (activeLevel === 5) return <HabenLevel5Quiz onBack={handleLevelBack} />;
    } else if (selectedVerb === 'sein') {
      if (activeLevel === 1) return <SeinLevel1Quiz onBack={handleLevelBack} />;
      if (activeLevel === 2) return <SeinLevel2Quiz onBack={handleLevelBack} />;
      if (activeLevel === 3) return <SeinLevel3Quiz onBack={handleLevelBack} />;
      if (activeLevel === 4) return <SeinLevel4Quiz onBack={handleLevelBack} />;
      if (activeLevel === 5) return <SeinLevel5Quiz onBack={handleLevelBack} />;
    }
  }

  if (selectedVerb) {
    const isHaben = selectedVerb === 'haben';
    const unlocked = isHaben ? unlockedLevel : unlockedLevelSein;
    const title = isHaben ? 'haben' : 'sein';
    const initial = isHaben ? 'H' : 'S';

    return (
      <div className="flex flex-col h-full w-full max-w-4xl mx-auto pb-20 px-4 md:px-0 pt-8">
        <button onClick={() => setSelectedVerb(null)} className="flex items-center gap-2 text-gray-500 hover:text-black mb-8 w-fit transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          <span className="font-semibold">Zurück</span>
        </button>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Levels List */}
          <div className="w-full md:w-2/3 space-y-4 mb-10">
            {renderLevelButton(1, "Level 1: Personentabelle", "Der Anfang", "border-yellow-200", "text-yellow-600", unlocked, setActiveLevel)}
            {renderLevelButton(2, "Level 2: Ja/Nein Fragen", "Kurze Antworten", "border-orange-200", "text-orange-600", unlocked, setActiveLevel)}
            {renderLevelButton(3, "Level 3: Verneinung", "kein/keine", "border-purple-200", "text-purple-600", unlocked, setActiveLevel)}
            {renderLevelButton(4, "Level 4: W-Fragen", "wer, wie, was, wo...", "border-pink-200", "text-pink-600", unlocked, setActiveLevel)}
            {renderLevelButton(5, "Level 5: Gemischte Sätze", "Alles zusammenführen", "border-green-200", "text-green-600", unlocked, setActiveLevel)}
          </div>

          {/* Stats Sidebar */}
          <div className="w-full md:w-1/3 flex flex-col gap-4">
            <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 flex flex-col justify-center items-center text-center shadow-sm">
              <span className="text-4xl font-black text-black">0</span>
              <span className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-2">Punkte</span>
            </div>
            <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 flex flex-col justify-center items-center text-center shadow-sm">
              <span className="text-4xl font-black text-black">{unlocked - 1}/5</span>
              <span className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-2">Level</span>
            </div>
            <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 flex flex-col justify-center items-center text-center shadow-sm">
              <span className="text-xl font-bold text-blue-500">In Arbeit</span>
              <span className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-2">Status</span>
            </div>
            <button 
              onClick={() => {
                const pwd = prompt("Lehrer-Passwort eingeben:");
                if (pwd === "242424") {
                  if (isHaben) setUnlockedLevel(5);
                  else setUnlockedLevelSein(5);
                } else if (pwd !== null) {
                  alert("Falsches Passwort.");
                }
              }}
              className="bg-white border-2 border-gray-100 rounded-2xl p-6 flex flex-col justify-center items-center text-center shadow-sm bg-gradient-to-br from-yellow-50 to-orange-50 border-orange-100 cursor-pointer hover:shadow-md transition-all group relative"
            >
              <span className="absolute -top-3 bg-orange-100 text-orange-800 text-[10px] font-bold px-3 py-1 rounded-full border border-orange-200">Lehrer</span>
              <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">🏅</span>
              <span className="text-xs font-bold text-orange-600 uppercase tracking-widest leading-tight">Zugang</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (selectedQuiz === 'conjugation') {
    return (
        <div className="flex flex-col h-full w-full max-w-4xl mx-auto pb-20 px-4 md:px-0 pt-20 justify-center">
          <button onClick={() => setSelectedQuiz(null)} className="absolute top-8 left-4 md:left-8 flex items-center gap-2 text-gray-500 hover:text-black mb-8 w-fit transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            <span className="font-semibold">Zurück</span>
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto w-full">
            <button 
              onClick={() => setSelectedVerb('haben')}
              className="flex flex-col items-center justify-center p-12 bg-white border-2 border-gray-100 rounded-3xl shadow-sm hover:shadow-xl hover:border-gray-300 transition-all text-center group min-h-[250px]"
            >
              <h2 className="text-3xl md:text-4xl font-black text-black mb-2">
                haben
              </h2>
              <span className="text-xl md:text-2xl font-bold text-gray-400 group-hover:text-black transition-colors lowercase">
                konjugation
              </span>
            </button>

            <button 
              onClick={() => setSelectedVerb('sein')}
              className="flex flex-col items-center justify-center p-12 bg-white border-2 border-gray-100 rounded-3xl shadow-sm hover:shadow-xl hover:border-gray-300 transition-all text-center group min-h-[250px]"
            >
              <h2 className="text-3xl md:text-4xl font-black text-black mb-2">
                sein
              </h2>
              <span className="text-xl md:text-2xl font-bold text-gray-400 group-hover:text-black transition-colors lowercase">
                konjugation
              </span>
            </button>
          </div>
        </div>
    );
  }

  if (selectedQuiz === 'noun') {
    if (activeLevelNoun === 1) return <NounLevel1Quiz onBack={handleLevelBackNoun} selectedLangCode="en" />;
    if (activeLevelNoun === 2) return <NounLevel2Quiz onBack={handleLevelBackNoun} selectedLangCode="en" />;
    if (activeLevelNoun === 3) return <NounLevel3Quiz onBack={handleLevelBackNoun} selectedLangCode="en" />;
    if (activeLevelNoun === 4) return <NounLevel4Quiz onBack={handleLevelBackNoun} selectedLangCode="en" />;
    if (activeLevelNoun === 5) return <NounLevel5Quiz onBack={handleLevelBackNoun} selectedLangCode="en" />;

    return (
      <div className="flex flex-col h-full w-full max-w-4xl mx-auto pb-20 px-4 md:px-0 pt-8">
        <button onClick={() => setSelectedQuiz(null)} className="flex items-center gap-2 text-gray-500 hover:text-black mb-8 w-fit transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          <span className="font-semibold">Zurück</span>
        </button>

        <div className="flex flex-col md:flex-row gap-8 mb-10">
          {/* Main Levels List */}
          <div className="w-full md:w-2/3 space-y-4">
            {renderLevelButton(1, "Level 1: Einfach", "Präsens, Singular, konkrete Nomen", "border-yellow-200", "text-yellow-600", unlockedLevelNoun, setActiveLevelNoun)}
            {renderLevelButton(2, "Level 2: Etwas schwieriger", "Plural, Besitz & Zustand gemischt", "border-orange-200", "text-orange-600", unlockedLevelNoun, setActiveLevelNoun)}
            {renderLevelButton(3, "Level 3: Alltagssituationen", "Zeit, Ort, Familie, Gefühle", "border-purple-200", "text-purple-600", unlockedLevelNoun, setActiveLevelNoun)}
            {renderLevelButton(4, "Level 4: Alltag + Verbindung", "aber / und / oder", "border-pink-200", "text-pink-600", unlockedLevelNoun, setActiveLevelNoun)}
            {renderLevelButton(5, "Level 5: Alltag mit Situationen & kleinen Sätzen", "", "border-green-200", "text-green-600", unlockedLevelNoun, setActiveLevelNoun)}
          </div>

          {/* Stats Sidebar */}
          <div className="w-full md:w-1/3 flex flex-col gap-4">
            <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 flex flex-col justify-center items-center text-center shadow-sm">
              <span className="text-4xl font-black text-black">0</span>
              <span className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-2">Punkte</span>
            </div>
            <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 flex flex-col justify-center items-center text-center shadow-sm">
              <span className="text-4xl font-black text-black">{unlockedLevelNoun - 1}/5</span>
              <span className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-2">Level</span>
            </div>
            <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 flex flex-col justify-center items-center text-center shadow-sm">
              <span className="text-xl font-bold text-blue-500">In Arbeit</span>
              <span className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-2">Status</span>
            </div>
            <button 
              onClick={() => {
                const pwd = prompt("Lehrer-Passwort eingeben:");
                if (pwd === "242424") {
                  setUnlockedLevelNoun(5);
                } else if (pwd !== null) {
                  alert("Falsches Passwort.");
                }
              }}
              className="bg-white border-2 border-gray-100 rounded-2xl p-6 flex flex-col justify-center items-center text-center shadow-sm hover:border-orange-300 hover:shadow-md transition-all cursor-pointer group relative"
            >
              <span className="absolute -top-3 bg-orange-100 text-orange-800 text-[10px] font-bold px-3 py-1 rounded-full border border-orange-200">Lehrer</span>
              <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">🏅</span>
              <span className="text-xs font-bold text-orange-600 uppercase tracking-widest leading-tight">Zugang</span>
            </button>
          </div>
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
    <div className="flex flex-col h-full w-full max-w-4xl mx-auto pb-20 px-4 md:px-0 pt-20 justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto w-full">
        {/* Conjugation Quiz Card */}
        <button 
          onClick={() => setSelectedQuiz('conjugation')}
          className="flex flex-col items-center justify-center p-12 bg-white border-2 border-gray-100 rounded-3xl shadow-sm hover:shadow-xl hover:border-gray-300 transition-all text-center group min-h-[250px]"
        >
          <h2 className="text-3xl md:text-4xl font-black text-black mb-2">
            haben / sein
          </h2>
          <span className="text-xl md:text-2xl font-bold text-gray-400 group-hover:text-black transition-colors lowercase">
            konjugation
          </span>
        </button>

        {/* Noun Quiz Card */}
        <button 
          onClick={() => setSelectedQuiz('noun')}
          className="flex flex-col items-center justify-center p-12 bg-white border-2 border-gray-100 rounded-3xl shadow-sm hover:shadow-xl hover:border-gray-300 transition-all text-center group min-h-[250px]"
        >
          <h2 className="text-3xl md:text-4xl font-black text-black mb-2">
            haben / sein
          </h2>
          <span className="text-xl md:text-2xl font-bold text-gray-400 group-hover:text-black transition-colors">
            Nomen
          </span>
        </button>
      </div>
    </div>
  );
}
