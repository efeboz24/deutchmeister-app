export type SprechenTeilType = "vorstellen" | "informationen" | "bitten";

export interface SprechenSchritt {
  id: number;
  prueferText: string;
  prueferAntwort?: string;
  aufgabe: string;
  karteKeywords?: string[];
  bildKarte?: { emoji: string; word: string; artikel: string };
  mustEnthalten?: string[];
  bewertungsTipps: string[];
}

export interface SprechenTeil {
  id: 1 | 2 | 3;
  level: string;
  title: string;
  subtitle: string;
  prueferEinleitung: string;
  aufgabenKarteTitle: string;
  aufgabenKarteInhalt: string[];
  type: SprechenTeilType;
  schritte: SprechenSchritt[];
  maxPunkte: number;
  xp: number;
  tipps: string[];
}

export interface SprechenProgressItem {
  completed: boolean;
  score: number;
  punkte: number;
  maxPunkte: number;
  xpEarned: number;
}

export type SprechenProgress = Record<string, SprechenProgressItem>;

export function loadSprechenProgress(level: string): SprechenProgress {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(`sprechen-progress-${level.toLowerCase()}`);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveSprechenProgress(level: string, progress: SprechenProgress): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(
    `sprechen-progress-${level.toLowerCase()}`,
    JSON.stringify(progress)
  );
}

