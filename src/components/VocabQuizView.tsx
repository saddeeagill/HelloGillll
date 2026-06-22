"use client";

import React, { useState } from "react";
import { SUPPORTED_LANGUAGES } from "../data/languages";
import VocabNounLevel1Quiz from "./VocabNounLevel1Quiz";

export default function VocabQuizView({ level = "A1" }: { level?: string }) {
  const [selectedCategory, setSelectedCategory] = useState("Nouns");
  const [selectedLangCode, setSelectedLangCode] = useState("pt"); // Defaulting to Portuguese based on screenshots
  
  // Level Management State
  const [activeLevel, setActiveLevel] = useState<number | null>(null);
  const [unlockedLevel, setUnlockedLevel] = useState<number>(1);

  const handleLevelBack = (passed?: boolean) => {
    if (passed && activeLevel) {
      setUnlockedLevel(prev => Math.max(prev, activeLevel + 1));
    }
    setActiveLevel(null);
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
          <div>
            <h3 className="text-lg font-bold text-black mb-0.5">{title}</h3>
            {subtitle && <p className="text-sm text-gray-500 font-medium">{subtitle}</p>}
          </div>
        </div>
        {isUnlocked && <span className={`font-bold ${textColor} opacity-0 group-hover:opacity-100 transition-opacity`}>Starten ➔</span>}
      </button>
    );
  };

  // Render the quiz if a level is active
  if (activeLevel === 1) {
    return (
      <div className="h-full w-full">
        {/* We keep the language selector accessible while in the quiz so user can change language dynamically */}
        <div className="max-w-2xl mx-auto pt-8 px-4 flex justify-end items-center gap-2">
          <label className="text-sm font-bold text-gray-500">Sprache:</label>
          <select 
            value={selectedLangCode}
            onChange={(e) => setSelectedLangCode(e.target.value)}
            className="bg-white border-2 border-gray-200 text-black text-sm rounded-xl focus:border-black block py-2 px-3 font-bold cursor-pointer shadow-sm"
          >
            {SUPPORTED_LANGUAGES.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.nativeName}
              </option>
            ))}
          </select>
        </div>
        <VocabNounLevel1Quiz onBack={handleLevelBack} selectedLangCode={selectedLangCode} />
      </div>
    );
  }

  // Placeholder for future levels
  if (activeLevel) {
    return (
      <div className="flex flex-col h-full w-full max-w-4xl mx-auto pb-20 px-4 md:px-0 pt-20">
        <div className="bg-white p-12 border-2 border-gray-100 rounded-3xl text-center">
          <h2 className="text-3xl font-black mb-4">Level {activeLevel}</h2>
          <p className="text-gray-500 mb-8">Dieses Level wird bald implementiert.</p>
          <button 
            onClick={() => handleLevelBack(true)}
            className="px-8 py-3 bg-black text-white rounded-xl font-bold"
          >
            Zurück zur Übersicht
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full max-w-4xl mx-auto pb-20 px-4 md:px-0 pt-8">
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h1 className="text-3xl font-black text-black tracking-tight">
          Nomen Quiz Übersicht
        </h1>
        
        {/* Controls: Language Selector */}
        <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-xl border border-gray-200 w-full md:w-auto">
          <span className="text-xl pl-2">🌍</span>
          <select 
            value={selectedLangCode}
            onChange={(e) => setSelectedLangCode(e.target.value)}
            className="bg-transparent text-black text-sm outline-none focus:ring-0 block py-1 font-bold cursor-pointer w-full"
          >
            {SUPPORTED_LANGUAGES.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.nativeName}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 mb-10">
        {/* Stats Sidebar (Left Side) */}
        <div className="w-full md:w-1/3 flex flex-col gap-4 order-first">
          <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 flex flex-col justify-center items-center text-center shadow-sm">
            <span className="text-4xl font-black text-black">0</span>
            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-2">Punkte</span>
          </div>
          <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 flex flex-col justify-center items-center text-center shadow-sm">
            <span className="text-4xl font-black text-black">{unlockedLevel - 1}/5</span>
            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-2">Level</span>
          </div>
          <button 
            onClick={() => {
              const pwd = prompt("Lehrer-Passwort eingeben:");
              if (pwd === "242424") {
                setUnlockedLevel(5);
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

        {/* Main Levels List */}
        <div className="w-full md:w-2/3 space-y-4">
          {renderLevelButton(1, "Level 1: Bedeutung erkennen", "Deutsch → Bedeutung", "border-yellow-200", "text-yellow-600", unlockedLevel, setActiveLevel)}
          {renderLevelButton(2, "Level 2: Wort produzieren", "Bedeutung → Deutsch", "border-orange-200", "text-orange-600", unlockedLevel, setActiveLevel)}
          {renderLevelButton(3, "Level 3: Plural bilden", "Der Plural", "border-purple-200", "text-purple-600", unlockedLevel, setActiveLevel)}
          {renderLevelButton(4, "Level 4: Rechtschreibung", "Wie schreibt man das?", "border-pink-200", "text-pink-600", unlockedLevel, setActiveLevel)}
          {renderLevelButton(5, "Level 5: Hören", "Hörverstehen", "border-green-200", "text-green-600", unlockedLevel, setActiveLevel)}
        </div>
      </div>
    </div>
  );
}
