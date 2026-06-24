export interface NomenItem {
  id: number;
  singular: string;
  plural: string;
  english: string;
}

export interface Lesson {
  id: string;
  title: string;
  topics: {
    id: string;
    title: string;
    content: string;
    nomenIds?: number[];
  }[];
  nomenList?: NomenItem[];
}

export const LESSON_1: Lesson = {
  id: 'lektion_1',
  title: 'Lektion 1 - Sich vorstellen',
  topics: [
    {
      id: 'hallo_schweiz',
      title: 'Hallo Schweiz',
      nomenIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
      content: `Ich bin Maria. Ich bin neu in Schweiz. Ich wohne in Bern. Meine **Heimat** ist Portugal. Ich habe **Hund**. Er heisst Max und ist lustig. Ich gehe mit ihm in Park. Ich sehe viele Kinder. Einige spielen, andere fahren Fahrrad. Ein **Baby** schläft im Wagen. Ich will Freunde finden. Ich bin Erwachsen und kann arbeiten. Ich habe **Ausweis** und er ist neu. Ich will Arbeit suchen. Mein Nachbar heisst **Herr** Müller. Er wohnt neben mir und hilft oft. Ich bin dankbar und froh. Meine **Mutter** und mein **Vater** wohnen in Lissabon. Ich habe gute Eltern. Ich mache **Anruf** an meine **Mutter**. Ich habe Schwester und sie heisst Sofia. Wir sind **Jugendliche**. Sie will mich besuchen. Ich freue mich. Meine Nachbarin ist meine **Bekannte** und sie ist eine **Ehefrau**. Ihre Familie ist freundlich. Ihr Ehemann arbeitet in Bank. Ich war bei ihrer **Hochzeit**. Feier war schön. Ich habe getanzt, gegessen und Fotos gemacht. Ich war mit meinem Bruder und seiner **Partnerin** da. Wir wohnen alle zusammen. Mein Partner ist auch sehr nett. Ich gehe oft spazieren. Ich sehe Fluss in Bern. Fluss ist ruhig und schön. Ich denke an meine **Heimat**, aber ich will jetzt Schweiz kennenlernen. Ich höre viel Deutsch. Ich will jeden Tag Deutsch sprechen. Saddeea Gill ist meine Lehrerin. Sie sagt: "Leichte Sprache ist super einfach." Sie spricht Deutsch mit mir. Ich kann schnell lernen. Ich bin zufrieden in Schweiz.`
    },
    {
      id: 't_wie_tee',
      title: 'T wie Tee',
      nomenIds: [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32],
      content: 'Ich lerne Buchstaben. Meine **Freundin** Lisa hilft mir. Lisa ist meine beste **Freundin**. Wir trinken Tee zusammen. Tee ist warm. Wir sitzen am Tisch. Mein **Bruder** Pedro ist lustig. Er will auch Deutsch lernen. Wir sagen A, B, C. Ich kann Buchstaben schreiben. Mein Vorname ist Maria. Mein **Familienname** ist Silva. Ich habe eine **Oma** und einen **Opa**. Meine Grosseltern wohnen in Portugal. Ich schreibe ihnen Briefe. Lisa hat einen Sohn. Ihr Sohn ist klein. Er spielt mit Ball. Eine **Dame** und ein **Mann** wohnen nebenan. Sie sind **Grossmutter** und **Grossvater**. Sie sind sehr nett. Ich kenne ein **Mädchen**. Sie heisst Anna. Anna ist eine Jugendliche und sie sagt **Dank** an ihre Grosseltern. Buchstaben machen uns Spass. Ich will mehr üben. Wir können jeden Tag lernen. Ich bin froh und ich kann bald Deutsch sprechen. Leichte Sprache ist toll. Ich bin eine **Hausfrau**, aber ich will arbeiten. Mein Partner ist **Hausmann**. Wir wollen zusammen lernen und leben.'
    },
    {
      id: 'zahl_mit_ball',
      title: 'Zahl mit Ball',
      nomenIds: [4, 18, 21, 23, 24, 25, 11, 33, 13, 27, 14, 32],
      content: 'Ich bin neu in Schweiz. Ich will sprechen, hören und lernen. Ich gehe oft raus und schaue Leute. Heute gehe ich zu einem Platz mit vielen Kindern. Zwei Jungen spielen mit einem Ball. Sie rufen laut: eins, zwei, drei. Dann vier, fünf, sechs. Ich höre zu. Ich spreche die Zahlen leise mit. Ich lache. Ich bin froh. Ich will so lernen. Ich sehe auch ein **Mädchen**. Es steht bei einer **Mutter**. Die **Mutter** trägt ein Baby. Das Baby schläft. Ich gehe langsam weiter. Ich sehe einen alten **Grossvater**. Er redet mit einer **Grossmutter**. Beide sitzen ruhig. Ich nicke höflich. Ich höre, wie sie leise sprechen. Ich finde das schön. Ich sehe eine **Hausfrau**, die ich schon kenne. Sie ist meine **Bekannte**. Wir sprechen langsam. Ich sage meinen Vornamen, sie sagt ihren Familiennamen. Ich sage Danke. Dann gehe ich weiter. Ich mache einen Anruf. Ich rufe meinen **Bruder** an. Ich sage: "Ich bin draussen." Ich sehe Kinder mit Ball. Sie zählen laut. Ich spreche mit. Ich lerne Deutsch. Mein **Bruder** sagt: "gut gemacht". Ich höre gern seine Stimme. Ich sehe einen **Hund**. Er läuft mit einem **Mädchen**. Der **Hund** bleibt kurz stehen. Ich streichle ihn. Er ist freundlich. Ich denke, ich bin erwachsen. Ich kann überall lernen. Ich muss nur offen sein. Lernen ist überall möglich. Ich bin stolz. Ich gehe nach Hause. Ich schreibe eine kleine Liste. Ich will Wörter wiederholen. Ich freue mich auf den nächsten Tag. Ich will wieder Menschen sehen. Ich will wieder lernen. Ich will sprechen und verstehen.'
    }
  ],
  nomenList: [
    { id: 1, singular: 'Anruf', plural: 'Anrufe', english: 'phone call' },
    { id: 2, singular: 'Ausweis', plural: 'Ausweise', english: 'ID card' },
    { id: 3, singular: 'Baby', plural: 'Babys', english: 'baby' },
    { id: 4, singular: 'Bekannte', plural: 'Bekannten', english: 'acquaintance (female)' },
    { id: 5, singular: 'Ehefrau', plural: 'Ehefrauen', english: 'wife' },
    { id: 6, singular: 'Ehemann', plural: 'Ehemänner', english: 'husband' },
    { id: 7, singular: 'Erwachsene', plural: 'Erwachsenen', english: 'adult' },
    { id: 8, singular: 'Heimat', plural: '-', english: 'homeland' },
    { id: 9, singular: 'Herr', plural: 'Herren', english: 'mister/gentleman' },
    { id: 10, singular: 'Hochzeit', plural: 'Hochzeiten', english: 'wedding' },
    { id: 11, singular: 'Hund', plural: 'Hunde', english: 'dog' },
    { id: 12, singular: 'Jugendliche', plural: 'Jugendlichen', english: 'teenager' },
    { id: 13, singular: 'Kind', plural: 'Kinder', english: 'child' },
    { id: 14, singular: 'Mutter', plural: 'Mütter', english: 'mother' },
    { id: 15, singular: 'Partner', plural: 'Partner', english: 'partner (male)' },
    { id: 16, singular: 'Partnerin', plural: 'Partnerinnen', english: 'partner (female)' },
    { id: 17, singular: 'Vater', plural: 'Väter', english: 'father' },
    { id: 18, singular: 'Bruder', plural: 'Brüder', english: 'brother' },
    { id: 19, singular: 'Dame', plural: 'Damen', english: 'lady' },
    { id: 20, singular: 'Dank', plural: '-', english: 'thanks' },
    { id: 21, singular: 'Familienname', plural: 'Familiennamen', english: 'last name' },
    { id: 22, singular: 'Freundin', plural: 'Freundinnen', english: 'friend (female)' },
    { id: 23, singular: 'Grossmutter', plural: 'Grossmütter', english: 'grandmother' },
    { id: 24, singular: 'Grossvater', plural: 'Grossväter', english: 'grandfather' },
    { id: 25, singular: 'Hausfrau', plural: 'Hausfrauen', english: 'housewife' },
    { id: 26, singular: 'Hausmann', plural: 'Hausmänner', english: 'househusband' },
    { id: 27, singular: 'Mädchen', plural: 'Mädchen', english: 'girl' },
    { id: 28, singular: 'Mann', plural: 'Männer', english: 'man' },
    { id: 29, singular: 'Oma', plural: 'Omas', english: 'grandmother' },
    { id: 30, singular: 'Opa', plural: 'Opas', english: 'grandfather' },
    { id: 31, singular: 'Sohn', plural: 'Söhne', english: 'son' },
    { id: 32, singular: 'Vorname', plural: 'Vornamen', english: 'first name' },
    { id: 33, singular: 'Junge', plural: 'Jungen', english: 'boy' }
  ]
};

