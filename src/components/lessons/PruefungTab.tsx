"use client";
import React, { useState } from "react";
import { Lesson } from "@/data/lessons";

type QuestionType = "mcq" | "tf" | "text" | "number";

interface ExamQuestion {
  id: number;
  type: QuestionType;
  question: string;
  options?: string[]; // For MCQ
  correctAnswerIndex?: number; // For MCQ
  correctAnswerBool?: boolean; // For TF
  correctAnswerNumber?: number; // For Number
  tts?: boolean; // Text-to-speech enabled
}

interface ExamSection {
  id: string;
  tabLabel: string;
  title: string;
  questions: ExamQuestion[];
}

const EXAM_SECTIONS_L1: ExamSection[] = [
  {
    id: "read",
    tabLabel: "1 READ",
    title: "Choose the correct answer",
    questions: [
      { id: 1, type: "mcq", question: "Where does Maria come from?", options: ["Portugal", "Switzerland", "Bern", "Lisbon"], correctAnswerIndex: 0 },
      { id: 2, type: "mcq", question: "What is Maria's dog's name?", options: ["Müller", "Max", "Pedro", "His"], correctAnswerIndex: 1 },
      { id: 3, type: "mcq", question: "Where does her neighbor's husband work?", options: ["Park", "Café", "Bank", "School"], correctAnswerIndex: 2 },
      { id: 4, type: "mcq", question: "What is Maria's teacher's name?", options: ["Sofia", "Lisa", "Anna", "Saddeea Gill"], correctAnswerIndex: 3 },
      { id: 5, type: "mcq", question: "What do Maria and Lisa drink together?", options: ["Kaffee", "Milch", "Tee", "Juice"], correctAnswerIndex: 2 },
      { id: 6, type: "mcq", question: "What is the name of Maria's brother in the second story?", options: ["Max", "Hans", "Pedro", "Silva"], correctAnswerIndex: 2 },
      { id: 7, type: "mcq", question: "What does Lisa's son have to play with?", options: ["Fahrrad", "Ball", "Auto", "Buch"], correctAnswerIndex: 1 },
      { id: 8, type: "mcq", question: "How many boys are playing on the field with one ball?", options: ["Eins", "Zwei", "Drei", "Vier"], correctAnswerIndex: 1 },
      { id: 9, type: "mcq", question: "Up to what number do the boys count?", options: ["Drei", "Vier", "Fünf", "Sechs"], correctAnswerIndex: 2 },
      { id: 10, type: "mcq", question: "Wen ruft Maria in der dritten Geschichte an?", options: ["Mutter", "Bruder", "Schwester", "Vater"], correctAnswerIndex: 0 },
    ]
  },
  {
    id: "listen_read",
    tabLabel: "2 LISTEN / READ",
    title: "Right or wrong?",
    questions: [
      { id: 11, type: "tf", question: "Maria comes from Portugal.", correctAnswerBool: true, tts: true },
      { id: 12, type: "tf", question: "Maria's dog is called Müller.", correctAnswerBool: false, tts: true },
      { id: 13, type: "tf", question: "Maria lives in Bern.", correctAnswerBool: true, tts: true },
      { id: 14, type: "tf", question: "The river in Bern is loud.", correctAnswerBool: false, tts: true },
      { id: 15, type: "tf", question: "Maria and Lisa are drinking tea together.", correctAnswerBool: false, tts: true },
      { id: 16, type: "tf", question: "Pedro is Maria's sister.", correctAnswerBool: false, tts: true },
      { id: 17, type: "tf", question: "Lisa has a son.", correctAnswerBool: false, tts: true },
      { id: 18, type: "tf", question: "Die Jungen spielen mit drei Bällen.", correctAnswerBool: false, tts: true },
      { id: 19, type: "tf", question: "Maria hears the children saying numbers.", correctAnswerBool: true, tts: true },
      { id: 20, type: "tf", question: "Maria ruft ihre Schwester an.", correctAnswerBool: false, tts: true },
    ]
  },
  {
    id: "write",
    tabLabel: "3 WRITE",
    title: "Enter your answer here...",
    questions: [
      { id: 21, type: "text", question: "Name → Write: \"My name is ...\"" },
      { id: 22, type: "text", question: "Origin → Write: \"I come from ...\"" },
      { id: 23, type: "text", question: "Place of residence → Write: \"I live in ...\"" },
      { id: 24, type: "text", question: "Pet → Write: \"I have ...\" (e.g. dog, cat)" },
      { id: 25, type: "text", question: "Family → Write: \"My family...\" (e.g., is large, lives in ...)" },
    ]
  }
];

const EXAM_SECTIONS_L2: ExamSection[] = [
  {
    id: "read",
    tabLabel: "1 LESEN",
    title: "Wählen Sie die richtige Antwort",
    questions: [
      { id: 1, type: "mcq", question: "Was liebt Maria?", options: ["Kaffee", "Schokolade", "Brot", "Kuchen"], correctAnswerIndex: 1 },
      { id: 2, type: "mcq", question: "Wie heisst Marias Freund?", options: ["Max", "Pedro", "Hans", "Müller"], correctAnswerIndex: 2 },
      { id: 3, type: "mcq", question: "Was trinkt Hans in Café?", options: ["Kaffee", "Bier", "Milch", "Tee"], correctAnswerIndex: 1 },
      { id: 4, type: "mcq", question: "Wer backt oft zu Hause?", options: ["Mutter", "Grossmutter", "Schwester", "Lehrerin"], correctAnswerIndex: 1 },
      { id: 5, type: "mcq", question: "Was hört Maria in Café?", options: ["Wind", "Wasser", "Musik", "Kinder"], correctAnswerIndex: 2 },
      { id: 6, type: "mcq", question: "Wo wohnt Person jetzt?", options: ["Portugal", "Deutschland", "Schweiz", "Österreich"], correctAnswerIndex: 2 },
      { id: 7, type: "mcq", question: "Wie viele Berge kann man von Balkon sehen?", options: ["Vier", "Fünf", "Sechs", "Sieben"], correctAnswerIndex: 1 },
      { id: 8, type: "mcq", question: "In welchem Stock wohnt Person?", options: ["Ersten", "Zweiten", "Dritten", "Vierten"], correctAnswerIndex: 1 },
      { id: 9, type: "mcq", question: "Welche Farbe haben Schränke?", options: ["Rot", "Blau", "Grün", "Gelb"], correctAnswerIndex: 0 },
      { id: 10, type: "mcq", question: "Wo steht Bett?", options: ["Ecke", "Mitte", "Fenster", "Tür"], correctAnswerIndex: 0 },
    ]
  },
  {
    id: "listen_read",
    tabLabel: "2 HÖREN / LESEN",
    title: "Richtig oder Falsch?",
    questions: [
      { id: 11, type: "tf", question: "Maria ist in Schweiz.", correctAnswerBool: true, tts: true },
      { id: 12, type: "tf", question: "Maria liebt Schokolade.", correctAnswerBool: true, tts: true },
      { id: 13, type: "tf", question: "Maria und Hans gehen zu Café.", correctAnswerBool: true, tts: true },
      { id: 14, type: "tf", question: "Hans kann wenig essen.", correctAnswerBool: false, tts: true },
      { id: 15, type: "tf", question: "Maria lernt Deutsch.", correctAnswerBool: true, tts: true },
      { id: 16, type: "tf", question: "Person wohnt in Dorf.", correctAnswerBool: false, tts: true },
      { id: 17, type: "tf", question: "Balkon ist klein.", correctAnswerBool: false, tts: true },
      { id: 18, type: "tf", question: "Dusche ist klein.", correctAnswerBool: true, tts: true },
      { id: 19, type: "tf", question: "Bett ist hart.", correctAnswerBool: false, tts: true },
      { id: 20, type: "tf", question: "Kühlschrank ist leer.", correctAnswerBool: true, tts: true },
    ]
  },
  {
    id: "zahlentest",
    tabLabel: "3 ZAHLENTEST",
    title: "Stufe 1: Zahlen lesen",
    questions: [
      { id: 21, type: "number", question: "elf", correctAnswerNumber: 11 },
      { id: 22, type: "number", question: "siebenundzwanzig", correctAnswerNumber: 27 },
      { id: 23, type: "number", question: "vierunddreissig", correctAnswerNumber: 34 },
      { id: 24, type: "number", question: "neunundvierzig", correctAnswerNumber: 49 },
      { id: 25, type: "number", question: "sechzig", correctAnswerNumber: 60 },
      { id: 26, type: "number", question: "zweiundsiebzig", correctAnswerNumber: 72 },
      { id: 27, type: "number", question: "achtundachtzig", correctAnswerNumber: 88 },
      { id: 28, type: "number", question: "fünfundneunzig", correctAnswerNumber: 95 },
      { id: 29, type: "number", question: "hundertsechs", correctAnswerNumber: 106 },
      { id: 30, type: "number", question: "hundertdreissig", correctAnswerNumber: 130 },
    ]
  }
];

