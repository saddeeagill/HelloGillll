export interface Lesson {
  id: string;
  title: string;
  topics: {
    id: string;
    title: string;
    content: string;
  }[];
}

export const LESSON_1: Lesson = {
  id: 'lektion_1',
  title: 'Lektion 1 - Sich vorstellen',
  topics: [
    {
      id: 'hallo_schweiz',
      title: 'Hallo Schweiz',
      content: `Ich bin Maria. Ich bin neu in Schweiz. Ich wohne in Bern. Meine Heimat ist Portugal. Ich habe Hund. Er heisst Max und ist lustig. Ich gehe mit ihm in Park. Ich sehe viele Kinder. Einige spielen, andere fahren Fahrrad. Ein Baby schläft im Wagen. Ich will Freunde finden. Ich bin Erwachsen und kann arbeiten. Ich habe Ausweis und er ist neu. Ich will Arbeit suchen. Mein Nachbar heisst Herr Müller. Er wohnt neben mir und hilft oft. Ich bin dankbar und froh. Meine Mutter und mein Vater wohnen in Lissabon. Ich habe gute Eltern. Ich mache Anruf an meine Mutter. Ich habe Schwester und sie heisst Sofia. Wir sind Jugendliche. Sie will mich besuchen. Ich freue mich. Meine Nachbarin ist meine Bekannte und sie ist eine Ehefrau. Ihre Familie ist freundlich. Ihr Ehemann arbeitet in Bank. Ich war bei ihrer Hochzeit. Feier war schön. Ich habe getanzt, gegessen und Fotos gemacht. Ich war mit meinem Bruder und seiner Partnerin da. Wir wohnen alle zusammen. Mein Partner ist auch sehr nett. Ich gehe oft spazieren. Ich sehe Fluss in Bern. Fluss ist ruhig und schön. Ich denke an meine Heimat, aber ich will jetzt Schweiz kennenlernen. Ich höre viel Deutsch. Ich will jeden Tag Deutsch sprechen. Saddeea Gill ist meine Lehrerin. Sie sagt: "Leichte Sprache ist super einfach." Sie spricht Deutsch mit mir. Ich kann schnell lernen. Ich bin zufrieden in Schweiz.`
    },
    {
      id: 't_wie_tee',
      title: 'T wie Tee',
      content: 'Inhalte für "T wie Tee" kommen bald...'
    },
    {
      id: 'zahl_mit_ball',
      title: 'Zahl mit Ball',
      content: 'Inhalte für "Zahl mit Ball" kommen bald...'
    }
  ]
};
