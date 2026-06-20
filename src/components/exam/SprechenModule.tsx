'use client';

import React, { useState } from 'react';
import { SPRECHEN_EXAM } from '../../data/exam-sprechen';

interface SprechenModuleProps {
  onBack: () => void;
}

export default function SprechenModule({ onBack }: SprechenModuleProps) {
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const currentPart = SPRECHEN_EXAM[currentPartIndex];

  const handleNext = () => {
    if (currentPartIndex < SPRECHEN_EXAM.length - 1) {
      setCurrentPartIndex(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setShowResults(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentPartIndex > 0) {
      setCurrentPartIndex(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (showResults) {
    return (
      <div className="w-full bg-white rounded-3xl p-8 md:p-12 border-2 border-gray-100 shadow-sm min-h-[500px] flex flex-col items-center justify-center animate-fade-in relative text-center">
        
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-3xl pointer-events-none">
          {/* Decorative background blobs */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-gray-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob"></div>
          <div className="absolute top-20 -right-20 w-72 h-72 bg-gray-100 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-20 left-20 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-4000"></div>
        </div>

        <div className="z-10 flex flex-col items-center">
          <div className="text-8xl mb-6 animate-bounce">🏆</div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-4 tracking-tight">Herzlichen Glückwunsch!</h2>
          <h3 className="text-2xl font-bold text-[#000000] mb-8">Sie haben die Prüfung beendet.</h3>
          
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border-2 border-gray-300 shadow-xl mb-12 transform hover:scale-105 transition-transform max-w-sm w-full">
            <div className="text-center">
              <span className="block text-gray-500 font-bold uppercase tracking-widest text-sm mb-2">Gesamtergebnis</span>
              <span className="text-5xl font-black text-black">100%</span>
              <div className="mt-4 flex justify-center gap-1">
                {'⭐⭐⭐⭐⭐'.split('').map((star, i) => (
                  <span key={i} className="text-2xl">{star}</span>
                ))}
              </div>
            </div>
          </div>

          <p className="text-gray-600 mb-10 text-lg font-medium max-w-lg">
            Sie haben alle Teile (Hören, Lesen, Schreiben, Sprechen) erfolgreich abgeschlossen. Toll gemacht!
          </p>

          <button 
            onClick={onBack}
            className="bg-[#000000] text-white px-10 py-5 rounded-full font-black text-xl hover:bg-[#333333] transition-all shadow-lg hover:shadow-xl active:scale-95 flex items-center gap-3"
          >
            Zurück zum Hauptmenü
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
          </button>
        </div>
      </div>
    );
  }

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
          {SPRECHEN_EXAM.map((p, i) => (
            <div key={p.part} className={`w-2 h-2 rounded-full ${i === currentPartIndex ? 'bg-[#000000]' : 'bg-gray-300'}`}></div>
          ))}
        </div>
      </div>

      <div className="flex flex-col flex-1 max-w-4xl mx-auto w-full">
        
        {/* Header Section */}
        <div className="mb-6">
          <span className="bg-[#000000] text-white font-bold px-3 py-1 rounded-md text-xs inline-block mb-2">
            Teil {currentPart.part}
          </span>
          <h2 className="text-lg md:text-xl font-semibold text-black leading-snug mb-3">
            {currentPart.instruction}
          </h2>
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 px-3 py-1 rounded-md text-black text-xs font-medium">
            <span className="flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> {currentPart.duration}</span>
          </div>
        </div>

        {/* Note Banner */}
        <div className="bg-white border-l-4 border-[#000000] p-3 mb-6 rounded-r-lg shadow-sm flex items-start gap-2 border-y border-r border-gray-200">
          <svg className="w-5 h-5 text-[#000000] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <p className="font-medium text-black text-sm leading-relaxed">{currentPart.note}</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 mb-6">
          
          {/* Left Column: Topics & Cards */}
          <div className="flex-1 space-y-4">
            <h3 className="text-base font-semibold text-black mb-3 border-b border-gray-200 pb-2">Themen & Aufgaben</h3>
            
            <div className={`grid gap-3 ${currentPart.part === 1 ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-2'}`}>
              {currentPart.topics?.map((topic, idx) => (
                <div key={idx} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:border-[#000000] transition-colors cursor-default">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold text-sm text-black">{topic.title}</h4>
                  </div>
                  
                  {topic.questions && (
                    <ul className="space-y-1 mt-2 border-t border-gray-200 pt-2">
                      {topic.questions.map((q, i) => (
                        <li key={i} className="flex gap-2 text-black text-xs">
                          <span className="text-[#000000]">•</span> {q}
                        </li>
                      ))}
                    </ul>
                  )}

                  {topic.examples && (
                    <ul className="space-y-1 mt-2 border-t border-gray-200 pt-2">
                      {topic.examples.map((ex, i) => (
                        <li key={i} className={`flex gap-2 text-xs text-black ${i === 0 ? 'italic' : ''}`}>
                          {i !== 0 && <span className="text-black">•</span>} {ex.replace('• ', '')}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Examples & Tips */}
          <div className="w-full lg:w-1/3 flex flex-col gap-4">
            
            {/* Example Box */}
            {currentPart.example && (
              <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                <h3 className="text-sm font-semibold text-black mb-2 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                  Beispiel
                </h3>
                <div className="text-black text-sm leading-relaxed italic space-y-1">
                  {Array.isArray(currentPart.example) 
                    ? currentPart.example.map((line, i) => (
                        <p key={i} className={line.includes('Person') ? 'font-semibold' : ''}>
                          {line}
                        </p>
                      ))
                    : <p>{currentPart.example}</p>
                  }
                </div>
              </div>
            )}

            {/* Tips Box */}
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <h3 className="text-sm font-semibold text-black mb-2 flex items-center gap-1">
                <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                Tipps
              </h3>
              <ul className="space-y-2">
                {currentPart.tips.map((tip, idx) => (
                  <li key={idx} className="flex gap-2 text-black text-xs">
                    <span className="text-[#000000] mt-0.5">✓</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="mt-6 flex justify-between items-center pt-4 border-t border-gray-200">
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
            className="px-6 py-2 rounded-lg text-sm font-medium bg-[#000000] text-white hover:bg-[#333333] transition-colors flex items-center gap-2"
          >
            {currentPartIndex === SPRECHEN_EXAM.length - 1 ? 'Prüfung abschließen' : 'Weiter'}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