const EXAM_SECTIONS_L3: ExamSection[] = [
  {
    id: "read",
    tabLabel: "1 LESEN",
    title: "Wählen Sie die richtige Antwort",
    questions: [
      { id: 1, type: "mcq", question: "Wann wacht Tim auf?", options: ["Abend", "Nacht", "Morgen", "Mittag"], correctAnswerIndex: 2 },
      { id: 2, type: "mcq", question: "Welche Jahreszeit ist es?", options: ["Frühling", "Sommer", "Herbst", "Winter"], correctAnswerIndex: 3 },
      { id: 3, type: "mcq", question: "Was zieht Tim an?", options: ["Schuhe", "Hose", "Jacke", "Mütze"], correctAnswerIndex: 2 },
      { id: 4, type: "mcq", question: "Was steht vor dem Haus?", options: ["Blume", "Baum", "See", "Auto"], correctAnswerIndex: 1 },
      { id: 5, type: "mcq", question: "Was wächst neben dem Baum?", options: ["Gras", "Blume", "Wasser", "Stein"], correctAnswerIndex: 1 },
      { id: 6, type: "mcq", question: "Wohin geht Tim nach dem Haus?", options: ["Park", "Stadt", "See", "Wald"], correctAnswerIndex: 2 },
      { id: 7, type: "mcq", question: "Wie ist das Wasser im See?", options: ["Warm", "Heiss", "Kalt", "Schön"], correctAnswerIndex: 2 },
      { id: 8, type: "mcq", question: "An welchem Tag geht Tim in die Stadt?", options: ["Sonntag", "Montag", "Dienstag", "Mittwoch"], correctAnswerIndex: 1 },
      { id: 9, type: "mcq", question: "Was macht Tim am Donnerstag?", options: ["Sport", "Lesen", "Kochen", "Schreiben"], correctAnswerIndex: 2 },
      { id: 10, type: "mcq", question: "Wann geht Tim wieder zum See?", options: ["Montag", "Freitag", "Samstag", "Sonntag"], correctAnswerIndex: 3 },
    ]
  },
  {
    id: "listen_read",
    tabLabel: "2 HÖREN / LESEN",
    title: "Richtig oder Falsch?",
    questions: [
      { id: 11, type: "tf", question: "Tim wacht am Morgen auf.", correctAnswerBool: true, tts: true },
      { id: 12, type: "tf", question: "Es ist Sommer.", correctAnswerBool: false, tts: true },
      { id: 13, type: "tf", question: "Die Sonne scheint.", correctAnswerBool: true, tts: true },
      { id: 14, type: "tf", question: "Der Baum hat viele Blätter.", correctAnswerBool: false, tts: true },
      { id: 15, type: "tf", question: "Neben dem Baum wächst eine Blume.", correctAnswerBool: true, tts: true },
      { id: 16, type: "tf", question: "Das Wasser im See ist warm.", correctAnswerBool: false, tts: true },
      { id: 17, type: "tf", question: "Tim setzt sich am See hin.", correctAnswerBool: true, tts: true },
      { id: 18, type: "tf", question: "Am Mittwoch macht Tim Sport.", correctAnswerBool: false, tts: true },
      { id: 19, type: "tf", question: "Am Donnerstag kocht Tim Suppe.", correctAnswerBool: true, tts: true },
      { id: 20, type: "tf", question: "Tim ist zufrieden.", correctAnswerBool: true, tts: true },
    ]
  },
  {
    id: "write",
    tabLabel: "3 SCHREIBEN",
    title: "Schreiben Sie kurze Sätze",
    questions: [
      { id: 21, type: "text", question: "Schreiben Sie: Welche Jahreszeit mögen Sie?" },
      { id: 22, type: "text", question: "Schreiben Sie: Was machen Sie am Montag?" },
      { id: 23, type: "text", question: "Schreiben Sie: Gehen Sie oft spazieren?" },
      { id: 24, type: "text", question: "Schreiben Sie: Was sehen Sie in der Natur?" },
      { id: 25, type: "text", question: "Schreiben Sie: Haben Sie einen Lieblingsbaum?" },
    ]
  }
];

const EXAM_SECTIONS_L4: ExamSection[] = [
  {
    id: "read",
    tabLabel: "1 LESEN",
    title: "Wählen Sie die richtige Antwort",
    questions: [
      { id: 1, type: "mcq", question: "Mit wem lebt Anna?", options: ["Vater", "Mutter", "Bruder", "Freundin"], correctAnswerIndex: 1 },
      { id: 2, type: "mcq", question: "Was nimmt Anna zum Schreiben?", options: ["Kugelschreiber", "Füller", "Bleistift", "Pinsel"], correctAnswerIndex: 2 },
      { id: 3, type: "mcq", question: "Worauf schreibt Anna?", options: ["Tisch", "Bogen", "Hand", "Wand"], correctAnswerIndex: 1 },
      { id: 4, type: "mcq", question: "Was ist das Thema im Kurs?", options: ["Reisen", "Tiere", "Wetter", "Musik"], correctAnswerIndex: 0 },
      { id: 5, type: "mcq", question: "Was singen die Schüler nach der Pause?", options: ["Lied", "Gedicht", "Text", "Satz"], correctAnswerIndex: 0 },
      { id: 6, type: "mcq", question: "Was kommt nach dem Test?", options: ["Pause", "Lied", "Prüfung", "Hausaufgabe"], correctAnswerIndex: 2 },
      { id: 7, type: "mcq", question: "Wer gibt Anna eine Entschuldigung?", options: ["Mutter", "Lehrerin", "Doktor", "Schüler"], correctAnswerIndex: 2 },
      { id: 8, type: "mcq", question: "Wie lange ist Anna krank?", options: ["Zwei Tage", "Drei Tage", "Vier Tage", "Fünf Tage"], correctAnswerIndex: 1 },
      { id: 9, type: "mcq", question: "Was sagt die Lehrerin zum guten Ergebnis?", options: ["Hallo", "Danke", "Glückwunsch", "Tschüss"], correctAnswerIndex: 2 },
      { id: 10, type: "mcq", question: "Wer sagt: „Du bist fleissig“?", options: ["Lehrerin", "Mutter", "Doktor", "Anna"], correctAnswerIndex: 1 },
    ]
  },
  {
    id: "listen_read",
    tabLabel: "2 HÖREN / LESEN",
    title: "Richtig oder Falsch?",
    questions: [
      { id: 11, type: "tf", question: "Anna spricht eine neue Sprache.", correctAnswerBool: true, tts: true },
      { id: 12, type: "tf", question: "In der Klasse sind nur wenige Schüler.", correctAnswerBool: false, tts: true },
      { id: 13, type: "tf", question: "Die Lehrerin gibt eine Aufgabe.", correctAnswerBool: true, tts: true },
      { id: 14, type: "tf", question: "Das Thema ist Essen.", correctAnswerBool: false, tts: true },
      { id: 15, type: "tf", question: "Anna macht keinen Fehler.", correctAnswerBool: false, tts: true },
      { id: 16, type: "tf", question: "Sie singen ein Lied in der Pause.", correctAnswerBool: true, tts: true },
      { id: 17, type: "tf", question: "Anna hat Fieber und geht zum Arzt.", correctAnswerBool: true, tts: true },
      { id: 18, type: "tf", question: "Anna ist nach einer Woche gesund.", correctAnswerBool: false, tts: true },
      { id: 19, type: "tf", question: "Das Ergebnis der Prüfung ist schlecht.", correctAnswerBool: false, tts: true },
      { id: 20, type: "tf", question: "Annas Mutter sagt, sie ist fleissig.", correctAnswerBool: true, tts: true },
    ]
  },
  {
    id: "write",
    tabLabel: "3 SCHREIBEN",
    title: "Schreiben Sie kurze Sätze",
    questions: [
      { id: 21, type: "text", question: "Schreiben Sie: Gehen Sie gerne in die Schule?" },
      { id: 22, type: "text", question: "Schreiben Sie: Was ist Ihr Lieblingsthema?" },
      { id: 23, type: "text", question: "Schreiben Sie: Machen Sie oft Fehler?" },
      { id: 24, type: "text", question: "Schreiben Sie: Was machen Sie in der Pause?" },
      { id: 25, type: "text", question: "Schreiben Sie: Sind Sie nervös vor Prüfungen?" },
    ]
  }
];

const EXAM_SECTIONS_L5: ExamSection[] = [
  {
    id: "read",
    tabLabel: "1 LESEN",
    title: "Wählen Sie die richtige Antwort",
    questions: [
      { id: 1, type: "mcq", question: "Wohin geht Maria?", options: ["Geschäft", "Café", "Park", "Schule"], correctAnswerIndex: 0 },
      { id: 2, type: "mcq", question: "Welche Farbe hat die Tasche, die Maria kauft?", options: ["Blau", "Schwarz", "Rot", "Grün"], correctAnswerIndex: 2 },
      { id: 3, type: "mcq", question: "Was sagt die Verkäuferin über die rote Tasche?", options: ["Sie ist alt", "Sie ist neu", "Sie ist klein", "Sie ist gross"], correctAnswerIndex: 1 },
      { id: 4, type: "mcq", question: "Was sieht Maria noch im Geschäft?", options: ["Hut", "Jacke", "Schuh", "Hose"], correctAnswerIndex: 2 },
      { id: 5, type: "mcq", question: "Wie ist der erste Schuh?", options: ["Klein", "Gross", "Schön", "Alt"], correctAnswerIndex: 1 },
      { id: 6, type: "mcq", question: "Wie ist der Schuh, den die Verkäuferin zeigt?", options: ["Klein", "Gross", "Neu", "Rot"], correctAnswerIndex: 0 },
      { id: 7, type: "mcq", question: "Wie viele Schuhe nimmt Maria?", options: ["Einen", "Zwei", "Keine", "Drei"], correctAnswerIndex: 1 },
      { id: 8, type: "mcq", question: "Wie findet Maria die Verkäuferin?", options: ["Böse", "Traurig", "Freundlich", "Müde"], correctAnswerIndex: 2 },
      { id: 9, type: "mcq", question: "Wie heisst Marias Freundin?", options: ["Lisa", "Anna", "Sarah", "Emma"], correctAnswerIndex: 1 },
      { id: 10, type: "mcq", question: "Wozu passt die Tasche?", options: ["Schuh", "Hut", "Mantel", "Kleid"], correctAnswerIndex: 3 },
    ]
  },
  {
    id: "listen_read",
    tabLabel: "2 HÖREN / LESEN",
    title: "Richtig oder Falsch?",
    questions: [
      { id: 11, type: "tf", question: "Maria geht in ein Café.", correctAnswerBool: false, tts: true },
      { id: 12, type: "tf", question: "Maria sieht viele Taschen im Geschäft.", correctAnswerBool: true, tts: true },
      { id: 13, type: "tf", question: "Die rote Tasche ist alt.", correctAnswerBool: false, tts: true },
      { id: 14, type: "tf", question: "Maria kauft die blaue Tasche.", correctAnswerBool: false, tts: true },
      { id: 15, type: "tf", question: "Maria sieht auch einen Schuh im Geschäft.", correctAnswerBool: true, tts: true },
      { id: 16, type: "tf", question: "Ein Schuh ist gross, der andere ist klein.", correctAnswerBool: true, tts: true },
      { id: 17, type: "tf", question: "Maria nimmt nur einen Schuh.", correctAnswerBool: false, tts: true },
      { id: 18, type: "tf", question: "Die Verkäuferin ist unfreundlich.", correctAnswerBool: false, tts: true },
      { id: 19, type: "tf", question: "Maria zeigt die Tasche ihrer Freundin Anna.", correctAnswerBool: true, tts: true },
      { id: 20, type: "tf", question: "Die Tasche passt nicht zum Kleid.", correctAnswerBool: false, tts: true },
    ]
  },
  {
    id: "write",
    tabLabel: "3 SCHREIBEN",
    title: "Schreiben Sie kurze Sätze",
    questions: [
      { id: 21, type: "text", question: "Schreiben Sie: Gehen Sie gerne einkaufen?" },
      { id: 22, type: "text", question: "Schreiben Sie: Welche Farbe mögen Sie?" },
      { id: 23, type: "text", question: "Schreiben Sie: Was kaufen Sie oft?" },
      { id: 24, type: "text", question: "Schreiben Sie: Ist die Verkäuferin freundlich?" },
      { id: 25, type: "text", question: "Schreiben Sie: Was tragen Sie gerne?" },
    ]
  }
];

