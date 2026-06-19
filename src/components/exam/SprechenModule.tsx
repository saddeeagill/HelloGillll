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
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-yellow-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob"></div>
          <div className="absolute top-20 -right-20 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-20 left-20 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-4000"></div>
        </div>

        <div className="z-10 flex flex-col items-center">
          <div className="text-8xl mb-6 animate-bounce">🏆</div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-4 tracking-tight">Herzlichen Glückwunsch!</h2>
          <h3 className="text-2xl font-bold text-[#0f7650] mb-8">Sie haben die Prüfung beendet.</h3>
          
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border-2 border-green-100 shadow-xl mb-12 transform hover:scale-105 transition-transform max-w-sm w-full">
            <div className="text-center">
              <span className="block text-gray-500 font-bold uppercase tracking-widest text-sm mb-2">Gesamtergebnis</span>
              <span className="text-5xl font-black text-green-600">100%</span>
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
            className="bg-[#0f7650] text-white px-10 py-5 rounded-full font-black text-xl hover:bg-[#0a5237] transition-all shadow-lg hover:shadow-xl active:scale-95 flex items-center gap-3"
          >
            Zurück zum Hauptmenü
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
          </button>
        </div>
      </div>
    );
  }

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
          {SPRECHEN_EXAM.map((p, i) => (
            <div key={p.part} className={`w-3 h-3 rounded-full ${i === currentPartIndex ? 'bg-[#0f7650]' : i < currentPartIndex ? 'bg-[#0f7650]/40' : 'bg-gray-200'}`}></div>
          ))}
        </div>
      </div>

      <div className="flex flex-col flex-1 max-w-4xl mx-auto w-full">
        
        {/* Header Section */}
        <div className="mb-10 text-center">
          <span className="bg-[#ffe400] text-black font-extrabold px-6 py-2 rounded-full text-sm inline-block mb-6 uppercase tracking-wider">
            Teil {currentPart.part}
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-gray-800 leading-tight mb-4">
            {currentPart.instruction}
          </h2>
          <div className="inline-flex items-center gap-4 bg-gray-50 px-6 py-2 rounded-full text-gray-500 font-medium">
            <span className="flex items-center gap-2"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> {currentPart.duration}</span>
          </div>
        </div>

        {/* Note Banner */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-10 rounded-r-xl shadow-sm flex items-start gap-3">
          <svg className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <p className="font-medium text-blue-900">{currentPart.note}</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 mb-8">
          
          {/* Left Column: Topics & Cards */}
          <div className="flex-1 space-y-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-gray-100 pb-2">Themen & Aufgaben</h3>
            
            <div className={`grid gap-4 ${currentPart.part === 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
              {currentPart.topics?.map((topic, idx) => (
                <div key={idx} className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-sm hover:border-[#0f7650] hover:shadow-md transition-all cursor-default">
                  <div className="flex items-center gap-3 mb-3">
                    {topic.icon && <span className="text-3xl">{topic.icon}</span>}
                    <h4 className="font-bold text-lg text-gray-800">{topic.title}</h4>
                  </div>
                  
                  {topic.questions && (
                    <ul className="space-y-2 mt-4 border-t-2 border-gray-50 pt-4">
                      {topic.questions.map((q, i) => (
                        <li key={i} className="flex gap-2 text-gray-600 font-medium">
                          <span className="text-[#0f7650] font-bold">•</span> {q}
                        </li>
                      ))}
                    </ul>
                  )}

                  {topic.examples && (
                    <ul className="space-y-2 mt-4 border-t-2 border-gray-50 pt-4">
                      {topic.examples.map((ex, i) => (
                        <li key={i} className={`flex gap-2 font-medium ${i === 0 ? 'text-gray-800 italic' : 'text-gray-600'}`}>
                          {i !== 0 && <span className="text-blue-500 font-bold">•</span>} {ex.replace('• ', '')}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Examples & Tips */}
          <div className="w-full lg:w-1/3 flex flex-col gap-6">
            
            {/* Example Box */}
            {currentPart.example && (
              <div className="bg-yellow-50 rounded-2xl p-6 border-2 border-yellow-200">
                <h3 className="text-lg font-bold text-yellow-800 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                  Beispiel
                </h3>
                <div className="text-gray-700 font-medium leading-relaxed italic space-y-2">
                  {Array.isArray(currentPart.example) 
                    ? currentPart.example.map((line, i) => (
                        <p key={i} className={line.includes('✓') ? 'text-green-600' : line.includes('✗') ? 'text-red-500' : line.includes('Person') ? 'font-bold' : ''}>
                          {line}
                        </p>
                      ))
                    : <p>{currentPart.example}</p>
                  }
                </div>
              </div>
            )}

            {/* Tips Box */}
            <div className="bg-gray-50 rounded-2xl p-6 border-2 border-gray-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                Tipps
              </h3>
              <ul className="space-y-3">
                {currentPart.tips.map((tip, idx) => (
                  <li key={idx} className="flex gap-3 text-gray-600 font-medium text-sm">
                    <span className="text-[#0f7650] font-black mt-0.5">✓</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="mt-8 flex justify-between items-center pt-6 border-t-2 border-gray-100">
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
            className="px-8 py-3 rounded-xl font-bold bg-[#0f7650] text-white hover:bg-[#0a5237] transition-all shadow-md active:scale-95 flex items-center gap-2"
          >
            {currentPartIndex === SPRECHEN_EXAM.length - 1 ? 'Prüfung abschließen' : 'Weiter'}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
