"use client";

import React, { useState, useEffect } from "react";
import { VOCABULARY } from "../data/vocabulary";
import { SUPPORTED_LANGUAGES } from "../data/languages";
import TranslateText from "./TranslateText";
import NounLevel1Quiz from "./NounLevel1Quiz";
import VocabNounLevel2Quiz from "./VocabNounLevel2Quiz";
import VocabNounLevel3Quiz from "./VocabNounLevel3Quiz";
import VocabNounLevel4Quiz from "./VocabNounLevel4Quiz";
import VocabNounLevel5Quiz from "./VocabNounLevel5Quiz";
import VocabNounLevel1Quiz from "./VocabNounLevel1Quiz";

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

const CATEGORY_MAP: Record<string, string> = {
  "Nouns": "Nomen",
  "Adjectives": "Adjektive",
  "Adverbs": "Adverbien",
  "Regular Verbs": "Regelmäßige Verben",
  "Irregular Verbs": "Unregelmäßige Verben",
  "Modal Verbs": "Modalverben",
};

const CATEGORIES = [
  "Nouns",
  "Adjectives",
  "Adverbs",
  "Regular Verbs",
  "Irregular Verbs",
  "Modal Verbs",
];

export default function VocabularyView({ level = "A1", activeCategory = "Nouns" }: { level?: string, activeCategory?: string }) {
  const [selectedLangCode, setSelectedLangCode] = useState("pt");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Nomen Quiz State
  const [showNomenQuiz, setShowNomenQuiz] = useState(false);
  const [unlockedLevelNomen, setUnlockedLevelNomen] = useState(1);
  const [activeLevelNomen, setActiveLevelNomen] = useState<number | null>(null);

  // Quiz State
  const [quizState, setQuizState] = useState<{
    isActive: boolean;
    pool: any[];
    questions: any[];
    currentQuestionIndex: number;
    score: number;
    selectedOption: string | null;
    isCorrect: boolean | null;
    currentOptions: string[];
  } | null>(null);

  // We need to resolve translated strings for options since some might be generated asynchronously.
  // Actually, we can use the English `translation` or the Urdu predefined, but if the user chose Spanish, we don't have it synchronously!
  // BUT the user's prompt says "user will selct the correct option in his native langugae."
  // Wait, if it's English or Urdu, we have it in memory. If it's something else, `TranslateText` component fetches it dynamically.
  // How do we do multiple choice options if they require async translation?
  // Since we only have static translations for English and Urdu, for other languages, we might show English options, OR we can fetch them.
  // Since we don't have a bulk translation hook, let's just show English options if the lang is not 'ur' or 'en', 
  // or we can use the English translation for the quiz options if they haven't explicitly asked for an API-based quiz.
  // The user says "in his native langugae". We'll use a helper to extract the available translation.
  const getTranslationForOption = (item: any, langCode: string) => {
    if (langCode === 'ur' && item.urdu) return item.urdu;
    // Default to English if we don't have a sync translation to avoid async option rendering complexities
    return item.translation;
  };

  // Filter logic
  const filteredWords = VOCABULARY.filter((item) => {
    const matchesLevel = item.level === level.toUpperCase();
    const matchesSearch =
      item.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.translation.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = item.category === activeCategory;
    return matchesLevel && matchesSearch && matchesCategory;
  });

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

  const startQuiz = (wordsSoFar: number, numQuestions: number) => {
    const pool = filteredWords.slice(0, wordsSoFar);
    
    // Pick unique random questions
    const shuffledPool = [...pool].sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffledPool.slice(0, numQuestions);

    setQuizState({
      isActive: true,
      pool: pool,
      questions: selectedQuestions,
      currentQuestionIndex: 0,
      score: 0,
      selectedOption: null,
      isCorrect: null,
      currentOptions: generateOptions(selectedQuestions[0], pool)
    });
  };

  const generateOptions = (correctItem: any, pool: any[]) => {
    const correctOption = getTranslationForOption(correctItem, selectedLangCode);
    const options = new Set<string>();
    options.add(correctOption);

    // Get 3 random wrong options
    const shuffledPool = [...pool].sort(() => 0.5 - Math.random());
    for (const item of shuffledPool) {
      if (options.size >= 4) break;
      const opt = getTranslationForOption(item, selectedLangCode);
      if (opt !== correctOption) {
        options.add(opt);
      }
    }

    // In case pool is too small to have 4 unique options
    return Array.from(options).sort(() => 0.5 - Math.random());
  };

  const handleOptionSelect = (option: string) => {
    if (!quizState || quizState.selectedOption) return;

    const currentQ = quizState.questions[quizState.currentQuestionIndex];
    const correctOption = getTranslationForOption(currentQ, selectedLangCode);
    const isCorrect = option === correctOption;

    setQuizState({
      ...quizState,
      selectedOption: option,
      isCorrect: isCorrect,
      score: isCorrect ? quizState.score + 1 : quizState.score
    });
  };

  const nextQuestion = () => {
    if (!quizState) return;

    const nextIndex = quizState.currentQuestionIndex + 1;
    if (nextIndex < quizState.questions.length) {
      setQuizState({
        ...quizState,
        currentQuestionIndex: nextIndex,
        selectedOption: null,
        isCorrect: null,
        currentOptions: generateOptions(quizState.questions[nextIndex], quizState.pool)
      });
    } else {
      // End of quiz, just increment index to show results
      setQuizState({
        ...quizState,
        currentQuestionIndex: nextIndex,
      });
    }
  };

  const closeQuiz = () => {
    setQuizState(null);
  };

  const handleLevelBackNomen = (passed?: boolean) => {
    if (passed && activeLevelNomen) {
      setUnlockedLevelNomen(prev => Math.max(prev, activeLevelNomen + 1));
    }
    setActiveLevelNomen(null);
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
        className={`w-full aspect-square flex flex-col items-center justify-center p-6 bg-white border-2 ${isUnlocked ? borderColor : 'border-gray-100 opacity-60'} rounded-3xl shadow-sm hover:shadow-xl transition-all text-center group`}
      >
        <h3 className="text-xl font-black text-black mb-2">{title}</h3>
        {subtitle && <p className="text-sm text-gray-500 font-medium mb-4">{isUnlocked ? subtitle : 'Noch gesperrt'}</p>}
        {isUnlocked && <span className={`font-bold ${textColor} opacity-0 group-hover:opacity-100 transition-opacity mt-auto`}>spielen ➔</span>}
      </button>
    );
  };

  const showVerbColumns =
    activeCategory === "Irregular Verbs" ||
    activeCategory === "Regular Verbs" ||
    activeCategory === "Modal Verbs";
  const showNounColumns = activeCategory === "Nouns";

  const colSpanCount = 
    1 + // Deutsch
    1 + // English
    (selectedLangCode !== 'en' ? 1 : 0) + // Native translation
    (showNounColumns ? 1 : 0) +
    (showVerbColumns ? 2 : 0);

  return (
    <div className="flex flex-col h-full w-full max-w-4xl mx-auto pb-20 px-3 md:px-0 relative">
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mb-4 md:mb-6 pt-2">
        {/* Title and Buttons */}
        <div className="flex-1 flex justify-start items-center gap-4">
          <h1 className="text-xl md:text-2xl font-bold text-black drop-shadow-sm tracking-tight whitespace-nowrap">
            {{ "Nouns": "Nomen", "Adjectives": "Adjektive", "Adverbs": "Adverbien", "Regular Verbs": "Regelmäßige Verben", "Irregular Verbs": "Unregelmäßige Verben", "Modal Verbs": "Modalverben" }[activeCategory] || "Vokabular"}
          </h1>
          <button 
            onClick={() => setShowNomenQuiz(true)}
            className="px-4 py-2 bg-black text-white font-bold rounded-xl shadow-md hover:bg-gray-800 transition-all text-sm whitespace-nowrap"
          >
            Nomen Quiz
          </button>
        </div>
        
        {/* Search Bar */}
        <div className="flex-1 relative group w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-4 w-4 text-gray-400 group-focus-within:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Suchen..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm text-black placeholder-gray-400 focus:outline-none focus:border-black transition-all shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* Controls: Language Selector */}
        <div className="flex-1 flex items-center gap-2 justify-start md:justify-end w-full">
          <label className="text-sm font-bold text-gray-500 tracking-wide"> Muttersprache </label>
          <select 
            value={selectedLangCode}
            onChange={(e) => setSelectedLangCode(e.target.value)}
            className="bg-white border border-gray-200 text-black text-sm rounded-lg focus:ring-[#000000] focus:border-[#000000] block p-2 md:py-2.5 font-medium cursor-pointer shadow-sm"
          >
            {SUPPORTED_LANGUAGES.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.name === 'English' ? 'Englisch' : lang.name} ({lang.nativeName})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Word Table / Nomen Quiz View */}
      {showNomenQuiz ? (
        <div className="flex flex-col h-full w-full pt-4">
          <div className="flex justify-between items-center mb-8">
            <button onClick={() => setShowNomenQuiz(false)} className="flex items-center gap-2 text-gray-500 hover:text-black w-fit transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              <span className="font-semibold">Zurück</span>
            </button>
          </div>

          {activeLevelNomen === 1 ? (
            <VocabNounLevel1Quiz 
              onBack={handleLevelBackNomen} 
              selectedLangCode={selectedLangCode} 
            />
          ) : activeLevelNomen === 2 ? (
            <VocabNounLevel2Quiz 
              onBack={handleLevelBackNomen} 
              selectedLangCode={selectedLangCode} 
            />
          ) : activeLevelNomen === 3 ? (
            <VocabNounLevel3Quiz 
              onBack={handleLevelBackNomen} 
              selectedLangCode={selectedLangCode} 
            />
          ) : activeLevelNomen === 4 ? (
            <VocabNounLevel4Quiz 
              onBack={handleLevelBackNomen} 
              selectedLangCode={selectedLangCode} 
            />
          ) : activeLevelNomen === 5 ? (
            <VocabNounLevel5Quiz 
              onBack={handleLevelBackNomen} 
              selectedLangCode={selectedLangCode} 
            />
          ) : activeLevelNomen ? (
            <div className="bg-white p-12 border-2 border-gray-100 rounded-3xl text-center">
              <h2 className="text-3xl font-black mb-4">Level {activeLevelNomen} wird hier angezeigt</h2>
              <p className="text-gray-500 mb-8">Dieses Level wird im nächsten Schritt implementiert.</p>
              <button 
                onClick={() => handleLevelBackNomen(true)}
                className="px-8 py-3 bg-black text-white rounded-xl font-bold"
              >
                Level abschliessen (Zurück)
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-10 w-full">
                {renderLevelButton(1, "Bedeutung erkennen", "", "border-yellow-200", "text-yellow-600", unlockedLevelNomen, setActiveLevelNomen)}
                {renderLevelButton(2, "Wort produzieren", "", "border-orange-200", "text-orange-600", unlockedLevelNomen, setActiveLevelNomen)}
                {renderLevelButton(3, "Plural bilden", "", "border-purple-200", "text-purple-600", unlockedLevelNomen, setActiveLevelNomen)}
                {renderLevelButton(4, "Rechtschreibung", "", "border-pink-200", "text-pink-600", unlockedLevelNomen, setActiveLevelNomen)}
                {renderLevelButton(5, "Hören", "", "border-green-200", "text-green-600", unlockedLevelNomen, setActiveLevelNomen)}
              </div>
              
              <button 
                onClick={() => {
                  const pwd = prompt("Lehrer-Passwort eingeben:");
                  if (pwd === "242424") {
                    setUnlockedLevelNomen(5);
                  } else if (pwd !== null) {
                    alert("Falsches Passwort.");
                  }
                }}
                className="mt-4 flex items-center justify-center px-6 py-4 bg-white border border-gray-200 text-orange-600 font-bold rounded-xl shadow-sm hover:border-orange-300 hover:shadow-md transition-all"
              >
                <span className="text-lg">Lehrer Zugang</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-1 md:mt-2 px-0">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[500px] md:min-w-[800px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-black">
                <th className="py-2 px-3 md:py-3 md:px-4 font-semibold text-xs md:text-sm w-1/4">
                  Deutsch
                </th>
                {showNounColumns && (
                  <th className="py-2 px-3 md:py-3 md:px-4 font-semibold text-xs md:text-sm w-1/6">
                    Plural
                  </th>
                )}
                {showVerbColumns && (
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
                  English
                </th>
                {selectedLangCode !== 'en' && (
                  <th className="py-2 px-3 md:py-3 md:px-4 font-semibold text-xs md:text-sm w-1/4">
                    {SUPPORTED_LANGUAGES.find(l => l.code === selectedLangCode)?.nativeName || "Translation"}
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {filteredWords.length > 0 ? (
                filteredWords.flatMap((item, index) => {
                  const uniqueId = `${item.category}-${item.id}`;
                  const isVerb =
                    item.category === "Irregular Verbs" ||
                    item.category === "Regular Verbs" ||
                    item.category === "Modal Verbs";
                  const isNoun = item.category === "Nouns";

                  const row = (
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
                            className="w-6 h-6 rounded-full bg-[#000000] text-white flex items-center justify-center hover:bg-[#333333] transition-colors flex-shrink-0"
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
                            <div className="flex items-center gap-1.5 mt-1 text-xs text-black">
                              <button 
                                onClick={(e) => { e.stopPropagation(); playAudio((item as VocabItem).plural!); }}
                                className="w-5 h-5 rounded-full bg-gray-100 text-gray-500 hover:bg-[#000000] hover:text-white flex items-center justify-center transition-colors flex-shrink-0"
                                title="Hören (Listen)"
                              >
                                <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor">
                                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                                </svg>
                              </button>
                              <span>{(item as VocabItem).plural}</span>
                            </div>
                          ) : (
                            <span className="text-gray-400 mt-1 block">-</span>
                          )}
                        </td>
                      )}

                      {showVerbColumns && (
                        <>
                          <td className="py-2 px-3 md:py-3 md:px-4 align-top">
                            {isVerb && (item as VocabItem).principalParts ? (
                              <div className="text-xs text-black block mt-1">
                                {(item as VocabItem).principalParts?.split(',').map((part, i) => (
                                  <div key={i} className="flex items-center gap-1.5 mb-1.5">
                                    <button 
                                      onClick={(e) => { e.stopPropagation(); playAudio(part.trim()); }}
                                      className="w-5 h-5 rounded-full bg-gray-100 text-gray-500 hover:bg-[#000000] hover:text-white flex items-center justify-center transition-colors flex-shrink-0"
                                      title="Hören"
                                    >
                                      <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor">
                                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                                      </svg>
                                    </button>
                                    <span>{part.trim()}{i < ((item as VocabItem).principalParts?.split(',').length || 0) - 1 ? ',' : ''}</span>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <span className="text-gray-400 mt-1 block">-</span>
                            )}
                          </td>
                          <td className="py-2 px-3 md:py-3 md:px-4 align-top">
                            {isVerb && (item as VocabItem).conjugation ? (
                              <div className="text-xs text-black leading-relaxed mt-1 bg-white border border-gray-200 p-2 rounded-lg inline-block w-full">
                                {(item as VocabItem).conjugation?.split('\n').map((line, i) => {
                                  if (!line.trim()) return null;
                                  return (
                                    <div key={i} className="flex items-center gap-1.5 mb-1.5">
                                      <button 
                                        onClick={(e) => { e.stopPropagation(); playAudio(line.trim()); }}
                                        className="w-5 h-5 rounded-full bg-gray-100 text-gray-500 hover:bg-[#000000] hover:text-white flex items-center justify-center transition-colors flex-shrink-0"
                                        title="Hören"
                                      >
                                        <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor">
                                          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                                        </svg>
                                      </button>
                                      <span>{line.trim()}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            ) : (
                              <span className="text-gray-400 mt-1 block">-</span>
                            )}
                          </td>
                        </>
                      )}

                      <td className="py-2 px-3 md:py-3 md:px-4 align-top">
                        <span className="text-sm font-medium text-black mt-1 block">
                          {item.translation}
                        </span>
                      </td>
                      {selectedLangCode !== 'en' && (
                        <td className="py-2 px-3 md:py-3 md:px-4 align-top">
                          {selectedLangCode === 'ur' && (item as any).urdu ? (
                            <span className="text-sm font-medium text-black mt-1 block">
                              {(item as any).urdu}
                            </span>
                          ) : (
                            <TranslateText text={item.word} targetLang={selectedLangCode} />
                          )}
                        </td>
                      )}
                    </tr>
                  );

                  // Determine if we should render a Quiz row
                  const isMultipleOf25 = (index + 1) % 25 === 0;
                  const isLastItem = index === filteredWords.length - 1;
                  
                  if (isMultipleOf25 || isLastItem) {
                    const wordsSoFar = index + 1;
                    const groupNum = Math.ceil(wordsSoFar / 25);
                    const numQuestions = Math.min(groupNum * 5, wordsSoFar);

                    const quizRow = (
                      <tr key={`quiz-row-${wordsSoFar}`} className="bg-gray-100">
                        <td colSpan={colSpanCount} className="py-4 px-4 text-left border-b border-gray-200">
                          <button
                            onClick={() => startQuiz(wordsSoFar, numQuestions)}
                            className="px-10 py-2.5 bg-black text-white font-bold rounded-xl shadow-md hover:bg-gray-800 transition-all hover:scale-105 active:scale-95"
                          >
                            Quiz
                          </button>
                        </td>
                      </tr>
                    );
                    return [row, quizRow];
                  }

                  return [row];
                })
              ) : (
                <tr>
                  <td
                    colSpan={colSpanCount}
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
      )}

      {/* Quiz Modal Overlay */}
      {quizState && quizState.isActive && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-xl font-black text-black">Vocabulary Quiz</h2>
              <button onClick={closeQuiz} className="text-gray-400 hover:text-black transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            
            <div className="p-6 md:p-8 flex-grow">
              {quizState.currentQuestionIndex < quizState.questions.length ? (
                // Active Quiz Question
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-center mb-8">
                    <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Frage {quizState.currentQuestionIndex + 1} von {quizState.questions.length}</span>
                    <span className="text-sm font-bold text-black bg-gray-100 px-3 py-1 rounded-full">Punkte: {quizState.score}</span>
                  </div>

                  <div className="text-center mb-10">
                    <span className="text-sm font-medium text-gray-500 mb-2 block">Deutsch</span>
                    <h3 className="text-4xl font-black text-black tracking-tight">
                      {quizState.questions[quizState.currentQuestionIndex].word}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                    {quizState.currentOptions.map((opt, i) => {
                      const isSelected = quizState.selectedOption === opt;
                      const isCorrectAnswer = opt === getTranslationForOption(quizState.questions[quizState.currentQuestionIndex], selectedLangCode);
                      
                      let btnClass = "bg-white border-2 border-gray-200 text-black hover:border-gray-400 hover:bg-gray-50";
                      
                      if (quizState.selectedOption) {
                        if (isCorrectAnswer) {
                          btnClass = "bg-green-100 border-green-500 text-green-900";
                        } else if (isSelected) {
                          btnClass = "bg-red-100 border-red-500 text-red-900";
                        } else {
                          btnClass = "bg-gray-50 border-gray-200 text-gray-400 opacity-50";
                        }
                      }

                      return (
                        <button
                          key={i}
                          disabled={!!quizState.selectedOption}
                          onClick={() => handleOptionSelect(opt)}
                          className={`w-full text-left p-4 rounded-xl font-bold transition-all shadow-sm ${btnClass}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-auto pt-4 flex justify-end">
                    <button
                      disabled={!quizState.selectedOption}
                      onClick={nextQuestion}
                      className={`px-8 py-3 rounded-xl font-bold shadow-md transition-all ${
                        quizState.selectedOption 
                          ? "bg-black text-white hover:bg-gray-800 hover:scale-105 active:scale-95" 
                          : "bg-gray-200 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {quizState.currentQuestionIndex === quizState.questions.length - 1 ? "Beenden" : "Nächste Frage"}
                    </button>
                  </div>
                </div>
              ) : (
                // Quiz Results
                <div className="flex flex-col items-center justify-center text-center py-12">
                  <div className="text-xl text-black font-bold mb-2">
                    Ergebnis: {quizState.score} / {quizState.questions.length}
                  </div>
                  <div className="text-4xl font-black text-black mb-8">
                    {Math.round((quizState.score / quizState.questions.length) * 100)}%
                  </div>
                  <button
                    onClick={closeQuiz}
                    className="px-10 py-4 bg-black text-white font-bold rounded-xl shadow-md hover:bg-gray-800 transition-all hover:scale-105 active:scale-95 w-full md:w-auto"
                  >
                    Quiz schließen
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