const EXAM_SECTIONS_L6: ExamSection[] = [
  {
    id: "read",
    tabLabel: "1 LESEN",
    title: "Wählen Sie die richtige Antwort",
    questions: [
      { id: 1, type: "mcq", question: "Wo findet der Mann den Ring?", options: ["Park", "Strasse", "Wald", "Haus"], correctAnswerIndex: 1 },
      { id: 2, type: "mcq", question: "Woraus ist der Ring?", options: ["Gold", "Silber", "Plastik", "Holz"], correctAnswerIndex: 0 },
      { id: 3, type: "mcq", question: "Was sagt das Kind?", options: ["Ja", "Nein", "Keine Ahnung", "Hallo"], correctAnswerIndex: 2 },
      { id: 4, type: "mcq", question: "Wohin geht der Mann zuerst?", options: ["Polizei", "Bäckerei", "Schule", "Bank"], correctAnswerIndex: 1 },
      { id: 5, type: "mcq", question: "Wer steht in der Bäckerei hinter dem Tresen?", options: ["Mann", "Kind", "Frau", "Bäcker"], correctAnswerIndex: 2 },
      { id: 6, type: "mcq", question: "Wohin legt der Mann den Ring?", options: ["Tasche", "Auto", "Tisch", "Schrank"], correctAnswerIndex: 0 },
      { id: 7, type: "mcq", question: "Was steht auf dem Ring?", options: ["Name", "Adresse", "Datum", "Preis"], correctAnswerIndex: 1 },
      { id: 8, type: "mcq", question: "Wie steht die Adresse auf dem Ring?", options: ["Gross", "Klein", "Schön", "Alt"], correctAnswerIndex: 1 },
      { id: 9, type: "mcq", question: "Was schreibt der Mann?", options: ["Buch", "Test", "Brief", "E-Mail"], correctAnswerIndex: 2 },
      { id: 10, type: "mcq", question: "Wann ruft die Person an?", options: ["Heute", "Morgen", "Am nächsten Tag", "Am Abend"], correctAnswerIndex: 2 },
    ]
  },
  {
    id: "listen_read",
    tabLabel: "2 HÖREN / LESEN",
    title: "Richtig oder Falsch?",
    questions: [
      { id: 11, type: "tf", question: "Der Mann findet einen Ring im Park.", correctAnswerBool: false, tts: true },
      { id: 12, type: "tf", question: "Der Ring ist aus Silber.", correctAnswerBool: false, tts: true },
      { id: 13, type: "tf", question: "Ein Kind weiss, wem der Ring gehört.", correctAnswerBool: false, tts: true },
      { id: 14, type: "tf", question: "Der Mann fragt eine Frau in der Bäckerei.", correctAnswerBool: true, tts: true },
      { id: 15, type: "tf", question: "Die Frau in der Bäckerei hat den Ring verloren.", correctAnswerBool: false, tts: true },
      { id: 16, type: "tf", question: "Der Mann nimmt den Ring mit nach Hause.", correctAnswerBool: true, tts: true },
      { id: 17, type: "tf", question: "Auf dem Ring steht eine Telefonnummer.", correctAnswerBool: false, tts: true },
      { id: 18, type: "tf", question: "Der Mann schreibt einen Brief.", correctAnswerBool: true, tts: true },
      { id: 19, type: "tf", question: "Am nächsten Tag ruft niemand an.", correctAnswerBool: false, tts: true },
      { id: 20, type: "tf", question: "Die Person am Telefon sagt „Danke!“.", correctAnswerBool: true, tts: true },
    ]
  },
  {
    id: "write",
    tabLabel: "3 SCHREIBEN",
    title: "Schreiben Sie kurze Sätze",
    questions: [
      { id: 21, type: "text", question: "Schreiben Sie: Haben Sie schon einmal etwas gefunden?" },
      { id: 22, type: "text", question: "Schreiben Sie: Tragen Sie gerne einen Ring?" },
      { id: 23, type: "text", question: "Schreiben Sie: Schreiben Sie oft Briefe?" },
      { id: 24, type: "text", question: "Schreiben Sie: Gehen Sie gerne in die Bäckerei?" },
      { id: 25, type: "text", question: "Schreiben Sie: Rufen Sie oft jemanden an?" },
    ]
  }
];

const EXAM_SECTIONS_L7: ExamSection[] = [
  {
    id: "read",
    tabLabel: "1 LESEN",
    title: "Wählen Sie die richtige Antwort",
    questions: [
      { id: 1, type: "mcq", question: "Was isst die Person heute?", options: ["Pizza", "Käsefondue", "Fisch", "Pommes"], correctAnswerIndex: 1 },
      { id: 2, type: "mcq", question: "Wer hilft der Person?", options: ["Mutter", "Nachbar", "Lisa", "Anna"], correctAnswerIndex: 2 },
      { id: 3, type: "mcq", question: "Wie ist das Restaurant?", options: ["Gross", "Kalt", "Gemütlich", "Klein"], correctAnswerIndex: 2 },
      { id: 4, type: "mcq", question: "Was trinken sie?", options: ["Kaffee", "Saft", "Tee", "Bier"], correctAnswerIndex: 2 },
      { id: 5, type: "mcq", question: "Was mag Lisa?", options: ["Birne", "Butter", "Fisch", "Salz"], correctAnswerIndex: 1 },
      { id: 6, type: "mcq", question: "Was mag die Mutter?", options: ["Salz", "Butter", "Tee", "Pommes"], correctAnswerIndex: 0 },
      { id: 7, type: "mcq", question: "Wie ist das Wetter draussen?", options: ["Warm", "Heiss", "Kalt", "Schön"], correctAnswerIndex: 2 },
      { id: 8, type: "mcq", question: "Was haben die Nachbarn?", options: ["Fisch", "Käse", "Brot", "Tee"], correctAnswerIndex: 0 },
      { id: 9, type: "mcq", question: "In welcher Stadt ist das Restaurant?", options: ["Genf", "Basel", "Bern", "Zürich"], correctAnswerIndex: 3 },
      { id: 10, type: "mcq", question: "Wie findet die Person Deutsch?", options: ["Leicht", "Schwer", "Langweilig", "Schlecht"], correctAnswerIndex: 0 },
    ]
  },
  {
    id: "listen_read",
    tabLabel: "2 HÖREN / LESEN",
    title: "Richtig oder Falsch?",
    questions: [
      { id: 11, type: "tf", question: "Die Person isst heute Pizza.", correctAnswerBool: false, tts: true },
      { id: 12, type: "tf", question: "Ihre Freundin Anna hilft ihr.", correctAnswerBool: false, tts: true },
      { id: 13, type: "tf", question: "Sie gehen in ein Restaurant.", correctAnswerBool: true, tts: true },
      { id: 14, type: "tf", question: "Das Käsefondue ist kalt.", correctAnswerBool: false, tts: true },
      { id: 15, type: "tf", question: "Sie trinken Wasser.", correctAnswerBool: false, tts: true },
      { id: 16, type: "tf", question: "Lisa mag Butter.", correctAnswerBool: true, tts: true },
      { id: 17, type: "tf", question: "Das Restaurant hat ein Feuer.", correctAnswerBool: true, tts: true },
      { id: 18, type: "tf", question: "Die Nachbarn haben Fleisch.", correctAnswerBool: false, tts: true },
      { id: 19, type: "tf", question: "Das Restaurant ist in Bern.", correctAnswerBool: false, tts: true },
      { id: 20, type: "tf", question: "Die Person findet Deutsch schwer.", correctAnswerBool: false, tts: true },
    ]
  },
  {
    id: "write",
    tabLabel: "3 SCHREIBEN",
    title: "Schreiben Sie kurze Sätze",
    questions: [
      { id: 21, type: "text", question: "Schreiben Sie: Essen Sie gerne Käse?" },
      { id: 22, type: "text", question: "Schreiben Sie: Was ist Ihr Lieblingsessen?" },
      { id: 23, type: "text", question: "Schreiben Sie: Trinken Sie lieber Kaffee oder Tee?" },
      { id: 24, type: "text", question: "Schreiben Sie: Mögen Sie Zürich?" },
      { id: 25, type: "text", question: "Schreiben Sie: Finden Sie Deutsch schwer?" },
    ]
  }
];

