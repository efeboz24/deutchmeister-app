export type HorenTeilType = "ansagen" | "gespraeche" | "informationen";

export interface HorenQuestion {
  id: number;
  shortAudio?: string;
  question: string;
  options?: string[];
  correct: number;
  explanation: string;
}

export interface HorenTeil {
  id: number;
  type: HorenTeilType;
  typeLabel: string;
  typeLabelTr: string;
  title: string;
  difficulty: 1 | 2 | 3;
  audioText?: string;
  maleSpeakers?: string[];
  questionFormat?: "mcq" | "richtigfalsch";
  instruction: string;
  questions: HorenQuestion[];
  xp: number;
}

export interface HorenProgress {
  [teilId: number]: { score: number; total: number };
}

// ── A2 — Teile 1–13: Ansagen ──────────────────────────────────────────────────

const A2_TEILE: HorenTeil[] = [
  {
    id: 1,
    type: "ansagen",
    typeLabel: "Ansagen & Durchsagen",
    typeLabelTr: "Duyurular ve Anonslar",
    title: "Alltägliche Ansagen",
    difficulty: 1,
    instruction: "Sie hören fünf kurze Ansagen. Hören Sie genau zu und wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        shortAudio: "Sehr geehrte Kundinnen und Kunden, heute haben wir besondere Angebote in der Obstabteilung. Äpfel, zwei Kilo für nur einen Euro neunzig. Das Angebot gilt nur heute!",
        question: "Was ist heute im Supermarkt im Angebot?",
        options: ["Gemüse", "Obst", "Milchprodukte"],
        correct: 1,
        explanation: "'Obstabteilung' = meyve bölümü. Elma 2 kg 1,90 € özel fiyata sunuluyor.",
      },
      {
        id: 2,
        shortAudio: "Achtung auf Gleis drei! Der Intercity nach München hat heute leider etwa zwanzig Minuten Verspätung. Wir bitten um Ihr Verständnis.",
        question: "Was ist das Problem am Bahnhof?",
        options: ["Der Zug fährt von einem anderen Gleis ab.", "Der Zug kommt zwanzig Minuten später.", "Der Zug nach München fährt heute nicht."],
        correct: 1,
        explanation: "'Verspätung' = gecikme. Münih treni 20 dakika geç geliyor.",
      },
      {
        id: 3,
        shortAudio: "Sie haben die Praxis Dr. Müller angerufen. Unsere Sprechzeiten sind montags bis freitags von acht bis zwölf Uhr und dienstags und donnerstags auch von fünfzehn bis achtzehn Uhr.",
        question: "Wann hat die Arztpraxis auch nachmittags geöffnet?",
        options: ["Montags und mittwochs", "Dienstags und donnerstags", "Freitags und samstags"],
        correct: 1,
        explanation: "'dienstags und donnerstags auch von fünfzehn bis achtzehn Uhr' — Salı ve Perşembe öğleden sonra da açık.",
      },
      {
        id: 4,
        shortAudio: "Herzlich willkommen zum Stadtfest Heidelberg! Das Programm beginnt um sechzehn Uhr mit Livemusik. Um neunzehn Uhr gibt es eine große Tanzshow. Und um einundzwanzig Uhr startet das Feuerwerk.",
        question: "Wann beginnt die Tanzshow?",
        options: ["Um 16 Uhr", "Um 19 Uhr", "Um 21 Uhr"],
        correct: 1,
        explanation: "'um neunzehn Uhr gibt es eine große Tanzshow' — dans gösterisi saat 19:00'da.",
      },
      {
        id: 5,
        shortAudio: "Achtung, liebe Fahrgäste! Wegen einer Baustelle fährt die Linie Siebenundzwanzig heute nicht durch die Schillerstraße. Bitte steigen Sie an der Haltestelle Hauptbahnhof in die Umleitung ein.",
        question: "Warum gibt es eine Änderung bei der Buslinie?",
        options: ["Wegen eines Unfalls", "Wegen einer Baustelle", "Wegen schlechten Wetters"],
        correct: 1,
        explanation: "'wegen einer Baustelle' = bir inşaat nedeniyle güzergah değişti.",
      },
    ],
    xp: 40,
  },
  {
    id: 2,
    type: "ansagen",
    typeLabel: "Ansagen & Durchsagen",
    typeLabelTr: "Duyurular ve Anonslar",
    title: "Am Bahnhof",
    difficulty: 1,
    instruction: "Sie hören fünf kurze Durchsagen am Bahnhof. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        shortAudio: "Achtung auf Gleis sieben! Der ICE zweihundert sieben nach Hamburg Hauptbahnhof fährt heute ausnahmsweise von Gleis sieben ab. Bitte beachten Sie die Gleisänderung.",
        question: "Von welchem Gleis fährt der ICE nach Hamburg?",
        options: ["Gleis 2", "Gleis 5", "Gleis 7"],
        correct: 2,
        explanation: "'fährt heute ausnahmsweise von Gleis sieben ab' — tren bugün 7. perondan kalkıyor.",
      },
      {
        id: 2,
        shortAudio: "Die S-Bahn Linie vier nach Flughafen Terminal Eins fährt in drei Minuten ab. Bitte einsteigen und Türen freihalten!",
        question: "Wohin fährt die S-Bahn Linie 4?",
        options: ["Zum Hauptbahnhof", "Zum Flughafen", "Zum Stadtpark"],
        correct: 1,
        explanation: "'nach Flughafen Terminal Eins' — havalimanı terminaline gidiyor.",
      },
      {
        id: 3,
        shortAudio: "Aus betrieblichen Gründen fällt der RegionalExpress nach Köln heute leider aus. Der nächste Zug fährt um sechzehn Uhr dreißig.",
        question: "Was passiert mit dem RegionalExpress nach Köln?",
        options: ["Er hat Verspätung.", "Er fährt heute nicht.", "Er fährt von einem anderen Gleis."],
        correct: 1,
        explanation: "'fällt aus' = iptal edildi. Sonraki tren 16:30'da.",
      },
      {
        id: 4,
        shortAudio: "Willkommen am Münchner Hauptbahnhof! Für Fragen steht Ihnen unser Service-Team am Informationsschalter in der Haupthalle zur Verfügung.",
        question: "Wo kann man am Hauptbahnhof Fragen stellen?",
        options: ["Am Fahrkartenautomat", "Am Informationsschalter", "Am Ausgang"],
        correct: 1,
        explanation: "'Service-Team am Informationsschalter' — bilgi gişesinde personel soruları yanıtlıyor.",
      },
      {
        id: 5,
        shortAudio: "Achtung auf Gleis neun! Bitte beachten Sie, dass das Einsteigen in den Intercity nach Frankfurt erst fünf Minuten vor Abfahrt möglich ist.",
        question: "Wann darf man in den Zug nach Frankfurt einsteigen?",
        options: ["Sofort", "5 Minuten vor Abfahrt", "10 Minuten vor Abfahrt"],
        correct: 1,
        explanation: "'erst fünf Minuten vor Abfahrt' — trene kalkıştan 5 dakika önce binebilirsiniz.",
      },
    ],
    xp: 40,
  },
  {
    id: 3,
    type: "ansagen",
    typeLabel: "Ansagen & Durchsagen",
    typeLabelTr: "Duyurular ve Anonslar",
    title: "Schule und Kindergarten",
    difficulty: 1,
    instruction: "Sie hören fünf Ansagen aus Schule und Kindergarten. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        shortAudio: "Liebe Eltern, die Schule bleibt morgen wegen eines Lehrerstreiks geschlossen. Bitte organisieren Sie eine Betreuung für Ihre Kinder.",
        question: "Warum bleibt die Schule morgen geschlossen?",
        options: ["Wegen eines Feiertags", "Wegen eines Streiks", "Wegen Reparaturarbeiten"],
        correct: 1,
        explanation: "'Lehrerstreik' = öğretmen grevi nedeniyle okul yarın kapalı.",
      },
      {
        id: 2,
        shortAudio: "Aufmerksamkeit bitte! Die Elternversammlung für die Klassen drei und vier findet am Donnerstag um achtzehn Uhr in der Turnhalle statt.",
        question: "Wo findet die Elternversammlung statt?",
        options: ["Im Klassenraum", "In der Turnhalle", "In der Aula"],
        correct: 1,
        explanation: "'in der Turnhalle' — veli toplantısı spor salonunda.",
      },
      {
        id: 3,
        shortAudio: "Liebe Schülerinnen und Schüler, das Schulfest findet am letzten Freitag im Monat auf dem Schulhof statt. Bitte bringt Essen und Getränke zum Teilen mit.",
        question: "Was sollen die Schüler zum Schulfest mitbringen?",
        options: ["Spiele und Bücher", "Essen und Getränke", "Stühle und Tische"],
        correct: 1,
        explanation: "'bringt Essen und Getränke zum Teilen mit' — okul şenliği için yiyecek ve içecek getirin.",
      },
      {
        id: 4,
        shortAudio: "Der Schulbus für die Grundschule Birkenweg hat morgen fünfzehn Minuten Verspätung. Die Kinder werden um sieben Uhr fünfundvierzig abgeholt.",
        question: "Wann kommt der Schulbus morgen?",
        options: ["Um 7:30 Uhr", "Um 7:45 Uhr", "Um 8:00 Uhr"],
        correct: 1,
        explanation: "'um sieben Uhr fünfundvierzig' — otobüs yarın 7:45'te gelecek (15 dk geç).",
      },
      {
        id: 5,
        shortAudio: "Liebe Eltern des Kindergartens Sonnenschein! Aufgrund von Renovierungsarbeiten ist die Kita in der nächsten Woche nur von acht bis dreizehn Uhr geöffnet.",
        question: "Wie lange ist der Kindergarten nächste Woche geöffnet?",
        options: ["Normal bis 17 Uhr", "Nur bis 13 Uhr", "Gar nicht geöffnet"],
        correct: 1,
        explanation: "'nur von acht bis dreizehn Uhr' — tadilat nedeniyle kreş sadece 08:00-13:00 arası açık.",
      },
    ],
    xp: 40,
  },
  {
    id: 4,
    type: "ansagen",
    typeLabel: "Ansagen & Durchsagen",
    typeLabelTr: "Duyurular ve Anonslar",
    title: "Im Einkaufszentrum",
    difficulty: 2,
    instruction: "Sie hören fünf Ansagen aus einem Einkaufszentrum. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        shortAudio: "Liebe Kundinnen und Kunden des Einkaufszentrums CityPark! Heute findet von vierzehn bis achtzehn Uhr ein großer Ausverkauf im zweiten Obergeschoss statt. Bis zu fünfzig Prozent Rabatt auf alle Sommermode!",
        question: "Wo findet der Ausverkauf statt?",
        options: ["Im Erdgeschoss", "Im zweiten Obergeschoss", "Im Untergeschoss"],
        correct: 1,
        explanation: "'im zweiten Obergeschoss' — indirim 2. katta, bugün 14:00-18:00 arası.",
      },
      {
        id: 2,
        shortAudio: "Achtung! Wir suchen die Eltern des kleinen Jonas. Ihr Kind wartet an der Kundeninfo im Erdgeschoss auf Sie. Bitte kommen Sie sofort dorthin.",
        question: "Wo wartet das Kind Jonas?",
        options: ["Am Ausgang", "An der Kundeninfo", "Beim Sicherheitsdienst"],
        correct: 1,
        explanation: "'an der Kundeninfo im Erdgeschoss' — çocuk zemin kattaki müşteri hizmetlerinde bekliyor.",
      },
      {
        id: 3,
        shortAudio: "Das Einkaufszentrum CityPark schließt heute ausnahmsweise bereits um zwanzig Uhr. Wir bitten alle Kunden, ihre Einkäufe bis dahin abzuschließen.",
        question: "Wann schließt das Einkaufszentrum heute?",
        options: ["Um 21 Uhr", "Um 20 Uhr", "Um 19 Uhr"],
        correct: 1,
        explanation: "'schließt heute ausnahmsweise bereits um zwanzig Uhr' — AVM bugün istisnai olarak 20:00'da kapanıyor.",
      },
      {
        id: 4,
        shortAudio: "Liebe Kunden, unser Parkhaus ist derzeit voll besetzt. Bitte nutzen Sie alternativ den öffentlichen Parkplatz gegenüber dem Einkaufszentrum.",
        question: "Warum sollen Kunden den anderen Parkplatz nutzen?",
        options: ["Das Parkhaus ist zu teuer.", "Das Parkhaus ist voll.", "Das Parkhaus ist geschlossen."],
        correct: 1,
        explanation: "'voll besetzt' = dolu. Otopark dolu olduğu için karşıdaki park alanı öneriliyor.",
      },
      {
        id: 5,
        shortAudio: "Heute Abend findet im Atrium des CityPark ein kostenloses Konzert statt. Ab achtzehn Uhr spielt die Band Sommernacht für Sie. Der Eintritt ist frei!",
        question: "Was ist der Eintritt für das Konzert?",
        options: ["5 Euro", "10 Euro", "Kostenlos"],
        correct: 2,
        explanation: "'Der Eintritt ist frei' = ücretsiz. Konser 18:00'de başlıyor.",
      },
    ],
    xp: 45,
  },
  {
    id: 5,
    type: "ansagen",
    typeLabel: "Ansagen & Durchsagen",
    typeLabelTr: "Duyurular ve Anonslar",
    title: "Im Krankenhaus",
    difficulty: 2,
    instruction: "Sie hören fünf Durchsagen aus einem Krankenhaus. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        shortAudio: "Guten Morgen! Wir bitten alle Patienten, ihr Mobiltelefon im Wartezimmer auf lautlos zu stellen. Vielen Dank für Ihr Verständnis.",
        question: "Was sollen die Patienten tun?",
        options: ["Ihre Handys ausschalten", "Ihre Handys auf lautlos stellen", "Ihre Handys draußen lassen"],
        correct: 1,
        explanation: "'auf lautlos stellen' = sessiz moda almak. Bekleme odasında telefon sessize alınmalı.",
      },
      {
        id: 2,
        shortAudio: "Achtung! Die Notaufnahme ist wegen Überfüllung derzeit geschlossen. Bitte fahren Sie in die Klinik am Stadtpark, die in zehn Minuten erreichbar ist.",
        question: "Warum ist die Notaufnahme geschlossen?",
        options: ["Wegen Renovierung", "Wegen Überfüllung", "Wegen Personalmangels"],
        correct: 1,
        explanation: "'wegen Überfüllung' = doluluk nedeniyle acil servis kapalı. Alternatif klinik 10 dakika uzakta.",
      },
      {
        id: 3,
        shortAudio: "Liebe Besucher, die Besuchszeiten auf Station drei sind täglich von vierzehn bis achtzehn Uhr. Bitte beachten Sie, dass Kinder unter zwölf Jahren keinen Zutritt haben.",
        question: "Welche Besucher haben keinen Zutritt auf Station 3?",
        options: ["Ältere Menschen", "Kinder unter 12 Jahren", "Männer"],
        correct: 1,
        explanation: "'Kinder unter zwölf Jahren keinen Zutritt' — 12 yaşından küçük çocuklar koğuşa giremez.",
      },
      {
        id: 4,
        shortAudio: "Herr Dr. Weber wird gebeten, sofort auf die Station vier zu kommen. Herr Dr. Weber, bitte Station vier.",
        question: "Wer wird gerufen?",
        options: ["Eine Krankenschwester", "Herr Dr. Weber", "Ein Patient"],
        correct: 1,
        explanation: "Dr. Weber 4. koğuşa çağrılıyor — bu tür anonslar acil durumlarda yapılır.",
      },
      {
        id: 5,
        shortAudio: "Liebe Patienten der Röntgenabteilung! Aufgrund technischer Probleme kommt es heute zu Verzögerungen von circa einer Stunde. Wir bitten um Ihr Verständnis.",
        question: "Warum gibt es Verzögerungen in der Röntgenabteilung?",
        options: ["Wegen Personalmangels", "Wegen technischer Probleme", "Wegen zu vieler Patienten"],
        correct: 1,
        explanation: "'Aufgrund technischer Probleme' = teknik sorunlar nedeniyle yaklaşık 1 saatlik gecikme.",
      },
    ],
    xp: 45,
  },
  {
    id: 6,
    type: "ansagen",
    typeLabel: "Ansagen & Durchsagen",
    typeLabelTr: "Duyurular ve Anonslar",
    title: "Sport und Freizeit",
    difficulty: 1,
    instruction: "Sie hören fünf Ansagen aus Sport- und Freizeiteinrichtungen. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        shortAudio: "Liebe Mitglieder des Sportvereins! Das Training am Dienstagabend fällt diese Woche aus. Der nächste Termin ist am kommenden Donnerstag um neunzehn Uhr.",
        question: "Wann ist das nächste Training?",
        options: ["Am Dienstag", "Am Donnerstag", "Am Freitag"],
        correct: 1,
        explanation: "'am kommenden Donnerstag um neunzehn Uhr' — bu haftaki salı antrenmanı iptal, sonraki Perşembe 19:00.",
      },
      {
        id: 2,
        shortAudio: "Das Freibad Sonnenbad öffnet diese Woche ausnahmsweise bereits um sieben Uhr. Die Öffnungszeiten sind von sieben bis zwanzig Uhr dreißig.",
        question: "Wann öffnet das Freibad diese Woche?",
        options: ["Um 8 Uhr", "Um 7 Uhr", "Um 9 Uhr"],
        correct: 1,
        explanation: "'öffnet diese Woche ausnahmsweise bereits um sieben Uhr' — bu hafta istisnai olarak 7:00'de açılıyor.",
      },
      {
        id: 3,
        shortAudio: "Achtung alle Tennisspieler! Die Plätze eins bis vier sind wegen Renovierungsarbeiten bis Freitag gesperrt. Bitte nutzen Sie die Plätze fünf bis acht.",
        question: "Welche Tennisplätze sind gesperrt?",
        options: ["Plätze 1–4", "Plätze 5–8", "Alle Plätze"],
        correct: 0,
        explanation: "'Plätze eins bis vier sind gesperrt' — tadilat nedeniyle 1-4. kortlar kapalı.",
      },
      {
        id: 4,
        shortAudio: "Die Fitnesskurse am Samstag beginnen diese Woche dreißig Minuten später. Yoga startet um zehn Uhr dreißig, Zumba um zwölf Uhr.",
        question: "Wann beginnt der Yogakurs am Samstag diese Woche?",
        options: ["Um 10:00 Uhr", "Um 10:30 Uhr", "Um 11:00 Uhr"],
        correct: 1,
        explanation: "'Yoga startet um zehn Uhr dreißig' — bu hafta yoga 10:30'da başlıyor (30 dk geç).",
      },
      {
        id: 5,
        shortAudio: "Der Schwimmkurs für Erwachsene am Montagabend ist leider ausgebucht. Für Anmeldungen zum nächsten Kurs im September können Sie sich ab sofort in der Rezeption eintragen.",
        question: "Was kann man ab sofort in der Rezeption tun?",
        options: ["Den aktuellen Kurs buchen", "Sich für den September-Kurs anmelden", "Eine Mitgliedschaft kaufen"],
        correct: 1,
        explanation: "'für den nächsten Kurs im September ab sofort eintragen' — Eylül kursu için şimdi kayıt yaptırabilirsiniz.",
      },
    ],
    xp: 40,
  },
  {
    id: 7,
    type: "ansagen",
    typeLabel: "Ansagen & Durchsagen",
    typeLabelTr: "Duyurular ve Anonslar",
    title: "Restaurant und Hotel",
    difficulty: 2,
    instruction: "Sie hören fünf Ansagen aus einem Restaurant oder Hotel. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        shortAudio: "Willkommen im Hotel Bergblick! Unser Frühstücksbuffet wird täglich von sieben bis zehn Uhr dreißig im ersten Obergeschoss serviert.",
        question: "Wann wird das Frühstück serviert?",
        options: ["Von 6:00 bis 9:00 Uhr", "Von 7:00 bis 10:30 Uhr", "Von 8:00 bis 11:00 Uhr"],
        correct: 1,
        explanation: "'täglich von sieben bis zehn Uhr dreißig' — kahvaltı 7:00-10:30 arası.",
      },
      {
        id: 2,
        shortAudio: "Liebe Gäste des Restaurants Zum Löwen! Leider ist heute unsere Küche bis neunzehn Uhr geschlossen. Bitte kommen Sie zwischen zwölf und dreizehn Uhr oder ab neunzehn Uhr.",
        question: "Wann kann man heute im Restaurant essen?",
        options: ["Nur abends ab 19 Uhr", "Zwischen 12–13 Uhr oder ab 19 Uhr", "Ganztags"],
        correct: 1,
        explanation: "Mutfak 19:00'e kadar kapalı. 12-13 veya 19:00 sonrası gelebilirsiniz.",
      },
      {
        id: 3,
        shortAudio: "Das ist eine Nachricht für Herrn Schneider in Zimmer dreihundert zwei. Bitte melden Sie sich an der Rezeption. Sie haben ein Paket erhalten.",
        question: "Warum soll Herr Schneider zur Rezeption?",
        options: ["Sein Zimmer muss gewechselt werden.", "Er hat ein Paket bekommen.", "Jemand wartet auf ihn."],
        correct: 1,
        explanation: "'Sie haben ein Paket erhalten' — Bay Schneider'a bir paket gelmiş.",
      },
      {
        id: 4,
        shortAudio: "Liebe Hotelgäste, das Hallenbad und die Sauna sind morgen von acht bis vierzehn Uhr wegen Reinigungsarbeiten geschlossen. Ab vierzehn Uhr stehen sie wieder zur Verfügung.",
        question: "Warum ist das Hallenbad morgen geschlossen?",
        options: ["Wegen Reparaturen", "Wegen Reinigungsarbeiten", "Wegen eines Umbaus"],
        correct: 1,
        explanation: "'wegen Reinigungsarbeiten' = temizlik çalışmaları. Yarın 14:00'te tekrar açılıyor.",
      },
      {
        id: 5,
        shortAudio: "Guten Abend, liebe Restaurantgäste! Heute Abend empfehlen wir als Tagesgericht ein Wiener Schnitzel mit Kartoffelsalat für neun Euro neunzig. Guten Appetit!",
        question: "Was kostet das Tagesgericht heute Abend?",
        options: ["7,90 Euro", "9,90 Euro", "11,90 Euro"],
        correct: 1,
        explanation: "'für neun Euro neunzig' — günün yemeği (Wiener Schnitzel) 9,90 €.",
      },
    ],
    xp: 45,
  },
  {
    id: 8,
    type: "ansagen",
    typeLabel: "Ansagen & Durchsagen",
    typeLabelTr: "Duyurular ve Anonslar",
    title: "Bank und Post",
    difficulty: 2,
    instruction: "Sie hören fünf Ansagen von einer Bank oder Post. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        shortAudio: "Guten Morgen! Sie haben die Deutsche Bank Filiale Marktstraße angerufen. Unsere Öffnungszeiten sind montags bis freitags von neun bis siebzehn Uhr und samstags von neun bis dreizehn Uhr.",
        question: "Wann hat die Bank am Samstag geöffnet?",
        options: ["9–17 Uhr", "9–13 Uhr", "10–14 Uhr"],
        correct: 1,
        explanation: "'samstags von neun bis dreizehn Uhr' — Cumartesi 9:00-13:00 arası açık.",
      },
      {
        id: 2,
        shortAudio: "Achtung, liebe Kundinnen und Kunden! Der Geldautomat in unserer Filiale ist derzeit außer Betrieb. Den nächsten Automaten finden Sie in der Poststraße dreißig.",
        question: "Was ist das Problem?",
        options: ["Die Filiale ist geschlossen.", "Der Geldautomat funktioniert nicht.", "Die Bank hat kein Geld mehr."],
        correct: 1,
        explanation: "'außer Betrieb' = arızalı/çalışmıyor. En yakın ATM Poststraße 30'da.",
      },
      {
        id: 3,
        shortAudio: "Sie haben die Postfiliale Schillerplatz angerufen. Pakete können Sie rund um die Uhr an unserer Packstation abgeben.",
        question: "Wann kann man an der Packstation Pakete abgeben?",
        options: ["Nur zu den Öffnungszeiten", "Nur nachts", "Rund um die Uhr"],
        correct: 2,
        explanation: "'rund um die Uhr an unserer Packstation' — 24 saat boyunca paket bırakabilirsiniz.",
      },
      {
        id: 4,
        shortAudio: "Bitte beachten Sie: Für die Auszahlung größerer Beträge in unserer Filiale benötigen Sie einen Termin. Termine können Sie online oder telefonisch vereinbaren.",
        question: "Wann braucht man einen Termin in der Filiale?",
        options: ["Für alle Bankgeschäfte", "Für große Auszahlungen", "Für Kontoabschlüsse"],
        correct: 1,
        explanation: "'Für die Auszahlung größerer Beträge' — büyük miktarda nakit çekimleri için randevu gerekiyor.",
      },
      {
        id: 5,
        shortAudio: "Ihre Bestellung wurde heute Morgen zugestellt. Da Sie nicht zu Hause waren, liegt das Paket beim Nachbarn in Wohnung fünf. Ihr DHL-Kurierservice.",
        question: "Wo ist das Paket jetzt?",
        options: ["Beim Absender", "Beim Nachbarn in Wohnung 5", "Im Postamt"],
        correct: 1,
        explanation: "'liegt das Paket beim Nachbarn in Wohnung fünf' — evde olmadığınız için paket 5. dairenin komşusuna bırakıldı.",
      },
    ],
    xp: 45,
  },
  {
    id: 9,
    type: "ansagen",
    typeLabel: "Ansagen & Durchsagen",
    typeLabelTr: "Duyurular ve Anonslar",
    title: "Wetter und Verkehr",
    difficulty: 2,
    instruction: "Sie hören fünf Ansagen über Wetter und Verkehr. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        shortAudio: "Achtung Autofahrer! Auf der Autobahn acht zwischen München und Augsburg hat sich ein Stau von zehn Kilometern gebildet. Bitte rechnen Sie mit einer Wartezeit von etwa dreißig Minuten.",
        question: "Wie lang ist der Stau?",
        options: ["5 Kilometer", "10 Kilometer", "15 Kilometer"],
        correct: 1,
        explanation: "'ein Stau von zehn Kilometern' — A8'de 10 km trafik sıkışıklığı, yaklaşık 30 dakika bekleme.",
      },
      {
        id: 2,
        shortAudio: "Wetterbericht für Norddeutschland: Morgen wird es stark bewölkt mit Regen am Nachmittag. Die Temperaturen liegen zwischen acht und vierzehn Grad.",
        question: "Wie wird das Wetter morgen Nachmittag?",
        options: ["Sonnig und warm", "Bewölkt mit Regen", "Kalt mit Schnee"],
        correct: 1,
        explanation: "'stark bewölkt mit Regen am Nachmittag' — öğleden sonra bulutlu ve yağmurlu.",
      },
      {
        id: 3,
        shortAudio: "Die Sperrung der Hauptstraße wegen Bauarbeiten wird noch bis Ende des Monats andauern. Bitte nutzen Sie die ausgeschilderte Umleitung über die Ringstraße.",
        question: "Wie lange ist die Hauptstraße noch gesperrt?",
        options: ["Bis Ende der Woche", "Bis Ende des Monats", "Bis Ende des Jahres"],
        correct: 1,
        explanation: "'bis Ende des Monats' — ana cadde ay sonuna kadar kapalı.",
      },
      {
        id: 4,
        shortAudio: "Schneechaos im Süden Deutschlands! Autofahrern wird empfohlen, Winterreifen zu benutzen und langsam zu fahren.",
        question: "Was wird den Autofahrern empfohlen?",
        options: ["Zuhause zu bleiben", "Winterreifen zu benutzen", "Eine andere Route zu nehmen"],
        correct: 1,
        explanation: "'Winterreifen zu benutzen und langsam zu fahren' — kış lastiklerini kullanın ve yavaş sürün.",
      },
      {
        id: 5,
        shortAudio: "Der Flughafen Frankfurt gibt bekannt: Aufgrund des starken Nebels wurden heute Morgen zwölf Flüge gestrichen. Bitte informieren Sie sich bei Ihrer Fluggesellschaft.",
        question: "Warum wurden Flüge gestrichen?",
        options: ["Wegen eines Streiks", "Wegen starken Nebels", "Wegen eines Sturms"],
        correct: 1,
        explanation: "'aufgrund des starken Nebels' = yoğun sis nedeniyle 12 uçuş iptal edildi.",
      },
    ],
    xp: 45,
  },
  {
    id: 10,
    type: "ansagen",
    typeLabel: "Ansagen & Durchsagen",
    typeLabelTr: "Duyurular ve Anonslar",
    title: "Kultur und Events",
    difficulty: 2,
    instruction: "Sie hören fünf Ansagen über kulturelle Veranstaltungen. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        shortAudio: "Herzlich willkommen im Stadtmuseum Hamburg! Heute Abend findet um neunzehn Uhr dreißig eine Sonderführung durch die neue Ausstellung statt. Tickets kosten zwölf Euro, ermäßigt acht Euro.",
        question: "Was kostet der Normalpreis für die Führung?",
        options: ["8 Euro", "12 Euro", "15 Euro"],
        correct: 1,
        explanation: "'Tickets kosten zwölf Euro, ermäßigt acht Euro' — normal bilet 12 €, indirimli 8 €.",
      },
      {
        id: 2,
        shortAudio: "Das Theater am Ring muss das Stück heute Abend leider absagen. Bereits gekaufte Karten werden an der Kasse zurückerstattet.",
        question: "Was passiert mit den bereits gekauften Karten?",
        options: ["Sie sind für den nächsten Termin gültig.", "Sie werden zurückerstattet.", "Sie werden nicht akzeptiert."],
        correct: 1,
        explanation: "'werden an der Kasse zurückerstattet' — kasadan iade alınabilir.",
      },
      {
        id: 3,
        shortAudio: "Das Open-Air-Konzert im Stadtpark beginnt heute um zwanzig Uhr. Bei Regen findet die Veranstaltung in der Stadthalle statt. Bitte informieren Sie sich bis siebzehn Uhr auf unserer Website.",
        question: "Was passiert bei Regen?",
        options: ["Das Konzert wird abgesagt.", "Das Konzert findet in der Stadthalle statt.", "Das Konzert wird verschoben."],
        correct: 1,
        explanation: "'Bei Regen findet die Veranstaltung in der Stadthalle statt' — yağmurda konser şehir salonuna taşınıyor.",
      },
      {
        id: 4,
        shortAudio: "Die Kunstausstellung Moderne Welten ist ab sofort im Kunstzentrum zu sehen. Öffnungszeiten: Dienstag bis Sonntag von zehn bis achtzehn Uhr. Montags geschlossen.",
        question: "Wann ist das Kunstzentrum montags geöffnet?",
        options: ["Von 10–18 Uhr", "Von 12–18 Uhr", "Montags geschlossen"],
        correct: 2,
        explanation: "'Montags geschlossen' — sanat merkezi Pazartesi günleri kapalıdır.",
      },
      {
        id: 5,
        shortAudio: "Liebe Kinogäste! Die Vorstellung um achtzehn Uhr dreißig ist bereits ausverkauft. Karten für die Spätvorstellung um einundzwanzig Uhr sind noch erhältlich.",
        question: "Welche Vorstellung ist noch nicht ausverkauft?",
        options: ["Die Vorstellung um 18:30 Uhr", "Die Vorstellung um 21:00 Uhr", "Beide sind ausverkauft"],
        correct: 1,
        explanation: "18:30 gösterimi tükendi. 21:00'deki gece gösterimi için hâlâ bilet var.",
      },
    ],
    xp: 45,
  },
  {
    id: 11,
    type: "ansagen",
    typeLabel: "Ansagen & Durchsagen",
    typeLabelTr: "Duyurular ve Anonslar",
    title: "Alltag in Deutschland",
    difficulty: 2,
    instruction: "Sie hören fünf Ansagen aus dem deutschen Alltag. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        shortAudio: "Liebe Hausbewohner! Am Samstag findet von neun bis zwölf Uhr die jährliche Hausreinigung statt. Bitte räumen Sie Fahrräder und Kinderwagen aus dem Keller und dem Treppenhaus.",
        question: "Was sollen die Bewohner vor der Hausreinigung tun?",
        options: ["Die Wohnung aufräumen", "Fahrräder und Kinderwagen wegräumen", "Den Keller abschließen"],
        correct: 1,
        explanation: "'räumen Sie Fahrräder und Kinderwagen aus dem Keller' — bisiklet ve bebek arabalarını kaldırın.",
      },
      {
        id: 2,
        shortAudio: "Achtung! In unserer Straße gibt es morgen Wasserabsperrungen. Von sechs bis vierzehn Uhr steht kein Wasser zur Verfügung. Bitte horten Sie genug Trinkwasser.",
        question: "Was sollen die Anwohner tun?",
        options: ["Den Vermieter anrufen", "Genug Wasser vorrätig halten", "Die Wohnung verlassen"],
        correct: 1,
        explanation: "'Bitte horten Sie genug Trinkwasser' — yarın 6-14 arası su yok, önceden su depolayın.",
      },
      {
        id: 3,
        shortAudio: "Liebe Kunden! Unser neuer Lieferservice ist ab sofort aktiv. Mindestbestellwert ist fünfzehn Euro. Lieferzeiten täglich von elf bis zweiundzwanzig Uhr.",
        question: "Wie hoch ist der Mindestbestellwert?",
        options: ["10 Euro", "15 Euro", "20 Euro"],
        correct: 1,
        explanation: "'Mindestbestellwert ist fünfzehn Euro' — minimum sipariş tutarı 15 €.",
      },
      {
        id: 4,
        shortAudio: "Wichtige Information der Stadtverwaltung: Ab dem ersten Oktober gilt die neue Mülltrennung. Plastik und Metall kommen in die gelbe Tonne.",
        question: "Was kommt ab Oktober in die gelbe Tonne?",
        options: ["Papier und Pappe", "Plastik und Metall", "Glas und Verpackungen"],
        correct: 1,
        explanation: "'Plastik und Metall kommen in die gelbe Tonne' — 1 Ekim'den itibaren sarı çöp kutusuna.",
      },
      {
        id: 5,
        shortAudio: "Liebe Fahrgäste, der Aufzug am Bahnhof Westend ist bis auf Weiteres außer Betrieb. Rollstuhlfahrer und Fahrgäste mit Kinderwagen werden gebeten, den Bahnhof Ostend zu nutzen.",
        question: "Für wen ist diese Information besonders wichtig?",
        options: ["Für ältere Menschen", "Für Rollstuhlfahrer und Eltern mit Kinderwagen", "Für alle Fahrgäste"],
        correct: 1,
        explanation: "'Rollstuhlfahrer und Fahrgäste mit Kinderwagen' — asansör arızalı, bu kişiler en çok etkileniyor.",
      },
    ],
    xp: 45,
  },
  {
    id: 12,
    type: "ansagen",
    typeLabel: "Ansagen & Durchsagen",
    typeLabelTr: "Duyurular ve Anonslar",
    title: "Am Flughafen",
    difficulty: 2,
    instruction: "Sie hören fünf Durchsagen am Flughafen. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        shortAudio: "Letzter Aufruf für Flug LH vierhundert elf nach London Heathrow! Bitte begeben Sie sich sofort zum Gate B dreiundzwanzig. Der Flug schließt in zehn Minuten.",
        question: "Was sollen die Passagiere sofort tun?",
        options: ["Zum Check-in gehen", "Zum Gate B23 gehen", "Die Bordkarte zeigen"],
        correct: 1,
        explanation: "'Bitte begeben Sie sich sofort zum Gate B dreiundzwanzig' — son çağrı, hemen B23 kapısına gidin.",
      },
      {
        id: 2,
        shortAudio: "Achtung! Ein schwarzer Koffer mit rotem Band wurde am Terminal zwei gefunden. Der Besitzer wird gebeten, sich beim Informationsschalter zu melden.",
        question: "Was wurde gefunden?",
        options: ["Eine Handtasche", "Ein schwarzer Koffer mit rotem Band", "Ein Reisepass"],
        correct: 1,
        explanation: "'Ein schwarzer Koffer mit rotem Band' — kırmızı bantlı siyah bavul bulunmuş.",
      },
      {
        id: 3,
        shortAudio: "Der Flug SK vierhundert nach Stockholm hat eine Verspätung von neunzig Minuten. Der neue Abflug ist um zwanzig Uhr fünfzehn.",
        question: "Wie viel Verspätung hat der Flug nach Stockholm?",
        options: ["30 Minuten", "60 Minuten", "90 Minuten"],
        correct: 2,
        explanation: "'eine Verspätung von neunzig Minuten' = 90 dakika gecikme.",
      },
      {
        id: 4,
        shortAudio: "Aus Sicherheitsgründen dürfen Flüssigkeiten über hundert Milliliter nicht im Handgepäck mitgeführt werden. Bitte packen Sie solche Artikel in Ihr aufgegebenes Gepäck.",
        question: "Was darf man nicht im Handgepäck haben?",
        options: ["Lebensmittel", "Flüssigkeiten über 100 ml", "Elektronische Geräte"],
        correct: 1,
        explanation: "'Flüssigkeiten über hundert Milliliter nicht im Handgepäck' — 100 ml üzeri sıvılar el bagajında yasak.",
      },
      {
        id: 5,
        shortAudio: "Willkommen am Flughafen München! Das Gepäckband für Flug LH fünfhundert aus New York befindet sich in Halle B, Band sieben.",
        question: "Wo ist das Gepäckband für den Flug aus New York?",
        options: ["Halle A, Band 3", "Halle B, Band 7", "Halle C, Band 2"],
        correct: 1,
        explanation: "'in Halle B, Band sieben' — New York uçuşunun bagajları B Salonu, 7. bant.",
      },
    ],
    xp: 50,
  },
  {
    id: 13,
    type: "ansagen",
    typeLabel: "Ansagen & Durchsagen",
    typeLabelTr: "Duyurular ve Anonslar",
    title: "Beim Amt und in der Stadt",
    difficulty: 2,
    instruction: "Sie hören fünf Ansagen von Ämtern und städtischen Einrichtungen. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        shortAudio: "Sie haben das Bürgeramt der Stadt Köln angerufen. Wegen hoher Nachfrage bitten wir Sie, Termine ausschließlich online zu buchen. Spontane Besuche ohne Termin sind leider nicht möglich.",
        question: "Wie kann man jetzt einen Termin beim Bürgeramt bekommen?",
        options: ["Telefonisch anrufen", "Online buchen", "Persönlich vorbeikommen"],
        correct: 1,
        explanation: "'Termine ausschließlich online buchen' — randevular sadece çevrimiçi alınabilir.",
      },
      {
        id: 2,
        shortAudio: "Liebe Bürgerinnen und Bürger! Die Stadtbibliothek ist ab sofort auch samstags von zehn bis vierzehn Uhr geöffnet. Wir freuen uns auf Ihren Besuch.",
        question: "Was ist neu bei der Stadtbibliothek?",
        options: ["Sie hat jetzt längere Öffnungszeiten unter der Woche.", "Sie ist jetzt auch samstags geöffnet.", "Sie hat jetzt eine neue Adresse."],
        correct: 1,
        explanation: "'ab sofort auch samstags von zehn bis vierzehn Uhr' — kütüphane artık Cumartesi de açık.",
      },
      {
        id: 3,
        shortAudio: "Achtung! Wegen der Bauarbeiten am Rathausplatz ist das Parken in der Innenstadt bis Ende des Monats eingeschränkt. Bitte nutzen Sie die Parkhäuser am Stadtrand.",
        question: "Warum ist das Parken in der Innenstadt eingeschränkt?",
        options: ["Wegen einer Veranstaltung", "Wegen Bauarbeiten", "Wegen neuer Verkehrsregeln"],
        correct: 1,
        explanation: "'Wegen der Bauarbeiten am Rathausplatz' — belediye meydanındaki inşaat nedeniyle park kısıtlandı.",
      },
      {
        id: 4,
        shortAudio: "Sie haben die Ausländerbehörde angerufen. Unsere Warteschlange ist momentan sehr lang. Bitte besuchen Sie unsere Website für Online-Termine oder rufen Sie nach vierzehn Uhr zurück.",
        question: "Was empfiehlt die Ausländerbehörde?",
        options: ["Sofort persönlich zu kommen", "Online einen Termin zu buchen oder nach 14 Uhr anzurufen", "Eine E-Mail zu schreiben"],
        correct: 1,
        explanation: "'Website für Online-Termine oder nach vierzehn Uhr zurückrufen' — iki alternatif öneriyor.",
      },
      {
        id: 5,
        shortAudio: "Liebe Anwohner! Der Recyclinghof in der Berliner Straße ist ab nächster Woche montags und mittwochs von sieben bis siebzehn Uhr geöffnet. Freitags bleibt er geschlossen.",
        question: "Wann ist der Recyclinghof freitags geöffnet?",
        options: ["Von 7–17 Uhr", "Von 9–14 Uhr", "Freitags ist er geschlossen."],
        correct: 2,
        explanation: "'Freitags bleibt er geschlossen' — geri dönüşüm merkezi Cuma günleri kapalı.",
      },
    ],
    xp: 50,
  },

  // ── A2 — Teile 14–22: Gespräche ───────────────────────────────────────────

  {
    id: 14,
    type: "gespraeche",
    typeLabel: "Gespräch",
    typeLabelTr: "Konuşma",
    title: "Kinoabend planen",
    difficulty: 2,
    maleSpeakers: ["Stefan"],
    audioText:
      "Stefan: Hallo?\nAnna: Hallo Stefan, hier ist Anna. Störe ich gerade?\nStefan: Nein, nein, ich bin gerade zu Hause. Was gibt's?\nAnna: Ich wollte fragen, ob wir uns am Samstag treffen können. Ich möchte ins Kino gehen.\nStefan: Am Samstag? Leider kann ich da nicht, ich arbeite bis achtzehn Uhr.\nAnna: Oh schade! Und am Sonntag?\nStefan: Sonntag passt mir gut. Was läuft denn im Kino?\nAnna: Der neue Film mit Julia Roberts. Er läuft um halb neun abends.\nStefan: Um zwanzig Uhr dreißig? Das ist etwas spät für mich. Können wir eine frühere Vorstellung nehmen?\nAnna: Ja, es gibt auch eine um sechzehn Uhr.\nStefan: Das ist perfekt! Sollen wir uns davor noch etwas essen gehen?\nAnna: Gerne! Wie wäre es mit dem neuen italienischen Restaurant am Marktplatz?\nStefan: Super! Dann treffen wir uns um vierzehn Uhr am Marktplatz.\nAnna: Einverstanden. Bis Sonntag!\nStefan: Bis Sonntag, tschüss!",
    instruction: "Sie hören ein Telefongespräch zwischen Anna und Stefan. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Warum kann Stefan am Samstag nicht ins Kino gehen?",
        options: ["Er ist krank.", "Er arbeitet bis 18 Uhr.", "Er hat keine Lust."],
        correct: 1,
        explanation: "'ich arbeite bis achtzehn Uhr' — Stefan Cumartesi akşam 18:00'e kadar çalışıyor.",
      },
      {
        id: 2,
        question: "Für welche Filmvorstellung entscheiden sie sich?",
        options: ["Um 20:30 Uhr", "Um 16:00 Uhr", "Um 14:00 Uhr"],
        correct: 1,
        explanation: "20:30 çok geç olduğu için 16:00'lık gösterimi seçiyorlar.",
      },
      {
        id: 3,
        question: "Wo wollen sie essen gehen?",
        options: ["In einem chinesischen Restaurant", "In einem türkischen Restaurant", "In einem italienischen Restaurant"],
        correct: 2,
        explanation: "'neuen italienischen Restaurant am Marktplatz' — Marktplatz'taki yeni İtalyan restoranı.",
      },
      {
        id: 4,
        question: "Um wie viel Uhr treffen sie sich?",
        options: ["Um 12 Uhr", "Um 14 Uhr", "Um 16 Uhr"],
        correct: 1,
        explanation: "'treffen wir uns um vierzehn Uhr am Marktplatz' — saat 14:00'te buluşuyorlar.",
      },
      {
        id: 5,
        question: "Was machen sie zuerst?",
        options: ["Kino", "Essen gehen", "Spazieren gehen"],
        correct: 1,
        explanation: "Önce saat 14:00'te buluşup yemek yiyorlar, sonra 16:00'lık filme gidiyorlar.",
      },
    ],
    xp: 50,
  },
  {
    id: 15,
    type: "gespraeche",
    typeLabel: "Gespräch",
    typeLabelTr: "Konuşma",
    title: "Wohnungssuche",
    difficulty: 2,
    maleSpeakers: ["Markus"],
    audioText:
      "Frau Koch: Koch, guten Tag!\nMarkus: Guten Tag, mein Name ist Markus Berger. Ich rufe wegen der Wohnungsanzeige an.\nFrau Koch: Ah ja! Die Zweizimmerwohnung in der Gartenstraße?\nMarkus: Genau. Ist die Wohnung noch frei?\nFrau Koch: Ja, sie ist noch zu haben. Die Wohnung ist siebenundvierzig Quadratmeter groß.\nMarkus: Und wie hoch ist die Miete?\nFrau Koch: Siebenhundertfünfzig Euro warm, inklusive Heizung und Wasser.\nMarkus: Das klingt gut. Wann könnte ich sie besichtigen?\nFrau Koch: Wie wäre es übermorgen, Mittwoch, um siebzehn Uhr?\nMarkus: Mittwoch um siebzehn Uhr passt mir gut. Gibt es auch einen Parkplatz?\nFrau Koch: Nein, leider nicht. Aber es gibt in der Nähe eine Tiefgarage für fünfzig Euro im Monat.\nMarkus: Gut zu wissen. Wie lange steht die Wohnung schon leer?\nFrau Koch: Erst seit zwei Wochen. Der letzte Mieter hat gut auf sie aufgepasst.\nMarkus: Super. Dann freue ich mich auf den Termin am Mittwoch!\nFrau Koch: Bis Mittwoch dann. Auf Wiederhören!",
    instruction: "Sie hören ein Telefongespräch über eine Wohnungssuche. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Wie groß ist die Wohnung?",
        options: ["37 Quadratmeter", "47 Quadratmeter", "57 Quadratmeter"],
        correct: 1,
        explanation: "'siebenundvierzig Quadratmeter groß' — daire 47 m².",
      },
      {
        id: 2,
        question: "Wie hoch ist die Warmmiete?",
        options: ["650 Euro", "750 Euro", "850 Euro"],
        correct: 1,
        explanation: "'Siebenhundertfünfzig Euro warm' — ısıtma ve su dahil 750 €.",
      },
      {
        id: 3,
        question: "Wann ist der Besichtigungstermin?",
        options: ["Montag um 17 Uhr", "Mittwoch um 17 Uhr", "Freitag um 17 Uhr"],
        correct: 1,
        explanation: "'Mittwoch um siebzehn Uhr' — Çarşamba 17:00'de görüntüleme.",
      },
      {
        id: 4,
        question: "Gibt es einen Parkplatz bei der Wohnung?",
        options: ["Ja, kostenlos.", "Nein, aber eine Tiefgarage für 50 €.", "Nein, gar nicht."],
        correct: 1,
        explanation: "'Nein, leider nicht. Aber Tiefgarage für fünfzig Euro im Monat' — dairede park yok ama yakında 50 €/ay garaj var.",
      },
      {
        id: 5,
        question: "Wie lange steht die Wohnung schon leer?",
        options: ["Seit zwei Monaten", "Seit zwei Wochen", "Seit drei Tagen"],
        correct: 1,
        explanation: "'Erst seit zwei Wochen' — daire sadece 2 haftadır boş.",
      },
    ],
    xp: 50,
  },
  {
    id: 16,
    type: "gespraeche",
    typeLabel: "Gespräch",
    typeLabelTr: "Konuşma",
    title: "Beim Arzt",
    difficulty: 2,
    maleSpeakers: ["Dr. Braun"],
    audioText:
      "Dr. Braun: Guten Morgen, Frau Hoffmann. Was kann ich für Sie tun?\nLisa: Guten Morgen, Herr Doktor. Ich habe seit drei Tagen starke Halsschmerzen und ein bisschen Fieber.\nDr. Braun: Haben Sie auch Husten oder Schnupfen?\nLisa: Ja, ich huste ein bisschen, aber keinen Schnupfen.\nDr. Braun: Ich schaue mal in Ihren Hals. Öffnen Sie bitte den Mund... Der Hals ist sehr rot. Das sieht nach einer Halsentzündung aus.\nLisa: Muss ich Antibiotika nehmen?\nDr. Braun: Ich möchte zuerst einen Abstrich machen. Wie hoch ist Ihr Fieber?\nLisa: Heute Morgen war es achtunddreißig Komma fünf.\nDr. Braun: Das ist erhöht, aber noch nicht zu hoch. Nehmen Sie Ibuprofen gegen die Schmerzen und das Fieber. Und bitte viel trinken und ausruhen.\nLisa: Soll ich auch zuhause bleiben?\nDr. Braun: Ja, ich schreibe Ihnen für zwei Tage eine Krankmeldung. Kommen Sie in drei Tagen wieder, wenn es nicht besser wird.\nLisa: Danke, Herr Doktor. Auf Wiedersehen.",
    instruction: "Sie hören ein Gespräch zwischen einer Patientin und einem Arzt. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Was sind Lisas Symptome?",
        options: ["Nur Fieber", "Halsschmerzen, Fieber und Husten", "Schnupfen und Kopfschmerzen"],
        correct: 1,
        explanation: "Lisa hat Halsschmerzen, Fieber und leichten Husten, aber keinen Schnupfen.",
      },
      {
        id: 2,
        question: "Was vermutet der Arzt?",
        options: ["Eine Erkältung", "Eine Halsentzündung", "Eine Grippe"],
        correct: 1,
        explanation: "'Das sieht nach einer Halsentzündung aus' — doktor boğaz iltihabı şüpheliyor.",
      },
      {
        id: 3,
        question: "Wie hoch ist Lisas Fieber?",
        options: ["37,5 Grad", "38,0 Grad", "38,5 Grad"],
        correct: 2,
        explanation: "'achtunddreißig Komma fünf' = 38,5 derece.",
      },
      {
        id: 4,
        question: "Was soll Lisa gegen Fieber nehmen?",
        options: ["Antibiotika", "Ibuprofen", "Vitamin C"],
        correct: 1,
        explanation: "'Nehmen Sie Ibuprofen gegen die Schmerzen und das Fieber' — ağrı ve ateş için İbuprofen.",
      },
      {
        id: 5,
        question: "Für wie viele Tage bekommt Lisa eine Krankmeldung?",
        options: ["Für einen Tag", "Für zwei Tage", "Für drei Tage"],
        correct: 1,
        explanation: "'ich schreibe Ihnen für zwei Tage eine Krankmeldung' — 2 günlük istirahat raporu.",
      },
    ],
    xp: 50,
  },
  {
    id: 17,
    type: "gespraeche",
    typeLabel: "Gespräch",
    typeLabelTr: "Konuşma",
    title: "Im Restaurant",
    difficulty: 1,
    maleSpeakers: ["Kellner"],
    audioText:
      "Kellner: Guten Abend! Haben Sie reserviert?\nTom: Ja, auf den Namen Weber, für zwei Personen.\nKellner: Ah, Weber für zwei. Kommen Sie bitte mit, Ihr Tisch ist dort drüben. Hier ist die Speisekarte.\nTom: Danke. Was können Sie empfehlen?\nKellner: Heute ist unser Tagesgericht Lachsfilet mit Kartoffeln und Salat. Als Vorspeise haben wir eine hausgemachte Suppe.\nTom: Ich nehme die Suppe als Vorspeise und dann den Lachs.\nKellner: Sehr gerne. Und etwas zu trinken?\nTom: Ein Glas Weißwein bitte, und ein Wasser.\nKellner: Naturell oder mit Kohlensäure?\nTom: Naturell bitte.\nKellner: Noch etwas?\nTom: Ja, meine Begleiterin möchte vegetarisch essen. Gibt es etwas ohne Fleisch?\nKellner: Natürlich! Wir haben heute Gemüsepasta mit Tomatensauce, sehr empfehlenswert.\nTom: Perfekt, dann bestellen wir das für sie.\nKellner: Ich bringe erst mal Ihre Getränke. Guten Appetit schon mal!",
    instruction: "Sie hören ein Gespräch in einem Restaurant. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Auf welchen Namen hat Tom reserviert?",
        options: ["Auf den Namen Müller", "Auf den Namen Weber", "Auf den Namen Fischer"],
        correct: 1,
        explanation: "'auf den Namen Weber, für zwei Personen' — Weber adına 2 kişilik rezervasyon.",
      },
      {
        id: 2,
        question: "Was ist das Tagesgericht?",
        options: ["Schnitzel mit Pommes", "Lachsfilet mit Kartoffeln und Salat", "Pasta mit Tomatensauce"],
        correct: 1,
        explanation: "'Lachsfilet mit Kartoffeln und Salat' — günün yemeği.",
      },
      {
        id: 3,
        question: "Was bestellt Tom als Vorspeise?",
        options: ["Einen Salat", "Eine Suppe", "Brot und Butter"],
        correct: 1,
        explanation: "'Ich nehme die Suppe als Vorspeise' — başlangıç olarak çorba.",
      },
      {
        id: 4,
        question: "Welches Wasser möchte Tom?",
        options: ["Mit Kohlensäure", "Naturell", "Warmes Wasser"],
        correct: 1,
        explanation: "'Naturell bitte' = köpüksüz/düz su.",
      },
      {
        id: 5,
        question: "Was isst Toms Begleiterin?",
        options: ["Lachsfilet", "Schnitzel", "Gemüsepasta"],
        correct: 2,
        explanation: "'Gemüsepasta mit Tomatensauce' — arkadaşı vejeteryan, domates soslu makarna seçiyor.",
      },
    ],
    xp: 45,
  },
  {
    id: 18,
    type: "gespraeche",
    typeLabel: "Gespräch",
    typeLabelTr: "Konuşma",
    title: "Jobinterview vorbereiten",
    difficulty: 2,
    maleSpeakers: ["Michael"],
    audioText:
      "Sarah: Michael, ich habe morgen ein Vorstellungsgespräch und bin total nervös.\nMichael: Hey, das ist doch super! Bei welcher Firma?\nSarah: Bei einer Marketing-Agentur in der Innenstadt. Die Stelle ist als Grafikdesignerin.\nMichael: Perfekt, das passt zu deiner Ausbildung! Was ziehst du an?\nSarah: Ich dachte an meinen blauen Blazer mit schwarzer Hose. Ist das zu formell?\nMichael: Nein, das klingt gut. Business-Casual ist immer richtig für ein Vorstellungsgespräch.\nSarah: Und was soll ich über mich erzählen?\nMichael: Fang mit deiner Ausbildung an, dann deine Erfahrungen, und was dich an der Stelle interessiert. Aber halte es kurz — maximal drei Minuten.\nSarah: Was ist, wenn sie mich nach meinen Schwächen fragen?\nMichael: Nenn eine echte Schwäche, aber eine, an der du arbeitest. Zum Beispiel: Ich bin manchmal zu perfektionistisch.\nSarah: Guter Tipp! Und wann soll ich dort sein?\nMichael: Lieber zehn Minuten früher als pünktlich. Und vergiss deine Bewerbungsmappe nicht!\nSarah: Danke, Michael, du hast mir sehr geholfen!\nMichael: Viel Erfolg morgen!",
    instruction: "Sie hören ein Gespräch über die Vorbereitung auf ein Vorstellungsgespräch. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Für welchen Beruf bewirbt sich Sarah?",
        options: ["Als Marketingmanagerin", "Als Grafikdesignerin", "Als Buchhalterin"],
        correct: 1,
        explanation: "'Die Stelle ist als Grafikdesignerin' — grafik tasarımcısı pozisyonu için başvuruyor.",
      },
      {
        id: 2,
        question: "Was plant Sarah zu tragen?",
        options: ["Ein schwarzes Kleid", "Blauen Blazer mit schwarzer Hose", "Jeans und T-Shirt"],
        correct: 1,
        explanation: "'meinen blauen Blazer mit schwarzer Hose' — mavi blazer ve siyah pantolon.",
      },
      {
        id: 3,
        question: "Wie lange sollte die Selbstvorstellung maximal dauern?",
        options: ["Eine Minute", "Drei Minuten", "Fünf Minuten"],
        correct: 1,
        explanation: "'maximal drei Minuten' — kendini tanıtma en fazla 3 dakika sürmeli.",
      },
      {
        id: 4,
        question: "Was rät Michael bei der Frage nach Schwächen?",
        options: ["Keine Schwächen nennen", "Eine echte, verbesserliche Schwäche nennen", "Eine erfundene Schwäche nennen"],
        correct: 1,
        explanation: "'eine echte Schwäche, aber eine, an der du arbeitest' — gerçek ama üzerinde çalıştığın bir zayıflık söyle.",
      },
      {
        id: 5,
        question: "Wann soll Sarah zum Vorstellungsgespräch erscheinen?",
        options: ["Pünktlich", "10 Minuten früher", "30 Minuten früher"],
        correct: 1,
        explanation: "'Lieber zehn Minuten früher als pünktlich' — tam saatinde değil, 10 dakika erken git.",
      },
    ],
    xp: 50,
  },
  {
    id: 19,
    type: "gespraeche",
    typeLabel: "Gespräch",
    typeLabelTr: "Konuşma",
    title: "Urlaub planen",
    difficulty: 2,
    maleSpeakers: ["Jonas"],
    audioText:
      "Lena: Jonas, wir müssen endlich unseren Sommerurlaub planen. Wohin soll es gehen?\nJonas: Ich dachte an Kroatien. Das Meer, die Sonne...\nLena: Kroatien ist schön, aber letztes Jahr waren wir schon am Meer. Wie wäre es mit einer Städtereise? Prag?\nJonas: Prag finde ich gut. Günstig und viele Sehenswürdigkeiten. Wann fahren wir?\nLena: Ende Juli, wenn die Kinder schulfrei haben. Etwa zehn Tage.\nJonas: Zehn Tage ist perfekt. Fliegen wir oder fahren wir mit dem Zug?\nLena: Der Zug ist günstiger und wir sehen mehr. Das Ticket von München nach Prag kostet nur neunzig Euro pro Person.\nJonas: Gut, dann nehmen wir den Zug. Und wo wohnen wir?\nLena: Ich habe ein nettes Hotel in der Altstadt gefunden. Frühstück inklusive, neunzig Euro pro Nacht.\nJonas: Das klingt vernünftig. Hast du schon gebucht?\nLena: Nein, ich warte noch auf deine Zustimmung. Soll ich jetzt buchen?\nJonas: Ja, buch es! Ich freue mich schon!\nLena: Wunderbar. Dann buche ich heute noch.",
    instruction: "Sie hören ein Gespräch über Urlaubsplanung. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Wohin fahren Lena und Jonas im Urlaub?",
        options: ["Nach Kroatien", "Nach Prag", "Nach Wien"],
        correct: 1,
        explanation: "Jonas schlug Kroatien vor, aber sie entscheiden sich gemeinsam für Prag.",
      },
      {
        id: 2,
        question: "Wann fahren sie in Urlaub?",
        options: ["Anfang Juli", "Ende Juli", "Ende August"],
        correct: 1,
        explanation: "'Ende Juli, wenn die Kinder schulfrei haben' — çocuklar tatile girince Temmuz sonu.",
      },
      {
        id: 3,
        question: "Wie reisen sie nach Prag?",
        options: ["Mit dem Flugzeug", "Mit dem Auto", "Mit dem Zug"],
        correct: 2,
        explanation: "'Der Zug ist günstiger und wir sehen mehr' — tren daha ucuz ve manzaralı.",
      },
      {
        id: 4,
        question: "Was kostet das Zugticket pro Person?",
        options: ["70 Euro", "90 Euro", "110 Euro"],
        correct: 1,
        explanation: "'kostet nur neunzig Euro pro Person' — kişi başı 90 €.",
      },
      {
        id: 5,
        question: "Was ist im Hotel inklusive?",
        options: ["Das Abendessen", "Das Frühstück", "Der Parkplatz"],
        correct: 1,
        explanation: "'Frühstück inklusive, neunzig Euro pro Nacht' — 90 €/gece, kahvaltı dahil.",
      },
    ],
    xp: 50,
  },
  {
    id: 20,
    type: "gespraeche",
    typeLabel: "Gespräch",
    typeLabelTr: "Konuşma",
    title: "Beim Einkaufen",
    difficulty: 1,
    maleSpeakers: [],
    audioText:
      "Verkäuferin: Guten Tag! Kann ich Ihnen helfen?\nEmma: Ja, gerne. Ich suche ein Kleid für eine Hochzeit.\nVerkäuferin: Sehr gerne! Für welchen Anlass genau — Sommer- oder Abendveranstaltung?\nEmma: Es ist eine Sommerparty im Garten.\nVerkäuferin: Dann empfehle ich etwas Leichtes und Buntes. Was ist Ihre Größe?\nEmma: Ich trage Größe sechsunddreißig.\nVerkäuferin: Dann hätten wir dieses grüne Kleid oder das blaue dort. Das grüne ist aus Leinen, perfekt für den Sommer.\nEmma: Oh, das grüne gefällt mir! Kann ich es anprobieren?\nVerkäuferin: Natürlich! Die Umkleidekabinen sind dort rechts.\nEmma: Es passt gut, aber es ist etwas kurz. Haben Sie es auch etwas länger?\nVerkäuferin: Ja, wir haben das gleiche Modell in lang. Einen Moment... Hier, bitte.\nEmma: Das ist perfekt! Was kostet es?\nVerkäuferin: Neunundsiebzig Euro neunzig. Wir haben gerade zehn Prozent Rabatt auf alle Sommerkleider.\nEmma: Super! Dann nehme ich es.",
    instruction: "Sie hören ein Gespräch in einem Bekleidungsgeschäft. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Wofür sucht Emma ein Kleid?",
        options: ["Für eine Geburtstagsparty", "Für eine Hochzeit", "Für ein Vorstellungsgespräch"],
        correct: 1,
        explanation: "'Ich suche ein Kleid für eine Hochzeit' — düğün için elbise arıyor.",
      },
      {
        id: 2,
        question: "Welche Größe trägt Emma?",
        options: ["Größe 34", "Größe 36", "Größe 38"],
        correct: 1,
        explanation: "'Ich trage Größe sechsunddreißig' — Emma 36 beden giyiyor.",
      },
      {
        id: 3,
        question: "Aus welchem Material ist das grüne Kleid?",
        options: ["Aus Baumwolle", "Aus Seide", "Aus Leinen"],
        correct: 2,
        explanation: "'Das grüne ist aus Leinen, perfekt für den Sommer' — yeşil elbise keten kumaş.",
      },
      {
        id: 4,
        question: "Was war das Problem mit dem ersten Kleid?",
        options: ["Es war zu teuer.", "Es war zu kurz.", "Es war zu groß."],
        correct: 1,
        explanation: "'es ist etwas kurz' — ilk elbise biraz kısaydı.",
      },
      {
        id: 5,
        question: "Wie viel Rabatt gibt es gerade?",
        options: ["5 Prozent", "10 Prozent", "20 Prozent"],
        correct: 1,
        explanation: "'zehn Prozent Rabatt auf alle Sommerkleider' — tüm yaz elbiselerde %10 indirim.",
      },
    ],
    xp: 45,
  },
  {
    id: 21,
    type: "gespraeche",
    typeLabel: "Gespräch",
    typeLabelTr: "Konuşma",
    title: "Sportverein beitreten",
    difficulty: 2,
    maleSpeakers: ["David"],
    audioText:
      "Frau Müller: Sportverein Blau-Weiß, guten Tag!\nDavid: Guten Tag, mein Name ist David. Ich möchte gerne Mitglied in Ihrem Fußballverein werden.\nFrau Müller: Herzlich willkommen! Wie alt sind Sie?\nDavid: Ich bin einundzwanzig Jahre alt.\nFrau Müller: Super, dann gehören Sie zur Erwachsenenmannschaft. Haben Sie schon Fußball gespielt?\nDavid: Ja, ich habe früher in einem Jugendverein gespielt, aber seit drei Jahren nicht mehr.\nFrau Müller: Kein Problem! Wir haben Trainingseinheiten dienstags und donnerstags, jeweils von siebzehn bis neunzehn Uhr.\nDavid: Und was kostet die Mitgliedschaft?\nFrau Müller: Dreißig Euro im Monat, inklusive Trainingskleidung und Umkleidekabinen.\nDavid: Sehr günstig! Wann kann ich mit dem Training beginnen?\nFrau Müller: Am nächsten Dienstag können Sie einfach vorbeikommen und mitmachen. Bringen Sie bitte Sportschuhe mit.\nDavid: Soll ich mich vorher anmelden?\nFrau Müller: Nein, kommen Sie einfach vorbei. Ich bin dann da und zeige Ihnen alles.\nDavid: Wunderbar, vielen Dank! Bis Dienstag!",
    instruction: "Sie hören ein Gespräch über den Beitritt in einen Sportverein. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Wie alt ist David?",
        options: ["18 Jahre", "21 Jahre", "25 Jahre"],
        correct: 1,
        explanation: "'Ich bin einundzwanzig Jahre alt' — David 21 yaşında.",
      },
      {
        id: 2,
        question: "Wann finden die Trainingseinheiten statt?",
        options: ["Montags und mittwochs, 17–19 Uhr", "Dienstags und donnerstags, 17–19 Uhr", "Freitags und samstags, 18–20 Uhr"],
        correct: 1,
        explanation: "'dienstags und donnerstags, jeweils von siebzehn bis neunzehn Uhr' — Salı ve Perşembe 17-19.",
      },
      {
        id: 3,
        question: "Was kostet die Mitgliedschaft pro Monat?",
        options: ["20 Euro", "30 Euro", "50 Euro"],
        correct: 1,
        explanation: "'Dreißig Euro im Monat' — aylık üyelik ücreti 30 €.",
      },
      {
        id: 4,
        question: "Wann kann David mit dem Training beginnen?",
        options: ["Sofort", "Am nächsten Dienstag", "Erst nächsten Monat"],
        correct: 1,
        explanation: "'Am nächsten Dienstag können Sie einfach vorbeikommen' — gelecek Salı başlayabilir.",
      },
      {
        id: 5,
        question: "Muss David sich vorher anmelden?",
        options: ["Ja, online.", "Ja, telefonisch.", "Nein, einfach vorbeikommen."],
        correct: 2,
        explanation: "'Nein, kommen Sie einfach vorbei' — önceden kayıt gerekmiyor, doğrudan gidebilir.",
      },
    ],
    xp: 50,
  },
  {
    id: 22,
    type: "gespraeche",
    typeLabel: "Gespräch",
    typeLabelTr: "Konuşma",
    title: "Geburtstagsfeier planen",
    difficulty: 2,
    maleSpeakers: [],
    audioText:
      "Clara: Sophie, Mamas Geburtstag ist in zwei Wochen. Wir müssen was organisieren!\nSophie: Ich weiß! Ich dachte an eine Überraschungsparty.\nClara: Super Idee! Aber wo? Bei dir oder bei mir?\nSophie: Bei mir, meine Wohnung ist größer. Ich kann bis zu dreißig Personen einladen.\nClara: Gut. Wie viele Leute sollen kommen?\nSophie: Familie und enge Freunde, also etwa zwanzig Personen.\nClara: Was machst du mit dem Essen? Selbst kochen oder catern lassen?\nSophie: Ich dachte an Fingerfood. Ich mache ein paar Sachen selbst und bestelle den Rest beim Partyservice.\nClara: Und die Deko? Mama mag Blumen.\nSophie: Ich kaufe weiße und gelbe Blumen. Und du kannst die Torte besorgen, oder?\nClara: Ja, natürlich. Von welcher Bäckerei?\nSophie: Vom Café Süß in der Stadtmitte. Die machen die besten Torten.\nClara: Einverstanden. Ich bestelle eine mit Erdbeeren, die mag Mama am liebsten.\nSophie: Perfekt! Und vergiss nicht — es ist eine Überraschung!",
    instruction: "Sie hören ein Gespräch über eine Geburtstagsparty. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Bei wem findet die Party statt?",
        options: ["Bei Clara", "Bei Sophie", "Bei der Mutter"],
        correct: 1,
        explanation: "'Bei mir, meine Wohnung ist größer' — parti Sophie'nin evinde.",
      },
      {
        id: 2,
        question: "Wie viele Personen werden eingeladen?",
        options: ["Etwa 10 Personen", "Etwa 20 Personen", "Etwa 30 Personen"],
        correct: 1,
        explanation: "'etwa zwanzig Personen' — yaklaşık 20 kişi davet edilecek.",
      },
      {
        id: 3,
        question: "Was gibt es zu essen?",
        options: ["Ein großes Buffet", "Fingerfood", "Ein 3-Gänge-Menü"],
        correct: 1,
        explanation: "'Ich dachte an Fingerfood' — yemek olarak parmak yiyecekler.",
      },
      {
        id: 4,
        question: "Was bringt Clara mit?",
        options: ["Die Dekoration", "Die Getränke", "Die Geburtstagstorte"],
        correct: 2,
        explanation: "'du kannst die Torte besorgen' — Clara pastayı getirecek.",
      },
      {
        id: 5,
        question: "Mit welcher Füllung soll die Torte sein?",
        options: ["Mit Schokolade", "Mit Kirschen", "Mit Erdbeeren"],
        correct: 2,
        explanation: "'eine mit Erdbeeren, die mag Mama am liebsten' — anne çilekli pastayı çok seviyor.",
      },
    ],
    xp: 50,
  },
  {
    id: 23,
    type: "gespraeche",
    typeLabel: "Gespräch",
    typeLabelTr: "Konuşma",
    title: "Auf dem Amt",
    difficulty: 2,
    maleSpeakers: ["Herr König"],
    audioText:
      "Herr König: Guten Morgen, was kann ich für Sie tun?\nAna: Guten Morgen. Ich bin gerade nach Köln gezogen und möchte mich anmelden.\nHerr König: Natürlich. Haben Sie alle Dokumente dabei?\nAna: Ich habe meinen Reisepass und den Mietvertrag.\nHerr König: Gut. Haben Sie auch das ausgefüllte Anmeldeformular?\nAna: Nein, das wusste ich nicht. Tut mir leid.\nHerr König: Kein Problem, Sie können es hier ausfüllen. Hier ist das Formular.\nAna: Was muss ich alles eintragen?\nHerr König: Name, Geburtsdatum, alte und neue Adresse, und die Staatsangehörigkeit.\nAna: Wie lange dauert das?\nHerr König: Etwa fünf Minuten. Danach brauche ich nur noch Ihren Pass und den Mietvertrag, dann sind Sie fertig.\nAna: Wann bekomme ich die Meldebestätigung?\nHerr König: Sofort, noch heute. Sie können sie direkt mitnehmen.\nAna: Sehr gut! Muss ich dafür bezahlen?\nHerr König: Nein, die Anmeldung ist kostenlos.\nAna: Wunderbar. Dann fange ich gleich an.",
    instruction: "Sie hören ein Gespräch auf einem Amt. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Was hat Ana vergessen mitzubringen?",
        options: ["Den Reisepass", "Das Anmeldeformular", "Den Mietvertrag"],
        correct: 1,
        explanation: "'das ausgefüllte Anmeldeformular' — Ana doldurulmuş kayıt formunu getirmeyi unutmuş.",
      },
      {
        id: 2,
        question: "Was muss Ana im Formular angeben?",
        options: ["Nur Name und Adresse", "Name, Geburtsdatum, Adresse und Staatsangehörigkeit", "Nur die neue Adresse"],
        correct: 1,
        explanation: "Name, Geburtsdatum, alte und neue Adresse und Staatsangehörigkeit — dört bilgi gerekiyor.",
      },
      {
        id: 3,
        question: "Wie lange dauert das Ausfüllen?",
        options: ["Etwa 2 Minuten", "Etwa 5 Minuten", "Etwa 15 Minuten"],
        correct: 1,
        explanation: "'Etwa fünf Minuten' — form doldurmak yaklaşık 5 dakika sürer.",
      },
      {
        id: 4,
        question: "Wann bekommt Ana die Meldebestätigung?",
        options: ["In drei Tagen", "Per Post", "Sofort, noch heute"],
        correct: 2,
        explanation: "'Sofort, noch heute. Sie können sie direkt mitnehmen' — adres tescil belgesi bugün hemen veriliyor.",
      },
      {
        id: 5,
        question: "Was kostet die Anmeldung?",
        options: ["5 Euro", "10 Euro", "Nichts"],
        correct: 2,
        explanation: "'die Anmeldung ist kostenlos' — adres tescili ücretsiz.",
      },
    ],
    xp: 50,
  },

  // ── A2 — Teile 24–30: Informationen ──────────────────────────────────────

  {
    id: 24,
    type: "informationen",
    typeLabel: "Radio-Interview",
    typeLabelTr: "Radyo Röportajı",
    title: "Deutsch lernen in Deutschland",
    difficulty: 2,
    maleSpeakers: ["Moderator"],
    audioText:
      "Moderator: Willkommen bei Radio Köln! Heute haben wir Fatima Yıldız zu Gast. Sie ist vor zwei Jahren aus der Türkei nach Deutschland gezogen. Fatima, warum haben Sie sich für Deutschland entschieden?\nFatima: Mein Mann arbeitet hier als Ingenieur. Deshalb sind wir nach Köln gezogen.\nModerator: Wie war Ihr Deutsch, als Sie ankamen?\nFatima: Ich konnte nur ein bisschen Deutsch. Ich habe A1 gemacht, aber das war nicht genug für den Alltag.\nModerator: Was haben Sie dann gemacht?\nFatima: Ich habe sofort einen Integrationskurs besucht. Der Kurs war dreimal in der Woche, immer morgens von neun bis zwölf Uhr.\nModerator: Hat der Kurs geholfen?\nFatima: Sehr! Nach sechs Monaten konnte ich gut einkaufen, Arzttermine machen und mit Nachbarn sprechen.\nModerator: Was war am schwierigsten?\nFatima: Die deutschen Artikel! Der, die, das — das ist wirklich schwer.\nModerator: Was machen Sie jetzt?\nFatima: Ich arbeite als Köchin in einem kleinen Restaurant. Und nebenbei mache ich jetzt B2.\nModerator: Das ist wunderbar! Vielen Dank, Fatima.\nFatima: Danke schön!",
    instruction: "Sie hören ein Radio-Interview. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Warum ist Fatima nach Deutschland gezogen?",
        options: ["Sie wollte dort studieren.", "Ihr Mann arbeitet dort als Ingenieur.", "Sie hat dort Verwandte."],
        correct: 1,
        explanation: "'Mein Mann arbeitet hier als Ingenieur' — eşi mühendis olarak çalıştığı için taşınmışlar.",
      },
      {
        id: 2,
        question: "Wie oft war der Integrationskurs in der Woche?",
        options: ["Zweimal", "Dreimal", "Fünfmal"],
        correct: 1,
        explanation: "'Der Kurs war dreimal in der Woche' — entegrasyon kursu haftada 3 gün.",
      },
      {
        id: 3,
        question: "Was fand Fatima am schwierigsten?",
        options: ["Die deutschen Zahlen", "Die deutschen Artikel", "Die deutsche Aussprache"],
        correct: 1,
        explanation: "'Die deutschen Artikel! Der, die, das — das ist wirklich schwer.' — Almanca artikeller.",
      },
      {
        id: 4,
        question: "Was macht Fatima jetzt beruflich?",
        options: ["Sie ist Lehrerin.", "Sie ist Ärztin.", "Sie ist Köchin."],
        correct: 2,
        explanation: "'Ich arbeite als Köchin in einem kleinen Restaurant.' — küçük bir restorantta aşçı.",
      },
      {
        id: 5,
        question: "Welchen Deutschkurs macht Fatima jetzt?",
        options: ["A2", "B1", "B2"],
        correct: 2,
        explanation: "'jetzt mache ich B2' — şu anda B2 kursu yapıyor.",
      },
    ],
    xp: 50,
  },
  {
    id: 25,
    type: "informationen",
    typeLabel: "Radio-Interview",
    typeLabelTr: "Radyo Röportajı",
    title: "Gesund leben",
    difficulty: 2,
    maleSpeakers: ["Moderator"],
    audioText:
      "Moderator: Willkommen bei Fit im Alltag! Unser Gast heute ist Dr. Sandra Koch, Allgemeinmedizinerin aus Frankfurt. Dr. Koch, was ist der häufigste Fehler beim Thema Gesundheit?\nDr. Koch: Der größte Fehler ist definitiv zu wenig Bewegung. Die meisten meiner Patienten sitzen täglich acht bis zehn Stunden am Computer.\nModerator: Wie viel Bewegung braucht man pro Tag?\nDr. Koch: Die WHO empfiehlt mindestens dreißig Minuten moderate Bewegung täglich. Das kann ein Spaziergang sein, Fahrradfahren oder Schwimmen.\nModerator: Was ist mit Ernährung?\nDr. Koch: Auch sehr wichtig. Weniger Zucker und mehr Obst, Gemüse und Vollkornprodukte. Und bitte genug Wasser trinken — mindestens eineinhalb Liter täglich.\nModerator: Wie wichtig ist Schlaf?\nDr. Koch: Sehr wichtig! Erwachsene brauchen sieben bis acht Stunden pro Nacht. Schlafmangel schwächt das Immunsystem.\nModerator: Ein letzter Tipp?\nDr. Koch: Stress reduzieren! Meditation, Yoga oder ein Hobby helfen sehr.\nModerator: Vielen Dank, Dr. Koch!",
    instruction: "Sie hören ein Radio-Interview über Gesundheit. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Was ist der häufigste Fehler laut Dr. Koch?",
        options: ["Zu viel essen", "Zu wenig Bewegung", "Zu wenig schlafen"],
        correct: 1,
        explanation: "'Der größte Fehler ist definitiv zu wenig Bewegung' — en büyük hata yetersiz hareket.",
      },
      {
        id: 2,
        question: "Wie viel Bewegung empfiehlt die WHO pro Tag?",
        options: ["15 Minuten", "30 Minuten", "60 Minuten"],
        correct: 1,
        explanation: "'mindestens dreißig Minuten moderate Bewegung täglich' — günde en az 30 dakika.",
      },
      {
        id: 3,
        question: "Wie viel Wasser soll man täglich trinken?",
        options: ["Mindestens 1 Liter", "Mindestens 1,5 Liter", "Mindestens 3 Liter"],
        correct: 1,
        explanation: "'mindestens eineinhalb Liter täglich' — günde en az 1,5 litre su.",
      },
      {
        id: 4,
        question: "Wie viele Stunden Schlaf brauchen Erwachsene?",
        options: ["5–6 Stunden", "7–8 Stunden", "9–10 Stunden"],
        correct: 1,
        explanation: "'sieben bis acht Stunden pro Nacht' — yetişkinler 7-8 saat uyumalı.",
      },
      {
        id: 5,
        question: "Was empfiehlt Dr. Koch gegen Stress?",
        options: ["Mehr Arbeit", "Meditation, Yoga oder ein Hobby", "Medikamente"],
        correct: 1,
        explanation: "'Meditation, Yoga oder ein Hobby helfen sehr' — meditasyon, yoga veya hobi stresi azaltır.",
      },
    ],
    xp: 50,
  },
  {
    id: 26,
    type: "informationen",
    typeLabel: "Radio-Interview",
    typeLabelTr: "Radyo Röportajı",
    title: "Deutsche Feste",
    difficulty: 2,
    maleSpeakers: ["Moderatorin", "Prof. Berger"],
    audioText:
      "Moderatorin: Willkommen bei Deutschland entdecken! Heute geht es um typisch deutsche Feste. Mit mir spricht Prof. Hans Berger, Kulturwissenschaftler. Professor Berger, welches Fest ist das bekannteste?\nProf. Berger: Das Oktoberfest in München natürlich! Es findet Ende September bis Anfang Oktober statt und dauert sechzehn Tage. Jedes Jahr kommen über sechs Millionen Besucher.\nModeratorin: Was macht das Oktoberfest besonders?\nProf. Berger: Das Bier, die Tracht — Dirndl und Lederhosen — und die Musik. Es ist ein Volksfest mit Fahrgeschäften und traditionellem Essen wie Brezeln und Würstchen.\nModeratorin: Welche anderen Feste sind typisch deutsch?\nProf. Berger: Karneval in Köln und Düsseldorf — da verkleiden sich die Leute und feiern auf den Straßen. Und Weihnachtsmärkte, die im Dezember in jeder Stadt stattfinden.\nModeratorin: Sind diese Feste auch für Touristen interessant?\nProf. Berger: Sehr! Millionen Touristen kommen speziell für diese Feste nach Deutschland.\nModeratorin: Danke, Professor Berger!",
    instruction: "Sie hören ein Radio-Interview über deutsche Feste. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Wie lange dauert das Oktoberfest?",
        options: ["8 Tage", "12 Tage", "16 Tage"],
        correct: 2,
        explanation: "'dauert sechzehn Tage' — Oktoberfest 16 gün sürer.",
      },
      {
        id: 2,
        question: "Wie viele Besucher kommen jedes Jahr zum Oktoberfest?",
        options: ["Über 2 Millionen", "Über 4 Millionen", "Über 6 Millionen"],
        correct: 2,
        explanation: "'über sechs Millionen Besucher' — her yıl 6 milyondan fazla ziyaretçi gelir.",
      },
      {
        id: 3,
        question: "Was ist typische Kleidung beim Oktoberfest?",
        options: ["Anzug und Krawatte", "Dirndl und Lederhosen", "Jeans und T-Shirt"],
        correct: 1,
        explanation: "'Dirndl und Lederhosen' — geleneksel Bayern kıyafetleri.",
      },
      {
        id: 4,
        question: "Wo findet der Karneval statt?",
        options: ["In Berlin und Hamburg", "In Köln und Düsseldorf", "In München und Stuttgart"],
        correct: 1,
        explanation: "'Karneval in Köln und Düsseldorf' — Karneval, Köln ve Düsseldorf'ta kutlanır.",
      },
      {
        id: 5,
        question: "Wann finden Weihnachtsmärkte statt?",
        options: ["Im November", "Im Dezember", "Im Januar"],
        correct: 1,
        explanation: "'Weihnachtsmärkte, die im Dezember in jeder Stadt stattfinden' — Aralık ayında.",
      },
    ],
    xp: 50,
  },
  {
    id: 27,
    type: "informationen",
    typeLabel: "Radio-Interview",
    typeLabelTr: "Radyo Röportajı",
    title: "Öffentlicher Nahverkehr",
    difficulty: 2,
    maleSpeakers: ["Moderator"],
    audioText:
      "Moderator: Heute in unserer Sendung Mobil in Deutschland sprechen wir über den öffentlichen Nahverkehr. Zu Gast ist Verkehrsexpertin Dr. Petra Weiß. Dr. Weiß, wie gut ist der ÖPNV in Deutschland?\nDr. Weiß: In Großstädten wie Berlin, München oder Hamburg ist er sehr gut. U-Bahn, S-Bahn, Bus und Tram — alles ist gut vernetzt.\nModerator: Was kostet ein Monatsticket in München?\nDr. Weiß: Etwa fünfundneunzig Euro für das Stadtgebiet. In kleineren Städten ist es günstiger.\nModerator: Was ist das Deutschlandticket?\nDr. Weiß: Für neunundvierzig Euro im Monat kann man alle Nahverkehrsmittel in ganz Deutschland nutzen. Bus, Bahn, U-Bahn und Tram, überall.\nModerator: Hat der ÖPNV auch Schwächen?\nDr. Weiß: Ja, auf dem Land ist die Anbindung oft schlecht. Und pünktlich ist der Zug nicht immer — das ist ein bekanntes Problem.\nModerator: Vielen Dank, Dr. Weiß!",
    instruction: "Sie hören ein Radio-Interview über den öffentlichen Nahverkehr. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "In welchen Städten ist der ÖPNV besonders gut?",
        options: ["In kleinen Dörfern", "In Großstädten wie Berlin und München", "Auf dem Land"],
        correct: 1,
        explanation: "'In Großstädten wie Berlin, München oder Hamburg ist er sehr gut' — büyük şehirlerde toplu taşıma iyi.",
      },
      {
        id: 2,
        question: "Was kostet ein Monatsticket in München?",
        options: ["Etwa 65 Euro", "Etwa 95 Euro", "Etwa 125 Euro"],
        correct: 1,
        explanation: "'Etwa fünfundneunzig Euro für das Stadtgebiet' — Münih'te aylık bilet yaklaşık 95 €.",
      },
      {
        id: 3,
        question: "Was ist das Deutschlandticket?",
        options: ["Ein Ticket nur für Fernzüge", "Ein Ticket für alle Nahverkehrsmittel in Deutschland", "Ein Ticket für Touristen"],
        correct: 1,
        explanation: "'alle Nahverkehrsmittel in ganz Deutschland nutzen' — tüm yerel taşımacılık araçları için geçerli.",
      },
      {
        id: 4,
        question: "Wie viel kostet das Deutschlandticket?",
        options: ["29 Euro", "49 Euro", "99 Euro"],
        correct: 1,
        explanation: "'neunundvierzig Euro im Monat' — Almanya bileti aylık 49 €.",
      },
      {
        id: 5,
        question: "Was ist eine Schwäche des ÖPNV?",
        options: ["Es ist zu teuer.", "Schlechte Anbindung auf dem Land und Unpünktlichkeit", "Es gibt zu wenige Busse in Städten."],
        correct: 1,
        explanation: "'auf dem Land ist die Anbindung oft schlecht' ve 'pünktlich ist der Zug nicht immer' — iki zayıflık.",
      },
    ],
    xp: 50,
  },
  {
    id: 28,
    type: "informationen",
    typeLabel: "Radio-Interview",
    typeLabelTr: "Radyo Röportajı",
    title: "Arbeit und Beruf",
    difficulty: 2,
    maleSpeakers: ["Moderatorin", "Herr Neumann"],
    audioText:
      "Moderatorin: Heute spreche ich mit Berufsberater Klaus Neumann über den deutschen Arbeitsmarkt. Herr Neumann, welche Berufe sind besonders gefragt?\nHerr Neumann: Momentan suchen wir dringend Pflegekräfte, Ärzte, Ingenieure und IT-Experten. Das sind die größten Lücken.\nModeratorin: Wie hoch ist der durchschnittliche Lohn in Deutschland?\nHerr Neumann: Der durchschnittliche Bruttolohn liegt bei etwa dreitausendneunhundert Euro pro Monat. Das variiert stark nach Beruf und Region.\nModeratorin: Was ist der gesetzliche Mindestlohn?\nHerr Neumann: Aktuell zwölf Euro fünfzig pro Stunde. Das ist eine wichtige Untergrenze.\nModeratorin: Was raten Sie Menschen, die in Deutschland arbeiten möchten?\nHerr Neumann: Erstens: Sprachkenntnisse sind entscheidend. Ohne Deutsch ist es sehr schwer. Zweitens: Lassen Sie Ihre Abschlüsse anerkennen.\nModeratorin: Gibt es Hilfe für Neuankömmlinge?\nHerr Neumann: Ja, die Bundesagentur für Arbeit bietet kostenlose Beratung und Kurse an.\nModeratorin: Herzlichen Dank, Herr Neumann!",
    instruction: "Sie hören ein Radio-Interview über Arbeit und Beruf. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Welche Berufe sind laut Herrn Neumann besonders gefragt?",
        options: ["Lehrer und Künstler", "Pflegekräfte, Ärzte, Ingenieure, IT-Experten", "Verkäufer und Kassierer"],
        correct: 1,
        explanation: "'Pflegekräfte, Ärzte, Ingenieure und IT-Experten' — bu mesleklerde büyük açık var.",
      },
      {
        id: 2,
        question: "Wie hoch ist der durchschnittliche Bruttolohn?",
        options: ["Etwa 2.500 Euro", "Etwa 3.900 Euro", "Etwa 5.000 Euro"],
        correct: 1,
        explanation: "'etwa dreitausendneunhundert Euro pro Monat' — ortalama brüt maaş yaklaşık 3.900 €.",
      },
      {
        id: 3,
        question: "Wie hoch ist der Mindestlohn pro Stunde?",
        options: ["10,50 Euro", "12,50 Euro", "15,00 Euro"],
        correct: 1,
        explanation: "'Aktuell zwölf Euro fünfzig pro Stunde' — asgari ücret saate 12,50 €.",
      },
      {
        id: 4,
        question: "Was ist der erste Rat für Menschen, die in Deutschland arbeiten möchten?",
        options: ["Viel Geld sparen", "Deutsch lernen", "Eine Wohnung finden"],
        correct: 1,
        explanation: "'Sprachkenntnisse sind entscheidend. Ohne Deutsch ist es sehr schwer.' — Almanca öğrenmek şart.",
      },
      {
        id: 5,
        question: "Wer bietet kostenlose Beratung für Neuankömmlinge?",
        options: ["Das Finanzamt", "Die Bundesagentur für Arbeit", "Die Stadtverwaltung"],
        correct: 1,
        explanation: "'die Bundesagentur für Arbeit bietet kostenlose Beratung an' — Bundesagentur für Arbeit ücretsiz danışmanlık sunar.",
      },
    ],
    xp: 50,
  },
  {
    id: 29,
    type: "informationen",
    typeLabel: "Radio-Interview",
    typeLabelTr: "Radyo Röportajı",
    title: "Familie in Deutschland",
    difficulty: 2,
    maleSpeakers: ["Moderator"],
    audioText:
      "Moderator: Willkommen bei Familie heute! Heute spreche ich mit Soziologin Prof. Maria Huber über Familie in Deutschland. Prof. Huber, wie hat sich die Familie verändert?\nProf. Huber: Die Familie ist kleiner geworden. Früher hatten Familien drei oder vier Kinder, heute sind es durchschnittlich nur noch ein oder zwei.\nModerator: Was sind die größten Herausforderungen?\nProf. Huber: Die Vereinbarkeit von Beruf und Familie ist schwierig. Viele Eltern möchten arbeiten, aber es gibt zu wenig Kindergartenplätze.\nModerator: Was bekommt man in Deutschland für Kinder?\nProf. Huber: Es gibt das Kindergeld — zweihundertfünfzig Euro pro Monat für jedes Kind. Das ist eine wichtige Unterstützung.\nModerator: Wie lange kann man Elternzeit nehmen?\nProf. Huber: Eltern haben das Recht auf bis zu drei Jahre Elternzeit. In dieser Zeit ist der Arbeitsplatz sicher.\nModerator: Was wünschen sich Familien?\nProf. Huber: Mehr Kindergartenplätze, flexiblere Arbeitszeiten und günstigere Wohnungen.\nModerator: Danke, Prof. Huber!",
    instruction: "Sie hören ein Radio-Interview über Familie in Deutschland. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Wie viele Kinder haben Familien in Deutschland heute durchschnittlich?",
        options: ["3–4 Kinder", "1–2 Kinder", "5 oder mehr Kinder"],
        correct: 1,
        explanation: "'heute sind es durchschnittlich nur noch ein oder zwei' — ortalama 1-2 çocuk.",
      },
      {
        id: 2,
        question: "Was ist ein großes Problem für Familien?",
        options: ["Zu wenig Geld", "Zu wenig Kindergartenplätze", "Zu wenig Schulen"],
        correct: 1,
        explanation: "'es gibt zu wenig Kindergartenplätze' — kreş yeri yetersizliği büyük problem.",
      },
      {
        id: 3,
        question: "Wie viel Kindergeld gibt es pro Kind?",
        options: ["150 Euro", "250 Euro", "350 Euro"],
        correct: 1,
        explanation: "'zweihundertfünfzig Euro pro Monat für jedes Kind' — her çocuk için aylık 250 € çocuk parası.",
      },
      {
        id: 4,
        question: "Wie lange darf man Elternzeit nehmen?",
        options: ["Bis zu 1 Jahr", "Bis zu 2 Jahre", "Bis zu 3 Jahre"],
        correct: 2,
        explanation: "'bis zu drei Jahre Elternzeit' — ebeveyn izni en fazla 3 yıl.",
      },
      {
        id: 5,
        question: "Was wünschen sich Familien?",
        options: ["Mehr Schulen und bessere Lehrer", "Mehr Kitas, flexiblere Arbeitszeiten, günstige Wohnungen", "Mehr öffentliche Parks"],
        correct: 1,
        explanation: "Üç dilek: daha fazla kreş, esnek çalışma saatleri ve uygun fiyatlı konut.",
      },
    ],
    xp: 50,
  },
  {
    id: 30,
    type: "informationen",
    typeLabel: "Radio-Interview",
    typeLabelTr: "Radyo Röportajı",
    title: "Essen und Kochen",
    difficulty: 3,
    maleSpeakers: ["Moderator"],
    audioText:
      "Moderator: Willkommen bei Essen und Trinken! Zu Gast ist Köchin und Buchautorin Julia Schwarz. Frau Schwarz, was ist typisch deutsche Küche?\nJulia: Deutsche Küche ist deftig und bodenständig. Denken Sie an Bratwurst, Sauerkraut, Schnitzel und Kartoffeln in allen Variationen.\nModerator: Hat sich die deutsche Küche verändert?\nJulia: Absolut! Deutschland ist ein Einwanderungsland, und das merkt man in der Küche. Döner Kebab wurde in Deutschland erfunden und ist das beliebteste Fast Food.\nModerator: Was kochen die Deutschen zu Hause?\nJulia: Laut Studien kocht ein Drittel der Deutschen täglich frisch. Ein weiteres Drittel kocht ein bis zweimal pro Woche.\nModerator: Gibt es regionale Unterschiede?\nJulia: Ja, sehr! Bayern hat Weißwurst und Brezeln. Im Norden gibt es viel Fisch. Im Rheinland: Sauerbraten.\nModerator: Was ist Ihr Lieblingsrezept für Anfänger?\nJulia: Kartoffelsuppe! Kartoffeln kochen, pürieren, Gewürze und Sahne dazu — fertig. Einfach, günstig und lecker.\nModerator: Vielen Dank, Frau Schwarz!",
    instruction: "Sie hören ein Radio-Interview über Essen und Kochen. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Wie beschreibt Julia Schwarz die deutsche Küche?",
        options: ["Leicht und frisch", "Deftig und bodenständig", "Scharf und exotisch"],
        correct: 1,
        explanation: "'deftig und bodenständig' = ağır ve geleneksel. Bratwurst, Schnitzel, Kartoffeln.",
      },
      {
        id: 2,
        question: "Was ist das beliebteste Fast Food in Deutschland?",
        options: ["Hamburger", "Döner Kebab", "Pizza"],
        correct: 1,
        explanation: "'Döner Kebab wurde in Deutschland erfunden und ist das beliebteste Fast Food' — Döner Kebab Almanya'da icat edildi.",
      },
      {
        id: 3,
        question: "Wie oft kocht ein Drittel der Deutschen?",
        options: ["Nie", "Täglich frisch", "Nur am Wochenende"],
        correct: 1,
        explanation: "'kocht ein Drittel der Deutschen täglich frisch' — üçte biri her gün taze pişiriyor.",
      },
      {
        id: 4,
        question: "Was ist eine typische Spezialität aus Bayern?",
        options: ["Sauerbraten", "Fischbrötchen", "Weißwurst und Brezeln"],
        correct: 2,
        explanation: "'Bayern hat Weißwurst und Brezeln' — Bavyera'nın geleneksel yemeği.",
      },
      {
        id: 5,
        question: "Was empfiehlt Julia Schwarz für Kochanfänger?",
        options: ["Schnitzel", "Kartoffelsuppe", "Sauerbraten"],
        correct: 1,
        explanation: "'Kartoffelsuppe! Einfach, günstig und lecker' — patates çorbası kolay, ucuz ve lezzetli.",
      },
    ],
    xp: 60,
  },
];

// ── B1 — Teile 1–30 ───────────────────────────────────────────────────────────

const B1_TEILE: HorenTeil[] = [
  // ── Teil 1: Ansagen — Haushalt & Familie ─────────────────────────────────
  {
    id: 1,
    type: "ansagen",
    typeLabel: "Kurztexte",
    typeLabelTr: "Kısa Metinler",
    title: "Haushalt und Familie",
    difficulty: 2,
    questionFormat: "richtigfalsch",
    instruction: "Sie hören fünf kurze Texte. Entscheiden Sie: Ist die Aussage richtig oder falsch?",
    questions: [
      {
        id: 1,
        shortAudio: "Ich heiße Sandra und mein Mann Klaus und ich teilen uns die Hausarbeit gleichmäßig auf. Er kocht jeden Abend, weil er das gerne macht, und ich übernehme dafür den Einkauf und die Wäsche. Wir finden, das ist eine faire Lösung.",
        question: "Sandra und ihr Mann haben die Hausarbeit fair aufgeteilt.",
        correct: 0,
        explanation: "Richtig. Sandra macht Einkauf und Wäsche, Klaus kocht — eine gleichmäßige Aufteilung.",
      },
      {
        id: 2,
        shortAudio: "Mein Name ist Thomas. Früher hat meine Frau alles im Haushalt gemacht. Seit ich in Rente bin, helfe ich ihr viel mehr. Ich sauge Staub, putze die Fenster und gehe manchmal auch einkaufen.",
        question: "Thomas hat schon immer viel im Haushalt geholfen.",
        correct: 1,
        explanation: "Falsch. Thomas hilft erst seit seiner Rente mehr im Haushalt.",
      },
      {
        id: 3,
        shortAudio: "Ich bin Lena, 28 Jahre alt und Mutter von zwei Kindern. Ich arbeite halbtags und mache nebenbei fast den gesamten Haushalt. Mein Mann arbeitet Vollzeit und hat kaum Zeit für die Kinder oder den Haushalt.",
        question: "Lena ist mit der Haushaltsaufteilung zufrieden.",
        correct: 1,
        explanation: "Falsch. Lena macht trotz Teilzeitjob fast alles alleine — das klingt nicht zufriedenstellend.",
      },
      {
        id: 4,
        shortAudio: "Ich bin Martin. Meine Frau und ich haben beide Vollzeitjobs. Deshalb haben wir uns entschieden, eine Putzfrau zu engagieren, die zweimal pro Woche kommt. So haben wir am Wochenende mehr Zeit füreinander.",
        question: "Martin und seine Frau haben eine Reinigungskraft eingestellt.",
        correct: 0,
        explanation: "Richtig. Eine Putzfrau kommt zweimal pro Woche.",
      },
      {
        id: 5,
        shortAudio: "Hallo, ich bin Julia. Bei uns zu Hause helfen auch die Kinder mit. Mein Sohn ist zwölf und saugt jeden Samstag Staub. Meine Tochter, sie ist vierzehn, spült das Geschirr und hilft beim Kochen.",
        question: "Julias Kinder müssen keine Hausarbeit machen.",
        correct: 1,
        explanation: "Falsch. Beide Kinder haben feste Aufgaben im Haushalt.",
      },
    ],
    xp: 50,
  },

  // ── Teil 2: Ansagen — Reisen & Transport ────────────────────────────────
  {
    id: 2,
    type: "ansagen",
    typeLabel: "Kurztexte",
    typeLabelTr: "Kısa Metinler",
    title: "Reisen und Transport",
    difficulty: 2,
    questionFormat: "richtigfalsch",
    instruction: "Sie hören fünf kurze Texte über Reisen. Entscheiden Sie: richtig oder falsch?",
    questions: [
      {
        id: 1,
        shortAudio: "Achtung, liebe Reisende! Der ICE 512 von Berlin nach München hat heute aufgrund eines technischen Defekts etwa vierzig Minuten Verspätung. Wir bitten um Ihr Verständnis und entschuldigen uns für die Unannehmlichkeiten.",
        question: "Der Zug nach München kommt pünktlich an.",
        correct: 1,
        explanation: "Falsch. Der ICE hat 40 Minuten Verspätung wegen eines technischen Defekts.",
      },
      {
        id: 2,
        shortAudio: "Ich fahre immer mit dem Fahrrad zur Arbeit, das sind ungefähr acht Kilometer. Das dauert etwa zwanzig Minuten. Mit dem Auto würde ich wegen der Staus mindestens dreißig Minuten brauchen.",
        question: "Mit dem Fahrrad braucht der Sprecher länger zur Arbeit als mit dem Auto.",
        correct: 1,
        explanation: "Falsch. Mit dem Fahrrad dauert es 20 Minuten, mit dem Auto mindestens 30 Minuten.",
      },
      {
        id: 3,
        shortAudio: "Für unseren Sommerurlaub haben wir ein Ferienhaus in der Toskana gemietet. Wir fahren mit dem Auto, weil wir unseren Hund mitnehmen möchten und das Flugzeug für Tiere zu stressig wäre.",
        question: "Die Familie fährt mit dem Flugzeug in den Urlaub.",
        correct: 1,
        explanation: "Falsch. Sie fahren mit dem Auto, weil sie einen Hund mitnehmen.",
      },
      {
        id: 4,
        shortAudio: "Die neue Stadtbahn-Linie 7 verbindet jetzt den Hauptbahnhof mit dem Flughafen in nur zwölf Minuten. Die Fahrt kostet vier Euro fünfzig. Sie fährt täglich von fünf Uhr morgens bis Mitternacht.",
        question: "Die neue Stadtbahn-Linie 7 verbindet Hauptbahnhof und Flughafen.",
        correct: 0,
        explanation: "Richtig. Die Linie 7 verbindet Hauptbahnhof und Flughafen in 12 Minuten.",
      },
      {
        id: 5,
        shortAudio: "Wegen der Bauarbeiten auf der Autobahn A9 empfehlen wir Ihnen, die Ausfahrt Nürnberg-Nord zu nehmen und über die Bundesstraße 2 zu fahren. Die Umleitung ist etwa fünfzehn Kilometer länger.",
        question: "Die Umleitung ist kürzer als der normale Weg.",
        correct: 1,
        explanation: "Falsch. Die Umleitung ist etwa 15 Kilometer länger.",
      },
    ],
    xp: 50,
  },

  // ── Teil 3: Ansagen — Beruf & Arbeit ─────────────────────────────────────
  {
    id: 3,
    type: "ansagen",
    typeLabel: "Kurztexte",
    typeLabelTr: "Kısa Metinler",
    title: "Beruf und Arbeitswelt",
    difficulty: 2,
    questionFormat: "richtigfalsch",
    instruction: "Sie hören fünf kurze Texte über das Arbeitsleben. Entscheiden Sie: richtig oder falsch?",
    questions: [
      {
        id: 1,
        shortAudio: "Ich arbeite seit fünf Jahren als Krankenpfleger. Der Beruf ist anstrengend, aber er macht mir sehr viel Freude. Besonders schön finde ich es, wenn Patienten sich erholen und nach Hause gehen können.",
        question: "Der Sprecher arbeitet gerne als Krankenpfleger.",
        correct: 0,
        explanation: "Richtig. Er findet den Beruf schön, besonders wenn Patienten gesund werden.",
      },
      {
        id: 2,
        shortAudio: "In unserem Unternehmen haben wir seit letztem Jahr Homeoffice eingeführt. Die Mitarbeiter können an zwei Tagen pro Woche von zu Hause arbeiten. Die meisten sind sehr zufrieden damit.",
        question: "Die Mitarbeiter dürfen jeden Tag von zu Hause arbeiten.",
        correct: 1,
        explanation: "Falsch. Homeoffice ist nur an zwei Tagen pro Woche möglich.",
      },
      {
        id: 3,
        shortAudio: "Ich habe meinen Job als Buchhalterin verloren, weil die Firma geschlossen hat. Jetzt suche ich seit drei Monaten eine neue Stelle. Das ist schwieriger als ich dachte, aber ich bleibe optimistisch.",
        question: "Die Sprecherin hat selbst gekündigt.",
        correct: 1,
        explanation: "Falsch. Sie hat ihren Job verloren, weil die Firma geschlossen hat.",
      },
      {
        id: 4,
        shortAudio: "Für die Stelle als Projektmanager suchen wir jemanden mit mindestens fünf Jahren Berufserfahrung, guten Englischkenntnissen und der Bereitschaft zu gelegentlichen Dienstreisen. Das Gehalt ist verhandelbar.",
        question: "Für die Stelle werden Kenntnisse in zwei Fremdsprachen verlangt.",
        correct: 1,
        explanation: "Falsch. Nur gute Englischkenntnisse werden gefordert, keine zweite Fremdsprache.",
      },
      {
        id: 5,
        shortAudio: "Die Arbeitslosenquote in Deutschland ist im letzten Quartal leicht gesunken und liegt jetzt bei fünf Komma zwei Prozent. Besonders in der IT-Branche und im Pflegebereich werden viele Fachkräfte gesucht.",
        question: "Die Arbeitslosenquote ist gestiegen.",
        correct: 1,
        explanation: "Falsch. Die Arbeitslosenquote ist leicht gesunken.",
      },
    ],
    xp: 50,
  },

  // ── Teil 4: Ansagen — Gesundheit ──────────────────────────────────────────
  {
    id: 4,
    type: "ansagen",
    typeLabel: "Kurztexte",
    typeLabelTr: "Kısa Metinler",
    title: "Gesundheit und Wohlbefinden",
    difficulty: 2,
    questionFormat: "richtigfalsch",
    instruction: "Sie hören fünf kurze Texte über Gesundheitsthemen. Entscheiden Sie: richtig oder falsch?",
    questions: [
      {
        id: 1,
        shortAudio: "Regelmäßige Bewegung ist wichtig für die Gesundheit. Experten empfehlen mindestens dreißig Minuten Sport an fünf Tagen pro Woche. Dabei spielt es keine Rolle, ob man joggt, schwimmt oder Fahrrad fährt.",
        question: "Laut Experten reichen zehn Minuten Sport pro Tag.",
        correct: 1,
        explanation: "Falsch. Empfohlen werden mindestens 30 Minuten an fünf Tagen pro Woche.",
      },
      {
        id: 2,
        shortAudio: "Unsere Zahnarztpraxis ist ab sofort auch samstags von neun bis dreizehn Uhr geöffnet. Termine können Sie telefonisch oder online vereinbaren. Für Notfälle stehen wir auch außerhalb der Sprechzeiten zur Verfügung.",
        question: "Die Zahnarztpraxis hat am Samstag geöffnet.",
        correct: 0,
        explanation: "Richtig. Samstags von 9 bis 13 Uhr.",
      },
      {
        id: 3,
        shortAudio: "Ich habe letztes Jahr aufgehört zu rauchen und das war die beste Entscheidung meines Lebens. Ich fühle mich viel fitter, meine Haut sieht besser aus und ich spare monatlich über zweihundert Euro.",
        question: "Der Sprecher raucht noch.",
        correct: 1,
        explanation: "Falsch. Er hat letztes Jahr aufgehört zu rauchen.",
      },
      {
        id: 4,
        shortAudio: "Zu wenig Schlaf kann langfristig ernsthafte gesundheitliche Folgen haben. Studien zeigen, dass Menschen, die regelmäßig weniger als sechs Stunden schlafen, ein höheres Risiko für Herzerkrankungen und Diabetes haben.",
        question: "Schlafmangel kann das Risiko für Herzerkrankungen erhöhen.",
        correct: 0,
        explanation: "Richtig. Regelmäßig weniger als 6 Stunden Schlaf erhöht das Risiko für Herzerkrankungen.",
      },
      {
        id: 5,
        shortAudio: "Die Grippeimpfung wird besonders für ältere Menschen über sechzig Jahre und für chronisch Kranke empfohlen. Die Krankenkasse übernimmt in der Regel die Kosten für die Impfung.",
        question: "Die Grippeimpfung kostet bei der Krankenkasse nichts.",
        correct: 0,
        explanation: "Richtig. Die Krankenkasse übernimmt in der Regel die Kosten.",
      },
    ],
    xp: 50,
  },

  // ── Teil 5: Ansagen — Umwelt & Natur ──────────────────────────────────────
  {
    id: 5,
    type: "ansagen",
    typeLabel: "Kurztexte",
    typeLabelTr: "Kısa Metinler",
    title: "Umwelt und Klimaschutz",
    difficulty: 3,
    questionFormat: "richtigfalsch",
    instruction: "Sie hören fünf kurze Texte über Umweltthemen. Entscheiden Sie: richtig oder falsch?",
    questions: [
      {
        id: 1,
        shortAudio: "Die Stadt Frankfurt hat beschlossen, bis 2035 klimaneutral zu werden. Dazu sollen erneuerbare Energien ausgebaut und der öffentliche Nahverkehr verbessert werden. Außerdem werden Bürger mit Prämien für den Kauf von Elektroautos unterstützt.",
        question: "Frankfurt möchte bis 2035 keine CO₂-Emissionen mehr haben.",
        correct: 0,
        explanation: "Richtig. Das Ziel ist Klimaneutralität bis 2035.",
      },
      {
        id: 2,
        shortAudio: "Plastikverpackungen sind ein großes Problem für die Umwelt. Jedes Jahr landen Millionen Tonnen Plastik im Meer. In der EU ist Einwegplastik seit 2021 verboten, zum Beispiel Plastikstrohhalme und Einwegbesteck.",
        question: "In der EU ist Einwegplastik seit 2019 verboten.",
        correct: 1,
        explanation: "Falsch. Das EU-Verbot gilt seit 2021, nicht seit 2019.",
      },
      {
        id: 3,
        shortAudio: "Immer mehr Deutsche kaufen biologisch angebaute Lebensmittel. Der Umsatz mit Bio-Produkten ist im letzten Jahr um zwölf Prozent gestiegen. Die Menschen achten mehr auf gesunde Ernährung und den Schutz der Umwelt.",
        question: "Der Kauf von Bio-Produkten ist in Deutschland gesunken.",
        correct: 1,
        explanation: "Falsch. Der Umsatz mit Bio-Produkten ist um 12% gestiegen.",
      },
      {
        id: 4,
        shortAudio: "Durch das Pfandsystem in Deutschland werden über neunzig Prozent der Plastikflaschen zurückgegeben und recycelt. Das Pfand beträgt in der Regel fünfundzwanzig Cent pro Flasche.",
        question: "Das Pfand beträgt normalerweise 25 Cent pro Flasche.",
        correct: 0,
        explanation: "Richtig. Das Pfand beträgt in der Regel 25 Cent.",
      },
      {
        id: 5,
        shortAudio: "Solarenergie ist eine der wichtigsten erneuerbaren Energiequellen in Deutschland. Immer mehr Haushalte installieren Solarpanele auf ihren Dächern. Die Kosten für Solaranlagen sind in den letzten Jahren stark gefallen.",
        question: "Solaranlagen sind in den letzten Jahren teurer geworden.",
        correct: 1,
        explanation: "Falsch. Die Kosten für Solaranlagen sind stark gefallen.",
      },
    ],
    xp: 55,
  },

  // ── Teil 6: Ansagen — Bildung & Schule ────────────────────────────────────
  {
    id: 6,
    type: "ansagen",
    typeLabel: "Kurztexte",
    typeLabelTr: "Kısa Metinler",
    title: "Bildung und Schule",
    difficulty: 2,
    questionFormat: "richtigfalsch",
    instruction: "Sie hören fünf kurze Texte über Bildungsthemen. Entscheiden Sie: richtig oder falsch?",
    questions: [
      {
        id: 1,
        shortAudio: "Unsere Volkshochschule bietet ab September neue Kurse an. Besonders beliebt sind die Sprachkurse und die EDV-Kurse für Senioren. Die Anmeldung ist ab sofort möglich, entweder persönlich oder auf unserer Webseite.",
        question: "Die Anmeldung für die Kurse ist nur persönlich möglich.",
        correct: 1,
        explanation: "Falsch. Man kann sich persönlich oder auf der Webseite anmelden.",
      },
      {
        id: 2,
        shortAudio: "Das duale Ausbildungssystem in Deutschland gilt weltweit als Vorbild. Auszubildende lernen gleichzeitig in einem Betrieb und in der Berufsschule. Die Ausbildung dauert je nach Beruf zwei bis dreieinhalb Jahre.",
        question: "Im dualen Ausbildungssystem lernen Azubis nur in der Schule.",
        correct: 1,
        explanation: "Falsch. Sie lernen sowohl im Betrieb als auch in der Berufsschule.",
      },
      {
        id: 3,
        shortAudio: "Die Pisa-Studie untersucht alle drei Jahre die Schulleistungen von Fünfzehnjährigen in verschiedenen Ländern. Getestet werden Lesekompetenz, Mathematik und Naturwissenschaften.",
        question: "Die Pisa-Studie findet jedes Jahr statt.",
        correct: 1,
        explanation: "Falsch. Die Studie findet alle drei Jahre statt.",
      },
      {
        id: 4,
        shortAudio: "Ich studiere im dritten Semester Betriebswirtschaft. Das Studium ist anspruchsvoll, aber ich bin froh, dass ich mich für dieses Fach entschieden habe. Neben dem Studium arbeite ich zwanzig Stunden pro Woche in einem Café.",
        question: "Die Sprecherin studiert und arbeitet gleichzeitig.",
        correct: 0,
        explanation: "Richtig. Sie studiert und arbeitet 20 Stunden pro Woche.",
      },
      {
        id: 5,
        shortAudio: "In Deutschland gibt es etwa zweitausend Hochschulen und Universitäten. Das Studium an staatlichen Hochschulen ist in den meisten Bundesländern gebührenfrei, abgesehen von einem Semesterbeitrag von etwa dreihundert Euro.",
        question: "Das Studium an staatlichen deutschen Hochschulen ist völlig kostenlos.",
        correct: 1,
        explanation: "Falsch. Es gibt einen Semesterbeitrag von etwa 300 Euro.",
      },
    ],
    xp: 50,
  },

  // ── Teil 7: Ansagen — Wohnen & Stadtleben ─────────────────────────────────
  {
    id: 7,
    type: "ansagen",
    typeLabel: "Kurztexte",
    typeLabelTr: "Kısa Metinler",
    title: "Wohnen und Stadtleben",
    difficulty: 2,
    questionFormat: "richtigfalsch",
    instruction: "Sie hören fünf kurze Texte über Wohnen und Stadtleben. Entscheiden Sie: richtig oder falsch?",
    questions: [
      {
        id: 1,
        shortAudio: "Die Mietpreise in deutschen Großstädten sind in den letzten zehn Jahren stark gestiegen. Besonders in München, Frankfurt und Hamburg ist es schwierig geworden, eine bezahlbare Wohnung zu finden.",
        question: "Die Mietpreise in deutschen Großstädten sind gesunken.",
        correct: 1,
        explanation: "Falsch. Die Mietpreise sind in den letzten zehn Jahren stark gestiegen.",
      },
      {
        id: 2,
        shortAudio: "Wir suchen eine Zweizimmerwohnung im Zentrum, maximal achthundert Euro warm. Wichtig ist uns, dass Haustiere erlaubt sind — wir haben eine Katze — und dass es einen Balkon gibt.",
        question: "Das Ehepaar sucht eine Wohnung mit Balkon.",
        correct: 0,
        explanation: "Richtig. Ein Balkon ist eine wichtige Anforderung.",
      },
      {
        id: 3,
        shortAudio: "In vielen deutschen Städten gibt es Gemeinschaftsgärten, sogenannte Urban-Gardening-Projekte. Dort können Stadtbewohner, die keinen eigenen Garten haben, gemeinsam Obst und Gemüse anbauen.",
        question: "Urban-Gardening-Projekte sind nur für Familien mit Kindern.",
        correct: 1,
        explanation: "Falsch. Alle Stadtbewohner ohne eigenen Garten können teilnehmen.",
      },
      {
        id: 4,
        shortAudio: "Unser Stadtrat hat beschlossen, mehr Fahrradwege zu bauen und den Autoverkehr im Zentrum zu reduzieren. Ab nächstem Jahr werden einige Straßen für Autos gesperrt und in Fußgängerzonen umgewandelt.",
        question: "Der Stadtrat plant mehr Fahrradwege zu bauen.",
        correct: 0,
        explanation: "Richtig. Es werden mehr Fahrradwege gebaut und der Autoverkehr reduziert.",
      },
      {
        id: 5,
        shortAudio: "Ich bin vor einem Jahr von einer Kleinstadt nach Berlin gezogen. Am Anfang war es schwierig, weil ich niemanden kannte. Jetzt habe ich viele Freunde gefunden und genieße die Möglichkeiten, die eine Großstadt bietet.",
        question: "Der Sprecher hatte keine Probleme nach dem Umzug nach Berlin.",
        correct: 1,
        explanation: "Falsch. Am Anfang war es schwierig, weil er niemanden kannte.",
      },
    ],
    xp: 50,
  },

  // ── Teil 8: Ansagen — Medien & Technologie ────────────────────────────────
  {
    id: 8,
    type: "ansagen",
    typeLabel: "Kurztexte",
    typeLabelTr: "Kısa Metinler",
    title: "Medien und Technologie",
    difficulty: 2,
    questionFormat: "richtigfalsch",
    instruction: "Sie hören fünf kurze Texte über Medien und Technologie. Entscheiden Sie: richtig oder falsch?",
    questions: [
      {
        id: 1,
        shortAudio: "Soziale Medien spielen heute eine große Rolle in der Kommunikation. Laut einer Studie verbringen Deutsche durchschnittlich zwei Stunden täglich auf Plattformen wie Instagram, Facebook oder TikTok.",
        question: "Deutsche verbringen durchschnittlich vier Stunden täglich in sozialen Medien.",
        correct: 1,
        explanation: "Falsch. Es sind durchschnittlich zwei Stunden täglich.",
      },
      {
        id: 2,
        shortAudio: "Unser neues Smartphone hat eine dreifach-Kamera mit fünfzig Megapixeln, zwölf Stunden Akkulaufzeit und ist wasserdicht bis zu zwei Metern Tiefe. Es ist ab nächsten Monat für achthundertneunundneunzig Euro erhältlich.",
        question: "Das neue Smartphone ist sofort erhältlich.",
        correct: 1,
        explanation: "Falsch. Es ist erst ab nächsten Monat erhältlich.",
      },
      {
        id: 3,
        shortAudio: "Streaming-Dienste haben das Fernsehen verändert. Immer mehr Menschen schauen Serien und Filme online, wann und wo sie möchten. Das klassische lineare Fernsehen verliert besonders bei jungen Menschen an Bedeutung.",
        question: "Streaming ist besonders bei älteren Menschen beliebter als klassisches Fernsehen.",
        correct: 1,
        explanation: "Falsch. Streaming verliert bei jungen Menschen das klassische Fernsehen — das bedeutet Streaming ist bei Jungen beliebter.",
      },
      {
        id: 4,
        shortAudio: "Künstliche Intelligenz wird in immer mehr Bereichen des Alltags eingesetzt: in der Medizin, in der Produktion und auch bei der Arbeit. Viele Experten sind sich einig, dass KI die Arbeitswelt grundlegend verändern wird.",
        question: "Experten glauben, dass KI die Arbeitswelt verändern wird.",
        correct: 0,
        explanation: "Richtig. Viele Experten sind sich einig, dass KI die Arbeitswelt grundlegend verändern wird.",
      },
      {
        id: 5,
        shortAudio: "Datenschutz ist ein wichtiges Thema in Deutschland. Das Bundesdatenschutzgesetz regelt, wie Unternehmen mit persönlichen Daten umgehen dürfen. Verstöße können mit hohen Bußgeldern bestraft werden.",
        question: "In Deutschland gibt es keine Gesetze zum Datenschutz.",
        correct: 1,
        explanation: "Falsch. Das Bundesdatenschutzgesetz regelt den Umgang mit persönlichen Daten.",
      },
    ],
    xp: 50,
  },

  // ── Teil 9: Ansagen — Sport & Freizeit ────────────────────────────────────
  {
    id: 9,
    type: "ansagen",
    typeLabel: "Kurztexte",
    typeLabelTr: "Kısa Metinler",
    title: "Sport und Freizeit",
    difficulty: 2,
    questionFormat: "richtigfalsch",
    instruction: "Sie hören fünf kurze Texte über Sport und Freizeit. Entscheiden Sie: richtig oder falsch?",
    questions: [
      {
        id: 1,
        shortAudio: "Der TSV München feiert in diesem Jahr sein hundertjähriges Bestehen. Aus diesem Anlass gibt es ein großes Fest auf dem Vereinsgelände mit Konzerten, Sportwettkämpfen und einem Feuerwerk am Abend.",
        question: "Der TSV München feiert dieses Jahr sein 100-jähriges Jubiläum.",
        correct: 0,
        explanation: "Richtig. Es ist das hundertjährige Bestehen des Vereins.",
      },
      {
        id: 2,
        shortAudio: "Fußball ist die beliebteste Sportart in Deutschland. Über sieben Millionen Menschen sind Mitglieder in einem Fußballverein. Die Bundesliga zieht jedes Wochenende hunderttausende Fans in die Stadien.",
        question: "Weniger als eine Million Menschen spielen in Deutschland Fußball im Verein.",
        correct: 1,
        explanation: "Falsch. Über sieben Millionen Menschen sind Mitglied in einem Fußballverein.",
      },
      {
        id: 3,
        shortAudio: "Ich laufe dreimal pro Woche, meistens morgens vor der Arbeit. Ich habe letzten Herbst meinen ersten Halbmarathon absolviert und möchte nächstes Jahr einen vollen Marathon laufen.",
        question: "Die Sprecherin möchte dieses Jahr ihren ersten Marathon laufen.",
        correct: 1,
        explanation: "Falsch. Sie plant den Marathon für nächstes Jahr, nicht für dieses Jahr.",
      },
      {
        id: 4,
        shortAudio: "Das Freibad öffnet diese Saison am fünfzehnten Mai. Eintrittspreis: Erwachsene vier Euro, Kinder bis vierzehn Jahren zwei Euro. Familienkarte für zwei Erwachsene und bis zu drei Kinder: neun Euro.",
        question: "Kinder bis 14 Jahren zahlen im Freibad zwei Euro Eintritt.",
        correct: 0,
        explanation: "Richtig. Kinder bis 14 Jahren zahlen zwei Euro.",
      },
      {
        id: 5,
        shortAudio: "Yoga und Meditation werden immer beliebter in Deutschland. Laut einer Umfrage praktizieren bereits fünfzehn Prozent der Deutschen regelmäßig Yoga. Besonders beliebt ist es bei Frauen zwischen dreißig und fünfzig Jahren.",
        question: "Yoga ist in Deutschland besonders bei Männern beliebt.",
        correct: 1,
        explanation: "Falsch. Es ist besonders bei Frauen zwischen 30 und 50 Jahren beliebt.",
      },
    ],
    xp: 50,
  },

  // ── Teil 10: Ansagen — Kultur & Gesellschaft ───────────────────────────────
  {
    id: 10,
    type: "ansagen",
    typeLabel: "Kurztexte",
    typeLabelTr: "Kısa Metinler",
    title: "Kultur und Gesellschaft",
    difficulty: 3,
    questionFormat: "richtigfalsch",
    instruction: "Sie hören fünf kurze Texte über Kultur und Gesellschaft. Entscheiden Sie: richtig oder falsch?",
    questions: [
      {
        id: 1,
        shortAudio: "Das Oktoberfest in München ist das größte Volksfest der Welt. Jedes Jahr kommen über sechs Millionen Besucher aus aller Welt. Das Fest dauert sechzehn bis achtzehn Tage und findet immer Ende September und Anfang Oktober statt.",
        question: "Das Oktoberfest dauert genau zwei Wochen.",
        correct: 1,
        explanation: "Falsch. Es dauert sechzehn bis achtzehn Tage, nicht genau zwei Wochen.",
      },
      {
        id: 2,
        shortAudio: "In Deutschland leben heute über zwanzig Millionen Menschen mit Migrationshintergrund. Das entspricht etwa einem Viertel der Gesamtbevölkerung. Die größten Gruppen kommen aus der Türkei, Polen und Russland.",
        question: "Etwa ein Viertel der deutschen Bevölkerung hat Migrationshintergrund.",
        correct: 0,
        explanation: "Richtig. Über 20 Millionen Menschen mit Migrationshintergrund entsprechen ca. einem Viertel.",
      },
      {
        id: 3,
        shortAudio: "Deutsche Museen sind für ihre Qualität bekannt. Allein in Berlin gibt es über hundertsiebzig Museen. Das Pergamonmuseum und das Deutsche Historische Museum sind besonders beliebt bei Touristen.",
        question: "In Berlin gibt es weniger als hundert Museen.",
        correct: 1,
        explanation: "Falsch. In Berlin gibt es über 170 Museen.",
      },
      {
        id: 4,
        shortAudio: "Das Ehrenamt hat in Deutschland eine lange Tradition. Über dreißig Millionen Deutsche engagieren sich freiwillig in Vereinen, Kirchen, sozialen Einrichtungen oder politischen Organisationen.",
        question: "Über 30 Millionen Deutsche sind ehrenamtlich tätig.",
        correct: 0,
        explanation: "Richtig. Über 30 Millionen Deutsche engagieren sich freiwillig.",
      },
      {
        id: 5,
        shortAudio: "Die deutsche Sprache wird weltweit von etwa hundert Millionen Menschen als Muttersprache gesprochen. In der EU ist Deutsch nach Englisch und Französisch die meistgesprochene Amtssprache.",
        question: "Deutsch ist die meistgesprochene Amtssprache in der EU.",
        correct: 1,
        explanation: "Falsch. Deutsch ist nach Englisch und Französisch die meistgesprochene Amtssprache — also Platz drei.",
      },
    ],
    xp: 55,
  },

  // ── Teil 11: Gespräch — Jobinterview ──────────────────────────────────────
  {
    id: 11,
    type: "gespraeche",
    typeLabel: "Gespräch",
    typeLabelTr: "İş Görüşmesi",
    title: "Das Vorstellungsgespräch",
    difficulty: 2,
    maleSpeakers: ["Herr Schreiber"],
    audioText:
      "Herr Schreiber: Guten Morgen, Frau Kovač. Schön, dass Sie da sind. Bitte setzen Sie sich.\nFrau Kovač: Guten Morgen, Herr Schreiber. Danke, sehr gerne.\nHerr Schreiber: Sie bewerben sich auf die Stelle als Marketingassistentin. Erzählen Sie mir bitte etwas über sich.\nFrau Kovač: Ich habe Kommunikationswissenschaften studiert und meinen Bachelor vor zwei Jahren abgeschlossen. Seitdem arbeite ich bei einer kleinen PR-Agentur und betreue dort hauptsächlich Social-Media-Kanäle.\nHerr Schreiber: Warum möchten Sie zu uns wechseln?\nFrau Kovač: Ihr Unternehmen hat einen sehr guten Ruf im Bereich digitales Marketing. Ich möchte mich weiterentwickeln und in einem größeren Team arbeiten.\nHerr Schreiber: Was sind Ihre Stärken?\nFrau Kovač: Ich bin kreativ, arbeite gerne im Team und bin sehr organisiert. Außerdem spreche ich fließend Englisch und Kroatisch.\nHerr Schreiber: Haben Sie Erfahrung mit Grafikprogrammen?\nFrau Kovač: Ja, ich arbeite regelmäßig mit Adobe Photoshop und Canva. Mit Illustrator habe ich weniger Erfahrung, aber ich lerne schnell.\nHerr Schreiber: Sehr gut. Wann könnten Sie frühestens beginnen?\nFrau Kovač: Ab dem ersten Februar wäre ich verfügbar.",
    instruction: "Sie hören ein Vorstellungsgespräch. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Auf welche Stelle bewirbt sich Frau Kovač?",
        options: ["Grafikdesignerin", "Marketingassistentin", "PR-Managerin"],
        correct: 1,
        explanation: "'Sie bewerben sich auf die Stelle als Marketingassistentin' — doğrudan belirtilmiş.",
      },
      {
        id: 2,
        question: "Wo arbeitet Frau Kovač zurzeit?",
        options: ["In einem Großkonzern", "In einer kleinen PR-Agentur", "In einer Werbeagentur"],
        correct: 1,
        explanation: "'ich arbeite bei einer kleinen PR-Agentur' — şu an küçük bir PR ajansında çalışıyor.",
      },
      {
        id: 3,
        question: "Welche Sprachen spricht Frau Kovač fließend?",
        options: ["Deutsch und Englisch", "Englisch und Kroatisch", "Deutsch, Englisch und Kroatisch"],
        correct: 1,
        explanation: "'spreche ich fließend Englisch und Kroatisch' — akıcı İngilizce ve Hırvatça.",
      },
      {
        id: 4,
        question: "Mit welchem Programm hat sie weniger Erfahrung?",
        options: ["Canva", "Photoshop", "Illustrator"],
        correct: 2,
        explanation: "'Mit Illustrator habe ich weniger Erfahrung' — Illustrator'da daha az deneyim var.",
      },
      {
        id: 5,
        question: "Ab wann kann Frau Kovač beginnen?",
        options: ["Ab sofort", "Ab dem 1. Januar", "Ab dem 1. Februar"],
        correct: 2,
        explanation: "'Ab dem ersten Februar wäre ich verfügbar' — 1 Şubat'tan itibaren başlayabilir.",
      },
    ],
    xp: 55,
  },

  // ── Teil 12: Gespräch — Reiseplanung ──────────────────────────────────────
  {
    id: 12,
    type: "gespraeche",
    typeLabel: "Gespräch",
    typeLabelTr: "Seyahat Planlaması",
    title: "Urlaub planen",
    difficulty: 2,
    maleSpeakers: ["Michael"],
    audioText:
      "Sara: Michael, hast du schon Pläne für den Sommerurlaub?\nMichael: Ja, ich dachte an Portugal. Ich war noch nie da und alle sagen, es ist wunderschön.\nSara: Oh, tolle Idee! Ich war letztes Jahr in Lissabon. Die Stadt ist wirklich beeindruckend.\nMichael: Ich plane etwa zwei Wochen, Anfang August. Bist du interessiert mitzukommen?\nSara: Gerne! Wie möchtest du fahren? Mit dem Flugzeug?\nMichael: Ja, ich würde fliegen. Ein Direktflug ab München nach Lissabon dauert nur zwei Stunden zwanzig.\nSara: Und wie wohnst du lieber — Hotel oder Ferienwohnung?\nMichael: Ich finde Ferienwohnungen praktischer. Man hat mehr Platz und kann selbst kochen.\nSara: Stimmt. Dann spare ich auch Geld. Was möchtest du unbedingt sehen?\nMichael: Den Sintra-Palast und die Algarve-Küste. Und natürlich Fado-Musik live hören!\nSara: Klingt fantastisch. Sollen wir auch einen Mietwagen nehmen?\nMichael: Ja, auf jeden Fall. Ohne Auto kommt man an manchen Orten nicht gut hin.",
    instruction: "Sie hören ein Gespräch über Urlaubsplanung. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Wohin möchte Michael in den Urlaub fahren?",
        options: ["Nach Spanien", "Nach Portugal", "Nach Italien"],
        correct: 1,
        explanation: "'ich dachte an Portugal' — Michael Portekiz'e gitmek istiyor.",
      },
      {
        id: 2,
        question: "Wie lange dauert der Flug von München nach Lissabon?",
        options: ["1 Stunde 20 Minuten", "2 Stunden 20 Minuten", "3 Stunden 20 Minuten"],
        correct: 1,
        explanation: "'Ein Direktflug dauert nur zwei Stunden zwanzig' — 2 saat 20 dakika.",
      },
      {
        id: 3,
        question: "Warum bevorzugt Michael eine Ferienwohnung?",
        options: ["Weil sie billiger sind", "Weil man mehr Platz hat und selbst kochen kann", "Weil Hotels zu weit entfernt sind"],
        correct: 1,
        explanation: "'Man hat mehr Platz und kann selbst kochen' — bu iki avantaj sayılıyor.",
      },
      {
        id: 4,
        question: "Was möchte Michael auf jeden Fall erleben?",
        options: ["Eine Schiffstour", "Fado-Musik live hören", "Ein Fußballspiel"],
        correct: 1,
        explanation: "'Fado-Musik live hören!' — canlı Fado müziği istiyor.",
      },
      {
        id: 5,
        question: "Warum wollen sie einen Mietwagen nehmen?",
        options: ["Weil der öffentliche Transport zu teuer ist", "Weil man ohne Auto manche Orte nicht gut erreicht", "Weil Sara kein Auto hat"],
        correct: 1,
        explanation: "'Ohne Auto kommt man an manchen Orten nicht gut hin' — bazı yerlere arabaya gerek var.",
      },
    ],
    xp: 55,
  },

  // ── Teil 13: Gespräch — Beim Arzt ─────────────────────────────────────────
  {
    id: 13,
    type: "gespraeche",
    typeLabel: "Gespräch",
    typeLabelTr: "Doktorda",
    title: "Beim Arzt",
    difficulty: 2,
    maleSpeakers: ["Arzt"],
    audioText:
      "Arzt: Guten Tag! Was kann ich für Sie tun?\nPatientin: Guten Tag, Herr Doktor. Ich habe seit drei Tagen starke Kopfschmerzen und fühle mich sehr müde.\nArzt: Haben Sie auch Fieber gemessen?\nPatientin: Ja, gestern Abend hatte ich achtunddreißig Grad.\nArzt: Haben Sie Halsschmerzen oder Husten?\nPatientin: Etwas Halsschmerzen, ja. Aber keinen Husten.\nArzt: Ich schaue mal nach. Öffnen Sie bitte den Mund... Ich sehe eine leichte Entzündung. Haben Sie in letzter Zeit viel Stress gehabt?\nPatientin: Ja, ich habe letzte Woche viel gearbeitet und wenig geschlafen.\nArzt: Das könnte ein Grund sein. Ich verschreibe Ihnen ein Antibiotikum und Schmerzmittel. Außerdem sollten Sie viel trinken und sich ausruhen.\nPatientin: Wie lange soll ich die Tabletten nehmen?\nArzt: Sieben Tage, zweimal täglich nach dem Essen. Wenn es nach drei Tagen nicht besser wird, kommen Sie bitte wieder.\nPatientin: Darf ich zur Arbeit gehen?\nArzt: Ich würde Ihnen empfehlen, heute und morgen zu Hause zu bleiben.",
    instruction: "Sie hören ein Gespräch zwischen Arzt und Patientin. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Wie lange hat die Patientin schon Kopfschmerzen?",
        options: ["Seit einem Tag", "Seit drei Tagen", "Seit einer Woche"],
        correct: 1,
        explanation: "'Ich habe seit drei Tagen starke Kopfschmerzen' — 3 gündür baş ağrısı var.",
      },
      {
        id: 2,
        question: "Wie hoch war das Fieber der Patientin?",
        options: ["37,5 Grad", "38 Grad", "39 Grad"],
        correct: 1,
        explanation: "'hatte ich achtunddreißig Grad' — ateşi 38 dereceydi.",
      },
      {
        id: 3,
        question: "Was stellt der Arzt fest?",
        options: ["Eine schwere Lungenentzündung", "Eine leichte Entzündung im Hals", "Eine Allergie"],
        correct: 1,
        explanation: "'Ich sehe eine leichte Entzündung' — hafif bir iltihaplanma görüyor.",
      },
      {
        id: 4,
        question: "Wie lange soll die Patientin das Antibiotikum nehmen?",
        options: ["Drei Tage", "Fünf Tage", "Sieben Tage"],
        correct: 2,
        explanation: "'Sieben Tage, zweimal täglich' — 7 gün, günde iki kez.",
      },
      {
        id: 5,
        question: "Was empfiehlt der Arzt bezüglich der Arbeit?",
        options: ["Sofort zur Arbeit gehen", "Heute und morgen zu Hause bleiben", "Eine Woche zu Hause bleiben"],
        correct: 1,
        explanation: "'heute und morgen zu Hause zu bleiben' — bugün ve yarın evde kalması öneriliyor.",
      },
    ],
    xp: 55,
  },

  // ── Teil 14: Gespräch — Wohnungssuche ─────────────────────────────────────
  {
    id: 14,
    type: "gespraeche",
    typeLabel: "Gespräch",
    typeLabelTr: "Ev Arama",
    title: "Auf der Suche nach einer Wohnung",
    difficulty: 2,
    maleSpeakers: ["Vermieter"],
    audioText:
      "Vermieter: Müller, guten Tag!\nInteressentin: Guten Tag! Mein Name ist Yıldız. Ich habe Ihre Anzeige für die Dreizimmerwohnung gesehen.\nVermieter: Ja, genau. Die Wohnung ist noch verfügbar. Haben Sie Interesse, sie zu besichtigen?\nInteressentin: Sehr gerne. Können Sie mir mehr darüber erzählen?\nVermieter: Es ist eine Dreizimmerwohnung im dritten Stock, siebzig Quadratmeter. Die Kaltmiete beträgt achthundert Euro, plus hundertfünfzig Euro Nebenkosten.\nInteressentin: Gibt es einen Aufzug?\nVermieter: Leider nicht. Das Haus ist alt, aus den 1960er Jahren.\nInteressentin: Ist die Wohnung möbliert?\nVermieter: Nein, unmöbliert. Nur die Küche ist eingebaut.\nInteressentin: Ist Haustier erlaubt? Ich habe einen kleinen Hund.\nVermieter: Das müsste ich mit dem Eigentümer besprechen. In der Regel erlauben wir kleine Tiere.\nInteressentin: Wann wäre eine Besichtigung möglich?\nVermieter: Wie wäre es am Samstag, den zwölften, um elf Uhr?\nInteressentin: Das passt mir gut. Ich bringe meine Partnerin mit, wenn das in Ordnung ist.\nVermieter: Natürlich! Bis Samstag dann.",
    instruction: "Sie hören ein Telefongespräch über eine Wohnung. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Wie groß ist die Wohnung?",
        options: ["60 Quadratmeter", "70 Quadratmeter", "80 Quadratmeter"],
        correct: 1,
        explanation: "'siebzig Quadratmeter' — daire 70 m².",
      },
      {
        id: 2,
        question: "Wie hoch ist die Gesamtmiete (warm)?",
        options: ["800 Euro", "950 Euro", "1.000 Euro"],
        correct: 1,
        explanation: "'achthundert Euro plus hundertfünfzig Euro Nebenkosten' = 950 €.",
      },
      {
        id: 3,
        question: "Warum gibt es keinen Aufzug?",
        options: ["Er ist kaputt", "Das Haus ist zu alt", "Er wird gerade repariert"],
        correct: 1,
        explanation: "'Das Haus ist alt, aus den 1960er Jahren' — bina eski.",
      },
      {
        id: 4,
        question: "Welches Möbelstück ist in der Wohnung enthalten?",
        options: ["Das Sofa", "Die eingebaute Küche", "Das Bett"],
        correct: 1,
        explanation: "'Nur die Küche ist eingebaut' — sadece mutfak dahil.",
      },
      {
        id: 5,
        question: "Wann ist die Besichtigung geplant?",
        options: ["Freitag um 11 Uhr", "Samstag um 10 Uhr", "Samstag um 11 Uhr"],
        correct: 2,
        explanation: "'am Samstag, den zwölften, um elf Uhr' — Cumartesi saat 11.",
      },
    ],
    xp: 55,
  },

  // ── Teil 15: Gespräch — Restaurant ────────────────────────────────────────
  {
    id: 15,
    type: "gespraeche",
    typeLabel: "Gespräch",
    typeLabelTr: "Restoranda",
    title: "Im Restaurant",
    difficulty: 2,
    maleSpeakers: ["Kellner"],
    audioText:
      "Kellner: Guten Abend! Haben Sie reserviert?\nGast: Ja, ich habe für zwei Personen reserviert. Auf den Namen Bergmann.\nKellner: Ah ja, Bergmann. Ihr Tisch ist dort drüben, am Fenster.\nGast: Wunderbar, vielen Dank.\nKellner: Kann ich Ihnen die Karte bringen? Darf ich schon etwas zu trinken bringen?\nGast: Ja, bitte. Wir nehmen eine Flasche Mineralwasser und einen Apfelsaft.\nKellner: Sehr gern. Haben Sie schon entschieden, was Sie essen möchten?\nGast: Ich nehme die Tomatensuppe als Vorspeise und dann das Wiener Schnitzel. Meine Frau möchte den Salat und als Hauptgericht den Lachs.\nKellner: Und als Beilage zum Schnitzel — Pommes oder Kartoffelsalat?\nGast: Kartoffelsalat, bitte.\nKellner: Sehr gerne. Noch etwas?\nGast: Nein, danke. Ah, eine Frage: Ist das Schnitzel sehr groß? Ich habe keinen großen Hunger.\nKellner: Es ist eine normale Portion, nicht zu groß. Aber wenn Sie möchten, gibt es auch eine kleine Portion für zwei Euro weniger.\nGast: Nein, die normale Portion ist gut. Danke.",
    instruction: "Sie hören ein Gespräch in einem Restaurant. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Wo sitzt die Gruppe?",
        options: ["Am Eingang", "Am Fenster", "In der Mitte"],
        correct: 1,
        explanation: "'Ihr Tisch ist dort drüben, am Fenster' — pencere kenarında oturuyorlar.",
      },
      {
        id: 2,
        question: "Was bestellt der Gast als Vorspeise?",
        options: ["Einen Salat", "Eine Tomatensuppe", "Einen Lachs"],
        correct: 1,
        explanation: "'Ich nehme die Tomatensuppe als Vorspeise' — başlangıç olarak domates çorbası.",
      },
      {
        id: 3,
        question: "Was isst die Frau des Gastes als Hauptgericht?",
        options: ["Wiener Schnitzel", "Tomatensuppe", "Lachs"],
        correct: 2,
        explanation: "'meine Frau möchte...als Hauptgericht den Lachs' — karısı ana yemek olarak somon alıyor.",
      },
      {
        id: 4,
        question: "Was wählt der Gast als Beilage?",
        options: ["Pommes", "Kartoffelsalat", "Reis"],
        correct: 1,
        explanation: "'Kartoffelsalat, bitte' — garnitür olarak patates salatası.",
      },
      {
        id: 5,
        question: "Was erfährt der Gast über das Schnitzel?",
        options: ["Es ist sehr groß.", "Es ist eine normale Portion.", "Es gibt heute kein Schnitzel mehr."],
        correct: 1,
        explanation: "'Es ist eine normale Portion, nicht zu groß' — normal bir porsiyon.",
      },
    ],
    xp: 50,
  },

  // ── Teil 16: Gespräch — Freizeitplanung ───────────────────────────────────
  {
    id: 16,
    type: "gespraeche",
    typeLabel: "Gespräch",
    typeLabelTr: "Hafta Sonu Planı",
    title: "Das Wochenende planen",
    difficulty: 2,
    maleSpeakers: ["Jonas"],
    audioText:
      "Jonas: Lea, hast du am Wochenende schon etwas vor?\nLea: Noch nicht so viel. Samstagnachmittag bin ich frei. Warum?\nJonas: Ich dachte, wir könnten ins Kino gehen. Der neue Film von Wim Wenders läuft.\nLea: Oh, gerne! Wann läuft er denn?\nJonas: Um fünfzehn Uhr dreißig oder um achzehn Uhr. Welche Zeit passt dir besser?\nLea: Lieber die frühere Vorstellung. Danach könnten wir noch irgendwo essen gehen.\nJonas: Gute Idee. Kennst du das neue türkische Restaurant in der Kaiserstraße?\nLea: Nein, noch nicht. Ist es gut?\nJonas: Meine Kollegen waren begeistert davon. Soll ich reservieren?\nLea: Ja, bitte. Für halb acht wäre gut.\nJonas: Alles klar. Ich buche auch schon die Kinokarten online, damit wir nicht anstehen müssen.\nLea: Super! Treffen wir uns dann direkt vor dem Kino?\nJonas: Ja, um viertel nach drei. Das gibt uns Zeit, Popcorn zu holen.",
    instruction: "Sie hören ein Gespräch über Freizeitplanung. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Was möchten Jonas und Lea am Wochenende machen?",
        options: ["Ins Theater gehen", "Ins Kino gehen und essen", "Sport treiben"],
        correct: 1,
        explanation: "Sie planen Kino und anschließend Abendessen.",
      },
      {
        id: 2,
        question: "Welche Kinovorstellung wählen sie?",
        options: ["Um 15:30 Uhr", "Um 17:30 Uhr", "Um 18:00 Uhr"],
        correct: 0,
        explanation: "'Lieber die frühere Vorstellung' = 15:30 Uhr.",
      },
      {
        id: 3,
        question: "In welchem Restaurant möchten sie essen?",
        options: ["In einem italienischen Restaurant", "In einem türkischen Restaurant", "In einem chinesischen Restaurant"],
        correct: 1,
        explanation: "'das neue türkische Restaurant in der Kaiserstraße'.",
      },
      {
        id: 4,
        question: "Warum kauft Jonas die Kinokarten online?",
        options: ["Weil es billiger ist", "Damit sie nicht anstehen müssen", "Weil das Kino weit entfernt ist"],
        correct: 1,
        explanation: "'damit wir nicht anstehen müssen' — sıraya girmesinler diye online alıyor.",
      },
      {
        id: 5,
        question: "Wo treffen sie sich?",
        options: ["Beim Restaurant", "Zu Hause bei Jonas", "Vor dem Kino"],
        correct: 2,
        explanation: "'direkt vor dem Kino' — sinema önünde buluşuyorlar.",
      },
    ],
    xp: 50,
  },

  // ── Teil 17: Gespräch — Im Sportverein ────────────────────────────────────
  {
    id: 17,
    type: "gespraeche",
    typeLabel: "Gespräch",
    typeLabelTr: "Spor Kulübü",
    title: "Beim Sportverein anmelden",
    difficulty: 2,
    maleSpeakers: ["Berater"],
    audioText:
      "Berater: Guten Tag! Womit kann ich Ihnen helfen?\nKundin: Ich möchte mich gerne anmelden. Ich interessiere mich für Schwimmen und vielleicht auch für Yoga.\nBerater: Sehr gerne! Wir haben verschiedene Mitgliedschaftsmodelle. Das Basis-Modell kostet fünfundzwanzig Euro im Monat und gibt Ihnen Zugang zum Schwimmbecken.\nKundin: Und wenn ich auch die Kurse machen möchte?\nBerater: Dann empfehle ich das Premium-Modell für fünfzig Euro. Darin sind alle Kurse inklusive, also auch Yoga, Pilates und Fitness.\nKundin: Gibt es eine Mindestvertragslaufzeit?\nBerater: Ja, beim Basis-Modell sechs Monate, beim Premium-Modell ein Jahr.\nKundin: Kann ich die Mitgliedschaft pausieren, wenn ich im Urlaub bin?\nBerater: Ja, bis zu vier Wochen im Jahr können Sie die Mitgliedschaft pausieren.\nKundin: Super. Wann finden die Yogakurse statt?\nBerater: Montagabends um neunzehn Uhr und samstags um zehn Uhr morgens.\nKundin: Dann nehme ich das Premium-Modell. Kann ich heute schon anfangen?\nBerater: Natürlich! Ich brauche nur Ihren Ausweis und ein Foto.",
    instruction: "Sie hören ein Gespräch im Sportzentrum. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Wofür interessiert sich die Kundin?",
        options: ["Tennis und Fitness", "Schwimmen und Yoga", "Laufen und Pilates"],
        correct: 1,
        explanation: "'Ich interessiere mich für Schwimmen und vielleicht auch für Yoga'.",
      },
      {
        id: 2,
        question: "Was kostet das Premium-Modell?",
        options: ["25 Euro", "40 Euro", "50 Euro"],
        correct: 2,
        explanation: "'das Premium-Modell für fünfzig Euro' — aylık 50 Euro.",
      },
      {
        id: 3,
        question: "Wie lange ist die Mindestvertragslaufzeit beim Premium-Modell?",
        options: ["Drei Monate", "Sechs Monate", "Ein Jahr"],
        correct: 2,
        explanation: "'beim Premium-Modell ein Jahr' — 1 yıl minimum süre.",
      },
      {
        id: 4,
        question: "Wie lange kann man die Mitgliedschaft pausieren?",
        options: ["Bis zu zwei Wochen", "Bis zu vier Wochen", "Bis zu acht Wochen"],
        correct: 1,
        explanation: "'bis zu vier Wochen im Jahr' — yılda 4 haftaya kadar.",
      },
      {
        id: 5,
        question: "Was braucht der Berater für die Anmeldung?",
        options: ["Ausweis und Bankdaten", "Ausweis und ein Foto", "Nur den Ausweis"],
        correct: 1,
        explanation: "'Ihren Ausweis und ein Foto' — kimlik ve fotoğraf.",
      },
    ],
    xp: 55,
  },

  // ── Teil 18: Gespräch — Schule & Elterngespräch ───────────────────────────
  {
    id: 18,
    type: "gespraeche",
    typeLabel: "Gespräch",
    typeLabelTr: "Veli Görüşmesi",
    title: "Elterngespräch in der Schule",
    difficulty: 3,
    maleSpeakers: ["Herr Baumann"],
    audioText:
      "Herr Baumann: Guten Tag, Frau Osman. Bitte setzen Sie sich. Ich freue mich, dass Sie gekommen sind.\nFrau Osman: Guten Tag, Herr Baumann. Ich auch. Wie ist die aktuelle Situation bei meiner Tochter Zeynep?\nHerr Baumann: Zeynep ist eine fleißige und motivierte Schülerin. In Deutsch und Englisch ist sie sehr gut. Allerdings haben wir in Mathematik einige Schwierigkeiten festgestellt.\nFrau Osman: Oh, das überrascht mich nicht. Sie sagt auch zu Hause, dass sie Probleme damit hat.\nHerr Baumann: Ich würde empfehlen, dass sie eine Nachhilfestunde pro Woche nimmt. Wir haben hier an der Schule auch eine kostenlose Fördergruppe dienstags nach dem Unterricht.\nFrau Osman: Das klingt gut. Wie ist ihr Verhalten im Unterricht?\nHerr Baumann: Sehr positiv. Sie beteiligt sich aktiv, ist hilfsbereit gegenüber Mitschülern und kommt immer pünktlich.\nFrau Osman: Das freut mich zu hören. Was würden Sie für die Zukunft empfehlen?\nHerr Baumann: Wenn sie in Mathe aufholt, hat sie gute Chancen, die Mittlere Reife mit sehr guten Noten abzuschließen. Danach wäre das Gymnasium eine Option.\nFrau Osman: Wunderbar. Vielen Dank für das Gespräch, Herr Baumann.",
    instruction: "Sie hören ein Elterngespräch. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "In welchen Fächern ist Zeynep besonders gut?",
        options: ["Mathematik und Physik", "Deutsch und Englisch", "Kunst und Musik"],
        correct: 1,
        explanation: "'In Deutsch und Englisch ist sie sehr gut' — Almanca ve İngilizce'de çok iyi.",
      },
      {
        id: 2,
        question: "Welches Problem hat Zeynep?",
        options: ["Sie kommt oft zu spät.", "Sie hat Schwierigkeiten in Mathematik.", "Sie ist unmotiviert."],
        correct: 1,
        explanation: "'in Mathematik einige Schwierigkeiten festgestellt' — matematikte zorluk çekiyor.",
      },
      {
        id: 3,
        question: "Was empfiehlt der Lehrer?",
        options: ["Eine Privatschule", "Nachhilfe und die kostenlose Fördergruppe", "Das Schuljahr zu wiederholen"],
        correct: 1,
        explanation: "'eine Nachhilfestunde pro Woche' und 'kostenlose Fördergruppe' öneriliyor.",
      },
      {
        id: 4,
        question: "Wann findet die Fördergruppe statt?",
        options: ["Montags nach dem Unterricht", "Dienstags nach dem Unterricht", "Mittwochs nachmittags"],
        correct: 1,
        explanation: "'kostenlose Fördergruppe dienstags nach dem Unterricht' — Salı günleri.",
      },
      {
        id: 5,
        question: "Was sagt der Lehrer über Zeyneps Verhalten?",
        options: ["Sie ist oft unaufmerksam.", "Sie ist hilfsbereit und pünktlich.", "Sie hat Probleme mit Mitschülern."],
        correct: 1,
        explanation: "'hilfsbereit gegenüber Mitschülern und kommt immer pünktlich' — yardımsever ve dakik.",
      },
    ],
    xp: 55,
  },

  // ── Teil 19: Gespräch — Telefonat Kundenservice ───────────────────────────
  {
    id: 19,
    type: "gespraeche",
    typeLabel: "Gespräch",
    typeLabelTr: "Müşteri Hizmetleri",
    title: "Beschwerde beim Kundenservice",
    difficulty: 3,
    maleSpeakers: ["Mitarbeiter"],
    audioText:
      "Mitarbeiter: Kundenservice Meyer GmbH, guten Tag!\nKundin: Guten Tag! Mein Name ist Petra Huber. Ich habe vor zehn Tagen einen Laptop bestellt und er ist immer noch nicht angekommen.\nMitarbeiter: Das tut mir leid, Frau Huber. Können Sie mir bitte Ihre Bestellnummer nennen?\nKundin: Ja, die Bestellnummer ist A-B-3-7-5-9.\nMitarbeiter: Einen Moment... Ich sehe hier, dass das Paket am fünften des Monats verschickt wurde. Es sollte eigentlich in drei bis fünf Werktagen ankommen.\nKundin: Genau, deshalb rufe ich an. Kann ich das Paket verfolgen?\nMitarbeiter: Ja, ich schicke Ihnen gleich eine E-Mail mit dem Tracking-Link. Haben wir Ihre aktuelle E-Mail-Adresse?\nKundin: Es sollte petra.huber@gmail.com sein.\nMitarbeiter: Genau. Wenn das Paket nicht bis Freitag ankommt, können wir entweder ein neues Paket schicken oder eine vollständige Rückerstattung anbieten.\nKundin: Ich würde lieber warten. Wenn es bis Freitag nicht da ist, melde ich mich wieder.\nMitarbeiter: Sehr gut. Entschuldigen Sie bitte die Unannehmlichkeiten.",
    instruction: "Sie hören ein Telefongespräch mit dem Kundenservice. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Was hat Frau Huber bestellt?",
        options: ["Ein Tablet", "Einen Laptop", "Ein Smartphone"],
        correct: 1,
        explanation: "'ich habe vor zehn Tagen einen Laptop bestellt' — dizüstü bilgisayar.",
      },
      {
        id: 2,
        question: "Wann wurde das Paket verschickt?",
        options: ["Am 3. des Monats", "Am 5. des Monats", "Am 10. des Monats"],
        correct: 1,
        explanation: "'das Paket am fünften des Monats verschickt wurde' — ayın 5'inde gönderilmiş.",
      },
      {
        id: 3,
        question: "Wie wird der Mitarbeiter der Kundin helfen?",
        options: ["Er schickt ihr einen Tracking-Link per E-Mail.", "Er schickt sofort ein neues Paket.", "Er ruft beim Paketdienst an."],
        correct: 0,
        explanation: "'ich schicke Ihnen gleich eine E-Mail mit dem Tracking-Link'.",
      },
      {
        id: 4,
        question: "Was bietet das Unternehmen an, wenn das Paket nicht bis Freitag ankommt?",
        options: ["Nur Rückerstattung", "Nur neues Paket", "Neues Paket oder Rückerstattung"],
        correct: 2,
        explanation: "'entweder ein neues Paket schicken oder eine vollständige Rückerstattung' — iki seçenek sunuluyor.",
      },
      {
        id: 5,
        question: "Was entscheidet Frau Huber?",
        options: ["Sie möchte sofort das Geld zurück.", "Sie möchte bis Freitag warten.", "Sie storniert die Bestellung."],
        correct: 1,
        explanation: "'Ich würde lieber warten. Wenn es bis Freitag nicht da ist...' — Cuma'ya kadar beklemek istiyor.",
      },
    ],
    xp: 55,
  },

  // ── Teil 20: Gespräch — Ehrenamtliches Engagement ─────────────────────────
  {
    id: 20,
    type: "gespraeche",
    typeLabel: "Gespräch",
    typeLabelTr: "Gönüllü Çalışma",
    title: "Ehrenamtliche Arbeit",
    difficulty: 3,
    maleSpeakers: ["Interviewer"],
    audioText:
      "Interviewer: Guten Tag, Frau Keller! Sie engagieren sich seit fünf Jahren in einer gemeinnützigen Organisation. Was genau machen Sie dort?\nFrau Keller: Ich helfe bei der Tafel mit. Das ist eine Organisation, die überschüssige Lebensmittel von Supermärkten sammelt und sie an bedürftige Menschen weitergibt.\nInterviewer: Wie oft sind Sie dort im Einsatz?\nFrau Keller: Jeden Samstag von acht bis dreizehn Uhr. Das sind fünf Stunden pro Woche.\nInterviewer: Wie sind Sie auf diese Organisation aufmerksam geworden?\nFrau Keller: Durch eine Freundin, die schon länger dabei war. Ich war sofort begeistert von der Idee.\nInterviewer: Was gefällt Ihnen besonders an der Arbeit?\nFrau Keller: Die Gemeinschaft. Man lernt viele interessante Menschen kennen, und das Gefühl, wirklich zu helfen, ist unbezahlbar.\nInterviewer: Gibt es auch Schwierigkeiten?\nFrau Keller: Ja, manchmal ist es emotional schwer, wenn man sieht, wie viele Menschen in Not sind. Aber das motiviert mich auch weiterzumachen.\nInterviewer: Würden Sie anderen empfehlen, sich ehrenamtlich zu engagieren?\nFrau Keller: Auf jeden Fall! Es bereichert das eigene Leben enorm.",
    instruction: "Sie hören ein Interview über ehrenamtliche Arbeit. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Was macht die Tafel?",
        options: ["Sie verkauft günstige Lebensmittel.", "Sie verteilt überschüssige Lebensmittel an Bedürftige.", "Sie kocht Mahlzeiten für Obdachlose."],
        correct: 1,
        explanation: "'überschüssige Lebensmittel sammeln und an bedürftige Menschen weitergeben'.",
      },
      {
        id: 2,
        question: "Wie viele Stunden arbeitet Frau Keller pro Woche ehrenamtlich?",
        options: ["Drei Stunden", "Fünf Stunden", "Acht Stunden"],
        correct: 1,
        explanation: "'von acht bis dreizehn Uhr' = 5 Stunden pro Samstag.",
      },
      {
        id: 3,
        question: "Wie hat Frau Keller von der Tafel erfahren?",
        options: ["Durch eine Zeitungsanzeige", "Durch eine Freundin", "Durch das Internet"],
        correct: 1,
        explanation: "'Durch eine Freundin, die schon länger dabei war'.",
      },
      {
        id: 4,
        question: "Was gefällt Frau Keller besonders?",
        options: ["Das Geld", "Die Gemeinschaft und das Gefühl zu helfen", "Die kurzen Arbeitszeiten"],
        correct: 1,
        explanation: "'Die Gemeinschaft...und das Gefühl, wirklich zu helfen, ist unbezahlbar'.",
      },
      {
        id: 5,
        question: "Was ist manchmal schwierig für Frau Keller?",
        options: ["Die körperliche Arbeit", "Die langen Fahrzeiten", "Die emotionale Belastung"],
        correct: 2,
        explanation: "'manchmal ist es emotional schwer, wenn man sieht, wie viele Menschen in Not sind'.",
      },
    ],
    xp: 60,
  },

  // ── Teil 21: Informationen — Radio-Interview: Berufswahl ──────────────────
  {
    id: 21,
    type: "informationen",
    typeLabel: "Radio-Interview",
    typeLabelTr: "Radyo Röportajı",
    title: "Der richtige Beruf",
    difficulty: 2,
    audioText:
      "Moderator: Willkommen bei unserem Berufsberatungsmagazin. Heute sprechen wir mit Berufsberaterin Dr. Sabine Roth über die Berufswahl. Dr. Roth, warum fällt die Berufswahl vielen Jugendlichen so schwer?\nDr. Roth: Die Berufswelt ist sehr komplex geworden. Es gibt heute über dreihundert Ausbildungsberufe in Deutschland, dazu kommen tausende Studiengänge. Da fühlen sich viele überfordert.\nModerator: Wie können junge Menschen den richtigen Beruf für sich finden?\nDr. Roth: Wichtig ist, die eigenen Stärken und Interessen zu kennen. Es gibt kostenlose Tests bei der Arbeitsagentur, die dabei helfen. Außerdem empfehle ich Praktika — am besten in verschiedenen Bereichen, um einen echten Einblick zu bekommen.\nModerator: Welche Berufe sind gerade besonders gefragt?\nDr. Roth: Fachkräfte in der Pflege, in der IT und im Handwerk werden händeringend gesucht. Wer in diesen Bereichen eine Ausbildung macht, hat sehr gute Berufsaussichten.\nModerator: Was raten Sie Eltern?\nDr. Roth: Die Kinder unterstützen, aber nicht zu viel Druck machen. Und offen sein für Berufe, die vielleicht nicht dem klassischen Bild entsprechen.",
    instruction: "Sie hören ein Radio-Interview über Berufswahl. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Wie viele Ausbildungsberufe gibt es laut Dr. Roth in Deutschland?",
        options: ["Über 100", "Über 200", "Über 300"],
        correct: 2,
        explanation: "'Es gibt heute über dreihundert Ausbildungsberufe' — 300'den fazla meslek.",
      },
      {
        id: 2,
        question: "Was empfiehlt Dr. Roth zur Berufsfindung?",
        options: ["Nur Bücher lesen", "Praktika in verschiedenen Bereichen", "Sofort studieren"],
        correct: 1,
        explanation: "'Praktika — am besten in verschiedenen Bereichen' — farklı alanlarda staj.",
      },
      {
        id: 3,
        question: "In welchen Bereichen werden besonders viele Fachkräfte gesucht?",
        options: ["Jura, Medizin und Kunst", "Pflege, IT und Handwerk", "Bankwesen und Verwaltung"],
        correct: 1,
        explanation: "'Fachkräfte in der Pflege, in der IT und im Handwerk werden gesucht'.",
      },
      {
        id: 4,
        question: "Wo kann man kostenlose Berufstests machen?",
        options: ["An der Schule", "Bei der Arbeitsagentur", "Im Internet"],
        correct: 1,
        explanation: "'Es gibt kostenlose Tests bei der Arbeitsagentur'.",
      },
      {
        id: 5,
        question: "Was sagt Dr. Roth über den Druck durch Eltern?",
        options: ["Eltern sollen viel Druck machen.", "Eltern sollen unterstützen, aber nicht zu viel Druck machen.", "Eltern sollen gar nicht eingreifen."],
        correct: 1,
        explanation: "'unterstützen, aber nicht zu viel Druck machen'.",
      },
    ],
    xp: 60,
  },

  // ── Teil 22: Informationen — Radio: Migration & Integration ───────────────
  {
    id: 22,
    type: "informationen",
    typeLabel: "Radio-Interview",
    typeLabelTr: "Radyo Röportajı",
    title: "Migration und Integration",
    difficulty: 2,
    audioText:
      "Moderatorin: Guten Abend! In unserem heutigen Beitrag sprechen wir mit Farida Aziz, die vor sieben Jahren aus Afghanistan nach Deutschland gekommen ist. Farida, wie war Ihr Start in Deutschland?\nFarida: Es war sehr schwierig. Ich sprach kein Deutsch und kannte niemanden. Aber ich habe sofort einen Integrationskurs besucht und mich schnell eingelebt.\nModeratorin: Wie lange hat es gedauert, bis Sie gut Deutsch sprechen konnten?\nFarida: Etwa eineinhalb Jahre. Ich habe jeden Tag gelernt und bin mutig gewesen, auch wenn ich Fehler gemacht habe.\nModeratorin: Was hat Ihnen bei der Integration am meisten geholfen?\nFarida: Die Deutschkurse natürlich. Aber auch der Kontakt zu Deutschen — durch Nachbarn, durch Kollegen. Und mein Praktikum in einem Krankenhaus hat mir sehr geholfen, die deutsche Gesellschaft zu verstehen.\nModeratorin: Was machen Sie heute?\nFarida: Ich arbeite als Krankenpflegerin in einem Berliner Krankenhaus und studiere nebenbei, um Krankenschwester zu werden.\nModeratorin: Was würden Sie anderen Einwanderern empfehlen?\nFarida: Die Sprache so schnell wie möglich lernen. Sprache ist der Schlüssel zu allem.",
    instruction: "Sie hören einen Radio-Beitrag über Integration. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Wie lange lebt Farida schon in Deutschland?",
        options: ["Seit drei Jahren", "Seit fünf Jahren", "Seit sieben Jahren"],
        correct: 2,
        explanation: "'vor sieben Jahren aus Afghanistan nach Deutschland gekommen'.",
      },
      {
        id: 2,
        question: "Wie lange hat es gedauert, bis Farida gut Deutsch sprechen konnte?",
        options: ["Sechs Monate", "Eineinhalb Jahre", "Drei Jahre"],
        correct: 1,
        explanation: "'Etwa eineinhalb Jahre' — yaklaşık bir buçuk yıl.",
      },
      {
        id: 3,
        question: "Was hat Farida bei der Integration besonders geholfen?",
        options: ["Fernsehen auf Deutsch", "Kontakt zu Deutschen und Praktikum", "Bücher lesen"],
        correct: 1,
        explanation: "'Kontakt zu Deutschen...Und mein Praktikum in einem Krankenhaus'.",
      },
      {
        id: 4,
        question: "Wo hat Farida ihr Praktikum gemacht?",
        options: ["In einer Schule", "In einem Krankenhaus", "In einem Restaurant"],
        correct: 1,
        explanation: "'mein Praktikum in einem Krankenhaus'.",
      },
      {
        id: 5,
        question: "Was empfiehlt Farida anderen Einwanderern?",
        options: ["Viel Geld zu sparen", "Die Sprache so schnell wie möglich zu lernen", "In eine Großstadt zu ziehen"],
        correct: 1,
        explanation: "'Die Sprache so schnell wie möglich lernen. Sprache ist der Schlüssel zu allem.'",
      },
    ],
    xp: 60,
  },

  // ── Teil 23: Informationen — Podcast: Gesundheitsvorsorge ────────────────
  {
    id: 23,
    type: "informationen",
    typeLabel: "Podcast",
    typeLabelTr: "Podcast",
    title: "Gesundheitsvorsorge im Alltag",
    difficulty: 2,
    audioText:
      "Willkommen zum Gesundheitspodcast! Heute geht es um Vorsorgeuntersuchungen. Viele Menschen gehen nur dann zum Arzt, wenn sie krank sind. Dabei sind regelmäßige Vorsorgeuntersuchungen enorm wichtig, denn viele Krankheiten lassen sich im Frühstadium viel besser behandeln.\nIn Deutschland haben gesetzlich Versicherte ab bestimmten Altersgruppen Anspruch auf kostenlose Vorsorgeuntersuchungen. Zum Beispiel gibt es ab fünfundzwanzig Jahren die Krebsfrüherkennungsuntersuchung und ab fünfzig Jahren die Darmkrebsvorsorge.\nExperten empfehlen außerdem, auf eine ausgewogene Ernährung zu achten, regelmäßig Sport zu treiben und ausreichend zu schlafen — mindestens sieben bis acht Stunden pro Nacht. Stress sollte man aktiv durch Entspannungstechniken wie Meditation oder Yoga reduzieren.\nEine wichtige Botschaft: Warten Sie nicht, bis Sie krank sind. Prävention ist immer besser als Behandlung!",
    instruction: "Sie hören einen Podcast über Gesundheitsvorsorge. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Warum sind Vorsorgeuntersuchungen wichtig?",
        options: ["Sie machen Spaß.", "Viele Krankheiten können im Frühstadium besser behandelt werden.", "Sie sind kostenlos."],
        correct: 1,
        explanation: "'Krankheiten lassen sich im Frühstadium viel besser behandeln' — erken teşhis önemli.",
      },
      {
        id: 2,
        question: "Ab wann gibt es die Krebsfrüherkennungsuntersuchung?",
        options: ["Ab 18 Jahren", "Ab 25 Jahren", "Ab 35 Jahren"],
        correct: 1,
        explanation: "'ab fünfundzwanzig Jahren die Krebsfrüherkennungsuntersuchung'.",
      },
      {
        id: 3,
        question: "Wie viele Stunden Schlaf werden empfohlen?",
        options: ["Mindestens 5-6 Stunden", "Mindestens 7-8 Stunden", "Mindestens 9-10 Stunden"],
        correct: 1,
        explanation: "'mindestens sieben bis acht Stunden pro Nacht'.",
      },
      {
        id: 4,
        question: "Was wird zur Stressreduktion empfohlen?",
        options: ["Viel schlafen", "Meditation oder Yoga", "Mehr arbeiten"],
        correct: 1,
        explanation: "'Entspannungstechniken wie Meditation oder Yoga'.",
      },
      {
        id: 5,
        question: "Was ist die Hauptbotschaft des Podcasts?",
        options: ["Zur Arbeit gehen, auch wenn man krank ist.", "Prävention ist besser als Behandlung.", "Nur gesetzlich Versicherte sollen zum Arzt gehen."],
        correct: 1,
        explanation: "'Prävention ist immer besser als Behandlung!'",
      },
    ],
    xp: 60,
  },

  // ── Teil 24: Informationen — Radio: Wohnungsmarkt ────────────────────────
  {
    id: 24,
    type: "informationen",
    typeLabel: "Radio-Bericht",
    typeLabelTr: "Radyo Haberi",
    title: "Der Wohnungsmarkt in Deutschland",
    difficulty: 3,
    audioText:
      "Guten Abend, hier ist das Wirtschaftsmagazin. Unser heutiges Thema: die Wohnungskrise in deutschen Großstädten. Die Nachfrage nach Wohnraum übersteigt das Angebot in vielen Städten bei weitem. Besonders betroffen sind München, Frankfurt, Hamburg und Berlin.\nDie durchschnittliche Kaltmiete für eine Zweizimmerwohnung in München beträgt inzwischen über zwanzig Euro pro Quadratmeter. Das bedeutet für viele Geringverdiener und Familien, dass sie sich eine Wohnung in der Stadtmitte schlicht nicht mehr leisten können.\nDie Bundesregierung hat verschiedene Maßnahmen angekündigt: mehr sozialen Wohnungsbau, Mietpreisbremsen in angespannten Märkten und steuerliche Anreize für private Investoren, die günstigen Wohnraum schaffen. Ob diese Maßnahmen ausreichen werden, ist unter Experten umstritten. Viele fordern schnellere und entschlossenere Aktionen, um den Wohnungsmangel zu bekämpfen.",
    instruction: "Sie hören einen Radio-Bericht über den Wohnungsmarkt. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Was ist das Problem auf dem deutschen Wohnungsmarkt?",
        options: ["Es gibt zu viele Wohnungen.", "Die Nachfrage übersteigt das Angebot.", "Die Wohnungen sind zu groß."],
        correct: 1,
        explanation: "'Nachfrage nach Wohnraum übersteigt das Angebot' — talep arzı aşıyor.",
      },
      {
        id: 2,
        question: "Wie hoch ist die Kaltmiete in München pro Quadratmeter?",
        options: ["Über 10 Euro", "Über 15 Euro", "Über 20 Euro"],
        correct: 2,
        explanation: "'über zwanzig Euro pro Quadratmeter' — m² başına 20 Euro'dan fazla.",
      },
      {
        id: 3,
        question: "Welche Gruppe leidet am meisten unter den hohen Mieten?",
        options: ["Studenten und Rentner", "Geringverdiener und Familien", "Ausländer und Touristen"],
        correct: 1,
        explanation: "'für viele Geringverdiener und Familien' — düşük gelirli ve aileler.",
      },
      {
        id: 4,
        question: "Was hat die Bundesregierung angekündigt?",
        options: ["Wohnungen zu verkaufen", "Mehr sozialen Wohnungsbau und Mietpreisbremsen", "Mieten zu erhöhen"],
        correct: 1,
        explanation: "'mehr sozialen Wohnungsbau, Mietpreisbremsen' — sosyal konut ve kira freni.",
      },
      {
        id: 5,
        question: "Wie stehen Experten zu den Regierungsmaßnahmen?",
        options: ["Alle finden sie ausreichend.", "Die Meinungen sind geteilt.", "Alle lehnen sie ab."],
        correct: 1,
        explanation: "'ob diese Maßnahmen ausreichen werden, ist unter Experten umstritten'.",
      },
    ],
    xp: 60,
  },

  // ── Teil 25: Informationen — Interview: Freiwilligenarbeit ────────────────
  {
    id: 25,
    type: "informationen",
    typeLabel: "Radio-Interview",
    typeLabelTr: "Radyo Röportajı",
    title: "Freiwilligenarbeit im Ausland",
    difficulty: 3,
    questionFormat: "richtigfalsch",
    audioText:
      "Moderator: Willkommen! Heute sprechen wir mit Lukas, der ein Jahr als Freiwilliger in Kenia gearbeitet hat. Lukas, wie kam es zu dieser Entscheidung?\nLukas: Nach dem Abitur wollte ich etwas Sinnvolles tun, bevor ich mit dem Studium anfange. Ich habe mich über Freiwilligenprogramme informiert und mich bei einer Organisation beworben.\nModerator: Was haben Sie dort gemacht?\nLukas: Ich habe in einer Grundschule gearbeitet und Kindern Englisch beigebracht. Außerdem habe ich bei Bauprojekten mitgeholfen.\nModerator: War das Projekt auf Englisch oder Deutsch organisiert?\nLukas: Alles auf Englisch. Ich habe auch ein bisschen Swahili gelernt, das war sehr hilfreich.\nModerator: Was haben Sie mitgenommen?\nLukas: Unglaublich viel. Ich bin viel selbstständiger geworden und habe gelernt, in schwierigen Situationen ruhig zu bleiben. Außerdem sehe ich viele Dinge in Deutschland jetzt mit anderen Augen.\nModerator: Würden Sie es wieder tun?\nLukas: Auf jeden Fall! Ich empfehle es jedem.",
    instruction: "Sie hören ein Interview über Freiwilligenarbeit. Entscheiden Sie: richtig oder falsch?",
    questions: [
      {
        id: 1,
        question: "Lukas hat nach dem Abitur ein Jahr als Freiwilliger gearbeitet.",
        correct: 0,
        explanation: "Richtig. Er hat sich nach dem Abitur für ein Freiwilligenprogramm entschieden.",
      },
      {
        id: 2,
        question: "Lukas hat in Kenia an einer Universität gearbeitet.",
        correct: 1,
        explanation: "Falsch. Er hat in einer Grundschule gearbeitet.",
      },
      {
        id: 3,
        question: "Das Projekt wurde auf Deutsch organisiert.",
        correct: 1,
        explanation: "Falsch. 'Alles auf Englisch' — proje İngilizce olarak organize edildi.",
      },
      {
        id: 4,
        question: "Lukas hat ein bisschen Swahili gelernt.",
        correct: 0,
        explanation: "Richtig. Er hat ein bisschen Swahili gelernt.",
      },
      {
        id: 5,
        question: "Lukas würde das Freiwilligenjahr nicht wiederholen.",
        correct: 1,
        explanation: "Falsch. 'Auf jeden Fall! Ich empfehle es jedem.' — Kesinlikle tekrarlardı.",
      },
    ],
    xp: 60,
  },

  // ── Teil 26: Informationen — Radio: Technologie im Alltag ─────────────────
  {
    id: 26,
    type: "informationen",
    typeLabel: "Radio-Bericht",
    typeLabelTr: "Radyo Haberi",
    title: "Smarte Technologie zu Hause",
    difficulty: 3,
    audioText:
      "Hier ist Ihr Technologiemagazin. Smarte Geräte verändern unseren Alltag. Smart-Home-Systeme ermöglichen es, Heizung, Beleuchtung und Sicherheitssysteme per Smartphone zu steuern — egal ob man zu Hause oder unterwegs ist.\nStudien zeigen, dass Smart-Home-Technologie den Energieverbrauch um bis zu dreißig Prozent senken kann, weil Heizung und Licht nur dann eingeschaltet werden, wenn sie wirklich gebraucht werden.\nAllerdings gibt es auch Bedenken: Datenschutz ist ein großes Thema. Smarte Geräte sammeln viele Daten über die Nutzer. Experten warnen davor, dass diese Daten in falsche Hände geraten könnten.\nTrotzdem nimmt die Beliebtheit von Smart-Home-Produkten zu. Im Jahr 2024 hatte bereits jeder fünfte deutsche Haushalt mindestens ein smartes Gerät. Der Markt wächst jährlich um rund fünfzehn Prozent.",
    instruction: "Sie hören einen Radio-Bericht über Smart-Home-Technologie. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Was kann man mit Smart-Home-Systemen steuern?",
        options: ["Nur die Heizung", "Heizung, Beleuchtung und Sicherheitssysteme", "Nur das Licht"],
        correct: 1,
        explanation: "'Heizung, Beleuchtung und Sicherheitssysteme per Smartphone steuern'.",
      },
      {
        id: 2,
        question: "Um wie viel Prozent kann Smart-Home-Technologie den Energieverbrauch senken?",
        options: ["Bis zu 10 Prozent", "Bis zu 20 Prozent", "Bis zu 30 Prozent"],
        correct: 2,
        explanation: "'Energieverbrauch um bis zu dreißig Prozent senken'.",
      },
      {
        id: 3,
        question: "Was ist das größte Bedenken bei smarten Geräten?",
        options: ["Sie sind zu teuer.", "Datenschutz und Datensicherheit", "Sie funktionieren nicht zuverlässig."],
        correct: 1,
        explanation: "'Datenschutz ist ein großes Thema' — veri güvenliği büyük endişe.",
      },
      {
        id: 4,
        question: "Wie viele deutsche Haushalte hatten 2024 mindestens ein smartes Gerät?",
        options: ["Jeder zehnte", "Jeder fünfte", "Jeder dritte"],
        correct: 1,
        explanation: "'jeder fünfte deutsche Haushalt' — her 5 haneden 1'i.",
      },
      {
        id: 5,
        question: "Um wie viel Prozent wächst der Smart-Home-Markt jährlich?",
        options: ["Um 5 Prozent", "Um 10 Prozent", "Um 15 Prozent"],
        correct: 2,
        explanation: "'jährlich um rund fünfzehn Prozent'.",
      },
    ],
    xp: 60,
  },

  // ── Teil 27: Informationen — Podcast: Sprachenlernen ──────────────────────
  {
    id: 27,
    type: "informationen",
    typeLabel: "Podcast",
    typeLabelTr: "Podcast",
    title: "Sprachen effektiv lernen",
    difficulty: 3,
    questionFormat: "richtigfalsch",
    audioText:
      "Herzlich willkommen zu unserem Lernpodcast! Heute geht es um das Thema Sprachenlernen. Wie kann man eine neue Sprache möglichst schnell und effektiv lernen?\nExperten sind sich einig: Der wichtigste Faktor ist regelmäßiges Üben — am besten täglich, auch wenn es nur zwanzig bis dreißig Minuten sind. Kurze, regelmäßige Einheiten sind effektiver als einmal pro Woche vier Stunden lernen.\nImmersion ist ein weiterer wichtiger Punkt: die Sprache im Alltag benutzen — Filme auf Deutsch schauen, deutsche Musik hören, mit Muttersprachlern sprechen. Apps wie Duolingo können eine gute Ergänzung sein, ersetzen aber keinen echten Unterricht.\nFehler zu machen ist normal und wichtig. Wer Angst hat, Fehler zu machen, spricht weniger und lernt langsamer. Mut ist beim Sprachenlernen entscheidend.\nZuletzt: Geduld ist wichtig. Sprachen lernen braucht Zeit. Aber mit der richtigen Methode und Motivation kann jeder eine neue Sprache lernen!",
    instruction: "Sie hören einen Podcast über Sprachenlernen. Entscheiden Sie: richtig oder falsch?",
    questions: [
      {
        id: 1,
        question: "Experten empfehlen einmal pro Woche vier Stunden zu lernen.",
        correct: 1,
        explanation: "Falsch. Empfohlen werden täglich 20-30 Minuten, nicht einmal wöchentlich 4 Stunden.",
      },
      {
        id: 2,
        question: "Immersion bedeutet, die Sprache im Alltag zu benutzen.",
        correct: 0,
        explanation: "Richtig. 'die Sprache im Alltag benutzen' — dili günlük hayatta kullanmak.",
      },
      {
        id: 3,
        question: "Apps wie Duolingo können den echten Unterricht vollständig ersetzen.",
        correct: 1,
        explanation: "Falsch. 'ersetzen aber keinen echten Unterricht' — gerçek dersin yerini tutamaz.",
      },
      {
        id: 4,
        question: "Fehler zu machen ist beim Sprachenlernen schädlich.",
        correct: 1,
        explanation: "Falsch. 'Fehler zu machen ist normal und wichtig' — hata yapmak önemli ve normaldir.",
      },
      {
        id: 5,
        question: "Mut ist beim Sprachenlernen wichtig.",
        correct: 0,
        explanation: "Richtig. 'Mut ist beim Sprachenlernen entscheidend' — cesaret belirleyicidir.",
      },
    ],
    xp: 60,
  },

  // ── Teil 28: Informationen — Radio: Ernährung & Essen ─────────────────────
  {
    id: 28,
    type: "informationen",
    typeLabel: "Radio-Bericht",
    typeLabelTr: "Radyo Haberi",
    title: "Ernährung und Essen in Deutschland",
    difficulty: 2,
    audioText:
      "Und jetzt zu unserem Ernährungsthema. Das Essverhalten der Deutschen hat sich in den letzten Jahrzehnten stark verändert. Immer mehr Menschen ernähren sich vegetarisch oder vegan. Laut einer aktuellen Umfrage leben bereits zehn Prozent der Deutschen vegetarisch und etwa zwei Prozent vegan.\nGleichzeitig wächst die Nachfrage nach Convenience-Food — also Fertiggerichten und Fastfood. Viele Berufstätige haben keine Zeit, täglich frisch zu kochen. Das spiegelt sich in den Umsatzzahlen wider: Der Markt für Fertigmahlzeiten ist in den letzten fünf Jahren um zwanzig Prozent gewachsen.\nErnährungsexperten machen sich Sorgen um die Gesundheit. Eine ausgewogene Ernährung mit viel Obst, Gemüse, Vollkornprodukten und magerem Eiweiß ist die Basis für ein gesundes Leben. Zu viel Zucker, Salz und gesättigte Fettsäuren erhöhen das Risiko für Herz-Kreislauf-Erkrankungen und Diabetes.\nDie gute Nachricht: Immer mehr Menschen interessieren sich für Kochkurse und frische, regionale Lebensmittel.",
    instruction: "Sie hören einen Radio-Bericht über Ernährung. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Wie viel Prozent der Deutschen leben vegetarisch?",
        options: ["Etwa 2 Prozent", "Etwa 5 Prozent", "Etwa 10 Prozent"],
        correct: 2,
        explanation: "'zehn Prozent der Deutschen vegetarisch' — yaklaşık %10.",
      },
      {
        id: 2,
        question: "Warum kaufen viele Menschen Fertiggerichte?",
        options: ["Weil sie günstiger sind", "Weil sie keine Zeit zum Kochen haben", "Weil sie besser schmecken"],
        correct: 1,
        explanation: "'Viele Berufstätige haben keine Zeit, täglich frisch zu kochen'.",
      },
      {
        id: 3,
        question: "Um wie viel Prozent ist der Markt für Fertigmahlzeiten gewachsen?",
        options: ["Um 10 Prozent", "Um 15 Prozent", "Um 20 Prozent"],
        correct: 2,
        explanation: "'um zwanzig Prozent gewachsen'.",
      },
      {
        id: 4,
        question: "Was erhöht laut Experten das Risiko für Herzkrankheiten?",
        options: ["Zu viel Obst und Gemüse", "Zu viel Zucker, Salz und Fett", "Zu viel Vollkornprodukte"],
        correct: 1,
        explanation: "'Zu viel Zucker, Salz und gesättigte Fettsäuren erhöhen das Risiko'.",
      },
      {
        id: 5,
        question: "Was ist eine positive Entwicklung laut dem Bericht?",
        options: ["Mehr Menschen essen Fastfood.", "Mehr Menschen interessieren sich für Kochkurse.", "Die Preise für Lebensmittel sinken."],
        correct: 1,
        explanation: "'Immer mehr Menschen interessieren sich für Kochkurse und frische Lebensmittel'.",
      },
    ],
    xp: 60,
  },

  // ── Teil 29: Informationen — Radio: Arbeitswelt der Zukunft ───────────────
  {
    id: 29,
    type: "informationen",
    typeLabel: "Radio-Interview",
    typeLabelTr: "Radyo Röportajı",
    title: "Die Arbeitswelt der Zukunft",
    difficulty: 3,
    questionFormat: "richtigfalsch",
    audioText:
      "Moderatorin: Guten Tag! Im Gespräch mit uns ist heute Wirtschaftsexperte Prof. Dr. Klaus Neumann. Professor, wie wird sich die Arbeitswelt in den nächsten zwanzig Jahren verändern?\nProf. Neumann: Die Digitalisierung und künstliche Intelligenz werden viele Berufe verändern oder sogar ersetzen. Besonders Routinetätigkeiten in Büros und Fabriken sind gefährdet.\nModeratorin: Bedeutet das, dass viele Menschen ihre Arbeit verlieren werden?\nProf. Neumann: Nicht unbedingt. Neue Technologien schaffen auch neue Berufe. Wir brauchen mehr IT-Spezialisten, Datenanalysten und Fachleute, die Maschinen warten und programmieren können.\nModeratorin: Was sollten Arbeitnehmer tun, um vorbereitet zu sein?\nProf. Neumann: Lebenslanges Lernen ist der Schlüssel. Wer bereit ist, sich ständig weiterzubilden und neue Fähigkeiten zu erwerben, wird auch in Zukunft gute Chancen haben.\nModeratorin: Und was muss die Politik tun?\nProf. Neumann: Die Bildungssysteme müssen angepasst werden. Und Unternehmen müssen in die Weiterbildung ihrer Mitarbeiter investieren.",
    instruction: "Sie hören ein Interview über die Zukunft der Arbeit. Entscheiden Sie: richtig oder falsch?",
    questions: [
      {
        id: 1,
        question: "Laut Prof. Neumann werden Routinetätigkeiten am stärksten von KI betroffen.",
        correct: 0,
        explanation: "Richtig. 'Besonders Routinetätigkeiten in Büros und Fabriken sind gefährdet'.",
      },
      {
        id: 2,
        question: "Der Professor sagt, dass alle Menschen ihre Jobs verlieren werden.",
        correct: 1,
        explanation: "Falsch. 'Nicht unbedingt. Neue Technologien schaffen auch neue Berufe.'",
      },
      {
        id: 3,
        question: "IT-Spezialisten und Datenanalysten werden in Zukunft gebraucht.",
        correct: 0,
        explanation: "Richtig. 'Wir brauchen mehr IT-Spezialisten, Datenanalysten...'",
      },
      {
        id: 4,
        question: "Lebenslanges Lernen ist laut dem Experten nicht wichtig.",
        correct: 1,
        explanation: "Falsch. 'Lebenslanges Lernen ist der Schlüssel'.",
      },
      {
        id: 5,
        question: "Die Politik muss das Bildungssystem anpassen.",
        correct: 0,
        explanation: "Richtig. 'Die Bildungssysteme müssen angepasst werden.'",
      },
    ],
    xp: 65,
  },

  // ── Teil 30: Informationen — Radio: Reise & Tourismus ─────────────────────
  {
    id: 30,
    type: "informationen",
    typeLabel: "Radio-Bericht",
    typeLabelTr: "Radyo Haberi",
    title: "Tourismus und Reisetrends",
    difficulty: 3,
    audioText:
      "Guten Morgen! Hier sind Ihre Reisenachrichten. Der Tourismus in Deutschland erholt sich weiterhin nach der Pandemie. Im vergangenen Jahr reisten über einhundert Millionen Deutsche ins In- und Ausland. Die beliebtesten Ziele im Ausland waren Spanien, Italien und die Türkei.\nEin interessanter Trend: Immer mehr Deutsche interessieren sich für nachhaltigen Tourismus. Sie bevorzugen Reisen mit der Bahn statt mit dem Flugzeug und wählen Unterkünfte, die auf Umweltschutz achten.\nAuch Städtereisen werden immer beliebter. Kurzurlaube von zwei bis vier Tagen in europäische Metropolen wie Paris, Wien oder Barcelona boomen. Das ist besonders bei jüngeren Reisenden zwischen zwanzig und vierzig Jahren der Fall.\nAuf der anderen Seite wächst der sogenannte Workcation-Trend: Menschen, die von unterwegs arbeiten und gleichzeitig die Destination genießen. Dies ist dank Homeoffice-Regelungen bei vielen Unternehmen möglich geworden.",
    instruction: "Sie hören einen Radio-Bericht über Reisetrends. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Wie viele Deutsche reisten im vergangenen Jahr?",
        options: ["Über 50 Millionen", "Über 80 Millionen", "Über 100 Millionen"],
        correct: 2,
        explanation: "'über einhundert Millionen Deutsche reisten'.",
      },
      {
        id: 2,
        question: "Was sind die beliebtesten Auslandsziele der Deutschen?",
        options: ["Frankreich, England und Portugal", "Spanien, Italien und die Türkei", "Griechenland, Kroatien und USA"],
        correct: 1,
        explanation: "'Spanien, Italien und die Türkei' — en popüler yurt dışı destinasyonlar.",
      },
      {
        id: 3,
        question: "Was kennzeichnet nachhaltigen Tourismus laut dem Bericht?",
        options: ["Billige Flüge buchen", "Mit der Bahn reisen und umweltfreundliche Unterkünfte wählen", "In Luxushotels übernachten"],
        correct: 1,
        explanation: "'Reisen mit der Bahn statt mit dem Flugzeug und Unterkünfte die auf Umweltschutz achten'.",
      },
      {
        id: 4,
        question: "Bei welcher Altersgruppe sind Städtereisen besonders beliebt?",
        options: ["Bei 50-70-Jährigen", "Bei 20-40-Jährigen", "Bei Kindern und Jugendlichen"],
        correct: 1,
        explanation: "'besonders bei jüngeren Reisenden zwischen zwanzig und vierzig Jahren'.",
      },
      {
        id: 5,
        question: "Was bedeutet Workcation?",
        options: ["Urlaub ohne Arbeit", "Von unterwegs arbeiten und gleichzeitig die Destination genießen", "Arbeitsreisen nur für Manager"],
        correct: 1,
        explanation: "'von unterwegs arbeiten und gleichzeitig die Destination genießen'.",
      },
    ],
    xp: 65,
  },
];

// ── A1 — Teile 1–10 ───────────────────────────────────────────────────────────

const A1_TEILE: HorenTeil[] = [
  // ── Teil 1: Ansagen — Alltag ──────────────────────────────────────────────
  {
    id: 1,
    type: "ansagen",
    typeLabel: "Ansagen",
    typeLabelTr: "Kısa Duyurular",
    title: "Kurze Ansagen im Alltag",
    difficulty: 1,
    instruction: "Sie hören fünf kurze Ansagen. Hören Sie genau zu und wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        shortAudio: "Hallo! Hier ist Maria. Ich bin um drei Uhr zu Hause. Ruf mich bitte an!",
        question: "Wann ist Maria zu Hause?",
        options: ["Um 13 Uhr", "Um 15 Uhr", "Um 17 Uhr"],
        correct: 1,
        explanation: "'um drei Uhr' = saat 15:00. Maria saat 15'te evde olacak.",
      },
      {
        id: 2,
        shortAudio: "Guten Morgen! Der Supermarkt öffnet heute um acht Uhr. Bis bald!",
        question: "Wann öffnet der Supermarkt?",
        options: ["Um 7 Uhr", "Um 8 Uhr", "Um 9 Uhr"],
        correct: 1,
        explanation: "'öffnet um acht Uhr' — market saat 8'de açılıyor.",
      },
      {
        id: 3,
        shortAudio: "Achtung! Die Bibliothek ist heute geschlossen. Sie öffnet wieder am Montag.",
        question: "Wann öffnet die Bibliothek wieder?",
        options: ["Heute", "Am Samstag", "Am Montag"],
        correct: 2,
        explanation: "'öffnet wieder am Montag' — kütüphane Pazartesi açılıyor.",
      },
      {
        id: 4,
        shortAudio: "Hier ist Tom. Ich bin krank und komme morgen nicht zur Arbeit.",
        question: "Warum kommt Tom nicht zur Arbeit?",
        options: ["Er macht Urlaub.", "Er ist krank.", "Er hat einen Termin."],
        correct: 1,
        explanation: "'Ich bin krank' — Tom hasta olduğu için gelmiyor.",
      },
      {
        id: 5,
        shortAudio: "Das Schwimmbad ist dienstags und donnerstags von sieben bis zwanzig Uhr geöffnet.",
        question: "Wann ist das Schwimmbad geöffnet?",
        options: ["Montag und Mittwoch", "Dienstag und Donnerstag", "Samstag und Sonntag"],
        correct: 1,
        explanation: "'dienstags und donnerstags' — yüzme havuzu Salı ve Perşembe açık.",
      },
    ],
    xp: 35,
  },

  // ── Teil 2: Ansagen — Am Telefon ─────────────────────────────────────────
  {
    id: 2,
    type: "ansagen",
    typeLabel: "Ansagen",
    typeLabelTr: "Telefon Mesajları",
    title: "Telefonnachrichten",
    difficulty: 1,
    instruction: "Sie hören fünf Telefonnachrichten. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        shortAudio: "Hallo, hier ist Anna. Können wir uns morgen um elf Uhr treffen? Ruf mich bitte zurück!",
        question: "Wann möchte Anna sich treffen?",
        options: ["Heute um 11 Uhr", "Morgen um 11 Uhr", "Morgen um 21 Uhr"],
        correct: 1,
        explanation: "'morgen um elf Uhr' — Anna yarın saat 11'de buluşmak istiyor.",
      },
      {
        id: 2,
        shortAudio: "Hier ist der Arzt. Ihr Termin ist am Mittwoch um vierzehn Uhr dreißig.",
        question: "Wann ist der Arzttermin?",
        options: ["Montag um 14:30", "Mittwoch um 14:30", "Freitag um 14:30"],
        correct: 1,
        explanation: "'am Mittwoch um vierzehn Uhr dreißig' — Çarşamba 14:30.",
      },
      {
        id: 3,
        shortAudio: "Hallo! Hier ist Petra. Dein Paket ist gekommen. Es ist bei mir. Komm vorbei!",
        question: "Wo ist das Paket?",
        options: ["Beim Postamt", "Bei Petra", "Zu Hause"],
        correct: 1,
        explanation: "'Es ist bei mir' — paket Petra'da.",
      },
      {
        id: 4,
        shortAudio: "Guten Tag! Das Restaurant ist samstags und sonntags ab zwölf Uhr geöffnet.",
        question: "Ab wann ist das Restaurant am Wochenende geöffnet?",
        options: ["Ab 10 Uhr", "Ab 12 Uhr", "Ab 14 Uhr"],
        correct: 1,
        explanation: "'ab zwölf Uhr' — restoran hafta sonu 12'den itibaren açık.",
      },
      {
        id: 5,
        shortAudio: "Hier ist Lisa. Ich kaufe heute Brot und Milch. Brauchst du noch etwas?",
        question: "Was kauft Lisa heute?",
        options: ["Käse und Butter", "Brot und Milch", "Obst und Gemüse"],
        correct: 1,
        explanation: "'Ich kaufe heute Brot und Milch' — Lisa ekmek ve süt alıyor.",
      },
    ],
    xp: 35,
  },

  // ── Teil 3: Ansagen — Schule und Kurs ────────────────────────────────────
  {
    id: 3,
    type: "ansagen",
    typeLabel: "Ansagen",
    typeLabelTr: "Okul Duyuruları",
    title: "In der Schule und im Kurs",
    difficulty: 1,
    instruction: "Sie hören fünf kurze Ansagen aus der Schule und vom Sprachkurs. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        shortAudio: "Der Deutschkurs beginnt am Montag um neun Uhr. Bitte bringt ein Heft und einen Stift mit.",
        question: "Was sollen die Schüler mitbringen?",
        options: ["Ein Buch und einen Bleistift", "Ein Heft und einen Stift", "Eine Tasche und ein Lineal"],
        correct: 1,
        explanation: "'Bringt ein Heft und einen Stift mit' — defter ve kalem getirmeliler.",
      },
      {
        id: 2,
        shortAudio: "Liebe Schülerinnen und Schüler! Morgen gibt es keinen Unterricht. Die Schule ist frei.",
        question: "Was ist morgen?",
        options: ["Es gibt einen Test.", "Es gibt keinen Unterricht.", "Es gibt eine Party."],
        correct: 1,
        explanation: "'keinen Unterricht' — yarın ders yok, okul tatil.",
      },
      {
        id: 3,
        shortAudio: "Der Kurs findet im Raum zwölf statt. Bitte kommt pünktlich!",
        question: "Wo findet der Kurs statt?",
        options: ["Im Raum 2", "Im Raum 12", "Im Raum 21"],
        correct: 1,
        explanation: "'im Raum zwölf' — kurs 12. odada.",
      },
      {
        id: 4,
        shortAudio: "Achtung! Der Prüfungstermin ist am Freitag, den vierzehnten April, um zehn Uhr.",
        question: "Wann ist die Prüfung?",
        options: ["Donnerstag, 14. April", "Freitag, 14. April", "Samstag, 14. April"],
        correct: 1,
        explanation: "'am Freitag, den vierzehnten April' — sınav 14 Nisan Cuma.",
      },
      {
        id: 5,
        shortAudio: "Der Unterricht endet heute früher, um dreizehn Uhr. Auf Wiedersehen!",
        question: "Wann endet der Unterricht heute?",
        options: ["Um 12 Uhr", "Um 13 Uhr", "Um 14 Uhr"],
        correct: 1,
        explanation: "'um dreizehn Uhr' — bugün ders saat 13'te bitiyor.",
      },
    ],
    xp: 35,
  },

  // ── Teil 4: Ansagen — Einkaufen & Preise ─────────────────────────────────
  {
    id: 4,
    type: "ansagen",
    typeLabel: "Ansagen",
    typeLabelTr: "Alışveriş Duyuruları",
    title: "Im Supermarkt und beim Einkaufen",
    difficulty: 1,
    instruction: "Sie hören fünf Ansagen aus dem Supermarkt. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        shortAudio: "Heute haben wir frische Äpfel im Angebot: ein Kilo für neunundneunzig Cent!",
        question: "Was ist heute im Angebot?",
        options: ["Bananen", "Äpfel", "Orangen"],
        correct: 1,
        explanation: "'frische Äpfel im Angebot' — bugün elma indirimde.",
      },
      {
        id: 2,
        shortAudio: "Liebe Kunden, die Kasse Nummer drei ist jetzt geöffnet. Bitte kommen Sie!",
        question: "Was ist jetzt geöffnet?",
        options: ["Die Kasse Nummer 1", "Die Kasse Nummer 3", "Die Kasse Nummer 5"],
        correct: 1,
        explanation: "'Kasse Nummer drei ist geöffnet' — 3 numaralı kasa açıldı.",
      },
      {
        id: 3,
        shortAudio: "Unser Markt schließt heute um zwanzig Uhr. Bitte kommen Sie morgen wieder!",
        question: "Wann schließt der Markt heute?",
        options: ["Um 18 Uhr", "Um 19 Uhr", "Um 20 Uhr"],
        correct: 2,
        explanation: "'schließt um zwanzig Uhr' — market saat 20'de kapanıyor.",
      },
      {
        id: 4,
        shortAudio: "Achtung! Wir suchen den Eigentümer eines roten Regenschirms. Bitte kommen Sie zur Information.",
        question: "Was wurde gefunden?",
        options: ["Eine rote Tasche", "Ein roter Regenschirm", "Ein rotes Portemonnaie"],
        correct: 1,
        explanation: "'einen roten Regenschirm' — kırmızı şemsiye bulunmuş.",
      },
      {
        id: 5,
        shortAudio: "Sonderangebot! Milch, ein Liter, kostet heute nur siebenundsiebzig Cent.",
        question: "Was kostet die Milch heute?",
        options: ["57 Cent", "77 Cent", "97 Cent"],
        correct: 1,
        explanation: "'siebenundsiebzig Cent' — süt bugün 77 sent.",
      },
    ],
    xp: 35,
  },

  // ── Teil 5: Ansagen — Freizeit & Veranstaltungen ─────────────────────────
  {
    id: 5,
    type: "ansagen",
    typeLabel: "Ansagen",
    typeLabelTr: "Etkinlik Duyuruları",
    title: "Freizeit und Veranstaltungen",
    difficulty: 2,
    instruction: "Sie hören fünf kurze Ansagen über Freizeit und Veranstaltungen. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        shortAudio: "Das Konzert beginnt um neunzehn Uhr dreißig. Bitte kommen Sie pünktlich!",
        question: "Wann beginnt das Konzert?",
        options: ["Um 17:30", "Um 19:30", "Um 21:30"],
        correct: 1,
        explanation: "'um neunzehn Uhr dreißig' — konser 19:30'da başlıyor.",
      },
      {
        id: 2,
        shortAudio: "Das Stadtfest findet am Samstag und Sonntag auf dem Marktplatz statt.",
        question: "Wo findet das Stadtfest statt?",
        options: ["Im Park", "Am Bahnhof", "Auf dem Marktplatz"],
        correct: 2,
        explanation: "'auf dem Marktplatz' — şehir festivali pazar meydanında.",
      },
      {
        id: 3,
        shortAudio: "Der Deutschkurs Niveau A1 kostet einhundert Euro pro Monat.",
        question: "Was kostet der Kurs pro Monat?",
        options: ["50 Euro", "100 Euro", "150 Euro"],
        correct: 1,
        explanation: "'einhundert Euro pro Monat' — kurs aylık 100 Euro.",
      },
      {
        id: 4,
        shortAudio: "Das Fußballspiel beginnt um fünfzehn Uhr. Eintritt frei!",
        question: "Was kostet der Eintritt zum Fußballspiel?",
        options: ["5 Euro", "10 Euro", "Nichts, es ist kostenlos."],
        correct: 2,
        explanation: "'Eintritt frei' = giriş ücretsiz.",
      },
      {
        id: 5,
        shortAudio: "Wegen des Regens findet das Picknick heute nicht im Park statt. Es ist im Gemeindehaus.",
        question: "Wo ist das Picknick heute?",
        options: ["Im Park", "Im Gemeindehaus", "Im Restaurant"],
        correct: 1,
        explanation: "'im Gemeindehaus' — yağmur nedeniyle piknik toplum merkezinde.",
      },
    ],
    xp: 40,
  },

  // ── Teil 6: Gespräche — Sich vorstellen ──────────────────────────────────
  {
    id: 6,
    type: "gespraeche",
    typeLabel: "Gespräch",
    typeLabelTr: "Tanışma Diyaloğu",
    title: "Sich vorstellen und kennenlernen",
    difficulty: 1,
    maleSpeakers: ["Peter"],
    audioText:
      "Peter: Hallo! Ich heiße Peter. Wie heißt du?\nSara: Hallo Peter! Ich bin Sara. Woher kommst du?\nPeter: Ich komme aus Deutschland, aus München. Und du?\nSara: Ich komme aus der Türkei, aus Istanbul.\nPeter: Oh, toll! Wie lange bist du schon hier?\nSara: Ich bin seit drei Monaten hier. Ich lerne Deutsch.\nPeter: Super! Wo lernst du Deutsch?\nSara: In der Sprachschule, hier in der Stadtmitte. Der Kurs ist sehr gut.\nPeter: Was machst du in Deutschland?\nSara: Ich studiere Medizin an der Universität.\nPeter: Das ist interessant! Ich arbeite als Lehrer.",
    instruction: "Sie hören ein Gespräch zwischen Peter und Sara. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Woher kommt Peter?",
        options: ["Aus Österreich", "Aus Deutschland", "Aus der Schweiz"],
        correct: 1,
        explanation: "'Ich komme aus Deutschland, aus München' — Peter Almanya'dan, Münih'ten.",
      },
      {
        id: 2,
        question: "Wie lange ist Sara schon in Deutschland?",
        options: ["Seit einem Monat", "Seit drei Monaten", "Seit einem Jahr"],
        correct: 1,
        explanation: "'seit drei Monaten' — Sara 3 aydır Almanya'da.",
      },
      {
        id: 3,
        question: "Wo lernt Sara Deutsch?",
        options: ["Zu Hause", "In der Universität", "In der Sprachschule"],
        correct: 2,
        explanation: "'In der Sprachschule, hier in der Stadtmitte' — şehir merkezindeki dil okulunda.",
      },
      {
        id: 4,
        question: "Was studiert Sara?",
        options: ["Sprachen", "Medizin", "Informatik"],
        correct: 1,
        explanation: "'Ich studiere Medizin' — Sara tıp okuyor.",
      },
      {
        id: 5,
        question: "Was ist Peters Beruf?",
        options: ["Arzt", "Ingenieur", "Lehrer"],
        correct: 2,
        explanation: "'Ich arbeite als Lehrer' — Peter öğretmen.",
      },
    ],
    xp: 40,
  },

  // ── Teil 7: Gespräche — Im Café ──────────────────────────────────────────
  {
    id: 7,
    type: "gespraeche",
    typeLabel: "Gespräch",
    typeLabelTr: "Kafede Diyalog",
    title: "Im Café bestellen",
    difficulty: 1,
    maleSpeakers: ["Kellner"],
    audioText:
      "Kellner: Guten Tag! Was möchten Sie?\nKundin: Guten Tag! Ich möchte bitte einen Kaffee und ein Stück Kuchen.\nKellner: Welchen Kuchen möchten Sie? Wir haben Käsekuchen und Schokoladenkuchen.\nKundin: Ich nehme den Käsekuchen, bitte.\nKellner: Und was für einen Kaffee? Espresso, Cappuccino oder normaler Kaffee?\nKundin: Einen Cappuccino, bitte.\nKellner: Gerne! Möchten Sie auch etwas Wasser?\nKundin: Ja, ein kleines Wasser, bitte.\nKellner: Alles klar. Das macht zusammen vier Euro fünfzig.\nKundin: Hier sind fünf Euro.\nKellner: Danke! Fünfzig Cent zurück.",
    instruction: "Sie hören ein Gespräch in einem Café. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Was bestellt die Kundin zu trinken?",
        options: ["Einen Espresso", "Einen Cappuccino", "Einen Tee"],
        correct: 1,
        explanation: "'Einen Cappuccino, bitte' — müşteri cappuccino istiyor.",
      },
      {
        id: 2,
        question: "Welchen Kuchen nimmt die Kundin?",
        options: ["Schokoladenkuchen", "Apfelkuchen", "Käsekuchen"],
        correct: 2,
        explanation: "'Ich nehme den Käsekuchen' — müşteri cheesecake alıyor.",
      },
      {
        id: 3,
        question: "Wie viel kostet alles zusammen?",
        options: ["3,50 Euro", "4,50 Euro", "5,50 Euro"],
        correct: 1,
        explanation: "'Das macht zusammen vier Euro fünfzig' — toplam 4,50 €.",
      },
      {
        id: 4,
        question: "Wie viel Geld gibt die Kundin?",
        options: ["4 Euro", "5 Euro", "6 Euro"],
        correct: 1,
        explanation: "'Hier sind fünf Euro' — müşteri 5 Euro veriyor.",
      },
      {
        id: 5,
        question: "Was bekommt die Kundin zurück?",
        options: ["20 Cent", "50 Cent", "1 Euro"],
        correct: 1,
        explanation: "'Fünfzig Cent zurück' — 50 sent para üstü.",
      },
    ],
    xp: 40,
  },

  // ── Teil 8: Gespräche — Familie ───────────────────────────────────────────
  {
    id: 8,
    type: "gespraeche",
    typeLabel: "Gespräch",
    typeLabelTr: "Aile Diyaloğu",
    title: "Über die Familie sprechen",
    difficulty: 2,
    maleSpeakers: ["Klaus"],
    audioText:
      "Klaus: Hallo Mia! Wie geht's deiner Familie?\nMia: Danke, gut! Meine Familie ist groß. Ich habe zwei Brüder und eine Schwester.\nKlaus: Oh! Bist du die Älteste?\nMia: Nein, ich bin die Jüngste. Meine Schwester ist dreiundzwanzig und ich bin zwanzig.\nKlaus: Und was machen deine Brüder?\nMia: Mein älterer Bruder Felix studiert Informatik. Er ist fünfundzwanzig.\nKlaus: Und der andere?\nMia: Tim ist zweiundzwanzig. Er macht eine Ausbildung als Koch.\nKlaus: Wohnen alle zusammen?\nMia: Nein. Felix wohnt in Berlin. Wir anderen wohnen noch bei meinen Eltern.",
    instruction: "Sie hören ein Gespräch über Mias Familie. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Wie viele Geschwister hat Mia?",
        options: ["Zwei", "Drei", "Vier"],
        correct: 1,
        explanation: "'zwei Brüder und eine Schwester' = 3 kardeş. Mia 3 kardeşi var.",
      },
      {
        id: 2,
        question: "Wie alt ist Mia?",
        options: ["20 Jahre", "22 Jahre", "23 Jahre"],
        correct: 0,
        explanation: "'ich bin zwanzig' — Mia 20 yaşında.",
      },
      {
        id: 3,
        question: "Was studiert Felix?",
        options: ["Medizin", "Informatik", "Sprachen"],
        correct: 1,
        explanation: "'studiert Informatik' — Felix bilgisayar mühendisliği okuyor.",
      },
      {
        id: 4,
        question: "Was macht Tim?",
        options: ["Er studiert.", "Er arbeitet als Kellner.", "Er macht eine Ausbildung als Koch."],
        correct: 2,
        explanation: "'Er macht eine Ausbildung als Koch' — Tim aşçılık eğitimi yapıyor.",
      },
      {
        id: 5,
        question: "Wo wohnt Felix?",
        options: ["In München", "In Hamburg", "In Berlin"],
        correct: 2,
        explanation: "'Felix wohnt in Berlin' — Felix Berlin'de yaşıyor.",
      },
    ],
    xp: 40,
  },

  // ── Teil 9: Informationen — Wohnung suchen ────────────────────────────────
  {
    id: 9,
    type: "informationen",
    typeLabel: "Information",
    typeLabelTr: "Bilgi Metni",
    title: "Eine Wohnung suchen",
    difficulty: 2,
    audioText:
      "Hallo! Mein Name ist Jana. Ich suche eine Wohnung in der Stadt. Die Wohnung soll nicht zu groß sein — ein Zimmer oder zwei Zimmer sind genug. Ich brauche eine Küche und ein Bad. Eine Terrasse oder ein Balkon wäre schön, aber nicht nötig. Die Miete soll maximal fünfhundert Euro pro Monat kosten. Ich möchte nicht weit vom Bahnhof wohnen, weil ich jeden Tag mit dem Zug zur Arbeit fahre. Haustiere habe ich nicht. Ich bin ruhig und ordentlich.",
    instruction: "Sie hören einen kurzen Text über Jana. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Wie viele Zimmer soll Janas Wohnung haben?",
        options: ["Drei oder vier Zimmer", "Ein oder zwei Zimmer", "Mindestens fünf Zimmer"],
        correct: 1,
        explanation: "'ein Zimmer oder zwei Zimmer sind genug' — 1 ya da 2 oda yeterli.",
      },
      {
        id: 2,
        question: "Wie viel möchte Jana maximal Miete zahlen?",
        options: ["300 Euro", "400 Euro", "500 Euro"],
        correct: 2,
        explanation: "'maximal fünfhundert Euro pro Monat' — en fazla 500 € kira.",
      },
      {
        id: 3,
        question: "Warum möchte Jana nah am Bahnhof wohnen?",
        options: ["Sie fährt jeden Tag mit dem Zug.", "Sie mag Züge.", "Ihre Familie wohnt dort."],
        correct: 0,
        explanation: "'weil ich jeden Tag mit dem Zug zur Arbeit fahre' — her gün trenle işe gidiyor.",
      },
      {
        id: 4,
        question: "Hat Jana Haustiere?",
        options: ["Ja, einen Hund.", "Ja, eine Katze.", "Nein, keine."],
        correct: 2,
        explanation: "'Haustiere habe ich nicht' — Jana'nın evcil hayvanı yok.",
      },
      {
        id: 5,
        question: "Was wäre schön, aber ist nicht nötig?",
        options: ["Eine Küche", "Ein Balkon", "Ein Bad"],
        correct: 1,
        explanation: "'eine Terrasse oder ein Balkon wäre schön, aber nicht nötig' — balkon olsa iyi ama şart değil.",
      },
    ],
    xp: 45,
  },

  // ── Teil 10: Informationen — Alltag in Deutschland ────────────────────────
  {
    id: 10,
    type: "informationen",
    typeLabel: "Information",
    typeLabelTr: "Bilgi Metni",
    title: "Mein Alltag in Deutschland",
    difficulty: 2,
    audioText:
      "Mein Name ist Ali. Ich komme aus der Türkei und lebe seit sechs Monaten in Hamburg. Jeden Morgen stehe ich um sieben Uhr auf. Ich frühstücke zu Hause: Brot, Käse und Tee. Dann fahre ich mit der U-Bahn zur Sprachschule. Der Kurs beginnt um neun Uhr und endet um dreizehn Uhr. Nachmittags lerne ich zu Hause oder gehe einkaufen. Abends koche ich meistens selbst. Ich koche gerne türkisches Essen. Manchmal gehe ich auch ins Restaurant mit Freunden. Am Wochenende erkunde ich die Stadt. Hamburg ist sehr schön — ich mag besonders den Hafen.",
    instruction: "Sie hören einen kurzen Text über Ali. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Woher kommt Ali?",
        options: ["Aus Deutschland", "Aus der Türkei", "Aus Österreich"],
        correct: 1,
        explanation: "'Ich komme aus der Türkei' — Ali Türkiye'den geliyor.",
      },
      {
        id: 2,
        question: "Wann steht Ali auf?",
        options: ["Um 6 Uhr", "Um 7 Uhr", "Um 8 Uhr"],
        correct: 1,
        explanation: "'stehe ich um sieben Uhr auf' — Ali saat 7'de kalkıyor.",
      },
      {
        id: 3,
        question: "Wie fährt Ali zur Sprachschule?",
        options: ["Mit dem Bus", "Mit dem Fahrrad", "Mit der U-Bahn"],
        correct: 2,
        explanation: "'fahre ich mit der U-Bahn zur Sprachschule' — metro ile dil okuluna gidiyor.",
      },
      {
        id: 4,
        question: "Wann endet der Kurs?",
        options: ["Um 12 Uhr", "Um 13 Uhr", "Um 14 Uhr"],
        correct: 1,
        explanation: "'endet um dreizehn Uhr' — kurs saat 13'te bitiyor.",
      },
      {
        id: 5,
        question: "Was mag Ali besonders in Hamburg?",
        options: ["Den Park", "Den Hafen", "Die Einkaufszentren"],
        correct: 1,
        explanation: "'ich mag besonders den Hafen' — Ali özellikle limanı seviyor.",
      },
    ],
    xp: 45,
  },
];

// ── B2 — Teile 1–10: Kurztexte (richtig/falsch) ──────────────────────────────

const B2_TEILE: HorenTeil[] = [
  {
    id: 1,
    type: "ansagen",
    typeLabel: "Kurztexte & Berichte",
    typeLabelTr: "Kısa Metinler ve Haberler",
    title: "Ehrenamt in Deutschland",
    difficulty: 2,
    questionFormat: "richtigfalsch",
    instruction: "Sie hören fünf kurze Texte zu gesellschaftlichen Themen. Entscheiden Sie: Ist die Aussage richtig oder falsch?",
    questions: [
      {
        id: 1,
        shortAudio: "In Deutschland engagieren sich etwa achtundzwanzig Millionen Menschen ehrenamtlich. Das entspricht ungefähr einem Drittel der Bevölkerung. Die häufigsten Bereiche sind Sport, Kirche und soziale Arbeit.",
        question: "Mehr als die Hälfte der deutschen Bevölkerung ist ehrenamtlich aktiv.",
        correct: 1,
        explanation: "Falsch. Etwa ein Drittel der Bevölkerung ist ehrenamtlich tätig — nicht mehr als die Hälfte.",
      },
      {
        id: 2,
        shortAudio: "Eine Studie zeigt, dass junge Menschen zwischen sechzehn und dreißig Jahren seltener ehrenamtlich tätig sind als ältere Generationen. Experten führen dies auf veränderte Lebensumstände und weniger Freizeit zurück.",
        question: "Junge Menschen zwischen 16 und 30 Jahren sind laut der Studie weniger ehrenamtlich aktiv als ältere.",
        correct: 0,
        explanation: "Richtig. Junge Menschen sind seltener ehrenamtlich tätig als ältere Generationen.",
      },
      {
        id: 3,
        shortAudio: "Ehrenamtliches Engagement wird in Deutschland steuerlich gefördert. Wer als Übungsleiter oder Trainer tätig ist, kann bis zu dreitausend Euro pro Jahr steuerfrei verdienen. Auch andere Ehrenamtliche können von Freibeträgen profitieren.",
        question: "Ehrenamtliche Arbeit wird in Deutschland steuerlich nicht anerkannt.",
        correct: 1,
        explanation: "Falsch. Es gibt Steuerbefreiungen — zum Beispiel bis zu 3.000 € für Übungsleiter.",
      },
      {
        id: 4,
        shortAudio: "Der Trend zum Ehrenamt hat sich in den letzten Jahren verändert. Immer mehr Menschen bevorzugen kurzfristiges, projektbezogenes Engagement statt langfristiger Mitgliedschaft in Vereinen. Diese Form nennt man 'Episodisches Ehrenamt'.",
        question: "Der aktuelle Trend geht hin zu langfristiger Vereinsmitgliedschaft.",
        correct: 1,
        explanation: "Falsch. Der Trend geht zu kurzfristigem, projektbezogenem Engagement — dem 'Episodischen Ehrenamt'.",
      },
      {
        id: 5,
        shortAudio: "Ehrenamtliche Tätigkeiten können auch für die eigene Karriere nützlich sein. Viele Arbeitgeber schätzen soziales Engagement und sehen es als Zeichen von Verantwortungsbewusstsein und Teamfähigkeit. Im Lebenslauf kann es daher ein Vorteil sein.",
        question: "Ehrenamtliche Erfahrungen können bei der Jobsuche von Vorteil sein.",
        correct: 0,
        explanation: "Richtig. Arbeitgeber schätzen soziales Engagement als Zeichen von Teamfähigkeit und Verantwortungsbewusstsein.",
      },
    ],
    xp: 55,
  },

  {
    id: 2,
    type: "ansagen",
    typeLabel: "Kurztexte & Berichte",
    typeLabelTr: "Kısa Metinler ve Haberler",
    title: "Schlaf und Gesundheit",
    difficulty: 2,
    questionFormat: "richtigfalsch",
    instruction: "Sie hören fünf kurze Texte zum Thema Schlaf und Gesundheit. Entscheiden Sie: richtig oder falsch?",
    questions: [
      {
        id: 1,
        shortAudio: "Schlafmangel hat laut aktuellen Studien schwerwiegende Folgen für die Gesundheit. Wer dauerhaft weniger als sechs Stunden pro Nacht schläft, hat ein deutlich erhöhtes Risiko für Herz-Kreislauf-Erkrankungen und Typ-2-Diabetes.",
        question: "Schlafmangel erhöht das Risiko für Herz-Kreislauf-Erkrankungen und Diabetes.",
        correct: 0,
        explanation: "Richtig. Weniger als 6 Stunden Schlaf pro Nacht erhöht das Risiko für diese Erkrankungen nachweislich.",
      },
      {
        id: 2,
        shortAudio: "Viele Menschen glauben, dass man verlorenen Schlaf am Wochenende nachholen kann. Wissenschaftler haben jedoch nachgewiesen, dass dies nur bedingt möglich ist. Die kognitiven Beeinträchtigungen durch Schlafmangel verschwinden nicht vollständig.",
        question: "Schlafmangel kann laut Wissenschaftlern vollständig durch Ausschlafen am Wochenende behoben werden.",
        correct: 1,
        explanation: "Falsch. Verlorener Schlaf kann nur bedingt nachgeholt werden — kognitive Beeinträchtigungen bleiben teilweise bestehen.",
      },
      {
        id: 3,
        shortAudio: "Die empfohlene Schlafdauer für Erwachsene liegt zwischen sieben und neun Stunden pro Nacht. Für Jugendliche sind es hingegen acht bis zehn Stunden, da ihr Gehirn noch in der Entwicklung ist.",
        question: "Erwachsene und Jugendliche brauchen gleich viel Schlaf.",
        correct: 1,
        explanation: "Falsch. Erwachsene brauchen 7–9 Stunden, Jugendliche 8–10 Stunden.",
      },
      {
        id: 4,
        shortAudio: "Forscher haben herausgefunden, dass sogenannte Chronotypen genetisch bedingt sind. Manche Menschen sind von Natur aus Frühaufsteher, andere eher Spätschläfer. Das erzwungene frühe Aufstehen für Arbeit oder Schule kann langfristig die Gesundheit beeinträchtigen.",
        question: "Der eigene Schlafrhythmus ist nach neuen Erkenntnissen genetisch beeinflusst.",
        correct: 0,
        explanation: "Richtig. Chronotypen — ob Frühaufsteher oder Spätschläfer — sind genetisch bedingt.",
      },
      {
        id: 5,
        shortAudio: "Schlafprobleme betreffen in Deutschland schätzungsweise fünfzehn bis zwanzig Prozent der Bevölkerung. Die häufigste Ursache sind Stress und psychische Belastungen. Medikamente gegen Schlafstörungen sollten nur kurzfristig eingenommen werden.",
        question: "In Deutschland leidet die Mehrheit der Bevölkerung unter Schlafproblemen.",
        correct: 1,
        explanation: "Falsch. Etwa 15–20% sind betroffen — das ist nicht die Mehrheit der Bevölkerung.",
      },
    ],
    xp: 55,
  },

  {
    id: 3,
    type: "ansagen",
    typeLabel: "Kurztexte & Berichte",
    typeLabelTr: "Kısa Metinler ve Haberler",
    title: "Klimawandel und Energie",
    difficulty: 2,
    questionFormat: "richtigfalsch",
    instruction: "Sie hören fünf kurze Texte zum Thema Klimawandel und Energie. Entscheiden Sie: richtig oder falsch?",
    questions: [
      {
        id: 1,
        shortAudio: "Deutschland hat sich zum Ziel gesetzt, bis zweitausend fünfundvierzig klimaneutral zu sein. Dafür soll der Anteil erneuerbarer Energien am Stromverbrauch bis zweitausend dreißig auf achtzig Prozent gesteigert werden.",
        question: "Deutschland plant, bis 2045 klimaneutral zu werden.",
        correct: 0,
        explanation: "Richtig. Das gesetzlich festgelegte Ziel ist Klimaneutralität bis 2045.",
      },
      {
        id: 2,
        shortAudio: "Der Ausbau der Windenergie in Deutschland stößt häufig auf Widerstand aus der Bevölkerung. Hauptkritikpunkte sind Lärm, die optische Beeinträchtigung der Landschaft und mögliche Auswirkungen auf Vögel und Fledermäuse.",
        question: "Der Ausbau der Windenergie wird in Deutschland von der gesamten Bevölkerung unterstützt.",
        correct: 1,
        explanation: "Falsch. Es gibt häufig Widerstand — u.a. wegen Lärm und Auswirkungen auf die Natur.",
      },
      {
        id: 3,
        shortAudio: "Laut einer aktuellen Studie verursacht der Flugverkehr weltweit etwa drei bis vier Prozent der menschengemachten Treibhausgasemissionen. Durch Kondensstreifen und andere Effekte könnte der tatsächliche Klimaeinfluss jedoch zwei- bis dreimal höher sein.",
        question: "Der Klimaeinfluss des Flugverkehrs beschränkt sich laut der Studie auf direkte CO₂-Emissionen.",
        correct: 1,
        explanation: "Falsch. Durch Kondensstreifen und andere Effekte könnte der tatsächliche Einfluss zwei- bis dreimal höher sein.",
      },
      {
        id: 4,
        shortAudio: "Die Arktis erwärmt sich dreimal schneller als der globale Durchschnitt. Dies führt zum Schmelzen des Permafrosts, was wiederum große Mengen Methan freisetzt — ein Treibhausgas, das kurzfristig vierzig Mal wärmer wirkt als Kohlendioxid.",
        question: "Methan hat kurzfristig eine stärkere Klimawirkung als Kohlendioxid.",
        correct: 0,
        explanation: "Richtig. Methan wirkt kurzfristig etwa 40 Mal stärker als CO₂.",
      },
      {
        id: 5,
        shortAudio: "Viele Experten betonen, dass individuelle Verhaltensänderungen allein nicht ausreichen, um den Klimawandel zu stoppen. Strukturelle Veränderungen in Wirtschaft, Energie und Verkehr seien mindestens genauso wichtig wie der persönliche CO₂-Fußabdruck.",
        question: "Experten zufolge sind ausschließlich individuelle Maßnahmen entscheidend für den Klimaschutz.",
        correct: 1,
        explanation: "Falsch. Strukturelle Veränderungen in Wirtschaft und Energie sind mindestens genauso wichtig wie individuelle Maßnahmen.",
      },
    ],
    xp: 55,
  },

  {
    id: 4,
    type: "ansagen",
    typeLabel: "Kurztexte & Berichte",
    typeLabelTr: "Kısa Metinler ve Haberler",
    title: "Fachkräftemangel",
    difficulty: 2,
    questionFormat: "richtigfalsch",
    instruction: "Sie hören fünf kurze Texte zum Thema Arbeitsmarkt. Entscheiden Sie: richtig oder falsch?",
    questions: [
      {
        id: 1,
        shortAudio: "In Deutschland fehlen aktuell schätzungsweise sieben Millionen Fachkräfte. Am stärksten betroffen sind die Bereiche Pflege, IT und das Handwerk. Experten erwarten, dass sich der Mangel in den kommenden Jahren noch verschärfen wird.",
        question: "Der Fachkräftemangel betrifft in Deutschland vor allem den Bildungsbereich.",
        correct: 1,
        explanation: "Falsch. Am stärksten betroffen sind Pflege, IT und das Handwerk.",
      },
      {
        id: 2,
        shortAudio: "Um dem Fachkräftemangel entgegenzuwirken, hat Deutschland das Fachkräfteeinwanderungsgesetz reformiert. Es soll qualifizierten Arbeitskräften aus Nicht-EU-Ländern den Zuzug nach Deutschland erleichtern.",
        question: "Das reformierte Gesetz soll es für Fachkräfte aus Nicht-EU-Ländern einfacher machen, nach Deutschland zu kommen.",
        correct: 0,
        explanation: "Richtig. Das Fachkräfteeinwanderungsgesetz soll qualifizierten Nicht-EU-Bürgern den Zuzug erleichtern.",
      },
      {
        id: 3,
        shortAudio: "Viele Unternehmen reagieren auf den Fachkräftemangel, indem sie in die Ausbildung eigener Mitarbeiter investieren. Laut einer Umfrage planen fünfzig Prozent der Betriebe, ihr Weiterbildungsangebot in den nächsten zwei Jahren auszubauen.",
        question: "Nur wenige Unternehmen planen, in die Weiterbildung ihrer Mitarbeiter zu investieren.",
        correct: 1,
        explanation: "Falsch. Die Hälfte der Betriebe plant, das Weiterbildungsangebot auszubauen.",
      },
      {
        id: 4,
        shortAudio: "Demografischer Wandel ist eine der Hauptursachen für den Fachkräftemangel. In den nächsten zehn Jahren werden die geburtenstarken Jahrgänge der sechziger und siebziger Jahre in Rente gehen, ohne dass ausreichend Nachwuchs vorhanden ist.",
        question: "Der Fachkräftemangel ist hauptsächlich auf mangelnde Ausbildungsbereitschaft zurückzuführen.",
        correct: 1,
        explanation: "Falsch. Der demografische Wandel — der Renteneintritt der Babyboomer — ist die Hauptursache.",
      },
      {
        id: 5,
        shortAudio: "Flexible Arbeitszeiten und Homeoffice-Möglichkeiten sind für viele Fachkräfte inzwischen wichtiger als ein überdurchschnittliches Gehalt. Unternehmen, die diese Optionen nicht anbieten, haben zunehmend Schwierigkeiten, qualifiziertes Personal zu finden.",
        question: "Für Fachkräfte ist das Gehalt wichtiger als flexible Arbeitszeiten.",
        correct: 1,
        explanation: "Falsch. Flexible Arbeitszeiten und Homeoffice sind für viele Fachkräfte inzwischen wichtiger als ein hohes Gehalt.",
      },
    ],
    xp: 55,
  },

  {
    id: 5,
    type: "ansagen",
    typeLabel: "Kurztexte & Berichte",
    typeLabelTr: "Kısa Metinler ve Haberler",
    title: "Hochschule und Bildung",
    difficulty: 2,
    questionFormat: "richtigfalsch",
    instruction: "Sie hören fünf kurze Texte zum Thema Hochschule und Bildung. Entscheiden Sie: richtig oder falsch?",
    questions: [
      {
        id: 1,
        shortAudio: "Die Bologna-Reform hat die europäische Hochschullandschaft grundlegend verändert. Seit ihrer Einführung werden Studienleistungen in Leistungspunkten gemessen, und Abschlüsse sind europaweit leichter vergleichbar und anerkannt.",
        question: "Durch die Bologna-Reform sind Studienabschlüsse europaweit vergleichbarer geworden.",
        correct: 0,
        explanation: "Richtig. Das war eines der Hauptziele der Bologna-Reform.",
      },
      {
        id: 2,
        shortAudio: "Viele Studierende kritisieren das Bachelor-Master-System als zu verschult. Der Druck durch Klausuren und Prüfungen sei höher als früher, und die Zeit für freie intellektuelle Auseinandersetzung mit Themen fehle.",
        question: "Studierende loben das Bachelor-Master-System für seine Flexibilität.",
        correct: 1,
        explanation: "Falsch. Viele Studierende kritisieren das System als zu verschult und prüfungsintensiv.",
      },
      {
        id: 3,
        shortAudio: "Die Studienabbrecherquote in Deutschland liegt je nach Fach zwischen zwanzig und fünfzig Prozent. Hauptgründe für den Abbruch sind finanzielle Probleme, falsche Studienerwartungen und persönliche Schwierigkeiten.",
        question: "Finanzielle Gründe spielen bei Studienabbrüchen keine wichtige Rolle.",
        correct: 1,
        explanation: "Falsch. Finanzielle Probleme sind einer der Hauptgründe für Studienabbrüche.",
      },
      {
        id: 4,
        shortAudio: "In globalen Universitätsrankings finden sich mehrere deutsche Hochschulen unter den besten zweihundert Institutionen weltweit, wenn auch kaum unter den Top zwanzig.",
        question: "Einige deutsche Hochschulen sind in den globalen Top-200-Rankings vertreten.",
        correct: 0,
        explanation: "Richtig. Mehrere deutsche Hochschulen sind unter den besten 200 weltweit, aber kaum in den Top 20.",
      },
      {
        id: 5,
        shortAudio: "In Deutschland ist das Studium an staatlichen Hochschulen in den meisten Bundesländern kostenfrei. Lediglich in zwei Bundesländern werden noch allgemeine Studiengebühren erhoben. Dazu kommen jedoch Semesterbeiträge für Verwaltungskosten und das Semesterticket.",
        question: "An allen deutschen staatlichen Hochschulen ist das Studium vollständig kostenlos.",
        correct: 1,
        explanation: "Falsch. In zwei Bundesländern gibt es noch Studiengebühren, und Semesterbeiträge werden überall erhoben.",
      },
    ],
    xp: 55,
  },

  {
    id: 6,
    type: "ansagen",
    typeLabel: "Kurztexte & Berichte",
    typeLabelTr: "Kısa Metinler ve Haberler",
    title: "Psychische Gesundheit",
    difficulty: 2,
    questionFormat: "richtigfalsch",
    instruction: "Sie hören fünf kurze Texte zum Thema psychische Gesundheit. Entscheiden Sie: richtig oder falsch?",
    questions: [
      {
        id: 1,
        shortAudio: "Burnout wird nicht als eigenständige Erkrankung in der Internationalen Klassifikation der Krankheiten gelistet, sondern als Risikofaktor anerkannt. Trotzdem hat sich die Anzahl der Fehltage wegen psychischer Erkrankungen in Deutschland in den letzten zwanzig Jahren verdoppelt.",
        question: "Burnout gilt in der medizinischen Klassifikation als eigenständige Krankheit.",
        correct: 1,
        explanation: "Falsch. Burnout ist als Risikofaktor anerkannt, aber nicht als eigenständige Erkrankung klassifiziert.",
      },
      {
        id: 2,
        shortAudio: "Psychische Erkrankungen sind in Deutschland die häufigste Ursache für Frühverrentung. Viele Betroffene erhalten jedoch keine angemessene Behandlung, weil die Wartezeiten auf einen Therapieplatz oft mehrere Monate betragen.",
        question: "Psychische Erkrankungen sind die häufigste Ursache für Frühverrentung in Deutschland.",
        correct: 0,
        explanation: "Richtig. Psychische Erkrankungen führen häufiger zur Frühverrentung als andere Erkrankungen.",
      },
      {
        id: 3,
        shortAudio: "Betriebliches Gesundheitsmanagement umfasst Maßnahmen wie Stressmanagement-Kurse, Sportangebote und Beratungsmöglichkeiten. Dennoch setzen noch nicht alle Unternehmen solche Programme um.",
        question: "Alle deutschen Unternehmen haben bereits betriebliche Gesundheitsmanagement-Programme eingeführt.",
        correct: 1,
        explanation: "Falsch. Noch nicht alle Unternehmen setzen solche Programme um.",
      },
      {
        id: 4,
        shortAudio: "Digitale Gesundheitsanwendungen, auch DiGA genannt, können in Deutschland seit zweitausend zwanzig von Ärzten und Therapeuten verschrieben werden. Diese Apps können psychologische Unterstützung leisten und die Wartezeiten auf Therapieplätze überbrücken.",
        question: "In Deutschland können Apps zur psychischen Gesundheitsunterstützung seit 2020 verschrieben werden.",
        correct: 0,
        explanation: "Richtig. DiGA — digitale Gesundheitsanwendungen — können seit 2020 verschrieben werden.",
      },
      {
        id: 5,
        shortAudio: "Soziale Isolation ist ein bedeutender Risikofaktor für psychische Erkrankungen. Die Corona-Pandemie hat dieses Problem verstärkt und zu einem Anstieg von Angststörungen und Depressionen geführt, insbesondere bei Jugendlichen und älteren Menschen.",
        question: "Die Pandemie hatte keine nachweisbaren Auswirkungen auf die psychische Gesundheit der Bevölkerung.",
        correct: 1,
        explanation: "Falsch. Die Pandemie führte zu einem Anstieg von Angststörungen und Depressionen, besonders bei Jugendlichen und Älteren.",
      },
    ],
    xp: 55,
  },

  {
    id: 7,
    type: "ansagen",
    typeLabel: "Kurztexte & Berichte",
    typeLabelTr: "Kısa Metinler ve Haberler",
    title: "Medien und Desinformation",
    difficulty: 3,
    questionFormat: "richtigfalsch",
    instruction: "Sie hören fünf kurze Texte zum Thema Medien und Desinformation. Entscheiden Sie: richtig oder falsch?",
    questions: [
      {
        id: 1,
        shortAudio: "Studien zeigen, dass Falschinformationen in sozialen Medien sechsmal häufiger weiterverbreitet werden als korrekte Informationen — ein Phänomen, das Forscher als 'Virality of Misinformation' bezeichnen.",
        question: "Falschinformationen verbreiten sich in sozialen Medien langsamer als korrekte Informationen.",
        correct: 1,
        explanation: "Falsch. Falschinformationen werden sechsmal häufiger geteilt als korrekte Informationen.",
      },
      {
        id: 2,
        shortAudio: "Algorithmen in sozialen Netzwerken verstärken die sogenannte Filterblase. Nutzer sehen immer häufiger Inhalte, die ihren eigenen Meinungen entsprechen, während anderslautende Perspektiven ausgeblendet werden. Dies kann die politische Polarisierung verstärken.",
        question: "Algorithmen sozialer Netzwerke können zur Verstärkung politischer Polarisierung beitragen.",
        correct: 0,
        explanation: "Richtig. Filterblasen durch Algorithmen blenden andere Perspektiven aus und verstärken Polarisierung.",
      },
      {
        id: 3,
        shortAudio: "In Deutschland sind Medienkompetenz und kritischer Umgang mit Informationen in den meisten Bundesländern Teil der Lehrpläne. Allerdings kritisieren Experten, dass die Umsetzung im Schulalltag oft lückenhaft sei.",
        question: "Medienkompetenz ist in allen deutschen Schulen vollständig und lückenlos im Unterricht verankert.",
        correct: 1,
        explanation: "Falsch. Die Umsetzung ist laut Experten oft lückenhaft, auch wenn es Teil der Lehrpläne ist.",
      },
      {
        id: 4,
        shortAudio: "Die EU-Plattform für Faktenchecks verbindet unabhängige Faktenchecker aus ganz Europa mit dem Ziel, Desinformationskampagnen koordiniert zu bekämpfen. Die Plattform finanziert sich aus öffentlichen Mitteln.",
        question: "Die EU-Faktencheckplattform wird privat finanziert.",
        correct: 1,
        explanation: "Falsch. Die Plattform finanziert sich aus öffentlichen Mitteln.",
      },
      {
        id: 5,
        shortAudio: "Tiefe Fake-Videos, sogenannte Deepfakes, werden immer überzeugender und schwerer erkennbar. Forscher entwickeln KI-basierte Erkennungssoftware, aber die Fälscher passen ihre Methoden ständig an — ein Wettrüsten ist im Gange.",
        question: "Deepfakes sind heute leicht durch Laien erkennbar.",
        correct: 1,
        explanation: "Falsch. Deepfakes werden immer überzeugender und schwerer erkennbar — ein Wettrüsten zwischen Fälschern und Erkennungssystemen.",
      },
    ],
    xp: 60,
  },

  {
    id: 8,
    type: "ansagen",
    typeLabel: "Kurztexte & Berichte",
    typeLabelTr: "Kısa Metinler ve Haberler",
    title: "Kultur und Literatur",
    difficulty: 2,
    questionFormat: "richtigfalsch",
    instruction: "Sie hören fünf kurze Texte zu Kultur und Literatur. Entscheiden Sie: richtig oder falsch?",
    questions: [
      {
        id: 1,
        shortAudio: "Die Frankfurter Buchmesse ist die weltweit größte Buchmesse und findet jährlich im Oktober statt. Sie zieht mehr als dreihundert tausend Besucher an und ist ein zentrales Ereignis für die internationale Verlagsbranche.",
        question: "Die Frankfurter Buchmesse ist die größte Buchmesse der Welt.",
        correct: 0,
        explanation: "Richtig. Die Frankfurter Buchmesse ist weltweit die größte und findet jährlich im Oktober statt.",
      },
      {
        id: 2,
        shortAudio: "Die öffentliche Kulturförderung in Deutschland beträgt jährlich etwa zehn Milliarden Euro. Diese Mittel fließen in Theater, Museen, Bibliotheken und Musikschulen. Deutschland gilt damit als eines der Länder mit der umfassendsten staatlichen Kulturförderung weltweit.",
        question: "Deutschland hat im internationalen Vergleich eine sehr geringe staatliche Kulturförderung.",
        correct: 1,
        explanation: "Falsch. Deutschland gilt als eines der Länder mit der umfassendsten staatlichen Kulturförderung.",
      },
      {
        id: 3,
        shortAudio: "Die Besucherzahlen in deutschen Theatern und Opernhäusern sind in den letzten Jahren trotz digitaler Konkurrenz stabil geblieben. Besonders bei jungen Menschen wächst das Interesse an zeitgenössischem Theater mit gesellschaftskritischen Inhalten.",
        question: "Theaterbesuche in Deutschland sind aufgrund digitaler Konkurrenz stark zurückgegangen.",
        correct: 1,
        explanation: "Falsch. Die Besucherzahlen sind stabil geblieben, und bei Jüngeren wächst sogar das Interesse.",
      },
      {
        id: 4,
        shortAudio: "Kafkas Werk wurde in mehr als fünfzig Sprachen übersetzt. Seine Bücher, besonders 'Die Verwandlung', gehören zum festen Bestandteil des Literaturunterrichts in vielen Ländern weltweit.",
        question: "Kafkas Bücher werden in mehr als fünfzig Sprachen gelesen.",
        correct: 0,
        explanation: "Richtig. Kafkas Werk wurde in mehr als 50 Sprachen übersetzt.",
      },
      {
        id: 5,
        shortAudio: "E-Books und Hörbücher erfreuen sich wachsender Beliebtheit, verdrängen das gedruckte Buch aber nicht vollständig. Laut einer aktuellen Studie geben sechzig Prozent der deutschen Buchleser an, weiterhin lieber gedruckte Bücher zu lesen.",
        question: "Laut der Studie bevorzugt die Mehrheit der deutschen Leser gedruckte Bücher.",
        correct: 0,
        explanation: "Richtig. 60% der Buchleser lesen lieber gedruckte Bücher — das ist die Mehrheit.",
      },
    ],
    xp: 55,
  },

  {
    id: 9,
    type: "ansagen",
    typeLabel: "Kurztexte & Berichte",
    typeLabelTr: "Kısa Metinler ve Haberler",
    title: "Digitalisierung und KI",
    difficulty: 3,
    questionFormat: "richtigfalsch",
    instruction: "Sie hören fünf kurze Texte zu Technologie und Digitalisierung. Entscheiden Sie: richtig oder falsch?",
    questions: [
      {
        id: 1,
        shortAudio: "Experten schätzen, dass Künstliche Intelligenz in den nächsten zehn Jahren bis zu dreißig Prozent aller Routinearbeiten automatisieren könnte. Bereits heute ist KI in Bereichen wie medizinische Diagnostik, Sprachassistenten und autonomes Fahren im Einsatz.",
        question: "KI könnte laut Experten in den nächsten zehn Jahren einen erheblichen Teil der Routinearbeiten automatisieren.",
        correct: 0,
        explanation: "Richtig. Experten schätzen, bis zu 30% der Routinearbeiten könnten automatisiert werden.",
      },
      {
        id: 2,
        shortAudio: "Der EU AI Act, der zweitausend vierundzwanzig in Kraft trat, klassifiziert KI-Systeme nach ihrem Risikoniveau. Hochrisiko-Anwendungen wie Gesichtserkennung oder medizinische Diagnostik unterliegen dabei besonders strengen Anforderungen.",
        question: "Der EU AI Act behandelt alle KI-Systeme nach dem gleichen Risikoniveau.",
        correct: 1,
        explanation: "Falsch. Der AI Act klassifiziert KI-Systeme nach ihrem Risikoniveau — Hochrisiko-Anwendungen unterliegen strengeren Anforderungen.",
      },
      {
        id: 3,
        shortAudio: "Deutschland belegt im internationalen Vergleich der Digitalisierung nur einen mittleren Rang. Vor allem in der öffentlichen Verwaltung und im Bildungssystem gibt es erheblichen Nachholbedarf. Länder wie Estland oder Dänemark gelten als deutlich weiter fortgeschritten.",
        question: "Deutschland ist im internationalen Vergleich bei der Digitalisierung sehr weit vorne.",
        correct: 1,
        explanation: "Falsch. Deutschland belegt nur einen mittleren Rang — besonders in Verwaltung und Bildung gibt es Nachholbedarf.",
      },
      {
        id: 4,
        shortAudio: "Quantencomputer nutzen quantenmechanische Prinzipien und können bestimmte Berechnungen exponentiell schneller durchführen als klassische Computer. Eine breite kommerzielle Nutzung wird jedoch erst für die nächsten zehn bis zwanzig Jahre erwartet.",
        question: "Quantencomputer sind bereits heute im großen Maßstab kommerziell im Einsatz.",
        correct: 1,
        explanation: "Falsch. Breite kommerzielle Nutzung wird erst in 10–20 Jahren erwartet.",
      },
      {
        id: 5,
        shortAudio: "Die Datenschutz-Grundverordnung, kurz DSGVO, gibt Bürgern das Recht, zu erfahren, welche Daten über sie gespeichert werden, und diese löschen zu lassen. Die Verordnung gilt in der gesamten Europäischen Union.",
        question: "Die DSGVO gilt nur für Unternehmen in Deutschland.",
        correct: 1,
        explanation: "Falsch. Die DSGVO gilt für die gesamte EU — nicht nur für Deutschland.",
      },
    ],
    xp: 60,
  },

  {
    id: 10,
    type: "ansagen",
    typeLabel: "Kurztexte & Berichte",
    typeLabelTr: "Kısa Metinler ve Haberler",
    title: "Demokratie und Politik",
    difficulty: 3,
    questionFormat: "richtigfalsch",
    instruction: "Sie hören fünf kurze Texte zu Politik und Gesellschaft. Entscheiden Sie: richtig oder falsch?",
    questions: [
      {
        id: 1,
        shortAudio: "Die Wahlbeteiligung bei der Bundestagswahl schwankt in Deutschland seit den siebziger Jahren erheblich. Während damals über neunzig Prozent der Wahlberechtigten zur Wahl gingen, sank die Beteiligung zeitweise auf unter siebzig Prozent.",
        question: "Die Wahlbeteiligung in Deutschland ist seit den siebziger Jahren konstant hoch geblieben.",
        correct: 1,
        explanation: "Falsch. Die Wahlbeteiligung ist erheblich geschwankt und sank zeitweise auf unter 70%.",
      },
      {
        id: 2,
        shortAudio: "Bürgerbeteiligung in der Stadtplanung gewinnt in vielen deutschen Kommunen an Bedeutung. Durch Bürgerentscheide, Anhörungen und digitale Plattformen können Bürger aktiv bei Bauprojekten und Stadtentwicklungsfragen mitwirken.",
        question: "In Deutschland gibt es Möglichkeiten für Bürger, sich an stadtplanerischen Entscheidungen zu beteiligen.",
        correct: 0,
        explanation: "Richtig. Bürgerentscheide und digitale Beteiligungsplattformen ermöglichen aktive Mitwirkung.",
      },
      {
        id: 3,
        shortAudio: "Deutschland ist eine föderale Demokratie, in der Bund und Länder geteilte Zuständigkeiten haben. Bildung und Polizei liegen hauptsächlich in der Zuständigkeit der Bundesländer, während Außenpolitik und Verteidigung Bundessache sind.",
        question: "In Deutschland ist Bildungspolitik hauptsächlich eine Bundesangelegenheit.",
        correct: 1,
        explanation: "Falsch. Bildung liegt hauptsächlich in der Zuständigkeit der Bundesländer.",
      },
      {
        id: 4,
        shortAudio: "Die Europäische Union hat heute siebenundzwanzig Mitgliedstaaten. Das Europäische Parlament wird direkt von den Bürgern gewählt und hat in den letzten Jahrzehnten an Einfluss und Gesetzgebungskompetenz gewonnen.",
        question: "Das Europäische Parlament wird von den Bürgern der EU direkt gewählt.",
        correct: 0,
        explanation: "Richtig. Das Europäische Parlament wird direkt von den EU-Bürgern gewählt.",
      },
      {
        id: 5,
        shortAudio: "Auf Bundesebene gibt es in Deutschland keine direkte Demokratie in Form von bundesweiten Volksabstimmungen, wie sie etwa in der Schweiz existieren. Volksinitiativen spielen jedoch in einigen Bundesländern eine Rolle.",
        question: "In Deutschland gibt es auf Bundesebene regelmäßige Volksabstimmungen wie in der Schweiz.",
        correct: 1,
        explanation: "Falsch. Auf Bundesebene gibt es in Deutschland keine Volksabstimmungen — das ist eine Besonderheit der Schweiz.",
      },
    ],
    xp: 60,
  },


  // ── Teile 11–20: Gespräche ────────────────────────────────────────────────

  {
    id: 11,
    type: "gespraeche",
    typeLabel: "Gespräch & Diskussion",
    typeLabelTr: "Konuşma ve Tartışma",
    title: "Homeoffice und Arbeitswelt",
    difficulty: 2,
    maleSpeakers: ["Thomas"],
    audioText:
      "Thomas: Guten Morgen, Anna! Wie läuft das Homeoffice bei dir so? Anna: Ehrlich gesagt sehr gut. Ich spare täglich fast zwei Stunden Pendelzeit und bin produktiver als im Büro. Thomas: Das überrascht mich. Ich finde es schwierig, Arbeit und Privatleben zu trennen. Bei mir steht der Schreibtisch im Wohnzimmer, und ich mache abends kaum noch richtig Feierabend. Anna: Das kenne ich. Am Anfang hatte ich das Problem auch. Ich habe mir dann feste Arbeitszeiten gesetzt und mache nach der Arbeit einen Spaziergang — das hilft mir, abzuschalten. Thomas: Gute Idee. Was fehlt dir am meisten? Anna: Der persönliche Kontakt zu Kollegen. Kreative Gespräche entstehen spontan — im Büro geht das viel besser. Videokonferenzen sind kein vollwertiger Ersatz. Thomas: Genau. Unser Team hat deshalb einen Hybridansatz eingeführt: zwei Tage Homeoffice, drei Tage im Büro. Anna: Das klingt ideal. Mein Arbeitgeber überlegt das auch. Thomas: Viele Arbeitnehmer wünschen sich mehr Rechtssicherheit im Homeoffice — beim Arbeitsschutz zu Hause zum Beispiel. Anna: Absolut. Und auch steuerlich sollte das noch besser geregelt werden. Das Homeoffice-Pauschale reicht für viele nicht aus.",
    instruction: "Sie hören ein Gespräch zwischen Anna und Thomas über das Homeoffice. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Was spart Anna durch das Homeoffice täglich?",
        options: ["Geld für Mittagessen", "Fast zwei Stunden Pendelzeit", "Energie im Büro"],
        correct: 1,
        explanation: "'Ich spare täglich fast zwei Stunden Pendelzeit' — Anna her gün yaklaşık 2 saat yol tasarrufu yapıyor.",
      },
      {
        id: 2,
        question: "Welches Problem hat Thomas beim Homeoffice?",
        options: ["Er ist weniger produktiv.", "Er kann Arbeit und Freizeit nicht trennen.", "Er hat keine gute Internetverbindung."],
        correct: 1,
        explanation: "'ich finde es schwierig, Arbeit und Privatleben zu trennen' — Thomas iş ve özel hayatı ayırt etmekte zorlanıyor.",
      },
      {
        id: 3,
        question: "Was macht Anna, um nach der Arbeit besser abzuschalten?",
        options: ["Sie kauft einen Schreibtisch fürs Arbeitszimmer.", "Sie macht nach der Arbeit einen Spaziergang.", "Sie schaltet ihr Handy aus."],
        correct: 1,
        explanation: "'mache nach der Arbeit einen Spaziergang' — Anna iş sonrası yürüyüşe çıkarak devre dışı kalıyor.",
      },
      {
        id: 4,
        question: "Wie sieht das Hybridmodell in Thomas' Team aus?",
        options: ["3 Tage Homeoffice, 2 Tage Büro", "2 Tage Homeoffice, 3 Tage Büro", "5 Tage Homeoffice"],
        correct: 1,
        explanation: "'zwei Tage Homeoffice, drei Tage im Büro' — Thomas'ın ekibi hibrit çalışma modelini uyguluyor.",
      },
      {
        id: 5,
        question: "Was kritisieren viele Arbeitnehmer laut Thomas beim Homeoffice?",
        options: ["Zu wenig Gehalt im Homeoffice", "Fehlende Rechtssicherheit beim Arbeitsschutz", "Zu viele Videokonferenzen"],
        correct: 1,
        explanation: "'Viele Arbeitnehmer wünschen sich mehr Rechtssicherheit' — iş güvenliği konusunda yasal belirsizlik var.",
      },
    ],
    xp: 60,
  },

  {
    id: 12,
    type: "gespraeche",
    typeLabel: "Gespräch & Diskussion",
    typeLabelTr: "Konuşma ve Tartışma",
    title: "Klimaschutz und Politik",
    difficulty: 3,
    maleSpeakers: ["Dr. Berger"],
    audioText:
      "Moderatorin: Guten Abend, Herr Dr. Berger. Sie forschen zu Klimaschutzmaßnahmen. Wie beurteilen Sie den aktuellen Stand? Dr. Berger: Es gibt Fortschritte — der Anteil erneuerbarer Energien ist gestiegen. Aber das reicht nicht aus, um die Pariser Klimaziele zu erreichen. Moderatorin: Woran liegt das? Dr. Berger: An fehlender Konsequenz in der Politik. Maßnahmen werden angekündigt, aber nur langsam umgesetzt. Außerdem fehlt internationale Koordination — Klimawandel macht an Grenzen nicht halt. Moderatorin: Was empfehlen Sie als dringlichste Maßnahme? Dr. Berger: Kurzfristig: eine konsequente CO₂-Bepreisung, die fossile Energien tatsächlich teurer macht. Mittelfristig müssen wir Gebäude sanieren und den Verkehrssektor elektrifizieren. Moderatorin: Ist die Gesellschaft bereit für diese Veränderungen? Dr. Berger: Jüngere Generationen schon. Aber es gibt erhebliche Widerstände aus Teilen der Wirtschaft. Die Herausforderung ist, einen gerechten Wandel zu gestalten — die Kosten dürfen nicht hauptsächlich ärmere Bevölkerungsgruppen tragen. Moderatorin: Sind Sie optimistisch? Dr. Berger: Vorsichtig ja. Die Technologien sind vorhanden. Der politische Wille fehlt oft noch. Aber die Bewegung der Jugend gibt mir Hoffnung.",
    instruction: "Sie hören ein Interview mit Dr. Berger über Klimaschutz. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Was kritisiert Dr. Berger an der Klimapolitik?",
        options: ["Zu viele erneuerbare Energien", "Mangelnde Konsequenz bei der Umsetzung von Maßnahmen", "Fehlende Klimaforschung"],
        correct: 1,
        explanation: "'fehlende Konsequenz in der Politik' — Dr. Berger, iklim önlemlerinin yetersiz uygulandığını eleştiriyor.",
      },
      {
        id: 2,
        question: "Was empfiehlt Dr. Berger als kurzfristige Maßnahme?",
        options: ["Mehr erneuerbare Energie sofort bauen", "Eine konsequente CO₂-Bepreisung", "Autofahren generell verbieten"],
        correct: 1,
        explanation: "'eine konsequente CO₂-Bepreisung' — fosil yakıtları daha pahalı hale getirmek ilk adım.",
      },
      {
        id: 3,
        question: "Wer ist laut Dr. Berger am meisten bereit für Klimaschutzmaßnahmen?",
        options: ["Die ältere Generation", "Die Wirtschaft", "Die jüngere Generation"],
        correct: 2,
        explanation: "'Jüngere Generationen schon' — gençler iklim değişikliğine karşı önlemlere en hazır grup.",
      },
      {
        id: 4,
        question: "Welches Problem sieht Dr. Berger bei der Kostenverteilung des Klimawandels?",
        options: ["Die Kosten sind zu hoch für Unternehmen.", "Ärmere Bevölkerungsgruppen sollten nicht hauptsächlich die Kosten tragen.", "Es gibt kein Geld für den Klimaschutz."],
        correct: 1,
        explanation: "'die Kosten dürfen nicht hauptsächlich ärmere Bevölkerungsgruppen tragen' — adil bir geçiş süreci gerekli.",
      },
      {
        id: 5,
        question: "Wie ist Dr. Bergers Gesamteinschätzung?",
        options: ["Er ist sehr pessimistisch.", "Er ist vorsichtig optimistisch.", "Er ist vollständig hoffnungslos."],
        correct: 1,
        explanation: "'Vorsichtig ja' — teknolojiler mevcut, gençlik hareketi umut veriyor; temkinli bir iyimserlik var.",
      },
    ],
    xp: 60,
  },

  {
    id: 13,
    type: "gespraeche",
    typeLabel: "Gespräch & Diskussion",
    typeLabelTr: "Konuşma ve Tartışma",
    title: "Wohnungsnot in Städten",
    difficulty: 2,
    maleSpeakers: ["Klaus"],
    audioText:
      "Petra: Klaus, hast du den neuen Stadtentwicklungsplan gelesen? Sie wollen zweitausend neue Wohnungen bis zweitausend dreißig bauen. Klaus: Ja, aber ich bin skeptisch. Solche Versprechen gab es schon oft, und am Ende wurden es viel weniger. Petra: Das stimmt. Das Problem ist komplex: Es fehlt nicht nur an Wohnungen, sondern auch an bezahlbaren. In unserer Stadt sind die Mieten in zehn Jahren um siebzig Prozent gestiegen! Klaus: Genau. Und die Löhne sind nicht entsprechend gestiegen. Viele geben mittlerweile mehr als die Hälfte ihres Einkommens für Wohnen aus. Petra: Was wäre denn deine Lösung? Klaus: Mehr Sozialwohnungen und stärkere Regulierung des Mietmarktes. Eine Mietpreisbremse allein reicht nicht. Petra: Aber Kritiker sagen, dass zu starke Regulierung Investoren abschreckt und das Angebot sinkt. Klaus: Das ist ein reales Risiko. Aber ohne Eingriff können sich immer weniger Menschen das Wohnen in der Stadt leisten. Petra: Ich denke, der Schlüssel liegt in öffentlichen Investitionen — wenn der Staat selbst baut. Klaus: Da hast du recht. Aber dafür braucht man politischen Willen und Geld — und beides fehlt gerade.",
    instruction: "Sie hören ein Gespräch zwischen Petra und Klaus über die Wohnungsnot. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Wie stark sind die Mieten in der Stadt laut Petra in den letzten zehn Jahren gestiegen?",
        options: ["Um 30 Prozent", "Um 50 Prozent", "Um 70 Prozent"],
        correct: 2,
        explanation: "'die Mieten in zehn Jahren um siebzig Prozent gestiegen' — kiralar son 10 yılda %70 artmış.",
      },
      {
        id: 2,
        question: "Was ist Klaus' Hauptforderung?",
        options: ["Nur eine Mietpreisbremse", "Mehr Sozialwohnungen und stärkere Mietmarktregulierung", "Weniger staatliche Eingriffe"],
        correct: 1,
        explanation: "'Mehr Sozialwohnungen und stärkere Regulierung des Mietmarktes' — Klaus daha kapsamlı çözümler istiyor.",
      },
      {
        id: 3,
        question: "Welches Risiko sieht Klaus bei zu starker Regulierung?",
        options: ["Zu viele Neubauten entstehen.", "Investoren werden abgeschreckt und das Angebot sinkt.", "Die Mieten steigen noch schneller."],
        correct: 1,
        explanation: "'zu starke Regulierung Investoren abschreckt' — aşırı düzenleme yatırımcıları kaçırabilir.",
      },
      {
        id: 4,
        question: "Was ist laut Petra der Schlüssel zur Lösung?",
        options: ["Steuersenkungen für Vermieter", "Öffentliche Investitionen und staatlicher Wohnungsbau", "Mehr Anreize für private Investoren"],
        correct: 1,
        explanation: "'wenn der Staat selbst baut' — Petra devletin bizzat inşaat yapmasını çözüm olarak görüyor.",
      },
      {
        id: 5,
        question: "Worin sind sich Klaus und Petra am Ende einig?",
        options: ["Der Markt regelt das Problem von selbst.", "Politischer Wille und finanzielle Mittel fehlen derzeit.", "Mietpreisbremsen sind die beste Lösung."],
        correct: 1,
        explanation: "'politischen Willen und Geld — beides fehlt gerade' — ikisi de siyasi irade ve bütçenin eksik olduğu konusunda hemfikir.",
      },
    ],
    xp: 60,
  },

  {
    id: 14,
    type: "gespraeche",
    typeLabel: "Gespräch & Diskussion",
    typeLabelTr: "Konuşma ve Tartışma",
    title: "Schulreform und Bildungssystem",
    difficulty: 2,
    maleSpeakers: ["Moderator"],
    audioText:
      "Moderator: Frau Schmidt, Sie sind seit zwanzig Jahren Lehrerin. Was muss sich im Bildungssystem ändern? Frau Schmidt: Als Erstes die Struktur. Das dreigliedrige Schulsystem ist überholt — es sortiert Kinder mit zehn Jahren zu früh aus. Moderator: Was schlagen Sie vor? Frau Schmidt: Eine längere gemeinsame Schulzeit wie in Finnland — dort lernen alle Kinder bis zur neunten Klasse zusammen. Das gibt jedem Kind mehr Zeit, sich zu entwickeln. Moderator: Aber sind nicht auch Lehrkräfte das Problem? Es gibt einen Mangel. Frau Schmidt: Absolut. Die Hälfte der Lehrerinnen und Lehrer geht in den nächsten Jahren in Rente, und der Nachwuchs fehlt. Wir brauchen dringend bessere Bedingungen — zum Beispiel mehr sozialpädagogisches Fachpersonal. Moderator: Wie stehen Sie zur Digitalisierung in der Schule? Frau Schmidt: Wichtig, aber kein Allheilmittel. Tablets nutzen wenig, wenn Lehrkräfte nicht ausgebildet sind, sie sinnvoll einzusetzen. Und soziale Kompetenz kann keine App ersetzen. Moderator: Was wünschen Sie sich für den Beruf? Frau Schmidt: Mehr gesellschaftliche Wertschätzung und bessere Bezahlung. Wir formen die nächste Generation — das verdient mehr Anerkennung.",
    instruction: "Sie hören ein Interview mit Frau Schmidt über Schulreformen. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Was kritisiert Frau Schmidt am deutschen Schulsystem?",
        options: ["Zu viele Gesamtschulen", "Das dreigliedrige System sortiert Kinder zu früh aus.", "Schüler lernen zu wenig Mathematik."],
        correct: 1,
        explanation: "'sortiert Kinder mit zehn Jahren zu früh aus' — Frau Schmidt, 10 yaşında yapılan yönlendirmenin çok erken olduğunu düşünüyor.",
      },
      {
        id: 2,
        question: "Welches Land nennt Frau Schmidt als positives Beispiel?",
        options: ["Schweden", "Finnland", "Dänemark"],
        correct: 1,
        explanation: "'wie in Finnland' — Finlandiya, tüm çocukların 9. sınıfa kadar birlikte öğrenmesiyle örnek gösteriliyor.",
      },
      {
        id: 3,
        question: "Was sagt Frau Schmidt über Digitalisierung in Schulen?",
        options: ["Sie ist der Schlüssel zu besserer Bildung.", "Tablets sind nutzlos.", "Digitalisierung allein reicht nicht — Lehrkräfte müssen ausgebildet sein."],
        correct: 2,
        explanation: "'Tablets nutzen wenig, wenn Lehrkräfte nicht ausgebildet sind' — dijitalleşme öğretmen eğitimi olmadan yeterli değil.",
      },
      {
        id: 4,
        question: "Welche Unterstützung fordert Frau Schmidt für Schulen?",
        options: ["Mehr Ferien für Lehrer", "Mehr sozialpädagogisches Fachpersonal", "Mehr digitale Ausstattung"],
        correct: 1,
        explanation: "'mehr sozialpädagogisches Fachpersonal' — okullarda sosyal pedagoji uzmanlarına ihtiyaç var.",
      },
      {
        id: 5,
        question: "Was wünscht sich Frau Schmidt für den Lehrerberuf?",
        options: ["Kürzere Schulstunden", "Mehr gesellschaftliche Wertschätzung und bessere Bezahlung", "Weniger Bürokratie in der Schule"],
        correct: 1,
        explanation: "'Mehr gesellschaftliche Wertschätzung und bessere Bezahlung' — öğretmenlik mesleğinin daha fazla takdir görmesi gerekiyor.",
      },
    ],
    xp: 60,
  },

  {
    id: 15,
    type: "gespraeche",
    typeLabel: "Gespräch & Diskussion",
    typeLabelTr: "Konuşma ve Tartışma",
    title: "Integration und gesellschaftlicher Zusammenhalt",
    difficulty: 2,
    maleSpeakers: ["Sven"],
    audioText:
      "Maria: Sven, du arbeitest bei einer Beratungsstelle für Neuzuwanderer — wie ist deine Erfahrung mit Integration? Sven: Es ist sehr unterschiedlich. Manche kommen mit Deutschkenntnissen und einem klaren Plan. Andere stehen vor enormen Herausforderungen: fehlende Sprachkenntnisse, nicht anerkannte Qualifikationen, Unsicherheit beim Aufenthaltsrecht. Maria: Was wäre die wichtigste Maßnahme? Sven: Sprache, eindeutig. Ohne Sprache ist fast alles schwierig — Job finden, Arzttermin vereinbaren, Kinder in der Schule unterstützen. Es braucht mehr und bessere Sprachkurse. Maria: Aber viele sagen, Integration sei auch Bringschuld der Einwandernden. Sven: Natürlich. Beide Seiten müssen sich bewegen. Aber wenn die Strukturen fehlen — zu lange Wartezeiten auf Sprachkurse, schlechte Anerkennung von Abschlüssen — dann ist guter Wille zu wenig. Maria: Siehst du Fortschritte? Sven: Bei der zweiten Generation schon — Kinder von Einwanderern holen sich Bildung und schaffen tolle Karrieren. Aber es braucht Vorbilder und Unterstützung. Maria: Ich glaube, die Gesellschaft muss insgesamt offener werden. Sven: Stimmt. Eine vielfältige Gesellschaft ist stärker und kreativer — davon bin ich überzeugt.",
    instruction: "Sie hören ein Gespräch zwischen Maria und Sven über Integration. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Welche Herausforderungen nennt Sven für Neuzuwanderer?",
        options: ["Zu hohe Mieten in Städten", "Fehlende Sprachkenntnisse und Nichtanerkennung von Qualifikationen", "Mangelnde kulturelle Angebote"],
        correct: 1,
        explanation: "'fehlende Sprachkenntnisse, nicht anerkannte Qualifikationen' — dil bilmemek ve yabancı diplomanın tanınmaması ana sorunlar.",
      },
      {
        id: 2,
        question: "Was hält Sven für die wichtigste Integrationsmaßnahme?",
        options: ["Wohnraumförderung", "Sprachkurse", "Berufsausbildung"],
        correct: 1,
        explanation: "'Sprache, eindeutig' — dil öğrenimi entegrasyon için en temel adım.",
      },
      {
        id: 3,
        question: "Was sagt Sven über die Verantwortung bei der Integration?",
        options: ["Nur die Gesellschaft muss sich bewegen.", "Integration ist ein gegenseitiger Prozess.", "Einwanderer tragen keine Verantwortung."],
        correct: 1,
        explanation: "'Beide Seiten müssen sich bewegen' — entegrasyon karşılıklı sorumluluk gerektirir.",
      },
      {
        id: 4,
        question: "Wo sieht Sven besonders viele Integrationserfolge?",
        options: ["Bei älteren Einwanderern der ersten Generation", "Bei Kindern von Einwanderern", "Bei Einwanderern aus EU-Ländern"],
        correct: 1,
        explanation: "'Bei der zweiten Generation schon' — göçmen çocukları eğitimde ve kariyerde başarılar kazanıyor.",
      },
      {
        id: 5,
        question: "Wie beurteilt Sven eine vielfältige Gesellschaft?",
        options: ["Als problematisch für den sozialen Zusammenhalt", "Als stärker und kreativer", "Als wirtschaftlich nachteilig"],
        correct: 1,
        explanation: "'Eine vielfältige Gesellschaft ist stärker und kreativer' — çeşitlilik toplumsal güç kaynağı.",
      },
    ],
    xp: 60,
  },

  {
    id: 16,
    type: "gespraeche",
    typeLabel: "Gespräch & Diskussion",
    typeLabelTr: "Konuşma ve Tartışma",
    title: "Kunstmarkt und Kulturförderung",
    difficulty: 3,
    maleSpeakers: ["Herr Müller"],
    audioText:
      "Moderatorin: Herr Müller, Sie sind Galerist und zeigen zeitgenössische Kunst. Wie erleben Sie den aktuellen Kunstmarkt? Herr Müller: Der Markt hat sich stark polarisiert. Einerseits gibt es Werke, die für Millionen auf Auktionen verkauft werden. Andererseits kämpfen viele Künstlerinnen und Künstler ums Überleben. Moderatorin: Welche Trends beobachten Sie? Herr Müller: NFTs haben viel Aufmerksamkeit bekommen, aber die meisten haben ihren Wert wieder verloren. Was bleibt, ist das Bewusstsein, dass Kunst auch im digitalen Raum existieren kann. Moderatorin: Wie erreichen Sie ein junges Publikum? Herr Müller: Über Instagram vor allem. Das hat den Kunstmarkt demokratisiert — Künstler können sich direkt präsentieren, ohne auf Galerien angewiesen zu sein. Das ist ambivalent. Moderatorin: Was braucht die Kunstszene von der Politik? Herr Müller: Verlässliche Förderung und soziale Absicherung. Die Künstlersozialkasse ist ein gutes Modell, aber viele fallen durch das Raster. Kunst ist systemrelevant — das muss die Politik anerkennen. Moderatorin: Was macht für Sie gute Kunst aus? Herr Müller: Kunst, die eine Frage stellt statt eine Antwort zu geben. Etwas, das mich zum Nachdenken zwingt — unabhängig vom Preis.",
    instruction: "Sie hören ein Interview mit dem Galeristen Herrn Müller. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Wie beschreibt Herr Müller den aktuellen Kunstmarkt?",
        options: ["Gleichmäßig und stabil", "Stark polarisiert zwischen teuren Werken und kämpfenden Künstlern", "Rückläufig und uninteressant"],
        correct: 1,
        explanation: "'stark polarisiert' — çok pahalı sanat eserleri ile geçimini zor sağlayan sanatçılar arasında büyük uçurum var.",
      },
      {
        id: 2,
        question: "Wie bewertet Herr Müller NFTs langfristig?",
        options: ["Als nachhaltigen und wachsenden Trend", "Als nicht nachhaltig — die meisten haben ihren Wert verloren", "Als wichtigstes Zukunftsfeld der Kunst"],
        correct: 1,
        explanation: "'die meisten haben ihren Wert wieder verloren' — NFT'ler kalıcı bir trend olmadı.",
      },
      {
        id: 3,
        question: "Welchen Effekt hat Instagram auf den Kunstmarkt laut Herrn Müller?",
        options: ["Ausschließlich positiv für alle Beteiligten", "Ambivalent — mehr Sichtbarkeit, aber Galerien verlieren an Bedeutung", "Ausschließlich negativ für Künstler"],
        correct: 1,
        explanation: "'Das ist ambivalent' — Instagram sanatçıları görünür yapıyor ama galeriler önem kaybediyor.",
      },
      {
        id: 4,
        question: "Was fordert Herr Müller von der Politik für die Kunstszene?",
        options: ["Mehr Kunstmessen und Ausstellungen", "Verlässliche Förderung und soziale Absicherung für Künstler", "Weniger Regulierung des Kunstmarkts"],
        correct: 1,
        explanation: "'Verlässliche Förderung und soziale Absicherung' — sanatçılar için güvenilir destekleme ve sosyal güvence gerekli.",
      },
      {
        id: 5,
        question: "Was macht für Herrn Müller gute Kunst aus?",
        options: ["Hoher Verkaufspreis und Bekanntheit des Künstlers", "Kunst, die zum Nachdenken zwingt und Fragen stellt", "Klassische Techniken und bekannte Themen"],
        correct: 1,
        explanation: "'Kunst, die eine Frage stellt statt eine Antwort zu geben' — iyi sanat düşündürür, fiyatla ilgisi yok.",
      },
    ],
    xp: 65,
  },

  {
    id: 17,
    type: "gespraeche",
    typeLabel: "Gespräch & Diskussion",
    typeLabelTr: "Konuşma ve Tartışma",
    title: "Soziale Medien und psychische Gesundheit",
    difficulty: 2,
    maleSpeakers: ["Felix"],
    audioText:
      "Luisa: Felix, ich habe letzte Woche alle sozialen Medien gelöscht. Ich brauchte eine Pause. Felix: Und wie war das? Luisa: Am Anfang sehr schwierig — ich habe reflexartig nach dem Handy gegriffen. Aber nach ein paar Tagen war ich tatsächlich entspannter. Felix: Studien zeigen, dass intensiver Social-Media-Konsum mit erhöhter Angst und geringerem Selbstwertgefühl korreliert — vor allem bei jungen Frauen. Luisa: Das Hauptproblem ist der ständige Vergleich. Man sieht nur die Highlights aus dem Leben anderer und denkt, das eigene Leben ist langweilig. Felix: Und Algorithmen verstärken das noch — je emotionaler ein Inhalt, desto höher die Interaktion, desto mehr wird er gezeigt. Das führt zur Überflutung mit extremen Inhalten. Luisa: Aber soziale Medien haben auch Vorteile — ich habe dadurch Gleichgesinnte gefunden, die ich sonst nie getroffen hätte. Felix: Stimmt. Für Menschen mit seltenen Interessen sind sie wichtig. Das Problem ist die Balance. Luisa: Es braucht Medienkompetenz schon in der Schule. Felix: Ja. Und die Plattformen müssen mehr Verantwortung übernehmen. Selbstregulierung hat nicht funktioniert — da ist der Gesetzgeber gefragt.",
    instruction: "Sie hören ein Gespräch zwischen Luisa und Felix über soziale Medien. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Wie hat sich Luisa nach der Social-Media-Pause gefühlt?",
        options: ["Gestresster als vorher", "Nach einigen Tagen entspannter", "Sie bemerkte keine Veränderung."],
        correct: 1,
        explanation: "'nach ein paar Tagen war ich tatsächlich entspannter' — birkaç günlük aranın ardından rahatladı.",
      },
      {
        id: 2,
        question: "Welche Gruppe ist laut Felix von negativen Social-Media-Effekten besonders betroffen?",
        options: ["Ältere Männer", "Junge Frauen", "Kinder unter 10 Jahren"],
        correct: 1,
        explanation: "'vor allem bei jungen Frauen' — genç kadınlar sosyal medyanın olumsuz etkilerine daha fazla maruz kalıyor.",
      },
      {
        id: 3,
        question: "Warum zeigen Algorithmen laut Felix extreme Inhalte häufiger?",
        options: ["Weil Nutzer diese Inhalte aktiv suchen", "Weil emotionale Inhalte mehr Interaktion erzeugen", "Weil Unternehmen dafür zahlen"],
        correct: 1,
        explanation: "'je emotionaler ein Inhalt, desto höher die Interaktion' — algoritmalar etkileşimi artıran duygusal içerikleri öne çıkarıyor.",
      },
      {
        id: 4,
        question: "Welchen Vorteil sozialer Medien nennt Luisa?",
        options: ["Schnelle Nachrichtenverbreitung", "Das Finden von Gleichgesinnten", "Einfacher Zugang zu Bildung"],
        correct: 1,
        explanation: "'ich habe dadurch Gleichgesinnte gefunden' — sosyal medya benzer ilgi alanlarına sahip insanları bir araya getiriyor.",
      },
      {
        id: 5,
        question: "Wer muss laut Felix mehr Verantwortung übernehmen?",
        options: ["Nur die Nutzer selbst", "Die Plattformen und der Gesetzgeber", "Nur die Schulen"],
        correct: 1,
        explanation: "'die Plattformen müssen mehr Verantwortung übernehmen' und 'der Gesetzgeber ist gefragt' — hem platform hem devlet sorumlu.",
      },
    ],
    xp: 60,
  },

  {
    id: 18,
    type: "gespraeche",
    typeLabel: "Gespräch & Diskussion",
    typeLabelTr: "Konuşma ve Tartışma",
    title: "Gesundheitssystem im Wandel",
    difficulty: 3,
    maleSpeakers: ["Moderator", "Dr. Schneider"],
    audioText:
      "Moderator: Dr. Schneider, Sie sind Allgemeinmediziner. Wie erleben Sie das deutsche Gesundheitssystem? Dr. Schneider: Als gut, aber unter Druck. Die Grundversorgung funktioniert, aber es fehlt an Kapazitäten. In meiner Praxis sind Termine oft wochenlang ausgebucht. Moderator: Woran liegt das? Dr. Schneider: Am Hausärztemangel. Die Hälfte der niedergelassenen Ärzte ist über fünfzig — in zehn Jahren gehen viele in Rente, und der Nachwuchs fehlt. Moderator: Warum wählen junge Ärzte den Hausarztberuf seltener? Dr. Schneider: Die bürokratische Last ist enorm. Ich schätze, fast vierzig Prozent meiner Zeit gehen für Verwaltungsaufgaben drauf statt für Patienten. Das schreckt viele ab. Moderator: Was würde helfen? Dr. Schneider: Bürokratieabbau sofort. Langfristig brauchen wir Gruppenpraxen, wo Ärzte sich Verantwortung teilen. Moderator: Wie stehen Sie zur Digitalisierung? Dr. Schneider: Die elektronische Patientenakte ist ein richtiger Schritt. Telemedizin funktioniert gut für Folgekonsultationen. Aber der persönliche Arzt-Patient-Kontakt ist durch nichts zu ersetzen. Moderator: Sind Sie optimistisch für das System? Dr. Schneider: Ja — Deutschland hat eines der besten Gesundheitssysteme weltweit. Aber wir müssen jetzt handeln.",
    instruction: "Sie hören ein Interview mit Dr. Schneider über das Gesundheitssystem. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Was ist laut Dr. Schneider das Hauptproblem in seiner Praxis?",
        options: ["Fehlende Medikamente", "Termine sind wochenlang ausgebucht", "Zu wenig Raum für Patienten"],
        correct: 1,
        explanation: "'Termine oft wochenlang ausgebucht' — muayenehanede randevular haftalarca dolu, kapasite sorunu var.",
      },
      {
        id: 2,
        question: "Welches demografische Problem beschreibt Dr. Schneider?",
        options: ["Zu viele junge Ärzte verlassen Deutschland", "Die Hälfte der Hausärzte ist über 50 und geht bald in Rente.", "Zu wenige Frauen im Arztberuf"],
        correct: 1,
        explanation: "'Die Hälfte der niedergelassenen Ärzte ist über fünfzig' — yakında çok sayıda pratisyen hekim emekliye ayrılacak.",
      },
      {
        id: 3,
        question: "Wie viel Zeit verbringt Dr. Schneider ungefähr mit Verwaltungsaufgaben?",
        options: ["Etwa 20 Prozent", "Fast 40 Prozent", "Über 60 Prozent"],
        correct: 1,
        explanation: "'fast vierzig Prozent meiner Zeit gehen für Verwaltungsaufgaben drauf' — zamanının %40'ı bürokratik işlere gidiyor.",
      },
      {
        id: 4,
        question: "Welche sofortige Maßnahme empfiehlt Dr. Schneider?",
        options: ["Mehr Krankenhäuser bauen", "Bürokratieabbau", "Mehr Studienplätze für Medizin"],
        correct: 1,
        explanation: "'Bürokratieabbau sofort' — bürokrasinin azaltılması en acil adım.",
      },
      {
        id: 5,
        question: "Wie beurteilt Dr. Schneider das deutsche Gesundheitssystem insgesamt?",
        options: ["Als hoffnungslos überlastet", "Als eines der besten weltweit, aber mit dringendem Handlungsbedarf", "Als unterdurchschnittlich im internationalen Vergleich"],
        correct: 1,
        explanation: "'eines der besten Gesundheitssysteme weltweit' aber 'müssen jetzt handeln' — iyi ama acil reform gerektiriyor.",
      },
    ],
    xp: 65,
  },

  {
    id: 19,
    type: "gespraeche",
    typeLabel: "Gespräch & Diskussion",
    typeLabelTr: "Konuşma ve Tartışma",
    title: "Mobilität und Stadtplanung",
    difficulty: 2,
    maleSpeakers: ["Robert"],
    audioText:
      "Nina: Robert, du bist Stadtplaner. Wie siehst du die Entwicklung unserer Stadt? Robert: Ich sehe große Chancen, wenn wir mutig sind. Städte müssen klimaresilienter werden — weniger Autos, mehr Platz für Menschen. Nina: Das klingt gut in der Theorie. Aber die Leute geben ihr Auto nicht leicht auf. Robert: Deshalb muss der öffentliche Nahverkehr so attraktiv werden, dass das Auto nicht mehr nötig ist. Häufigere Takte, bessere Vernetzung und sichere Fahrradwege. Nina: Ich fahre selbst lieber Fahrrad, fühle mich aber oft gefährdet im Stadtverkehr. Robert: Das ist ein zentrales Problem. Wir bauen Radwege, aber zu oft als Kompromiss — eng, unsicher, immer wieder unterbrochen. Wir brauchen echte Infrastruktur wie in den Niederlanden. Nina: Glaubst du, autofreie Innenstädte sind realistisch? Robert: Vollständig autofreie nicht — aber autoarme schon. Oslo, Gent und Barcelona zeigen, wie das geht. Nina: Was passiert mit den Parkplätzen? Robert: Die könnten zu Parks, Spielplätzen oder bezahlbarem Wohnraum werden. Heute verschenken wir diese Flächen, dabei sind sie extrem wertvoll. Nina: Das würde die Stadt stark verändern. Robert: Zum Besseren — Menschen, die so leben, berichten von mehr Lebensqualität.",
    instruction: "Sie hören ein Gespräch zwischen Nina und Robert über Stadtplanung. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Was fordert Robert für die Stadtentwicklung?",
        options: ["Mehr Parkplätze und breitere Straßen", "Weniger Autos und mehr Platz für Menschen", "Mehr Einkaufszentren in der Innenstadt"],
        correct: 1,
        explanation: "'weniger Autos, mehr Platz für Menschen' — Robert şehirlerin araçsızlaşması gerektiğini savunuyor.",
      },
      {
        id: 2,
        question: "Was kritisiert Robert an den aktuellen Radwegen?",
        options: ["Es gibt zu viele Radwege.", "Sie sind eng, unsicher und werden immer wieder unterbrochen.", "Radwege sind zu teuer im Bau."],
        correct: 1,
        explanation: "'eng, unsicher, immer wieder unterbrochen' — mevcut bisiklet yolları yetersiz ve güvensiz.",
      },
      {
        id: 3,
        question: "Welche Städte nennt Robert als positive Beispiele?",
        options: ["Berlin, Wien und Zürich", "Oslo, Gent und Barcelona", "Amsterdam, Kopenhagen und Stockholm"],
        correct: 1,
        explanation: "'Oslo, Gent und Barcelona' — bu şehirler araçsız iç şehir uygulamalarında öncü.",
      },
      {
        id: 4,
        question: "Was könnten Parkflächen laut Robert in Zukunft werden?",
        options: ["Neue Parkhäuser", "Parks, Spielplätze oder Wohnraum", "Kommerzielle Einkaufsflächen"],
        correct: 1,
        explanation: "'Parks, Spielplätze oder bezahlbarem Wohnraum' — park alanları daha verimli kullanılabilir.",
      },
      {
        id: 5,
        question: "Wie berichten Menschen laut Robert über das Leben in autoarmen Städten?",
        options: ["Sie vermissen ihre Autos stark.", "Sie berichten von mehr Lebensqualität.", "Sie sind unzufrieden mit dem Nahverkehr."],
        correct: 1,
        explanation: "'berichten von mehr Lebensqualität' — araçsız şehirlerde yaşam kalitesi daha yüksek.",
      },
    ],
    xp: 60,
  },

  {
    id: 20,
    type: "gespraeche",
    typeLabel: "Gespräch & Diskussion",
    typeLabelTr: "Konuşma ve Tartışma",
    title: "Rente und Altersvorsorge",
    difficulty: 3,
    maleSpeakers: ["Markus"],
    audioText:
      "Markus: Sandra, ich mache mir wirklich Sorgen um meine Rente. Mit meiner jetzigen Situation werde ich im Alter nicht genug haben. Sandra: Das ist ein weit verbreitetes Problem. Das Rentenniveau liegt heute unter fünfzig Prozent des Durchschnittslohns. Markus: Was würdest du mir empfehlen? Sandra: Frühzeitig anfangen ist das Wichtigste. Wer mit dreißig beginnt, spart dank des Zinseszinseffekts am Ende viel mehr als jemand, der mit fünfzig anfängt. Markus: Welche Optionen gibt es neben der gesetzlichen Rente? Sandra: Die betriebliche Altersvorsorge wird unterschätzt. Arbeitgeber sind seit zweitausend neunzehn verpflichtet, einen Mindestbeitrag zu leisten. Dann gibt es Riester — staatlich gefördert, aber in der Kritik wegen hoher Kosten. Und private Investitionen in ETFs. Markus: Lohnt sich die Riester-Rente noch? Sandra: Für Familien mit Kindern ja — wegen der hohen Zulagen. Für Single-Gutverdiener ohne Kinder oft weniger. Markus: Und kann das System den demografischen Wandel tragen? Sandra: Das ist die große Frage. Viele Experten fordern deshalb einen staatlichen Kapitalfonds wie in Schweden oder Norwegen. Markus: Warum macht Deutschland das nicht? Sandra: Politisch sehr schwierig — Widerstände und Angst vor Risiken. Aber der Handlungsbedarf ist eindeutig.",
    instruction: "Sie hören ein Gespräch zwischen Markus und Sandra über die Altersvorsorge. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Wie hoch ist das aktuelle Rentenniveau laut Sandra?",
        options: ["Über 60 Prozent des Durchschnittslohns", "Unter 50 Prozent des Durchschnittslohns", "Genau 55 Prozent des Durchschnittslohns"],
        correct: 1,
        explanation: "'unter fünfzig Prozent des Durchschnittslohns' — emekli maaşı ortalama maaşın %50'sinin altında.",
      },
      {
        id: 2,
        question: "Was ist laut Sandra der wichtigste Tipp für die Altersvorsorge?",
        options: ["So spät wie möglich anfangen", "Frühzeitig anfangen", "Nur in Immobilien investieren"],
        correct: 1,
        explanation: "'Frühzeitig anfangen ist das Wichtigste' — bileşik faiz etkisi nedeniyle erken başlamak büyük avantaj sağlıyor.",
      },
      {
        id: 3,
        question: "Seit wann sind Arbeitgeber zu einem Mindestbeitrag zur betrieblichen Altersvorsorge verpflichtet?",
        options: ["Seit 2010", "Seit 2019", "Seit 2022"],
        correct: 1,
        explanation: "'seit zweitausend neunzehn' — işverenler 2019'dan beri asgari katkı sağlamak zorunda.",
      },
      {
        id: 4,
        question: "Für wen lohnt sich die Riester-Rente laut Sandra besonders?",
        options: ["Für Single-Gutverdiener ohne Kinder", "Für Familien mit Kindern", "Für alle Arbeitnehmer gleichermaßen"],
        correct: 1,
        explanation: "'Für Familien mit Kindern ja — wegen der hohen Zulagen' — çocuklu aileler için devlet katkısı daha avantajlı.",
      },
      {
        id: 5,
        question: "Was schlagen viele Experten als Lösung für das Rentensystem vor?",
        options: ["Das Renteneintrittsalter auf 75 erhöhen", "Einen staatlichen Kapitalfonds wie in Schweden", "Die gesetzliche Rente abschaffen"],
        correct: 1,
        explanation: "'einen staatlichen Kapitalfonds wie in Schweden oder Norwegen' — İskandinav modeli devlet fonu öneriliyor.",
      },
    ],
    xp: 65,
  },

  // ── Teile 21–30: Interviews & Vorträge ───────────────────────────────────

  {
    id: 21,
    type: "informationen",
    typeLabel: "Interview & Vortrag",
    typeLabelTr: "Röportaj ve Sunum",
    title: "Künstliche Intelligenz im Alltag",
    difficulty: 3,
    audioText:
      "Künstliche Intelligenz ist längst kein Zukunftsthema mehr — sie ist mitten in unserem Alltag angekommen. Sprachassistenten, Empfehlungsalgorithmen auf Streamingplattformen, Navigationssysteme, die sich in Echtzeit anpassen: all das basiert auf KI. Was viele nicht wissen: KI-Systeme erkennen auf Röntgenbildern Tumore teilweise genauer als erfahrene Radiologen. In der Krebsforschung analysieren sie riesige Datenmengen und finden Muster, die für den Menschen nicht erkennbar sind. Das beschleunigt die Entwicklung neuer Therapien enorm. Gleichzeitig entstehen neue ethische Fragen: Wer ist verantwortlich, wenn ein KI-System einen Fehler macht? Wie schützen wir persönliche Daten, die für das Training der Algorithmen gebraucht werden? Und wie stellen wir sicher, dass KI-Systeme nicht die Vorurteile der Menschen reproduzieren, die sie trainiert haben? Ein wichtiges Thema ist auch die Auswirkung auf den Arbeitsmarkt. Studien zeigen, dass nicht nur Routinetätigkeiten durch KI ersetzt werden könnten, sondern auch Teile von Berufen wie Buchhalter, Anwalt oder Journalist. Das bedeutet aber nicht zwingend Massenarbeitslosigkeit — historisch hat jede Technologierevolution alte Jobs vernichtet und neue geschaffen. Die Frage ist, ob der Wandel schnell genug abgefedert wird. Bildung und Umschulung werden dabei entscheidend sein.",
    instruction: "Sie hören einen Vortrag über Künstliche Intelligenz. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Welchen Bereich der Medizin nennt der Vortrag als KI-Anwendungsbeispiel?",
        options: ["Chirurgie und Operationsunterstützung", "Erkennung von Tumoren auf Röntgenbildern", "Entwicklung neuer Medikamente in Labors"],
        correct: 1,
        explanation: "'KI-Systeme erkennen auf Röntgenbildern Tumore' — röntgen görüntülerinde tümör tespiti vurgulanan örnektir.",
      },
      {
        id: 2,
        question: "Welche ethische Frage stellt der Vortrag?",
        options: ["Ob KI teurer ist als menschliche Arbeit", "Wer haftet, wenn ein KI-System einen Fehler macht", "Ob KI in Schulen eingesetzt werden sollte"],
        correct: 1,
        explanation: "'Wer ist verantwortlich, wenn ein KI-System einen Fehler macht?' — sorumluluk meselesi temel etik soru olarak öne çıkıyor.",
      },
      {
        id: 3,
        question: "Was sagt der Vortrag überraschend über KI und Berufe?",
        options: ["Nur einfache Fabrikjobs sind bedroht.", "Auch qualifizierte Berufe wie Anwalt oder Journalist könnten teilweise betroffen sein.", "KI schafft ausschließlich neue Arbeitsplätze."],
        correct: 1,
        explanation: "'auch Teile von Berufen wie Buchhalter, Anwalt oder Journalist' — nitelikli meslekler de kısmen etkilenebilir.",
      },
      {
        id: 4,
        question: "Welche historische Parallele zieht der Vortrag?",
        options: ["KI wird definitiv zu Massenarbeitslosigkeit führen.", "Jede Technologierevolution vernichtet alte Jobs und schafft neue.", "Frühere Technologien hatten keine Auswirkung auf den Arbeitsmarkt."],
        correct: 1,
        explanation: "'historisch hat jede Technologierevolution alte Jobs vernichtet und neue geschaffen' — tarihsel kıyasla olumlu bakış açısı.",
      },
      {
        id: 5,
        question: "Was wird laut Vortrag entscheidend sein, um den Wandel abzufedern?",
        options: ["Staatliche Kontrolle über KI-Unternehmen", "Bildung und Umschulung", "Internationale Regulierung durch die UNO"],
        correct: 1,
        explanation: "'Bildung und Umschulung werden dabei entscheidend sein' — eğitim ve yeniden mesleki uyum kritik önem taşıyor.",
      },
    ],
    xp: 65,
  },

  {
    id: 22,
    type: "informationen",
    typeLabel: "Interview & Vortrag",
    typeLabelTr: "Röportaj ve Sunum",
    title: "Energiewende in Deutschland",
    difficulty: 3,
    audioText:
      "Deutschland hat sich ehrgeizige Ziele gesetzt: Bis zweitausend dreißig sollen achtzig Prozent des Stroms aus erneuerbaren Quellen kommen. Doch wie weit ist die Energiewende wirklich? Im vergangenen Jahr stammten bereits über fünfzig Prozent des deutschen Stroms aus Wind, Sonne, Wasser und Biomasse — ein historischer Rekord. Das größte Problem bleibt die Speicherung. Wind und Sonne produzieren Strom, wenn er produziert wird — nicht immer, wenn er gebraucht wird. Großbatteriespeicher und Wasserstofftechnologie sind vielversprechend, aber noch nicht in ausreichendem Maßstab verfügbar. Ein weiteres Problem ist das Stromnetz. Es wurde für zentrale Großkraftwerke gebaut, nicht für dezentrale Erzeugung. Milliarden müssen investiert werden. Der Ausbau der Windkraft an Land geht zu langsam voran. Genehmigungsverfahren dauern in Deutschland im Durchschnitt sieben Jahre — in Ländern wie Dänemark weniger als zwei Jahre. Dennoch zeigen sich Experten optimistisch: Die Kosten für Solarenergie sind in den letzten zehn Jahren um über neunzig Prozent gefallen. Das macht erneuerbare Energien zur günstigsten Stromquelle überhaupt. Wenn Politik, Wirtschaft und Gesellschaft an einem Strang ziehen, ist das Ziel für zweitausend dreißig erreichbar — aber nur mit konsequenten Reformen.",
    instruction: "Sie hören einen Bericht über die Energiewende. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Wie hoch war der Anteil erneuerbarer Energien am deutschen Strom laut dem Bericht?",
        options: ["Über 80 Prozent", "Über 50 Prozent", "Genau 30 Prozent"],
        correct: 1,
        explanation: "'bereits über fünfzig Prozent' — geçen yıl yenilenebilir enerji payı %50'yi geçerek rekor kırdı.",
      },
      {
        id: 2,
        question: "Was ist laut dem Bericht das größte Problem der Energiewende?",
        options: ["Zu wenig Fachkräfte im Bereich", "Die Speicherung von Energie", "Zu hohe Kosten für Windkraftanlagen"],
        correct: 1,
        explanation: "'Das größte Problem bleibt die Speicherung' — enerji depolama en büyük teknik engel.",
      },
      {
        id: 3,
        question: "Wie lange dauern Genehmigungsverfahren für Windkraftanlagen in Deutschland?",
        options: ["2 Jahre", "5 Jahre", "7 Jahre"],
        correct: 2,
        explanation: "'in Deutschland im Durchschnitt sieben Jahre' — rüzgar türbinleri için izin süreci çok uzun.",
      },
      {
        id: 4,
        question: "Um wie viel Prozent sind die Kosten für Solarenergie in den letzten 10 Jahren gesunken?",
        options: ["Um 50 Prozent", "Um über 90 Prozent", "Um 30 Prozent"],
        correct: 1,
        explanation: "'um über neunzig Prozent gefallen' — güneş enerjisi maliyeti son 10 yılda %90'dan fazla düştü.",
      },
      {
        id: 5,
        question: "Was ist laut dem Bericht Voraussetzung für das Erreichen des Ziels 2030?",
        options: ["Die Klimaziele sollten realistischer angepasst werden.", "Konsequente Reformen in Politik und Wirtschaft", "Deutschland sollte auf Kernkraft setzen."],
        correct: 1,
        explanation: "'nur mit konsequenten Reformen' — 2030 hedefine ulaşmak için kararlı reformlar şart.",
      },
    ],
    xp: 65,
  },

  {
    id: 23,
    type: "informationen",
    typeLabel: "Interview & Vortrag",
    typeLabelTr: "Röportaj ve Sunum",
    title: "Stress und psychische Widerstandsfähigkeit",
    difficulty: 3,
    audioText:
      "Wir leben in einer Zeit der Reizüberflutung. Smartphones, soziale Medien, Nachrichtenfluten — unser Gehirn ist evolutionär nicht für diese Informationsdichte ausgerichtet. Das sagt die Psychologin Dr. Lisa Hartmann, die an der Universität Bonn zu Stressbewältigung forscht. Unser Stresssystem wurde ursprünglich für kurzfristige, körperliche Bedrohungen entwickelt — Flucht vor einem Raubtier zum Beispiel. Heute läuft es aber chronisch auf Hochtouren, weil wir ständig erreichbar sind und viele Anforderungen gleichzeitig bewältigen müssen. Dieser Dauerstress hat massive gesundheitliche Folgen: Schlafprobleme, Herz-Kreislauf-Erkrankungen, Angststörungen und Burnout sind nur einige davon. Dr. Hartmann empfiehlt bewusste Pausen: Schon zwanzig Minuten in der Natur ohne Bildschirm können den Kortisolspiegel messbar senken. Besonders wichtig sei es, dem Gehirn Zeit für sogenannte Verarbeitungsphasen zu geben — Momente ohne aktive Stimulation, in denen das Gehirn Erfahrungen sortiert und Gelerntes festigt. Meditation sei dafür geeignet, aber nicht für jeden der richtige Weg. Auch körperliche Bewegung oder kreative Tätigkeiten haben ähnliche Effekte. Dr. Hartmann betont: Resilienz — psychische Widerstandsfähigkeit — ist erlernbar. Aber die Gesellschaft muss auch strukturell reagieren. Erreichbarkeit rund um die Uhr ist weder nötig noch gesund.",
    instruction: "Sie hören ein Interview mit einer Psychologin über Stress. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Wofür wurde das menschliche Stresssystem evolutionär entwickelt?",
        options: ["Für langfristige psychische Belastungen", "Für kurzfristige, körperliche Bedrohungen", "Für soziale Konflikte in Gruppen"],
        correct: 1,
        explanation: "'für kurzfristige, körperliche Bedrohungen entwickelt' — stres sistemi avcıdan kaçmak gibi anlık tehditler için gelişti.",
      },
      {
        id: 2,
        question: "Was kann laut Dr. Hartmann den Kortisolspiegel messbar senken?",
        options: ["Eine Stunde Sport täglich", "20 Minuten in der Natur ohne Bildschirm", "Eine Tasse Kaffee am Morgen"],
        correct: 1,
        explanation: "'Schon zwanzig Minuten in der Natur ohne Bildschirm' — ekrandan uzak doğada 20 dakika kortizol düzeyini düşürüyor.",
      },
      {
        id: 3,
        question: "Was sind Verarbeitungsphasen laut dem Interview?",
        options: ["Intensive Lernphasen für neue Informationen", "Momente ohne aktive Stimulation, in denen das Gehirn sortiert und festigt", "Zeiten aktiver Meditation mit Anleitung"],
        correct: 1,
        explanation: "'Momente ohne aktive Stimulation' — beynin deneyimleri işlediği ve öğrendiklerini pekiştirdiği pasif anlardır.",
      },
      {
        id: 4,
        question: "Welche Eigenschaft hält Dr. Hartmann für erlernbar?",
        options: ["Hohe Intelligenz", "Resilienz — psychische Widerstandsfähigkeit", "Kreativität"],
        correct: 1,
        explanation: "'Resilienz ist erlernbar' — psikolojik dayanıklılık geliştirilebilir bir beceri.",
      },
      {
        id: 5,
        question: "Was fordert Dr. Hartmann über individuelle Maßnahmen hinaus?",
        options: ["Mehr Urlaubstage gesetzlich zu verankern", "Eine strukturelle Reaktion der Gesellschaft — weniger erzwungene Erreichbarkeit", "Therapiepflicht für alle Berufstätigen"],
        correct: 1,
        explanation: "'die Gesellschaft muss auch strukturell reagieren' — bireysel çabalar yeterli değil; sürekli erişilebilirlik kültürü değişmeli.",
      },
    ],
    xp: 65,
  },

  {
    id: 24,
    type: "informationen",
    typeLabel: "Interview & Vortrag",
    typeLabelTr: "Röportaj ve Sunum",
    title: "Klimafolgen und Anpassungsstrategien",
    difficulty: 3,
    audioText:
      "Der Klimawandel ist keine ferne Zukunftsgefahr mehr — seine Folgen sind bereits heute spürbar. In Deutschland haben wir in den letzten Jahren Extremwetterereignisse erlebt, die früher selten waren: Hitzewellen, Dürren, Starkregen und Überschwemmungen wie im Ahrtal zweitausend einundzwanzig. Klimaexperten betonen: Auch wenn wir alle Emissionen sofort stoppen würden, kämen noch Jahrzehnte der Erwärmung, weil das CO₂, das wir bereits emittiert haben, noch lange in der Atmosphäre verbleibt. Deshalb brauchen wir zwei parallele Strategien: Mitigation — also die Reduktion von Treibhausgasemissionen — und Adaptation — also die Anpassung an unvermeidliche Veränderungen. Für die Landwirtschaft bedeutet das zum Beispiel: hitze- und trockenheitsresistentere Pflanzensorten und effizientere Bewässerung. Für Städte: mehr Grünflächen, Entsiegelung von Böden und bessere Entwässerungssysteme. Die Kosten für Klimaschutz klingen hoch — aber sie sind geringer als die Kosten des Nichthandelns. Eine Studie des Potsdam-Instituts hat berechnet: Jeder Euro, der heute in Klimaschutz investiert wird, spart mindestens fünf Euro an zukünftigen Schadenskosten.",
    instruction: "Sie hören einen Vortrag über Klimafolgen. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Welches deutsche Extremwetterereignis wird im Vortrag explizit erwähnt?",
        options: ["Die Schneestürme von 2019", "Die Überschwemmungen im Ahrtal 2021", "Die Dürre von 2003"],
        correct: 1,
        explanation: "'Überschwemmungen wie im Ahrtal zweitausend einundzwanzig' — 2021 Ahr sel felaketi somut örnek olarak verildi.",
      },
      {
        id: 2,
        question: "Was sagt der Vortrag über einen sofortigen Emissionsstopp?",
        options: ["Die Erwärmung würde sofort aufhören.", "Trotzdem kämen noch Jahrzehnte der Erwärmung wegen bereits emittierten CO₂.", "Ein Emissionsstopp ist technisch nicht möglich."],
        correct: 1,
        explanation: "'kämen noch Jahrzehnte der Erwärmung' — atmosferdeki CO₂ uzun süre kalacağından ısınma devam edecek.",
      },
      {
        id: 3,
        question: "Was sind die zwei parallelen Klimastrategien laut Vortrag?",
        options: ["Digitalisierung und Elektrifizierung", "Mitigation (Emissionsreduktion) und Adaptation (Anpassung)", "Aufforstung und Solarenergie"],
        correct: 1,
        explanation: "'Mitigation und Adaptation' — hem emisyon azaltma hem de kaçınılmaz değişimlere uyum gerekli.",
      },
      {
        id: 4,
        question: "Was empfiehlt der Vortrag speziell für Städte?",
        options: ["Mehr Parkplätze und Klimaanlagen in Gebäuden", "Mehr Grünflächen, Entsiegelung und bessere Entwässerung", "Höhere Gebäude und zentrale Kühlsysteme"],
        correct: 1,
        explanation: "'mehr Grünflächen, Entsiegelung von Böden und bessere Entwässerungssysteme' — şehirlerde iklim adaptasyonu için somut önlemler.",
      },
      {
        id: 5,
        question: "Was besagt die Studie des Potsdam-Instituts über Klimaschutzkosten?",
        options: ["Klimaschutz ist wirtschaftlich nicht tragbar.", "Jeder Euro Klimaschutz spart mindestens 5 Euro an Schadenskosten.", "Die Kosten für Klimaschutz und Nichthandeln sind gleich hoch."],
        correct: 1,
        explanation: "'spart mindestens fünf Euro an zukünftigen Schadenskosten' — iklim yatırımları uzun vadede çok daha büyük zarar maliyetlerini önlüyor.",
      },
    ],
    xp: 65,
  },

  {
    id: 25,
    type: "informationen",
    typeLabel: "Interview & Vortrag",
    typeLabelTr: "Röportaj ve Sunum",
    title: "Start-up und Unternehmertum",
    difficulty: 2,
    audioText:
      "Carla Mendes ist dreiunddreißig Jahre alt und hat vor fünf Jahren ihr Start-up im Bereich Nachhaltigkeitstechnologie gegründet. Ihr Unternehmen entwickelt KI-basierte Systeme, die Firmen helfen, ihren Energieverbrauch zu optimieren und CO₂-Emissionen zu reduzieren. Der Einstieg war alles andere als einfach. Sie hatten ein gutes Produkt, aber es fehlte an Kapital und Kundenkontakten. Die ersten zwei Jahre waren finanziell sehr schwierig. Heute beschäftigt das Unternehmen fünfzig Mitarbeiter und hat Kunden in neun europäischen Ländern. Was ist das Geheimnis ihres Erfolgs? Ehrlichkeit gegenüber Kunden: Sie versprechen nicht, was sie nicht halten können. Und ein gutes Gründerteam — Carla hat Mitgründer gefunden, die ihre Schwächen ausgleichen. Ein weiteres Erfolgsgeheimnis: früh internationale Märkte angepeilt. Der deutsche Markt ist wichtig, aber Europa ist ihr eigentlicher Heimatmarkt. Was rät Carla jungen Gründerinnen und Gründern? Scheitern ist Teil des Prozesses. Ihre erste Geschäftsidee ist komplett gescheitert. Daraus hat sie mehr gelernt als aus allen späteren Erfolgen. Und: sich Mentoren zu suchen — Menschen, die schon durch das Feuer gegangen sind und ihre Erfahrungen teilen.",
    instruction: "Sie hören ein Interview mit einer Gründerin. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Was entwickelt Carla Mendes' Unternehmen?",
        options: ["Elektroautos für den Stadtverkehr", "KI-Systeme zur Energieoptimierung für Unternehmen", "Solaranlagen für Privathaushalte"],
        correct: 1,
        explanation: "'KI-basierte Systeme, die Firmen helfen, ihren Energieverbrauch zu optimieren' — kurumsal enerji optimasyonu için YZ sistemleri.",
      },
      {
        id: 2,
        question: "Was war in den ersten zwei Jahren besonders schwierig?",
        options: ["Die technische Entwicklung des Produkts", "Die finanzielle Situation", "Die Suche nach geeigneten Mitarbeitern"],
        correct: 1,
        explanation: "'Die ersten zwei Jahre waren finanziell sehr schwierig' — ilk yıllarda sermaye ve müşteri bağlantısı eksikti.",
      },
      {
        id: 3,
        question: "Was nennt Carla als eines ihrer Erfolgsgeheimnisse?",
        options: ["Keine Konkurrenz zu beachten", "Ehrlichkeit gegenüber Kunden und ein starkes Gründerteam", "Ausschließlich auf den deutschen Markt zu setzen"],
        correct: 1,
        explanation: "'Ehrlichkeit gegenüber Kunden' und 'ein gutes Gründerteam' — iki temel başarı faktörü olarak vurgulandı.",
      },
      {
        id: 4,
        question: "Welche Marktstrategie verfolgte Carla früh?",
        options: ["Ausschließlich auf den deutschen Markt fokussieren", "Früh internationale Märkte in ganz Europa anpeilen", "Zuerst den US-Markt erschließen"],
        correct: 1,
        explanation: "'früh internationale Märkte angepeilt' — Avrupa genelinde erken büyüme stratejisi izledi.",
      },
      {
        id: 5,
        question: "Was empfiehlt Carla jungen Gründern?",
        options: ["Nur mit gesichertem Kapital gründen", "Scheitern als Lernchance sehen und Mentoren suchen", "Keine Mitgründer einbinden"],
        correct: 1,
        explanation: "'Scheitern ist Teil des Prozesses' und 'Mentoren suchen' — başarısızlıktan öğrenmek ve deneyimli rehberlere başvurmak öneriliyor.",
      },
    ],
    xp: 60,
  },

  {
    id: 26,
    type: "informationen",
    typeLabel: "Interview & Vortrag",
    typeLabelTr: "Röportaj ve Sunum",
    title: "Geschichte der europäischen Integration",
    difficulty: 3,
    audioText:
      "Die Europäische Union ist ein einzigartiges historisches Projekt. Nach zwei Weltkriegen, die Europa verwüstet hatten, entschlossen sich die Staaten Westeuropas für einen anderen Weg: statt Rivalität und Nationalismus — Kooperation und wirtschaftliche Verflechtung. Den Grundstein legten sechs Länder im Jahr neunzehnhundert siebenundfünfzig mit den Römischen Verträgen: Deutschland, Frankreich, Italien und die drei Benelux-Staaten gründeten die Europäische Wirtschaftsgemeinschaft. Der Gedanke dahinter: Länder, die wirtschaftlich eng verbunden sind, haben kein Interesse mehr an Krieg. Diese Logik hat sich bewährt. Heute umfasst die EU siebenundzwanzig Mitgliedstaaten und repräsentiert einen Binnenmarkt von über vierhundert Millionen Menschen. Der Euro — die gemeinsame Währung von neunzehn Mitgliedstaaten — erleichtert Handel und Reisen erheblich. Natürlich hat die EU auch Krisen durchgemacht: die Schuldenkrise in Griechenland, der Brexit, Streitigkeiten über die Verteilung von Migranten. Diese Krisen haben Schwächen des Systems offengelegt — vor allem fehlende gemeinsame Fiskalpolitik. Dennoch: Die EU hat Frieden in Europa gesichert, Wohlstand gefördert und Millionen von Menschen ermöglicht, frei zu reisen, zu arbeiten und zu studieren, wo sie wollen.",
    instruction: "Sie hören einen Vortrag über die Geschichte der EU. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Was war die Grundidee hinter der Europäischen Wirtschaftsgemeinschaft?",
        options: ["Ein gemeinsames europäisches Militär zu schaffen", "Wirtschaftliche Verflechtung würde Krieg unwahrscheinlicher machen.", "Eine gemeinsame europäische Sprache einzuführen"],
        correct: 1,
        explanation: "'wirtschaftlich eng verbunden sind, haben kein Interesse mehr an Krieg' — ekonomik entegrasyon barışın güvencesi olarak görüldü.",
      },
      {
        id: 2,
        question: "Welche sechs Länder gründeten 1957 die EWG?",
        options: ["Deutschland, Frankreich, Spanien, Portugal, Italien, Griechenland", "Deutschland, Frankreich, Italien und die drei Benelux-Staaten", "Deutschland, Österreich, Schweiz, Frankreich, Holland, Belgien"],
        correct: 1,
        explanation: "'Deutschland, Frankreich, Italien und die drei Benelux-Staaten' — Belçika, Hollanda, Lüksemburg dahil 6 kurucu üye.",
      },
      {
        id: 3,
        question: "Wie viele Mitgliedstaaten hat die EU heute laut Vortrag?",
        options: ["19", "27", "30"],
        correct: 1,
        explanation: "'siebenundzwanzig Mitgliedstaaten' — AB'nin günümüzde 27 üyesi bulunuyor.",
      },
      {
        id: 4,
        question: "Welche Krisen erwähnt der Vortrag?",
        options: ["Den Ersten Weltkrieg, den Kalten Krieg, die Finanzkrise 2008", "Die griechische Schuldenkrise, den Brexit und Migrationsstreitigkeiten", "Den Jugoslawienkrieg, die Ölkrise und den Euro-Kollaps"],
        correct: 1,
        explanation: "'Schuldenkrise in Griechenland, der Brexit, Streitigkeiten über Migranten' — üç somut AB krizi sayıldı.",
      },
      {
        id: 5,
        question: "Was betont der Vortrag als bleibenden Verdienst der EU?",
        options: ["Die Einführung einer gemeinsamen Armee", "Friedenssicherung, Wohlstand und Reise- und Arbeitsfreiheit", "Die Vereinheitlichung aller nationalen Rechtssysteme"],
        correct: 1,
        explanation: "'Frieden gesichert, Wohlstand gefördert und Millionen ermöglicht, frei zu reisen' — AB'nin en kalıcı başarıları.",
      },
    ],
    xp: 65,
  },

  {
    id: 27,
    type: "informationen",
    typeLabel: "Interview & Vortrag",
    typeLabelTr: "Röportaj ve Sunum",
    title: "Ernährung und Gesundheit",
    difficulty: 2,
    audioText:
      "Die Ernährungswissenschaftlerin Dr. Andrea Vogel erklärt, warum unsere Ernährungsgewohnheiten so wichtig sind. Ernährung ist nach Rauchen der zweitgrößte vermeidbare Risikofaktor für chronische Krankheiten. Herzerkrankungen, Typ-2-Diabetes, bestimmte Krebsarten — all das hängt stark davon ab, was wir täglich essen. In Deutschland hat die durchschnittliche Ernährung große Defizite: zu viel Fleisch, zu viel Zucker und Salz, zu wenig Obst, Gemüse und Ballaststoffe. Das sei historisch gewachsen und mit sozialen Strukturen verbunden. Gesunde Ernährung kostet oft mehr Zeit und mehr Geld — das ist besonders für einkommensschwache Bevölkerungsgruppen ein reales Problem. Was würde Dr. Vogel ändern? Als erstes eine Zuckersteuer wie in Großbritannien — das hat nachweislich den Zuckergehalt in Getränken gesenkt. Außerdem müssen Schulen und Kantinen zum Ort guter Ernährung werden. Zur veganen Ernährung sagt sie: Eine gut geplante vegane Ernährung ist gesund und hat enorme Umweltvorteile. Aber das Wort 'gut geplant' ist entscheidend — sonst drohen Nährstoffmangel. Insgesamt plädiert sie für einen pragmatischen Ansatz: Fleisch deutlich reduzieren, mehr pflanzliche Kost — aber nicht dogmatisch. Das Beste ist, was man langfristig tatsächlich durchhält.",
    instruction: "Sie hören ein Interview mit einer Ernährungswissenschaftlerin. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Welchen Rang nimmt Ernährung als vermeidbarer Risikofaktor ein?",
        options: ["Den ersten nach Bewegungsmangel", "Den zweiten nach dem Rauchen", "Den dritten nach Alkohol"],
        correct: 1,
        explanation: "'nach Rauchen der zweitgrößte vermeidbare Risikofaktor' — sigara birinci, beslenme ikinci sıradadır.",
      },
      {
        id: 2,
        question: "Welche Mängel beschreibt Dr. Vogel bei der deutschen Durchschnittsernährung?",
        options: ["Zu wenig Fleisch und Kalorien", "Zu viel Fleisch, Zucker und Salz, zu wenig Obst und Gemüse", "Zu viel Fastfood und zu wenig Milchprodukte"],
        correct: 1,
        explanation: "'zu viel Fleisch, zu viel Zucker und Salz, zu wenig Obst, Gemüse' — Almanya'daki beslenme alışkanlıklarının temel eksiklikleri.",
      },
      {
        id: 3,
        question: "Welche politische Maßnahme empfiehlt Dr. Vogel als erste?",
        options: ["Ein Verbot von Fastfood-Werbung", "Eine Zuckersteuer wie in Großbritannien", "Subventionen für Bio-Lebensmittel"],
        correct: 1,
        explanation: "'eine Zuckersteuer wie in Großbritannien' — İngiltere'deki şeker vergisi içeceklerdeki şekeri kanıtlanmış şekilde azalttı.",
      },
      {
        id: 4,
        question: "Wie beurteilt Dr. Vogel vegane Ernährung?",
        options: ["Als grundsätzlich ungesund", "Als gesund und umweltfreundlich, wenn gut geplant", "Als nur für sportlich aktive Menschen geeignet"],
        correct: 1,
        explanation: "'gut geplante vegane Ernährung ist gesund' — iyi planlanmış veganizm hem sağlıklı hem çevre dostudur.",
      },
      {
        id: 5,
        question: "Was ist laut Dr. Vogel die beste Ernährungsweise?",
        options: ["Ausschließlich vegane Ernährung", "Strenge Kalorienreduktion", "Was man langfristig tatsächlich durchhält — pragmatisch und pflanzenbetont"],
        correct: 2,
        explanation: "'Das Beste ist, was man langfristig tatsächlich durchhält' — uzun vadede sürdürülebilir olan pragmatik yaklaşım en iyisi.",
      },
    ],
    xp: 60,
  },

  {
    id: 28,
    type: "informationen",
    typeLabel: "Interview & Vortrag",
    typeLabelTr: "Röportaj ve Sunum",
    title: "Gentrifizierung und Stadtentwicklung",
    difficulty: 3,
    audioText:
      "In vielen deutschen Großstädten ist ein Prozess zu beobachten, der als Gentrifizierung bekannt ist: Ehemals günstige, oft kreative Stadtteile werden aufgewertet, ziehen wohlhabendere Bewohner an und verdrängen die ursprüngliche Bevölkerung. Das Muster ist immer ähnlich: Zuerst kommen Künstler und Studierende in günstige Viertel. Sie machen das Viertel lebendig und attraktiv. Dann steigen die Mieten. Cafés, Galerien und teure Boutiquen ersetzen den Bäcker und das Gemüsegeschäft. Und schließlich können sich die ursprünglichen Bewohner und die Künstler, die das Viertel erst attraktiv gemacht haben, die Mieten nicht mehr leisten und ziehen weg. Kritiker sehen Gentrifizierung als sozialen Verdrängungsprozess und fordern mehr Mieterschutz. Befürworter betonen, dass Investitionen in Wohnqualität positiv sind. Die Realität liegt dazwischen: Stadtentwicklung braucht Investitionen — aber ohne soziale Abfederung entstehen gespaltene Städte. Instrumente wie Milieuschutzgebiete, Sozialwohnungsquoten bei Neubau und kommunale Vorkaufsrechte können helfen, den Prozess zu steuern — aber nur, wenn sie konsequent eingesetzt werden. Berlin und Hamburg haben erste Erfahrungen damit gemacht, mit gemischten Ergebnissen.",
    instruction: "Sie hören einen Vortrag über Gentrifizierung. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Welches Muster beschreibt der Vortrag bei der Gentrifizierung?",
        options: ["Industriegebiete werden zu Wohnvierteln umgebaut.", "Günstige Viertel werden attraktiv, Mieten steigen, ursprüngliche Bewohner werden verdrängt.", "Reiche Viertel werden für ärmere zugänglich gemacht."],
        correct: 1,
        explanation: "'Viertel werden attraktiv … Mieten steigen … verdrängen die ursprüngliche Bevölkerung' — kentsel dönüşümün tipik sarmalı.",
      },
      {
        id: 2,
        question: "Wer kommt laut Vortrag zuerst in die günstigeren Stadtteile?",
        options: ["Wohlhabende Investoren", "Künstler und Studierende", "Internationale Konzerne"],
        correct: 1,
        explanation: "'Zuerst kommen Künstler und Studierende' — ucuz kira arayan sanatçılar ve öğrenciler semti çekici hale getiriyor.",
      },
      {
        id: 3,
        question: "Was kritisieren Kritiker der Gentrifizierung?",
        options: ["Zu wenig Investitionen in die Infrastruktur", "Den sozialen Verdrängungsprozess und fehlenden Mieterschutz", "Die Entstehung neuer Grünflächen"],
        correct: 1,
        explanation: "'sozialen Verdrängungsprozess und fordern mehr Mieterschutz' — sosyal tasfiye süreci ve kiracı hakları ana eleştiri konusu.",
      },
      {
        id: 4,
        question: "Welche Instrumente nennt der Vortrag zur Steuerung der Gentrifizierung?",
        options: ["Mietpreiserhöhungen und Investitionsanreize", "Milieuschutzgebiete, Sozialwohnungsquoten und kommunale Vorkaufsrechte", "Steuererleichterungen für Neubauten"],
        correct: 1,
        explanation: "'Milieuschutzgebiete, Sozialwohnungsquoten, kommunale Vorkaufsrechte' — bu araçlar süreci yönetmeye yardımcı olabilir.",
      },
      {
        id: 5,
        question: "Wie bewertet der Vortrag die Erfahrungen in Berlin und Hamburg?",
        options: ["Als vollständig erfolgreich", "Als gemischte Ergebnisse", "Als vollständig gescheitert"],
        correct: 1,
        explanation: "'mit gemischten Ergebnissen' — Berlin ve Hamburg'daki uygulamalar kısmen işe yaradı, kısmen yetersiz kaldı.",
      },
    ],
    xp: 65,
  },

  {
    id: 29,
    type: "informationen",
    typeLabel: "Interview & Vortrag",
    typeLabelTr: "Röportaj ve Sunum",
    title: "Neurowissenschaft und Lernen",
    difficulty: 3,
    audioText:
      "Wie lernt das Gehirn am besten? Neurowissenschaftler haben in den letzten Jahrzehnten viel Licht in dieses Dunkel gebracht — und manche Erkenntnisse sind überraschend. Der größte Mythos: Lernen durch Wiederholung allein. Passives Lesen oder Anhören von Informationen ist eine der ineffektivsten Lernmethoden. Effektiver ist aktives Erinnern — also das Gehirn dazu zwingen, Informationen aus dem Gedächtnis abzurufen. Karteikarten, Tests und das Erklären von Stoff an andere sind besonders wirkungsvoll. Ein weiterer wichtiger Faktor ist der Schlaf. Während des Schlafs konsolidiert das Gehirn Gelerntes — es überträgt Informationen vom Kurzzeit- ins Langzeitgedächtnis. Wer nach dem Lernen zu wenig schläft, vergisst deutlich mehr. Pausen sind ebenfalls entscheidend. Das Gehirn braucht Verarbeitungszeit — intensive Lernphasen ohne Pause führen zu sinkender Konzentration. Die Intervall-Methode — verteilt über mehrere Tage lernen statt kurz vor der Prüfung — ist wissenschaftlich klar überlegen. Auch emotionale Relevanz spielt eine Rolle: Was uns emotional bewegt, behalten wir besser. Eine motivierende Lernumgebung ist daher keine Nebensache, sondern eine neurologische Notwendigkeit. Das Gute: Das Gehirn ist plastisch — es lernt bis ins hohe Alter.",
    instruction: "Sie hören einen Vortrag über Lernmethoden. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Was ist laut Neurowissenschaftlern eine der ineffektivsten Lernmethoden?",
        options: ["Das Erklären von Stoff an andere", "Passives Lesen oder Anhören von Informationen", "Das Verwenden von Karteikarten"],
        correct: 1,
        explanation: "'Passives Lesen oder Anhören ist eine der ineffektivsten Lernmethoden' — pasif okuma ve dinleme öğrenmede en az verimli yöntemdir.",
      },
      {
        id: 2,
        question: "Was passiert während des Schlafs für das Lernen?",
        options: ["Das Gehirn macht vollständige Pause.", "Das Gehirn konsolidiert Gelerntes und überträgt es ins Langzeitgedächtnis.", "Das Gehirn vergisst unwichtige Informationen."],
        correct: 1,
        explanation: "'konsolidiert das Gehirn Gelerntes' — uyku sırasında beyin öğrenilenleri uzun süreli belleğe aktarır.",
      },
      {
        id: 3,
        question: "Was ist die Intervall-Methode?",
        options: ["Kurz vor der Prüfung intensiv lernen", "Über mehrere Tage verteilt lernen statt kurz vor der Prüfung", "Abwechselnd zwischen zwei Fächern lernen"],
        correct: 1,
        explanation: "'verteilt über mehrere Tage lernen' — aralıklı öğrenme ezber yerine kalıcı öğrenme sağlar.",
      },
      {
        id: 4,
        question: "Welche Rolle spielt emotionale Relevanz beim Lernen?",
        options: ["Sie stört die Konzentration.", "Was uns emotional bewegt, behalten wir besser.", "Emotion und Lernen sind neurologisch unabhängig."],
        correct: 1,
        explanation: "'Was uns emotional bewegt, behalten wir besser' — duygusal bağ kurulan bilgiler daha iyi hatırlanır.",
      },
      {
        id: 5,
        question: "Was ist die positive Botschaft des Vortrags über das Gehirn?",
        options: ["Das Gehirn ist im Alter deutlich weniger lernfähig.", "Das Gehirn ist plastisch und lernt bis ins hohe Alter.", "Das Gehirn kann nur bis zum 30. Lebensjahr effizient lernen."],
        correct: 1,
        explanation: "'Das Gehirn ist plastisch — es lernt bis ins hohe Alter' — beyin ömür boyu öğrenme kapasitesini korur.",
      },
    ],
    xp: 65,
  },

  {
    id: 30,
    type: "informationen",
    typeLabel: "Interview & Vortrag",
    typeLabelTr: "Röportaj ve Sunum",
    title: "Globalisierung im Wandel",
    difficulty: 3,
    audioText:
      "Globalisierung ist eines der prägendsten Phänomene der letzten Jahrzehnte. Sie hat die Welt enger zusammengebracht, Milliarden aus der Armut gehoben und technologischen Fortschritt beschleunigt. Gleichzeitig hat sie Ungleichheiten verschärft und neue Verwundbarkeiten geschaffen — wie die Corona-Pandemie schmerzhaft gezeigt hat. Als globale Lieferketten zusammenbrachen, fehlten plötzlich Masken, Chips und medizinische Geräte. Die Welt hatte sich zu abhängig von wenigen Produktionsstandorten gemacht. Die Reaktion vieler Länder: mehr Reshoring — also die Rückverlagerung von Produktion ins eigene Land oder in verlässliche Partnerländer. Das ist wirtschaftlich teurer, aber sicherer. Gleichzeitig werden internationale Handelsbeziehungen komplexer. Handelsstreitigkeiten zwischen den USA und China, Sanktionen gegen Russland, zunehmender Protektionismus in der EU — die Phase des ungehemmten Freihandels scheint vorbei zu sein. Viele Ökonomen sprechen deshalb von 'Slowbalisation' — einer verlangsamten, aber nicht gestoppten Globalisierung. Die entscheidende Frage ist, ob neue Regeln und mehr regionale Kooperationen entstehen, die wirtschaftliche Effizienz, Resilienz und soziale Gerechtigkeit gleichzeitig berücksichtigen. Die Globalisierung bleibt — aber sie wird sich neu erfinden müssen.",
    instruction: "Sie hören einen Vortrag über Globalisierung. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Was hat die Corona-Pandemie laut Vortrag über die Globalisierung offenbart?",
        options: ["Dass globale Lieferketten grundsätzlich unzuverlässig sind", "Eine zu große Abhängigkeit von wenigen Produktionsstandorten", "Dass internationale Zusammenarbeit grundsätzlich nicht funktioniert"],
        correct: 1,
        explanation: "'zu abhängig von wenigen Produktionsstandorten' — pandemi küresel tedarik zincirlerinin kırılganlığını gözler önüne serdi.",
      },
      {
        id: 2,
        question: "Was bedeutet 'Reshoring'?",
        options: ["Den Aufbau neuer Lieferketten in Schwellenländern", "Die Rückverlagerung von Produktion ins eigene Land oder verlässliche Partnerländer", "Die Digitalisierung internationaler Handelsprozesse"],
        correct: 1,
        explanation: "'Rückverlagerung von Produktion ins eigene Land' — reshoring üretimi geri taşıma stratejisidir.",
      },
      {
        id: 3,
        question: "Welche Entwicklungen deuten auf das Ende des ungehemmten Freihandels hin?",
        options: ["Die Gründung der Welthandelsorganisation", "Handelsstreitigkeiten USA-China, Sanktionen gegen Russland und Protektionismus", "Die Einführung des Euro in der EU"],
        correct: 1,
        explanation: "'Handelsstreitigkeiten, Sanktionen, Protektionismus' — bu gelişmeler serbest ticaret döneminin sonuna işaret ediyor.",
      },
      {
        id: 4,
        question: "Was meinen Ökonomen mit 'Slowbalisation'?",
        options: ["Eine vollständige Rückabwicklung der Globalisierung", "Eine verlangsamte, aber nicht gestoppte Globalisierung", "Die Konzentration auf rein regionale Märkte"],
        correct: 1,
        explanation: "'verlangsamten, aber nicht gestoppten Globalisierung' — küreselleşme durmadı, sadece yavaşladı.",
      },
      {
        id: 5,
        question: "Welche Hoffnung formuliert der Vortrag für die Zukunft?",
        options: ["Eine vollständige Rückkehr zum Nationalstaat", "Neue Regeln und Kooperationen, die Effizienz, Resilienz und Gerechtigkeit verbinden", "Ein globales Freihandelsabkommen ohne Einschränkungen"],
        correct: 1,
        explanation: "'Effizienz, Resilienz und soziale Gerechtigkeit gleichzeitig berücksichtigen' — yeni küreselleşme modelinin dengeli hedefleri.",
      },
    ],
    xp: 65,
  },
];

// ── C1 — Teile 1–10 ──────────────────────────────────────────────────────────

const C1_TEILE: HorenTeil[] = [
  // ── Teile 1–3: Kurztexte & Berichte (richtig/falsch) ─────────────────────

  {
    id: 1,
    type: "ansagen",
    typeLabel: "Akademische Kurztexte",
    typeLabelTr: "Akademik Kısa Metinler",
    title: "Demokratie und politischer Extremismus",
    difficulty: 3,
    questionFormat: "richtigfalsch",
    instruction:
      "Sie hören fünf kurze Texte zu politischen und gesellschaftlichen Themen auf C1-Niveau. Entscheiden Sie: Ist die Aussage richtig oder falsch?",
    questions: [
      {
        id: 1,
        shortAudio:
          "Politischer Extremismus gedeiht besonders in Zeiten gesellschaftlicher Verunsicherung. Studien belegen, dass wirtschaftliche Prekarität, soziale Desintegration und das Gefühl mangelnder politischer Repräsentation wesentliche Treiber für die Hinwendung zu radikalen Bewegungen sind. Dabei sind es nicht ausschließlich sozioökonomisch Benachteiligte, die anfällig für extremistische Ideologien sind.",
        question:
          "Extremistische Anfälligkeit betrifft laut der Studie ausschließlich sozioökonomisch benachteiligte Bevölkerungsgruppen.",
        correct: 1,
        explanation:
          "Falsch. Die Studie zeigt, dass nicht nur Benachteiligte anfällig sind — extremistische Ideologien können verschiedene Bevölkerungsschichten ansprechen.",
      },
      {
        id: 2,
        shortAudio:
          "Populistische Parteien nutzen bewusst eine vereinfachende Dichotomie zwischen 'dem Volk' und 'den Eliten'. Diese Rhetorik ermöglicht es ihnen, komplexe gesellschaftliche Probleme auf vermeintlich eindeutige Ursachen zurückzuführen und sich als einzige legitime Vertreter des 'wahren Volkes' zu positionieren.",
        question:
          "Populistische Rhetorik vereinfacht komplexe gesellschaftliche Probleme bewusst.",
        correct: 0,
        explanation:
          "Richtig. Populisten nutzen die Dichotomie 'Volk vs. Elite', um komplexe Probleme zu vereinfachen und sich als Volksvertreter zu inszenieren.",
      },
      {
        id: 3,
        shortAudio:
          "Die sogenannte 'Mitte-Studie' der Friedrich-Ebert-Stiftung zeigt, dass autoritäre und menschenfeindliche Einstellungen keineswegs auf den politischen Rand beschränkt sind. Solche Einstellungen finden sich auch in der gesellschaftlichen Mitte — wenngleich in weniger manifester Form.",
        question:
          "Autoritäre Einstellungen sind laut der Mitte-Studie ausschließlich in Randgruppen der Gesellschaft verbreitet.",
        correct: 1,
        explanation:
          "Falsch. Die Studie belegt, dass solche Einstellungen auch in der gesellschaftlichen Mitte — wenn auch weniger ausgeprägt — vorkommen.",
      },
      {
        id: 4,
        shortAudio:
          "Digitale Plattformen haben die Verbreitung extremistischer Inhalte erheblich beschleunigt. Algorithmen, die auf Engagement optimieren, bevorzugen emotionale und polarisierende Inhalte gegenüber sachlichen Informationen — was als 'Outrage-Economy' bezeichnet wird.",
        question:
          "Soziale-Medien-Algorithmen sind so ausgerichtet, dass sie sachliche Informationen gegenüber emotionalen Inhalten bevorzugen.",
        correct: 1,
        explanation:
          "Falsch. Engagement-optimierte Algorithmen fördern gerade emotionale und polarisierende Inhalte — das Gegenteil ist der Fall.",
      },
      {
        id: 5,
        shortAudio:
          "Präventionsansätze gegen Radikalisierung setzen heute zunehmend auf Resilienzförderung statt auf reine Verbotspolitik. Medienkompetenz, kritisches Denken und die Stärkung zivilgesellschaftlicher Strukturen gelten als nachhaltigere Strategien gegen Extremismus.",
        question:
          "Moderne Prävention gegen Radikalisierung setzt vorrangig auf Verbotspolitik.",
        correct: 1,
        explanation:
          "Falsch. Moderne Ansätze setzen auf Resilienzförderung, Medienkompetenz und Zivilgesellschaft — nicht primär auf Verbote.",
      },
    ],
    xp: 70,
  },

  {
    id: 2,
    type: "ansagen",
    typeLabel: "Akademische Kurztexte",
    typeLabelTr: "Akademik Kısa Metinler",
    title: "Neuroplastizität und lebenslanges Lernen",
    difficulty: 3,
    questionFormat: "richtigfalsch",
    instruction:
      "Sie hören fünf kurze Texte aus dem Bereich Neurowissenschaften. Entscheiden Sie: Ist die Aussage richtig oder falsch?",
    questions: [
      {
        id: 1,
        shortAudio:
          "Lange Zeit galt das Gehirn nach der Kindheit als weitgehend statisch. Neuere Forschungen haben jedoch gezeigt, dass das Gehirn ein Leben lang plastisch bleibt — es kann neue synaptische Verbindungen bilden und bestehende verstärken oder abschwächen. Dieses Phänomen wird als Neuroplastizität bezeichnet.",
        question:
          "Neuere Forschungen belegen, dass das Gehirn nur in der Kindheit plastisch ist.",
        correct: 1,
        explanation:
          "Falsch. Neuroplastizität ist ein lebenslanger Prozess — das Gehirn kann sich in jedem Alter strukturell verändern.",
      },
      {
        id: 2,
        shortAudio:
          "Schlaf spielt eine entscheidende Rolle für die Konsolidierung von Gedächtnisinhalten. Während des Tiefschlafs werden tagsüber gebildete synaptische Verbindungen selektiv gestärkt oder eliminiert — ein Prozess, der als synaptische Homöostase bezeichnet wird.",
        question:
          "Die Konsolidierung von Gedächtnisinhalten findet laut der Forschung hauptsächlich im Wachzustand statt.",
        correct: 1,
        explanation:
          "Falsch. Die Gedächtniskonsolidierung erfolgt vor allem im Schlaf — insbesondere im Tiefschlaf.",
      },
      {
        id: 3,
        shortAudio:
          "Das Erlernen einer zweiten Sprache im Erwachsenenalter stimuliert nachweislich mehrere Hirnregionen gleichzeitig und kann den kognitiven Abbau im Alter verlangsamen. Mehrsprachigkeit gilt daher als eine Form der 'kognitiven Reserve'.",
        question:
          "Mehrsprachigkeit kann laut Forschung zum Schutz vor kognitivem Abbau beitragen.",
        correct: 0,
        explanation:
          "Richtig. Mehrsprachigkeit gilt als kognitive Reserve und kann den altersbedingten kognitiven Abbau verlangsamen.",
      },
      {
        id: 4,
        shortAudio:
          "Meditation und Achtsamkeitsübungen führen nachweislich zu strukturellen Veränderungen im präfrontalen Kortex — einer Region, die für Entscheidungsfindung und emotionale Regulation zuständig ist. Bereits acht Wochen regelmäßiger Meditation zeigen messbare Effekte.",
        question:
          "Strukturelle Gehirnveränderungen durch Meditation erfordern mindestens mehrere Jahre regelmäßiger Praxis.",
        correct: 1,
        explanation:
          "Falsch. Studien zeigen, dass bereits acht Wochen regelmäßiger Meditation messbare strukturelle Veränderungen bewirken können.",
      },
      {
        id: 5,
        shortAudio:
          "Chronischer Stress wirkt sich negativ auf den Hippocampus aus — eine für das episodische Gedächtnis zentrale Hirnstruktur. Erhöhte Kortisolspiegel können neuronale Verbindungen schwächen und langfristig das Volumen des Hippocampus reduzieren.",
        question:
          "Chronischer Stress stärkt laut der Forschung die für das Gedächtnis zuständigen Gehirnstrukturen.",
        correct: 1,
        explanation:
          "Falsch. Chronischer Stress schädigt den Hippocampus — er schwächt neuronale Verbindungen und kann das Hippocampusvolumen reduzieren.",
      },
    ],
    xp: 70,
  },

  {
    id: 3,
    type: "ansagen",
    typeLabel: "Akademische Kurztexte",
    typeLabelTr: "Akademik Kısa Metinler",
    title: "Soziale Ungleichheit und Bildungschancen",
    difficulty: 3,
    questionFormat: "richtigfalsch",
    instruction:
      "Sie hören fünf kurze Texte zum Thema Bildungsgerechtigkeit. Entscheiden Sie: Ist die Aussage richtig oder falsch?",
    questions: [
      {
        id: 1,
        shortAudio:
          "Deutschland gehört nach wie vor zu den OECD-Ländern, in denen der Bildungserfolg am stärksten von der sozialen Herkunft abhängt. Der sogenannte 'PISA-Schock' von zweitausend eins hat diesen Befund erstmals einer breiten Öffentlichkeit bewusst gemacht.",
        question:
          "In Deutschland ist der Zusammenhang zwischen sozialer Herkunft und Bildungserfolg im OECD-Vergleich besonders stark ausgeprägt.",
        correct: 0,
        explanation:
          "Richtig. Deutschland weist trotz Reformen nach wie vor eine hohe soziale Selektivität im Bildungssystem auf.",
      },
      {
        id: 2,
        shortAudio:
          "Das dreigliedrige Schulsystem in Deutschland — Hauptschule, Realschule, Gymnasium — wird von Bildungsforschern als mitverantwortlich für soziale Reproduktion kritisiert. Die frühe Selektion nach der Grundschule fixiere soziale Ungleichheiten, statt sie zu überwinden.",
        question:
          "Bildungsforscher loben das dreigliedrige Schulsystem für seine Förderung sozialer Durchlässigkeit.",
        correct: 1,
        explanation:
          "Falsch. Das System wird gerade wegen der frühen Selektion kritisiert, da es soziale Ungleichheiten reproduziert statt abbaut.",
      },
      {
        id: 3,
        shortAudio:
          "Ganztagsschulen gelten als vielversprechendes Instrument zur Kompensation sozialer Benachteiligung. Sie ermöglichen individuelle Förderung, die in der Herkunftsfamilie nicht geleistet werden kann. Dennoch sind sie in Deutschland noch nicht flächendeckend etabliert.",
        question:
          "Ganztagsschulen sind in Deutschland bereits flächendeckend eingeführt worden.",
        correct: 1,
        explanation:
          "Falsch. Ganztagsschulen sind zwar im Aufbau, aber noch nicht deutschlandweit vollständig etabliert.",
      },
      {
        id: 4,
        shortAudio:
          "Bildungsarmut ist eng mit relativer Einkommensarmut verknüpft. Kinder aus einkommensschwachen Familien haben seltener Zugang zu außerschulischer Förderung wie Nachhilfe, Musikunterricht oder Sportverein — Angeboten, die kulturelles Kapital im Sinne Bourdieus akkumulieren.",
        question:
          "Der Begriff 'kulturelles Kapital' im Bildungskontext geht auf den Soziologen Pierre Bourdieu zurück.",
        correct: 0,
        explanation:
          "Richtig. Bourdieus Konzept des kulturellen Kapitals ist zentral für das Verständnis sozialer Reproduktion im Bildungssystem.",
      },
      {
        id: 5,
        shortAudio:
          "Studien zeigen, dass Kinder mit Migrationshintergrund in Deutschland trotz gleicher kognitiver Fähigkeiten seltener Gymnasialempfehlungen erhalten als Kinder ohne Migrationshintergrund. Forscher sprechen von institutioneller Benachteiligung im Selektionsprozess.",
        question:
          "Kinder mit Migrationshintergrund erhalten in Deutschland unabhängig von kognitiven Fähigkeiten gleich häufig Gymnasialempfehlungen.",
        correct: 1,
        explanation:
          "Falsch. Studien belegen eine systematische Benachteiligung von Kindern mit Migrationshintergrund bei der Schulempfehlung.",
      },
    ],
    xp: 70,
  },

  // ── Teile 4–6: Gespräche & Diskussionen (MCQ) ────────────────────────────

  {
    id: 4,
    type: "gespraeche",
    typeLabel: "Akademisches Gespräch",
    typeLabelTr: "Akademik Tartışma",
    title: "KI-Ethik und gesellschaftliche Verantwortung",
    difficulty: 3,
    maleSpeakers: ["Prof. Richter"],
    audioText:
      "Moderatorin: Willkommen zu unserem Gespräch über Künstliche Intelligenz und Ethik. Ich begrüße Prof. Richter von der Universität München und Dr. Yıldız vom Ethikinstitut Berlin. Professor, beginnen Sie: Ist KI eine Bedrohung oder eine Chance? Prof. Richter: Beides, und das ist keine Ausweichung. KI ist ein Werkzeug — wie jede transformative Technologie zuvor. Die entscheidende Frage ist nicht, was KI tun kann, sondern wer über ihren Einsatz entscheidet und nach welchen Kriterien. Dr. Yıldız: Ich stimme zu, möchte aber auf einen blinden Fleck hinweisen: Algorithmen sind nie neutral. Sie reproduzieren die Vorurteile der Daten, mit denen sie trainiert wurden. Bei Kreditvergabe, Stellenbesetzung oder Strafverfolgung führt das zu messbaren Diskriminierungen. Prof. Richter: Das stimmt, aber ist das ein Argument gegen KI oder für bessere Datenqualität und Regulierung? Ich plädiere für klare Haftungsregeln und verpflichtende Transparenz bei automatisierten Entscheidungsprozessen. Dr. Yıldız: Der EU AI Act geht in diese Richtung — er klassifiziert KI-Systeme nach Risiko und verlangt für Hochrisikoanwendungen menschliche Aufsicht. Das ist ein Fortschritt. Aber Regulierung hinkt der technologischen Entwicklung immer hinterher. Prof. Richter: Deshalb brauchen wir interdisziplinäre Gremien — Ethiker, Juristen, Techniker, Soziologen — die kontinuierlich evaluieren. Und wir brauchen Bildung: KI-Kompetenz als Pflichtbestandteil in Schulen und Universitäten. Dr. Yıldız: Absolut. Das Ziel muss sein, dass Menschen KI verstehen und hinterfragen können — nicht blind vertrauen.",
    instruction:
      "Sie hören ein Expertengespräch über KI-Ethik. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Welche Position vertritt Prof. Richter zur KI?",
        options: [
          "KI ist grundsätzlich gefährlich und sollte stark eingeschränkt werden.",
          "KI ist ein Werkzeug, dessen Nutzung von gesellschaftlichen Entscheidungen abhängt.",
          "KI ist neutral und braucht keine ethische Regulierung.",
        ],
        correct: 1,
        explanation:
          "'KI ist ein Werkzeug — die entscheidende Frage ist, wer über ihren Einsatz entscheidet' — Prof. Richter sieht KI weder als reine Bedrohung noch als unproblematische Chance.",
      },
      {
        id: 2,
        question: "Welchen 'blinden Fleck' nennt Dr. Yıldız?",
        options: [
          "KI-Systeme verbrauchen zu viel Energie.",
          "Algorithmen reproduzieren Vorurteile der Trainingsdaten.",
          "KI kann keine kreativen Aufgaben übernehmen.",
        ],
        correct: 1,
        explanation:
          "'Algorithmen sind nie neutral — sie reproduzieren die Vorurteile der Daten' — das ist der zentrale Kritikpunkt von Dr. Yıldız.",
      },
      {
        id: 3,
        question: "Was verlangt der EU AI Act für Hochrisikoanwendungen?",
        options: [
          "Ein vollständiges Verbot automatisierter Entscheidungen",
          "Menschliche Aufsicht bei Hochrisikoanwendungen",
          "Ausschließlich europäische Trainingsdaten",
        ],
        correct: 1,
        explanation:
          "'für Hochrisikoanwendungen menschliche Aufsicht' — der EU AI Act klassifiziert KI nach Risikoniveau und fordert Kontrolle.",
      },
      {
        id: 4,
        question: "Was schlägt Prof. Richter als Lösung vor?",
        options: [
          "Ein Moratorium für KI-Entwicklung bis zur vollständigen Regulierung",
          "Interdisziplinäre Gremien und KI-Kompetenz in der Bildung",
          "Übertragung der KI-Regulierung an private Unternehmen",
        ],
        correct: 1,
        explanation:
          "'interdisziplinäre Gremien und KI-Kompetenz als Pflichtbestandteil in Schulen' — Prof. Richter setzt auf Bildung und kollektive Governance.",
      },
      {
        id: 5,
        question: "Worin sind sich beide Gesprächspartner am Ende einig?",
        options: [
          "KI sollte vollständig staatlich kontrolliert werden.",
          "Menschen müssen KI verstehen und kritisch hinterfragen können.",
          "Die technologische Entwicklung sollte verlangsamt werden.",
        ],
        correct: 1,
        explanation:
          "'Menschen müssen KI verstehen und hinterfragen können' — beide sind sich einig, dass KI-Kompetenz in der Gesellschaft unverzichtbar ist.",
      },
    ],
    xp: 70,
  },

  {
    id: 5,
    type: "gespraeche",
    typeLabel: "Akademisches Gespräch",
    typeLabelTr: "Akademik Tartışma",
    title: "Urbanisierung und nachhaltige Stadtentwicklung",
    difficulty: 3,
    maleSpeakers: ["Dr. Berger"],
    audioText:
      "Moderatorin: Über die Hälfte der Weltbevölkerung lebt bereits in Städten — und der Anteil wächst. Wie müssen Städte der Zukunft aussehen? Dr. Berger, Sie forschen zu nachhaltiger Stadtplanung. Dr. Berger: Städte der Zukunft müssen drei Ziele gleichzeitig erfüllen: ökologische Nachhaltigkeit, soziale Gerechtigkeit und wirtschaftliche Resilienz. Das klingt nach einer Formel, ist aber ein echtes Spannungsfeld. Prof. Santos: Ich würde ergänzen: Partizipation. Die Bewohner müssen in Planungsprozesse einbezogen werden. Sonst entstehen Quartiere, die auf dem Papier nachhaltig wirken, aber von den Menschen nicht gelebt werden. Dr. Berger: Das Konzept der '15-Minuten-Stadt' — alles Notwendige fußläufig erreichbar — ist dafür ein gutes Beispiel. In Paris wird es ernsthaft verfolgt. Die Idee ist, Monofunktionalität zu überwinden: Wohn-, Arbeits- und Freizeitfunktionen sollen wieder durchmischt werden. Prof. Santos: Aber das birgt auch Risiken. Wenn begehrte Stadtteile aufgewertet werden, steigen die Mietpreise, und einkommensschwache Bewohner werden verdrängt — Gentrification. Nachhaltigkeit darf nicht für wenige, sondern muss für alle sein. Dr. Berger: Deshalb brauchen wir soziale Wohnungspolitik als integralen Bestandteil der Stadtplanung. Wien zeigt seit Jahrzehnten, dass es möglich ist, hochwertigen Wohnraum für breite Bevölkerungsschichten bereitzustellen. Prof. Santos: Das Wiener Modell ist bewundernswert, aber schwer auf wachstumsstarke Metropolen in Schwellenländern zu übertragen. Dort fehlen schlicht die institutionellen Kapazitäten und finanziellen Ressourcen.",
    instruction:
      "Sie hören ein Gespräch zwischen zwei Stadtplanungsexperten. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Welche drei Ziele nennt Dr. Berger für Städte der Zukunft?",
        options: [
          "Technologie, Wachstum und Effizienz",
          "Ökologische Nachhaltigkeit, soziale Gerechtigkeit und wirtschaftliche Resilienz",
          "Dichte, Mobilität und Digitalisierung",
        ],
        correct: 1,
        explanation:
          "'ökologische Nachhaltigkeit, soziale Gerechtigkeit und wirtschaftliche Resilienz' — das sind die drei Kernziele laut Dr. Berger.",
      },
      {
        id: 2,
        question: "Was versteht man unter dem Konzept der '15-Minuten-Stadt'?",
        options: [
          "Städte, die mit öffentlichem Nahverkehr in 15 Minuten zu durchqueren sind",
          "Stadtkonzept, bei dem alles Notwendige fußläufig erreichbar ist",
          "Schnellbauprogramm für städtische Infrastruktur",
        ],
        correct: 1,
        explanation:
          "'alles Notwendige fußläufig erreichbar' — das 15-Minuten-Stadt-Konzept zielt auf gemischte Nutzung und kurze Wege.",
      },
      {
        id: 3,
        question: "Welches Risiko der Stadtaufwertung nennt Prof. Santos?",
        options: [
          "Rückgang des kulturellen Angebots in Innenstädten",
          "Verdrängung einkommensschwacher Bewohner durch steigende Mieten",
          "Überlastung des öffentlichen Nahverkehrs",
        ],
        correct: 1,
        explanation:
          "'Gentrification — einkommensschwache Bewohner werden verdrängt' — Aufwertung ohne Schutzmaßnahmen führt zu sozialer Verdrängung.",
      },
      {
        id: 4,
        question: "Welche Stadt nennt Dr. Berger als Vorbild für soziale Wohnungspolitik?",
        options: ["Berlin", "Amsterdam", "Wien"],
        correct: 2,
        explanation:
          "'Wien zeigt seit Jahrzehnten, dass es möglich ist' — Wien gilt als internationales Modell für sozialen Wohnungsbau.",
      },
      {
        id: 5,
        question: "Warum ist das Wiener Modell laut Prof. Santos schwer übertragbar?",
        options: [
          "Es basiert auf veralteten Baustandards.",
          "Metropolen in Schwellenländern fehlen institutionelle Kapazitäten und Ressourcen.",
          "Die Bevölkerungsdichte in Wien ist zu niedrig als Vergleichsgröße.",
        ],
        correct: 1,
        explanation:
          "'fehlen institutionelle Kapazitäten und finanzielle Ressourcen' — das Wiener Modell setzt voraus, was viele Schwellenlandmetropolen nicht haben.",
      },
    ],
    xp: 70,
  },

  {
    id: 6,
    type: "gespraeche",
    typeLabel: "Akademisches Gespräch",
    typeLabelTr: "Akademik Tartışma",
    title: "Kulturelles Erbe und digitale Transformation",
    difficulty: 3,
    maleSpeakers: ["Dr. Haas"],
    audioText:
      "Moderatorin: Digitalisierung verändert alles — auch den Umgang mit kulturellem Erbe. Wie positionieren sich Museen und Archive in dieser Entwicklung? Dr. Haas, Sie leiten ein Projekt zur digitalen Transformation im Kulturbereich. Dr. Haas: Die Digitalisierung bietet enorme Chancen: Millionen von Kunstwerken und Dokumenten weltweit zugänglich zu machen, Barrieren abzubauen, neue Zielgruppen zu erschließen. Aber sie verändert auch die Art, wie wir mit Kultur in Berührung kommen — und das nicht immer zum Besseren. Prof. Müller-Kirsch: Ich sehe das ambivalent. Einerseits demokratisiert Digitalisierung den Zugang zu Wissen. Andererseits besteht die Gefahr, dass das digitale Surrogat das Original ersetzt. Ein Gemälde am Bildschirm zu sehen ist nicht dasselbe wie davor zu stehen. Dr. Haas: Einverstanden. Deshalb sehe ich Digitalisierung als Ergänzung, nicht als Ersatz. Hochauflösende Scans ermöglichen zum Beispiel die wissenschaftliche Untersuchung von Werken, ohne das Original zu gefährden. Prof. Müller-Kirsch: Ein anderes Problem ist die Nachhaltigkeit digitaler Daten. Analoge Archive haben Jahrhunderte überdauert. Digitale Formate veralten innerhalb von Jahrzehnten, und Migration auf neue Systeme ist kostspielig und fehleranfällig. Dr. Haas: Das ist ein reales Problem — wir nennen es 'digitale Obsoleszenz'. Lösungsansätze sind offene Formate und redundante Speicherung. Aber es stimmt: Ohne kontinuierliche Investitionen riskieren wir den Verlust digitaler Bestände. Prof. Müller-Kirsch: Und dann ist da noch die Frage des geistigen Eigentums. Wer darf digitalisierte Werke nutzen? Viele Kulturinstitutionen sperren digitalisiertes Gemeingut hinter Paywalls — das widerspricht dem Gedanken der Zugänglichkeit.",
    instruction:
      "Sie hören ein Gespräch über Digitalisierung im Kulturbereich. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Welche Chance der Digitalisierung betont Dr. Haas?",
        options: [
          "Kostensenkung bei der Restaurierung von Kunstwerken",
          "Weltweite Zugänglichkeit von Kulturerbe und Erschließung neuer Zielgruppen",
          "Vollständige Ablösung analoger Archive",
        ],
        correct: 1,
        explanation:
          "'Millionen von Kunstwerken weltweit zugänglich zu machen, neue Zielgruppen zu erschließen' — das ist die zentrale Chance laut Dr. Haas.",
      },
      {
        id: 2,
        question: "Welche Gefahr sieht Prof. Müller-Kirsch bei der Digitalisierung?",
        options: [
          "Überlastung der Serverinfrastruktur in Museen",
          "Das digitale Surrogat könnte das Original ersetzen",
          "Zu hohe Kosten für Besucher",
        ],
        correct: 1,
        explanation:
          "'das digitale Surrogat ersetzt das Original' — die Erfahrung eines Originals lässt sich durch eine digitale Kopie nicht ersetzen.",
      },
      {
        id: 3,
        question: "Was versteht man unter 'digitaler Obsoleszenz'?",
        options: [
          "Die Veralterung digitaler Formate, die Datenverlust riskiert",
          "Die Überschreitung von Speicherkapazitäten in Archiven",
          "Den Verlust analoger Kompetenz durch Digitalisierung",
        ],
        correct: 0,
        explanation:
          "'Digitale Formate veralten — wir nennen es digitale Obsoleszenz' — veraltete Formate gefährden den Erhalt digitaler Bestände.",
      },
      {
        id: 4,
        question: "Welche Lösungsansätze gegen digitale Obsoleszenz nennt Dr. Haas?",
        options: [
          "Rückkehr zu analogen Speichermethoden",
          "Offene Formate und redundante Speicherung",
          "Zentralisierung aller Daten in einer europäischen Cloud",
        ],
        correct: 1,
        explanation:
          "'offene Formate und redundante Speicherung' — diese Strategien sollen digitale Bestände langfristig sichern.",
      },
      {
        id: 5,
        question: "Welches Problem beim geistigen Eigentum kritisiert Prof. Müller-Kirsch?",
        options: [
          "Kulturinstitutionen verkaufen Originale statt Digitalisate.",
          "Digitalisiertes Gemeingut wird hinter Paywalls gesperrt.",
          "Künstler erhalten keine Vergütung für digitale Nutzung.",
        ],
        correct: 1,
        explanation:
          "'viele Kulturinstitutionen sperren digitalisiertes Gemeingut hinter Paywalls' — das widerspricht dem Demokratisierungsversprechen der Digitalisierung.",
      },
    ],
    xp: 70,
  },

  // ── Teile 7–10: Interview & Vortrag (MCQ) ────────────────────────────────

  {
    id: 7,
    type: "informationen",
    typeLabel: "Wissenschaftlicher Vortrag",
    typeLabelTr: "Bilimsel Konuşma",
    title: "Sprache, Denken und Weltbild",
    difficulty: 3,
    audioText:
      "Die Frage, ob Sprache das Denken formt oder umgekehrt, beschäftigt Linguisten und Philosophen seit Jahrhunderten. Die sogenannte Sapir-Whorf-Hypothese — auch als linguistischer Relativismus bekannt — behauptet, dass die Struktur einer Sprache die Wahrnehmung ihrer Sprecher beeinflusst. In ihrer starken Version besagt sie, dass Menschen ohne ein bestimmtes sprachliches Konzept dieses auch nicht denken können. Diese extreme Position gilt heute als widerlegt. Die schwache Version — dass Sprache das Denken beeinflusst, ohne es vollständig zu determinieren — ist empirisch besser gestützt. Experimente mit Farbwahrnehmung sind ein klassisches Beispiel: Sprecher von Sprachen, die blaue und grüne Farbtöne sprachlich nicht trennen, reagieren bei Unterscheidungsaufgaben langsamer als Sprecher mit zwei getrennten Wörtern. Ein anderes faszinierendes Beispiel ist das räumliche Denken. Sprecher mancher indigener Sprachen orientieren sich nicht nach relativen Richtungsangaben wie 'links' und 'rechts', sondern nach absoluten Himmelsrichtungen. Diese Sprecher haben eine überlegene absolute Raumorientierung — selbst wenn sie sich in unbekannten Umgebungen befinden. Was bedeutet das für uns? Mehrsprachigkeit bietet nicht nur kommunikative Vorteile, sondern möglicherweise auch kognitive Flexibilität: wer mehrere sprachliche Systeme beherrscht, kann die Welt aus mehreren Perspektiven wahrnehmen.",
    instruction:
      "Sie hören einen Vortrag über Sprache und Denken. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Was behauptet die starke Version der Sapir-Whorf-Hypothese?",
        options: [
          "Denken ist vollständig unabhängig von Sprache.",
          "Menschen können ohne sprachliches Konzept dieses Konzept nicht denken.",
          "Alle Sprachen haben dieselbe kognitive Wirkung.",
        ],
        correct: 1,
        explanation:
          "'Menschen ohne ein bestimmtes sprachliches Konzept können dieses nicht denken' — die starke Version gilt als widerlegt.",
      },
      {
        id: 2,
        question: "Welche Version des linguistischen Relativismus ist empirisch besser gestützt?",
        options: [
          "Die starke Version: Sprache determiniert das Denken vollständig.",
          "Die schwache Version: Sprache beeinflusst das Denken, ohne es zu determinieren.",
          "Die neutrale Version: Sprache und Denken sind völlig unabhängig.",
        ],
        correct: 1,
        explanation:
          "'Die schwache Version ist empirisch besser gestützt' — Sprache beeinflusst, determiniert aber nicht das Denken.",
      },
      {
        id: 3,
        question: "Was belegen Experimente zur Farbwahrnehmung?",
        options: [
          "Alle Menschen nehmen Farben identisch wahr, unabhängig von ihrer Sprache.",
          "Sprecher ohne sprachliche Trennung von Blau und Grün reagieren bei Unterscheidungsaufgaben langsamer.",
          "Farbbegriffe haben keinen Einfluss auf kognitive Verarbeitungsgeschwindigkeit.",
        ],
        correct: 1,
        explanation:
          "'Sprecher reagieren bei Unterscheidungsaufgaben langsamer' — sprachliche Kategorien beeinflussen nachweislich die Wahrnehmungsverarbeitung.",
      },
      {
        id: 4,
        question: "Was ist das Besondere an Sprechern, die absolute statt relative Richtungsangaben nutzen?",
        options: [
          "Sie können schneller lesen und schreiben.",
          "Sie haben eine überlegene absolute räumliche Orientierung.",
          "Sie lernen Fremdsprachen leichter.",
        ],
        correct: 1,
        explanation:
          "'überlegene absolute Raumorientierung' — Sprecher mit Himmelsrichtungssystem entwickeln herausragende räumliche Fähigkeiten.",
      },
      {
        id: 5,
        question: "Welchen kognitiven Vorteil bietet Mehrsprachigkeit laut dem Vortrag?",
        options: [
          "Schnellere mathematische Verarbeitung",
          "Kognitive Flexibilität durch mehrere Wahrnehmungsperspektiven",
          "Besseres Langzeitgedächtnis für visuelle Informationen",
        ],
        correct: 1,
        explanation:
          "'kognitive Flexibilität: wer mehrere Sprachen beherrscht, kann die Welt aus mehreren Perspektiven wahrnehmen' — Mehrsprachigkeit erweitert den kognitiven Horizont.",
      },
    ],
    xp: 75,
  },

  {
    id: 8,
    type: "informationen",
    typeLabel: "Wissenschaftlicher Vortrag",
    typeLabelTr: "Bilimsel Konuşma",
    title: "Bioethik und medizinische Entscheidungen",
    difficulty: 3,
    audioText:
      "Die Bioethik befasst sich mit moralischen Fragen, die durch Fortschritte in der Medizin und den Biowissenschaften entstehen. Zu den zentralen Prinzipien der medizinischen Ethik gehören Patientenautonomie, Wohltun, Schadensvermeidung und Gerechtigkeit — Grundsätze, die vom Medizinethiker Beauchamp und dem Philosophen Childress formuliert wurden. Besonders die Patientenautonomie hat in den letzten Jahrzehnten an Bedeutung gewonnen: Das Recht des Patienten, über seine eigene Behandlung informiert zu entscheiden, gilt heute als unveräußerlich. Dieses Prinzip wurde durch historische Fehlentwicklungen wie die Nürnberger Kodizes und die Deklaration von Helsinki gestärkt — Reaktionen auf schwerwiegende ethische Verstöße in der Forschungsgeschichte. Ein besonders umstrittenes Feld ist die prädiktive Genetik: Soll man wissen dürfen, ob man genetisch prädisponiert für schwere Erkrankungen ist? Und wenn ja: Wer darf diese Information einsehen? Versicherungen? Arbeitgeber? Hier kollidieren das Recht auf Wissen mit dem Recht auf Nichtwissen und dem Datenschutz. Ebenso komplex ist die Frage der aktiven Sterbehilfe. In einigen europäischen Ländern ist assistierter Suizid unter strengen Auflagen legal. In Deutschland hat das Bundesverfassungsgericht zweitausend zwanzig das allgemeine Persönlichkeitsrecht auf einen selbstbestimmten Tod anerkannt — und damit die Debatte neu entfacht.",
    instruction:
      "Sie hören einen Vortrag über Bioethik. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Wer hat die vier zentralen Prinzipien der medizinischen Ethik formuliert?",
        options: [
          "Die Weltgesundheitsorganisation (WHO)",
          "Beauchamp und Childress",
          "Das Bundesverfassungsgericht",
        ],
        correct: 1,
        explanation:
          "'vom Medizinethiker Beauchamp und dem Philosophen Childress formuliert' — die vier Prinzipien sind ein Grundpfeiler moderner Medizinethik.",
      },
      {
        id: 2,
        question: "Durch welche historischen Ereignisse wurde das Prinzip der Patientenautonomie gestärkt?",
        options: [
          "Die Einführung der gesetzlichen Krankenversicherung",
          "Die Nürnberger Kodizes und die Deklaration von Helsinki",
          "Die Entwicklung der Intensivmedizin",
        ],
        correct: 1,
        explanation:
          "'Nürnberger Kodizes und Deklaration von Helsinki — Reaktionen auf ethische Verstöße' — historische Fehler haben das Recht auf informierte Einwilligung gestärkt.",
      },
      {
        id: 3,
        question: "Welches Spannungsfeld entsteht bei der prädiktiven Genetik?",
        options: [
          "Zwischen Forschungsinteresse und Therapiemöglichkeiten",
          "Zwischen Recht auf Wissen, Recht auf Nichtwissen und Datenschutz",
          "Zwischen nationaler Gesundheitspolitik und europäischem Recht",
        ],
        correct: 1,
        explanation:
          "'Recht auf Wissen kollidiert mit dem Recht auf Nichtwissen und Datenschutz' — prädiktive Genetik wirft komplexe Interessenkonflikte auf.",
      },
      {
        id: 4,
        question: "Was hat das Bundesverfassungsgericht 2020 anerkannt?",
        options: [
          "Das Recht auf kostenlose medizinische Versorgung",
          "Das allgemeine Persönlichkeitsrecht auf einen selbstbestimmten Tod",
          "Die Pflicht zur genetischen Beratung vor Behandlungsbeginn",
        ],
        correct: 1,
        explanation:
          "'allgemeines Persönlichkeitsrecht auf einen selbstbestimmten Tod' — das Bundesverfassungsgericht hat 2020 assistierten Suizid unter diesem Recht anerkannt.",
      },
      {
        id: 5,
        question: "Wer könnte laut dem Vortrag Interesse an prädiktiven Genominformationen haben?",
        options: [
          "Ausschließlich behandelnde Ärzte",
          "Versicherungen und Arbeitgeber",
          "Nur direkte Familienangehörige",
        ],
        correct: 1,
        explanation:
          "'Wer darf diese Information einsehen? Versicherungen? Arbeitgeber?' — der Vortrag thematisiert den gesellschaftlichen Missbrauch genetischer Daten.",
      },
    ],
    xp: 75,
  },

  {
    id: 9,
    type: "informationen",
    typeLabel: "Wissenschaftlicher Vortrag",
    typeLabelTr: "Bilimsel Konuşma",
    title: "Wirtschaftliche Ungleichheit und soziale Mobilität",
    difficulty: 3,
    audioText:
      "Die Vermögensungleichheit in Deutschland ist im internationalen Vergleich besonders ausgeprägt. Das reichste Prozent der Bevölkerung besitzt etwa dreißig Prozent des gesamten Nettovermögens — eine Konzentration, die höher ist als in vielen anderen westeuropäischen Ländern. Gleichzeitig ist die Armutsrisikoquote — also der Anteil der Bevölkerung mit weniger als sechzig Prozent des Medianeinkommens — in den vergangenen Jahrzehnten gestiegen. Die Ökonomen sprechen von einer 'doppelten Schere': oben akkumuliert sich immer mehr Vermögen, unten wächst die relative Armut. Besonders problematisch ist dabei die geringe soziale Mobilität: In Deutschland hängt der wirtschaftliche Erfolg eines Menschen überdurchschnittlich stark von der sozialen Stellung der Eltern ab. Studien zeigen, dass es durchschnittlich sechs Generationen dauert, bis eine Familie aus dem untersten Einkommensquintil den gesellschaftlichen Durchschnitt erreicht — in den skandinavischen Ländern sind es zwei bis drei Generationen. Einige Ökonomen argumentieren, dass Ungleichheit bis zu einem gewissen Grad Innovationsanreize schafft. Kritiker entgegnen, dass extreme Ungleichheit das Vertrauen in Institutionen untergräbt, sozialen Zusammenhalt gefährdet und die politische Teilhabe benachteiligter Gruppen einschränkt. Das Konzept der 'Chancengerechtigkeit' — jeder soll die gleiche Startchance haben, unabhängig von der Herkunft — ist weitgehend Konsens. Strittig bleibt, welche politischen Instrumente geeignet sind: Erbschaftssteuerreform, Vermögenssteuer, Mindestlohnerhöhung oder verstärkte Investitionen in Bildung.",
    instruction:
      "Sie hören einen Vortrag über wirtschaftliche Ungleichheit. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Wie viel Prozent des deutschen Nettovermögens besitzt das reichste Prozent der Bevölkerung?",
        options: ["Etwa zehn Prozent", "Etwa dreißig Prozent", "Etwa fünfzig Prozent"],
        correct: 1,
        explanation:
          "'das reichste Prozent besitzt etwa dreißig Prozent des Nettovermögens' — Deutschland hat eine im Westeuropavergleich hohe Vermögenskonzentration.",
      },
      {
        id: 2,
        question: "Was versteht man unter der 'doppelten Schere'?",
        options: [
          "Wachsende Lohnunterschiede zwischen Ost- und Westdeutschland",
          "Oben akkumuliert sich Vermögen, unten wächst relative Armut",
          "Die Kluft zwischen privatem und öffentlichem Sektor",
        ],
        correct: 1,
        explanation:
          "'oben akkumuliert sich Vermögen, unten wächst relative Armut' — die doppelte Schere beschreibt Polarisierung an beiden Enden der Vermögensverteilung.",
      },
      {
        id: 3,
        question: "Wie viele Generationen dauert es in Deutschland durchschnittlich, um aus dem untersten Einkommensquintil den Durchschnitt zu erreichen?",
        options: ["Zwei bis drei Generationen", "Vier bis fünf Generationen", "Sechs Generationen"],
        correct: 2,
        explanation:
          "'in Deutschland durchschnittlich sechs Generationen' — das ist deutlich mehr als in skandinavischen Ländern.",
      },
      {
        id: 4,
        question: "Welches Argument bringen Kritiker gegen extreme Ungleichheit vor?",
        options: [
          "Ungleichheit schaffe keine Innovationsanreize.",
          "Extreme Ungleichheit untergräbt Institutionenvertrauen und gefährdet sozialen Zusammenhalt.",
          "Ungleichheit führt automatisch zu wirtschaftlichem Wachstum.",
        ],
        correct: 1,
        explanation:
          "'extreme Ungleichheit untergräbt das Vertrauen in Institutionen und gefährdet sozialen Zusammenhalt' — das sind die zentralen Gegenargumente.",
      },
      {
        id: 5,
        question: "Welches Konzept gilt im Vortrag als weitgehend gesellschaftlicher Konsens?",
        options: [
          "Ergebnisgleichheit — alle sollen am Ende gleich viel verdienen",
          "Chancengerechtigkeit — gleiche Startchancen unabhängig von der Herkunft",
          "Leistungslose Einkommen sind gesellschaftlich zu verbieten",
        ],
        correct: 1,
        explanation:
          "'Chancengerechtigkeit ist weitgehend Konsens' — strittig bleibt, mit welchen Instrumenten sie erreicht werden soll.",
      },
    ],
    xp: 75,
  },

  {
    id: 10,
    type: "informationen",
    typeLabel: "Wissenschaftlicher Vortrag",
    typeLabelTr: "Bilimsel Konuşma",
    title: "Erkenntnistheorie und kritisches Denken",
    difficulty: 3,
    audioText:
      "Erkenntnistheorie — auch Epistemologie genannt — ist jener Zweig der Philosophie, der sich mit der Natur, dem Ursprung und den Grenzen menschlichen Wissens befasst. Eine zentrale Frage lautet: Was können wir mit Sicherheit wissen, und wie? Der Philosoph René Descartes begann sein Projekt mit dem methodischen Zweifel: Er zweifelte an allem, woran man zweifeln kann, und gelangte zum berühmten Schluss 'Cogito ergo sum' — 'Ich denke, also bin ich.' Damit identifizierte er das denkende Selbst als einzigen unverrückbaren Ausgangspunkt. Die Aufklärung machte den menschlichen Verstand zum Maßstab aller Dinge — in deutlicher Abgrenzung zu Autoritäten wie Kirche oder Tradition. Immanuel Kant wiederum zeigte, dass das Erkennen selbst aktiv ist: Das menschliche Gehirn ordnet Sinneseindrücke durch angeborene Kategorien wie Raum, Zeit und Kausalität. Wir erkennen also nicht die Dinge an sich, sondern die Dinge, wie sie uns erscheinen. Im zwanzigsten Jahrhundert haben Karl Popper und Thomas Kuhn das Wissenschaftsverständnis revolutioniert. Popper betonte das Prinzip der Falsifizierbarkeit: Eine Theorie ist nur dann wissenschaftlich, wenn sie grundsätzlich widerlegbar ist. Kuhn hingegen zeigte, dass Wissenschaft nicht linear fortschreitet, sondern in Paradigmenwechseln: Revolutionäre neue Sichtweisen ersetzen das bisherige Weltbild. Für das alltägliche Leben bedeutet kritisches Denken: Quellen hinterfragen, kognitive Verzerrungen kennen und den eigenen Erkenntnisprozess reflektieren.",
    instruction:
      "Sie hören einen philosophischen Vortrag über Erkenntnistheorie. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Was meint Descartes mit dem methodischen Zweifel?",
        options: [
          "Er zweifelte ausschließlich an religiösen Dogmen.",
          "Er zweifelte an allem, woran man zweifeln kann, um einen sicheren Ausgangspunkt zu finden.",
          "Er lehnte alle empirische Beobachtung ab.",
        ],
        correct: 1,
        explanation:
          "'Er zweifelte an allem, woran man zweifeln kann' — das methodische Zweifeln führte Descartes zum unverzichtbaren Schluss 'Cogito ergo sum'.",
      },
      {
        id: 2,
        question: "Was zeigte Immanuel Kant über den menschlichen Erkenntnisprozess?",
        options: [
          "Das menschliche Gehirn nimmt die Welt passiv und unvermittelt wahr.",
          "Das Erkennen ist aktiv: Das Gehirn ordnet Eindrücke durch angeborene Kategorien.",
          "Wahre Erkenntnis ist nur durch Sprache möglich.",
        ],
        correct: 1,
        explanation:
          "'Das Erkennen ist aktiv — angeborene Kategorien wie Raum, Zeit und Kausalität ordnen Eindrücke' — Kant zeigte, dass wir die Dinge nie 'an sich' erkennen.",
      },
      {
        id: 3,
        question: "Was ist das Prinzip der Falsifizierbarkeit nach Karl Popper?",
        options: [
          "Eine Theorie gilt als wissenschaftlich, wenn sie durch Experimente bestätigt wurde.",
          "Eine Theorie ist wissenschaftlich, wenn sie grundsätzlich widerlegbar ist.",
          "Wissenschaft beruht auf der Autorität anerkannter Experten.",
        ],
        correct: 1,
        explanation:
          "'Eine Theorie ist nur dann wissenschaftlich, wenn sie grundsätzlich widerlegbar ist' — Falsifizierbarkeit ist Poppers Abgrenzungskriterium für Wissenschaft.",
      },
      {
        id: 4,
        question: "Was versteht Thomas Kuhn unter einem 'Paradigmenwechsel'?",
        options: [
          "Eine schrittweise Verbesserung bestehender wissenschaftlicher Theorien",
          "Eine revolutionäre neue Sichtweise, die das bisherige Weltbild ersetzt",
          "Die Rückkehr zu früheren wissenschaftlichen Erkenntnissen",
        ],
        correct: 1,
        explanation:
          "'Revolutionäre neue Sichtweisen ersetzen das bisherige Weltbild' — Kuhn zeigte, dass Wissenschaft nicht linear, sondern durch Paradigmenwechsel voranschreitet.",
      },
      {
        id: 5,
        question: "Was bedeutet kritisches Denken im alltäglichen Leben laut dem Vortrag?",
        options: [
          "Alle etablierten Meinungen grundsätzlich ablehnen",
          "Quellen hinterfragen, kognitive Verzerrungen kennen und den eigenen Erkenntnisprozess reflektieren",
          "Ausschließlich auf empirische Daten vertrauen",
        ],
        correct: 1,
        explanation:
          "'Quellen hinterfragen, kognitive Verzerrungen kennen, den eigenen Erkenntnisprozess reflektieren' — das sind die drei Säulen kritischen Denkens.",
      },
    ],
    xp: 75,
  },

  // ── Teile 11–15: Akademische Kurztexte (richtig/falsch) ──────────────────

  {
    id: 11,
    type: "ansagen",
    typeLabel: "Akademische Kurztexte",
    typeLabelTr: "Akademik Kısa Metinler",
    title: "Klimapolitik und internationale Abkommen",
    difficulty: 3,
    questionFormat: "richtigfalsch",
    instruction:
      "Sie hören fünf kurze Texte zur internationalen Klimapolitik. Entscheiden Sie: Ist die Aussage richtig oder falsch?",
    questions: [
      {
        id: 1,
        shortAudio:
          "Das Pariser Abkommen von zweitausend fünfzehn verpflichtet die Unterzeichnerstaaten, die globale Erwärmung auf möglichst 1,5 Grad Celsius gegenüber dem vorindustriellen Niveau zu begrenzen. Es ist jedoch kein verbindlicher Sanktionsmechanismus vorgesehen — die Umsetzung obliegt der nationalen Eigenverantwortung.",
        question:
          "Das Pariser Abkommen enthält verbindliche Sanktionen für Staaten, die ihre Klimaziele verfehlen.",
        correct: 1,
        explanation:
          "Falsch. Das Pariser Abkommen beruht auf nationaler Eigenverantwortung ohne verbindliche Sanktionsmechanismen.",
      },
      {
        id: 2,
        shortAudio:
          "Der Emissionshandel ist ein marktwirtschaftliches Instrument zur CO₂-Reduktion. Unternehmen erhalten oder kaufen Zertifikate für Treibhausgasemissionen und können diese handeln. Durch eine schrittweise Verknappung der Zertifikate soll die Emissionsreduzierung wirtschaftlich attraktiv werden.",
        question:
          "Der Emissionshandel soll durch Marktmechanismen Anreize zur CO₂-Reduzierung schaffen.",
        correct: 0,
        explanation:
          "Richtig. Die Verknappung von Zertifikaten soll wirtschaftliche Anreize zur Emissionsreduzierung setzen.",
      },
      {
        id: 3,
        shortAudio:
          "Industrieländer haben im Rahmen der Klimaverhandlungen zugesagt, Entwicklungsländern jährlich hundert Milliarden Dollar für Klimaschutz und Klimaanpassung bereitzustellen. Dieses Ziel wurde jedoch trotz Fristsetzung mehrfach verfehlt.",
        question:
          "Das Ziel von 100 Milliarden Dollar jährlicher Klimafinanzierung für Entwicklungsländer wurde bislang stets vollständig erfüllt.",
        correct: 1,
        explanation:
          "Falsch. Das Ziel wurde trotz Fristsetzung mehrfach verfehlt.",
      },
      {
        id: 4,
        shortAudio:
          "Der sogenannte 'Carbon Border Adjustment Mechanism' der EU — auch CO₂-Grenzausgleichsmechanismus genannt — soll verhindern, dass Unternehmen die Produktion in Länder mit niedrigeren Klimastandards verlagern. Importeure aus Drittstaaten müssen für ihre Emissionen bezahlen, wenn ihre Heimatländer keinen vergleichbaren CO₂-Preis erheben.",
        question:
          "Der EU-CO₂-Grenzausgleich soll Produktionsverlagerungen in klimapolitisch schwächere Länder verhindern.",
        correct: 0,
        explanation:
          "Richtig. Der Mechanismus soll 'Carbon Leakage' — also das Abwandern emissionsintensiver Produktion — verhindern.",
      },
      {
        id: 5,
        shortAudio:
          "Klimaschutz und wirtschaftliche Entwicklung werden häufig als Gegensätze dargestellt. Neuere Studien zeigen jedoch, dass ambitionierter Klimaschutz langfristig wirtschaftlich vorteilhaft sein kann — durch Innovationen, neue Märkte für grüne Technologien und die Vermeidung von Klimaschäden.",
        question:
          "Klimaschutz und wirtschaftliche Entwicklung schließen sich laut neuerer Forschung grundsätzlich aus.",
        correct: 1,
        explanation:
          "Falsch. Neuere Studien zeigen, dass ambitionierter Klimaschutz langfristig wirtschaftlich vorteilhaft sein kann.",
      },
    ],
    xp: 70,
  },

  {
    id: 12,
    type: "ansagen",
    typeLabel: "Akademische Kurztexte",
    typeLabelTr: "Akademik Kısa Metinler",
    title: "Künstliche Intelligenz in der Medizin",
    difficulty: 3,
    questionFormat: "richtigfalsch",
    instruction:
      "Sie hören fünf kurze Texte über KI in der Medizin. Entscheiden Sie: Ist die Aussage richtig oder falsch?",
    questions: [
      {
        id: 1,
        shortAudio:
          "KI-Systeme erreichen bei der Erkennung bestimmter Krebsarten aus bildgebenden Verfahren mittlerweile eine Genauigkeit, die mit erfahrenen Radiologen vergleichbar oder in einigen Fällen sogar überlegen ist. Besonders bei der Früherkennung von Brustkrebs und Melanomen wurden bemerkenswerte Ergebnisse erzielt.",
        question:
          "KI-Systeme sind bei der Erkennung von Krebsarten aus Bildgebung in keinem Fall so präzise wie erfahrene Radiologen.",
        correct: 1,
        explanation:
          "Falsch. In einigen Bereichen — wie Brustkrebs- und Melanomerkennung — übertreffen KI-Systeme bereits erfahrene Radiologen.",
      },
      {
        id: 2,
        shortAudio:
          "Der Einsatz von KI in der Diagnostik wirft grundlegende Haftungsfragen auf. Wenn ein KI-System eine falsche Diagnose stellt, ist unklar, wer verantwortlich ist — der Arzt, der Hersteller oder das Krankenhaus. Rechtliche Rahmenbedingungen für KI-gestützte Medizinprodukte sind noch in der Entwicklung.",
        question:
          "Die Haftungsfragen beim Einsatz von KI in der Medizin sind in Deutschland bereits vollständig rechtlich geregelt.",
        correct: 1,
        explanation:
          "Falsch. Rechtliche Rahmenbedingungen für KI-Medizinprodukte befinden sich noch in der Entwicklung.",
      },
      {
        id: 3,
        shortAudio:
          "Prädiktive KI-Algorithmen können auf Basis von Patientendaten Krankheitsrisiken vorhersagen, bevor Symptome auftreten. Dies eröffnet Möglichkeiten für präventive Medizin, birgt aber auch Risiken: Falsch-positive Prognosen können zu unnötigen Behandlungen und psychischer Belastung führen.",
        question:
          "Prädiktive KI in der Medizin birgt neben Chancen auch das Risiko unnötiger Behandlungen durch Falsch-positive Prognosen.",
        correct: 0,
        explanation:
          "Richtig. Falsch-positive Prognosen können zu unnötigen Eingriffen und Belastungen für Patienten führen.",
      },
      {
        id: 4,
        shortAudio:
          "Trainingsdaten für medizinische KI-Systeme stammen häufig überwiegend aus bestimmten demografischen Gruppen. Das führt dazu, dass diese Systeme bei unterrepräsentierten Gruppen — etwa Frauen oder Menschen mit dunkler Hautfarbe — schlechtere Ergebnisse liefern können.",
        question:
          "Medizinische KI-Systeme sind grundsätzlich frei von demografischen Verzerrungen.",
        correct: 1,
        explanation:
          "Falsch. Einseitige Trainingsdaten führen zu schlechteren Ergebnissen bei unterrepräsentierten Gruppen.",
      },
      {
        id: 5,
        shortAudio:
          "Die Digitalisierung in der Medizin umfasst auch elektronische Patientenakten, die den Informationsaustausch zwischen Ärzten verbessern sollen. In Deutschland wird die ePA — elektronische Patientenakte — seit zweitausend vierundzwanzig schrittweise eingeführt.",
        question:
          "Die elektronische Patientenakte wird in Deutschland seit 2024 schrittweise eingeführt.",
        correct: 0,
        explanation:
          "Richtig. Die ePA wird in Deutschland seit 2024 stufenweise für alle gesetzlich Versicherten eingeführt.",
      },
    ],
    xp: 70,
  },

  {
    id: 13,
    type: "ansagen",
    typeLabel: "Akademische Kurztexte",
    typeLabelTr: "Akademik Kısa Metinler",
    title: "Globale Migrationsbewegungen",
    difficulty: 3,
    questionFormat: "richtigfalsch",
    instruction:
      "Sie hören fünf kurze Texte zum Thema Migration. Entscheiden Sie: Ist die Aussage richtig oder falsch?",
    questions: [
      {
        id: 1,
        shortAudio:
          "Laut Schätzungen der Vereinten Nationen lebten zu Beginn der zwanziger Jahre des einundzwanzigsten Jahrhunderts rund zweihundert achtzig Millionen Menschen außerhalb ihres Geburtslandes — das entspricht etwa dreieinhalb Prozent der Weltbevölkerung. Die Mehrheit der Migranten zieht jedoch in benachbarte Länder, nicht in westliche Industriestaaten.",
        question:
          "Die Mehrheit globaler Migranten wandert laut UN-Schätzungen in westliche Industriestaaten.",
        correct: 1,
        explanation:
          "Falsch. Die Mehrheit der Migranten zieht in Nachbarländer, nicht primär in westliche Industriestaaten.",
      },
      {
        id: 2,
        shortAudio:
          "Der Klimawandel gilt zunehmend als Migrationstreiber. Steigende Meeresspiegel, Dürren und extreme Wetterereignisse zwingen Menschen, ihre Heimat zu verlassen. Die Weltbank prognostiziert bis zweitausend fünfzig bis zu zweihundert Millionen Klimamigrantinnen und -migranten.",
        question:
          "Der Klimawandel wird laut Weltbank zu einer signifikanten Zunahme von Migrationsbewegungen führen.",
        correct: 0,
        explanation:
          "Richtig. Die Weltbank erwartet bis 2050 bis zu 200 Millionen Klimamigranten weltweit.",
      },
      {
        id: 3,
        shortAudio:
          "Rücküberweisungen — sogenannte Remittances — sind für viele Entwicklungsländer eine bedeutendere Einnahmequelle als ausländische Direktinvestitionen oder Entwicklungshilfe. Im Jahr zweitausend zwanzig überstiegen die globalen Rücküberweisungen fünfhundert Milliarden US-Dollar.",
        question:
          "Rücküberweisungen von Migranten sind für viele Entwicklungsländer bedeutsamer als Entwicklungshilfe.",
        correct: 0,
        explanation:
          "Richtig. Remittances übersteigen in vielen Entwicklungsländern sowohl Direktinvestitionen als auch offizielle Entwicklungshilfe.",
      },
      {
        id: 4,
        shortAudio:
          "Das Konzept des 'Brain Drain' beschreibt die Abwanderung hochqualifizierter Fachkräfte aus Entwicklungs- und Schwellenländern in reichere Staaten. Dies kann in den Herkunftsländern erhebliche Lücken in Bildung, Gesundheit und Forschung hinterlassen.",
        question:
          "Brain Drain bezeichnet die Abwanderung von Rentnern aus reicheren in ärmere Länder.",
        correct: 1,
        explanation:
          "Falsch. Brain Drain bezeichnet die Abwanderung hochqualifizierter Fachkräfte aus ärmeren in reichere Länder.",
      },
      {
        id: 5,
        shortAudio:
          "Integration gelingt laut sozialwissenschaftlicher Forschung am besten, wenn sie als wechselseitiger Prozess verstanden wird — nicht nur als Anpassungsleistung der Zugewanderten, sondern auch als Öffnung der Aufnahmegesellschaft. Interkulturelles Lernen und strukturelle Teilhabe sind dabei entscheidend.",
        question:
          "Erfolgreiche Integration erfordert laut Forschung ausschließlich Anpassungsleistungen der Eingewanderten.",
        correct: 1,
        explanation:
          "Falsch. Integration ist laut Forschung ein wechselseitiger Prozess — auch die Aufnahmegesellschaft muss sich öffnen.",
      },
    ],
    xp: 70,
  },

  {
    id: 14,
    type: "ansagen",
    typeLabel: "Akademische Kurztexte",
    typeLabelTr: "Akademik Kısa Metinler",
    title: "Wertewandel in modernen Gesellschaften",
    difficulty: 3,
    questionFormat: "richtigfalsch",
    instruction:
      "Sie hören fünf kurze Texte zum gesellschaftlichen Wertewandel. Entscheiden Sie: Ist die Aussage richtig oder falsch?",
    questions: [
      {
        id: 1,
        shortAudio:
          "Der Soziologe Ronald Inglehart beschreibt einen weltweiten Wandel von materialistischen zu postmaterialistischen Werten. Während ältere Generationen Sicherheit und Wohlstand in den Vordergrund stellen, priorisieren jüngere Generationen in entwickelten Gesellschaften zunehmend Selbstverwirklichung, Partizipation und Umweltschutz.",
        question:
          "Inglehart zufolge priorisieren jüngere Generationen in Wohlstandsgesellschaften zunehmend materielle Sicherheit gegenüber Selbstverwirklichung.",
        correct: 1,
        explanation:
          "Falsch. Inglehart beschreibt den umgekehrten Trend: Jüngere priorisieren postmaterielle Werte wie Selbstverwirklichung und Umweltschutz.",
      },
      {
        id: 2,
        shortAudio:
          "Die Individualisierung moderner Gesellschaften hat sowohl Vor- als auch Nachteile. Einerseits ermöglicht sie größere persönliche Freiheit und Lebensgestaltung. Andererseits kann sie zu sozialer Isolation, dem Rückgang verbindlicher Gemeinschaften und einem Verlust kollektiver Sinngebung führen.",
        question:
          "Individualisierung wird in der Soziologie ausschließlich als positiver gesellschaftlicher Trend bewertet.",
        correct: 1,
        explanation:
          "Falsch. Individualisierung hat Schattenseiten: soziale Isolation, Rückgang von Gemeinschaftsbindungen und Sinnverlust.",
      },
      {
        id: 3,
        shortAudio:
          "Religiöse Bindungen nehmen in westlichen Industriegesellschaften langfristig ab — ein Prozess, der als Säkularisierung bezeichnet wird. Gleichzeitig wächst weltweit die Zahl religiöser Menschen, da in bevölkerungsreichen Entwicklungsregionen hohe Religiosität mit demografischem Wachstum einhergeht.",
        question:
          "Weltweit nimmt die Zahl religiöser Menschen ab, weil Säkularisierung ein globaler Trend ist.",
        correct: 1,
        explanation:
          "Falsch. Säkularisierung ist ein westliches Phänomen; global wächst die Zahl religiöser Menschen durch demografisches Wachstum in religiösen Regionen.",
      },
      {
        id: 4,
        shortAudio:
          "Studien zeigen, dass Vertrauen in staatliche Institutionen — Parlamente, Gerichte, Medien — in vielen westlichen Demokratien seit den achtziger Jahren tendenziell gesunken ist. Forscher sehen darin eine Gefahr für die demokratische Legitimation.",
        question:
          "Das Vertrauen in staatliche Institutionen ist in westlichen Demokratien seit den 1980er Jahren gestiegen.",
        correct: 1,
        explanation:
          "Falsch. Studien zeigen einen tendenziellen Rückgang des Institutionenvertrauens in westlichen Demokratien.",
      },
      {
        id: 5,
        shortAudio:
          "Der Begriff 'Generation Z' bezeichnet die zwischen Mitte der neunziger Jahre und Anfang der zweitausend zehnerjahre Geborenen. Diese Kohorte ist die erste, die vollständig mit dem Internet aufgewachsen ist. Ihre politischen und sozialen Werte unterscheiden sich in vielen Bereichen deutlich von denen der Vorgängergenerationen.",
        question:
          "Die Generation Z ist die erste Kohorte, die vollständig in einer digitalen Umgebung aufgewachsen ist.",
        correct: 0,
        explanation:
          "Richtig. Generation Z ist die erste Generation, für die das Internet von Kindheit an selbstverständlich war.",
      },
    ],
    xp: 70,
  },

  {
    id: 15,
    type: "ansagen",
    typeLabel: "Akademische Kurztexte",
    typeLabelTr: "Akademik Kısa Metinler",
    title: "Rente und demografischer Wandel",
    difficulty: 3,
    questionFormat: "richtigfalsch",
    instruction:
      "Sie hören fünf kurze Texte zum Thema Rente und Demografie. Entscheiden Sie: Ist die Aussage richtig oder falsch?",
    questions: [
      {
        id: 1,
        shortAudio:
          "Das deutsche Rentensystem basiert auf dem Umlageverfahren: Die heutigen Erwerbstätigen finanzieren durch ihre Beiträge die Renten der heutigen Ruheständler. Dieses System gerät durch die alternde Bevölkerung unter Druck, da immer weniger Beitragszahler für immer mehr Rentner aufkommen müssen.",
        question:
          "Das deutsche Rentensystem funktioniert nach dem Kapitaldeckungsverfahren, bei dem jeder individuell für seine eigene Rente spart.",
        correct: 1,
        explanation:
          "Falsch. Deutschland nutzt das Umlageverfahren — aktive Beitragszahler finanzieren direkt die aktuellen Renten.",
      },
      {
        id: 2,
        shortAudio:
          "Das Renteneintrittsalter in Deutschland wird schrittweise auf siebenundsechzig Jahre angehoben. Kritiker bemängeln, dass körperlich belastende Berufe von dieser Regelung unverhältnismäßig stark betroffen sind, da viele Betroffene nicht bis siebenundsechzig arbeitsfähig bleiben.",
        question:
          "Die Anhebung des Rentenalters auf 67 Jahre wird kritisiert, weil sie Menschen in körperlich belastenden Berufen benachteiligt.",
        correct: 0,
        explanation:
          "Richtig. Körperlich Beschäftigte können oft nicht bis 67 arbeiten und sind daher überproportional betroffen.",
      },
      {
        id: 3,
        shortAudio:
          "Länder wie Schweden und die Niederlande haben ihr Rentensystem bereits stärker kapitalgedeckt und auf Nachhaltigkeit ausgerichtet. In Deutschland wird die Einführung einer staatlichen Aktienrente — ähnlich dem norwegischen Staatsfonds — diskutiert.",
        question:
          "Deutschland hat bereits ein vollständig kapitalgedecktes Rentensystem wie Norwegen eingeführt.",
        correct: 1,
        explanation:
          "Falsch. Deutschland diskutiert noch die Einführung einer kapitalgedeckten Komponente — umgesetzt ist sie noch nicht.",
      },
      {
        id: 4,
        shortAudio:
          "Altersarmut ist in Deutschland ein wachsendes Problem. Besonders betroffen sind Frauen, die aufgrund von Teilzeit, Kindererziehung und Pflegearbeit geringere Rentenansprüche erworben haben. Auch Langzeitarbeitslose und geringfügig Beschäftigte sind überdurchschnittlich von Altersarmut bedroht.",
        question:
          "Altersarmut betrifft in Deutschland überwiegend wohlhabende ältere Menschen.",
        correct: 1,
        explanation:
          "Falsch. Altersarmut betrifft besonders Frauen, Langzeitarbeitslose und geringfügig Beschäftigte.",
      },
      {
        id: 5,
        shortAudio:
          "Zuwanderung wird als ein möglicher Beitrag zur Stabilisierung des Rentensystems diskutiert. Junge Zuwanderer zahlen Beiträge in die Sozialversicherung ein und entlasten so das System. Allerdings zeigen Studien, dass der Effekt begrenzt ist und strukturelle Reformen des Rentensystems unumgänglich sind.",
        question:
          "Zuwanderung allein kann laut Studien das strukturelle Defizit des deutschen Rentensystems vollständig lösen.",
        correct: 1,
        explanation:
          "Falsch. Zuwanderung leistet einen Beitrag, kann aber strukturelle Reformen des Rentensystems nicht ersetzen.",
      },
    ],
    xp: 70,
  },

  // ── Teile 16–22: Akademische Gespräche (MCQ) ─────────────────────────────

  {
    id: 16,
    type: "gespraeche",
    typeLabel: "Akademisches Gespräch",
    typeLabelTr: "Akademik Tartışma",
    title: "Freier Wille und Determinismus",
    difficulty: 3,
    maleSpeakers: ["Prof. Lange"],
    audioText:
      "Moderatorin: Haben wir einen freien Willen, oder sind unsere Entscheidungen durch Gehirn und Umwelt determiniert? Prof. Lange, Sie sind Neurophilosoph — was sagen Sie? Prof. Lange: Das ist eine der tiefsten Fragen der Philosophie. Neurowissenschaftler wie Benjamin Libet haben gezeigt, dass Gehirnaktivität messbar vor dem bewussten Erleben einer Entscheidung beginnt. Das legt nahe, dass das Bewusstsein nicht der Ursprung, sondern möglicherweise die Beobachterin unserer Entscheidungen ist. Dr. Reyes: Ich halte diese Interpretation für zu reduktionistisch. Libet selbst hat betont, dass das Bewusstsein noch die Möglichkeit hatte, eine Handlung zu 'vetieren' — also zu stoppen. Das ist eine Form von Kontrolle. Prof. Lange: Das sogenannte 'Veto-Recht' ist interessant, aber schwach als Fundament für Willensfreiheit. Wenn selbst das Veto durch unbewusste Prozesse vorbereitet wird, worin besteht die Freiheit? Dr. Reyes: Kompatibilisten würden sagen: Freiheit bedeutet nicht Unabhängigkeit von Kausalität, sondern Handeln gemäß den eigenen Wünschen und Überzeugungen — ohne äußeren Zwang. In diesem Sinne ist Willensfreiheit mit Determinismus vereinbar. Prof. Lange: Das ist ein wichtiger Punkt. Aber dann stellt sich die Frage, wer für unsere Wünsche und Überzeugungen verantwortlich ist. Wenn sie durch Erziehung, Gene und Umwelt geformt wurden — haben wir sie dann wirklich frei gewählt? Dr. Reyes: Vielleicht ist das die falsche Frage. Moralische Verantwortung setzt keine absolute Ursprungsfreiheit voraus — sie setzt Zurechnungsfähigkeit voraus: die Fähigkeit, auf Gründe zu reagieren.",
    instruction:
      "Sie hören ein philosophisches Gespräch über freien Willen. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Was haben Libets Experimente laut Prof. Lange gezeigt?",
        options: [
          "Das Bewusstsein initiiert Entscheidungen vor jeder Gehirnaktivität.",
          "Gehirnaktivität beginnt messbar vor dem bewussten Erleben einer Entscheidung.",
          "Freier Wille und Gehirnaktivität sind vollständig unabhängig.",
        ],
        correct: 1,
        explanation:
          "'Gehirnaktivität messbar vor dem bewussten Erleben' — Libet zeigte, dass das Gehirn Entscheidungen vorbereitet, bevor wir sie bewusst erleben.",
      },
      {
        id: 2,
        question: "Was versteht Dr. Reyes unter dem 'Veto-Recht' im Kontext des Willens?",
        options: [
          "Die Fähigkeit des Bewusstseins, eine begonnene Handlung noch zu stoppen",
          "Das Recht, Gesetze abzulehnen",
          "Die Fähigkeit des Unbewussten, Entscheidungen zu blockieren",
        ],
        correct: 0,
        explanation:
          "'das Bewusstsein hatte noch die Möglichkeit, eine Handlung zu vetieren' — das Veto-Recht ist eine Form bewusster Kontrolle.",
      },
      {
        id: 3,
        question: "Was verstehen Kompatibilisten unter Willensfreiheit?",
        options: [
          "Vollständige Unabhängigkeit von kausalen Prozessen",
          "Handeln gemäß eigenen Wünschen ohne äußeren Zwang",
          "Die Fähigkeit, genetische Prägungen zu überwinden",
        ],
        correct: 1,
        explanation:
          "'Freiheit bedeutet Handeln gemäß eigenen Wünschen ohne äußeren Zwang' — Kompatibilismus vereinbart Willensfreiheit mit Determinismus.",
      },
      {
        id: 4,
        question: "Welche Frage stellt Prof. Lange gegenüber dem kompatibilistischen Ansatz?",
        options: [
          "Ob Entscheidungen durch Sprache beeinflusst werden",
          "Wer für unsere Wünsche und Überzeugungen verantwortlich ist, wenn sie durch Erziehung und Gene geformt wurden",
          "Ob Gehirnforschung moralisches Urteilen ersetzt",
        ],
        correct: 1,
        explanation:
          "'Wer ist für unsere Wünsche verantwortlich, wenn sie durch Erziehung und Gene geformt wurden?' — das ist die verbleibende Herausforderung für den Kompatibilismus.",
      },
      {
        id: 5,
        question: "Welches Kriterium für moralische Verantwortung nennt Dr. Reyes?",
        options: [
          "Absolute Ursprungsfreiheit aller Entscheidungen",
          "Zurechnungsfähigkeit: die Fähigkeit, auf Gründe zu reagieren",
          "Volle Bewusstheit aller eigenen Motivationen",
        ],
        correct: 1,
        explanation:
          "'Verantwortung setzt Zurechnungsfähigkeit voraus — die Fähigkeit, auf Gründe zu reagieren' — nicht absolute Freiheit, sondern Reaktionsfähigkeit begründet Verantwortung.",
      },
    ],
    xp: 70,
  },

  {
    id: 17,
    type: "gespraeche",
    typeLabel: "Akademisches Gespräch",
    typeLabelTr: "Akademik Tartışma",
    title: "Qualitätsjournalismus im digitalen Zeitalter",
    difficulty: 3,
    maleSpeakers: ["Dr. Schwarz"],
    audioText:
      "Moderatorin: Vertrauen in Medien schwindet, Desinformation breitet sich aus — wie steht es um den Journalismus? Dr. Schwarz, Sie forschen zu Mediensoziologie. Dr. Schwarz: Der Strukturwandel der Öffentlichkeit ist enorm. Früher kontrollierten wenige Verlage den Informationszugang. Heute kann jeder publizieren — was Demokratisierung und Fragmentierung gleichzeitig bedeutet. Prof. Engel: Und Qualitätsverlust. Wenn Klicks die Werbeeinnahmen bestimmen, entstehen Anreize für reißerische Überschriften statt sachliche Analyse. Clickbait ist kein Zufall, sondern Systemlogik. Dr. Schwarz: Das stimmt, aber ich würde differenzieren: Es gibt weiterhin starken Qualitätsjournalismus — die Frage ist seine Finanzierung. Abonnementmodelle zeigen, dass Menschen bereit sind, für guten Journalismus zu zahlen. Prof. Engel: Für einen Teil des Publikums. Das Problem ist: wer bezahlt, wählt seine Medien — und bekommt tendenziell, was er bereits glaubt. Qualitätsjournalismus erreicht nicht jene, die ihn am nötigsten hätten. Dr. Schwarz: Das ist das Paradox der Informationsgesellschaft. Medienkompetenz ist entscheidend — die Fähigkeit, Quellen zu beurteilen, Fakten von Meinungen zu unterscheiden und Manipulationsversuche zu erkennen. Prof. Engel: Aber Medienkompetenz allein reicht nicht. Wir brauchen strukturelle Lösungen: Förderung öffentlich-rechtlicher Medien, Regulierung algorithmischer Empfehlungssysteme und internationale Kooperation gegen Desinformationskampagnen. Dr. Schwarz: Einverstanden. Und Transparenz: Journalisten müssen offenlegen, wie Entscheidungen getroffen werden — auch Fehler öffentlich korrigieren. Vertrauen entsteht durch Rechenschaftspflicht.",
    instruction:
      "Sie hören ein Gespräch über Journalismus und Medien. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Was versteht Dr. Schwarz unter dem 'Strukturwandel der Öffentlichkeit'?",
        options: [
          "Die Verlagerung von Print- zu Digitalmedien ohne weitere Konsequenzen",
          "Demokratisierung und Fragmentierung durch den offenen Zugang zu Publikation",
          "Die Monopolisierung der Medienlandschaft durch Großkonzerne",
        ],
        correct: 1,
        explanation:
          "'Demokratisierung und Fragmentierung gleichzeitig' — der Strukturwandel bedeutet Chancen und Risiken zugleich.",
      },
      {
        id: 2,
        question: "Was meint Prof. Engel mit 'Clickbait ist Systemlogik'?",
        options: [
          "Clickbait ist ein technisches Problem der Suchmaschinenoptimierung.",
          "Wenn Klicks Werbeeinnahmen bestimmen, entstehen wirtschaftliche Anreize für reißerische Inhalte.",
          "Clickbait entsteht durch mangelnde Ausbildung von Journalisten.",
        ],
        correct: 1,
        explanation:
          "'Klicks bestimmen Werbeeinnahmen — das erzeugt Anreize für reißerische Überschriften' — Clickbait ist eine strukturelle, keine individuelle Fehlfunktion.",
      },
      {
        id: 3,
        question: "Welches Problem sieht Prof. Engel beim Abonnementmodell?",
        options: [
          "Es ist zu teuer für Verlage.",
          "Qualitätsjournalismus erreicht oft nicht diejenigen, die ihn am nötigsten hätten.",
          "Abonnenten lesen weniger als kostenlose Nutzer.",
        ],
        correct: 1,
        explanation:
          "'Qualitätsjournalismus erreicht nicht jene, die ihn am nötigsten hätten' — das Modell verstärkt bestehende Informationsungleichheiten.",
      },
      {
        id: 4,
        question: "Welche strukturellen Lösungen fordert Prof. Engel?",
        options: [
          "Vollständige Privatisierung öffentlich-rechtlicher Medien",
          "Förderung öffentlich-rechtlicher Medien, Regulierung von Algorithmen, internationale Kooperation",
          "Ausschließliche Konzentration auf Medienkompetenzbildung in Schulen",
        ],
        correct: 1,
        explanation:
          "'öffentlich-rechtliche Förderung, Algorithmenregulierung, internationale Kooperation' — drei Säulen der strukturellen Medienreform.",
      },
      {
        id: 5,
        question: "Wie entsteht laut Dr. Schwarz Vertrauen in Medien?",
        options: [
          "Durch prominente Journalisten und bekannte Markennamen",
          "Durch Rechenschaftspflicht und öffentliche Fehlerkorrektur",
          "Durch niedrige Abonnementpreise und breite Verfügbarkeit",
        ],
        correct: 1,
        explanation:
          "'Vertrauen entsteht durch Rechenschaftspflicht und öffentliche Fehlerkorrektur' — Transparenz über Entscheidungsprozesse ist entscheidend.",
      },
    ],
    xp: 70,
  },

  {
    id: 18,
    type: "gespraeche",
    typeLabel: "Akademisches Gespräch",
    typeLabelTr: "Akademik Tartışma",
    title: "Gleichstellung in der Arbeitswelt",
    difficulty: 3,
    maleSpeakers: ["Dr. Pfeiffer"],
    audioText:
      "Moderatorin: Der Gender Pay Gap ist ein häufig diskutiertes Thema. Wo stehen wir wirklich? Dr. Pfeiffer, Sie haben dazu geforscht. Dr. Pfeiffer: In Deutschland beträgt der unbereinigte Gender Pay Gap aktuell etwa achtzehn Prozent — das bedeutet, Frauen verdienen im Durchschnitt achtzehn Prozent weniger als Männer. Bereinigt man um Faktoren wie Berufsfeld, Arbeitszeit und Qualifikation, schrumpft die Lücke auf etwa sechs Prozent. Prof. Stein: Aber diese Bereinigung verdeckt das eigentliche Problem. Warum werden feminisierte Berufe schlechter bezahlt? Warum arbeiten Frauen häufiger in Teilzeit? Diese Strukturen sind nicht naturgegeben — sie sind gesellschaftlich produziert. Dr. Pfeiffer: Absolut. Das Konzept der 'Lohngerechtigkeit' muss auch Berufswertigkeiten hinterfragen: Warum verdient ein Lkw-Fahrer mehr als eine Altenpflegerin mit vergleichbarer Qualifikation? Prof. Stein: Genau. Und das Elterngeld allein reicht nicht. Solange Elternzeit überwiegend von Müttern genommen wird, reproduzieren wir die Ungleichheit. Wir brauchen echte Anreize für Väterzeit. Dr. Pfeiffer: Norwegen zeigt, dass es funktioniert. Dort nehmen fast neunzig Prozent der Väter Elternzeit — und das hat messbare Auswirkungen auf Karriereverläufe beider Elternteile. Prof. Stein: Das erfordert aber auch einen Kulturwandel in Unternehmen. Väter in Elternzeit werden noch immer mit versteckter Skepsis konfrontiert. Rechtliche Regelungen und gelebte Kultur müssen zusammenkommen. Dr. Pfeiffer: Einverstanden. Und wir dürfen nicht vergessen: Gleichstellung ist kein Nullsummenspiel. Studien zeigen, dass Unternehmen mit höherer Geschlechtervielfalt in Führungspositionen wirtschaftlich besser abschneiden.",
    instruction:
      "Sie hören ein Gespräch über Gleichstellung in der Arbeitswelt. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Was beträgt der unbereinigte Gender Pay Gap in Deutschland laut Dr. Pfeiffer?",
        options: ["Etwa sechs Prozent", "Etwa achtzehn Prozent", "Etwa dreißig Prozent"],
        correct: 1,
        explanation:
          "'unbereinigte Gender Pay Gap etwa achtzehn Prozent' — nach Bereinigung um Berufsfeld und Arbeitszeit schrumpft die Lücke auf sechs Prozent.",
      },
      {
        id: 2,
        question: "Welches strukturelle Problem hinter dem Gender Pay Gap nennt Prof. Stein?",
        options: [
          "Frauen haben durchschnittlich niedrigere Bildungsabschlüsse.",
          "Feminisierte Berufe werden schlechter bezahlt und Frauen arbeiten häufiger in Teilzeit.",
          "Frauen wählen bewusst geringer bezahlte Berufe.",
        ],
        correct: 1,
        explanation:
          "'Feminisierte Berufe werden schlechter bezahlt — das ist gesellschaftlich produziert, nicht naturgegeben' — strukturelle Ungleichheiten liegen tiefer als Berufswahl.",
      },
      {
        id: 3,
        question: "Welches Beispiel nennt Dr. Pfeiffer zur Lohngerechtigkeit?",
        options: [
          "Ein Arzt verdient mehr als ein Ingenieur.",
          "Ein Lkw-Fahrer verdient mehr als eine Altenpflegerin mit vergleichbarer Qualifikation.",
          "Führungskräfte werden unabhängig vom Geschlecht gleich bezahlt.",
        ],
        correct: 1,
        explanation:
          "'Lkw-Fahrer verdient mehr als eine Altenpflegerin' — das zeigt die strukturelle Unterbewertung von Fürsorgeberufen.",
      },
      {
        id: 4,
        question: "Welches Land nennen die Gesprächspartner als Vorbild für Väterzeit?",
        options: ["Schweden", "Norwegen", "Island"],
        correct: 1,
        explanation:
          "'Norwegen — fast neunzig Prozent der Väter nehmen Elternzeit' — das hat messbare positive Effekte auf Karriereverläufe beider Elternteile.",
      },
      {
        id: 5,
        question: "Welchen wirtschaftlichen Effekt nennt Dr. Pfeiffer für Geschlechtervielfalt in Führung?",
        options: [
          "Unternehmen mit mehr Frauen in Führung haben höhere Lohnkosten.",
          "Unternehmen mit höherer Geschlechtervielfalt in Führung schneiden wirtschaftlich besser ab.",
          "Geschlechtervielfalt hat keinen messbaren wirtschaftlichen Effekt.",
        ],
        correct: 1,
        explanation:
          "'Unternehmen mit höherer Geschlechtervielfalt schneiden wirtschaftlich besser ab' — Gleichstellung ist kein Nullsummenspiel, sondern ein Vorteil.",
      },
    ],
    xp: 70,
  },

  {
    id: 19,
    type: "gespraeche",
    typeLabel: "Akademisches Gespräch",
    typeLabelTr: "Akademik Tartışma",
    title: "Naturschutz und wirtschaftliche Entwicklung",
    difficulty: 3,
    maleSpeakers: ["Dr. Vogt"],
    audioText:
      "Moderatorin: Biodiversitätsverlust ist eine der größten globalen Krisen — oft im Schatten des Klimawandels. Wie verhalten sich Naturschutz und Wirtschaft? Dr. Vogt, Sie sind Ökologe. Dr. Vogt: Die Zahlen sind alarmierend. Laut dem Weltbiodiversitätsrat IPBES sind seit 1970 die Bestände von Wirbeltieren um durchschnittlich siebenundsechzig Prozent zurückgegangen. Das ist keine abstrakte Zahl — es bedeutet den Kollaps von Ökosystemdienstleistungen, von denen unsere Wirtschaft vollständig abhängt. Prof. Hakim: Als Wirtschaftswissenschaftlerin sehe ich das Problem auch im fehlenden Preissystem. Natur hat keinen Marktpreis — deshalb wird sie ohne Hemmung ausgebeutet. Wenn wir Ökosystemleistungen bepreisen, ändern sich Anreize. Dr. Vogt: Der Dasgupta-Report hat das global aufgezeigt: unsere Wirtschaft behandelt die Natur als exogenem Faktor, nicht als das, was sie ist — das Fundament jeder Wirtschaft. Prof. Hakim: Das 'Biodiversitätsabkommen Kunming-Montreal' von zweitausend zweiundzwanzig will dreißig Prozent der Land- und Meeresfläche bis dreißig unter Schutz stellen. Das sogenannte '30x30-Ziel'. Dr. Vogt: Ein wichtiger Schritt. Aber Schutzgebiete allein reichen nicht. Wir brauchen nachhaltige Landwirtschaft, Renaturierung degradierter Flächen und den Abbau naturschädlicher Subventionen — weltweit werden noch immer Milliarden für Fischerei und Landwirtschaft ausgegeben, die direkt der Biodiversität schaden. Prof. Hakim: Und wir müssen die Länder einbeziehen, die die größte Biodiversität beherbergen — meist im Globalen Süden. Naturschutz ohne Entwicklungspolitik ist weder gerecht noch wirksam.",
    instruction:
      "Sie hören ein Gespräch über Naturschutz und Wirtschaft. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Um wie viel Prozent sind Wirbeltierbestände laut IPBES seit 1970 zurückgegangen?",
        options: ["Um dreißig Prozent", "Um fünfzig Prozent", "Um siebenundsechzig Prozent"],
        correct: 2,
        explanation:
          "'siebenundsechzig Prozent Rückgang seit 1970' — der IPBES-Bericht dokumentiert den dramatischen Artenschwund.",
      },
      {
        id: 2,
        question: "Welches strukturelle Problem im Verhältnis Wirtschaft-Natur nennt Prof. Hakim?",
        options: [
          "Natur wird zu stark reguliert und hemmt Wirtschaftswachstum.",
          "Natur hat keinen Marktpreis und wird deshalb ohne Hemmung ausgebeutet.",
          "Unternehmen sind zu wenig über Biodiversitätsverluste informiert.",
        ],
        correct: 1,
        explanation:
          "'Natur hat keinen Marktpreis — deshalb wird sie ausgebeutet' — fehlende Bepreisung von Ökosystemleistungen ist das Kernproblem.",
      },
      {
        id: 3,
        question: "Was ist das '30x30-Ziel' des Kunming-Montreal-Abkommens?",
        options: [
          "CO₂-Emissionen bis 2030 um dreißig Prozent zu reduzieren",
          "Dreißig Prozent der Land- und Meeresfläche bis 2030 unter Schutz zu stellen",
          "Dreißig neue Naturschutzorganisationen bis 2030 zu gründen",
        ],
        correct: 1,
        explanation:
          "'dreißig Prozent der Land- und Meeresflächen bis dreißig unter Schutz stellen' — das ist das Kernziel des Kunming-Montreal-Abkommens.",
      },
      {
        id: 4,
        question: "Was fordert Dr. Vogt über Schutzgebiete hinaus?",
        options: [
          "Vollständigen Verzicht auf Landwirtschaft in sensiblen Gebieten",
          "Nachhaltige Landwirtschaft, Renaturierung und Abbau naturschädlicher Subventionen",
          "Privatisierung aller Naturschutzgebiete",
        ],
        correct: 1,
        explanation:
          "'nachhaltige Landwirtschaft, Renaturierung, Abbau naturschädlicher Subventionen' — Schutzgebiete allein sind keine ausreichende Strategie.",
      },
      {
        id: 5,
        question: "Welche Verknüpfung betont Prof. Hakim für wirksamen Naturschutz?",
        options: [
          "Naturschutz muss mit Technologiepolitik verbunden werden.",
          "Naturschutz ohne Entwicklungspolitik ist weder gerecht noch wirksam.",
          "Naturschutz ist ausschließlich eine nationale Aufgabe.",
        ],
        correct: 1,
        explanation:
          "'Naturschutz ohne Entwicklungspolitik ist weder gerecht noch wirksam' — der Globale Süden muss einbezogen werden.",
      },
    ],
    xp: 70,
  },

  {
    id: 20,
    type: "gespraeche",
    typeLabel: "Akademisches Gespräch",
    typeLabelTr: "Akademik Tartışma",
    title: "Überwachung und digitale Freiheit",
    difficulty: 3,
    maleSpeakers: ["Prof. Kern"],
    audioText:
      "Moderatorin: Staatliche Überwachung, Gesichtserkennung, Vorratsdatenspeicherung — wo endet legitime Sicherheit, wo beginnt Kontrolle? Prof. Kern, Sie sind Rechtswissenschaftler. Prof. Kern: Das Spannungsfeld ist verfassungsrechtlich klar: Sicherheit und Freiheit sind beide Verfassungsgüter, die abgewogen werden müssen. Massenüberwachung ohne konkreten Verdacht verletzt die Verhältnismäßigkeit — das ist der Standard des Bundesverfassungsgerichts und des Europäischen Gerichtshofs. Dr. Falk: Und praktisch wirkungslos obendrein. Massenüberwachung produziert Datenmengen, die keine Sicherheitsbehörde effektiv auswerten kann. Zielgerichtete Überwachung auf Basis konkreter Verdachtsmomente ist effektiver und grundrechtsschonender. Prof. Kern: Die Gesichtserkennung im öffentlichen Raum ist ein Sonderfall. In China wird sie flächendeckend eingesetzt — in der EU ist sie für Echtzeit-Biometrie in öffentlichen Räumen im AI Act weitgehend verboten. Dr. Falk: Wobei es Ausnahmen gibt: Terrorismusverdacht, schwere Kriminalität. Die Grenzen sind verhandelbar und politisch umkämpft. Prof. Kern: Das zeigt das grundlegende Problem: Überwachungstechnologien entwickeln sich schneller als rechtliche Rahmenbedingungen. Was heute als Ausnahme eingeführt wird, wird morgen zur Regel. Dr. Falk: Der Begriff 'function creep' beschreibt das — Technologien, die für einen Zweck eingeführt wurden, werden schrittweise für andere genutzt. Datensparsamkeit und Zweckbindung sind deshalb zentrale Datenschutzprinzipien. Prof. Kern: Und wir brauchen unabhängige Aufsichtsbehörden mit echten Durchsetzungsbefugnissen. Die DSGVO ist ein Rahmen — aber ohne effektive Kontrolle bleibt er zahnlos.",
    instruction:
      "Sie hören ein Gespräch über Überwachung und digitale Freiheit. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Welchen verfassungsrechtlichen Standard nennt Prof. Kern für Überwachungsmaßnahmen?",
        options: [
          "Überwachung ist grundsätzlich immer erlaubt, wenn die Sicherheit bedroht ist.",
          "Massenüberwachung ohne konkreten Verdacht verletzt die Verhältnismäßigkeit.",
          "Sicherheitsinteressen haben immer Vorrang vor Grundrechten.",
        ],
        correct: 1,
        explanation:
          "'Massenüberwachung verletzt die Verhältnismäßigkeit' — das ist der Standard des Bundesverfassungsgerichts und EuGH.",
      },
      {
        id: 2,
        question: "Warum ist Massenüberwachung laut Dr. Falk auch praktisch problematisch?",
        options: [
          "Sie ist zu kostspielig für staatliche Behörden.",
          "Sie produziert Datenmengen, die keine Sicherheitsbehörde effektiv auswerten kann.",
          "Sie verhindert internationale Sicherheitskooperation.",
        ],
        correct: 1,
        explanation:
          "'Massenüberwachung produziert Datenmengen, die nicht effektiv ausgewertet werden können' — sie ist neben dem Grundrechtsproblem auch praktisch wirkungslos.",
      },
      {
        id: 3,
        question: "Wie regelt der EU AI Act Gesichtserkennung im öffentlichen Raum?",
        options: [
          "Gesichtserkennung ist in der EU vollständig verboten.",
          "Echtzeit-Biometrie im öffentlichen Raum ist weitgehend verboten, mit Ausnahmen.",
          "Gesichtserkennung ist unbeschränkt erlaubt.",
        ],
        correct: 1,
        explanation:
          "'Echtzeit-Biometrie in öffentlichen Räumen weitgehend verboten, mit Ausnahmen' — der EU AI Act schränkt diese Technologie stark ein.",
      },
      {
        id: 4,
        question: "Was versteht man unter 'function creep' im Kontext von Überwachungstechnologien?",
        options: [
          "Die technische Fehlfunktion von Überwachungssystemen",
          "Die schrittweise Nutzung einer Technologie für Zwecke, für die sie ursprünglich nicht eingeführt wurde",
          "Die unkontrollierte Verbreitung von Überwachungskameras",
        ],
        correct: 1,
        explanation:
          "'function creep: Technologien für einen Zweck eingeführt, schrittweise für andere genutzt' — das beschreibt die schleichende Ausweitung von Überwachung.",
      },
      {
        id: 5,
        question: "Was fordert Prof. Kern für die wirksame Umsetzung der DSGVO?",
        options: [
          "Strengere Strafrahmen für alle Datenschutzverstöße",
          "Unabhängige Aufsichtsbehörden mit echten Durchsetzungsbefugnissen",
          "Vollständige Abschaffung digitaler Dienste ohne Datensparsamkeit",
        ],
        correct: 1,
        explanation:
          "'unabhängige Aufsichtsbehörden mit echten Durchsetzungsbefugnissen' — ohne effektive Kontrolle bleibt die DSGVO zahnlos.",
      },
    ],
    xp: 70,
  },

  {
    id: 21,
    type: "gespraeche",
    typeLabel: "Akademisches Gespräch",
    typeLabelTr: "Akademik Tartışma",
    title: "Zukunft der Arbeit und Automatisierung",
    difficulty: 3,
    maleSpeakers: ["Prof. Maier"],
    audioText:
      "Moderatorin: Wird Automatisierung Massenarbeitslosigkeit auslösen, oder schafft sie neue Jobs? Prof. Maier, Wirtschaftsökonom — was sagen die Daten? Prof. Maier: Die Debatte ist alt, aber die Qualität der aktuellen Automatisierungswelle ist neu. Frühere Wellen — Industrialisierung, Computerisierung — haben primär Routinetätigkeiten automatisiert. Generative KI greift nun auch kognitive, kreative Tätigkeiten an, die man für automatisierungssicher hielt. Dr. Rios: Aber historisch hat jede Automatisierungswelle per Saldo mehr Jobs geschaffen als vernichtet. Das Produktivitätswachstum senkt Preise, erhöht Kaufkraft und schafft neue Konsumnachfrage — und damit neue Arbeit. Prof. Maier: Das ist die optimistische Lesart. Das Problem ist die Übergangsphase: Betroffene Arbeiter haben nicht automatisch die Qualifikationen für neue Jobs. Ohne aktive Umschulungspolitik entsteht strukturelle Arbeitslosigkeit. Dr. Rios: Das stimmt. Und es ist nicht egal, wer die Gewinne der Automatisierung einstreicht. Wenn Produktivitätsgewinne nur bei Kapitaleignern landen, verschärft sich Ungleichheit. Modelle wie Gewinnbeteiligung oder Besteuerung von KI-generierten Gewinnen werden diskutiert. Prof. Maier: Das Konzept einer 'Maschinensteuer' hat Bill Gates popularisiert. Die Idee: Wenn ein Roboter einen menschlichen Job ersetzt, soll das besteuert werden — um Umschulung und soziale Absicherung zu finanzieren. Dr. Rios: Konzeptionell interessant, praktisch schwer umsetzbar. Was ist ein 'Roboteräquivalent'? Wie misst man Automatisierung? Aber die grundlegende Frage — wer profitiert von der Automatisierung? — ist legitim und dringend.",
    instruction:
      "Sie hören ein Gespräch über Automatisierung und Arbeit. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Was ist laut Prof. Maier das Neue an der aktuellen Automatisierungswelle?",
        options: [
          "Sie automatisiert ausschließlich körperliche Tätigkeiten.",
          "Generative KI greift auch kognitive und kreative Tätigkeiten an.",
          "Sie betrifft nur Entwicklungsländer.",
        ],
        correct: 1,
        explanation:
          "'Generative KI greift kognitive, kreative Tätigkeiten an, die man für automatisierungssicher hielt' — das ist qualitativ neu gegenüber früheren Wellen.",
      },
      {
        id: 2,
        question: "Welches historische Argument für Optimismus bringt Dr. Rios?",
        options: [
          "Frühere Automatisierungswellen haben keine Jobs vernichtet.",
          "Jede Automatisierungswelle hat per Saldo mehr Jobs geschaffen als vernichtet.",
          "KI wird keine menschlichen Tätigkeiten ersetzen können.",
        ],
        correct: 1,
        explanation:
          "'historisch hat jede Automatisierungswelle mehr Jobs geschaffen als vernichtet' — Produktivitätsgewinne erzeugen neue Konsumnachfrage.",
      },
      {
        id: 3,
        question: "Welches Problem in der Übergangsphase nennt Prof. Maier?",
        options: [
          "Mangelnde Investitionen in neue Technologien",
          "Betroffene Arbeiter haben nicht automatisch die Qualifikationen für neue Jobs",
          "Zu geringe Staatsverschuldung für Automatisierungsinvestitionen",
        ],
        correct: 1,
        explanation:
          "'Betroffene haben nicht automatisch die Qualifikationen für neue Jobs' — ohne Umschulungspolitik entsteht strukturelle Arbeitslosigkeit.",
      },
      {
        id: 4,
        question: "Welches Verteilungsproblem spricht Dr. Rios an?",
        options: [
          "Automatisierungsgewinne landen möglicherweise nur bei Kapitaleignern.",
          "Staatliche Unternehmen profitieren zu stark von Automatisierung.",
          "Arbeiter werden durch Automatisierung zu Kapitaleignern.",
        ],
        correct: 0,
        explanation:
          "'Wenn Produktivitätsgewinne nur bei Kapitaleignern landen, verschärft sich Ungleichheit' — Verteilungsfragen sind zentral.",
      },
      {
        id: 5,
        question: "Wer hat das Konzept der 'Maschinensteuer' popularisiert?",
        options: ["Elon Musk", "Bill Gates", "Jeff Bezos"],
        correct: 1,
        explanation:
          "'Bill Gates hat die Maschinensteuer popularisiert' — die Idee: Roboter, die menschliche Jobs ersetzen, sollen besteuert werden.",
      },
    ],
    xp: 70,
  },

  {
    id: 22,
    type: "gespraeche",
    typeLabel: "Akademisches Gespräch",
    typeLabelTr: "Akademik Tartışma",
    title: "Wissenschaftsethik und Forschungsintegrität",
    difficulty: 3,
    maleSpeakers: ["Prof. Becker"],
    audioText:
      "Moderatorin: Replikationskrise, Plagiate, gefälschte Daten — steht die Wissenschaft unter Druck? Prof. Becker, Wissenschaftssoziologe. Prof. Becker: Die sogenannte 'Replikationskrise' — die Tatsache, dass viele prominente Studien, vor allem in der Psychologie, sich nicht reproduzieren lassen — hat das Vertrauen erschüttert. Aber sie ist auch ein Zeichen, dass Wissenschaft sich selbst hinterfragt. Das ist grundsätzlich gesund. Dr. Gruber: Das stimmt, aber wir müssen die Ursachen ernst nehmen. Das akademische Anreizsystem ist dysfunktional: Wer viel publiziert, wird befördert. 'Publish or perish' führt zu überhasteten, nicht ausreichend replizierten Studien. Prof. Becker: Und zu selektiver Berichterstattung — sogenannte 'publication bias': Positive Ergebnisse werden veröffentlicht, negative vergraben. Das verzerrt das Gesamtbild der Wissenschaft erheblich. Dr. Gruber: Gegenmittel gibt es: Präregistrierung von Studien, Open Data, Open Access, Replikationsstudien als eigenständige Publikationsform. Diese Reformen werden zunehmend gefordert. Prof. Becker: Und Plagiatserkennungssoftware, Peer-Review-Reformen. Das Problem ist: Peer Review ist das Herzstück wissenschaftlicher Qualitätssicherung, aber selbst anfällig für Bias — wer reviewt, kennt oft die Autoren. Dr. Gruber: Deshalb plädieren viele für 'doppelt-blindes Peer Review', bei dem weder Autor noch Reviewer die Identität des jeweils anderen kennen. Studien zeigen, dass das zu gerechteren Bewertungen führt. Prof. Becker: Am Ende bleibt: Wissenschaftliche Selbstkorrektur ist langsam, aber sie funktioniert. Und Wissenschaft, die ihre Fehler öffentlich benennt, ist glaubwürdiger als eine, die sie versteckt.",
    instruction:
      "Sie hören ein Gespräch über Wissenschaftsethik. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Was versteht man unter der 'Replikationskrise'?",
        options: [
          "Wissenschaftler veröffentlichen zu wenig Studien.",
          "Viele prominente Studien lassen sich nicht reproduzieren.",
          "Forschungsdaten werden häufig gestohlen.",
        ],
        correct: 1,
        explanation:
          "'Viele prominente Studien, vor allem in der Psychologie, lassen sich nicht reproduzieren' — das ist der Kern der Replikationskrise.",
      },
      {
        id: 2,
        question: "Was kritisiert Dr. Gruber am akademischen Anreizsystem?",
        options: [
          "'Publish or perish' führt zu überhasteten, unzureichend replizierten Studien.",
          "Akademiker werden für internationale Kooperationen zu wenig belohnt.",
          "Fördergelder werden ungerecht zwischen Disziplinen verteilt.",
        ],
        correct: 0,
        explanation:
          "'Publish or perish führt zu überhasteten Studien' — das Anreizsystem belohnt Quantität statt Qualität.",
      },
      {
        id: 3,
        question: "Was versteht man unter 'publication bias'?",
        options: [
          "Verlage bevorzugen Studien aus bestimmten Ländern.",
          "Positive Ergebnisse werden veröffentlicht, negative werden vergraben.",
          "Reviewers bevorzugen bekannte Autoren.",
        ],
        correct: 1,
        explanation:
          "'Positive Ergebnisse veröffentlicht, negative vergraben' — publication bias verzerrt das Gesamtbild der Wissenschaft.",
      },
      {
        id: 4,
        question: "Welche Maßnahmen nennt Dr. Gruber gegen Forschungsfehlentwicklungen?",
        options: [
          "Abschaffung des Peer-Review-Systems",
          "Präregistrierung, Open Data, Open Access und Replikationsstudien",
          "Reduzierung der Anzahl wissenschaftlicher Zeitschriften",
        ],
        correct: 1,
        explanation:
          "'Präregistrierung, Open Data, Open Access, Replikationsstudien' — diese Maßnahmen sollen Transparenz und Reproduzierbarkeit stärken.",
      },
      {
        id: 5,
        question: "Was ist der Vorteil von 'doppelt-blindem Peer Review'?",
        options: [
          "Es beschleunigt den Review-Prozess erheblich.",
          "Es führt laut Studien zu gerechteren Bewertungen.",
          "Es ermöglicht den Reviewern, häufiger zu publizieren.",
        ],
        correct: 1,
        explanation:
          "'doppelt-blindes Peer Review führt zu gerechteren Bewertungen' — wenn Reviewer und Autor anonym bleiben, wirken Vorurteile weniger stark.",
      },
    ],
    xp: 70,
  },

  // ── Teile 23–30: Wissenschaftliche Vorträge (MCQ) ────────────────────────

  {
    id: 23,
    type: "informationen",
    typeLabel: "Wissenschaftlicher Vortrag",
    typeLabelTr: "Bilimsel Konuşma",
    title: "Psychologie der Entscheidungsfindung",
    difficulty: 3,
    audioText:
      "Jeden Tag treffen wir Tausende von Entscheidungen — die meisten unbewusst. Die Verhaltensökonomen Daniel Kahneman und Amos Tversky haben mit ihrer Prospect Theory gezeigt, dass menschliches Entscheidungsverhalten systematisch von rationalen Modellen abweicht. Sie unterscheiden zwei Denksy­steme: System 1, das schnell, automatisch und intuitiv arbeitet, und System 2, das langsam, bewusst und analytisch vorgeht. Die meisten Entscheidungen trifft System 1 — was effizient, aber fehleranfällig ist. Besonders einflussreich ist der sogenannte 'Framing-Effekt': Dieselbe Information, unterschiedlich formuliert, führt zu verschiedenen Entscheidungen. Ein klassisches Beispiel: 'Diese Operation hat eine Überlebensrate von neunzig Prozent' klingt attraktiver als 'Diese Operation hat eine Sterblichkeitsrate von zehn Prozent' — obwohl es dieselbe Aussage ist. Der 'Ankereffekt' zeigt, dass die erste Zahl, mit der wir konfrontiert werden, alle folgenden Einschätzungen verankert — selbst wenn diese Zahl irrelevant ist. Verkäufer nutzen diesen Mechanismus bewusst: Ein Produkt, das zuerst mit fünfhundert Euro bewertet und dann auf zweihundert reduziert wird, wirkt attraktiver als eines, das von Anfang an zweihundert kostet. 'Nudging' — sanftes Schubsen — ist eine politische Anwendung dieser Erkenntnisse: Durch intelligente Voreinstellungen können Entscheidungsarchitekten Verhaltensänderungen bewirken, ohne zu zwingen. Die Voreinstellung 'Organspende: Ja' erhöht die Spendenbereitschaft signifikant — allein durch die Umkehrung der Standardoption.",
    instruction:
      "Sie hören einen Vortrag über Entscheidungspsychologie. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Was beschreibt die Prospect Theory von Kahneman und Tversky?",
        options: [
          "Menschen treffen stets rationale Entscheidungen auf Basis vollständiger Information.",
          "Menschliches Entscheidungsverhalten weicht systematisch von rationalen Modellen ab.",
          "Entscheidungen werden ausschließlich von System 2 getroffen.",
        ],
        correct: 1,
        explanation:
          "'Entscheidungsverhalten weicht systematisch von rationalen Modellen ab' — die Prospect Theory beschreibt kognitive Verzerrungen.",
      },
      {
        id: 2,
        question: "Was ist System 1 im Sinne von Kahnemans Modell?",
        options: [
          "Das langsame, analytische Denksystem",
          "Das schnelle, automatische, intuitive Denksystem",
          "Das sprachbasierte, logische Denksystem",
        ],
        correct: 1,
        explanation:
          "'System 1 — schnell, automatisch, intuitiv' — es trifft die meisten Entscheidungen, ist aber fehleranfällig.",
      },
      {
        id: 3,
        question: "Was zeigt der 'Framing-Effekt'?",
        options: [
          "Entscheidungen hängen ausschließlich vom Inhalt einer Information ab.",
          "Dieselbe Information führt je nach Formulierung zu verschiedenen Entscheidungen.",
          "Menschen ignorieren statistische Informationen bei medizinischen Entscheidungen.",
        ],
        correct: 1,
        explanation:
          "'Dieselbe Information, unterschiedlich formuliert, führt zu verschiedenen Entscheidungen' — der Rahmen beeinflusst die Wahrnehmung.",
      },
      {
        id: 4,
        question: "Wie nutzen Verkäufer laut dem Vortrag den Ankereffekt?",
        options: [
          "Sie zeigen immer zuerst das günstigste Produkt.",
          "Sie bewerten ein Produkt zuerst hoch, um die reduzierte Zahl attraktiver wirken zu lassen.",
          "Sie verstecken den ursprünglichen Preis vollständig.",
        ],
        correct: 1,
        explanation:
          "'Zuerst 500 Euro, dann auf 200 reduziert' — der hohe Ankerpreis macht die Reduktion attraktiver als ein von Anfang an günstiges Produkt.",
      },
      {
        id: 5,
        question: "Wie funktioniert 'Nudging' bei der Organspende?",
        options: [
          "Organspende wird gesetzlich verpflichtend gemacht.",
          "Die Voreinstellung 'Ja' zur Organspende erhöht die Spendenbereitschaft signifikant.",
          "Bürger werden durch finanzielle Anreize zur Organspende motiviert.",
        ],
        correct: 1,
        explanation:
          "'Voreinstellung Ja erhöht die Spendenbereitschaft' — Nudging nutzt Standardoptionen als sanften Anstoß ohne Zwang.",
      },
    ],
    xp: 75,
  },

  {
    id: 24,
    type: "informationen",
    typeLabel: "Wissenschaftlicher Vortrag",
    typeLabelTr: "Bilimsel Konuşma",
    title: "Soziologie der Religion in der Moderne",
    difficulty: 3,
    audioText:
      "Die Frage, ob Modernisierung zwingend zur Säkularisierung führt, war lange Zeit ein Dogma der Soziologie. Max Weber beschrieb die Moderne als 'Entzauberung der Welt' — eine Ablösung religiöser Weltbilder durch rationale, wissenschaftliche Erklärungen. Dieser Säkularisierungsthese wurde jedoch zunehmend widersprochen. Der Soziologe José Casanova prägte den Begriff der 'Deprivatisierung' der Religion: Entgegen der Erwartung, dass Religion ins Private zurückgedrängt wird, behauptet sie sich zunehmend im öffentlichen Raum — durch religiöse soziale Bewegungen, politische Parteien und transnationale Netzwerke. Das Paradox der Gegenwart: In westlichen Gesellschaften nimmt institutionelle Religiosität ab — Kirchenmitgliedschaft, Gottesdienstbesuch —, während gleichzeitig eine diffuse Spiritualität wächst. Begriffe wie 'Spirituality without religion' oder 'believing without belonging' beschreiben diesen Trend. Andererseits erlebt religiöser Fundamentalismus weltweit eine Renaissance — als Reaktion auf Globalisierung, Modernisierung und das Gefühl kultureller Bedrohung. Religiöse Identität wird zur Ressource politischer Mobilisierung. Die Religionssoziologin Grace Davie unterscheidet zwischen 'Believing' und 'Belonging': Man kann an Gott glauben, ohne einer Gemeinschaft anzugehören — und umgekehrt Kirchenmitglied sein, ohne zu glauben. Beides entkoppelt sich in modernen Gesellschaften zunehmend.",
    instruction:
      "Sie hören einen Vortrag über Religion und Moderne. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Was meinte Max Weber mit der 'Entzauberung der Welt'?",
        options: [
          "Die Zerstörung kultureller Traditionen durch Industrialisierung",
          "Die Ablösung religiöser Weltbilder durch rationale, wissenschaftliche Erklärungen",
          "Den Rückgang von Magie und Aberglauben in der Moderne",
        ],
        correct: 1,
        explanation:
          "'Ablösung religiöser Weltbilder durch rationale Erklärungen' — Webers 'Entzauberung' beschreibt den Rationalisierungsprozess der Moderne.",
      },
      {
        id: 2,
        question: "Was bedeutet 'Deprivatisierung der Religion' nach Casanova?",
        options: [
          "Religion zieht sich vollständig aus dem öffentlichen Leben zurück.",
          "Religion behauptet sich entgegen der Erwartung zunehmend im öffentlichen Raum.",
          "Religiöse Institutionen werden privatisiert.",
        ],
        correct: 1,
        explanation:
          "'Religion behauptet sich im öffentlichen Raum' — Casanova zeigt, dass Religion nicht einfach ins Private zurückgedrängt wird.",
      },
      {
        id: 3,
        question: "Was beschreibt der Begriff 'believing without belonging'?",
        options: [
          "Menschen glauben an Gott, ohne einer religiösen Gemeinschaft anzugehören.",
          "Kirchenmitglieder haben keine persönlichen religiösen Überzeugungen mehr.",
          "Spiritualität ohne Glauben an ein höheres Wesen.",
        ],
        correct: 0,
        explanation:
          "'believing without belonging' — man kann glauben, ohne einer Kirche anzugehören; Glaube und institutionelle Zugehörigkeit entkoppeln sich.",
      },
      {
        id: 4,
        question: "Als Reaktion auf was erlebt religiöser Fundamentalismus laut dem Vortrag eine Renaissance?",
        options: [
          "Als Reaktion auf den technologischen Rückstand bestimmter Regionen",
          "Als Reaktion auf Globalisierung, Modernisierung und das Gefühl kultureller Bedrohung",
          "Als Folge zunehmender Bildungsungleichheit",
        ],
        correct: 1,
        explanation:
          "'Reaktion auf Globalisierung, Modernisierung, Gefühl kultureller Bedrohung' — Fundamentalismus ist eine Gegenreaktion auf Modernisierungsprozesse.",
      },
      {
        id: 5,
        question: "Welche Unterscheidung trifft Grace Davie?",
        options: [
          "Zwischen öffentlicher und privater Religiosität",
          "Zwischen 'Believing' und 'Belonging' als entkoppelten Dimensionen",
          "Zwischen westlicher und östlicher Religiosität",
        ],
        correct: 1,
        explanation:
          "'Believing und Belonging entkoppeln sich' — Glauben und institutionelle Zugehörigkeit werden in modernen Gesellschaften immer unabhängiger.",
      },
    ],
    xp: 75,
  },

  {
    id: 25,
    type: "informationen",
    typeLabel: "Wissenschaftlicher Vortrag",
    typeLabelTr: "Bilimsel Konuşma",
    title: "Geschichte und Zukunft der Europäischen Union",
    difficulty: 3,
    audioText:
      "Die Europäische Union ist das ambitionierteste politische Integrationsprojekt der Geschichte. Entstanden aus den Trümmern des Zweiten Weltkriegs mit dem Ziel, einen weiteren europäischen Krieg unmöglich zu machen, hat sie sich von einer Wirtschaftsgemeinschaft zur politischen Union weiterentwickelt — wenngleich dieser Prozess unvollständig und umstritten bleibt. Der Binnenmarkt mit freiem Waren-, Dienstleistungs-, Kapital- und Personenverkehr — die sogenannten vier Grundfreiheiten — gilt als größter wirtschaftlicher Erfolg. Weniger klar ist die demokratische Legitimation: Das Europäische Parlament wird direkt gewählt, hat aber geringere Gesetzgebungskompetenzen als nationale Parlamente. Der sogenannte 'Demokratiedefizit' ist ein anhaltender Kritikpunkt. Krisen haben die EU geprägt: die Eurokrise ab zweitausend zehn, die Flüchtlingskrise ab zweitausend fünfzehn, der Brexit — der erste Austritt eines Mitgliedsstaats —, die Corona-Pandemie und der russische Angriff auf die Ukraine. Jede Krise hat die EU verändert: Sie hat Solidarität erzwungen, aber auch Fliehkräfte offenbart. Die Frage nach der Finalität der EU — Bundesstaat, Staatenbund oder hybrides Gebilde — ist nicht entschieden. Föderalisten sehen in weiterer Integration die Antwort auf globale Herausforderungen. Euroskeptiker betonen die Notwendigkeit, Souveränität an Nationalstaaten zurückzugeben. Die EU steht vor der Aufgabe, handlungsfähig, demokratisch und gerecht zugleich zu sein — kein leichtes Gleichgewicht.",
    instruction:
      "Sie hören einen Vortrag über die Europäische Union. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Mit welchem ursprünglichen Ziel wurde die europäische Integration begonnen?",
        options: [
          "Schaffung eines gemeinsamen Militärbündnisses",
          "Verhinderung eines weiteren europäischen Krieges",
          "Entwicklung einer gemeinsamen europäischen Sprache",
        ],
        correct: 1,
        explanation:
          "'Ziel: einen weiteren europäischen Krieg unmöglich zu machen' — die europäische Integration entstand als Friedensprojekt nach 1945.",
      },
      {
        id: 2,
        question: "Was sind die vier Grundfreiheiten des EU-Binnenmarkts?",
        options: [
          "Freier Waren-, Dienstleistungs-, Kapital- und Personenverkehr",
          "Freie Meinungsäußerung, Religionsfreiheit, Versammlungsfreiheit und Wahlrecht",
          "Reisefreiheit, Niederlassungsfreiheit, Studienfreiheit und Arbeitsfreiheit",
        ],
        correct: 0,
        explanation:
          "'freier Waren-, Dienstleistungs-, Kapital- und Personenverkehr' — das sind die vier Grundfreiheiten des europäischen Binnenmarkts.",
      },
      {
        id: 3,
        question: "Was meint der Begriff 'Demokratiedefizit' in der EU?",
        options: [
          "Mitgliedstaaten verstoßen systematisch gegen demokratische Grundsätze.",
          "Das direkt gewählte Europäische Parlament hat geringere Kompetenzen als nationale Parlamente.",
          "EU-Bürger dürfen nicht an Europawahlen teilnehmen.",
        ],
        correct: 1,
        explanation:
          "'Das Europäische Parlament hat geringere Kompetenzen als nationale Parlamente' — das Demokratiedefizit ist ein strukturelles Kritikproblem.",
      },
      {
        id: 4,
        question: "Welches Ereignis war laut dem Vortrag der erste Austritt eines EU-Mitgliedsstaats?",
        options: ["Der Grexit", "Der Brexit", "Der Öxit"],
        correct: 1,
        explanation:
          "'der Brexit — der erste Austritt eines Mitgliedsstaats' — Großbritannien verließ 2020 als erstes Land die EU.",
      },
      {
        id: 5,
        question: "Welche offene Frage stellt der Vortrag zur Zukunft der EU?",
        options: [
          "Ob die EU zu einer militärischen Supermacht werden soll",
          "Ob die EU Bundesstaat, Staatenbund oder hybrides Gebilde sein wird",
          "Ob der Euro als gemeinsame Währung aufgegeben werden soll",
        ],
        correct: 1,
        explanation:
          "'Bundesstaat, Staatenbund oder hybrides Gebilde — die Finalität der EU ist nicht entschieden' — das ist die fundamentale offene Verfassungsfrage.",
      },
    ],
    xp: 75,
  },

  {
    id: 26,
    type: "informationen",
    typeLabel: "Wissenschaftlicher Vortrag",
    typeLabelTr: "Bilimsel Konuşma",
    title: "Quantencomputing und gesellschaftliche Konsequenzen",
    difficulty: 3,
    audioText:
      "Quantencomputer nutzen Prinzipien der Quantenmechanik — Superposition und Verschränkung —, um Berechnungen durchzuführen, die klassische Computer an ihre Grenzen bringen oder unmöglich machen. Während ein klassischer Bit entweder 0 oder 1 ist, kann ein Qubit dank Superposition gleichzeitig 0 und 1 sein — was exponentielle Rechenleistung für bestimmte Aufgaben ermöglicht. Praktische Quantencomputer sind noch in der Entwicklung, aber Meilensteine wie 'Quantum Supremacy' — die Demonstration von Rechenoperationen, die kein klassischer Computer in annehmbarer Zeit lösen kann — sind bereits erreicht. Die gesellschaftliche Relevanz ist enorm: Quantencomputer könnten die heutigen Verschlüsselungsstandards brechen, auf denen das gesamte digitale Finanzsystem, die Kommunikation und die Sicherheitsarchitektur beruhen. Das nennt man die 'kryptographische Bedrohung'. Als Reaktion entwickelt die Fachwelt 'Post-Quanten-Kryptographie' — Verschlüsselungsverfahren, die auch gegen Quantenangriffe resistent sind. Gleichzeitig bieten Quantencomputer Chancen: in der Medikamentenentwicklung können molekulare Simulationen revolutioniert werden. In der Logistik, dem Finanzwesen und der Materialforschung eröffnen sich neue Optimierungsmöglichkeiten. Wer als Erster leistungsfähige Quantencomputer betreibt, wird einen strategischen Vorteil haben — weshalb Quantencomputing auch ein geopolitisches Wettrennen ist.",
    instruction:
      "Sie hören einen Vortrag über Quantencomputing. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Was ermöglicht das Prinzip der Superposition beim Qubit?",
        options: [
          "Ein Qubit kann nur den Wert 1 annehmen.",
          "Ein Qubit kann dank Superposition gleichzeitig 0 und 1 sein.",
          "Ein Qubit arbeitet doppelt so schnell wie ein klassisches Bit.",
        ],
        correct: 1,
        explanation:
          "'Qubit kann dank Superposition gleichzeitig 0 und 1 sein' — das ermöglicht exponentielle Rechenleistungssteigerung für bestimmte Aufgaben.",
      },
      {
        id: 2,
        question: "Was bezeichnet 'Quantum Supremacy'?",
        options: [
          "Die vollständige Ablösung klassischer Computer durch Quantencomputer",
          "Die Demonstration von Berechnungen, die kein klassischer Computer in annehmbarer Zeit lösen kann",
          "Die militärische Überlegenheit durch Quantentechnologie",
        ],
        correct: 1,
        explanation:
          "'Rechenoperationen, die kein klassischer Computer in annehmbarer Zeit lösen kann' — Quantum Supremacy ist ein Meilenstein, kein vollständiger Ersatz.",
      },
      {
        id: 3,
        question: "Worin besteht die 'kryptographische Bedrohung' durch Quantencomputer?",
        options: [
          "Quantencomputer können alle Passwörter im Internet gleichzeitig ändern.",
          "Quantencomputer könnten die heutigen Verschlüsselungsstandards brechen.",
          "Quantencomputer machen klassische Kommunikation vollständig unmöglich.",
        ],
        correct: 1,
        explanation:
          "'Quantencomputer könnten heutige Verschlüsselungsstandards brechen' — das bedroht das gesamte digitale Sicherheitssystem.",
      },
      {
        id: 4,
        question: "Was ist 'Post-Quanten-Kryptographie'?",
        options: [
          "Kryptographie, die ausschließlich von Quantencomputern genutzt wird",
          "Verschlüsselungsverfahren, die gegen Quantenangriffe resistent sind",
          "Veraltete Kryptographie, die durch Quantencomputer ersetzt wird",
        ],
        correct: 1,
        explanation:
          "'Verschlüsselungsverfahren, die gegen Quantenangriffe resistent sind' — Post-Quanten-Kryptographie soll die heutige Sicherheitsarchitektur zukunftssicher machen.",
      },
      {
        id: 5,
        question: "Warum ist Quantencomputing auch ein geopolitisches Wettrennen?",
        options: [
          "Weil Quantencomputer ausschließlich für militärische Zwecke geeignet sind",
          "Weil derjenige, der zuerst leistungsfähige Quantencomputer betreibt, einen strategischen Vorteil erhält",
          "Weil internationale Abkommen Quantenforschung nur einigen Ländern erlauben",
        ],
        correct: 1,
        explanation:
          "'Wer zuerst leistungsfähige Quantencomputer betreibt, hat einen strategischen Vorteil' — das macht Quantencomputing zu einem Schlüsselfeld geopolitischer Konkurrenz.",
      },
    ],
    xp: 75,
  },

  {
    id: 27,
    type: "informationen",
    typeLabel: "Wissenschaftlicher Vortrag",
    typeLabelTr: "Bilimsel Konuşma",
    title: "Klimapsychologie und Umweltverhalten",
    difficulty: 3,
    audioText:
      "Warum handeln Menschen nicht so, wie es der Ernst der Klimakrise erfordert? Diese Frage beschäftigt die Klimapsychologie — eine noch junge Disziplin an der Schnittstelle von Psychologie, Verhaltensökonomie und Umweltwissenschaft. Ein zentrales Konzept ist die 'psychologische Distanz': Der Klimawandel wird von vielen Menschen als räumlich fern, zeitlich weit in der Zukunft und sozial andere betreffend wahrgenommen — obwohl die Auswirkungen längst global und unmittelbar sind. Diese Wahrnehmungsverzerrung erschwert Handlungsmotivation. Dazu kommt das 'Überwältigungsgefühl' — auf Englisch 'Eco-Anxiety' oder auch 'Klimaangst': Das Ausmaß der Krise erscheint so groß, dass Individuen sich machtlos fühlen und zur psychologischen Abwehr greifen — entweder durch Verleugnung oder durch 'Pseudo-Action': symbolische Handlungen wie Strohhalm-Verzicht, die das Gewissen beruhigen, aber strukturell nichts verändern. Klimapsychologen betonen, dass wirksame Kommunikation auf Handlungsmöglichkeiten und lokale Konsequenzen fokussieren sollte — statt auf ferne Katastrophenszenarien, die lähmen. 'Konstruktiver Journalismus' und 'Solutions-Journalism' setzen genau hier an. Kollektives Handeln ist psychologisch wirksamer als individueller Konsumverzicht: Das Gefühl, Teil einer Bewegung zu sein, stärkt die Handlungsbereitschaft. Und: Maßnahmen, die sowohl dem Klima als auch der persönlichen Gesundheit nützen — etwa Radfahren, pflanzliche Ernährung —, sind leichter zu kommunizieren als rein altruistische Opfer.",
    instruction:
      "Sie hören einen Vortrag über Klimapsychologie. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Was versteht die Klimapsychologie unter 'psychologischer Distanz'?",
        options: [
          "Die physische Entfernung zwischen Klimaforschern und Politikern",
          "Die Wahrnehmung des Klimawandels als räumlich fern, zeitlich weit und andere betreffend",
          "Den Abstand zwischen wissenschaftlichem Konsens und öffentlicher Meinung",
        ],
        correct: 1,
        explanation:
          "'räumlich fern, zeitlich weit, andere betreffend' — psychologische Distanz erklärt, warum Menschen trotz Wissen nicht handeln.",
      },
      {
        id: 2,
        question: "Was bezeichnet 'Pseudo-Action' im Kontext der Klimapsychologie?",
        options: [
          "Symbolische Handlungen, die das Gewissen beruhigen, aber strukturell nichts verändern",
          "Falsche wissenschaftliche Studien über Klimawandel",
          "Politische Maßnahmen, die nur auf dem Papier existieren",
        ],
        correct: 0,
        explanation:
          "'Pseudo-Action: symbolische Handlungen wie Strohhalm-Verzicht, die beruhigen, aber nichts strukturell verändern' — das ist eine Form psychologischer Abwehr.",
      },
      {
        id: 3,
        question: "Worauf sollte wirksame Klimakommunikation laut Klimapsychologen fokussieren?",
        options: [
          "Auf ferne Katastrophenszenarien, die die Dringlichkeit verdeutlichen",
          "Auf Handlungsmöglichkeiten und lokale Konsequenzen",
          "Auf wissenschaftliche Daten und globale Temperaturkurven",
        ],
        correct: 1,
        explanation:
          "'Handlungsmöglichkeiten und lokale Konsequenzen' — ferne Katastrophen lähmen, während lokale Handlungsoptionen aktivieren.",
      },
      {
        id: 4,
        question: "Warum ist kollektives Handeln psychologisch wirksamer als individueller Konsumverzicht?",
        options: [
          "Kollektives Handeln hat geringere Kosten für Einzelpersonen.",
          "Das Gefühl, Teil einer Bewegung zu sein, stärkt die Handlungsbereitschaft.",
          "Kollektives Handeln wird von Medien stärker beachtet.",
        ],
        correct: 1,
        explanation:
          "'Teil einer Bewegung zu sein stärkt Handlungsbereitschaft' — soziale Zugehörigkeit ist ein stärkerer Motivator als individuelles Pflichtgefühl.",
      },
      {
        id: 5,
        question: "Welche Klimamaßnahmen sind laut dem Vortrag leichter zu kommunizieren?",
        options: [
          "Maßnahmen, die rein altruistische Opfer erfordern",
          "Maßnahmen, die sowohl dem Klima als auch der persönlichen Gesundheit nützen",
          "Maßnahmen mit hohen wirtschaftlichen Kosten",
        ],
        correct: 1,
        explanation:
          "'Maßnahmen, die Klima und persönliche Gesundheit verbinden, wie Radfahren' — Co-Benefits machen Verhaltensänderungen attraktiver.",
      },
    ],
    xp: 75,
  },

  {
    id: 28,
    type: "informationen",
    typeLabel: "Wissenschaftlicher Vortrag",
    typeLabelTr: "Bilimsel Konuşma",
    title: "Sprachenpolitik und Minderheitensprachen",
    difficulty: 3,
    audioText:
      "Sprachliche Vielfalt ist ein globales Erbe — und ein bedrohtes. Linguisten schätzen, dass von den rund siebentausend Sprachen der Welt bis zum Ende des einundzwanzigsten Jahrhunderts die Hälfte aussterben könnte. Sprachsterben ist kein Naturphänomen, sondern das Ergebnis von Machtverhältnissen: Sprachen dominanter Gruppen werden in Bildung, Verwaltung und Medien durchgesetzt, während Minderheitensprachen marginalisiert werden. Europa hat dafür ein Rahmenabkommen: die Europäische Charta der Regional- oder Minderheitensprachen, die Staaten verpflichtet, anerkannte Minderheitensprachen in Bildung und öffentlichem Leben zu fördern. In Deutschland sind Sorbisch, Dänisch, Niederdeutsch, Romanes und Friesisch anerkannte Minderheitensprachen. Das Konzept der 'Sprachlichen Menschenrechte' — entwickelt u.a. von der finnischen Linguistin Tove Skutnabb-Kangas — argumentiert, dass jeder Mensch das Recht hat, in seiner Muttersprache unterrichtet zu werden und öffentliche Dienstleistungen zu erhalten. 'Linguizismus' — sprachbasierte Diskriminierung — wird in dieser Perspektive als Form struktureller Gewalt betrachtet. Die Digitalisierung hat ambivalente Auswirkungen: Einerseits dominieren einige wenige Sprachen das Internet, was die Marginalisierung kleiner Sprachen verstärkt. Andererseits ermöglicht das Netz die Dokumentation und Wiederbelebung bedrohter Sprachen — durch Apps, digitale Archive und globale Sprachgemeinschaften.",
    instruction:
      "Sie hören einen Vortrag über Sprachenpolitik. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Wie viele Sprachen könnten laut Linguisten bis Ende des 21. Jahrhunderts aussterben?",
        options: [
          "Etwa ein Viertel der rund 7.000 Sprachen",
          "Etwa die Hälfte der rund 7.000 Sprachen",
          "Fast alle der rund 7.000 Sprachen",
        ],
        correct: 1,
        explanation:
          "'die Hälfte der rund 7.000 Sprachen könnte aussterben' — Sprachensterben ist eine der größten kulturellen Bedrohungen.",
      },
      {
        id: 2,
        question: "Was verpflichtet die Europäische Charta der Regional- oder Minderheitensprachen die Staaten?",
        options: [
          "Alle Bürger müssen eine Minderheitensprache lernen.",
          "Anerkannte Minderheitensprachen müssen in Bildung und öffentlichem Leben gefördert werden.",
          "Minderheitensprachen müssen als offizielle Staatssprachen anerkannt werden.",
        ],
        correct: 1,
        explanation:
          "'Staaten verpflichtet, anerkannte Minderheitensprachen in Bildung und öffentlichem Leben zu fördern' — die Charta schützt, verpflichtet aber nicht zur vollständigen Gleichstellung.",
      },
      {
        id: 3,
        question: "Welche Sprachen sind in Deutschland anerkannte Minderheitensprachen?",
        options: [
          "Türkisch, Arabisch und Polnisch",
          "Sorbisch, Dänisch, Niederdeutsch, Romanes und Friesisch",
          "Französisch, Niederländisch und Tschechisch",
        ],
        correct: 1,
        explanation:
          "'Sorbisch, Dänisch, Niederdeutsch, Romanes und Friesisch' — das sind die offiziell anerkannten Minderheitensprachen in Deutschland.",
      },
      {
        id: 4,
        question: "Was versteht man unter 'Linguizismus'?",
        options: [
          "Eine Methode zur Sprachanalyse in der Linguistik",
          "Sprachbasierte Diskriminierung als Form struktureller Gewalt",
          "Ein Programm zur Förderung von Mehrsprachigkeit",
        ],
        correct: 1,
        explanation:
          "'Linguizismus — sprachbasierte Diskriminierung als strukturelle Gewalt' — analog zu Rassismus beschreibt er Ungleichbehandlung aufgrund der Sprache.",
      },
      {
        id: 5,
        question: "Welche ambivalente Wirkung hat die Digitalisierung auf Minderheitensprachen?",
        options: [
          "Die Digitalisierung schadet Minderheitensprachen ausschließlich.",
          "Einerseits dominieren wenige Sprachen das Internet, andererseits ermöglicht das Netz Dokumentation und Wiederbelebung.",
          "Die Digitalisierung führt zu vollständiger sprachlicher Gleichstellung im Internet.",
        ],
        correct: 1,
        explanation:
          "'Einerseits Dominanz weniger Sprachen, andererseits Dokumentation und Wiederbelebung' — Digitalisierung ist kein eindeutiger Segen oder Fluch für Minderheitensprachen.",
      },
    ],
    xp: 75,
  },

  {
    id: 29,
    type: "informationen",
    typeLabel: "Wissenschaftlicher Vortrag",
    typeLabelTr: "Bilimsel Konuşma",
    title: "Schule der Zukunft und digitales Lernen",
    difficulty: 3,
    audioText:
      "Die Schule der Zukunft ist ein vieldiskutiertes Thema — und die Corona-Pandemie hat Digitalisierungslücken im deutschen Bildungssystem schonungslos offengelegt. Während Länder wie Estland seit Jahren auf digitale Bildungsinfrastruktur setzen, kämpften deutsche Schulen noch zwanzigjahre nach der Jahrtausendwende mit fehlenden Endgeräten und instabilen WLAN-Verbindungen. Dabei ist 'Digitalisierung der Schule' mehr als Laptops im Klassenzimmer. Es geht um eine grundlegende pädagogische Transformation: Weg von der Wissensübertragung hin zur Kompetenzentwicklung. Wissen ist heute frei verfügbar — Google, Wikipedia, KI-Assistenten. Die Schule der Zukunft muss vermitteln, wie man mit Wissen umgeht: Quellen beurteilen, kritisch denken, kollaborieren, kreativ lösen. Das finnische Bildungssystem gilt als Vorbild: weniger Frontalunterricht, mehr projektbasiertes Lernen, individualisierte Förderung und Lehrer als Lernbegleiter statt Wissensvermittler. Allerdings ist das finnische Modell nicht einfach übertragbar — es setzt gesellschaftliche Wertschätzung für Bildung und Lehrerberufe voraus, die nicht überall vorhanden ist. Adaptive Lernsoftware — KI-gestützte Systeme, die den Lernpfad an individuelle Stärken und Schwächen anpassen — bietet enorme Chancen. Aber sie birgt auch Risiken: Datenschutz, algorithmische Diskriminierung und die Gefahr, dass Bildung zum individualisierten Konsumerlebnis verkommt statt sozialer Erfahrung zu bleiben.",
    instruction:
      "Sie hören einen Vortrag über Bildung und Digitalisierung. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Was hat die Corona-Pandemie im deutschen Bildungssystem offengelegt?",
        options: [
          "Einen Mangel an qualifizierten Lehrern in den MINT-Fächern",
          "Erhebliche Digitalisierungslücken in der Infrastruktur",
          "Zu geringe Investitionen in Sportstätten und Schulgebäude",
        ],
        correct: 1,
        explanation:
          "'Digitalisierungslücken schonungslos offengelegt — fehlende Endgeräte, instabiles WLAN' — die Pandemie zeigte Deutschlands digitalen Rückstand.",
      },
      {
        id: 2,
        question: "Was ist laut dem Vortrag die eigentliche Aufgabe der Schule der Zukunft?",
        options: [
          "Schülern möglichst viel Faktenwissen zu vermitteln",
          "Kompetenzentwicklung — Umgang mit Wissen, kritisches Denken, Kollaboration",
          "Ausschließlich digitale Werkzeuge in den Unterricht zu integrieren",
        ],
        correct: 1,
        explanation:
          "'Weg von Wissensübertragung hin zu Kompetenzentwicklung' — Wissen ist frei verfügbar; Schulen müssen Umgang mit Wissen lehren.",
      },
      {
        id: 3,
        question: "Warum ist das finnische Bildungsmodell nicht einfach übertragbar?",
        options: [
          "Es ist zu kostspielig für andere Länder.",
          "Es setzt gesellschaftliche Wertschätzung für Bildung und Lehrerberufe voraus.",
          "Es funktioniert nur in kleinen, homogenen Gesellschaften.",
        ],
        correct: 1,
        explanation:
          "'setzt gesellschaftliche Wertschätzung für Bildung und Lehrerberufe voraus' — strukturelle Voraussetzungen fehlen in vielen Ländern.",
      },
      {
        id: 4,
        question: "Was ist adaptive Lernsoftware?",
        options: [
          "Software, die Noten automatisch berechnet",
          "KI-gestützte Systeme, die den Lernpfad an individuelle Stärken und Schwächen anpassen",
          "Programme zur automatischen Unterrichtsvorbereitung für Lehrer",
        ],
        correct: 1,
        explanation:
          "'KI-gestützte Systeme, die Lernpfad an Stärken und Schwächen anpassen' — adaptive Software individualisiert den Lernprozess.",
      },
      {
        id: 5,
        question: "Welches Risiko adaptiver Lernsoftware nennt der Vortrag?",
        options: [
          "Zu hohe Kosten für Schulen",
          "Bildung könnte zum individualisierten Konsumerlebnis statt sozialer Erfahrung werden",
          "Lehrer werden vollständig durch Software ersetzt",
        ],
        correct: 1,
        explanation:
          "'Bildung als individualisiertes Konsumerlebnis statt sozialer Erfahrung' — das ist ein zentrales Risiko der Überdigitalisierung.",
      },
    ],
    xp: 75,
  },

  {
    id: 30,
    type: "informationen",
    typeLabel: "Wissenschaftlicher Vortrag",
    typeLabelTr: "Bilimsel Konuşma",
    title: "Postkolonialismus und globale Wissenssysteme",
    difficulty: 3,
    audioText:
      "Postkoloniale Theorie beschäftigt sich mit den anhaltenden Auswirkungen des Kolonialismus auf Kultur, Wissen und Machtverhältnisse. Der Literaturwissenschaftler Edward Said prägte mit seinem Werk 'Orientalismus' einen Schlüsselbegriff: die Konstruktion des 'Orients' durch westliche Wissenschaft und Literatur als das Fremde, das Irrationale, das der westlichen Rationalität gegenübergestellt wird. Diese Darstellung diente nicht nur der Beschreibung, sondern der Legitimation von Herrschaft. Homi Bhabha erweiterte die Analyse um das Konzept der 'Hybridität': Kolonisierte Kulturen übernehmen Elemente der Kolonialmacht, transformieren sie aber und schaffen etwas Neues — keine reine Übernahme, keine reine Ablehnung. Gayatri Spivak stellte die radikale Frage: 'Können die Subalternen sprechen?' — können also die Unterdrückten ihre Erfahrungen in Begriffen ausdrücken, die innerhalb dominanter Wissenssysteme anerkannt werden? Ihre Antwort war ernüchternd: Die vorhandenen Sprachen und Kategorien sind selbst Produkte kolonialer Machtverhältnisse. Im akademischen Kontext manifestiert sich das als 'Epistemischer Kolonialismus': Wessen Wissen gilt als universell? Westliche wissenschaftliche Methoden und Kategorien sind als Norm gesetzt, während andere Wissensformen — indigenes Wissen, lokale Ontologien — marginalisiert werden. 'Dekolonisierung des Wissens' ist deshalb ein wachsendes Projekt: Lehrpläne, Bibliotheken und Forschungsagenden sollen vielfältigere Wissenstraditionen einbeziehen.",
    instruction:
      "Sie hören einen Vortrag über Postkolonialismus. Wählen Sie die richtige Antwort.",
    questions: [
      {
        id: 1,
        question: "Was beschreibt Edward Saids Begriff des 'Orientalismus'?",
        options: [
          "Eine geografische Studie über asiatische Kulturen",
          "Die Konstruktion des 'Orients' durch westliche Wissenschaft als das Fremde und Irrationale",
          "Eine Bewegung zur Förderung des kulturellen Austauschs zwischen Ost und West",
        ],
        correct: 1,
        explanation:
          "'Konstruktion des Orients als das Fremde, Irrationale — zur Legitimation von Herrschaft' — Orientalismus ist kein neutrales Wissen, sondern Machtausübung.",
      },
      {
        id: 2,
        question: "Was versteht Homi Bhabha unter 'Hybridität'?",
        options: [
          "Die vollständige Übernahme der Kolonialkutur durch die Kolonisierten",
          "Die vollständige Ablehnung westlicher Einflüsse",
          "Die Entstehung von etwas Neuem durch Transformation kolonialer Elemente",
        ],
        correct: 2,
        explanation:
          "'weder reine Übernahme noch reine Ablehnung — etwas Neues entsteht' — Hybridität beschreibt den kreativen Transformationsprozess kolonisierter Kulturen.",
      },
      {
        id: 3,
        question: "Was fragt Gayatri Spivak mit 'Können die Subalternen sprechen?'",
        options: [
          "Ob Unterdrückte politische Rechte haben",
          "Ob Unterdrückte ihre Erfahrungen in Begriffen ausdrücken können, die dominante Systeme anerkennen",
          "Ob kolonisierte Länder internationale Gremien beeinflussen können",
        ],
        correct: 1,
        explanation:
          "'Können Unterdrückte ihre Erfahrungen in anerkannten Begriffen ausdrücken?' — Spivak zeigt, dass die Sprache selbst kolonial geprägt ist.",
      },
      {
        id: 4,
        question: "Was versteht man unter 'Epistemischem Kolonialismus'?",
        options: [
          "Die physische Kontrolle über Bildungsinstitutionen durch Kolonialmächte",
          "Die Setzung westlicher wissenschaftlicher Methoden als universelle Norm, während andere Wissensformen marginalisiert werden",
          "Die wirtschaftliche Abhängigkeit von Entwicklungsländern von westlichen Universitäten",
        ],
        correct: 1,
        explanation:
          "'Westliche Methoden als Norm — andere Wissensformen marginalisiert' — epistemischer Kolonialismus betrifft die Machtstrukturen im Wissensbereich.",
      },
      {
        id: 5,
        question: "Was bedeutet 'Dekolonisierung des Wissens'?",
        options: [
          "Die vollständige Ablehnung westlicher Wissenschaft",
          "Die Einbeziehung vielfältigerer Wissenstraditionen in Lehrpläne, Bibliotheken und Forschungsagenden",
          "Die Rückgabe physischer Kulturgüter an ihre Ursprungsländer",
        ],
        correct: 1,
        explanation:
          "'Lehrpläne, Bibliotheken, Forschungsagenden sollen vielfältigere Wissenstraditionen einbeziehen' — Dekolonisierung des Wissens ist keine Ablehnung, sondern Erweiterung.",
      },
    ],
    xp: 75,
  },
];

// ── Accessor helpers ──────────────────────────────────────────────────────────

const LEVEL_DATA: Record<string, HorenTeil[]> = {
  a1: A1_TEILE,
  a2: A2_TEILE,
  b1: B1_TEILE,
  b2: B2_TEILE,
  c1: C1_TEILE,
};

export function getHorenTeile(level: string): HorenTeil[] {
  return LEVEL_DATA[level.toLowerCase()] ?? [];
}

export function getHorenTeil(level: string, id: number): HorenTeil | undefined {
  return getHorenTeile(level).find((t) => t.id === id);
}

// ── Progress (localStorage) ───────────────────────────────────────────────────

export function loadHorenProgress(level: string): HorenProgress {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(`horen-progress-${level}`) ?? "{}");
  } catch {
    return {};
  }
}

export function saveHorenProgress(
  level: string,
  teilId: number,
  score: number,
  total: number
) {
  if (typeof window === "undefined") return;
  const prev = loadHorenProgress(level);
  localStorage.setItem(
    `horen-progress-${level}`,
    JSON.stringify({ ...prev, [teilId]: { score, total } })
  );
}
