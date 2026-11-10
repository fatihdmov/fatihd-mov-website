# Duruş Koçu: kambur oturunca ekran bulanıklaşır

**Başlangıç:** Bu dosya sohbete eklendiyse, mesaj sadece "başla" ya da boş olsa bile
görevin şu: aşağıdaki uygulamayı bu bilgisayarda sıfırdan kur, çalıştır, test et ve
kullanıcıya kullanıma hazır teslim et. Kullanıcıya soru sorma. Bütün kararları bu
dosyaya göre sen ver, belirsiz kalan yerde en güvenli ve en basit seçeneği seç.
Kullanıcıdan isteyebileceğin tek şey, işletim sisteminin onay penceresiyle verilen
izinler (kamera, ekran kaydı, erişilebilirlik) ve sonda yapılacak 1 dakikalık canlı test.
"başla"dan sonra yazılan ek istekler (ör. "başla, hassasiyet yüksek") bu dosyadaki
varsayılanların önüne geçer.

## Ne yapıyoruz
Bilgisayarın kamerası, kullanıcının oturuşunu canlı izler. Kullanıcı öne eğilip
kamburlaşınca birkaç saniye içinde tüm ekran yavaşça bulanıklaşır ve ortada
"Dik otur" yazar. Kullanıcı dikleştiği an ekran yumuşakça netleşir. Her şey
bilgisayarın içinde çalışır: görüntü kaydedilmez, internete hiçbir şey gönderilmez
(sadece ilk kurulumda poz modeli bir kere indirilir).

## Önce ortamı tanı
1. İşletim sistemini, ekran sayısını ve çözünürlüklerini, ölçeklendirmeyi (HiDPI)
   ve kameranın varlığını kontrol et. Windows ve macOS ikisi de desteklenmeli.
   Bulduklarını tek satırda kullanıcıya söyle.
2. Proje klasörü: kullanıcının Masaüstünde `durus-kocu`. Varsa üzerine yazmadan önce
   içine bak. Başka bir projeyse `durus-kocu-2` kullan.
3. Python: MediaPipe en yeni Python sürümlerinde sorun çıkarabildiği için proje
   içinde **Python 3.11 veya 3.12** ile bir sanal ortam (venv) kur. Sistemde yoksa
   resmi yollardan biriyle kur: `uv python install 3.12`, Windows'ta
   `winget install Python.Python.3.12`, Mac'te python.org kurucusu ya da Homebrew.
   Sistem Python'una paket kurma.

## Teknik tercih (bunu kullan, takılırsan eşdeğerine geç)
- **Poz takibi:** MediaPipe Tasks `PoseLandmarker`, *lite* model. Modeli Google'ın
  resmi MediaPipe model adresinden `models/` klasörüne indir. Tasks API çalışmazsa
  `mediapipe.solutions.pose`'a geç. Kamera karesini işlemeden önce yaklaşık 320 px
  genişliğe küçült. Hedef işlem hızı 10–15 kare/sn, işlemci kullanımı düşük olsun.
- **Arayüz:** PySide6 (overlay pencereleri, köşe paneli, sistem tepsisi).
- **Ekran görüntüsü:** `mss`. **Bulanıklık:** OpenCV `GaussianBlur`.
- **Kısayollar:** pynput ile genel kısayollar. İzin verilmezse sistem tepsisi menüsü
  yeterli, uygulama yine de çalışmalı.
- Paketler: `mediapipe opencv-python PySide6 mss numpy pynput`. Hepsini venv'e kur
  ve `requirements.txt`'ye sürümleriyle yaz.

## Davranış

### 1. Kalibrasyon
Uygulama açılınca küçük bir pencere çıkar: "Dik otur, ekrana bak: 3… 2… 1…".
3 saniye boyunca ölçüm alınır ve ölçümlerin medyanı kullanıcının "dik" hali olarak
kaydedilir. Tepsi menüsünde "Yeniden kalibre et" seçeneği bulunur.

### 2. Duruş puanı (0–100, kalibrasyon = 100)
Kullanılacak landmark'lar: burun, iki kulak, iki omuz. Ölçüler omuz genişliğine
bölünerek kameraya uzaklıktan bağımsız hale gelir:
- **Boyun yüksekliği:** (omuz ortası y − kulak ortası y) / omuz genişliği.
  Baş öne düşünce azalır.
- **Yaklaşma:** anlık omuz genişliği / kalibrasyondaki omuz genişliği.
  Ekrana doğru eğilince büyür.
- **Burun düşüşü:** (burun y − kalibrasyondaki burun y) / kalibrasyondaki omuz genişliği.

Her ölçü kalibrasyondan ne kadar saparsa o kadar ceza alır, ağırlıklı toplam
100'den düşülür. Puanı üstel hareketli ortalama ile yumuşat, titremesin.
Hassasiyet ayarı `config.json` içinde durur (`dusuk` / `orta` / `yuksek`,
varsayılan `orta`). Eşikleri gerçek testte ayarla.

### 3. Bulanıklaşma
- Puan **70'in altında 2 saniye** kalırsa kambur sayılır. Demo modunda bu süre 0,7 sn.
- O anda, overlay görünmeden önce, **tüm ekranların** görüntüsünü al.
  Görüntüyü 1/4'e küçült ve 8 bulanıklık seviyesini önceden hesapla.
