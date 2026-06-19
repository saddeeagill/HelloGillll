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
    <div className="w-full bg-white rounded-2xl p-4 md:p-8 border border-gray-100 shadow-sm min-h-[400px] flex flex-col animate-fade-in relative">
      
      {/* Top Navigation */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
        <button 
          onClick={onBack}
          className="text-black text-sm font-medium flex items-center gap-1 transition-colors bg-white hover:bg-gray-50 py-1.5 px-3 rounded-md border border-gray-200"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Menü
        </button>

        <div className="flex gap-2">
          {LESEN_EXAM.map((p, i) => (
            <div key={p.part} className={`w-2 h-2 rounded-full ${i === currentPartIndex ? 'bg-[#0f7650]' : 'bg-gray-300'}`}></div>
          ))}
        </div>
      </div>

      {/* Progress HUD */}
      <div className="mb-6 bg-white rounded-xl p-3 border border-gray-200 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
        <div className="flex-1 w-full">
          <div className="flex justify-between text-xs font-semibold text-black mb-1">
            <span>Fortschritt (Progress)</span>
            <span>{answeredCount} / {totalQuestions} beantwortet</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-[#0f7650] h-2 rounded-full transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
          </div>
        </div>
        <div className="bg-white px-3 py-1.5 rounded-lg shadow-sm border border-gray-200 flex flex-col items-center min-w-[100px]">
          <span className="text-[10px] font-bold text-black uppercase tracking-wider">Ergebnis</span>
          <span className="text-lg font-bold text-[#0f7650]">{correctCount} <span className="text-xs font-medium text-black">Richtig</span></span>
        </div>
      </div>

      <div className="flex flex-col flex-1 max-w-4xl mx-auto w-full">
        <div className="mb-6">
          <span className="bg-[#0f7650] text-white font-bold px-3 py-1 rounded-md text-xs inline-block mb-2">
            Teil {currentPart.part}
          </span>
          <h2 className="text-lg md:text-xl font-semibold text-black leading-snug">
            {currentPart.instruction}
          </h2>
        </div>

        {/* Global Reading Text for Part (e.g. Part 3 Library) */}
        {currentPart.readingText && (
          <div className="bg-white p-4 rounded-xl border border-gray-200 mb-6 shadow-sm">
            <div className="max-w-none text-lg">
              {renderFormattedText(currentPart.readingText)}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentPart.questions.map((q) => (
            <div key={q.id} className="bg-white p-4 md:p-5 rounded-xl border border-gray-200 flex flex-col shadow-sm">
              
              {/* Question specific reading text (Part 1) */}
              {q.readingText && (
                <div className="bg-white p-4 rounded-lg mb-4 border border-gray-200 shadow-sm text-sm text-black whitespace-pre-wrap leading-relaxed">
                  <span className="block text-xs font-bold text-[#0f7650] mb-2 uppercase tracking-wide">Text lesen</span>
                  {q.readingText}
                </div>
              )}

              <h3 className="text-base font-semibold text-black mb-4">{q.question}</h3>
              
              <div className="space-y-2 mt-auto">
                {q.options.map(opt => {
                  const isSelected = answers[q.id] === opt.id;
                  
                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectAnswer(q.id, opt.id)}
                      className={`w-full text-left p-3 rounded-lg border text-sm font-medium transition-colors ${
                        isSelected ? 'bg-white border-black text-black shadow-sm' :
                        'bg-white border-gray-200 text-black hover:border-black'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 ${
                          isSelected ? 'border-black bg-black' :
                          'border-gray-300'
                        }`}>
                          {isSelected && <div className="w-2 h-2 rounded-full bg-white"></div>}
                        </div>
                        <span className="leading-snug text-black">{opt.text}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Navigation */}
        <div className="mt-8 flex justify-between items-center pt-4 border-t border-gray-200">
          <button
            onClick={handlePrevious}
            disabled={currentPartIndex === 0}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-gray-200 ${
              currentPartIndex === 0 ? 'opacity-0 pointer-events-none' : 'bg-white text-black hover:bg-gray-50'
            }`}
          >
            Zurück
          </button>
          
          <button
            onClick={handleNext}
            disabled={!allCurrentQuestionsAnswered}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
              !allCurrentQuestionsAnswered 
                ? 'bg-white border border-gray-200 text-gray-400 cursor-not-allowed' 
                : 'bg-[#0f7650] text-white hover:bg-[#0a5237]'
            }`}
          >
            {currentPartIndex === LESEN_EXAM.length - 1 ? 'Weiter zu Schreiben' : 'Weiter'}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l7-7m7-7H3"></path></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