const A1_TEILE: SprechenTeil[] = [
  {
    id: 1,
    level: "A1",
    title: "Sich vorstellen",
    subtitle: "Kendinizi tanıtın",
    prueferEinleitung:
      "Guten Tag! Herzlich willkommen zur Prüfung. Bitte stellen Sie sich vor.",
    aufgabenKarteTitle: "Stellen Sie sich vor!",
    aufgabenKarteInhalt: [
      "Name",
      "Alter",
      "Herkunft",
      "Wohnort",
      "Beruf / Schule",
      "Sprachen",
      "Hobbys",
    ],
    type: "vorstellen",
    schritte: [
      {
        id: 1,
        prueferText:
          "Guten Tag! Wie heißen Sie? Bitte stellen Sie sich vor.",
        aufgabe:
          "Kendinizi tanıtın. Karttaki tüm noktalara değinmeye çalışın.",
        karteKeywords: [
          "Name",
          "Alter",
          "Herkunft",
          "Wohnort",
          "Beruf / Schule",
          "Sprachen",
          "Hobbys",
        ],
        mustEnthalten: [
          "ich heiße",
          "ich komme",
          "ich wohne",
          "ich bin",
          "ich lerne",
          "ich spreche",
          "ich arbeite",
          "mein hobby",
          "ich mag",
          "ich gehe",
        ],
        bewertungsTipps: [
          "Adınızı tam cümleyle söylediniz mi? (Ich heiße...)",
          "Nereden geldiğinizi söylediniz mi? (Ich komme aus...)",
          "Nerede oturduğunuzu söylediniz mi? (Ich wohne in...)",
          "Yaşınızı veya mesleğinizi söylediniz mi?",
          "Hobilerinizden en az birini söylediniz mi?",
        ],
      },
    ],
    maxPunkte: 3,
    xp: 40,
    tipps: [
      "Her noktayı sırayla ele alın",
      "Sadece kelime söylemeyin, tam cümle kurun: 'Ich heiße...'",
      "Hata yapmaktan korkmayın, devam edin",
    ],
  },
  {
    id: 2,
    level: "A1",
    title: "Informationen erfragen",
    subtitle: "Bilgi sorun ve verin",
    prueferEinleitung:
      "Jetzt spielen wir ein Spiel mit Karten. Ich frage Sie zuerst, dann sind Sie dran!",
    aufgabenKarteTitle: "Themen-Karten",
    aufgabenKarteInhalt: ["🍳 Frühstück", "🎸 Hobbys", "👨‍👩‍👧 Familie"],
    type: "informationen",
    schritte: [
      {
        id: 1,
        prueferText:
          "Ich habe eine Karte gezogen: \"Frühstück\" 🍳\nWas essen oder trinken Sie zum Frühstück?",
        aufgabe:
          "Prüfer size sabah kahvaltısı hakkında soru sordu. Cevap verin.",
        karteKeywords: ["🍳 Frühstück"],
        mustEnthalten: [
          "ich esse",
          "ich trinke",
          "zum frühstück",
          "morgens",
          "brot",
          "kaffee",
          "tee",
          "milch",
          "ei",
          "müsli",
          "obst",
        ],
        bewertungsTipps: [
          "En az bir yiyecek veya içecek adı söylediniz mi?",
          "'Ich esse...' veya 'Ich trinke...' kullandınız mı?",
          "Tam cümle mi kurdunuz?",
        ],
      },
      {
        id: 2,
        prueferText:
          "Sehr gut! Jetzt sind Sie dran. Ziehen Sie eine Karte!",
        aufgabe:
          "Sizin kartınız: \"Hobbys\" 🎸\n\nPrüfere hobi hakkında bir soru sorun.",
        karteKeywords: ["🎸 Hobbys"],
        prueferAntwort:
          "Ich spiele gern Gitarre und lese viel. Im Sommer gehe ich auch gern wandern. Und Sie, was machen Sie gern in der Freizeit?",
        mustEnthalten: [
          "was",
          "machen",
          "spielen",
          "haben",
          "mögen",
          "?",
          "hobby",
          "freizeit",
          "gern",
        ],
        bewertungsTipps: [
          "Bir soru sordunuz mu? ('Was machen Sie gern?' gibi)",
          "Soru içeren bir yapı kullandınız mı?",
          "Konu 'Hobbys' ile ilgili miydi?",
        ],
      },
      {
        id: 3,
        prueferText:
          "Karte: \"Familie\" 👨‍👩‍👧\nHaben Sie Geschwister? Erzählen Sie von Ihrer Familie.",
        aufgabe:
          "Aileniz hakkında soruyu cevaplayın. Kardeşlerinizden veya ailenizden bahsedin.",
        karteKeywords: ["👨‍👩‍👧 Familie"],
        mustEnthalten: [
          "ich habe",
          "bruder",
          "schwester",
          "mutter",
          "vater",
          "eltern",
          "geschwister",
          "keine",
          "meine familie",
          "ich bin",
        ],
        bewertungsTipps: [
          "Kardeşiniz var mı yok mu söylediniz mi?",
          "Bir aile üyesini tanıttınız mı?",
          "Tam cümle mi kurdunuz?",
        ],
      },
    ],
    maxPunkte: 6,
    xp: 60,
    tipps: [
      "Soru sorarken: 'Was...?', 'Wo...?', 'Haben Sie...?' kullanın",
      "Cevaplarken tam cümle kurun",
      "Anlamadıysanız: 'Können Sie das wiederholen?' diyebilirsiniz",
    ],
  },
  {
    id: 3,
    level: "A1",
    title: "Bitten formulieren",
    subtitle: "Kibarca bir şeyler isteyin",
    prueferEinleitung:
      "Jetzt sehen Sie Bilder. Formulieren Sie bitte eine höfliche Bitte!",
    aufgabenKarteTitle: "Bildkarte",
    aufgabenKarteInhalt: [],
    type: "bitten",
    schritte: [
      {
        id: 1,
        prueferText:
          "Sie sehen ein Bild. Was möchten Sie? Bitte formulieren Sie höflich!",
        aufgabe: "Bu resmi görüyorsunuz. Kibarca bir istekte bulunun.",
        bildKarte: { emoji: "💧", word: "Wasser", artikel: "ein Glas" },
        prueferAntwort:
          "Natürlich! Hier ist ein Glas Wasser. Bitte sehr!",
        mustEnthalten: [
          "wasser",
          "bitte",
          "können",
          "darf",
          "möchte",
          "ich hätte",
          "gern",
        ],
        bewertungsTipps: [
          "'Bitte' sözcüğünü kullandınız mı?",
          "Kibarca bir form kullandınız mı? ('Können Sie...?', 'Ich möchte...', 'Darf ich...?')",
          "'Wasser' kelimesini doğru söylediniz mi?",
        ],
      },
      {
        id: 2,
        prueferText: "Gut gemacht! Nächstes Bild.",
        aufgabe: "Bu resmi görüyorsunuz. Kibarca bir istekte bulunun.",
        bildKarte: { emoji: "✏️", word: "Stift", artikel: "einen" },
        prueferAntwort:
          "Ja, natürlich! Hier ist ein Stift für Sie. Bitte!",
        mustEnthalten: [
          "stift",
          "bitte",
          "können",
          "darf",
          "möchte",
          "hätte",
          "gern",
        ],
        bewertungsTipps: [
          "Kibarca bir kalıp kullandınız mı?",
          "'Stift' kelimesini söylediniz mi?",
          "Prüfer verdikten sonra teşekkür ettiniz mi? (Danke!)",
        ],
      },
      {
        id: 3,
        prueferText: "Sehr gut! Letztes Bild.",
        aufgabe: "Bu resmi görüyorsunuz. Kibarca bir istekte bulunun.",
        bildKarte: { emoji: "🗺️", word: "Stadtplan", artikel: "einen" },
        prueferAntwort:
          "Einen Stadtplan? Einen Moment... Hier, bitte! Sind Sie neu in der Stadt?",
        mustEnthalten: [
          "stadtplan",
          "bitte",
          "können",
          "darf",
          "möchte",
          "hätte",
          "haben",
        ],
        bewertungsTipps: [
          "Kibarca bir kalıp kullandınız mı?",
          "'Stadtplan' kelimesini doğru söylediniz mi?",
          "Prüfer size bir soru sordu, cevap verdiniz mi?",
        ],
      },
    ],
    maxPunkte: 6,
    xp: 60,
    tipps: [
      "Kibarca kalıplar: 'Können Sie mir... geben?', 'Ich möchte bitte...', 'Darf ich... haben?'",
      "Her zaman 'bitte' ekleyin!",
      "Alırken: 'Danke!' veya 'Vielen Dank!' deyin",
    ],
  },
];

export function getSprechenTeile(level: string): SprechenTeil[] {
  if (level.toUpperCase() === "A1") return A1_TEILE;
  return [];
}

export function getSprechenTeil(
  level: string,
  teilId: number
): SprechenTeil | undefined {
  return getSprechenTeile(level).find((t) => t.id === teilId);
}