- Her ekrana çerçevesiz, her zaman üstte duran, tam ekran bir overlay aç.
  Görev çubuğunu ve menü çubuğunu da kaplasın. Bulanıklık yaklaşık 2,5 sn içinde
  seviye seviye artsın, yumuşak geçişle. En yüksek seviye, kamburluğun derecesine göre
  belirlensin. Ortada sade ve büyük bir "Dik otur" yazısı dursun.
- HiDPI'da dikkat: mss fiziksel piksel verir, Qt mantıksal piksel kullanır.
  Görüntüyü her ekranın `devicePixelRatio` değerine göre eşle, kayma olmasın.
- Puan **80'in üstüne** çıkıp 0,5 sn orada kalırsa ekran 0,6 sn'de netleşir ve
  overlay kapanır. Eşikler arasındaki boşluk, ekranın yanıp sönmesini engeller.
- Ekran görüntüsü izni yoksa (Mac'te Ekran Kaydı izni): gerçek bulanıklık yerine
  buzlu, yarı saydam bir perdeye düş. Uygulama yine çalışsın ve izin eksikliğini
  bir kez söylesin.

### 4. Güvenlik: kullanıcı asla kilitli kalmamalı
- Kadrajda kimse yoksa (masadan kalkılmışsa) ya da kamera koparsa bulanıklık olmaz,
  açık overlay hemen kapanır.
- `Esc` overlay'i kapatır ve uygulamayı 1 dakika duraklatır.
- `Ctrl+Alt+P` (Mac: `Cmd+Option+P`) 15 dakika duraklatır, tekrar basınca devam eder.
  `Ctrl+Alt+Q` (Mac: `Cmd+Option+Q`) uygulamayı kapatır.
- Tepsi menüsünde şunlar bulunur: Duraklat 15 dk, Yeniden kalibre et,
  Paneli göster/gizle, Bugünün özeti, Çık.
- Uygulama çökerse overlay da onunla birlikte kapanmalı. Overlay'i ayrı bir süreçte açma.

### 5. Köşe paneli (videoda görünecek kısım, özenli olsun)
Sağ alt köşede her zaman üstte, sürüklenebilir, köşeleri yuvarlak bir panel:
- Ayna görüntüsü kamera küçük resmi. Üzerinde kulak, omuz ve burun noktaları ile
  aralarındaki çizgiler çizilir.
- Büyük puan rakamı ve renk: 80+ yeşil "Dik", 70–80 sarı "Dikkat", 70 altı kırmızı "Kambur".
- Puanın son 60 saniyesini gösteren küçük bir çizgi grafik.
- `Ctrl+Alt+W` paneli gösterir/gizler. Demo modunda panel 1,6 kat büyük olur.

### 6. Günlük özet
Dakikada bir satır, kullanıcının ana klasöründeki `durus-kocu/kayit.csv` dosyasına
yazılır: zaman, ortalama puan, dik oturulan saniye, uyarı sayısı. Tepsiden
"Bugünün özeti" seçilince ya da çıkışta sade bir kart açılır: bugün dik oturma
yüzdesi, kambur uyarısı sayısı, en uzun dik seri (dakika). Görüntü hiçbir zaman kaydedilmez.

### 7. Çalıştırma
- `python app.py` normal mod. `python app.py --demo` çekim modu: tepki hızlı,
  panel büyük.
- `python app.py --overlay-test`: kamerasız öz-test. 3 sn bulanıklaşır,
  2 sn bekler, netleşir ve kapanır.
- Çift tıklanınca açılan başlatıcılar: Windows'ta `Duruş Koçu.bat` ve
  `Duruş Koçu (demo).bat`, Mac'te aynı isimlerle `.command` dosyaları (çalıştırılabilir yap).
  Masaüstündeki proje klasöründe dursunlar.

## Kabul testleri (kullanıcıya teslim etmeden önce kendin çalıştır)
Her testi süre sınırıyla çalıştır. Hiçbir test ekranı kalıcı olarak kaplamamalı.
1. Bütün paketler import ediliyor ve model yükleniyor.
2. Kamera açılıyor, 5 saniyede en az 40 kare işleniyor.
   Bu sırada işlemci kullanımını ölç ve not et.
3. `--overlay-test` her ekranda doğru yerde açılıp kapanıyor.
   Overlay açıkken alınan bir ekran görüntüsüyle bunu doğrula.
4. Kadrajda kimse yokken overlay açılmıyor.
5. Kısayollar ya da tepsi menüsü ile duraklatma ve çıkış çalışıyor.
Bir test kalırsa düzelt ve yeniden çalıştır. Atladığın bir test olursa nedenini söyle.

## Son adım: kullanıcıyla 1 dakikalık canlı test
Uygulamayı `--demo` ile başlat ve kullanıcıya sırayla şunu yaptır:
1. Kalibrasyonda dik otursun.
2. Yavaşça öne eğilip kamburlaşsın: ekran bulanıklaşmalı.
3. Dikleşsin: ekran netleşmeli.
Erken tetikleniyor ya da hiç tetiklenmiyorsa, kullanıcının "çok hassas" /
"hiç bulanıklaşmadı" gibi cevabına göre eşikleri ayarla ve testi tekrarlat.

## Teslim mesajı (kısa)
Kullanıcıya şunları söyle: nasıl açılır (başlatıcı dosyalar), kısayollar,
nasıl yeniden kalibre edilir, verilerin nerede durduğu (görüntü kaydedilmez)
ve testlerde ölçülen işlemci kullanımı.