export const LESSON_2: Lesson = {
  id: 'lektion_2',
  title: 'Lektion 2 - Zahlen',
  topics: [
    {
      id: 'schoggi_schweiz',
      title: 'Schoggi & Schweiz',
      nomenIds: [2, 3, 6, 8, 10, 11, 13, 18, 19, 22, 23, 24, 29, 33, 42],
      content: 'Ich bin in Schweiz. Ich liebe Schokolade. Heute esse ich eine neue Sorte. Mein Freund Hans hilft. Wir gehen zusammen zum Café. Dort ist es gemütlich. Ich sitze am Tisch. Ich trinke **Kaffee**. Die Süssigkeit schmeckt gut. Ich will mehr kaufen. Hans ist lustig. Er kann viel essen. Ich habe **Hunger**. Die Süsse macht mich glücklich. Ich will lachen. Ich habe **Appetit**. Ich will **Kuchen** essen. Hans mag auch **Kuchen**. Ich probiere ein Stück. Ich liebe **Milch**. Ich bestelle ein Glas. Hans nimmt **Bier**. Wir trinken zusammen. Wir haben **Durst**. Ich sehe Saft. Ich teile das **Getränk** mit Hans. Ich esse das **Brot**. Die Grossmutter backt oft zu Hause. Ich finde das lecker. Menschen essen **Gemüse**. Ich nehme auch etwas. Meine Schwester isst Bananen. Ich schicke drei Äpfel nach Portugal. Meine Mutter freut sich. Wir feiern zusammen. Wir essen **Schinken**. Hans lacht laut. Ich höre Musik. Ich bin fröhlich. Ich lerne Deutsch. Ich kann schnell lernen. Meine **Woche** ist schön. Ich will morgen wiederkommen. Leichte Sprache hilft mir. Ich bin in Schweiz zufrieden.'
    },
    {
      id: 'berg_bett',
      title: 'Berg & Bett',
      nomenIds: [1, 5, 4, 7, 9, 12, 14, 15, 16, 17, 20, 21, 25, 26, 27, 28, 30, 31, 32, 35, 34, 36, 37, 38, 39, 40, 41, 43],
      content: 'Ich wohne jetzt in Schweiz. Ich bin neu hier. Ich habe ein **Apartment** in **Dorf**. Meine Schwester hat zwei Apartments im Heimatland. Aber meine Mutter hat drei Häuser. Balkon in mein **Apartment** ist gross. Ich sehe sechs Berge und Wald. Ich finde Natur schön. Im **Haus** gibt es vier Wohnungen. Mein **Eingang** ist bei **Strasse** und **Strasse** ist laut. Hinter **Haus** sind zwei Gärten. Ich höre drei Autos. Neben **Eingang** ist Aufzug. Ich kann Aufzug nehmen, aber ich will **Treppe** laufen. Treppe ist lang. Ich wohne im dritten **Stock**. Ich muss oft Stöcke zählen. Mein **Raum** ist gross. Ich habe **Licht** im **Raum**. Neben **Raum** ist **Bad**. Im **Bad** ist **Toilette**, und **Toilette** ist neu. Dusche ist klein, aber ich kann gut duschen. Im **Bad** ist auch **Ecke** mit zwei Schränke. Schränke sind grün und gross. Ich lege Handtuch in **Schrank**. **Bett** steht in Mitte vom **Raum**. **Bett** ist weich. Ich schlafe gut. Neben **Bett** ist **Tisch**. Auf **Tisch** liegen drei **Schlüssel**. Ohne **Schlüssel** kann ich nicht raus. Auf Wand hängt **Bild** und **Bild** zeigt See und Berge. Ich liebe das **Bild**. In Küche habe ich **Herd** und **Kühlschrank**. Kühlschrank ist leer. Ich will Suppe kochen. Ich brauche Gemüse. Herd ist alt, aber ich kann gut kochen. Miete ist hoch, aber ich will bleiben. Ich finde **Wohnung** super. Ich will **Ordnung** machen. Möbel sind schön. Ich habe zwei Tische. Tische sind alt. Ich will Farbe kaufen. Ich will Wand bunt machen. Mein **Leben** ist ruhig hier. Ich finde Ruhe gut.'
    }
  ],
  nomenList: [
    { id: 1, singular: 'Apartment', plural: 'Apartments', english: 'apartment' },
    { id: 2, singular: 'Apfel', plural: 'Äpfel', english: 'apple' },
    { id: 3, singular: 'Appetit', plural: '-', english: 'appetite' },
    { id: 4, singular: 'Bad', plural: 'Bäder', english: 'bathroom' },
    { id: 5, singular: 'Balkon', plural: 'Balkone', english: 'balcony' },
    { id: 6, singular: 'Banane', plural: 'Bananen', english: 'banana' },
    { id: 7, singular: 'Bett', plural: 'Betten', english: 'bed' },
    { id: 8, singular: 'Bier', plural: 'Biere', english: 'beer' },
    { id: 9, singular: 'Bild', plural: 'Bilder', english: 'picture' },
    { id: 10, singular: 'Brot', plural: 'Brote', english: 'bread' },
    { id: 11, singular: 'Café', plural: 'Cafés', english: 'cafe' },
    { id: 12, singular: 'Dorf', plural: 'Dörfer', english: 'village' },
    { id: 13, singular: 'Durst', plural: '-', english: 'thirst' },
    { id: 14, singular: 'Dusche', plural: 'Duschen', english: 'shower' },
    { id: 15, singular: 'Ecke', plural: 'Ecken', english: 'corner' },
    { id: 16, singular: 'Eingang', plural: 'Eingänge', english: 'entrance' },
    { id: 17, singular: 'Garten', plural: 'Gärten', english: 'garden' },
    { id: 18, singular: 'Gemüse', plural: '-', english: 'vegetables' },
    { id: 19, singular: 'Getränk', plural: 'Getränke', english: 'drink/beverage' },
    { id: 20, singular: 'Haus', plural: 'Häuser', english: 'house' },
    { id: 21, singular: 'Herd', plural: 'Herde', english: 'stove' },
    { id: 22, singular: 'Hunger', plural: '-', english: 'hunger' },
    { id: 23, singular: 'Kaffee', plural: 'Kaffees', english: 'coffee' },
    { id: 24, singular: 'Kuchen', plural: 'Kuchen', english: 'cake' },
    { id: 25, singular: 'Kühlschrank', plural: 'Kühlschränke', english: 'refrigerator' },
    { id: 26, singular: 'Leben', plural: '-', english: 'life' },
    { id: 27, singular: 'Licht', plural: 'Lichter', english: 'light' },
    { id: 28, singular: 'Miete', plural: 'Mieten', english: 'rent' },
    { id: 29, singular: 'Milch', plural: '-', english: 'milk' },
    { id: 30, singular: 'Möbel', plural: 'Möbel', english: 'furniture' },
    { id: 31, singular: 'Ordnung', plural: '-', english: 'order' },
    { id: 32, singular: 'Raum', plural: 'Räume', english: 'room' },
    { id: 33, singular: 'Schinken', plural: '-', english: 'ham' },
    { id: 34, singular: 'Schlüssel', plural: 'Schlüssel', english: 'key' },
    { id: 35, singular: 'Schrank', plural: 'Schränke', english: 'cabinet' },
    { id: 36, singular: 'Stock', plural: 'Stockwerke', english: 'floor/story' },
    { id: 37, singular: 'Strasse', plural: 'Strassen', english: 'street' },
    { id: 38, singular: 'Tisch', plural: 'Tische', english: 'table' },
    { id: 39, singular: 'Toilette', plural: 'Toiletten', english: 'toilet' },
    { id: 40, singular: 'Treppe', plural: 'Treppen', english: 'stairs' },
    { id: 41, singular: 'Tür', plural: 'Türen', english: 'door' },
    { id: 42, singular: 'Woche', plural: 'Wochen', english: 'week' },
    { id: 43, singular: 'Wohnung', plural: 'Wohnungen', english: 'apartment' }
  ]
};

export const LESSON_3: Lesson = {
  id: "lektion_3",
  title: "Lektion 3 - Nomen, Geschlecht, Plural",
  topics: [
    {
      id: "schoen_gruen",
      title: "Schön & grün",
      nomenIds: [3, 5, 7, 8, 1, 2, 4, 6, 9],
      content: "Tim wacht am **Morgen** auf. Die **Sonne** scheint. Der **Wind** weht leicht. Es ist **Winter**, aber die Luft ist klar. Tim zieht seine Jacke an und geht hinaus. Vor dem Haus steht ein grosser **Baum**. Der **Baum** ist ohne Blätter. Neben dem **Baum** wächst eine kleine **Blume**. Tim staunt. Er sagt: „Die **Blume** lebt im **Winter**.\" Dann geht Tim zum **See**. Das **Wasser** ist kalt. Der **Wind** bewegt das **Wasser**. Kleine Wellen kommen zum Ufer. Tim setzt sich hin und schaut auf den **See**. Er denkt: „Ich habe Ruhe. Ich habe Zeit.\" Er lächelt. Tim denkt an seine **Woche**. Am Montag geht er in die Stadt. Am Dienstag besucht er Freunde. Am Mittwoch schreibt er Briefe. Am Donnerstag kocht er Suppe. Am Freitag liest er ein Buch. Am Samstag macht er Sport. Am Sonntag geht er wieder zum **See**. Dort sieht er den **Baum**, die **Blume**, die **Sonne** und hört den **Wind**. Er fühlt das **Wasser** mit der Hand. Tim sagt: „Ich habe den **Winter**. Ich habe den **Morgen**. Ich habe den **See**. Ich habe die **Woche**. Ich bin zufrieden.\"",
    },
    {
      id: "wollen_chillen",
      title: "Wollen chillen",
      nomenIds: [3, 5, 7, 8, 1, 2, 4, 6, 9],
      content: "Mia wacht am **Morgen** auf. Die **Sonne** scheint hell. Der **Wind** kommt durch das Fenster. Es ist **Winter**, aber Mia hat warme Decken. Sie steht auf und geht in den Garten. Dort sieht sie einen grossen **Baum**. Der **Baum** ist still. Neben dem **Baum** liegt eine kleine **Blume**. Die **Blume** ist bunt, auch im **Winter**. Mia freut sich.\n\nDann läuft sie weiter zum **See**. Das **Wasser** im **See** ist klar. Der **Wind** macht kleine Wellen. Die **Sonne** spiegelt sich im **Wasser**. Mia setzt sich auf eine Bank und schaut lange. Sie denkt: „Ich habe den **Morgen**. Ich habe die **Sonne**. Ich habe den **Wind**.\" Sie lächelt.\n\nMia denkt an ihre **Woche**. Am Montag hat sie Arbeit. Am Dienstag besucht sie ihre Mutter. Am Mittwoch hat sie Sport. Am Donnerstag spielt sie Musik. Am Freitag kocht sie. Am Samstag liest sie ein Buch. Am Sonntag geht sie wieder zum **See**. Dort sieht sie den **Baum**, die **Blume** und das **Wasser**. Sie atmet tief. Sie denkt: „Ich habe den **Winter**. Ich habe eine gute **Woche**. Ich bin glücklich.\"",
    }
  ],
  nomenList: [
    { id: 1, singular: "Baum", plural: "Bäume", english: "tree" },
    { id: 2, singular: "Blume", plural: "Blumen", english: "flower" },
    { id: 3, singular: "Morgen", plural: "Morgen", english: "morning" },
    { id: 4, singular: "See", plural: "Seen", english: "lake" },
    { id: 5, singular: "Sonne", plural: "Sonnen", english: "sun" },
    { id: 6, singular: "Wasser", plural: "Wasser", english: "water" },
    { id: 7, singular: "Wind", plural: "Winde", english: "wind" },
    { id: 8, singular: "Winter", plural: "Winter", english: "winter" },
    { id: 9, singular: "Woche", plural: "Wochen", english: "week" },
  ]
};

