"use client";
import React from "react";

export default function TheorieTab({ lesson }: { lesson: any }) {
  if (!lesson) return null;
  
  // z.B. lesson.id = "lektion_1" => "/lektion_1-theorie.jpg"
  const imageSrc = `/${lesson.id}-theorie.jpg`;

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
      <h2 className="text-2xl font-bold text-gray-700 mb-6">Theorie: {lesson.title}</h2>
      
      {/* Container for the Theory Image */}
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm border-2 border-gray-100 overflow-hidden relative min-h-[300px] flex items-center justify-center">
        <img 
          src={imageSrc} 
          alt={`${lesson.title} Theorie`} 
          className="w-full h-auto object-contain"
          onError={(e) => {
            // Optional: fallback if image is missing
            (e.target as HTMLImageElement).style.display = 'none';
            (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
          }}
        />
        <div className="hidden absolute inset-0 flex flex-col items-center justify-center bg-gray-50 text-gray-400 p-8">
          <svg className="w-12 h-12 mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          <span className="font-semibold text-sm">Bild nicht gefunden</span>
          <span className="text-xs mt-1">Bitte speichere das Bild als <strong>{imageSrc.replace('/', '')}</strong> im public-Ordner.</span>
        </div>
      </div>
      
    </div>
  );
}
