"use client";
import React, { useState } from "react";
import { Lesson } from "@/data/lessons";
import ZahlenQuiz from "./ZahlenQuiz";

interface Question {
  id: number;
  text: string;
  isTrue: boolean;
}

const QUIZ_QUESTIONS: Question[] = [
  { id: 1, text: "Maria kommt aus Portugal.", isTrue: true },
  { id: 2, text: "Die Person ist neu in der Schweiz.", isTrue: true },
  { id: 3, text: "Die Person schreibt eine kleine Liste.", isTrue: false },
  { id: 4, text: "Maria und Lisa trinken Tee zusammen.", isTrue: false },
  { id: 5, text: "Marias Hund heisst Müller.", isTrue: false },
  { id: 6, text: "Lisa hat eine Tochter.", isTrue: false },
  { id: 7, text: "Marias Eltern wohnen in Bern.", isTrue: false },
  { id: 8, text: "Pedro ist der Vater von Maria.", isTrue: false },
  { id: 9, text: "Maria wohnt in Zürich.", isTrue: false },
  { id: 10, text: "Maria ist eine Hausfrau.", isTrue: false },
];

const QUIZ_QUESTIONS_L3: Question[] = [
  { id: 11, text: "Tim wacht am Morgen auf.", isTrue: true },
  { id: 12, text: "Es ist Sommer in der Geschichte.", isTrue: false },
  { id: 13, text: "Die Sonne scheint.", isTrue: true },
  { id: 14, text: "Der Baum hat viele Blätter.", isTrue: false },
  { id: 15, text: "Neben dem Baum wächst eine Blume.", isTrue: true },
  { id: 16, text: "Das Wasser im See ist warm.", isTrue: false },
  { id: 17, text: "Tim setzt sich am See hin.", isTrue: true },
  { id: 18, text: "Am Mittwoch macht Tim Sport.", isTrue: false },
  { id: 19, text: "Am Donnerstag kocht Tim Suppe.", isTrue: true },
  { id: 20, text: "Tim ist zufrieden.", isTrue: true },
];

const QUIZ_QUESTIONS_L4: Question[] = [
  { id: 21, text: "Anna spricht eine neue Sprache.", isTrue: true },
  { id: 22, text: "In der Klasse sind nur wenige Schüler.", isTrue: false },
  { id: 23, text: "Die Lehrerin gibt eine Aufgabe.", isTrue: true },
  { id: 24, text: "Das Thema ist Essen.", isTrue: false },
  { id: 25, text: "Anna macht keinen Fehler.", isTrue: false },
  { id: 26, text: "Sie singen ein Lied in der Pause.", isTrue: true },
  { id: 27, text: "Anna hat Fieber und geht zum Arzt.", isTrue: true },
  { id: 28, text: "Anna ist nach einer Woche gesund.", isTrue: false },
  { id: 29, text: "Das Ergebnis der Prüfung ist schlecht.", isTrue: false },
  { id: 30, text: "Annas Mutter sagt, sie ist fleissig.", isTrue: true },
];

const QUIZ_QUESTIONS_L5: Question[] = [
  { id: 31, text: "Maria geht in ein Café.", isTrue: false },
  { id: 32, text: "Maria sieht viele Taschen im Geschäft.", isTrue: true },
  { id: 33, text: "Die rote Tasche ist alt.", isTrue: false },
  { id: 34, text: "Maria kauft die blaue Tasche.", isTrue: false },
  { id: 35, text: "Maria sieht auch einen Schuh im Geschäft.", isTrue: true },
  { id: 36, text: "Ein Schuh ist gross, der andere ist klein.", isTrue: true },
  { id: 37, text: "Maria nimmt nur einen Schuh.", isTrue: false },
  { id: 38, text: "Die Verkäuferin ist unfreundlich.", isTrue: false },
  { id: 39, text: "Maria zeigt die Tasche ihrer Freundin Anna.", isTrue: true },
  { id: 40, text: "Die Tasche passt nicht zum Kleid.", isTrue: false },
];

