'use client';

import React, { useState } from 'react';
import HorenModule from './exam/HorenModule';
import LesenModule from './exam/LesenModule';
import SchreibenModule from './exam/SchreibenModule';
import SprechenModule from './exam/SprechenModule';

type ExamState = 'start' | 'listen' | 'read' | 'write' | 'speak';

export default function ExamView() {
  const [examState, setExamState] = useState<ExamState>('start');

  const modules = [
    {
      id: 'listen',
      titleDe: 'Hören',
      titleEn: 'Listening',
      color: 'from-blue-400 to-blue-600',
    },
    {
      id: 'read',
      titleDe: 'Lesen',
      titleEn: 'Reading',
      color: 'from-green-400 to-green-600',
    },
    {
      id: 'write',
      titleDe: 'Schreiben',
      titleEn: 'Writing',
      color: 'from-orange-400 to-orange-600',
    },
    {
      id: 'speak',
      titleDe: 'Sprechen',
      titleEn: 'Speaking',
      color: 'from-purple-400 to-purple-600',
    }
  ];

  return (
    <div className="flex flex-col h-full w-full max-w-5xl mx-auto pb-20 px-4 md:px-0 animate-fade-in">
      
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pt-4">
        <div className="flex items-center gap-3 md:gap-4">
          <h1 className="text-2xl md:text-4xl font-extrabold text-[#000000] drop-shadow-sm tracking-tight">
            Prüfung <span className="text-gray-400 text-xl md:text-2xl font-semibold ml-2">(Exam)</span>
          </h1>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 w-full flex flex-col items-center">
        
        {examState === 'start' && (
          <div className="w-full flex flex-col items-center animate-fade-in mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
            {[
              { id: 'listen', title: 'Hören', active: true },
              { id: 'read', title: 'Lesen', active: true },
              { id: 'write', title: 'Schreiben', active: true },
              { id: 'speak', title: 'Sprechen', active: true }
            ].map((item) => (
              <button 
                key={item.id}
                onClick={() => setExamState(item.id as ExamState)}
                disabled={!item.active}
                className={`flex items-center justify-center p-6 rounded-2xl border-2 transition-all ${
                  item.active 
                    ? 'bg-white border-gray-200 hover:border-[#000000] hover:text-[#000000] text-black hover:shadow-lg' 
                    : 'bg-white border-gray-100 text-gray-300 opacity-60 cursor-not-allowed'
                }`}
              >
                <h3 className="text-xl font-bold leading-tight">
                  {item.title}
                </h3>
              </button>
            ))}
          </div>
          </div>
        )}

        {examState === 'listen' && (
          <HorenModule 
            onBack={() => setExamState('start')} 
            onContinue={() => setExamState('read')} 
          />
        )}

        {examState === 'read' && (
          <LesenModule 
            onBack={() => setExamState('start')} 
            onContinue={() => setExamState('write')} 
          />
        )}

        {examState === 'write' && (
          <SchreibenModule 
            onBack={() => setExamState('start')} 
            onContinue={() => setExamState('speak')} 
          />
        )}

        {examState === 'speak' && (
          <SprechenModule 
            onBack={() => setExamState('start')} 
          />
        )}

        {examState !== 'start' && examState !== 'listen' && examState !== 'read' && examState !== 'write' && examState !== 'speak' && (
          <div className="w-full bg-white rounded-3xl p-8 md:p-12 border-2 border-gray-100 shadow-sm min-h-[400px] flex flex-col items-center justify-center animate-fade-in relative">
            
            <button 
              onClick={() => setExamState('start')}
              className="absolute top-6 left-6 text-gray-400 hover:text-gray-700 font-medium flex items-center gap-2 transition-colors bg-gray-50 hover:bg-gray-100 py-2 px-4 rounded-full"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              Zurück
            </button>
            
            <h2 className="text-4xl font-extrabold text-gray-800 mb-2">
              {modules.find(m => m.id === examState)?.titleDe}
            </h2>
            <p className="text-gray-500 mb-8 text-center max-w-md text-lg">
              {modules.find(m => m.id === examState)?.titleEn}
            </p>

            <div className="w-full max-w-2xl bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 p-12 flex flex-col items-center justify-center text-gray-400">
              <svg className="w-12 h-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
              <p className="font-medium text-center">Placeholder for Exam Content</p>
              <p className="text-sm mt-2 text-center">Waiting for test data...</p>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
