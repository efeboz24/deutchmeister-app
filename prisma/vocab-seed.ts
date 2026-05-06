import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const A1_WORDS = [
  // ── İnsanlar & Aile ──
  { word: "der Mann", meaning: "Adam, Erkek", ex: "Der Mann arbeitet in einer Firma.", pos: "Nomen" },
  { word: "die Frau", meaning: "Kadın; Eş", ex: "Die Frau kauft Gemüse im Supermarkt.", pos: "Nomen" },
  { word: "das Kind", meaning: "Çocuk", ex: "Das Kind spielt im Park.", pos: "Nomen" },
  { word: "die Mutter", meaning: "Anne", ex: "Meine Mutter kocht sehr gut.", pos: "Nomen" },
  { word: "der Vater", meaning: "Baba", ex: "Mein Vater arbeitet als Lehrer.", pos: "Nomen" },
  { word: "die Schwester", meaning: "Kız kardeş", ex: "Meine Schwester ist 15 Jahre alt.", pos: "Nomen" },
  { word: "der Bruder", meaning: "Erkek kardeş", ex: "Mein Bruder wohnt in Berlin.", pos: "Nomen" },
  { word: "die Familie", meaning: "Aile", ex: "Meine Familie ist sehr groß.", pos: "Nomen" },
  { word: "der Freund", meaning: "Erkek arkadaş / Dost", ex: "Mein Freund heißt Thomas.", pos: "Nomen" },
  { word: "die Freundin", meaning: "Kız arkadaş / Dost", ex: "Meine Freundin kommt aus der Türkei.", pos: "Nomen" },

  // ── Ev & Yaşam ──
  { word: "das Haus", meaning: "Ev", ex: "Wir wohnen in einem kleinen Haus.", pos: "Nomen" },
  { word: "die Wohnung", meaning: "Daire", ex: "Die Wohnung hat drei Zimmer.", pos: "Nomen" },
  { word: "das Zimmer", meaning: "Oda", ex: "Mein Zimmer ist sehr hell.", pos: "Nomen" },
  { word: "die Küche", meaning: "Mutfak", ex: "In der Küche koche ich gern.", pos: "Nomen" },
  { word: "das Bad", meaning: "Banyo", ex: "Das Bad ist neben dem Schlafzimmer.", pos: "Nomen" },
  { word: "der Tisch", meaning: "Masa", ex: "Das Buch liegt auf dem Tisch.", pos: "Nomen" },
  { word: "der Stuhl", meaning: "Sandalye", ex: "Bitte nehmen Sie Platz auf dem Stuhl.", pos: "Nomen" },
  { word: "das Bett", meaning: "Yatak", ex: "Ich gehe um 22 Uhr ins Bett.", pos: "Nomen" },
  { word: "die Tür", meaning: "Kapı", ex: "Bitte machen Sie die Tür zu.", pos: "Nomen" },
  { word: "das Fenster", meaning: "Pencere", ex: "Bitte öffnen Sie das Fenster.", pos: "Nomen" },

  // ── Okul & İş ──
  { word: "die Schule", meaning: "Okul", ex: "Die Kinder gehen jeden Tag in die Schule.", pos: "Nomen" },
  { word: "der Lehrer", meaning: "Öğretmen (erkek)", ex: "Der Lehrer erklärt die Grammatik.", pos: "Nomen" },
  { word: "das Buch", meaning: "Kitap", ex: "Ich lese gern Bücher.", pos: "Nomen" },
  { word: "der Stift", meaning: "Kalem", ex: "Haben Sie einen Stift für mich?", pos: "Nomen" },
  { word: "die Arbeit", meaning: "İş; Çalışma", ex: "Die Arbeit beginnt um 8 Uhr.", pos: "Nomen" },
  { word: "das Büro", meaning: "Ofis", ex: "Er arbeitet im Büro.", pos: "Nomen" },

  // ── Ulaşım ──
  { word: "das Auto", meaning: "Araba", ex: "Ich fahre jeden Tag mit dem Auto.", pos: "Nomen" },
  { word: "der Bus", meaning: "Otobüs", ex: "Der Bus kommt um 9 Uhr.", pos: "Nomen" },
  { word: "der Zug", meaning: "Tren", ex: "Wir fahren mit dem Zug nach München.", pos: "Nomen" },
  { word: "das Fahrrad", meaning: "Bisiklet", ex: "Im Sommer fahre ich gern Fahrrad.", pos: "Nomen" },
  { word: "die Straße", meaning: "Sokak, Cadde", ex: "Die Schule ist in der Hauptstraße.", pos: "Nomen" },

  // ── Yiyecek & İçecek ──
  { word: "das Wasser", meaning: "Su", ex: "Ich trinke jeden Tag viel Wasser.", pos: "Nomen" },
  { word: "das Brot", meaning: "Ekmek", ex: "Zum Frühstück esse ich Brot mit Butter.", pos: "Nomen" },
  { word: "die Milch", meaning: "Süt", ex: "Kinder trinken viel Milch.", pos: "Nomen" },
  { word: "der Kaffee", meaning: "Kahve", ex: "Morgens trinke ich immer einen Kaffee.", pos: "Nomen" },
  { word: "das Essen", meaning: "Yemek", ex: "Das Essen schmeckt sehr gut.", pos: "Nomen" },

  // ── Zaman ──
  { word: "der Tag", meaning: "Gün", ex: "Guten Tag! Wie geht es Ihnen?", pos: "Nomen" },
  { word: "die Woche", meaning: "Hafta", ex: "Die Woche hat sieben Tage.", pos: "Nomen" },
  { word: "der Monat", meaning: "Ay", ex: "Im Monat Juli ist es sehr heiß.", pos: "Nomen" },
  { word: "das Jahr", meaning: "Yıl", ex: "Dieses Jahr lerne ich Deutsch.", pos: "Nomen" },
  { word: "die Uhr", meaning: "Saat (aygıt)", ex: "Es ist 10 Uhr.", pos: "Nomen" },
  { word: "der Morgen", meaning: "Sabah", ex: "Am Morgen esse ich Frühstück.", pos: "Nomen" },
  { word: "der Abend", meaning: "Akşam", ex: "Am Abend sehe ich fern.", pos: "Nomen" },
  { word: "die Nacht", meaning: "Gece", ex: "Gute Nacht! Schlaf gut!", pos: "Nomen" },

  // ── Temel Fiiller ──
  { word: "sein", meaning: "Olmak", ex: "Ich bin Student.", pos: "Verb" },
  { word: "haben", meaning: "Sahip olmak", ex: "Ich habe zwei Schwestern.", pos: "Verb" },
  { word: "kommen", meaning: "Gelmek", ex: "Woher kommen Sie?", pos: "Verb" },
  { word: "gehen", meaning: "Gitmek", ex: "Ich gehe jeden Tag zur Arbeit.", pos: "Verb" },
  { word: "wohnen", meaning: "Oturmak, Yaşamak", ex: "Ich wohne in Hamburg.", pos: "Verb" },
  { word: "arbeiten", meaning: "Çalışmak", ex: "Mein Vater arbeitet als Ingenieur.", pos: "Verb" },
  { word: "lernen", meaning: "Öğrenmek", ex: "Ich lerne seit einem Jahr Deutsch.", pos: "Verb" },
  { word: "sprechen", meaning: "Konuşmak", ex: "Sprechen Sie Deutsch?", pos: "Verb" },
  { word: "hören", meaning: "Dinlemek, Duymak", ex: "Ich höre gern Musik.", pos: "Verb" },
  { word: "lesen", meaning: "Okumak", ex: "Lesen Sie bitte den Text.", pos: "Verb" },
  { word: "schreiben", meaning: "Yazmak", ex: "Ich schreibe einen Brief.", pos: "Verb" },
  { word: "essen", meaning: "Yemek yemek", ex: "Was essen Sie zum Mittagessen?", pos: "Verb" },
  { word: "trinken", meaning: "İçmek", ex: "Ich trinke keinen Alkohol.", pos: "Verb" },
  { word: "kaufen", meaning: "Satın almak", ex: "Ich möchte ein Ticket kaufen.", pos: "Verb" },
  { word: "machen", meaning: "Yapmak", ex: "Was machen Sie beruflich?", pos: "Verb" },
  { word: "heißen", meaning: "Adı olmak", ex: "Wie heißen Sie?", pos: "Verb" },
  { word: "verstehen", meaning: "Anlamak", ex: "Entschuldigung, ich verstehe nicht.", pos: "Verb" },
  { word: "schlafen", meaning: "Uyumak", ex: "Ich schlafe acht Stunden pro Nacht.", pos: "Verb" },

  // ── Sıfatlar ──
  { word: "groß", meaning: "Büyük; Uzun boylu", ex: "Berlin ist eine sehr große Stadt.", pos: "Adjektiv" },
  { word: "klein", meaning: "Küçük; Kısa boylu", ex: "Das Kind ist noch sehr klein.", pos: "Adjektiv" },
  { word: "gut", meaning: "İyi", ex: "Das Essen schmeckt sehr gut.", pos: "Adjektiv" },
  { word: "schlecht", meaning: "Kötü", ex: "Das Wetter ist heute schlecht.", pos: "Adjektiv" },
  { word: "neu", meaning: "Yeni", ex: "Ich habe ein neues Auto.", pos: "Adjektiv" },
  { word: "alt", meaning: "Eski; Yaşlı", ex: "Dieses Haus ist sehr alt.", pos: "Adjektiv" },
  { word: "schön", meaning: "Güzel", ex: "Was für ein schöner Tag!", pos: "Adjektiv" },
  { word: "billig", meaning: "Ucuz", ex: "Der Markt hat billige Lebensmittel.", pos: "Adjektiv" },
  { word: "teuer", meaning: "Pahalı", ex: "Das Hotel ist sehr teuer.", pos: "Adjektiv" },
  { word: "kalt", meaning: "Soğuk", ex: "Im Winter ist es kalt.", pos: "Adjektiv" },
  { word: "warm", meaning: "Sıcak, Ilık", ex: "Das Wasser ist warm.", pos: "Adjektiv" },
  { word: "jung", meaning: "Genç", ex: "Sie ist noch sehr jung.", pos: "Adjektiv" },
  { word: "schnell", meaning: "Hızlı", ex: "Der Zug fährt sehr schnell.", pos: "Adjektiv" },
  { word: "richtig", meaning: "Doğru", ex: "Das ist richtig!", pos: "Adjektiv" },
  { word: "falsch", meaning: "Yanlış", ex: "Leider ist diese Antwort falsch.", pos: "Adjektiv" },

  // ── Önemli Kelimeler ──
  { word: "bitte", meaning: "Lütfen; Rica ederim", ex: "Sprechen Sie bitte langsam.", pos: "Adverb" },
  { word: "danke", meaning: "Teşekkürler", ex: "Danke schön für Ihre Hilfe!", pos: "Adverb" },
  { word: "ja", meaning: "Evet", ex: "Ja, ich spreche ein bisschen Deutsch.", pos: "Adverb" },
  { word: "nein", meaning: "Hayır", ex: "Nein, das stimmt nicht.", pos: "Adverb" },
  { word: "viel", meaning: "Çok (miktar)", ex: "Ich habe viel Arbeit.", pos: "Adverb" },
  { word: "wenig", meaning: "Az", ex: "Ich habe leider wenig Zeit.", pos: "Adverb" },
];

