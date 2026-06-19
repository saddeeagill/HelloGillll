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
          {SCHREIBEN_EXAM.map((p, i) => (
            <div key={p.part} className={`w-3 h-3 rounded-full ${i === currentPartIndex ? 'bg-[#0f7650]' : i < currentPartIndex ? 'bg-[#0f7650]/40' : 'bg-gray-200'}`}></div>
          ))}
        </div>
      </div>

      <div className="flex flex-col flex-1 max-w-3xl mx-auto w-full">
        <div className="mb-8">
          <span className="bg-[#ffe400] text-black font-extrabold px-4 py-1.5 rounded-full text-sm inline-block mb-4">
            Teil {currentPart.part}
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 leading-relaxed mb-4">
            {currentPart.instruction}
          </h2>
          <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-r-lg">
            <p className="font-medium text-orange-800">{currentPart.situation}</p>
          </div>
        </div>

        <div className="flex-1 w-full flex flex-col items-center">
          
          {/* Teil 1: Formular ausfüllen */}
          {currentPart.part === 1 && (
            <div className="w-full bg-gray-50 rounded-2xl border-2 border-gray-200 p-6 md:p-8 shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-6 pb-4 border-b-2 border-gray-200">Anmeldung Deutschkurs</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentPart.fields.map(field => (
                  <div key={field.id} className="flex flex-col">
                    <label className="font-bold text-gray-700 mb-2 text-sm">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={formAnswers[field.id] || ''}
                      onChange={(e) => handleFormChange(field.id, e.target.value)}
                      className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#0f7650] focus:ring-4 focus:ring-[#0f7650]/10 transition-all font-medium text-gray-800 placeholder-gray-400"
                    />
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-400 mt-6 font-medium">* Pflichtfelder</p>
            </div>
          )}

          {/* Teil 2: Kurzen Text schreiben */}
          {currentPart.part === 2 && (
            <div className="w-full flex flex-col gap-8">
              
              <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 md:p-8 shadow-sm flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 mb-4 uppercase tracking-wider text-sm text-[#0f7650]">Punkte:</h3>
                  <ul className="space-y-3">
                    {currentPart.bulletPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#e30613] mt-2 flex-shrink-0"></div>
                        <span className="font-medium text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1 bg-gray-50 p-6 rounded-xl border border-gray-100">
                  <h3 className="font-bold text-gray-800 mb-4 uppercase tracking-wider text-sm text-blue-600">Bewertung (Tipps):</h3>
                  <ul className="space-y-2">
                    {currentPart.evaluation.map((evalPoint, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                        <svg className="w-5 h-5 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        {evalPoint}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="w-full relative">
                <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                  <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Aktuell:</span>
                  <span className={`px-3 py-1 rounded-full font-bold text-sm ${
                    wordCount < 25 ? 'bg-orange-100 text-orange-600' :
                    wordCount > 35 ? 'bg-orange-100 text-orange-600' :
                    'bg-green-100 text-green-600'
                  }`}>
                    {wordCount} Wörter
                  </span>
                </div>
                
                <textarea
                  value={textAnswer}
                  onChange={(e) => setTextAnswer(e.target.value)}
                  placeholder="Liebe ...,&#10;&#10;...&#10;&#10;Liebe Grüße&#10;..."
                  className="w-full h-80 bg-yellow-50/30 border-2 border-gray-200 rounded-2xl p-6 pt-16 focus:outline-none focus:border-[#0f7650] focus:ring-4 focus:ring-[#0f7650]/10 transition-all font-medium text-gray-800 placeholder-gray-400 resize-none leading-relaxed"
                />
              </div>

            </div>
          )}

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
            disabled={!isCurrentPartValid}
            className={`px-8 py-3 rounded-xl font-bold transition-all shadow-md flex items-center gap-2 ${
              !isCurrentPartValid 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none' 
                : 'bg-[#0f7650] text-white hover:bg-[#0a5237] active:scale-95'
            }`}
          >
            {currentPartIndex === SCHREIBEN_EXAM.length - 1 ? 'Weiter zu Sprechen' : 'Weiter'}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
