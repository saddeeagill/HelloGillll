'use client';

import React, { useState } from 'react';
import { LESEN_EXAM } from '../../data/exam-lesen';

interface LesenModuleProps {
  onBack: () => void;
  onContinue: () => void;
}

export default function LesenModule({ onBack, onContinue }: LesenModuleProps) {
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const currentPart = LESEN_EXAM[currentPartIndex];

  // Validation
  const allCurrentQuestionsAnswered = currentPart.questions.every(q => answers[q.id]);

  // Global Progress
  let totalQuestions = 0;
  let answeredCount = 0;
  let correctCount = 0;

  LESEN_EXAM.forEach(part => {
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

  const handleSelectAnswer = (questionId: string, optionId: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  const handleNext = () => {
    if (currentPartIndex < LESEN_EXAM.length - 1) {
      setCurrentPartIndex(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onContinue();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentPartIndex > 0) {
      setCurrentPartIndex(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Helper to render text with newlines as paragraphs
  const renderFormattedText = (text: string) => {
    return text.split('\n').map((paragraph, i) => (
      <p key={i} className={`mb-3 last:mb-0 ${i === 0 ? 'font-bold text-gray-800' : 'text-gray-600'}`}>
        {paragraph}
      </p>
    ));
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
          {LESEN_EXAM.map((p, i) => (
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

        {/* Global Reading Text for Part (e.g. Part 3 Library) */}
        {currentPart.readingText && (
          <div className="bg-yellow-50/50 p-6 md:p-8 rounded-2xl mb-8 border-2 border-yellow-200 shadow-inner">
            <div className="prose prose-yellow max-w-none text-lg">
              {renderFormattedText(currentPart.readingText)}
            </div>
          </div>
        )}

        <div className="space-y-10">
          {currentPart.questions.map((q) => (
            <div key={q.id} className="bg-gray-50 p-6 md:p-8 rounded-2xl border-2 border-gray-100">
              
              {/* Question specific reading text (Part 1) */}
              {q.readingText && (
                <div className="bg-white p-6 rounded-xl border-2 border-gray-200 mb-6 shadow-sm">
                  {renderFormattedText(q.readingText)}
                </div>
              )}

              <h3 className="text-xl font-bold text-gray-800 mb-6">{q.question}</h3>
              
              <div className="space-y-3">
                {q.options.map(opt => {
                  const isSelected = answers[q.id] === opt.id;
                  
                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectAnswer(q.id, opt.id)}
                      className={`w-full text-left p-4 rounded-xl border-2 font-medium transition-all ${
                        isSelected ? 'bg-[#ffe400]/20 border-[#ffe400] text-black shadow-sm' :
                        'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          isSelected ? 'border-[#0f7650] bg-[#0f7650]' :
                          'border-gray-300'
                        }`}>
                          {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-white"></div>}
                        </div>
                        <span className="text-lg leading-snug">{opt.text}</span>
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
            {currentPartIndex === LESEN_EXAM.length - 1 ? 'Weiter zu Schreiben' : 'Weiter'}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