export const LESSON_4: Lesson = {
  id: "lektion_4",
  title: "Lektion 4 - Pronomen",
  topics: [
    {
      id: "glueckwunsch",
      title: "Glückwunsch!",
      content: "Anna lebt mit ihrer **Mutter**. Sie spricht eine neue **Sprache**. Jeden Tag geht sie in die **Schule**. Dort besucht sie einen **Kurs**. In der **Klasse** sind viele **Schüler**. Die **Lehrerin** gibt eine **Aufgabe**. Anna nimmt den **Bleistift** und schreibt auf den **Bogen**. Sie liest im **Buch**. Sie schreibt einen **Satz**. Die **Lehrerin** zeigt ein **Beispiel**. Das **Thema** ist Reisen. Am Ende gibt es eine **Hausaufgabe**. Eine andere **Schülerin** sagt: „Das **Thema** ist leicht.\" Am Morgen hat Anna ein kleines **Problem**. Ein **Buchstabe** ist falsch. Sie macht einen **Fehler**. Doch die **Lehrerin** gibt eine **Lösung**. Danach ist **Pause**. Alle singen ein **Lied**. Später lesen sie einen **Text**. Dann kommt ein **Test**. Kurz darauf folgt eine **Prüfung**. Anna ist nervös. Sie spürt **Fieber**. Sie geht zum **Arzt**. Der **Doktor** gibt eine **Entschuldigung** für den **Unterricht**. Nach drei Tagen ist sie gesund. Sie schreibt die **Prüfung**. Das Ergebnis ist gut. Die **Lehrerin** macht eine **Aussage**: „**Glückwunsch**.\" Anna lacht. Am Abend sagt die **Mutter**: „Du bist fleissig. Dein **Studium** wird gut.\" Anna denkt: „Ich habe eine gute **Schule**. Ich habe eine gute **Lehrerin**. Ich bin froh.\"",
    }
  ],
  nomenList: [
    { id: 1, singular: "Arzt", plural: "Ärzte", english: "doctor" },
    { id: 2, singular: "Aufgabe", plural: "Aufgaben", english: "task" },
    { id: 3, singular: "Aussage", plural: "Aussagen", english: "statement" },
    { id: 4, singular: "Beispiel", plural: "Beispiele", english: "example" },
    { id: 5, singular: "Bleistift", plural: "Bleistifte", english: "pencil" },
    { id: 6, singular: "Bogen", plural: "Bogen", english: "sheet (of paper)" },
    { id: 7, singular: "Buch", plural: "Bücher", english: "book" },
    { id: 8, singular: "Buchstabe", plural: "Buchstaben", english: "letter (alphabet)" },
    { id: 9, singular: "Doktor", plural: "Doktoren", english: "doctor" },
    { id: 10, singular: "Entschuldigung", plural: "Entschuldigungen", english: "excuse note" },
    { id: 11, singular: "Fehler", plural: "Fehler", english: "mistake" },
    { id: 12, singular: "Fieber", plural: "-", english: "fever" },
    { id: 13, singular: "Glückwunsch", plural: "Glückwünsche", english: "congratulations" },
    { id: 14, singular: "Hausaufgabe", plural: "Hausaufgaben", english: "homework" },
    { id: 15, singular: "Klasse", plural: "Klassen", english: "class" },
    { id: 16, singular: "Kurs", plural: "Kurse", english: "course" },
    { id: 17, singular: "Lehrerin", plural: "Lehrerinnen", english: "teacher (female)" },
    { id: 18, singular: "Lied", plural: "Lieder", english: "song" },
    { id: 19, singular: "Lösung", plural: "Lösungen", english: "solution" },
    { id: 20, singular: "Mutter", plural: "Mütter", english: "mother" },
    { id: 21, singular: "Pause", plural: "Pausen", english: "break" },
    { id: 22, singular: "Problem", plural: "Probleme", english: "problem" },
    { id: 23, singular: "Prüfung", plural: "Prüfungen", english: "exam" },
    { id: 24, singular: "Satz", plural: "Sätze", english: "sentence" },
    { id: 25, singular: "Schule", plural: "Schulen", english: "school" },
    { id: 26, singular: "Schüler", plural: "Schüler", english: "student (male)" },
    { id: 27, singular: "Schülerin", plural: "Schülerinnen", english: "student (female)" },
    { id: 28, singular: "Sprache", plural: "Sprachen", english: "language" },
    { id: 29, singular: "Studium", plural: "Studien", english: "studies" },
    { id: 30, singular: "Test", plural: "Tests", english: "test" },
    { id: 31, singular: "Text", plural: "Texte", english: "text" },
    { id: 32, singular: "Thema", plural: "Themen", english: "topic" },
    { id: 33, singular: "Unterricht", plural: "-", english: "lesson/class" },
  ]
};

export const LESSON_5: Lesson = {
  id: "lektion_5",
  title: "Lektion 5 - Artikel und Demonstrativpronomen",
  topics: [
    {
      id: "diese_tasche",
      title: "Diese Tasche ist schön!",
      content: "Maria geht in ein **Geschäft**. Sie sieht viele Taschen. Eine **Tasche** ist rot. Eine **Tasche** ist blau. Eine andere **Tasche** ist schwarz. Maria sagt: „Diese **Tasche** ist schön.\" **Verkäuferin** fragt: „Welche **Tasche** möchten Sie?\" Maria zeigt auf die rote **Tasche**. Sie sagt: „Ich nehme diese.\" **Verkäuferin** lacht. Sie sagt: „Die rote **Tasche** ist neu.\" Maria kauft sie. Sie sieht auch einen **Schuh**. „Dieser **Schuh** ist gross\", sagt Maria. Verkäuferin zeigt: „Jener **Schuh** dort ist klein.\" Maria denkt kurz. Sie nimmt beide. Dann geht sie an die Kasse. Sie bezahlt und sagt: „Dieses **Geschäft** ist nett. Diese **Frau** ist freundlich.\" Draussen zeigt Maria ihre **Tasche**. Ihre Freundin Anna sagt: „Wow! Diese **Farbe** ist toll!\" Maria lacht. Sie sagt: „Diese **Tasche** passt zu diesem **Kleid**.\" Sie sind beide froh.",
    }
  ],
  nomenList: [
    { id: 1, singular: "Farbe", plural: "Farben", english: "color" },
    { id: 2, singular: "Frau", plural: "Frauen", english: "woman" },
    { id: 3, singular: "Geschäft", plural: "Geschäfte", english: "shop" },
    { id: 4, singular: "Kleid", plural: "Kleider", english: "dress" },
    { id: 5, singular: "Schuh", plural: "Schuhe", english: "shoe" },
    { id: 6, singular: "Tasche", plural: "Taschen", english: "bag" },
    { id: 7, singular: "Verkäuferin", plural: "Verkäuferinnen", english: "saleswoman" },
  ]
};

export const LESSON_6: Lesson = {
  id: "lektion_6",
  title: "Lektion 6 - Verben",
  topics: [
    {
      id: "r_wie_ring",
      title: "R wie Ring",
      content: "Ein Mann findet auf der Strasse einen Ring. Der Ring ist aus Gold. Der Mann fragt: „Wem gehört der Ring?“ Ein Kind antwortet: „Keine Ahnung.“ Der Mann geht in eine Bäckerei. Er fragt die Frau hinter dem Tresen: „Ist das Ihr Ring?“ Die Frau antwortet: „Nein, das ist nicht mein Ring.“ Der Mann legt den Ring in seine Tasche. Er geht nach Hause. Zu Hause sieht er eine **Adresse** auf dem Ring. Die **Adresse** steht ganz klein auf dem Ring. Der Mann schreibt einen Brief. Im Brief schreibt er: „Ich habe Ihren Ring gefunden.“ Am nächsten Tag ruft eine Person an. Die Person sagt: „Das ist mein Ring! Danke!“ Der Mann lacht.",
    },
    {
      id: "geschenk",
      title: "Geschenk!",
      content: "Elena geht in einen **Laden**. Vor der Tür hängt ein **Schild**. Auf dem **Schild** steht: „Neue **Kleidung**, kleiner **Preis**.\" Elena freut sich. Im **Laden** sieht sie eine rote **Jacke**. Sie nimmt die **Jacke** und schaut auf die **Grösse**. Die **Grösse** passt. Elena probiert auch einen **Schuh**. Der **Schuh** ist bequem. Sie nimmt ein Paar. Dann sieht sie auf die **Uhr**. Es ist schon spät. Elena geht zur Kasse und nimmt eine **Tüte**. Sie legt die **Jacke** und die Schuhe hinein. Der **Preis** ist gut. Elena bezahlt. Vor dem **Laden** denkt sie an ein **Geschenk** für ihre Freundin. Sie geht noch einmal hinein. Sie findet ein kleines **Geschenk**. Es ist ein Schal. Sie steckt den Schal in die **Tüte**. Danach geht sie in ein **Lokal**. Im **Lokal** setzt sie sich an einen Tisch. Auf dem Tisch liegt eine **Uhr** als Dekoration. Elena lacht. Sie holt ihre **Tüte**. Sie schaut auf die neue **Jacke** und den neuen **Schuh**. Sie denkt: „Ich habe eine gute **Grösse** gefunden. Ich habe ein schönes **Geschenk**. Ich habe neue **Kleidung**.\" Elena trinkt Wasser im **Lokal** und ist zufrieden."
    }
  ],
  nomenList: [
    { id: 1, singular: "Absender", plural: "Absender", english: "sender" },
    { id: 2, singular: "Adresse", plural: "Adressen", english: "address" },
    { id: 3, singular: "Anruf", plural: "Anrufe", english: "call" },
    { id: 4, singular: "Anrufbeantworter", plural: "-", english: "answering machine" },
    { id: 5, singular: "Bank", plural: "-", english: "bank" },
    { id: 6, singular: "Beamte", plural: "Beamte", english: "official" },
    { id: 7, singular: "Datum", plural: "Daten", english: "date" },
    { id: 8, singular: "Formular", plural: "Formulare", english: "form" },
    { id: 9, singular: "Geschenk", plural: "Geschenke", english: "gift" },
    { id: 10, singular: "Grösse", plural: "Grössen", english: "size" },
    { id: 11, singular: "Handy", plural: "Handys", english: "mobile phone" },
    { id: 12, singular: "Information", plural: "Informationen", english: "information" },
    { id: 13, singular: "Internet", plural: "-", english: "internet" },
    { id: 14, singular: "Jacke", plural: "Jacken", english: "jacket" },
    { id: 15, singular: "Kleidung", plural: "-", english: "clothing" },
    { id: 16, singular: "Konto", plural: "-", english: "account" },
    { id: 17, singular: "Laden", plural: "Läden", english: "shop" },
    { id: 18, singular: "Lokal", plural: "Lokale", english: "restaurant / café" },
    { id: 19, singular: "Pass", plural: "-", english: "passport" },
    { id: 20, singular: "Postleitzahl", plural: "Postleitzahlen", english: "postal code" },
    { id: 21, singular: "Preis", plural: "Preise", english: "price" },
    { id: 22, singular: "Schalter", plural: "Schalter", english: "counter" },
    { id: 23, singular: "Schild", plural: "Schilder", english: "sign" },
    { id: 24, singular: "Schuh", plural: "Schuhe", english: "shoe" },
    { id: 25, singular: "Tüte", plural: "Tüten", english: "bag" },
    { id: 26, singular: "Uhr", plural: "Uhren", english: "clock / watch" },
    { id: 27, singular: "Zeitung", plural: "Zeitungen", english: "newspaper" },
  ]
};

