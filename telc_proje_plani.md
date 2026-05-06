# TELC Almanca Sınav Hazırlık Platformu - Proje Planı

## 1. Proje Özeti
Bu proje, A1'den C1'e kadar tüm seviyelerde TELC Almanca sınavlarına (Hören, Lesen, Schreiben, Sprechen) girecek öğrencileri hazırlamayı amaçlayan kapsamlı bir web tabanlı öğrenme platformudur. Platform, yapılandırılmış ders içerikleri, gerçek zamanlı sınav simülasyonları, detaylı ilerleme takibi ve AI destekli geri bildirim sistemlerini tek bir çatı altında toplar.

---

## 2. Tasarım ve Kullanıcı Deneyimi (UX/UI)
Platform, modern, karanlık mod (Dark Mode) öncelikli, profesyonel ve kullanıcı dostu bir tasarıma sahip olacaktır. Sağlanan ekran görüntüleri (image_0.png - image_7.png), tasarım dili ve UI bileşenleri için temel referanstır.

### Temel Tasarım İlkeleri:
* **Renk Paleti:** Koyu lacivert arka plan, metinler için beyaz/açık gri, vurgular ve eylem butonları için sarı (gold).
* **Yazı Tipi:** Okunabilir, profesyonel sans-serif yazı tipleri.
* **Bileşenler:** Kart tabanlı arayüz, net ilerleme çubukları, interaktif butonlar.
* **Düzen:** Tutarlı navigasyon, net hiyerarşi, mobil uyumluluk.

---

## 3. Kullanıcı Rolleri
* **Öğrenci:** Sınavlara hazırlanmak için platformu kullanan ana kullanıcı.
* **Yönetici (Admin):** İçerik yönetimi, kullanıcı yönetimi, raporlama.

---

## 4. Platform Mimarisi ve Temel Bölümler

### A. Genel Navigasyon ( image_2.png, image_7.png )
* **Header:** Logotayp (DeutschMeister), Arama çubuğu, Dil seçimi, Kullanıcı menüsü (Avatar, bildirimler), Çıkış yap.
* **Main Nav:** Panel, Öğren, Pratik, Sınav, Kelimeler.
* **Footer:** Hakkımızda, İletişim, Gizlilik Politikası, Sosyal Medya.

### B. Açılış Sayfası (Landing Page - image_1.png)
Yeni kullanıcılar için platformun tanıtımı.
* DM Logosu ve "DeutschMeister" adı.
* Vurgulu Başlık: "TELC Almanca sınavını geçmenin akıllı yolu"
* Alt Başlık: "Yapılandırılmış ders yolu, gerçek sınav simülasyonları ve yapay zeka destekli kişisel geri bildirim ile Almanca öğrenmeyi hızlandırın."
* Ana Eylem Butonları: "Ücretsiz Dene - Seviye Testi Al" ve "Demo Görünümü →".
* Platform Özellikleri Özeti (image_1.png alt kısmı): "5.000+ Kelime", "30+ Ünite", "4 Beceri Alanı", "AI Yazma & Konuşma Değerlendirme".

