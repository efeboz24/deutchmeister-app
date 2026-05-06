/**
 * TELC C1 Grammar Topics — 13 topics, 13–15 exercises each.
 */

import type { B1GrammarTopic } from "./grammar-b1";
export type { B1GrammarTopic as C1GrammarTopic };

export const C1_GRAMMAR_TOPICS: B1GrammarTopic[] = [
  // ─── 1. Konjunktiv I — Vollständiges System ──────────────────────────────
  {
    id: "konjunktiv-i-system",
    title: "Konjunktiv I — Tam Sistem",
    subtitle: "Haber Dili ve Dolaylı Anlatım",
    explanation:
      "Konjunktiv I başkasının sözlerini dolaylı olarak aktarmak için kullanılır (indirekte Rede). Fiil kökü + e eklenerek oluşturulur: gehen → gehe, kommen → komme, sein → sei. Konjunktiv I Präsens ile aynı görünüyorsa yerine Konjunktiv II kullanılır. Gazete ve resmi haberlerde yaygındır.",
    rules: [
      {
        heading: "Konjunktiv I Präsens",
        body: "Fiil kökü + e. Tüm şahıslar için bu kural geçerlidir. Konjunktiv I Präsens ile çakışıyorsa Konjunktiv II kullanılır.",
        examples: [
          { de: "Er sagt, er sei müde.", tr: "Yorgun olduğunu söylüyor." },
          { de: "Sie behauptet, sie habe keine Zeit.", tr: "Zamanı olmadığını iddia ediyor." },
          { de: "Der Sprecher erklärte, das Problem werde gelöst.", tr: "Sözcü sorunun çözüleceğini açıkladı." },
        ],
      },
      {
        heading: "Konjunktiv I Perfekt & Passiv",
        body: "Perfekt: haben/sein Konjunktiv I + Partizip II. Passiv: werde + Partizip II.",
        examples: [
          { de: "Er berichtet, er habe den Vertrag unterschrieben.", tr: "Sözleşmeyi imzaladığını bildiriyor." },
          { de: "Die Zeitung berichtet, das Gebäude werde renoviert.", tr: "Gazete binanın yenileneceğini bildiriyor." },
        ],
      },
    ],
    exercises: {
      multipleChoice: [
        {
          id: 1,
          question: "Der Politiker sagt, er _____ unschuldig.",
          options: ["ist", "sei", "wäre", "wurde"],
          correct: 1,
          explanation: "Konjunktiv I dolaylı anlatımda: sein → sei.",
        },
        {
          id: 2,
          question: "Die Studie zeigt, die Zahlen _____ gestiegen.",
          options: ["haben", "hätten", "seien", "wurden"],
          correct: 2,
          explanation: "'sein' ile tamamlanan Konjunktiv I: seien gestiegen.",
        },
        {
          id: 3,
          question: "Der Minister erklärte, das Problem _____ gelöst.",
          options: ["wird", "werde", "würde", "worden"],
          correct: 1,
          explanation: "Gelecek dolaylı anlatım: werden Konjunktiv I → werde.",
        },
        {
          id: 4,
          question: "Hangi cümle doğru Konjunktiv I kullanımını gösteriyor?",
          options: [
            "Er sagte, er ist krank.",
            "Er sagte, er sei krank.",
            "Er sagte, er wäre krank.",
            "Er sagte, er war krank.",
          ],
          correct: 1,
          explanation: "Dolaylı anlatımda Konjunktiv I: sei.",
        },
        {
          id: 5,
          question: "Die Reporterin berichtet, das Ereignis _____ gestern stattgefunden.",
          options: ["hat", "hatte", "habe", "hätte"],
          correct: 2,
          explanation: "Dolaylı anlatım Perfekt: haben Konjunktiv I → habe.",
        },
        {
          id: 6,
          question: "'laut' kelimesi cümlede ne anlama gelir?",
          options: ["yüksek sesle", "göre / uyarınca", "sonunda", "ancak"],
          correct: 1,
          explanation: "'laut + Genitiv/Dativ' = göre, uyarınca — haber dilinde Konjunktiv I ile kullanılır.",
        },
        {
          id: 7,
          question: "Der Zeuge behauptet, er _____ nichts gesehen.",
          options: ["hat", "hatte", "habe", "hätte"],
          correct: 2,
          explanation: "Dolaylı anlatım Perfekt: haben Konjunktiv I → habe.",
        },
        {
          id: 8,
          question: "Konjunktiv I ne zaman Konjunktiv II ile değiştirilir?",
          options: [
            "Her zaman serbestçe",
            "Konjunktiv I Präsens ile aynı görünüyorsa",
            "Fiil düzensizyse",
            "Özne 'ich' ise",
          ],
          correct: 1,
          explanation: "Konjunktiv I Präsens ile karışıyorsa yerine Konjunktiv II kullanılır.",
        },
      ],
      fillInBlank: [
        {
          id: 1,
          before: "Er sagt, er",
          after: "(kommen) morgen.",
          answer: "komme",
          hint: "kommen Konjunktiv I Präsens",
        },
        {
          id: 2,
          before: "Die Ärztin erklärte, die Behandlung",
          after: "(sein) wirksam.",
          answer: "sei",
          hint: "sein Konjunktiv I",
        },
        {
          id: 3,
          before: "Sie berichtete, sie",
          after: "(haben) die E-Mail nicht erhalten.",
          answer: "habe",
          hint: "haben Konjunktiv I",
        },
        {
          id: 4,
          before: "Laut dem Bericht",
          after: "(sein) die Kosten gestiegen.",
          answer: "seien",
          hint: "sein Konjunktiv I Plural",
        },
        {
          id: 5,
          before: "Der Sprecher erklärte, das Gebäude",
          after: "renoviert (werden — Passiv Konjunktiv I).",
          answer: "werde",
          hint: "werden Konjunktiv I → werde",
        },
      ],
    },
  },

  // ─── 2. Subjektive Modalverben ───────────────────────────────────────────
  {
    id: "subjektive-modalverben",
    title: "Subjektive Modalverben",
    subtitle: "Tahmin ve Olasılık İfadesi",
    explanation:
      "Modal fiiller öznel (epistemisch) anlamda konuşanın tahminini veya duyumunu aktarır. 'müssen' = kesin tahmin, 'können' = olasılık, 'sollen' = duyuma dayalı bilgi, 'dürfen' = muhtemel. Geçmişte: Modal + Partizip II + haben/sein.",
    rules: [
      {
        heading: "Präsens — Öznel Modal",
        body: "Modal + Infinitiv Aktiv: kesin tahmin, olasılık veya duyuma göre bilgi.",
        examples: [
          { de: "Er muss krank sein.", tr: "O hasta olmalı. (kesin tahmin)" },
          { de: "Sie könnte recht haben.", tr: "Haklı olabilir. (olasılık)" },
          { de: "Das soll sehr teuer sein.", tr: "Bu çok pahalıymış. (duyuma göre)" },
          { de: "Er dürfte schon 50 sein.", tr: "50 yaşında olması gerekiyor. (tahmini)" },
        ],
      },
      {
        heading: "Vergangenheit — Öznel Modal",
        body: "Modal + Partizip II + haben/sein: geçmişe ait tahmin veya duyum.",
        examples: [
          { de: "Er muss die Prüfung bestanden haben.", tr: "Sınavı geçmiş olmalı." },
          { de: "Sie könnte das Buch gelesen haben.", tr: "Kitabı okumuş olabilir." },
          { de: "Er soll das gesagt haben.", tr: "Bunu söylemiş olduğu söyleniyor." },
        ],
      },
    ],
    exercises: {
      multipleChoice: [
        {
          id: 1,
          question: "'Er muss krank sein.' cümlesi ne anlama geliyor?",
          options: ["Hasta olmak zorunda.", "Muhtemelen hasta.", "Hasta olabilir.", "Hasta değil."],
          correct: 1,
          explanation: "Öznel 'müssen' = güçlü tahmin: muhtemelen/olmalı.",
        },
        {
          id: 2,
          question: "Duyuma dayalı bilgiyi hangi modal verir?",
          options: ["müssen", "können", "sollen", "wollen"],
          correct: 2,
          explanation: "'sollen' = başkasının söylediğine göre, duyuma dayalı bilgi.",
        },
        {
          id: 3,
          question: "Sie _____ das Paket schon bekommen haben. (zayıf olasılık)",
          options: ["muss", "soll", "könnte", "darf"],
          correct: 2,
          explanation: "'könnte' = zayıf olasılık (olabilir ki).",
        },
        {
          id: 4,
          question: "Geçmişte 'kesin tahmin' için hangi yapı kullanılır?",
          options: [
            "müssen + Infinitiv",
            "müssen + Partizip II + haben/sein",
            "sollen + Infinitiv",
            "können + Partizip II",
          ],
          correct: 1,
          explanation: "Geçmiş öznel modal: müssen + Partizip II + haben/sein.",
        },
        {
          id: 5,
          question: "'Das dürfte schwierig sein.' anlamı:",
          options: ["Bu zor olmasına izin var.", "Bu muhtemelen zordur.", "Bu kesinlikle zordur.", "Bu zor olmamalı."],
          correct: 1,
          explanation: "'dürfen' öznel anlamda = muhtemel, olası.",
        },
        {
          id: 6,
          question: "Er _____ die Nachricht schon gehört haben. (duyuma göre)",
          options: ["muss", "soll", "darf", "will"],
          correct: 1,
          explanation: "'sollen' = duyuma göre, başkasının aktarımına göre.",
        },
        {
          id: 7,
          question: "Nesnel 'müssen' ile öznel 'müssen' farkı:",
          options: [
            "Hiçbir fark yok",
            "Nesnel = zorunluluk, Öznel = tahmin",
            "Öznel = zorunluluk, Nesnel = tahmin",
            "İkisi de tahmin ifade eder",
          ],
          correct: 1,
          explanation: "Nesnel müssen = yapmak zorunda; Öznel müssen = olmalı, büyük olasılıkla.",
        },
        {
          id: 8,
          question: "Sie _____ schon abgereist sein. (mantıksal zorunluluk, geçmiş)",
          options: ["soll", "kann", "muss", "darf"],
          correct: 2,
          explanation: "Geçmişte kesin tahmin: müssen + Partizip II + sein.",
        },
      ],
      fillInBlank: [
        {
          id: 1,
          before: "Er",
          after: "schon zu Hause angekommen sein. (kesin tahmin)",
          answer: "muss",
          hint: "müssen — kesin tahmin",
        },
        {
          id: 2,
          before: "Das",
          after: "sehr teuer sein. (duyuma göre)",
          answer: "soll",
          hint: "sollen — duyuma göre bilgi",
        },
        {
          id: 3,
          before: "Sie",
          after: "das Buch gelesen haben. (zayıf olasılık)",
          answer: "könnte",
          hint: "können Konjunktiv II — olasılık",
        },
        {
          id: 4,
          before: "Er",
          after: "recht haben. (tahmin, şimdiki)",
          answer: "dürfte",
          hint: "dürfen Konjunktiv II — muhtemel",
        },
        {
          id: 5,
          before: "Das Ergebnis",
          after: "schon bekannt sein. (kesin tahmin, şimdiki)",
          answer: "muss",
          hint: "müssen + Infinitiv",
        },
      ],
    },
  },

  // ─── 3. Modalpartizip ────────────────────────────────────────────────────
  {
    id: "modalpartizip",
    title: "Modalpartizip",
    subtitle: "zu + Partizip I — Pasif + Modal Anlamı",
    explanation:
      "Modalpartizip 'zu + Partizip I' yapısıyla oluşturulur ve pasif + modal (gereklilik/zorunluluk) anlamı taşır. Türkçede '-mesi/-ması gereken' ile karşılanır. Akademik ve teknik metinlerde sıkça kullanılır: 'die zu lösende Aufgabe' = çözülmesi gereken görev. Ayrılabilen fiillerde 'zu' ortaya girer: einzuladend.",
    rules: [
      {
        heading: "Yapı ve Oluşturma",
        body: "Basit fiil: zu + Partizip I sıfat olarak kullanılır. Ayrılabilen fiillerde: ein|zu|ladende → einzuladende.",
        examples: [
          { de: "die zu lösende Aufgabe", tr: "çözülmesi gereken görev" },
          { de: "das zu diskutierende Thema", tr: "tartışılması gereken konu" },
          { de: "die einzuhaltenden Regeln", tr: "uyulması gereken kurallar (trennbar)" },
        ],
      },
      {
        heading: "Cümlede Kullanım",
        body: "Modalpartizip bir sıfat olarak isme göre çekilir (Adjektivdeklination).",
        examples: [
          { de: "Der zu prüfende Kandidat wartet draußen.", tr: "Sınavdan geçmesi gereken aday dışarıda bekliyor." },
          { de: "Die zu bezahlende Rechnung liegt auf dem Tisch.", tr: "Ödenmesi gereken fatura masanın üzerinde." },
        ],
      },
    ],
    exercises: {
      multipleChoice: [
        {
          id: 1,
          question: "'die zu lösende Aufgabe' ne anlama gelir?",
          options: ["Çözülen görev", "Çözülmüş görev", "Çözülmesi gereken görev", "Çözülemeyen görev"],
          correct: 2,
          explanation: "Modalpartizip = pasif + gereklilik: -mesi gereken.",
        },
        {
          id: 2,
          question: "Modalpartizip hangi yapıyla oluşturulur?",
          options: ["zu + Partizip II", "zu + Partizip I", "zu + Infinitiv", "zu + Präsens"],
          correct: 1,
          explanation: "Modalpartizip = zu + Partizip I (sıfat olarak kullanılır).",
        },
        {
          id: 3,
          question: "'einladen' fiilinin Modalpartizip formu nedir?",
          options: ["zu einladende", "einzuladende", "einladende zu", "einzugeladen"],
          correct: 1,
          explanation: "Ayrılabilen fiillerde 'zu' ortaya girer: ein-zu-ladend.",
        },
        {
          id: 4,
          question: "Modalpartizip hangi iki anlam katmanını birleştirir?",
          options: ["Aktif + geçmiş", "Pasif + gereklilik", "Aktif + gelecek", "Pasif + olasılık"],
          correct: 1,
          explanation: "Modalpartizip = pasif (yapılacak olan) + modal (gereklilik/zorunluluk).",
        },
        {
          id: 5,
          question: "'beachten' fiilinden Modalpartizip (fem. sg. nom.) yapın:",
          options: ["beachtendzu", "zu beachtend", "zu beachtende", "beachtenzude"],
          correct: 2,
          explanation: "Basit fiil: zu + beachtend + Nominativ Feminin -e.",
        },
        {
          id: 6,
          question: "'der zu prüfende Kandidat' cümlesinde ne var?",
          options: [
            "Zustandspassiv",
            "Modalpartizip + sıfat çekimi",
            "Partizip II sıfat kullanımı",
            "Relativsatz",
          ],
          correct: 1,
          explanation: "Modalpartizip 'zu prüfend' + der-Artikel sıfat çekimi (nominativ maskulin: -e).",
        },
        {
          id: 7,
          question: "Modalpartizip hangi bağlamda sıklıkla kullanılır?",
          options: ["Günlük konuşma", "Akademik/teknik metin", "Şiir", "Diyalog"],
          correct: 1,
          explanation: "Modalpartizip formal/akademik ve teknik metinlerde çok sık görülür.",
        },
        {
          id: 8,
          question: "'durchführen' fiilinin Modalpartizip formu (fem. sg. nom.) nedir?",
          options: [
            "die zu durchführende",
            "die durchzuführende",
            "die zu durchgeführte",
            "die durchführende zu",
          ],
          correct: 1,
          explanation: "Ayrılabilen fiil: durch-zu-führend → 'die durchzuführende'.",
        },
      ],
      fillInBlank: [
        {
          id: 1,
          before: "Die",
          after: "(lösen) Probleme wurden diskutiert.",
          answer: "zu lösenden",
          hint: "zu + Partizip I + Dativ Plural Adjektivendung",
        },
        {
          id: 2,
          before: "Der",
          after: "(unterschreiben) Vertrag liegt auf dem Schreibtisch.",
          answer: "zu unterschreibende",
          hint: "zu + Partizip I + Nominativ Maskulin -e",
        },
        {
          id: 3,
          before: "Die",
          after: "(einhalten) Fristen sind bekannt.",
          answer: "einzuhaltenden",
          hint: "Trennbares Verb: ein|zu|haltend + Plural -en",
        },
        {
          id: 4,
          before: "Das ist das",
          after: "(beachten) Detail in diesem Prozess.",
          answer: "zu beachtende",
          hint: "zu + beachtend + Nominativ Neutrum -e",
        },
        {
          id: 5,
          before: "Alle",
          after: "(abgeben) Dokumente müssen bis Freitag vorliegen.",
          answer: "abzugebenden",
          hint: "Trennbares Verb: ab|zu|gebend + Plural -en",
        },
      ],
    },
  },

  // ─── 4. Nominalisierung & Verbalisierung ─────────────────────────────────
  {
    id: "nominalisierung-verbalisierung",
    title: "Nominalisierung & Verbalisierung",
    subtitle: "Üslup Dönüşümü: Fiil ↔ İsim",
    explanation:
      "Akademik ve resmi metinlerde nominal üslup tercih edilir: fiil cümleleri isim yapılarına dönüştürülür. weil/da → aufgrund/wegen, nachdem → nach + Nomen, indem → durch + Nomen. TELC C1 sınavında bu dönüşüm önemli bir beceridir.",
    rules: [
      {
        heading: "Fiil Cümlesi → İsim Yapısı (Nominalisierung)",
        body: "weil → aufgrund/wegen, nachdem → nach, damit → zur + Nomen, obwohl → trotz, während → während + Genitiv.",
        examples: [
          { de: "weil er arbeitete → aufgrund seiner Arbeit", tr: "çalıştığı için → çalışması nedeniyle" },
          { de: "Nachdem er ankam → Nach seiner Ankunft", tr: "Geldikten sonra → Gelişinin ardından" },
          { de: "indem man übt → durch Übung", tr: "pratik yaparak → pratik yoluyla" },
        ],
      },
      {
        heading: "İsim Yapısı → Fiil Cümlesi (Verbalisierung)",
        body: "Edatlı isim yapıları fiil cümlelerine dönüştürülür.",
        examples: [
          { de: "trotz seiner Müdigkeit → obwohl er müde war", tr: "yorgunluğuna rağmen → yorgun olmasına rağmen" },
          { de: "aufgrund des Regens → weil es regnete", tr: "yağmur nedeniyle → yağmur yağdığı için" },
        ],
      },
    ],
    exercises: {
      multipleChoice: [
        {
          id: 1,
          question: "'weil er krank war' cümlesini nominal üsluba çevirin:",
          options: [
            "aufgrund seiner Krankheit",
            "wegen er krank",
            "durch Krankeit",
            "infolge krank war",
          ],
          correct: 0,
          explanation: "weil + Satz → aufgrund + Genitiv: aufgrund seiner Krankheit.",
        },
        {
          id: 2,
          question: "'nachdem er gegangen war' nominal formu nedir?",
          options: ["nach sein Gehen", "nach seinem Abgang", "nach er ging", "in seinem Gehen"],
          correct: 1,
          explanation: "nachdem → nach + Dativ Nomen: nach seinem Abgang/Weggehen.",
        },
        {
          id: 3,
          question: "'aufgrund der schlechten Wetterlage' verbal karşılığı:",
          options: [
            "wegen das Wetter schlecht ist",
            "weil das Wetter schlecht war",
            "durch das Wetter",
            "indem das Wetter schlecht ist",
          ],
          correct: 1,
          explanation: "aufgrund + Genitiv → weil + Nebensatz.",
        },
        {
          id: 4,
          question: "'indem man viel liest' nominal formu nedir?",
          options: ["durch viel Lesen", "mit Lesen", "wegen Lesen", "zu Lesen"],
          correct: 0,
          explanation: "indem → durch + Nomen/Gerundium: durch viel Lesen.",
        },
        {
          id: 5,
          question: "Hangi ifade resmi bir raporda daha uygundur?",
          options: [
            "Weil die Kosten gestiegen sind, muss man...",
            "Aufgrund des Kostenanstiegs muss...",
            "Da die Kosten gestiegen sind, müssen wir...",
            "Die Kosten sind gestiegen, deshalb...",
          ],
          correct: 1,
          explanation: "Nominal üslup (Nomen statt Satz) resmi/akademik metinde tercih edilir.",
        },
        {
          id: 6,
          question: "'trotz seiner Müdigkeit' verbal karşılığı:",
          options: [
            "weil er müde war",
            "obwohl er müde war",
            "wenn er müde ist",
            "da er müde war",
          ],
          correct: 1,
          explanation: "trotz → obwohl: obwohl er müde war.",
        },
        {
          id: 7,
          question: "'während des Meetings' verbal karşılığı:",
          options: ["als das Meeting war", "während das Meeting stattfand", "nachdem das Meeting war", "vor dem Meeting"],
          correct: 1,
          explanation: "während + Genitiv → während + Nebensatz.",
        },
        {
          id: 8,
          question: "Nominalisierung neden akademik metinde tercih edilir?",
          options: [
            "Daha kısa olduğu için",
            "Daha soyut ve yoğun bilgi aktardığı için",
            "Daha anlaşılır olduğu için",
            "Gramer olarak daha kolay olduğu için",
          ],
          correct: 1,
          explanation: "Nominal üslup daha fazla bilgiyi daha az kelimeyle, soyut biçimde aktarır.",
        },
      ],
      fillInBlank: [
        {
          id: 1,
          before: "weil er fleißig war →",
          after: "seines Fleißes",
          answer: "aufgrund",
          hint: "weil → aufgrund + Genitiv",
        },
        {
          id: 2,
          before: "Nachdem der Vertrag unterzeichnet wurde →",
          after: "der Vertragsunterzeichnung",
          answer: "Nach",
          hint: "nachdem → nach + Dativ",
        },
        {
          id: 3,
          before: "indem man kommuniziert →",
          after: "Kommunikation",
          answer: "durch",
          hint: "indem → durch + Nomen",
        },
        {
          id: 4,
          before: "obwohl sie müde war →",
          after: "ihrer Müdigkeit",
          answer: "trotz",
          hint: "obwohl → trotz + Genitiv",
        },
        {
          id: 5,
          before: "weil es geregnet hat →",
          after: "des Regens",
          answer: "wegen / aufgrund",
          hint: "weil → wegen/aufgrund + Genitiv",
        },
      ],
    },
  },

  // ─── 5. Weiterführende Relativsätze ─────────────────────────────────────
  {
    id: "weiterfuehrende-relativsaetze",
    title: "Weiterführende Relativsätze",
    subtitle: "was, wo, worüber ile İlgi Cümleleri",
    explanation:
      "Weiterführende Relativsätze önceki cümlenin tamamını veya bir bölümünü açıklar. 'was' bir cümleyi veya alles/nichts/etwas gibi belirsiz zamirleri niteler. 'wo, woran, worüber...' (wo-Komposita) edatlı ilgi cümleleri kurar. C1 düzeyinde akıcılık ve bağlam zenginliği sağlar.",
    rules: [
      {
        heading: "'was' ile Weiterführende Relativsatz",
        body: "'was' önceki tam cümleyi veya alles/nichts/etwas gibi isimleri niteler.",
        examples: [
          { de: "Er hat die Prüfung bestanden, was uns sehr gefreut hat.", tr: "Sınavı geçti, bu bizi çok sevindirdi." },
          { de: "Alles, was er sagte, stimmte.", tr: "Söylediği her şey doğruydu." },
        ],
      },
      {
        heading: "Wo-Komposita ile Relativsatz",
        body: "wo + Präposition kombinasyonları: woran, worauf, worüber, womit, wofür...",
        examples: [
          { de: "Das Projekt, woran er arbeitet, ist wichtig.", tr: "Üzerinde çalıştığı proje önemli." },
          { de: "Das ist etwas, worüber wir nachdenken müssen.", tr: "Bu, düşünmemiz gereken bir şey." },
        ],
      },
    ],
    exercises: {
      multipleChoice: [
        {
          id: 1,
          question: "Cümleyi tamamlayın: 'Er wurde befördert, _____ ihn sehr freute.'",
          options: ["der", "was", "das", "welcher"],
          correct: 1,
          explanation: "'was' önceki tam cümleyi niteler.",
        },
        {
          id: 2,
          question: "'Alles, _____ er versprochen hat, hielt er ein.'",
          options: ["das", "was", "der", "welches"],
          correct: 1,
          explanation: "alles/nichts/etwas gibi belirsiz zamirlerin ardından 'was' kullanılır.",
        },
        {
          id: 3,
          question: "'Das Thema, _____ wir gesprochen haben, ist wichtig.'",
          options: ["worüber", "wofür", "womit", "woran"],
          correct: 0,
          explanation: "sprechen über → worüber (wo + über).",
        },
        {
          id: 4,
          question: "'Das ist nichts, _____ ich mich freue.'",
          options: ["worüber", "woran", "womit", "worauf"],
          correct: 0,
          explanation: "sich freuen über → worüber.",
        },
        {
          id: 5,
          question: "'Die Idee, _____ er begeistert ist, klingt gut.'",
          options: ["worin", "wofür", "wovon", "worüber"],
          correct: 1,
          explanation: "begeistert sein für → wofür.",
        },
        {
          id: 6,
          question: "'Etwas, _____ wir noch klären müssen...' — doğru Relativpronomen:",
          options: ["das", "was", "der", "welches"],
          correct: 1,
          explanation: "etwas ile 'was' kullanılır.",
        },
        {
          id: 7,
          question: "'Er bestand die Prüfung, _____ niemand geglaubt hatte.'",
          options: ["das", "was", "welches", "dem"],
          correct: 1,
          explanation: "'was' önceki cümlenin tamamını niteler.",
        },
        {
          id: 8,
          question: "'Das Problem, _____ alle beschäftigt, ist gelöst.' — doğru seçenek:",
          options: ["was", "wofür", "womit", "das"],
          correct: 3,
          explanation: "Belirli bir isme atıf: 'Problem' nötr → 'das'.",
        },
      ],
      fillInBlank: [
        {
          id: 1,
          before: "Er hat gekündigt,",
          after: "alle überrascht hat.",
          answer: "was",
          hint: "Önceki cümlenin tamamını niteler",
        },
        {
          id: 2,
          before: "Das ist etwas,",
          after: "wir stolz sein können.",
          answer: "worauf",
          hint: "stolz sein auf → wo + auf",
        },
        {
          id: 3,
          before: "Alles,",
          after: "er gelernt hat, hat er vergessen.",
          answer: "was",
          hint: "alles + was",
        },
        {
          id: 4,
          before: "Das Projekt,",
          after: "wir arbeiten, endet nächsten Monat.",
          answer: "woran",
          hint: "arbeiten an → wo + an",
        },
        {
          id: 5,
          before: "Nichts,",
          after: "er tat, war richtig.",
          answer: "was",
          hint: "nichts + was",
        },
      ],
    },
  },

  // ─── 6. Fortgeschrittene Konnektoren ─────────────────────────────────────
  {
    id: "fortgeschrittene-konnektoren",
    title: "Fortgeschrittene Konnektoren",
    subtitle: "C1 Düzeyi Bağlaçlar ve Bağlantı İfadeleri",
    explanation:
      "C1 düzeyinde bağlaç zenginliği akıcılığın en önemli göstergesidir. Karşıtlık: 'jedoch/indessen/wohingegen', 'stattdessen'. Sonuç: 'folglich/infolgedessen'. Koşul/kısıtlama: 'sofern/falls', 'es sei denn', 'geschweige denn'. Bu bağlaçlar 'aber', 'deshalb', 'wenn' gibi basit bağlaçların formal alternatifleridir.",
    rules: [
      {
        heading: "Karşıtlık Bağlaçları",
        body: "jedoch, wohingegen, indessen, stattdessen — karşıtlık ve zıtlık ifade eder.",
        examples: [
          { de: "Der Plan war gut; jedoch fehlte das Budget.", tr: "Plan iyiydi; ancak bütçe yoktu." },
          { de: "Er arbeitete hart, wohingegen seine Kollegen pünktlich gingen.", tr: "O çok çalıştı, oysa meslektaşları zamanında ayrıldı." },
          { de: "Wir wollten reisen; stattdessen blieben wir zu Hause.", tr: "Seyahat etmek istedik; bunun yerine evde kaldık." },
        ],
      },
      {
        heading: "Koşul ve Kısıtlama Bağlaçları",
        body: "sofern, falls, es sei denn, außer wenn, geschweige denn.",
        examples: [
          { de: "Sofern keine Einwände bestehen, beginnen wir morgen.", tr: "İtiraz yoksa yarın başlıyoruz." },
          { de: "Er hilft, es sei denn, er ist krank.", tr: "Yardım eder, hasta olmadıkça." },
          { de: "Er liest kaum Bücher, geschweige denn Zeitungen.", tr: "Kitap bile zor okuyor, gazete bir yana." },
        ],
      },
    ],
    exercises: {
      multipleChoice: [
        {
          id: 1,
          question: "'Er hatte Fieber; _____ arbeitete er weiter.'",
          options: ["stattdessen", "jedoch", "folglich", "sofern"],
          correct: 1,
          explanation: "'jedoch' = ancak/ne var ki — karşıtlık.",
        },
        {
          id: 2,
          question: "'... olmadıkça' anlamına gelen bağlaç:",
          options: ["wohingegen", "es sei denn", "folglich", "stattdessen"],
          correct: 1,
          explanation: "'es sei denn' = olmadıkça, hariç tutulursa.",
        },
        {
          id: 3,
          question: "'Die Umsätze stiegen, _____ sanken die Gewinne.'",
          options: ["folglich", "wohingegen", "stattdessen", "sofern"],
          correct: 1,
          explanation: "'wohingegen' = oysa — karşıt durumları bağlar.",
        },
        {
          id: 4,
          question: "'dolayısıyla, bu yüzden' anlamında formal bağlaç:",
          options: ["indessen", "folglich", "stattdessen", "sofern"],
          correct: 1,
          explanation: "'folglich' = dolayısıyla, sonuç olarak.",
        },
        {
          id: 5,
          question: "'Sofern Sie zustimmen, können wir beginnen.' anlamı:",
          options: [
            "Başlamak zorundayız.",
            "Onaylamanız şartıyla başlayabiliriz.",
            "Onaylasanız da başlamayız.",
            "Onaylamadan başlıyoruz.",
          ],
          correct: 1,
          explanation: "'sofern' = şartıyla, şayet.",
        },
        {
          id: 6,
          question: "'Er spricht kaum Deutsch, _____ Englisch.'",
          options: ["wohingegen", "folglich", "geschweige denn", "es sei denn"],
          correct: 2,
          explanation: "'geschweige denn' = bir yana, hiç değil.",
        },
        {
          id: 7,
          question: "'Er arbeitete, indessen ruhten sich die anderen aus.' — 'indessen' anlamı:",
          options: ["Bunun yerine", "Dolayısıyla", "Bu sırada / oysa", "Şartıyla"],
          correct: 2,
          explanation: "'indessen' = bu sırada (temporal) veya oysa (karşıtlık).",
        },
        {
          id: 8,
          question: "Formal bir raporda 'deshalb' yerine kullanılabilecek bağlaç:",
          options: ["wohingegen", "stattdessen", "infolgedessen", "es sei denn"],
          correct: 2,
          explanation: "'infolgedessen' = bunun sonucunda — 'deshalb'ın daha formal karşılığı.",
        },
      ],
      fillInBlank: [
        {
          id: 1,
          before: "Die Kosten sind gestiegen;",
          after: "müssen wir sparen.",
          answer: "folglich",
          hint: "dolayısıyla = folglich",
        },
        {
          id: 2,
          before: "Er hilft gerne,",
          after: "er zu viel zu tun hat.",
          answer: "es sei denn",
          hint: "... olmadıkça = es sei denn",
        },
        {
          id: 3,
          before: "Sie wollte feiern;",
          after: "musste sie arbeiten.",
          answer: "stattdessen",
          hint: "bunun yerine = stattdessen",
        },
        {
          id: 4,
          before: "Er liest kaum Nachrichten,",
          after: "Fachliteratur.",
          answer: "geschweige denn",
          hint: "bir yana, hiç değil = geschweige denn",
        },
        {
          id: 5,
          before: "Die Ergebnisse waren positiv;",
          after: "wurde das Projekt fortgesetzt.",
          answer: "infolgedessen / folglich",
          hint: "sonuç bağlacı formal",
        },
      ],
    },
  },

  // ─── 7. Passiv — Besonderheiten ──────────────────────────────────────────
  {
    id: "passiv-besonderheiten",
    title: "Passiv — Besonderheiten",
    subtitle: "Edilgen Yapının İncelikleri",
    explanation:
      "C1 düzeyinde pasifin tüm zamanları ve özel kullanımları bilinmelidir. Öznesiz pasif (unpersönliches Passiv): 'Es wird getanzt.' 'von' ile eylem yapanı, 'durch' ile aracı ifade ederiz. Pasif + Modal: müssen/sollen + Partizip II + werden. Zustandspassiv: ist + Partizip II.",
    rules: [
      {
        heading: "Unpersönliches Passiv & von/durch",
        body: "'es wird + Partizip II' öznesiz eylem. 'von' = eylem yapan (ajan); 'durch' = araç/sebep.",
        examples: [
          { de: "Es wird hier nicht geraucht.", tr: "Burada sigara içilmez." },
          { de: "Das Fenster wurde vom Wind geöffnet.", tr: "Pencere rüzgar tarafından açıldı." },
          { de: "Die Stadt wurde durch Bomben zerstört.", tr: "Şehir bombalar aracılığıyla tahrip edildi." },
        ],
      },
      {
        heading: "Passiv + Modal & Zustandspassiv",
        body: "Modal + Partizip II + werden (zorunluluk). Zustandspassiv: sein + Partizip II (sonuç durumu).",
        examples: [
          { de: "Der Brief muss heute abgeschickt werden.", tr: "Mektubun bugün gönderilmesi gerekiyor." },
          { de: "Das Dokument ist bereits unterzeichnet.", tr: "Belge zaten imzalanmış durumda." },
        ],
      },
    ],
    exercises: {
      multipleChoice: [
        {
          id: 1,
          question: "'Das Haus _____ vom Architekten entworfen.' — Doğru form:",
          options: ["ist", "wurde", "wird", "werden"],
          correct: 1,
          explanation: "Geçmiş Passiv (Präteritum): wurde + Partizip II.",
        },
        {
          id: 2,
          question: "'von' ve 'durch' farkını gösteren doğru cümle:",
          options: [
            "Das Buch wurde durch den Autor geschrieben.",
            "Das Buch wurde vom Autor geschrieben.",
            "Das Buch ist von den Autor geschrieben.",
            "Das Buch wird durch Autor geschrieben.",
          ],
          correct: 1,
          explanation: "'von' eylem yapanı (ajan) belirtir: 'vom Autor'.",
        },
        {
          id: 3,
          question: "'Es wird hier nicht geraucht.' — Bu cümle hangi özelliği gösteriyor?",
          options: ["Zustandspassiv", "Unpersönliches Passiv", "Passiv + Modal", "Vorgangspassiv Präsens"],
          correct: 1,
          explanation: "Öznesiz (unpersönliches) Passiv: eylem odaklı, özne yok.",
        },
        {
          id: 4,
          question: "'Das Dokument ist unterzeichnet.' — Bu hangi pasif formu?",
          options: ["Vorgangspassiv", "Unpersönliches Passiv", "Zustandspassiv", "Passiv + Modal"],
          correct: 2,
          explanation: "Zustandspassiv (durum): ist + Partizip II.",
        },
        {
          id: 5,
          question: "Passiv + Modal Futur yapısı için doğru form:",
          options: [
            "Das muss morgen fertig ist.",
            "Das muss morgen fertig werden.",
            "Das muss morgen fertig sein.",
            "Das muss morgen fertig werden sein.",
          ],
          correct: 1,
          explanation: "Passiv + Modal: modal + Partizip II + werden.",
        },
        {
          id: 6,
          question: "'Die Brücke wurde durch das Hochwasser beschädigt.' — 'durch' burada ne ifade eder?",
          options: ["Eylem yapanı (ajan)", "Sebebi / aracı", "Zamanı", "Yeri"],
          correct: 1,
          explanation: "'durch' = araç veya sebep.",
        },
        {
          id: 7,
          question: "Vorgangspassiv ile Zustandspassiv arasındaki fark:",
          options: [
            "Hiçbir fark yok",
            "Vorgangspassiv eylemi, Zustandspassiv sonuç durumunu gösterir",
            "Zustandspassiv eylemi, Vorgangspassiv durumu gösterir",
            "İkisi de yalnızca geçmişte kullanılır",
          ],
          correct: 1,
          explanation: "werden + Partizip II = eylem; sein + Partizip II = sonuç durumu.",
        },
        {
          id: 8,
          question: "'Das soll bis Montag erledigt werden.' — Bu cümlede ne var?",
          options: ["Unpersönliches Passiv", "Zustandspassiv", "Passiv mit Modalverb", "Vorgangspassiv Perfekt"],
          correct: 2,
          explanation: "sollen + Partizip II + werden = Passiv mit Modalverb.",
        },
      ],
      fillInBlank: [
        {
          id: 1,
          before: "Das Formular",
          after: "bis Ende der Woche ausgefüllt werden. (müssen)",
          answer: "muss",
          hint: "müssen + Partizip II + werden",
        },
        {
          id: 2,
          before: "Hier",
          after: "täglich Deutsch gesprochen. (unpersönliches Passiv)",
          answer: "wird",
          hint: "Unpersönliches Passiv: wird + Partizip II",
        },
        {
          id: 3,
          before: "Der Bericht",
          after: "bereits geschrieben. (Zustandspassiv)",
          answer: "ist",
          hint: "Zustandspassiv: ist + Partizip II",
        },
        {
          id: 4,
          before: "Das Gebäude wurde",
          after: "ein Erdbeben zerstört. (durch oder von?)",
          answer: "durch",
          hint: "'durch' = araç/sebep (doğal olay)",
        },
        {
          id: 5,
          before: "Die Maßnahmen",
          after: "sofort eingeleitet werden. (sollen)",
          answer: "sollen",
          hint: "sollen + Partizip II + werden",
        },
      ],
    },
  },

  // ─── 8. Infinitivsätze: Präsens & Perfekt ────────────────────────────────
  {
    id: "infinitivsaetze",
    title: "Infinitivsätze: Präsens & Perfekt",
    subtitle: "Infinitiv I ve Infinitiv II Yapıları",
    explanation:
      "Infinitivsätze 'zu + Infinitiv' yapısıyla kurulur. Infinitiv I (Präsens): eş zamanlı veya gelecek eylem. Infinitiv II (Perfekt): Partizip II + haben/sein + zu — tamamlanmış eylem. Özne aynı olduğunda kullanılır. Bazı fiillerle zorunludur: versprechen, beabsichtigen, hoffen, versuchen.",
    rules: [
      {
        heading: "Infinitiv I mit zu",
        body: "Eş zamanlı veya gelecek eylem. Özne her iki cümlede aynı olmalıdır.",
        examples: [
          { de: "Er hofft, die Prüfung zu bestehen.", tr: "Sınavı geçmeyi umuyor." },
          { de: "Sie versucht, pünktlich zu sein.", tr: "Zamanında olmaya çalışıyor." },
        ],
      },
      {
        heading: "Infinitiv II mit zu (Perfekt Infinitiv)",
        body: "Tamamlanmış eylem: Partizip II + haben/sein + zu. Ana eylemden önce tamamlanmış bir eylemi gösterir.",
        examples: [
          { de: "Er freut sich, die Prüfung bestanden zu haben.", tr: "Sınavı geçmiş olmaktan memnun." },
          { de: "Sie bedauert, das nicht gesagt zu haben.", tr: "Bunu söylememiş olmaktan pişman." },
          { de: "Ich erinnere mich, dort gewesen zu sein.", tr: "Orada olduğumu hatırlıyorum." },
        ],
      },
    ],
    exercises: {
      multipleChoice: [
        {
          id: 1,
          question: "'Er freut sich, die Prüfung _____ zu haben.' — Doğru form:",
          options: ["bestehen", "bestanden", "besteht", "bestand"],
          correct: 1,
          explanation: "Infinitiv II: Partizip II + zu haben → 'bestanden zu haben'.",
        },
        {
          id: 2,
          question: "Infinitiv I ile Infinitiv II arasındaki temel fark:",
          options: [
            "Öznenin farklı olması",
            "Infinitiv II tamamlanmış eylemi gösterir",
            "Infinitiv II gelecek eylem içindir",
            "Hiçbir fark yok",
          ],
          correct: 1,
          explanation: "Infinitiv II (Perfekt Infinitiv) ana eylemden önce tamamlanmış bir eylemi gösterir.",
        },
        {
          id: 3,
          question: "'Sie bedauert, das _____ zu _____.' — Doğru form (sagen):",
          options: ["sagte / haben", "gesagt / haben", "sagen / haben", "sagend / haben"],
          correct: 1,
          explanation: "Infinitiv II: Partizip II + zu haben → 'gesagt zu haben'.",
        },
        {
          id: 4,
          question: "'Ich erinnere mich, dort _____ zu _____.' — Doğru (sein):",
          options: ["sein / haben", "gewesen / sein", "ist / sein", "war / haben"],
          correct: 1,
          explanation: "sein ile tamamlanan fiiller: Partizip II + zu sein → 'gewesen zu sein'.",
        },
        {
          id: 5,
          question: "Hangi cümle doğru Infinitiv II kullanımını gösteriyor?",
          options: [
            "Er ist froh, das zu machen.",
            "Er ist froh, das gemacht zu haben.",
            "Er ist froh, das machen haben.",
            "Er ist froh, dass er das macht.",
          ],
          correct: 1,
          explanation: "Infinitiv II: 'gemacht zu haben' — tamamlanmış eylem.",
        },
        {
          id: 6,
          question: "Hangi fiiller Infinitivsatz (zu + Infinitiv) kullanmayı zorunlu kılar?",
          options: [
            "weil, obwohl, wenn",
            "hoffen, versuchen, versprechen, beabsichtigen",
            "sagen, fragen, antworten",
            "können, müssen, dürfen",
          ],
          correct: 1,
          explanation: "hoffen, versuchen, versprechen, beabsichtigen gibi fiiller Infinitivsatz kullanır.",
        },
        {
          id: 7,
          question: "Infinitivsatz ne zaman kullanılamaz?",
          options: [
            "Her iki cümlenin öznesinin aynı olduğunda",
            "İki cümlenin öznesinin farklı olduğunda",
            "Fiil 'hoffen' olduğunda",
            "Cümlede 'es' olduğunda",
          ],
          correct: 1,
          explanation: "Özne farklıysa Infinitivsatz kullanılamaz — dass-Satz gerekir.",
        },
        {
          id: 8,
          question: "'Es ist schwierig, so viele Wörter _____ zu _____.' — Doğru (lernen + Infinitiv II):",
          options: ["lernen / haben", "gelernt / haben", "lernend / sein", "lernte / haben"],
          correct: 1,
          explanation: "Infinitiv II: 'gelernt zu haben'.",
        },
      ],
      fillInBlank: [
        {
          id: 1,
          before: "Sie ist froh, das Problem",
          after: "(lösen — Infinitiv II).",
          answer: "gelöst zu haben",
          hint: "Partizip II + zu haben",
        },
        {
          id: 2,
          before: "Er bedauert, die Gelegenheit",
          after: "(verpassen — Infinitiv II).",
          answer: "verpasst zu haben",
          hint: "Partizip II + zu haben",
        },
        {
          id: 3,
          before: "Ich erinnere mich, dort als Kind",
          after: "(spielen — Infinitiv II).",
          answer: "gespielt zu haben",
          hint: "Partizip II + zu haben",
        },
        {
          id: 4,
          before: "Sie versucht, täglich eine Stunde Deutsch",
          after: "(lernen — Infinitiv I).",
          answer: "zu lernen",
          hint: "zu + Infinitiv",
        },
        {
          id: 5,
          before: "Er ist stolz darauf, den Marathon",
          after: "(laufen — Infinitiv II).",
          answer: "gelaufen zu sein",
          hint: "sein-Verb: Partizip II + zu sein",
        },
      ],
    },
  },

  // ─── 9. Präpositionaladverbien ────────────────────────────────────────────
  {
    id: "praepositionaladverbien",
    title: "Präpositionaladverbien",
    subtitle: "da- ve wo-Bileşikleri",
    explanation:
      "da-Komposita (daran, darauf, darüber, damit, dafür...) fiil tamamlayıcılarını veya önceki cümleleri temsil eder. wo-Komposita (woran, worauf, wofür...) soru ve ilgi cümlelerinde kullanılır. Yalnızca nesneler (kişi olmayan) için kullanılır; kişiler için zamirler kullanılır (ihn, ihr, ihm...).",
    rules: [
      {
        heading: "da-Komposita",
        body: "'da + Präposition' önceki ismi veya cümleyi temsil eder. Ünlü ile başlayan edatlarda 'r' eklenir: da+auf = darauf.",
        examples: [
          { de: "Ich freue mich darauf. (auf das Treffen)", tr: "Bunu (toplantıyı) sabırsızlıkla bekliyorum." },
          { de: "Er ist damit einverstanden.", tr: "Buna katılıyor." },
          { de: "Wir denken daran, umzuziehen.", tr: "Taşınmayı düşünüyoruz." },
        ],
      },
      {
        heading: "wo-Komposita",
        body: "Soru ve ilgi cümlelerinde: 'wo + Präposition'. Ünlü ile başlayan edatlarda 'r': worauf, worüber.",
        examples: [
          { de: "Worüber sprichst du?", tr: "Ne hakkında konuşuyorsun?" },
          { de: "Wofür interessierst du dich?", tr: "Neyle ilgileniyorsun?" },
        ],
      },
    ],
    exercises: {
      multipleChoice: [
        {
          id: 1,
          question: "'Ich freue mich _____ deinen Besuch.' (sich freuen auf)",
          options: ["auf", "daran", "darauf", "worauf"],
          correct: 2,
          explanation: "da-Kompositum: auf + das → darauf (kişi olmayan nesne).",
        },
        {
          id: 2,
          question: "'_____ arbeitet er gerade?' (an + was)",
          options: ["Daran", "Woran", "An was", "Darauf"],
          correct: 1,
          explanation: "Soru: wo + an = woran.",
        },
        {
          id: 3,
          question: "'Er denkt _____, morgen abzureisen.' (denken an)",
          options: ["daran", "darauf", "woran", "damit"],
          correct: 0,
          explanation: "denken an → daran (Infinitivsatz önünde).",
        },
        {
          id: 4,
          question: "Hangi da-Kompositum yanlış yazılmıştır?",
          options: ["darüber", "dafür", "darunter", "daauf"],
          correct: 3,
          explanation: "'daauf' hatalı. Ünlü ile başlayan edatlarda: da + r + Präposition → darauf.",
        },
        {
          id: 5,
          question: "'Wofür interessierst du dich?' sorusuna uygun cevap:",
          options: [
            "Ich interessiere mich für Maria.",
            "Ich interessiere mich dafür für Musik.",
            "Ich interessiere mich für Musik.",
            "Ich interessiere mich wofür Musik.",
          ],
          correct: 2,
          explanation: "Kişi olmayan nesne: für Musik. Maria için 'für sie' kullanılır.",
        },
        {
          id: 6,
          question: "'Da-Komposita' ne zaman kullanılmaz?",
          options: [
            "Fiil edatlı tamamlayıcı aldığında",
            "Nesne bir kişiyse",
            "Nesne soyut bir kavramsa",
            "Cümle olumsuzsa",
          ],
          correct: 1,
          explanation: "Kişiler için zamirler (ihn, ihr, ihm...) kullanılır; da-Komposita yalnızca nesneler için.",
        },
        {
          id: 7,
          question: "'Wir sind _____ einverstanden, dass er kommt.'",
          options: ["worüber", "damit", "dafür", "darauf"],
          correct: 1,
          explanation: "einverstanden sein mit → damit (mit + das → damit).",
        },
        {
          id: 8,
          question: "'Ich erinnere mich _____ unsere Reise.' (sich erinnern an)",
          options: ["dafür", "damit", "daran", "darüber"],
          correct: 2,
          explanation: "sich erinnern an → daran: an + das → daran.",
        },
      ],
      fillInBlank: [
        {
          id: 1,
          before: "Er freut sich",
          after: ", dass er befördert wurde. (sich freuen über)",
          answer: "darüber",
          hint: "über + das → darüber",
        },
        {
          id: 2,
          before: "",
          after: "wartest du? (warten auf — Soru)",
          answer: "Worauf",
          hint: "Soru: wo + r + auf",
        },
        {
          id: 3,
          before: "Ich bin",
          after: "nicht einverstanden. (mit dieser Idee)",
          answer: "damit",
          hint: "mit + das → damit",
        },
        {
          id: 4,
          before: "Sie zweifelt",
          after: ", ob die Lösung richtig ist. (zweifeln an)",
          answer: "daran",
          hint: "an + das → daran",
        },
        {
          id: 5,
          before: "",
          after: "bist du stolz? (stolz sein auf — Soru)",
          answer: "Worauf",
          hint: "Soru: wo + r + auf",
        },
      ],
    },
  },

  // ─── 10. Irreale Konditionalsätze der Vergangenheit ──────────────────────
  {
    id: "irreale-konditionalsaetze-vergangenheit",
    title: "Irreale Konditionalsätze der Vergangenheit",
    subtitle: "Geçmişteki Gerçek Dışı Koşullar",
    explanation:
      "Geçmişte gerçekleşmemiş varsayımlar için 'hätte/wäre + Partizip II' kullanılır. Yapı: Wenn + Subjekt + Partizip II + hätte/wäre, Subjekt + hätte/wäre + Partizip II. Pişmanlık ve 'başka türlü olsaydı' senaryoları için kullanılır.",
    rules: [
      {
        heading: "Yapı",
        body: "Wenn-Satz: hätte/wäre + Partizip II. Hauptsatz: hätte/wäre + Partizip II. haben-Fiiller hätte, sein-Fiiller wäre alır.",
        examples: [
          { de: "Wenn ich mehr gelernt hätte, hätte ich die Prüfung bestanden.", tr: "Daha çok çalışsaydım, sınavı geçerdim." },
          { de: "Wenn er früher aufgestanden wäre, hätte er den Zug nicht verpasst.", tr: "Daha erken kalksaydı, treni kaçırmazdı." },
          { de: "Das wäre schön gewesen.", tr: "Bu güzel olurdu." },
        ],
      },
      {
        heading: "Wenn olmadan & Bedauern",
        body: "Pişmanlık ifadesi: hätte + Infinitiv + sollen/dürfen.",
        examples: [
          { de: "Ich hätte das nicht sagen sollen.", tr: "Bunu söylememeliydim." },
          { de: "Er wäre besser zu Hause geblieben.", tr: "Evde kalsaydı daha iyi olurdu." },
        ],
      },
    ],
    exercises: {
      multipleChoice: [
        {
          id: 1,
          question: "'Wenn ich Zeit _____, _____ ich dich besucht.'",
          options: [
            "gehabt hatte / hätte",
            "gehabt hätte / hätte",
            "hätte gehabt / wäre",
            "hatte / hätte",
          ],
          correct: 1,
          explanation: "Konjunktiv II Vergangenheit: hätte + Partizip II (wenn-Satz) + hätte + Partizip II.",
        },
        {
          id: 2,
          question: "'Wenn er pünktlich _____, hätte er alles mitbekommen.'",
          options: ["kam", "gekommen wäre", "gewesen ist", "hätte kommen"],
          correct: 1,
          explanation: "sein-Verb: Konjunktiv II Vergangenheit → wäre + Partizip II.",
        },
        {
          id: 3,
          question: "'Das _____ schön _____, wenn wir alle dabei gewesen wären.'",
          options: ["würde / sein", "wäre / gewesen", "hätte / sein", "ist / geworden"],
          correct: 1,
          explanation: "'Das wäre schön gewesen.' — sein: wäre + Partizip II.",
        },
        {
          id: 4,
          question: "Pişmanlık ifadesi için doğru form:",
          options: [
            "Ich hätte das nicht machen sollen.",
            "Ich würde das nicht machen.",
            "Ich habe das nicht gemacht.",
            "Ich sollte das nicht machen.",
          ],
          correct: 0,
          explanation: "Geçmişteki pişmanlık: hätte + Infinitiv + sollen.",
        },
        {
          id: 5,
          question: "'Wenn wir früher gebucht _____, wäre es günstiger _____ .'",
          options: ["hätten / gewesen", "wären / gebucht", "haben / sein", "hatten / geworden"],
          correct: 0,
          explanation: "buchen → haben: hätten gebucht. Koşulun sonucu: wäre günstiger gewesen.",
        },
        {
          id: 6,
          question: "Hangi cümle doğru 'Konjunktiv II der Vergangenheit' örneğidir?",
          options: [
            "Wenn er käme, wäre ich froh.",
            "Wenn er gekommen wäre, wäre ich froh gewesen.",
            "Wenn er kommt, bin ich froh.",
            "Wenn er kommen würde, wäre ich froh.",
          ],
          correct: 1,
          explanation: "Geçmiş gerçek dışı koşul: wäre + Partizip II (her iki bölümde).",
        },
        {
          id: 7,
          question: "'Sie hätte besser aufpassen _____.' — Boşluğu doldurun:",
          options: ["sollen", "sein", "werden", "haben"],
          correct: 0,
          explanation: "Geçmişteki tavsiye/pişmanlık: hätte + Infinitiv + sollen.",
        },
        {
          id: 8,
          question: "Konjunktiv II Vergangenheit ile Gegenwart farkı:",
          options: [
            "Fark yok",
            "Vergangenheit hätte/wäre + Partizip II; Gegenwart würde + Infinitiv veya KII",
            "Gegenwart hätte/wäre + Partizip II kullanır",
            "İkisi de Präteritum Konjunktiv kullanır",
          ],
          correct: 1,
          explanation: "Vergangenheit = hätte/wäre + Partizip II; Gegenwart = würde + Inf. veya KII Stamm.",
        },
      ],
      fillInBlank: [
        {
          id: 1,
          before: "Wenn ich das gewusst",
          after: ", hätte ich anders entschieden.",
          answer: "hätte",
          hint: "wissen: hätte + gewusst",
        },
        {
          id: 2,
          before: "Er hätte nicht so früh aufstehen",
          after: ".",
          answer: "müssen / sollen",
          hint: "Bedauern: hätte + Infinitiv + müssen/sollen",
        },
        {
          id: 3,
          before: "Wenn wir mehr Zeit gehabt",
          after: ", hätten wir alles besichtigt.",
          answer: "hätten",
          hint: "haben → hätten + gehabt (wenn-Satz)",
        },
        {
          id: 4,
          before: "Das",
          after: "schöner gewesen, wenn das Wetter besser gewesen wäre.",
          answer: "wäre",
          hint: "sein: wäre + gewesen",
        },
        {
          id: 5,
          before: "Sie",
          after: "lieber zu Hause geblieben. (bleiben — Präferenz in der Vergangenheit)",
          answer: "wäre",
          hint: "bleiben ist sein-Verb: wäre + geblieben",
        },
      ],
    },
  },

  // ─── 11. Graduierung und Einschränkung ───────────────────────────────────
  {
    id: "graduierung-einschraenkung",
    title: "Graduierung und Einschränkung",
    subtitle: "Derece ve Kısıtlama İfadeleri",
    explanation:
      "C1 düzeyinde görüş ve iddiaları nüanslı şekilde ifade edebilmek kritiktir. Kısıtlama: 'zumindest' (en azından), 'immerhin' (her halükarda olumlu yan), 'jedenfalls' (her durumda), 'wenigstens' (hiç olmazsa). Derece: 'keineswegs' (hiçbir şekilde), 'durchaus' (kesinlikle), 'ausgesprochen' (son derece), 'kaum' (pek az).",
    rules: [
      {
        heading: "Kısıtlama Adverbialleri",
        body: "'zumindest, immerhin, jedenfalls, wenigstens' — olumsuz bağlamda olumlu tarafı vurgular veya sınır koyar.",
        examples: [
          { de: "Zumindest hat er es versucht.", tr: "En azından denedi." },
          { de: "Das ist immerhin ein Anfang.", tr: "Her halükarda bu bir başlangıç." },
          { de: "Wenigstens ist niemand verletzt.", tr: "Hiç olmazsa kimse yaralanmadı." },
        ],
      },
      {
        heading: "Derece Adverbialleri",
        body: "'keineswegs, durchaus, ausgesprochen, kaum, beinahe' — kesinlik, yoğunluk veya azlık derecesini belirler.",
        examples: [
          { de: "Das ist keineswegs akzeptabel.", tr: "Bu hiçbir şekilde kabul edilemez." },
          { de: "Er ist durchaus kompetent.", tr: "O kesinlikle yetenekli." },
          { de: "Das ist ausgesprochen schwierig.", tr: "Bu son derece zor." },
        ],
      },
    ],
    exercises: {
      multipleChoice: [
        {
          id: 1,
          question: "'Hiçbir şekilde kabul edilemez' — Doğru Almanca ifade:",
          options: ["nicht akzeptabel", "kaum akzeptabel", "keineswegs akzeptabel", "wenig akzeptabel"],
          correct: 2,
          explanation: "'keineswegs' = hiçbir şekilde, kesinlikle değil.",
        },
        {
          id: 2,
          question: "'En azından bir adım attı.' — Doğru çeviri:",
          options: [
            "Jedenfalls hat er einen Schritt gemacht.",
            "Zumindest hat er einen Schritt gemacht.",
            "Immerhin hat er einen Schritt gemacht.",
            "Wenigstens hat er einen Schritt gemacht.",
          ],
          correct: 1,
          explanation: "'zumindest' = en azından (belirli bir sınır çizer).",
        },
        {
          id: 3,
          question: "'Neredeyse bitirdim.' — Doğru ifade:",
          options: ["Ich habe kaum fertig.", "Ich bin beinahe fertig.", "Ich bin keineswegs fertig.", "Ich bin immerhin fertig."],
          correct: 1,
          explanation: "'beinahe/fast' = neredeyse.",
        },
        {
          id: 4,
          question: "'Er ist _____ kompetent.' — 'Gerçekten, kesinlikle' anlamında:",
          options: ["kaum", "keineswegs", "durchaus", "wenigstens"],
          correct: 2,
          explanation: "'durchaus' = gerçekten, kesinlikle (olumlu güçlendirme).",
        },
        {
          id: 5,
          question: "'Das ist _____ eine gute Idee.' — 'Son derece iyi' anlamında:",
          options: ["kaum", "ausgesprochen", "jedenfalls", "immerhin"],
          correct: 1,
          explanation: "'ausgesprochen' = son derece, açıkça.",
        },
        {
          id: 6,
          question: "'Immerhin' ne zaman kullanılır?",
          options: [
            "Tamamen olumsuz durumda",
            "Olumsuz bir durumda olumlu tarafı vurgulamak için",
            "Derece ifade etmek için",
            "Soru sormak için",
          ],
          correct: 1,
          explanation: "'immerhin' = kötü olmakla birlikte olumlu bir tarafı var.",
        },
        {
          id: 7,
          question: "'Ich habe _____ noch geschlafen.' — 'Pek az/neredeyse hiç':",
          options: ["keineswegs", "kaum", "durchaus", "jedenfalls"],
          correct: 1,
          explanation: "'kaum' = pek az, neredeyse hiç.",
        },
        {
          id: 8,
          question: "'Jedenfalls' ile 'zumindest' arasındaki fark:",
          options: [
            "Hiç fark yok",
            "'jedenfalls' her durumda geçerli çıkarım, 'zumindest' sınır koyar",
            "'zumindest' her durumda, 'jedenfalls' sınır koyar",
            "İkisi de olumsuz",
          ],
          correct: 1,
          explanation: "'jedenfalls' = ne olursa olsun, her durumda. 'zumindest' = en azından şu kadarı var.",
        },
      ],
      fillInBlank: [
        {
          id: 1,
          before: "Das Ergebnis ist nicht das Beste, aber es reicht",
          after: ".",
          answer: "zumindest / jedenfalls",
          hint: "her halükarda, en azından",
        },
        {
          id: 2,
          before: "Er hat",
          after: "nachgedacht, bevor er entschieden hat. (pek az)",
          answer: "kaum",
          hint: "neredeyse hiç = kaum",
        },
        {
          id: 3,
          before: "Das ist",
          after: "eine komplexe Aufgabe. (son derece)",
          answer: "ausgesprochen",
          hint: "son derece = ausgesprochen",
        },
        {
          id: 4,
          before: "Das ist",
          after: "richtig — ich widerspreche vollständig. (hiçbir şekilde)",
          answer: "keineswegs",
          hint: "hiçbir şekilde = keineswegs",
        },
        {
          id: 5,
          before: "Er hat das Spiel verloren,",
          after: "hat er gut gespielt. (her halükarda olumlu yan)",
          answer: "immerhin",
          hint: "olumsuzda olumlu taraf = immerhin",
        },
      ],
    },
  },

  // ─── 12. Verben und Ergänzungen C1 ───────────────────────────────────────
  {
    id: "verben-ergaenzungen-c1",
    title: "Verben und Ergänzungen auf C1-Niveau",
    subtitle: "Edatlı Fiiller ve Tamamlayıcılar",
    explanation:
      "C1 düzeyinde edatlı fiillerin doğru tamamlayıcıyla kullanımı kritiktir. Akademik bağlamlarda yaygın kombinasyonlar: bestehen aus (oluşmak), verfügen über (sahip olmak), beruhen auf (dayanmak), hinweisen auf (işaret etmek), sich beziehen auf (atıfta bulunmak), ausgehen von (hareket etmek/varsaymak), zweifeln an (şüphe etmek), bestehen auf (ısrar etmek).",
    rules: [
      {
        heading: "Akademik Bağlamlarda Edatlı Fiiller",
        body: "C1 düzeyinde yaygın fiil + edat kombinasyonları.",
        examples: [
          { de: "Das Projekt besteht aus drei Phasen.", tr: "Proje üç aşamadan oluşuyor. (aus)" },
          { de: "Sie verfügt über ausgezeichnete Kenntnisse.", tr: "Mükemmel bilgiye sahip. (über)" },
          { de: "Die Theorie beruht auf neuen Erkenntnissen.", tr: "Teori yeni bulgulara dayanıyor. (auf)" },
        ],
      },
      {
        heading: "Sich beziehen, ausgehen, zweifeln, bestehen",
        body: "Akademik dilde sık kullanılan fiiller.",
        examples: [
          { de: "Der Autor bezieht sich auf frühere Studien.", tr: "Yazar önceki çalışmalara atıfta bulunuyor." },
          { de: "Wir gehen davon aus, dass...", tr: "... olduğunu varsayıyoruz." },
          { de: "Sie zweifelt an der Richtigkeit der Daten.", tr: "Verilerin doğruluğundan şüphe ediyor." },
        ],
      },
    ],
    exercises: {
      multipleChoice: [
        {
          id: 1,
          question: "'Das Argument beruht _____ falschen Annahmen.'",
          options: ["aus", "über", "auf", "an"],
          correct: 2,
          explanation: "beruhen auf + Dativ.",
        },
        {
          id: 2,
          question: "'Er verfügt _____ umfangreiche Erfahrung.'",
          options: ["auf", "über", "an", "mit"],
          correct: 1,
          explanation: "verfügen über + Akkusativ.",
        },
        {
          id: 3,
          question: "'Die Studie _____ aus mehreren Teilen.'",
          options: ["verfügt", "beruht", "besteht", "bezieht"],
          correct: 2,
          explanation: "bestehen aus + Dativ: oluşmak.",
        },
        {
          id: 4,
          question: "'Wir gehen _____, dass die Preise steigen werden.'",
          options: ["darauf aus", "davon aus", "daran aus", "damit aus"],
          correct: 1,
          explanation: "ausgehen von + Dativ → 'wir gehen davon aus, dass...'.",
        },
        {
          id: 5,
          question: "'Der Artikel bezieht sich _____ aktuelle Studien.'",
          options: ["an", "über", "auf", "mit"],
          correct: 2,
          explanation: "sich beziehen auf + Akkusativ.",
        },
        {
          id: 6,
          question: "'Er zweifelt _____ ihren Fähigkeiten.'",
          options: ["über", "auf", "an", "von"],
          correct: 2,
          explanation: "zweifeln an + Dativ.",
        },
        {
          id: 7,
          question: "'hinweisen' fiili hangi edatı alır?",
          options: ["aus", "an", "über", "auf"],
          correct: 3,
          explanation: "hinweisen auf + Akkusativ.",
        },
        {
          id: 8,
          question: "'bestehen auf' ne anlama gelir?",
          options: ["oluşmak", "dayanmak", "ısrar etmek", "sahip olmak"],
          correct: 2,
          explanation: "'bestehen auf + Dativ' = ısrar etmek. 'bestehen aus' = oluşmak.",
        },
      ],
      fillInBlank: [
        {
          id: 1,
          before: "Das Team besteht",
          after: "fünf Mitgliedern.",
          answer: "aus",
          hint: "bestehen aus + Dativ",
        },
        {
          id: 2,
          before: "Die Forschung beruht",
          after: "jahrelanger Arbeit.",
          answer: "auf",
          hint: "beruhen auf + Dativ",
        },
        {
          id: 3,
          before: "Er bezieht sich in seiner Arbeit",
          after: "klassische Theorien.",
          answer: "auf",
          hint: "sich beziehen auf + Akkusativ",
        },
        {
          id: 4,
          before: "Wir gehen",
          after: "aus, dass der Antrag genehmigt wird.",
          answer: "davon",
          hint: "ausgehen von → davon ausgehen",
        },
        {
          id: 5,
          before: "Die Direktorin besteht",
          after: "einer schriftlichen Genehmigung.",
          answer: "auf",
          hint: "bestehen auf + Dativ (ısrar etmek)",
        },
      ],
    },
  },

  // ─── 13. Komplexe Syntax & Textorganisation ───────────────────────────────
  {
    id: "komplexe-syntax-textorganisation",
    title: "Komplexe Syntax & Textorganisation",
    subtitle: "Karmaşık Sözdizimi ve Metin Bütünlüğü",
    explanation:
      "C1 düzeyinde uzun ve karmaşık cümleler kurmak ve metni mantıklı organize etmek temel beklentidir. Metin bağlayıcıları: 'Einerseits... andererseits' (bir yandan... öte yandan), 'zum einen... zum anderen', 'nicht nur... sondern auch'. Referans: 'letzteres/ersteres' (ikincisi/birincisi). C1 metnini B2'den ayıran unsurlar: bağlaç zenginliği, nominalizasyon ve referans araçları.",
    rules: [
      {
        heading: "Metin Yapısı Bağlayıcıları",
        body: "Karşıtlık, ekleme ve sıralama için metin düzeyi bağlayıcılar.",
        examples: [
          { de: "Einerseits ist das praktisch, andererseits riskant.", tr: "Bir yandan pratik, öte yandan riskli." },
          { de: "Nicht nur die Kosten, sondern auch die Zeit sind begrenzt.", tr: "Yalnızca maliyetler değil, zaman da sınırlı." },
          { de: "Zum einen spart man Zeit, zum anderen Geld.", tr: "Bir açıdan zaman, diğer açıdan para tasarrufu sağlanır." },
        ],
      },
      {
        heading: "Referans ve Tekrardan Kaçınma",
        body: "'letzteres/ersteres', 'jenes/dieses' ve eş anlamlılarla tekrarsız anlatım.",
        examples: [
          { de: "Qualität und Preis — letzteres ist oft entscheidend.", tr: "Kalite ve fiyat — ikincisi çoğu zaman belirleyicidir." },
          { de: "Die Lösung besteht darin, das System zu optimieren.", tr: "Çözüm, sistemi optimize etmekten geçiyor." },
        ],
      },
    ],
    exercises: {
      multipleChoice: [
        {
          id: 1,
          question: "'Bir yandan... öte yandan' Almancada nasıl kurulur?",
          options: [
            "erstens... zweitens",
            "einerseits... andererseits",
            "zum ersten... zum zweiten",
            "nicht nur... sondern auch",
          ],
          correct: 1,
          explanation: "'einerseits... andererseits' = bir yandan... öte yandan.",
        },
        {
          id: 2,
          question: "'Nicht nur das Wetter, _____ auch die schlechten Straßen machten die Reise schwierig.'",
          options: ["aber", "sondern", "und", "jedoch"],
          correct: 1,
          explanation: "'nicht nur... sondern auch' = yalnızca... değil, aynı zamanda.",
        },
        {
          id: 3,
          question: "'Zum einen... zum anderen' ne ifade eder?",
          options: [
            "Zaman ilişkisi",
            "İki farklı açıyı veya nedeni sıralama",
            "Karşıtlık",
            "Sonuç",
          ],
          correct: 1,
          explanation: "'zum einen... zum anderen' = iki farklı boyutu veya nedeni sıralamak için.",
        },
        {
          id: 4,
          question: "'Qualität und Preis wurden diskutiert. _____ ist oft wichtiger.' (ikincisi)",
          options: ["Ersteres", "Letzteres", "Jenes", "Dieses"],
          correct: 1,
          explanation: "'letzteres' = ikincisi (son söylenen).",
        },
        {
          id: 5,
          question: "C1 metninde tekrardan kaçınmak için ne kullanılır?",
          options: [
            "Aynı kelimeyi tekrar etmek",
            "Eş anlamlı kelimeler ve referans zamirleri",
            "Kısa cümle kurmak",
            "Sadece Pronomen kullanmak",
          ],
          correct: 1,
          explanation: "Sinonim ve referans araçları (letzteres, ersteres, dieses...) ile tekrar önlenir.",
        },
        {
          id: 6,
          question: "'Die Lösung _____ darin, das System zu verbessern.' — Doğru fiil:",
          options: ["ist", "besteht", "liegt", "befindet"],
          correct: 1,
          explanation: "'bestehen in + Dativ': Die Lösung besteht darin + zu-Infinitiv.",
        },
        {
          id: 7,
          question: "Akademik metinde 'also' yerine hangi bağlaç kullanılabilir?",
          options: ["und", "aber", "folglich", "weil"],
          correct: 2,
          explanation: "'folglich' veya 'infolgedessen' — 'also'nun formal alternatifleri.",
        },
        {
          id: 8,
          question: "Hangi özellik C1 düzeyinde bir metni B2'den ayırır?",
          options: [
            "Kısa cümleler kullanmak",
            "Bağlaç çeşitliliği, referans araçları ve nominalizasyon",
            "Yalnızca Präsens kullanmak",
            "Daha az sıfat kullanmak",
          ],
          correct: 1,
          explanation: "C1 metni: bağlaç zenginliği, nominalstil, referans araçları ve kompleks sentaks ile B2'den ayrılır.",
        },
      ],
      fillInBlank: [
        {
          id: 1,
          before: "",
          after: "ist das Projekt teuer, andererseits ist es sehr nützlich.",
          answer: "Einerseits",
          hint: "bir yandan = einerseits",
        },
        {
          id: 2,
          before: "Nicht nur die Kosten,",
          after: "auch die Zeit sind limitiert.",
          answer: "sondern",
          hint: "nicht nur... sondern auch",
        },
        {
          id: 3,
          before: "Freiheit und Sicherheit —",
          after: "ist schwer zu garantieren.",
          answer: "letzteres",
          hint: "ikincisi = letzteres",
        },
        {
          id: 4,
          before: "Zum einen sparen wir Kosten,",
          after: "erhöhen wir die Qualität.",
          answer: "zum anderen",
          hint: "diğer açıdan = zum anderen",
        },
        {
          id: 5,
          before: "Die Lösung besteht",
          after: ", das Verfahren zu vereinfachen.",
          answer: "darin",
          hint: "bestehen in + Dativ → darin (da + in)",
        },
      ],
    },
  },
];
