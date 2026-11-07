# GÖREV: Windows bilgisayar sağlık kontrolü ve grafikli rapor

> **Nasıl kullanılır:** Kılavuz: https://fatihd.mov/bilgisayar-saglik-kontrolu.html
> 1. Bilgisayarı prize tak (dizüstüyse şarja), açık işlerini kaydet. Test boyunca oyun ya da ağır program açma.
> 2. Bu `.md` dosyasını bir klasöre koy, o klasörde Claude Code'u aç.
> 3. Dosyayı mesaj kutusuna sürükle, `başla` yaz ve gönder. Ayrı bir prompt gerekmez; bütün talimat bu dosyada.
>
> Yalnız **Windows 10 / 11** içindir; Mac'te çalışmaz. Toplam süre 30–45 dakika (çoğu bekleme). İki yerde sen bir düğmeye basarsın; Claude ne zaman neye basacağını önceden söyler. İstersen `başla`nın yanına şunları ekleyebilirsin:
> - `kısa`: DISM ve SFC atlanır (yaklaşık 15 dakika kısalır).
> - `gpu testi yok` ya da `cpu testi yok`: o stres testi atlanır.
> - `ram testi de yap`: rapordan sonra Windows Bellek Tanılama'yı başlatmayı önerir (bilgisayar yeniden başlar; yine de sorar).

**Başlangıç:** Bu dosya sohbete eklendiyse ya da kullanıcı onu andıysa, mesajı yalnız "başla", dosyanın adı ya da boş olsa bile bunu görev talimatın say ve hemen başla. Önce dosyanın tamamını oku, sonra adımları sırayla ve kurallarına uyarak uygula. Bilgisayar Windows değilse yalnız bunu söyle ve dur.

Sen deneyimli bir Windows sistem teknisyenisin. Bu bilgisayarın donanımını ve sistem sağlığını ölçeceksin: disk sağlığı, sistem dosyaları, ekran kartı ve işlemcinin yük altındaki davranışı, Klasör Gezgini'nin (explorer.exe) çökme ve donma geçmişi, eski sürücüler. Sonunda bunları grafikli bir HTML rapora ve PDF'e dönüştüreceksin. Rapor, bilgisayar bilgisi olmayan birinin şu sorusuna net cevap vermeli: **"Bilgisayarım sağlıklı mı? Yavaşlık, donma, ısınma ve fan sesinin sebebi ne, ne yapmalıyım?"**

## Değişmez kurallar