### C. Seviye Seçimi ve Yol Haritası ( image_4.png )
Kullanıcının mevcut seviyesini belirlemesi veya seçmesi.
* **Seviye Belirleme Testi:** (image_1.png'deki "Seviye Testi Al" butonu ile başlar) Başlangıçta kullanıcının seviyesini tespit eden dinamik bir test.
* **Seviye Kartları:** A1, A2, B1, B2, C1 kartları. Her kart, o seviyenin odak noktasını (örn: A1 Başlangıç, A2 Temel, B1 Orta) ve içeriğini (örn: Temel selamlaşma, sayılar) açıklar.
* **Yol Haritası Görünümü:** Seçilen seviyenin tüm ünitelerini ve bölümlerini içeren, kilitli/açık ünite yapısına sahip bir görsel yol.

### D. Öğrenci Paneli (Dashboard - image_2.png, image_7.png )
Kullanıcının ilerlemesini gösteren ana ekran.

#### 1. Header ( image_2.png )
* **Karşılama Metni:** "Merhaba, [Öğrenci Adı]! 👋"
* **Mevcut Durum:** "7 günlük serindesiniz. Bugün de devam edin!" (Seri takibi).
* **Ana Eylem:** "Devam Et → A2 Ünitesi" (Kaldığı yerden devam etme butonu).

#### 2. İstatistik Kartları ( image_2.png )
* **Mevcut Seviye:** "A2 Mevcut Seviye, TELC Deutsch".
* **Toplam XP:** "4.250 Puan".
* **Çalışma Süresi:** "228 Toplam saat".
* **Mock Sınavlar:** "2 Tamamlanan".

#### 3. Beceri Puanlarım ( image_2.png )
Renk kodlu ilerleme çubukları:
* Hören (%68)
* Lesen (%75)
* Schreiben (%55)
* Sprechen (%48)
* Grammatik (%72)

#### 4. Kelime Hazinesi ( image_2.png )
* Dairesel ilerleme grafiği: "[Seviye] Hedefinin %X'ine ulaştınız".
* Örnek: "1240 / 1000", "A2 hedefinin 124%'ine ulaştınız".
* Buton: "Kelime Çalış →".

#### 5. Bu Haftaki Çalışma ( image_7.png )
* Haftalık çalışma süresini gösteren sütun grafiği (Pt, Sa, Ça, Pe, Cu, Ct, Pz).
* Örnek: "Toplam: 405 dk", "Hedef: 420 dk/hafta".

#### 6. Son Sınavlar ( image_7.png )
* Tamamlanan deneme sınavlarının listesi.
* Örnek: "A2 Full Mock Sınav", Tarih, Puan (%71, Geçti).
* Buton: "Yeni Sınav Başlat".

#### 7. Pratik Kısayolları ( image_7.png )
* Hören Pratiği, Lesen Pratiği, Schreiben, Sprechen (ikonlu butonlar).

---

## 5. İçerik ve Pratik Modülleri

### A. Ünite Yapısı ( image_5.png )
Her seviye, mantıksal ünitelerden oluşur.
* **Ünite Kartı:** Ünite Başlığı (örn: Ünite 1: Beruf und Arbeit), İlerleme yüzdesi, Bölüm sayısı.
* **Bölüm Listesi:** Ünite içindeki interaktif bölümler (örn: Bölüm 1, Bölüm 2... Bölüm 6). Bazıları kilitli olabilir.

### B. Beceri Tabanlı Pratik Araçları ( image_3.png )
Özel çalışma araçları kartları:

#### 1. Hören Simülasyonu
* İkon: Kulaklık.
* Açıklama: Gerçek TELC formatında dinleme sınavları. Ses dosyaları ve otomatik değerlendirme.
* Özellik: Dinleme parçası çalarken metnin takibi (vurgulama).

#### 2. Lesen Pratiği ( image_0.png, image_3.png )
* İkon: Kitap.
* Açıklama: Gazete haberleri, duyurular ve reklam metinleriyle okuma becerisi geliştirme.
* Arayüz (image_0.png):
    * **Metin Paneli:** Almanca okuma metni (örn: "Berlin ist die Hauptstadt...").
    * **Metin Etiketi:** "Metin ~200 kelime".
    * **Soru Paneli:** Metinle ilgili çoktan seçmeli sorular.
    * **Etkileşim:** Öğrenci metinde kelimeleri seçerek işaretleyebilir ("İpucu: Metindeki kelimeleri seçerek işaretleyebilirsiniz.").

#### 3. Schreiben + AI
* İkon: Kalem ve kağıt.
* Açıklama: E-posta ve mektup yazma. Claude AI ile anlık dilbilgisi ve içerik değerlendirmesi.
* Özellik: Yazı girişi, Claude API ile hata düzeltme, yapısal öneriler, TELC kriterlerine göre puanlama.

#### 4. Sprechen Koçu
* İkon: Mikrofon.
* Açıklama: Mikrofon ile konuşma pratiği. Yapay zeka telaffuz ve akıcılık analizi.
* Özellik: Ses kaydı, Claude API ile transkripsiyon ve değerlendirme, TELC konuşma bölümlerinin simülasyonu.

#### 5. Spaced Repetition ( image_3.png, image_6.png )
* İkon: Takvim/Kartlar.
* Açıklama: SM-2 algoritmasıyla kelime kartları. Doğru zamanda doğru tekrar.
* Kelime Kartı Arayüzü (image_6.png):
    * Filtreler: Tümü, A1, A2, B1, B2.
    * Ön Yüz: Almanca kelime (örn: "die Arbeit"), Sesletim ikonu.
    * Arka Yüz: Türkçe çeviri, örnek cümle.
    * Eylem Butonları: "Göster", "Biliyorum" (yeşil çek), "Tekrar gerekli" (mavi oklar).
    * Durum: "[Seviye] İsim".

#### 6. İlerleme Analizi
* İkon: Bar grafiği.
* Açıklama: Beceri bazlı radar grafik, streak (seri) sayacı ve haftalık çalışma raporları.

---

## 6. Sınav Simülasyon Sistemleri (Mock Exams)

### A. Bölüm Sonu Sınavları
Her bölümün sonunda, o bölümün konusunu kapsayan kısa, süreli bir test.

### B. Seviye Sonu Full Mock Sınavlar
Kullanıcı bir seviyenin tüm ünitelerini tamamladığında açılan, gerçek bir TELC sınavının tam süreli simülasyonu.
* **Bölümler:** Hören (Dinleme), Lesen (Okuma), Schreiben (Yazma), Sprechen (Konuşma).
* **Süre:** Gerçek TELC sürelerine sadık kalınır (image_0.png'de görülen 20:00 zamanlayıcısı gibi).
* **Değerlendirme:**
    * Hören ve Lesen: Otomatik olarak anında puanlanır.
    * Schreiben ve Sprechen: Claude API kullanılarak AI tarafından değerlendirilir ve puanlanır.
    * Sonuç ekranı: Detaylı beceri analizi, geçme/kalma durumu, hata raporu (image_7.png).

---

## 7. AI Entegrasyonu (Claude)
Bu platform, öğrenme deneyimini kişiselleştirmek ve otomatikleştirmek için Claude AI'yi kullanacaktır:
1.  **Yazma Değerlendirmesi:** Yazılı ödevlerin dilbilgisi, kelime kullanımı, yapı ve TELC kriterlerine göre analiz edilmesi.
2.  **Konuşma Analizi:** Ses kayıtlarının metne dönüştürülmesi ve dilbilgisi/akıcılık açısından değerlendirilmesi.
3.  **Kişiselleştirilmiş Öneriler:** Öğrencinin zayıf olduğu becerilere göre çalışma planı veya ek pratik önerileri oluşturma.
4.  **Soru Oluşturma:** Metin tabanlı okuma parçaları için dinamik sorular oluşturma (admin tarafında içerik üretimini hızlandırmak için).

---

## 8. Veri Takibi ve Veritabanı Şeması (Özet)
* **Users:** ID, Name, Email, Password, CurrentLevel, Streak, TotalXP, CreatedAt.
* **Levels:** ID, Name, Goal (XP/Vocab), Description.
* **Units:** ID, LevelID, Name, Order, Description.
* **Lessons:** ID, UnitID, Name, Order, ContentType (Read/Listen/Quiz), Content.
* **Vocabulary:** ID, Word, Meaning, ExampleSentence, LevelID, POS.
* **UserVocabulary:** ID, UserID, VocabID, ConfidenceLevel, NextReviewDate (Spaced Repetition verileri).
* **MockExams:** ID, Name, LevelID, Content (JSON), Duration.
* **UserExamAttempts:** ID, UserID, ExamID, Score, AttemptDate, Feedback.
* **UserProgress:** ID, UserID, Skill, Score.
* **UserWorkSessions:** ID, UserID, Date, MinutesWorked.

---

## 9. Geliştirme Yol Haritası (Milestones)

### Aşama 1: Temel ve Dashboard
* Proje kurulumu (React/Next.js, Node.js, Database).
* Kullanıcı Kimlik Doğrulama (Kayıt, Giriş, Profil).
* Dashboard Arayüzünün ve İstatistik Kartlarının Uygulanması.
* Seviye Seçimi ve Yol Haritası Görüntüleme.

### Aşama 2: İçerik ve Okuma Pratiği
* Ünite ve Bölüm Yapısının Kurulması.
* Okuma Metni ve Soru Panelinin (Lesen Pratiği) Uygulanması.
* Temel Veritabanı İçeriğinin Girilmesi.

### Aşama 3: Dinleme ve Kelime Çalışması
* Hören Pratiği Modülünün (Ses Çalma, Metin Takibi) Uygulanması.
* Kelime Kartı ve Spaced Repetition Sisteminin Geliştirilmesi.

### Aşama 4: AI Destekli Yazma ve Konuşma
* Yazma Giriş Panelinin Oluşturulması ve Claude API ile Yazma Değerlendirme Entegrasyonu.
* Konuşma Ses Kaydı ve Claude API ile Konuşma Analizi Entegrasyonu.

### Aşama 5: Mock Sınavlar ve Analiz
* Süre Ölçüm Sisteminin Kurulması.
* Tam TELC Mock Sınav Arayüzlerinin ve Otomatik Puanlama Sistemlerinin Geliştirilmesi.
* Kapsamlı İlerleme Analizi ve Raporlama Panelinin Uygulanması.

### Aşama 6: Admin Paneli ve Cila
* İçerik Yönetimi İçerik Admin Paneli.
* Kapsamlı Test ve Hata Düzeltme.
* Performans Optimizasyonu.

---

**Son Not:** Bu Markdown dosyası, projenin tüm yönlerini kapsayan kapsamlı bir plandır. Geliştiriciler, bu planı her aşamada bir kontrol listesi olarak kullanmalıdır. Ekran görüntüleri, her bir UI bileşeninin görsel stili için ana referans olmaya devam edecektir.