const EXAM_SECTIONS_L8: ExamSection[] = [
  {
    id: "read",
    tabLabel: "1 LESEN",
    title: "Wählen Sie die richtige Antwort",
    questions: [
      { id: 1, type: "mcq", question: "Was für ein Zimmer hat die Person?", options: ["Einzelzimmer", "Doppelzimmer", "Wohnzimmer", "Bad"], correctAnswerIndex: 1 },
      { id: 2, type: "mcq", question: "Welche Farbe hat die Decke?", options: ["Blau", "Grün", "Rot", "Gelb"], correctAnswerIndex: 2 },
      { id: 3, type: "mcq", question: "Was liegt auf dem Regal?", options: ["Buch", "Schlüssel", "Lampe", "Katze"], correctAnswerIndex: 1 },
      { id: 4, type: "mcq", question: "Was ist neben der Tür?", options: ["Toilette", "Bett", "Balkon", "Schrank"], correctAnswerIndex: 0 },
      { id: 5, type: "mcq", question: "Welches Tier zeigt das Bild?", options: ["Hund", "Vogel", "Katze", "Maus"], correctAnswerIndex: 2 },
      { id: 6, type: "mcq", question: "Was sieht die Person im Spiegel?", options: ["Sich selbst", "Den Vater", "Den Garten", "Eine Katze"], correctAnswerIndex: 0 },
      { id: 7, type: "mcq", question: "Wie ist der Garten?", options: ["Leer", "Dunkel", "Bunt", "Klein"], correctAnswerIndex: 2 },
      { id: 8, type: "mcq", question: "Welche Farbe hat das Haus gegenüber?", options: ["Rot", "Gelb", "Blau", "Weiss"], correctAnswerIndex: 2 },
      { id: 9, type: "mcq", question: "Wer kommt und bringt Essen?", options: ["Mutter", "Freundin", "Papa", "Nachbar"], correctAnswerIndex: 2 },
      { id: 10, type: "mcq", question: "Was bringt Papa?", options: ["Pasta", "Salat", "Pizza", "Brot"], correctAnswerIndex: 2 },
    ]
  },
  {
    id: "listen_read",
    tabLabel: "2 HÖREN / LESEN",
    title: "Richtig oder Falsch?",
    questions: [
      { id: 11, type: "tf", question: "Das Zimmer ist gross und dunkel.", correctAnswerBool: false, tts: true },
      { id: 12, type: "tf", question: "Das Bett ist sehr bequem.", correctAnswerBool: true, tts: true },
      { id: 13, type: "tf", question: "Neben dem Bett steht ein Stuhl.", correctAnswerBool: false, tts: true },
      { id: 14, type: "tf", question: "Der Schlüssel liegt auf dem Tisch.", correctAnswerBool: false, tts: true },
      { id: 15, type: "tf", question: "Über der Toilette hängt ein Bild mit einem Hund.", correctAnswerBool: false, tts: true },
      { id: 16, type: "tf", question: "Der Schrank ist leer.", correctAnswerBool: true, tts: true },
      { id: 17, type: "tf", question: "Die Person sieht einen Vogel vom Balkon.", correctAnswerBool: true, tts: true },
      { id: 18, type: "tf", question: "Das Haus gegenüber ist grün.", correctAnswerBool: false, tts: true },
      { id: 19, type: "tf", question: "Papa bringt Spaghetti mit.", correctAnswerBool: false, tts: true },
      { id: 20, type: "tf", question: "Die Person ist sehr glücklich in der Wohnung.", correctAnswerBool: true, tts: true },
    ]
  },
  {
    id: "write",
    tabLabel: "3 SCHREIBEN",
    title: "Schreiben Sie kurze Sätze",
    questions: [
      { id: 21, type: "text", question: "Schreiben Sie: Wie ist Ihr Zimmer?" },
      { id: 22, type: "text", question: "Schreiben Sie: Haben Sie einen Balkon?" },
      { id: 23, type: "text", question: "Schreiben Sie: Mögen Sie Tiere?" },
      { id: 24, type: "text", question: "Schreiben Sie: Was machen Sie im Garten?" },
      { id: 25, type: "text", question: "Schreiben Sie: Essen Sie gerne Pizza?" },
    ]
  }
];

const EXAM_SECTIONS_L9: ExamSection[] = [
  {
    id: "read",
    tabLabel: "1 LESEN",
    title: "Wählen Sie die richtige Antwort",
    questions: [
      { id: 1, type: "mcq", question: "Welcher Tag ist heute?", options: ["Montag", "Samstag", "Sonntag", "Freitag"], correctAnswerIndex: 2 },
      { id: 2, type: "mcq", question: "Was will die Person machen?", options: ["Frühstück", "Mittagessen", "Abendessen", "Sport"], correctAnswerIndex: 0 },
      { id: 3, type: "mcq", question: "Was findet die Person im Schrank?", options: ["Käse", "Messer", "Gabel", "Löffel"], correctAnswerIndex: 1 },
      { id: 4, type: "mcq", question: "Wo sitzt die Person?", options: ["Auf dem Bett", "Auf dem Tisch", "Auf dem Stuhl", "Auf dem Sofa"], correctAnswerIndex: 2 },
      { id: 5, type: "mcq", question: "Was nimmt die Person anstatt den Aufzug?", options: ["Das Auto", "Die Treppe", "Den Bus", "Das Fahrrad"], correctAnswerIndex: 1 },
      { id: 6, type: "mcq", question: "Wo isst die Person das Brot?", options: ["In der Küche", "Im Garten", "Auf dem Balkon", "Im Bett"], correctAnswerIndex: 1 },
      { id: 7, type: "mcq", question: "Was zeigt das Bild an der Wand?", options: ["Auto", "Haus", "Baum", "Kuh"], correctAnswerIndex: 3 },
      { id: 8, type: "mcq", question: "Wie sind die Möbel?", options: ["Neu", "Alt", "Kaputt", "Schön"], correctAnswerIndex: 1 },
      { id: 9, type: "mcq", question: "Was liegt auf dem Boden?", options: ["Buch", "Geld", "Schlüssel", "Tasse"], correctAnswerIndex: 2 },
      { id: 10, type: "mcq", question: "Was will die Person neu kaufen?", options: ["Schrank", "Tür", "Bett", "Kühlschrank"], correctAnswerIndex: 1 },
    ]
  },
  {
    id: "listen_read",
    tabLabel: "2 HÖREN / LESEN",
    title: "Richtig oder Falsch?",
    questions: [
      { id: 11, type: "tf", question: "Die Person findet Käse im Kühlschrank.", correctAnswerBool: false, tts: true },
      { id: 12, type: "tf", question: "Sie macht ein Brot mit Tomate.", correctAnswerBool: true, tts: true },
      { id: 13, type: "tf", question: "Die Tasse ist blau.", correctAnswerBool: false, tts: true },
      { id: 14, type: "tf", question: "Das Messer liegt auf dem Tisch.", correctAnswerBool: false, tts: true },
      { id: 15, type: "tf", question: "Die Musik ist sehr leise.", correctAnswerBool: false, tts: true },
      { id: 16, type: "tf", question: "Der Aufzug ist leise.", correctAnswerBool: false, tts: true },
      { id: 17, type: "tf", question: "Die Person isst das Brot im Garten.", correctAnswerBool: true, tts: true },
      { id: 18, type: "tf", question: "Das Bild zeigt einen Hund.", correctAnswerBool: false, tts: true },
      { id: 19, type: "tf", question: "Der Schlüssel liegt auf dem Boden.", correctAnswerBool: true, tts: true },
      { id: 20, type: "tf", question: "Die Tür ist kaputt.", correctAnswerBool: true, tts: true },
    ]
  },
  {
    id: "write",
    tabLabel: "3 SCHREIBEN",
    title: "Schreiben Sie kurze Sätze",
    questions: [
      { id: 21, type: "text", question: "Schreiben Sie: Essen Sie gerne Brot?" },
      { id: 22, type: "text", question: "Schreiben Sie: Ist Ihr Kühlschrank voll?" },
      { id: 23, type: "text", question: "Schreiben Sie: Fahren Sie oft mit dem Aufzug?" },
      { id: 24, type: "text", question: "Schreiben Sie: Leben Sie in der Schweiz?" },
      { id: 25, type: "text", question: "Schreiben Sie: Was machen Sie am Sonntag?" },
    ]
  }
];

const EXAM_SECTIONS_L10: ExamSection[] = [
  {
    id: "read",
    tabLabel: "1 LESEN",
    title: "Wählen Sie die richtige Antwort",
    questions: [
      { id: 1, type: "mcq", question: "Was macht Fatma?", options: ["Sie kocht", "Sie besucht einen Kurs", "Sie schläft", "Sie malt"], correctAnswerIndex: 1 },
      { id: 2, type: "mcq", question: "Was liegt auf dem Tisch?", options: ["Ein Stift", "Ein Buch", "Ein Apfel", "Ein Schlüssel"], correctAnswerIndex: 1 },
      { id: 3, type: "mcq", question: "Was ist das Thema im Buch?", options: ["Natur", "Essen", "Familie", "Tiere"], correctAnswerIndex: 2 },
      { id: 4, type: "mcq", question: "Was macht der Lehrer?", options: ["Er singt", "Er schläft", "Er isst", "Er erklärt ruhig"], correctAnswerIndex: 3 },
      { id: 5, type: "mcq", question: "Wie fühlt sich Fatma vor der Prüfung?", options: ["Nervös", "Müde", "Krank", "Wütend"], correctAnswerIndex: 0 },
      { id: 6, type: "mcq", question: "Was sagt der Lehrer am Ende?", options: ["Hallo", "Tschüss", "Glückwunsch", "Nein"], correctAnswerIndex: 2 },
      { id: 7, type: "mcq", question: "Wer sitzt neben Fatma?", options: ["Ein anderer Schüler", "Ihre Mutter", "Ein Kind", "Der Lehrer"], correctAnswerIndex: 0 },
      { id: 8, type: "mcq", question: "Was trinken sie in der Pause?", options: ["Tee", "Wasser", "Kaffee", "Cola"], correctAnswerIndex: 1 },
      { id: 9, type: "mcq", question: "Was machen sie nach dem Erklären?", options: ["Essen", "Singen ein Lied", "Schlafen", "Gehen nach Hause"], correctAnswerIndex: 1 },
      { id: 10, type: "mcq", question: "Wie ist Fatmas Ergebnis?", options: ["Schlecht", "Nicht gut", "Gut", "Falsch"], correctAnswerIndex: 2 },
    ]
  },
  {
    id: "listen_read",
    tabLabel: "2 HÖREN / LESEN",
    title: "Richtig oder Falsch?",
    questions: [
      { id: 11, type: "tf", question: "Fatma lernt eine alte Sprache.", correctAnswerBool: false, tts: true },
      { id: 12, type: "tf", question: "Das Thema der Aufgabe ist Familie.", correctAnswerBool: true, tts: true },
      { id: 13, type: "tf", question: "Fatma macht keinen Fehler.", correctAnswerBool: false, tts: true },
      { id: 14, type: "tf", question: "Nach dem Kurs gehen alle nach Hause.", correctAnswerBool: false, tts: true },
      { id: 15, type: "tf", question: "Fatma ist vor der Prüfung nervös.", correctAnswerBool: true, tts: true },
      { id: 16, type: "tf", question: "Das Ergebnis der Prüfung ist schlecht.", correctAnswerBool: false, tts: true },
      { id: 17, type: "tf", question: "Der Schüler neben Fatma hat auch ein gutes Ergebnis.", correctAnswerBool: true, tts: true },
      { id: 18, type: "tf", question: "In der Pause trinkt Fatma Kaffee.", correctAnswerBool: false, tts: true },
      { id: 19, type: "tf", question: "Nach der Pause liest sie ein neues Buch.", correctAnswerBool: false, tts: true },
      { id: 20, type: "tf", question: "Am Ende ist Fatma sehr zufrieden.", correctAnswerBool: true, tts: true },
    ]
  },
  {
    id: "write",
    tabLabel: "3 SCHREIBEN",
    title: "Schreiben Sie kurze Sätze",
    questions: [
      { id: 21, type: "text", question: "Schreiben Sie: Lernen Sie eine neue Sprache?" },
      { id: 22, type: "text", question: "Schreiben Sie: Haben Sie oft Prüfungen?" },
      { id: 23, type: "text", question: "Schreiben Sie: Was machen Sie in der Pause?" },
      { id: 24, type: "text", question: "Schreiben Sie: Ist der Kurs schwer?" },
      { id: 25, type: "text", question: "Schreiben Sie: Singen Sie gerne?" },
    ]
  }
];