const A2_WORDS = [
  // ── Sağlık ──
  { word: "der Arzt", meaning: "Doktor (erkek)", ex: "Ich muss zum Arzt gehen.", pos: "Nomen" },
  { word: "die Ärztin", meaning: "Doktor (kadın)", ex: "Meine Ärztin empfiehlt mehr Bewegung.", pos: "Nomen" },
  { word: "das Krankenhaus", meaning: "Hastane", ex: "Er liegt seit zwei Tagen im Krankenhaus.", pos: "Nomen" },
  { word: "die Apotheke", meaning: "Eczane", ex: "Das Medikament bekommt man in der Apotheke.", pos: "Nomen" },
  { word: "das Medikament", meaning: "İlaç", ex: "Nehmen Sie das Medikament dreimal täglich.", pos: "Nomen" },
  { word: "der Schmerz", meaning: "Ağrı", ex: "Ich habe Schmerzen im Rücken.", pos: "Nomen" },
  { word: "der Kopf", meaning: "Baş", ex: "Mir tut der Kopf weh.", pos: "Nomen" },
  { word: "der Bauch", meaning: "Karın", ex: "Ich habe Bauchschmerzen.", pos: "Nomen" },
  { word: "krank", meaning: "Hasta", ex: "Ich bin krank und bleibe zu Hause.", pos: "Adjektiv" },
  { word: "gesund", meaning: "Sağlıklı", ex: "Sport ist gut für die Gesundheit.", pos: "Adjektiv" },
  { word: "müde", meaning: "Yorgun", ex: "Ich bin sehr müde, ich habe schlecht geschlafen.", pos: "Adjektiv" },

  // ── Ulaşım & Seyahat ──
  { word: "der Bahnhof", meaning: "Tren İstasyonu", ex: "Der Zug fährt vom Bahnhof ab.", pos: "Nomen" },
  { word: "der Flughafen", meaning: "Havalimanı", ex: "Wir fahren zum Flughafen.", pos: "Nomen" },
  { word: "das Ticket", meaning: "Bilet", ex: "Ich kaufe ein Ticket nach Hamburg.", pos: "Nomen" },
  { word: "die Haltestelle", meaning: "Durak", ex: "Die nächste Haltestelle ist der Marktplatz.", pos: "Nomen" },
  { word: "der Fahrplan", meaning: "Tarife, Sefer tablosu", ex: "Schauen Sie den Fahrplan an.", pos: "Nomen" },
  { word: "abfahren", meaning: "Hareket etmek, Kalkmak", ex: "Der Zug fährt um 14:30 Uhr ab.", pos: "Verb" },
  { word: "ankommen", meaning: "Varmak", ex: "Wann kommen Sie in Berlin an?", pos: "Verb" },
  { word: "umsteigen", meaning: "Aktarma yapmak", ex: "Sie müssen in Frankfurt umsteigen.", pos: "Verb" },
  { word: "der Urlaub", meaning: "Tatil", ex: "Im Sommer fahre ich in den Urlaub.", pos: "Nomen" },
  { word: "die Reise", meaning: "Seyahat, Yolculuk", ex: "Die Reise nach Wien war sehr schön.", pos: "Nomen" },

  // ── Otel & Konaklama ──
  { word: "das Hotel", meaning: "Otel", ex: "Ich möchte ein Zimmer im Hotel reservieren.", pos: "Nomen" },
  { word: "die Reservierung", meaning: "Rezervasyon", ex: "Ich habe eine Reservierung auf den Namen Yılmaz.", pos: "Nomen" },
  { word: "der Schlüssel", meaning: "Anahtar", ex: "Hier ist Ihr Schlüssel für Zimmer 205.", pos: "Nomen" },
  { word: "reservieren", meaning: "Rezervasyon yapmak", ex: "Ich möchte einen Tisch reservieren.", pos: "Verb" },

  // ── Yemek & Restoran ──
  { word: "das Gemüse", meaning: "Sebze", ex: "Essen Sie viel Gemüse, das ist gesund.", pos: "Nomen" },
  { word: "das Obst", meaning: "Meyve", ex: "Obst und Gemüse sind sehr gesund.", pos: "Nomen" },
  { word: "das Fleisch", meaning: "Et", ex: "Ich esse kein Fleisch, ich bin Vegetarier.", pos: "Nomen" },
  { word: "der Fisch", meaning: "Balık", ex: "In diesem Restaurant gibt es sehr guten Fisch.", pos: "Nomen" },
  { word: "die Kartoffel", meaning: "Patates", ex: "In Deutschland isst man viele Kartoffeln.", pos: "Nomen" },
  { word: "der Apfel", meaning: "Elma", ex: "Ein Apfel am Tag hält den Arzt fern.", pos: "Nomen" },
  { word: "das Restaurant", meaning: "Restoran", ex: "Gehen wir heute Abend ins Restaurant?", pos: "Nomen" },
  { word: "die Speisekarte", meaning: "Menü, Yemek listesi", ex: "Kann ich die Speisekarte haben?", pos: "Nomen" },
  { word: "bestellen", meaning: "Sipariş vermek", ex: "Ich möchte bitte bestellen.", pos: "Verb" },
  { word: "bezahlen", meaning: "Ödemek", ex: "Kann ich bitte bezahlen?", pos: "Verb" },
  { word: "lecker", meaning: "Lezzetli", ex: "Das Essen schmeckt wirklich lecker!", pos: "Adjektiv" },

  // ── Alışveriş ──
  { word: "das Geschäft", meaning: "Dükkan, Mağaza", ex: "Das Geschäft ist von 9 bis 18 Uhr geöffnet.", pos: "Nomen" },
  { word: "der Preis", meaning: "Fiyat", ex: "Was ist der Preis für dieses Produkt?", pos: "Nomen" },
  { word: "der Rabatt", meaning: "İndirim", ex: "Im Ausverkauf gibt es 30% Rabatt.", pos: "Nomen" },
  { word: "die Kasse", meaning: "Kasa", ex: "Bitte zahlen Sie an der Kasse.", pos: "Nomen" },
  { word: "die Rechnung", meaning: "Fatura, Hesap", ex: "Können Sie mir bitte die Rechnung geben?", pos: "Nomen" },
  { word: "das Angebot", meaning: "Teklif; İndirimli ürün", ex: "Diese Woche gibt es ein tolles Angebot.", pos: "Nomen" },
  { word: "suchen", meaning: "Aramak", ex: "Ich suche eine Jacke in Größe M.", pos: "Verb" },

  // ── Giyim ──
  { word: "das Hemd", meaning: "Gömlek", ex: "Er trägt ein weißes Hemd zur Arbeit.", pos: "Nomen" },
  { word: "die Hose", meaning: "Pantolon", ex: "Diese Hose passt mir sehr gut.", pos: "Nomen" },
  { word: "das Kleid", meaning: "Elbise", ex: "Sie trägt ein rotes Kleid.", pos: "Nomen" },
  { word: "die Jacke", meaning: "Ceket, Mont", ex: "Nimm eine Jacke mit, es ist kalt!", pos: "Nomen" },
  { word: "die Schuhe", meaning: "Ayakkabılar", ex: "Diese Schuhe sind sehr bequem.", pos: "Nomen" },
  { word: "die Größe", meaning: "Beden, Boyut", ex: "Welche Größe haben Sie?", pos: "Nomen" },

  // ── Meslekler ──
  { word: "der Beruf", meaning: "Meslek", ex: "Was ist Ihr Beruf?", pos: "Nomen" },
  { word: "der Ingenieur", meaning: "Mühendis", ex: "Mein Vater ist Ingenieur bei BMW.", pos: "Nomen" },
  { word: "die Krankenschwester", meaning: "Hemşire", ex: "Die Krankenschwester gibt mir eine Spritze.", pos: "Nomen" },
  { word: "der Koch", meaning: "Aşçı", ex: "Der Koch bereitet das Essen zu.", pos: "Nomen" },
  { word: "der Verkäufer", meaning: "Satıcı", ex: "Der Verkäufer hilft mir bei der Auswahl.", pos: "Nomen" },
  { word: "der Mechaniker", meaning: "Tamirci, Mekanik", ex: "Der Mechaniker repariert mein Auto.", pos: "Nomen" },

  // ── Hava Durumu ──
  { word: "das Wetter", meaning: "Hava durumu", ex: "Wie ist das Wetter heute?", pos: "Nomen" },
  { word: "der Regen", meaning: "Yağmur", ex: "Nimm einen Regenschirm mit, es gibt Regen.", pos: "Nomen" },
  { word: "der Schnee", meaning: "Kar", ex: "Im Winter fällt hier viel Schnee.", pos: "Nomen" },
  { word: "die Sonne", meaning: "Güneş", ex: "Die Sonne scheint heute sehr stark.", pos: "Nomen" },
  { word: "der Wind", meaning: "Rüzgar", ex: "Es ist windig heute.", pos: "Nomen" },
  { word: "die Wolke", meaning: "Bulut", ex: "Es gibt heute viele Wolken am Himmel.", pos: "Nomen" },

  // ── Modal Fiiller & Önemli Fiiller ──
  { word: "möchten", meaning: "İstemek (-mek istemek)", ex: "Ich möchte bitte ein Glas Wasser.", pos: "Verb" },
  { word: "können", meaning: "Yapabilmek (-ebilmek)", ex: "Können Sie mir helfen, bitte?", pos: "Verb" },
  { word: "müssen", meaning: "Zorunda olmak (-meli)", ex: "Ich muss jetzt gehen.", pos: "Verb" },
  { word: "dürfen", meaning: "İzin olmak (-ebilmek)", ex: "Darf ich hier rauchen?", pos: "Verb" },
  { word: "wissen", meaning: "Bilmek (bir bilgi)", ex: "Wissen Sie, wo der Bahnhof ist?", pos: "Verb" },
  { word: "kennen", meaning: "Tanımak", ex: "Kennen Sie diese Stadt?", pos: "Verb" },
  { word: "finden", meaning: "Bulmak; Bulmak (fikir)", ex: "Ich finde diesen Film sehr interessant.", pos: "Verb" },
  { word: "helfen", meaning: "Yardım etmek", ex: "Können Sie mir bitte helfen?", pos: "Verb" },
  { word: "brauchen", meaning: "İhtiyacı olmak", ex: "Ich brauche Hilfe.", pos: "Verb" },
  { word: "mieten", meaning: "Kiralamak", ex: "Wir möchten eine Wohnung mieten.", pos: "Verb" },
  { word: "empfehlen", meaning: "Tavsiye etmek", ex: "Können Sie ein gutes Restaurant empfehlen?", pos: "Verb" },

  // ── Sıfatlar ──
  { word: "interessant", meaning: "İlginç", ex: "Der Film war sehr interessant.", pos: "Adjektiv" },
  { word: "langweilig", meaning: "Sıkıcı", ex: "Das Buch ist leider sehr langweilig.", pos: "Adjektiv" },
  { word: "freundlich", meaning: "Nazik, Sempatik", ex: "Die Mitarbeiter sind sehr freundlich.", pos: "Adjektiv" },
  { word: "pünktlich", meaning: "Dakik", ex: "In Deutschland ist es wichtig, pünktlich zu sein.", pos: "Adjektiv" },
  { word: "sauber", meaning: "Temiz", ex: "Die Wohnung ist sehr sauber.", pos: "Adjektiv" },
  { word: "schwer", meaning: "Ağır; Zor", ex: "Dieser Koffer ist sehr schwer.", pos: "Adjektiv" },
  { word: "leicht", meaning: "Hafif; Kolay", ex: "Die Aufgabe ist sehr leicht.", pos: "Adjektiv" },
  { word: "wichtig", meaning: "Önemli", ex: "Pünktlichkeit ist sehr wichtig.", pos: "Adjektiv" },
  { word: "günstig", meaning: "Uygun fiyatlı, Hesaplı", ex: "Das Hotel ist günstig und schön.", pos: "Adjektiv" },
  { word: "bequem", meaning: "Rahat (eşya için)", ex: "Dieser Stuhl ist sehr bequem.", pos: "Adjektiv" },
];

