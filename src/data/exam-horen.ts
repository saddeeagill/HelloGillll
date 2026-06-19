export type ExamOption = {
  id: string;
  text: string;
};

export type ExamQuestion = {
  id: string;
  audioText?: string;
  question: string;
  options: ExamOption[];
  correctAnswer: string;
};

export type ExamPart = {
  part: number;
  instruction: string;
  audioText?: string;
  questions: ExamQuestion[];
};

export const HOREN_EXAM: ExamPart[] = [
  {
    part: 1,
    instruction: "Sie hören drei Ansagen. Zu jeder Ansage gibt es eine Aufgabe. Kreuzen Sie an: a, b oder c.",
    questions: [
      {
        id: "p1q1",
        audioText: "Hallo. Hier ist der automatische Anrufbeantworter der Arztpraxis Dr. Müller. Unsere Sprechzeiten sind Montag bis Freitag von 8 bis 12 Uhr und von 14 bis 18 Uhr. Mittwochs haben wir geschlossen. Bitte rufen Sie während der Sprechzeiten an, um einen Termin zu vereinbaren.",
        question: "Wann ist die Praxis am Mittwoch geöffnet?",
        options: [
          { id: "a", text: "von 8 bis 12 Uhr" },
          { id: "b", text: "Die Praxis ist geschlossen." },
          { id: "c", text: "von 14 bis 18 Uhr" }
        ],
        correctAnswer: "b"
      },
      {
        id: "p1q2",
        audioText: "Achtung, eine wichtige Durchsage: Der Zug nach München auf Gleis 7 hat heute 15 Minuten Verspätung. Wir bitten um Entschuldigung. Bitte warten Sie auf Gleis 7.",
        question: "Was ist das Problem?",
        options: [
          { id: "a", text: "Der Zug fährt nicht." },
          { id: "b", text: "Der Zug hat Verspätung." },
          { id: "c", text: "Der Zug steht auf Gleis 8." }
        ],
        correctAnswer: "b"
      },
      {
        id: "p1q3",
        audioText: "Willkommen im Supermarkt Schneider. Heute haben wir ein Sonderangebot: Äpfel aus Deutschland, 1 Kilo für nur 1 Euro 99. Sie finden die Äpfel in der Obstabteilung. Vielen Dank und viel Spaß beim Einkaufen.",
        question: "Wie viel kostet ein Kilo Äpfel?",
        options: [
          { id: "a", text: "1 Euro" },
          { id: "b", text: "1 Euro 99" },
          { id: "c", text: "2 Euro 99" }
        ],
        correctAnswer: "b"
      }
    ]
  },
  {
    part: 2,
    instruction: "Sie hören ein Gespräch. Zu diesem Gespräch gibt es drei Aufgaben. Kreuzen Sie an: Richtig oder Falsch.",
    audioText: "Mann: Guten Tag, kann ich Ihnen helfen? Frau: Ja, ich suche ein T-Shirt für meinen Sohn. Mann: Wie alt ist Ihr Sohn? Frau: Er ist 10 Jahre alt. Mann: Welche Farbe möchten Sie? Frau: Blau oder Grün, das mag er. Mann: Die T-Shirts sind hier. Sie kosten 12 Euro 50. Frau: Das ist okay. Ich nehme das blaue T-Shirt. Kann ich mit Karte bezahlen? Mann: Ja, natürlich, kein Problem.",
    questions: [
      {
        id: "p2q1",
        question: "Die Frau kauft ein T-Shirt für ihren Sohn.",
        options: [
          { id: "richtig", text: "Richtig" },
          { id: "falsch", text: "Falsch" }
        ],
        correctAnswer: "richtig"
      },
      {
        id: "p2q2",
        question: "Das T-Shirt kostet 15 Euro.",
        options: [
          { id: "richtig", text: "Richtig" },
          { id: "falsch", text: "Falsch" }
        ],
        correctAnswer: "falsch"
      },
      {
        id: "p2q3",
        question: "Die Frau kann mit Karte bezahlen.",
        options: [
          { id: "richtig", text: "Richtig" },
          { id: "falsch", text: "Falsch" }
        ],
        correctAnswer: "richtig"
      }
    ]
  },
  {
    part: 3,
    instruction: "Sie hören drei Gespräche. Zu jedem Gespräch gibt es eine Aufgabe. Kreuzen Sie an: a, b oder c.",
    questions: [
      {
        id: "p3q1",
        audioText: "Frau: Schmidt. Mann: Hallo Frau Schmidt, hier ist Tom. Ich bin krank und kann heute nicht zur Arbeit kommen. Frau: Oh, das tut mir leid. Gute Besserung! Mann: Danke schön.",
        question: "Was macht Tom?",
        options: [
          { id: "a", text: "Er geht zur Arbeit." },
          { id: "b", text: "Er ist krank." },
          { id: "c", text: "Er macht Urlaub." }
        ],
        correctAnswer: "b"
      },
      {
        id: "p3q2",
        audioText: "Mann: Guten Tag, ich möchte einen Tisch reservieren. Frau: Für wann? Mann: Für Samstag um 19 Uhr. Frau: Für wie viele Personen? Mann: Für vier Personen, bitte. Frau: Okay, das geht in Ordnung. Ihr Name, bitte? Mann: Müller.",
        question: "Wann möchte der Mann kommen?",
        options: [
          { id: "a", text: "Freitag um 19 Uhr" },
          { id: "b", text: "Samstag um 18 Uhr" },
          { id: "c", text: "Samstag um 19 Uhr" }
        ],
        correctAnswer: "c"
      },
      {
        id: "p3q3",
        audioText: "Frau: Entschuldigung, wo ist die Post? Mann: Die Post? Gehen Sie hier geradeaus und dann die zweite Straße links. Die Post ist neben der Apotheke. Frau: Vielen Dank! Mann: Bitte, gern geschehen.",
        question: "Wo ist die Post?",
        options: [
          { id: "a", text: "neben der Apotheke" },
          { id: "b", text: "gegenüber der Apotheke" },
          { id: "c", text: "hinter der Apotheke" }
        ],
        correctAnswer: "a"
      }
    ]
  }
];