const EXAM_SECTIONS_L11: ExamSection[] = [
  {
    id: "read",
    tabLabel: "1 LESEN",
    title: "Wählen Sie die richtige Antwort",
    questions: [
      { id: 1, type: "mcq", question: "Wohin geht Ahmed zuerst?", options: ["In die Disco", "Ins Kino", "Ins Stadion", "Ins Restaurant"], correctAnswerIndex: 1 },
      { id: 2, type: "mcq", question: "Was kauft Ahmed im Kino?", options: ["Ein Buch", "Ein Ticket", "Einen Apfel", "Eine Karte"], correctAnswerIndex: 1 },
      { id: 3, type: "mcq", question: "Wie lange dauert der Film?", options: ["Eine Stunde", "Zwei Stunden", "Drei Stunden", "Vier Stunden"], correctAnswerIndex: 1 },
      { id: 4, type: "mcq", question: "Wen ruft Ahmed an?", options: ["Das Restaurant", "Seine Freunde", "Das Reisebüro", "Das Kino"], correctAnswerIndex: 2 },
      { id: 5, type: "mcq", question: "Was bekommt Ahmed im Reisebüro?", options: ["Einen Koffer", "Eine Tasche", "Eine Karte und einen Prospekt", "Geld"], correctAnswerIndex: 2 },
      { id: 6, type: "mcq", question: "Wohin geht er am Sonntag?", options: ["Ins Kino", "Zum Stadion", "In die Disco", "Nach Hause"], correctAnswerIndex: 1 },
      { id: 7, type: "mcq", question: "Was machen die Leute im Stadion?", options: ["Sie schlafen", "Sie essen Pizza", "Sie singen", "Sie weinen"], correctAnswerIndex: 2 },
      { id: 8, type: "mcq", question: "Was bestellt Ahmed im Restaurant?", options: ["Pasta", "Pizza", "Salat", "Fisch"], correctAnswerIndex: 1 },
      { id: 9, type: "mcq", question: "Wohin gehen sie nach dem Restaurant?", options: ["Ins Kino", "Nach Hause", "Ins Stadion", "In eine Disco"], correctAnswerIndex: 3 },
      { id: 10, type: "mcq", question: "Was kauft er für die Disco?", options: ["Ein neues Ticket", "Ein Getränk", "Eine Pizza", "Einen Prospekt"], correctAnswerIndex: 0 },
    ]
  },
  {
    id: "listen_read",
    tabLabel: "2 HÖREN / LESEN",
    title: "Richtig oder Falsch?",
    questions: [
      { id: 11, type: "tf", question: "Ahmed geht ins Kino.", correctAnswerBool: true, tts: true },
      { id: 12, type: "tf", question: "Der Film dauert drei Stunden.", correctAnswerBool: false, tts: true },
      { id: 13, type: "tf", question: "Vor dem Kino hängt ein kleines Schild.", correctAnswerBool: false, tts: true },
      { id: 14, type: "tf", question: "Ahmed will eine grosse Reise machen.", correctAnswerBool: false, tts: true },
      { id: 15, type: "tf", question: "Die Frau gibt ihm einen Prospekt.", correctAnswerBool: true, tts: true },
      { id: 16, type: "tf", question: "Am Sonntag geht Ahmed ins Schwimmbad.", correctAnswerBool: false, tts: true },
      { id: 17, type: "tf", question: "Nach dem Spiel isst er einen Hamburger.", correctAnswerBool: false, tts: true },
      { id: 18, type: "tf", question: "Ahmed geht mit Freunden in eine Disco.", correctAnswerBool: true, tts: true },
      { id: 19, type: "tf", question: "In der Disco tanzen nur wenige Leute.", correctAnswerBool: false, tts: true },
      { id: 20, type: "tf", question: "Am Ende ist Ahmed sehr zufrieden.", correctAnswerBool: true, tts: true },
    ]
  },
  {
    id: "write",
    tabLabel: "3 SCHREIBEN",
    title: "Schreiben Sie kurze Sätze",
    questions: [
      { id: 21, type: "text", question: "Schreiben Sie: Gehen Sie oft ins Kino?" },
      { id: 22, type: "text", question: "Schreiben Sie: Mögen Sie Fussball?" },
      { id: 23, type: "text", question: "Schreiben Sie: Gehen Sie gerne in die Disco?" },
      { id: 24, type: "text", question: "Schreiben Sie: Essen Sie gerne Pizza?" },
      { id: 25, type: "text", question: "Schreiben Sie: Was machen Sie am Wochenende?" },
    ]
  }
];

const EXAM_SECTIONS_L12: ExamSection[] = [
  {
    id: "read",
    tabLabel: "1 LESEN",
    title: "Wählen Sie die richtige Antwort",
    questions: [
      { id: 1, type: "mcq", question: "Was bekommt Lisa?", options: ["Ein Buch", "Ein Auto", "Eine Einladung", "Ein Haus"], correctAnswerIndex: 2 },
      { id: 2, type: "mcq", question: "Wann ist die Feier?", options: ["Am Freitag", "Am Samstag", "Am Sonntag", "Am Montag"], correctAnswerIndex: 1 },
      { id: 3, type: "mcq", question: "Worüber reden die Leute auf der Party?", options: ["Über Autos", "Über Sport", "Über das Wetter", "Über Arbeit"], correctAnswerIndex: 1 },
      { id: 4, type: "mcq", question: "Was hängt an der Wand?", options: ["Eine Uhr", "Ein Spiegel", "Ein grosses Poster", "Ein Bild"], correctAnswerIndex: 2 },
      { id: 5, type: "mcq", question: "Was essen die Leute auf der Feier?", options: ["Pommes", "Kuchen", "Brot", "Käse"], correctAnswerIndex: 1 },
      { id: 6, type: "mcq", question: "Was sieht Lisa am nächsten Tag?", options: ["Einen alten Mann", "Ein neues Poster", "Ein kleines Kind", "Ein neues Auto"], correctAnswerIndex: 1 },
      { id: 7, type: "mcq", question: "Was nimmt Lisa mit?", options: ["Einen Koffer", "Eine Tasche", "Einen Prospekt", "Einen Schlüssel"], correctAnswerIndex: 2 },
      { id: 8, type: "mcq", question: "Wie kann man den Film sehen?", options: ["Mit einem Ticket", "Nur mit Anmeldung", "Gratis", "Mit Freunden"], correctAnswerIndex: 1 },
      { id: 9, type: "mcq", question: "Was läuft vor dem Film im Kino?", options: ["Ein Lied", "Ein Spiel", "Die Nachrichten", "Werbung"], correctAnswerIndex: 0 },
      { id: 10, type: "mcq", question: "Wie fühlt sich Lisa am Ende?", options: ["Traurig", "Krank", "Froh", "Müde"], correctAnswerIndex: 2 },
    ]
  },
  {
    id: "listen_read",
    tabLabel: "2 HÖREN / LESEN",
    title: "Richtig oder Falsch?",
    questions: [
      { id: 11, type: "tf", question: "Die Feier ist am Sonntag.", correctAnswerBool: false, tts: true },
      { id: 12, type: "tf", question: "Lisa hat ein Ticket für die Party.", correctAnswerBool: true, tts: true },
      { id: 13, type: "tf", question: "Lisa sitzt alleine auf der Party.", correctAnswerBool: false, tts: true },
      { id: 14, type: "tf", question: "Ein Mädchen spricht über Fussball.", correctAnswerBool: false, tts: true },
      { id: 15, type: "tf", question: "Auf der Party gibt es Pizza.", correctAnswerBool: false, tts: true },
      { id: 16, type: "tf", question: "Am nächsten Tag sieht Lisa ein Poster für einen Film.", correctAnswerBool: true, tts: true },
      { id: 17, type: "tf", question: "Für den Film braucht man keine Anmeldung.", correctAnswerBool: false, tts: true },
      { id: 18, type: "tf", question: "Lisa ruft an und macht die Anmeldung.", correctAnswerBool: true, tts: true },
      { id: 19, type: "tf", question: "Vor dem Film läuft ein Fussballspiel.", correctAnswerBool: false, tts: true },
      { id: 20, type: "tf", question: "Lisa hat an beiden Tagen viel Spass.", correctAnswerBool: true, tts: true },
    ]
  },
  {
    id: "write",
    tabLabel: "3 SCHREIBEN",
    title: "Schreiben Sie kurze Sätze",
    questions: [
      { id: 21, type: "text", question: "Schreiben Sie: Gehen Sie gerne auf eine Feier?" },
      { id: 22, type: "text", question: "Schreiben Sie: Was essen Sie gerne auf einer Party?" },
      { id: 23, type: "text", question: "Schreiben Sie: Welchen Sport mögen Sie?" },
      { id: 24, type: "text", question: "Schreiben Sie: Gehen Sie oft ins Kino?" },
      { id: 25, type: "text", question: "Schreiben Sie: Machen Sie gerne eine Anmeldung per Telefon?" },
    ]
  }
];

