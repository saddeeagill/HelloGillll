export type FormField = {
  id: string;
  label: string;
  placeholder: string;
  type: 'text' | 'email' | 'date' | 'tel';
  required?: boolean;
};

export type SchreibenPart1 = {
  part: 1;
  title: string;
  instruction: string;
  situation: string;
  fields: FormField[];
};

export type SchreibenPart2 = {
  part: 2;
  title: string;
  instruction: string;
  situation: string;
  bulletPoints: string[];
  evaluation: string[];
};

export type SchreibenExam = [SchreibenPart1, SchreibenPart2];

export const SCHREIBEN_EXAM: SchreibenExam = [
  {
    part: 1,
    title: "Formular ausfüllen",
    instruction: "Füllen Sie das Formular aus. Schreiben Sie die Informationen in die Felder.",
    situation: "Situation: Sie möchten einen Deutschkurs besuchen. Füllen Sie das Anmeldeformular aus.",
    fields: [
      { id: "vorname", label: "Vorname *", placeholder: "z.B. Maria", type: "text" },
      { id: "nachname", label: "Nachname *", placeholder: "z.B. Schmidt", type: "text" },
      { id: "strasse", label: "Straße und Hausnummer *", placeholder: "z.B. Hauptstraße 12", type: "text" },
      { id: "plz", label: "Postleitzahl *", placeholder: "z.B. 10115", type: "text" },
      { id: "ort", label: "Ort *", placeholder: "z.B. Berlin", type: "text" },
      { id: "telefon", label: "Telefonnummer *", placeholder: "z.B. 030 12345678", type: "tel" },
      { id: "email", label: "E-Mail *", placeholder: "z.B. maria.schmidt@email.de", type: "email" },
      { id: "geburtsdatum", label: "Geburtsdatum *", placeholder: "z.B. 15.03.1990", type: "text" }
    ]
  },
  {
    part: 2,
    title: "Kurzen Text schreiben",
    instruction: "Schreiben Sie einen kurzen Text (ca. 30 Wörter) zu der Situation.",
    situation: "Situation: Ihre Freundin hat Geburtstag. Sie können nicht zur Party kommen. Schreiben Sie eine Nachricht an Ihre Freundin.",
    bulletPoints: [
      "Warum können Sie nicht kommen?",
      "Wann möchten Sie Ihre Freundin treffen?",
      "Was möchten Sie zusammen machen?"
    ],
    evaluation: [
      "Haben Sie alle drei Punkte beantwortet?",
      "Ist der Text verständlich?",
      "Haben Sie Anrede und Gruß geschrieben?",
      "Länge: ca. 30 Wörter (25-35 Wörter sind okay)"
    ]
  }
];