export const LESSON_7: Lesson = {
  id: "lektion_7",
  title: "Lektion 7 - Modalverben (Super Sieben)",
  topics: [
    {
      id: "kaese_klasse",
      title: "Käse ist klasse!",
      content: "Ich liebe Käsefondue. Heute esse ich Käsefondue. Meine Freundin Lisa hilft mir. Wir gehen in Restaurant. Käsefondue ist warm. Ich habe **Brötchen**. Lisa kann Käsefondue machen. Restaurant ist gemütlich. Ich will Käsefondue kochen. Brötchen sind knusprig. Käse schmeckt klasse. Wir trinken **Tee**. Lisa mag **Butter**. Ich mag **Birne**. Wir haben Pommes frites. Lisa kocht in Küche. Ich will Käse kaufen. Meine Mutter mag **Salz**. Ich erzähle ihr von Käsefondue. Es ist kalt und Restaurant hat **Feuer**. Wir sitzen am Tisch. Lisa ist lustig. Wir lachen viel. Ich lerne Deutsch. Leichte Sprache ist super. Lisa sagt: \"Käse ist toll.\" Ich will oft essen. Meine Nachbarn haben **Fisch**. Wir teilen Essen. Restaurant ist in Zürich. Ich mag Zürich. Ich kann schnell lernen. Käsefondue macht Freude. Ich bin fröhlich. Deutsch ist nicht schwer.",
    }
  ],
  nomenList: [
    { id: 1, singular: "Birne", plural: "Birnen", english: "pear" },
    { id: 2, singular: "Brötchen", plural: "Brötchen", english: "bread roll" },
    { id: 3, singular: "Butter", plural: "-", english: "butter" },
    { id: 4, singular: "Feuer", plural: "-", english: "fire" },
    { id: 5, singular: "Fisch", plural: "Fische", english: "fish" },
    { id: 6, singular: "Pommes frites", plural: "-", english: "french fries" },
    { id: 7, singular: "Salz", plural: "-", english: "salt" },
    { id: 8, singular: "Tee", plural: "-", english: "tea" },
  ]
};

export const LESSON_8: Lesson = {
  id: "lektion_8",
  title: "Lektion 8 - Satzbau",
  topics: [
    {
      id: "klein_aber_fein",
      title: "Klein, aber fein!",
      nomenIds: [4, 2, 14, 16, 12, 15, 10, 5, 3, 6, 13, 17, 1, 7, 8, 11, 9],
      content: "Mein Zimmer ist klein, aber fein. Ich habe kleines **Doppelzimmer**. Ich schlafe gern. Mein **Bett** ist bequem. Ich habe rote Decke. Neben **Bett** ist kleiner **Tisch**. Tisch hat Lampe. Ich lese Buch. Ich höre Musik. Ich mag Ruhe. Tür ist zu. Schlüssel liegt auf Regal. Ohne **Schlüssel** kann ich nicht raus. Neben **Tür** ist **Toilette**. Toilette ist sauber. Dusche ist neu. Ich singe Lied. Ich bin lustig. Bild hängt über **Toilette**. Bild zeigt Katze. Ich gehe zur **Ecke**. Ich höre nichts. Ich finde **Schrank** leer. Ich will neue Kleider. Ich sehe Spiegel. Ich finde mich schön. Ordnung ist wichtig. Ich lege alles richtig. Balkon in **Wohnung** ist klein. Ich sehe Vogel. Garten ist unter mir. Garten ist bunt. Blumen sind schön. Ich liebe Natur. Ich sehe **Haus** gegenüber. Haus ist blau. Mein **Raum** ist hell. Ich bin zufrieden. Ich höre Schritte. Papa kommt. Papa bringt Pizza. Ich will essen. Ich liebe meine **Wohnung**. Ich kann schlafen, essen und lachen. Mein **Leben** ist gut, und ich bin glücklich.",
    }
  ],
  nomenList: [
    { id: 1, singular: "Balkon", plural: "Balkone", english: "balcony" },
    { id: 2, singular: "Bett", plural: "Betten", english: "bed" },
    { id: 3, singular: "Bild", plural: "Bilder", english: "picture" },
    { id: 4, singular: "Doppelzimmer", plural: "Doppelzimmer", english: "double room" },
    { id: 5, singular: "Dusche", plural: "Duschen", english: "shower" },
    { id: 6, singular: "Ecke", plural: "Ecken", english: "corner" },
    { id: 7, singular: "Garten", plural: "Gärten", english: "garden" },
    { id: 8, singular: "Haus", plural: "Häuser", english: "house" },
    { id: 9, singular: "Leben", plural: "-", english: "life" },
    { id: 10, singular: "Ordnung", plural: "-", english: "order" },
    { id: 11, singular: "Raum", plural: "Räume", english: "room" },
    { id: 12, singular: "Schlüssel", plural: "Schlüssel", english: "key" },
    { id: 13, singular: "Schrank", plural: "Schränke", english: "cupboard" },
    { id: 14, singular: "Tisch", plural: "Tische", english: "table" },
    { id: 15, singular: "Toilette", plural: "Toiletten", english: "toilet" },
    { id: 16, singular: "Tür", plural: "Türen", english: "door" },
    { id: 17, singular: "Wohnung", plural: "Wohnungen", english: "apartment" },
  ]
};

export const LESSON_9: Lesson = {
  id: "lektion_9",
  title: "Lektion 9 - Präpositionen",
  topics: [
    {
      id: "brot_und_los",
      title: "Brot & Los",
      nomenIds: [7, 6, 9, 1, 13, 10, 21, 17, 15, 12, 8, 22, 20, 4, 28, 11, 16, 23],
      content: "Heute ist Sonntag. Ich will Frühstück machen. Ich gehe in Küche und es ist klein, aber fein. Ich finde keinen Käse. Ich mache Brot mit Tomate. Ich nehme Teller. Teller liegt auf **Tisch**. Ich will **Farbe** sehen. Ich nehme rote Tasse. Ich öffne **Kühlschrank** und es ist leer. Ich will nicht einkaufen. Ich suche Messer, und ich finde Messer im **Schrank**. Ich mag **Ordnung**. Ich lege alles richtig. Ecke ist dunkel. Ich höre Musik. Musik ist laut. Ich will Pause machen. Ich setze mich auf Stuhl. Neben mir ist **Aufzug**. **Aufzug** ist laut. Ich will nicht **Aufzug** fahren. Ich nehme **Treppe**. Ich zähle **Stock**. Ich bin müde. Garten ist ruhig. Ich esse Brot im **Garten** und **Garten** ist grün. Ich sehe **Bild** an Wand und **Bild** zeigt Kuh. Ich lache. Ich will **Bild** malen. Leben in Schweiz ist schön. Ich denke an **Wohnung**. Ich habe viele **Möbel**. **Möbel** sind alt, aber ich kann gut damit leben. Mein Raum ist bunt. Ich habe Teppich. Ich liebe Farben. Ich sehe **Schlüssel** und **Schlüssel** liegt auf Boden. Ich nehme ihn. Ohne **Schlüssel** bin ich verloren. Ich mache **Tür** zu. **Tür** ist kaputt. Ich will neue **Tür** kaufen. Heute ist kein guter Tag, aber ich kann lachen.",
    },
    {
      id: "baby_und_blumen",
      title: "Baby & Blumen!",
      nomenIds: [14, 25, 19, 26, 2, 5, 18, 24, 3, 27],
      content: "Clara wacht am **Morgen** auf. Draussen ist **Winter**. Der **Wind** weht. Die **Sonne** scheint aber auch. Clara zieht die Jacke an und geht hinaus. Vor dem Haus steht ein grosser **Baum**. Am Boden liegt etwas Schnee. Clara sieht eine kleine **Blume**, die schon wächst. Sie lächelt. Am **See** bewegt sich das **Wasser**. Der **Wind** macht kleine Wellen. Clara atmet tief ein. Sie denkt: „Heute ist schön.\" Auf dem Arm trägt sie ihr **Baby**. Das **Baby** schaut zur **Sonne**. Es lacht. Clara ist froh. Sie setzt sich auf eine Bank am **See**. Sie hört das **Wasser**. Sie schaut den **Baum** an. Sie riecht die **Blume**. Das **Baby** schläft ein. Clara denkt an die **Woche**. Am Montag geht sie arbeiten. Am Dienstag besucht sie eine Freundin. Am Mittwoch hat sie einen Termin. Am Donnerstag macht sie Sport. Am Freitag geht sie einkaufen. Am Samstag kocht sie. Am Sonntag geht sie wieder zum **See**. Sie nimmt ihr **Baby** und zeigt ihm den **Baum**, das **Wasser** und die **Blume**. Clara denkt: „Ich habe die **Sonne**. Ich habe den **Wind**. Ich habe mein **Baby**. Ich bin glücklich.\""
    }
  ],
  nomenList: [
    { id: 1, singular: "Aufzug", plural: "Aufzüge", english: "elevator" },
    { id: 2, singular: "Baby", plural: "Babys", english: "baby" },
    { id: 3, singular: "Baum", plural: "Bäume", english: "tree" },
    { id: 4, singular: "Bild", plural: "Bilder", english: "picture" },
    { id: 5, singular: "Blume", plural: "Blumen", english: "flower" },
    { id: 6, singular: "Ecke", plural: "Ecken", english: "corner" },
    { id: 7, singular: "Farbe", plural: "Farben", english: "color" },
    { id: 8, singular: "Garten", plural: "Gärten", english: "garden" },
    { id: 9, singular: "Halle", plural: "Hallen", english: "hall" },
    { id: 10, singular: "Kühlschrank", plural: "Kühlschränke", english: "refrigerator" },
    { id: 11, singular: "Leben", plural: "-", english: "life" },
    { id: 12, singular: "Licht", plural: "Lichter", english: "light" },
    { id: 13, singular: "Möbel", plural: "Möbel", english: "furniture" },
    { id: 14, singular: "Morgen", plural: "-", english: "morning" },
    { id: 15, singular: "Ordnung", plural: "-", english: "order" },
    { id: 16, singular: "Schlüssel", plural: "Schlüssel", english: "key" },
    { id: 17, singular: "Schrank", plural: "Schränke", english: "cupboard" },
    { id: 18, singular: "See", plural: "Seen", english: "lake" },
    { id: 19, singular: "Sonne", plural: "Sonnen", english: "sun" },
    { id: 20, singular: "Stock", plural: "Stockwerke", english: "floor/story" },
    { id: 21, singular: "Tisch", plural: "Tische", english: "table" },
    { id: 22, singular: "Treppe", plural: "Treppen", english: "stairs" },
    { id: 23, singular: "Tür", plural: "Türen", english: "door" },
    { id: 24, singular: "Wasser", plural: "-", english: "water" },
    { id: 25, singular: "Wind", plural: "Winde", english: "wind" },
    { id: 26, singular: "Winter", plural: "-", english: "winter" },
    { id: 27, singular: "Woche", plural: "Wochen", english: "week" },
    { id: 28, singular: "Wohnung", plural: "Wohnungen", english: "apartment" },
  ]
};