const EXAM_SECTIONS_L13: ExamSection[] = [
  {
    id: "read",
    tabLabel: "1 LESEN",
    title: "Wählen Sie die richtige Antwort",
    questions: [
      { id: 1, type: "mcq", question: "Was macht Maria?", options: ["Ein Praktikum", "Einen Kurs", "Eine Party", "Urlaub"], correctAnswerIndex: 0 },
      { id: 2, type: "mcq", question: "Wer erklärt Maria viel?", options: ["Der Chef", "Der Kunde", "Ein Kollege", "Der Student"], correctAnswerIndex: 2 },
      { id: 3, type: "mcq", question: "Was schickt Maria?", options: ["Ein Paket", "Einen Brief", "Ein Fax", "Ein Buch"], correctAnswerIndex: 2 },
      { id: 4, type: "mcq", question: "Was braucht der Kunde am Telefon?", options: ["Geld", "Einen Termin", "Eine Maschine", "Ein Fax"], correctAnswerIndex: 1 },
      { id: 5, type: "mcq", question: "Was macht die Maschine?", options: ["Musik", "Bilder", "Geräusche", "Fehler"], correctAnswerIndex: 2 },
      { id: 6, type: "mcq", question: "Was legt Maria in die Maschine?", options: ["Geld", "Papier", "Ein Buch", "Eine CD"], correctAnswerIndex: 1 },
      { id: 7, type: "mcq", question: "Was trinkt Maria in der Pause?", options: ["Kaffee", "Wasser", "Tee", "Cola"], correctAnswerIndex: 2 },
      { id: 8, type: "mcq", question: "Was liest Maria in der Pause?", options: ["Ein Buch", "Ihre E-Mail", "Einen Prospekt", "Ein Fax"], correctAnswerIndex: 1 },
      { id: 9, type: "mcq", question: "Was will der Kunde in der E-Mail?", options: ["Einen zweiten Termin", "Ein Buch", "Viel Zeit", "Ein Fax"], correctAnswerIndex: 0 },
      { id: 10, type: "mcq", question: "Wie fühlt sich Maria am Abend?", options: ["Krank", "Nervös", "Ruhig", "Traurig"], correctAnswerIndex: 2 },
    ]
  },
  {
    id: "listen_read",
    tabLabel: "2 HÖREN / LESEN",
    title: "Richtig oder Falsch?",
    questions: [
      { id: 11, type: "tf", question: "Maria arbeitet als Chef in der Praxis.", correctAnswerBool: false, tts: true },
      { id: 12, type: "tf", question: "Ein Kollege erklärt Maria viel.", correctAnswerBool: true, tts: true },
      { id: 13, type: "tf", question: "Maria schickt eine E-Mail und ein Fax.", correctAnswerBool: true, tts: true },
      { id: 14, type: "tf", question: "Der Kunde braucht keinen Termin.", correctAnswerBool: false, tts: true },
      { id: 15, type: "tf", question: "Die Maschine arbeitet sehr schnell.", correctAnswerBool: false, tts: true },
      { id: 16, type: "tf", question: "Maria ist nach einer Stunde fertig an der Maschine.", correctAnswerBool: true, tts: true },
      { id: 17, type: "tf", question: "In der Pause trinkt Maria Kaffee.", correctAnswerBool: false, tts: true },
      { id: 18, type: "tf", question: "Der Kunde in der E-Mail will einen zweiten Termin.", correctAnswerBool: true, tts: true },
      { id: 19, type: "tf", question: "Maria ist am Abend sehr nervös.", correctAnswerBool: false, tts: true },
      { id: 20, type: "tf", question: "Maria findet ihre Kollegen gut und den Chef nett.", correctAnswerBool: true, tts: true },
    ]
  },
  {
    id: "write",
    tabLabel: "3 SCHREIBEN",
    title: "Schreiben Sie kurze Sätze",
    questions: [
      { id: 21, type: "text", question: "Schreiben Sie: Machen Sie ein Praktikum?" },
      { id: 22, type: "text", question: "Schreiben Sie: Schreiben Sie oft E-Mails?" },
      { id: 23, type: "text", question: "Schreiben Sie: Trinken Sie gerne Tee in der Pause?" },
      { id: 24, type: "text", question: "Schreiben Sie: Sind Sie oft nervös?" },
      { id: 25, type: "text", question: "Schreiben Sie: Haben Sie nette Kollegen?" },
    ]
  }
];

const EXAM_SECTIONS_L14: ExamSection[] = [
  {
    id: "read",
    tabLabel: "1 LESEN",
    title: "Wählen Sie die richtige Antwort",
    questions: [
      { id: 1, type: "mcq", question: "Wohin plant Sofia eine Reise?", options: ["In die Berge", "Ins Ausland", "Nach Hause", "Ans Meer"], correctAnswerIndex: 1 },
      { id: 2, type: "mcq", question: "Wie fährt sie zum Flughafen?", options: ["Mit dem Bus", "Mit dem Taxi", "Mit dem Fahrrad", "Zu Fuss"], correctAnswerIndex: 1 },
      { id: 3, type: "mcq", question: "Wohin geht der Flug?", options: ["Nach Paris", "Nach Rom", "Nach Berlin", "Nach London"], correctAnswerIndex: 1 },
      { id: 4, type: "mcq", question: "In wie vielen Minuten ist der Abflug?", options: ["10 Minuten", "20 Minuten", "30 Minuten", "40 Minuten"], correctAnswerIndex: 2 },
      { id: 5, type: "mcq", question: "Wie lange dauert der Flug?", options: ["Eine Stunde", "Zwei Stunden", "Drei Stunden", "Vier Stunden"], correctAnswerIndex: 1 },
      { id: 6, type: "mcq", question: "Was hat Sofia im Hotel?", options: ["Ein Doppelzimmer", "Ein Einzelzimmer", "Eine Wohnung", "Ein Haus"], correctAnswerIndex: 1 },
      { id: 7, type: "mcq", question: "Was hört sie auf der Strasse?", options: ["Ein Auto", "Ein Flugzeug", "Musik", "Einen Hund"], correctAnswerIndex: 2 },
      { id: 8, type: "mcq", question: "Welches Instrument spielt die Gruppe?", options: ["Klavier", "Gitarre", "Geige", "Trommel"], correctAnswerIndex: 1 },
      { id: 9, type: "mcq", question: "Was macht Sofia auf der Strasse?", options: ["Sie tanzt", "Sie singt", "Sie isst", "Sie macht Fotos"], correctAnswerIndex: 3 },
      { id: 10, type: "mcq", question: "Wie findet Sofia das Land?", options: ["Langweilig", "Kalt", "Toll", "Schlecht"], correctAnswerIndex: 2 },
    ]
  },
  {
    id: "listen_read",
    tabLabel: "2 HÖREN / LESEN",
    title: "Richtig oder Falsch?",
    questions: [
      { id: 11, type: "tf", question: "Sofia fährt mit dem Zug zum Flughafen.", correctAnswerBool: false, tts: true },
      { id: 12, type: "tf", question: "Der Abflug nach Rom ist in dreissig Minuten.", correctAnswerBool: true, tts: true },
      { id: 13, type: "tf", question: "Sofia fliegt nach Spanien.", correctAnswerBool: false, tts: true },
      { id: 14, type: "tf", question: "Sofia nimmt am Flughafen einen Bus zum Terminal.", correctAnswerBool: true, tts: true },
      { id: 15, type: "tf", question: "Die Reise mit dem Flugzeug dauert drei Stunden.", correctAnswerBool: false, tts: true },
      { id: 16, type: "tf", question: "Sofia hat ein Doppelzimmer im Hotel.", correctAnswerBool: false, tts: true },
      { id: 17, type: "tf", question: "In der Stadt hört sie Musik.", correctAnswerBool: true, tts: true },
      { id: 18, type: "tf", question: "Eine Gruppe spielt Klavier auf der Strasse.", correctAnswerBool: false, tts: true },
      { id: 19, type: "tf", question: "Sofia macht Fotos in der Stadt.", correctAnswerBool: true, tts: true },
      { id: 20, type: "tf", question: "Am Ende des Tages ist Sofia sehr traurig.", correctAnswerBool: false, tts: true },
    ]
  },
  {
    id: "write",
    tabLabel: "3 SCHREIBEN",
    title: "Schreiben Sie kurze Sätze",
    questions: [
      { id: 21, type: "text", question: "Schreiben Sie: Fahren Sie oft mit dem Taxi?" },
      { id: 22, type: "text", question: "Schreiben Sie: Fliegen Sie gerne?" },
      { id: 23, type: "text", question: "Schreiben Sie: Buchen Sie oft ein Einzelzimmer?" },
      { id: 24, type: "text", question: "Schreiben Sie: Machen Sie im Urlaub viele Fotos?" },
      { id: 25, type: "text", question: "Schreiben Sie: Hören Sie gerne Musik auf der Strasse?" },
    ]
  }
];

const EXAM_SECTIONS_L15: ExamSection[] = [
  {
    id: "read",
    tabLabel: "1 LESEN",
    title: "Wählen Sie die richtige Antwort",
    questions: [
      { id: 1, type: "mcq", question: "Was sucht Peter?", options: ["Eine Wohnung", "Ein Auto", "Arbeit", "Ein Buch"], correctAnswerIndex: 2 },
      { id: 2, type: "mcq", question: "Wo sieht er eine Anzeige?", options: ["Im Internet", "In der Zeitung", "Im Fernsehen", "Auf der Strasse"], correctAnswerIndex: 1 },
      { id: 3, type: "mcq", question: "Womit schreibt Peter?", options: ["Mit einem Bleistift", "Mit einem Kugelschreiber", "Am Computer", "Mit Farbe"], correctAnswerIndex: 1 },
      { id: 4, type: "mcq", question: "Für wann bekommt Peter einen Termin?", options: ["Für Dienstag", "Für Mittwoch", "Für Montag", "Für Freitag"], correctAnswerIndex: 2 },
      { id: 5, type: "mcq", question: "Was bekommt Peter nach dem zweiten Gespräch?", options: ["Geld", "Die Arbeit", "Ein Auto", "Einen Brief"], correctAnswerIndex: 1 },
      { id: 6, type: "mcq", question: "Was passiert am zweiten Tag?", options: ["Peter ist krank", "Die Maschine macht einen Fehler", "Der Chef geht", "Ein Fest"], correctAnswerIndex: 1 },
      { id: 7, type: "mcq", question: "Wer bringt Werkzeug für die Reparatur?", options: ["Der Chef", "Peter", "Ein Kunde", "Ein Kollege"], correctAnswerIndex: 3 },
      { id: 8, type: "mcq", question: "Was macht Peter in der Pause?", options: ["Er schläft", "Er isst Kuchen", "Er schreibt eine Anzeige", "Er telefoniert"], correctAnswerIndex: 2 },
      { id: 9, type: "mcq", question: "Was schreibt Peter unter die Anzeige?", options: ["Seinen Namen", "Einen freundlichen Gruss", "Die Adresse", "Das Datum"], correctAnswerIndex: 1 },
      { id: 10, type: "mcq", question: "Wie findet Peter seine Kollegen am Ende?", options: ["Nett", "Langweilig", "Laut", "Böse"], correctAnswerIndex: 0 },
    ]
  },
  {
    id: "listen_read",
    tabLabel: "2 HÖREN / LESEN",
    title: "Richtig oder Falsch?",
    questions: [
      { id: 11, type: "tf", question: "Peter sucht eine neue Wohnung.", correctAnswerBool: false, tts: true },
      { id: 12, type: "tf", question: "Peter findet eine Anzeige in der Zeitung.", correctAnswerBool: true, tts: true },
      { id: 13, type: "tf", question: "Er schreibt die Antwort auf den Computer.", correctAnswerBool: false, tts: true },
      { id: 14, type: "tf", question: "Der Chef gibt ihm einen Termin für Montag.", correctAnswerBool: true, tts: true },
      { id: 15, type: "tf", question: "Am Montag kommt Peter zu spät.", correctAnswerBool: false, tts: true },
      { id: 16, type: "tf", question: "Peter bekommt die Arbeit im Verein.", correctAnswerBool: true, tts: true },
      { id: 17, type: "tf", question: "Am zweiten Tag geht die Maschine kaputt.", correctAnswerBool: true, tts: true },
      { id: 18, type: "tf", question: "Der Chef repariert die Maschine alleine.", correctAnswerBool: false, tts: true },
      { id: 19, type: "tf", question: "In der Pause liest Peter ein Buch.", correctAnswerBool: false, tts: true },
      { id: 20, type: "tf", question: "Am Abend ist Peter froh über seine Arbeit und die Kollegen.", correctAnswerBool: true, tts: true },
    ]
  },
  {
    id: "write",
    tabLabel: "3 SCHREIBEN",
    title: "Schreiben Sie kurze Sätze",
    questions: [
      { id: 21, type: "text", question: "Schreiben Sie: Suchen Sie eine Arbeit?" },
      { id: 22, type: "text", question: "Schreiben Sie: Lesen Sie oft die Zeitung?" },
      { id: 23, type: "text", question: "Schreiben Sie: Schreiben Sie gerne mit einem Kugelschreiber?" },
      { id: 24, type: "text", question: "Schreiben Sie: Sind Sie pünktlich?" },
      { id: 25, type: "text", question: "Schreiben Sie: Sind Ihre Kollegen nett?" },
    ]
  }
];

