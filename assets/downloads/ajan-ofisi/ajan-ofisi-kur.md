# Dijital Ajan Ofisi Kurulum Rehberi (Claude Code için)

> **Bu dosyayı kim okur?** Claude Code okur. Siz sadece "ofis" klasöründe Claude Code'u açıp şunu yazarsınız:
> `ajan-ofisi-kur.md dosyasını oku ve beni adım adım yönlendirerek ofisimi kur.`
>
> Bu rehber hazır bir ofis vermez. Claude size sorular sorar ve **sizin** projelerinizden **sizin** ofisinizi kurar.
> Fikir fatihd.mov'un kendi ofisinden geliyor; kod sizin bilgisayarınızda, sizin için sıfırdan yazılır.

---

## Claude, önce bunu oku: senin görevin

Kullanıcının bilgisayarındaki Claude Code proje klasörlerini **tek bir yerel panelde** "çalışan ekip" olarak
göstereceksin. Her proje klasörü bir çalışandır. Kullanıcı panele bir görev yazar, görev doğru çalışana gider,
o çalışan kendi klasöründe Claude Code ile işi yapar ve rapor verir.

Kullanıcı büyük ihtimalle **kod bilmiyor**. Bu yüzden:

- Türkçe, kısa ve sade konuş. Teknik terim kullanacaksan bir cümleyle ne olduğunu açıkla.
- **Soruları tek tek sor**, her cevabı bekle. Aynı anda 10 soru sorma.
- Her aşamanın sonunda kullanıcıya "şimdi şunu dene" de ve sonucu ona sor. Kullanıcı test eder, sen düzeltirsin.
- Kullanıcının onayı olmadan sistem ayarı değiştirme, program kurma veya klasör silme.
- Kodu sade tut. İlk sürüm çalışsın, süslemeyi sonra yaparız.

---

## Aşama 0: Tanışma (önce sadece soru sor, kod yazma)

Sırayla şunları öğren:

1. **İşletim sistemi:** Windows mu, Mac mi? (Komut satırı komutları buna göre değişir.)
2. **Claude planı:** Pro mu, Max mı? (Hangi çalışanın hangi modeli kullanacağına bununla karar vereceğiz.)
3. **Çalışan klasörleri:** Projeleriniz hangi klasörde? (Örnek: Masaüstü/Claude Projelerim.)
   Projeler farklı yerlerde olabilir; kullanıcı her birinin yolunu ayrı ayrı da verebilir. Hepsini tek listede topla.
   O klasörlere bak, listele ve kullanıcıya göster: "Şu klasörleri buldum, her biri bir çalışan olsun mu?"
   Her klasörün CLAUDE.md dosyasını oku. Yoksa kullanıcıya söyle; CLAUDE.md'siz çalışan, iş tanımı olmayan çalışan gibidir.
4. **Her çalışan için:**
   - Ofiste görünecek unvanı ne olsun? (Örnek: "Muhasebeci", "Video Editörü")
   - Tek cümleyle ne iş yapıyor?
   - Dosya düzenleyebilsin mi, yoksa sadece okusun mu?
   - İnternette arama yapabilsin mi?
   - Bir dış servise bağlı mı (MCP)? Bağlıysa bu çalışan o servisin **hangi araçlarını** kullanabilsin?
     (Kural: yayınla, sil, ödeme yap, gönder gibi araçlar **asla** izin listesine girmez.)
   - Hangi model? Önerin: düşünmesi gereken işlere Opus, sadece bir araç çalıştıran işlere Sonnet.
     Pro planda limitin hızlı dolmaması için emin değilsen Sonnet öner.
5. **Ekipler:** Çalışanları gruplamak ister mi? (Örnek: İçerik Ekibi, Finans, Teknoloji.) Bir ekip, panelde bir oda ya da bir bölümdür.
6. **Hiçbir çalışanın dokunmaması gereken klasör var mı?** (Gerçek ödeme, gerçek sipariş, müşteri verisi gibi.) Bunları "yasak klasörler" diye not et.
7. **Görünüm:** İlk sürüm sade bir 2D panel olacak (kartlar ve renkler). Kullanıcı isterse en sonda 3D ofis görünümü ekleriz.

Topladıklarını kullanıcıya bir tablo halinde göster ve onay al. Onaydan sonra Aşama 1'e geç.

---

## Aşama 1: Ayar dosyası (`ofis.config.json`)

