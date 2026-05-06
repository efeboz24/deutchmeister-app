/**
 * Curriculum content map — keyed by unit name (matches DB).
 * Used by the learn/[levelId]/[unitId] page to render educational content.
 */

export interface GrammarTopic {
  topic: string;
  explanation: string;
  examples: { de: string; tr: string }[];
  /** Optional table (e.g. conjugation table) rendered after examples */
  table?: { headers: string[]; rows: string[][] };
}

export interface UnitCurriculum {
  focus: string;
  kommunikation: string[];
  grammatik: GrammarTopic[];
  tipps: string[];
}

export const CURRICULUM: Record<string, UnitCurriculum> = {
  // ─── A1 ──────────────────────────────────────────────────────────────────

  "Ünite 1: Hallo! Wie geht's?": {
    focus: "Tanışma, Selamlaşma ve Temel İletişim",
    kommunikation: [
      "Günün farklı saatlerinde doğru selamlama formunu kullanma (Guten Morgen / Tag / Abend)",
      "Kendinizi ve başkalarını tanıtma: isim, memleket, dil",
      "Hal hatır sorma ve cevap verme (Wie geht es Ihnen? / Danke, gut!)",
      "Almanca harfleri seslendirme (Buchstabieren)",
      "0-20 arası sayıları kullanma",
    ],
    grammatik: [
      {
        topic: "Aussagesatz & W-Fragen",
        explanation:
          "Almancada temel cümle düzeni: Özne (Subjekt) + Fiil (Verb) + Nesne/Tamamlayıcı. Soru cümlelerinde fiil öne gelir.",
        examples: [
          { de: "Ich heiße Anna.", tr: "Benim adım Anna." },
          { de: "Wie heißen Sie?", tr: "Adınız nedir? (resmi)" },
          { de: "Woher kommen Sie?", tr: "Nerelisiniz?" },
          { de: "Was sprechen Sie?", tr: "Ne konuşuyorsunuz?" },
        ],
      },
      {
        topic: "Verbkonjugation: sein & heißen",
        explanation:
          "'sein' (olmak) Almancada en temel fiildir ve düzensiz çekime sahiptir. 'heißen' ise adını söylemek için kullanılır.",
        examples: [
          { de: "Ich bin Student.", tr: "Ben öğrenciyim." },
          { de: "Er ist aus Deutschland.", tr: "O Almanya'dan." },
          { de: "Wir sind Freunde.", tr: "Biz arkadaşız." },
          { de: "Sie heißt Maria.", tr: "Onun adı Maria." },
        ],
        table: {
          headers: ["Şahıs", "sein (olmak)", "heißen (adı olmak)"],
          rows: [
            ["ich", "bin", "heiße"],
            ["du", "bist", "heißt"],
            ["er / sie / es", "ist", "heißt"],
            ["wir", "sind", "heißen"],
            ["ihr", "seid", "heißt"],
            ["sie / Sie", "sind", "heißen"],
          ],
        },
      },
      {
        topic: "Personalpronomen",
        explanation:
          "Almancada resmi 'Sie' (büyük harf) ile samimi 'du' arasındaki fark önemlidir. İş, yabancı ve yaşlılara 'Sie' kullanılır.",
        examples: [
          { de: "ich – du – er/sie/es", tr: "ben – sen – o" },
          { de: "wir – ihr – sie/Sie", tr: "biz – siz (samimi) – onlar/Siz" },
          { de: "Sind Sie Herr Müller?", tr: "Siz Bay Müller misiniz?" },
          { de: "Bist du müde?", tr: "Yorgun musun?" },
        ],
        table: {
          headers: ["Şahıs Zamiri", "Türkçe", "Kullanım"],
          rows: [
            ["ich", "ben", "her zaman"],
            ["du", "sen", "arkadaş / aile (samimi)"],
            ["er / sie / es", "o (erkek / kadın / nesne)", "her zaman"],
            ["wir", "biz", "her zaman"],
            ["ihr", "siz", "birden fazla kişiye samimi"],
            ["sie", "onlar", "her zaman"],
            ["Sie", "Siz (resmi)", "yabancı, iş, büyükler"],
          ],
        },
      },
    ],
    tipps: [
      "💡 Almancada büyük harf önemlidir: 'Sie' (Siz - resmi) vs 'sie' (o/onlar).",
      "💡 Almanya'da tanışırken genellikle el sıkışılır, isim söylenir.",
      "💡 'Wie geht's?' günlük; 'Wie geht es Ihnen?' resmi ortamlarda kullanılır.",
    ],
  },

  "Ünite 2: Freunde, Familie und ich": {
    focus: "Aile, Arkadaşlar ve Meslekler",
    kommunikation: [
      "Aile üyelerini tanıtma ve ilişkilerini açıklama",
      "Meslek ve çalışma yeri hakkında konuşma",
      "20-1000 arası sayıları kullanma, yaş ve telefon numarası söyleme",
      "Kişisel bilgi formu doldurma (Ad, adres, doğum tarihi)",
    ],
    grammatik: [
      {
        topic: "Artikel: der / die / das",
        explanation:
          "Almancada her ismin bir grammatikal cinsiyeti vardır: eril (der), dişil (die), nötr (das). Bu cinsiyet kelimeyle birlikte ezberlenmelidir.",
        examples: [
          { de: "der Vater, die Mutter, das Kind", tr: "baba, anne, çocuk" },
          { de: "der Bruder, die Schwester", tr: "erkek kardeş, kız kardeş" },
          { de: "der Beruf, die Arbeit, das Büro", tr: "meslek, iş, ofis" },
          { de: "ein Mann, eine Frau, ein Kind", tr: "bir adam, bir kadın, bir çocuk" },
        ],
        table: {
          headers: ["Cinsiyet", "Belirli Artikel", "Belirsiz Artikel", "Örnek"],
          rows: [
            ["Eril (maskulin)", "der", "ein", "der Vater / ein Vater"],
            ["Dişil (feminin)", "die", "eine", "die Mutter / eine Mutter"],
            ["Nötr (neutral)", "das", "ein", "das Kind / ein Kind"],
            ["Çoğul (Plural)", "die", "—", "die Kinder"],
          ],
        },
      },
      {
        topic: "Possessivartikel: mein / dein",
        explanation:
          "İyelik zamirleri 'mein' (benim) ve 'dein' (senin) ismin cinsiyetine göre çekilir.",
        examples: [
          { de: "mein Vater, meine Mutter, mein Kind", tr: "babam, annem, çocuğum" },
          { de: "dein Bruder, deine Schwester", tr: "erkek kardeşin, kız kardeşin" },
          { de: "Das ist mein Freund Tom.", tr: "Bu benim arkadaşım Tom." },
        ],
      },
      {
        topic: "Negation: nicht & kein",
        explanation:
          "'kein' artikelsiz isimleri olumsuzlar. 'nicht' fiilleri, sıfatları ve belirli artikelli isimleri olumsuzlar.",
        examples: [
          { de: "Ich bin kein Arzt.", tr: "Ben doktor değilim." },
          { de: "Er hat keine Schwester.", tr: "Onun kız kardeşi yok." },
          { de: "Sie kommt nicht heute.", tr: "O bugün gelmiyor." },
          { de: "Das ist nicht richtig.", tr: "Bu doğru değil." },
        ],
      },
    ],
    tipps: [
      "💡 Her yeni kelimeyi artikeli ile birlikte öğrenin: DER Mann, DIE Frau, DAS Kind.",
      "💡 Almanya'da meslekler genellikle cinsiyete göre değişir: Lehrer (erkek öğretmen) / Lehrerin (kadın öğretmen).",
    ],
  },

  "Ünite 3: Essen und Trinken": {
    focus: "Yiyecekler, İçecekler ve Restoran",
    kommunikation: [
      "Markette ve pazarda alışveriş yapma, fiyat sorma",
      "Gıda maddelerini ve miktarları ifade etme (ein Kilo, eine Flasche)",
      "Restoranda sipariş verme ve hesap isteme",
      "Beğeni ve tercih bildirme: mögen / möchten farkı",
    ],
    grammatik: [
      {
        topic: "Akkusativ (İsmin -i hali)",
        explanation:
          "Fiilden doğrudan etkilenen nesne Akkusativ alır. Yalnızca eril 'der' → 'den' olarak değişir.",
        examples: [
          { de: "Ich kaufe den Apfel. (der Apfel)", tr: "Elmayı satın alıyorum." },
          { de: "Wir essen eine Pizza.", tr: "Biz pizza yiyoruz." },
          { de: "Er trinkt keinen Kaffee.", tr: "O kahve içmiyor." },
          { de: "Ich möchte einen Tee, bitte.", tr: "Bir çay istiyorum, lütfen." },
        ],
        table: {
          headers: ["Cinsiyet", "Nominativ", "Akkusativ", "Değişim"],
          rows: [
            ["Eril (der)", "der / ein / kein", "den / einen / keinen", "✓ Değişir"],
            ["Dişil (die)", "die / eine / keine", "die / eine / keine", "✗ Değişmez"],
            ["Nötr (das)", "das / ein / kein", "das / ein / kein", "✗ Değişmez"],
            ["Çoğul (die)", "die / — / keine", "die / — / keine", "✗ Değişmez"],
          ],
        },
      },
      {
        topic: "Pluralformen (Çoğul)",
        explanation:
          "Almancada çoğul ekler düzensizdir, kelimeyle birlikte öğrenilmelidir. Çoğulda daima 'die' kullanılır.",
        examples: [
          { de: "der Apfel → die Äpfel", tr: "elma → elmalar" },
          { de: "das Brot → die Brote", tr: "ekmek → ekmekler" },
          { de: "die Flasche → die Flaschen", tr: "şişe → şişeler" },
          { de: "das Kind → die Kinder", tr: "çocuk → çocuklar" },
        ],
      },
      {
        topic: "mögen vs. möchten",
        explanation:
          "'mögen' genel bir beğeniyi ifade eder (sevmek). 'möchten' ise anlık bir istek belirtir (istemek).",
        examples: [
          { de: "Ich mag Schokolade.", tr: "Çikolatayı severim." },
          { de: "Ich mag keinen Kaffee.", tr: "Kahveyi sevmiyorum." },
          { de: "Ich möchte einen Kaffee.", tr: "Bir kahve istiyorum (şu an)." },
          { de: "Was möchten Sie trinken?", tr: "Ne içmek istersiniz?" },
        ],
      },
    ],
    tipps: [
      "💡 'möchten' (istemek) restoranlar ve kafelerde en çok kullanılan kalıptır.",
      "💡 Almanya'da hesap istmek için 'Zahlen bitte!' veya 'Die Rechnung bitte!' dersiniz.",
      "💡 Pazar alışverişlerinde fiyatlar genellikle 'Euro achtzig' gibi söylenir.",
    ],
  },

  "Ünite 4: Mein Tag": {
    focus: "Günlük Rutin, Saatler ve Zaman",
    kommunikation: [
      "Resmi ve gayriresmi saat ifadeleri (Es ist halb drei / 14:30)",
      "Günlük rutini anlatma: sabahtan akşama kadar aktiviteler",
      "Günler, aylar ve mevsimleri söyleme",
      "Randevu oluşturma ve zaman üzerinde anlaşma",
    ],
    grammatik: [
      {
        topic: "Trennbare Verben (Ayrılabilen Fiiller)",
        explanation:
          "Bazı fiillerin önekleri (auf-, an-, ab-, ein-...) cümle sonuna gider. Bu fiiller öğrenilirken parça parça değil, bütün olarak ezberlenmelidir.",
        examples: [
          { de: "Ich stehe um 7 Uhr auf.", tr: "Saat 7'de kalkıyorum. (aufstehen)" },
          { de: "Er ruft seine Mutter an.", tr: "Annesini arıyor. (anrufen)" },
          { de: "Wir fangen um 9 an.", tr: "Saat 9'da başlıyoruz. (anfangen)" },
          { de: "Sie zieht sich an.", tr: "O giyiniyor. (sich anziehen)" },
        ],
      },
      {
        topic: "Temporale Präpositionen",
        explanation:
          "Zaman bildiren edatlar: um (saat için), am (gün/sabah/akşam için), im (ay/mevsim için), von...bis (başlangıç-bitiş).",
        examples: [
          { de: "um 8 Uhr", tr: "saat 8'de" },
          { de: "am Montag, am Morgen", tr: "Pazartesi, sabah" },
          { de: "im Januar, im Sommer", tr: "Ocak'ta, yazın" },
          { de: "von 9 bis 17 Uhr", tr: "sabah 9'dan akşam 5'e kadar" },
        ],
      },
      {
        topic: "Satzklammer (Cümle Çerçevesi)",
        explanation:
          "Ayrılabilen fiillerin öneki her zaman cümlenin en sonuna gider. Bu yapıya 'Satzklammer' denir.",
        examples: [
          { de: "Ich stehe morgens früh auf.", tr: "Sabahları erken kalkıyorum." },
          { de: "Er kommt um 18 Uhr nach Hause zurück.", tr: "Saat 18'de eve dönüyor." },
        ],
      },
    ],
    tipps: [
      "💡 Almancada resmi saatler 24 saat formatında söylenir: 'vierzehn Uhr dreißig' (14:30).",
      "💡 Gayriresmi: 'halb drei' = 2:30 (üçün yarısı, yani 2:30!). Dikkat: halb üç = 2:30, 3:30 değil.",
      "💡 Trennbare fiillerin önekini cümle sonuna taşımayı unutmayın!",
    ],
  },

  "Ünite 5: Unterwegs": {
    focus: "Ulaşım ve Yön Tarifi",
    kommunikation: [
      "Toplu taşıma araçlarını kullanma ve bilet alma",
      "Yol sorma ve tarif etme (geradeaus, links, rechts)",
      "Şehirdeki önemli yerleri ve binaları tarif etme",
      "Uzaklık ve süre ifade etme",
    ],
    grammatik: [
      {
        topic: "Lokale Präpositionen",
        explanation:
          "Konum ve yön bildiren edatlar. 'nach' ülke/şehir için, 'zu' kişi/yer için, 'in' bina içi için kullanılır.",
        examples: [
          { de: "Ich fahre nach Berlin.", tr: "Berlin'e gidiyorum." },
          { de: "Ich gehe zum Bahnhof. (zu dem)", tr: "İstasyona gidiyorum." },
          { de: "Sie geht in die Bank.", tr: "Bankaya giriyor." },
          { de: "Er wohnt in der Nähe.", tr: "Yakında oturuyor." },
        ],
      },
      {
        topic: "Präteritum: sein & haben",
        explanation:
          "Günlük yazılı ve sözlü dilde 'sein' (war) ve 'haben' (hatte) Präteritum ile kullanılır.",
        examples: [
          { de: "Ich war gestern in Berlin.", tr: "Dün Berlin'deydim." },
          { de: "Er hatte keine Zeit.", tr: "Onun zamanı yoktu." },
          { de: "Wir waren im Urlaub.", tr: "Tatildeydik." },
        ],
      },
      {
        topic: "Indefinitpronomen: man",
        explanation:
          "'man' genel bir özne olarak kullanılır, Türkçedeki 'insan, kişi, biri' anlamına gelir. Her zaman tekil fiil alır.",
        examples: [
          { de: "Man kann hier parken.", tr: "Buraya park edebilirsiniz/edilir." },
          { de: "Man nimmt die U-Bahn.", tr: "Metro alınır / metro ile gidilir." },
          { de: "Was kann man hier machen?", tr: "Burada ne yapılabilir?" },
        ],
      },
    ],
    tipps: [
      "💡 'zu Fuß gehen' = yürümek. Almancada ulaşım için 'fahren' (araç), 'gehen' (yaya) ayrımı önemlidir.",
      "💡 'Entschuldigung, wie komme ich zum/zur...?' yön sormak için standart kalıptır.",
    ],
  },

  "Ünite 6: Zuhause": {
    focus: "Ev, Odalar ve Konut",
    kommunikation: [
      "Evi ve odaları tanımlama",
      "Mobilyaları ve ev eşyalarını isimlendirme",
      "Kiralık ilan okuma ve ev arama",
      "Bir nesnenin nerede olduğunu söyleme (auf dem Tisch, an der Wand)",
    ],
    grammatik: [
      {
        topic: "Wechselpräpositionen + Dativ (Wo?)",
        explanation:
          "in, an, auf, unter, über, vor, hinter, neben, zwischen — bu 9 edat konum (Wo? → Dativ) ve hareket (Wohin? → Akkusativ) sorusuna göre farklı hal alır.",
        examples: [
          { de: "Das Buch liegt auf dem Tisch.", tr: "Kitap masanın üstünde. (Wo? → Dativ)" },
          { de: "Die Lampe hängt an der Wand.", tr: "Lamba duvarda asılı." },
          { de: "Der Hund sitzt neben dem Sofa.", tr: "Köpek koltucun yanında oturuyor." },
        ],
      },
      {
        topic: "es gibt + Akkusativ",
        explanation:
          "'es gibt' yapısı 'var olmak' anlamında kullanılır ve her zaman Akkusativ alır.",
        examples: [
          { de: "Es gibt ein Schlafzimmer.", tr: "Bir yatak odası var." },
          { de: "Es gibt keinen Balkon.", tr: "Balkon yok." },
          { de: "Was gibt es in deiner Stadt?", tr: "Şehrinde ne var?" },
        ],
      },
    ],
    tipps: [
      "💡 Wo? (nerede) → Dativ | Wohin? (nereye) → Akkusativ. Bu ayrım çok önemli!",
      "💡 Almanya'da kiralık ilanlar için 'WG' (Wohngemeinschaft = ortak ev) kavramı çok yaygındır.",
    ],
  },

  // ─── A2 ──────────────────────────────────────────────────────────────────

  "Ünite 1: In der Stadt unterwegs": {
    focus: "Şehirde Ulaşım ve Yön",
    kommunikation: [
      "Şehir içinde yol sorma ve detaylı tarif etme",
      "Tren / otobüs / metro biletleri alma ve duyuruları anlama",
      "Önemli binaları ve yerleri tanımlama",
      "Bilet fiyatlarını karşılaştırma",
    ],
    grammatik: [
      {
        topic: "Präteritum: war & hatte",
        explanation:
          "Yazılı anlatımda ve geçmiş olayları anlatırken sein (war) ve haben (hatte) Präteritum ile kullanılır. Perfekt'ten farklı olarak daha resmi bir üsluptur.",
        examples: [
          { de: "Ich war gestern in der Schule.", tr: "Dün okuldaydım." },
          { de: "Sie hatte keine Fahrkarte.", tr: "Bileti yoktu." },
          { de: "Das war ein langer Tag.", tr: "Uzun bir gündü." },
        ],
      },
      {
        topic: "Lokale Präpositionen: nach / zu / vorbei an",
        explanation:
          "Yön belirtirken: 'nach' ülke/şehir, 'zu' belirli yer/kişi, 'vorbei an' (yanından geçmek) için.",
        examples: [
          { de: "Fahren Sie nach Hamburg.", tr: "Hamburg'a gidin." },
          { de: "Gehen Sie zur Post. (zu der)", tr: "Postaneye gidin." },
          { de: "Gehen Sie am Park vorbei.", tr: "Parkın yanından geçin." },
          { de: "Biegen Sie links ab.", tr: "Sola dönün." },
        ],
      },
      {
        topic: "Indefinitpronomen: man",
        explanation:
          "Genel bir özne olarak 'man' her zaman tekil fiil alır ve pasif benzeri bir anlam taşır.",
        examples: [
          { de: "Man muss hier umsteigen.", tr: "Burada aktarma yapmak gerekiyor." },
          { de: "Man kann mit der S-Bahn fahren.", tr: "S-Bahn ile gidilebilir." },
        ],
      },
    ],
    tipps: [
      "💡 Almanya'da HVV, MVV, BVG gibi şehir içi ulaşım sistemleri haftalık/aylık abonelik sunar.",
      "💡 'Entschuldigung, wie lange dauert es bis zum Hauptbahnhof?' — pratik soru kalıbı.",
    ],
  },

  "Ünite 2: Rund um die Arbeit": {
    focus: "İş Hayatı ve Profesyonel İletişim",
    kommunikation: [
      "Günlük iş rutinini ve görevleri anlatma",
      "İş ilanlarını anlama ve iş görüşmesi diyalogları",
      "İş arkadaşlarıyla randevulaşma ve iletişim",
      "Teknik aletler ve ofis ekipmanlarını adlandırma",
    ],
    grammatik: [
      {
        topic: "Modalverben: müssen / dürfen / können",
        explanation:
          "Modal fiiller zorunluluk (müssen), izin (dürfen) ve yetenek/imkân (können) ifade eder. Fiil cümle sonuna mastar olarak gider.",
        examples: [
          { de: "Ich muss heute Überstunden machen.", tr: "Bugün fazla mesai yapmam gerekiyor." },
          { de: "Hier darf man nicht rauchen.", tr: "Burada sigara içilmez." },
          { de: "Kannst du mir helfen?", tr: "Bana yardım edebilir misin?" },
          { de: "Sie müssen um 9 Uhr da sein.", tr: "Saat 9'da orada olmanız gerekiyor." },
        ],
      },
      {
        topic: "Präpositionen mit Akkusativ: für / gegen / ohne",
        explanation:
          "'für' (için), 'gegen' (-e karşı / civarında), 'ohne' (olmadan) her zaman Akkusativ alır.",
        examples: [
          { de: "Ich arbeite für eine große Firma.", tr: "Büyük bir şirket için çalışıyorum." },
          { de: "Das Treffen ist gegen 14 Uhr.", tr: "Toplantı saat 14 civarında." },
          { de: "Ohne Computer kann ich nicht arbeiten.", tr: "Bilgisayarsız çalışamam." },
        ],
      },
      {
        topic: "Kausalsatz mit weil",
        explanation:
          "'weil' bağlacı neden-sonuç ilişkisi kurar ve yan cümlede fiili sona taşır.",
        examples: [
          { de: "Ich bin müde, weil ich viel gearbeitet habe.", tr: "Çok çalıştığım için yorgunum." },
          { de: "Er ist krank, weil er nicht geschlafen hat.", tr: "Uyumadığı için hasta." },
        ],
      },
    ],
    tipps: [
      "💡 İş görüşmelerinde 'Ich bin teamfähig und zuverlässig' (takım oyuncusuyum ve güvenilirim) gibi ifadeler çok kullanılır.",
      "💡 'Könnten Sie bitte...' — kibar rica için Konjunktiv II kullanımı profesyonel ortamlarda tercih edilir.",
    ],
  },

  "Ünite 3: Fit und gesund": {
    focus: "Sağlık, Vücut ve Spor",
    kommunikation: [
      "Vücudun bölümlerini isimlendirme",
      "Doktora şikayetini anlatma (Ich habe Kopfschmerzen.)",
      "Eczanede ilaç ve tavsiye alma",
      "Spor alışkanlıkları ve sağlıklı yaşam hakkında konuşma",
    ],
    grammatik: [
      {
        topic: "Imperativ (Emir Kipi)",
        explanation:
          "Tavsiye veya emir vermek için kullanılır. 'du' formu: fiil kökü (bazen +e), 'ihr' formu: normal çekim, 'Sie' formu: fiil + Sie.",
        examples: [
          { de: "Trink viel Wasser! (du)", tr: "Çok su iç!" },
          { de: "Schlafen Sie gut! (Sie)", tr: "İyi uyuyun!" },
          { de: "Esst mehr Gemüse! (ihr)", tr: "Daha fazla sebze yiyin!" },
          { de: "Ruh dich aus! (du)", tr: "Dinlen!" },
        ],
      },
      {
        topic: "Modalverb: sollen",
        explanation:
          "'sollen' başkasının verdiği görevi veya tavsiyeyi ifade eder. Doktorun verdiği talimatlar için idealdir.",
        examples: [
          { de: "Sie sollen viel trinken.", tr: "Çok su içmelisiniz (doktorun önerisi)." },
          { de: "Du sollst im Bett bleiben.", tr: "Yatakta kalmalısın." },
          { de: "Er soll Sport machen.", tr: "Spor yapması gerekiyor (tavsiye edildi)." },
        ],
      },
      {
        topic: "Possessivartikel im Dativ",
        explanation:
          "Dativ halinde iyelik zamirleri –em (eril/nötr) ve –er (dişil) eki alır.",
        examples: [
          { de: "Mein Kopf tut weh.", tr: "Başım ağrıyor." },
          { de: "Mir tut mein Rücken weh.", tr: "Sırtım ağrıyor." },
          { de: "Sie hilft ihrem Bruder.", tr: "Erkek kardeşine yardım ediyor." },
        ],
      },
    ],
    tipps: [
      "💡 Almanca'da ağrı için: 'Ich habe Schmerzen' veya 'Mir tut ... weh' kalıpları kullanılır.",
      "💡 Eczanede: 'Haben Sie etwas gegen Kopfschmerzen?' (Baş ağrısına karşı bir şeyiniz var mı?)",
    ],
  },

  "Ünite 4: Die liebe Familie": {
    focus: "Aile, Kutlamalar ve Geçmiş Anılar",
    kommunikation: [
      "Aile üyeleri arasındaki ilişkileri detaylı açıklama",
      "Doğum günü, düğün gibi özel günleri kutlama",
      "Geçmişte yaşanan olayları ve çocukluk anılarını anlatma",
      "Hediye alma ve verme diyalogları",
    ],
    grammatik: [
      {
        topic: "Perfekt (Geçmiş Zaman)",
        explanation:
          "Konuşma dilinde geçmişi ifade etmek için Perfekt kullanılır: haben/sein + Partizip II. Hareket ve durum değişikliği fiilleri 'sein' ile kullanılır.",
        examples: [
          { de: "Ich habe gegessen.", tr: "Yedim." },
          { de: "Er hat geschlafen.", tr: "Uyudu." },
          { de: "Wir sind nach Berlin gefahren.", tr: "Berlin'e gittik." },
          { de: "Sie ist aufgestanden.", tr: "O kalktı." },
        ],
      },
      {
        topic: "Dativ: Verben mit Dativobjekt",
        explanation:
          "Bazı fiiller Dativ nesne alır: helfen (yardım etmek), danken (teşekkür etmek), gratulieren (kutlamak), gefallen (hoşuna gitmek).",
        examples: [
          { de: "Ich helfe meiner Mutter.", tr: "Anneme yardım ediyorum." },
          { de: "Er dankt seinem Freund.", tr: "Arkadaşına teşekkür ediyor." },
          { de: "Ich gratuliere dir zum Geburtstag!", tr: "Doğum günün kutlu olsun!" },
          { de: "Das Geschenk gefällt mir sehr.", tr: "Hediye çok hoşuma gitti." },
        ],
      },
      {
        topic: "Personalpronomen im Dativ",
        explanation:
          "Dativ şahıs zamirleri: mir, dir, ihm, ihr, ihm, uns, euch, ihnen/Ihnen.",
        examples: [
          { de: "Kannst du mir helfen?", tr: "Bana yardım edebilir misin?" },
          { de: "Ich gebe dir das Geschenk.", tr: "Sana hediyeyi veriyorum." },
          { de: "Es geht ihm gut.", tr: "O iyi." },
          { de: "Wir schreiben ihnen einen Brief.", tr: "Onlara bir mektup yazıyoruz." },
        ],
      },
    ],
    tipps: [
      "💡 Hareket fiilleri (gehen, fahren, kommen, fliegen...) Perfekt'te 'sein' ile kullanılır.",
      "💡 'Herzlichen Glückwunsch zum Geburtstag!' — en yaygın doğum günü kutlama ifadesi.",
    ],
  },

  "Ünite 5: Alles für die Reise": {
    focus: "Tatil Planlama ve Seyahat",
    kommunikation: [
      "Tatil türleri ve tercihler hakkında konuşma",
      "Otel rezervasyonu yapma ve şikayet bildirme",
      "Gezilen yerler hakkında kartpostal veya kısa metin yazma",
      "Hava durumu tahmini ve seyahat kıyafetleri",
    ],
    grammatik: [
      {
        topic: "Präpositionen mit Dativ: mit / nach / von / zu",
        explanation:
          "Her zaman Dativ alan edatlar: mit (ile), nach (sonra/doğru), von (den/dan/ın), zu (için/doğru), bei (yanında), seit (beri), aus (den), gegenüber (karşısında).",
        examples: [
          { de: "Ich fahre mit dem Zug.", tr: "Trenle gidiyorum." },
          { de: "Nach dem Frühstück gehen wir.", tr: "Kahvaltıdan sonra gidiyoruz." },
          { de: "Das Hotel ist von hier weit.", tr: "Otel buradan uzak." },
          { de: "Ich gehe zum Strand.", tr: "Sahile gidiyorum." },
        ],
      },
      {
        topic: "Wechselpräpositionen: Wo? vs Wohin?",
        explanation:
          "9 Wechselpräposition (in, an, auf, unter, über, vor, hinter, neben, zwischen) konum için Dativ, yön için Akkusativ alır.",
        examples: [
          { de: "Das Handtuch liegt auf dem Bett. (Wo?→Dat)", tr: "Havlu yatağın üstünde." },
          { de: "Ich lege das Handtuch auf das Bett. (Wohin?→Akk)", tr: "Havluyu yatağın üstüne koyuyorum." },
          { de: "Das Hotel liegt am Strand. (Wo?)", tr: "Otel sahil kenarında." },
        ],
      },
      {
        topic: "Adjektive: Komparativ & Superlativ",
        explanation:
          "Karşılaştırma: Adjektiv + -er (daha). Üstünlük: am + Adjektiv + -sten (en). Düzensizler: gut → besser → am besten.",
        examples: [
          { de: "Das Hotel ist billiger als das andere.", tr: "Otel diğerinden daha ucuz." },
          { de: "Das ist das schönste Zimmer.", tr: "Bu en güzel oda." },
          { de: "Es ist wärmer hier als in Berlin.", tr: "Burada Berlin'den daha sıcak." },
        ],
      },
    ],
    tipps: [
      "💡 Otel şikayeti: 'Das Zimmer ist nicht sauber.' veya 'Die Dusche funktioniert nicht.'",
      "💡 Hava durumu: Es regnet (yağmur), Es schneit (kar), Es ist sonnig (güneşli), Es ist bewölkt (bulutlu).",
    ],
  },

  "Ünite 6: Medien im Alltag": {
    focus: "Teknoloji ve İletişim",
    kommunikation: [
      "TV programları, filmler ve sosyal medya kullanımı hakkında konuşma",
      "Teknolojik aletlerin avantaj ve dezavantajlarını tartışma",
      "Bilgisayar ve telefon ile ilgili teknik terimleri kullanma",
      "Haber ve kısa gazete yazılarını anlama",
    ],
    grammatik: [
      {
        topic: "Nebensatz mit dass",
        explanation:
          "'dass' bağlacı ile fikir, düşünce ve iddia belirtilir. Bağlaçlı yan cümle fiili sona atar.",
        examples: [
          { de: "Ich denke, dass das Internet wichtig ist.", tr: "İnternetin önemli olduğunu düşünüyorum." },
          { de: "Er sagt, dass er kein Handy hat.", tr: "Cep telefonu olmadığını söylüyor." },
          { de: "Ich finde, dass Social Media Vor- und Nachteile hat.", tr: "Sosyal medyanın artı ve eksileri olduğunu düşünüyorum." },
        ],
      },
      {
        topic: "Reflexivverben (Dönüşlü Fiiller)",
        explanation:
          "Reflexivverben 'sich' zamiriyle kullanılır. Almancada birçok dönüşlü fiil Türkçeden farklı anlamlara gelir.",
        examples: [
          { de: "Ich freue mich auf den Urlaub.", tr: "Tatile sevinerek bekliyorum." },
          { de: "Er interessiert sich für Technik.", tr: "Teknolojiyle ilgileniyor." },
          { de: "Sie informiert sich über die Nachrichten.", tr: "Haberlerden bilgi alıyor." },
          { de: "Wir unterhalten uns.", tr: "Sohbet ediyoruz." },
        ],
      },
      {
        topic: "Genitiv (Mülkiyet Bildirme)",
        explanation:
          "İsimlerin birbiriyle sahiplik ilişkisini Genitiv ile ifade ederiz. Eril/nötr isimler -s veya -es eki alır.",
        examples: [
          { de: "das Handy meines Vaters", tr: "babamın cep telefonu" },
          { de: "die Website der Schule", tr: "okulun web sitesi" },
          { de: "der Name des Programms", tr: "programın adı" },
        ],
      },
    ],
    tipps: [
      "💡 'Ich bin dafür / dagegen' — tartışmalarda 'lehinde / aleyhinde' ifade etmek için pratik kalıp.",
      "💡 'Einerseits... andererseits...' (bir yandan... öte yandan) Vor- und Nachteile tartışmak için harika bir yapı.",
    ],
  },

  // ─── B1 ──────────────────────────────────────────────────────────────────

  "Ünite 1: Beruf ve Alltag": {
    focus: "İş ve Günlük Yaşam",
    kommunikation: [
      "İş yerindeki görevleri ve sorumlulukları ayrıntılı anlatma",
      "Kronolojik olay örgüsüyle geçmişte yaşananları yazılı aktarma",
      "Resmi şikayet mektupları yazma ve cevap verme",
    ],
    grammatik: [
      {
        topic: "Präteritum (Yazılı Geçmiş Zaman)",
        explanation:
          "Yazılı dilde (gazete, roman, resmi metin) tüm fiiller Präteritum ile kullanılır. Düzenli fiiller: -te eki. Düzensiz fiiller ezberlenmelidir.",
        examples: [
          { de: "Er arbeitete täglich 10 Stunden.", tr: "Günde 10 saat çalışıyordu." },
          { de: "Sie schrieb einen Bericht.", tr: "Bir rapor yazdı." },
          { de: "Das Unternehmen wuchs schnell.", tr: "Şirket hızla büyüdü." },
        ],
      },
      {
        topic: "Plusquamperfekt (Geçmişin Geçmişi)",
        explanation:
          "Geçmişte başka bir geçmiş olaydan önce olan durumları anlatmak için kullanılır: hatte/war + Partizip II.",
        examples: [
          { de: "Nachdem er gegessen hatte, ging er schlafen.", tr: "Yedikten sonra uyumaya gitti." },
          { de: "Als ich ankam, war sie schon gegangen.", tr: "Ben geldiğimde o çoktan gitmişti." },
        ],
      },
      {
        topic: "Temporale Konjunktionen: nachdem & bevor",
        explanation:
          "'nachdem' (sonra) ve 'bevor' (önce) zaman sıralaması için kullanılır. 'nachdem' ile Plusquamperfekt sıkça birlikte gelir.",
        examples: [
          { de: "Bevor ich arbeitete, habe ich studiert.", tr: "Çalışmadan önce okudum." },
          { de: "Nachdem er die E-Mail gelesen hatte, rief er an.", tr: "E-postayı okuduktan sonra aradı." },
        ],
      },
    ],
    tipps: [
      "💡 Konuşmada Perfekt, yazıda Präteritum tercih edilir — ama sein/haben her zaman Präteritum'dur (war/hatte).",
      "💡 Resmi mektup başlangıcı: 'Sehr geehrte Damen und Herren,' — 'Sayın Yetkili'",
    ],
  },

  "Ünite 2: Gesellschaft ve Umwelt": {
    focus: "Toplum ve Çevre",
    kommunikation: [
      "Çevre kirliliği ve iklim değişikliği üzerine görüş bildirme",
      "Bir konuda avantaj ve dezavantajları (Pro-Contra) tartışma",
      "İstatistikleri ve grafikleri sözlü olarak yorumlama",
    ],
    grammatik: [
      {
        topic: "Vorgangspassiv: Präsens & Perfekt",
        explanation:
          "Edilgen yapı eylemi ön plana çıkarır, özneyi geri plana atar. Präsens: wird + Partizip II. Perfekt: ist + Partizip II + worden.",
        examples: [
          { de: "Plastikmüll wird ins Meer geworfen.", tr: "Plastik atık denize atılıyor." },
          { de: "Das Gesetz wurde verabschiedet.", tr: "Yasa çıkarıldı." },
          { de: "Die Fabrik ist geschlossen worden.", tr: "Fabrika kapatıldı." },
        ],
      },
      {
        topic: "Passiv mit Modalverben",
        explanation:
          "Modalverb + Passiv: Modalverb (çekimli) + Partizip II + werden (mastar olarak sona).",
        examples: [
          { de: "Das muss geändert werden.", tr: "Bu değiştirilmeli." },
          { de: "Energie soll gespart werden.", tr: "Enerji tasarruf edilmeli." },
          { de: "Wälder dürfen nicht abgeholzt werden.", tr: "Ormanlar tahrip edilmemeli." },
        ],
      },
      {
        topic: "Konzessivkonjunktionen: obwohl & trotz",
        explanation:
          "'obwohl' cümle bağlacıdır (fiili sona atar). 'trotz' edattır ve Genitiv alır (konuşmada sıkça Dativ ile de kullanılır).",
        examples: [
          { de: "Obwohl es regnet, gehen wir spazieren.", tr: "Yağmur yağmasına rağmen yürüyüşe çıkıyoruz." },
          { de: "Trotz des schlechten Wetters fährt er Rad.", tr: "Kötü havaya rağmen bisiklete biniyor." },
        ],
      },
    ],
    tipps: [
      "💡 İstatistik yorumlarken: 'Laut der Grafik...' (Grafiğe göre) veya 'Der Anteil von X beträgt Y%' kullanılır.",
      "💡 Tartışmada: 'Ich bin der Meinung, dass...' (Bana göre...) ve 'Auf der einen Seite... auf der anderen Seite...' yapıları çok işe yarar.",
    ],
  },

  "Ünite 3: Wünsche ve Träume": {
    focus: "Dilekler, Hayaller ve Koşullar",
    kommunikation: [
      "'Eğer zengin olsaydım...' gibi hayali senaryolar kurma",
      "Gelecek hakkında tahminlerde bulunma",
      "Nazikçe tavsiye verme ve öneri sunma",
    ],
    grammatik: [
      {
        topic: "Konjunktiv II (İrreal Koşullar)",
        explanation:
          "Gerçekleşmeyen veya gerçekleşmesi imkânsız durumlar için kullanılır. Temel formlar: wäre (sein), hätte (haben), würde + Infinitiv.",
        examples: [
          { de: "Wenn ich reich wäre, würde ich reisen.", tr: "Zengin olsaydım, seyahat ederdim." },
          { de: "Ich würde gerne Deutsch lernen.", tr: "Gönüllü Almanca öğrenmek isterdim." },
          { de: "Könntest du mir helfen?", tr: "Bana yardım edebilir misin? (kibar)" },
        ],
      },
      {
        topic: "Irreale Wünsche",
        explanation:
          "Gerçekleşmemiş dilek ve pişmanlıkları 'Wenn ich doch...!' veya 'Ich wünschte...' kalıplarıyla ifade ederiz.",
        examples: [
          { de: "Wenn ich doch mehr Zeit hätte!", tr: "Keşke daha fazla zamanım olsaydı!" },
          { de: "Ich wünschte, ich wäre nicht so müde.", tr: "Keşke bu kadar yorgun olmasaydım." },
        ],
      },
      {
        topic: "Futur I: werden + Infinitiv",
        explanation:
          "Gelecekteki tahmin ve planlar için 'werden + Infinitiv' kullanılır.",
        examples: [
          { de: "Morgen wird es regnen.", tr: "Yarın yağmur yağacak." },
          { de: "Ich werde einen neuen Job finden.", tr: "Yeni bir iş bulacağım." },
          { de: "Das wird klappen!", tr: "Bu işe yarayacak!" },
        ],
      },
    ],
    tipps: [
      "💡 Kibar istek ve önerilerde 'würden Sie bitte...' veya 'könnten Sie...' kalıplarını kullanın.",
      "💡 'Wenn ich an deiner Stelle wäre...' (Senin yerinde olsaydım...) tavsiye vermenin nazik yoludur.",
    ],
  },

  "Ünite 4: Beziehungen ve Relativsätze": {
    focus: "İlişkiler ve Tanımlamalar",
    kommunikation: [
      "Bir kişiyi fiziksel ve karakter olarak detaylıca betimleme",
      "Arkadaşlık ve partnerlik üzerine soyut tartışmalar",
      "Bir eşyayı ismini söylemeden özellikleriyle tarif etme",
    ],
    grammatik: [
      {
        topic: "Relativsätze (İlgi Cümleleri)",
        explanation:
          "Bir ismi tanımlayan yan cümleler Relativsätze'dir. Relativpronomen (der/die/das) ismin cinsiyetine ve cümledeki haline göre çekilir.",
        examples: [
          { de: "Das ist der Mann, der Deutsch spricht.", tr: "Bu Almanca konuşan adam. (Nom)" },
          { de: "Das ist die Frau, die ich kenne.", tr: "Bu tanıdığım kadın. (Akk)" },
          { de: "Das ist das Kind, dem ich geholfen habe.", tr: "Bu yardım ettiğim çocuk. (Dat)" },
          { de: "Das ist der Mann, dessen Auto rot ist.", tr: "Bu arabası kırmızı olan adam. (Gen)" },
        ],
      },
      {
        topic: "Relativsatz mit Präpositionen",
        explanation:
          "Edat + Relativpronomen birlikte kullanılır. Edat her zaman Relativpronomen'den önce gelir.",
        examples: [
          { de: "Das ist der Freund, mit dem ich lerne.", tr: "Bu birlikte çalıştığım arkadaş." },
          { de: "Das ist die Schule, in der ich studiert habe.", tr: "Bu okuduğum okul." },
          { de: "Das ist das Thema, über das wir sprechen.", tr: "Bu hakkında konuştuğumuz konu." },
        ],
      },
      {
        topic: "Genitiv (Sahiplik)",
        explanation:
          "Resmi yazılı dilde sahiplik Genitiv ile ifade edilir. Eril ve nötr isimler -(e)s eki alır.",
        examples: [
          { de: "die Meinung meiner Freundin", tr: "arkadaşımın görüşü" },
          { de: "das Ende des Films", tr: "filmin sonu" },
          { de: "der Chef des Unternehmens", tr: "şirketin patronu" },
        ],
      },
    ],
    tipps: [
      "💡 Relativpronomen tablosu Deklination tablosuyla aynıdır — fark yalnızca Genitiv ve Dativ çoğulda.",
      "💡 Relativsatz her zaman virgülle ayrılır.",
    ],
  },

  "Ünite 5: Komplexe Verbindungen": {
    focus: "Karmaşık Bağlaçlar ve Pekiştirmeler",
    kommunikation: [
      "Şartlı durumlar üzerine konuşma",
      "Bir olayın süregelen etkilerini ifade etme (seitdem)",
      "'Sanki ... gibi' (als ob) karşılaştırmaları yapma",
    ],
    grammatik: [
      {
        topic: "Zweiteilige Konjunktionen (İkili Bağlaçlar)",
        explanation:
          "sowohl...als auch (hem...hem de), weder...noch (ne...ne de), nicht nur...sondern auch (sadece...değil...aynı zamanda).",
        examples: [
          { de: "Ich spreche sowohl Deutsch als auch Englisch.", tr: "Hem Almanca hem de İngilizce konuşuyorum." },
          { de: "Er hat weder Zeit noch Geld.", tr: "Ne zamanı ne de parası var." },
          { de: "Sie ist nicht nur klug, sondern auch fleißig.", tr: "O sadece zeki değil, aynı zamanda çalışkan." },
        ],
      },
      {
        topic: "Infinitiv mit zu",
        explanation:
          "Bazı fiil ve yapılar 'zu + Infinitiv' alır. Modal fiiller almaz. Ayrılabilen fiillerde 'zu' önek ile kök arasına girer.",
        examples: [
          { de: "Es ist wichtig, Deutsch zu lernen.", tr: "Almanca öğrenmek önemli." },
          { de: "Ich versuche, pünktlich zu sein.", tr: "Zamanında olmaya çalışıyorum." },
          { de: "Er hat vergessen, die Tür abzuschließen.", tr: "Kapıyı kilitlemeyi unuttu." },
        ],
      },
      {
        topic: "Gradpartikeln (Derece Bildiren Kelimeler)",
        explanation:
          "Sıfat ve zarfların anlamını kuvvetlendiren veya zayıflatan kelimeler. Konuşma diline özgü: echt, total, ziemlich, gar nicht, kaum.",
        examples: [
          { de: "Das war echt interessant.", tr: "Bu gerçekten ilginçti." },
          { de: "Er ist ziemlich müde.", tr: "Oldukça yorgun." },
          { de: "Ich verstehe das überhaupt nicht.", tr: "Bunu hiç anlamıyorum." },
        ],
      },
    ],
    tipps: [
      "💡 'sowohl...als auch' ile hem...hem ifadesi resmi ve yazılı dilde çok tercih edilir.",
      "💡 'zu + Infinitiv' yapısında ayrılabilen fiillere dikkat: aufzumachen, anzurufen gibi.",
    ],
  },

  "Ünite 6: Adjektive ve Strukturen": {
    focus: "Sıfatlar, İsimleştirme ve Partizip",
    kommunikation: [
      "En iyi ve daha iyiyi karşılaştırmalı olarak analiz etme",
      "Sıfatları isim olarak kullanma (das Gute, der Deutsche)",
      "Partizip I ile daha akıcı ve zengin cümleler kurma",
    ],
    grammatik: [
      {
        topic: "Adjektivdeklination: Komparativ & Superlativ",
        explanation:
          "Karşılaştırma sıfatları da isimden önce gelince çekim eki alır.",
        examples: [
          { de: "ein besseres Angebot", tr: "daha iyi bir teklif" },
          { de: "das günstigste Hotel", tr: "en ucuz otel" },
          { de: "mit einem älteren Kollegen", tr: "daha yaşlı bir meslektaşla" },
        ],
      },
      {
        topic: "Adjektiv als Nomen",
        explanation:
          "Almancada sıfatlar büyük harf yazılarak isim olarak kullanılabilir. Artikele göre çekim alır.",
        examples: [
          { de: "Das Gute an diesem Job ist...", tr: "Bu işin iyi yanı şu ki..." },
          { de: "der Deutsche / die Deutsche", tr: "Alman erkek / Alman kadın" },
          { de: "Alles Gute zum Geburtstag!", tr: "Doğum günün kutlu olsun!" },
        ],
      },
      {
        topic: "Partizip Präsens als Adjektiv",
        explanation:
          "Partizip I (Infinitiv + -d) sıfat olarak kullanılır: devam eden eylemi betimler.",
        examples: [
          { de: "die lachenden Kinder", tr: "gülen çocuklar" },
          { de: "ein wachsendes Problem", tr: "büyüyen bir sorun" },
          { de: "die steigende Temperatur", tr: "yükselen sıcaklık" },
        ],
      },
    ],
    tipps: [
      "💡 Partizip I (Adjektiv): schlafen → schlafend → das schlafende Kind (uyuyan çocuk).",
      "💡 Adjektiv als Nomen özellikle gazetecilik dilinde ve başlıklarda çok yaygındır.",
    ],
  },

  "Ünite 7: Gesundheit und Wohlbefinden": {
    focus: "Sağlık, Beslenme ve Spor",
    kommunikation: [
      "Doktora detaylı şikayet bildirme ve semptomları tanımlama",
      "Sağlıklı yaşam alışkanlıkları ve beslenme hakkında görüş bildirme",
      "Eczanede ilaç talebi ve tavsiye alma",
      "Spor ve fiziksel aktiviteleri anlatma",
    ],
    grammatik: [
      {
        topic: "Modalverben im Präteritum",
        explanation:
          "Modal fiillerin geçmiş zaman (Präteritum) formları: musste, durfte, konnte, sollte, wollte, mochte. Konuşma dilinde de Perfekt yerine Präteritum tercih edilir.",
        examples: [
          { de: "Er musste gestern zum Arzt gehen.", tr: "Dün doktora gitmek zorundaydı." },
          { de: "Als Kind durfte ich nicht viel fernsehen.", tr: "Çocukken çok fazla televizyon izleyemezdim." },
          { de: "Sie konnte nicht schlafen, weil sie Schmerzen hatte.", tr: "Ağrısı olduğu için uyuyamadı." },
        ],
        table: {
          headers: ["Infinitiv", "Präteritum", "Türkçe"],
          rows: [
            ["müssen", "musste", "zorundaydı"],
            ["dürfen", "durfte", "izniydi / yapabilirdi"],
            ["können", "konnte", "yapabilirdi"],
            ["sollen", "sollte", "yapmalıydı"],
            ["wollen", "wollte", "istemişti"],
            ["mögen", "mochte", "severdi / hoşlanırdı"],
          ],
        },
      },
      {
        topic: "Reflexivverben im Kontext",
        explanation:
          "Dönüşlü fiiller sağlık ve günlük rutin bağlamında sıkça kullanılır. 'sich fühlen' (hissetmek), 'sich erholen' (iyileşmek), 'sich verletzen' (yaralanmak) gibi.",
        examples: [
          { de: "Ich fühle mich heute nicht wohl.", tr: "Bugün kendimi iyi hissetmiyorum." },
          { de: "Er hat sich beim Sport verletzt.", tr: "Spor sırasında yaralandı." },
          { de: "Sie erholt sich nach der Operation langsam.", tr: "Ameliyattan sonra yavaş yavaş iyileşiyor." },
        ],
      },
      {
        topic: "Konzessivsatz mit obwohl (tekrar)",
        explanation:
          "Sağlık bağlamında 'obwohl' çok sık kullanılır: hasta olmalarına rağmen çalışmak gibi.",
        examples: [
          { de: "Obwohl er krank war, ging er zur Arbeit.", tr: "Hasta olmasına rağmen işe gitti." },
          { de: "Sie trainiert täglich, obwohl sie wenig Zeit hat.", tr: "Az zamanı olmasına rağmen her gün antrenman yapıyor." },
        ],
      },
    ],
    tipps: [
      "💡 'Ich habe Bauchschmerzen / Kopfschmerzen / Rückenschmerzen' — TELC B1'de sık kullanılan şikayet ifadeleri.",
      "💡 'Mir ist schwindelig' (başım dönüyor) / 'Mir ist übel' (midem bulanıyor) — Dativ ile hissiyat ifadeleri.",
      "💡 Eczanede: 'Haben Sie etwas gegen Husten / Fieber / Erkältung?' kalıbını kullanın.",
    ],
  },

  "Ünite 8: Reise und Entdecken": {
    focus: "Tatil, Seyahat ve Kültürel Keşif",
    kommunikation: [
      "Seyahat planı yapma ve otel/uçak rezervasyonu hakkında konuşma",
      "Bir ülkenin kültürünü, geleneklerini ve güzelliklerini tanıtma",
      "Seyahatte yaşanan sorunları çözme (kayıp bagaj, iptal vb.)",
      "Tatil anılarını geçmiş zamanda anlatma",
    ],
    grammatik: [
      {
        topic: "Präpositionen mit Genitiv (wegen, trotz, während, aufgrund)",
        explanation:
          "Seyahat metinlerinde Genitiv edatları çok kullanılır. TELC B1'de bu edatlar 'Sprachbausteine' bölümünde sıkça çıkar.",
        examples: [
          { de: "Wegen des schlechten Wetters blieben wir im Hotel.", tr: "Kötü hava nedeniyle otelde kaldık." },
          { de: "Trotz der langen Reise war sie voller Energie.", tr: "Uzun yolculuğa rağmen enerjikti." },
          { de: "Während des Fluges schlief er die meiste Zeit.", tr: "Uçuş süresince çoğunlukla uyudu." },
          { de: "Aufgrund eines Streiks wurden viele Flüge gestrichen.", tr: "Grev nedeniyle pek çok uçuş iptal edildi." },
        ],
      },
      {
        topic: "Perfekt mit Reiseverben",
        explanation:
          "Seyahat anılarını anlatırken Perfekt kullanılır. Hareket fiilleri 'sein' ile, diğerleri 'haben' ile oluşturulur.",
        examples: [
          { de: "Wir sind nach Istanbul geflogen.", tr: "İstanbul'a uçtuk." },
          { de: "Ich habe viele Sehenswürdigkeiten besucht.", tr: "Pek çok turistik yeri ziyaret ettim." },
          { de: "Sie ist die ganze Stadt zu Fuß gegangen.", tr: "Şehrin tamamını yürüyerek gezdi." },
          { de: "Er hat lokales Essen probiert.", tr: "Yerel yemek tattı." },
        ],
      },
      {
        topic: "Indefinite Pronomen: man, jemand, niemand, etwas, nichts",
        explanation:
          "Seyahatte genel ifadeler ve tavsiyeler için belirsiz zamirler çok kullanılır.",
        examples: [
          { de: "Man sollte unbedingt die Altstadt besuchen.", tr: "Tarihi çarşıyı mutlaka ziyaret etmeli." },
          { de: "Hat jemand einen Stadtplan?", tr: "Birinin şehir haritası var mı?" },
          { de: "Ich habe nichts Besonderes gekauft.", tr: "Özel bir şey almadım." },
          { de: "Es gibt etwas zu sehen hier.", tr: "Burada görülecek bir şey var." },
        ],
      },
    ],
    tipps: [
      "💡 TELC B1'de seyahat bağlamında yazma görevi sıkça gelir: resmi bir şikayet e-postası veya mektup yazma.",
      "💡 'Ich würde gern... empfehlen' ve 'Ich rate Ihnen, ... zu...' tavsiye verme kalıpları.",
      "💡 Havaalanında: 'Mein Koffer ist nicht angekommen.' / 'Mein Flug wurde gestrichen.' — şikayet ifadeleri.",
    ],
  },

  // ─── B2 ──────────────────────────────────────────────────────────────────

  "Ünite 1: Zeit ve Ereignisse": {
    focus: "Zaman ve Olaylar",
    kommunikation: [
      "Karmaşık olay örgüsünü kronolojik ve mantıksal olarak anlatma",
      "Haber bültenlerini ve gazete makalelerini analiz etme",
    ],
    grammatik: [
      {
        topic: "Temporal-Konnektoren",
        explanation:
          "Olayları zamansal sıraya koymak için kullanılan bağlaçlar: als (geçmişte tek seferlik), wenn (tekrar eden/gelecek), während (eş zamanlı), seitdem (o zamandan beri), bis (kadar), bevor/nachdem.",
        examples: [
          { de: "Als ich jung war, lebte ich in Istanbul.", tr: "Gençken İstanbul'da yaşıyordum." },
          { de: "Wenn ich Urlaub habe, reise ich immer.", tr: "Tatilim olduğunda hep seyahat ederim." },
          { de: "Seitdem er umgezogen ist, sehen wir uns selten.", tr: "Taşındığından beri nadiren görüşüyoruz." },
        ],
      },
      {
        topic: "sobald & solange",
        explanation:
          "'sobald' (hemen...r): eylemden hemen sonra. 'solange' (olduğu sürece): eş zamanlı süren koşul.",
        examples: [
          { de: "Sobald er ankommt, rufen wir an.", tr: "Gelir gelmez arayacağız." },
          { de: "Solange du hier bist, bin ich glücklich.", tr: "Sen burada olduğun sürece mutluyum." },
        ],
      },
      {
        topic: "Plusquamperfekt im Kontext",
        explanation:
          "Geçmiş anlatıda birden fazla olay varsa, daha önce gerçekleşen Plusquamperfekt, daha sonraki Präteritum/Perfekt ile aktarılır.",
        examples: [
          { de: "Nachdem die Besprechung beendet worden war, verließen alle den Raum.", tr: "Toplantı bittikten sonra herkes odayı terk etti." },
        ],
      },
    ],
    tipps: [
      "💡 'als' geçmişte tek bir olayı anlatır; 'wenn' tekrar eden ya da gelecekteki olaylar için kullanılır.",
      "💡 Haberlerde Präteritum egemendir: 'Am Montag ereignete sich...'",
    ],
  },

  "Ünite 2: Zukunft ve Hypothesen": {
    focus: "Gelecek Tahminleri ve Varsayımlar",
    kommunikation: [
      "Gelecek projeksiyonları ve teknolojik öngörüler hakkında sunum yapma",
      "Pişmanlık ve 'başka türlü olsaydı ne olurdu' senaryolarını tartışma",
    ],
    grammatik: [
      {
        topic: "Futur II: werden + Partizip II + haben/sein",
        explanation:
          "Gelecekte tamamlanmış olacak bir eylemi ifade eder. Türkçede 'yapmış olacak' kalıbına denk gelir.",
        examples: [
          { de: "Bis morgen werde ich den Bericht geschrieben haben.", tr: "Yarına kadar raporu yazmış olacağım." },
          { de: "Er wird wohl schon angekommen sein.", tr: "Muhtemelen zaten gelmiş olacak." },
        ],
      },
      {
        topic: "Konjunktiv II der Vergangenheit",
        explanation:
          "Geçmişte gerçekleşmemiş varsayımlar: hätte/wäre + Partizip II.",
        examples: [
          { de: "Wenn ich mehr gelernt hätte, hätte ich die Prüfung bestanden.", tr: "Daha çok çalışsaydım, sınavı geçerdim." },
          { de: "Das wäre schön gewesen.", tr: "Bu güzel olurdu." },
        ],
      },
      {
        topic: "Irreale Konditionalsätze (Geçmiş)",
        explanation:
          "Gerçek dışı koşul cümleleri geçmişte: 'Wenn + Konj.II Verg., Konj.II Verg.' yapısı.",
        examples: [
          { de: "Wenn er früher aufgestanden wäre, hätte er den Zug genommen.", tr: "Daha erken kalksaydı, treni yakalardı." },
        ],
      },
    ],
    tipps: [
      "💡 Futur II hem tahmin hem kesinleşmiş gelecek için kullanılır; 'wohl' ile tahmin anlamı güçlenir.",
      "💡 Konjunktiv II Vergangenheit en sık 'Wenn...hätte/wäre...' şeklinde görülür.",
    ],
  },

  "Ünite 3: Passiv ve Formelle Sprache": {
    focus: "Edilgen Yapı ve Resmi Dil",
    kommunikation: [
      "Süreç odaklı anlatımlar: bir ürünün üretim aşamaları",
      "Resmi rapor yazma ve protokolleri anlama",
    ],
    grammatik: [
      {
        topic: "Passiv Präteritum & Zustandspassiv",
        explanation:
          "Vorgangspassiv (eylem): wurde + Partizip II. Zustandspassiv (sonuç durumu): ist + Partizip II.",
        examples: [
          { de: "Das Dokument wurde unterschrieben.", tr: "Belge imzalandı. (eylem)" },
          { de: "Das Dokument ist unterschrieben.", tr: "Belge imzalı. (durum)" },
          { de: "Der Brief wurde gestern geschrieben.", tr: "Mektup dün yazıldı." },
        ],
      },
      {
        topic: "Nomen-Verb-Verbindungen",
        explanation:
          "Bazı kavramlar isim + fiil kombinasyonuyla ifade edilir. Bunlar özellikle iş ve akademik dilde yaygındır.",
        examples: [
          { de: "in Anspruch nehmen", tr: "kullanmak / yararlanmak" },
          { de: "zur Verfügung stellen", tr: "sunmak / hazır bulundurmak" },
          { de: "in Betracht ziehen", tr: "göz önünde bulundurmak" },
          { de: "Abstand nehmen von", tr: "vazgeçmek" },
        ],
      },
    ],
    tipps: [
      "💡 Vorgangspassiv = süreç (werden), Zustandspassiv = sonuç durumu (sein). Fark kritiktir.",
      "💡 Nomen-Verb-Verbindungen sözcükleri ayrı ayrı değil, bir bütün olarak öğrenin.",
    ],
  },

  "Ünite 4: Indirekte Rede ve Zitate": {
    focus: "Dolaylı Anlatım ve Alıntılar",
    kommunikation: [
      "Bir toplantıdaki veya röportajdaki konuşmaları raporlama",
      "Bilimsel verileri ve iddiaları tarafsız bir dille aktarma",
    ],
    grammatik: [
      {
        topic: "Konjunktiv I (Indirekte Rede)",
        explanation:
          "Başkasının sözlerini aktarırken kullanılır. Konjunktiv I = fiil kökü + e. Konjunktiv I görünüm bakımından Präsens ile aynıysa Konjunktiv II kullanılır.",
        examples: [
          { de: "Er sagt, er sei krank. (sein → sei)", tr: "Hasta olduğunu söylüyor." },
          { de: "Sie berichtet, die Zahlen seien gestiegen.", tr: "Sayıların arttığını bildiriyor." },
          { de: "Der Minister erklärte, das Problem werde gelöst.", tr: "Bakan sorunun çözüleceğini açıkladı." },
        ],
      },
      {
        topic: "Relativsätze im Genitiv",
        explanation:
          "Genitiv Relativpronomen: dessen (eril/nötr), deren (dişil/çoğul).",
        examples: [
          { de: "Der Mann, dessen Auto gestohlen wurde, wartet.", tr: "Arabası çalınan adam bekliyor." },
          { de: "Die Firma, deren Produkte bekannt sind, expandiert.", tr: "Ürünleri tanınan şirket büyüyor." },
        ],
      },
      {
        topic: "Präpositionen mit Genitiv",
        explanation:
          "Genitiv alan edatlar: wegen (yüzünden), während (süresince), trotz (rağmen), aufgrund (nedeniyle), anstelle (yerine), innerhalb (içinde), außerhalb (dışında).",
        examples: [
          { de: "Aufgrund des schlechten Wetters wurde das Spiel abgesagt.", tr: "Kötü hava nedeniyle maç iptal edildi." },
          { de: "Trotz seiner Müdigkeit arbeitete er weiter.", tr: "Yorgunluğuna rağmen çalışmaya devam etti." },
        ],
      },
    ],
    tipps: [
      "💡 Gazete dilinde Konjunktiv I çok yaygındır: 'Der Politiker sagte, er habe keine Fehler gemacht.'",
      "💡 'wegen' resmi yazılarda Genitiv, konuşmada Dativ ile kullanılır.",
    ],
  },

  "Ünite 5: Logik ve Argumentation": {
    focus: "Mantık ve Argüman",
    kommunikation: [
      "Münazara (Diskussion) yönetme ve karşı fikri çürütme",
      "Sonuç çıkarma ve koşul sunma",
    ],
    grammatik: [
      {
        topic: "Doppelkonnektoren: je...desto/umso",
        explanation:
          "'je...desto' (ne kadar...o kadar) karşılaştırmalı bir orantı ifade eder. Her iki bölümde de Komparativ kullanılır.",
        examples: [
          { de: "Je mehr man liest, desto besser versteht man.", tr: "Ne kadar çok okursan, o kadar iyi anlarsın." },
          { de: "Je früher, desto besser.", tr: "Ne kadar erken olursa, o kadar iyi." },
          { de: "Je länger man übt, umso flüssiger spricht man.", tr: "Ne kadar çok pratik yaparsan, o kadar akıcı konuşursun." },
        ],
      },
      {
        topic: "Konsekutivsätze (Sonuç Bildirme)",
        explanation:
          "Bağlaçlar: folglich, infolgedessen, deshalb, daher, sodass (eylemden doğan sonuç).",
        examples: [
          { de: "Er hat viel gelernt, folglich hat er die Prüfung bestanden.", tr: "Çok çalıştı, dolayısıyla sınavı geçti." },
          { de: "Es regnete stark, sodass wir zu Hause blieben.", tr: "Çok yağmur yağdı, bu yüzden evde kaldık." },
        ],
      },
      {
        topic: "Negationswörter",
        explanation:
          "Türkçedeki 'hiç' anlamına gelen Almanca kelimelere dikkat: nie (hiçbir zaman), nichts (hiçbir şey), niemand (kimse), nirgends/nirgendwo (hiçbir yerde).",
        examples: [
          { de: "Ich habe nichts gesagt.", tr: "Hiçbir şey demedim." },
          { de: "Das habe ich nie getan.", tr: "Bunu hiç yapmadım." },
          { de: "Ich kenne niemanden hier.", tr: "Burada kimseyi tanımıyorum." },
        ],
      },
    ],
    tipps: [
      "💡 Tartışmada: 'Dem widerspreche ich, weil...' (Buna katılmıyorum, çünkü...) ifadesi güçlü bir argüman açılışıdır.",
      "💡 'je...desto' yapısında her iki tarafta da fiil, normal cümle sırası yerine 'desto + Komparativ + Verb' düzenindedir.",
    ],
  },

  "Ünite 6: Verben ve Ergänzungen": {
    focus: "Fiiller ve Tamamlayıcılar",
    kommunikation: [
      "Soyut kavramlar üzerine derinlemesine analiz",
      "Duygu ve düşünceleri nüanslı bir şekilde ifade etme",
    ],
    grammatik: [
      {
        topic: "Verben mit Ergänzungen (Akk/Dat/Gen)",
        explanation:
          "Fiiller aldıkları tamamlayıcıyla birlikte öğrenilmelidir. Akk: erwarten, kennen, lieben. Dat: vertrauen, widersprechen. Gen: bedürfen, gedenken.",
        examples: [
          { de: "Ich vertraue dir.", tr: "Sana güveniyorum. (Dat)" },
          { de: "Er erinnert sich an seine Kindheit.", tr: "Çocukluğunu hatırlıyor. (an + Akk)" },
          { de: "Sie zweifelt an seiner Ehrlichkeit.", tr: "Onun dürüstlüğünden şüphe ediyor. (an + Dat)" },
        ],
      },
      {
        topic: "Pronomen: einander",
        explanation:
          "'einander' (birbirini/birbirine) karşılıklı eylemi ifade eder. Edatlarla birleşebilir: miteinander, voneinander, füreinander.",
        examples: [
          { de: "Sie lieben einander.", tr: "Birbirlerini seviyorlar." },
          { de: "Wir helfen einander.", tr: "Birbirimize yardım ediyoruz." },
          { de: "Sie reden miteinander.", tr: "Birbiriyle konuşuyorlar." },
        ],
      },
      {
        topic: "Irreale Vergleichssätze: als ob",
        explanation:
          "'als ob' (sanki...gibi) gerçek olmayan karşılaştırmalar için kullanılır ve Konjunktiv II gerektirir.",
        examples: [
          { de: "Er tut so, als ob er alles wüsste.", tr: "Sanki her şeyi biliyormuş gibi davranıyor." },
          { de: "Sie sieht aus, als ob sie krank wäre.", tr: "Sanki hasta gibi görünüyor." },
        ],
      },
    ],
    tipps: [
      "💡 Fiilleri daima hangi tamamlayıcıyla kullanıldığına dikkat ederek öğrenin: hoffen auf + Akk, zweifeln an + Dat.",
      "💡 'als ob' her zaman Konjunktiv II ister — bu kural istisnasız geçerlidir.",
    ],
  },

  "Ünite 7: Medien ve Gesellschaft": {
    focus: "Medya ve Toplum",
    kommunikation: [
      "Medya haberlerini eleştirel bir gözle değerlendirme ve yorum yapma",
      "Sosyal medyanın toplumsal etkileri hakkında tartışma",
      "Haber güvenilirliğini sorgulamak ve 'Fake News' kavramını açıklama",
    ],
    grammatik: [
      {
        topic: "Passiv in Medientexten",
        explanation:
          "Haber metinlerinde pasif çok yaygındır: bilgi veren özne gizlenir, eylem odaklanır. Aynı zamanda Konjunktiv I ile birlikte dolaylı aktarım yapılır.",
        examples: [
          { de: "Es wurde berichtet, dass die Wirtschaft wächst.", tr: "Ekonominin büyüdüğü bildirildi." },
          { de: "Die Entscheidung wurde gestern bekannt gegeben.", tr: "Karar dün açıklandı." },
          { de: "Es soll zu Protesten gekommen sein.", tr: "Protestoların yaşandığı söyleniyor." },
        ],
      },
      {
        topic: "Zweiteilige Konnektoren in Argumentation",
        explanation:
          "'Nicht nur... sondern auch', 'sowohl... als auch', 'weder... noch', 'zwar... aber' — argümantasyonda kullanılan ikili bağlaçlar.",
        examples: [
          { de: "Nicht nur die Qualität, sondern auch der Preis entscheidet.", tr: "Yalnızca kalite değil, fiyat da belirleyicidir." },
          { de: "Sowohl die Politiker als auch die Bevölkerung reagierten.", tr: "Hem politikacılar hem de halk tepki gösterdi." },
          { de: "Zwar ist das teuer, aber es lohnt sich.", tr: "Bu pahalı, ancak değer." },
        ],
      },
    ],
    tipps: [
      "💡 Haber dilinde 'angeblich' (iddiaya göre) ve 'laut Medienberichten' (medya haberlerine göre) çok kullanılır.",
      "💡 'sowohl... als auch' hem A hem B olduğunu vurgular — 'und' den daha güçlü bir birleşim ifade eder.",
    ],
  },

  "Ünite 8: Wissenschaft ve Technik": {
    focus: "Bilim, Teknoloji ve Gelecek",
    kommunikation: [
      "Bilimsel bir konuyu kendi cümlelerinizle özetleme ve aktarma",
      "Teknolojik gelişmelerin avantaj ve dezavantajlarını tartışma",
      "Verilerden çıkarım yapmak ve görüş bildirmek",
    ],
    grammatik: [
      {
        topic: "Nominalstil in Wissenschaftstexten",
        explanation:
          "Akademik metinlerde fiil cümleleri isim yapılarına dönüştürülür. 'weil er forscht' → 'aufgrund seiner Forschung'. Bu üslup yoğun bilgi aktarımını sağlar.",
        examples: [
          { de: "Die Entdeckung des Impfstoffs rettet Millionen Leben.", tr: "Aşının keşfi milyonlarca hayat kurtarıyor." },
          { de: "Infolge des technischen Fortschritts verändert sich die Arbeit.", tr: "Teknolojik ilerleme sonucunda iş hayatı değişiyor." },
          { de: "Zur Verbesserung der Effizienz werden neue Methoden eingesetzt.", tr: "Verimliliği artırmak için yeni yöntemler uygulanmaktadır." },
        ],
      },
      {
        topic: "Präzisionswörter und Hedging",
        explanation:
          "Bilimsel metinde kesinlik derecesi ifade edilir: 'möglicherweise' (muhtemelen), 'tendenziell' (eğilim olarak), 'in der Regel' (kural olarak), 'weitgehend' (büyük ölçüde).",
        examples: [
          { de: "Dies könnte möglicherweise zu neuen Erkenntnissen führen.", tr: "Bu muhtemelen yeni bulgulara yol açabilir." },
          { de: "In der Regel wird die Methode dreimal angewendet.", tr: "Kural olarak yöntem üç kez uygulanır." },
          { de: "Die Ergebnisse sind weitgehend konsistent.", tr: "Sonuçlar büyük ölçüde tutarlıdır." },
        ],
      },
    ],
    tipps: [
      "💡 Akademik metinlerde 'ich glaube' yerine 'es lässt sich schlussfolgern' (sonuç çıkarılabilir) gibi ifadeler kullanın.",
      "💡 Nominal üslupta Genitiv zincirleri sık görülür: 'die Auswertung der Ergebnisse der Studie'.",
    ],
  },

  // ─── C1 ──────────────────────────────────────────────────────────────────

  "Ünite 1: Berufswelt & Kommunikation": {
    focus: "İş Dünyası ve Profesyonel İletişim",
    kommunikation: [
      "Profesyonel tartışmalar yürütme ve raporlama",
      "Durum analizi yapma ve sonuçları akıcı biçimde sunma",
    ],
    grammatik: [
      {
        topic: "Konnektoren: andernfalls / folglich / außer wenn",
        explanation:
          "'andernfalls' (aksi takdirde), 'folglich' (dolayısıyla), 'außer wenn' (... olmadıkça) C1 düzeyi bağlaç zenginliği sağlar.",
        examples: [
          { de: "Reichen Sie die Unterlagen ein, andernfalls wird der Antrag abgelehnt.", tr: "Belgeleri teslim edin, aksi takdirde başvuru reddedilir." },
          { de: "Die Kosten sind gestiegen, folglich müssen wir das Budget anpassen.", tr: "Maliyetler arttı, dolayısıyla bütçeyi revize etmeliyiz." },
          { de: "Außer wenn es regnet, gehen wir zu Fuß.", tr: "Yağmur yağmadıkça yürüyoruz." },
        ],
      },
      {
        topic: "Weiterführende Relativsätze",
        explanation:
          "Bir önceki cümlenin tamamını veya bir bölümünü açıklayan ilgi cümleleri: was, wo, worüber vb. ile kurulur.",
        examples: [
          { de: "Er hat die Prüfung bestanden, was uns sehr gefreut hat.", tr: "Sınavı geçti, bu bizi çok sevindirdi." },
          { de: "Das ist etwas, worüber wir nachdenken sollten.", tr: "Bu, üzerinde düşünmemiz gereken bir şey." },
        ],
      },
    ],
    tipps: [
      "💡 C1'de bağlaç çeşitliliği akıcılığın en önemli göstergesidir — aynı bağlacı tekrar kullanmaktan kaçının.",
      "💡 'was' Relativpronomen olarak yalnızca edat olmayan isimler, alles, nichts, etwas veya tam bir cümle ile kullanılır.",
    ],
  },

  "Ünite 2: Indirekte Rede & Berichterstattung": {
    focus: "Dolaylı Anlatım ve Gazetecilik Dili",
    kommunikation: [
      "Bilimsel makalelerden alıntı yapma",
      "Tarafsız haber diliyle bilgi aktarma",
    ],
    grammatik: [
      {
        topic: "Konjunktiv I — Tam Sistem",
        explanation:
          "Tüm zamanlar için: Präsens (sei, habe, komme), Perfekt (sei gegangen), Futur (werde kommen). Konjunktiv I = Prezens kökü + e.",
        examples: [
          { de: "Er behauptet, er sei unschuldig.", tr: "Masum olduğunu iddia ediyor." },
          { de: "Die Studie zeigt, die Zahlen seien gesunken.", tr: "Çalışma, sayıların düştüğünü gösteriyor." },
          { de: "Sie sagte, sie werde morgen kommen.", tr: "Yarın geleceğini söyledi." },
        ],
      },
      {
        topic: "Subjekt- und Objektsätze",
        explanation:
          "Özne cümleleri (dass + ...) ve nesne cümleleri (... zu + Infinitiv) resmi yazılı dilde sık kullanılır.",
        examples: [
          { de: "Dass er kommt, ist wichtig.", tr: "Onun gelmesi önemli. (özne cümlesi)" },
          { de: "Es wird erwartet, dass alle teilnehmen.", tr: "Herkesin katılması bekleniyor." },
          { de: "Er empfiehlt, mehr zu üben.", tr: "Daha fazla pratik yapılmasını öneriyor." },
        ],
      },
    ],
    tipps: [
      "💡 Haber dilinde 'angeblich' (iddiaya göre) ve 'laut' (göre) Konjunktiv I'in yanında güçlü araçlardır.",
      "💡 Konjunktiv I Präsens = Infinitiv + e: kommen → komme, gehen → gehe.",
    ],
  },

  "Ünite 3: Nominal- und Verbalstil": {
    focus: "Üslup Dönüşümü: Nominal ↔ Verbal",
    kommunikation: [
      "Resmi yazışmalar ve teknik metinler hazırlama",
      "Akademik (nominal) ile akıcı (verbal) üslup arasında geçiş yapma",
    ],
    grammatik: [
      {
        topic: "Nominalisierung & Verbalisierung",
        explanation:
          "Fiil cümlesi → isim yapısına ya da tersi dönüşüm. Akademik dilde nominal üslup, konuşmada verbal üslup tercih edilir.",
        examples: [
          { de: "weil er arbeitete → aufgrund seiner Arbeit", tr: "çalıştığı için → çalışması nedeniyle" },
          { de: "Nachdem er angekommen war → Nach seiner Ankunft", tr: "Geldikten sonra → Gelişinin ardından" },
          { de: "Das Problem wird gelöst. → Die Lösung des Problems", tr: "Sorun çözülüyor. → Sorunun çözümü" },
        ],
      },
      {
        topic: "Negative Konsekutivsätze",
        explanation:
          "'ohne dass' (olmaksızın) ve 'zu..., als dass' (çok...ki) sonuç olumsuzlayan yapılardır.",
        examples: [
          { de: "Er verließ das Zimmer, ohne dass jemand es bemerkte.", tr: "Kimse fark etmeden odayı terk etti." },
          { de: "Das Problem ist zu komplex, als dass man es einfach lösen könnte.", tr: "Sorun, kolayca çözülemeyecek kadar karmaşık." },
        ],
      },
    ],
    tipps: [
      "💡 TELC C1 Hochschule sınavında Verbalstil→Nominalstil dönüştürme görevi çok kritiktir.",
      "💡 Nominal üslupta sıkça görülen yapı: 'die Durchführung der Maßnahme' gibi Genitiv zincirleri.",
    ],
  },

  "Ünite 4: Nuancen der Modalität": {
    focus: "Modalite Nüansları: Tahmin ve İddia",
    kommunikation: [
      "Bir iddiayı kanıtlarla savunma",
      "Varsayım ve olasılık dereceleri ifade etme",
    ],
    grammatik: [
      {
        topic: "Subjektive Modalverben",
        explanation:
          "Modal fiiller öznel kullanımda (Vermutung/Behauptung) başkasının iddiasını veya kişisel tahmini aktarır. Präsens için: Modal + Infinitiv. Geçmiş için: Modal + Partizip II + haben/sein.",
        examples: [
          { de: "Er muss krank sein.", tr: "O hasta olmalı. (kesin tahmin)" },
          { de: "Sie kann das gesagt haben.", tr: "Bunu söylemiş olabilir. (olasılık)" },
          { de: "Das soll sehr teuer sein.", tr: "Bu çok pahalıymış (duyuma göre)." },
          { de: "Er dürfte recht haben.", tr: "Haklı olması gerekiyor. (olası)" },
        ],
      },
      {
        topic: "Modalpartizip",
        explanation:
          "Pasif + modal anlamı taşıyan sıfatlar: 'zu + Partizip I' yapısı ile oluşturulur. 'die zu lösende Aufgabe' = çözülmesi gereken görev.",
        examples: [
          { de: "die zu lösende Aufgabe", tr: "çözülmesi gereken görev" },
          { de: "das zu diskutierende Thema", tr: "tartışılması gereken konu" },
          { de: "die einzuhaltenden Regeln", tr: "uyulması gereken kurallar (trennbar)" },
        ],
      },
    ],
    tipps: [
      "💡 'sollen' duyuma dayalı bilgi aktarır ('onlar dedi ki...'); 'müssen' mantıksal zorunluluk ifade eder.",
      "💡 Modalpartizip formal/yazılı dilde çok sık kullanılır ve Türkçede '-mesi gereken' ile karşılanır.",
    ],
  },

  "Ünite 5: Passiv & Konditionale": {
    focus: "Edilgen Yapının İncelikleri ve Koşullar",
    kommunikation: [
      "Teknik süreçleri edilgen yapıyla açıklama",
      "Alternatif gelecek senaryoları tartışma",
    ],
    grammatik: [
      {
        topic: "Besonderheiten des Passivs",
        explanation:
          "Öznesiz pasif (unpersönliches Passiv): 'Es wird getanzt.' | 'von' (eylem yapan) ve 'durch' (araç) farkı. Pasif + Modal: müssen/sollen/können + Partizip II + werden.",
        examples: [
          { de: "Es wird hier nicht geraucht.", tr: "Burada sigara içilmez." },
          { de: "Das Fenster wurde vom Wind geöffnet.", tr: "Pencere rüzgar tarafından açıldı." },
          { de: "Der Brief sollte morgen abgeschickt werden.", tr: "Mektubun yarın gönderilmesi gerekiyordu." },
        ],
      },
      {
        topic: "Konditionalsätze nominalisiert",
        explanation:
          "Şart cümleleri edat yapılarına dönüştürülebilir: wenn → bei/ohne/im Falle von.",
        examples: [
          { de: "Wenn es regnet, → Bei Regen...", tr: "Yağmur yağarsa → Yağmur durumunda..." },
          { de: "Wenn er kommt, → Bei seiner Ankunft...", tr: "Gelirse → Gelişinde..." },
          { de: "Im Falle einer Verzögerung...", tr: "Gecikme durumunda..." },
        ],
      },
      {
        topic: "Infinitivsätze: Präsens & Perfekt",
        explanation:
          "Infinitivsatz Präsens: eş zamanlı veya gelecek. Infinitivsatz Perfekt (Infinitiv II): tamamlanmış eylem.",
        examples: [
          { de: "Er hofft, die Prüfung zu bestehen.", tr: "Sınavı geçmeyi umuyor." },
          { de: "Er freut sich, die Prüfung bestanden zu haben.", tr: "Sınavı geçmiş olmaktan memnun." },
        ],
      },
    ],
    tipps: [
      "💡 'von' = eylem yapan kişi (ajan); 'durch' = araç veya neden.",
      "💡 Infinitiv II (Perfekt Infinitiv) formüle: Partizip II + haben/sein + zu → 'geschrieben zu haben'.",
    ],
  },

  "Ünite 6: Verben & Präpositionen": {
    focus: "C1 Seviyesi Sözdizimi ve Bağlaçlar",
    kommunikation: [
      "Akıcı ve duruma uygun (situationsangemessen) ifade yeteneği geliştirme",
      "Edatlı tamamlayıcıları doğal biçimde kullanma",
    ],
    grammatik: [
      {
        topic: "Verben mit Präpositionen (C1)",
        explanation:
          "C1 düzeyinde edatlı fiiller: bestehen aus (oluşmak), verfügen über (sahip olmak), beruhen auf (dayanmak), hinweisen auf (işaret etmek).",
        examples: [
          { de: "Das Projekt besteht aus drei Phasen.", tr: "Proje üç aşamadan oluşuyor." },
          { de: "Sie verfügt über ausgezeichnete Kenntnisse.", tr: "Mükemmel bilgiye sahip." },
          { de: "Die Theorie beruht auf neuen Erkenntnissen.", tr: "Teori yeni bulgulara dayanıyor." },
        ],
      },
      {
        topic: "Nominalisierung von Präpositionalergänzungen",
        explanation:
          "Edatlı fiil tamamlayıcıları isim yapısına dönüştürülür: er denkt daran → sein Nachdenken darüber.",
        examples: [
          { de: "Er achtet auf Qualität. → seine Achtsamkeit gegenüber der Qualität", tr: "Kaliteye dikkat ediyor. → Kaliteye gösterdiği özen" },
          { de: "Sie zweifelt an der Theorie. → ihr Zweifel an der Theorie", tr: "Teoriden şüphe ediyor. → Teoriye duyduğu şüphe" },
        ],
      },
      {
        topic: "Fortgeschrittene Konnektoren",
        explanation:
          "'indessen' (oysa/bu sırada), 'stattdessen' (bunun yerine), 'jedoch' (ancak/ne var ki) — resmi ve yazılı dilde çok kullanılır.",
        examples: [
          { de: "Er arbeitete hart; indessen ruhten sich die anderen aus.", tr: "O çok çalışıyordu; oysa diğerleri dinleniyordu." },
          { de: "Wir wollten reisen, stattdessen blieben wir zu Hause.", tr: "Seyahat etmek istedik, bunun yerine evde kaldık." },
          { de: "Der Plan war gut; jedoch fehlte das Budget.", tr: "Plan iyiydi; ancak bütçe yoktu." },
        ],
      },
    ],
    tipps: [
      "💡 'jedoch', 'indessen', 'stattdessen' — bu bağlaçları yazılı anlatımda kullanmak C1 üslubunun en belirgin işaretidir.",
      "💡 Edatlı tamamlayıcılarda da-/dar- zamirlerini (daran, darüber, dabei...) doğru kullanın.",
    ],
  },

  "Ünite 7: Akademik Dil ve Argumentation": {
    focus: "Akademik Dil ve Argümantasyon Stratejileri",
    kommunikation: [
      "Akademik bir metni özetleyerek aktarma ve eleştirme",
      "Karmaşık fikirleri düzenli ve ikna edici şekilde sunma",
      "Kaynaklara atıfta bulunma ve alıntı yapma",
    ],
    grammatik: [
      {
        topic: "Referenz und Kohärenz",
        explanation:
          "Metin bütünlüğü için referans araçları: 'letzteres/ersteres' (ikincisi/birincisi), 'jenes' (o), 'dieses' (bu). Tekrarı önlemek için eş anlamlılar ve Pronomen kullanımı.",
        examples: [
          { de: "Qualität und Preis — letzteres ist oft entscheidend.", tr: "Kalite ve fiyat — ikincisi çoğu zaman belirleyicidir." },
          { de: "Die Studie untersucht zwei Aspekte: Ersteres betrifft die Kosten.", tr: "Çalışma iki boyutu ele alıyor: Birincisi maliyetle ilgili." },
          { de: "Diese Ergebnisse, jene Methoden — beide sind wichtig.", tr: "Bu sonuçlar, o yöntemler — ikisi de önemli." },
        ],
      },
      {
        topic: "Einschränkungen und Nuancierungen",
        explanation:
          "'zumindest' (en azından), 'immerhin' (her halükarda), 'jedenfalls' (her durumda), 'keineswegs' (hiçbir şekilde), 'durchaus' (kesinlikle) ile görüşleri nüanslandırma.",
        examples: [
          { de: "Das Ergebnis ist zumindest ein Fortschritt.", tr: "Sonuç en azından bir ilerleme." },
          { de: "Das ist keineswegs akzeptabel.", tr: "Bu hiçbir şekilde kabul edilemez." },
          { de: "Er ist durchaus in der Lage, das zu tun.", tr: "Bunu yapmaya kesinlikle muktedir." },
        ],
      },
    ],
    tipps: [
      "💡 'Einerseits... andererseits', 'zum einen... zum anderen' ve 'nicht zuletzt' (son olarak değil ama önemli olarak) akademik metinde standart yapılardır.",
      "💡 Alıntı yaparken: 'laut X', 'X zufolge', 'wie X betont' (X'in vurguladığı gibi) kullanın.",
    ],
  },

  "Ünite 8: Komplexe Texte & Prüfungsvorbereitung": {
    focus: "Karmaşık Metinler ve Sınav Hazırlığı",
    kommunikation: [
      "TELC C1 sınavı yazma görevini (Erörterung/Stellungnahme) yapılandırma",
      "Uzun okuma metinlerini hızlı ve etkili analiz etme",
      "Konuşma sınavında spontane ve nüanslı yanıt verme",
    ],
    grammatik: [
      {
        topic: "Erörterung-Struktur",
        explanation:
          "Tartışma (Erörterung) yapısı: Einleitung (giriş) → Hauptteil Pro (lehte argümanlar) → Hauptteil Contra (aleyhte) → Schluss (sonuç ve kişisel görüş). Her bölümün dil araçları farklıdır.",
        examples: [
          { de: "Einleitend lässt sich sagen, dass...", tr: "Başlangıç olarak şunu söylemek gerekir..." },
          { de: "Auf der einen Seite... Auf der anderen Seite...", tr: "Bir taraftan... Öte taraftan..." },
          { de: "Zusammenfassend lässt sich feststellen, dass...", tr: "Özetlemek gerekirse..." },
        ],
      },
      {
        topic: "Umschreibungen und Paraphrasen",
        explanation:
          "Aynı fikri farklı kelimelerle ifade etmek (parafraz) C1 sınavında beklenen bir beceridir. Sinonim kullanımı ve nominalisierung bu becerinin temel araçlarıdır.",
        examples: [
          { de: "Das ist schwierig. → Das stellt eine erhebliche Herausforderung dar.", tr: "Bu zor. → Bu ciddi bir meydan okuma oluşturuyor." },
          { de: "viele Leute → ein Großteil der Bevölkerung", tr: "pek çok insan → nüfusun büyük bölümü" },
          { de: "helfen → Unterstützung leisten / behilflich sein", tr: "yardım etmek → destek sağlamak / yardımcı olmak" },
        ],
      },
    ],
    tipps: [
      "💡 TELC C1 yazma sınavında: giriş cümlesini bir soru veya çarpıcı bir ifadeyle başlatın — 'In der heutigen Zeit ist... eine zentrale Frage.'",
      "💡 Schluss bölümünde kişisel görüşünüzü 'Meiner Meinung nach' yerine 'Aus meiner Perspektive betrachtet' ile ifade etmek üslup açısından daha güçlüdür.",
    ],
  },
};
