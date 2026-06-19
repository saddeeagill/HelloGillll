'use client';

import React, { useState } from 'react';
import { HOREN_EXAM } from '../../data/exam-horen';

interface HorenModuleProps {
  onBack: () => void;
  onContinue: () => void;
}

export default function HorenModule({ onBack, onContinue }: HorenModuleProps) {
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const currentPart = HOREN_EXAM[currentPartIndex];

  // Validation
  const allCurrentQuestionsAnswered = currentPart.questions.every(q => answers[q.id]);

  // Global Progress
  let totalQuestions = 0;
  let answeredCount = 0;
  let correctCount = 0;

  HOREN_EXAM.forEach(part => {
    part.questions.forEach(q => {
      totalQuestions++;
      if (answers[q.id]) {
        answeredCount++;
        if (answers[q.id] === q.correctAnswer) {
          correctCount++;
        }
      }
    });
  });

  const progressPercentage = Math.round((answeredCount / totalQuestions) * 100);

  const playAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'de-DE';
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Text-to-speech is not supported in your browser.");
    }
  };

  const handleSelectAnswer = (questionId: string, optionId: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  const handleNext = () => {
    if (currentPartIndex < HOREN_EXAM.length - 1) {
      setCurrentPartIndex(prev => prev + 1);
    } else {
      onContinue();
    }
  };

  const handlePrevious = () => {
    if (currentPartIndex > 0) {
      setCurrentPartIndex(prev => prev - 1);
    }
  };

  return (
    <div className="w-full bg-white rounded-3xl p-6 md:p-12 border-2 border-gray-100 shadow-sm min-h-[400px] flex flex-col animate-fade-in relative">
      
      {/* Top Navigation */}
      <div className="flex justify-between items-center mb-8 pb-4 border-b-2 border-gray-100">
        <button 
          onClick={onBack}
          className="text-gray-400 hover:text-gray-700 font-medium flex items-center gap-2 transition-colors bg-gray-50 hover:bg-gray-100 py-2 px-4 rounded-full"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Menü
        </button>

        <div className="flex gap-2">
          {HOREN_EXAM.map((p, i) => (
            <div key={p.part} className={`w-3 h-3 rounded-full ${i === currentPartIndex ? 'bg-[#0f7650]' : i < currentPartIndex ? 'bg-[#0f7650]/40' : 'bg-gray-200'}`}></div>
          ))}
        </div>
      </div>

      {/* Progress HUD */}
      <div className="mb-8 bg-gray-50 rounded-2xl p-4 border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
        <div className="flex-1 w-full">
          <div className="flex justify-between text-sm font-bold text-gray-600 mb-2">
            <span>Fortschritt (Progress)</span>
            <span>{answeredCount} / {totalQuestions} beantwortet</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-[#0f7650] h-2.5 rounded-full transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
          </div>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center min-w-[120px]">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Ergebnis</span>
          <span className="text-xl font-black text-green-600">{correctCount} <span className="text-sm font-medium text-gray-400">Richtig</span></span>
        </div>
      </div>

      <div className="flex flex-col flex-1 max-w-3xl mx-auto w-full">
        <div className="mb-8">
          <span className="bg-[#ffe400] text-black font-extrabold px-4 py-1.5 rounded-full text-sm inline-block mb-4">
            Teil {currentPart.part}
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 leading-relaxed">
            {currentPart.instruction}
          </h2>
        </div>

        {/* Global Audio for Part (e.g. Part 2 Conversation) */}
        {currentPart.audioText && (
          <div className="bg-blue-50/50 p-6 rounded-2xl mb-8 border-2 border-blue-100 flex flex-col items-center justify-center gap-4">
            <button 
              onClick={() => playAudio(currentPart.audioText!)}
              className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-white flex items-center justify-center hover:scale-105 transition-all shadow-md active:scale-95 group"
            >
              <svg className="w-8 h-8 ml-1 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>
            </button>
            <span className="font-bold text-blue-800">Gespräch Hören (Listen)</span>
          </div>
        )}

        <div className="space-y-10">
          {currentPart.questions.map((q, idx) => (
            <div key={q.id} className="bg-gray-50 p-6 md:p-8 rounded-2xl border-2 border-gray-100">
              
              {/* Question specific audio (Part 1 and 3) */}
              {q.audioText && (
                <div className="flex items-center gap-4 mb-6 pb-6 border-b-2 border-gray-200/60">
                  <button 
                    onClick={() => playAudio(q.audioText!)}
                    className="w-12 h-12 rounded-full bg-[#0f7650] text-white flex items-center justify-center flex-shrink-0 hover:bg-[#0a5237] transition-all shadow-sm active:scale-95"
                  >
                    <svg className="w-6 h-6 ml-0.5" viewBox="0 0 24 24" fill="currentColor"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>
                  </button>
                  <span className="font-bold text-gray-600">Audio {idx + 1} Hören</span>
                </div>
              )}

              <h3 className="text-xl font-bold text-gray-800 mb-6">{q.question}</h3>
              
              <div className="space-y-3">
                {q.options.map(opt => {
                  const isSelected = answers[q.id] === opt.id;
                  const isCorrect = isSelected && answers[q.id] === q.correctAnswer;
                  const isWrong = isSelected && answers[q.id] !== q.correctAnswer;

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectAnswer(q.id, opt.id)}
                      className={`w-full text-left p-4 rounded-xl border-2 font-medium transition-all ${
                        isCorrect ? 'bg-green-50 border-green-500 text-green-800 shadow-sm' :
                        isWrong ? 'bg-red-50 border-red-500 text-red-800 shadow-sm' :
                        isSelected ? 'bg-[#ffe400]/20 border-[#ffe400] text-black shadow-sm' :
                        'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          isCorrect ? 'border-green-500 bg-green-500 text-white' :
                          isWrong ? 'border-red-500 bg-red-500 text-white' :
                          isSelected ? 'border-[#0f7650] bg-[#0f7650]' :
                          'border-gray-300'
                        }`}>
                          {isCorrect && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>}
                          {isWrong && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path></svg>}
                          {isSelected && !isCorrect && !isWrong && <div className="w-2.5 h-2.5 rounded-full bg-white"></div>}
                        </div>
                        <span className="text-lg">{opt.text}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Navigation */}
        <div className="mt-12 flex justify-between items-center pt-6 border-t-2 border-gray-100">
          <button
            onClick={handlePrevious}
            disabled={currentPartIndex === 0}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              currentPartIndex === 0 ? 'opacity-0 pointer-events-none' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Zurück
          </button>
          
          <button
            onClick={handleNext}
            disabled={!allCurrentQuestionsAnswered}
            className={`px-8 py-3 rounded-xl font-bold transition-all shadow-md flex items-center gap-2 ${
              !allCurrentQuestionsAnswered 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none' 
                : 'bg-[#0f7650] text-white hover:bg-[#0a5237] active:scale-95'
            }`}
          >
            {currentPartIndex === HOREN_EXAM.length - 1 ? 'Weiter zu Lesen' : 'Weiter'}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7-7m7-7H3"></path></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