async function main() {
  console.log("Kelimeler yükleniyor...");

  const a1 = await prisma.level.findUnique({ where: { name: "A1" } });
  const a2 = await prisma.level.findUnique({ where: { name: "A2" } });

  if (!a1 || !a2) {
    throw new Error("Seviyeler bulunamadı. Önce ana seed'i çalıştırın.");
  }

  // Mevcut kelimeleri temizle
  await prisma.userVocabulary.deleteMany({});
  await prisma.vocabulary.deleteMany({});
  console.log("Eski kelimeler temizlendi.");

  // A1 kelimeleri ekle
  for (let i = 0; i < A1_WORDS.length; i++) {
    const v = A1_WORDS[i];
    await prisma.vocabulary.create({
      data: {
        word: v.word,
        meaning: v.meaning,
        exampleSentence: v.ex,
        partOfSpeech: v.pos,
        levelId: a1.id,
      },
    });
  }
  console.log(`✅ A1: ${A1_WORDS.length} kelime eklendi.`);

  // A2 kelimeleri ekle
  for (let i = 0; i < A2_WORDS.length; i++) {
    const v = A2_WORDS[i];
    await prisma.vocabulary.create({
      data: {
        word: v.word,
        meaning: v.meaning,
        exampleSentence: v.ex,
        partOfSpeech: v.pos,
        levelId: a2.id,
      },
    });
  }
  console.log(`✅ A2: ${A2_WORDS.length} kelime eklendi.`);
  console.log(`\n🎉 Toplam: ${A1_WORDS.length + A2_WORDS.length} kelime yüklendi.`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