Bütün kişiselleştirme tek bir dosyada durur. Kullanıcı ileride bir çalışan eklemek isterse sadece bu dosya değişir.

```json
{
  "ofis": { "ad": "<kullanıcının ofis adı>", "port": 4747 },
  "genelMudur": { "model": "sonnet" },
  "varsayilan": { "model": "sonnet", "araclar": ["Read", "Write", "Edit", "Glob", "Grep", "WebSearch", "WebFetch", "TodoWrite"] },
  "ekipler": [ { "id": "icerik", "ad": "İçerik Ekibi" } ],
  "calisanlar": [
    {
      "id": "muhasebeci",
      "rol": "Muhasebeci",
      "ekip": "finans",
      "klasor": "C:/Users/.../claude projelerim/muhasebeci",
      "aciklama": "Faturaları ve giderleri okur, özet çıkarır",
      "model": "sonnet",
      "araclar": ["Read", "Glob", "Grep"],
      "mcpIzin": {}
    }
  ],
  "yasakKlasorler": []
}
```

- `araclar`: Claude Code'un yerleşik araçları. Sadece okuyacak çalışana `Read, Glob, Grep` yeter.
- **`Bash` kimseye varsayılan olarak verilmez.** Bir çalışan gerçekten komut çalıştıracaksa (örnek: Remotion ile video üreten
  video editörü) sadece o komutlara dar izin ver: `"Bash(npx remotion:*)"`. Kullanıcıya bunun ne demek olduğunu açıkla.
  Başsız modda çalışan izin soramaz; izin listesinde olmayan komutta takılır. Bu yüzden çalışanın CLAUDE.md'sindeki
  komutlarla izin listesini birlikte kontrol et.
- `mcpIzin`: `{ "bağlantı-adı": ["araç1", "araç2"] }`. Sadece okuma ve üretim araçları. Yayınla, sil, gönder, ödeme araçları yok.
- Yasak klasörler listesindeki hiçbir klasör `klasor` olarak kullanılamaz. Bunu kodda da kontrol et.

---

## Aşama 2: Sunucu (çalışanları çalıştıran motor)

Bağımlılık gerektirmeyen tek bir Node.js dosyası yaz (`server.js`). Node kurulu değilse kullanıcıya nasıl kuracağını anlat.

**Güvenlik:** Sunucu sadece `127.0.0.1` adresini dinler. Ofis internete açılmaz, sadece bu bilgisayardan görülür.

### Bir çalışanı çalıştırmak

Her görev, çalışanın **kendi klasöründe** başsız (headless) bir Claude Code çağrısıdır:

```
claude -p --output-format stream-json --verbose
       --model <çalışanın modeli>
       --permission-mode acceptEdits
       --allowedTools <araclar> <mcp araçları>
       --append-system-prompt "<ofis kuralları, aşağıda>"
```

- Çalışma klasörü (`cwd`) = çalışanın klasörü. Böylece Claude o klasörün **CLAUDE.md** dosyasını kendiliğinden okur.
- Görev metni komutun argümanı olarak değil, **stdin** üzerinden verilir. Türkçe karakter ve tırnak sorunlarını önler.
- **Windows:** `claude` komutunu bir kabuk (cmd/PowerShell) üzerinden değil, doğrudan `claude.exe` dosyasını başlatarak çalıştır.
  Dosyanın yerini kullanıcıyla birlikte bul (`where claude` veya `Get-Command claude`). Yolu ayar dosyasına yaz.
- Sunucu bir Claude Code oturumunun içinden başlatılırsa, alt sürece giden ortam değişkenlerinden `CLAUDECODE` ve
  `CLAUDE_CODE_` ile başlayanları temizle. Yoksa iç içe oturum hatası çıkabilir.
- MCP bağlantısı olmayan çalışanlara `--strict-mcp-config --mcp-config '{"mcpServers":{}}'` ekle. Böylece hiçbir dış servis yüklenmez
  ve gereksiz araç tanımları token yakmaz.
- `stream-json` çıktısındaki olayları oku: araç kullanımı ("dosya okuyor", "internette arıyor") panelde canlı görünsün.
  `result` olayındaki `usage` ve `session_id` bilgisini sakla.
- `ANTHROPIC_API_KEY` ortam değişkeni tanımlıysa kullanıcıyı uyar: bu durumda Claude aboneliği değil, **ücretli API** kullanılır.