export const LESSON_10: Lesson = {
  id: "lektion_10",
  title: "Lektion 10 - Fragen",
  topics: [
    {
      id: "pruefung",
      title: "Prüfung!",
      nomenIds: [7, 14, 3, 1, 16, 15, 8, 2, 5, 9, 12, 11, 4, 6, 13, 10],
      content: "Fatma besucht einen **Kurs**. Dort lernt sie eine neue **Sprache**. Auf dem Tisch liegt ein **Buch**. Darin ist eine **Aufgabe**. Das **Thema** ist Familie. Fatma liest den **Text**. Der **Lehrer** stellt eine **Aussage**. Fatma denkt kurz nach. Sie macht einen kleinen **Fehler**. Der **Lehrer** erklärt ruhig. Danach singen alle ein **Lied**. Der **Kurs** macht Spass. Später kommt eine **Prüfung**. Fatma ist nervös. Sie denkt: „Ich habe ein **Problem**.“ Doch sie öffnet das **Buch** und liest. Sie schreibt eine Antwort. Am Ende sieht sie ihr **Ergebnis**. Es ist gut. Der **Lehrer** sagt: „**Glückwunsch**.“ Fatma lacht. Sie ist froh. Neben ihr sitzt ein anderer **Schüler**. Auch er hat ein gutes **Ergebnis**. Gemeinsam gehen sie in die **Pause**. Fatma trinkt Wasser. Sie denkt an die **Aufgabe** und an das **Thema**. Sie sagt: „Ich habe gelernt. Ich habe ein gutes **Buch**. Ich habe einen guten **Kurs**.“ Nach der **Pause** liest sie einen neuen **Text**. Der **Lehrer** erklärt wieder eine **Aussage**. Fatma schreibt und singt ein **Lied**. Am Ende denkt sie: „Ich habe keinen grossen **Fehler**. Ich habe ein gutes **Ergebnis**. Ich bin zufrieden.“",
    }
  ],
  nomenList: [
    { id: 1, singular: "Aufgabe", plural: "Aufgaben", english: "task" },
    { id: 2, singular: "Aussage", plural: "Aussagen", english: "statement" },
    { id: 3, singular: "Buch", plural: "Bücher", english: "book" },
    { id: 4, singular: "Ergebnis", plural: "Ergebnisse", english: "result" },
    { id: 5, singular: "Fehler", plural: "Fehler", english: "mistake" },
    { id: 6, singular: "Glückwunsch", plural: "Glückwünsche", english: "congratulations" },
    { id: 7, singular: "Kurs", plural: "Kurse", english: "course" },
    { id: 8, singular: "Lehrer", plural: "Lehrer", english: "teacher" },
    { id: 9, singular: "Lied", plural: "Lieder", english: "song" },
    { id: 10, singular: "Pause", plural: "Pausen", english: "break" },
    { id: 11, singular: "Problem", plural: "Probleme", english: "problem" },
    { id: 12, singular: "Prüfung", plural: "Prüfungen", english: "exam" },
    { id: 13, singular: "Schüler", plural: "Schüler", english: "student" },
    { id: 14, singular: "Sprache", plural: "Sprachen", english: "language" },
    { id: 15, singular: "Text", plural: "Texte", english: "text" },
    { id: 16, singular: "Thema", plural: "Themen", english: "topic" },
  ]
};

export const LESSON_11: Lesson = {
  id: "lektion_11",
  title: "Lektion 11 - Negation",
  topics: [
    {
      id: "karte_kino",
      title: "Karte & Kino",
      content: "Ahmed geht ins **Kino**. Er kauft ein **Ticket**. Auf dem **Ticket** steht der Name von einem **Film**. Er sucht seinen **Platz**. Viele **Leute** sitzen schon. Das Licht geht aus. Der **Film** beginnt. Ahmed schaut gespannt. Nach zwei Stunden ist der **Film** zu Ende. Ahmed geht hinaus. Vor dem **Kino** hängt ein grosses **Schild**. Auf dem **Schild** steht: „Nächstes Spiel **Fussball**.“ Ahmed liest und denkt: „Das ist interessant.“ Am nächsten Tag ruft er im **Reisebüro** an. Er will eine kleine **Reise** machen. Die Frau im **Reisebüro** gibt ihm eine **Karte** und einen **Prospekt**. Im **Prospekt** steht: „Besuch im Stadion, viele **Leute**, gutes Essen.“ Ahmed freut sich. Am Sonntag geht er zum Stadion. Er zeigt die **Karte**. Er findet seinen **Platz**. Viele **Leute** singen. Ein **Schild** zeigt den Namen von der Mannschaft. Das Spiel beginnt. Ahmed klatscht und ruft. Nach dem Spiel geht er mit Freunden in ein **Restaurant**. Er bestellt Pizza. Danach laufen sie weiter. In der Stadt ist eine **Disco**. Ein grosses **Schild** zeigt Musik und Tanz. Ahmed kauft ein neues **Ticket** und geht hinein. Viele **Leute** tanzen. Ahmed denkt: „Ich habe einen **Film** gesehen, ich habe ein Spiel **Fussball** gesehen, ich habe Musik in der **Disco**. Ich bin zufrieden.“",
    }
  ],
  nomenList: [
    { id: 1, singular: "Disco", plural: "Discos", english: "disco" },
    { id: 2, singular: "Film", plural: "Filme", english: "film" },
    { id: 3, singular: "Fussball", plural: "-", english: "football" },
    { id: 4, singular: "Karte", plural: "Karten", english: "card" },
    { id: 5, singular: "Kino", plural: "Kinos", english: "cinema" },
    { id: 6, singular: "Leute", plural: "-", english: "people" },
    { id: 7, singular: "Platz", plural: "Plätze", english: "seat" },
    { id: 8, singular: "Prospekt", plural: "Prospekte", english: "brochure" },
    { id: 9, singular: "Reise", plural: "Reisen", english: "trip" },
    { id: 10, singular: "Reisebüro", plural: "Reisebüros", english: "travel agency" },
    { id: 11, singular: "Restaurant", plural: "Restaurants", english: "restaurant" },
    { id: 12, singular: "Schild", plural: "Schilder", english: "sign" },
    { id: 13, singular: "Ticket", plural: "Tickets", english: "ticket" },
  ]
};

export const LESSON_12: Lesson = {
  id: "lektion_12",
  title: "Lektion 12 - Adjektive",
  topics: [
    {
      id: "bestes_fest",
      title: "Bestes Fest!",
      content: "Lisa bekommt eine **Einladung**. Am Samstag ist eine **Feier**. Sie freut sich. Auf dem Tisch liegt ein **Ticket**. Mit dem **Ticket** kann sie zur **Party** gehen. Am Abend kommt sie an. Viele Gäste warten schon. Jeder **Gast** hat einen **Platz**. Lisa sitzt neben ihrer Freundin. Es gibt Musik und ein **Lied**. Alle singen. Danach reden sie über **Sport**. Ein Junge spricht über **Fussball**. An der Wand hängt ein grosses **Poster** von einer Mannschaft. Lisa lacht. Später gibt es Kuchen. Alle essen. Nach der **Feier** geht Lisa nach Hause. Am nächsten Tag sieht sie ein neues **Poster** in der Stadt. Es zeigt ein **Kino**. Dort läuft ein neuer Film. Lisa nimmt einen **Prospekt**. Darin steht: „Film nur mit **Anmeldung**.“ Sie ruft an und macht die **Anmeldung**. Am Abend geht sie ins **Kino**. Sie zeigt ihr **Ticket**. Sie setzt sich auf einen guten **Platz**. Viele Gäste sind da. Vor dem Film läuft ein **Lied**. Lisa denkt: „Gestern hatte ich eine **Party**. Heute habe ich einen Film. Ich habe Spass.“ Sie schaut den Film bis zum Ende. Dann geht sie heim. Sie ist froh.",
    },
    {
      id: "migros_ist_gross",
      title: "Migros ist gross!",
      content: "Nina kauft eine CD. Auf der CD ist neue Musik. Sie setzt sich auf einen Stuhl und hört die CD. Sie bewegt den **Arm** im Takt. Sie nickt mit dem **Kopf**. Sie schliesst ein **Auge** und lacht. Dann legt sie die **Hand** auf den **Bauch**. Sie fühlt, wie der **Bauch** sich bewegt. Danach stellt sie ein **Bein** auf den Boden und tippt mit dem **Fuss**. Sie singt mit dem **Mund**. Nina denkt: „Ich habe gute Musik. Ich habe Freude.\" Am Abend schaut sie in den Spiegel. Sie sieht ihr **Haar**. Sie kämmt das **Haar** und bindet es zusammen. Sie bewegt den **Arm** hoch. Sie schaut auf die **Hand**. Sie hebt ein kleines **Gewicht**. Sie macht Sport. Sie sagt: „Ich habe Kraft.\" Dann streckt sie das andere **Bein**. Der **Fuss** steht fest auf dem Boden. Sie atmet tief durch den **Mund**. Der **Kopf** ist leicht. Das **Auge** ist ruhig. Der **Bauch** ist stark. Nina hört wieder die CD. Sie bewegt sich zu der Musik. Sie denkt: „Ich habe einen gesunden Körper. Ich bin zufrieden.\""
    },
    {
      id: "schnell_und_hell",
      title: "Schnell & hell!",
      content: "Ali denkt an den **Verkehr**. Er will heute reisen. An der **Haltestelle** wartet schon ein **Bus**. Ali hat aber ein **Fahrrad**. Er fährt los. Auf der Strasse sieht er ein **Auto** und einen **Lkw**. Sie fahren auf die **Autobahn**. Ali fährt weiter bis zur **Strassenbahn**. Dort wartet eine kleine **Gruppe**. Alle hören **Musik**. Ali steigt ein. Die **Strassenbahn** fährt schnell. Nach kurzer Zeit erreicht er einen neuen **Ort**. Dort sieht er ein **Hotel**. Vor dem **Hotel** steht ein **Automat**. Ali nimmt ein Ticket. Auf dem Ticket steht die Uhrzeit und der **Grad** vom Wetter. Es sind 25 **Grad**. Ali ist froh. Er setzt sich in den Garten vom **Hotel**. Eine **Gruppe** singt **Musik**. Ali hört zu und lacht. Am Abend denkt er: „Heute war viel **Verkehr**. Ich habe einen **Bus** gesehen. Ich habe ein **Auto** und einen **Lkw** gesehen. Ich habe die **Autobahn** gesehen. Ich habe die **Strassenbahn** benutzt. Ich habe eine **Gruppe** gehört. Ich habe ein gutes **Hotel** gefunden. Ich bin zufrieden.\""
    },
    {
      id: "schweiz_und_schalter",
      title: "Schweiz & Schalter",
      content: "Tom will heute einen **Brief** schreiben. Er nimmt eine **Briefmarke** und klebt sie auf den **Brief**. Dann geht er zur **Post**. In der **Post** ist ein **Schalter**. Ein **Beamte** sitzt dort. Tom sagt: „Ich habe hier einen **Brief**. Ich brauche eine **Auskunft**.\" Der **Beamte** nickt. Er nimmt den **Brief** und prüft die **Briefmarke**. Dann fragt er nach der **Adresse** und nach der **Postleitzahl**. Tom zeigt alles. Auf dem **Brief** sind **Absender**, **Adresse**, **Postleitzahl** und **Datum**. Der **Beamte** sagt: „Alles ist richtig.\" Tom ist froh. Neben dem **Schalter** liegt ein **Formular**. Darauf steht neue **Information**. Tom liest. In der **Zeitung** am Eingang findet er auch **Information**. Es geht um die **Polizei** und um das **Telefon**. Dort steht: Bei Notruf ist ein **Anruf** wichtig. Tom denkt: Das ist gut zu wissen. Dann klingelt sein **Handy**. Ein Freund spricht. Der Freund sagt: „Ich brauche deine **Adresse**.\" Tom lacht und liest die **Adresse** vor. Am Abend ist Tom zu Hause. Er denkt an den **Brief**. Er ist zufrieden. Er hat eine **Briefmarke** benutzt. Er hat ein **Formular** gesehen. Er hat neue **Information**. Er ist glücklich."
    }
  ],
  nomenList: [
    { id: 1, singular: "Absender", plural: "Absender", english: "sender" },
    { id: 2, singular: "Adresse", plural: "Adressen", english: "address" },
    { id: 3, singular: "Anmeldung", plural: "Anmeldungen", english: "registration" },
    { id: 4, singular: "Anruf", plural: "Anrufe", english: "call" },
    { id: 5, singular: "Arm", plural: "Arme", english: "arm" },
    { id: 6, singular: "Auge", plural: "Augen", english: "eye" },
    { id: 7, singular: "Auskunft", plural: "Auskünfte", english: "information" },
    { id: 8, singular: "Auto", plural: "Autos", english: "car" },
    { id: 9, singular: "Autobahn", plural: "Autobahnen", english: "highway/motorway" },
    { id: 10, singular: "Automat", plural: "Automaten", english: "vending machine" },
    { id: 11, singular: "Bauch", plural: "Bäuche", english: "belly/stomach" },
    { id: 12, singular: "Beamte", plural: "Beamten", english: "official/clerk" },
    { id: 13, singular: "Bein", plural: "Beine", english: "leg" },
    { id: 14, singular: "Brief", plural: "Briefe", english: "letter" },
    { id: 15, singular: "Briefmarke", plural: "Briefmarken", english: "stamp" },
    { id: 16, singular: "Bus", plural: "Busse", english: "bus" },
    { id: 17, singular: "CD", plural: "CDs", english: "CD" },
    { id: 18, singular: "Datum", plural: "Daten", english: "date" },
    { id: 19, singular: "Einladung", plural: "Einladungen", english: "invitation" },
    { id: 20, singular: "Fahrrad", plural: "Fahrräder", english: "bicycle" },
    { id: 21, singular: "Feier", plural: "Feiern", english: "celebration" },
    { id: 22, singular: "Formular", plural: "Formulare", english: "form" },
    { id: 23, singular: "Fuss", plural: "Füsse", english: "foot" },
    { id: 24, singular: "Fussball", plural: "Fussbälle", english: "football/soccer" },
    { id: 25, singular: "Gast", plural: "Gäste", english: "guest" },
    { id: 26, singular: "Gewicht", plural: "Gewichte", english: "weight" },
    { id: 27, singular: "Grad", plural: "Grade", english: "degree" },
    { id: 28, singular: "Gruppe", plural: "Gruppen", english: "group" },
    { id: 29, singular: "Haar", plural: "Haare", english: "hair" },
    { id: 30, singular: "Haltestelle", plural: "Haltestellen", english: "stop" },
    { id: 31, singular: "Hand", plural: "Hände", english: "hand" },
    { id: 32, singular: "Handy", plural: "Handys", english: "mobile phone" },
    { id: 33, singular: "Hotel", plural: "Hotels", english: "hotel" },
    { id: 34, singular: "Information", plural: "Informationen", english: "information" },
    { id: 35, singular: "Kino", plural: "Kinos", english: "cinema" },
    { id: 36, singular: "Kopf", plural: "Köpfe", english: "head" },
    { id: 37, singular: "Lied", plural: "Lieder", english: "song" },
    { id: 38, singular: "Lkw", plural: "Lkws", english: "truck" },
    { id: 39, singular: "Mund", plural: "Münder", english: "mouth" },
    { id: 40, singular: "Musik", plural: "-", english: "music" },
    { id: 41, singular: "Ort", plural: "Orte", english: "place" },
    { id: 42, singular: "Party", plural: "Partys", english: "party" },
    { id: 43, singular: "Platz", plural: "Plätze", english: "seat/place" },
    { id: 44, singular: "Polizei", plural: "-", english: "police" },
    { id: 45, singular: "Post", plural: "-", english: "post office" },
    { id: 46, singular: "Poster", plural: "Poster", english: "poster" },
    { id: 47, singular: "Postleitzahl", plural: "Postleitzahlen", english: "postal code" },
    { id: 48, singular: "Prospekt", plural: "Prospekte", english: "brochure/flyer" },
    { id: 49, singular: "Schalter", plural: "Schalter", english: "counter" },
    { id: 50, singular: "Sport", plural: "-", english: "sport" },
    { id: 51, singular: "Strassenbahn", plural: "Strassenbahnen", english: "tram" },
    { id: 52, singular: "Telefon", plural: "Telefone", english: "telephone" },
    { id: 53, singular: "Ticket", plural: "Tickets", english: "ticket" },
    { id: 54, singular: "Verkehr", plural: "-", english: "traffic" },
    { id: 55, singular: "Zeitung", plural: "Zeitungen", english: "newspaper" },
  ]
};

