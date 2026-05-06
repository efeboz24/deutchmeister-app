/**
 * DeutschMeister - Kapsamlı Seed Scripti
 * A1/A2 müfredatı, tüm kelimeler ve test kullanıcısı
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// ─────────────────────────────────────────────
// A1 KELİMELERİ (6 lektion + extra)
// ─────────────────────────────────────────────
const A1_VOCAB = [
  // Lektion 1 – Hallo Welt
  { w: "auch", m: "de/da", e: "Ich komme auch aus Deutschland.", p: "Adverb" },
  { w: "bitte", m: "lütfen / rica ederim", e: "Bitte sprechen Sie langsam.", p: "Adverb" },
  { w: "gut", m: "iyi", e: "Es geht mir gut, danke.", p: "Adjektiv" },
  { w: "heißen", m: "adı olmak", e: "Wie heißen Sie?", p: "Verb" },
  { w: "kommen", m: "gelmek", e: "Woher kommen Sie?", p: "Verb" },
  { w: "lernen", m: "öğrenmek", e: "Ich lerne seit einem Jahr Deutsch.", p: "Verb" },
  { w: "sein", m: "olmak", e: "Ich bin Student.", p: "Verb" },
  { w: "sprechen", m: "konuşmak", e: "Sprechen Sie Deutsch?", p: "Verb" },
  { w: "wohnen", m: "yaşamak / oturmak", e: "Ich wohne in Berlin.", p: "Verb" },
  { w: "und", m: "ve", e: "Ich spreche Deutsch und Englisch.", p: "Konjunktion" },
  { w: "ja", m: "evet", e: "Ja, ich verstehe das.", p: "Adverb" },
  { w: "nein", m: "hayır", e: "Nein, das stimmt nicht.", p: "Adverb" },
  { w: "danke", m: "teşekkürler", e: "Danke schön für Ihre Hilfe!", p: "Adverb" },
  { w: "Hallo!", m: "Merhaba!", e: "Hallo! Wie geht es dir?", p: "Adverb" },
  { w: "Tschüss!", m: "Hoşça kal!", e: "Tschüss! Bis morgen.", p: "Adverb" },
  { w: "Deutsch", m: "Almanca", e: "Ich lerne Deutsch.", p: "Nomen" },
  { w: "Wer?", m: "Kim?", e: "Wer ist das?", p: "Fragewort" },
  { w: "Wie?", m: "Nasıl?", e: "Wie heißt du?", p: "Fragewort" },
  { w: "Wo?", m: "Nerede?", e: "Wo wohnst du?", p: "Fragewort" },
  { w: "Woher?", m: "Nereden?", e: "Woher kommen Sie?", p: "Fragewort" },
  { w: "der Name", m: "isim", e: "Mein Name ist Ali.", p: "Nomen" },
  { w: "der Vorname", m: "ad", e: "Mein Vorname ist Ali.", p: "Nomen" },
  { w: "der Nachname", m: "soyisim", e: "Mein Nachname ist Yılmaz.", p: "Nomen" },
  { w: "die Sprache", m: "dil", e: "Deutsch ist eine schöne Sprache.", p: "Nomen" },
  { w: "die Adresse", m: "adres", e: "Meine Adresse ist hier.", p: "Nomen" },
  { w: "die Stadt", m: "şehir", e: "Istanbul ist eine große Stadt.", p: "Nomen" },
  { w: "die Straße", m: "cadde / sokak", e: "Ich wohne in dieser Straße.", p: "Nomen" },
  { w: "das Land", m: "ülke", e: "Deutschland ist ein schönes Land.", p: "Nomen" },
  { w: "das Jahr", m: "yıl", e: "Das Jahr hat zwölf Monate.", p: "Nomen" },
  { w: "die Telefonnummer", m: "telefon numarası", e: "Wie ist Ihre Telefonnummer?", p: "Nomen" },
  { w: "die Muttersprache", m: "ana dil", e: "Meine Muttersprache ist Türkisch.", p: "Nomen" },
  { w: "der Herr", m: "bay / efendi", e: "Guten Morgen, Herr Müller!", p: "Nomen" },
  { w: "die Frau", m: "kadın / hanım", e: "Die Frau heißt Anna.", p: "Nomen" },
  // Lektion 2 – Im Deutschkurs
  { w: "das Buch", m: "kitap", e: "Ich lese gern Bücher.", p: "Nomen" },
  { w: "der Computer", m: "bilgisayar", e: "Der Computer ist kaputt.", p: "Nomen" },
  { w: "das Handy", m: "cep telefonu", e: "Mein Handy klingelt.", p: "Nomen" },
  { w: "hören", m: "dinlemek / duymak", e: "Ich höre gern Musik.", p: "Verb" },
  { w: "lesen", m: "okumak", e: "Ich lese einen Text.", p: "Verb" },
  { w: "schreiben", m: "yazmak", e: "Ich schreibe einen Brief.", p: "Verb" },
  { w: "verstehen", m: "anlamak", e: "Ich verstehe das nicht.", p: "Verb" },
  { w: "fragen", m: "sormak", e: "Darf ich eine Frage stellen?", p: "Verb" },
  { w: "antworten", m: "cevap vermek", e: "Bitte antworten Sie auf Deutsch.", p: "Verb" },
  { w: "öffnen", m: "açmak", e: "Öffnen Sie bitte das Fenster.", p: "Verb" },
  { w: "schließen", m: "kapatmak", e: "Schließen Sie die Tür.", p: "Verb" },
  { w: "richtig", m: "doğru", e: "Das ist richtig!", p: "Adjektiv" },
  { w: "falsch", m: "yanlış", e: "Leider ist diese Antwort falsch.", p: "Adjektiv" },
  { w: "die Frage", m: "soru", e: "Ich habe eine Frage.", p: "Nomen" },
  { w: "die Antwort", m: "cevap", e: "Die Antwort ist korrekt.", p: "Nomen" },
  { w: "der Text", m: "metin", e: "Lesen Sie den Text.", p: "Nomen" },
  { w: "das Wort", m: "kelime", e: "Dieses Wort ist neu.", p: "Nomen" },
  // Lektion 3 – Freizeit im Alltag
  { w: "die Freizeit", m: "boş zaman", e: "Was machst du in der Freizeit?", p: "Nomen" },
  { w: "das Hobby", m: "hobi", e: "Mein Hobby ist Lesen.", p: "Nomen" },
  { w: "die Musik", m: "müzik", e: "Ich höre gern Musik.", p: "Nomen" },
  { w: "der Sport", m: "spor", e: "Sport ist gesund.", p: "Nomen" },
  { w: "fahren", m: "gitmek / sürmek", e: "Ich fahre jeden Tag zur Arbeit.", p: "Verb" },
  { w: "gehen", m: "gitmek (yürüyerek)", e: "Ich gehe ins Kino.", p: "Verb" },
  { w: "laufen", m: "koşmak", e: "Ich laufe jeden Morgen im Park.", p: "Verb" },
  { w: "schlafen", m: "uyumak", e: "Ich schlafe acht Stunden.", p: "Verb" },
  { w: "spielen", m: "oynamak", e: "Die Kinder spielen im Park.", p: "Verb" },
  { w: "tanzen", m: "dans etmek", e: "Ich tanze gern.", p: "Verb" },
  { w: "sehen", m: "görmek / izlemek", e: "Ich sehe einen Film.", p: "Verb" },
  { w: "heute", m: "bugün", e: "Heute habe ich Zeit.", p: "Adverb" },
  { w: "oft", m: "sık sık", e: "Ich gehe oft ins Kino.", p: "Adverb" },
  { w: "manchmal", m: "bazen", e: "Manchmal lese ich Bücher.", p: "Adverb" },
  { w: "immer", m: "her zaman", e: "Ich lerne immer Deutsch.", p: "Adverb" },
  { w: "nie", m: "asla / hiçbir zaman", e: "Ich rauche nie.", p: "Adverb" },
  { w: "interessant", m: "ilginç", e: "Das Buch ist sehr interessant.", p: "Adjektiv" },
  { w: "langweilig", m: "sıkıcı", e: "Der Film war sehr langweilig.", p: "Adjektiv" },
  { w: "die Arbeit", m: "iş / çalışma", e: "Die Arbeit beginnt um 8 Uhr.", p: "Nomen" },
  { w: "arbeiten", m: "çalışmak", e: "Ich arbeite als Ingenieur.", p: "Verb" },
  { w: "aufstehen", m: "kalkmak", e: "Ich stehe um 7 Uhr auf.", p: "Verb" },
  { w: "frühstücken", m: "kahvaltı yapmak", e: "Ich frühstücke um 8 Uhr.", p: "Verb" },
  { w: "duschen", m: "duş almak", e: "Ich dusche jeden Morgen.", p: "Verb" },
  { w: "essen", m: "yemek yemek", e: "Was essen Sie gern?", p: "Verb" },
  { w: "das Wochenende", m: "hafta sonu", e: "Am Wochenende bin ich frei.", p: "Nomen" },
  { w: "die Woche", m: "hafta", e: "Die Woche hat sieben Tage.", p: "Nomen" },
  { w: "die Zeit", m: "zaman / vakit", e: "Ich habe keine Zeit.", p: "Nomen" },
  { w: "das Abendessen", m: "akşam yemeği", e: "Das Abendessen ist fertig.", p: "Nomen" },
  // Lektion 4 – Essen und Trinken
  { w: "das Wasser", m: "su", e: "Ich trinke viel Wasser.", p: "Nomen" },
  { w: "der Kaffee", m: "kahve", e: "Morgens trinke ich einen Kaffee.", p: "Nomen" },
  { w: "der Tee", m: "çay", e: "Ich trinke Tee mit Milch.", p: "Nomen" },
  { w: "die Milch", m: "süt", e: "Kinder trinken viel Milch.", p: "Nomen" },
  { w: "das Brot", m: "ekmek", e: "Zum Frühstück esse ich Brot.", p: "Nomen" },
  { w: "das Ei", m: "yumurta", e: "Ich esse ein gekochtes Ei.", p: "Nomen" },
  { w: "der Käse", m: "peynir", e: "Ich esse Käse zum Frühstück.", p: "Nomen" },
  { w: "die Butter", m: "tereyağı", e: "Ich nehme Brot mit Butter.", p: "Nomen" },
  { w: "die Kartoffel", m: "patates", e: "In Deutschland isst man viele Kartoffeln.", p: "Nomen" },
  { w: "das Fleisch", m: "et", e: "Er isst kein Fleisch.", p: "Nomen" },
  { w: "der Fisch", m: "balık", e: "Dieser Fisch schmeckt sehr gut.", p: "Nomen" },
  { w: "das Gemüse", m: "sebze", e: "Gemüse ist sehr gesund.", p: "Nomen" },
  { w: "der Salat", m: "salata", e: "Ich esse gern Salat.", p: "Nomen" },
  { w: "die Tomate", m: "domates", e: "Die Tomaten sind frisch.", p: "Nomen" },
  { w: "der Apfel", m: "elma", e: "Ein Apfel am Tag hält den Arzt fern.", p: "Nomen" },
  { w: "die Banane", m: "muz", e: "Ich esse gern Bananen.", p: "Nomen" },
  { w: "der Joghurt", m: "yoğurt", e: "Ich esse Joghurt zum Frühstück.", p: "Nomen" },
  { w: "die Nudeln", m: "makarna", e: "Heute koche ich Nudeln.", p: "Nomen" },
  { w: "der Reis", m: "pirinç", e: "Ich esse Reis mit Gemüse.", p: "Nomen" },
  { w: "die Suppe", m: "çorba", e: "Die Suppe ist heiß.", p: "Nomen" },
  { w: "die Pizza", m: "pizza", e: "Ich mag Pizza sehr gern.", p: "Nomen" },
  { w: "trinken", m: "içmek", e: "Was möchten Sie trinken?", p: "Verb" },
  { w: "kochen", m: "yemek pişirmek", e: "Ich koche jeden Abend.", p: "Verb" },
  { w: "mögen", m: "sevmek / beğenmek", e: "Ich mag keine Zwiebeln.", p: "Verb" },
  { w: "kaufen", m: "satın almak", e: "Ich kaufe Brot im Supermarkt.", p: "Verb" },
  { w: "bezahlen", m: "ödemek", e: "Kann ich bitte bezahlen?", p: "Verb" },
  { w: "lecker", m: "lezzetli", e: "Das Essen schmeckt wirklich lecker!", p: "Adjektiv" },
  { w: "frisch", m: "taze", e: "Das Brot ist frisch.", p: "Adjektiv" },
  { w: "gesund", m: "sağlıklı", e: "Obst und Gemüse sind gesund.", p: "Adjektiv" },
  { w: "der Supermarkt", m: "süpermarket", e: "Ich gehe zum Supermarkt.", p: "Nomen" },
  // Lektion 5 – Unterwegs
  { w: "das Auto", m: "araba", e: "Ich fahre mit dem Auto.", p: "Nomen" },
  { w: "der Bus", m: "otobüs", e: "Der Bus kommt um 9 Uhr.", p: "Nomen" },
  { w: "der Zug", m: "tren", e: "Wir fahren mit dem Zug.", p: "Nomen" },
  { w: "das Fahrrad", m: "bisiklet", e: "Im Sommer fahre ich Fahrrad.", p: "Nomen" },
  { w: "die U-Bahn", m: "metro", e: "Ich fahre mit der U-Bahn.", p: "Nomen" },
  { w: "die S-Bahn", m: "banliyö treni", e: "Die S-Bahn ist schnell.", p: "Nomen" },
  { w: "die Straßenbahn", m: "tramvay", e: "Die Straßenbahn hält hier.", p: "Nomen" },
  { w: "das Ticket", m: "bilet", e: "Ich kaufe ein Ticket.", p: "Nomen" },
  { w: "die Haltestelle", m: "durak", e: "Die Haltestelle ist da drüben.", p: "Nomen" },
  { w: "der Bahnhof", m: "tren garı", e: "Der Bahnhof ist in der Mitte.", p: "Nomen" },
  { w: "ankommen", m: "varmak", e: "Wann kommt der Zug an?", p: "Verb" },
  { w: "abfahren", m: "hareket etmek / kalkmak", e: "Der Bus fährt um 10 ab.", p: "Verb" },
  { w: "einsteigen", m: "binmek", e: "Bitte schnell einsteigen!", p: "Verb" },
  { w: "aussteigen", m: "inmek", e: "Ich steige an der nächsten Haltestelle aus.", p: "Verb" },
  { w: "umsteigen", m: "aktarma yapmak", e: "Sie müssen in Frankfurt umsteigen.", p: "Verb" },
  { w: "suchen", m: "aramak", e: "Ich suche den Bahnhof.", p: "Verb" },
  { w: "links", m: "sol", e: "Gehen Sie links.", p: "Adverb" },
  { w: "rechts", m: "sağ", e: "Die Bank ist rechts.", p: "Adverb" },
  { w: "geradeaus", m: "düz / doğruca", e: "Gehen Sie geradeaus.", p: "Adverb" },
  { w: "die Richtung", m: "yön", e: "In welche Richtung?", p: "Nomen" },
  { w: "die Ampel", m: "trafik lambası", e: "Warten Sie an der Ampel.", p: "Nomen" },
  { w: "der Park", m: "park", e: "Ich gehe in den Park.", p: "Nomen" },
  { w: "das Museum", m: "müze", e: "Das Museum ist sonntags geschlossen.", p: "Nomen" },
  { w: "das Café", m: "kafe", e: "Wir treffen uns im Café.", p: "Nomen" },
  { w: "zu Fuß gehen", m: "yürümek", e: "Ich gehe zu Fuß zur Arbeit.", p: "Verb" },
  // Lektion 6 – Zuhause
  { w: "das Haus", m: "ev", e: "Wir wohnen in einem kleinen Haus.", p: "Nomen" },
  { w: "die Wohnung", m: "daire", e: "Die Wohnung hat drei Zimmer.", p: "Nomen" },
  { w: "das Zimmer", m: "oda", e: "Mein Zimmer ist sehr hell.", p: "Nomen" },
  { w: "die Küche", m: "mutfak", e: "Die Küche ist modern.", p: "Nomen" },
  { w: "das Bad", m: "banyo", e: "Das Bad ist sauber.", p: "Nomen" },
  { w: "das Wohnzimmer", m: "oturma odası", e: "Das Wohnzimmer ist groß.", p: "Nomen" },
  { w: "das Schlafzimmer", m: "yatak odası", e: "Das Schlafzimmer ist ruhig.", p: "Nomen" },
  { w: "der Balkon", m: "balkon", e: "Der Balkon hat einen tollen Ausblick.", p: "Nomen" },
  { w: "der Garten", m: "bahçe", e: "Im Garten spielen die Kinder.", p: "Nomen" },
  { w: "das Bett", m: "yatak", e: "Ich gehe um 22 Uhr ins Bett.", p: "Nomen" },
  { w: "der Tisch", m: "masa", e: "Das Buch liegt auf dem Tisch.", p: "Nomen" },
  { w: "der Stuhl", m: "sandalye", e: "Bitte nehmen Sie Platz!", p: "Nomen" },
  { w: "das Sofa", m: "kanepe", e: "Das Sofa ist sehr bequem.", p: "Nomen" },
  { w: "der Schrank", m: "dolap", e: "Der Schrank ist voll.", p: "Nomen" },
  { w: "der Teppich", m: "halı", e: "Der Teppich ist rot.", p: "Nomen" },
  { w: "die Waschmaschine", m: "çamaşır makinesi", e: "Die Waschmaschine ist neu.", p: "Nomen" },
  { w: "der Kühlschrank", m: "buzdolabı", e: "Der Kühlschrank ist leer.", p: "Nomen" },
  { w: "die Miete", m: "kira", e: "Die Miete ist sehr teuer.", p: "Nomen" },
  { w: "mieten", m: "kiralamak", e: "Wir möchten eine Wohnung mieten.", p: "Verb" },
  { w: "umziehen", m: "taşınmak", e: "Wir ziehen nächsten Monat um.", p: "Verb" },
  { w: "groß", m: "büyük", e: "Die Wohnung ist sehr groß.", p: "Adjektiv" },
  { w: "klein", m: "küçük", e: "Das Zimmer ist klein.", p: "Adjektiv" },
  { w: "hell", m: "aydınlık", e: "Das Zimmer ist hell.", p: "Adjektiv" },
  { w: "dunkel", m: "karanlık", e: "Das Zimmer ist dunkel.", p: "Adjektiv" },
  { w: "ruhig", m: "sakin / sessiz", e: "Die Wohnung ist sehr ruhig.", p: "Adjektiv" },
  { w: "laut", m: "gürültülü", e: "Die Straße ist laut.", p: "Adjektiv" },
  { w: "bequem", m: "rahat", e: "Der Stuhl ist bequem.", p: "Adjektiv" },
  // Extra A1
  { w: "jetzt", m: "şimdi", e: "Ich komme jetzt.", p: "Adverb" },
  { w: "hier", m: "burada", e: "Ich bin hier.", p: "Adverb" },
  { w: "das Heft", m: "defter", e: "Das Heft ist auf dem Tisch.", p: "Nomen" },
  { w: "der Kuli", m: "tükenmez kalem", e: "Ich schreibe mit dem Kuli.", p: "Nomen" },
  { w: "der Zucker", m: "şeker", e: "Nehmen Sie Zucker in den Kaffee?", p: "Nomen" },
  { w: "der Wein", m: "şarap", e: "Er trinkt ein Glas Wein.", p: "Nomen" },
  { w: "der Honig", m: "bal", e: "Ich esse Brot mit Honig.", p: "Nomen" },
  { w: "der Nachbar", m: "komşu", e: "Mein Nachbar ist sehr nett.", p: "Nomen" },
  { w: "die Möbel", m: "mobilyalar", e: "Die Möbel sind neu.", p: "Nomen" },
  { w: "der Sessel", m: "koltuk", e: "Der Sessel ist bequem.", p: "Nomen" },
  { w: "wiederholen", m: "tekrar etmek", e: "Können Sie das wiederholen?", p: "Verb" },
  { w: "neu", m: "yeni", e: "Das Handy ist neu.", p: "Adjektiv" },
  { w: "alt", m: "eski / yaşlı", e: "Das Haus ist sehr alt.", p: "Adjektiv" },
  { w: "schön", m: "güzel", e: "Was für ein schöner Tag!", p: "Adjektiv" },
  { w: "teuer", m: "pahalı", e: "Das Hotel ist sehr teuer.", p: "Adjektiv" },
  { w: "günstig", m: "ucuz / uygun fiyatlı", e: "Das Ticket ist günstig.", p: "Adjektiv" },
  { w: "schnell", m: "hızlı", e: "Der Zug fährt sehr schnell.", pos: "Adjektiv" },
  { w: "viel", m: "çok (miktar)", e: "Ich habe viel Arbeit.", p: "Adverb" },
  { w: "wenig", m: "az", e: "Ich habe leider wenig Zeit.", p: "Adverb" },
  { w: "der Mann", m: "adam / erkek", e: "Der Mann arbeitet in einer Firma.", p: "Nomen" },
  { w: "die Familie", m: "aile", e: "Meine Familie ist sehr groß.", p: "Nomen" },
  { w: "die Mutter", m: "anne", e: "Meine Mutter kocht sehr gut.", p: "Nomen" },
  { w: "der Vater", m: "baba", e: "Mein Vater arbeitet als Lehrer.", p: "Nomen" },
  { w: "die Schwester", m: "kız kardeş", e: "Meine Schwester ist 15 Jahre alt.", p: "Nomen" },
  { w: "der Bruder", m: "erkek kardeş", e: "Mein Bruder wohnt in Berlin.", p: "Nomen" },
  { w: "das Kind", m: "çocuk", e: "Das Kind spielt im Park.", p: "Nomen" },
  { w: "der Freund", m: "erkek arkadaş / dost", e: "Mein Freund heißt Thomas.", p: "Nomen" },
  { w: "die Freundin", m: "kız arkadaş / dost", e: "Meine Freundin kommt aus der Türkei.", p: "Nomen" },
  { w: "haben", m: "sahip olmak", e: "Ich habe zwei Schwestern.", p: "Verb" },
  { w: "machen", m: "yapmak", e: "Was machst du beruflich?", p: "Verb" },
  { w: "der Morgen", m: "sabah", e: "Guten Morgen!", p: "Nomen" },
  { w: "der Abend", m: "akşam", e: "Am Abend sehe ich fern.", p: "Nomen" },
  { w: "die Nacht", m: "gece", e: "Gute Nacht!", p: "Nomen" },
  { w: "die Uhr", m: "saat (aygıt)", e: "Es ist 10 Uhr.", p: "Nomen" },
  { w: "der Monat", m: "ay", e: "Im Monat Juli ist es heiß.", p: "Nomen" },
  { w: "das Büro", m: "ofis", e: "Er arbeitet im Büro.", p: "Nomen" },
  { w: "die Schule", m: "okul", e: "Die Kinder gehen in die Schule.", p: "Nomen" },
  { w: "der Lehrer", m: "öğretmen (erkek)", e: "Der Lehrer erklärt die Grammatik.", p: "Nomen" },
  { w: "die Lehrerin", m: "öğretmen (kadın)", e: "Die Lehrerin ist sehr nett.", p: "Nomen" },
  { w: "jung", m: "genç", e: "Sie ist noch sehr jung.", p: "Adjektiv" },
  { w: "billig", m: "ucuz", e: "Der Markt hat billige Lebensmittel.", p: "Adjektiv" },
  { w: "kalt", m: "soğuk", e: "Im Winter ist es kalt.", p: "Adjektiv" },
  { w: "warm", m: "sıcak / ılık", e: "Das Wasser ist warm.", p: "Adjektiv" },
  { w: "schlecht", m: "kötü", e: "Das Wetter ist heute schlecht.", p: "Adjektiv" },
];

// ─────────────────────────────────────────────
// A2 KELİMELERİ
// ─────────────────────────────────────────────
const A2_VOCAB = [
  // Lektion 1 – Chatten & Medien
  { w: "die App", m: "uygulama", e: "Diese App ist sehr nützlich.", p: "Nomen" },
  { w: "das Internet", m: "internet", e: "Das Internet ist heute sehr wichtig.", p: "Nomen" },
  { w: "das Smartphone", m: "akıllı telefon", e: "Mein Smartphone ist neu.", p: "Nomen" },
  { w: "chatten", m: "sohbet etmek", e: "Ich chatte gerne mit meinen Freunden.", p: "Verb" },
  { w: "herunterladen", m: "indirmek", e: "Ich lade die App herunter.", p: "Verb" },
  { w: "hochladen", m: "yüklemek", e: "Ich lade das Foto hoch.", p: "Verb" },
  { w: "speichern", m: "kaydetmek", e: "Vergiss nicht zu speichern.", p: "Verb" },
  { w: "löschen", m: "silmek", e: "Du solltest die E-Mail löschen.", p: "Verb" },
  { w: "googeln", m: "google'da aramak", e: "Ich muss das kurz googeln.", p: "Verb" },
  { w: "informieren", m: "bilgi vermek / öğrenmek", e: "Ich informiere mich täglich über Nachrichten.", p: "Verb" },
  { w: "empfehlen", m: "tavsiye etmek", e: "Was können Sie mir empfehlen?", p: "Verb" },
  { w: "diskutieren", m: "tartışmak", e: "Wir diskutieren über das Thema.", p: "Verb" },
  { w: "die Empfehlung", m: "tavsiye", e: "Danke für die Empfehlung.", p: "Nomen" },
  { w: "die Verabredung", m: "randevu", e: "Ich habe eine Verabredung um 18 Uhr.", p: "Nomen" },
  { w: "der Vorschlag", m: "öneri", e: "Das ist ein guter Vorschlag!", p: "Nomen" },
  { w: "kostenlos", m: "ücretsiz", e: "Der Kurs ist kostenlos.", p: "Adjektiv" },
  { w: "aktuell", m: "güncel", e: "Die Nachrichten sind aktuell.", p: "Adjektiv" },
  { w: "nervös", m: "gergin / sinirli", e: "Vor der Prüfung bin ich nervös.", p: "Adjektiv" },
  { w: "prima", m: "harika / mükemmel", e: "Das ist eine prima Idee!", p: "Adjektiv" },
  { w: "der Kommentar", m: "yorum", e: "Ich schreibe einen Kommentar.", p: "Nomen" },
  { w: "die Wettervorhersage", m: "hava tahmini", e: "Wie ist die Wettervorhersage für morgen?", p: "Nomen" },
  { w: "der Regen", m: "yağmur", e: "Nimm einen Schirm mit, es gibt Regen.", p: "Nomen" },
  { w: "der Regenschirm", m: "şemsiye", e: "Ich brauche einen Regenschirm.", p: "Nomen" },
  { w: "die Veranstaltung", m: "etkinlik / organizasyon", e: "Die Veranstaltung war toll.", p: "Nomen" },
  { w: "das Theater", m: "tiyatro", e: "Wir gehen heute ins Theater.", p: "Nomen" },
  { w: "reservieren", m: "rezervasyon yapmak", e: "Ich möchte einen Tisch reservieren.", p: "Verb" },
  { w: "die Reservierung", m: "rezervasyon", e: "Haben Sie eine Reservierung?", p: "Nomen" },
  { w: "bestellen", m: "sipariş vermek", e: "Darf ich bitte bestellen?", p: "Verb" },
  // Lektion 2 – Mit Bus und Bahn
  { w: "die Abfahrt", m: "hareket / kalkış", e: "Wann ist die Abfahrt?", p: "Nomen" },
  { w: "die Ankunft", m: "varış", e: "Die Ankunft ist um 14:30 Uhr.", p: "Nomen" },
  { w: "der Fahrplan", m: "tarife / sefer tablosu", e: "Schauen Sie in den Fahrplan.", p: "Nomen" },
  { w: "der Bahnsteig", m: "peron", e: "Der Zug steht an Bahnsteig 5.", p: "Nomen" },
  { w: "die Verspätung", m: "gecikme", e: "Der Bus hat 10 Minuten Verspätung.", p: "Nomen" },
  { w: "verpassen", m: "kaçırmak", e: "Beeil dich, sonst verpassen wir den Zug!", p: "Verb" },
  { w: "verschlafen", m: "uyuya kalmak", e: "Ich habe heute Morgen verschlafen.", p: "Verb" },
  { w: "buchen", m: "rezervasyon yapmak / ayırtmak", e: "Ich buche das Ticket online.", p: "Verb" },
  { w: "sparen", m: "tasarruf etmek / biriktirmek", e: "Ich möchte Geld sparen.", p: "Verb" },
  { w: "fliegen", m: "uçmak", e: "Wir fliegen in den Urlaub.", p: "Verb" },
  { w: "das Flugzeug", m: "uçak", e: "Das Flugzeug startet um 12 Uhr.", p: "Nomen" },
  { w: "der Flughafen", m: "havalimanı", e: "Wir fahren zum Flughafen.", p: "Nomen" },
  { w: "preiswert", m: "uygun fiyatlı", e: "Das Ticket ist sehr preiswert.", p: "Adjektiv" },
  { w: "schwierig", m: "zor / güç", e: "Deutsch ist manchmal schwierig.", p: "Adjektiv" },
  { w: "deshalb", m: "bu yüzden / bu nedenle", e: "Es regnet, deshalb nehme ich den Bus.", p: "Konjunktion" },
  { w: "die Umwelt", m: "çevre / doğa", e: "Wir müssen die Umwelt schützen.", p: "Nomen" },
  { w: "die Verbindung", m: "bağlantı", e: "Die Verbindung nach Hamburg ist gut.", p: "Nomen" },
  { w: "unterwegs", m: "yolda / seyahatte", e: "Ich bin noch unterwegs.", p: "Adverb" },
  // Lektion 3 – Wohnen & Amt
  { w: "der Briefkasten", m: "posta kutusu", e: "Ist Post im Briefkasten?", p: "Nomen" },
  { w: "der Hausmeister", m: "bina görevlisi", e: "Der Hausmeister hilft bei Problemen.", p: "Nomen" },
  { w: "die Hausordnung", m: "bina yönetmeliği", e: "Bitte beachten Sie die Hausordnung.", p: "Nomen" },
  { w: "der Mieter", m: "kiracı", e: "Die Mieter sind freundlich.", p: "Nomen" },
  { w: "der Vermieter", m: "ev sahibi / kiralayan", e: "Der Vermieter hat die Wohnung renoviert.", p: "Nomen" },
  { w: "einziehen", m: "taşınmak (içine)", e: "Wann können Sie einziehen?", p: "Verb" },
  { w: "die Beschwerde", m: "şikayet", e: "Ich möchte eine Beschwerde einreichen.", p: "Nomen" },
  { w: "der Ausweis", m: "kimlik", e: "Bitte zeigen Sie Ihren Ausweis.", p: "Nomen" },
  { w: "der Reisepass", m: "pasaport", e: "Nehmen Sie Ihren Reisepass mit.", p: "Nomen" },
  { w: "der Personalausweis", m: "nüfus cüzdanı", e: "Mein Personalausweis ist abgelaufen.", p: "Nomen" },
  { w: "der Antrag", m: "başvuru / dilekçe", e: "Ich stelle einen Antrag.", p: "Nomen" },
  { w: "die Aufenthaltserlaubnis", m: "oturma izni", e: "Meine Aufenthaltserlaubnis läuft ab.", p: "Nomen" },
  { w: "beantragen", m: "başvurmak", e: "Er möchte ein Visum beantragen.", p: "Verb" },
  { w: "unterschreiben", m: "imzalamak", e: "Unterschreiben Sie bitte hier.", p: "Verb" },
  { w: "die Unterlagen", m: "belgeler / evraklar", e: "Alle Unterlagen sind vollständig.", p: "Nomen" },
  { w: "zuständig", m: "sorumlu / yetkili", e: "Wer ist hier zuständig?", p: "Adjektiv" },
  // Lektion 4 – Gesundheit
  { w: "der Arzt", m: "doktor (erkek)", e: "Ich muss zum Arzt gehen.", p: "Nomen" },
  { w: "die Ärztin", m: "doktor (kadın)", e: "Meine Ärztin empfiehlt mehr Bewegung.", p: "Nomen" },
  { w: "das Krankenhaus", m: "hastane", e: "Er liegt im Krankenhaus.", p: "Nomen" },
  { w: "die Apotheke", m: "eczane", e: "Das Medikament gibt es in der Apotheke.", p: "Nomen" },
  { w: "das Medikament", m: "ilaç", e: "Nehmen Sie das Medikament dreimal täglich.", p: "Nomen" },
  { w: "der Schmerz", m: "ağrı", e: "Ich habe Schmerzen im Rücken.", p: "Nomen" },
  { w: "der Kopf", m: "baş", e: "Mir tut der Kopf weh.", p: "Nomen" },
  { w: "der Bauch", m: "karın / göbek", e: "Ich habe Bauchschmerzen.", p: "Nomen" },
  { w: "der Rücken", m: "sırt", e: "Mein Rücken schmerzt.", p: "Nomen" },
  { w: "das Fieber", m: "ateş (hastalık)", e: "Ich habe Fieber.", p: "Nomen" },
  { w: "krank", m: "hasta", e: "Ich bin krank und bleibe zu Hause.", p: "Adjektiv" },
  { w: "müde", m: "yorgun", e: "Ich bin sehr müde.", p: "Adjektiv" },
  { w: "weh tun", m: "acı vermek / ağrımak", e: "Mein Bein tut weh.", p: "Verb" },
  // Lektion 5 – Beruf & Schule
  { w: "der Beruf", m: "meslek", e: "Was ist Ihr Beruf?", p: "Nomen" },
  { w: "der Abschluss", m: "mezuniyet / diploma", e: "Ich habe einen guten Abschluss.", p: "Nomen" },
  { w: "die Berufsausbildung", m: "mesleki eğitim", e: "Die Ausbildung dauert drei Jahre.", p: "Nomen" },
  { w: "das Vorstellungsgespräch", m: "iş görüşmesi / mülakat", e: "Morgen habe ich ein Vorstellungsgespräch.", p: "Nomen" },
  { w: "das Zeugnis", m: "karne / diploma / belge", e: "Ich zeige das Zeugnis.", p: "Nomen" },
  { w: "schaffen", m: "başarmak / becermek", e: "Du wirst die Prüfung schaffen!", p: "Verb" },
  { w: "die Stelle", m: "iş pozisyonu / kadro", e: "Ich bewerbe mich um eine Stelle.", p: "Nomen" },
  { w: "die Teilzeitstelle", m: "yarı zamanlı iş", e: "Ich suche eine Teilzeitstelle.", p: "Nomen" },
  { w: "die Voraussetzung", m: "ön şart / gereksinim", e: "Deutschkenntnisse sind Voraussetzung.", p: "Nomen" },
  // Lektion 6 – Alltag & Kommunikation
  { w: "die Erfahrung", m: "deneyim / tecrübe", e: "Ich habe viel Erfahrung.", p: "Nomen" },
  { w: "der Vorteil", m: "avantaj", e: "Ein Auto hat viele Vorteile.", p: "Nomen" },
  { w: "der Nachteil", m: "dezavantaj", e: "Ein Nachteil ist der hohe Preis.", p: "Nomen" },
  { w: "vergleichen", m: "karşılaştırmak", e: "Man muss die Preise vergleichen.", p: "Verb" },
  { w: "versuchen", m: "denemek / çalışmak", e: "Ich versuche, täglich Deutsch zu sprechen.", p: "Verb" },
  { w: "erklären", m: "açıklamak", e: "Können Sie das bitte erklären?", p: "Verb" },
  { w: "versprechen", m: "söz vermek", e: "Ich verspreche, pünktlich zu sein.", p: "Verb" },
  { w: "sich erinnern", m: "hatırlamak", e: "Ich erinnere mich gerne an den Urlaub.", p: "Verb" },
  { w: "die Lösung", m: "çözüm", e: "Wir müssen eine Lösung finden.", p: "Nomen" },
  { w: "der Unterschied", m: "fark", e: "Was ist der Unterschied?", p: "Nomen" },
  { w: "die Meinung", m: "fikir / görüş", e: "Was ist Ihre Meinung?", p: "Nomen" },
  { w: "die Einladung", m: "davet", e: "Danke für die Einladung.", p: "Nomen" },
  { w: "feiern", m: "kutlamak", e: "Wir feiern meinen Geburtstag.", p: "Verb" },
  { w: "das Geschenk", m: "hediye", e: "Ich suche ein Geschenk.", p: "Nomen" },
  { w: "besuchen", m: "ziyaret etmek", e: "Ich besuche meine Großeltern.", p: "Verb" },
  { w: "vielleicht", m: "belki", e: "Vielleicht komme ich später.", p: "Adverb" },
  { w: "unbedingt", m: "mutlaka / kesinlikle", e: "Du musst unbedingt diesen Film sehen.", p: "Adverb" },
  { w: "gemeinsam", m: "birlikte / ortaklaşa", e: "Wir essen gemeinsam.", p: "Adjektiv" },
  { w: "obwohl", m: "rağmen (-e karşın)", e: "Ich gehe spazieren, obwohl es regnet.", p: "Konjunktion" },
  { w: "trotzdem", m: "buna rağmen", e: "Es ist kalt, trotzdem gehe ich raus.", p: "Konjunktion" },
  { w: "während", m: "esnasında / iken", e: "Während ich lerne, höre ich Musik.", p: "Konjunktion" },
  { w: "deshalb", m: "bu yüzden", e: "Ich bin müde, deshalb gehe ich schlafen.", p: "Konjunktion" },
  { w: "sowohl ... als auch", m: "hem ... hem de", e: "Ich spreche sowohl Englisch als auch Deutsch.", p: "Konjunktion" },
  { w: "zuerst", m: "ilk önce / önce", e: "Zuerst machen wir die Hausaufgaben.", p: "Adverb" },
  { w: "schließlich", m: "sonunda / nihayet", e: "Schließlich haben wir das Ziel erreicht.", p: "Adverb" },
  { w: "das Gehalt", m: "maaş", e: "Wie hoch ist das Gehalt?", p: "Nomen" },
  { w: "das Stipendium", m: "burs", e: "Er bewirbt sich um ein Stipendium.", p: "Nomen" },
  { w: "die Fähigkeit", m: "yetenek / beceri", e: "Programmieren ist eine wichtige Fähigkeit.", p: "Nomen" },
  // Sağlık & Alışveriş
  { w: "das Geschäft", m: "dükkan / mağaza", e: "Das Geschäft öffnet um 9 Uhr.", p: "Nomen" },
  { w: "der Preis", m: "fiyat", e: "Wie viel kostet das? Was ist der Preis?", p: "Nomen" },
  { w: "der Rabatt", m: "indirim", e: "Im Ausverkauf gibt es 30% Rabatt.", p: "Nomen" },
  { w: "die Kasse", m: "kasa", e: "Bitte zahlen Sie an der Kasse.", p: "Nomen" },
  { w: "die Rechnung", m: "fatura / hesap", e: "Kann ich bitte die Rechnung haben?", p: "Nomen" },
  { w: "das Angebot", m: "teklif / kampanya", e: "Diese Woche gibt es ein tolles Angebot.", p: "Nomen" },
  { w: "das Hemd", m: "gömlek", e: "Er trägt ein weißes Hemd.", p: "Nomen" },
  { w: "die Hose", m: "pantolon", e: "Diese Hose passt mir gut.", p: "Nomen" },
  { w: "das Kleid", m: "elbise", e: "Sie trägt ein rotes Kleid.", p: "Nomen" },
  { w: "die Jacke", m: "ceket / mont", e: "Nimm eine Jacke mit!", p: "Nomen" },
  { w: "die Schuhe", m: "ayakkabılar", e: "Diese Schuhe sind sehr bequem.", p: "Nomen" },
  { w: "die Größe", m: "beden / boyut", e: "Welche Größe haben Sie?", p: "Nomen" },
  { w: "helfen", m: "yardım etmek", e: "Können Sie mir helfen?", p: "Verb" },
  { w: "brauchen", m: "ihtiyacı olmak", e: "Ich brauche Hilfe.", p: "Verb" },
  { w: "möchten", m: "istemek (-mek istemek)", e: "Ich möchte bitte ein Glas Wasser.", p: "Verb" },
  { w: "können", m: "yapabilmek (-ebilmek)", e: "Können Sie mir helfen?", p: "Verb" },
  { w: "müssen", m: "zorunda olmak (-meli)", e: "Ich muss jetzt gehen.", p: "Verb" },
  { w: "dürfen", m: "izin olmak (-ebilmek)", e: "Darf ich hier parken?", p: "Verb" },
  { w: "sollen", m: "gerekli olmak (-meli)", e: "Sie sollen mehr trinken.", p: "Verb" },
  { w: "wissen", m: "bilmek (bir bilgi)", e: "Ich weiß nicht, wo das ist.", p: "Verb" },
  { w: "kennen", m: "tanımak", e: "Kennen Sie diese Stadt?", p: "Verb" },
  { w: "finden", m: "bulmak / düşünmek", e: "Ich finde diesen Film sehr gut.", p: "Verb" },
  { w: "freundlich", m: "nazik / sempatik", e: "Die Mitarbeiter sind sehr freundlich.", p: "Adjektiv" },
  { w: "pünktlich", m: "dakik / zamanında", e: "In Deutschland ist es wichtig, pünktlich zu sein.", p: "Adjektiv" },
  { w: "sauber", m: "temiz", e: "Die Wohnung ist sehr sauber.", p: "Adjektiv" },
  { w: "schwer", m: "ağır / zor", e: "Dieser Koffer ist sehr schwer.", p: "Adjektiv" },
  { w: "leicht", m: "hafif / kolay", e: "Die Aufgabe ist sehr leicht.", p: "Adjektiv" },
  { w: "wichtig", m: "önemli", e: "Pünktlichkeit ist sehr wichtig.", p: "Adjektiv" },
  { w: "die Welt", m: "dünya", e: "Die Welt ist groß.", p: "Nomen" },
  { w: "der Urlaub", m: "tatil", e: "Im Sommer fahre ich in den Urlaub.", p: "Nomen" },
  { w: "die Reise", m: "seyahat / yolculuk", e: "Die Reise war sehr schön.", p: "Nomen" },
  { w: "das Hotel", m: "otel", e: "Ich möchte ein Zimmer im Hotel reservieren.", p: "Nomen" },
  { w: "der Schlüssel", m: "anahtar", e: "Hier ist Ihr Zimmerschlüssel.", p: "Nomen" },
  { w: "das Wetter", m: "hava durumu", e: "Wie ist das Wetter heute?", p: "Nomen" },
  { w: "der Schnee", m: "kar", e: "Im Winter fällt viel Schnee.", p: "Nomen" },
  { w: "die Sonne", m: "güneş", e: "Die Sonne scheint heute.", p: "Nomen" },
  { w: "der Wind", m: "rüzgar", e: "Es ist heute sehr windig.", p: "Nomen" },
  { w: "die Wolke", m: "bulut", e: "Es gibt viele Wolken.", p: "Nomen" },
  { w: "der Ingenieur", m: "mühendis", e: "Mein Vater ist Ingenieur.", p: "Nomen" },
  { w: "der Koch", m: "aşçı", e: "Der Koch kocht sehr gut.", p: "Nomen" },
  { w: "der Verkäufer", m: "satıcı", e: "Der Verkäufer hilft mir.", p: "Nomen" },
  { w: "die Krankenschwester", m: "hemşire", e: "Die Krankenschwester ist sehr nett.", p: "Nomen" },
];

// ─────────────────────────────────────────────
// B1 KELİMELERİ
// ─────────────────────────────────────────────
const B1_VOCAB = [
  // Ünite 1 – Beruf & Alltag
  { w: "die Aufgabe", m: "görev / ödev", e: "Das ist eine schwierige Aufgabe.", p: "Nomen" },
  { w: "die Verantwortung", m: "sorumluluk", e: "Ich trage die Verantwortung für das Projekt.", p: "Nomen" },
  { w: "der Vorgesetzte", m: "üst / amir", e: "Mein Vorgesetzter ist sehr streng.", p: "Nomen" },
  { w: "die Karriere", m: "kariyer", e: "Sie möchte eine gute Karriere machen.", p: "Nomen" },
  { w: "die Kündigung", m: "işten çıkarma / istifa", e: "Er hat die Kündigung erhalten.", p: "Nomen" },
  { w: "kündigen", m: "istifa etmek / işten çıkarmak", e: "Er hat seinen Job gekündigt.", p: "Verb" },
  { w: "der Kollege", m: "erkek meslektaş", e: "Mein Kollege hilft mir immer.", p: "Nomen" },
  { w: "die Kollegin", m: "kadın meslektaş", e: "Meine Kollegin ist sehr nett.", p: "Nomen" },
  { w: "die Überstunde", m: "fazla mesai", e: "Ich mache oft Überstunden.", p: "Nomen" },
  { w: "das Gehalt", m: "maaş", e: "Mein Gehalt ist gestiegen.", p: "Nomen" },
  { w: "die Besprechung", m: "toplantı", e: "Wir haben eine Besprechung um 10 Uhr.", p: "Nomen" },
  { w: "vereinbaren", m: "anlaşmak / ayarlamak", e: "Wir haben einen Termin vereinbart.", p: "Verb" },
  { w: "erledigen", m: "halletmek / tamamlamak", e: "Ich muss viele Aufgaben erledigen.", p: "Verb" },
  { w: "vorschlagen", m: "önermek", e: "Ich schlage eine Lösung vor.", p: "Verb" },
  { w: "ablehnen", m: "reddetmek", e: "Das Angebot wurde abgelehnt.", p: "Verb" },
  { w: "genehmigen", m: "onaylamak", e: "Der Chef hat den Antrag genehmigt.", p: "Verb" },
  { w: "das Protokoll", m: "tutanak / protokol", e: "Wer schreibt das Protokoll?", p: "Nomen" },
  { w: "die Qualifikation", m: "nitelik / yeterlilik", e: "Welche Qualifikationen haben Sie?", p: "Nomen" },
  // Ünite 2 – Gesellschaft & Umwelt
  { w: "die Gesellschaft", m: "toplum", e: "Die Gesellschaft verändert sich.", p: "Nomen" },
  { w: "der Klimawandel", m: "iklim değişikliği", e: "Der Klimawandel ist ein globales Problem.", p: "Nomen" },
  { w: "das Recycling", m: "geri dönüşüm", e: "Recycling ist wichtig für die Umwelt.", p: "Nomen" },
  { w: "die Nachhaltigkeit", m: "sürdürülebilirlik", e: "Nachhaltigkeit ist ein wichtiges Thema.", p: "Nomen" },
  { w: "der Abfall", m: "çöp / atık", e: "Bitte wirft den Abfall in den Mülleimer.", p: "Nomen" },
  { w: "der Strom", m: "elektrik / akıntı", e: "Wir müssen Strom sparen.", p: "Nomen" },
  { w: "erneuerbar", m: "yenilenebilir", e: "Solarenergie ist erneuerbare Energie.", p: "Adjektiv" },
  { w: "der Protest", m: "protesto", e: "Es gibt einen Protest gegen das Gesetz.", p: "Nomen" },
  { w: "die Demonstration", m: "gösteri / protesto yürüyüşü", e: "Viele Menschen nehmen an der Demo teil.", p: "Nomen" },
  { w: "der Beitrag", m: "katkı / yazı", e: "Jeder kann einen Beitrag leisten.", p: "Nomen" },
  { w: "leisten", m: "sağlamak / başarmak", e: "Wir müssen einen Beitrag leisten.", p: "Verb" },
  { w: "schützen", m: "korumak", e: "Wir müssen die Umwelt schützen.", p: "Verb" },
  { w: "verbrauchen", m: "tüketmek", e: "Wir verbrauchen zu viel Energie.", p: "Verb" },
  { w: "verschmutzen", m: "kirletmek", e: "Fabriken verschmutzen die Luft.", p: "Verb" },
  { w: "die Armut", m: "yoksulluk", e: "Armut ist ein globales Problem.", p: "Nomen" },
  { w: "die Gleichheit", m: "eşitlik", e: "Gleichheit ist ein Grundrecht.", p: "Nomen" },
  { w: "die Gerechtigkeit", m: "adalet", e: "Wir kämpfen für Gerechtigkeit.", p: "Nomen" },
  { w: "die Lösung", m: "çözüm", e: "Wir suchen eine Lösung für das Problem.", p: "Nomen" },
  // Ünite 3 – Wünsche & Träume
  { w: "der Traum", m: "rüya / hayal", e: "Mein Traum ist es, die Welt zu bereisen.", p: "Nomen" },
  { w: "träumen", m: "hayal kurmak / rüya görmek", e: "Ich träume von einem eigenen Haus.", p: "Verb" },
  { w: "wünschen", m: "dilemek / istemek", e: "Ich wünsche mir mehr Freizeit.", p: "Verb" },
  { w: "der Wunsch", m: "dilek / istek", e: "Dein Wunsch ist mir Befehl.", p: "Nomen" },
  { w: "sich vorstellen", m: "hayal etmek / kendini tanıtmak", e: "Ich kann mir vorstellen, in Berlin zu leben.", p: "Verb" },
  { w: "planen", m: "planlamak", e: "Wir planen eine Reise nach Europa.", p: "Verb" },
  { w: "der Plan", m: "plan", e: "Hast du einen Plan für die Zukunft?", p: "Nomen" },
  { w: "die Hoffnung", m: "umut", e: "Ich habe die Hoffnung nicht verloren.", p: "Nomen" },
  { w: "hoffen", m: "ummak", e: "Ich hoffe, dass alles gut geht.", p: "Verb" },
  { w: "möglicherweise", m: "muhtemelen / mümkünse", e: "Möglicherweise komme ich später.", p: "Adverb" },
  { w: "wahrscheinlich", m: "muhtemelen / büyük ihtimalle", e: "Das wird wahrscheinlich klappen.", p: "Adverb" },
  { w: "wäre", m: "olurdu (Konjunktiv II)", e: "Das wäre schön!", p: "Verb" },
  { w: "hätte", m: "olsaydım (Konjunktiv II)", e: "Ich hätte gerne mehr Zeit.", p: "Verb" },
  { w: "würde", m: "yapardım (Konjunktiv II)", e: "Ich würde gerne reisen.", p: "Verb" },
  { w: "könnten", m: "yapabilirdiniz (Konjunktiv II)", e: "Könnten Sie mir helfen?", p: "Verb" },
  { w: "die Chance", m: "şans / fırsat", e: "Das ist eine große Chance.", p: "Nomen" },
  { w: "die Möglichkeit", m: "olasılık / imkân", e: "Gibt es eine Möglichkeit?", p: "Nomen" },
  // Ünite 4 – Beziehungen & Relativsätze
  { w: "die Beziehung", m: "ilişki", e: "Wir haben eine gute Beziehung.", p: "Nomen" },
  { w: "die Ehe", m: "evlilik", e: "Sie führen eine glückliche Ehe.", p: "Nomen" },
  { w: "heiraten", m: "evlenmek", e: "Sie wollen im Sommer heiraten.", p: "Verb" },
  { w: "sich trennen", m: "ayrılmak", e: "Sie haben sich nach Jahren getrennt.", p: "Verb" },
  { w: "die Eigenschaft", m: "özellik / nitelik", e: "Ehrlichkeit ist eine gute Eigenschaft.", p: "Nomen" },
  { w: "ehrlich", m: "dürüst / samimi", e: "Sei bitte ehrlich mit mir.", p: "Adjektiv" },
  { w: "zuverlässig", m: "güvenilir", e: "Er ist ein sehr zuverlässiger Mitarbeiter.", p: "Adjektiv" },
  { w: "geduldig", m: "sabırlı", e: "Mit Kindern muss man geduldig sein.", p: "Adjektiv" },
  { w: "das Vertrauen", m: "güven", e: "Vertrauen ist die Basis jeder Beziehung.", p: "Nomen" },
  { w: "vertrauen", m: "güvenmek", e: "Ich vertraue meinen Freunden.", p: "Verb" },
  { w: "unterstützen", m: "desteklemek", e: "Meine Familie unterstützt mich immer.", p: "Verb" },
  { w: "die Unterstützung", m: "destek", e: "Danke für Ihre Unterstützung.", p: "Nomen" },
  { w: "beschreiben", m: "tarif etmek / betimlemek", e: "Kannst du den Mann beschreiben?", p: "Verb" },
  { w: "der / die Bekannte", m: "tanıdık", e: "Ein Bekannter hat mir das erzählt.", p: "Nomen" },
  { w: "der Nachbar", m: "komşu (erkek)", e: "Mein Nachbar ist sehr freundlich.", p: "Nomen" },
  { w: "die Nachbarin", m: "komşu (kadın)", e: "Die Nachbarin hat uns geholfen.", p: "Nomen" },
  // Ünite 5 – Komplexe Verbindungen
  { w: "einerseits", m: "bir yandan", e: "Einerseits ist es teuer, andererseits sehr gut.", p: "Adverb" },
  { w: "andererseits", m: "öte yandan", e: "Andererseits hat das Vorteile.", p: "Adverb" },
  { w: "seitdem", m: "o zamandan beri", e: "Seitdem er umgezogen ist, sehe ich ihn selten.", p: "Konjunktion" },
  { w: "sobald", m: "yapar yapmaz / hemen", e: "Sobald ich fertig bin, rufe ich an.", p: "Konjunktion" },
  { w: "solange", m: "olduğu sürece", e: "Solange du hier bist, bin ich glücklich.", p: "Konjunktion" },
  { w: "falls", m: "eğer / şayet", e: "Falls es regnet, bleiben wir zu Hause.", p: "Konjunktion" },
  { w: "sowohl … als auch", m: "hem … hem de", e: "Er ist sowohl intelligent als auch fleißig.", p: "Konjunktion" },
  { w: "weder … noch", m: "ne … ne de", e: "Ich habe weder Zeit noch Lust.", p: "Konjunktion" },
  { w: "nicht nur … sondern auch", m: "sadece değil … aynı zamanda", e: "Er ist nicht nur klug, sondern auch freundlich.", p: "Konjunktion" },
  { w: "je … desto", m: "ne kadar … o kadar", e: "Je mehr ich lerne, desto besser werde ich.", p: "Konjunktion" },
  { w: "trotz", m: "rağmen", e: "Trotz des Regens gingen wir spazieren.", p: "Präposition" },
  { w: "wegen", m: "yüzünden / nedeniyle", e: "Wegen des Staus kam ich zu spät.", p: "Präposition" },
  { w: "anstatt", m: "yerine", e: "Anstatt zu lernen, hat er ferngesehen.", p: "Konjunktion" },
  { w: "ohne … zu", m: "-meden", e: "Er ging weg, ohne sich zu verabschieden.", p: "Konjunktion" },
  // Ünite 6 – Adjektive & Strukturen
  { w: "begeistert", m: "heyecanlı / coşkulu", e: "Ich bin von dem Buch begeistert.", p: "Adjektiv" },
  { w: "enttäuscht", m: "hayal kırıklığına uğramış", e: "Ich bin sehr enttäuscht.", p: "Adjektiv" },
  { w: "erschöpft", m: "bitkin / yorgun", e: "Nach der Arbeit bin ich erschöpft.", p: "Adjektiv" },
  { w: "aufgeregt", m: "heyecanlı / sinirli", e: "Ich bin sehr aufgeregt.", p: "Adjektiv" },
  { w: "neugierig", m: "meraklı", e: "Kinder sind sehr neugierig.", p: "Adjektiv" },
  { w: "selbstständig", m: "bağımsız / kendi başına", e: "Er arbeitet selbstständig.", p: "Adjektiv" },
  { w: "kreativ", m: "yaratıcı", e: "Sie ist sehr kreativ.", p: "Adjektiv" },
  { w: "erfolgreich", m: "başarılı", e: "Das Projekt war erfolgreich.", p: "Adjektiv" },
  { w: "das Ergebnis", m: "sonuç", e: "Das Ergebnis der Prüfung war gut.", p: "Nomen" },
  { w: "die Bedeutung", m: "anlam / önem", e: "Was ist die Bedeutung dieses Wortes?", p: "Nomen" },
  { w: "der Einfluss", m: "etki / nüfuz", e: "Das hat großen Einfluss auf mein Leben.", p: "Nomen" },
  { w: "beeinflussen", m: "etkilemek", e: "Das Wetter beeinflusst meine Laune.", p: "Verb" },
  { w: "entwickeln", m: "geliştirmek / geişmek", e: "Das Kind entwickelt sich gut.", p: "Verb" },
  { w: "die Entwicklung", m: "gelişme / geliştirme", e: "Die technische Entwicklung ist rasant.", p: "Nomen" },
  { w: "verbessern", m: "geliştirmek / iyileştirmek", e: "Ich möchte mein Deutsch verbessern.", p: "Verb" },
  { w: "die Verbesserung", m: "gelişme / iyileştirme", e: "Es gibt noch Verbesserungspotenzial.", p: "Nomen" },
  { w: "zunehmen", m: "artmak / kilo almak", e: "Die Temperaturen nehmen zu.", p: "Verb" },
  { w: "abnehmen", m: "azalmak / kilo vermek", e: "Die Zahl der Arbeitslosen nimmt ab.", p: "Verb" },
  { w: "der Zusammenschluss", m: "birleşme / birlik", e: "Der Zusammenschluss zweier Firmen wurde verkündet.", p: "Nomen" },
  { w: "die Belegschaft", m: "çalışanlar / personel", e: "Die Belegschaft ist sehr zufrieden.", p: "Nomen" },
  { w: "der Antrieb", m: "motivasyon / itici güç", e: "Er hat viel Antrieb und arbeitet fleißig.", p: "Nomen" },
  { w: "sich durchsetzen", m: "kabul ettirmek / başarmak", e: "Er konnte sich gegen die Konkurrenz durchsetzen.", p: "Verb" },
  { w: "die Herausforderung", m: "zorluk / meydan okuma", e: "Das ist eine große Herausforderung für uns.", p: "Nomen" },
];

// ─────────────────────────────────────────────
// B2 KELİMELERİ
// ─────────────────────────────────────────────
const B2_VOCAB = [
  // Ünite 1 – Zeit & Ereignisse
  { w: "das Ereignis", m: "olay / hadise", e: "Das war ein historisches Ereignis.", p: "Nomen" },
  { w: "berichten", m: "rapor etmek / haber vermek", e: "Die Zeitung berichtet über den Unfall.", p: "Verb" },
  { w: "der Bericht", m: "rapor / haber", e: "Hast du den Bericht gelesen?", p: "Nomen" },
  { w: "analysieren", m: "analiz etmek", e: "Wir müssen die Situation analysieren.", p: "Verb" },
  { w: "die Analyse", m: "analiz", e: "Die Analyse zeigt gute Ergebnisse.", p: "Nomen" },
  { w: "der Zeitraum", m: "zaman dilimi", e: "In diesem Zeitraum ist viel passiert.", p: "Nomen" },
  { w: "der Verlauf", m: "seyir / süreç", e: "Der Verlauf der Krankheit war positiv.", p: "Nomen" },
  { w: "rückblickend", m: "geriye dönüp bakınca", e: "Rückblickend war es eine gute Entscheidung.", p: "Adverb" },
  { w: "die Ursache", m: "neden / sebep", e: "Was ist die Ursache des Problems?", p: "Nomen" },
  { w: "die Folge", m: "sonuç / akıbet", e: "Das hat ernste Folgen.", p: "Nomen" },
  { w: "infolgedessen", m: "bunun sonucunda", e: "Infolgedessen mussten wir den Plan ändern.", p: "Adverb" },
  { w: "im Laufe", m: "boyunca / süresince", e: "Im Laufe der Zeit hat sich viel verändert.", p: "Wendung" },
  { w: "zunächst", m: "öncelikle / ilk olarak", e: "Zunächst möchte ich mich vorstellen.", p: "Adverb" },
  { w: "anschließend", m: "ardından / akabinde", e: "Anschließend gingen wir essen.", p: "Adverb" },
  // Ünite 2 – Zukunft & Hypothesen
  { w: "die Prognose", m: "öngörü / tahmin", e: "Die Prognose ist positiv.", p: "Nomen" },
  { w: "voraussagen", m: "önceden söylemek / tahmin etmek", e: "Niemand kann die Zukunft voraussagen.", p: "Verb" },
  { w: "die Hypothese", m: "hipotez / varsayım", e: "Stellen wir eine Hypothese auf.", p: "Nomen" },
  { w: "annehmen", m: "varsaymak / kabul etmek", e: "Angenommen, du hast recht…", p: "Verb" },
  { w: "vorausgesetzt", m: "şart koşularak / sağlandığı takdirde", e: "Vorausgesetzt, du kommst pünktlich.", p: "Konjunktion" },
  { w: "hätte … gemacht", m: "yapardı (Konj. II Vergangenheit)", e: "Ich hätte das nie gemacht.", p: "Verb" },
  { w: "wäre … gewesen", m: "olurdu (Konj. II Vergangenheit)", e: "Das wäre schön gewesen.", p: "Verb" },
  { w: "das Risiko", m: "risk", e: "Das ist ein kalkuliertes Risiko.", p: "Nomen" },
  { w: "riskieren", m: "riske atmak", e: "Er hat alles riskiert.", p: "Verb" },
  { w: "zweifeln", m: "şüphe duymak", e: "Ich zweifle an seiner Ehrlichkeit.", p: "Verb" },
  { w: "der Zweifel", m: "şüphe / kuşku", e: "Es gibt keinen Zweifel daran.", p: "Nomen" },
  // Ünite 3 – Passiv & Formelle Sprache
  { w: "wurde … gemacht", m: "yapıldı (Passiv Präteritum)", e: "Das Gebäude wurde 1900 gebaut.", p: "Verb" },
  { w: "ist … worden", m: "yapılmış oldu (Passiv Perfekt)", e: "Der Brief ist abgeschickt worden.", p: "Verb" },
  { w: "der Prozess", m: "süreç / proses", e: "Der Prozess dauert lange.", p: "Nomen" },
  { w: "durchführen", m: "gerçekleştirmek / yürütmek", e: "Das Projekt wurde erfolgreich durchgeführt.", p: "Verb" },
  { w: "in Anspruch nehmen", m: "yararlanmak / talep etmek", e: "Sie kann das Angebot in Anspruch nehmen.", p: "Wendung" },
  { w: "zur Verfügung stehen", m: "hizmetinde olmak / mevcut olmak", e: "Ich stehe Ihnen gerne zur Verfügung.", p: "Wendung" },
  { w: "in Betracht kommen", m: "söz konusu olmak / değerlendirilebilmek", e: "Diese Lösung kommt in Betracht.", p: "Wendung" },
  { w: "Bezug nehmen auf", m: "atıfta bulunmak", e: "Ich nehme Bezug auf Ihr Schreiben.", p: "Wendung" },
  { w: "im Hinblick auf", m: "bakımından / açısından", e: "Im Hinblick auf die Kosten ist das optimal.", p: "Wendung" },
  { w: "die Maßnahme", m: "önlem / tedbir", e: "Welche Maßnahmen wurden ergriffen?", p: "Nomen" },
  { w: "ergreifen", m: "almak (önlem) / yakalamak", e: "Wir müssen Maßnahmen ergreifen.", p: "Verb" },
  { w: "das Verfahren", m: "prosedür / yöntem", e: "Das Verfahren ist sehr aufwendig.", p: "Nomen" },
  // Ünite 4 – Indirekte Rede
  { w: "behaupten", m: "iddia etmek", e: "Er behauptet, unschuldig zu sein.", p: "Verb" },
  { w: "die Behauptung", m: "iddia", e: "Diese Behauptung ist falsch.", p: "Nomen" },
  { w: "angeblich", m: "sözde / iddiaya göre", e: "Er ist angeblich krank.", p: "Adverb" },
  { w: "laut", m: "göre / -e göre", e: "Laut Bericht ist alles in Ordnung.", p: "Präposition" },
  { w: "zufolge", m: "göre", e: "Dem Bericht zufolge steigen die Preise.", p: "Präposition" },
  { w: "zitieren", m: "alıntı yapmak", e: "Er zitierte den Experten.", p: "Verb" },
  { w: "das Zitat", m: "alıntı", e: "Das Zitat stammt von Goethe.", p: "Nomen" },
  { w: "der Experte", m: "uzman (erkek)", e: "Der Experte hat das bestätigt.", p: "Nomen" },
  { w: "die Expertin", m: "uzman (kadın)", e: "Die Expertin empfiehlt Bewegung.", p: "Nomen" },
  // Ünite 5 – Logik & Argumentation
  { w: "die Argumentation", m: "argümantasyon", e: "Ihre Argumentation ist überzeugend.", p: "Nomen" },
  { w: "das Argument", m: "argüman", e: "Haben Sie ein gutes Argument?", p: "Nomen" },
  { w: "überzeugen", m: "ikna etmek", e: "Er hat mich überzeugt.", p: "Verb" },
  { w: "überzeugend", m: "ikna edici", e: "Das ist sehr überzeugend.", p: "Adjektiv" },
  { w: "widersprechen", m: "itiraz etmek / karşı çıkmak", e: "Ich möchte dir widersprechen.", p: "Verb" },
  { w: "der Widerspruch", m: "itiraz / çelişki", e: "Das ist ein Widerspruch.", p: "Nomen" },
  { w: "folglich", m: "dolayısıyla / sonuç olarak", e: "Folglich müssen wir handeln.", p: "Adverb" },
  { w: "somit", m: "böylece / bu nedenle", e: "Somit ist das Problem gelöst.", p: "Adverb" },
  { w: "dennoch", m: "yine de / buna rağmen", e: "Es ist schwierig, dennoch versuche ich es.", p: "Adverb" },
  { w: "hingegen", m: "buna karşın / ise", e: "Er ist ruhig, sie hingegen laut.", p: "Adverb" },
  { w: "im Gegensatz zu", m: "-in aksine", e: "Im Gegensatz zu ihm bin ich pünktlich.", p: "Wendung" },
  { w: "die These", m: "tez / öne sürülen görüş", e: "Meine These lautet: Bildung ist wichtig.", p: "Nomen" },
  { w: "belegen", m: "kanıtlamak / desteklemek", e: "Bitte belegen Sie Ihre Aussage.", p: "Verb" },
  { w: "der Beweis", m: "kanıt / ispat", e: "Es gibt keinen Beweis dafür.", p: "Nomen" },
  // Ünite 6 – Verben & Ergänzungen
  { w: "sich beziehen auf", m: "-e atıfta bulunmak", e: "Das bezieht sich auf das letzte Kapitel.", p: "Verb" },
  { w: "bestehen aus", m: "-den oluşmak", e: "Das Team besteht aus 10 Personen.", p: "Verb" },
  { w: "abhängen von", m: "-e bağlı olmak", e: "Das hängt von der Situation ab.", p: "Verb" },
  { w: "sich handeln um", m: "-den ibaret olmak / söz konusu olmak", e: "Es handelt sich um ein Missverständnis.", p: "Verb" },
  { w: "einander", m: "birbirini", e: "Sie helfen einander.", p: "Pronomen" },
  { w: "gegenseitig", m: "karşılıklı", e: "Sie respektieren sich gegenseitig.", p: "Adjektiv" },
  { w: "die Schlussfolgerung", m: "sonuç / çıkarım", e: "Was ist Ihre Schlussfolgerung?", p: "Nomen" },
  { w: "schlussfolgern", m: "sonuç çıkarmak", e: "Daraus kann man schlussfolgern, dass…", p: "Verb" },
  { w: "zusammenfassen", m: "özetlemek", e: "Können Sie das zusammenfassen?", p: "Verb" },
  { w: "die Zusammenfassung", m: "özet", e: "Schreiben Sie eine Zusammenfassung.", p: "Nomen" },
  // Ünite 3 devam – Formelle Sprache
  { w: "die Stellenanzeige", m: "iş ilanı", e: "Ich habe eine Stellenanzeige gelesen.", p: "Nomen" },
  { w: "die Bewerbung", m: "başvuru", e: "Meine Bewerbung wurde abgelehnt.", p: "Nomen" },
  { w: "sich bewerben", m: "başvurmak", e: "Ich bewerbe mich um die Stelle.", p: "Verb" },
  { w: "der Lebenslauf", m: "özgeçmiş", e: "Schicken Sie Ihren Lebenslauf.", p: "Nomen" },
  { w: "das Anschreiben", m: "başvuru mektubu", e: "Das Anschreiben muss überzeugend sein.", p: "Nomen" },
  // Ünite 4 devam
  { w: "die Aussage", m: "ifade / açıklama", e: "Die Aussage des Zeugen war wichtig.", p: "Nomen" },
  { w: "widerlegen", m: "çürütmek", e: "Diese Theorie wurde widerlegt.", p: "Verb" },
  { w: "bestätigen", m: "doğrulamak / teyit etmek", e: "Das bestätigt meine Vermutung.", p: "Verb" },
  { w: "die Bestätigung", m: "onay / teyit", e: "Ich warte auf Bestätigung.", p: "Nomen" },
  // Ünite 5 devam
  { w: "die Konsequenz", m: "sonuç / yaptırım", e: "Das hat ernste Konsequenzen.", p: "Nomen" },
  { w: "konsequent", m: "tutarlı / kararlı", e: "Er ist sehr konsequent in seinem Handeln.", p: "Adjektiv" },
  { w: "der Aspekt", m: "yön / boyut", e: "Das ist ein wichtiger Aspekt.", p: "Nomen" },
  { w: "betrachten", m: "incelemek / değerlendirmek", e: "Wir müssen das genauer betrachten.", p: "Verb" },
  { w: "der Standpunkt", m: "bakış açısı / tutum", e: "Was ist Ihr Standpunkt dazu?", p: "Nomen" },
  // Ünite 6 devam
  { w: "vertreten", m: "temsil etmek / savunmak", e: "Er vertritt eine andere Meinung.", p: "Verb" },
  { w: "das Fazit", m: "sonuç / özet değerlendirme", e: "Als Fazit kann man sagen: Es war erfolgreich.", p: "Nomen" },
  { w: "abschließend", m: "son olarak / sonuç olarak", e: "Abschließend möchte ich sagen...", p: "Adverb" },
  { w: "die Auseinandersetzung", m: "tartışma / çatışma", e: "Es gab eine heftige Auseinandersetzung.", p: "Nomen" },
  { w: "auseinandersetzen", m: "ele almak / uğraşmak", e: "Ich setze mich mit dem Thema auseinander.", p: "Verb" },
  { w: "in Bezug auf", m: "ile ilgili / hususunda", e: "In Bezug auf Ihre Frage: Ja, das stimmt.", p: "Wendung" },
  { w: "die Gegebenheit", m: "durum / koşul", e: "Wir müssen die Gegebenheiten akzeptieren.", p: "Nomen" },
  { w: "aufgreifen", m: "ele almak / devam ettirmek", e: "Ich greife diesen Punkt auf.", p: "Verb" },
  { w: "die Überzeugung", m: "inanç / kanaat", e: "Er handelt aus tiefer Überzeugung.", p: "Nomen" },
  { w: "das Leitprinzip", m: "temel ilke", e: "Das ist das Leitprinzip unserer Arbeit.", p: "Nomen" },
  { w: "der Einwand", m: "itiraz / karşı görüş", e: "Haben Sie Einwände gegen den Vorschlag?", p: "Nomen" },
  { w: "einwenden", m: "itiraz etmek", e: "Ich möchte einwenden, dass das nicht stimmt.", p: "Verb" },
  { w: "die Auswirkung", m: "etki / sonuç", e: "Das hat große Auswirkungen auf die Gesellschaft.", p: "Nomen" },
  { w: "sich ergeben", m: "ortaya çıkmak / teslim olmak", e: "Daraus ergibt sich ein Problem.", p: "Verb" },
  { w: "die Erkenntnis", m: "bulgu / sonuç / kavrayış", e: "Das ist eine wichtige Erkenntnis.", p: "Nomen" },
  { w: "nachvollziehen", m: "anlamak / takip etmek", e: "Ich kann Ihre Argumentation gut nachvollziehen.", p: "Verb" },
  { w: "nachvollziehbar", m: "anlaşılır / makul", e: "Ihre Entscheidung ist durchaus nachvollziehbar.", p: "Adjektiv" },
  { w: "das Kernproblem", m: "temel sorun", e: "Das ist das Kernproblem unserer Gesellschaft.", p: "Nomen" },
];

// ─────────────────────────────────────────────
// C1 KELİMELERİ
// ─────────────────────────────────────────────
const C1_VOCAB = [
  // Ünite 1 – Berufswelt & Kommunikation
  { w: "andernfalls", m: "aksi takdirde", e: "Bitte zahlen Sie, andernfalls müssen wir klagen.", p: "Adverb" },
  { w: "die Kompetenz", m: "yetkinlik / beceri", e: "Diese Stelle erfordert hohe Kompetenz.", p: "Nomen" },
  { w: "kompetent", m: "yetkin / ehil", e: "Er ist sehr kompetent in seinem Fach.", p: "Adjektiv" },
  { w: "das Konzept", m: "konsept / kavram", e: "Wir brauchen ein neues Konzept.", p: "Nomen" },
  { w: "konzipieren", m: "tasarlamak / konsept geliştirmek", e: "Das Projekt wurde sorgfältig konzipiert.", p: "Verb" },
  { w: "die Strategie", m: "strateji", e: "Was ist Ihre Strategie?", p: "Nomen" },
  { w: "strategisch", m: "stratejik", e: "Das ist eine strategische Entscheidung.", p: "Adjektiv" },
  { w: "implementieren", m: "uygulamak / hayata geçirmek", e: "Das neue System wurde implementiert.", p: "Verb" },
  { w: "die Effizienz", m: "verimlilik", e: "Wir müssen die Effizienz steigern.", p: "Nomen" },
  { w: "effizient", m: "verimli / etkin", e: "Diese Methode ist sehr effizient.", p: "Adjektiv" },
  { w: "die Transparenz", m: "şeffaflık", e: "Transparenz ist wichtig für das Vertrauen.", p: "Nomen" },
  { w: "transparent", m: "şeffaf", e: "Die Kommunikation muss transparent sein.", p: "Adjektiv" },
  // Ünite 2 – Indirekte Rede & Berichterstattung
  { w: "der Konjunktiv I", m: "istek kipi I (dolaylı anlatım)", e: "In der Zeitung schreibt man: Er sei krank.", p: "Grammatik" },
  { w: "dem Vernehmen nach", m: "duyumlara göre", e: "Dem Vernehmen nach soll er kündigen.", p: "Wendung" },
  { w: "vermeintlich", m: "sözde / görünürde", e: "Der vermeintliche Täter wurde freigelassen.", p: "Adjektiv" },
  { w: "mutmaßlich", m: "muhtemel / sanıldığına göre", e: "Der mutmaßliche Täter ist flüchtig.", p: "Adjektiv" },
  { w: "die Stellungnahme", m: "tutum açıklaması / görüş bildirme", e: "Bitte nehmen Sie Stellung.", p: "Nomen" },
  { w: "Stellung nehmen", m: "görüş bildirmek / tutum almak", e: "Ich nehme zu diesem Thema Stellung.", p: "Wendung" },
  { w: "implizieren", m: "ima etmek / içermek", e: "Das impliziert, dass wir scheitern könnten.", p: "Verb" },
  { w: "die Implikation", m: "ima / dolaylı anlam", e: "Was sind die Implikationen?", p: "Nomen" },
  // Ünite 3 – Nominal- und Verbalstil
  { w: "die Nominalisierung", m: "adlaştırma", e: "Das Wandern ist eine Nominalisierung des Verbs wandern.", p: "Nomen" },
  { w: "die Verbalisierung", m: "fiilleştirme", e: "Aus dem Nomen Entscheidung wird das Verb entscheiden verbalisiert.", p: "Nomen" },
  { w: "aufgrund", m: "nedeniyle / dolayısıyla", e: "Aufgrund des Regens blieben wir drinnen.", p: "Präposition" },
  { w: "mithilfe", m: "yardımıyla", e: "Mithilfe des Wörterbuchs habe ich verstanden.", p: "Präposition" },
  { w: "hinsichtlich", m: "bakımından / konusunda", e: "Hinsichtlich der Qualität gibt es Probleme.", p: "Präposition" },
  { w: "bezüglich", m: "ilgili olarak / hususunda", e: "Bezüglich Ihrer Anfrage: Es ist möglich.", p: "Präposition" },
  { w: "ohne dass", m: "-meksizin / farkında olmadan", e: "Er hat es getan, ohne dass sie es wusste.", p: "Konjunktion" },
  { w: "zu … als dass", m: "-mek için çok … / -dikten fazla …", e: "Er ist zu müde, als dass er arbeiten könnte.", p: "Konjunktion" },
  { w: "angesichts", m: "karşısında / göz önünde bulundurulduğunda", e: "Angesichts der Lage müssen wir handeln.", p: "Präposition" },
  // Ünite 4 – Nuancen der Modalität
  { w: "dürfte", m: "olsa gerek / herhalde (varsayım)", e: "Das dürfte schwierig sein.", p: "Verb" },
  { w: "müsste", m: "olmalı (Konjunktiv II)", e: "Das müsste funktionieren.", p: "Verb" },
  { w: "sollte", m: "gerekir / -meli (Konjunktiv II)", e: "Das sollte reichen.", p: "Verb" },
  { w: "das Modalpartizip", m: "modal sıfat-fiil", e: "Die zu lösende Aufgabe ist ein Beispiel fuer das Modalpartizip.", p: "Grammatik" },
  { w: "die Vermutung", m: "tahmin / varsayım", e: "Meine Vermutung war richtig.", p: "Nomen" },
  { w: "vermuten", m: "sanmak / tahmin etmek", e: "Ich vermute, dass er krank ist.", p: "Verb" },
  { w: "die Behauptung", m: "iddia", e: "Das ist nur eine Behauptung.", p: "Nomen" },
  { w: "der Sachverhalt", m: "durum / olgu", e: "Der Sachverhalt muss geklärt werden.", p: "Nomen" },
  { w: "klären", m: "açıklığa kavuşturmak / çözmek", e: "Wir müssen das klären.", p: "Verb" },
  // Ünite 5 – Passiv & Konditionale
  { w: "sofern", m: "eğer / şayet / olduğu takdirde", e: "Sofern alles klappt, fangen wir an.", p: "Konjunktion" },
  { w: "gesetzt den Fall", m: "farz edelim ki / varsayalım ki", e: "Gesetzt den Fall, er kommt nicht…", p: "Wendung" },
  { w: "unter der Bedingung", m: "şartıyla", e: "Ich helfe, unter der Bedingung, dass du zahlst.", p: "Wendung" },
  { w: "voraussetzen", m: "ön koşul olarak kabul etmek", e: "Das setzt gute Kenntnisse voraus.", p: "Verb" },
  { w: "die Voraussetzung", m: "ön koşul / gereklilik", e: "Das ist eine wichtige Voraussetzung.", p: "Nomen" },
  { w: "der Infinitivsatz", m: "mastar cümlesi", e: "Zu lernen ist schoen - das ist ein Infinitivsatz.", p: "Grammatik" },
  // Ünite 6 – Verben & Präpositionen (C1 ileri)
  { w: "indessen", m: "bu arada / oysa ki", e: "Er arbeitete; indessen schlief sie.", p: "Adverb" },
  { w: "stattdessen", m: "bunun yerine", e: "Ich trinke keinen Kaffee, stattdessen Tee.", p: "Adverb" },
  { w: "jedoch", m: "ancak / fakat", e: "Das Projekt ist gut; jedoch gibt es Probleme.", p: "Adverb" },
  { w: "gleichwohl", m: "yine de / bununla birlikte", e: "Es ist schwer, gleichwohl möglich.", p: "Adverb" },
  { w: "nichtsdestotrotz", m: "buna rağmen / yine de", e: "Nichtsdestotrotz werde ich es versuchen.", p: "Adverb" },
  { w: "die Nuance", m: "nüans / ince ayrım", e: "Es gibt kleine Nuancen im Bedeutungsunterschied.", p: "Nomen" },
  { w: "nuanciert", m: "nüanslı / ince ayrımlı", e: "Er formuliert sehr nuanciert.", p: "Adjektiv" },
  { w: "die Präzision", m: "hassasiyet / kesinlik", e: "Die Präzision seiner Argumentation ist beeindruckend.", p: "Nomen" },
  { w: "präzise", m: "kesin / tam / hassas", e: "Bitte formulieren Sie präzise.", p: "Adjektiv" },
  { w: "elaboriert", m: "geliştirilmiş / ayrıntılı", e: "Seine Sprache ist sehr elaboriert.", p: "Adjektiv" },
  { w: "der Diskurs", m: "söylem / tartışma", e: "Das ist ein wichtiger gesellschaftlicher Diskurs.", p: "Nomen" },
  { w: "situationsangemessen", m: "duruma uygun", e: "Er kommuniziert immer situationsangemessen.", p: "Adjektiv" },
  // Ünite 1 devam
  { w: "die Priorität", m: "öncelik", e: "Das hat höchste Priorität.", p: "Nomen" },
  { w: "priorisieren", m: "önceliklendirmek", e: "Wir müssen die Aufgaben priorisieren.", p: "Verb" },
  { w: "die Zielsetzung", m: "hedef belirleme", e: "Klare Zielsetzung ist wichtig.", p: "Nomen" },
  { w: "die Ressource", m: "kaynak", e: "Wir haben begrenzte Ressourcen.", p: "Nomen" },
  { w: "das Leitbild", m: "misyon / rehber ilke", e: "Das Leitbild des Unternehmens ist klar.", p: "Nomen" },
  { w: "optimieren", m: "optimize etmek", e: "Wir müssen den Prozess optimieren.", p: "Verb" },
  { w: "die Optimierung", m: "optimizasyon", e: "Die Optimierung kostet Zeit.", p: "Nomen" },
  // Ünite 2 devam
  { w: "zitieren", m: "alıntı yapmak", e: "Darf ich Sie zitieren?", p: "Verb" },
  { w: "paraphrasieren", m: "kendi sözcükleriyle ifade etmek", e: "Paraphrasieren Sie den Text.", p: "Verb" },
  { w: "referieren", m: "sunum yapmak / aktarmak", e: "Er referiert über das Thema.", p: "Verb" },
  { w: "die Quellenangabe", m: "kaynak gösterme", e: "Vergessen Sie die Quellenangabe nicht.", p: "Nomen" },
  { w: "der Sachtext", m: "düz yazı / bilgi metni", e: "Ein Sachtext informiert sachlich.", p: "Nomen" },
  // Ünite 3 devam
  { w: "das Synonym", m: "eş anlamlı kelime", e: "Kennen Sie ein Synonym fuer klug?", p: "Nomen" },
  { w: "das Antonym", m: "zıt anlamlı kelime", e: "Das Antonym von gross ist klein.", p: "Nomen" },
  { w: "der Kontext", m: "bağlam", e: "Im Kontext betrachtet macht das Sinn.", p: "Nomen" },
  { w: "die Formulierung", m: "ifade / formülasyon", e: "Diese Formulierung ist sehr präzise.", p: "Nomen" },
  { w: "das Fachvokabular", m: "teknik sözcük dağarcığı", e: "Das Fachvokabular ist komplex.", p: "Nomen" },
  // Ünite 4 devam
  { w: "die Einschätzung", m: "değerlendirme / tahmin", e: "Meine Einschätzung ist positiv.", p: "Nomen" },
  { w: "einschätzen", m: "değerlendirmek / tahmin etmek", e: "Wie schätzen Sie die Lage ein?", p: "Verb" },
  { w: "die Wahrscheinlichkeit", m: "olasılık / ihtimal", e: "Die Wahrscheinlichkeit ist hoch.", p: "Nomen" },
  { w: "mutmaßen", m: "tahmin yürütmek", e: "Man mutmaßt über die Ursache.", p: "Verb" },
  { w: "die Schlussfolgerung", m: "sonuç / çıkarım", e: "Was ist Ihre Schlussfolgerung?", p: "Nomen" },
  // Ünite 5 devam
  { w: "die Ausnahme", m: "istisna / ayrıcalık", e: "Es gibt immer Ausnahmen.", p: "Nomen" },
  { w: "ausnahmsweise", m: "istisnai olarak", e: "Ausnahmsweise darf er bleiben.", p: "Adverb" },
  { w: "unter Umständen", m: "olasılıkla / koşullara göre", e: "Unter Umständen ist das möglich.", p: "Wendung" },
  { w: "im Zweifelsfall", m: "şüphe durumunda", e: "Im Zweifelsfall fragen Sie nach.", p: "Wendung" },
  { w: "vorrangig", m: "öncelikli", e: "Das ist vorrangig zu behandeln.", p: "Adjektiv" },
  // Ünite 6 devam
  { w: "im Wesentlichen", m: "özünde / esasen", e: "Im Wesentlichen stimme ich zu.", p: "Wendung" },
  { w: "darüber hinaus", m: "bunun ötesinde / ayrıca", e: "Darüber hinaus gibt es weitere Probleme.", p: "Wendung" },
  { w: "im Zusammenhang mit", m: "bağlamında / ile ilgili olarak", e: "Im Zusammenhang mit dem Projekt...", p: "Wendung" },
  { w: "auf den ersten Blick", m: "ilk bakışta", e: "Auf den ersten Blick sieht es einfach aus.", p: "Wendung" },
  { w: "widersprüchlich", m: "çelişkili", e: "Seine Aussagen sind widersprüchlich.", p: "Adjektiv" },
  { w: "die Abweichung", m: "sapma / ayrılma", e: "Es gibt kaum Abweichungen.", p: "Nomen" },
  { w: "aufzeigen", m: "göstermek / ortaya koymak", e: "Die Studie zeigt Probleme auf.", p: "Verb" },
  { w: "die Komplexität", m: "karmaşıklık", e: "Die Komplexität des Themas ist hoch.", p: "Nomen" },
  { w: "komplex", m: "karmaşık", e: "Das ist ein komplexes Problem.", p: "Adjektiv" },
  { w: "der Zusammenhang", m: "bağlantı / ilişki", e: "Es gibt einen Zusammenhang zwischen beiden.", p: "Nomen" },
  { w: "ausdrücken", m: "ifade etmek", e: "Wie kann ich das besser ausdrücken?", p: "Verb" },
  { w: "der Ausdruck", m: "ifade / deyim", e: "Das ist ein treffender Ausdruck.", p: "Nomen" },
  { w: "die Kohärenz", m: "tutarlılık / bütünlük", e: "Die Kohärenz des Textes ist sehr gut.", p: "Nomen" },
  { w: "kohärent", m: "tutarlı / bütünlüklü", e: "Bitte schreiben Sie kohärent.", p: "Adjektiv" },
  { w: "die Stringenz", m: "tutarlılık / sıkılık", e: "Die Stringenz der Argumentation überzeugt.", p: "Nomen" },
  { w: "stringent", m: "katı / tutarlı / sıkı", e: "Das ist eine stringente Logik.", p: "Adjektiv" },
  { w: "der Terminus", m: "terim / teknik ifade", e: "Das ist ein Fachterminus aus der Linguistik.", p: "Nomen" },
  { w: "die Konnotation", m: "yan anlam / çağrışım", e: "Das Wort hat eine negative Konnotation.", p: "Nomen" },
  { w: "die Denotation", m: "düz anlam / temel anlam", e: "Die Denotation beschreibt die Grundbedeutung.", p: "Nomen" },
  { w: "die Stilistik", m: "üslup bilimi / stilistik", e: "Stilistik untersucht den sprachlichen Ausdruck.", p: "Nomen" },
  { w: "stilistisch", m: "üsluba ait / stilistik", e: "Das ist ein stilistisches Mittel.", p: "Adjektiv" },
  { w: "vielschichtig", m: "çok katmanlı / karmaşık", e: "Das Thema ist sehr vielschichtig.", p: "Adjektiv" },
];

// ─────────────────────────────────────────────
// ANA FONKSİYON
// ─────────────────────────────────────────────
async function main() {
  console.log("🚀 Kapsamlı seed başlıyor...\n");

  // 1. Mevcut veriyi temizle
  await prisma.userVocabulary.deleteMany();
  await prisma.userExamAttempt.deleteMany();
  await prisma.userWorkSession.deleteMany();
  await prisma.userProgress.deleteMany();
  await prisma.vocabulary.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.unit.deleteMany();
  await prisma.mockExam.deleteMany();
  await prisma.user.deleteMany();
  await prisma.level.deleteMany();
  console.log("✅ Mevcut veri temizlendi.");

  // 2. Seviyeler
  const [a1, a2, b1, b2, c1] = await Promise.all([
    prisma.level.create({ data: { name: "A1", displayName: "Başlangıç", description: "Temel selamlaşma, sayılar ve günlük hayat ifadeleri. Almancaya ilk adım.", goalXP: 500, goalVocab: 300, order: 1 } }),
    prisma.level.create({ data: { name: "A2", displayName: "Temel", description: "Günlük konuşmalar, ulaşım, alışveriş, iş ve aile hakkında temel iletişim.", goalXP: 1000, goalVocab: 700, order: 2 } }),
    prisma.level.create({ data: { name: "B1", displayName: "Orta", description: "Seyahat, iş ve güncel konularda bağımsız iletişim, Konjunktiv II, Passiv.", goalXP: 2000, goalVocab: 1500, order: 3 } }),
    prisma.level.create({ data: { name: "B2", displayName: "İleri Orta", description: "Karmaşık metinleri anlama, dolaylı anlatım ve akademik dile giriş.", goalXP: 3500, goalVocab: 2500, order: 4 } }),
    prisma.level.create({ data: { name: "C1", displayName: "İleri", description: "Akademik ve profesyonel ortamlarda akıcı, nüanslı iletişim.", goalXP: 5000, goalVocab: 4000, order: 5 } }),
  ]);
  console.log("✅ 5 seviye oluşturuldu.");

  // 3. A1 Üniteleri (lehrplan'a göre)
  const a1Units = await Promise.all([
    prisma.unit.create({ data: { levelId: a1.id, name: "Ünite 1: Hallo! Wie geht's?", description: "Tanışma, selamlaşma ve temel iletişim. Alfabe ve sayılar.", order: 1, isLocked: false } }),
    prisma.unit.create({ data: { levelId: a1.id, name: "Ünite 2: Freunde, Familie und ich", description: "Aile üyeleri, meslekler ve kişisel bilgiler.", order: 2, isLocked: false } }),
    prisma.unit.create({ data: { levelId: a1.id, name: "Ünite 3: Essen und Trinken", description: "Gıdalar, alışveriş ve restoranda sipariş verme.", order: 3, isLocked: false } }),
    prisma.unit.create({ data: { levelId: a1.id, name: "Ünite 4: Mein Tag", description: "Saatler, günlük rutin ve zaman bildiren ifadeler.", order: 4, isLocked: true } }),
    prisma.unit.create({ data: { levelId: a1.id, name: "Ünite 5: Unterwegs", description: "Ulaşım araçları, yön tarifi ve şehir hayatı.", order: 5, isLocked: true } }),
    prisma.unit.create({ data: { levelId: a1.id, name: "Ünite 6: Zuhause", description: "Ev, oda isimleri, mobilyalar ve kiralık daire.", order: 6, isLocked: true } }),
  ]);

  // A1 Dersleri
  await prisma.lesson.createMany({ data: [
    { unitId: a1Units[0].id, name: "Bölüm 1: Selamlaşma ve Veda", order: 1, contentType: "read", content: "{}" },
    { unitId: a1Units[0].id, name: "Bölüm 2: Kendini Tanıtma", order: 2, contentType: "listen", content: "{}" },
    { unitId: a1Units[0].id, name: "Bölüm 3: Soru Kelimeleri", order: 3, contentType: "quiz", content: "{}" },
    { unitId: a1Units[1].id, name: "Bölüm 1: Aile Üyeleri", order: 1, contentType: "read", content: "{}" },
    { unitId: a1Units[1].id, name: "Bölüm 2: Meslekler", order: 2, contentType: "quiz", content: "{}" },
    { unitId: a1Units[2].id, name: "Bölüm 1: Gıda ve İçecekler", order: 1, contentType: "read", content: "{}" },
    { unitId: a1Units[2].id, name: "Bölüm 2: Restoranda", order: 2, contentType: "listen", content: "{}" },
    { unitId: a1Units[2].id, name: "Bölüm 3: Alışveriş Diyaloğu", order: 3, contentType: "quiz", content: "{}" },
    { unitId: a1Units[3].id, name: "Bölüm 1: Saatler", order: 1, contentType: "read", content: "{}" },
    { unitId: a1Units[3].id, name: "Bölüm 2: Günlük Rutin", order: 2, contentType: "quiz", content: "{}" },
    { unitId: a1Units[4].id, name: "Bölüm 1: Ulaşım Araçları", order: 1, contentType: "read", content: "{}" },
    { unitId: a1Units[4].id, name: "Bölüm 2: Yön Tarifi", order: 2, contentType: "listen", content: "{}" },
    { unitId: a1Units[5].id, name: "Bölüm 1: Ev ve Odalar", order: 1, contentType: "read", content: "{}" },
    { unitId: a1Units[5].id, name: "Bölüm 2: Mobilyalar", order: 2, contentType: "quiz", content: "{}" },
  ]});

  // 4. A2 Üniteleri (lehrplan'a göre)
  const a2Units = await Promise.all([
    prisma.unit.create({ data: { levelId: a2.id, name: "Ünite 1: In der Stadt unterwegs", description: "Ulaşım, yer-yön tarifi ve seyahat bilgileri. Präteritum giriş.", order: 1, isLocked: false } }),
    prisma.unit.create({ data: { levelId: a2.id, name: "Ünite 2: Rund um die Arbeit", description: "İş başvurusu, ofis hayatı ve mesleki iletişim. Modalverben.", order: 2, isLocked: false } }),
    prisma.unit.create({ data: { levelId: a2.id, name: "Ünite 3: Fit und gesund", description: "Vücut, hastalıklar ve sağlıklı yaşam. Imperativ.", order: 3, isLocked: false } }),
    prisma.unit.create({ data: { levelId: a2.id, name: "Ünite 4: Die liebe Familie", description: "Aile, özel günler ve geçmiş anılar. Perfekt.", order: 4, isLocked: true } }),
    prisma.unit.create({ data: { levelId: a2.id, name: "Ünite 5: Alles für die Reise", description: "Tatil planlama, otel rezervasyonu. Dativ Präpositionen.", order: 5, isLocked: true } }),
    prisma.unit.create({ data: { levelId: a2.id, name: "Ünite 6: Medien im Alltag", description: "Teknoloji, internet ve günlük iletişim. Nebensätze mit 'dass'.", order: 6, isLocked: true } }),
  ]);

  // A2 Dersleri
  await prisma.lesson.createMany({ data: [
    { unitId: a2Units[0].id, name: "Bölüm 1: Toplu Taşıma", order: 1, contentType: "read", content: "{}" },
    { unitId: a2Units[0].id, name: "Bölüm 2: Tren Diyaloğu", order: 2, contentType: "listen", content: "{}" },
    { unitId: a2Units[0].id, name: "Bölüm 3: Yön Tarifi", order: 3, contentType: "quiz", content: "{}" },
    { unitId: a2Units[1].id, name: "Bölüm 1: İş İlanları", order: 1, contentType: "read", content: "{}" },
    { unitId: a2Units[1].id, name: "Bölüm 2: Mülakat Diyaloğu", order: 2, contentType: "listen", content: "{}" },
    { unitId: a2Units[1].id, name: "Bölüm 3: Modalverben Alıştırması", order: 3, contentType: "quiz", content: "{}" },
    { unitId: a2Units[2].id, name: "Bölüm 1: Vücut ve Hastalıklar", order: 1, contentType: "read", content: "{}" },
    { unitId: a2Units[2].id, name: "Bölüm 2: Doktorda", order: 2, contentType: "listen", content: "{}" },
    { unitId: a2Units[3].id, name: "Bölüm 1: Aile ve Etkinlikler", order: 1, contentType: "read", content: "{}" },
    { unitId: a2Units[3].id, name: "Bölüm 2: Perfekt Zamanı", order: 2, contentType: "quiz", content: "{}" },
    { unitId: a2Units[4].id, name: "Bölüm 1: Tatil Planı", order: 1, contentType: "read", content: "{}" },
    { unitId: a2Units[4].id, name: "Bölüm 2: Otel Rezervasyonu", order: 2, contentType: "listen", content: "{}" },
    { unitId: a2Units[5].id, name: "Bölüm 1: Sosyal Medya", order: 1, contentType: "read", content: "{}" },
    { unitId: a2Units[5].id, name: "Bölüm 2: Medya Tartışması", order: 2, contentType: "quiz", content: "{}" },
  ]});

  // B1/B2/C1 için placeholder üniteler
  for (const [level, titles] of [
    [b1, ["Beruf & Alltag", "Gesellschaft & Umwelt", "Wünsche & Träume", "Beziehungen", "Komplexe Verbindungen", "Adjektive & Strukturen"]],
    [b2, ["Zeit & Ereignisse", "Zukunft & Hypothesen", "Passiv & Formelle Sprache", "Indirekte Rede", "Logik & Argumentation", "Verben & Ergänzungen"]],
    [c1, ["Berufswelt & Kommunikation", "Indirekte Rede & Berichterstattung", "Nominal- und Verbalstil", "Nuancen der Modalität", "Passiv & Konditionale", "Verben & Präpositionen"]],
  ] as [typeof b1, string[]][]) {
    for (let i = 0; i < titles.length; i++) {
      const unit = await prisma.unit.create({
        data: { levelId: level.id, name: `Ünite ${i + 1}: ${titles[i]}`, description: "Yakında içerik eklenecek.", order: i + 1, isLocked: i > 0 },
      });
      await prisma.lesson.create({
        data: { unitId: unit.id, name: "Bölüm 1: Giriş", order: 1, contentType: "read", content: "{}" },
      });
    }
  }
  console.log("✅ Tüm seviyeler için ünite ve dersler oluşturuldu.");

  // 5. Kelimeler
  let a1Count = 0, a2Count = 0, b1Count = 0, b2Count = 0, c1Count = 0;
  const seenWords = new Set<string>();
  for (const v of A1_VOCAB) {
    if (seenWords.has(v.w)) continue;
    seenWords.add(v.w);
    await prisma.vocabulary.create({ data: { word: v.w, meaning: v.m, exampleSentence: v.e, partOfSpeech: (v as any).pos ?? v.p, levelId: a1.id } });
    a1Count++;
  }
  for (const v of A2_VOCAB) {
    if (seenWords.has(v.w)) continue;
    seenWords.add(v.w);
    await prisma.vocabulary.create({ data: { word: v.w, meaning: v.m, exampleSentence: v.e, partOfSpeech: v.p, levelId: a2.id } });
    a2Count++;
  }
  for (const v of B1_VOCAB) {
    if (seenWords.has(v.w)) continue;
    seenWords.add(v.w);
    await prisma.vocabulary.create({ data: { word: v.w, meaning: v.m, exampleSentence: v.e, partOfSpeech: v.p, levelId: b1.id } });
    b1Count++;
  }
  for (const v of B2_VOCAB) {
    if (seenWords.has(v.w)) continue;
    seenWords.add(v.w);
    await prisma.vocabulary.create({ data: { word: v.w, meaning: v.m, exampleSentence: v.e, partOfSpeech: v.p, levelId: b2.id } });
    b2Count++;
  }
  for (const v of C1_VOCAB) {
    if (seenWords.has(v.w)) continue;
    seenWords.add(v.w);
    await prisma.vocabulary.create({ data: { word: v.w, meaning: v.m, exampleSentence: v.e, partOfSpeech: v.p, levelId: c1.id } });
    c1Count++;
  }
  console.log(`✅ A1: ${a1Count}, A2: ${a2Count}, B1: ${b1Count}, B2: ${b2Count}, C1: ${c1Count} kelime yüklendi.`);

  // 6. Mock Sınavlar
  await prisma.mockExam.create({ data: { id: "exam-a1-full", name: "A1 Full Mock Sınav", levelId: a1.id, duration: 60, content: "{}" } });
  await prisma.mockExam.create({ data: { id: "exam-a2-full", name: "A2 Full Mock Sınav", levelId: a2.id, duration: 75, content: "{}" } });
  console.log("✅ Mock sınavlar oluşturuldu.");

  // 7. Test Kullanıcısı
  const hashedPw = await bcrypt.hash("test1234", 10);
  const user = await prisma.user.create({
    data: { email: "test@deutschmeister.com", name: "Ahmet Yılmaz", password: hashedPw, currentLevel: "A2", streak: 7, totalXP: 4250 },
  });

  await prisma.userProgress.createMany({ data: [
    { userId: user.id, skill: "horen", score: 68 },
    { userId: user.id, skill: "lesen", score: 75 },
    { userId: user.id, skill: "schreiben", score: 55 },
    { userId: user.id, skill: "sprechen", score: 48 },
    { userId: user.id, skill: "grammatik", score: 72 },
  ]});

  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(today); d.setDate(d.getDate() - (6 - i)); d.setHours(12, 0, 0, 0);
    await prisma.userWorkSession.create({ data: { userId: user.id, date: d, minutesWorked: [45, 60, 30, 90, 75, 60, 45][i] } });
  }

  await prisma.userExamAttempt.create({ data: { userId: user.id, examId: "exam-a1-full", score: 71, passed: true, feedback: "{}", attemptDate: new Date(Date.now() - 5 * 86400000) } });
  await prisma.userExamAttempt.create({ data: { userId: user.id, examId: "exam-a2-full", score: 58, passed: false, feedback: "{}", attemptDate: new Date(Date.now() - 2 * 86400000) } });

  // İlk 12 kelimeyi öğrenilmiş say (SM-2)
  const vocabs = await prisma.vocabulary.findMany({ where: { level: { name: "A1" } }, take: 12 });
  for (const v of vocabs) {
    await prisma.userVocabulary.create({ data: { userId: user.id, vocabularyId: v.id, confidenceLevel: 2.5, interval: 3, repetitions: 2, nextReviewDate: new Date(Date.now() + 3 * 86400000) } });
  }

  // 5 kelime bugün tekrar gerekli
  const dueVocabs = await prisma.vocabulary.findMany({ where: { level: { name: "A1" } }, skip: 12, take: 5 });
  for (const v of dueVocabs) {
    await prisma.userVocabulary.create({ data: { userId: user.id, vocabularyId: v.id, confidenceLevel: 1.8, interval: 1, repetitions: 1, nextReviewDate: new Date(Date.now() - 86400000) } });
  }

  console.log(`\n✅ Test kullanıcısı oluşturuldu.`);
  console.log(`📧 E-posta: test@deutschmeister.com`);
  console.log(`🔑 Şifre:   test1234`);
  console.log(`\n🎉 Seed tamamlandı! Toplam: ${a1Count + a2Count + b1Count + b2Count + c1Count} kelime`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
