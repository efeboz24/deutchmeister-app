/**
 * TELC B1 Grammar Topics
 * 13 topics, each with explanation, rules, examples, and 13–16 exercises.
 */

export interface GrammarMCQ {
  id: number;
  question: string;
  options: string[];
  correct: number; // 0-indexed
  explanation: string;
}

export interface GrammarFill {
  id: number;
  before: string;
  after: string;
  answer: string;
  hint: string;
}

export interface GrammarRule {
  heading: string;
  body: string;
  examples: { de: string; tr: string }[];
  table?: { headers: string[]; rows: string[][] };
}

export interface B1GrammarTopic {
  id: string;
  title: string;
  subtitle: string;
  explanation: string;
  rules: GrammarRule[];
  exercises: {
    multipleChoice: GrammarMCQ[];
    fillInBlank: GrammarFill[];
  };
}

export const B1_GRAMMAR_TOPICS: B1GrammarTopic[] = [
  // ─── 1. Präteritum ────────────────────────────────────────────────────────
  {
    id: "praeteritum",
    title: "Präteritum",
    subtitle: "Yazılı Geçmiş Zaman",
    explanation:
      "Präteritum, Almancada yazılı dilde (gazete, roman, resmi metin) geçmişi anlatmak için kullanılır. Konuşma dilinde ise yalnızca 'sein' (war) ve 'haben' (hatte) Präteritum ile kullanılır; diğer fiillerde Perfekt tercih edilir.",
    rules: [
      {
        heading: "Schwache Verben (Düzenli Fiiller)",
        body:
          "Düzenli fiillerde fiil köküne -te eklenir. Eğer kök -t, -d, -n ile bitiyorsa -ete eklenir (spielen→spielte, arbeiten→arbeitete, öffnen→öffnete).",
        examples: [
          { de: "Er spielte als Kind Fußball.", tr: "Çocukken futbol oynuyordu." },
          { de: "Sie arbeitete täglich zehn Stunden.", tr: "Günde on saat çalışıyordu." },
          { de: "Wir lebten damals in München.", tr: "O zamanlar Münih'te yaşıyorduk." },
        ],
        table: {
          headers: ["Şahıs", "spielen", "arbeiten", "öffnen"],
          rows: [
            ["ich", "spielte", "arbeitete", "öffnete"],
            ["du", "spieltest", "arbeitetest", "öffnetest"],
            ["er/sie/es", "spielte", "arbeitete", "öffnete"],
            ["wir", "spielten", "arbeiteten", "öffneten"],
            ["ihr", "spieltet", "arbeitetet", "öffnetet"],
            ["sie/Sie", "spielten", "arbeiteten", "öffneten"],
          ],
        },
      },
      {
        heading: "Starke Verben (Düzensiz Fiiller)",
        body:
          "Düzensiz fiillerde fiil kökü değişir; ek almaz. Bu formlar mutlaka ezberlenmelidir.",
        examples: [
          { de: "Er fuhr mit dem Zug nach Berlin.", tr: "Trenle Berlin'e gitti." },
          { de: "Sie schrieb einen langen Brief.", tr: "Uzun bir mektup yazdı." },
          { de: "Das Kind schlief früh ein.", tr: "Çocuk erken uyudu." },
        ],
        table: {
          headers: ["Infinitiv", "Präteritum", "Infinitiv", "Präteritum"],
          rows: [
            ["fahren", "fuhr", "kommen", "kam"],
            ["gehen", "ging", "stehen", "stand"],
            ["schreiben", "schrieb", "lesen", "las"],
            ["sprechen", "sprach", "sehen", "sah"],
            ["schlafen", "schlief", "beginnen", "begann"],
            ["finden", "fand", "treffen", "traf"],
          ],
        },
      },
      {
        heading: "sein, haben, werden",
        body:
          "Bu üç fiil hem yazılı hem konuşma dilinde Präteritum ile kullanılır. Konuşmada bile Perfekt kullanılmaz.",
        examples: [
          { de: "Gestern war ich sehr müde.", tr: "Dün çok yorgundum." },
          { de: "Sie hatte keine Zeit.", tr: "Zamanı yoktu." },
          { de: "Das Wetter wurde schlechter.", tr: "Hava kötüleşti." },
        ],
        table: {
          headers: ["Şahıs", "sein", "haben", "werden"],
          rows: [
            ["ich", "war", "hatte", "wurde"],
            ["du", "warst", "hattest", "wurdest"],
            ["er/sie/es", "war", "hatte", "wurde"],
            ["wir", "waren", "hatten", "wurden"],
            ["ihr", "wart", "hattet", "wurdet"],
            ["sie/Sie", "waren", "hatten", "wurden"],
          ],
        },
      },
    ],
    exercises: {
      multipleChoice: [
        {
          id: 1,
          question: "Er ___ jeden Morgen sehr früh auf. (aufstehen — Präteritum)",
          options: ["steht auf", "stand auf", "aufstand", "stehte auf"],
          correct: 1,
          explanation:
            "'aufstehen' ayrılabilen bir fiildir. Präteritum: stand auf (stehen → stand).",
        },
        {
          id: 2,
          question: "Die Kinder ___ lange auf dem Spielplatz. (spielen — Präteritum)",
          options: ["spielen", "spielten", "gespielt", "spielte"],
          correct: 1,
          explanation:
            "Çoğul (wir/sie) için schwaches Verb eki: -ten → spielten.",
        },
        {
          id: 3,
          question: "Sie ___ gestern einen Roman. (lesen — Präteritum)",
          options: ["laste", "las", "lesen", "lasen"],
          correct: 1,
          explanation: "lesen → las (starkes Verb, kök değişimi).",
        },
        {
          id: 4,
          question: "Das Konzert ___ um 20 Uhr. (beginnen — Präteritum)",
          options: ["beginnte", "begonnen", "begann", "begänne"],
          correct: 2,
          explanation: "beginnen → begann (starkes Verb).",
        },
        {
          id: 5,
          question: "Ich ___ als Kind sehr schüchtern. (sein — Präteritum)",
          options: ["war", "wäre", "bin", "bin gewesen"],
          correct: 0,
          explanation: "sein → war (konuşmada da Präteritum kullanılır).",
        },
        {
          id: 6,
          question: "Er ___ die ganze Nacht nicht. (schlafen — Präteritum)",
          options: ["schläft", "schlafete", "schlief", "geschlafen"],
          correct: 2,
          explanation: "schlafen → schlief (starkes Verb).",
        },
        {
          id: 7,
          question: "Wir ___ damals kein Auto. (haben — Präteritum)",
          options: ["haben", "hatten", "hatte", "habe"],
          correct: 1,
          explanation: "haben → hatten (wir-form).",
        },
        {
          id: 8,
          question: "Sie ___ den Bus und ___ zur Arbeit. (nehmen / fahren — Präteritum)",
          options: [
            "nimmt / fährt",
            "nahm / fuhr",
            "nahme / fahre",
            "genommen / gefahren",
          ],
          correct: 1,
          explanation: "nehmen → nahm, fahren → fuhr (starke Verben).",
        },
      ],
      fillInBlank: [
        {
          id: 1,
          before: "Früher",
          after: "ich immer mit dem Zug zur Arbeit. (fahren)",
          answer: "fuhr",
          hint: "fahren → fuhr (starkes Verb)",
        },
        {
          id: 2,
          before: "Das Mädchen",
          after: "ein Lied. (singen)",
          answer: "sang",
          hint: "singen → sang (starkes Verb)",
        },
        {
          id: 3,
          before: "Sie",
          after: "die Tür, weil es zu warm war. (öffnen)",
          answer: "öffnete",
          hint: "öffnen → öffnete (-ete eki, kök -n ile bitiyor)",
        },
        {
          id: 4,
          before: "Er",
          after: "seinen Freund am Bahnhof. (treffen)",
          answer: "traf",
          hint: "treffen → traf (starkes Verb)",
        },
        {
          id: 5,
          before: "Als Kind",
          after: "wir oft im Park. (spielen)",
          answer: "spielten",
          hint: "spielen → spielten (schwaches Verb, wir-form)",
        },
      ],
    },
  },

  // ─── 2. Plusquamperfekt ───────────────────────────────────────────────────
  {
    id: "plusquamperfekt",
    title: "Plusquamperfekt",
    subtitle: "Geçmişin Geçmişi",
    explanation:
      "Plusquamperfekt, geçmişte başka bir geçmiş olaydan daha önce gerçekleşen eylemi ifade eder. 'hatte / war + Partizip II' yapısıyla kurulur. Genellikle 'nachdem', 'als', 'bevor', 'weil' bağlaçlarıyla birlikte kullanılır.",
    rules: [
      {
        heading: "Yapı: hatte/war + Partizip II",
        body:
          "Hareket ve durum değişikliği fiilleri 'war + Partizip II', diğerleri 'hatte + Partizip II' ile kullanılır. Bu kural Perfekt ile aynıdır.",
        examples: [
          { de: "Nachdem er gegessen hatte, schlief er ein.", tr: "Yedikten sonra uyudu." },
          { de: "Als ich ankam, war sie schon gegangen.", tr: "Ben geldiğimde o çoktan gitmişti." },
          { de: "Er hatte die Aufgabe beendet, bevor der Chef kam.", tr: "Patron gelmeden önce görevi bitirmişti." },
        ],
        table: {
          headers: ["Şahıs", "hatte + Partizip II", "war + Partizip II"],
          rows: [
            ["ich", "hatte gespielt", "war gegangen"],
            ["du", "hattest gespielt", "warst gegangen"],
            ["er/sie/es", "hatte gespielt", "war gegangen"],
            ["wir", "hatten gespielt", "waren gegangen"],
            ["ihr", "hattet gespielt", "wart gegangen"],
            ["sie/Sie", "hatten gespielt", "waren gegangen"],
          ],
        },
      },
      {
        heading: "nachdem ile Kullanım",
        body:
          "'nachdem' (sonra) bağlacından sonra Plusquamperfekt, ana cümlede Präteritum/Perfekt gelir. Bu zaman sıralaması kesindir.",
        examples: [
          { de: "Nachdem sie die E-Mail gelesen hatte, rief sie an.", tr: "E-postayı okuduktan sonra aradı." },
          { de: "Nachdem wir das Essen gekocht hatten, setzten wir uns.", tr: "Yemek pişirdikten sonra oturduk." },
        ],
      },
    ],
    exercises: {
      multipleChoice: [
        {
          id: 1,
          question:
            "Nachdem er das Buch ___, legte er es auf den Tisch. (lesen — Plusquamperfekt)",
          options: [
            "las",
            "gelesen hat",
            "gelesen hatte",
            "lesen würde",
          ],
          correct: 2,
          explanation:
            "'nachdem' bağlacından sonra Plusquamperfekt gelir: hatte + Partizip II.",
        },
        {
          id: 2,
          question:
            "Als ich ins Büro kam, ___ er schon ___. (gehen — Plusquamperfekt)",
          options: [
            "hatte / gegangen",
            "war / gegangen",
            "ist / gegangen",
            "ging / —",
          ],
          correct: 1,
          explanation:
            "'gehen' bir hareket fiilidir → 'war gegangen' (sein + Partizip II).",
        },
        {
          id: 3,
          question:
            "Sie kaufte den Mantel, weil sie ihren alten ___ ___. (verlieren — Plusquamperfekt)",
          options: [
            "verloren hat",
            "verloren hatte",
            "verlor",
            "verlieren würde",
          ],
          correct: 1,
          explanation:
            "Geçmişteki neden için Plusquamperfekt: hatte + verloren.",
        },
        {
          id: 4,
          question:
            "Bevor der Film anfing, ___ wir schon ___ . (essen — Plusquamperfekt)",
          options: [
            "haben / gegessen",
            "hatten / gegessen",
            "waren / gegessen",
            "essen / —",
          ],
          correct: 1,
          explanation: "'essen' geçişli → hatte + gegessen (wir: hatten).",
        },
        {
          id: 5,
          question:
            "Er war müde, weil er die ganze Nacht ___ ___. (arbeiten — Plusquamperfekt)",
          options: [
            "gearbeitet hatte",
            "gearbeitet hat",
            "arbeitete",
            "arbeiten würde",
          ],
          correct: 0,
          explanation:
            "Plusquamperfekt: hatte + gearbeitet.",
        },
        {
          id: 6,
          question:
            "Nachdem sie ___ ___, fühlte sie sich besser. (schlafen — Plusquamperfekt)",
          options: [
            "geschlafen hatte",
            "geschlafen hat",
            "schlief",
            "schläft",
          ],
          correct: 0,
          explanation:
            "'schlafen' → hatte + geschlafen (Plusquamperfekt).",
        },
        {
          id: 7,
          question:
            "Als wir ankamen, ___ das Konzert schon ___. (beginnen — Plusquamperfekt)",
          options: [
            "hatte / begonnen",
            "war / begonnen",
            "hat / begonnen",
            "begann / —",
          ],
          correct: 0,
          explanation:
            "'beginnen' → hatte + begonnen.",
        },
      ],
      fillInBlank: [
        {
          id: 1,
          before: "Nachdem er das Formular",
          after: ", schickte er es ab. (ausfüllen)",
          answer: "ausgefüllt hatte",
          hint: "ausfüllen → ausgefüllt (trennbar) → hatte + ausgefüllt",
        },
        {
          id: 2,
          before: "Als ich ankam, war sie schon",
          after: ". (abfahren)",
          answer: "abgefahren",
          hint: "abfahren → war abgefahren (sein + Partizip II)",
        },
        {
          id: 3,
          before: "Wir",
          after: "schon gegessen, bevor er kam. (haben)",
          answer: "hatten",
          hint: "Plusquamperfekt: hatten + Partizip II",
        },
        {
          id: 4,
          before: "Nachdem sie",
          after: "hatte, rief sie ihre Mutter an. (ankommen)",
          answer: "angekommen",
          hint: "ankommen → angekommen (sein-Verb, Partizip II)",
        },
        {
          id: 5,
          before: "Er war erschöpft, weil er zu wenig",
          after: "hatte. (schlafen)",
          answer: "geschlafen",
          hint: "schlafen → geschlafen (Partizip II)",
        },
      ],
    },
  },

  // ─── 3. Konjunktiv II ─────────────────────────────────────────────────────
  {
    id: "konjunktiv-ii",
    title: "Konjunktiv II",
    subtitle: "Dilek, Varsayım ve Kibarca Rica",
    explanation:
      "Konjunktiv II gerçekleşmeyen ya da gerçekleşmesi zor olan durumları ifade eder. Türkçedeki '-se/-sa' ve '-rdı/-rdi' kiplerine benzer. TELC B1'de sıkça sınav konusudur.",
    rules: [
      {
        heading: "würde + Infinitiv (Genel Kullanım)",
        body:
          "Çoğu fiil için 'würde + Infinitiv' kullanılır. Bu form konuşma dilinde en yaygın Konjunktiv II biçimidir.",
        examples: [
          { de: "Ich würde gern reisen, wenn ich mehr Zeit hätte.", tr: "Daha fazla zamanım olsaydı seyahat etmek isterdim." },
          { de: "Was würdest du in meiner Situation machen?", tr: "Benim durumunda ne yapardın?" },
          { de: "Er würde gern früher aufhören.", tr: "Daha erken bitirmek isterdi." },
        ],
        table: {
          headers: ["Şahıs", "würde + Infinitiv"],
          rows: [
            ["ich", "würde kommen"],
            ["du", "würdest kommen"],
            ["er/sie/es", "würde kommen"],
            ["wir", "würden kommen"],
            ["ihr", "würdet kommen"],
            ["sie/Sie", "würden kommen"],
          ],
        },
      },
      {
        heading: "Direkt Formlar: wäre, hätte, könnte, müsste, sollte, dürfte",
        body:
          "Bu sık kullanılan fiiller doğrudan Konjunktiv II formunu alır (würde kullanılmaz). TELC sınavında bu formlar mutlaka bilinmelidir.",
        examples: [
          { de: "Wenn ich reich wäre, würde ich viel reisen.", tr: "Zengin olsaydım çok seyahat ederdim." },
          { de: "Hätte ich Zeit, würde ich dir helfen.", tr: "Zamanım olsaydı sana yardım ederdim." },
          { de: "Könntest du mir bitte helfen?", tr: "Bana yardım edebilir misin? (kibarca)" },
        ],
        table: {
          headers: ["Infinitiv", "Konjunktiv II", "Türkçe"],
          rows: [
            ["sein", "wäre", "olsaydım/-saydım"],
            ["haben", "hätte", "olsaydım (sahip)"],
            ["können", "könnte", "yapabilirdim"],
            ["müssen", "müsste", "yapmam gerekirdi"],
            ["sollen", "sollte", "yapmalıydım"],
            ["dürfen", "dürfte", "yapabilirdim (izin)"],
          ],
        },
      },
      {
        heading: "Irreale Bedingungssätze (Gerçekleşmeyen Koşullar)",
        body:
          "'Wenn + Konjunktiv II, Konjunktiv II' yapısı gerçekleşmesi imkânsız koşulları anlatır. TELC'de yazma görevlerinde sıkça kullanılır.",
        examples: [
          { de: "Wenn ich mehr lerne, würde ich besser sprechen.", tr: "Daha çok çalışsam daha iyi konuşurum. (Dikkat: bu gerçek koşul — Konjunktiv I)" },
          { de: "Wenn ich mehr lernte, würde ich besser sprechen.", tr: "Daha çok çalışsaydım daha iyi konuşurdum." },
          { de: "Wenn ich du wäre, würde ich das nicht tun.", tr: "Senin yerinde olsaydım bunu yapmazdım." },
        ],
      },
    ],
    exercises: {
      multipleChoice: [
        {
          id: 1,
          question: "Wenn ich mehr Zeit ___, würde ich Sport machen.",
          options: ["habe", "hätte", "hatte", "haben"],
          correct: 1,
          explanation:
            "Gerçekleşmeyen koşul için Konjunktiv II: 'hätte' (haben → hätte).",
        },
        {
          id: 2,
          question: "___ du mir bitte helfen? (kibarca rica)",
          options: ["Willst", "Würdest", "Wirst", "Magst"],
          correct: 1,
          explanation:
            "Kibarca ricalar için 'würde' Konjunktiv II kullanılır.",
        },
        {
          id: 3,
          question: "An deiner Stelle ___ ich das nicht sagen.",
          options: ["wäre", "würde", "werden", "will"],
          correct: 1,
          explanation:
            "'An deiner Stelle' (senin yerinde) → 'würde + Infinitiv' (sagen).",
        },
        {
          id: 4,
          question: "Wenn er fleißiger ___, bekäme er bessere Noten.",
          options: ["ist", "wäre", "sei", "wird"],
          correct: 1,
          explanation:
            "Konjunktiv II: sein → wäre.",
        },
        {
          id: 5,
          question: "Ich ___ gern ins Kino gehen, aber ich habe keine Zeit.",
          options: ["will", "würde", "werde", "mag"],
          correct: 1,
          explanation:
            "'würde gern + Infinitiv' kibarca bir istek ifadesi. 'will' ise kesin bir istek/gelecek ifadesidir.",
        },
        {
          id: 6,
          question: "___ du mir bitte erklären, wie das funktioniert?",
          options: ["Kannst", "Könntest", "Können", "Könnt"],
          correct: 1,
          explanation:
            "Kibarca soru için Konjunktiv II: können → könntest.",
        },
        {
          id: 7,
          question: "Wenn ich früher aufgestanden ___, hätte ich den Zug nicht verpasst.",
          options: ["wäre", "bin", "war", "sei"],
          correct: 0,
          explanation:
            "Geçmişteki gerçekleşmeyen koşul: aufstehen (sein-Verb) → wäre aufgestanden.",
        },
        {
          id: 8,
          question: "Er ___ lieber zu Hause bleiben, aber er muss arbeiten.",
          options: ["wird", "würde", "wäre", "soll"],
          correct: 1,
          explanation:
            "'lieber' (tercih) ile Konjunktiv II: würde ... bleiben.",
        },
      ],
      fillInBlank: [
        {
          id: 1,
          before: "Wenn ich Ärztin",
          after: ", würde ich viele Menschen helfen. (sein — Konjunktiv II)",
          answer: "wäre",
          hint: "sein → wäre (Konjunktiv II direkt form)",
        },
        {
          id: 2,
          before: "An deiner Stelle",
          after: "ich das sofort erledigen. (würde)",
          answer: "würde",
          hint: "'An deiner Stelle' → würde + Infinitiv",
        },
        {
          id: 3,
          before: "Ich",
          after: "gern mehr Sport machen, aber ich habe keine Zeit. (würde)",
          answer: "würde",
          hint: "'würde gern' = 'çok isterim'",
        },
        {
          id: 4,
          before: "Wenn wir mehr Geld",
          after: ", könnten wir eine größere Wohnung mieten. (haben — Konjunktiv II)",
          answer: "hätten",
          hint: "haben → hätten (Konjunktiv II, wir-form)",
        },
        {
          id: 5,
          before: "Er",
          after: "mir gern helfen, aber er hat keine Zeit. (würde)",
          answer: "würde",
          hint: "würde + Infinitiv (helfen)",
        },
      ],
    },
  },

  // ─── 4. Passiv ────────────────────────────────────────────────────────────
  {
    id: "passiv",
    title: "Passiv",
    subtitle: "Edilgen Yapı",
    explanation:
      "Edilgen yapı (Passiv) eylemi ön plana çıkarır, özneyi geri plana atar veya tamamen siler. 'werden + Partizip II' ile kurulur. TELC B1'de özellikle Sprachbausteine bölümünde sıklıkla sorulur.",
    rules: [
      {
        heading: "Vorgangspassiv Präsens (Şimdiki Zaman Edilgeni)",
        body:
          "werden (çekimli) + Partizip II. Eylem yapan kişi belirtilmek istenirse 'von + Dativ' kullanılır.",
        examples: [
          { de: "Das Auto wird repariert.", tr: "Araba tamir ediliyor." },
          { de: "Das Essen wird gekocht.", tr: "Yemek pişiriliyor." },
          { de: "Der Brief wird von der Sekretärin geschrieben.", tr: "Mektup sekreter tarafından yazılıyor." },
        ],
        table: {
          headers: ["Şahıs", "Präsens Passiv"],
          rows: [
            ["ich", "werde gefragt"],
            ["du", "wirst gefragt"],
            ["er/sie/es", "wird gefragt"],
            ["wir", "werden gefragt"],
            ["ihr", "werdet gefragt"],
            ["sie/Sie", "werden gefragt"],
          ],
        },
      },
      {
        heading: "Vorgangspassiv Präteritum (Geçmiş Zaman Edilgeni)",
        body:
          "wurde (Präteritum von werden) + Partizip II.",
        examples: [
          { de: "Das Fenster wurde geöffnet.", tr: "Pencere açıldı." },
          { de: "Der Vertrag wurde unterschrieben.", tr: "Sözleşme imzalandı." },
          { de: "Die Brücke wurde 1920 gebaut.", tr: "Köprü 1920'de inşa edildi." },
        ],
      },
      {
        heading: "Passiv mit Modalverben",
        body:
          "Modalverb (çekimli) + Partizip II + werden (sona, mastar olarak).",
        examples: [
          { de: "Das muss gemacht werden.", tr: "Bu yapılmak zorunda." },
          { de: "Die Aufgabe soll bis Freitag erledigt werden.", tr: "Görev Cuma'ya kadar tamamlanmalı." },
          { de: "Hier darf nicht geraucht werden.", tr: "Burada sigara içilmez." },
        ],
      },
    ],
    exercises: {
      multipleChoice: [
        {
          id: 1,
          question: "Das Auto ___ gerade repariert. (Passiv Präsens, es)",
          options: ["ist", "wird", "hat", "wurde"],
          correct: 1,
          explanation:
            "Passiv Präsens: wird + Partizip II.",
        },
        {
          id: 2,
          question: "Der Brief ___ gestern geschrieben. (Passiv Präteritum)",
          options: ["wird", "wurde", "ist", "war"],
          correct: 1,
          explanation:
            "Passiv Präteritum: wurde + Partizip II.",
        },
        {
          id: 3,
          question: "Die Tür ___ von den Kindern geöffnet.",
          options: ["wird", "ist", "hat", "macht"],
          correct: 0,
          explanation:
            "Passiv Präsens: wird + geöffnet. 'von den Kindern' eylem yapanı belirtir.",
        },
        {
          id: 4,
          question: "Hier ___ nicht geraucht werden.",
          options: ["muss", "darf", "kann", "soll"],
          correct: 1,
          explanation:
            "Yasak için 'dürfen' kullanılır: darf nicht geraucht werden.",
        },
        {
          id: 5,
          question: "Das Formular ___ ausgefüllt werden. (müssen)",
          options: ["darf", "muss", "kann", "wird"],
          correct: 1,
          explanation:
            "Zorunluluk için 'müssen': muss + Partizip II + werden.",
        },
        {
          id: 6,
          question: "Das Stadion ___ 2010 gebaut. (Passiv Präteritum)",
          options: ["wird", "ist", "wurde", "war"],
          correct: 2,
          explanation:
            "Passiv Präteritum: wurde + gebaut.",
        },
        {
          id: 7,
          question: "Die Aufgaben ___ bis morgen erledigt werden. (sollen)",
          options: ["werden", "sollen", "müssen", "können"],
          correct: 1,
          explanation:
            "Görev bildirimi için 'sollen': sollen + Partizip II + werden.",
        },
        {
          id: 8,
          question: "In diesem Restaurant ___ auch vegetarisches Essen angeboten.",
          options: ["ist", "wird", "hat", "soll"],
          correct: 1,
          explanation:
            "Passiv Präsens: wird + angeboten.",
        },
      ],
      fillInBlank: [
        {
          id: 1,
          before: "Das Essen",
          after: "jeden Tag frisch zubereitet. (werden — Passiv Präsens)",
          answer: "wird",
          hint: "Passiv Präsens: wird + Partizip II",
        },
        {
          id: 2,
          before: "Der neue Bahnhof",
          after: "letztes Jahr eröffnet. (werden — Passiv Präteritum)",
          answer: "wurde",
          hint: "Passiv Präteritum: wurde + Partizip II",
        },
        {
          id: 3,
          before: "Die Hausaufgaben müssen bis Montag",
          after: "werden. (abgeben — Infinitiv Passiv)",
          answer: "abgegeben",
          hint: "Modal + Partizip II + werden → abgegeben",
        },
        {
          id: 4,
          before: "Hier",
          after: "nicht telefoniert werden. (dürfen)",
          answer: "darf",
          hint: "dürfen → darf (Passiv mit Modal)",
        },
        {
          id: 5,
          before: "Das Paket",
          after: "morgen geliefert. (werden — Passiv Präsens)",
          answer: "wird",
          hint: "Passiv Präsens: wird + Partizip II (geliefert)",
        },
      ],
    },
  },

  // ─── 5. Relativsätze ──────────────────────────────────────────────────────
  {
    id: "relativsaetze",
    title: "Relativsätze",
    subtitle: "İlgi Cümleleri",
    explanation:
      "Relativsätze bir ismi tanımlamak veya açıklamak için kullanılır. Relativpronomen (der/die/das) başa gelir ve fiil en sona atılır. Pronomen, ismin cinsiyetine ve cümlede aldığı hale göre çekilir.",
    rules: [
      {
        heading: "Relativpronomen Tablosu",
        body:
          "Relativpronomen ismin cinsiyetine (der/die/das) ve bulunduğu hale (Nom/Akk/Dat/Gen) göre değişir.",
        examples: [
          { de: "Das ist der Mann, der Deutsch spricht. (Nom)", tr: "Bu Almanca konuşan adam." },
          { de: "Das ist die Frau, die ich kenne. (Akk)", tr: "Bu tanıdığım kadın." },
          { de: "Das ist das Kind, dem ich geholfen habe. (Dat)", tr: "Bu yardım ettiğim çocuk." },
          { de: "Das ist der Mann, dessen Auto rot ist. (Gen)", tr: "Bu arabası kırmızı olan adam." },
        ],
        table: {
          headers: ["Hal", "Maskulin (der)", "Feminin (die)", "Neutrum (das)", "Plural (die)"],
          rows: [
            ["Nominativ", "der", "die", "das", "die"],
            ["Akkusativ", "den", "die", "das", "die"],
            ["Dativ", "dem", "der", "dem", "denen"],
            ["Genitiv", "dessen", "deren", "dessen", "deren"],
          ],
        },
      },
      {
        heading: "Präposition + Relativpronomen",
        body:
          "Edat + Relativpronomen birlikte kullanılır. Edat her zaman önce gelir.",
        examples: [
          { de: "Der Freund, mit dem ich lerne, kommt aus Türkei.", tr: "Birlikte çalıştığım arkadaş Türkiye'den." },
          { de: "Das Hotel, in dem wir wohnten, war sehr schön.", tr: "Kaldığımız otel çok güzeldi." },
          { de: "Das ist das Thema, über das wir diskutieren.", tr: "Bu tartıştığımız konu." },
        ],
      },
    ],
    exercises: {
      multipleChoice: [
        {
          id: 1,
          question:
            "Das ist der Mann, ___ immer zu spät kommt. (Maskulin, Nominativ)",
          options: ["die", "das", "der", "den"],
          correct: 2,
          explanation:
            "Maskulin + Nominativ (özne) → 'der'.",
        },
        {
          id: 2,
          question:
            "Die Frau, ___ ich gestern getroffen habe, ist Lehrerin. (Feminin, Akkusativ)",
          options: ["die", "der", "das", "den"],
          correct: 0,
          explanation:
            "Feminin + Akkusativ → 'die' (Akkusativ'de feminin değişmez).",
        },
        {
          id: 3,
          question:
            "Das Kind, ___ ich geholfen habe, heißt Tim. (Neutrum, Dativ)",
          options: ["das", "dem", "den", "der"],
          correct: 1,
          explanation:
            "Neutrum + Dativ → 'dem'.",
        },
        {
          id: 4,
          question:
            "Der Film, ___ wir gesehen haben, war langweilig. (Maskulin, Akkusativ)",
          options: ["der", "die", "den", "dem"],
          correct: 2,
          explanation:
            "Maskulin + Akkusativ → 'den'.",
        },
        {
          id: 5,
          question:
            "Das ist die Stadt, in ___ ich geboren bin. (Feminin, Dativ)",
          options: ["der", "die", "dem", "deren"],
          correct: 0,
          explanation:
            "'in' + Dativ: Feminin Dativ → 'der'. 'in der Stadt'.",
        },
        {
          id: 6,
          question:
            "Der Mann, ___ Auto gestohlen wurde, wartet auf die Polizei. (Genitiv)",
          options: ["dem", "dessen", "der", "den"],
          correct: 1,
          explanation:
            "Maskulin Genitiv → 'dessen'.",
        },
        {
          id: 7,
          question:
            "Die Leute, ___ ich gesprochen habe, waren sehr freundlich. (Plural, Dativ)",
          options: ["die", "deren", "denen", "dem"],
          correct: 2,
          explanation:
            "Plural + Dativ → 'denen'.",
        },
        {
          id: 8,
          question:
            "Das Buch, ___ ich lese, ist sehr interessant. (Neutrum, Akkusativ)",
          options: ["das", "dem", "der", "des"],
          correct: 0,
          explanation:
            "Neutrum + Akkusativ → 'das' (değişmez).",
        },
      ],
      fillInBlank: [
        {
          id: 1,
          before: "Das ist die Frau,",
          after: "jeden Tag joggt. (Feminin, Nominativ)",
          answer: "die",
          hint: "Feminin + Nominativ → die",
        },
        {
          id: 2,
          before: "Der Kollege, mit",
          after: "ich arbeite, kommt aus Berlin. (Maskulin, Dativ nach 'mit')",
          answer: "dem",
          hint: "'mit' her zaman Dativ alır. Maskulin Dativ → dem",
        },
        {
          id: 3,
          before: "Das Haus,",
          after: "wir kaufen möchten, ist sehr teuer. (Neutrum, Akkusativ)",
          answer: "das",
          hint: "Neutrum + Akkusativ → das",
        },
        {
          id: 4,
          before: "Die Kinder,",
          after: "ich geholfen habe, waren sehr dankbar. (Plural, Dativ)",
          answer: "denen",
          hint: "Plural + Dativ → denen",
        },
        {
          id: 5,
          before: "Der Schüler,",
          after: "Eltern Lehrer sind, lernt sehr gut. (Maskulin, Genitiv)",
          answer: "dessen",
          hint: "Maskulin Genitiv → dessen",
        },
      ],
    },
  },

  // ─── 6. Kausale Nebensätze ─────────────────────────────────────────────────
  {
    id: "kausale-nebensaetze",
    title: "Kausale Nebensätze",
    subtitle: "Neden Belirten Yan Cümleler: weil, da, denn",
    explanation:
      "'weil' (çünkü) ve 'da' (madem ki / çünkü) neden-sonuç ilişkisi kuran bağlaçlardır. Her ikisi de fiili yan cümlenin sonuna atar. 'denn' ise koordinierende Konjunktion olduğu için fiil sırası değişmez.",
    rules: [
      {
        heading: "weil — Çünkü",
        body:
          "'weil' yan cümlede fiili sona atar. Modal fiil varsa önce Infinitiv, sonra Modal gelir. En sık kullanılan nedensellik bağlacıdır.",
        examples: [
          { de: "Ich gehe früh ins Bett, weil ich müde bin.", tr: "Yorgun olduğum için erken yatıyorum." },
          { de: "Er lernt Deutsch, weil er in Deutschland arbeiten möchte.", tr: "Almanya'da çalışmak istediği için Almanca öğreniyor." },
          { de: "Sie blieb zu Hause, weil sie krank war.", tr: "Hasta olduğu için evde kaldı." },
        ],
      },
      {
        heading: "da — Madem ki / Zira",
        body:
          "'da' genellikle nedenin bilinen veya önceden söylenmiş bir şey olduğunu vurgular. Cümle başında daha çok kullanılır. Fiili sona atar.",
        examples: [
          { de: "Da es regnet, nehmen wir den Bus.", tr: "Yağmur yağdığı için (madem ki) otobüs alıyoruz." },
          { de: "Da ich kein Geld habe, bleibe ich zu Hause.", tr: "Param olmadığı için evde kalıyorum." },
        ],
      },
      {
        heading: "denn — Çünkü (koordinierende Konjunktion)",
        body:
          "'denn' iki bağımsız cümleyi birleştirir. Fiil sırası değişmez (V2). 'weil'den farkı: cümle sırası normal kalır.",
        examples: [
          { de: "Ich gehe früh ins Bett, denn ich bin müde.", tr: "Erken yatıyorum, çünkü yorgunum." },
          { de: "Er kommt nicht, denn er hat keine Zeit.", tr: "Gelmiyor, çünkü zamanı yok." },
        ],
      },
    ],
    exercises: {
      multipleChoice: [
        {
          id: 1,
          question:
            "Er geht nicht zur Arbeit, ___ er krank ___.",
          options: [
            "weil / ist",
            "weil / ist er",
            "denn / ist er",
            "weil / er ist",
          ],
          correct: 0,
          explanation:
            "'weil' fiili sona atar → 'weil er krank ist'.",
        },
        {
          id: 2,
          question: "Ich lerne Deutsch, ___ ich in Wien studieren möchte.",
          options: ["denn", "weil", "da", "denn/weil (ikisi de doğru ama farklı yapı)"],
          correct: 1,
          explanation:
            "'weil' = çünkü, fiili sona atar: 'weil ich ... möchte'.",
        },
        {
          id: 3,
          question:
            "___ das Wetter schlecht ist, bleiben wir zu Hause.",
          options: ["Weil", "Denn", "Da", "Obwohl"],
          correct: 2,
          explanation:
            "Cümle başında 'da' kullanılır (bilinen neden). 'weil' de doğru ama 'da' cümle başına daha uygun.",
        },
        {
          id: 4,
          question:
            "Sie kauf keinen Kaffee, ___ sie ihn nicht mag.",
          options: ["weil", "da", "denn", "A ve C doğru"],
          correct: 3,
          explanation:
            "Hem 'weil' (fiil sona) hem 'denn' (fiil V2 kalır) doğrudur. Bu soruyu dikkatli okuyun — 'da' da olabilir.",
        },
        {
          id: 5,
          question:
            "Er hat das Buch nicht gelesen, ___ er keine Zeit ___.",
          options: [
            "weil / hatte",
            "weil / hatte er",
            "denn / hatte er",
            "da / hatte er",
          ],
          correct: 0,
          explanation:
            "'weil' + fiil sona → 'weil er keine Zeit hatte'.",
        },
        {
          id: 6,
          question:
            "Ich nehme einen Regenschirm mit, ___ es heute regnen soll.",
          options: ["denn", "weil", "da", "B ve C doğru"],
          correct: 3,
          explanation:
            "'weil' (fiil sona: 'weil es ... soll') ve 'da' (aynı) her ikisi de doğrudur.",
        },
        {
          id: 7,
          question:
            "Das Restaurant war voll, ___ viele Leute dort essen ___.",
          options: [
            "weil / wollten",
            "weil / wollten sie",
            "denn / wollten viele Leute",
            "A ve C doğru",
          ],
          correct: 3,
          explanation:
            "'weil viele Leute dort essen wollten' veya 'denn viele Leute wollten dort essen' — her ikisi doğru.",
        },
      ],
      fillInBlank: [
        {
          id: 1,
          before: "Sie geht früh schlafen,",
          after: "sie morgen früh aufstehen muss. (weil)",
          answer: "weil",
          hint: "weil = çünkü, fiili sona atar",
        },
        {
          id: 2,
          before: "Er hat Hunger,",
          after: "er seit dem Morgen nichts gegessen hat. (denn — V2 kalır)",
          answer: "denn",
          hint: "'denn' fiil sırasını değiştirmez",
        },
        {
          id: 3,
          before: "Ich bleibe zu Hause,",
          after: "es draußen sehr kalt ist. (weil)",
          answer: "weil",
          hint: "weil + fiil sona",
        },
        {
          id: 4,
          before: "Da ich kein Geld",
          after: ", kann ich nicht ins Kino gehen. (haben — Präteritum/Präsens)",
          answer: "habe",
          hint: "'da' + Präsens: 'da ich kein Geld habe'",
        },
        {
          id: 5,
          before: "Er lernt Spanisch,",
          after: "er nach Spanien reisen möchte. (weil)",
          answer: "weil",
          hint: "weil + Subjekt + ... + Verb (sona)",
        },
      ],
    },
  },

  // ─── 7. Konzessive Nebensätze ─────────────────────────────────────────────
  {
    id: "konzessiv",
    title: "Konzessive Nebensätze",
    subtitle: "Karşıtlık Bildiren Yapılar: obwohl, trotzdem, trotz",
    explanation:
      "Karşıtlık/zıtlık bildiren yapılar beklentiye rağmen gerçekleşen durumları anlatır. Türkçedeki '...masına rağmen' ve 'yine de' anlamına gelirler.",
    rules: [
      {
        heading: "obwohl (rağmen) — Nebensatz",
        body:
          "'obwohl' yan cümle bağlacıdır, fiili sona atar. Beklentinin aksine gerçekleşen durumu anlatır.",
        examples: [
          { de: "Obwohl es regnet, geht er spazieren.", tr: "Yağmur yağmasına rağmen yürüyüşe çıkıyor." },
          { de: "Sie kaufte das Kleid, obwohl es sehr teuer war.", tr: "Çok pahalı olmasına rağmen elbiseyi aldı." },
          { de: "Obwohl er müde war, arbeitete er weiter.", tr: "Yorgun olmasına rağmen çalışmaya devam etti." },
        ],
      },
      {
        heading: "trotzdem (yine de) — Adverb",
        body:
          "'trotzdem' bağımsız cümlenin başına ya da ortasına gelir. Fiil V2 sırasını korur.",
        examples: [
          { de: "Es regnet. Trotzdem geht er spazieren.", tr: "Yağmur yağıyor. Yine de yürüyüşe çıkıyor." },
          { de: "Das Essen war teuer; trotzdem hat es ihr geschmeckt.", tr: "Yemek pahalıydı; yine de hoşuna gitti." },
        ],
      },
      {
        heading: "trotz + Genitiv (rağmen) — Präposition",
        body:
          "'trotz' edat olarak Genitiv alır (konuşma dilinde sıkça Dativ kullanılır).",
        examples: [
          { de: "Trotz des schlechten Wetters fährt er Rad.", tr: "Kötü havaya rağmen bisiklete biniyor." },
          { de: "Trotz der Müdigkeit arbeitete sie weiter.", tr: "Yorgunluğuna rağmen çalışmaya devam etti." },
        ],
      },
    ],
    exercises: {
      multipleChoice: [
        {
          id: 1,
          question: "___ er krank ist, kommt er zur Arbeit.",
          options: ["Trotzdem", "Obwohl", "Trotz", "Weil"],
          correct: 1,
          explanation:
            "'obwohl' yan cümle bağlacı: fiili sona atar ve beklentinin aksini belirtir.",
        },
        {
          id: 2,
          question: "Er hatte keine Zeit. ___ half er mir.",
          options: ["Obwohl", "Trotz", "Trotzdem", "Weil"],
          correct: 2,
          explanation:
            "'trotzdem' bağımsız cümle başına gelir ve 'yine de' anlamı taşır.",
        },
        {
          id: 3,
          question: "___ des Lärms schlief das Baby.",
          options: ["Obwohl", "Trotzdem", "Trotz", "Weil"],
          correct: 2,
          explanation:
            "'trotz' edat olup Genitiv alır: 'trotz des Lärms'.",
        },
        {
          id: 4,
          question:
            "Sie ging zur Party, ___ sie Kopfschmerzen ___.",
          options: [
            "obwohl / hatte",
            "trotzdem / hatte sie",
            "trotz / hatte",
            "A ve B doğru (farklı yapıda)",
          ],
          correct: 3,
          explanation:
            "'obwohl sie Kopfschmerzen hatte' veya 'Sie hatte Kopfschmerzen. Trotzdem ging sie zur Party.' Her ikisi doğru ama farklı yapıda.",
        },
        {
          id: 5,
          question:
            "Obwohl er viel ___, versteht er die Grammatik nicht.",
          options: ["lernt", "lernen", "gelernt", "lernst"],
          correct: 0,
          explanation:
            "'obwohl' yan cümlesi Präsens ile: 'obwohl er viel lernt'.",
        },
        {
          id: 6,
          question: "___ der Kälte gingen die Kinder draußen spielen.",
          options: ["Obwohl", "Trotzdem", "Trotz", "Weil"],
          correct: 2,
          explanation:
            "'trotz' + Genitiv: 'trotz der Kälte'.",
        },
        {
          id: 7,
          question:
            "Das Restaurant war teuer. ___ gingen wir jeden Abend hin.",
          options: ["Obwohl", "Trotz", "Weil", "Trotzdem"],
          correct: 3,
          explanation:
            "İki bağımsız cümle → 'trotzdem' (yine de) V2 ile.",
        },
      ],
      fillInBlank: [
        {
          id: 1,
          before: "___ es sehr kalt war, spielten die Kinder draußen.",
          after: "",
          answer: "Obwohl",
          hint: "obwohl = ...masına rağmen (yan cümle bağlacı)",
        },
        {
          id: 2,
          before: "Das Wetter war schlecht.",
          after: "machten wir einen Ausflug. (trotzdem)",
          answer: "Trotzdem",
          hint: "'trotzdem' cümle başına gelir, V2 sırası korunur",
        },
        {
          id: 3,
          before: "___ seiner Müdigkeit arbeitete er weiter.",
          after: "",
          answer: "Trotz",
          hint: "trotz + Genitiv: trotz seiner Müdigkeit",
        },
        {
          id: 4,
          before: "Sie bestand die Prüfung, obwohl sie nicht viel",
          after: "hatte. (lernen — Plusquamperfekt)",
          answer: "gelernt",
          hint: "obwohl + hatte + Partizip II (gelernt)",
        },
        {
          id: 5,
          before: "Er isst weiter Schokolade,",
          after: "der Arzt es verboten hat. (obwohl)",
          answer: "obwohl",
          hint: "obwohl + fiil sona",
        },
      ],
    },
  },

  // ─── 8. Finale Nebensätze ─────────────────────────────────────────────────
  {
    id: "finale-nebensaetze",
    title: "Finale Nebensätze",
    subtitle: "Amaç Belirten Yapılar: damit, um...zu",
    explanation:
      "Amaç bildiren yapılar bir eylemin neden yapıldığını açıklar. Türkçedeki '-mek için' anlamına gelirler. 'um...zu' ve 'damit' arasındaki fark TELC'de sık sınav konusudur.",
    rules: [
      {
        heading: "um...zu + Infinitiv",
        body:
          "Ana cümle ve yan cümlenin öznesi aynıysa 'um...zu + Infinitiv' kullanılır. Trennbare Verben'de 'zu' önek ile kök arasına girer.",
        examples: [
          { de: "Ich lerne Deutsch, um in Deutschland zu arbeiten.", tr: "Almanya'da çalışmak için Almanca öğreniyorum." },
          { de: "Er spart Geld, um ein Auto zu kaufen.", tr: "Araba almak için para biriktiriyor." },
          { de: "Sie steht früh auf, um den ersten Zug zu nehmen.", tr: "İlk treni yakalamak için erken kalkıyor." },
        ],
      },
      {
        heading: "damit (ki) — Nebensatz",
        body:
          "Ana cümle ve yan cümlenin öznesi farklıysa 'damit' kullanılır. Yan cümlede özne belirtilir, fiil sona atılır.",
        examples: [
          { de: "Ich spreche langsam, damit du mich verstehst.", tr: "Seni anlaman için yavaş konuşuyorum." },
          { de: "Er erklärt es nochmal, damit alle es verstehen.", tr: "Herkesin anlaması için tekrar açıklıyor." },
          { de: "Sie schreibt alles auf, damit sie es nicht vergisst.", tr: "Unutmaması için her şeyi yazıyor. (Özne aynı → um...zu da kullanılabilir)" },
        ],
      },
    ],
    exercises: {
      multipleChoice: [
        {
          id: 1,
          question:
            "Er lernt Vokabeln, ___ er die Prüfung besteht. (aynı özne)",
          options: [
            "damit",
            "um zu bestehen",
            "um die Prüfung zu bestehen",
            "B ve C doğru",
          ],
          correct: 2,
          explanation:
            "Aynı özne → 'um...zu + Infinitiv'. Doğru form: 'um die Prüfung zu bestehen'.",
        },
        {
          id: 2,
          question:
            "Ich erkläre es nochmal, ___ du es verstehst. (farklı özne)",
          options: ["um zu verstehen", "damit", "um zu", "obwohl"],
          correct: 1,
          explanation:
            "Farklı özne (ich/du) → 'damit' kullanılır.",
        },
        {
          id: 3,
          question:
            "Sie macht Sport, ___ fit ___ bleiben.",
          options: ["damit / zu", "um / zu", "damit / —", "um / —"],
          correct: 1,
          explanation:
            "Aynı özne: 'um fit zu bleiben'. 'zu' fiilden önce.",
        },
        {
          id: 4,
          question:
            "Er spricht lauter, ___ die Kinder ihn ___ können. (damit / hören)",
          options: [
            "damit / hören",
            "um / hören zu",
            "damit / zu hören",
            "um / hören",
          ],
          correct: 0,
          explanation:
            "Farklı özne (er/Kinder) → 'damit die Kinder ihn hören können'.",
        },
        {
          id: 5,
          question:
            "Ich spare Geld, ___ im Sommer verreisen ___ können.",
          options: [
            "damit / zu",
            "um / zu",
            "damit / —",
            "um verreisen / zu",
          ],
          correct: 1,
          explanation:
            "Aynı özne → 'um im Sommer verreisen zu können'. Modal + Infinitiv sona.",
        },
        {
          id: 6,
          question:
            "Die Lehrerin schreibt langsam, ___ alle Schüler die Wörter ___ abschreiben ___.",
          options: [
            "damit / können / —",
            "um / können / zu",
            "damit / zu / können",
            "um / zu / können",
          ],
          correct: 0,
          explanation:
            "Farklı özne → 'damit alle Schüler die Wörter abschreiben können'.",
        },
        {
          id: 7,
          question:
            "Er ruft früh an, ___ noch einen Termin ___ bekommen.",
          options: [
            "um / zu",
            "damit / zu",
            "damit / —",
            "um / —",
          ],
          correct: 0,
          explanation:
            "Aynı özne → 'um ... zu bekommen'. 'zu' Infinitiv'den önce.",
        },
      ],
      fillInBlank: [
        {
          id: 1,
          before: "Er lernt jeden Tag,",
          after: "er die Prüfung besteht. (damit — farklı özne ima edilmiş, 'damit' de olur 'um...zu' da)",
          answer: "damit",
          hint: "damit + Subjekt + ... + Verb (sona)",
        },
        {
          id: 2,
          before: "Sie kauft einen Wecker,",
          after: "morgen früh aufzustehen. (um...zu)",
          answer: "um",
          hint: "um ... zu + Infinitiv (aynı özne)",
        },
        {
          id: 3,
          before: "Ich erkläre alles nochmal,",
          after: "du es verstehst. (damit)",
          answer: "damit",
          hint: "damit = ki (farklı özne için)",
        },
        {
          id: 4,
          before: "Er spart Geld,",
          after: "ein neues Fahrrad zu kaufen. (um)",
          answer: "um",
          hint: "um ... zu + Infinitiv",
        },
        {
          id: 5,
          before: "Die Mutter spricht leise,",
          after: "das Baby schläft. (damit)",
          answer: "damit",
          hint: "damit + Subjekt + Verb (sona)",
        },
      ],
    },
  },

  // ─── 9. Temporale Nebensätze ──────────────────────────────────────────────
  {
    id: "temporal-nebensaetze",
    title: "Temporale Nebensätze",
    subtitle: "Zaman Belirten Yan Cümleler",
    explanation:
      "Zaman bağlaçları iki eylemin zamansal ilişkisini belirtir. TELC B1'de en çok 'als', 'wenn', 'während', 'bevor', 'nachdem' ve 'seitdem' sınanır.",
    rules: [
      {
        heading: "als vs. wenn",
        body:
          "'als' = geçmişte tek seferlik olay. 'wenn' = tekrarlayan olay (geçmiş/bugün) veya gelecek. Bu ayrım kritiktir.",
        examples: [
          { de: "Als ich jung war, lebte ich in Ankara.", tr: "Gençken Ankara'da yaşıyordum. (tek geçmiş)" },
          { de: "Wenn ich als Kind Urlaub hatte, fuhr ich ans Meer.", tr: "Çocukken tatilim olduğunda denize giderdim. (tekrarlayan)" },
          { de: "Wenn ich Zeit habe, rufe ich an.", tr: "Zamanım olduğunda arayacağım. (gelecek)" },
        ],
      },
      {
        heading: "während, bevor, nachdem, seitdem",
        body:
          "'während' = eş zamanlı. 'bevor' = önce. 'nachdem' = sonra (Plusquamperfekt ile). 'seitdem' = o zamandan beri.",
        examples: [
          { de: "Während er kocht, höre ich Musik.", tr: "O yemek yaparken ben müzik dinliyorum." },
          { de: "Bevor er geht, räumt er auf.", tr: "Gitmeden önce topluyor." },
          { de: "Seitdem sie hier wohnt, hat sie viele Freunde.", tr: "Burada oturduğundan beri çok arkadaşı var." },
        ],
      },
    ],
    exercises: {
      multipleChoice: [
        {
          id: 1,
          question:
            "___ ich ein Kind war, spielte ich immer im Garten. (tek geçmiş)",
          options: ["Wenn", "Als", "Während", "Seitdem"],
          correct: 1,
          explanation:
            "Geçmişte tek seferlik bir durum → 'als'.",
        },
        {
          id: 2,
          question:
            "___ ich Fieber habe, bleibe ich immer zu Hause. (tekrarlayan)",
          options: ["Als", "Während", "Wenn", "Bevor"],
          correct: 2,
          explanation:
            "Tekrarlayan durum (hep böyle yaparım) → 'wenn'.",
        },
        {
          id: 3,
          question:
            "Er liest die Zeitung, ___ er frühstückt.",
          options: ["bevor", "während", "als", "nachdem"],
          correct: 1,
          explanation:
            "'während' = eş zamanlı eylem.",
        },
        {
          id: 4,
          question:
            "___ er geduscht hatte, frühstückte er. (önce duş, sonra kahvaltı)",
          options: ["Bevor", "Während", "Als", "Nachdem"],
          correct: 3,
          explanation:
            "'nachdem' = bir eylemden sonra. 'nachdem' + Plusquamperfekt.",
        },
        {
          id: 5,
          question:
            "Sie lernt Deutsch, ___ sie in Wien lebt.",
          options: ["bevor", "seitdem", "als", "während"],
          correct: 1,
          explanation:
            "'seitdem' = o zamandan beri (devam eden durum).",
        },
        {
          id: 6,
          question:
            "___ der Film anfing, kamen noch mehr Leute. (bir eylemden önce)",
          options: ["Während", "Seitdem", "Bevor", "Nachdem"],
          correct: 2,
          explanation:
            "'bevor' = film başlamadan önce daha fazla kişi geldi.",
        },
        {
          id: 7,
          question:
            "___ er die Schule beendet hat, jobbt er in einem Café.",
          options: ["Bevor", "Während", "Seitdem", "Als"],
          correct: 2,
          explanation:
            "'seitdem' = okuldan beri (devam eden durum, bağlantılı).",
        },
        {
          id: 8,
          question:
            "___ sie in Berlin ankam, suchte sie sofort eine Wohnung.",
          options: ["Als", "Wenn", "Seitdem", "Während"],
          correct: 0,
          explanation:
            "Geçmişte tek seferlik olay → 'als'.",
        },
      ],
      fillInBlank: [
        {
          id: 1,
          before: "",
          after: "er jung war, arbeitete er auf einem Bauernhof. (als/wenn)",
          answer: "Als",
          hint: "Geçmişte tek seferlik durum → als",
        },
        {
          id: 2,
          before: "Sie hört immer Podcast,",
          after: "sie mit dem Zug fährt. (während)",
          answer: "während",
          hint: "während = eş zamanlı eylem",
        },
        {
          id: 3,
          before: "",
          after: "ich mehr Zeit habe, lerne ich Gitarre. (wenn)",
          answer: "Wenn",
          hint: "Tekrarlayan / gelecek koşul → wenn",
        },
        {
          id: 4,
          before: "Er zog sich an,",
          after: "er gefrühstückt hatte. (nachdem)",
          answer: "nachdem",
          hint: "nachdem + Plusquamperfekt (önce kahvaltı, sonra giyindi)",
        },
        {
          id: 5,
          before: "",
          after: "sie in Deutschland wohnt, spricht sie viel besser Deutsch. (seitdem)",
          answer: "Seitdem",
          hint: "seitdem = o zamandan beri",
        },
      ],
    },
  },

  // ─── 10. Zweiteilige Konjunktionen ────────────────────────────────────────
  {
    id: "zweiteilige-konjunktionen",
    title: "Zweiteilige Konjunktionen",
    subtitle: "İkili Bağlaçlar",
    explanation:
      "İkili bağlaçlar iki unsuru birbiriyle ilişkilendirir. B1'de en sık sınana dördü: sowohl...als auch (hem...hem de), weder...noch (ne...ne de), nicht nur...sondern auch (sadece...değil aynı zamanda), entweder...oder (ya...ya da).",
    rules: [
      {
        heading: "sowohl...als auch / entweder...oder / weder...noch / nicht nur...sondern auch",
        body:
          "Bu bağlaçlar iki ismi, iki fiili veya iki cümleyi birleştirir. Fiil sırası ana cümlede V2 kalır.",
        examples: [
          { de: "Er spricht sowohl Deutsch als auch Englisch.", tr: "Hem Almanca hem de İngilizce konuşuyor." },
          { de: "Wir fahren entweder mit dem Zug oder mit dem Bus.", tr: "Ya trenle ya da otobüsle gidiyoruz." },
          { de: "Er hat weder Zeit noch Geld.", tr: "Ne zamanı ne de parası var." },
          { de: "Sie ist nicht nur klug, sondern auch fleißig.", tr: "Sadece zeki değil, aynı zamanda çalışkan." },
        ],
        table: {
          headers: ["Bağlaç", "Anlam", "Örnek"],
          rows: [
            ["sowohl...als auch", "hem...hem de", "sowohl Kaffee als auch Tee"],
            ["weder...noch", "ne...ne de", "weder Zeit noch Geld"],
            ["entweder...oder", "ya...ya da", "entweder Zug oder Bus"],
            ["nicht nur...sondern auch", "sadece değil...aynı zamanda", "nicht nur schön, sondern auch klug"],
          ],
        },
      },
    ],
    exercises: {
      multipleChoice: [
        {
          id: 1,
          question:
            "Sie kann ___ Gitarre ___ Klavier spielen. (hem...hem de)",
          options: [
            "entweder / oder",
            "weder / noch",
            "sowohl / als auch",
            "nicht nur / sondern auch",
          ],
          correct: 2,
          explanation:
            "'sowohl...als auch' = hem...hem de.",
        },
        {
          id: 2,
          question:
            "Er hat ___ Zeit ___ Lust, ins Kino zu gehen. (ne...ne de)",
          options: [
            "entweder / oder",
            "weder / noch",
            "sowohl / als auch",
            "nicht nur / sondern auch",
          ],
          correct: 1,
          explanation:
            "'weder...noch' = ne...ne de (olumsuz her iki taraf).",
        },
        {
          id: 3,
          question:
            "Wir fahren ___ mit dem Zug ___ mit dem Flugzeug.",
          options: [
            "weder / noch",
            "sowohl / als auch",
            "entweder / oder",
            "nicht nur / sondern auch",
          ],
          correct: 2,
          explanation:
            "'entweder...oder' = ya...ya da (seçenek).",
        },
        {
          id: 4,
          question:
            "Das Restaurant ist ___ günstig, ___ hat es eine tolle Atmosphäre.",
          options: [
            "entweder / oder",
            "weder / noch",
            "sowohl / als auch",
            "nicht nur günstig / sondern",
          ],
          correct: 3,
          explanation:
            "'nicht nur...sondern auch' iki cümleyi birleştirir: 'nicht nur günstig, sondern auch...'",
        },
        {
          id: 5,
          question:
            "Sie studiert ___ in Berlin ___ in Wien. (ya...ya da)",
          options: [
            "sowohl / als auch",
            "entweder / oder",
            "weder / noch",
            "nicht nur / sondern",
          ],
          correct: 1,
          explanation:
            "'entweder...oder' = seçenek belirtir.",
        },
        {
          id: 6,
          question:
            "Er spricht ___ Türkisch ___ Arabisch. (ne...ne de)",
          options: [
            "sowohl / als auch",
            "entweder / oder",
            "weder / noch",
            "nicht nur / sondern",
          ],
          correct: 2,
          explanation:
            "'weder...noch' = ne Türkçe ne de Arapça (konuşmuyor).",
        },
        {
          id: 7,
          question:
            "Das Buch ist ___ lang ___ interessant geschrieben.",
          options: [
            "entweder / oder",
            "weder / noch",
            "sowohl / als auch",
            "nicht nur / sondern auch",
          ],
          correct: 2,
          explanation:
            "Hem uzun hem de ilginç yazılmış → 'sowohl...als auch'.",
        },
      ],
      fillInBlank: [
        {
          id: 1,
          before: "Sie spricht",
          after: "Englisch ___ Französisch. (sowohl...als auch)",
          answer: "sowohl",
          hint: "sowohl...als auch = hem...hem de",
        },
        {
          id: 2,
          before: "Er hat weder Zeit",
          after: "Geld. (weder...noch)",
          answer: "noch",
          hint: "weder...noch = ne...ne de",
        },
        {
          id: 3,
          before: "Wir fahren entweder mit dem Auto",
          after: "mit dem Zug. (entweder...oder)",
          answer: "oder",
          hint: "entweder...oder = ya...ya da",
        },
        {
          id: 4,
          before: "Er ist nicht nur intelligent,",
          after: "auch sehr hilfsbereit. (sondern)",
          answer: "sondern",
          hint: "nicht nur...sondern auch",
        },
        {
          id: 5,
          before: "Das Café ist sowohl gemütlich",
          after: "günstig. (als auch)",
          answer: "als auch",
          hint: "sowohl...als auch",
        },
      ],
    },
  },

  // ─── 11. Infinitiv mit zu ─────────────────────────────────────────────────
  {
    id: "infinitiv-mit-zu",
    title: "Infinitiv mit zu",
    subtitle: "zu + Mastar",
    explanation:
      "Bazı fiil, isim ve sıfat yapıları 'zu + Infinitiv' alır. Modal fiiller (können, müssen, dürfen vb.) almaz. Trennbare Verben'de 'zu' önek ile kök arasına girer.",
    rules: [
      {
        heading: "Belirli Fiillerden Sonra",
        body:
          "versuchen, vergessen, hoffen, beginnen, vorhaben, versprechen, empfehlen, vorschlagen ve 'es ist + Adjektiv' yapıları 'zu + Infinitiv' alır.",
        examples: [
          { de: "Ich versuche, täglich zu lernen.", tr: "Her gün çalışmaya çalışıyorum." },
          { de: "Er vergaß, die Tür abzuschließen.", tr: "Kapıyı kilitlemeyi unuttu." },
          { de: "Es ist wichtig, genug zu schlafen.", tr: "Yeterince uyumak önemli." },
        ],
      },
      {
        heading: "um...zu / ohne...zu / anstatt...zu",
        body:
          "Bu üç yapı 'zu + Infinitiv' ile kullanılır. 'um...zu' = amaç, 'ohne...zu' = olmadan, 'anstatt...zu' = yerine.",
        examples: [
          { de: "Er lernt, um die Prüfung zu bestehen.", tr: "Sınavı geçmek için çalışıyor." },
          { de: "Sie verließ das Zimmer, ohne ein Wort zu sagen.", tr: "Tek kelime söylemeden odadan çıktı." },
          { de: "Anstatt zu arbeiten, schaute er fern.", tr: "Çalışmak yerine televizyon izledi." },
        ],
      },
      {
        heading: "Trennbare Verben: zu araya girer",
        body:
          "Ayrılabilen fiillerde 'zu' önek ile kök arasına gelir. Bu kural çok sık hata kaynağıdır.",
        examples: [
          { de: "Er vergaß, die Tür abzuschließen. (abschließen)", tr: "Kapıyı kilitlemeyi unuttu." },
          { de: "Sie versuchte, früher aufzustehen. (aufstehen)", tr: "Daha erken kalkmaya çalıştı." },
          { de: "Es ist wichtig, pünktlich anzufangen. (anfangen)", tr: "Zamanında başlamak önemli." },
        ],
      },
    ],
    exercises: {
      multipleChoice: [
        {
          id: 1,
          question: "Ich versuche, jeden Tag Deutsch ___ lernen.",
          options: ["lernen", "zu lernen", "lerne", "gelernt"],
          correct: 1,
          explanation:
            "'versuchen' → 'zu + Infinitiv': zu lernen.",
        },
        {
          id: 2,
          question: "Er vergaß, die E-Mail ___. (abschicken — trennbar)",
          options: [
            "abzuschicken",
            "zu abschicken",
            "abschicken",
            "schicken abzu",
          ],
          correct: 0,
          explanation:
            "Trennbar: önek + zu + kök → abzuschicken.",
        },
        {
          id: 3,
          question:
            "Es ist wichtig, viel Wasser ___ trinken.",
          options: ["zu trinken", "trinken zu", "trinken", "getrunken"],
          correct: 0,
          explanation:
            "'Es ist + Adjektiv' → 'zu + Infinitiv': zu trinken.",
        },
        {
          id: 4,
          question: "Sie blieb zu Hause, ___ arbeiten zu gehen.",
          options: ["um", "ohne", "anstatt", "damit"],
          correct: 2,
          explanation:
            "'anstatt...zu' = ... yapmak yerine. Çalışmak yerine evde kaldı.",
        },
        {
          id: 5,
          question: "Er fuhr nach Berlin, ___ seinen Freund zu besuchen.",
          options: ["ohne", "anstatt", "um", "damit"],
          correct: 2,
          explanation:
            "'um...zu' = amaç (arkadaşını ziyaret etmek için).",
        },
        {
          id: 6,
          question: "Sie verließ das Büro, ___ sich zu verabschieden.",
          options: ["um", "anstatt", "damit", "ohne"],
          correct: 3,
          explanation:
            "'ohne...zu' = yapmadan (veda etmeden).",
        },
        {
          id: 7,
          question: "Ich habe vor, nächstes Jahr ___ reisen. (vorhaben)",
          options: ["reisen", "zu reisen", "gereist", "reiste"],
          correct: 1,
          explanation:
            "'vorhaben' → 'zu + Infinitiv': zu reisen.",
        },
      ],
      fillInBlank: [
        {
          id: 1,
          before: "Er versuchte,",
          after: "früher aufzustehen. (um/versuchen — bereits zu aufzustehen→ aufzustehen)",
          answer: "früher aufzustehen",
          hint: "aufstehen (trennbar) → aufzustehen",
        },
        {
          id: 2,
          before: "Es macht Spaß,",
          after: "Musik zu hören.",
          answer: "Musik zu hören",
          hint: "Infinitiv mit zu: zu + hören",
        },
        {
          id: 3,
          before: "Sie fuhr ohne",
          after: "ihren Mann anzurufen. (anrufen — trennbar)",
          answer: "anzurufen",
          hint: "anrufen → anzurufen (trennbar: an+zu+rufen)",
        },
        {
          id: 4,
          before: "Er lernt Spanisch,",
          after: "in Spanien zu arbeiten. (um)",
          answer: "um",
          hint: "um...zu + Infinitiv = amaç",
        },
        {
          id: 5,
          before: "Es ist gesund,",
          after: "Sport zu machen.",
          answer: "Sport zu machen",
          hint: "Es ist + Adjektiv → zu + Infinitiv",
        },
      ],
    },
  },

  // ─── 12. Adjektivdeklination ──────────────────────────────────────────────
  {
    id: "adjektivdeklination",
    title: "Adjektivdeklination",
    subtitle: "Sıfat Çekimi",
    explanation:
      "Almancada isimden önce kullanılan sıfatlar, ismin cinsiyetine, haline ve önündeki artikele göre çekim alır. Üç tip vardır: belirli artikelden sonra (der/die/das), belirsiz artikelden sonra (ein/eine), artikelsiz.",
    rules: [
      {
        heading: "Bestimmter Artikel + Adjektiv (Schwache Deklination)",
        body:
          "der/die/das/die (çoğul) artikellerinden sonra sıfat çekimi: Nominativ'de -e, diğerlerinde -en.",
        examples: [
          { de: "der alte Mann (Nom. Mask.)", tr: "yaşlı adam" },
          { de: "die schöne Frau (Nom. Fem.)", tr: "güzel kadın" },
          { de: "Ich sehe den alten Mann. (Akk. Mask.)", tr: "Yaşlı adamı görüyorum." },
        ],
        table: {
          headers: ["Hal", "Maskulin", "Feminin", "Neutrum", "Plural"],
          rows: [
            ["Nominativ", "der alte", "die alte", "das alte", "die alten"],
            ["Akkusativ", "den alten", "die alte", "das alte", "die alten"],
            ["Dativ", "dem alten", "der alten", "dem alten", "den alten"],
            ["Genitiv", "des alten", "der alten", "des alten", "der alten"],
          ],
        },
      },
      {
        heading: "Unbestimmter Artikel + Adjektiv (Gemischte Deklination)",
        body:
          "ein/eine/ein artikellerinden sonra: Nominativ ve Akkusativ Neutrum'da sıfat cinsiyeti gösterir (-es/-er/-e), geri kalan → -en.",
        examples: [
          { de: "ein alter Mann (Nom. Mask.)", tr: "yaşlı bir adam" },
          { de: "eine schöne Frau (Nom. Fem.)", tr: "güzel bir kadın" },
          { de: "ein kleines Kind (Nom./Akk. Neut.)", tr: "küçük bir çocuk" },
        ],
        table: {
          headers: ["Hal", "Maskulin", "Feminin", "Neutrum"],
          rows: [
            ["Nominativ", "ein alter", "eine alte", "ein altes"],
            ["Akkusativ", "einen alten", "eine alte", "ein altes"],
            ["Dativ", "einem alten", "einer alten", "einem alten"],
            ["Genitiv", "eines alten", "einer alten", "eines alten"],
          ],
        },
      },
    ],
    exercises: {
      multipleChoice: [
        {
          id: 1,
          question: "Ich kaufe den ___ Mantel. (neu, Maskulin Akkusativ, best. Art.)",
          options: ["neue", "neuen", "neuer", "neuem"],
          correct: 1,
          explanation:
            "Bestimmter Artikel + Akkusativ Maskulin → -en: 'den neuen Mantel'.",
        },
        {
          id: 2,
          question:
            "Das ist eine ___ Idee. (gut, Feminin Nominativ, unbest. Art.)",
          options: ["gute", "guten", "gutem", "guter"],
          correct: 0,
          explanation:
            "Unbestimmter Artikel + Nominativ Feminin → -e: 'eine gute Idee'.",
        },
        {
          id: 3,
          question:
            "Er hilft dem ___ Mann. (alt, Maskulin Dativ, best. Art.)",
          options: ["alte", "alten", "alter", "altem"],
          correct: 1,
          explanation:
            "Bestimmter Artikel + Dativ Maskulin → -en: 'dem alten Mann'.",
        },
        {
          id: 4,
          question:
            "Sie hat ein ___ Auto. (schnell, Neutrum Akkusativ, unbest. Art.)",
          options: ["schnelles", "schnelle", "schnellen", "schnellem"],
          correct: 0,
          explanation:
            "Unbestimmter Artikel + Akkusativ Neutrum → -es (Nominativ/Akkusativ Neutrum'da cinsiyeti sıfat gösterir).",
        },
        {
          id: 5,
          question:
            "Wir sehen die ___ Berge. (hoch, Plural Akkusativ, best. Art.)",
          options: ["hohe", "hohem", "hohen", "hoher"],
          correct: 2,
          explanation:
            "Plural Akkusativ bestimmter Artikel → -en: 'die hohen Berge'.",
        },
        {
          id: 6,
          question:
            "Das ist der ___ Film, den ich je gesehen habe. (schön, Maskulin Nom.)",
          options: ["schönen", "schöne", "schöner", "schönem"],
          correct: 1,
          explanation:
            "Bestimmter Artikel + Nominativ Maskulin → -e: 'der schöne Film'.",
        },
        {
          id: 7,
          question:
            "Sie kommt aus einem ___ Land. (klein, Neutrum Dativ, unbest. Art.)",
          options: ["kleines", "kleinen", "kleinem", "kleine"],
          correct: 2,
          explanation:
            "Unbestimmter Artikel + Dativ Neutrum → -em: 'einem kleinen Land'.",
        },
        {
          id: 8,
          question: "Er trägt einen ___ Rucksack. (groß, Maskulin Akkusativ)",
          options: ["großer", "großen", "große", "großem"],
          correct: 1,
          explanation:
            "Unbestimmter Artikel + Akkusativ Maskulin → -en: 'einen großen Rucksack'.",
        },
      ],
      fillInBlank: [
        {
          id: 1,
          before: "Er kauft die",
          after: "Schuhe. (neu, Plural Akkusativ, best. Art.)",
          answer: "neuen",
          hint: "best. Art. + Plural → immer -en",
        },
        {
          id: 2,
          before: "Sie hat ein",
          after: "Kleid an. (rot, Neutrum Akkusativ)",
          answer: "rotes",
          hint: "unbest. Art. + Neutrum Akkusativ → -es",
        },
        {
          id: 3,
          before: "Mit dem",
          after: "Zug fährt man schneller. (schnell, Maskulin Dativ)",
          answer: "schnellen",
          hint: "best. Art. + Dativ → -en",
        },
        {
          id: 4,
          before: "Das ist eine",
          after: "Aufgabe. (schwierig, Feminin Nominativ)",
          answer: "schwierige",
          hint: "unbest. Art. + Feminin Nominativ → -e",
        },
        {
          id: 5,
          before: "Ich mag den",
          after: "Kaffee. (stark, Maskulin Akkusativ, best. Art.)",
          answer: "starken",
          hint: "best. Art. + Maskulin Akkusativ → -en",
        },
      ],
    },
  },

  // ─── 13. Genitiv ──────────────────────────────────────────────────────────
  {
    id: "genitiv",
    title: "Genitiv",
    subtitle: "Sahiplik ve İlgi Hali",
    explanation:
      "Genitiv, iki isim arasındaki sahiplik ilişkisini veya bazı edatları ifade eder. Maskulin ve Neutrum isimlere -(e)s eklenir. Feminin ve çoğulda değişim olmaz. B1 sınavında Genitiv edatları (wegen, trotz, während, aufgrund) özellikle önemlidir.",
    rules: [
      {
        heading: "Genitiv Artikel",
        body:
          "Maskulin: des (ein → eines), Feminin: der (eine → einer), Neutrum: des (ein → eines), Plural: der.",
        examples: [
          { de: "das Auto des Mannes", tr: "adamın arabası" },
          { de: "der Name der Stadt", tr: "şehrin adı" },
          { de: "das Ende des Sommers", tr: "yazın sonu" },
          { de: "die Meinungen der Leute", tr: "insanların görüşleri" },
        ],
        table: {
          headers: ["Cinsiyet", "Belirli Art.", "Belirsiz Art.", "İsim eki"],
          rows: [
            ["Maskulin (der)", "des Mannes", "eines Mannes", "-es / -s"],
            ["Feminin (die)", "der Frau", "einer Frau", "—"],
            ["Neutrum (das)", "des Kindes", "eines Kindes", "-es / -s"],
            ["Plural (die)", "der Kinder", "—", "—"],
          ],
        },
      },
      {
        heading: "Genitiv Präpositionen",
        body:
          "wegen (yüzünden), trotz (rağmen), während (süresince), aufgrund (nedeniyle), innerhalb (içinde), außerhalb (dışında), statt/anstatt (yerine).",
        examples: [
          { de: "Wegen des Regens blieb er zu Hause.", tr: "Yağmur yüzünden evde kaldı." },
          { de: "Während des Unterrichts darf man nicht essen.", tr: "Ders sırasında yemek yenmez." },
          { de: "Aufgrund der Baustelle gibt es Staus.", tr: "Şantiye nedeniyle trafik sıkışıklığı var." },
        ],
      },
    ],
    exercises: {
      multipleChoice: [
        {
          id: 1,
          question: "Das ist das Auto ___ Lehrers.",
          options: ["der", "des", "dem", "den"],
          correct: 1,
          explanation:
            "Maskulin Genitiv: 'des Lehrers' (Lehrer + es).",
        },
        {
          id: 2,
          question:
            "___ des schlechten Wetters blieben wir zu Hause.",
          options: ["Wegen", "Trotz", "Während", "Aufgrund"],
          correct: 0,
          explanation:
            "'wegen' = yüzünden (Genitiv edat). Diğerleri de Genitiv alır ama anlam farklıdır.",
        },
        {
          id: 3,
          question: "Die Farbe ___ Haare ist braun.",
          options: ["des", "der", "dem", "die"],
          correct: 1,
          explanation:
            "'Haare' çoğul → Genitiv: 'der Haare'.",
        },
        {
          id: 4,
          question:
            "___ des Unterrichts darf man kein Handy benutzen.",
          options: ["Wegen", "Trotz", "Während", "Aufgrund"],
          correct: 2,
          explanation:
            "'während' = ders süresince (zaman bildirimi).",
        },
        {
          id: 5,
          question: "Das Ende ___ Films war überraschend.",
          options: ["des", "der", "dem", "die"],
          correct: 0,
          explanation:
            "'Film' Maskulin → Genitiv: 'des Films' (Film + s).",
        },
        {
          id: 6,
          question:
            "___ seines Fleißes bekam er eine gute Note.",
          options: ["Trotz", "Wegen", "Während", "Aufgrund"],
          correct: 3,
          explanation:
            "'aufgrund' = nedeniyle (olumlu neden).",
        },
        {
          id: 7,
          question: "Die Meinung ___ Lehrerin war anders.",
          options: ["des", "dem", "der", "die"],
          correct: 2,
          explanation:
            "'Lehrerin' Feminin → Genitiv: 'der Lehrerin'.",
        },
      ],
      fillInBlank: [
        {
          id: 1,
          before: "Das ist das Haus",
          after: "Nachbarn. (der Nachbar — Maskulin Genitiv)",
          answer: "des",
          hint: "Maskulin Genitiv → des (+ -n/-en beim Namen)",
        },
        {
          id: 2,
          before: "Wegen",
          after: "Baustelle gibt es keinen Parkplatz. (der — Feminin Genitiv)",
          answer: "der",
          hint: "Feminin Genitiv → der",
        },
        {
          id: 3,
          before: "Während",
          after: "Essens soll man nicht sprechen. (das Essen — Neutrum Genitiv)",
          answer: "des",
          hint: "Neutrum Genitiv → des",
        },
        {
          id: 4,
          before: "Das ist die Meinung",
          after: "Schüler. (die Schüler — Plural Genitiv)",
          answer: "der",
          hint: "Plural Genitiv → der",
        },
        {
          id: 5,
          before: "Aufgrund",
          after: "Streiks fahren keine Züge. (der Streik — Maskulin Genitiv)",
          answer: "des",
          hint: "Maskulin Genitiv → des Streiks",
        },
      ],
    },
  },
];