export const LESSON_13: Lesson = {
  id: "lektion_13",
  title: "Lektion 13 - Trennbare Verben",
  topics: [
    {
      id: "los_gehts",
      title: "Los geht's!",
      content: "Maria ist **Student**. Sie macht ein Praktikum in einer **Praxis**. Am **Anfang** ist alles neu. Ein **Kollege** erklärt viel. Maria schreibt eine **Nummer** auf ein Blatt. Sie schickt ein **Fax**. Ein **Kunde** ruft an. Er braucht Zeit und einen **Termin**. Maria hört zu. Sie notiert das **Gespräch**. Dann geht sie zum **Chef**. Der **Chef** sagt: „Der **Termin** ist frei.“ Maria schreibt eine E-Mail an den **Kunde**. Sie gibt die **Nummer** und die **Zeit**. Der **Kunde** ist zufrieden. Am Nachmittag arbeitet Maria an einer **Maschine**. Die **Maschine** macht Geräusche. Der **Kollege** sagt: „Bitte **Vorsicht**.“ Maria passt auf. Sie legt Papier hinein. Die **Maschine** arbeitet langsam. Nach einer Stunde ist alles fertig. Maria hat viel gelernt. In der Pause trinkt sie Tee. Sie liest ihre E-Mail. Dort steht eine neue Frage von einem **Kunde**. Sie denkt kurz nach. Dann ruft sie an und macht ein neues **Gespräch**. Der **Kunde** will einen zweiten **Termin**. Maria schreibt alles auf. Am Abend ist Maria zu Hause. Sie denkt an den **Anfang**. Sie war nervös. Jetzt ist sie ruhig. Sie hat gute Kollegen. Sie hat einen netten **Chef**. Sie ist froh.",
    }
  ],
  nomenList: [
    { id: 1, singular: "Anfang", plural: "Anfänge", english: "beginning" },
    { id: 2, singular: "Chef", plural: "Chefs", english: "boss" },
    { id: 3, singular: "E-Mail", plural: "E-Mails", english: "email" },
    { id: 4, singular: "Fax", plural: "Faxe", english: "fax" },
    { id: 5, singular: "Gespräch", plural: "Gespräche", english: "conversation" },
    { id: 6, singular: "Kollege", plural: "Kollegen", english: "colleague" },
    { id: 7, singular: "Kunde", plural: "Kunden", english: "customer" },
    { id: 8, singular: "Maschine", plural: "Maschinen", english: "machine" },
    { id: 9, singular: "Nummer", plural: "Nummern", english: "number" },
    { id: 10, singular: "Praxis", plural: "Praxen", english: "practice/office" },
    { id: 11, singular: "Student", plural: "Studenten", english: "student" },
    { id: 12, singular: "Termin", plural: "Termine", english: "appointment" },
    { id: 13, singular: "Vorsicht", plural: "-", english: "caution" },
    { id: 14, singular: "Zeit", plural: "Zeiten", english: "time" },
  ]
};

export const LESSON_14: Lesson = {
  id: "lektion_14",
  title: "Lektion 14 - Zeit",
  topics: [
    {
      id: "p_wie_puenktlich",
      title: "P wie Pünktlich!",
      nomenIds: [24, 4, 29, 11, 14, 20, 8, 5, 12, 6, 30, 7, 1, 22, 17, 3, 13, 27, 2, 25, 9, 19, 23, 26, 18, 15, 10, 28, 21, 16],
      content: "Sofia plant eine **Reise** ins **Ausland**. Sie ruft ein **Taxi**. Der **Fahrer** ist pünktlich. Zusammen fahren sie zum **Flughafen**. Dort stellt Sofia ihren **Koffer** ab. Am **Eingang** sieht sie einen **Automat**. Sie nimmt eine **Fahrkarte** für den **Bus** zum **Terminal**. Dann hört sie eine **Durchsage**: „Der **Abflug** nach Rom ist in dreissig **Minuten**.“ Sofia geht schnell. Am **Gleis** steht der **Bus**. Sie steigt ein und denkt an den **Anschluss** zum **Flugzeug**. Im **Flughafen** wartet sie noch kurz. Dann sieht sie das **Flugzeug**. Sie steigt ein. Nach zwei **Stunden** ist die **Ankunft** in Italien. Sofia nimmt ein **Taxi**. Der **Fahrer** bringt sie in die **Stadt**. Dort hat sie ein **Einzelzimmer** in einem kleinen **Hotel**. Sie legt den **Koffer** ab und geht spazieren. In der **Stadt** hört sie **Musik** auf der **Strasse**. Eine **Gruppe** spielt **Gitarre**. Sofia bleibt stehen. Sie macht **Fotos** und lächelt. Am **Ende** des **Tages** sitzt sie im **Hotel**. Sie denkt: „Ich habe eine gute **Reise**. Ich habe einen **Abflug** und eine **Ankunft**. Ich habe ein **Einzelzimmer**. Ich habe schöne **Musik** gehört. Dieses **Land** ist toll.“ Sofia ist froh.",
    }
  ],
  nomenList: [
    { id: 1, singular: "Abflug", plural: "Abflüge", english: "Departure" },
    { id: 2, singular: "Ankunft", plural: "Ankünfte", english: "Arrival" },
    { id: 3, singular: "Anschluss", plural: "Anschlüsse", english: "Connection" },
    { id: 4, singular: "Ausland", plural: "— (usually no plural)", english: "Foreign country, Abroad" },
    { id: 5, singular: "Automat", plural: "Automaten", english: "Machine, Vending Machine" },
    { id: 6, singular: "Bus", plural: "Busse", english: "Bus" },
    { id: 7, singular: "Durchsage", plural: "Durchsagen", english: "Announcement" },
    { id: 8, singular: "Eingang", plural: "Eingänge", english: "Entrance" },
    { id: 9, singular: "Einzelzimmer", plural: "Einzelzimmer", english: "Single Room" },
    { id: 10, singular: "Ende", plural: "Enden", english: "End" },
    { id: 11, singular: "Fahrer", plural: "Fahrer", english: "Driver" },
    { id: 12, singular: "Fahrkarte", plural: "Fahrkarten", english: "Ticket" },
    { id: 13, singular: "Flugzeug", plural: "Flugzeuge", english: "Airplane, Aircraft" },
    { id: 14, singular: "Flughafen", plural: "Flughäfen", english: "Airport" },
    { id: 15, singular: "Foto", plural: "Fotos", english: "Photo, Picture" },
    { id: 16, singular: "Gitarre", plural: "Gitarren", english: "Guitar" },
    { id: 17, singular: "Gleis", plural: "Gleise", english: "Platform, Track" },
    { id: 18, singular: "Gruppe", plural: "Gruppen", english: "Group" },
    { id: 19, singular: "Hotel", plural: "Hotels", english: "Hotel" },
    { id: 20, singular: "Koffer", plural: "Koffer", english: "Suitcase" },
    { id: 21, singular: "Land", plural: "Länder", english: "Country, Land" },
    { id: 22, singular: "Minute", plural: "Minuten", english: "Minute" },
    { id: 23, singular: "Musik", plural: "— (usually no plural)", english: "Music" },
    { id: 24, singular: "Reise", plural: "Reisen", english: "Trip, Journey" },
    { id: 25, singular: "Stadt", plural: "Städte", english: "City, Town" },
    { id: 26, singular: "Strasse", plural: "Strassen", english: "Street" },
    { id: 27, singular: "Stunde", plural: "Stunden", english: "Hour" },
    { id: 28, singular: "Tag", plural: "Tage", english: "Day" },
    { id: 29, singular: "Taxi", plural: "Taxis", english: "Taxi" },
    { id: 30, singular: "Terminal", plural: "Terminals", english: "Terminal" }
  ]
};

