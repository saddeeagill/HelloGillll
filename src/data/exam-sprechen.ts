export type SprechenTopic = {
  title: string;
  icon?: string;
  questions?: string[];
  examples?: string[];
};

export type SprechenPart = {
  part: number;
  instruction: string;
  duration: string;
  note: string;
  topics?: SprechenTopic[];
  example?: string | string[];
  tips: string[];
};

export const SPRECHEN_EXAM: SprechenPart[] = [
  {
    part: 1,
    instruction: "Sich vorstellen. Sprechen Sie über sich.",
    duration: "ca. 2-3 Minuten",
    note: "Hinweis: Sie machen diese Prüfung normalerweise mit einer anderen Person (Paarprüfung). Hier können Sie die Aufgaben sehen und sich vorbereiten.",
    topics: [
      { title: "Name" },
      { title: "Herkunft (Land, Stadt)" },
      { title: "Beruf / Ausbildung" },
      { title: "Sprachen" },
      { title: "Hobbys und Interessen" },
      { title: "Familie" }
    ],
    example: "Hallo. Mein Name ist Maria Schmidt. Ich komme aus Barcelona, Spanien. Jetzt lebe ich in Berlin. Ich bin 28 Jahre alt und ich bin Krankenschwester. Ich arbeite in einem Krankenhaus. Ich spreche Spanisch und Deutsch. Ich spreche auch ein bisschen Englisch. In meiner Freizeit lese ich gerne und gehe spazieren. Am Wochenende treffe ich meine Freunde. Ich habe einen Bruder. Er lebt in Spanien.",
    tips: [
      "Sprechen Sie langsam und deutlich.",
      "Sagen Sie einfache Sätze.",
      "Wenn Sie ein Wort nicht wissen, sagen Sie es anders.",
      "Haben Sie keine Angst vor Fehlern!"
    ]
  },
  {
    part: 2,
    instruction: "Sie ziehen Karten mit Themen. Stellen Sie Fragen zu den Themen und antworten Sie auf die Fragen Ihres Partners.",
    duration: "ca. 5-6 Minuten",
    note: "Hinweis: Sie machen diese Prüfung normalerweise mit einer anderen Person (Paarprüfung). Hier können Sie die Aufgaben sehen und sich vorbereiten.",
    topics: [
      {
        title: "Einkaufen",
        questions: [
          "Wo kaufen Sie ein?",
          "Was kaufen Sie oft?",
          "Wie oft gehen Sie einkaufen?",
          "Kaufen Sie gerne im Supermarkt ein?"
        ]
      },
      {
        title: "Freizeit",
        questions: [
          "Was machen Sie gerne in Ihrer Freizeit?",
          "Machen Sie Sport?",
          "Wohin gehen Sie am Wochenende?",
          "Sehen Sie gerne fern?"
        ]
      },
      {
        title: "Familie",
        questions: [
          "Haben Sie Geschwister?",
          "Wo lebt Ihre Familie?",
          "Wie oft sehen Sie Ihre Familie?",
          "Was machen Sie zusammen mit Ihrer Familie?"
        ]
      },
      {
        title: "Wohnen",
        questions: [
          "Wo wohnen Sie?",
          "Wie groß ist Ihre Wohnung?",
          "Haben Sie einen Garten?",
          "Wohnen Sie gerne hier?"
        ]
      }
    ],
    example: [
      "Person A: Was essen Sie gerne?",
      "Person B: Ich esse gerne Pizza und Pasta. Und Sie?",
      "Person A: Ich esse gerne Salat und Fisch. Kochen Sie gerne?",
      "Person B: Ja, ich koche sehr gerne. Am Wochenende koche ich für meine Familie. Gehen Sie oft ins Restaurant?",
      "Person A: Nein, nicht oft. Vielleicht einmal im Monat. Welches Restaurant mögen Sie?",
      "Person B: Ich mag das italienische Restaurant in der Hauptstraße."
    ],
    tips: [
      "Fragen Sie einfache Fragen mit 'Wo', 'Was', 'Wann', 'Wie oft'.",
      "Antworten Sie in ganzen Sätzen.",
      "Fragen Sie, wenn Sie etwas nicht verstehen: 'Wie bitte?' oder 'Können Sie das bitte wiederholen?'"
    ]
  },
  {
    part: 3,
    instruction: "Sie ziehen Karten mit Situationen. Sie bitten um etwas oder reagieren auf eine Bitte.",
    duration: "ca. 3-4 Minuten",
    note: "Hinweis: Sie machen diese Prüfung normalerweise mit einer anderen Person (Paarprüfung). Hier können Sie die Aufgaben sehen und sich vorbereiten.",
    topics: [
      {
        title: "Situation 1: Im Geschäft",
        examples: [
          "Sie suchen ein T-Shirt. Fragen Sie nach der Größe und dem Preis.",
          "• Haben Sie das T-Shirt auch in Größe M?",
          "• Wie viel kostet das T-Shirt?",
          "• Kann ich das T-Shirt anprobieren?",
          "• Haben Sie noch andere Farben?"
        ]
      },
      {
        title: "Situation 2: Bei Freunden",
        examples: [
          "Sie möchten das Fenster öffnen. Fragen Sie Ihren Freund.",
          "• Kannst du bitte das Fenster öffnen?",
          "• Ist es okay, wenn ich das Fenster öffne?",
          "• Mir ist warm. Können wir das Fenster öffnen?"
        ]
      },
      {
        title: "Situation 3: Im Café",
        examples: [
          "Sie möchten bezahlen. Rufen Sie den Kellner/die Kellnerin.",
          "• Entschuldigung, ich möchte bitte bezahlen.",
          "• Die Rechnung, bitte.",
          "• Kann ich bitte zahlen?",
          "• Was macht das zusammen?"
        ]
      },
      {
        title: "Situation 4: In der Stadt",
        examples: [
          "Sie suchen die Post. Fragen Sie nach dem Weg.",
          "• Entschuldigung, wo ist die Post?",
          "• Können Sie mir helfen? Ich suche die Post.",
          "• Wie komme ich zur Post?",
          "• Ist die Post weit von hier?"
        ]
      }
    ],
    example: [
      "Mögliche Reaktionen:",
      "Positiv reagieren:",
      "✓ Ja, gerne.",
      "✓ Ja, natürlich.",
      "✓ Kein Problem.",
      "✓ Einen Moment bitte, ich helfe Ihnen.",
      "",
      "Negativ reagieren:",
      "✗ Tut mir leid, das geht nicht.",
      "✗ Leider nein.",
      "✗ Ich weiß es nicht. Bitte fragen Sie dort."
    ],
    tips: [
      "Seien Sie höflich: Benutzen Sie 'bitte', 'danke', 'Entschuldigung'.",
      "Benutzen Sie die Modalverben: können, möchten, dürfen.",
      "Reagieren Sie auf die Antwort: 'Danke!', 'Schade.', 'Super!'"
    ]
  }
];