const EXAM_SECTIONS_L16: ExamSection[] = [
  {
    id: "read",
    tabLabel: "1 LESEN",
    title: "Wählen Sie die richtige Antwort",
    questions: [
      { id: 1, type: "mcq", question: "Wo arbeitet Anna?", options: ["In einer Schule", "In einer Firma", "Im Kino", "Im Restaurant"], correctAnswerIndex: 1 },
      { id: 2, type: "mcq", question: "Wie ist der Chef?", options: ["Nett", "Lustig", "Streng", "Krank"], correctAnswerIndex: 2 },
      { id: 3, type: "mcq", question: "Was will der Kunde?", options: ["Einen Kaffee", "Einen Termin", "Ein Buch", "Eine Zeitung"], correctAnswerIndex: 1 },
      { id: 4, type: "mcq", question: "Was macht die Maschine (der Drucker)?", options: ["Musik", "Fotos", "Einen Fehler", "Essen"], correctAnswerIndex: 2 },
      { id: 5, type: "mcq", question: "Wer hilft Anna mit dem Drucker?", options: ["Der Chef", "Der Kunde", "Eine Kollegin", "Ein Schüler"], correctAnswerIndex: 2 },
      { id: 6, type: "mcq", question: "Was liest Anna in der Pause?", options: ["Ein Buch", "Eine E-Mail", "Eine Zeitung", "Einen Brief"], correctAnswerIndex: 2 },
      { id: 7, type: "mcq", question: "Was sucht die Anzeige in der Zeitung?", options: ["Ein Auto", "Einen neuen Job", "Eine Wohnung", "Einen Hund"], correctAnswerIndex: 1 },
      { id: 8, type: "mcq", question: "Wem schreibt Anna eine E-Mail?", options: ["Dem Chef", "Der Kollegin", "Dem Kunden", "Ihrer Mutter"], correctAnswerIndex: 0 },
      { id: 9, type: "mcq", question: "Was ist in Annas Tasche?", options: ["Ein Buch", "Ein Kugelschreiber und Papier", "Eine Kamera", "Geld"], correctAnswerIndex: 1 },
      { id: 10, type: "mcq", question: "Was isst Anna am Abend?", options: ["Pizza", "Kuchen", "Brot mit Käse", "Nudeln"], correctAnswerIndex: 2 },
    ]
  },
  {
    id: "listen_read",
    tabLabel: "2 HÖREN / LESEN",
    title: "Richtig oder Falsch?",
    questions: [
      { id: 11, type: "tf", question: "Anna arbeitet in einem Supermarkt.", correctAnswerBool: false, tts: true },
      { id: 12, type: "tf", question: "Der Chef von Anna ist streng.", correctAnswerBool: true, tts: true },
      { id: 13, type: "tf", question: "Der Kunde am Telefon will ein Auto kaufen.", correctAnswerBool: false, tts: true },
      { id: 14, type: "tf", question: "Anna repariert den Drucker alleine.", correctAnswerBool: false, tts: true },
      { id: 15, type: "tf", question: "Die Maschine braucht neues Papier.", correctAnswerBool: true, tts: true },
      { id: 16, type: "tf", question: "In der Zeitung findet Anna eine Anzeige für einen Job.", correctAnswerBool: true, tts: true },
      { id: 17, type: "tf", question: "Anna will einen neuen Job suchen.", correctAnswerBool: false, tts: true },
      { id: 18, type: "tf", question: "Anna schreibt eine E-Mail an ihre Freundin.", correctAnswerBool: false, tts: true },
      { id: 19, type: "tf", question: "In Annas Tasche sind ein Kugelschreiber und Papier.", correctAnswerBool: true, tts: true },
      { id: 20, type: "tf", question: "Am Abend isst Anna Pizza.", correctAnswerBool: false, tts: true },
    ]
  },
  {
    id: "write",
    tabLabel: "3 SCHREIBEN",
    title: "Schreiben Sie kurze Sätze",
    questions: [
      { id: 21, type: "text", question: "Schreiben Sie: Arbeiten Sie in einer Firma?" },
      { id: 22, type: "text", question: "Schreiben Sie: Ist Ihr Chef streng?" },
      { id: 23, type: "text", question: "Schreiben Sie: Lesen Sie oft die Zeitung?" },
      { id: 24, type: "text", question: "Schreiben Sie: Schreiben Sie viele E-Mails?" },
      { id: 25, type: "text", question: "Schreiben Sie: Essen Sie gerne Brot mit Käse?" },
    ]
  }
];