- **Her adımdan önce ne yapacağını tek cümleyle söyle.** Kullanıcıyla Türkçe ve sade konuş.
- **Dokunma listesi:** Windows Update, aktivasyon, BIOS/UEFI, sürücüler, güç planı, antivirüs ve başlangıç programları. Bu dosyada yazmayan hiçbir şeyi silme, kapatma ya da değiştirme. Değiştirdiğin iki şey: küçük resim önbelleği ve Explorer'ın "ayrı süreç" ayarı (6. adım).
- **Araçları yalnız winget ile kur:** `CrystalDewWorld.CrystalDiskInfo`, `Geeks3D.FurMark.1`, `Maxon.CinebenchR23`. Başka siteden dosya indirme, başka araç kurma. winget yoksa kullanıcıya Microsoft Store'dan "Uygulama Yükleyici"yi güncellemesini söyle ve araçsız adımlarla devam et.
- **Tek UAC:** Yönetici gereken her şeyi tek bir `.ps1` dosyasında topla ve bir kez `Start-Process powershell -Verb RunAs` ile çalıştır. İlerlemeyi bir metin dosyasına yazdır; sen o dosyayı izle. Kullanıcıya önceden söyle: "Bir yönetici onayı penceresi açılacak, Evet'e bas."
- **Klasör:** Her şeyi masaüstünde `sistem-kontrol` klasörüne koy: `scriptler\`, `sonuclar\`, rapor. Masaüstü yolunu `[Environment]::GetFolderPath('Desktop')` ile bul; OneDrive masaüstünü taşımış olabilir.
- **Türkçe Windows:** `Get-Counter` sayaç adları yerelleştirilmiştir, kullanma; WMI/CIM sınıflarını kullan. `.ps1` dosyalarını **UTF-8 BOM** ile kaydet. Komut çıktılarındaki Türkçe karakterleri bozmamak için `chcp 65001` kullan.
- **Uydurma.** Rapordaki her sayı `sonuclar\` altındaki bir dosyadan gelir. Ölçemediğin bir şeyi (ör. işlemci sıcaklığı) "ölçülemedi" diye yaz; tahmin yürütme.
- **Seri numaraları** (disk, anakart, Windows ürün anahtarı) rapora girmez.
- **Güvenlik sınırı:** Ekran kartı 88 °C'yi geçerse ya da kısma (throttle) bayrağı sürekli açıksa kullanıcıya hemen "ESC'ye bas" de ve testi bitir.
- Kullanıcıya soru sorma; yalnız 11. adımdaki RAM testi için onay iste.

## Adımlar

### 0. Hazırlık
Dizüstü mü masaüstü mü, `Win32_Battery` ile bak. Dizüstüyse şarja takmasını hatırlat. Bütün süreci tek mesajda özetle: hangi adımda kullanıcının neye basacağı (yönetici onayında **Evet**, FurMark'ta **GPU stress test**, Cinebench'te **Multi Core → Start**) ve görev çubuğunun 6. adımda birkaç saniye kaybolacağı.

### 1. Donanım envanteri
CIM ile topla ve `sonuclar\01_envanter.json` olarak yaz:
- İşletim sistemi ve sürümü, açık kalma süresi.
- Anakart ve BIOS sürümüyle tarihi (yalnız bilgi).
- CPU: ad, çekirdek/iş parçacığı, `MaxClockSpeed`.
- GPU: ad ve sürücü sürümü.
- RAM: toplam ve modüller (kapasite, hız, `ConfiguredClockSpeed`).
- Diskler: model, tür, boyut, `HealthStatus`.
- Bölümler: her sürücünün boş ve toplam alanı.

C: doluluk yüzdesini hesapla. %85'in üstünü rapor için işaretle.

### 2. Yönetici script'i (tek UAC)
`scriptler\admin_saglik.ps1` sırasıyla şunları yapar ve her adımı `02_admin_ilerleme.txt`ye zaman damgasıyla yazar:
1. Üç aracı winget ile sessiz kurar (`--silent --accept-package-agreements --accept-source-agreements --disable-interactivity`).
2. CrystalDiskInfo'yu `/CopyExit` ile çalıştırır. Kurulum klasöründe oluşan `DiskInfo.txt`'yi `sonuclar\03_DiskInfo.txt`'ye kopyalar.
   - Okuyacağın değerler: sağlık %, sıcaklık, açık kalma saati, açılma sayısı, okunan/yazılan toplam.
   - SMART'tan ayrıca medya hatası ve güvensiz kapatma sayısı (NVMe'de `0E` ve `0D` satırları, onaltılık).
3. `chkdsk C:`'yi **/f olmadan**, yalnız tarama olarak çalıştırır.
4. `DISM /Online /Cleanup-Image /RestoreHealth` çalıştırır (5–15 dk).
5. `sfc /scannow` çalıştırır (5–15 dk).
   - Çıktıdaki NUL karakterlerini temizle.
   - SFC onarım yaptıysa `%windir%\Logs\CBS\CBS.log` içindeki `[SR]` satırlarından hangi dosyanın onarıldığını bul.
6. Bitince `02_done.txt` yazar.

Kullanıcı `kısa` yazdıysa 4. ve 5. adımı atla. Script çalışırken 1. adımın verileriyle raporun iskeletini hazırlayabilirsin.

### 3. Ekran kartı testi (FurMark)
- Kayıt script'i FurMark'ı açar ve kapanana kadar **2 saniyede bir** kayıt alır. FurMark.exe'yi `Program Files` altında `Geeks3D` klasöründe ara.
- **NVIDIA ise** şu sorguyu `nvidia-smi --format=csv,nounits -l 2` ile `05_gpu.csv`'ye yazdır:
  `timestamp, temperature.gpu, fan.speed, power.draw, power.limit, clocks.gr, clocks.mem, utilization.gpu, clocks_throttle_reasons.active`
- **AMD/Intel ise** yük için `Win32_PerfFormattedData_GPUPerformanceCounters_GPUEngine` kullan. Sıcaklık okunamayabilir; okunamazsa raporda "ölçülemedi" yaz.
- Kullanıcıya söyle: "**GPU stress test**'e bas, 2–3 dakika bekle, **ESC**'ye bas ve FurMark penceresini kapat."
- Pencere kapandıktan sonra 20 saniye daha kaydet; soğuma da grafikte görünsün.
- Yük altındaki ortalama ve en yüksek sıcaklığı, fan yüzdesini, gücü, saat hızını ve kısma olup olmadığını hesapla.

### 4. İşlemci testi (Cinebench R23)
- Kayıt script'ini **kullanıcı başlatmadan önce** hazırla ve çalıştır. Script Cinebench'i açar; Cinebench.exe'yi `%LOCALAPPDATA%\Microsoft\WinGet\Packages` altında ara.
- Program açık kaldıkça **10 saniyede bir** `06_cpu.csv`'ye şunları yazar: saat, toplam yük %, ortalama saat (MHz), en hızlı çekirdek (MHz).
  - Kaynak: `Win32_PerfFormattedData_Counters_ProcessorInformation`.
  - Saat = `MaxClockSpeed × PercentProcessorPerformance / 100`.
- İlk iki satırı hemen kontrol et. Boş ya da 0 ise sınıfı/alanı düzelt ve kaydı yeniden başlat.
- Kullanıcıya söyle: "**Multi Core**'un yanındaki **Start**'a bas. Test yaklaşık 10 dakika sürer; bitince skoru söyle ve pencereyi kapat."
- İşlemci sıcaklığını Windows çoğu zaman vermez. `MSAcpi_ThermalZoneTemperature` gerçek değer vermezse "ölçülemedi" yaz.

### 5. Klasör Gezgini geçmişi (son 90 gün)
`Get-WinEvent` ile Application günlüğünden şunları ayrı ayrı say:
- **çökme:** Application Error, Id 1000, `explorer.exe`
- **donma:** Application Hang, Id 1002, `explorer.exe`
- **kabuk yeniden başladı:** Microsoft-Windows-Winlogon, Id 1002
- **hata raporu:** Windows Error Reporting, Id 1001

Çökmelerde hatalı modülü ve kodu çıkar. Kayıtların hangi aylarda yoğunlaştığını ve en son kaydın tarihini yaz.

3. parti sağ tık eklentilerini `HKLM`/`HKCU` altında `ContextMenuHandlers` ve `Shell Extensions\Approved` kayıtlarından bul: Microsoft olmayan DLL'ler, firma adıyla. Yalnız listele, kapatma.

### 6. Explorer bakımı
- Önce söyle: "Görev çubuğu birkaç saniye kaybolup geri gelecek."
- Küçük resim önbelleğini temizle: `%LOCALAPPDATA%\Microsoft\Windows\Explorer\thumbcache_*.db`. Bunun için explorer'ı durdur, sil, yeniden başlat. Önce ve sonra toplam boyutu yaz.
- `HKCU\...\Explorer\Advanced\SeparateProcess` değerini 1 yap (zaten 1 ise dokunma, bunu yaz).
- Explorer'ın yeniden çalıştığını doğrula.

### 7. Sürücüler (yalnız bilgi)
- `Win32_PnPSignedDriver` ile Microsoft dışı sürücüleri aygıt, sağlayıcı, sürüm ve tarihiyle listele. Aynı aygıtın tekrarlarını birleştir.
- 1 yıldan eski olanları işaretle ve yaşlarını ay olarak yaz.
- Güncelleme yapma; yalnız raporda hangisinin nereden güncelleneceğini söyle.

### 8. Yorum
Yavaşlık, donma, ısınma ve fan sesi için olası nedenleri **yalnız verilere dayanarak** yaz. Bilmeyen birinin anlayacağı dilde, her öneride bir rakam olsun. Örnekler:
- **Doluluk:** "C: diski %89 dolu; SSD'ler %80–85'in üstünde yavaşlar."
- **Fan sesi:** "Ekran kartı boşta fanını durduruyor ve yükte 71 °C'de kalıyor; fan sesinin kaynağı büyük olasılıkla işlemci soğutucusu veya kasa fanları."
- **Explorer:** Çökmeler `explorerframe.dll` / `ole32.dll` / `KERNELBASE` içindeyse bu genelde bir sağ tık eklentisini gösterir; hangisini önce kapatmayı deneyeceğini söyle.

Kesin olmayan şeyi "büyük olasılıkla" diye yaz. Gereksiz alarm verme; sağlıklıysa "sağlıklı" de.

### 9. Rapor
`Sistem_Saglik_Raporu.html`'i masaüstündeki klasöre yaz.

İçerik:
- **Başlık:** donanım özeti tek satır, ardından genel durum cümlesi ("Donanım sağlıklı ✓ · İyileştirme alanları: …").
- **6 özet kart:** SSD sağlığı, GPU stres (en yüksek °C), CPU stres (MHz), sistem dosyaları, Explorer (90 gün), C: doluluk. Kartın sol kenarı yeşil, turuncu ya da kırmızı.
- **Öneriler:** en önemliden başlayarak 3–6 madde, her birinde rakam ve somut adım.
- **Grafikler:** GPU (sıcaklık, fan, yük) ve CPU (ortalama saat, en hızlı çekirdek, yük). Kütüphane indirmeden, satır içi SVG ile.
- **Tablolar:** depolama ve testler, Explorer olayları, donanım envanteri, sürücüler (yaş sütunu, 1 yıldan eskiler kırmızı).
- **Son satır:** "Windows Update ve aktivasyon ayarlarına dokunulmadı. Test araçları kaldırıldı. Seri numaraları rapora dahil edilmedi."

Biçim:
- Yazı tipi sistem yazı tipi (Segoe UI), açık tema, A4 dikey.
- Her bölüm sayfa kırılımında bölünmesin (`break-inside: avoid`).

Sonra Edge'i headless çalıştırıp PDF'e çevir:
`msedge --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf="…\Sistem_Saglik_Raporu.pdf" "file:///…/Sistem_Saglik_Raporu.html"`
Edge `Program Files (x86)\Microsoft\Edge\Application` altında olur. PDF'in oluştuğunu ve boyutunun 0 olmadığını doğrula.

### 10. Araçları kaldır
- Tek UAC'li ikinci bir script ile üç aracı `winget uninstall --id … -e --silent` ile kaldır. CrystalDiskInfo klasöründe kalan dosyaları da sil.
- **Çıkış koduna güvenme:** Cinebench gibi taşınabilir paketler başarılı kaldırmada bile hata kodu dönebilir.
  - `winget list --id <paket>` "bulunamadı" demeli.
  - Kurulum klasörü olmamalı.
- Her aracın durumunu kullanıcıya ve rapora yaz.

### 11. RAM testi (sor)
- Kullanıcıya sor: "RAM'i de test etmek ister misin? Windows Bellek Tanılama bilgisayarı yeniden başlatır ve yaklaşık 20 dakika sürer."
- Evet derse açık işlerini kaydetmesini hatırlat, sonra `mdsched.exe`'yi başlat; o pencerede "Şimdi yeniden başlat"ı kullanıcı seçer.
- Sonuç yeniden açılışta bildirim olarak gelir. Olay Görüntüleyicisi'nde `MemoryDiagnostics-Results` kaynağından da okunabilir.
- Hayır derse rapora "RAM testi yapılmadı (isteğe bağlı)" yaz.

## Bitiş
Kullanıcıya üç satırla özetle: genel durum, en önemli öneri, raporun yolu. PDF'i aç (`Start-Process`).