### Her çalışana eklenen ofis kuralları (`--append-system-prompt`)

```
Sen <ofis adı> ofisinde <rol> olarak çalışıyorsun. Patronun <kullanıcının adı>.
Bulunduğun klasördeki CLAUDE.md bu işin kurallarıdır; ona sadık kal.
Yeni dosyaları "ofis-ciktilari/<tarih>-<görev no>/" klasörüne kaydet.
YASAK: hiçbir şeyi yayınlama, paylaşma, mesaj veya e-posta gönderme, ödeme veya sipariş yapma,
canlı veritabanına yazma, mevcut dosyaları silme. Bunlar gerekiyorsa taslağını hazırla ve raporda
"onay gerekiyor" yaz.
Bitirince kısa bir rapor yaz: ne yapıldı, dosyalar nerede, onay bekleyen ne var.
```

### Oturumlar

- Her görev yeni bir oturum açar. Kullanıcının o klasörde açık duran sohbetine yazmaz.
- Oturum numarasını görev kartında göster. Kullanıcı isterse o klasörde `claude --resume <numara>` yazıp
  aynı konuşmaya kaldığı yerden devam edebilir.
- Her çalışanın kendi iş sırası olsun. Bir çalışan meşgulse yeni iş sıraya girer.

### Genel müdür (görevi doğru kişiye yönlendiren)

Kullanıcı görevi "otomatik" gönderirse önce genel müdür çalışır. Genel müdür iş yapmaz, sadece plan çıkarır:

```
claude -p --output-format json --model <genelMudur.model>
       --tools "" --no-session-persistence
       --strict-mcp-config --mcp-config '{"mcpServers":{}}'
       --system-prompt "<çalışan listesi + kurallar>"
```

- `--tools ""`: hiçbir araç yok, sadece düşünür. Bu yüzden ucuzdur.
- Sistem prompt'u: çalışanların id, rol ve tek cümlelik açıklaması. Kurallar: en az adım kullan, çoğu iş **tek** çalışana gider,
  zincir sadece bir çalışanın çıktısı diğerine gerçekten lazımsa kurulur. Sadece şu JSON'u döndür:
  `{"ozet":"<tek cümle>","adimlar":[{"birim":"<id>","gorev":"<net talimat>"}]}`
- Zincirde önceki çalışanın raporu (en fazla ~4000 karakter) sonrakine eklenir.
- Kullanıcı panelden doğrudan bir kişi seçerse genel müdür **atlanır**. Bu hem hızlı hem tasarrufludur. Kullanıcıya bunu söyle.

### Uç noktalar

- `GET /` → panel
- `GET /api/akis` → canlı olaylar (Server-Sent Events): çalışan durumu, canlı log, görev, token istatistiği
- `POST /api/gorev {metin, hedef}` → `hedef`: `"otomatik"` ya da bir çalışan id'si
- `POST /api/gorev/:id/durdur` → çalışan süreçlerini durdurur
- `POST /api/gorev {..., demo: true}` → **token harcamadan** sahte bir akış oynatır. Önce bununla test et.

Görev geçmişini ve toplam token sayısını `veri/gorevler.json` dosyasına yaz.

---

## Aşama 3: Panel (`public/index.html`)

İlk sürüm sade olsun:

- Her ekip bir bölüm, her çalışan bir kart: unvan, tek cümlelik açıklama ve durum (boşta / düşünüyor / çalışıyor / bitti / hata).
- Çalışırken kartta o an ne yaptığı yazsın ("📖 CLAUDE.md okuyor", "🌐 internette arıyor").
- Altta görev kutusu: metin, "kime?" seçimi (otomatik ya da kişi) ve gönder düğmesi.
- Sağda canlı akış ve görev listesi. Görev kartında rapor, çıktı klasörü ve `claude --resume` komutu görünsün.
- Üstte toplam token sayacı. Not: Claude'un gösterdiği dolar tutarı **API fiyatıyla tahmindir**. Abonelikle çalışırken
  kartınızdan ayrıca para çekilmez, kullanım limitinizden düşer. Panelde bunu küçük bir notla yaz.
- Gizlemek istediği bir ad varsa (marka adı, müşteri adı) ekranda "Marka 1" gibi takma ad göstermeyi öner.
  Gerçek ad sadece çalışanın prompt'una gider. Video çekecek ya da ekran paylaşacak kişiler için çok işe yarar.

