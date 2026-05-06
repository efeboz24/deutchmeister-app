/**
 * TELC B2 Grammar Topics — 13 topics, 13–15 exercises each.
 */

import type { B1GrammarTopic } from "./grammar-b1";
export type { B1GrammarTopic as B2GrammarTopic };

export const B2_GRAMMAR_TOPICS: B1GrammarTopic[] = [
  // ─── 1. Futur II ──────────────────────────────────────────────────────────
  {
    id: "futur-ii",
    title: "Futur II",
    subtitle: "Gelecekte Tamamlanmış Eylem",
    explanation:
      "Futur II, gelecekte belirli bir anda tamamlanmış olacak eylemleri ifade eder. Türkçedeki '-mış/miş olacak' yapısına karşılık gelir. Ayrıca güçlü bir tahmin anlamı taşır.",
    rules: [
      {
        heading: "Yapı: werden + Partizip II + haben/sein",
        body: "Yardımcı fiil 'werden' çekimlenir, Partizip II ikinci konuma gelir ve en sona haben/sein (mastar) eklenir.",
        examples: [
          { de: "Bis morgen werde ich den Bericht geschrieben haben.", tr: "Yarına kadar raporu yazmış olacağım." },
          { de: "Er wird schon angekommen sein.", tr: "O muhtemelen çoktan gelmiş olacak." },
          { de: "Bis Ende des Jahres werden wir das Projekt abgeschlossen haben.", tr: "Yıl sonuna kadar projeyi bitirmiş olacağız." },
        ],
        table: {
          headers: ["Şahıs", "haben-Verben", "sein-Verben"],
          rows: [
            ["ich", "werde ... geschrieben haben", "werde ... angekommen sein"],
            ["du", "wirst ... geschrieben haben", "wirst ... angekommen sein"],
            ["er/sie/es", "wird ... geschrieben haben", "wird ... angekommen sein"],
            ["wir", "werden ... geschrieben haben", "werden ... angekommen sein"],
            ["sie/Sie", "werden ... geschrieben haben", "werden ... angekommen sein"],
          ],
        },
      },
      {
        heading: "Tahmin Anlamı (Vermutung)",
        body: "'wohl' zarfı ile Futur II güçlü bir tahmin ifade eder: 'muhtemelen ... olmuştur'.",
        examples: [
          { de: "Er wird den Zug wohl verpasst haben.", tr: "Muhtemelen treni kaçırmış olacak." },
          { de: "Sie wird es wohl vergessen haben.", tr: "O muhtemelen unutmuş olacak." },
        ],
      },
    ],
    exercises: {
      multipleChoice: [
        {
          id: 1,
          question: "Bis Freitag ___ ich den Aufsatz geschrieben ___.",
          options: ["habe / —", "werde / haben", "werde / sein", "habe / haben"],
          correct: 1,
          explanation: "Futur II: werden + Partizip II + haben → 'werde geschrieben haben'.",
        },
        {
          id: 2,
          question: "Er ___ wohl schon nach Hause ___.",
          options: ["wird / gegangen sein", "wird / gegangen haben", "ist / gegangen", "wird / gehen"],
          correct: 0,
          explanation: "gehen → sein-Verb. Futur II: wird gegangen sein.",
        },
        {
          id: 3,
          question: "Wenn du ankommst, ___ wir schon ___ ___.",
          options: ["werden / gegessen / haben", "haben / gegessen / —", "werden / essen / —", "sind / gegessen / —"],
          correct: 0,
          explanation: "Futur II: werden + Partizip II + haben (essen → haben-Verb).",
        },
        {
          id: 4,
          question: "Sie ___ die Nachricht wohl schon ___ ___.",
          options: ["wird / gehört / haben", "wird / hören / haben", "hat / gehört / —", "wird / gehört / sein"],
          correct: 0,
          explanation: "hören → haben-Verb. Futur II + wohl (tahmin).",
        },
        {
          id: 5,
          question: "Bis nächsten Montag ___ er das Buch ___ ___ .",
          options: ["wird / gelesen / haben", "hat / gelesen / —", "wird / lesen / —", "wird / gelesen / sein"],
          correct: 0,
          explanation: "lesen → haben-Verb. Futur II: wird gelesen haben.",
        },
        {
          id: 6,
          question: "Die Kinder ___ wohl schon ins Bett ___ ___.",
          options: ["werden / gegangen / sein", "werden / gegangen / haben", "sind / gegangen / —", "werden / gehen / sein"],
          correct: 0,
          explanation: "gehen → sein-Verb. Futur II: werden gegangen sein.",
        },
        {
          id: 7,
          question: "Ich ___ morgen früh die Aufgabe ___ ___.",
          options: ["werde / erledigt / haben", "habe / erledigt / —", "werde / erledigen / —", "werde / erledigt / sein"],
          correct: 0,
          explanation: "erledigen → haben-Verb. Futur II: werde erledigt haben.",
        },
      ],
      fillInBlank: [
        {
          id: 1,
          before: "Bis Ende des Monats werde ich das Buch",
          after: ". (lesen — Futur II, haben)",
          answer: "gelesen haben",
          hint: "Partizip II + haben → gelesen haben",
        },
        {
          id: 2,
          before: "Er wird wohl schon",
          after: ". (ankommen — Futur II, sein)",
          answer: "angekommen sein",
          hint: "ankommen → angekommen. sein-Verb → sein",
        },
        {
          id: 3,
          before: "Bis morgen Abend werden wir die Aufgaben",
          after: ". (abgeben — Futur II, haben)",
          answer: "abgegeben haben",
          hint: "abgeben (trennbar) → abgegeben. haben-Verb.",
        },
        {
          id: 4,
          before: "Sie wird den Brief wohl schon",
          after: ". (schreiben — Futur II, haben)",
          answer: "geschrieben haben",
          hint: "schreiben → geschrieben. haben-Verb.",
        },
        {
          id: 5,
          before: "Wenn du anrufst,",
          after: "er die Neuigkeit schon erfahren haben. (werden)",
          answer: "wird",
          hint: "Futur II: wird + Partizip II + haben",
        },
      ],
    },
  },

  // ─── 2. Konjunktiv II der Vergangenheit ───────────────────────────────────
  {
    id: "konjunktiv-ii-vergangenheit",
    title: "Konjunktiv II der Vergangenheit",
    subtitle: "Geçmişte Gerçekleşmemiş Durumlar",
    explanation:
      "Konjunktiv II der Vergangenheit geçmişte gerçekleşmemiş koşulları, pişmanlıkları ve varsayımları ifade eder. 'hätte/wäre + Partizip II' yapısıyla kurulur.",
    rules: [
      {
        heading: "Yapı: hätte/wäre + Partizip II",
        body: "haben-Verben → hätte + Partizip II. sein-Verben → wäre + Partizip II.",
        examples: [
          { de: "Wenn ich mehr gelernt hätte, hätte ich die Prüfung bestanden.", tr: "Daha çok çalışsaydım sınavı geçerdim." },
          { de: "Wenn er früher aufgestanden wäre, hätte er den Zug nicht verpasst.", tr: "Daha erken kalkseydı treni kaçırmazdı." },
          { de: "Das wäre schön gewesen.", tr: "Bu güzel olurdu." },
        ],
        table: {
          headers: ["Şahıs", "hätte + Partizip II", "wäre + Partizip II"],
          rows: [
            ["ich", "hätte gemacht", "wäre gegangen"],
            ["du", "hättest gemacht", "wärst gegangen"],
            ["er/sie/es", "hätte gemacht", "wäre gegangen"],
            ["wir", "hätten gemacht", "wären gegangen"],
            ["ihr", "hättet gemacht", "wärt gegangen"],
            ["sie/Sie", "hätten gemacht", "wären gegangen"],
          ],
        },
      },
      {
        heading: "Irreale Konditionalsätze — Wenn-Satz",
        body: "Wenn-Satz + Konjunktiv II Verg. → Hauptsatz + Konjunktiv II Verg. Sıralama her iki yönde de mümkün.",
        examples: [
          { de: "Wenn ich das gewusst hätte, wäre ich nicht gegangen.", tr: "Bunu bilseydim gitmezdim." },
          { de: "Hätte ich Zeit gehabt, hätte ich geholfen.", tr: "Zamanım olsaydı yardım ederdim. (Wenn'siz kuruluş)" },
        ],
      },
    ],
    exercises: {
      multipleChoice: [
        {
          id: 1,
          question: "Wenn sie früher angerufen ___, wäre ich zu Hause geblieben.",
          options: ["hat", "hätte", "habe", "hatte"],
          correct: 1,
          explanation: "Konjunktiv II Vergangenheit: anrufen → haben-Verb → hätte angerufen.",
        },
        {
          id: 2,
          question: "Wenn er schneller ___ ___, hätte er den Bus noch bekommen.",
          options: ["gelaufen wäre", "gelaufen hätte", "laufen wäre", "läuft"],
          correct: 0,
          explanation: "laufen → sein-Verb → wäre gelaufen.",
        },
        {
          id: 3,
          question: "Ich ___ mitgekommen, wenn du mich eingeladen hättest.",
          options: ["wäre", "hätte", "würde", "bin"],
          correct: 0,
          explanation: "mitkommen → sein-Verb → wäre mitgekommen.",
        },
        {
          id: 4,
          question: "___ ich das früher gewusst, hätte ich anders entschieden.",
          options: ["Wenn", "Hätte", "Wäre", "Hat"],
          correct: 1,
          explanation: "Wenn'siz kuruluşta Konjunktiv II öne gelir: 'Hätte ich...'. wissen → haben-Verb → hätte gewusst.",
        },
        {
          id: 5,
          question: "Das ___ wirklich schön gewesen, wenn wir mehr Zeit gehabt hätten.",
          options: ["war", "wäre", "würde", "sei"],
          correct: 1,
          explanation: "Konjunktiv II Verg.: sein → wäre (+ gewesen Partizip II).",
        },
        {
          id: 6,
          question: "Wenn du aufgepasst ___, hättest du den Fehler nicht gemacht.",
          options: ["hast", "hättest", "hattest", "hätte"],
          correct: 1,
          explanation: "aufpassen → haben-Verb → hättest aufgepasst (du-Form).",
        },
        {
          id: 7,
          question: "Sie wäre glücklicher ___, wenn sie eine andere Entscheidung getroffen hätte.",
          options: ["sein", "gewesen", "war", "wäre"],
          correct: 1,
          explanation: "wäre + Partizip II (gewesen) = Konjunktiv II Verg. von 'sein'.",
        },
      ],
      fillInBlank: [
        {
          id: 1,
          before: "Wenn ich das gewusst",
          after: ", wäre ich nicht gegangen. (hätte — haben-Verb)",
          answer: "hätte",
          hint: "wissen → haben-Verb → hätte gewusst",
        },
        {
          id: 2,
          before: "Er wäre nicht krank",
          after: ", wenn er mehr geschlafen hätte. (geworden)",
          answer: "geworden",
          hint: "werden → sein-Verb → wäre geworden",
        },
        {
          id: 3,
          before: "Hätte sie früher angefangen,",
          after: "sie jetzt fertig. (wäre)",
          answer: "wäre",
          hint: "sein → wäre (Konjunktiv II Verg.)",
        },
        {
          id: 4,
          before: "Wenn wir das Auto genommen",
          after: ", wären wir früher angekommen. (hätten)",
          answer: "hätten",
          hint: "nehmen → haben-Verb → hätten genommen",
        },
        {
          id: 5,
          before: "Das Konzert",
          after: "schöner gewesen, wenn es nicht geregnet hätte. (wäre)",
          answer: "wäre",
          hint: "Konjunktiv II Verg. von sein → wäre",
        },
      ],
    },
  },

  // ─── 3. Zustandspassiv ────────────────────────────────────────────────────
  {
    id: "zustandspassiv",
    title: "Zustandspassiv",
    subtitle: "Durum Edilgeni vs. Eylem Edilgeni",
    explanation:
      "Zustandspassiv (sein + Partizip II) bir eylemin sonucunda oluşan kalıcı durumu ifade eder. Vorgangspassiv (werden + Partizip II) ise eylemin kendisini. Bu ayrım TELC B2'de kritiktir.",
    rules: [
      {
        heading: "Vorgangspassiv vs. Zustandspassiv",
        body: "Vorgangspassiv: werden + Partizip II → eylem süreci. Zustandspassiv: sein + Partizip II → eylemin sonucu/durumu.",
        examples: [
          { de: "Die Tür wird geöffnet. (Vorgang)", tr: "Kapı açılıyor. (eylem)" },
          { de: "Die Tür ist geöffnet. (Zustand)", tr: "Kapı açık. (durum)" },
          { de: "Das Fenster wurde gebrochen. (Vorgang Prät.)", tr: "Pencere kırıldı." },
          { de: "Das Fenster ist gebrochen. (Zustand)", tr: "Pencere kırık durumda." },
        ],
        table: {
          headers: ["Zaman", "Vorgangspassiv", "Zustandspassiv"],
          rows: [
            ["Präsens", "wird geöffnet", "ist geöffnet"],
            ["Präteritum", "wurde geöffnet", "war geöffnet"],
            ["Perfekt", "ist geöffnet worden", "ist geöffnet (= Zustand)"],
          ],
        },
      },
      {
        heading: "Zustandspassiv Präteritum",
        body: "war + Partizip II — geçmişteki bir durum.",
        examples: [
          { de: "Als ich ankam, war die Tür schon geschlossen.", tr: "Geldiğimde kapı zaten kapalıydı." },
          { de: "Der Brief war bereits unterschrieben.", tr: "Mektup zaten imzalanmıştı." },
        ],
      },
    ],
    exercises: {
      multipleChoice: [
        {
          id: 1,
          question: "Das Geschäft ___ um 9 Uhr geöffnet. (şu an açık — durum)",
          options: ["wird", "wurde", "ist", "war"],
          correct: 2,
          explanation: "Durum → Zustandspassiv: ist + geöffnet.",
        },
        {
          id: 2,
          question: "Das Geschäft ___ gerade geöffnet. (açılıyor — eylem süreci)",
          options: ["ist", "wird", "war", "sei"],
          correct: 1,
          explanation: "Eylem süreci → Vorgangspassiv: wird + geöffnet.",
        },
        {
          id: 3,
          question: "Als wir ankamen, ___ die Tür bereits geschlossen.",
          options: ["wurde", "ist", "war", "wird"],
          correct: 2,
          explanation: "Geçmişteki durum → Zustandspassiv Präteritum: war + geschlossen.",
        },
        {
          id: 4,
          question: "Der Vertrag ___ gestern unterschrieben. (imzalama eylemi)",
          options: ["ist", "war", "wurde", "wird"],
          correct: 2,
          explanation: "Geçmişte gerçekleşen eylem → Vorgangspassiv Präteritum: wurde + unterschrieben.",
        },
        {
          id: 5,
          question: "Der Vertrag ___ jetzt unterschrieben. (imzalı — şu anki durum)",
          options: ["wird", "wurde", "ist", "war"],
          correct: 2,
          explanation: "Şu anki durum → Zustandspassiv: ist + unterschrieben.",
        },
        {
          id: 6,
          question: "Die Brücke ___ 1995 gebaut. (inşaat eylemi, geçmiş)",
          options: ["ist", "war", "wurde", "wird"],
          correct: 2,
          explanation: "Geçmişteki eylem → Vorgangspassiv Prät.: wurde + gebaut.",
        },
        {
          id: 7,
          question: "Die Fenster ___ schon gewaschen — wir können beginnen. (durum)",
          options: ["wurden", "werden", "sind", "waren"],
          correct: 2,
          explanation: "Şu anki hazır durum → Zustandspassiv: sind + gewaschen.",
        },
      ],
      fillInBlank: [
        {
          id: 1,
          before: "Die Aufgabe",
          after: "schon erledigt. Wir können gehen. (sein — Zustand)",
          answer: "ist",
          hint: "Zustandspassiv Präsens: ist + Partizip II",
        },
        {
          id: 2,
          before: "Als ich aufwachte,",
          after: "das Essen schon gekocht. (sein — Zustand Prät.)",
          answer: "war",
          hint: "Zustandspassiv Präteritum: war + Partizip II",
        },
        {
          id: 3,
          before: "Das neue Museum",
          after: "letztes Jahr eröffnet. (werden — Vorgang Prät.)",
          answer: "wurde",
          hint: "Vorgangspassiv Präteritum: wurde + Partizip II",
        },
        {
          id: 4,
          before: "Die Wohnung",
          after: "frisch gestrichen. Man kann den Geruch noch riechen. (sein)",
          answer: "ist",
          hint: "Zustandspassiv: ist + gestrichen",
        },
        {
          id: 5,
          before: "Der Brief",
          after: "heute früh verschickt. (werden — Vorgang)",
          answer: "wurde",
          hint: "Vorgangspassiv Prät.: wurde + verschickt",
        },
      ],
    },
  },

  // ─── 4. Konjunktiv I (Indirekte Rede) ─────────────────────────────────────
  {
    id: "konjunktiv-i",
    title: "Konjunktiv I — Indirekte Rede",
    subtitle: "Dolaylı Anlatım",
    explanation:
      "Konjunktiv I, başkasının sözlerini dolaylı olarak aktarırken kullanılır. Gazete haberleri, raporlar ve resmi metinlerde yaygındır. Präsens formu: fiil kökü + e (ich komme → er komme).",
    rules: [
      {
        heading: "Konjunktiv I Präsens Çekimi",
        body: "Fiil kökü + e eklenir. 1. tekil şahıs (ich) genellikle Konjunktiv II ile karıştırıldığından dikkat gerekir. sein fiili düzensizdir: sei.",
        examples: [
          { de: "Er sagt, er sei krank. (sein → sei)", tr: "Hasta olduğunu söylüyor." },
          { de: "Sie berichtet, die Zahlen seien gestiegen.", tr: "Sayıların arttığını bildiriyor." },
          { de: "Der Minister erklärte, das Problem werde gelöst.", tr: "Bakan sorunun çözüleceğini açıkladı." },
        ],
        table: {
          headers: ["Şahıs", "kommen", "haben", "sein"],
          rows: [
            ["ich", "komme", "habe", "sei"],
            ["du", "kommest", "habest", "seist"],
            ["er/sie/es", "komme", "habe", "sei"],
            ["wir", "kommen (= Ind.!)", "haben (= Ind.!)", "seien"],
            ["ihr", "kommet", "habet", "seiet"],
            ["sie/Sie", "kommen (= Ind.!)", "haben (= Ind.!)", "seien"],
          ],
        },
      },
      {
        heading: "Konjunktiv I Perfekt (geçmiş aktarım)",
        body: "Konjunktiv I Perfekt: habe/sei + Partizip II. Aktarılan eylem geçmişteydi.",
        examples: [
          { de: "Er behauptet, er habe das nicht gewusst.", tr: "Bunu bilmediğini iddia ediyor." },
          { de: "Sie sagte, sie sei schon angekommen.", tr: "Çoktan geldiğini söyledi." },
        ],
      },
    ],
    exercises: {
      multipleChoice: [
        {
          id: 1,
          question: "Der Zeuge sagt, er ___ nichts gesehen. (haben — Konj. I Perfekt)",
          options: ["hat", "habe", "hätte", "hatte"],
          correct: 1,
          explanation: "Konjunktiv I Perfekt: habe + Partizip II (haben-Verb).",
        },
        {
          id: 2,
          question: "Die Politikerin erklärte, sie ___ die Situation im Griff.",
          options: ["hat", "hätte", "habe", "hatte"],
          correct: 2,
          explanation: "Konjunktiv I Präsens: haben → habe (3. Person: er/sie/es habe).",
        },
        {
          id: 3,
          question: "Laut dem Bericht ___ die Preise gestiegen.",
          options: ["sind", "wären", "seien", "sein"],
          correct: 2,
          explanation: "Konjunktiv I von sein (Plural): seien.",
        },
        {
          id: 4,
          question: "Der Experte behauptet, das Projekt ___ erfolgreich abgeschlossen worden.",
          options: ["sei", "ist", "wäre", "war"],
          correct: 0,
          explanation: "Konjunktiv I Passiv Perfekt: sei + Partizip II + worden.",
        },
        {
          id: 5,
          question: "Er sagte, er ___ morgen kommen. (werden — Futur Konj. I)",
          options: ["wird", "würde", "werde", "sei"],
          correct: 2,
          explanation: "Konjunktiv I Futur: werden → werde (er/sie werde kommen).",
        },
        {
          id: 6,
          question: "Die Zeitung berichtet, der Angeklagte ___ unschuldig.",
          options: ["ist", "sei", "wäre", "war"],
          correct: 1,
          explanation: "Konjunktiv I von sein: sei. Gazete dilinde dolaylı aktarım.",
        },
        {
          id: 7,
          question: "Laut Aussage des Ministers ___ das Gesetz nächste Woche in Kraft treten.",
          options: ["würde", "werde", "wird", "sei"],
          correct: 1,
          explanation: "Konjunktiv I Futur: werden → werde (er werde ... treten).",
        },
      ],
      fillInBlank: [
        {
          id: 1,
          before: "Der Politiker sagte, er",
          after: "keine Fehler gemacht. (haben — Konj. I Perfekt)",
          answer: "habe",
          hint: "Konjunktiv I Perfekt: habe + Partizip II",
        },
        {
          id: 2,
          before: "Laut dem Bericht",
          after: "die Lage stabil. (sein — Konj. I Präsens)",
          answer: "sei",
          hint: "sein → sei (Konjunktiv I, Singular)",
        },
        {
          id: 3,
          before: "Die Wissenschaftlerin erklärte, die Ergebnisse",
          after: "noch nicht abschließend. (sein — Konj. I Plural)",
          answer: "seien",
          hint: "sein → seien (Konjunktiv I, Plural)",
        },
        {
          id: 4,
          before: "Er behauptete, er",
          after: "alles genau gewusst. (haben — Konj. I Perf.)",
          answer: "habe",
          hint: "habe + gewusst = Konjunktiv I Perfekt",
        },
        {
          id: 5,
          before: "Laut Medienberichten",
          after: "das Unternehmen in finanzielle Schwierigkeiten geraten. (sein — Konj. I Perf.)",
          answer: "sei",
          hint: "geraten → sein-Verb → sei geraten (Konj. I Perfekt)",
        },
      ],
    },
  },

  // ─── 5. Temporal-Konnektoren ──────────────────────────────────────────────
  {
    id: "temporal-konnektoren-b2",
    title: "Temporal-Konnektoren B2",
    subtitle: "sobald, solange, bis, seitdem, kaum...als",
    explanation:
      "B2 düzeyinde temel zaman bağlaçlarının ötesinde daha nüanslı zaman ilişkileri kurulur. 'sobald' (hemen...r), 'solange' (olduğu sürece), 'bis' (kadar), 'kaum...als' (daha...-meden) sıkça çıkar.",
    rules: [
      {
        heading: "sobald, solange, bis",
        body: "'sobald' = hemen akabinde. 'solange' = eş zamanlı süren koşul. 'bis' = belirli bir noktaya kadar.",
        examples: [
          { de: "Sobald er ankommt, beginnen wir.", tr: "Gelir gelmez başlıyoruz." },
          { de: "Solange ich hier bin, helfe ich dir.", tr: "Burada olduğum sürece sana yardım ederim." },
          { de: "Warte, bis ich fertig bin.", tr: "Ben bitirene kadar bekle." },
        ],
      },
      {
        heading: "kaum...als (daha...meden)",
        body: "'Kaum + Plusquamperfekt, als + Präteritum' yapısı: bir eylem daha bitmeden diğeri başlar.",
        examples: [
          { de: "Kaum hatte ich das Haus verlassen, als es zu regnen begann.", tr: "Daha evi terk etmeden yağmur başladı." },
          { de: "Kaum waren wir angekommen, als das Fest begann.", tr: "Daha yeni gelmiştik ki festival başladı." },
        ],
      },
    ],
    exercises: {
      multipleChoice: [
        {
          id: 1,
          question: "___ er anruft, gib mir Bescheid.",
          options: ["Bis", "Solange", "Sobald", "Als"],
          correct: 2,
          explanation: "'sobald' = hemen ardından (gelir gelmez).",
        },
        {
          id: 2,
          question: "Ich warte hier, ___ du zurückkommst.",
          options: ["sobald", "solange", "bis", "seitdem"],
          correct: 2,
          explanation: "'bis' = geri dönene kadar (belirli bitiş noktası).",
        },
        {
          id: 3,
          question: "___ ich hier arbeite, habe ich keine Probleme gehabt.",
          options: ["Bis", "Sobald", "Solange", "Kaum"],
          correct: 2,
          explanation: "'solange' = çalıştığım süre boyunca.",
        },
        {
          id: 4,
          question: "Kaum hatte sie das Buch geöffnet, ___ das Licht aus.",
          options: ["sobald", "als", "wenn", "bis"],
          correct: 1,
          explanation: "'kaum...als' yapısında 'als' ile tamamlanır.",
        },
        {
          id: 5,
          question: "___ sie ausgezogen ist, ist es sehr ruhig hier.",
          options: ["Solange", "Sobald", "Seitdem", "Bis"],
          correct: 2,
          explanation: "'seitdem' = o zamandan beri (devam eden değişim).",
        },
        {
          id: 6,
          question: "Bitte warte hier, ___ ich wiederkomme.",
          options: ["solange", "bis", "sobald", "seitdem"],
          correct: 1,
          explanation: "'bis' = geri dönene kadar (bitiş noktası).",
        },
        {
          id: 7,
          question: "___ du in Deutschland bist, solltest du viel Deutsch sprechen.",
          options: ["Seitdem", "Sobald", "Bis", "Solange"],
          correct: 3,
          explanation: "'solange' = orada olduğun sürece.",
        },
      ],
      fillInBlank: [
        {
          id: 1,
          before: "___ die Prüfung vorbei ist, gehen wir feiern.",
          after: "(sobald)",
          answer: "Sobald",
          hint: "sobald = hemen akabinde",
        },
        {
          id: 2,
          before: "Wir bleiben hier,",
          after: "es aufhört zu regnen. (bis)",
          answer: "bis",
          hint: "bis = kadar",
        },
        {
          id: 3,
          before: "Kaum hatte er den Raum betreten,",
          after: "alle aufgehört zu reden. (als)",
          answer: "als",
          hint: "kaum...als yapısında 'als' gelir",
        },
        {
          id: 4,
          before: "___ er hier wohnt, ist er viel glücklicher.",
          after: "(seitdem)",
          answer: "Seitdem",
          hint: "seitdem = o zamandan beri",
        },
        {
          id: 5,
          before: "___ ich Zeit habe, lese ich gern Bücher.",
          after: "(solange)",
          answer: "Solange",
          hint: "solange = olduğu sürece",
        },
      ],
    },
  },

  // ─── 6. je...desto / umso ─────────────────────────────────────────────────
  {
    id: "je-desto",
    title: "je...desto / je...umso",
    subtitle: "Orantılı Karşılaştırma",
    explanation:
      "'je...desto/umso' (ne kadar...o kadar) iki değişken arasındaki orantıyı ifade eder. Her iki tarafta da Komparativ kullanılır. Fiil sırası: 'je' yan cümlesi (V sona), 'desto/umso' ana cümlesi (V2).",
    rules: [
      {
        heading: "Yapı ve Fiil Sırası",
        body: "'je + Komparativ (+ ...) + Verb, desto/umso + Komparativ + Verb (+ Subjekt)'.",
        examples: [
          { de: "Je mehr man liest, desto besser versteht man.", tr: "Ne kadar çok okursan, o kadar iyi anlarsın." },
          { de: "Je früher, desto besser.", tr: "Ne kadar erken, o kadar iyi." },
          { de: "Je länger man übt, umso flüssiger spricht man.", tr: "Ne kadar çok pratik yaparsan, o kadar akıcı konuşursun." },
        ],
        table: {
          headers: ["je-Cümlesi", "desto/umso-Cümlesi"],
          rows: [
            ["je mehr man liest", "desto besser versteht man"],
            ["je früher man beginnt", "umso mehr Zeit hat man"],
            ["je mehr Geld man hat", "desto mehr Probleme entstehen"],
          ],
        },
      },
    ],
    exercises: {
      multipleChoice: [
        {
          id: 1,
          question: "Je mehr man trainiert, ___ man wird.",
          options: ["desto fitter", "umso fit", "je fitter", "desto fit"],
          correct: 0,
          explanation: "'je...desto + Komparativ': desto fitter.",
        },
        {
          id: 2,
          question: "___ früher du anfängst, desto schneller bist du fertig.",
          options: ["Desto", "Umso", "Je", "Als"],
          correct: 2,
          explanation: "je + Komparativ → desto/umso + Komparativ.",
        },
        {
          id: 3,
          question: "Je länger man wartet, ___ schwieriger wird das Problem.",
          options: ["je", "desto", "als", "umso mehr"],
          correct: 1,
          explanation: "'desto' + Komparativ im Hauptsatz.",
        },
        {
          id: 4,
          question: "Je mehr Sprachen man spricht, ___ Möglichkeiten hat man.",
          options: ["je mehr", "desto mehr", "umso viel", "als mehr"],
          correct: 1,
          explanation: "desto + Komparativ (mehr).",
        },
        {
          id: 5,
          question: "Je weniger man schläft, ___ man sich fühlt.",
          options: ["desto müder", "je müder", "umso müde", "als müder"],
          correct: 0,
          explanation: "desto + Komparativ: desto müder.",
        },
        {
          id: 6,
          question: "Je höher die Temperatur, ___ gefährlicher ist die Situation.",
          options: ["desto", "umso", "je", "A ve B doğru"],
          correct: 3,
          explanation: "Hem 'desto' hem 'umso' kullanılabilir.",
        },
        {
          id: 7,
          question: "___ lauter man spricht, desto besser versteht man ihn.",
          options: ["Desto", "Je", "Umso", "Als"],
          correct: 1,
          explanation: "je + Komparativ (lauter) → desto + Komparativ.",
        },
      ],
      fillInBlank: [
        {
          id: 1,
          before: "Je mehr man übt,",
          after: "besser wird man. (desto)",
          answer: "desto",
          hint: "je...desto + Komparativ",
        },
        {
          id: 2,
          before: "Je früher man aufsteht,",
          after: "mehr Zeit hat man. (umso)",
          answer: "umso",
          hint: "je...umso + Komparativ",
        },
        {
          id: 3,
          before: "___ weniger man isst,",
          after: "desto schwächer fühlt man sich.",
          answer: "Je",
          hint: "je + Komparativ (weniger)",
        },
        {
          id: 4,
          before: "Je komplizierter die Aufgabe,",
          after: "mehr Zeit braucht man. (desto)",
          answer: "desto",
          hint: "desto + Komparativ",
        },
        {
          id: 5,
          before: "Je",
          after: "Vokabeln man lernt, desto besser versteht man Texte. (mehr)",
          answer: "mehr",
          hint: "je + mehr (Komparativ von viel)",
        },
      ],
    },
  },

  // ─── 7. Konsekutivsätze ───────────────────────────────────────────────────
  {
    id: "konsekutivsaetze",
    title: "Konsekutivsätze",
    subtitle: "Sonuç Bildiren Yapılar",
    explanation:
      "Sonuç bildiren yapılar bir eylemin ya da durumun doğal sonucunu ifade eder. 'sodass/so...dass' (öyle ki), 'folglich', 'infolgedessen', 'deshalb', 'daher' (bu yüzden) en sık kullanılanlardır.",
    rules: [
      {
        heading: "sodass / so...dass",
        body: "'sodass' (yazılırken ayrı da olur: 'so dass') yan cümle bağlacıdır, fiili sona atar. 'so + Adjektiv, dass' güçlü bir sonuç bildirir.",
        examples: [
          { de: "Es regnete stark, sodass wir zu Hause blieben.", tr: "Çok yağmur yağdı, öyle ki evde kaldık." },
          { de: "Er war so müde, dass er sofort einschlief.", tr: "Öyle yorgundu ki hemen uyudu." },
        ],
      },
      {
        heading: "folglich, infolgedessen, deshalb, daher",
        body: "Bu zarflar bağımsız cümleleri mantıksal sonuç ilişkisiyle bağlar. Fiil sırası V2 kalır.",
        examples: [
          { de: "Er hat viel gelernt; folglich hat er die Prüfung bestanden.", tr: "Çok çalıştı; dolayısıyla sınavı geçti." },
          { de: "Es gibt Stau; infolgedessen komme ich später.", tr: "Trafik var; bu nedenle geç geliyorum." },
          { de: "Sie war krank, deshalb kam sie nicht.", tr: "Hastaydı, bu yüzden gelmedi." },
        ],
      },
    ],
    exercises: {
      multipleChoice: [
        {
          id: 1,
          question: "Er hat nicht genug geübt, ___ hat er die Prüfung nicht bestanden.",
          options: ["obwohl", "folglich", "sodass", "weil"],
          correct: 1,
          explanation: "'folglich' = dolayısıyla (sonuç bildirimi, V2).",
        },
        {
          id: 2,
          question: "Es war so kalt, ___ wir früher nach Hause gingen.",
          options: ["folglich", "dass", "deshalb", "weil"],
          correct: 1,
          explanation: "'so kalt, dass' = öyle soğuktu ki.",
        },
        {
          id: 3,
          question: "Es gab einen Unfall; ___ war der Verkehr blockiert.",
          options: ["sodass", "folglich", "infolgedessen", "B ve C doğru"],
          correct: 3,
          explanation: "Hem 'folglich' hem 'infolgedessen' kullanılabilir (dolayısıyla).",
        },
        {
          id: 4,
          question: "Er ist krank; ___ kann er heute nicht arbeiten.",
          options: ["obwohl", "deshalb", "sodass", "weil"],
          correct: 1,
          explanation: "'deshalb' = bu yüzden (V2 sırası).",
        },
        {
          id: 5,
          question: "Das Essen war so scharf, ___ sie viel Wasser trinken musste.",
          options: ["folglich", "daher", "dass", "deshalb"],
          correct: 2,
          explanation: "'so scharf, dass' — sodass yapısı.",
        },
        {
          id: 6,
          question: "Die Firma hat Verluste gemacht; ___ mussten Stellen gestrichen werden.",
          options: ["obwohl", "sodass", "folglich", "während"],
          correct: 2,
          explanation: "'folglich' = dolayısıyla (iş kaybına neden oldu).",
        },
        {
          id: 7,
          question: "Er hatte Hunger, ___ aß er alles auf.",
          options: ["sodass", "deshalb", "folglich", "B ve C doğru"],
          correct: 3,
          explanation: "'deshalb' ve 'folglich' her ikisi de kullanılabilir.",
        },
      ],
      fillInBlank: [
        {
          id: 1,
          before: "Er war so erschöpft,",
          after: "er sofort einschlief. (dass)",
          answer: "dass",
          hint: "so + Adjektiv, dass = öyle ki",
        },
        {
          id: 2,
          before: "Es gab keinen freien Platz;",
          after: "mussten wir woanders sitzen. (folglich)",
          answer: "folglich",
          hint: "folglich = dolayısıyla (V2)",
        },
        {
          id: 3,
          before: "Sie hatte keine Zeit;",
          after: "konnte sie nicht kommen. (deshalb)",
          answer: "deshalb",
          hint: "deshalb = bu yüzden (V2)",
        },
        {
          id: 4,
          before: "Es regnete stark,",
          after: "die Straße überschwemmt wurde. (sodass)",
          answer: "sodass",
          hint: "sodass = öyle ki (fiil sona)",
        },
        {
          id: 5,
          before: "Der Zug hatte Verspätung;",
          after: "kamen wir zu spät an. (infolgedessen)",
          answer: "infolgedessen",
          hint: "infolgedessen = bu nedenle (V2)",
        },
      ],
    },
  },

  // ─── 8. Negationswörter ───────────────────────────────────────────────────
  {
    id: "negationswoerter",
    title: "Negationswörter",
    subtitle: "Olumsuzluk Kelimeleri",
    explanation:
      "Almancada 'nicht' ve 'kein' dışında güçlü olumsuzluk bildiren kelimeler: nie/niemals (hiçbir zaman), nichts (hiçbir şey), niemand (kimse), nirgends/nirgendwo (hiçbir yerde), kaum (neredeyse hiç).",
    rules: [
      {
        heading: "Temel Negationswörter",
        body: "Her kelime belirli bir isim sınıfını veya zamanı olumsuzlar.",
        examples: [
          { de: "Ich habe nichts gesagt.", tr: "Hiçbir şey demedim." },
          { de: "Das habe ich nie getan.", tr: "Bunu hiç yapmadım." },
          { de: "Ich kenne niemanden hier.", tr: "Burada kimseyi tanımıyorum." },
          { de: "Ich finde das Buch nirgends.", tr: "Kitabı hiçbir yerde bulamıyorum." },
          { de: "Er schläft kaum — er ist immer müde.", tr: "Neredeyse hiç uyumuyor." },
        ],
        table: {
          headers: ["Kelime", "Anlam", "Olumsuzladığı Şey"],
          rows: [
            ["nie / niemals", "hiçbir zaman", "zaman"],
            ["nichts", "hiçbir şey", "nesne / içerik"],
            ["niemand", "kimse", "kişi"],
            ["nirgends/nirgendwo", "hiçbir yerde", "yer"],
            ["kaum", "neredeyse hiç", "derece/miktar"],
            ["kein(e)", "hiç..., ...değil", "belirsiz isim"],
          ],
        },
      },
    ],
    exercises: {
      multipleChoice: [
        {
          id: 1,
          question: "Ich habe ___ Geld. (Hiç param yok)",
          options: ["nicht", "nie", "kein", "nichts"],
          correct: 2,
          explanation: "İsim olumsuzlama: kein + Nomen (Geld = Neutrum → kein Geld).",
        },
        {
          id: 2,
          question: "Sie hat ___ erzählt. (Hiçbir şey anlatmadı)",
          options: ["niemanden", "nirgends", "nichts", "nie"],
          correct: 2,
          explanation: "'nichts' = hiçbir şey.",
        },
        {
          id: 3,
          question: "Er kennt ___ in dieser Stadt.",
          options: ["nichts", "nirgends", "niemanden", "nie"],
          correct: 2,
          explanation: "'niemand' kişi için → Akkusativ: niemanden.",
        },
        {
          id: 4,
          question: "Ich habe ihn ___ gesehen — er ist immer weg.",
          options: ["nichts", "nirgends", "niemanden", "nie"],
          correct: 3,
          explanation: "'nie' = hiçbir zaman.",
        },
        {
          id: 5,
          question: "Das Buch ist ___ zu finden. (hiçbir yerde)",
          options: ["nichts", "niemanden", "nirgends", "nie"],
          correct: 2,
          explanation: "'nirgends' = hiçbir yerde.",
        },
        {
          id: 6,
          question: "Er schläft ___ — daher ist er immer müde.",
          options: ["nie", "kaum", "nichts", "nirgends"],
          correct: 1,
          explanation: "'kaum' = neredeyse hiç (çok az).",
        },
        {
          id: 7,
          question: "Wir haben ___ Probleme gehabt. (Hiç sorunumuz olmadı)",
          options: ["nie", "keine", "nichts", "nirgends"],
          correct: 1,
          explanation: "'keine' + Plural Nomen = hiç ... (kein + Probleme → keine Probleme).",
        },
      ],
      fillInBlank: [
        {
          id: 1,
          before: "Sie hat",
          after: "von dem Unfall gehört. (nichts)",
          answer: "nichts",
          hint: "nichts = hiçbir şey",
        },
        {
          id: 2,
          before: "Ich habe ihn",
          after: "so glücklich gesehen. (nie)",
          answer: "nie",
          hint: "nie = hiçbir zaman",
        },
        {
          id: 3,
          before: "Das Portemonnaie ist",
          after: "zu finden. (nirgends)",
          answer: "nirgends",
          hint: "nirgends = hiçbir yerde",
        },
        {
          id: 4,
          before: "Er kennt",
          after: "in dieser Stadt. (niemanden)",
          answer: "niemanden",
          hint: "niemand → Akkusativ: niemanden",
        },
        {
          id: 5,
          before: "Wir haben",
          after: "Zeit mehr. (keine)",
          answer: "keine",
          hint: "kein + Feminin/Plural → keine",
        },
      ],
    },
  },

  // ─── 9. Relativsätze im Genitiv ───────────────────────────────────────────
  {
    id: "relativsaetze-genitiv",
    title: "Relativsätze im Genitiv",
    subtitle: "Genitiv İlgi Cümleleri: dessen, deren",
    explanation:
      "Genitiv Relativpronomen sahiplik ilişkisi kurar. Maskulin ve Neutrum için 'dessen', Feminin ve Plural için 'deren' kullanılır.",
    rules: [
      {
        heading: "dessen vs. deren",
        body: "'dessen' = eril/nötr ismin sahipliği. 'deren' = dişil/çoğul ismin sahipliği.",
        examples: [
          { de: "Der Mann, dessen Auto gestohlen wurde, wartet.", tr: "Arabası çalınan adam bekliyor." },
          { de: "Die Frau, deren Tochter Ärztin ist, ist stolz.", tr: "Kızı doktor olan kadın gurur duyuyor." },
          { de: "Das Kind, dessen Eltern im Ausland leben, wohnt bei der Oma.", tr: "Ebeveynleri yurt dışında yaşayan çocuk büyükannesinde kalıyor." },
          { de: "Die Studenten, deren Noten gut sind, bekommen ein Stipendium.", tr: "Notları iyi olan öğrenciler burs alıyor." },
        ],
        table: {
          headers: ["Cinsiyet", "Relativpronomen", "Örnek"],
          rows: [
            ["Maskulin (der)", "dessen", "der Mann, dessen Auto..."],
            ["Feminin (die)", "deren", "die Frau, deren Tochter..."],
            ["Neutrum (das)", "dessen", "das Kind, dessen Eltern..."],
            ["Plural (die)", "deren", "die Leute, deren Meinung..."],
          ],
        },
      },
    ],
    exercises: {
      multipleChoice: [
        {
          id: 1,
          question: "Das ist der Kollege, ___ Ideen immer gut sind. (Maskulin)",
          options: ["deren", "dessen", "der", "dem"],
          correct: 1,
          explanation: "Maskulin Genitiv → 'dessen'.",
        },
        {
          id: 2,
          question: "Die Lehrerin, ___ Unterricht sehr interessant ist, heißt Frau Müller.",
          options: ["dessen", "deren", "der", "die"],
          correct: 1,
          explanation: "Feminin Genitiv → 'deren'.",
        },
        {
          id: 3,
          question: "Das Unternehmen, ___ Produkte weltweit bekannt sind, hat seinen Sitz in Berlin.",
          options: ["deren", "dessen", "das", "dem"],
          correct: 1,
          explanation: "Neutrum Genitiv → 'dessen'.",
        },
        {
          id: 4,
          question: "Die Schüler, ___ Eltern im Ausland sind, bekommen Unterstützung.",
          options: ["dessen", "deren", "die", "denen"],
          correct: 1,
          explanation: "Plural Genitiv → 'deren'.",
        },
        {
          id: 5,
          question: "Der Politiker, ___ Partei die Wahl gewonnen hat, hält eine Rede.",
          options: ["deren", "dessen", "der", "dem"],
          correct: 1,
          explanation: "Maskulin Genitiv → 'dessen'.",
        },
        {
          id: 6,
          question: "Die Stadt, ___ Geschichte sehr alt ist, zieht viele Touristen an.",
          options: ["dessen", "deren", "die", "der"],
          correct: 1,
          explanation: "Feminin Genitiv → 'deren'.",
        },
        {
          id: 7,
          question: "Er ist ein Schriftsteller, ___ Romane ich sehr mag.",
          options: ["deren", "dessen", "der", "dem"],
          correct: 1,
          explanation: "Maskulin Genitiv → 'dessen'.",
        },
      ],
      fillInBlank: [
        {
          id: 1,
          before: "Das ist der Arzt,",
          after: "Diagnose mich gerettet hat. (Maskulin Genitiv)",
          answer: "dessen",
          hint: "Maskulin Genitiv → dessen",
        },
        {
          id: 2,
          before: "Die Firma,",
          after: "Produkte ich immer kaufe, hat jetzt Probleme. (Feminin Genitiv)",
          answer: "deren",
          hint: "Feminin Genitiv → deren",
        },
        {
          id: 3,
          before: "Das ist das Buch,",
          after: "Autor sehr berühmt ist. (Neutrum Genitiv)",
          answer: "dessen",
          hint: "Neutrum Genitiv → dessen",
        },
        {
          id: 4,
          before: "Die Nachbarn,",
          after: "Hund immer bellt, ziehen bald aus. (Plural Genitiv)",
          answer: "deren",
          hint: "Plural Genitiv → deren",
        },
        {
          id: 5,
          before: "Er ist ein Künstler,",
          after: "Bilder in vielen Museen hängen. (Maskulin Genitiv)",
          answer: "dessen",
          hint: "Maskulin Genitiv → dessen",
        },
      ],
    },
  },

  // ─── 10. Genitiv Präpositionen ────────────────────────────────────────────
  {
    id: "genitiv-praepositionen-b2",
    title: "Genitiv Präpositionen — Erweitert",
    subtitle: "innerhalb, außerhalb, statt, anstelle, angesichts, mithilfe",
    explanation:
      "B2 düzeyinde temel Genitiv edatlarının (wegen, trotz, während, aufgrund) ötesinde yeni edatlar öğrenilir: innerhalb (içinde), außerhalb (dışında), statt/anstelle (yerine), angesichts (karşısında/göz önüne alındığında), mithilfe (yardımıyla).",
    rules: [
      {
        heading: "B2 Genitiv Präpositionen",
        body: "Bu edatların tamamı Genitiv alır. Konuşma dilinde zaman zaman Dativ'e kayar, ancak yazılı dilde Genitiv zorunludur.",
        examples: [
          { de: "innerhalb einer Woche", tr: "bir hafta içinde" },
          { de: "außerhalb der Stadt", tr: "şehrin dışında" },
          { de: "statt des Kaffees trinkt er Tee.", tr: "Kahve yerine çay içiyor." },
          { de: "Angesichts der Situation müssen wir handeln.", tr: "Duruma bakıldığında harekete geçmeliyiz." },
          { de: "Mithilfe seiner Freunde hat er das Projekt abgeschlossen.", tr: "Arkadaşlarının yardımıyla projeyi bitirdi." },
        ],
        table: {
          headers: ["Edat", "Anlam", "Örnek"],
          rows: [
            ["innerhalb", "içinde", "innerhalb des Monats"],
            ["außerhalb", "dışında", "außerhalb der Öffnungszeiten"],
            ["statt / anstelle", "yerine", "statt des Fleisches"],
            ["angesichts", "göz önüne alındığında", "angesichts der Krise"],
            ["mithilfe", "yardımıyla", "mithilfe der Technik"],
            ["aufseiten", "tarafında", "aufseiten der Regierung"],
          ],
        },
      },
    ],
    exercises: {
      multipleChoice: [
        {
          id: 1,
          question: "Das Paket muss ___ der nächsten Woche ankommen.",
          options: ["außerhalb", "innerhalb", "statt", "mithilfe"],
          correct: 1,
          explanation: "'innerhalb' = bir zaman dilimi içinde.",
        },
        {
          id: 2,
          question: "___ des schlechten Wetters entschieden wir uns, drinnen zu bleiben.",
          options: ["Innerhalb", "Angesichts", "Mithilfe", "Außerhalb"],
          correct: 1,
          explanation: "'angesichts' = göz önüne alındığında (durumun etkisi).",
        },
        {
          id: 3,
          question: "___ seines Freundes konnte er das Problem lösen.",
          options: ["Statt", "Angesichts", "Mithilfe", "Innerhalb"],
          correct: 2,
          explanation: "'mithilfe' + Genitiv = yardımıyla.",
        },
        {
          id: 4,
          question: "Das Restaurant liegt ___ der Stadt, man braucht ein Auto.",
          options: ["innerhalb", "statt", "außerhalb", "mithilfe"],
          correct: 2,
          explanation: "'außerhalb' = şehrin dışında.",
        },
        {
          id: 5,
          question: "___ des Zuckers nehme ich Honig.",
          options: ["Innerhalb", "Statt", "Mithilfe", "Angesichts"],
          correct: 1,
          explanation: "'statt' + Genitiv = yerine.",
        },
        {
          id: 6,
          question: "___ der Öffnungszeiten ist das Büro nicht erreichbar.",
          options: ["Innerhalb", "Statt", "Außerhalb", "Mithilfe"],
          correct: 2,
          explanation: "'außerhalb der Öffnungszeiten' = mesai saatleri dışında.",
        },
        {
          id: 7,
          question: "___ moderner Technologie wäre das nicht möglich gewesen.",
          options: ["Statt", "Außerhalb", "Mithilfe", "Angesichts"],
          correct: 2,
          explanation: "'mithilfe' = sayesinde / yardımıyla.",
        },
      ],
      fillInBlank: [
        {
          id: 1,
          before: "Das muss",
          after: "von drei Tagen erledigt sein. (innerhalb)",
          answer: "innerhalb",
          hint: "innerhalb + Genitiv = içinde",
        },
        {
          id: 2,
          before: "___ moderner Technik wäre das unmöglich.",
          after: "(mithilfe)",
          answer: "Mithilfe",
          hint: "Mithilfe + Genitiv = yardımıyla",
        },
        {
          id: 3,
          before: "___ der Krise brauchen wir neue Lösungen.",
          after: "(angesichts)",
          answer: "Angesichts",
          hint: "angesichts = göz önüne alındığında",
        },
        {
          id: 4,
          before: "Er trinkt",
          after: "des Kaffees lieber Tee. (statt)",
          answer: "statt",
          hint: "statt + Genitiv = yerine",
        },
        {
          id: 5,
          before: "Das Sportzentrum liegt",
          after: "der Stadt. (außerhalb)",
          answer: "außerhalb",
          hint: "außerhalb + Genitiv = dışında",
        },
      ],
    },
  },

  // ─── 11. Nomen-Verb-Verbindungen ──────────────────────────────────────────
  {
    id: "nomen-verb-verbindungen",
    title: "Nomen-Verb-Verbindungen",
    subtitle: "Kalıplaşmış İsim-Fiil Birleşimleri",
    explanation:
      "Resmi ve iş dilinde birçok kavram isim + fiil kombinasyonuyla ifade edilir. Bu kalıplar tek bir fiille eşdeğerdir ve çok sık kullanılır. TELC B2'de Lesen ve Schreiben bölümlerinde sıklıkla görülür.",
    rules: [
      {
        heading: "Sık Kullanılan Kombinasyonlar",
        body: "Bu kombinasyonları bir bütün olarak öğrenmek gerekir; parçalara ayırmak anlam kaybına neden olur.",
        examples: [
          { de: "in Anspruch nehmen", tr: "kullanmak, yararlanmak" },
          { de: "zur Verfügung stellen", tr: "sunmak, hazır bulundurmak" },
          { de: "in Betracht ziehen", tr: "göz önünde bulundurmak" },
          { de: "Abstand nehmen von", tr: "vazgeçmek" },
          { de: "eine Entscheidung treffen", tr: "karar vermek" },
          { de: "einen Beitrag leisten", tr: "katkıda bulunmak" },
        ],
        table: {
          headers: ["Kombinasyon", "Anlam", "Eş değer fiil"],
          rows: [
            ["in Anspruch nehmen", "kullanmak", "nutzen"],
            ["zur Verfügung stellen", "sunmak", "anbieten"],
            ["in Betracht ziehen", "değerlendirmek", "berücksichtigen"],
            ["eine Rolle spielen", "rol oynamak", "wichtig sein"],
            ["Kritik üben", "eleştirmek", "kritisieren"],
            ["einen Antrag stellen", "başvurmak", "beantragen"],
          ],
        },
      },
    ],
    exercises: {
      multipleChoice: [
        {
          id: 1,
          question: "Wir müssen verschiedene Optionen ___ Betracht ___.",
          options: ["in / ziehen", "zur / stellen", "in / nehmen", "einen / treffen"],
          correct: 0,
          explanation: "'in Betracht ziehen' = göz önünde bulundurmak.",
        },
        {
          id: 2,
          question: "Die Firma stellt ihren Mitarbeitern Laptops ___ Verfügung.",
          options: ["in", "zur", "zu", "auf"],
          correct: 1,
          explanation: "'zur Verfügung stellen' = sunmak (zur = zu + der).",
        },
        {
          id: 3,
          question: "Er nimmt die Dienste des Anwalts ___ Anspruch.",
          options: ["zur", "in", "zum", "zu"],
          correct: 1,
          explanation: "'in Anspruch nehmen' = yararlanmak.",
        },
        {
          id: 4,
          question: "Das spielt eine große ___ bei der Entscheidung.",
          options: ["Beitrag", "Antrag", "Rolle", "Kritik"],
          correct: 2,
          explanation: "'eine Rolle spielen' = rol oynamak.",
        },
        {
          id: 5,
          question: "Die Regierung hat einen ___ gestellt, um das Budget zu erhöhen.",
          options: ["Beitrag", "Antrag", "Entscheidung", "Kritik"],
          correct: 1,
          explanation: "'einen Antrag stellen' = başvurmak.",
        },
        {
          id: 6,
          question: "Der Minister übte scharfe ___ an der neuen Gesetzgebung.",
          options: ["Rolle", "Beitrag", "Kritik", "Entscheidung"],
          correct: 2,
          explanation: "'Kritik üben' = eleştirmek.",
        },
        {
          id: 7,
          question: "Jeder kann einen ___ zur Lösung leisten.",
          options: ["Antrag", "Kritik", "Beitrag", "Rolle"],
          correct: 2,
          explanation: "'einen Beitrag leisten' = katkıda bulunmak.",
        },
      ],
      fillInBlank: [
        {
          id: 1,
          before: "Wir müssen alle Möglichkeiten in",
          after: "ziehen. (Betracht)",
          answer: "Betracht",
          hint: "in Betracht ziehen = göz önünde bulundurmak",
        },
        {
          id: 2,
          before: "Die Firma stellt allen Mitarbeitern Parkplätze zur",
          after: ". (Verfügung)",
          answer: "Verfügung",
          hint: "zur Verfügung stellen = sunmak",
        },
        {
          id: 3,
          before: "Er hat eine wichtige",
          after: "getroffen. (Entscheidung)",
          answer: "Entscheidung",
          hint: "eine Entscheidung treffen = karar vermek",
        },
        {
          id: 4,
          before: "Sie nimmt die Beratung des Experten in",
          after: ". (Anspruch)",
          answer: "Anspruch",
          hint: "in Anspruch nehmen = yararlanmak",
        },
        {
          id: 5,
          before: "Alle Bürger sollen einen",
          after: "zum Umweltschutz leisten. (Beitrag)",
          answer: "Beitrag",
          hint: "einen Beitrag leisten = katkıda bulunmak",
        },
      ],
    },
  },

  // ─── 12. Passiv mit Modalverben ───────────────────────────────────────────
  {
    id: "passiv-modalverben-b2",
    title: "Passiv mit Modalverben — Erweitert",
    subtitle: "Tüm Zamanlarda Passiv + Modal",
    explanation:
      "Modal fiil + Passiv yapısı B2 düzeyinde tüm zamanlarda kullanılır. Präsens: Modal + Partizip II + werden. Vergangenheit: Modal Prät. + Partizip II + werden. Perfekt: hat + Partizip II + werden + müssen/können vb.",
    rules: [
      {
        heading: "Passiv + Modal Präsens & Präteritum",
        body: "Modal fiil çekimlenir, Partizip II ortada, 'werden' en sona mastar olarak gelir.",
        examples: [
          { de: "Das muss sofort gemacht werden. (Präsens)", tr: "Bu hemen yapılmalı." },
          { de: "Das musste sofort gemacht werden. (Präteritum)", tr: "Bu hemen yapılmalıydı." },
          { de: "Das kann nicht verändert werden. (Präsens)", tr: "Bu değiştirilemez." },
        ],
        table: {
          headers: ["Zaman", "Yapı", "Örnek"],
          rows: [
            ["Präsens", "Modal + P.II + werden", "muss gemacht werden"],
            ["Präteritum", "Modal Prät. + P.II + werden", "musste gemacht werden"],
            ["Perfekt", "hat + P.II + werden + müssen", "hat gemacht werden müssen"],
          ],
        },
      },
      {
        heading: "Unpersönliches Passiv",
        body: "'Es wird + Verb' şeklinde öznesiz pasif kurulur. Genel bir eylem ya da etkinlik ifade edilir.",
        examples: [
          { de: "Es wird hier nicht geraucht.", tr: "Burada sigara içilmez." },
          { de: "Hier wird viel gearbeitet.", tr: "Burada çok çalışılıyor." },
          { de: "Es darf nicht fotografiert werden.", tr: "Fotoğraf çekilmez." },
        ],
      },
    ],
    exercises: {
      multipleChoice: [
        {
          id: 1,
          question: "Das Problem ___ sofort gelöst ___.",
          options: ["muss / werden", "soll / sein", "wird / müssen", "ist / werden"],
          correct: 0,
          explanation: "Passiv + Modal Präsens: muss + Partizip II + werden.",
        },
        {
          id: 2,
          question: "Hier ___ nicht fotografiert ___.",
          options: ["soll / sein", "darf / werden", "kann / sein", "wird / dürfen"],
          correct: 1,
          explanation: "darf nicht + Partizip II + werden (yasak).",
        },
        {
          id: 3,
          question: "Der Bericht ___ bis Freitag fertiggestellt werden.",
          options: ["will", "darf", "soll", "sein"],
          correct: 2,
          explanation: "'sollen' görev bildirimi için. Passiv: soll + Partizip II + werden.",
        },
        {
          id: 4,
          question: "Das ___ schon vor Jahren repariert werden ___. (Perfect Passiv Modal)",
          options: ["hätte / müssen", "musste / worden", "muss / werden", "hat / müssen"],
          correct: 0,
          explanation: "Konjunktiv II Passiv: hätte + Partizip II + werden + müssen.",
        },
        {
          id: 5,
          question: "Hier ___ viel über die Zukunft diskutiert.",
          options: ["ist", "wird", "hat", "sein"],
          correct: 1,
          explanation: "Unpersönliches Passiv: wird + Partizip II (es wird diskutiert → hier wird diskutiert).",
        },
        {
          id: 6,
          question: "Das Paket ___ heute noch geliefert werden.",
          options: ["will", "kann", "muss", "B ve C doğru"],
          correct: 3,
          explanation: "'kann' ve 'muss' her ikisi de bağlama göre doğru olabilir.",
        },
        {
          id: 7,
          question: "In diesem Museum ___ nicht laut gesprochen werden.",
          options: ["muss", "kann", "soll", "darf"],
          correct: 3,
          explanation: "Yasak → darf nicht.",
        },
      ],
      fillInBlank: [
        {
          id: 1,
          before: "Das Formular muss bis Montag ausgefüllt",
          after: ". (werden)",
          answer: "werden",
          hint: "Passiv + Modal: muss + Partizip II + werden",
        },
        {
          id: 2,
          before: "Hier",
          after: "nicht geraucht werden. (darf)",
          answer: "darf",
          hint: "darf nicht + Partizip II + werden",
        },
        {
          id: 3,
          before: "Der Fehler hätte früher bemerkt werden",
          after: ". (müssen)",
          answer: "müssen",
          hint: "Konjunktiv II Passiv: hätte + P.II + werden + müssen",
        },
        {
          id: 4,
          before: "Diese Dokumente sollen sicher aufbewahrt",
          after: ". (werden)",
          answer: "werden",
          hint: "Passiv + Modal: soll + Partizip II + werden",
        },
        {
          id: 5,
          before: "Es",
          after: "über das Thema viel diskutiert. (wird)",
          answer: "wird",
          hint: "Unpersönliches Passiv: Es wird + Partizip II",
        },
      ],
    },
  },

  // ─── 13. Kausale & Konzessive Strukturen ──────────────────────────────────
  {
    id: "kausale-konzessive-b2",
    title: "Kausale & Konzessive Strukturen — B2",
    subtitle: "da, zumal, wenngleich, wenn auch",
    explanation:
      "B2 düzeyinde temel 'weil/obwohl' kalıplarının ötesinde daha sofistike neden ve karşıtlık ifadeleri öğrenilir: 'da' (zira/madem), 'zumal' (üstelik), 'wenngleich/wenn auch' (her ne kadar...olsa da).",
    rules: [
      {
        heading: "da (zira, madem ki) vs. weil",
        body: "'da' genellikle cümle başında gelir ve nedeni önceden bilinen bir durum olarak sunar. 'weil' ise yeni ya da açıklayıcı nedenler için kullanılır.",
        examples: [
          { de: "Da er krank ist, bleibt er zu Hause.", tr: "Hasta olduğu için (zira hasta) evde kalıyor." },
          { de: "Da wir schon spät dran sind, nehmen wir ein Taxi.", tr: "Zaten geç kaldığımız için taksi alıyoruz." },
        ],
      },
      {
        heading: "zumal (üstelik, bir de)",
        body: "'zumal' ek ve güçlendirici bir neden ekler. 'zumal' + yan cümle veya 'zumal da' şeklinde kullanılır.",
        examples: [
          { de: "Er verdient gut, zumal er kaum Ausgaben hat.", tr: "İyi kazanıyor, üstelik neredeyse hiç gideri de yok." },
          { de: "Das war eine schlechte Idee, zumal wir keine Zeit hatten.", tr: "Bu kötü bir fikirdi, üstelik zamanımız da yoktu." },
        ],
      },
      {
        heading: "wenngleich / wenn auch / obschon",
        body: "'wenngleich' ve 'wenn auch' 'obwohl'un yazılı dildeki resmi eşdeğerleridir.",
        examples: [
          { de: "Wenngleich er müde war, arbeitete er weiter.", tr: "Her ne kadar yorgun olsa da çalışmaya devam etti." },
          { de: "Das ist eine gute Lösung, wenn auch nicht die einfachste.", tr: "Bu iyi bir çözüm, her ne kadar en basiti olmasa da." },
        ],
      },
    ],
    exercises: {
      multipleChoice: [
        {
          id: 1,
          question: "___ es schon spät ist, gehen wir noch spazieren.",
          options: ["Da", "Zumal", "Wenngleich", "Folglich"],
          correct: 2,
          explanation: "'wenngleich' = her ne kadar... olsa da (karşıtlık).",
        },
        {
          id: 2,
          question: "___ wir bereits eine Lösung haben, brauchen wir keine externe Hilfe.",
          options: ["Wenngleich", "Da", "Zumal", "Deshalb"],
          correct: 1,
          explanation: "'da' = zira / madem ki (bilinen neden, cümle başı).",
        },
        {
          id: 3,
          question: "Er isst gern in diesem Restaurant, ___ es nicht weit von seinem Büro liegt.",
          options: ["wenngleich", "folglich", "zumal", "deshalb"],
          correct: 2,
          explanation: "'zumal' = üstelik (ek ve destekleyici neden).",
        },
        {
          id: 4,
          question: "___ die Aufgabe schwierig war, haben wir sie erfolgreich abgeschlossen.",
          options: ["Da", "Zumal", "Obwohl / Wenngleich", "Folglich"],
          correct: 2,
          explanation: "'obwohl' ve 'wenngleich' her ikisi de karşıtlık bildirir.",
        },
        {
          id: 5,
          question: "Das ist teuer, ___ die Qualität sehr gut ist.",
          options: ["zumal", "wenngleich", "da", "folglich"],
          correct: 0,
          explanation: "'zumal' = üstelik (ek olumlu özellik).",
        },
        {
          id: 6,
          question: "___ er kein Experte ist, hat er trotzdem recht.",
          options: ["Da", "Zumal", "Wenngleich", "Infolgedessen"],
          correct: 2,
          explanation: "'wenngleich' = her ne kadar... olsa da.",
        },
        {
          id: 7,
          question: "___ wir schon lange befreundet sind, vertraue ich ihm sehr.",
          options: ["Wenngleich", "Da", "Folglich", "Zumal"],
          correct: 1,
          explanation: "'da' = zira / madem ki (bilinen neden).",
        },
      ],
      fillInBlank: [
        {
          id: 1,
          before: "___ wir viel Zeit haben, können wir alles in Ruhe besprechen.",
          after: "(da)",
          answer: "Da",
          hint: "da = zira (cümle başında, bilinen neden)",
        },
        {
          id: 2,
          before: "Das Projekt war schwierig,",
          after: "wir wenig Budget hatten. (zumal)",
          answer: "zumal",
          hint: "zumal = üstelik",
        },
        {
          id: 3,
          before: "___ er kein Deutsch spricht, versteht er den Text gut.",
          after: "(wenngleich)",
          answer: "Wenngleich",
          hint: "wenngleich = her ne kadar...olsa da",
        },
        {
          id: 4,
          before: "___ das Wetter schlecht war, gingen wir trotzdem wandern.",
          after: "(da)",
          answer: "Da",
          hint: "da = zira / madem ki",
        },
        {
          id: 5,
          before: "Das ist eine tolle Gelegenheit,",
          after: "sie kostenlos ist. (zumal)",
          answer: "zumal",
          hint: "zumal = üstelik",
        },
      ],
    },
  },
];