const QUIZ_QUESTIONS_L6: Question[] = [
  { id: 41, text: "Der Mann findet einen Ring im Park.", isTrue: false },
  { id: 42, text: "Der Ring ist aus Silber.", isTrue: false },
  { id: 43, text: "Ein Kind weiss, wem der Ring gehört.", isTrue: false },
  { id: 44, text: "Der Mann fragt eine Frau in der Bäckerei.", isTrue: true },
  { id: 45, text: "Die Frau in der Bäckerei hat den Ring verloren.", isTrue: false },
  { id: 46, text: "Der Mann nimmt den Ring mit nach Hause.", isTrue: true },
  { id: 47, text: "Auf dem Ring steht eine Telefonnummer.", isTrue: false },
  { id: 48, text: "Der Mann schreibt einen Brief.", isTrue: true },
  { id: 49, text: "Am nächsten Tag ruft niemand an.", isTrue: false },
  { id: 50, text: "Die Person am Telefon sagt „Danke!“.", isTrue: true },
];

const QUIZ_QUESTIONS_L7: Question[] = [
  { id: 51, text: "Die Person isst heute Pizza.", isTrue: false },
  { id: 52, text: "Ihre Freundin Anna hilft ihr.", isTrue: false },
  { id: 53, text: "Sie gehen in ein Restaurant.", isTrue: true },
  { id: 54, text: "Das Käsefondue ist kalt.", isTrue: false },
  { id: 55, text: "Sie trinken Wasser.", isTrue: false },
  { id: 56, text: "Lisa mag Butter.", isTrue: true },
  { id: 57, text: "Das Restaurant hat ein Feuer.", isTrue: true },
  { id: 58, text: "Die Nachbarn haben Fleisch.", isTrue: false },
  { id: 59, text: "Das Restaurant ist in Bern.", isTrue: false },
  { id: 60, text: "Die Person findet Deutsch schwer.", isTrue: false },
];

const QUIZ_QUESTIONS_L8: Question[] = [
  { id: 61, text: "Das Zimmer ist gross und dunkel.", isTrue: false },
  { id: 62, text: "Das Bett ist sehr bequem.", isTrue: true },
  { id: 63, text: "Neben dem Bett steht ein Stuhl.", isTrue: false },
  { id: 64, text: "Der Schlüssel liegt auf dem Tisch.", isTrue: false },
  { id: 65, text: "Über der Toilette hängt ein Bild mit einem Hund.", isTrue: false },
  { id: 66, text: "Der Schrank ist leer.", isTrue: true },
  { id: 67, text: "Die Person sieht einen Vogel vom Balkon.", isTrue: true },
  { id: 68, text: "Das Haus gegenüber ist grün.", isTrue: false },
  { id: 69, text: "Papa bringt Spaghetti mit.", isTrue: false },
  { id: 70, text: "Die Person ist sehr glücklich in der Wohnung.", isTrue: true },
];

const QUIZ_QUESTIONS_L9: Question[] = [
  { id: 71, text: "Die Person findet Käse im Kühlschrank.", isTrue: false },
  { id: 72, text: "Sie macht ein Brot mit Tomate.", isTrue: true },
  { id: 73, text: "Die Tasse ist blau.", isTrue: false },
  { id: 74, text: "Das Messer liegt auf dem Tisch.", isTrue: false },
  { id: 75, text: "Die Musik ist sehr leise.", isTrue: false },
  { id: 76, text: "Der Aufzug ist leise.", isTrue: false },
  { id: 77, text: "Die Person isst das Brot im Garten.", isTrue: true },
  { id: 78, text: "Das Bild zeigt einen Hund.", isTrue: false },
  { id: 79, text: "Der Schlüssel liegt auf dem Boden.", isTrue: true },
  { id: 80, text: "Die Tür ist kaputt.", isTrue: true },
];

const QUIZ_QUESTIONS_L10: Question[] = [
  { id: 81, text: "Fatma lernt eine alte Sprache.", isTrue: false },
  { id: 82, text: "Das Thema der Aufgabe ist Familie.", isTrue: true },
  { id: 83, text: "Fatma macht keinen Fehler.", isTrue: false },
  { id: 84, text: "Nach dem Kurs gehen alle nach Hause.", isTrue: false },
  { id: 85, text: "Fatma ist vor der Prüfung nervös.", isTrue: true },
  { id: 86, text: "Das Ergebnis der Prüfung ist schlecht.", isTrue: false },
  { id: 87, text: "Der Schüler neben Fatma hat auch ein gutes Ergebnis.", isTrue: true },
  { id: 88, text: "In der Pause trinkt Fatma Kaffee.", isTrue: false },
  { id: 89, text: "Nach der Pause liest sie ein neues Buch.", isTrue: false },
  { id: 90, text: "Am Ende ist Fatma sehr zufrieden.", isTrue: true },
];

