/**
 * TELC A1 Grammar Topics — 13 topics, 8 MCQ + 5 fill-in-blank each.
 */

import type { B1GrammarTopic } from "./grammar-b1";
export type { B1GrammarTopic as A1GrammarTopic };

export const A1_GRAMMAR_TOPICS: B1GrammarTopic[] = [
  // ─── 1. Aussagesatz & W-Fragen ────────────────────────────────────────────
  {
    id: "aussagesatz-w-fragen",
    title: "Aussagesatz & W-Fragen",
    subtitle: "Temel Cümle Yapısı ve Soru Kelimeleri",
    explanation:
      "Almancada temel cümle düzeni: Özne (Subjekt) + Fiil (Verb) + Nesne/Tamamlayıcı. Fiil daima ikinci konumdadır (V2 kuralı). Evet/Hayır sorularında fiil başa gelir. W-sorularında soru kelimesi birinci, fiil ikinci sıradadır.",
    rules: [
      {
        heading: "Temel Cümle Düzeni (V2 Kuralı)",
        body: "Fiil her zaman ikinci sıradadır. Başka bir öge öne gelirse özne fiilin hemen ardına gider.",
        examples: [
          { de: "Ich lerne Deutsch.", tr: "Ben Almanca öğreniyorum." },
          { de: "Heute lerne ich Deutsch.", tr: "Bugün Almanca öğreniyorum. (fiil yine 2. sırada)" },
          { de: "Er wohnt in Berlin.", tr: "O Berlin'de yaşıyor." },
        ],
        table: {
          headers: ["Pos. 1", "Fiil (2)", "Pos. 3+"],
          rows: [
            ["Ich", "lerne", "Deutsch."],
            ["Heute", "lerne", "ich Deutsch."],
            ["Er", "wohnt", "in Berlin."],
          ],
        },
      },
      {
        heading: "Evet/Hayır Soruları & W-Soruları",
        body: "Ja/Nein-Frage: Fiil başa gelir. W-Frage: Soru kelimesi + Fiil + Özne...",
        examples: [
          { de: "Kommen Sie aus Deutschland?", tr: "Almanya'dan mısınız?" },
          { de: "Wo wohnst du?", tr: "Nerede yaşıyorsun?" },
          { de: "Wie heißen Sie?", tr: "Adınız ne?" },
          { de: "Was machst du?", tr: "Ne yapıyorsun?" },
        ],
      },
    ],
    exercises: {
      multipleChoice: [
        {
          id: 1,
          question: "Hangi cümledeki fiil doğru konumdadır?",
          options: [
            "Ich Deutsch lerne.",
            "Ich lerne Deutsch.",
            "Deutsch lerne Ich.",
            "Lerne ich Deutsch.",
          ],
          correct: 1,
          explanation: "V2 kuralı: Fiil ikinci sıradadır → Ich (1) + lerne (2) + Deutsch.",
        },
        {
          id: 2,
          question: "'Heute _____ er in die Schule.' — Doğru form:",
          options: ["geht", "er geht", "gehen", "gehst"],
          correct: 0,
          explanation: "V2: Heute (1) + geht (2) + er (3). Özne fiilin arkasına geçer.",
        },
        {
          id: 3,
          question: "W-sorusunda fiil hangi sıradadır?",
          options: ["1. sıra", "2. sıra", "3. sıra", "Son sıra"],
          correct: 1,
          explanation: "W-Frage: Soru kelimesi (1) + Fiil (2) + Özne (3)...",
        },
        {
          id: 4,
          question: "'_____ heißt du?' — Doğru soru kelimesi:",
          options: ["Was", "Wie", "Wo", "Wer"],
          correct: 1,
          explanation: "'Wie heißt du?' = Adın ne? İsim sormak için 'wie' kullanılır.",
        },
        {
          id: 5,
          question: "'_____ kommst du?' — 'Nerelisin?' anlamında:",
          options: ["Wann", "Wie", "Woher", "Was"],
          correct: 2,
          explanation: "'Woher' = nereden/nerelisin. Menşei sorulur.",
        },
        {
          id: 6,
          question: "Evet/Hayır sorusu nasıl kurulur?",
          options: [
            "Özne + Fiil + ?",
            "Fiil + Özne + ?",
            "Soru kelimesi + Özne + Fiil + ?",
            "Nesne + Fiil + Özne + ?",
          ],
          correct: 1,
          explanation: "Ja/Nein-Frage: Fiil başa gelir → 'Lernst du Deutsch?'",
        },
        {
          id: 7,
          question: "'_____ ist das?' — 'Bu nedir?' anlamında:",
          options: ["Wie", "Wer", "Was", "Wo"],
          correct: 2,
          explanation: "'Was ist das?' = Bu nedir? Nesne/şey sormak için 'was'.",
        },
        {
          id: 8,
          question: "'Woher kommen Sie?' sorusuna uygun cevap:",
          options: [
            "Ich komme aus der Türkei.",
            "Ich wohne in Berlin.",
            "Ich heiße Anna.",
            "Ich lerne Deutsch.",
          ],
          correct: 0,
          explanation: "'Woher' menşe sorar → 'aus + Ülke' ile cevap verilir.",
        },
      ],
      fillInBlank: [
        {
          id: 1,
          before: "Heute",
          after: "ich ins Kino. (gehen — V2 dikkat!)",
          answer: "gehe",
          hint: "V2: Heute (1) + Verb (2) + Subjekt",
        },
        {
          id: 2,
          before: "_____ wohnst du?",
          after: "(Nerede?)",
          answer: "Wo",
          hint: "yer sorusu = wo",
        },
        {
          id: 3,
          before: "Er",
          after: "aus Spanien. (kommen)",
          answer: "kommt",
          hint: "er/sie/es → kommt",
        },
        {
          id: 4,
          before: "_____ machst du heute?",
          after: "(Ne yapıyorsun?)",
          answer: "Was",
          hint: "ne/şey sorusu = was",
        },
        {
          id: 5,
          before: "Morgen",
          after: "wir Deutsch. (lernen — V2!)",
          answer: "lernen",
          hint: "wir → lernen; V2: Morgen (1) + lernen (2) + wir (3)",
        },
      ],
    },
  },

  // ─── 2. Verbkonjugation: sein & haben ────────────────────────────────────
  {
    id: "sein-haben-konjugation",
    title: "Verbkonjugation: sein & haben",
    subtitle: "En Temel İki Fiil",
    explanation:
      "'sein' (olmak) ve 'haben' (sahip olmak) Almancada en temel düzensiz fiillerdir. Bu iki fiil hem bağımsız hem de yardımcı fiil olarak Perfekt yapısında kullanılır. Çekimlerini ezberlemek zorunludur.",
    rules: [
      {
        heading: "sein — Çekimi",
        body: "sein tamamen düzensizdir: ich bin, du bist, er/sie/es ist, wir sind, ihr seid, sie/Sie sind.",
        examples: [
          { de: "Ich bin Student.", tr: "Ben öğrenciyim." },
          { de: "Sie ist Ärztin.", tr: "O doktordur." },
          { de: "Wir sind müde.", tr: "Biz yorgunuz." },
        ],
        table: {
          headers: ["Şahıs", "sein"],
          rows: [
            ["ich", "bin"],
            ["du", "bist"],
            ["er / sie / es", "ist"],
            ["wir", "sind"],
            ["ihr", "seid"],
            ["sie / Sie", "sind"],
          ],
        },
      },
      {
        heading: "haben — Çekimi",
        body: "haben: ich habe, du hast, er hat, wir haben, ihr habt, sie haben.",
        examples: [
          { de: "Ich habe ein Buch.", tr: "Benim bir kitabım var." },
          { de: "Er hat keine Zeit.", tr: "Onun zamanı yok." },
          { de: "Habt ihr Hunger?", tr: "Acıktınız mı?" },
        ],
        table: {
          headers: ["Şahıs", "haben"],
          rows: [
            ["ich", "habe"],
            ["du", "hast"],
            ["er / sie / es", "hat"],
            ["wir", "haben"],
            ["ihr", "habt"],
            ["sie / Sie", "haben"],
          ],
        },
      },
    ],
    exercises: {
      multipleChoice: [
        {
          id: 1,
          question: "'Er _____ Student.' — Doğru form:",
          options: ["bin", "bist", "ist", "sind"],
          correct: 2,
          explanation: "er/sie/es → ist.",
        },
        {
          id: 2,
          question: "'Wir _____ keine Zeit.' — Doğru form (haben):",
          options: ["hat", "habt", "haben", "habe"],
          correct: 2,
          explanation: "wir → haben.",
        },
        {
          id: 3,
          question: "'Du _____ sehr nett.' — Doğru form (sein):",
          options: ["bin", "bist", "ist", "seid"],
          correct: 1,
          explanation: "du → bist.",
        },
        {
          id: 4,
          question: "'Ihr _____ Hunger?' — Doğru form (haben):",
          options: ["haben", "habt", "hat", "habe"],
          correct: 1,
          explanation: "ihr → habt.",
        },
        {
          id: 5,
          question: "'Sie (resmi, tekil) _____ Lehrerin.' — Doğru form:",
          options: ["bin", "bist", "ist", "sind"],
          correct: 3,
          explanation: "Resmi Sie → sind. (Lehrerin = öğretmen, dişil)",
        },
        {
          id: 6,
          question: "'Ich _____ ein Auto.' — Doğru form (haben):",
          options: ["hat", "hast", "haben", "habe"],
          correct: 3,
          explanation: "ich → habe.",
        },
        {
          id: 7,
          question: "'_____ du müde?' — Hangi fiil?",
          options: ["Hast", "Bist", "Ist", "Seid"],
          correct: 1,
          explanation: "Sıfat öncesi 'sein': Bist du müde?",
        },
        {
          id: 8,
          question: "'Sie (çoğul) _____ keine Kinder.' — Doğru form (haben):",
          options: ["hat", "habe", "haben", "habt"],
          correct: 2,
          explanation: "sie (çoğul) → haben.",
        },
      ],
      fillInBlank: [
        {
          id: 1,
          before: "Ich",
          after: "aus der Türkei. (sein)",
          answer: "bin",
          hint: "ich → bin",
        },
        {
          id: 2,
          before: "Er",
          after: "zwei Schwestern. (haben)",
          answer: "hat",
          hint: "er/sie/es → hat",
        },
        {
          id: 3,
          before: "Wir",
          after: "Studenten. (sein)",
          answer: "sind",
          hint: "wir → sind",
        },
        {
          id: 4,
          before: "Du",
          after: "ein tolles Handy. (haben)",
          answer: "hast",
          hint: "du → hast",
        },
        {
          id: 5,
          before: "Ihr",
          after: "sehr freundlich. (sein)",
          answer: "seid",
          hint: "ihr → seid",
        },
      ],
    },
  },

  // ─── 3. Artikel: der / die / das ─────────────────────────────────────────
  {
    id: "artikel-der-die-das",
    title: "Artikel: der / die / das",
    subtitle: "Belirli ve Belirsiz Artikel",
    explanation:
      "Almancada her ismin grammatikal bir cinsiyeti vardır: eril (der), dişil (die), nötr (das). Bu cinsiyet kelimeyle birlikte ezberlenmelidir — tahmin edilemez. Belirsiz artikel: ein/eine/ein. Çoğulda daima 'die' kullanılır.",
    rules: [
      {
        heading: "Belirli Artikel (Bestimmter Artikel)",
        body: "Eril: der, Dişil: die, Nötr: das, Çoğul: die.",
        examples: [
          { de: "der Mann, die Frau, das Kind", tr: "adam, kadın, çocuk" },
          { de: "der Tisch, die Lampe, das Buch", tr: "masa, lamba, kitap" },
        ],
        table: {
          headers: ["Cinsiyet", "Belirli", "Belirsiz", "Örnek"],
          rows: [
            ["Eril (m)", "der", "ein", "der Vater / ein Vater"],
            ["Dişil (f)", "die", "eine", "die Mutter / eine Mutter"],
            ["Nötr (n)", "das", "ein", "das Kind / ein Kind"],
            ["Çoğul", "die", "—", "die Kinder"],
          ],
        },
      },
      {
        heading: "Artikel Ezberlemek İçin İpuçları",
        body: "Bazı ekler cinsiyete işaret eder: -ung, -heit, -keit, -schaft → die. -chen, -lein → das. -er, -ismus → der.",
        examples: [
          { de: "die Zeitung, die Freiheit, die Freundschaft", tr: "gazete, özgürlük, arkadaşlık (hepsi die)" },
          { de: "das Mädchen, das Fräulein", tr: "kız, genç bayan (hepsi das)" },
        ],
      },
    ],
    exercises: {
      multipleChoice: [
        {
          id: 1,
          question: "'_____ Buch liegt auf dem Tisch.' — Doğru artikel:",
          options: ["Der", "Die", "Das", "Ein"],
          correct: 2,
          explanation: "das Buch — nötr.",
        },
        {
          id: 2,
          question: "'_____ Mann heißt Peter.' — Doğru belirli artikel:",
          options: ["Die", "Das", "Der", "Ein"],
          correct: 2,
          explanation: "der Mann — eril.",
        },
        {
          id: 3,
          question: "'Das ist _____ Frau.' — Belirsiz artikel:",
          options: ["der", "die", "das", "eine"],
          correct: 3,
          explanation: "die Frau → belirsiz: eine Frau.",
        },
        {
          id: 4,
          question: "'-ung' ekiyle biten isimler hangi artikeli alır?",
          options: ["der", "die", "das", "Değişir"],
          correct: 1,
          explanation: "-ung ekli isimler daima dişildir: die Zeitung, die Wohnung, die Meinung.",
        },
        {
          id: 5,
          question: "'_____ Kinder spielen im Garten.' — Çoğul artikel:",
          options: ["Der", "Die", "Das", "Eine"],
          correct: 1,
          explanation: "Çoğulda belirli artikel daima 'die'.",
        },
        {
          id: 6,
          question: "'Ich kaufe _____ Apfel.' — Belirsiz artikel (der Apfel):",
          options: ["eine", "ein", "der", "die"],
          correct: 1,
          explanation: "der Apfel (eril) → belirsiz: ein Apfel.",
        },
        {
          id: 7,
          question: "'-chen' ekiyle biten isimler hangi artikeli alır?",
          options: ["der", "die", "das", "Değişir"],
          correct: 2,
          explanation: "-chen küçültme ekidir ve daima nötr: das Mädchen, das Häuschen.",
        },
        {
          id: 8,
          question: "'Das ist _____ Tisch.' — Doğru belirsiz artikel (der Tisch):",
          options: ["eine", "ein", "der", "die"],
          correct: 1,
          explanation: "der Tisch (eril) → belirsiz: ein Tisch.",
        },
      ],
      fillInBlank: [
        {
          id: 1,
          before: "",
          after: "Schule ist groß. (die Schule — belirli)",
          answer: "Die",
          hint: "die Schule → belirli artikel: Die",
        },
        {
          id: 2,
          before: "Ich habe",
          after: "Hund. (der Hund — belirsiz)",
          answer: "einen",
          hint: "der Hund → belirsiz + Akkusativ: einen",
        },
        {
          id: 3,
          before: "",
          after: "Kind schläft. (das Kind — belirli)",
          answer: "Das",
          hint: "das Kind → Das",
        },
        {
          id: 4,
          before: "Das ist",
          after: "Zeitung. (die Zeitung — belirsiz)",
          answer: "eine",
          hint: "die Zeitung → belirsiz: eine",
        },
        {
          id: 5,
          before: "",
          after: "Bücher sind teuer. (çoğul — belirli)",
          answer: "Die",
          hint: "Çoğul belirli artikel: Die",
        },
      ],
    },
  },

  // ─── 4. Personalpronomen ─────────────────────────────────────────────────
  {
    id: "personalpronomen",
    title: "Personalpronomen",
    subtitle: "Kişi Zamirleri ve du/Sie Farkı",
    explanation:
      "Almancada kişi zamiri seçimi önemlidir: 'du' samimi (arkadaş, aile, çocuklar), 'Sie' (büyük harf) resmi (yabancı, iş, yaşlı). 'er' = o (eril isim için), 'sie' = o (dişil) veya 'onlar', 'es' = o (nötr). 'ihr' = siz (birden fazla kişiye samimi).",
    rules: [
      {
        heading: "Kişi Zamirleri Tablosu",
        body: "8 kişi zamiri Nominativ durumundadır.",
        examples: [
          { de: "Ich komme aus der Türkei.", tr: "Ben Türkiye'den geliyorum." },
          { de: "Er ist Ingenieur. / Sie ist Ärztin.", tr: "O mühendis. / O doktordur." },
          { de: "Sind Sie Herr Müller?", tr: "Siz Bay Müller misiniz? (resmi)" },
        ],
        table: {
          headers: ["Şahıs Zamiri", "Türkçe", "Kullanım"],
          rows: [
            ["ich", "ben", "her zaman"],
            ["du", "sen", "samimi"],
            ["er / sie / es", "o (eril/dişil/nötr)", "her zaman"],
            ["wir", "biz", "her zaman"],
            ["ihr", "siz", "birden fazla kişiye samimi"],
            ["sie", "onlar", "her zaman"],
            ["Sie", "Siz (resmi)", "yabancı, iş, büyükler"],
          ],
        },
      },
      {
        heading: "Zamir ile İsim Eşleştirme",
        body: "İsimlerin yerine kullanılan zamir ismin grammatikal cinsiyetine göre seçilir.",
        examples: [
          { de: "der Vater → er; die Mutter → sie; das Kind → es", tr: "baba → o; anne → o; çocuk → o" },
          { de: "Wo ist der Schlüssel? — Er ist auf dem Tisch.", tr: "Anahtar nerede? — O masanın üstünde." },
        ],
      },
    ],
    exercises: {
      multipleChoice: [
        {
          id: 1,
          question: "Bir yabancıya resmi olarak hitap etmek için hangi zamiri kullanırsınız?",
          options: ["du", "ihr", "Sie", "er"],
          correct: 2,
          explanation: "Resmi hitap: 'Sie' (büyük harfle yazılır).",
        },
        {
          id: 2,
          question: "'die Mutter' → hangi zamirle değiştirilebilir?",
          options: ["er", "sie", "es", "ihr"],
          correct: 1,
          explanation: "die Mutter dişil → sie.",
        },
        {
          id: 3,
          question: "'das Buch' → hangi zamirle değiştirilebilir?",
          options: ["er", "sie", "es", "ihr"],
          correct: 2,
          explanation: "das Buch nötr → es.",
        },
        {
          id: 4,
          question: "Birden fazla arkadaşa hitap etmek için:",
          options: ["du", "Sie", "ihr", "wir"],
          correct: 2,
          explanation: "'ihr' = birden fazla kişiye samimi hitap.",
        },
        {
          id: 5,
          question: "'der Vater' → hangi zamirle değiştirilebilir?",
          options: ["sie", "es", "er", "ihr"],
          correct: 2,
          explanation: "der Vater eril → er.",
        },
        {
          id: 6,
          question: "'Ich und du' yerine kullanılan zamir:",
          options: ["ihr", "wir", "sie", "Sie"],
          correct: 1,
          explanation: "ich + du = wir.",
        },
        {
          id: 7,
          question: "'die Kinder spielen' → 'Die Kinder' yerine:",
          options: ["er", "sie (çoğul)", "es", "ihr"],
          correct: 1,
          explanation: "Çoğul → sie (onlar).",
        },
        {
          id: 8,
          question: "'du' ve 'Sie' arasındaki temel fark:",
          options: [
            "du çoğul, Sie tekil",
            "du samimi, Sie resmi",
            "du eril, Sie dişil",
            "Fark yok",
          ],
          correct: 1,
          explanation: "du = samimi (arkadaş, aile); Sie = resmi (yabancı, iş ortamı).",
        },
      ],
      fillInBlank: [
        {
          id: 1,
          before: "Wo ist der Schlüssel? —",
          after: "ist auf dem Tisch.",
          answer: "Er",
          hint: "der Schlüssel (eril) → Er",
        },
        {
          id: 2,
          before: "Wie heißt die Lehrerin? —",
          after: "heißt Frau Müller.",
          answer: "Sie",
          hint: "die Lehrerin (dişil) → Sie",
        },
        {
          id: 3,
          before: "Paul und ich,",
          after: "sind gute Freunde.",
          answer: "wir",
          hint: "ich + Paul = wir",
        },
        {
          id: 4,
          before: "Wo ist das Kind? —",
          after: "schläft.",
          answer: "Es",
          hint: "das Kind (nötr) → Es",
        },
        {
          id: 5,
          before: "Guten Tag, Herr Schmidt! Wie geht es",
          after: "? (resmi)",
          answer: "Ihnen",
          hint: "Resmi hitap: Sie → Dativ: Ihnen",
        },
      ],
    },
  },

  // ─── 5. Possessivartikel ─────────────────────────────────────────────────
  {
    id: "possessivartikel",
    title: "Possessivartikel",
    subtitle: "İyelik Sıfatları: mein, dein, sein...",
    explanation:
      "İyelik sıfatları kime ait olduğunu gösterir: mein (benim), dein (senin), sein (onun-eril), ihr (onun-dişil), unser (bizim), euer (sizin-samimi), ihr/Ihr (onların/Sizin). Artikel gibi ismin cinsiyetine göre çekilir.",
    rules: [
      {
        heading: "İyelik Sıfatları",
        body: "Possessivartikel ismin cinsiyetine göre sonuç alır: Nominativ eril: kein ek, dişil: -e, nötr: kein ek, çoğul: -e.",
        examples: [
          { de: "mein Vater, meine Mutter, mein Kind", tr: "babam, annem, çocuğum" },
          { de: "dein Bruder, deine Schwester", tr: "erkek kardeşin, kız kardeşin" },
          { de: "Das ist sein Auto.", tr: "Bu onun arabası." },
        ],
        table: {
          headers: ["Zamiri", "İyelik", "Türkçe"],
          rows: [
            ["ich", "mein/meine", "benim"],
            ["du", "dein/deine", "senin"],
            ["er/es", "sein/seine", "onun (eril/nötr)"],
            ["sie", "ihr/ihre", "onun (dişil)"],
            ["wir", "unser/unsere", "bizim"],
            ["ihr", "euer/eure", "sizin (samimi)"],
            ["sie/Sie", "ihr/ihre / Ihr/Ihre", "onların / Sizin"],
          ],
        },
      },
      {
        heading: "Nominativ Çekimi",
        body: "Eril ve nötr: ek yok (mein/sein). Dişil ve çoğul: -e eki (meine/seine).",
        examples: [
          { de: "Mein Vater ist Arzt. (eril — ek yok)", tr: "Babam doktordur." },
          { de: "Meine Mutter ist zu Hause. (dişil — +e)", tr: "Annem evde." },
          { de: "Meine Kinder sind in der Schule. (çoğul — +e)", tr: "Çocuklarım okuldadır." },
        ],
      },
    ],
    exercises: {
      multipleChoice: [
        {
          id: 1,
          question: "'Das ist _____ Buch.' — (ich, das Buch)",
          options: ["meinen", "meine", "mein", "meiner"],
          correct: 2,
          explanation: "das Buch nötr → Nominativ: mein (ek yok).",
        },
        {
          id: 2,
          question: "'_____ Schwester heißt Lisa.' — (du, die Schwester)",
          options: ["Dein", "Deinen", "Deine", "Deiner"],
          correct: 2,
          explanation: "die Schwester dişil → deine (+ e).",
        },
        {
          id: 3,
          question: "'Er liebt _____ Hund.' — (er, der Hund — Akkusativ)",
          options: ["sein", "seinen", "seine", "seiner"],
          correct: 1,
          explanation: "Akkusativ eril: sein + en → seinen.",
        },
        {
          id: 4,
          question: "'Das ist _____ Haus.' — (wir, das Haus)",
          options: ["unser", "unsere", "unserer", "unseren"],
          correct: 0,
          explanation: "das Haus nötr → Nominativ: unser (ek yok).",
        },
        {
          id: 5,
          question: "'Die Lehrerin und _____ Schüler...' — (sie=dişil)",
          options: ["sein", "ihr", "ihre", "ihrer"],
          correct: 2,
          explanation: "sie (dişil) → ihr + e → ihre (çoğul Nominativ).",
        },
        {
          id: 6,
          question: "'Wie ist _____ Name?' — (Sie=resmi)",
          options: ["Ihr", "Ihre", "Ihren", "euer"],
          correct: 0,
          explanation: "Resmi Sie → Ihr. der Name eril → Ihr (ek yok).",
        },
        {
          id: 7,
          question: "'Das ist _____ Auto.' — (du, das Auto)",
          options: ["deine", "dein", "deinen", "deiner"],
          correct: 1,
          explanation: "das Auto nötr → Nominativ: dein (ek yok).",
        },
        {
          id: 8,
          question: "'_____ Eltern sind nett.' — (wir, Eltern=çoğul)",
          options: ["Unser", "Unsere", "Unserer", "Unseren"],
          correct: 1,
          explanation: "Çoğul Nominativ: unsere (+e).",
        },
      ],
      fillInBlank: [
        {
          id: 1,
          before: "Das ist",
          after: "Bruder. (ich — der Bruder)",
          answer: "mein",
          hint: "der Bruder (eril, Nominativ) → mein",
        },
        {
          id: 2,
          before: "Sie liebt",
          after: "Katze. (sie=dişil — die Katze)",
          answer: "ihre",
          hint: "die Katze (dişil) → ihre",
        },
        {
          id: 3,
          before: "Wo ist",
          after: "Schlüssel? (du — der Schlüssel)",
          answer: "dein",
          hint: "der Schlüssel (eril, Nominativ) → dein",
        },
        {
          id: 4,
          before: "Das ist",
          after: "Haus. (wir — das Haus)",
          answer: "unser",
          hint: "das Haus (nötr) → unser",
        },
        {
          id: 5,
          before: "Er fährt mit",
          after: "Auto. (er — das Auto — Dativ nötr)",
          answer: "seinem",
          hint: "Dativ nötr: sein + em → seinem",
        },
      ],
    },
  },

  // ─── 6. Negation: nicht & kein ───────────────────────────────────────────
  {
    id: "negation-nicht-kein",
    title: "Negation: nicht & kein",
    subtitle: "Olumsuz Cümleler",
    explanation:
      "'kein/keine' belirsiz artikelli veya artikelsiz isimleri olumsuzlar. 'nicht' ise fiilleri, sıfatları, belirli artikelli isimleri ve zarfları olumsuzlar. 'kein' artikel gibi çekilir.",
    rules: [
      {
        heading: "kein — Kullanımı",
        body: "'kein' ein/eine yerine kullanılır. Çekimi: kein (eril/nötr), keine (dişil/çoğul).",
        examples: [
          { de: "Ich habe kein Buch.", tr: "Kitabım yok. (ein Buch → kein Buch)" },
          { de: "Er hat keine Schwester.", tr: "Kız kardeşi yok." },
          { de: "Wir haben keine Kinder.", tr: "Çocuklarımız yok." },
        ],
      },
      {
        heading: "nicht — Kullanımı",
        body: "'nicht' fiil, sıfat veya belirli artikelli ismi olumsuzlar. Genellikle olumsuzlanan ögenin önünde yer alır.",
        examples: [
          { de: "Ich komme nicht.", tr: "Gelmiyorum. (fiil olumsuzlama)" },
          { de: "Das ist nicht richtig.", tr: "Bu doğru değil. (sıfat)" },
          { de: "Ich nehme nicht den Bus.", tr: "Otobüsü almıyorum. (belirli artikelli isim)" },
        ],
      },
    ],
    exercises: {
      multipleChoice: [
        {
          id: 1,
          question: "'Ich habe _____ Zeit.' — Doğru olumsuz form:",
          options: ["nicht", "keine", "kein", "nichts"],
          correct: 1,
          explanation: "Zeit (dişil, artikelsiz) → keine Zeit.",
        },
        {
          id: 2,
          question: "'Er kommt _____.' — Fiili olumsuzlamak için:",
          options: ["kein", "keine", "nicht", "nichts"],
          correct: 2,
          explanation: "Fiil olumsuzlaması: nicht.",
        },
        {
          id: 3,
          question: "'Das ist _____ Hund.' — (kein ya da nicht?)",
          options: ["nicht", "kein", "keine", "keiner"],
          correct: 1,
          explanation: "Belirsiz artikelli isim (ein Hund) → kein Hund.",
        },
        {
          id: 4,
          question: "'Sie ist _____ müde.' — Sıfat olumsuzlaması:",
          options: ["kein", "keine", "nicht", "keinen"],
          correct: 2,
          explanation: "Sıfat olumsuzlaması: nicht.",
        },
        {
          id: 5,
          question: "'Wir haben _____ Kinder.' — Doğru form:",
          options: ["keine", "kein", "nicht", "keiner"],
          correct: 0,
          explanation: "Kinder (çoğul) → keine.",
        },
        {
          id: 6,
          question: "Hangi cümle dilbilgisel olarak doğrudur?",
          options: [
            "Ich habe keine Hunger.",
            "Ich habe kein Hunger.",
            "Ich habe nicht Hunger.",
            "Ich habe keinen Hunger.",
          ],
          correct: 3,
          explanation: "der Hunger (eril, Akkusativ) → keinen Hunger.",
        },
        {
          id: 7,
          question: "'Das ist _____ mein Buch.' — (başkasının kitabı, belirli artikelli)",
          options: ["kein", "keine", "nicht", "keinen"],
          correct: 2,
          explanation: "Belirli artikelli ismi olumsuzlamak için: nicht.",
        },
        {
          id: 8,
          question: "'Ich spreche _____ Englisch.' — (hiç Ingilizce bilmiyor)",
          options: ["nicht", "kein", "keine", "keinen"],
          correct: 0,
          explanation: "Fiil olumsuzlaması veya artikelsiz dil adları: nicht.",
        },
      ],
      fillInBlank: [
        {
          id: 1,
          before: "Ich habe",
          after: "Bruder. (kein Bruder var)",
          answer: "keinen",
          hint: "der Bruder (eril, Akkusativ) → keinen",
        },
        {
          id: 2,
          before: "Er kommt",
          after: "heute. (nicht/kein?)",
          answer: "nicht",
          hint: "Fiil olumsuzlaması: nicht",
        },
        {
          id: 3,
          before: "Sie hat",
          after: "Zeit. (die Zeit — artikelsiz)",
          answer: "keine",
          hint: "dişil artikelsiz isim → keine",
        },
        {
          id: 4,
          before: "Das ist",
          after: "richtig.",
          answer: "nicht",
          hint: "Sıfat olumsuzlaması: nicht",
        },
        {
          id: 5,
          before: "Wir haben",
          after: "Geld. (das Geld)",
          answer: "kein",
          hint: "das Geld (nötr, artikelsiz) → kein",
        },
      ],
    },
  },

  // ─── 7. Modalverben ──────────────────────────────────────────────────────
  {
    id: "modalverben-a1",
    title: "Modalverben",
    subtitle: "können, müssen, wollen, möchten, dürfen, sollen",
    explanation:
      "Modal fiiller cümledeki ana fiille birlikte kullanılır. Ana fiil sona gider ve yalın halde (Infinitiv) kullanılır. Modal fiilin çekimi öğrenilmesi gereken kısımdır. A1'de en önemli modaller: können (yapabilmek), müssen (zorunda olmak), wollen (istemek), möchten (istemek — kibarca).",
    rules: [
      {
        heading: "Cümle Yapısı",
        body: "Modal fiil + Infinitiv sona. Olumsuzda 'nicht' modalin arkasına, Infinitiv'in önüne gelir.",
        examples: [
          { de: "Ich kann Deutsch sprechen.", tr: "Almanca konuşabiliyorum." },
          { de: "Er muss heute arbeiten.", tr: "O bugün çalışmak zorunda." },
          { de: "Wir möchten einen Kaffee bestellen.", tr: "Bir kahve ısmarlamak istiyoruz." },
        ],
        table: {
          headers: ["Şahıs", "können", "müssen", "wollen", "möchten"],
          rows: [
            ["ich", "kann", "muss", "will", "möchte"],
            ["du", "kannst", "musst", "willst", "möchtest"],
            ["er/sie/es", "kann", "muss", "will", "möchte"],
            ["wir", "können", "müssen", "wollen", "möchten"],
            ["ihr", "könnt", "müsst", "wollt", "möchtet"],
            ["sie/Sie", "können", "müssen", "wollen", "möchten"],
          ],
        },
      },
      {
        heading: "Anlam Farkları",
        body: "'wollen' güçlü istek; 'möchten' kibarca istek; 'können' yetenek; 'müssen' zorunluluk; 'dürfen' izin; 'sollen' görev/emir.",
        examples: [
          { de: "Ich will Arzt werden. (güçlü istek)", tr: "Doktor olmak istiyorum." },
          { de: "Ich möchte bitte Wasser. (kibar talep)", tr: "Lütfen su istiyorum." },
          { de: "Du musst das lernen. (zorunluluk)", tr: "Bunu öğrenmek zorundasın." },
        ],
      },
    ],
    exercises: {
      multipleChoice: [
        {
          id: 1,
          question: "'Ich _____ heute nicht kommen.' — (zorunluluk yok = können değil)",
          options: ["kann", "muss", "will", "darf"],
          correct: 0,
          explanation: "'kann nicht kommen' = gelemiyorum (yapamıyorum).",
        },
        {
          id: 2,
          question: "'Sie _____ bitte leiser sprechen.' — Kibarca istek:",
          options: ["will", "muss", "möchte", "soll"],
          correct: 2,
          explanation: "'möchten' kibarca istek veya talep için.",
        },
        {
          id: 3,
          question: "Modal fiille cümlede Infinitiv nerede yer alır?",
          options: ["Başta", "İkinci sırada", "Cümle sonunda", "Modalin önünde"],
          correct: 2,
          explanation: "Modal + ... + Infinitiv (sonda).",
        },
        {
          id: 4,
          question: "'Er _____ nicht rauchen.' — Sigara içmesi yasak:",
          options: ["kann", "muss", "darf", "soll"],
          correct: 2,
          explanation: "'darf nicht' = yasak, izin yok.",
        },
        {
          id: 5,
          question: "'du' ile 'müssen' doğru çekimi:",
          options: ["muss", "musst", "müsst", "müssen"],
          correct: 1,
          explanation: "du → musst.",
        },
        {
          id: 6,
          question: "'Wir _____ morgen früh aufstehen.' — Zorunluluk:",
          options: ["können", "wollen", "müssen", "möchten"],
          correct: 2,
          explanation: "Zorunluluk: müssen → wir müssen.",
        },
        {
          id: 7,
          question: "'ich' ile 'können' doğru çekimi:",
          options: ["könnte", "kannst", "kann", "können"],
          correct: 2,
          explanation: "ich → kann.",
        },
        {
          id: 8,
          question: "'Sie _____ Klavier spielen.' — Yetenek anlamında:",
          options: ["muss", "will", "kann", "darf"],
          correct: 2,
          explanation: "Yetenek için 'können': kann.",
        },
      ],
      fillInBlank: [
        {
          id: 1,
          before: "Ich",
          after: "heute nicht kommen. (können — olumsuz)",
          answer: "kann",
          hint: "ich → kann",
        },
        {
          id: 2,
          before: "Du",
          after: "das Formular ausfüllen. (müssen)",
          answer: "musst",
          hint: "du → musst",
        },
        {
          id: 3,
          before: "Er",
          after: "einen Kaffee bestellen. (möchten)",
          answer: "möchte",
          hint: "er → möchte",
        },
        {
          id: 4,
          before: "Wir",
          after: "hier nicht parken. (dürfen — olumsuz)",
          answer: "dürfen",
          hint: "wir → dürfen",
        },
        {
          id: 5,
          before: "Ihr",
          after: "das nicht vergessen! (sollen)",
          answer: "sollt",
          hint: "ihr → sollt",
        },
      ],
    },
  },

  // ─── 8. Trennbare Verben ─────────────────────────────────────────────────
  {
    id: "trennbare-verben",
    title: "Trennbare Verben",
    subtitle: "Ayrılabilen Fiiller",
    explanation:
      "Bazı Almanca fiiller önek + fiil kökünden oluşur ve cümle içinde önek sona gider. Örnek: aufstehen = auf + stehen. 'Ich stehe um 7 Uhr auf.' Yaygın önekler: an-, auf-, aus-, ein-, ab-, mit-, vor-, zu-, zurück-.",
    rules: [
      {
        heading: "Ayrılma Kuralı",
        body: "Çekimli fiil 2. sırada, önek sonda yer alır. Olumsuzda 'nicht' önekin önüne gelir.",
        examples: [
          { de: "Ich stehe um 7 Uhr auf.", tr: "Saat 7'de kalkıyorum." },
          { de: "Sie ruft ihren Freund an.", tr: "Erkek arkadaşını arıyor." },
          { de: "Wann fährt der Zug ab?", tr: "Tren ne zaman hareket ediyor?" },
        ],
      },
      {
        heading: "Yaygın Ayrılabilen Fiiller",
        body: "aufmachen (açmak), zumachen (kapatmak), anfangen (başlamak), aufhören (durmak), einladen (davet etmek), mitkommen (birlikte gelmek).",
        examples: [
          { de: "Bitte machen Sie die Tür auf.", tr: "Lütfen kapıyı açın." },
          { de: "Der Kurs fängt um 9 Uhr an.", tr: "Kurs saat 9'da başlıyor." },
          { de: "Kommst du mit?", tr: "Birlikte gelir misin?" },
        ],
      },
    ],
    exercises: {
      multipleChoice: [
        {
          id: 1,
          question: "'Ich _____ um 6 Uhr _____.' — aufstehen",
          options: ["aufstehe / —", "stehe / auf", "steh / auf", "stehen / auf"],
          correct: 1,
          explanation: "Trennbar: stehe (2. sıra) + auf (sonda).",
        },
        {
          id: 2,
          question: "Ayrılabilen fiillerde önek nerede yer alır?",
          options: ["Cümle başında", "Fiilin hemen önünde", "Cümle sonunda", "İkinci sırada"],
          correct: 2,
          explanation: "Ayrılabilen fiillerde önek cümle sonuna gider.",
        },
        {
          id: 3,
          question: "'Der Kurs _____ um 9 Uhr _____.' — anfangen",
          options: ["anfängt / —", "fängt / an", "fangen / an", "fang / an"],
          correct: 1,
          explanation: "anfangen: fängt (çekimli) + an (sonda).",
        },
        {
          id: 4,
          question: "Hangi fiil ayrılabilen (trennbar) bir fiildir?",
          options: ["verstehen", "beginnen", "anrufen", "arbeiten"],
          correct: 2,
          explanation: "an-rufen trennbar. verstehen ve beginnen ayrılmaz (untrennbar).",
        },
        {
          id: 5,
          question: "'Sie ruft ihren Freund _____.' — anrufen",
          options: ["an", "auf", "aus", "ab"],
          correct: 0,
          explanation: "anrufen = an + rufen → önek 'an' sona gider.",
        },
        {
          id: 6,
          question: "'Wann _____ der Zug _____?' — abfahren",
          options: ["fährt / ab", "fahrt / ab", "abfährt / —", "fähren / ab"],
          correct: 0,
          explanation: "abfahren: fährt (çekimli) + ab (sonda).",
        },
        {
          id: 7,
          question: "'Ich mache die Tür nicht _____.' — aufmachen (olumsuz)",
          options: ["auf", "an", "aus", "ab"],
          correct: 0,
          explanation: "aufmachen → nicht + auf (sonda). 'nicht' önekin önüne gelir.",
        },
        {
          id: 8,
          question: "'Kommt ihr _____?' — mitkommen",
          options: ["mit", "an", "auf", "ein"],
          correct: 0,
          explanation: "mitkommen: kommt (çekimli) + mit (sonda).",
        },
      ],
      fillInBlank: [
        {
          id: 1,
          before: "Ich",
          after: "täglich um 7 Uhr auf. (aufstehen)",
          answer: "stehe",
          hint: "aufstehen → stehe...auf (sonda)",
        },
        {
          id: 2,
          before: "Der Film",
          after: "um 20 Uhr an. (anfangen)",
          answer: "fängt",
          hint: "anfangen → fängt...an (a→ä Umlaut!)",
        },
        {
          id: 3,
          before: "Sie",
          after: "ihre Mutter jeden Tag an. (anrufen)",
          answer: "ruft",
          hint: "anrufen → ruft...an",
        },
        {
          id: 4,
          before: "Wann",
          after: "der Unterricht auf? (aufhören)",
          answer: "hört",
          hint: "aufhören → hört...auf",
        },
        {
          id: 5,
          before: "Er",
          after: "alle Freunde ein. (einladen)",
          answer: "lädt",
          hint: "einladen → lädt...ein (a→ä)",
        },
      ],
    },
  },

  // ─── 9. Akkusativ ────────────────────────────────────────────────────────
  {
    id: "akkusativ",
    title: "Akkusativ",
    subtitle: "Nesne Hali (4. Durum)",
    explanation:
      "Akkusativ cümledeki nesneyi (eylemi doğrudan etkileyen şeyi) gösterir. Türkçede '-ı/-i/-u/-ü' veya '-yı/-yi/-yu/-yü' ekine karşılık gelir. Artikel değişimi yalnızca eril isimde görülür: der → den, ein → einen.",
    rules: [
      {
        heading: "Artikel Akkusativ Değişimi",
        body: "Yalnızca eril isimde değişim: der → den, ein → einen, kein → keinen, mein → meinen. Dişil, nötr ve çoğul değişmez.",
        examples: [
          { de: "Ich sehe den Mann. (der → den)", tr: "Adamı görüyorum." },
          { de: "Sie kauft einen Apfel. (ein → einen)", tr: "Bir elma satın alıyor." },
          { de: "Er hat die Zeitung. (değişmez)", tr: "Gazeteyi var." },
        ],
        table: {
          headers: ["Cinsiyet", "Nominativ", "Akkusativ"],
          rows: [
            ["Eril (m)", "der / ein", "den / einen"],
            ["Dişil (f)", "die / eine", "die / eine"],
            ["Nötr (n)", "das / ein", "das / ein"],
            ["Çoğul", "die / —", "die / —"],
          ],
        },
      },
      {
        heading: "Akkusativ Alan Fiiller",
        body: "haben, sehen, kaufen, lesen, nehmen, kennen, lieben, brauchen, essen, trinken...",
        examples: [
          { de: "Ich brauche einen Stift.", tr: "Bir kaleme ihtiyacım var." },
          { de: "Er liebt seinen Bruder.", tr: "Erkek kardeşini seviyor." },
        ],
      },
    ],
    exercises: {
      multipleChoice: [
        {
          id: 1,
          question: "'Ich kaufe _____ Hund.' — (der Hund)",
          options: ["der", "die", "den", "das"],
          correct: 2,
          explanation: "Akkusativ eril: der → den.",
        },
        {
          id: 2,
          question: "'Sie liest _____ Buch.' — (das Buch)",
          options: ["den", "dem", "das", "die"],
          correct: 2,
          explanation: "Akkusativ nötr değişmez: das.",
        },
        {
          id: 3,
          question: "'Er kauft _____ Apfel.' — (ein Apfel)",
          options: ["einen", "eine", "ein", "einen"],
          correct: 0,
          explanation: "Akkusativ eril belirsiz: ein → einen.",
        },
        {
          id: 4,
          question: "Akkusativ'de hangi artikelde değişim olur?",
          options: ["Dişil", "Nötr", "Eril", "Çoğul"],
          correct: 2,
          explanation: "Yalnızca eril artikelde değişim: der → den, ein → einen.",
        },
        {
          id: 5,
          question: "'Ich habe _____ Schwester.' — (keine Schwester, die Schwester)",
          options: ["kein", "keinen", "keine", "keiner"],
          correct: 2,
          explanation: "Akkusativ dişil: keine (değişmez).",
        },
        {
          id: 6,
          question: "'Sie sieht _____ Film.' — (der Film)",
          options: ["das", "die", "der", "den"],
          correct: 3,
          explanation: "Akkusativ eril: der → den Film.",
        },
        {
          id: 7,
          question: "'Ich trinke _____ Kaffee.' — (der Kaffee — belirsiz)",
          options: ["den", "einen", "eine", "ein"],
          correct: 1,
          explanation: "Akkusativ eril belirsiz: einen Kaffee.",
        },
        {
          id: 8,
          question: "'Er liebt _____ Kinder.' — (çoğul)",
          options: ["die", "den", "das", "der"],
          correct: 0,
          explanation: "Akkusativ çoğul değişmez: die.",
        },
      ],
      fillInBlank: [
        {
          id: 1,
          before: "Ich kaufe",
          after: "Hund. (ein Hund — Akkusativ)",
          answer: "einen",
          hint: "Akkusativ eril belirsiz: ein → einen",
        },
        {
          id: 2,
          before: "Er sieht",
          after: "Frau. (die Frau — Akkusativ)",
          answer: "die",
          hint: "Akkusativ dişil: die (değişmez)",
        },
        {
          id: 3,
          before: "Wir brauchen",
          after: "Computer. (der Computer — Akkusativ)",
          answer: "einen",
          hint: "Akkusativ eril belirsiz: einen",
        },
        {
          id: 4,
          before: "Sie trinkt",
          after: "Tee. (der Tee — Akkusativ)",
          answer: "den",
          hint: "Akkusativ eril belirli: den",
        },
        {
          id: 5,
          before: "Ich habe",
          after: "Hunger. (kein Hunger — eril, Akkusativ)",
          answer: "keinen",
          hint: "Akkusativ eril kein: keinen",
        },
      ],
    },
  },

  // ─── 10. Dativ: Ortsangaben ──────────────────────────────────────────────
  {
    id: "dativ-ortsangaben",
    title: "Dativ: Ortsangaben",
    subtitle: "Yer Bildiren Edatlar ve 3. Durum",
    explanation:
      "Dativ (3. durum) Almancada dolaylı nesneyi gösterir ve bazı edatlar her zaman Dativ ister: aus, bei, mit, nach, seit, von, zu, gegenüber. Bu edatlardan sonra artikel değişir: dem (eril/nötr), der (dişil), den+n (çoğul).",
    rules: [
      {
        heading: "Daima Dativ Alan Edatlar",
        body: "aus, bei, mit, nach, seit, von, zu, gegenüber → her zaman Dativ.",
        examples: [
          { de: "Ich komme aus der Türkei.", tr: "Türkiye'den geliyorum." },
          { de: "Er wohnt bei seiner Mutter.", tr: "Annesinin yanında yaşıyor." },
          { de: "Wir fahren mit dem Bus.", tr: "Otobüsle gidiyoruz." },
          { de: "Sie geht zum Arzt. (zu + dem = zum)", tr: "Doktora gidiyor." },
        ],
        table: {
          headers: ["Cinsiyet", "Nominativ", "Dativ"],
          rows: [
            ["Eril (m)", "der / ein", "dem / einem"],
            ["Dişil (f)", "die / eine", "der / einer"],
            ["Nötr (n)", "das / ein", "dem / einem"],
            ["Çoğul", "die / —", "den + n / —"],
          ],
        },
      },
      {
        heading: "Birleşik Formlar (Kontraktionen)",
        body: "zu + dem = zum, zu + der = zur, von + dem = vom, bei + dem = beim, an + dem = am.",
        examples: [
          { de: "zum Supermarkt, zur Schule", tr: "süpermarkete, okula" },
          { de: "vom Bahnhof, beim Arzt", tr: "istasyondan, doktorda" },
        ],
      },
    ],
    exercises: {
      multipleChoice: [
        {
          id: 1,
          question: "'Wir fahren mit _____ Zug.' — (der Zug)",
          options: ["der", "dem", "den", "das"],
          correct: 1,
          explanation: "mit → Dativ eril: dem Zug.",
        },
        {
          id: 2,
          question: "'Sie wohnt bei _____ Eltern.' — (die Eltern=çoğul)",
          options: ["die", "der", "dem", "den"],
          correct: 3,
          explanation: "Dativ çoğul: den Eltern.",
        },
        {
          id: 3,
          question: "'zu + dem' = ?",
          options: ["zem", "zum", "zur", "zun"],
          correct: 1,
          explanation: "zu + dem = zum (birleşik form).",
        },
        {
          id: 4,
          question: "'Er kommt aus _____ Schweiz.' — (die Schweiz=dişil)",
          options: ["dem", "die", "der", "den"],
          correct: 2,
          explanation: "aus → Dativ dişil: der Schweiz.",
        },
        {
          id: 5,
          question: "'von + dem' = ?",
          options: ["vonem", "vom", "vonder", "vodem"],
          correct: 1,
          explanation: "von + dem = vom.",
        },
        {
          id: 6,
          question: "'Ich gehe _____ Arzt.' — (zu + der Arzt)",
          options: ["zur", "zum", "vom", "beim"],
          correct: 1,
          explanation: "zu + dem Arzt (eril) = zum Arzt.",
        },
        {
          id: 7,
          question: "'Sie kommt von _____ Schule.' — (die Schule=dişil, von + der = ?)",
          options: ["vom", "von der", "zur", "von dem"],
          correct: 1,
          explanation: "von + der bleibt 'von der' (dişilde birleşme yok).",
        },
        {
          id: 8,
          question: "'Dativ'de eril/nötr belirli artikel nedir?",
          options: ["der", "die", "dem", "den"],
          correct: 2,
          explanation: "Dativ eril/nötr belirli artikel: dem.",
        },
      ],
      fillInBlank: [
        {
          id: 1,
          before: "Ich fahre mit",
          after: "Auto. (das Auto — Dativ)",
          answer: "dem",
          hint: "Dativ nötr: dem",
        },
        {
          id: 2,
          before: "Er geht",
          after: "Supermarkt. (zu + dem)",
          answer: "zum",
          hint: "zu + dem = zum",
        },
        {
          id: 3,
          before: "Sie kommt aus",
          after: "Türkei. (die Türkei — Dativ)",
          answer: "der",
          hint: "Dativ dişil: der",
        },
        {
          id: 4,
          before: "Wir kommen",
          after: "Bahnhof. (von + dem)",
          answer: "vom",
          hint: "von + dem = vom",
        },
        {
          id: 5,
          before: "Er wohnt bei",
          after: "Freunden. (çoğul Dativ)",
          answer: "seinen",
          hint: "Dativ çoğul Possessivartikel: seinen",
        },
      ],
    },
  },

  // ─── 11. Plural der Nomen ────────────────────────────────────────────────
  {
    id: "plural-nomen",
    title: "Plural der Nomen",
    subtitle: "İsimlerin Çoğul Yapısı",
    explanation:
      "Almancada çoğul yapısı tutarsızdır ve isimle birlikte ezberlenmelidir. 5 temel çoğul türü vardır: -e, -er, -(e)n, -s (yabancı kelimeler), değişmez. Dikkat: Çoğulda Umlaut (ä, ö, ü) eklenebilir.",
    rules: [
      {
        heading: "5 Temel Çoğul Türü",
        body: "Her ismin çoğulunu sözlüğe bakarak öğrenmek en güvenli yoldur.",
        examples: [
          { de: "der Tag → die Tage (-e)", tr: "gün → günler" },
          { de: "das Kind → die Kinder (-er + Umlaut yok)", tr: "çocuk → çocuklar" },
          { de: "die Frau → die Frauen (-en)", tr: "kadın → kadınlar" },
          { de: "das Auto → die Autos (-s)", tr: "araba → arabalar" },
          { de: "der Lehrer → die Lehrer (değişmez)", tr: "öğretmen → öğretmenler" },
        ],
        table: {
          headers: ["Tür", "Ek", "Örnek"],
          rows: [
            ["Tip 1", "-e", "der Tag → die Tage"],
            ["Tip 2", "-er (Umlaut mümkün)", "das Haus → die Häuser"],
            ["Tip 3", "-(e)n", "die Frau → die Frauen"],
            ["Tip 4", "-s", "das Auto → die Autos"],
            ["Tip 5", "Değişmez", "der Lehrer → die Lehrer"],
          ],
        },
      },
      {
        heading: "Yaygın Çoğullar",
        body: "Sık kullanılan isimlerin çoğullarını ezberleyin.",
        examples: [
          { de: "das Buch → die Bücher, der Mann → die Männer", tr: "kitaplar, adamlar" },
          { de: "die Mutter → die Mütter, der Vater → die Väter", tr: "anneler, babalar" },
        ],
      },
    ],
    exercises: {
      multipleChoice: [
        {
          id: 1,
          question: "'das Kind' — Doğru çoğul:",
          options: ["die Kinde", "die Kinds", "die Kinder", "die Kindern"],
          correct: 2,
          explanation: "das Kind → die Kinder (-er eki).",
        },
        {
          id: 2,
          question: "'die Frau' — Doğru çoğul:",
          options: ["die Fraus", "die Frauen", "die Fraue", "die Frauen"],
          correct: 1,
          explanation: "die Frau → die Frauen (-en eki).",
        },
        {
          id: 3,
          question: "'das Auto' — Doğru çoğul:",
          options: ["die Aute", "die Autoen", "die Autos", "die Auter"],
          correct: 2,
          explanation: "das Auto → die Autos (-s eki, yabancı kelime).",
        },
        {
          id: 4,
          question: "'das Haus' — Doğru çoğul:",
          options: ["die Haus", "die Häuser", "die Hauser", "die Häuse"],
          correct: 1,
          explanation: "das Haus → die Häuser (-er + Umlaut: a→ä).",
        },
        {
          id: 5,
          question: "Çoğulda hangi belirli artikel kullanılır?",
          options: ["der", "die", "das", "Değişir"],
          correct: 1,
          explanation: "Çoğulda daima 'die' belirli artikel.",
        },
        {
          id: 6,
          question: "'der Lehrer' — Doğru çoğul:",
          options: ["die Lehrers", "die Lehrern", "die Lehrer", "die Lehrere"],
          correct: 2,
          explanation: "der Lehrer → die Lehrer (değişmez).",
        },
        {
          id: 7,
          question: "'der Tag' — Doğru çoğul:",
          options: ["die Tags", "die Tager", "die Tage", "die Täge"],
          correct: 2,
          explanation: "der Tag → die Tage (-e eki).",
        },
        {
          id: 8,
          question: "'das Buch' — Doğru çoğul:",
          options: ["die Buchs", "die Bücher", "die Buch", "die Buchen"],
          correct: 1,
          explanation: "das Buch → die Bücher (-er + Umlaut: u→ü).",
        },
      ],
      fillInBlank: [
        {
          id: 1,
          before: "Ich habe drei",
          after: ". (das Buch — çoğul)",
          answer: "Bücher",
          hint: "Buch → Bücher (u→ü + -er)",
        },
        {
          id: 2,
          before: "Die",
          after: "spielen im Park. (das Kind — çoğul)",
          answer: "Kinder",
          hint: "Kind → Kinder",
        },
        {
          id: 3,
          before: "Viele",
          after: "kommen heute. (die Frau — çoğul)",
          answer: "Frauen",
          hint: "Frau → Frauen (-en)",
        },
        {
          id: 4,
          before: "Er hat zwei",
          after: ". (das Auto — çoğul)",
          answer: "Autos",
          hint: "Auto → Autos (-s)",
        },
        {
          id: 5,
          before: "Die",
          after: "arbeiten in der Schule. (der Lehrer — çoğul)",
          answer: "Lehrer",
          hint: "Lehrer → Lehrer (değişmez)",
        },
      ],
    },
  },

  // ─── 12. Imperativ ──────────────────────────────────────────────────────
  {
    id: "imperativ",
    title: "Imperativ",
    subtitle: "Emir Kipi",
    explanation:
      "Almancada emir kipi üç formu vardır: du (samimi tekil), ihr (samimi çoğul), Sie (resmi). Du-form: fiil kökü + geniş çaplı kural. Güçlü fiillerde (e→i değişimi) bu değişim korunur: geben → gib!, nehmen → nimm!",
    rules: [
      {
        heading: "Imperativ Formları",
        body: "du-form: kök (+e mümkün). ihr-form: normal çekim -ihr. Sie-form: Infinitiv + Sie.",
        examples: [
          { de: "Komm! / Kommt! / Kommen Sie!", tr: "Gel! / Gelin (siz)! / Buyurun gelin!" },
          { de: "Mach die Tür zu! / Macht die Tür zu!", tr: "Kapıyı kapat! / Kapatın!" },
          { de: "Schreib langsam! / Schreiben Sie langsam!", tr: "Yavaş yaz! / Yavaş yazın!" },
        ],
        table: {
          headers: ["Fiil", "du", "ihr", "Sie"],
          rows: [
            ["kommen", "Komm!", "Kommt!", "Kommen Sie!"],
            ["machen", "Mach!", "Macht!", "Machen Sie!"],
            ["gehen", "Geh!", "Geht!", "Gehen Sie!"],
            ["geben (e→i)", "Gib!", "Gebt!", "Geben Sie!"],
            ["nehmen (e→i)", "Nimm!", "Nehmt!", "Nehmen Sie!"],
          ],
        },
      },
      {
        heading: "sein Emir Kipi",
        body: "sein düzensizdir: Sei! / Seid! / Seien Sie!",
        examples: [
          { de: "Sei ruhig!", tr: "Sessiz ol!" },
          { de: "Seid bitte pünktlich!", tr: "Lütfen zamanında olun!" },
          { de: "Seien Sie vorsichtig!", tr: "Dikkatli olun!" },
        ],
      },
    ],
    exercises: {
      multipleChoice: [
        {
          id: 1,
          question: "'kommen' — du emir kipi:",
          options: ["Kommst!", "Komme!", "Komm!", "Kommen!"],
          correct: 2,
          explanation: "du-Imperativ: Komm! (kök, -st olmadan).",
        },
        {
          id: 2,
          question: "'geben' — du emir kipi (e→i değişimi):",
          options: ["Gebe!", "Gib!", "Gibt!", "Geben!"],
          correct: 1,
          explanation: "geben e→i değişimi yapar: Gib!",
        },
        {
          id: 3,
          question: "Resmi emir kipi (Sie) nasıl oluşturulur?",
          options: [
            "Fiil kökü + Sie",
            "Infinitiv + Sie (önde)",
            "Infinitiv + Sie (sonda)",
            "Partizip + Sie",
          ],
          correct: 1,
          explanation: "Sie-Imperativ: Infinitiv + Sie → 'Kommen Sie!'",
        },
        {
          id: 4,
          question: "'Seid ruhig!' — Bu hangi forma hitap ediyor?",
          options: ["du", "Sie", "ihr", "wir"],
          correct: 2,
          explanation: "Seid = ihr-Imperativ (birden fazla kişiye samimi).",
        },
        {
          id: 5,
          question: "'machen' — ihr emir kipi:",
          options: ["Mach!", "Mache!", "Macht!", "Machen!"],
          correct: 2,
          explanation: "ihr-Imperativ: Macht! (normal ihr çekimi).",
        },
        {
          id: 6,
          question: "'sein' — du emir kipi:",
          options: ["Bist!", "Ist!", "Sei!", "Sind!"],
          correct: 2,
          explanation: "sein düzensizdir: Sei! (du-Imperativ).",
        },
        {
          id: 7,
          question: "'nehmen' — du emir kipi:",
          options: ["Nimmst!", "Nehm!", "Nimm!", "Nehme!"],
          correct: 2,
          explanation: "nehmen e→i: Nimm! (geminasyon: mm).",
        },
        {
          id: 8,
          question: "'Bitte sprechen Sie langsamer!' — Bu hangi form?",
          options: ["du", "ihr", "Sie", "wir"],
          correct: 2,
          explanation: "Infinitiv + Sie = resmi emir.",
        },
      ],
      fillInBlank: [
        {
          id: 1,
          before: "",
          after: "das Fenster! (öffnen — du)",
          answer: "Öffne",
          hint: "öffnen du-Imperativ: Öffne! (kök + e, -t ile biten köklerde)",
        },
        {
          id: 2,
          before: "",
          after: "bitte Platz! (nehmen — Sie)",
          answer: "Nehmen Sie",
          hint: "nehmen Sie-Imperativ: Nehmen Sie",
        },
        {
          id: 3,
          before: "",
          after: "ruhig! (sein — ihr)",
          answer: "Seid",
          hint: "sein ihr-Imperativ: Seid",
        },
        {
          id: 4,
          before: "",
          after: "mir bitte! (helfen — du, e→i)",
          answer: "Hilf",
          hint: "helfen e→i: Hilf!",
        },
        {
          id: 5,
          before: "",
          after: "vorsichtig! (sein — Sie)",
          answer: "Seien Sie",
          hint: "sein Sie-Imperativ: Seien Sie",
        },
      ],
    },
  },

  // ─── 13. Präteritum: sein & haben ────────────────────────────────────────
  {
    id: "praeteritum-sein-haben",
    title: "Präteritum: sein & haben",
    subtitle: "Geçmiş Zaman: war & hatte",
    explanation:
      "Konuşma dilinde geçmişi anlatmak için Perfekt kullanılır. Ancak 'sein' (war) ve 'haben' (hatte) her zaman Präteritum'da kullanılır — hem yazılı hem sözlü dilde. Modal fiiller de Präteritum alır: musste, konnte, wollte...",
    rules: [
      {
        heading: "sein Präteritum",
        body: "war, warst, war, waren, wart, waren — düzensiz.",
        examples: [
          { de: "Gestern war ich krank.", tr: "Dün hastaydım." },
          { de: "Wir waren in Berlin.", tr: "Berlin'deydik." },
          { de: "Warst du zufrieden?", tr: "Memnun muydun?" },
        ],
        table: {
          headers: ["Şahıs", "sein (Präteritum)", "haben (Präteritum)"],
          rows: [
            ["ich", "war", "hatte"],
            ["du", "warst", "hattest"],
            ["er/sie/es", "war", "hatte"],
            ["wir", "waren", "hatten"],
            ["ihr", "wart", "hattet"],
            ["sie/Sie", "waren", "hatten"],
          ],
        },
      },
      {
        heading: "Kullanım Kuralı",
        body: "Konuşmada: war/hatte + Modal Präteritum (musste, konnte, wollte, durfte, sollte). Diğer fiillerde Perfekt tercih edilir.",
        examples: [
          { de: "Ich hatte keine Zeit. (Präteritum — doğru)", tr: "Zamanım yoktu." },
          { de: "Er musste früh aufstehen.", tr: "Erken kalkmak zorundaydı." },
          { de: "Sie konnte nicht kommen.", tr: "Gelemiyordu." },
        ],
      },
    ],
    exercises: {
      multipleChoice: [
        {
          id: 1,
          question: "'Gestern _____ ich sehr müde.' — sein Präteritum:",
          options: ["bin", "war", "ist", "wäre"],
          correct: 1,
          explanation: "ich + sein Präteritum = war.",
        },
        {
          id: 2,
          question: "'Wir _____ keine Zeit.' — haben Präteritum:",
          options: ["haben", "hatten", "hätten", "hatte"],
          correct: 1,
          explanation: "wir + haben Präteritum = hatten.",
        },
        {
          id: 3,
          question: "'_____ du gestern in der Schule?' — sein Präteritum:",
          options: ["Bist", "Warst", "Warest", "Wartest"],
          correct: 1,
          explanation: "du + sein Präteritum = warst.",
        },
        {
          id: 4,
          question: "Konuşma dilinde 'sein' ve 'haben' geçmişte hangi zamanla kullanılır?",
          options: ["Perfekt", "Plusquamperfekt", "Präteritum", "Futur"],
          correct: 2,
          explanation: "sein → war, haben → hatte: konuşmada da Präteritum kullanılır.",
        },
        {
          id: 5,
          question: "'Er _____ keine Lust.' — haben Präteritum:",
          options: ["hat", "hatte", "hatten", "hattest"],
          correct: 1,
          explanation: "er + haben Präteritum = hatte.",
        },
        {
          id: 6,
          question: "'Sie _____ nicht kommen.' — können Präteritum:",
          options: ["kann", "könnte", "konnte", "gekonnt"],
          correct: 2,
          explanation: "können Präteritum: ich/er/sie konnte.",
        },
        {
          id: 7,
          question: "'Ihr _____ Hunger.' — haben Präteritum:",
          options: ["habt", "hatte", "hattet", "haben"],
          correct: 2,
          explanation: "ihr + haben Präteritum = hattet.",
        },
        {
          id: 8,
          question: "'Er _____ früh aufstehen.' — müssen Präteritum:",
          options: ["muss", "musste", "müsste", "gemusst"],
          correct: 1,
          explanation: "müssen Präteritum: musste.",
        },
      ],
      fillInBlank: [
        {
          id: 1,
          before: "Gestern",
          after: "ich sehr glücklich. (sein Präteritum)",
          answer: "war",
          hint: "ich + sein Präteritum = war",
        },
        {
          id: 2,
          before: "Wir",
          after: "viel Spaß. (haben Präteritum)",
          answer: "hatten",
          hint: "wir + haben Präteritum = hatten",
        },
        {
          id: 3,
          before: "Er",
          after: "nicht kommen. (können Präteritum)",
          answer: "konnte",
          hint: "können Präteritum = konnte",
        },
        {
          id: 4,
          before: "Die Kinder",
          after: "sehr müde. (sein Präteritum, çoğul)",
          answer: "waren",
          hint: "Çoğul + sein Präteritum = waren",
        },
        {
          id: 5,
          before: "Ich",
          after: "leider keine Zeit. (haben Präteritum)",
          answer: "hatte",
          hint: "ich + haben Präteritum = hatte",
        },
      ],
    },
  },
];
