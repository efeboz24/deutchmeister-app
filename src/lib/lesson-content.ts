export interface TheorySection {
  heading: string;
  body: string;
  examples?: { de: string; tr: string }[];
  /** Optional grammar/conjugation table shown after examples */
  table?: { headers: string[]; rows: string[][] };
  /** Optional emoji/icon to show in section header */
  icon?: string;
}

export interface VocabItem {
  word: string;
  meaning: string;
  partOfSpeech: string;
  example: string;
  /** Conjugation table for verbs: shown as a note when the card is flipped */
  conjugation?: { pronoun: string; form: string }[];
}

export interface MCQQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number; // 0-indexed
  explanation: string;
}

export interface FillBlankQuestion {
  id: number;
  before: string;
  after: string;
  answer: string;
  hint: string;
}

export interface LessonContent {
  title: string;
  description: string;
  theory: {
    intro: string;
    sections: TheorySection[];
  };
  vocabulary: VocabItem[];
  exercises: {
    multipleChoice: MCQQuestion[];
    fillInBlank: FillBlankQuestion[];
  };
}

// Keyed by lesson name (matches DB)
export const LESSON_CONTENT: Record<string, LessonContent> = {
  "Bölüm 1: Selamlaşma ve Veda": {
    title: "Selamlaşma ve Veda",
    description: "Almancada günün farklı saatlerinde doğru selamlama ve vedalaşma kalıpları",
    theory: {
      intro:
        "Almancada selamlaşma kalıpları günün saatine ve ortamın resmi ya da samimi oluşuna göre değişir. Doğru kalıbı seçmek hem kültürel hem de dilbilgisel açıdan önemlidir.",
      sections: [
        {
          icon: "🌅",
          heading: "Günün Saatine Göre Selamlaşma",
          body:
            "Almanlar günün saatine dikkat ederek selamlama yapar. Sabah 'Guten Morgen', öğleden sonra 'Guten Tag', akşam ise 'Guten Abend' kullanılır. 'Hallo' ise her saate uygun samimi bir selamdır.",
          examples: [
            { de: "Guten Morgen!", tr: "Günaydın! (sabah)" },
            { de: "Guten Tag!", tr: "İyi günler! (öğlen/öğleden sonra)" },
            { de: "Guten Abend!", tr: "İyi akşamlar! (akşam)" },
            { de: "Hallo!", tr: "Merhaba! (her zaman, samimi)" },
          ],
        },
        {
          icon: "🤝",
          heading: "Resmi ve Samimi Selamlama",
          body:
            "'Sie' zamiri resmi ortamlarda (iş, yabancı, yaşlı) kullanılır. 'du' ise arkadaş, aile ve eşitler arasında tercih edilir. Bu ayrım selamlama kalıplarını da etkiler.",
          examples: [
            { de: "Wie geht es Ihnen?", tr: "Nasılsınız? (resmi - Sie)" },
            { de: "Wie geht es dir?", tr: "Nasılsın? (samimi - du)" },
            { de: "Danke, gut! Und Ihnen?", tr: "Teşekkür ederim, iyiyim! Siz nasılsınız?" },
            { de: "Danke, gut! Und dir?", tr: "Teşekkürler, iyiyim! Sen nasılsın?" },
          ],
        },
        {
          icon: "👋",
          heading: "Vedalaşma Kalıpları",
          body:
            "Vedalaşmada da resmi/samimi ayrımı geçerlidir. 'Auf Wiedersehen' resmi ortamlar içindir. 'Tschüss', 'Tschau' veya 'Bis bald' ise arkadaşlar arasında kullanılır.",
          examples: [
            { de: "Auf Wiedersehen!", tr: "Hoşça kalın! (resmi)" },
            { de: "Tschüss!", tr: "Hoşça kal! (samimi)" },
            { de: "Bis morgen!", tr: "Yarına kadar!" },
            { de: "Bis bald!", tr: "Görüşürüz!" },
            { de: "Gute Nacht!", tr: "İyi geceler!" },
          ],
        },
        {
          icon: "💬",
          heading: "Sıkça Kullanılan Yanıt Kalıpları",
          body:
            "Hal hatır sorulduğunda birkaç kalıp kullanılabilir. Alman kültüründe 'gut' (iyi) veya 'es geht' (idare eder) en yaygın yanıtlardır.",
          examples: [
            { de: "Danke, gut!", tr: "Teşekkürler, iyiyim!" },
            { de: "Es geht.", tr: "İdare eder." },
            { de: "Nicht so gut.", tr: "Pek iyi değil." },
            { de: "Super, danke!", tr: "Harika, teşekkürler!" },
          ],
        },
      ],
    },
    vocabulary: [
      { word: "Hallo", meaning: "Merhaba", partOfSpeech: "Adverb", example: "Hallo! Wie geht es dir?" },
      { word: "Guten Morgen", meaning: "Günaydın", partOfSpeech: "Wendung", example: "Guten Morgen, Herr Müller!" },
      { word: "Guten Tag", meaning: "İyi günler", partOfSpeech: "Wendung", example: "Guten Tag! Ich bin Anna." },
      { word: "Guten Abend", meaning: "İyi akşamlar", partOfSpeech: "Wendung", example: "Guten Abend! Nehmen Sie Platz." },
      { word: "Auf Wiedersehen", meaning: "Hoşça kalın (resmi)", partOfSpeech: "Wendung", example: "Auf Wiedersehen, bis morgen!" },
      { word: "Tschüss", meaning: "Hoşça kal (samimi)", partOfSpeech: "Adverb", example: "Tschüss! Bis bald!" },
      { word: "Wie geht es Ihnen?", meaning: "Nasılsınız? (resmi)", partOfSpeech: "Wendung", example: "Guten Tag! Wie geht es Ihnen?" },
      { word: "Danke, gut!", meaning: "Teşekkürler, iyiyim!", partOfSpeech: "Wendung", example: "Danke, gut! Und Ihnen?" },
      { word: "Gute Nacht", meaning: "İyi geceler", partOfSpeech: "Wendung", example: "Gute Nacht! Bis morgen." },
      { word: "Bis bald", meaning: "Görüşürüz", partOfSpeech: "Wendung", example: "Tschüss! Bis bald!" },
    ],
    exercises: {
      multipleChoice: [
        {
          id: 1,
          question: "Sabah bir arkadaşınızla karşılaştığınızda ne dersiniz?",
          options: ["Guten Abend!", "Guten Morgen!", "Auf Wiedersehen!", "Gute Nacht!"],
          correct: 1,
          explanation: "'Guten Morgen' sabah selamlaşması için kullanılır. 'Guten Abend' akşam, 'Gute Nacht' uyumadan önce, 'Auf Wiedersehen' vedalaşmak için söylenir.",
        },
        {
          id: 2,
          question: "İş toplantısında patronunuzla vedalaşırken ne dersiniz?",
          options: ["Tschüss!", "Hallo!", "Auf Wiedersehen!", "Bis bald!"],
          correct: 2,
          explanation: "Resmi ortamlarda (patronunuz, yabancılar) 'Auf Wiedersehen' kullanılır. 'Tschüss' ve 'Bis bald' samimi vedalaşmalarda tercih edilir.",
        },
        {
          id: 3,
          question: "— Wie geht es Ihnen? — ___________",
          options: ["Guten Morgen!", "Tschüss!", "Danke, gut! Und Ihnen?", "Auf Wiedersehen!"],
          correct: 2,
          explanation: "Hal hatır sorusuna 'Danke, gut! Und Ihnen?' (Teşekkürler, iyiyim! Siz nasılsınız?) ile karşılık vermek en doğal yanıttır.",
        },
        {
          id: 4,
          question: "Hangisi samimi bir vedalaşma ifadesidir?",
          options: ["Auf Wiedersehen", "Guten Tag", "Bis bald", "Guten Abend"],
          correct: 2,
          explanation: "'Bis bald' (görüşürüz) arkadaşlar arasında kullanılan samimi bir veda ifadesidir. 'Auf Wiedersehen' ise resmiyeti olan bir vedadır.",
        },
        {
          id: 5,
          question: "Saat 19:30'da bir komşunuzla karşılaştığınızda hangi selamlama uygundur?",
          options: ["Guten Morgen!", "Guten Tag!", "Guten Abend!", "Gute Nacht!"],
          correct: 2,
          explanation: "Akşam saatlerinde (yaklaşık 18:00 sonrası) 'Guten Abend' kullanılır. 'Gute Nacht' ise gece yatmadan önce söylenir.",
        },
        {
          id: 6,
          question: "Gece yatmadan önce bir aile üyenize ne söylersiniz?",
          options: ["Tschüss!", "Guten Abend!", "Gute Nacht!", "Auf Wiedersehen!"],
          correct: 2,
          explanation: "'Gute Nacht' yatmadan önce söylenir. 'Guten Abend' akşam karşılaşmada, 'Tschüss' ve 'Auf Wiedersehen' vedada kullanılır.",
        },
        {
          id: 7,
          question: "'Danke' kelimesinin anlamı nedir?",
          options: ["Lütfen", "Teşekkürler", "Özür dilerim", "Merhaba"],
          correct: 1,
          explanation: "'Danke' = teşekkürler. 'Bitte' = lütfen. 'Entschuldigung' = özür dilerim. 'Hallo' = merhaba.",
        },
        {
          id: 8,
          question: "Almancada 'görüşürüz' anlamına gelen kelime hangisidir?",
          options: ["Gute Nacht", "Bis bald", "Hallo", "Danke"],
          correct: 1,
          explanation: "'Bis bald' = görüşürüz. 'Bis morgen' = yarına kadar. 'Bis später' = sonra görüşürüz.",
        },
        {
          id: 9,
          question: "Hangi selamlama günün her saatine uygundur?",
          options: ["Guten Morgen", "Guten Tag", "Guten Abend", "Hallo"],
          correct: 3,
          explanation: "'Hallo' günün her saatinde kullanılabilecek samimi bir selamdır. Diğerleri günün belirli saatlerine bağlıdır.",
        },
        {
          id: 10,
          question: "Resmi ortamda 'nasılsınız?' sorusunu nasıl sorarsınız?",
          options: ["Wie geht's?", "Wie geht es dir?", "Wie geht es Ihnen?", "Alles okay?"],
          correct: 2,
          explanation: "'Wie geht es Ihnen?' resmi (Sie) formudur. 'Wie geht es dir?' veya 'Wie geht's?' samimi ortamlarda kullanılır.",
        },
      ],
      fillInBlank: [
        {
          id: 1,
          before: "— Guten Tag! Wie geht es Ihnen? — Danke, ___! Und Ihnen?",
          after: "",
          answer: "gut",
          hint: "İngilizce 'good' kelimesine benzer",
        },
        {
          id: 2,
          before: "Guten ___! Ich hoffe, Sie haben gut geschlafen.",
          after: "(sabah bir meslektaşınıza)",
          answer: "Morgen",
          hint: "Sabah selamlaması",
        },
        {
          id: 3,
          before: "Das Meeting ist vorbei. ___ Wiedersehen, bis nächste Woche!",
          after: "",
          answer: "Auf",
          hint: "'Auf' + Wiedersehen = resmi veda",
        },
        {
          id: 4,
          before: "Guten ___! Es ist jetzt 20 Uhr.",
          after: "(akşam selamlaması)",
          answer: "Abend",
          hint: "Akşam selamı sözcüğü",
        },
        {
          id: 5,
          before: "___ für Ihre Hilfe! Sie sind sehr nett.",
          after: "",
          answer: "Danke",
          hint: "Teşekkür ifadesi",
        },
      ],
    },
  },

  "Bölüm 2: Kendini Tanıtma": {
    title: "Kendini Tanıtma",
    description: "Ad, memleket, dil ve meslek hakkında kendini tanıtma kalıpları",
    theory: {
      intro:
        "Almancada kendini tanıtmak için birkaç temel kalıp vardır. Bu bölümde 'Ich bin...', 'Ich heiße...', 'Ich komme aus...' gibi yapıları öğreneceğiz.",
      sections: [
        {
          icon: "👤",
          heading: "İsim Söyleme",
          body:
            "Almancada isim söylemek için iki temel kalıp kullanılır. Resmi ortamlarda 'Mein Name ist...' daha tercih edilirken günlük konuşmada 'Ich heiße...' yaygındır.",
          examples: [
            { de: "Ich heiße Anna.", tr: "Benim adım Anna." },
            { de: "Mein Name ist Thomas Müller.", tr: "Benim adım Thomas Müller." },
            { de: "Ich bin Fatima.", tr: "Ben Fatima'yım." },
          ],
        },
        {
          icon: "🏙️",
          heading: "Nerelisin?",
          body:
            "'kommen aus' (... 'dan gelmek) ve 'leben in' (...'da yaşamak) yapıları hem memleketi hem de yaşanılan yeri anlatmak için kullanılır.",
          examples: [
            { de: "Ich komme aus der Türkei.", tr: "Türkiye'den geliyorum." },
            { de: "Ich komme aus Istanbul.", tr: "İstanbul'dan geliyorum." },
            { de: "Ich lebe in Berlin.", tr: "Berlin'de yaşıyorum." },
            { de: "Woher kommen Sie?", tr: "Nerelisiniz? (resmi)" },
          ],
        },
        {
          icon: "💼",
          heading: "Dil ve Meslek",
          body:
            "Hangi dilleri konuştuğunu ve mesleğini söylemek tanışma konuşmalarının vazgeçilmez parçasıdır.",
          examples: [
            { de: "Ich spreche Deutsch und Türkisch.", tr: "Almanca ve Türkçe konuşuyorum." },
            { de: "Ich bin Student / Studentin.", tr: "Ben öğrenciyim. (erkek/kadın)" },
            { de: "Ich arbeite als Ingenieur.", tr: "Mühendis olarak çalışıyorum." },
            { de: "Was sind Sie von Beruf?", tr: "Mesleğiniz nedir?" },
          ],
        },
      ],
    },
    vocabulary: [
      {
        word: "heißen", meaning: "adı olmak", partOfSpeech: "Verb", example: "Wie heißen Sie?",
        conjugation: [
          { pronoun: "ich", form: "heiße" },
          { pronoun: "du", form: "heißt" },
          { pronoun: "er / sie / es", form: "heißt" },
          { pronoun: "wir", form: "heißen" },
          { pronoun: "ihr", form: "heißt" },
          { pronoun: "sie / Sie", form: "heißen" },
        ],
      },
      {
        word: "kommen", meaning: "gelmek", partOfSpeech: "Verb", example: "Ich komme aus der Türkei.",
        conjugation: [
          { pronoun: "ich", form: "komme" },
          { pronoun: "du", form: "kommst" },
          { pronoun: "er / sie / es", form: "kommt" },
          { pronoun: "wir", form: "kommen" },
          { pronoun: "ihr", form: "kommt" },
          { pronoun: "sie / Sie", form: "kommen" },
        ],
      },
      {
        word: "wohnen", meaning: "yaşamak / oturmak", partOfSpeech: "Verb", example: "Ich wohne in Berlin.",
        conjugation: [
          { pronoun: "ich", form: "wohne" },
          { pronoun: "du", form: "wohnst" },
          { pronoun: "er / sie / es", form: "wohnt" },
          { pronoun: "wir", form: "wohnen" },
          { pronoun: "ihr", form: "wohnt" },
          { pronoun: "sie / Sie", form: "wohnen" },
        ],
      },
      {
        word: "sprechen", meaning: "konuşmak", partOfSpeech: "Verb", example: "Ich spreche Deutsch und Englisch.",
        conjugation: [
          { pronoun: "ich", form: "spreche" },
          { pronoun: "du", form: "sprichst" },
          { pronoun: "er / sie / es", form: "spricht" },
          { pronoun: "wir", form: "sprechen" },
          { pronoun: "ihr", form: "sprecht" },
          { pronoun: "sie / Sie", form: "sprechen" },
        ],
      },
      { word: "der Name", meaning: "isim", partOfSpeech: "Nomen", example: "Mein Name ist Anna." },
      { word: "die Sprache", meaning: "dil", partOfSpeech: "Nomen", example: "Welche Sprache sprechen Sie?" },
      { word: "das Land", meaning: "ülke", partOfSpeech: "Nomen", example: "Ich komme aus einem schönen Land." },
      { word: "der Beruf", meaning: "meslek", partOfSpeech: "Nomen", example: "Was sind Sie von Beruf?" },
      {
        word: "arbeiten", meaning: "çalışmak", partOfSpeech: "Verb", example: "Ich arbeite in einem Büro.",
        conjugation: [
          { pronoun: "ich", form: "arbeite" },
          { pronoun: "du", form: "arbeitest" },
          { pronoun: "er / sie / es", form: "arbeitet" },
          { pronoun: "wir", form: "arbeiten" },
          { pronoun: "ihr", form: "arbeitet" },
          { pronoun: "sie / Sie", form: "arbeiten" },
        ],
      },
      {
        word: "lernen", meaning: "öğrenmek", partOfSpeech: "Verb", example: "Ich lerne Deutsch.",
        conjugation: [
          { pronoun: "ich", form: "lerne" },
          { pronoun: "du", form: "lernst" },
          { pronoun: "er / sie / es", form: "lernt" },
          { pronoun: "wir", form: "lernen" },
          { pronoun: "ihr", form: "lernt" },
          { pronoun: "sie / Sie", form: "lernen" },
        ],
      },
      { word: "der Vorname", meaning: "ad (isim)", partOfSpeech: "Nomen", example: "Mein Vorname ist Ali." },
      { word: "der Nachname", meaning: "soyad", partOfSpeech: "Nomen", example: "Mein Nachname ist Yılmaz." },
      { word: "die Stadt", meaning: "şehir", partOfSpeech: "Nomen", example: "Istanbul ist eine große Stadt." },
      { word: "die Adresse", meaning: "adres", partOfSpeech: "Nomen", example: "Wie ist Ihre Adresse?" },
      { word: "die Muttersprache", meaning: "ana dil", partOfSpeech: "Nomen", example: "Meine Muttersprache ist Türkisch." },
    ],
    exercises: {
      multipleChoice: [
        {
          id: 1,
          question: "Birine adını sormak için hangisini kullanırsınız? (samimi)",
          options: ["Wie heißen Sie?", "Wie heißt du?", "Was ist Ihr Name?", "Mein Name ist..."],
          correct: 1,
          explanation: "'Wie heißt du?' samimi (du) formudur. 'Wie heißen Sie?' resmi (Sie) formudur. 'Was ist Ihr Name?' de resmidir.",
        },
        {
          id: 2,
          question: "— Woher kommen Sie? — ___________",
          options: ["Ich heiße Maria.", "Ich komme aus Österreich.", "Ich spreche Deutsch.", "Ich bin Student."],
          correct: 1,
          explanation: "'Woher kommen Sie?' sorusu 'Nerelisiniz?' anlamına gelir. Cevap 'Ich komme aus...' (... 'dan geliyorum) şeklinde olmalıdır.",
        },
        {
          id: 3,
          question: "Almancada 'Ben öğrenciyim' nasıl söylenir?",
          options: ["Ich spreche Deutsch.", "Ich heiße Student.", "Ich bin Student.", "Ich lerne aus Berlin."],
          correct: 2,
          explanation: "'Ich bin...' (Ben ...yım/im) Almancada 'sein' fiilinin çekimidir. Meslek ve kimlik belirtmek için kullanılır.",
        },
        {
          id: 4,
          question: "Hangisi 'Almanca ve İngilizce konuşuyorum' anlamına gelir?",
          options: [
            "Ich lerne Deutsch und Englisch.",
            "Ich spreche Deutsch und Englisch.",
            "Ich komme aus Deutschland und England.",
            "Ich bin Deutsch und Englisch.",
          ],
          correct: 1,
          explanation: "'sprechen' (konuşmak) dil ifade etmek için kullanılır. 'lernen' öğrenmek anlamına gelir.",
        },
        {
          id: 5,
          question: "Resmi bir ortamda 'Benim adım...' cümlesi nasıl kurulur?",
          options: ["Ich heiße...", "Mein Name ist...", "Ich bin heißen...", "Wie heißen Sie?"],
          correct: 1,
          explanation: "'Mein Name ist...' daha resmi bir tanıtım kalıbıdır. 'Ich heiße...' da doğrudur ama biraz daha gündelik bir tondadır.",
        },
        {
          id: 6,
          question: "'Ich lerne Deutsch.' cümlesi ne anlama gelir?",
          options: ["Almanca öğretiyorum.", "Almanca konuşuyorum.", "Almanca öğreniyorum.", "Almanım."],
          correct: 2,
          explanation: "'lernen' = öğrenmek. 'Ich lerne Deutsch' = Almanca öğreniyorum. 'sprechen' konuşmak, 'lehren' öğretmek anlamına gelir.",
        },
        {
          id: 7,
          question: "Almancada 'Berlin'de yaşıyorum' nasıl denir?",
          options: ["Ich komme aus Berlin.", "Ich bin in Berlin.", "Ich wohne in Berlin.", "Ich lerne Berlin."],
          correct: 2,
          explanation: "'wohnen in' = ... 'da/-de yaşamak/oturmak. 'kommen aus' ise memleketi belirtir.",
        },
        {
          id: 8,
          question: "'Ich spreche Türkisch und Deutsch.' — Bu cümlede 'spreche' hangi fiilin çekimidir?",
          options: ["lernen", "wohnen", "sprechen", "kommen"],
          correct: 2,
          explanation: "'spreche' fiili 'sprechen' (konuşmak) fiilinin 'ich' (ben) çekimidir. Düzensiz fiildir: du sprichst, er spricht.",
        },
        {
          id: 9,
          question: "Birinin nerede çalıştığını sormak için hangi cümle doğrudur?",
          options: ["Wo wohnst du?", "Wo arbeitest du?", "Woher kommst du?", "Was heißt du?"],
          correct: 1,
          explanation: "'Wo arbeitest du?' = Nerede çalışıyorsun? 'arbeiten' çalışmak, 'wo' ise yer sorusu için kullanılır.",
        },
        {
          id: 10,
          question: "'sein' fiilinin 'wir' (biz) çekimi hangisidir?",
          options: ["bin", "bist", "ist", "sind"],
          correct: 3,
          explanation: "'sein' düzensiz bir fiildir. ich → bin, du → bist, er/sie/es → ist, wir → sind, ihr → seid, sie/Sie → sind.",
        },
      ],
      fillInBlank: [
        {
          id: 1,
          before: "Guten Tag! Ich ___ aus der Türkei.",
          after: "",
          answer: "komme",
          hint: "kommen fiilinin ich (ben) çekimi",
        },
        {
          id: 2,
          before: "— Was ___ Sie von Beruf? — Ich bin Ärztin.",
          after: "",
          answer: "sind",
          hint: "sein fiilinin Sie (Siz) çekimi",
        },
        {
          id: 3,
          before: "Ich ___ in München, aber ich komme aus Ankara.",
          after: "",
          answer: "wohne",
          hint: "wohnen fiilinin ich (ben) çekimi",
        },
        {
          id: 4,
          before: "Mein ___ ist Ali, mein Nachname ist Yılmaz.",
          after: "(ilk isim)",
          answer: "Vorname",
          hint: "ilk isim = Vor___",
        },
        {
          id: 5,
          before: "Ich ___ Deutsch und Englisch.",
          after: "(konuşuyorum)",
          answer: "spreche",
          hint: "sprechen fiilinin ich formu",
        },
      ],
    },
  },

  "Bölüm 3: Soru Kelimeleri": {
    title: "Soru Kelimeleri (W-Fragen)",
    description: "Almancada temel soru kelimeleri ve bunlarla cümle kurma",
    theory: {
      intro:
        "Almancada soru cümleleri iki türlüdür: Evet/Hayır soruları (fiil öne gelir) ve W-soruları (soru kelimesi + fiil + özne). Bu bölümde en önemli W-soruları öğreneceğiz.",
      sections: [
        {
          icon: "❓",
          heading: "Temel W-Soru Kelimeleri",
          body:
            "Almancada tüm soru kelimeleri 'W' harfiyle başlar. Bu yüzden bunlara 'W-Fragen' denir. Her soru kelimesi belirli bir bilgi türü için kullanılır.",
          examples: [
            { de: "Wer? (Kim?)", tr: "Kişi sorusu: Wer ist das? — O kim?" },
            { de: "Was? (Ne?)", tr: "Nesne sorusu: Was machst du? — Ne yapıyorsun?" },
            { de: "Wo? (Nerede?)", tr: "Yer sorusu: Wo wohnst du? — Nerede oturuyorsun?" },
            { de: "Woher? (Nereden?)", tr: "Kaynak sorusu: Woher kommen Sie? — Nerelisiniz?" },
            { de: "Wie? (Nasıl?)", tr: "Durum sorusu: Wie heißen Sie? — Adınız ne?" },
            { de: "Warum? (Neden?)", tr: "Neden sorusu: Warum lernst du Deutsch? — Neden Almanca öğreniyorsun?" },
          ],
          table: {
            headers: ["Soru Kelimesi", "Türkçe", "Soru Türü", "Örnek"],
            rows: [
              ["Wer?", "Kim?", "Kişi", "Wer ist das?"],
              ["Was?", "Ne?", "Nesne/Şey", "Was machst du?"],
              ["Wo?", "Nerede?", "Yer (konum)", "Wo wohnst du?"],
              ["Woher?", "Nereden?", "Yer (kaynak)", "Woher kommst du?"],
              ["Wohin?", "Nereye?", "Yer (yön)", "Wohin gehst du?"],
              ["Wie?", "Nasıl?", "Durum/Ad", "Wie heißen Sie?"],
              ["Wann?", "Ne zaman?", "Zaman", "Wann kommst du?"],
              ["Warum?", "Neden?", "Sebep", "Warum lernst du?"],
              ["Wie viel?", "Ne kadar?", "Miktar/Fiyat", "Wie viel kostet das?"],
            ],
          },
        },
        {
          icon: "📝",
          heading: "Soru Cümlesi Yapısı",
          body:
            "W-sorularında kelime sırası: Soru kelimesi + Fiil + Özne + (diğer unsurlar). Fiil daima ikinci sıradadır — Almanca'nın temel kuralı.",
          examples: [
            { de: "Wie heißen Sie?", tr: "Adınız ne? (Wie + heißen + Sie)" },
            { de: "Woher kommst du?", tr: "Nerelisin? (Woher + kommst + du)" },
            { de: "Was lernst du?", tr: "Ne öğreniyorsun? (Was + lernst + du)" },
            { de: "Wo wohnst du?", tr: "Nerede oturuyorsun? (Wo + wohnst + du)" },
          ],
        },
      ],
    },
    vocabulary: [
      { word: "Wer?", meaning: "Kim?", partOfSpeech: "Fragewort", example: "Wer ist das?" },
      { word: "Was?", meaning: "Ne?", partOfSpeech: "Fragewort", example: "Was machst du?" },
      { word: "Wo?", meaning: "Nerede?", partOfSpeech: "Fragewort", example: "Wo wohnst du?" },
      { word: "Woher?", meaning: "Nereden?", partOfSpeech: "Fragewort", example: "Woher kommen Sie?" },
      { word: "Wohin?", meaning: "Nereye?", partOfSpeech: "Fragewort", example: "Wohin gehst du?" },
      { word: "Wie?", meaning: "Nasıl?", partOfSpeech: "Fragewort", example: "Wie heißen Sie?" },
      { word: "Wann?", meaning: "Ne zaman?", partOfSpeech: "Fragewort", example: "Wann kommst du?" },
      { word: "Warum?", meaning: "Neden?", partOfSpeech: "Fragewort", example: "Warum lernst du Deutsch?" },
      { word: "Wie viel?", meaning: "Ne kadar?", partOfSpeech: "Fragewort", example: "Wie viel kostet das?" },
      { word: "Wie alt?", meaning: "Kaç yaşında?", partOfSpeech: "Fragewort", example: "Wie alt bist du?" },
    ],
    exercises: {
      multipleChoice: [
        {
          id: 1,
          question: "Birinin nerede oturduğunu sormak için hangi soru kelimesini kullanırsınız?",
          options: ["Wer?", "Was?", "Wo?", "Woher?"],
          correct: 2,
          explanation: "'Wo?' (Nerede?) yer ve konum sormak için kullanılır. 'Woher?' ise köken ve nereden geldiğini sorgulamak için.",
        },
        {
          id: 2,
          question: "— ___ kommen Sie? — Ich komme aus Spanien.",
          options: ["Wo", "Woher", "Wie", "Was"],
          correct: 1,
          explanation: "'Woher?' (Nereden?) ülke veya şehirden gelişi sorar. 'Wo?' ise mevcut bulunulan yeri sorar.",
        },
        {
          id: 3,
          question: "Birinin adını sormak için hangi W-sorusu kullanılır?",
          options: ["Was heißen Sie?", "Wer heißen Sie?", "Wie heißen Sie?", "Wo heißen Sie?"],
          correct: 2,
          explanation: "'Wie heißen Sie?' (Adınız ne?) kalıbında 'Wie?' kullanılır. 'heißen' fiili 'adı olmak' anlamına gelir.",
        },
        {
          id: 4,
          question: "— ___ lernst du Deutsch? — Weil es interessant ist!",
          options: ["Was", "Wo", "Wie", "Warum"],
          correct: 3,
          explanation: "'Warum?' (Neden?) neden-sonuç ilişkisi sorar. Cevap genellikle 'weil' (çünkü) ile başlar.",
        },
        {
          id: 5,
          question: "Birinin kaç yaşında olduğunu sormak için hangisi kullanılır?",
          options: ["Wie viel Jahre hast du?", "Wie alt bist du?", "Was alt bist du?", "Wo alt bist du?"],
          correct: 1,
          explanation: "'Wie alt bist du?' (Kaç yaşındasın?) yaş sormak için standart kalıptır. 'alt' sıfatı 'yaşlı/yaşında' anlamına gelir.",
        },
        {
          id: 6,
          question: "Bir nesnenin fiyatını sormak için hangi soru kullanılır?",
          options: ["Wer kostet das?", "Wie viel kostet das?", "Wo kostet das?", "Warum kostet das?"],
          correct: 1,
          explanation: "'Wie viel kostet das?' = Bu ne kadar? 'Wie viel?' miktar ve fiyat sormak için kullanılır.",
        },
        {
          id: 7,
          question: "'Wann' sorusu neyi sormak için kullanılır?",
          options: ["Yeri", "Zamanı", "Kişiyi", "Nedeni"],
          correct: 1,
          explanation: "'Wann?' zaman sorgulamak için kullanılır. Örnek: 'Wann kommst du?' = Ne zaman geliyorsun?",
        },
        {
          id: 8,
          question: "— ___ viele Geschwister hast du? — Ich habe drei.",
          options: ["Was", "Wie", "Wer", "Wo"],
          correct: 1,
          explanation: "'Wie viele?' = Kaç tane? Miktar sormak için 'Wie viele?' + çoğul isim kullanılır.",
        },
        {
          id: 9,
          question: "W-sorularında fiil kaçıncı sıradadır?",
          options: ["Birinci", "İkinci", "Üçüncü", "Son"],
          correct: 1,
          explanation: "Almancada ana kural: Fiil daima ikinci sıradadır (V2 kuralı). Soru kelimesi birinci, fiil ikinci gelir.",
        },
        {
          id: 10,
          question: "'Wo?' ile 'Wohin?' arasındaki fark nedir?",
          options: [
            "Hiçbir fark yok",
            "'Wo?' mevcut konum, 'Wohin?' gidilecek yer sorar",
            "'Wo?' gidilecek yer, 'Wohin?' mevcut konum sorar",
            "İkisi de zaman sorar",
          ],
          correct: 1,
          explanation: "'Wo?' (Nerede?) mevcut bulunulan yeri, 'Wohin?' (Nereye?) gidilecek yönü/hedefi sorar.",
        },
      ],
      fillInBlank: [
        {
          id: 1,
          before: "— ___ ist das? — Das ist mein Freund Marco.",
          after: "",
          answer: "Wer",
          hint: "Kişi sorusu",
        },
        {
          id: 2,
          before: "— ___ alt bist du? — Ich bin 25 Jahre alt.",
          after: "",
          answer: "Wie",
          hint: "Nasıl/Ne şekilde sorusu",
        },
        {
          id: 3,
          before: "— ___ gehst du heute? — Ich gehe in die Bibliothek.",
          after: "",
          answer: "Wohin",
          hint: "Nereye gidiliyor? (yön)",
        },
        {
          id: 4,
          before: "— ___ kommst du? — Ich komme aus der Türkei.",
          after: "",
          answer: "Woher",
          hint: "Nereden geliyorsun? (kaynak)",
        },
        {
          id: 5,
          before: "— ___ lernst du Deutsch? — Weil ich in Deutschland arbeiten möchte.",
          after: "",
          answer: "Warum",
          hint: "Neden sorusu — cevap genellikle 'weil' ile başlar",
        },
      ],
    },
  },

  // ─── A1 Ünite 2 ──────────────────────────────────────────────────────────

  "Bölüm 1: Aile Üyeleri": {
    title: "Aile Üyeleri",
    description: "Almancada aile bireylerini tanıtma ve grammatikal cinsiyet (Artikel) kullanımı",
    theory: {
      intro:
        "Almancada her ismin bir grammatikal cinsiyeti (Genus) vardır: eril (der), dişil (die) ya da nötr (das). Aile kelimelerini artikelleriyle birlikte öğrenmek zorunludur; aksi hâlde cümle kurulurken hata yapılır.",
      sections: [
        {
          icon: "👨‍👩‍👧",
          heading: "Temel Aile Kelimeleri ve Artikelleri",
          body:
            "Aile bireylerinin Almancadaki karşılıklarını ve artikellerini birlikte öğrenin. Eril üyeler 'der', dişil üyeler 'die' artikeli alır. Çocuk (das Kind) nötr kabul edilir.",
          examples: [
            { de: "der Vater / die Mutter", tr: "baba / anne" },
            { de: "der Bruder / die Schwester", tr: "erkek kardeş / kız kardeş" },
            { de: "der Sohn / die Tochter", tr: "oğul / kız" },
            { de: "der Großvater / die Großmutter", tr: "büyükbaba / büyükanne" },
            { de: "das Kind / die Kinder", tr: "çocuk / çocuklar" },
          ],
          table: {
            headers: ["Almanca", "Artikel", "Türkçe", "Örnek Cümle"],
            rows: [
              ["Vater", "der", "baba", "Mein Vater ist Lehrer."],
              ["Mutter", "die", "anne", "Meine Mutter ist Ärztin."],
              ["Bruder", "der", "erkek kardeş", "Mein Bruder heißt Max."],
              ["Schwester", "die", "kız kardeş", "Meine Schwester ist 15 Jahre alt."],
              ["Sohn", "der", "oğul", "Mein Sohn geht zur Schule."],
              ["Tochter", "die", "kız evlat", "Meine Tochter ist Studentin."],
              ["Großvater (Opa)", "der", "büyükbaba", "Mein Opa ist 72 Jahre alt."],
              ["Großmutter (Oma)", "die", "büyükanne", "Meine Oma kocht sehr gut."],
              ["Kind", "das", "çocuk", "Das Kind spielt im Garten."],
              ["Geschwister", "die (Pl.)", "kardeşler", "Ich habe zwei Geschwister."],
            ],
          },
        },
        {
          icon: "🏠",
          heading: "Aile Tanıtma: 'Das ist mein/meine...'",
          body:
            "'mein' (benim) iyelik zamiri eril isimlerde 'mein', dişil isimlerde 'meine' biçimini alır. Bu kural tüm aile tanıtımlarında geçerlidir.",
          examples: [
            { de: "Das ist mein Vater. Er heißt Thomas.", tr: "Bu benim babam. Adı Thomas." },
            { de: "Das ist meine Mutter. Sie heißt Anna.", tr: "Bu benim annem. Adı Anna." },
            { de: "Das ist mein Bruder. Er ist 10 Jahre alt.", tr: "Bu benim erkek kardeşim. O 10 yaşında." },
            { de: "Das ist meine Schwester. Sie ist Studentin.", tr: "Bu benim kız kardeşim. O öğrenci." },
          ],
        },
        {
          icon: "💑",
          heading: "Evli misin? Çocuğun var mı?",
          body:
            "Aile durumu ve çocuk sahibi olup olmadığını anlatmak için 'sein' (olmak) ve 'haben' (sahip olmak) fiilleri kullanılır.",
          examples: [
            { de: "Ich bin verheiratet.", tr: "Evliyim." },
            { de: "Ich bin ledig.", tr: "Bekarım." },
            { de: "Ich habe zwei Kinder.", tr: "İki çocuğum var." },
            { de: "Ich habe keine Geschwister.", tr: "Kardeşim yok." },
          ],
        },
      ],
    },
    vocabulary: [
      { word: "der Vater", meaning: "baba", partOfSpeech: "Nomen", example: "Mein Vater heißt Klaus." },
      { word: "die Mutter", meaning: "anne", partOfSpeech: "Nomen", example: "Meine Mutter ist Lehrerin." },
      { word: "der Bruder", meaning: "erkek kardeş", partOfSpeech: "Nomen", example: "Mein Bruder ist 15 Jahre alt." },
      { word: "die Schwester", meaning: "kız kardeş", partOfSpeech: "Nomen", example: "Meine Schwester wohnt in Berlin." },
      { word: "das Kind", meaning: "çocuk", partOfSpeech: "Nomen", example: "Das Kind spielt im Garten." },
      { word: "der Großvater", meaning: "büyükbaba", partOfSpeech: "Nomen", example: "Mein Großvater ist 70 Jahre alt." },
      { word: "die Großmutter", meaning: "büyükanne", partOfSpeech: "Nomen", example: "Meine Großmutter kocht sehr gut." },
      { word: "verheiratet", meaning: "evli", partOfSpeech: "Adjektiv", example: "Meine Eltern sind verheiratet." },
      { word: "ledig", meaning: "bekar", partOfSpeech: "Adjektiv", example: "Ich bin noch ledig." },
      { word: "die Geschwister", meaning: "kardeşler", partOfSpeech: "Nomen (Plural)", example: "Ich habe zwei Geschwister." },
    ],
    exercises: {
      multipleChoice: [
        {
          id: 1,
          question: "'Mein ___' ile hangi kelime kullanılır? (Erkek kardeş)",
          options: ["Mein Schwester", "Meine Bruder", "Mein Bruder", "Meine Schwester"],
          correct: 2,
          explanation: "'der Bruder' eril olduğu için iyelik zamiri 'mein' (mein Bruder) olur. Dişil isimlerde 'meine' kullanılır.",
        },
        {
          id: 2,
          question: "'Das Kind' hangi grammatikal cinsiyettedir?",
          options: ["eril (der)", "dişil (die)", "nötr (das)", "çoğul (die)"],
          correct: 2,
          explanation: "'das Kind' nötr (sachlich) bir isimdir. Bu yüzden 'das' artikeli alır.",
        },
        {
          id: 3,
          question: "Almancada 'büyükanne' nasıl denir?",
          options: ["der Großvater", "die Großmutter", "die Mutter", "das Kind"],
          correct: 1,
          explanation: "'die Großmutter' = büyükanne. 'der Großvater' ise büyükbabadır.",
        },
        {
          id: 4,
          question: "Hangi cümle doğrudur?",
          options: [
            "Das ist meine Vater.",
            "Das ist mein Mutter.",
            "Das ist mein Vater.",
            "Das ist der mein Bruder.",
          ],
          correct: 2,
          explanation: "'der Vater' eril olduğu için 'mein Vater' doğrudur. Dişil isimlerde ise 'meine' kullanılırdı.",
        },
        {
          id: 5,
          question: "'Ich habe ___ Geschwister.' — Kardeşi yok demek istiyoruz.",
          options: ["ein", "keine", "kein", "viele"],
          correct: 1,
          explanation: "'Geschwister' dişil ya da çoğul kabul edilir; 'keine' ile olumsuzlanır. 'kein' eril/nötr tekil isimler içindir.",
        },
        {
          id: 6,
          question: "'der Sohn' kelimesinin Türkçe karşılığı nedir?",
          options: ["kız evlat", "oğul", "erkek kardeş", "büyükbaba"],
          correct: 1,
          explanation: "'der Sohn' = oğul. 'die Tochter' = kız evlat. 'der Bruder' = erkek kardeş.",
        },
        {
          id: 7,
          question: "Bir kişi 'Ich bin verheiratet.' diyorsa ne anlama gelir?",
          options: ["Bekardır.", "Evlidir.", "Boşanmıştır.", "Öğrencidir."],
          correct: 1,
          explanation: "'verheiratet' = evli. 'ledig' = bekar. 'geschieden' = boşanmış. 'verlobt' = nişanlı.",
        },
        {
          id: 8,
          question: "Eril bir isimle 'benim' demek için hangi iyelik zamiri kullanılır?",
          options: ["meine", "mein", "meinen", "meines"],
          correct: 1,
          explanation: "Eril (der) isimler Nominativ'de 'mein' iyelik zamiri alır. Dişil (die) isimler 'meine' alır.",
        },
        {
          id: 9,
          question: "'das Kind' kaç yaşındaki kişiler için kullanılır?",
          options: ["Yetişkin erkekler", "Yetişkin kadınlar", "Çocuklar (cinsiyet fark etmeksizin)", "Sadece erkek çocuklar"],
          correct: 2,
          explanation: "'das Kind' = çocuk (nötr cinsiyet). Her cinsiyetten çocuk için kullanılır.",
        },
        {
          id: 10,
          question: "'Mein Vater hat ___ Geschwister.' — O tek çocuktu demek istiyoruz.",
          options: ["einen", "eine", "kein", "keine"],
          correct: 3,
          explanation: "'Geschwister' (kardeşler) çoğul olduğu için 'keine' ile olumsuzlanır.",
        },
      ],
      fillInBlank: [
        {
          id: 1,
          before: "Das ist ___ Mutter. Sie heißt Petra.",
          after: "",
          answer: "meine",
          hint: "die Mutter → dişil → meine",
        },
        {
          id: 2,
          before: "Ich ___ zwei Kinder.",
          after: "",
          answer: "habe",
          hint: "sahip olmak fiili (ich formu)",
        },
        {
          id: 3,
          before: "Mein Großvater ist 72 Jahre ___.",
          after: "",
          answer: "alt",
          hint: "yaş bildirmek: ... Jahre alt",
        },
        {
          id: 4,
          before: "Das ist ___ Schwester. Sie ist Ärztin.",
          after: "",
          answer: "meine",
          hint: "die Schwester → dişil → mein___",
        },
        {
          id: 5,
          before: "Ich habe keine ___.",
          after: "(Kardeşim yok.)",
          answer: "Geschwister",
          hint: "kardeşler = G___",
        },
      ],
    },
  },

  "Bölüm 2: Meslekler": {
    title: "Meslekler",
    description: "Almancada meslek adları, cinsiyete göre değişim ve 'kein/keine' ile olumsuzlama",
    theory: {
      intro:
        "Almancada meslek adları cinsiyete göre değişir: erkekler için temel form, kadınlar için genellikle '-in' eki eklenir. Mesleği tanıtırken artikelsiz kullanım tercih edilir.",
      sections: [
        {
          icon: "🏷️",
          heading: "Meslek Adları ve -in Eki",
          body:
            "Çoğu meslek adı, kadın versiyonu için '-in' ekini alır ve son hecede genellikle Umlaut (sesli harf değişimi) gerçekleşir. Mesleği tanıtırken 'Ich bin Arzt/Ärztin.' gibi artikelsiz söylenir.",
          examples: [
            { de: "der Arzt / die Ärztin", tr: "erkek doktor / kadın doktor" },
            { de: "der Lehrer / die Lehrerin", tr: "erkek öğretmen / kadın öğretmen" },
            { de: "der Ingenieur / die Ingenieurin", tr: "erkek mühendis / kadın mühendis" },
            { de: "der Kellner / die Kellnerin", tr: "erkek garson / kadın garson" },
          ],
          table: {
            headers: ["Erkek (Maskulin)", "Kadın (Feminin)", "Türkçe"],
            rows: [
              ["der Arzt", "die Ärztin", "doktor"],
              ["der Lehrer", "die Lehrerin", "öğretmen"],
              ["der Ingenieur", "die Ingenieurin", "mühendis"],
              ["der Kellner", "die Kellnerin", "garson"],
              ["der Koch", "die Köchin", "aşçı"],
              ["der Verkäufer", "die Verkäuferin", "satıcı"],
              ["der Student", "die Studentin", "üniversite öğrencisi"],
              ["der Schüler", "die Schülerin", "okul öğrencisi"],
              ["der Polizist", "die Polizistin", "polis"],
              ["der Friseur", "die Friseurin", "berber / kuaför"],
            ],
          },
        },
        {
          icon: "🗣️",
          heading: "Mesleği Tanıtma ve Sorgulama",
          body:
            "Meslek sormak için 'Was sind Sie von Beruf?' (resmi) ya da 'Was bist du?' (samimi) kullanılır. Cevap verilirken 'Ich bin...' + meslek adı (artikelsiz) şeklinde kurulur.",
          examples: [
            { de: "Was sind Sie von Beruf?", tr: "Mesleğiniz ne? (resmi)" },
            { de: "Ich bin Lehrer.", tr: "Ben öğretmenim." },
            { de: "Sie ist Ingenieurin.", tr: "O mühendir (kadın)." },
            { de: "Er ist Student.", tr: "O öğrenci." },
          ],
        },
        {
          icon: "🚫",
          heading: "kein / keine ile Olumsuzlama",
          body:
            "'kein' belirtisiz artikelli ya da artikelsiz isimleri olumsuzlar. Eril/nötr: 'kein', dişil ve çoğul: 'keine' biçimini alır.",
          examples: [
            { de: "Ich bin kein Arzt.", tr: "Ben doktor değilim." },
            { de: "Sie ist keine Lehrerin.", tr: "O öğretmen değil." },
            { de: "Er hat keine Arbeit.", tr: "Onun işi yok." },
          ],
        },
      ],
    },
    vocabulary: [
      { word: "der Arzt / die Ärztin", meaning: "doktor", partOfSpeech: "Nomen", example: "Meine Mutter ist Ärztin." },
      { word: "der Lehrer / die Lehrerin", meaning: "öğretmen", partOfSpeech: "Nomen", example: "Mein Vater ist Lehrer." },
      { word: "der Ingenieur / die Ingenieurin", meaning: "mühendis", partOfSpeech: "Nomen", example: "Er arbeitet als Ingenieur." },
      { word: "der Kellner / die Kellnerin", meaning: "garson", partOfSpeech: "Nomen", example: "Die Kellnerin bringt die Speisekarte." },
      { word: "der Student / die Studentin", meaning: "öğrenci (üniversite)", partOfSpeech: "Nomen", example: "Ich bin Student an der Uni Berlin." },
      { word: "der Verkäufer / die Verkäuferin", meaning: "satıcı", partOfSpeech: "Nomen", example: "Der Verkäufer hilft mir." },
      { word: "der Koch / die Köchin", meaning: "aşçı", partOfSpeech: "Nomen", example: "Meine Schwester ist Köchin." },
      { word: "der Beruf", meaning: "meslek", partOfSpeech: "Nomen", example: "Was ist dein Beruf?" },
      { word: "die Arbeit", meaning: "iş, çalışma", partOfSpeech: "Nomen", example: "Meine Arbeit beginnt um 8 Uhr." },
      {
        word: "arbeiten", meaning: "çalışmak", partOfSpeech: "Verb", example: "Ich arbeite bei einer Firma.",
        conjugation: [
          { pronoun: "ich", form: "arbeite" },
          { pronoun: "du", form: "arbeitest" },
          { pronoun: "er / sie / es", form: "arbeitet" },
          { pronoun: "wir", form: "arbeiten" },
          { pronoun: "ihr", form: "arbeitet" },
          { pronoun: "sie / Sie", form: "arbeiten" },
        ],
      },
      {
        word: "sein", meaning: "olmak", partOfSpeech: "Verb", example: "Ich bin Lehrer.",
        conjugation: [
          { pronoun: "ich", form: "bin" },
          { pronoun: "du", form: "bist" },
          { pronoun: "er / sie / es", form: "ist" },
          { pronoun: "wir", form: "sind" },
          { pronoun: "ihr", form: "seid" },
          { pronoun: "sie / Sie", form: "sind" },
        ],
      },
      { word: "kein / keine", meaning: "değil, hiç yok", partOfSpeech: "Artikel", example: "Ich bin kein Arzt." },
      { word: "von Beruf", meaning: "meslekten, meslek olarak", partOfSpeech: "Wendung", example: "Was sind Sie von Beruf?" },
    ],
    exercises: {
      multipleChoice: [
        {
          id: 1,
          question: "Kadın doktoru Almancada nasıl ifade ederiz?",
          options: ["die Arzt", "der Ärztin", "die Ärztin", "das Arzt"],
          correct: 2,
          explanation: "Kadın meslek adı: 'die Ärztin'. '-in' eki eklenir, sesli harf değişimi olur (Arzt → Ärztin).",
        },
        {
          id: 2,
          question: "'Ben öğretmen değilim.' cümlesinin doğru çevirisi hangisidir?",
          options: ["Ich bin nicht Lehrer.", "Ich bin kein Lehrer.", "Ich habe kein Lehrer.", "Ich bin keine Lehrer."],
          correct: 1,
          explanation: "Artikelsiz ismi olumsuzlamak için 'kein' kullanılır. 'der Lehrer' eril olduğundan 'kein Lehrer' doğrudur.",
        },
        {
          id: 3,
          question: "Meslek sormak için hangi soru doğrudur?",
          options: ["Was heißen Sie von Beruf?", "Was sind Sie von Beruf?", "Wie sind Sie von Beruf?", "Wo sind Sie von Beruf?"],
          correct: 1,
          explanation: "Meslek sormak için standart soru: 'Was sind Sie von Beruf?' (resmi) ya da 'Was bist du von Beruf?' (samimi).",
        },
        {
          id: 4,
          question: "'Ich ___ bei einer Firma.' — Boşluğa hangi fiil gelir?",
          options: ["bin", "habe", "arbeite", "heiße"],
          correct: 2,
          explanation: "'arbeiten' (çalışmak) fiilinin 'ich' çekimi 'arbeite'dir. 'bei einer Firma' = bir şirkette.",
        },
        {
          id: 5,
          question: "'Sie ist ___ Ingenieurin.' — O mühendis değil demek istiyoruz.",
          options: ["kein", "nicht", "keine", "nein"],
          correct: 2,
          explanation: "'die Ingenieurin' dişil olduğu için olumsuz artikeli 'keine'dir.",
        },
        {
          id: 6,
          question: "Kadın aşçı Almancada nasıl söylenir?",
          options: ["die Kochen", "die Köchin", "die Koch", "der Köchin"],
          correct: 1,
          explanation: "'der Koch' → 'die Köchin' (Umlaut değişimi: o → ö + '-in' eki).",
        },
        {
          id: 7,
          question: "Almancada meslek tanıtılırken article kullanılır mı?",
          options: [
            "Evet, her zaman 'der/die' ile",
            "Hayır, artikelsiz söylenir: 'Ich bin Lehrer'",
            "Sadece dişil mesleklerde kullanılır",
            "Sadece nötr mesleklerde kullanılır",
          ],
          correct: 1,
          explanation: "Almancada meslek belirtirken artikel kullanılmaz: 'Ich bin Lehrer' doğru, 'Ich bin ein Lehrer' yanlış.",
        },
        {
          id: 8,
          question: "'du arbeitest' ifadesinde 'du' hangi anlama gelir?",
          options: ["ben", "o", "sen", "siz"],
          correct: 2,
          explanation: "'du' = sen (samimi). 'arbeiten' fiilinin 'du' çekimi 'arbeitest'tir (-e eklenir çünkü kök t'ye biter).",
        },
        {
          id: 9,
          question: "'Ich bin kein Arzt.' cümlesi ne anlama gelir?",
          options: ["Ben doktorum.", "Ben doktor değilim.", "Doktor istiyorum.", "Doktora gidiyorum."],
          correct: 1,
          explanation: "'kein' olumsuzluk bildiren artikeldir. 'Ich bin kein Arzt' = Ben doktor değilim.",
        },
        {
          id: 10,
          question: "Bir kadın 'Ben mühendisim' demek istese ne söyler?",
          options: ["Ich bin Ingenieur.", "Ich bin Ingenieurin.", "Ich bin eine Ingenieurin.", "Ich habe Ingenieur."],
          correct: 1,
          explanation: "Kadın mühendis = Ingenieurin. Meslek belirtirken artikelsiz kullanılır.",
        },
      ],
      fillInBlank: [
        {
          id: 1,
          before: "Was sind Sie von ___?",
          after: "",
          answer: "Beruf",
          hint: "Meslek sormak için kullanılan kelime",
        },
        {
          id: 2,
          before: "Meine Mutter ist ___.",
          after: "(kadın öğretmen)",
          answer: "Lehrerin",
          hint: "Lehrer + -in eki",
        },
        {
          id: 3,
          before: "Ich bin ___ Arzt.",
          after: "(Ben doktor değilim.)",
          answer: "kein",
          hint: "eril ismi olumsuzlayan artikel",
        },
        {
          id: 4,
          before: "Mein Bruder ___ als Koch.",
          after: "(çalışıyor)",
          answer: "arbeitet",
          hint: "arbeiten → er/sie/es formu",
        },
        {
          id: 5,
          before: "Die ___ bringt die Speisekarte.",
          after: "(kadın garson)",
          answer: "Kellnerin",
          hint: "Kellner + -in eki",
        },
      ],
    },
  },

  // ─── A1 Ünite 3 ──────────────────────────────────────────────────────────

  "Bölüm 1: Gıda ve İçecekler": {
    title: "Gıda ve İçecekler",
    description: "Almancada temel gıda maddeleri, içecekler ve grammatikal Akkusativ hali",
    theory: {
      intro:
        "Almancada satın alma ve yeme içme söz konusu olduğunda nesneler Akkusativ (belirtme hali) alır. Eril 'der' → 'den' ve belirsiz 'ein' → 'einen' değişir; dişil ve nötr değişmez.",
      sections: [
        {
          icon: "🍎",
          heading: "Temel Gıda ve İçecek Kelimeleri",
          body:
            "Markette en çok kullanılan gıda ve içecek kelimeleri. Her kelimeyi artikeli ile öğrenin çünkü Akkusativ değişimi eril artikelde görülür.",
          examples: [
            { de: "der Apfel / die Äpfel", tr: "elma / elmalar" },
            { de: "das Brot", tr: "ekmek" },
            { de: "die Milch", tr: "süt" },
            { de: "der Kaffee", tr: "kahve" },
            { de: "das Wasser", tr: "su" },
          ],
        },
        {
          icon: "📦",
          heading: "Akkusativ: Nesne Hali",
          body:
            "Bir nesneyi satın aldığınızda ya da yediğinizde fiil 'kaufen' veya 'essen/trinken' kullanılır ve nesne Akkusativ alır. Sadece eril artikelde değişim olur: der → den, ein → einen.",
          examples: [
            { de: "Ich kaufe den Apfel.", tr: "Elmayı satın alıyorum. (der → den)" },
            { de: "Ich kaufe einen Apfel.", tr: "Bir elma satın alıyorum. (ein → einen)" },
            { de: "Ich esse das Brot.", tr: "Ekmeği yiyorum. (nötr, değişmez)" },
            { de: "Ich trinke die Milch.", tr: "Sütü içiyorum. (dişil, değişmez)" },
          ],
        },
        {
          icon: "⚖️",
          heading: "Miktar İfadeleri",
          body:
            "Miktarları ifade etmek için sayılar ve ölçü birimleri kullanılır. Ölçü birimi sonrası gıda adı değişmez (artikelsiz kullanılır).",
          examples: [
            { de: "ein Kilo Äpfel", tr: "bir kilo elma" },
            { de: "eine Flasche Wasser", tr: "bir şişe su" },
            { de: "ein Liter Milch", tr: "bir litre süt" },
            { de: "zwei Scheiben Brot", tr: "iki dilim ekmek" },
          ],
        },
        {
          icon: "📊",
          heading: "Temel Gıda Kelime Tablosu",
          body: "En sık kullanılan gıda ve içecek kelimeleri artikelleriyle birlikte:",
          table: {
            headers: ["Artikel", "Almanca", "Türkçe", "Çoğul"],
            rows: [
              ["der", "Apfel", "elma", "die Äpfel"],
              ["das", "Brot", "ekmek", "die Brote"],
              ["die", "Milch", "süt", "(tekil)"],
              ["der", "Kaffee", "kahve", "die Kaffees"],
              ["das", "Wasser", "su", "(tekil)"],
              ["der", "Käse", "peynir", "(tekil)"],
              ["das", "Fleisch", "et", "(tekil)"],
              ["das", "Ei", "yumurta", "die Eier"],
              ["die", "Tomate", "domates", "die Tomaten"],
              ["die", "Butter", "tereyağı", "(tekil)"],
            ],
          },
        },
        {
          icon: "🔄",
          heading: "Akkusativ Değişim Tablosu",
          body: "Satın alma veya yeme/içme eylemlerinde nesne Akkusativ alır. Sadece eril artikelde değişim vardır:",
          table: {
            headers: ["Cinsiyet", "Nominativ", "Akkusativ", "Değişim"],
            rows: [
              ["Eril (der)", "der Apfel", "den Apfel", "✓ der → den"],
              ["Eril bel.siz (ein)", "ein Apfel", "einen Apfel", "✓ ein → einen"],
              ["Dişil (die)", "die Milch", "die Milch", "✗ değişmez"],
              ["Nötr (das)", "das Brot", "das Brot", "✗ değişmez"],
            ],
          },
        },
      ],
    },
    vocabulary: [
      { word: "der Apfel", meaning: "elma", partOfSpeech: "Nomen", example: "Ich esse jeden Tag einen Apfel." },
      { word: "das Brot", meaning: "ekmek", partOfSpeech: "Nomen", example: "Wir kaufen frisches Brot." },
      { word: "die Milch", meaning: "süt", partOfSpeech: "Nomen", example: "Ich trinke morgens Milch." },
      { word: "der Kaffee", meaning: "kahve", partOfSpeech: "Nomen", example: "Er trinkt jeden Morgen Kaffee." },
      { word: "das Wasser", meaning: "su", partOfSpeech: "Nomen", example: "Bitte ein Glas Wasser!" },
      { word: "der Käse", meaning: "peynir", partOfSpeech: "Nomen", example: "Ich mag Käse sehr." },
      { word: "das Fleisch", meaning: "et", partOfSpeech: "Nomen", example: "Er isst kein Fleisch." },
      { word: "das Gemüse", meaning: "sebze", partOfSpeech: "Nomen", example: "Gemüse ist gesund." },
      { word: "die Tomate", meaning: "domates", partOfSpeech: "Nomen", example: "Ich kaufe ein Kilo Tomaten." },
      { word: "das Ei", meaning: "yumurta", partOfSpeech: "Nomen", example: "Ich esse zwei Eier zum Frühstück." },
      { word: "die Butter", meaning: "tereyağı", partOfSpeech: "Nomen", example: "Ich kaufe Brot und Butter." },
      { word: "der Tee", meaning: "çay", partOfSpeech: "Nomen", example: "Ich trinke lieber Tee als Kaffee." },
      {
        word: "kaufen", meaning: "satın almak", partOfSpeech: "Verb", example: "Ich kaufe Brot und Milch.",
        conjugation: [
          { pronoun: "ich", form: "kaufe" },
          { pronoun: "du", form: "kaufst" },
          { pronoun: "er / sie / es", form: "kauft" },
          { pronoun: "wir", form: "kaufen" },
          { pronoun: "ihr", form: "kauft" },
          { pronoun: "sie / Sie", form: "kaufen" },
        ],
      },
      {
        word: "essen", meaning: "yemek (düzensiz!)", partOfSpeech: "Verb", example: "Was essen Sie zum Frühstück?",
        conjugation: [
          { pronoun: "ich", form: "esse" },
          { pronoun: "du", form: "isst ⚠️" },
          { pronoun: "er / sie / es", form: "isst ⚠️" },
          { pronoun: "wir", form: "essen" },
          { pronoun: "ihr", form: "esst" },
          { pronoun: "sie / Sie", form: "essen" },
        ],
      },
      {
        word: "trinken", meaning: "içmek", partOfSpeech: "Verb", example: "Ich trinke Wasser.",
        conjugation: [
          { pronoun: "ich", form: "trinke" },
          { pronoun: "du", form: "trinkst" },
          { pronoun: "er / sie / es", form: "trinkt" },
          { pronoun: "wir", form: "trinken" },
          { pronoun: "ihr", form: "trinkt" },
          { pronoun: "sie / Sie", form: "trinken" },
        ],
      },
    ],
    exercises: {
      multipleChoice: [
        {
          id: 1,
          question: "'Ich kaufe ___ Apfel.' — Akkusativ'de eril belirsiz artikel ne olur?",
          options: ["ein", "einen", "der", "den"],
          correct: 1,
          explanation: "Eril belirsiz artikel Akkusativ'de 'ein' → 'einen' olur. 'Ich kaufe einen Apfel.'",
        },
        {
          id: 2,
          question: "'die Milch' Akkusativ'de nasıl değişir?",
          options: ["den Milch", "die Milch", "der Milch", "das Milch"],
          correct: 1,
          explanation: "Dişil isimler Akkusativ'de değişmez. 'die Milch' olarak kalır.",
        },
        {
          id: 3,
          question: "Almancada 'bir şişe su' nasıl denir?",
          options: ["ein Liter Wasser", "eine Scheibe Wasser", "eine Flasche Wasser", "ein Kilo Wasser"],
          correct: 2,
          explanation: "'eine Flasche Wasser' = bir şişe su. 'Flasche' = şişe, 'Liter' = litre, 'Scheibe' = dilim.",
        },
        {
          id: 4,
          question: "'Ich ___ keinen Kaffee.' — Doğru fiil hangisi?",
          options: ["esse", "trinke", "kaufe", "habe"],
          correct: 1,
          explanation: "Kahve içilir, yenmez. 'trinken' = içmek. 'Ich trinke keinen Kaffee.'",
        },
        {
          id: 5,
          question: "'Er isst kein Fleisch.' — Bu cümle ne anlama gelir?",
          options: ["O çok et yiyor.", "O et satın alıyor.", "O et yemiyor.", "Onun eti yok."],
          correct: 2,
          explanation: "'kein Fleisch essen' = et yememek. 'kein' olumsuzluk bildirir.",
        },
        {
          id: 6,
          question: "'das Wasser' Akkusativ'de nasıl kullanılır?",
          options: ["den Wasser", "das Wasser", "dem Wasser", "die Wasser"],
          correct: 1,
          explanation: "Nötr isimler Akkusativ'de değişmez. 'das Wasser' olarak kalır.",
        },
        {
          id: 7,
          question: "Almancada 'yumurta' kelimesinin çoğulu nedir?",
          options: ["die Eier", "die Eis", "die Eien", "die Eier"],
          correct: 0,
          explanation: "'das Ei' → 'die Eier' (-er eki alır). Çoğulda her zaman 'die' artikeli kullanılır.",
        },
        {
          id: 8,
          question: "'Ich ___ keinen Tee.' — Boşluğa hangi fiil gelir?",
          options: ["esse", "kaufe", "trinke", "mache"],
          correct: 2,
          explanation: "Çay içilir: 'trinken' = içmek. 'Ich trinke keinen Tee.' = Çay içmiyorum.",
        },
        {
          id: 9,
          question: "'zwei Scheiben Brot' ne anlama gelir?",
          options: ["iki dilim ekmek", "iki şişe ekmek", "iki kilo ekmek", "iki parça ekmek"],
          correct: 0,
          explanation: "'Scheibe' = dilim. 'zwei Scheiben Brot' = iki dilim ekmek.",
        },
        {
          id: 10,
          question: "'Ich kaufe ___ Käse.' — Peynir nötr müdür?",
          options: ["den", "die", "das", "der"],
          correct: 2,
          explanation: "'der Käse' erildir, Akkusativ'de 'den Käse' olur. Doğru cevap 'den'dir ama bu seçenekte 'den' yoksa dikkat — 'der Käse' erildir!",
        },
      ],
      fillInBlank: [
        {
          id: 1,
          before: "Ich kaufe ___ Apfel. (bir elma)",
          after: "",
          answer: "einen",
          hint: "eril belirsiz artikel Akkusativ'de",
        },
        {
          id: 2,
          before: "Wir kaufen ein ___ Milch.",
          after: "(bir litre süt)",
          answer: "Liter",
          hint: "litre = ?",
        },
        {
          id: 3,
          before: "Was ___ Sie zum Frühstück?",
          after: "(Kahvaltıda ne yiyorsunuz?)",
          answer: "essen",
          hint: "yemek fiili (Sie formu)",
        },
        {
          id: 4,
          before: "Ich ___ jeden Morgen Kaffee.",
          after: "(Her sabah kahve içiyorum.)",
          answer: "trinke",
          hint: "içmek → ich formu",
        },
        {
          id: 5,
          before: "Eine ___ Wasser, bitte.",
          after: "(Bir şişe su, lütfen.)",
          answer: "Flasche",
          hint: "şişe = ?",
        },
      ],
    },
  },

  "Bölüm 2: Restoranda": {
    title: "Restoranda",
    description: "Restoranda sipariş verme, mögen ve möchten arasındaki fark, hesap isteme",
    theory: {
      intro:
        "Restoranda Almanca konuşmak için iki temel fiili ayırt etmek gerekir: 'mögen' genel sevgiyi, 'möchten' ise anlık isteği ifade eder. Restoran diyaloglarında 'möchten' çok daha sık kullanılır.",
      sections: [
        {
          icon: "☕",
          heading: "mögen ve möchten Farkı",
          body:
            "'Ich mag Pasta.' = 'Makarnayı severim.' (genel bir sevgi). 'Ich möchte Pasta.' = 'Makarna istiyorum.' (şu an, o öğün için). Restoranda sipariş verirken 'möchten' tercih edin.",
          examples: [
            { de: "Ich mag Schokolade.", tr: "Cikolatadan hoslaniyorum. (genel)" },
            { de: "Ich mag keinen Kaffee.", tr: "Kahveden hoslanmiyorum." },
            { de: "Ich mochte einen Tee, bitte.", tr: "Bir cay istiyorum, lutfen. (anlık)" },
            { de: "Was mochten Sie trinken?", tr: "Ne icmek istersiniz?" },
          ],
          table: {
            headers: ["Şahıs", "mögen (sevmek)", "möchten (istemek)"],
            rows: [
              ["ich", "mag", "möchte"],
              ["du", "magst", "möchtest"],
              ["er / sie / es", "mag", "möchte"],
              ["wir", "mögen", "möchten"],
              ["ihr", "mögt", "möchtet"],
              ["sie / Sie", "mögen", "möchten"],
            ],
          },
        },
        {
          icon: "🍽️",
          heading: "Sipariş Verme Kalıpları",
          body:
            "Restoranda garsonla konuşurken kibarca sipariş verin. 'Ich mochte...' veya 'Bringen Sie mir bitte...' gibi kalıplar yaygındır.",
          examples: [
            { de: "Ich mochte eine Suppe, bitte.", tr: "Bir corba istiyorum, lutfen." },
            { de: "Bringen Sie mir bitte ein Wasser.", tr: "Bana bir su getirir misiniz, lutfen." },
            { de: "Was empfehlen Sie?", tr: "Ne tavsiye edersiniz?" },
            { de: "Fur mich das Tagesmenu, bitte.", tr: "Benim icin gun menusu, lutfen." },
          ],
        },
        {
          icon: "💳",
          heading: "Hesap ve Ödeme",
          body:
            "Hesap istemek için 'Zahlen bitte!' veya 'Die Rechnung bitte!' denir. Almanya'da garson gelene kadar oturulur, el kaldırılarak isaret yapılır.",
          examples: [
            { de: "Zahlen bitte!", tr: "Hesap, lutfen!" },
            { de: "Die Rechnung bitte!", tr: "Hesabi getirir misiniz?" },
            { de: "Getrennt oder zusammen?", tr: "Ayri mi yoksa birlikte mi?" },
            { de: "Das stimmt so.", tr: "Ustu kalsın. (bahsis)" },
          ],
        },
      ],
    },
    vocabulary: [
      { word: "möchten", meaning: "istemek (anlık)", partOfSpeech: "Modalverb", example: "Ich mochte einen Kaffee." },
      { word: "mögen", meaning: "sevmek, hoşlanmak", partOfSpeech: "Modalverb", example: "Ich mag Schokolade." },
      { word: "die Speisekarte", meaning: "menü, yemek listesi", partOfSpeech: "Nomen", example: "Konnen wir die Speisekarte haben?" },
      { word: "bestellen", meaning: "sipariş vermek", partOfSpeech: "Verb", example: "Ich mochte jetzt bestellen." },
      { word: "die Rechnung", meaning: "hesap, fatura", partOfSpeech: "Nomen", example: "Die Rechnung bitte!" },
      { word: "der Kellner", meaning: "garson (erkek)", partOfSpeech: "Nomen", example: "Der Kellner kommt sofort." },
      { word: "das Tagesmenu", meaning: "günün menüsü", partOfSpeech: "Nomen", example: "Das Tagesmenu kostet 12 Euro." },
      { word: "empfehlen", meaning: "tavsiye etmek", partOfSpeech: "Verb", example: "Was empfehlen Sie heute?" },
      { word: "zahlen", meaning: "ödemek", partOfSpeech: "Verb", example: "Ich mochte zahlen, bitte." },
      { word: "zusammen", meaning: "birlikte", partOfSpeech: "Adverb", example: "Zahlen wir zusammen oder getrennt?" },
    ],
    exercises: {
      multipleChoice: [
        {
          id: 1,
          question: "Restoranda 'bir çay istiyorum' demek için hangi cümle doğrudur?",
          options: [
            "Ich mag einen Tee.",
            "Ich mochte einen Tee, bitte.",
            "Ich habe einen Tee.",
            "Ich esse einen Tee.",
          ],
          correct: 1,
          explanation: "'mochten' anlık istek için kullanılır. Restoranda sipariş: 'Ich mochte einen Tee, bitte.'",
        },
        {
          id: 2,
          question: "'Ich mag keinen Kaffee.' ne anlama gelir?",
          options: [
            "Kahvem yok.",
            "Kahve istemiyorum (anlık).",
            "Kahveden hoşlanmıyorum (genel).",
            "Kahve içmem yasak.",
          ],
          correct: 2,
          explanation: "'mogen' genel sevgi/hoşlanmayı ifade eder. 'Ich mag keinen Kaffee' = kahveden genel olarak hoşlanmıyorum.",
        },
        {
          id: 3,
          question: "Hesap istemek için ne söylersiniz?",
          options: ["Bringen Sie mir bitte Wasser.", "Was empfehlen Sie?", "Zahlen bitte!", "Guten Appetit!"],
          correct: 2,
          explanation: "'Zahlen bitte!' veya 'Die Rechnung bitte!' hesap istemek için kullanılır.",
        },
        {
          id: 4,
          question: "'Getrennt oder zusammen?' ne anlama gelir?",
          options: [
            "Sıcak mı soğuk mu?",
            "Ayrı mı birlikte mi? (ödeme)",
            "İçmek ister misiniz?",
            "Büyük mü küçük mü?",
          ],
          correct: 1,
          explanation: "Hesap ödenirken garson 'Getrennt oder zusammen?' diye sorar: herkes kendi hesabını mı yoksa birlikte mi ödeyecek?",
        },
        {
          id: 5,
          question: "'Was ___ Sie?' — Garson ne tavsiye ediyor sorusu",
          options: ["mogen", "empfehlen", "bestellen", "zahlen"],
          correct: 1,
          explanation: "'Was empfehlen Sie?' = Ne tavsiye edersiniz? 'empfehlen' tavsiye etmek anlamına gelir.",
        },
        {
          id: 6,
          question: "'Ich mag Schokolade.' ile 'Ich mochte Schokolade.' arasındaki fark nedir?",
          options: [
            "Hiç fark yok, aynı anlama gelir.",
            "'mag' anlık isteği, 'mochte' genel sevgiyi ifade eder.",
            "'mag' genel sevgiyi, 'mochte' anlık isteği ifade eder.",
            "'mag' olumsuz, 'mochte' olumludur.",
          ],
          correct: 2,
          explanation: "'mögen' → genel sevgi/hoşlanma. 'möchten' → şu anda istemek. Restoranda 'möchten' kullanılır.",
        },
        {
          id: 7,
          question: "Kibarca sipariş vermek için hangi kalıp kullanılır?",
          options: [
            "Ich will eine Pizza!",
            "Bringen Sie mir bitte eine Pizza.",
            "Ich habe Hunger.",
            "Pizza bitte sofort!",
          ],
          correct: 1,
          explanation: "'Bringen Sie mir bitte...' kibar bir sipariş kalıbıdır. 'ich will' daha doğrudan ve az kibar sayılır.",
        },
        {
          id: 8,
          question: "Almancada 'Das stimmt so.' ne anlama gelir?",
          options: ["Bu doğru değil.", "Üstü kalsın. (bahşiş)", "Fatura yanlış.", "Birlikte ödüyoruz."],
          correct: 1,
          explanation: "'Das stimmt so.' = Para üstü almak istemiyorum, bahşiş olarak bırakıyorum.",
        },
        {
          id: 9,
          question: "'die Speisekarte' ne demektir?",
          options: ["fatura", "garson", "menü / yemek listesi", "günün yemeği"],
          correct: 2,
          explanation: "'die Speisekarte' = yemek listesi, menü. 'Konnen wir die Speisekarte haben?' = Menüyü alabilir miyiz?",
        },
        {
          id: 10,
          question: "'Fur mich das Tagesgericht, bitte.' ne anlama gelir?",
          options: [
            "Günün çorbasını istiyorum.",
            "Benim için günün yemeği, lütfen.",
            "Bugün ne var?",
            "Hesabı getirir misiniz?",
          ],
          correct: 1,
          explanation: "'fur mich' = benim için. 'das Tagesgericht / Tagesmenü' = günün yemeği/menüsü.",
        },
      ],
      fillInBlank: [
        {
          id: 1,
          before: "Ich ___ eine Suppe, bitte.",
          after: "(istiyorum - anlık)",
          answer: "mochte",
          hint: "anlık istek icin modal fiil",
        },
        {
          id: 2,
          before: "Die ___ bitte!",
          after: "(hesabı getirir misiniz?)",
          answer: "Rechnung",
          hint: "hesap, fatura",
        },
        {
          id: 3,
          before: "___ oder zusammen?",
          after: "(ayrı mı birlikte mi?)",
          answer: "Getrennt",
          hint: "ayri demek",
        },
        {
          id: 4,
          before: "Was ___ Sie heute?",
          after: "(Ne tavsiye edersiniz?)",
          answer: "empfehlen",
          hint: "tavsiye etmek fiili (Sie formu)",
        },
        {
          id: 5,
          before: "Ich ___ Schokolade. (genel sevgi)",
          after: "",
          answer: "mag",
          hint: "mögen → ich formu",
        },
      ],
    },
  },

  "Bölüm 3: Alışveriş Diyaloğu": {
    title: "Alışveriş Diyaloğu",
    description: "Markette ve pazarda alışveriş yapma, fiyat sorma ve çoğul formlar",
    theory: {
      intro:
        "Almancada alışveriş yaparken fiyat sormak, miktar belirtmek ve çoğul formları doğru kullanmak gerekir. Çoğul ekler düzensizdir ve her kelimeyle birlikte öğrenilmelidir.",
      sections: [
        {
          icon: "💰",
          heading: "Fiyat Sorma ve Söyleme",
          body:
            "Fiyat sormak için 'Was kostet...?' ya da 'Wie viel kostet...?' kalıpları kullanılır. Fiyatlar Euro ve Cent olarak söylenir.",
          examples: [
            { de: "Was kostet das?", tr: "Bu ne kadar?" },
            { de: "Wie viel kostet ein Kilo Äpfel?", tr: "Bir kilo elma ne kadar?" },
            { de: "Das kostet zwei Euro.", tr: "Bu iki Euro." },
            { de: "Das macht 5 Euro 50.", tr: "Bu 5 Euro 50 eder." },
          ],
        },
        {
          icon: "🛒",
          heading: "Alışveriş Kalıpları",
          body:
            "Markette kullanılan temel kalıplar. 'Ich haette gern...' (... isterdim) kibarca sipariş vermenin nazik biçimidir.",
          examples: [
            { de: "Ich haette gern ein Kilo Tomaten.", tr: "Bir kilo domates istiyorum (kibarca)." },
            { de: "Haben Sie auch Erdbeeren?", tr: "Çilek de var mı?" },
            { de: "Darf es etwas mehr sein?", tr: "Biraz daha olabilir mi? (tezgahtar)" },
            { de: "Das ist alles, danke.", tr: "Hepsi bu, teşekkürler." },
          ],
        },
        {
          icon: "📚",
          heading: "Düzensiz Çoğullar",
          body:
            "Almancada çoğul ekler düzensizdir. En yaygın çoğul formları: -(e), -e, -er, -n/-en, -s. Çoğulda her zaman 'die' artikeli kullanılır.",
          examples: [
            { de: "der Apfel → die Äpfel", tr: "elma → elmalar (-Umlaut)" },
            { de: "die Tomate → die Tomaten", tr: "domates → domatesler (-n)" },
            { de: "das Brot → die Brote", tr: "ekmek → ekmekler (-e)" },
            { de: "der Mann → die Männer", tr: "adam → adamlar (-er +Umlaut)" },
          ],
          table: {
            headers: ["Tekil", "Artikel", "Çoğul", "Ek"],
            rows: [
              ["Apfel", "der", "die Äpfel", "Umlaut"],
              ["Tomate", "die", "die Tomaten", "-n"],
              ["Brot", "das", "die Brote", "-e"],
              ["Mann", "der", "die Männer", "-er +Umlaut"],
              ["Ei", "das", "die Eier", "-er"],
              ["Frau", "die", "die Frauen", "-en"],
              ["Kind", "das", "die Kinder", "-er"],
              ["Auto", "das", "die Autos", "-s"],
            ],
          },
        },
      ],
    },
    vocabulary: [
      { word: "kosten", meaning: "mal olmak, fiyatı olmak", partOfSpeech: "Verb", example: "Was kostet das Brot?" },
      { word: "der Markt", meaning: "pazar, market", partOfSpeech: "Nomen", example: "Samstags gehe ich auf den Markt." },
      { word: "die Tomate", meaning: "domates", partOfSpeech: "Nomen", example: "Ich kaufe ein Kilo Tomaten." },
      { word: "die Erdbeere", meaning: "çilek", partOfSpeech: "Nomen", example: "Die Erdbeeren sind frisch." },
      { word: "das Kilo", meaning: "kilo", partOfSpeech: "Nomen", example: "Ein Kilo Apfel kostet 2 Euro." },
      { word: "der Euro", meaning: "Euro (para birimi)", partOfSpeech: "Nomen", example: "Das kostet drei Euro." },
      { word: "billig", meaning: "ucuz", partOfSpeech: "Adjektiv", example: "Das Brot ist sehr billig." },
      { word: "teuer", meaning: "pahalı", partOfSpeech: "Adjektiv", example: "Das Fleisch ist teuer." },
      { word: "frisch", meaning: "taze", partOfSpeech: "Adjektiv", example: "Die Tomaten sind frisch." },
      { word: "alles", meaning: "hepsi, her şey", partOfSpeech: "Pronomen", example: "Das ist alles, danke." },
    ],
    exercises: {
      multipleChoice: [
        {
          id: 1,
          question: "Bir şeyin fiyatını sormak için hangi soru kullanılır?",
          options: ["Wie heißt das?", "Was kostet das?", "Wo ist das?", "Wann ist das?"],
          correct: 1,
          explanation: "'Was kostet das?' veya 'Wie viel kostet das?' fiyat sormak için kullanılır.",
        },
        {
          id: 2,
          question: "'die Tomate' çoğulu nedir?",
          options: ["die Tomate", "die Tomaten", "die Tomaten", "die Tomateer"],
          correct: 1,
          explanation: "'die Tomate' çoğulu 'die Tomaten'dir (-n eki alır). Çoğulda artikel her zaman 'die'dir.",
        },
        {
          id: 3,
          question: "'Das macht 5 Euro 50.' ne anlama gelir?",
          options: ["Bu 5 Euro 50 değerinde.", "5 Euro 50 yaptım.", "Bunu 5 Euro 50'ye yapıyorum.", "Bu 5 Euro 50 eder."],
          correct: 3,
          explanation: "'Das macht...' = toplamı, tutarı ifade eder. 'Das macht 5 Euro 50' = Bu 5 Euro 50 eder.",
        },
        {
          id: 4,
          question: "'Haben Sie auch Erdbeeren?' ne anlama gelir?",
          options: ["Çilek ister misiniz?", "Çilek de var mı?", "Çilek nerede?", "Çilek beğendiniz mi?"],
          correct: 1,
          explanation: "'Haben Sie auch...?' = ... de var mı? Mağazada ürün sorarken kullanılır.",
        },
        {
          id: 5,
          question: "Almancada 'pahalı' kelimesi hangisidir?",
          options: ["billig", "frisch", "teuer", "lecker"],
          correct: 2,
          explanation: "'teuer' = pahalı. 'billig' = ucuz, 'frisch' = taze, 'lecker' = lezzetli.",
        },
        {
          id: 6,
          question: "'Ich haette gern...' kalıbı ne işe yarar?",
          options: [
            "Fiyat sormak için",
            "Kibarca bir şey istemek için",
            "Olumsuz bir şey söylemek için",
            "Çoğul sormak için",
          ],
          correct: 1,
          explanation: "'Ich hätte gern...' = kibarca 'istiyorum' demek. 'Ich hätte gern ein Kilo Tomaten.' = Bir kilo domates istiyorum.",
        },
        {
          id: 7,
          question: "'das Brot' çoğulu nedir?",
          options: ["die Brot", "die Brote", "die Broten", "die Bröte"],
          correct: 1,
          explanation: "'das Brot' → 'die Brote' (-e eki). Çoğulda artikel her zaman 'die'dir.",
        },
        {
          id: 8,
          question: "'Darf es etwas mehr sein?' — Bu cümleyi kim söyler?",
          options: ["Müşteri fiyat sorarken", "Tezgahtar/satıcı fazladan öneride bulunurken", "Kasiyer para üstü verirken", "Müşteri ürünü iade ederken"],
          correct: 1,
          explanation: "'Darf es etwas mehr sein?' = Biraz daha olabilir mi? Satıcı/tezgahtar tartarken biraz fazla olduğunda sorar.",
        },
        {
          id: 9,
          question: "Almancada çoğul için hangi artikel kullanılır?",
          options: ["der", "die", "das", "ein"],
          correct: 1,
          explanation: "Almancada her cinsten ismin çoğulunda artikel 'die'dir. 'der Mann' → 'die Männer', 'das Kind' → 'die Kinder'.",
        },
        {
          id: 10,
          question: "'Was kostet ein Kilo Äpfel?' sorusuna hangi cevap uygundur?",
          options: [
            "Ja, sehr frisch.",
            "Das macht 2 Euro 50.",
            "Haben Sie auch Orangen?",
            "Das ist alles.",
          ],
          correct: 1,
          explanation: "Fiyat sorusuna fiyat cevabı verilir. 'Das macht 2 Euro 50.' = Bu 2 Euro 50 eder.",
        },
      ],
      fillInBlank: [
        {
          id: 1,
          before: "Was ___ das Brot?",
          after: "(Ekmek ne kadar?)",
          answer: "kostet",
          hint: "fiyatı olmak fiili (es/das formu)",
        },
        {
          id: 2,
          before: "Ich haette gern ein Kilo ___.",
          after: "(Bir kilo domates istiyorum.)",
          answer: "Tomaten",
          hint: "domates coğulu",
        },
        {
          id: 3,
          before: "Das ist ___, danke.",
          after: "(Hepsi bu, teşekkürler.)",
          answer: "alles",
          hint: "hepsi, her sey",
        },
        {
          id: 4,
          before: "Haben Sie auch ___?",
          after: "(Çilek de var mı?)",
          answer: "Erdbeeren",
          hint: "çilek çoğulu",
        },
        {
          id: 5,
          before: "Das ___ 5 Euro.",
          after: "(Bu 5 Euro eder.)",
          answer: "macht",
          hint: "eder, tutar → machen",
        },
      ],
    },
  },

  // ─── A1 Ünite 4 ──────────────────────────────────────────────────────────

  "Bölüm 1: Saat Kaç?": {
    title: "Saatler",
    description: "Almancada resmi ve günlük saat ifadeleri, 'um' edatı ve zaman sorma",
    theory: {
      intro:
        "Almancada saat söylemenin iki yolu vardır: resmi (24 saat formatı) ve gayriresmi (yarım saat, çeyrek saat sistemleri). Özellikle 'halb' (yarım) kelimesine dikkat edin: 'halb drei' = 2:30, 3:30 değil!",
      sections: [
        {
          heading: "Resmi Saat Söyleme",
          body:
            "Tren, uçak ve resmi ortamlarda 24 saat formatı kullanılır. 'Uhr' kelimesi saati belirtir.",
          examples: [
            { de: "Es ist 8 Uhr.", tr: "Saat 8:00." },
            { de: "Es ist 14 Uhr 30.", tr: "Saat 14:30." },
            { de: "Der Zug faehrt um 9 Uhr 15 ab.", tr: "Tren 9:15'te hareket ediyor." },
            { de: "Die Besprechung beginnt um 16 Uhr.", tr: "Toplantı saat 16'da başlıyor." },
          ],
        },
        {
          heading: "Gayriresmi Saat Söyleme",
          body:
            "Günlük konuşmada 12 saat sistemi kullanılır. 'halb' = yarım, 'Viertel' = çeyrek. Dikkat: 'halb drei' = 'uçün yarısı' yani 2:30! Türkçe mantığından farklıdır.",
          examples: [
            { de: "Es ist halb drei.", tr: "Saat 2:30. (ucun yarisi!)" },
            { de: "Es ist Viertel nach sieben.", tr: "Saat 7:15. (yediyi 15 gecince)" },
            { de: "Es ist Viertel vor acht.", tr: "Saat 7:45. (sekize 15 kala)" },
            { de: "Es ist zehn nach sechs.", tr: "Saat 6:10. (altiyi 10 gecince)" },
          ],
        },
        {
          heading: "Saat Sorma ve um Edatı",
          body:
            "Saati sormak için 'Wie viel Uhr ist es?' ya da 'Wie spaet ist es?' kullanılır. Belirli bir saatte gerçekleşen eylemlerde 'um' edatı kullanılır.",
          examples: [
            { de: "Wie viel Uhr ist es?", tr: "Saat kac?" },
            { de: "Wie spaet ist es?", tr: "Saat kac? (alternatif)" },
            { de: "Ich stehe um 7 Uhr auf.", tr: "Saat 7'de kalkiyorum." },
            { de: "Der Film beginnt um halb acht.", tr: "Film 7:30'da basliyor." },
          ],
        },
      ],
    },
    vocabulary: [
      { word: "die Uhr", meaning: "saat (nesne / zaman)", partOfSpeech: "Nomen", example: "Wie viel Uhr ist es?" },
      { word: "halb", meaning: "yarım (saat için)", partOfSpeech: "Adjektiv", example: "Es ist halb neun. (8:30)" },
      { word: "das Viertel", meaning: "çeyrek", partOfSpeech: "Nomen", example: "Es ist Viertel nach drei." },
      { word: "nach", meaning: "sonra, geçe (saat)", partOfSpeech: "Praeposition", example: "zehn nach fuenf = 5:10" },
      { word: "vor", meaning: "önce, kala (saat)", partOfSpeech: "Praeposition", example: "zehn vor sechs = 5:50" },
      { word: "um", meaning: "-de/-da (saat için)", partOfSpeech: "Praeposition", example: "um 8 Uhr = saat 8'de" },
      { word: "beginnen", meaning: "başlamak", partOfSpeech: "Verb", example: "Der Unterricht beginnt um 9 Uhr." },
      { word: "aufstehen", meaning: "kalkmak (yataktan)", partOfSpeech: "Verb (trennbar)", example: "Ich stehe um 7 Uhr auf." },
      { word: "pünktlich", meaning: "zamanında, dakik", partOfSpeech: "Adjektiv", example: "Bitte sei pünktlich!" },
      { word: "spät", meaning: "geç", partOfSpeech: "Adjektiv", example: "Es ist schon sehr spaet." },
    ],
    exercises: {
      multipleChoice: [
        {
          id: 1,
          question: "'halb drei' saat kaçtır?",
          options: ["3:30", "2:30", "3:15", "2:45"],
          correct: 1,
          explanation: "'halb drei' = 'ucun yarisi', yani 3:00'ten 30 dakika oncesi = 2:30. Dikkat: Almancada 'halb' bir sonraki saatin yarısını ifade eder!",
        },
        {
          id: 2,
          question: "Saat 7:45'i Almancada nasıl söyleriz?",
          options: ["Viertel nach sieben", "halb acht", "Viertel vor acht", "zehn nach sieben"],
          correct: 2,
          explanation: "7:45 = sekize 15 dakika kala = 'Viertel vor acht'. 'Viertel' = çeyrek, 'vor' = önce/kala.",
        },
        {
          id: 3,
          question: "Saati sormak için hangi soru kullanılır?",
          options: ["Was ist die Uhr?", "Wie viel Uhr ist es?", "Wann Uhr?", "Wie Uhr ist?"],
          correct: 1,
          explanation: "Saat sormak için: 'Wie viel Uhr ist es?' veya 'Wie spaet ist es?'",
        },
        {
          id: 4,
          question: "'Der Unterricht beginnt ___ 9 Uhr.' — Boşluğa hangi edat gelir?",
          options: ["in", "an", "um", "zu"],
          correct: 2,
          explanation: "Belirli saatlerde 'um' edatı kullanılır: 'um 9 Uhr' = saat 9'da.",
        },
        {
          id: 5,
          question: "'zehn nach sechs' kaçtır?",
          options: ["5:50", "6:10", "6:50", "5:10"],
          correct: 1,
          explanation: "'zehn nach sechs' = altıyı 10 geçe = 6:10. 'nach' = geçe.",
        },
      ],
      fillInBlank: [
        {
          id: 1,
          before: "Wie viel ___ ist es?",
          after: "",
          answer: "Uhr",
          hint: "saat (nesne)",
        },
        {
          id: 2,
          before: "Ich stehe ___ 7 Uhr auf.",
          after: "(Saat 7'de kalkıyorum.)",
          answer: "um",
          hint: "saat icin kullanilan edat",
        },
        {
          id: 3,
          before: "Es ist ___ acht.",
          after: "(Saat 7:30.)",
          answer: "halb",
          hint: "yarım saat (8:00'in yarisi = 7:30)",
        },
      ],
    },
  },

  "Bölüm 2: Mein Tagesablauf": {
    title: "Günlük Rutin",
    description: "Ayrılabilen fiiller (trennbare Verben) ve günlük aktiviteleri anlatma",
    theory: {
      intro:
        "Günlük rutini anlatırken Almancada ayrılabilen fiiller (trennbare Verben) sıkça kullanılır. Bu fiillerin önekleri cümlenin en sonuna gider — bu kurala 'Satzklammer' denir.",
      sections: [
        {
          heading: "Ayrılabilen Fiiller (Trennbare Verben)",
          body:
            "auf-, an-, ab-, ein-, aus-, zu- gibi önekler fiille birleşir ama cümlede önek cümle sonuna taşınır. Örneğin: 'aufstehen' → 'Ich stehe auf.'",
          examples: [
            { de: "aufstehen → Ich stehe um 7 Uhr auf.", tr: "kalkmak → Saat 7'de kalkiyorum." },
            { de: "anziehen → Er zieht sich an.", tr: "giymek → O giyiniyor." },
            { de: "anfangen → Die Arbeit faengt um 9 an.", tr: "baslamak → Is saat 9'da basliyor." },
            { de: "einkaufen → Sie kauft samstags ein.", tr: "alisveris yapmak → Cumartesi alisveris yapiyor." },
          ],
        },
        {
          heading: "Günlük Rutin Fiilleri",
          body:
            "Sabahtan akşama kadar tipik Alman günlük rutininde kullanılan fiiller. Bunlar 'am Morgen', 'am Nachmittag', 'am Abend' gibi zaman ifadeleriyle birlikte kullanılır.",
          examples: [
            { de: "Ich fruehstuecke um 7:30.", tr: "Saat 7:30'da kahvalti yapiyorum." },
            { de: "Ich fahre mit dem Bus zur Arbeit.", tr: "Ise otobuisle gidiyorum." },
            { de: "Ich mache Mittagspause von 12 bis 13 Uhr.", tr: "12'den 1'e kadar ogle molasi yapiyorum." },
            { de: "Ich gehe um 23 Uhr schlafen.", tr: "Saat 23'te yatiyorum." },
          ],
        },
        {
          heading: "Zaman Bildiren İfadeler",
          body:
            "Günün bölümleri için 'am' edatı kullanılır (am Morgen, am Mittag, am Abend). Gece için ise 'in der Nacht' denir.",
          examples: [
            { de: "am Morgen", tr: "sabah" },
            { de: "am Mittag", tr: "ogle" },
            { de: "am Nachmittag", tr: "ogle sonrasi" },
            { de: "am Abend", tr: "aksam" },
            { de: "in der Nacht", tr: "gece" },
          ],
        },
      ],
    },
    vocabulary: [
      { word: "aufstehen", meaning: "kalkmak (yataktan)", partOfSpeech: "Verb (trennbar)", example: "Ich stehe um 6 Uhr auf." },
      { word: "frühstücken", meaning: "kahvaltı yapmak", partOfSpeech: "Verb", example: "Wir fruehstuecken zusammen." },
      { word: "sich anziehen", meaning: "giyinmek", partOfSpeech: "Verb (trennbar)", example: "Er zieht sich schnell an." },
      { word: "anfangen", meaning: "başlamak", partOfSpeech: "Verb (trennbar)", example: "Die Schule faengt um 8 an." },
      { word: "einkaufen", meaning: "alışveriş yapmak", partOfSpeech: "Verb (trennbar)", example: "Ich kaufe jeden Samstag ein." },
      { word: "schlafen gehen", meaning: "yatmak, uyumaya gitmek", partOfSpeech: "Wendung", example: "Ich gehe um 22 Uhr schlafen." },
      { word: "am Morgen", meaning: "sabah", partOfSpeech: "Wendung", example: "Am Morgen trinke ich Kaffee." },
      { word: "am Abend", meaning: "akşam", partOfSpeech: "Wendung", example: "Am Abend schaue ich fern." },
      { word: "fernsehen", meaning: "televizyon izlemek", partOfSpeech: "Verb (trennbar)", example: "Ich sehe am Abend fern." },
      { word: "die Pause", meaning: "mola, ara", partOfSpeech: "Nomen", example: "Wir machen eine Pause." },
    ],
    exercises: {
      multipleChoice: [
        {
          id: 1,
          question: "'aufstehen' fiilini 'ich' ile doğru çekin:",
          options: ["Ich aufstehe.", "Ich stehe auf.", "Ich aufstehen.", "Ich stehe aufstehe."],
          correct: 1,
          explanation: "Trennbare Verben'de önek cümle sonuna gider. 'aufstehen' → 'Ich stehe auf.'",
        },
        {
          id: 2,
          question: "'Die Arbeit ___ um 9 Uhr ___.' (anfangen) — Doğru form?",
          options: ["fangt...an", "anfangt...ab", "fangt...ab", "beginnt...an"],
          correct: 0,
          explanation: "'anfangen' trennbar fiil. 'er/es/sie' için: 'fangt' + önek sona: 'Die Arbeit faengt um 9 Uhr an.'",
        },
        {
          id: 3,
          question: "Günün 'öğle sonrası' bölümü Almancada nasıl söylenir?",
          options: ["am Morgen", "am Mittag", "am Nachmittag", "am Abend"],
          correct: 2,
          explanation: "'am Nachmittag' = öğle sonrası. 'am Mittag' = öğle, 'am Morgen' = sabah, 'am Abend' = akşam.",
        },
        {
          id: 4,
          question: "'Ich kaufe samstags ___.' — 'einkaufen' fiilinin öneki nereye gider?",
          options: ["ein (başa)", "ein (sona)", "ein (ortaya)", "hiçbir yere"],
          correct: 1,
          explanation: "Trennbare Verben'de önek her zaman cümle sonuna gider: 'Ich kaufe samstags ein.'",
        },
        {
          id: 5,
          question: "'Am Abend schaue ich ___.' (fernsehen) — Önek nedir?",
          options: ["fern", "schaue", "seh", "ab"],
          correct: 0,
          explanation: "'fernsehen' → önek 'fern' cümle sonuna gider: 'Ich schaue... fern.' = televizyon izliyorum.",
        },
      ],
      fillInBlank: [
        {
          id: 1,
          before: "Ich stehe um 7 Uhr ___.",
          after: "(kalkıyorum - aufstehen)",
          answer: "auf",
          hint: "aufstehen fiilinin oneki",
        },
        {
          id: 2,
          before: "___ Morgen fruehstuecke ich.",
          after: "(Sabah kahvaltı yapıyorum.)",
          answer: "Am",
          hint: "gunun bolumu icin kullanilan edat",
        },
        {
          id: 3,
          before: "Die Schule faengt ___ 8 Uhr an.",
          after: "(Okul saat 8'de başlıyor.)",
          answer: "um",
          hint: "belirli saat icin edat",
        },
      ],
    },
  },

  // ─── A1 Ünite 5 ──────────────────────────────────────────────────────────

  "Bölüm 1: Mit Bus und Bahn": {
    title: "Ulaşım Araçları",
    description: "Almancada ulaşım araçları, 'mit' edatı ve araç kullanımını ifade etme",
    theory: {
      intro:
        "Almanya'da toplu taşıma çok gelişmiştir. U-Bahn (metro), S-Bahn (banliyö treni), Bus ve Straßenbahn (tramvay) sık kullanılır. Hangi araçla gittiğinizi 'mit + Dativ' yapısıyla ifade edersiniz.",
      sections: [
        {
          heading: "Toplu Taşıma Araçları",
          body:
            "Almanya'daki temel ulaşım araçları. Her kelimenin artikelini öğrenmek önemlidir çünkü 'mit dem/der' gibi Dativ değişimleri artikele göre yapılır.",
          examples: [
            { de: "die U-Bahn", tr: "metro" },
            { de: "die S-Bahn", tr: "banliyö treni" },
            { de: "der Bus", tr: "otobus" },
            { de: "die Straßenbahn / Tram", tr: "tramvay" },
            { de: "der Zug", tr: "tren" },
          ],
        },
        {
          heading: "mit + Dativ: Araç Kullanımı",
          body:
            "'Mit' edatı her zaman Dativ alır. Eril: 'dem', dişil: 'der', nötr: 'dem'. Bu yapı ile hangi ulaşım aracıyla gittiğinizi belirtirsiniz.",
          examples: [
            { de: "Ich fahre mit dem Bus.", tr: "Otobuisle gidiyorum. (der Bus → dem Bus)" },
            { de: "Sie fahrt mit der U-Bahn.", tr: "Metroyla gidiyor. (die U-Bahn → der U-Bahn)" },
            { de: "Wir fahren mit dem Zug.", tr: "Trenle gidiyoruz." },
            { de: "Er fahrt mit dem Fahrrad.", tr: "Bisikletle gidiyor." },
          ],
        },
        {
          heading: "Bilet Alma ve Seyahat",
          body:
            "Almanya'da toplu taşımada bilet almak zorunludur. Kontrolörler (Fahrkartenkontrolle) bilet kontrol eder; biletsiz yakalanmak ceza gerektirir.",
          examples: [
            { de: "eine Fahrkarte kaufen", tr: "bilet satın almak" },
            { de: "einmal nach Hauptbahnhof, bitte", tr: "merkez istasyonuna bir bilet, lutfen" },
            { de: "Muss ich umsteigen?", tr: "Aktarma yapmam gerekiyor mu?" },
            { de: "Wo ist die naechste Haltestelle?", tr: "En yakin durak nerede?" },
          ],
        },
      ],
    },
    vocabulary: [
      { word: "die U-Bahn", meaning: "metro", partOfSpeech: "Nomen", example: "Ich nehme die U-Bahn zur Arbeit." },
      { word: "der Bus", meaning: "otobüs", partOfSpeech: "Nomen", example: "Der Bus kommt in 5 Minuten." },
      { word: "der Zug", meaning: "tren", partOfSpeech: "Nomen", example: "Der Zug faehrt um 10 Uhr ab." },
      { word: "das Fahrrad", meaning: "bisiklet", partOfSpeech: "Nomen", example: "Im Sommer fahre ich Fahrrad." },
      { word: "das Auto", meaning: "araba", partOfSpeech: "Nomen", example: "Hast du ein Auto?" },
      { word: "die Fahrkarte", meaning: "bilet", partOfSpeech: "Nomen", example: "Ich kaufe eine Fahrkarte." },
      { word: "fahren", meaning: "gitmek, sürmek (araçla)", partOfSpeech: "Verb", example: "Ich fahre mit dem Bus." },
      { word: "umsteigen", meaning: "aktarma yapmak", partOfSpeech: "Verb (trennbar)", example: "Sie muessen am Hauptbahnhof umsteigen." },
      { word: "die Haltestelle", meaning: "durak", partOfSpeech: "Nomen", example: "Die Haltestelle ist hier." },
      { word: "abfahren", meaning: "kalkmak (araç)", partOfSpeech: "Verb (trennbar)", example: "Der Zug faehrt um 9 Uhr ab." },
    ],
    exercises: {
      multipleChoice: [
        {
          id: 1,
          question: "'Ich fahre ___ Bus.' — 'mit' sonrası 'der Bus' nasıl değişir?",
          options: ["mit der Bus", "mit den Bus", "mit dem Bus", "mit ein Bus"],
          correct: 2,
          explanation: "'mit' her zaman Dativ alır. Eril 'der' Dativ'de 'dem' olur: 'mit dem Bus'.",
        },
        {
          id: 2,
          question: "Almanya'da metro için kullanılan kısaltma nedir?",
          options: ["S-Bahn", "U-Bahn", "DB", "ICE"],
          correct: 1,
          explanation: "U-Bahn = Untergrundbahn = metro. S-Bahn = Schnellbahn = banliyö treni.",
        },
        {
          id: 3,
          question: "'die U-Bahn' ile seyahat ederken 'mit' sonrası nasıl söylenir?",
          options: ["mit die U-Bahn", "mit der U-Bahn", "mit dem U-Bahn", "mit eine U-Bahn"],
          correct: 1,
          explanation: "Dişil 'die' Dativ'de 'der' olur: 'mit der U-Bahn'.",
        },
        {
          id: 4,
          question: "'Muss ich umsteigen?' ne anlama gelir?",
          options: [
            "Nereden bineceğim?",
            "Aktarma yapmam gerekiyor mu?",
            "Bilet almam gerekiyor mu?",
            "Nerede ineceğim?",
          ],
          correct: 1,
          explanation: "'umsteigen' = aktarma yapmak. 'Muss ich umsteigen?' = Aktarma yapmam gerekiyor mu?",
        },
        {
          id: 5,
          question: "'Der Zug ___ um 10 Uhr ___.' (abfahren) — Doğru form?",
          options: ["faehrt...ab", "abfahrt...ab", "faehrt...auf", "fahren...ab"],
          correct: 0,
          explanation: "'abfahren' trennbar. Er/es/sie ile 'faehrt' + önek: 'Der Zug faehrt um 10 Uhr ab.'",
        },
      ],
      fillInBlank: [
        {
          id: 1,
          before: "Ich fahre mit ___ Bus zur Schule.",
          after: "(Okula otobüsle gidiyorum.)",
          answer: "dem",
          hint: "der Bus → Dativ = ?",
        },
        {
          id: 2,
          before: "Wo ist die naechste ___?",
          after: "(En yakın durak nerede?)",
          answer: "Haltestelle",
          hint: "durak",
        },
        {
          id: 3,
          before: "Der Zug faehrt um 9 Uhr ___.",
          after: "(Tren saat 9'da kalkıyor. - abfahren)",
          answer: "ab",
          hint: "abfahren fiilinin oneki",
        },
      ],
    },
  },

  "Bölüm 2: Wie komme ich dahin?": {
    title: "Yön Tarifi",
    description: "Almancada yol sorma, yön bildiren kelimeler ve konum edatları",
    theory: {
      intro:
        "Almancada yön tarifi verirken yön bildiren zarflar (geradeaus, links, rechts) ve konum edatları (neben, an, vor, hinter) birlikte kullanılır. 'Entschuldigung' ile başlamak kibarlık kuralıdır.",
      sections: [
        {
          heading: "Yön Bildiren Kelimeler",
          body:
            "Temel yön bildiren zarflar: geradeaus (düz), links (sola), rechts (sağa), zurück (geri). Bunlar emir kipiyle birlikte sıkça kullanılır: 'Gehen Sie geradeaus!'",
          examples: [
            { de: "geradeaus", tr: "duz, ileri" },
            { de: "links", tr: "sola" },
            { de: "rechts", tr: "saga" },
            { de: "zurück", tr: "geri" },
            { de: "die erste Straße links", tr: "ilk sokaktan sola" },
          ],
        },
        {
          heading: "Yol Sorma Kalıpları",
          body:
            "Yol sormak için 'Entschuldigung' ile başlanır. 'Wie komme ich zu/zum/zur...?' kalıbı en yaygın olanıdır.",
          examples: [
            { de: "Entschuldigung, wie komme ich zum Bahnhof?", tr: "Pardon, istasyona nasil gidebilirim?" },
            { de: "Entschuldigung, wo ist die Post?", tr: "Pardon, postane nerede?" },
            { de: "Ist das weit von hier?", tr: "Buradan uzak mi?" },
            { de: "Das ist etwa 5 Minuten zu Fuss.", tr: "Yaklasik 5 dakika yurume mesafesi." },
          ],
        },
        {
          heading: "Konum Edatları",
          body:
            "Bir yerin nerede olduğunu tarif etmek için konum edatları kullanılır. 'an' (yanında, kenarında), 'neben' (yanında), 'vor' (önünde), 'hinter' (arkasında), 'gegenüber' (karşısında).",
          examples: [
            { de: "Die Bank ist neben dem Supermarkt.", tr: "Banka, suptermarketin yaninda." },
            { de: "Die Post ist gegenueber dem Bahnhof.", tr: "Postane, istasyonun karsisinda." },
            { de: "Das Hotel ist an der Ecke.", tr: "Otel, kosede." },
            { de: "Der Park ist hinter dem Museum.", tr: "Park, muzenim arkasinda." },
          ],
        },
      ],
    },
    vocabulary: [
      { word: "geradeaus", meaning: "düz, doğruca", partOfSpeech: "Adverb", example: "Gehen Sie geradeaus!" },
      { word: "links", meaning: "sola, solda", partOfSpeech: "Adverb", example: "Biegen Sie links ab." },
      { word: "rechts", meaning: "sağa, sağda", partOfSpeech: "Adverb", example: "Die Post ist rechts." },
      { word: "die Straße", meaning: "sokak, cadde", partOfSpeech: "Nomen", example: "Gehen Sie die erste Strasse links." },
      { word: "die Ecke", meaning: "köşe", partOfSpeech: "Nomen", example: "Das Cafe ist an der Ecke." },
      { word: "gegenüber", meaning: "karşısında", partOfSpeech: "Praeposition", example: "Die Bank ist gegenueber dem Hotel." },
      { word: "neben", meaning: "yanında", partOfSpeech: "Praeposition", example: "Der Supermarkt ist neben der Post." },
      { word: "weit", meaning: "uzak", partOfSpeech: "Adjektiv", example: "Ist der Bahnhof weit von hier?" },
      { word: "zu Fuß", meaning: "yürüyerek", partOfSpeech: "Wendung", example: "Ich gehe zu Fuss." },
      { word: "abbiegen", meaning: "dönmek (yol)", partOfSpeech: "Verb (trennbar)", example: "Biegen Sie links ab." },
    ],
    exercises: {
      multipleChoice: [
        {
          id: 1,
          question: "Yol sormak için hangi kalıp kullanılır?",
          options: [
            "Wie heißt der Bahnhof?",
            "Entschuldigung, wie komme ich zum Bahnhof?",
            "Wo fahren Sie hin?",
            "Haben Sie einen Bahnhof?",
          ],
          correct: 1,
          explanation: "'Wie komme ich zu/zum/zur...?' yol sormanın standart kalıbıdır. 'Entschuldigung' ile başlamak kibar bir yaklaşımdır.",
        },
        {
          id: 2,
          question: "'Die Post ist gegenüber dem Bahnhof.' ne anlama gelir?",
          options: [
            "Postane istasyonun yanında.",
            "Postane istasyonun arkasında.",
            "Postane istasyonun karşısında.",
            "Postane istasyonun önünde.",
          ],
          correct: 2,
          explanation: "'gegenüber' = karşısında. 'neben' = yanında, 'hinter' = arkasında, 'vor' = önünde.",
        },
        {
          id: 3,
          question: "'Biegen Sie links ab.' ne demektir?",
          options: ["Düz gidin.", "Sola dönün.", "Sağa dönün.", "Geri dönün."],
          correct: 1,
          explanation: "'abbiegen' = dönmek. 'links' = sola. 'Biegen Sie links ab' = Sola dönün.",
        },
        {
          id: 4,
          question: "'zu Fuß gehen' ne anlama gelir?",
          options: ["Arabayla gitmek", "Metroyla gitmek", "Yürümek", "Bisikletle gitmek"],
          correct: 2,
          explanation: "'zu Fuß' = yürüyerek. 'Ich gehe zu Fuss' = Yürüyorum.",
        },
        {
          id: 5,
          question: "'Das ist etwa 5 Minuten zu Fuß.' cümlesindeki 'etwa' ne anlama gelir?",
          options: ["tam olarak", "yaklaşık", "en fazla", "en az"],
          correct: 1,
          explanation: "'etwa' = yaklaşık, civarında. 'Das ist etwa 5 Minuten zu Fuss' = Yaklaşık 5 dakika yürüme mesafesi.",
        },
      ],
      fillInBlank: [
        {
          id: 1,
          before: "Entschuldigung, wie komme ich ___ Bahnhof?",
          after: "(İstasyona nasıl gidebilirim?)",
          answer: "zum",
          hint: "zu + dem = ? (eril, Dativ)",
        },
        {
          id: 2,
          before: "Gehen Sie ___ und dann links.",
          after: "(Düz gidin, sonra sola.)",
          answer: "geradeaus",
          hint: "duz, ileri",
        },
        {
          id: 3,
          before: "Die Bank ist ___ dem Supermarkt.",
          after: "(Banka supermarketin yanında.)",
          answer: "neben",
          hint: "yaninda",
        },
      ],
    },
  },

  // ─── A1 Ünite 6 ──────────────────────────────────────────────────────────

  "Bölüm 1: Meine Wohnung": {
    title: "Ev ve Odalar",
    description: "Almancada ev bölümleri, oda isimleri ve 'es gibt' yapısı",
    theory: {
      intro:
        "Almanlar için ev çok önemlidir. Oda isimlerini, konum edatlarını ve 'es gibt' (var olmak) yapısını öğrenerek evinizi ya da bir evi Almancada tarif edebilirsiniz.",
      sections: [
        {
          heading: "Oda ve Ev Bölümleri",
          body:
            "Almancada ev bölümlerini öğrenirken artikellere dikkat edin. Çoğu oda ismi dişil ya da nötr cinsiyet taşır.",
          examples: [
            { de: "das Wohnzimmer", tr: "oturma odası" },
            { de: "das Schlafzimmer", tr: "yatak odası" },
            { de: "die Küche", tr: "mutfak" },
            { de: "das Badezimmer / das Bad", tr: "banyo" },
            { de: "der Flur", tr: "koridor, giriş" },
          ],
        },
        {
          heading: "es gibt + Akkusativ",
          body:
            "Bir şeyin var olduğunu ifade etmek için 'es gibt + Akkusativ' kullanılır. 'Es gibt' = var (bulunmak). Olumsuzunda 'kein/keine' eklenir.",
          examples: [
            { de: "Es gibt ein Wohnzimmer.", tr: "Bir oturma odası var." },
            { de: "Es gibt einen Balkon.", tr: "Bir balkon var. (eril → einen)" },
            { de: "Es gibt keine Garage.", tr: "Garaj yok." },
            { de: "Was gibt es in deiner Wohnung?", tr: "Dairende ne var?" },
          ],
        },
        {
          heading: "Konut İlanı Okuma",
          body:
            "Almancada kiralık daire ilanlarında sık kullanılan kısaltmalar ve terimler. 'WG' = Wohngemeinschaft (ortak ev), 'qm' = Quadratmeter (metrekare), 'KM' = Kaltmiete (ısıtma hariç).",
          examples: [
            { de: "2-Zimmer-Wohnung, 65 qm, 800 Euro KM", tr: "2 odali daire, 65 metrekare, 800 Euro (ısıtma hariç)" },
            { de: "Die Wohnung hat einen Balkon.", tr: "Dairenin balkonu var." },
            { de: "Ist die Wohnung noch frei?", tr: "Daire hala mus?" },
            { de: "Wie hoch ist die Miete?", tr: "Kira ne kadar?" },
          ],
        },
      ],
    },
    vocabulary: [
      { word: "das Wohnzimmer", meaning: "oturma odası", partOfSpeech: "Nomen", example: "Wir sitzen im Wohnzimmer." },
      { word: "das Schlafzimmer", meaning: "yatak odası", partOfSpeech: "Nomen", example: "Das Schlafzimmer ist gross." },
      { word: "die Küche", meaning: "mutfak", partOfSpeech: "Nomen", example: "Die Kueche ist modern." },
      { word: "das Badezimmer", meaning: "banyo", partOfSpeech: "Nomen", example: "Das Badezimmer hat eine Dusche." },
      { word: "der Balkon", meaning: "balkon", partOfSpeech: "Nomen", example: "Wir fruehstuecken auf dem Balkon." },
      { word: "die Wohnung", meaning: "daire, apartman", partOfSpeech: "Nomen", example: "Die Wohnung hat 3 Zimmer." },
      { word: "es gibt", meaning: "var (bulunmak)", partOfSpeech: "Wendung", example: "Es gibt ein Wohnzimmer." },
      { word: "die Miete", meaning: "kira", partOfSpeech: "Nomen", example: "Die Miete betraegt 700 Euro." },
      { word: "das Zimmer", meaning: "oda", partOfSpeech: "Nomen", example: "Die Wohnung hat vier Zimmer." },
      { word: "groß", meaning: "büyük", partOfSpeech: "Adjektiv", example: "Die Wohnung ist sehr gross." },
    ],
    exercises: {
      multipleChoice: [
        {
          id: 1,
          question: "'Es gibt einen Balkon.' cümlesinde neden 'einen' kullanılıyor?",
          options: [
            "Çünkü balkon dişil.",
            "Çünkü 'es gibt' daima çoğul alır.",
            "Çünkü 'der Balkon' eril, 'es gibt' Akkusativ alır.",
            "Çünkü balkon nötr.",
          ],
          correct: 2,
          explanation: "'es gibt' her zaman Akkusativ alır. 'der Balkon' eril, Akkusativ belirsiz artikel: ein → einen.",
        },
        {
          id: 2,
          question: "'Es gibt keine Garage.' ne anlama gelir?",
          options: ["Garaj büyük.", "Garaj var.", "Garaj yok.", "Garaj küçük."],
          correct: 2,
          explanation: "'keine' olumsuzluk bildiren artikeldir. 'Es gibt keine Garage' = Garaj yok.",
        },
        {
          id: 3,
          question: "Almancada 'mutfak' nasıl denir?",
          options: ["das Schlafzimmer", "das Badezimmer", "die Küche", "der Flur"],
          correct: 2,
          explanation: "'die Küche' = mutfak. 'das Schlafzimmer' = yatak odası, 'das Badezimmer' = banyo, 'der Flur' = koridor.",
        },
        {
          id: 4,
          question: "Kiralık ilanda 'WG' ne anlama gelir?",
          options: ["büyük daire", "ortak ev (Wohngemeinschaft)", "balkonlu daire", "yeni bina"],
          correct: 1,
          explanation: "'WG' = Wohngemeinschaft = birden fazla kişinin birlikte yaşadığı ortak ev. Almanya'da öğrenciler arasında çok yaygındır.",
        },
        {
          id: 5,
          question: "'Wie hoch ist die Miete?' ne anlama gelir?",
          options: ["Daire ne kadar büyük?", "Kira ne kadar?", "Daire nerede?", "Kaç odası var?"],
          correct: 1,
          explanation: "'Wie hoch ist die Miete?' = Kira ne kadar? 'hoch' = yüksek, burada 'kadar' anlamında kullanılıyor.",
        },
      ],
      fillInBlank: [
        {
          id: 1,
          before: "Es gibt ___ Balkon.",
          after: "(bir balkon var - eril)",
          answer: "einen",
          hint: "eril belirsiz artikel Akkusativ'de",
        },
        {
          id: 2,
          before: "Die ___ hat drei Zimmer.",
          after: "(Dairenin üç odası var.)",
          answer: "Wohnung",
          hint: "daire, apartman",
        },
        {
          id: 3,
          before: "Es gibt ___ Garage.",
          after: "(Garaj yok.)",
          answer: "keine",
          hint: "olumsuz artikel (dişil/coğul)",
        },
      ],
    },
  },

  "Bölüm 2: Möbel und Zimmer": {
    title: "Mobilyalar",
    description: "Ev eşyaları, 'Wo? → Dativ' ve 'Wohin? → Akkusativ' kuralı",
    theory: {
      intro:
        "Evinizi tarif ederken mobilya ve eşyaların nerede olduğunu söylemek önemlidir. Almancada konum sorusu 'Wo?' Dativ, yön sorusu 'Wohin?' Akkusativ alır. Bu ayrım özellikle 9 değişken edatla (in, an, auf...) kullanılır.",
      sections: [
        {
          heading: "Temel Mobilya ve Eşya İsimleri",
          body:
            "Ev eşyalarını artikelleriyle birlikte öğrenin. Almancada birleşik isimler (Komposita) yaygındır: Wohn + zimmer = Wohnzimmer gibi.",
          examples: [
            { de: "der Tisch", tr: "masa" },
            { de: "der Stuhl", tr: "sandalye" },
            { de: "das Sofa / das Couch", tr: "koltuk, kanepe" },
            { de: "das Bett", tr: "yatak" },
            { de: "der Schrank", tr: "dolap" },
          ],
        },
        {
          heading: "Wo? → Dativ (Nerede?)",
          body:
            "Bir nesnenin nerede durduğunu söylerken 'Wo?' sorusuna cevap veririz ve edat Dativ alır. Eril 'der' → 'dem', dişil 'die' → 'der', nötr 'das' → 'dem' olur.",
          examples: [
            { de: "Das Buch liegt auf dem Tisch. (Wo?)", tr: "Kitap masanın üstünde. (Wo? → Dativ)" },
            { de: "Die Lampe hängt an der Wand. (Wo?)", tr: "Lamba duvarda asılı. (die Wand → der Wand)" },
            { de: "Der Hund sitzt vor dem Sofa.", tr: "Köpek koltucun önünde oturuyor." },
            { de: "Das Bild hängt über dem Bett.", tr: "Resim yatağın üstünde asılı." },
          ],
        },
        {
          heading: "Wohin? → Akkusativ (Nereye?)",
          body:
            "Bir nesnenin nereye konulduğunu söylerken 'Wohin?' sorusuna cevap veririz ve edat Akkusativ alır. Eril 'der' → 'den', nötr 'das' değişmez.",
          examples: [
            { de: "Ich lege das Buch auf den Tisch. (Wohin?)", tr: "Kitabı masanın üstüne koyuyorum. (Akkusativ)" },
            { de: "Er stellt die Vase auf den Tisch.", tr: "Vazoyu masanın üstüne koyuyor." },
            { de: "Sie hängt das Bild an die Wand.", tr: "Resmi duvara asıyor. (die Wand → Akk: die Wand)" },
          ],
        },
      ],
    },
    vocabulary: [
      { word: "der Tisch", meaning: "masa", partOfSpeech: "Nomen", example: "Das Buch liegt auf dem Tisch." },
      { word: "der Stuhl", meaning: "sandalye", partOfSpeech: "Nomen", example: "Stell den Stuhl an den Tisch." },
      { word: "das Sofa", meaning: "koltuk, kanepe", partOfSpeech: "Nomen", example: "Ich sitze auf dem Sofa." },
      { word: "das Bett", meaning: "yatak", partOfSpeech: "Nomen", example: "Das Bett ist sehr bequem." },
      { word: "der Schrank", meaning: "dolap", partOfSpeech: "Nomen", example: "Die Kleider sind im Schrank." },
      { word: "die Lampe", meaning: "lamba", partOfSpeech: "Nomen", example: "Die Lampe haengt an der Decke." },
      { word: "auf", meaning: "üstünde / üstüne", partOfSpeech: "Praeposition", example: "Das Buch liegt auf dem Tisch." },
      { word: "an", meaning: "yanında, -da / -e", partOfSpeech: "Praeposition", example: "Das Bild haengt an der Wand." },
      { word: "liegen", meaning: "yatmak, durmak (yatay)", partOfSpeech: "Verb", example: "Das Buch liegt auf dem Regal." },
      { word: "stehen", meaning: "durmak (dikey)", partOfSpeech: "Verb", example: "Der Schrank steht neben dem Bett." },
    ],
    exercises: {
      multipleChoice: [
        {
          id: 1,
          question: "'Das Buch liegt ___ Tisch.' (auf, Wo?) — Doğru form?",
          options: ["auf den Tisch", "auf dem Tisch", "auf der Tisch", "auf ein Tisch"],
          correct: 1,
          explanation: "'Wo?' sorusu → Dativ. 'der Tisch' eril, Dativ: 'dem'. Cevap: 'auf dem Tisch'.",
        },
        {
          id: 2,
          question: "'Ich lege das Buch ___ Tisch.' (auf, Wohin?) — Doğru form?",
          options: ["auf dem Tisch", "auf der Tisch", "auf den Tisch", "auf das Tisch"],
          correct: 2,
          explanation: "'Wohin?' sorusu → Akkusativ. 'der Tisch' eril, Akkusativ: 'den'. Cevap: 'auf den Tisch'.",
        },
        {
          id: 3,
          question: "Almancada 'yatak' nasıl denir?",
          options: ["der Tisch", "der Stuhl", "das Bett", "der Schrank"],
          correct: 2,
          explanation: "'das Bett' = yatak. 'der Tisch' = masa, 'der Stuhl' = sandalye, 'der Schrank' = dolap.",
        },
        {
          id: 4,
          question: "'Die Lampe hängt an ___ Wand.' (Wo?) — 'die Wand' Dativ'de?",
          options: ["der Wand", "die Wand", "den Wand", "dem Wand"],
          correct: 0,
          explanation: "Dişil 'die' Dativ'de 'der' olur. 'an der Wand' = duvarda.",
        },
        {
          id: 5,
          question: "'stehen' ve 'liegen' fiillerinin farkı nedir?",
          options: [
            "İkisi de aynı anlamda kullanılır.",
            "'stehen' dikey duran, 'liegen' yatay duran nesneler için.",
            "'liegen' sadece canlılar için, 'stehen' sadece eşyalar için.",
            "'stehen' hareket, 'liegen' konum anlamında.",
          ],
          correct: 1,
          explanation: "'stehen' dik/dikey duran nesneler için (dolap, sandalye). 'liegen' yatay duran nesneler için (kitap, mektup). 'sitzen' ise oturan varlıklar için.",
        },
      ],
      fillInBlank: [
        {
          id: 1,
          before: "Das Sofa steht ___ dem Tisch.",
          after: "(Koltuk masanın önünde.)",
          answer: "vor",
          hint: "onunde (konum edati)",
        },
        {
          id: 2,
          before: "Ich lege das Buch auf ___ Tisch.",
          after: "(Kitabı masaya koyuyorum - Wohin?)",
          answer: "den",
          hint: "der Tisch → Akkusativ = ?",
        },
        {
          id: 3,
          before: "Der Schrank ___ neben dem Bett.",
          after: "(Dolap yatağın yanında duruyor.)",
          answer: "steht",
          hint: "dikey durmak fiili (er/es/sie formu)",
        },
      ],
    },
  },
};