export default function PruefungTab({ lesson }: { lesson?: Lesson }) {
  const isLektion2 = lesson?.id === 'lektion_2';
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
  
  const isLektionGerman = isLektion2 || isLektion3 || isLektion4 || isLektion5 || isLektion6 || isLektion7 || isLektion8 || isLektion9 || isLektion10 || isLektion11 || isLektion12 || isLektion13 || isLektion14 || isLektion15 || isLektion16;
  
  const EXAM_SECTIONS = isLektion16 ? EXAM_SECTIONS_L16
    : isLektion15 ? EXAM_SECTIONS_L15
    : isLektion14 ? EXAM_SECTIONS_L14
    : isLektion13 ? EXAM_SECTIONS_L13
    : isLektion12 ? EXAM_SECTIONS_L12
    : isLektion11 ? EXAM_SECTIONS_L11
    : isLektion10 ? EXAM_SECTIONS_L10
    : isLektion9 ? EXAM_SECTIONS_L9
    : isLektion8 ? EXAM_SECTIONS_L8
    : isLektion7 ? EXAM_SECTIONS_L7
    : isLektion6 ? EXAM_SECTIONS_L6
    : isLektion5 ? EXAM_SECTIONS_L5
    : isLektion4 ? EXAM_SECTIONS_L4
    : isLektion3 ? EXAM_SECTIONS_L3
    : isLektion2 ? EXAM_SECTIONS_L2
    : EXAM_SECTIONS_L1;

  const [examStarted, setExamStarted] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number | boolean | string>>({});
  const [showResults, setShowResults] = useState(false);

  const currentSection = EXAM_SECTIONS[currentSectionIndex];
  const currentQuestion = currentSection.questions[currentQuestionIndex];

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (firstName.trim() && lastName.trim()) {
      setExamStarted(true);
    }
  };

  const handleAnswer = (answer: number | boolean | string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answer,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < currentSection.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else if (currentSectionIndex < EXAM_SECTIONS.length - 1) {
      setCurrentSectionIndex((prev) => prev + 1);
      setCurrentQuestionIndex(0);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    } else if (currentSectionIndex > 0) {
      setCurrentSectionIndex((prev) => prev - 1);
      setCurrentQuestionIndex(EXAM_SECTIONS[currentSectionIndex - 1].questions.length - 1);
    }
  };

  const resetExam = () => {
    setExamStarted(false);
    setFirstName("");
    setLastName("");
    setAnswers({});
    setCurrentSectionIndex(0);
    setCurrentQuestionIndex(0);
    setShowResults(false);
  };

  const restartFromQuestions = () => {
    setAnswers({});
    setCurrentSectionIndex(0);
    setCurrentQuestionIndex(0);
    setShowResults(false);
  };

  const playTTS = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "de-DE"; // Most content is German, some is English. Browser will do its best.
      window.speechSynthesis.speak(utterance);
    }
  };

  // 1. START SCREEN
  if (!examStarted) {
    return (
      <div className="flex flex-col items-center justify-center pt-8 pb-16">
        <div className="bg-white border border-gray-200 p-8 md:p-12 rounded-2xl shadow-sm w-full max-w-xl">
          <h2 className="text-3xl font-bold text-center text-black mb-2">
            {isLektionGerman ? "Lektionsprüfung" : "Lesson test"}
          </h2>
          <p className="text-gray-500 text-center mb-10 font-medium">
            {isLektion16 ? "Lektion 16 - Vokabular" : (isLektion15 ? "Lektion 15 - Vergangenheit" : (isLektion14 ? "Lektion 14 - Zeit" : (isLektion13 ? "Lektion 13 - Trennbare Verben" : (isLektion12 ? "Lektion 12 - Adjektive" : (isLektion11 ? "Lektion 11 - Negation" : (isLektion10 ? "Lektion 10 - Fragen" : (isLektion9 ? "Lektion 9 - Präpositionen" : (isLektion8 ? "Lektion 8 - Satzbau" : (isLektion7 ? "Lektion 7 - Modalverben (Super Sieben)" : (isLektion6 ? "Lektion 6 - Verben" : (isLektion5 ? "Lektion 5 - Artikel und Demonstrativpronomen" : (isLektion4 ? "Lektion 4 - Pronomen" : (isLektion3 ? "Lektion 3 - Nomen, Geschlecht, Plural" : (isLektion2 ? "Lektion 2 - Zahlen" : "Lesson 1 - Introducing yourself"))))))))))))))}
          </p>

          <form onSubmit={handleStart} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">
                {isLektionGerman ? "Vorname" : "First name"}
              </label>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder={isLektionGerman ? "Geben Sie Ihren Vornamen ein" : "Enter your first name"}
                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#000000] focus:border-transparent transition-all font-medium"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">
                {isLektionGerman ? "Nachname" : "Last name"}
              </label>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder={isLektionGerman ? "Geben Sie Ihren Nachnamen ein" : "Enter your last name"}
                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#000000] focus:border-transparent transition-all font-medium"
              />
            </div>
            <button
              type="submit"
              disabled={!firstName.trim() || !lastName.trim()}
              className="w-full py-4 mt-4 bg-[#e5e7eb] text-black font-bold text-lg rounded-xl hover:bg-[#d1d5db] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              {isLektionGerman ? "Prüfung starten" : "Start exam"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 3. RESULTS SCREEN
  if (showResults) {
    const totalQuestions = EXAM_SECTIONS.reduce((acc, sec) => acc + sec.questions.length, 0);
    const score = EXAM_SECTIONS.reduce((total, sec) => {
      return total + sec.questions.reduce((secTotal, q) => {
        if (q.type === 'mcq') return secTotal + (answers[q.id] === q.correctAnswerIndex ? 1 : 0);
        if (q.type === 'tf') return secTotal + (answers[q.id] === q.correctAnswerBool ? 1 : 0);
        if (q.type === 'number') return secTotal + (parseInt(answers[q.id] as string, 10) === q.correctAnswerNumber ? 1 : 0);
        if (q.type === 'text') {
          const textAns = answers[q.id] as string;
          return secTotal + (textAns && textAns.trim().length > 0 ? 1 : 0);
        }
        return secTotal;
      }, 0);
    }, 0);

    return (
      <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-xl border border-gray-100 min-h-[400px]">
        <p className="text-lg text-gray-600 mb-6 font-medium">
          Name: <span className="text-black font-bold">{firstName} {lastName}</span>
        </p>
        <div className="text-xl text-black font-bold mb-2">
          Ergebnis: {score} / {totalQuestions}
        </div>
        <div className="text-4xl font-black text-black mb-8">
          {Math.round((score / totalQuestions) * 100)}%
        </div>
        
        <div className="flex gap-4">
          <button
            onClick={restartFromQuestions}
            className="px-8 py-3 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-all shadow-sm"
          >
            Start anew
          </button>
        </div>
      </div>
    );
  }

  // 2. EXAM FLOW
  return (
    <div className="flex flex-col h-full min-h-[500px] max-w-4xl mx-auto pt-4">
      {/* Exam Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-black mb-1">
          {isLektionGerman ? "Lektionsprüfung" : "Lesson test"}
        </h2>
        <p className="text-gray-500 font-medium mb-6">
          {isLektion16 ? "Lektion 16 - Vokabular" : (isLektion15 ? "Lektion 15 - Vergangenheit" : (isLektion14 ? "Lektion 14 - Zeit" : (isLektion13 ? "Lektion 13 - Trennbare Verben" : (isLektion12 ? "Lektion 12 - Adjektive" : (isLektion11 ? "Lektion 11 - Negation" : (isLektion10 ? "Lektion 10 - Fragen" : (isLektion9 ? "Lektion 9 - Präpositionen" : (isLektion8 ? "Lektion 8 - Satzbau" : (isLektion7 ? "Lektion 7 - Modalverben (Super Sieben)" : (isLektion6 ? "Lektion 6 - Verben" : (isLektion5 ? "Lektion 5 - Artikel und Demonstrativpronomen" : (isLektion4 ? "Lektion 4 - Pronomen" : (isLektion3 ? "Lektion 3 - Nomen, Geschlecht, Plural" : (isLektion2 ? "Lektion 2 - Zahlen" : "Lesson 1 - Introducing yourself"))))))))))))))}
        </p>
        
        {/* Exam Section Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200 pb-4">
          {EXAM_SECTIONS.map((sec, idx) => (
            <span key={sec.id} className={`px-4 py-2 text-sm font-bold rounded-md ${currentSectionIndex === idx ? "bg-[#000000] text-white" : "bg-gray-100 text-gray-400"}`}>
              {sec.tabLabel}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col mb-4">
        <span className="text-[#000000] font-bold text-lg uppercase tracking-wider mb-2">
          {isLektionGerman ? `Frage ${currentQuestionIndex + 1} von ${currentSection.questions.length}` : `Question ${currentQuestionIndex + 1} of ${currentSection.questions.length}`}
        </span>
        <span className="text-gray-700 font-bold text-xl">
          {currentSection.title}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2.5 bg-gray-100 rounded-full mb-8 overflow-hidden">
        <div 
          className="h-full bg-[#000000] transition-all duration-300"
          style={{ width: `${((currentQuestionIndex) / currentSection.questions.length) * 100}%` }}
        ></div>
      </div>

      {/* Question */}
      {currentQuestion.type !== "number" && (
        <div className="mb-8">
          <div className="flex items-center gap-4">
            <h3 className="text-2xl md:text-3xl font-bold text-black leading-snug">
              {currentQuestion.question}
            </h3>
            {currentQuestion.tts && (
              <button 
                onClick={() => playTTS(currentQuestion.question)}
                className="flex-shrink-0 w-10 h-10 bg-[#000000] text-white rounded-full flex items-center justify-center hover:bg-[#333333] transition-colors shadow-md"
              >
                <svg className="w-5 h-5 ml-1" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                </svg>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Options */}
      {currentQuestion.type === "mcq" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {currentQuestion.options?.map((option, index) => {
            const isSelected = answers[currentQuestion.id] === index;
            return (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className={`py-5 px-6 rounded-xl font-bold text-lg text-left transition-all border-2 ${
                  isSelected
                    ? "bg-[#e5e7eb] text-black border-[#e5e7eb] shadow-md scale-[1.02]"
                    : "bg-gray-50 text-black border-gray-200 hover:bg-white hover:border-gray-400"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      )}

      {currentQuestion.type === "tf" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          <button
            onClick={() => handleAnswer(true)}
            className={`py-5 px-6 rounded-xl font-bold text-lg text-center transition-all border-2 ${
              answers[currentQuestion.id] === true
                ? "bg-[#000000] text-white border-[#000000] shadow-md scale-[1.02]"
                : "bg-gray-50 text-black border-gray-200 hover:bg-gray-100"
            }`}
          >
            {isLektionGerman ? "Richtig" : "Correct"}
          </button>
          <button
            onClick={() => handleAnswer(false)}
            className={`py-5 px-6 rounded-xl font-bold text-lg text-center transition-all border-2 ${
              answers[currentQuestion.id] === false
                ? "bg-red-600 text-white border-red-600 shadow-md scale-[1.02]"
                : "bg-gray-50 text-black border-gray-200 hover:bg-red-50"
            }`}
          >
            {isLektionGerman ? "Falsch" : "Incorrect"}
          </button>
        </div>
      )}

      {currentQuestion.type === "text" && (
        <div className="mb-10 w-full">
          <textarea
            value={(answers[currentQuestion.id] as string) || ""}
            onChange={(e) => handleAnswer(e.target.value)}
            placeholder={isLektionGerman ? "Ihre Antwort hier eingeben..." : "Enter your answer here..."}
            className="w-full h-40 p-5 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#000000] focus:border-transparent transition-all font-medium resize-none shadow-sm text-lg"
          ></textarea>
        </div>
      )}

      {currentQuestion.type === "number" && (
        <div className="bg-gray-50 border border-gray-200 p-8 md:p-12 rounded-2xl flex flex-col items-center justify-center mb-8 shadow-sm flex-grow w-full">
          <p className="text-gray-500 mb-6 font-medium text-center">
            {isLektion2 ? "Schreiben Sie diese Zahl als Nummer:" : "Write this number as digits:"}
          </p>
          <h3 className="text-3xl md:text-4xl font-bold text-center text-[#000000] leading-snug tracking-tight mb-8">
            {currentQuestion.question}
          </h3>
          <div className="w-full max-w-sm flex flex-col items-center">
            <label className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">
              {isLektion2 ? "Ihre Antwort (nur Ziffern):" : "Your answer (digits only):"}
            </label>
            <input
              type="number"
              value={(answers[currentQuestion.id] as string) || ""}
              onChange={(e) => handleAnswer(e.target.value)}
              placeholder="z.B. 27"
              className="w-full text-center text-2xl p-4 border-2 rounded-xl focus:outline-none transition-colors shadow-sm bg-white border-gray-300 focus:border-[#000000]"
              autoFocus
            />
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center pt-6 border-t border-gray-100 mt-auto">
        <button
          onClick={handlePrevious}
          disabled={currentSectionIndex === 0 && currentQuestionIndex === 0}
          className={`px-6 py-3 rounded-xl font-bold transition-all ${
            currentSectionIndex === 0 && currentQuestionIndex === 0
              ? 'opacity-0 pointer-events-none' 
              : 'bg-white border-2 border-gray-200 text-black hover:bg-gray-50 shadow-sm'
          }`}
        >
          {isLektionGerman ? "Zurück" : "Back"}
        </button>
        
        <div className="flex gap-4">
          <button
            onClick={restartFromQuestions}
            className="hidden sm:block px-6 py-3 bg-white border-2 border-gray-200 text-black font-bold rounded-xl hover:bg-gray-50 transition-all shadow-sm"
          >
            {isLektionGerman ? "Neu starten" : "Start anew"}
          </button>
          <button
            onClick={handleNext}
            disabled={
              answers[currentQuestion.id] === undefined || 
              (currentQuestion.type === 'text' && ((answers[currentQuestion.id] as string) || '').trim().length === 0) ||
              (currentQuestion.type === 'number' && ((answers[currentQuestion.id] as string) || '').trim().length === 0)
            }
            className={`px-8 py-3 rounded-xl font-bold transition-all shadow-sm ${
              answers[currentQuestion.id] === undefined || 
              (currentQuestion.type === 'text' && ((answers[currentQuestion.id] as string) || '').trim().length === 0) ||
              (currentQuestion.type === 'number' && ((answers[currentQuestion.id] as string) || '').trim().length === 0)
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            {(currentSectionIndex === EXAM_SECTIONS.length - 1 && currentQuestionIndex === currentSection.questions.length - 1) ? (isLektionGerman ? "Abschliessen" : "Finish") : (isLektionGerman ? "Weiter" : "Further")}
          </button>
        </div>
      </div>
    </div>
  );
}