Kullanıcıya bir başlatma dosyası hazırla (Windows'ta `baslat.bat`, Mac'te `baslat.command`): sunucuyu açsın ve tarayıcıyı başlatsın.

**Burada dur.** Kullanıcıya önce demo görevi denet, sonra tek bir çalışana gerçek ve küçük bir görev verdir.
Rapor geldikten sonra token sayısını birlikte inceleyin.

---

## Aşama 4: Bağlantılar (MCP), isteğe bağlı

- Kullanıcının claude.ai'de bağladığı bağlayıcılar başsız (`claude -p`) modda **yüklenmeyebilir**.
  Böyle olursa bağlantıyı o çalışanın klasörüne yerel olarak ekle:
  `claude mcp add --scope local --transport http <ad> <servisin MCP adresi>`
  Sonra kullanıcı o klasörde Claude Code'u **normal (etkileşimli)** açar, `/mcp` yazar ve bir kez giriş yapar.
- Servis araçlarının gerçek adları `mcp__<ad>__<araç>` biçimindedir. İlk çalışmada `init` olayındaki araç listesinden doğrula.
- Kredi harcayan servislerde (görsel, video, ses üretimi) çalışanın kuralına "görev başına tek üretim, fazlası için onay iste" yaz.

## Aşama 5: Rutinler ve telefona bildirim, isteğe bağlı

- Çalışana zamanlanmış görev ekle: `"rutinler": [{"ad": "...", "tekrar": "gunluk|haftalik|aylik-son-gun", "gun": 1, "saat": "08:00", "gorev": "..."}]`
- Sunucu açıkken her 30 saniyede bir kontrol et. Bilgisayar kapalıyken kaçan rutini birkaç saat içinde telafi et.
  Yeni eklenen rutin ilk görüldüğünde hemen çalışmasın.
- Rapor telefona **Telegram** ile gidebilir:
  1. Telegram'da **@BotFather**'a `/newbot` yaz, bota ad ver, verdiği **token**'ı al.
  2. Botuna bir mesaj at, sonra `https://api.telegram.org/bot<TOKEN>/getUpdates` adresinden **chat id**'ni bul.
  3. Token ve chat id'yi ayar dosyasına yaz. Mesajı çalışan değil **sunucu** gönderir ve sadece kullanıcının kendi sohbetine gönderir.
- Uyar: Token bir şifredir. Ekran kaydı veya ekran paylaşımında görünmesin.

## Aşama 6: Görünüm, isteğe bağlı

Her şey çalıştıktan sonra kullanıcı isterse paneli güzelleştir: masalar, karakterler, 3D ofis (Three.js), gündüz/akşam modu.
Önce çalışan bir sistem, sonra güzel bir sistem.

---

## Token tasarrufu kuralları (kullanıcıya da anlat)

1. Ofisin kendisi (panel, görünüm, boştaki çalışanlar) **hiç token harcamaz**. Token sadece bir görev çalışırken harcanır.
2. Panelden verilen görev, o klasörde terminale yazılan mesajla aynı motoru kullanır. Fark: yeni ve temiz bir oturum açılır
   ve genel müdür devreye girerse onun küçük bir planlama maliyeti eklenir. Kişiyi doğrudan seçerseniz bu maliyet de olmaz.
3. Her çalışana iş için yetecek en hafif modeli verin. Her işe Opus vermek Pro limitini hızlı bitirir.
4. CLAUDE.md dosyalarını kısa ve net tutun. Çalışan bu dosyayı her görevde okur.
5. Rutinleri gerçekten ihtiyaç kadar kurun. Siz uyurken de çalışırlar.
6. Gereksiz MCP bağlantısı yüklemeyin. Her bağlantının araç tanımları her görevde bağlama girer.

## Güvenlik kuralları (asla gevşetme)

- Hiçbir çalışan yayınlamaz, mesaj göndermez, ödeme veya sipariş yapmaz, dosya silmez. Taslak hazırlar, onayı insan verir.
- Gerçek para, gerçek sipariş veya müşteri verisi olan klasörler ofise bağlanmaz.
- Şifreler, API anahtarları ve token'lar CLAUDE.md'ye yazılmaz, ekranda gösterilmez.
- İnternetten indirilen skill veya ajan dosyalarını kurmadan önce oku. Ne yaptığını anlamadığın bir dosyayı çalıştırma.