const QUIZ_QUESTIONS_L11: Question[] = [
  { id: 91, text: "Ahmed geht ins Kino.", isTrue: true },
  { id: 92, text: "Der Film dauert drei Stunden.", isTrue: false },
  { id: 93, text: "Vor dem Kino hängt ein kleines Schild.", isTrue: false },
  { id: 94, text: "Ahmed will eine grosse Reise machen.", isTrue: false },
  { id: 95, text: "Die Frau gibt ihm einen Prospekt.", isTrue: true },
  { id: 96, text: "Am Sonntag geht Ahmed ins Schwimmbad.", isTrue: false },
  { id: 97, text: "Nach dem Spiel isst er einen Hamburger.", isTrue: false },
  { id: 98, text: "Ahmed geht mit Freunden in eine Disco.", isTrue: true },
  { id: 99, text: "In der Disco tanzen nur wenige Leute.", isTrue: false },
  { id: 100, text: "Am Ende ist Ahmed sehr zufrieden.", isTrue: true },
];

const QUIZ_QUESTIONS_L12: Question[] = [
  { id: 101, text: "Die Feier ist am Sonntag.", isTrue: false },
  { id: 102, text: "Lisa hat ein Ticket für die Party.", isTrue: true },
  { id: 103, text: "Lisa sitzt alleine auf der Party.", isTrue: false },
  { id: 104, text: "Ein Mädchen spricht über Fussball.", isTrue: false },
  { id: 105, text: "Auf der Party gibt es Pizza.", isTrue: false },
  { id: 106, text: "Am nächsten Tag sieht Lisa ein Poster für einen Film.", isTrue: true },
  { id: 107, text: "Für den Film braucht man keine Anmeldung.", isTrue: false },
  { id: 108, text: "Lisa ruft an und macht die Anmeldung.", isTrue: true },
  { id: 109, text: "Vor dem Film läuft ein Fussballspiel.", isTrue: false },
  { id: 110, text: "Lisa hat an beiden Tagen viel Spass.", isTrue: true },
];

const QUIZ_QUESTIONS_L13: Question[] = [
  { id: 111, text: "Maria arbeitet als Chef in der Praxis.", isTrue: false },
  { id: 112, text: "Ein Kollege erklärt Maria viel.", isTrue: true },
  { id: 113, text: "Maria schickt eine E-Mail und ein Fax.", isTrue: true },
  { id: 114, text: "Der Kunde braucht keinen Termin.", isTrue: false },
  { id: 115, text: "Die Maschine arbeitet sehr schnell.", isTrue: false },
  { id: 116, text: "Maria ist nach einer Stunde fertig an der Maschine.", isTrue: true },
  { id: 117, text: "In der Pause trinkt Maria Kaffee.", isTrue: false },
  { id: 118, text: "Der Kunde in der E-Mail will einen zweiten Termin.", isTrue: true },
  { id: 119, text: "Maria ist am Abend sehr nervös.", isTrue: false },
  { id: 120, text: "Maria findet ihre Kollegen gut und den Chef nett.", isTrue: true },
];

const QUIZ_QUESTIONS_L14: Question[] = [
  { id: 121, text: "Sofia fährt mit dem Zug zum Flughafen.", isTrue: false },
  { id: 122, text: "Der Abflug nach Rom ist in dreissig Minuten.", isTrue: true },
  { id: 123, text: "Sofia fliegt nach Spanien.", isTrue: false },
  { id: 124, text: "Sofia nimmt am Flughafen einen Bus zum Terminal.", isTrue: true },
  { id: 125, text: "Die Reise mit dem Flugzeug dauert drei Stunden.", isTrue: false },
  { id: 126, text: "Sofia hat ein Doppelzimmer im Hotel.", isTrue: false },
  { id: 127, text: "In der Stadt hört sie Musik.", isTrue: true },
  { id: 128, text: "Eine Gruppe spielt Klavier auf der Strasse.", isTrue: false },
  { id: 129, text: "Sofia macht Fotos in der Stadt.", isTrue: true },
  { id: 130, text: "Am Ende des Tages ist Sofia sehr traurig.", isTrue: false },
];

