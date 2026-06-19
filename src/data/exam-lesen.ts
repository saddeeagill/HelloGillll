export type ExamOption = {
  id: string;
  text: string;
};

export type ExamQuestion = {
  id: string;
  readingText?: string;
  question: string;
  options: ExamOption[];
  correctAnswer: string;
};

export type ExamPart = {
  part: number;
  instruction: string;
  readingText?: string;
  questions: ExamQuestion[];
};

export const LESEN_EXAM: ExamPart[] = [
  {
    part: 1,
    instruction: "Lesen Sie die Texte und die Aufgaben. Welche Lösung ist richtig? Kreuzen Sie an: a, b oder c.",
    questions: [
      {
        id: "l_p1q1",
        readingText: "E-Mail\nHallo Maria, wie geht es dir? Ich bin jetzt in Berlin. Die Stadt ist wunderschön! Morgen besuche ich das Museum. Am Abend gehe ich ins Kino. Hast du dieses Wochenende Zeit? Wir könnten zusammen essen gehen. Liebe Grüße, Anna",
        question: "Was macht Anna morgen?",
        options: [
          { id: "a", text: "Sie geht ins Kino." },
          { id: "b", text: "Sie besucht das Museum." },
          { id: "c", text: "Sie geht essen." }
        ],
        correctAnswer: "b"
      },
      {
        id: "l_p1q2",
        readingText: "Aushang\nDeutschkurs für Anfänger, montags und mittwochs, 18:00 - 19:30 Uhr. Ort: Volkshochschule, Raum 12. Preis: 120 Euro (8 Wochen). Anmeldung: Tel. 030-123456",
        question: "Wie oft findet der Kurs statt?",
        options: [
          { id: "a", text: "einmal pro Woche" },
          { id: "b", text: "zweimal pro Woche" },
          { id: "c", text: "dreimal pro Woche" }
        ],
        correctAnswer: "b"
      },
      {
        id: "l_p1q3",
        readingText: "SMS\nHallo Tom! Ich bin in 10 Minuten da. Der Bus hatte Verspätung. Könntest du schon einen Tisch für mich reservieren? Danke! Bis gleich, Lisa",
        question: "Was soll Tom machen?",
        options: [
          { id: "a", text: "einen Tisch reservieren" },
          { id: "b", text: "den Bus nehmen" },
          { id: "c", text: "nach Hause gehen" }
        ],
        correctAnswer: "a"
      }
    ]
  },
  {
    part: 2,
    instruction: "Lesen Sie die Anzeigen. Welche Anzeige passt? Kreuzen Sie an: a oder b.",
    questions: [
      {
        id: "l_p2q1",
        question: "Sie suchen eine Wohnung. Sie möchten nicht weit vom Stadtzentrum wohnen.",
        options: [
          { id: "a", text: "Wohnung zu vermieten, 2 Zimmer, Küche, Bad, Berlin-Mitte, 500 € + Nebenkosten. Tel: 030-555123" },
          { id: "b", text: "Schöne 3-Zimmer-Wohnung mit Garten, außerhalb der Stadt in einer ruhigen Gegend. 600 € warm. Tel: 030-555789" }
        ],
        correctAnswer: "a"
      },
      {
        id: "l_p2q2",
        question: "Sie möchten Sport treiben. Sie haben nur am Abend Zeit.",
        options: [
          { id: "a", text: "Fitnessstudio „Sportplus“ Geöffnet: Mo-Fr 6:00-22:00 Uhr Sa-So 8:00-20:00 Uhr Monatsbeitrag: 35 Euro" },
          { id: "b", text: "Aqua Schwimmbad Öffnungszeiten: täglich 9:00-18:00 Uhr Erwachsene: 5 Euro Kinder: 3 Euro" }
        ],
        correctAnswer: "a"
      },
      {
        id: "l_p2q3",
        question: "Sie suchen einen Job. Sie sprechen Deutsch und Englisch.",
        options: [
          { id: "a", text: "Restaurant sucht Kellner/in. Sprachen: Deutsch und Italienisch. Arbeitszeiten: Do-So, ab 17:00 Uhr. Kontakt: info@restaurant-roma.de" },
          { id: "b", text: "Hotel braucht Rezeptionist/in. Sprachen: Deutsch und Englisch. Teilzeit oder Vollzeit möglich. Bewerbung an: jobs@hotel-berlin.de" }
        ],
        correctAnswer: "b"
      }
    ]
  },
  {
    part: 3,
    instruction: "Lesen Sie die Informationen. Richtig oder Falsch? Kreuzen Sie an.",
    readingText: "Stadtbibliothek Berlin\nÖffnungszeiten: Montag - Freitag: 10:00 - 19:00 Uhr\nSamstag: 10:00 - 14:00 Uhr\nSonntag: Geschlossen\nSie können Bücher für 3 Wochen ausleihen. Die Anmeldung ist kostenlos. Sie brauchen einen Lichtbildausweis.\nWir haben auch:\n• Computer mit Internetanschluss (1 Stunde gratis pro Tag)\n• Zeitungen und Zeitschriften\n• Filme und Musik-CDs\nFür Kinder gibt es jeden Samstag um 11:00 Uhr eine Vorlesestunde. Kommt vorbei!\nAdresse: Hauptstraße 45, 10115 Berlin\nTelefon: +49 30 246810\nE-Mail: info@stadtbibliothek-berlin.de",
    questions: [
      {
        id: "l_p3q1",
        question: "Die Bibliothek ist sonntags geöffnet.",
        options: [
          { id: "richtig", text: "Richtig" },
          { id: "falsch", text: "Falsch" }
        ],
        correctAnswer: "falsch"
      },
      {
        id: "l_p3q2",
        question: "Man kann Bücher für drei Wochen ausleihen.",
        options: [
          { id: "richtig", text: "Richtig" },
          { id: "falsch", text: "Falsch" }
        ],
        correctAnswer: "richtig"
      },
      {
        id: "l_p3q3",
        question: "Die Anmeldung kostet Geld.",
        options: [
          { id: "richtig", text: "Richtig" },
          { id: "falsch", text: "Falsch" }
        ],
        correctAnswer: "falsch"
      },
      {
        id: "l_p3q4",
        question: "Man kann das Internet 2 Stunden pro Tag gratis nutzen.",
        options: [
          { id: "richtig", text: "Richtig" },
          { id: "falsch", text: "Falsch" }
        ],
        correctAnswer: "falsch"
      },
      {
        id: "l_p3q5",
        question: "Am Samstag gibt es ein Programm für Kinder.",
        options: [
          { id: "richtig", text: "Richtig" },
          { id: "falsch", text: "Falsch" }
        ],
        correctAnswer: "richtig"
      }
    ]
  }
];
