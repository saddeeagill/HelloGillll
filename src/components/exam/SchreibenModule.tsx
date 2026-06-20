'use client';

import React, { useState } from 'react';
import { SCHREIBEN_EXAM } from '../../data/exam-schreiben';

interface SchreibenModuleProps {
  onBack: () => void;
  onContinue: () => void;
}

export default function SchreibenModule({ onBack, onContinue }: SchreibenModuleProps) {
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [formAnswers, setFormAnswers] = useState<Record<string, string>>({});
  const [textAnswer, setTextAnswer] = useState('');

  const currentPart = SCHREIBEN_EXAM[currentPartIndex];
  
  // Word counter logic for Part 2
  const wordCount = textAnswer.trim() === '' ? 0 : textAnswer.trim().split(/\s+/).length;

  // Validation logic
  let isCurrentPartValid = false;
  if (currentPart.part === 1) {
    // All fields must be filled
    isCurrentPartValid = currentPart.fields.every(f => formAnswers[f.id] && formAnswers[f.id].trim() !== '');
  } else if (currentPart.part === 2) {
    // Must have written at least some words
    isCurrentPartValid = wordCount > 0;
  }

  const handleNext = () => {
    if (currentPartIndex < SCHREIBEN_EXAM.length - 1) {
      setCurrentPartIndex(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // In a real app we would submit the text/form here. 
      // For the flow, we just go to the next module (Speaking).
      onContinue();
    }
  };

  const handlePrevious = () => {
    if (currentPartIndex > 0) {
      setCurrentPartIndex(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFormChange = (id: string, value: string) => {
    setFormAnswers(prev => ({
      ...prev,
      [id]: value
    }));
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
          {SCHREIBEN_EXAM.map((p, i) => (
            <div key={p.part} className={`w-2 h-2 rounded-full ${i === currentPartIndex ? 'bg-[#000000]' : 'bg-gray-300'}`}></div>
          ))}
        </div>
      </div>

      <div className="flex flex-col flex-1 max-w-4xl mx-auto w-full">
        <div className="mb-6">
          <span className="bg-[#000000] text-white font-bold px-3 py-1 rounded-md text-xs inline-block mb-2">
            Teil {currentPart.part}: {currentPart.title}
          </span>
          <h2 className="text-lg md:text-xl font-semibold text-black leading-snug">
            {currentPart.instruction}
          </h2>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-xl border border-gray-200 flex flex-col shadow-sm">
          {/* Situation Box */}
          <div className="bg-white p-4 rounded-lg mb-6 border border-gray-200 shadow-sm">
            <span className="block text-xs font-bold text-[#000000] mb-2 uppercase tracking-wide">Situation</span>
            <p className="text-sm text-black leading-relaxed whitespace-pre-wrap">{currentPart.situation}</p>
          </div>
          
          {/* Form Fields (Part 1) */}
          {currentPart.part === 1 && currentPart.fields && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentPart.fields.map(field => (
                <div key={field.id} className="flex flex-col">
                  <label htmlFor={field.id} className="text-sm font-semibold text-black mb-1">
                    {field.label} {field.required && <span className="text-black font-bold">*</span>}
                  </label>
                  <input
                    type="text"
                    id={field.id}
                    value={formAnswers[field.id] || ''}
                    onChange={(e) => handleFormChange(field.id, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full p-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors text-sm text-black placeholder-gray-400"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Text Area (Part 2) */}
          {currentPart.part === 2 && (
            <div className="flex flex-col flex-1 h-full min-h-[300px]">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-black">Ihre Nachricht:</span>
                <span className={`text-xs font-bold px-2 py-1 rounded-md border ${wordCount < 30 ? 'bg-white border-black text-black' : 'bg-white border-[#000000] text-[#000000]'}`}>
                  {wordCount} / ~30 Wörter
                </span>
              </div>
              <textarea
                value={textAnswer}
                onChange={(e) => setTextAnswer(e.target.value)}
                placeholder="Schreiben Sie hier Ihren Text..."
                className="flex-1 w-full p-4 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors resize-none text-sm text-black placeholder-gray-400 min-h-[250px]"
              ></textarea>
            </div>
          )}
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
            disabled={!isCurrentPartValid}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
              !isCurrentPartValid 
                ? 'bg-white border border-gray-200 text-gray-400 cursor-not-allowed' 
                : 'bg-[#000000] text-white hover:bg-[#333333]'
            }`}
          >
            {currentPartIndex === SCHREIBEN_EXAM.length - 1 ? 'Weiter zu Sprechen' : 'Weiter'}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