export const LESSON_15: Lesson = {
  id: "lektion_15",
  title: "Lektion 15 - Vergangenheit",
  topics: [
    {
      id: "zeit_zeitung",
      title: "Zeit & Zeitung",
      content: "Peter sucht **Arbeit**. In der Zeitung sieht er eine **Anzeige**. Dort steht: „Neue **Stelle** in einem **Verein**.“ Peter nimmt seinen **Kugelschreiber**. Er schreibt auf ein Blatt **Papier**. Er schreibt einen **Gruss** und eine **Antwort**. Dann bringt er alles in den **Verein**. Am Anfang wartet er. Dann macht er ein **Gespräch** mit dem Chef. Der Chef sagt: „Wir haben eine **Stelle** frei. Sie bekommen einen **Termin** für Montag.“ Peter ist froh. Am Montag ist er pünktlich. Er macht wieder ein **Gespräch**. Er bekommt die **Arbeit**. Er war nervös, jetzt ist er ruhig. Am zweiten Tag arbeitet Peter mit einer **Maschine**. Die **Maschine** macht einen **Fehler**. Peter ruft den Chef. Der Chef sagt: „Wir brauchen eine **Reparatur**.“ Ein Kollege bringt Werkzeug. Nach kurzer **Zeit** ist die **Maschine** wieder gut. Peter ist erleichtert. In der Pause schreibt er eine neue **Antwort** mit seinem **Kugelschreiber**. Es ist eine kleine **Anzeige** für den **Verein**. Er setzt einen freundlichen **Gruss** darunter. Am Abend denkt Peter: „Ich habe eine **Arbeit**. Ich habe einen guten **Verein**. Ich habe nette Kollegen. Ich bin froh.“",
    }
  ],
  nomenList: [
    { id: 1, singular: "Antwort", plural: "Antworten", english: "answer" },
    { id: 2, singular: "Anzeige", plural: "Anzeigen", english: "advertisement" },
    { id: 3, singular: "Arbeit", plural: "Arbeiten", english: "work" },
    { id: 4, singular: "Fehler", plural: "Fehler", english: "mistake/error" },
    { id: 5, singular: "Gespräch", plural: "Gespräche", english: "conversation" },
    { id: 6, singular: "Gruss", plural: "Grüsse", english: "greeting" },
    { id: 7, singular: "Kugelschreiber", plural: "Kugelschreiber", english: "pen" },
    { id: 8, singular: "Maschine", plural: "Maschinen", english: "machine" },
    { id: 9, singular: "Papier", plural: "Papiere", english: "paper" },
    { id: 10, singular: "Reparatur", plural: "Reparaturen", english: "repair" },
    { id: 11, singular: "Stelle", plural: "Stellen", english: "position/job" },
    { id: 12, singular: "Termin", plural: "Termine", english: "appointment" },
    { id: 13, singular: "Verein", plural: "Vereine", english: "association/club" },
    { id: 14, singular: "Zeit", plural: "Zeiten", english: "time" },
  ]
};