const QUIZ_QUESTIONS_L15: Question[] = [
  { id: 131, text: "Peter sucht eine neue Wohnung.", isTrue: false },
  { id: 132, text: "Peter findet eine Anzeige in der Zeitung.", isTrue: true },
  { id: 133, text: "Er schreibt die Antwort auf den Computer.", isTrue: false },
  { id: 134, text: "Der Chef gibt ihm einen Termin für Montag.", isTrue: true },
  { id: 135, text: "Am Montag kommt Peter zu spät.", isTrue: false },
  { id: 136, text: "Peter bekommt die Arbeit im Verein.", isTrue: true },
  { id: 137, text: "Am zweiten Tag geht die Maschine kaputt.", isTrue: true },
  { id: 138, text: "Der Chef repariert die Maschine alleine.", isTrue: false },
  { id: 139, text: "In der Pause liest Peter ein Buch.", isTrue: false },
  { id: 140, text: "Am Abend ist Peter froh über seine Arbeit und die Kollegen.", isTrue: true },
];

const QUIZ_QUESTIONS_L16: Question[] = [
  { id: 141, text: "Anna arbeitet in einem Supermarkt.", isTrue: false },
  { id: 142, text: "Der Chef von Anna ist streng.", isTrue: true },
  { id: 143, text: "Der Kunde am Telefon will ein Auto kaufen.", isTrue: false },
  { id: 144, text: "Anna repariert den Drucker alleine.", isTrue: false },
  { id: 145, text: "Die Maschine braucht neues Papier.", isTrue: true },
  { id: 146, text: "In der Zeitung findet Anna eine Anzeige für einen Job.", isTrue: true },
  { id: 147, text: "Anna will einen neuen Job suchen.", isTrue: false },
  { id: 148, text: "Anna schreibt eine E-Mail an ihre Freundin.", isTrue: false },
  { id: 149, text: "In Annas Tasche sind ein Kugelschreiber und Papier.", isTrue: true },
  { id: 150, text: "Am Abend isst Anna Pizza.", isTrue: false },
];

export default function QuizTab({ lesson }: { lesson?: Lesson }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [showResults, setShowResults] = useState(false);

  if (lesson?.id === 'lektion_2') {
    return <ZahlenQuiz />;
  }

  const isLektion3 = lesson?.id === 'lektion_3';
  const isLektion4 = lesson?.id === 'lektion_4';
  const isLektion5 = lesson?.id === 'lektion_5';
  const isLektion6 = lesson?.id === 'lektion_6';
  const isLektion7 = lesson?.id === 'lektion_7';
  const isLektion8 = lesson?.id === 'lektion_8';
  const isLektion9 = lesson?.id === 'lektion_9';
  const isLektion10 = lesson?.id === 'lektion_10';
  const isLektion11 = lesson?.id === 'lektion_11';
  const isLektion12 = lesson?.id === 'lektion_12';
  const isLektion13 = lesson?.id === 'lektion_13';
  const isLektion14 = lesson?.id === 'lektion_14';
  const isLektion15 = lesson?.id === 'lektion_15';
  const isLektion16 = lesson?.id === 'lektion_16';
  
  const currentQuizQuestions = isLektion16 ? QUIZ_QUESTIONS_L16 
    : isLektion15 ? QUIZ_QUESTIONS_L15
    : isLektion14 ? QUIZ_QUESTIONS_L14
    : isLektion13 ? QUIZ_QUESTIONS_L13
    : isLektion12 ? QUIZ_QUESTIONS_L12
    : isLektion11 ? QUIZ_QUESTIONS_L11
    : isLektion10 ? QUIZ_QUESTIONS_L10
    : isLektion9 ? QUIZ_QUESTIONS_L9
    : isLektion8 ? QUIZ_QUESTIONS_L8
    : isLektion7 ? QUIZ_QUESTIONS_L7
    : isLektion6 ? QUIZ_QUESTIONS_L6
    : isLektion5 ? QUIZ_QUESTIONS_L5
    : isLektion4 ? QUIZ_QUESTIONS_L4
    : isLektion3 ? QUIZ_QUESTIONS_L3
    : QUIZ_QUESTIONS;

  const currentQuestion = currentQuizQuestions[currentQuestionIndex];
  
  const handleAnswer = (answer: boolean) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < currentQuizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const resetQuiz = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setShowResults(false);
  };

  if (showResults) {
    const score = currentQuizQuestions.reduce((total, q) => {
      return total + (answers[q.id] === q.isTrue ? 1 : 0);
    }, 0);

    return (
      <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-xl border border-gray-100 min-h-[400px]">
        <div className="w-20 h-20 bg-[#ffe400] rounded-full flex items-center justify-center mb-6 shadow-sm">
          <span className="text-3xl">🎉</span>
        </div>
        <h2 className="text-3xl font-bold text-black mb-2">Quiz Beendet!</h2>
        <p className="text-xl text-gray-700 mb-8">
          Ihr Ergebnis: <span className="font-bold text-[#0f7650]">{score}</span> von <span className="font-bold">{currentQuizQuestions.length}</span>
        </p>
        
        <div className="w-full max-w-2xl space-y-3 mb-8">
          {currentQuizQuestions.map(q => {
            const isCorrect = answers[q.id] === q.isTrue;
            return (
              <div key={q.id} className={`p-4 rounded-lg flex items-center justify-between border ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                <span className="text-black text-sm md:text-base font-medium">{q.text}</span>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold px-2 py-1 rounded ${isCorrect ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'}`}>
                    Ihre Antwort: {answers[q.id] ? 'Richtig' : 'Falsch'}
                  </span>
                  {!isCorrect && (
                    <span className="text-xs font-bold px-2 py-1 rounded text-gray-700 bg-gray-200">
                      Korrekt: {q.isTrue ? 'Richtig' : 'Falsch'}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={resetQuiz}
          className="px-8 py-3 bg-[#0f7650] text-white font-bold rounded-xl hover:bg-[#0a5237] transition-all shadow-sm"
        >
          Nochmal spielen
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full min-h-[400px] max-w-3xl mx-auto pt-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-black mb-2">Lektion-Quiz</h2>
        <p className="text-gray-500 font-medium">Quiz aus Geschichten</p>
      </div>

      <div className="flex items-center justify-between mb-4">
        <span className="bg-gray-100 text-gray-700 font-bold px-4 py-1.5 rounded-lg text-sm">
          Frage {currentQuestionIndex + 1} von {currentQuizQuestions.length}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2.5 bg-gray-100 rounded-full mb-10 overflow-hidden">
        <div 
          className="h-full bg-[#0f7650] transition-all duration-300"
          style={{ width: `${((currentQuestionIndex) / currentQuizQuestions.length) * 100}%` }}
        ></div>
      </div>

      {/* Question Card */}
      <div className="bg-gray-50 border border-gray-200 p-8 md:p-12 rounded-2xl flex flex-col items-center justify-center mb-10 shadow-sm flex-grow">
        <h3 className="text-xl md:text-2xl font-bold text-center text-black leading-snug">
          {currentQuestion.text}
        </h3>
      </div>

      {/* True/False Buttons */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <button
          onClick={() => handleAnswer(true)}
          className={`py-4 md:py-6 rounded-xl font-bold text-lg transition-all border-2 ${
            answers[currentQuestion.id] === true
              ? "bg-[#0f7650] text-white border-[#0f7650] shadow-md scale-[1.02]"
              : "bg-white text-[#0f7650] border-[#0f7650] hover:bg-green-50"
          }`}
        >
          Richtig
        </button>
        <button
          onClick={() => handleAnswer(false)}
          className={`py-4 md:py-6 rounded-xl font-bold text-lg transition-all border-2 ${
            answers[currentQuestion.id] === false
              ? "bg-red-600 text-white border-red-600 shadow-md scale-[1.02]"
              : "bg-white text-red-600 border-red-600 hover:bg-red-50"
          }`}
        >
          Falsch
        </button>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-6 border-t border-gray-100 mt-auto">
        <button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all border ${
            currentQuestionIndex === 0 
              ? 'opacity-0 pointer-events-none' 
              : 'bg-white text-black border-gray-200 hover:bg-gray-50 shadow-sm'
          }`}
        >
          Zurück
        </button>
        
        <button
          onClick={handleNext}
          disabled={answers[currentQuestion.id] === undefined}
          className={`px-8 py-2.5 rounded-lg text-sm font-bold transition-all shadow-sm ${
            answers[currentQuestion.id] === undefined 
              ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed' 
              : 'bg-black text-white hover:bg-gray-800'
          }`}
        >
          {currentQuestionIndex === currentQuizQuestions.length - 1 ? 'Ergebnis sehen' : 'Weiter'}
        </button>
      </div>
    </div>
  );
}