export const LESSON_16: Lesson = {
  id: "lektion_16",
  title: "Lektion 16 - Wortschatz",
  topics: [
    {
      id: "ich_lese_mit_kaese",
      title: "Ich lese mit Käse!",
      content: "Anna hat einen neuen **Job**. Sie arbeitet in einer **Firma**. Ihr **Chef** ist streng. Eine **Kollegin** ist nett. Anna schreibt mit einem **Kugelschreiber**. Ein **Kunde** macht einen Anruf. Der **Kunde** will einen **Termin**. Anna notiert die **Frage**. Sie hat eine **Stunde** Zeit. Dann geht sie zum **Chef**. Der **Chef** sagt: „Der **Termin** ist möglich.\" Anna macht ein **Praktikum**. Sie arbeitet am **Drucker**. Die **Maschine** braucht **Papier**. Plötzlich ist ein **Fehler**. Der **Drucker** stoppt. Anna ruft die **Kollegin**. Die **Kollegin** sagt: „Wir brauchen neues **Papier**.\" Zusammen holen sie **Papier**. Die **Maschine** arbeitet wieder. Anna ist froh. In der Pause liest sie eine **Zeitung**. In der **Zeitung** ist eine **Anzeige**. Dort steht: „Neuer **Job** in einer grossen **Firma**.\" Anna lacht. Sie sagt: „Ich habe schon einen **Job**.\" Dann schreibt sie eine E-Mail. In der E-Mail steht eine **Frage** an den **Chef**. Am Abend ist Anna zu Hause. In der Tasche ist ein **Kugelschreiber** und ein Blatt **Papier**. Sie denkt an den **Kunde** und an den **Termin**. Zu Hause isst sie Brot mit **Käse**. Sie ist zufrieden."
    },
    {
      id: "zoo_und_so",
      title: "Zoo & so!",
      content: "Jonas hat **Freizeit**. Er geht in ein Hotel. An der **Rezeption** fragt er nach einer **Karte**. Er möchte einen **Eintritt** für den **Zoo**. Die Frau an der **Rezeption** gibt die **Karte**. Am Morgen steht Jonas vor dem **Zoo**. Ein **Schild** zeigt den Weg. Er geht hinein. Dort beginnt eine **Führung**. Ein Mann erklärt die Tiere. Jonas macht Fotos. Er denkt: „Das ist wie **Urlaub**.\" Später nimmt er einen **Prospekt**. Darin steht eine **Reise** ans Meer. Jonas liest alles. Ein **Reiseführer** spricht mit einer Gruppe. Jonas hört zu. Dann geht er weiter. Am Abend will Jonas noch ins **Kino**. Vor dem **Kino** hängt ein grosses **Schild**. Darauf steht der Name von einem **Film**. Jonas kauft eine **Karte**. Er zeigt die **Karte** am Eingang. Der **Eintritt** ist frei mit dem Gutschein aus dem **Prospekt**. Jonas lacht. Er denkt: „Ich habe einen **Zoo** besucht. Ich habe eine **Führung** gesehen. Ich habe einen guten **Film**.\" Spät in der Nacht ist er im Hotel. An der **Rezeption** sagt er: „Danke. Der **Urlaub** ist schön.\" Jonas geht ins Zimmer. Er hat viele Bilder und gute Erinnerungen."
    },
    {
      id: "lernen_mit_sternen",
      title: "Lernen mit Sternen!",
      content: "Herr Meier ist **Lehrer**. Er geht in die **Klasse**. Dort warten viele **Schüler**. Heute hat er eine **Aufgabe**. Er zeigt ein **Beispiel**. Dann sagt er: „Bitte macht die **Lösung**.\" Ein **Schüler** schreibt einen **Satz** an die Tafel. Herr Meier nickt. Dann beginnt ein **Lied**. Die **Schüler** singen. Der **Unterricht** macht Spass. Danach liest Herr Meier einen **Text**. Das **Thema** ist Sport. Die **Schüler** hören zu. Dann gibt es eine **Hausaufgabe**. Herr Meier sagt: „Bitte schreibt den **Text** noch einmal mit dem **Bleistift**.\" Später macht er einen **Test**. Jeder **Schüler** bekommt ein Blatt. Darauf ist ein **Satz**. Die **Schüler** schreiben. Nach dem **Test** ist eine **Pause**. Alle gehen hinaus. Herr Meier bleibt in der **Klasse**. Er liest die **Lösung**. Er denkt: „Ich habe gute **Schüler**. Ich habe ein gutes **Thema**. Ich habe eine schöne **Klasse**.\" Nach der **Pause** kommt ein **Schüler**. Er sagt: „Die **Hausaufgabe** war leicht.\" Herr Meier lacht. Am Ende denkt er: „Ich habe meinen **Unterricht**. Ich habe meine **Schüler**. Ich bin froh.\""
    },
    {
      id: "coop_loop",
      title: "Coop-Loop!",
      content: "Markus geht in ein **Geschäft**. Dort sieht er ein **Angebot**. Auf dem Tisch steht ein **Glas**. Daneben liegen viele **Lebensmittel**. Der **Preis** ist klein. Markus nimmt eine **Tüte** und legt Obst hinein. An der **Kasse** schaut die Frau auf die **Uhr**. Markus lacht und sagt: „Ich habe Zeit.\" Er zahlt. Dann geht er weiter. Im Regal liegt ein **Geschenk**. Markus denkt an seine Mutter. Er nimmt das **Geschenk** in seine **Tasche**. Danach kauft er ein **Hähnchen**. Er steckt es auch in die **Tüte**. Draußen sieht er ein kleines **Lokal**. Er setzt sich an einen Tisch. Auf dem Tisch steht ein **Glas** Wasser. Markus holt seine **Tasche** und seine **Tüte**. Er denkt: „Ich habe ein **Geschenk**. Ich habe ein **Hähnchen**. Ich habe viele **Lebensmittel**.\" Im **Lokal** läuft Musik. Markus sieht auf die **Uhr**. Es ist schon spät. Er trinkt aus dem **Glas** und geht nach Hause. Dort packt er alles aus. Er legt die **Lebensmittel** in den Schrank. Er legt das **Geschenk** auf den Tisch. Markus ist froh."
    },
    {
      id: "zug_und_klug",
      title: "Zug & klug!",
      content: "Laura fährt mit der **Bahn**. Sie geht früh zum **Bahnhof**. Am Eingang hört sie eine **Ansage**: „**Achtung** am **Gleis** 3, der **Zug** fährt ein.\" Viele Menschen warten schon. Laura zeigt ihre **Fahrkarte**. Dann steigt sie in die **S-Bahn**. Im **Zug** macht sie einen **Blick** aus dem Fenster. Sie sieht einen neuen **Ort**. Dort ist das **Meer**. Laura macht ein **Foto**. Eine **Durchsage** sagt: „Die **Ankunft** ist in zehn Minuten.\" Laura freut sich. Am **Ort** macht sie einen kleinen **Ausflug**. Sie besucht eine **Sehenswürdigkeit**. Dann geht sie in ein **Hotel**. Sie hat ein Zimmer mit **Halbpension**. Am Abend liest sie die **Speisekarte**. Es gibt Fisch und Gemüse. Laura ist froh. Am nächsten Morgen hört sie wieder eine **Ansage**. Sie muss zurück. Am **Gleis** wartet ihr **Zug**. Ein Mann fragt nach dem **Anschluss**. Laura zeigt ihm ihre **Fahrkarte**. Sie sagt: „Der **Anschluss** ist im nächsten **Bahnhof**.\" Der Mann bedankt sich. Laura lacht. Sie denkt: „Der **Ausflug** war schön. Ich habe viele **Fotos**. Ich habe gute Erinnerungen.\" Dann kommt die **Durchsage**: „Bitte einsteigen.\" Laura nimmt ihren Platz. Der **Zug** fährt los."
    },
    {
      id: "hallo_handy",
      title: "Hallo Handy!",
      content: "Heute bin ich in Post. Ich will **Brief** schicken. Er ist für meine Schwester. Ich will lange Nachricht schreiben. Ich nehme eine bunte **Briefmarke** und will sie aufkleben. Dann hole ich ein langes **Formular**. Ich schreibe Name, **Adresse**, **Postleitzahl**, **Datum** und **Absender**. Ich brauche **Hilfe**. Ich sehe eine Frau am **Schalter**. Ich sage, dass ich **Information** brauche. Sie sagt: \"Es ist kein Problem\", und gibt mir einen Kugelschreiber. Ich frage, ob ich den **Brief** heute schicken kann. Sie sagt: \"Ja\". Ich will **Brief** abgeben. Ich will auch meine Schwester anrufen. Sie hat **Telefon** an Wand und sie hört eine Klingel. Niemand antwortet. Mein **Handy** ist modern. Ich höre Musik. Dann sehe ich einen Mann und er braucht **Hilfe**. Ich sage: \"Hallo.\" Er fragt: \"Wo ist die **Polizei**?\" Ich will ihm Weg zeigen. Wir gehen zusammen. Dort fragt er nach **Auskunft**. Ein Beamter kommt, er ist freundlich und bittet um Geduld. Ich nicke. Dann gehe ich in Bank. Ich nehme meinen **Pass** mit und sehe den nächsten freien **Schalter**. Ich sage: \"Ich will ein neues **Konto** eröffnen.\" Die Frau dort gibt mir eine Karte. Ich bin froh. Zu Hause lese ich eine **Zeitung** mit vielen Bildern und trinke Tee. Ich bin müde, aber zufrieden."
    }
  ],
  nomenList: [
    { id: 1, singular: "Absender", plural: "Absender", english: "sender" },
    { id: 2, singular: "Achtung", plural: "-", english: "attention/caution" },
    { id: 3, singular: "Adresse", plural: "Adressen", english: "address" },
    { id: 4, singular: "Angebot", plural: "Angebote", english: "offer/sale" },
    { id: 5, singular: "Ankunft", plural: "Ankünfte", english: "arrival" },
    { id: 6, singular: "Ansage", plural: "Ansagen", english: "announcement" },
    { id: 7, singular: "Anschluss", plural: "Anschlüsse", english: "connection" },
    { id: 8, singular: "Anzeige", plural: "Anzeigen", english: "advertisement" },
    { id: 9, singular: "Aufgabe", plural: "Aufgaben", english: "task/exercise" },
    { id: 10, singular: "Ausflug", plural: "Ausflüge", english: "trip/excursion" },
    { id: 11, singular: "Auskunft", plural: "Auskünfte", english: "information/inquiry" },
    { id: 12, singular: "Bahn", plural: "Bahnen", english: "train/railway" },
    { id: 13, singular: "Bahnhof", plural: "Bahnhöfe", english: "train station" },
    { id: 14, singular: "Beamte", plural: "Beamten", english: "official/civil servant" },
    { id: 15, singular: "Beispiel", plural: "Beispiele", english: "example" },
    { id: 16, singular: "Bleistift", plural: "Bleistifte", english: "pencil" },
    { id: 17, singular: "Blick", plural: "Blicke", english: "look/view" },
    { id: 18, singular: "Brief", plural: "Briefe", english: "letter" },
    { id: 19, singular: "Briefmarke", plural: "Briefmarken", english: "stamp" },
    { id: 20, singular: "Chef", plural: "Chefs", english: "boss" },
    { id: 21, singular: "Datum", plural: "Daten", english: "date" },
    { id: 22, singular: "Drucker", plural: "Drucker", english: "printer" },
    { id: 23, singular: "Durchsage", plural: "Durchsagen", english: "announcement" },
    { id: 24, singular: "E-Mail", plural: "E-Mails", english: "email" },
    { id: 25, singular: "Eintritt", plural: "Eintritte", english: "admission/entry" },
    { id: 26, singular: "Fahrkarte", plural: "Fahrkarten", english: "ticket" },
    { id: 27, singular: "Fehler", plural: "Fehler", english: "error/mistake" },
    { id: 28, singular: "Film", plural: "Filme", english: "film/movie" },
    { id: 29, singular: "Firma", plural: "Firmen", english: "company" },
    { id: 30, singular: "Formular", plural: "Formulare", english: "form" },
    { id: 31, singular: "Foto", plural: "Fotos", english: "photo" },
    { id: 32, singular: "Frage", plural: "Fragen", english: "question" },
    { id: 33, singular: "Freizeit", plural: "-", english: "free time/leisure" },
    { id: 34, singular: "Führung", plural: "Führungen", english: "guided tour" },
    { id: 35, singular: "Geschäft", plural: "Geschäfte", english: "shop/store" },
    { id: 36, singular: "Geschenk", plural: "Geschenke", english: "gift/present" },
    { id: 37, singular: "Glas", plural: "Gläser", english: "glass" },
    { id: 38, singular: "Gleis", plural: "Gleise", english: "platform/track" },
    { id: 39, singular: "Hähnchen", plural: "Hähnchen", english: "chicken" },
    { id: 40, singular: "Halbpension", plural: "-", english: "half board" },
    { id: 41, singular: "Handy", plural: "Handys", english: "mobile phone/cell phone" },
    { id: 42, singular: "Hausaufgabe", plural: "Hausaufgaben", english: "homework" },
    { id: 43, singular: "Hilfe", plural: "Hilfen", english: "help" },
    { id: 44, singular: "Hotel", plural: "Hotels", english: "hotel" },
    { id: 45, singular: "Information", plural: "Informationen", english: "information" },
    { id: 46, singular: "Job", plural: "Jobs", english: "job" },
    { id: 47, singular: "Karte", plural: "Karten", english: "card/ticket/map" },
    { id: 48, singular: "Käse", plural: "-", english: "cheese" },
    { id: 49, singular: "Kasse", plural: "Kassen", english: "cashier/checkout" },
    { id: 50, singular: "Kino", plural: "Kinos", english: "cinema" },
    { id: 51, singular: "Klasse", plural: "Klassen", english: "class/classroom" },
    { id: 52, singular: "Kollegin", plural: "Kolleginnen", english: "colleague (female)" },
    { id: 53, singular: "Konto", plural: "Konten", english: "account" },
    { id: 54, singular: "Kugelschreiber", plural: "Kugelschreiber", english: "pen" },
    { id: 55, singular: "Kunde", plural: "Kunden", english: "customer" },
    { id: 56, singular: "Lebensmittel", plural: "Lebensmittel", english: "food/groceries" },
    { id: 57, singular: "Lehrer", plural: "Lehrer", english: "teacher" },
    { id: 58, singular: "Leute", plural: "-", english: "people" },
    { id: 59, singular: "Lied", plural: "Lieder", english: "song" },
    { id: 60, singular: "Lokal", plural: "Lokale", english: "restaurant/café" },
    { id: 61, singular: "Lösung", plural: "Lösungen", english: "solution" },
    { id: 62, singular: "Maschine", plural: "Maschinen", english: "machine" },
    { id: 63, singular: "Meer", plural: "Meere", english: "sea/ocean" },
    { id: 64, singular: "Mensch", plural: "Menschen", english: "person/human" },
    { id: 65, singular: "Ort", plural: "Orte", english: "place/location" },
    { id: 66, singular: "Papier", plural: "Papiere", english: "paper" },
    { id: 67, singular: "Pass", plural: "Pässe", english: "passport" },
    { id: 68, singular: "Pause", plural: "Pausen", english: "break" },
    { id: 69, singular: "Polizei", plural: "-", english: "police" },
    { id: 70, singular: "Postleitzahl", plural: "Postleitzahlen", english: "postal code/zip code" },
    { id: 71, singular: "Praktikum", plural: "Praktika", english: "internship" },
    { id: 72, singular: "Preis", plural: "Preise", english: "price" },
    { id: 73, singular: "Prospekt", plural: "Prospekte", english: "brochure/leaflet" },
    { id: 74, singular: "Reise", plural: "Reisen", english: "journey/trip" },
    { id: 75, singular: "Reiseführer", plural: "Reiseführer", english: "tour guide/guidebook" },
    { id: 76, singular: "Rezeption", plural: "Rezeptionen", english: "reception" },
    { id: 77, singular: "S-Bahn", plural: "S-Bahnen", english: "suburban train" },
    { id: 78, singular: "Satz", plural: "Sätze", english: "sentence" },
    { id: 79, singular: "Schalter", plural: "Schalter", english: "counter/window" },
    { id: 80, singular: "Schild", plural: "Schilder", english: "sign" },
    { id: 81, singular: "Schüler", plural: "Schüler", english: "student/pupil" },
    { id: 82, singular: "Sehenswürdigkeit", plural: "Sehenswürdigkeiten", english: "sight/attraction" },
    { id: 83, singular: "Speisekarte", plural: "Speisekarten", english: "menu" },
    { id: 84, singular: "Stunde", plural: "Stunden", english: "hour" },
    { id: 85, singular: "Tasche", plural: "Taschen", english: "bag/pocket" },
    { id: 86, singular: "Telefon", plural: "Telefone", english: "telephone/phone" },
    { id: 87, singular: "Termin", plural: "Termine", english: "appointment" },
    { id: 88, singular: "Test", plural: "Tests", english: "test" },
    { id: 89, singular: "Text", plural: "Texte", english: "text" },
    { id: 90, singular: "Thema", plural: "Themen", english: "topic/theme" },
    { id: 91, singular: "Tüte", plural: "Tüten", english: "bag" },
    { id: 92, singular: "Uhr", plural: "Uhren", english: "clock/watch" },
    { id: 93, singular: "Unterricht", plural: "-", english: "lesson/class" },
    { id: 94, singular: "Urlaub", plural: "Urlaube", english: "vacation/holiday" },
    { id: 95, singular: "Zeitung", plural: "Zeitungen", english: "newspaper" },
    { id: 96, singular: "Zoo", plural: "Zoos", english: "zoo" },
    { id: 97, singular: "Zug", plural: "Züge", english: "train" },
  ]
};
