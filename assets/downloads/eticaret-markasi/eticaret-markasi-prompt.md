# Tek Ürünlük E-Ticaret Markası: Uçtan Uca Üretim Promptu

> **ÜRÜN LİNKİ:** ________________________________________________

Bir AliExpress ürün linkinden Türkiye pazarına yönelik tek ürünlük bir marka çıkarır: ürün ve pazar araştırması, marka sistemi, yerelde çalışan e-ticaret sitesi, Instagram profil paketi ve test planıyla birlikte 6 reklam kreatifi.

## Kullanım

1. Bu dosyayı dosya, terminal ve tarayıcı erişimi olan bir kodlama ajanına (ör. Claude Code) ekle.
2. Ürün linkini yukarıdaki alana ya da mesaja yaz.
3. İstersen aşağıdaki **Ön tercihler** tablosunu doldur. Doldurduğun maddeler soru turunda sorulmaz.
4. Ajan bir kez, Aşama 4'te soru sorar; gerisini kendi karar vererek tamamlar.

**Gerekenler:** Gemini API anahtarı (görsel üretimi ücretlidir). Node 20+, Python 3, ffmpeg ve Playwright yoksa Aşama 1'de kurulur.

## Ön tercihler (isteğe bağlı)

| Karar | Tercih |
|---|---|
| Marka adı | |
| Satış fiyatı ya da fiyat konumu (agresif / dengeli / premium) | |
| Ürün sayfası adresi (slug) | |
| Tasarım yönü (renk ve his, 2-3 kelime) | |
| WhatsApp destek numarası | |

---

# Ajan talimatları

## Başlangıç

- Bu dosya sana eklendiyse görevin budur. Mesajda yalnızca link ya da "başla" yazması yeterlidir.
- Link ne dosyada ne mesajda varsa yalnızca linki iste.
- Kullanıcıya **bir kez**, Aşama 4'te soru sorarsın. Diğer her kararı kendin verir, `KARARLAR.md`'ye tek satır gerekçeyle yazar ve devam edersin.
- Kullanıcıyla Türkçe konuş, "sen" diye hitap et. Aşama geçişlerinde tek satırlık durum notu yaz.

## Bitti tanımı

Üç çıktı teslim edilir:

1. **Web sitesi:** Yerelde çalışan tek ürünlük e-ticaret sitesi (anasayfa, ürün, ödeme, sipariş takip, iletişim ve yasal sayfalar).
2. **Instagram profil paketi:** Logo, bio, 5 öne çıkan (her biri 2-3 story) ve 12 post.
3. **Reklamlar:** 4 statik + 2 hareketli kreatif ve test planı.

Şunlar teslimde bulunmaz: boş bölüm, kırık link, "lorem ipsum" ya da "buraya görsel gelecek" gibi yer tutucu metin. Tek istisna, kullanıcının bilmesi gereken iş bilgileridir (şirket unvanı, adres, MERSİS, ETBİS, WhatsApp numarası): bunlar `[Şirket Unvanı]` biçiminde köşeli parantezle işaretlenir.

Satıcının vermediği hiçbir rakam (ölçü, ağırlık, hacim, çalışma süresi, desibel, alan) hiçbir çıktıda kullanılmaz.

## Çalışma klasörü

Çalışma klasöründe `eticaret-<urun-kisa-adi>/` aç ve her şeyi oraya koy:

```
eticaret-<urun>/
  .env                  # GEMINI_API_KEY (asla commit edilmez)
  .gitignore            # .env, node_modules, .next
  SUREC.md              # aşama başlangıç/bitiş saatleri, görsel sayısı, maliyet, sorunlar
  KARARLAR.md           # verilen her karar, tek satır gerekçeyle
  TESLIM.html           # tek sayfalık teslim özeti (Aşama 11)
  01-urun/              # urun-bilgisi.md, turkiye-pazar-analizi.md, aliexpress-gorseller/
  02-marka/             # MARKA.md, logo/ (SVG + PNG)
  03-gorseller/         # banner/ ozellik/ fayda/ galeri/ yorumlar/ instagram/ reklam/ + _log.jsonl
  site/                 # web sitesi projesi
  04-instagram/         # profil/ one-cikanlar/ postlar/ reklamlar/ profil-onizleme.html
  05-kontrol/           # ekran görüntüleri, KONTROL.md, Lighthouse çıktıları
  scripts/              # görsel üretimi, render, kontrol ve video scriptleri
```

---

## Aşama 1: Ortam

1. Kontrol et: Node 20+, npm, Python 3 (`python3` mü `python` mı, doğrusunu kullan), ffmpeg, Playwright Chromium.
2. Eksik olanı **yönetici yetkisi gerektirmeyen** yolla kur:
   - Node: nodejs.org'daki resmi arşivi checksum'ını doğrulayarak kullanıcı klasörüne aç.
   - ffmpeg: `pip install imageio-ffmpeg` ile gelen ikiliyi kullan.
   - Chromium: `npx playwright install chromium`.
   - `winget` (Windows) ya da `brew` (macOS) varsa onları da kullanabilirsin. Komutlar PowerShell ve zsh'de çalışmalı.
3. **Gemini API anahtarı:** Sırayla `GEMINI_API_KEY`, `GOOGLE_API_KEY` ve proje klasöründeki `.env`'e bak. Görsel üretmeyen bir çağrıyla (`models.list()`) doğrula. Anahtarı ekrana, loga ya da dosyaya yazdırma. Bulunamazsa boş bir `.env` oluştur, anahtarı Aşama 4'te iste ve araştırmaya devam et.
4. Klasör yapısını kur, `SUREC.md`'ye başlangıç saatini yaz.

## Aşama 2: Ürünü öğren

AliExpress sayfaları JavaScript ile yüklenir. Tarayıcı aracın varsa onu, yoksa Playwright'ı kullan. Topla:

- **Temel bilgiler:** Başlık, fiyat (TL değilse güncel kurla çevir), varyantlar, satış sayısı, puan.
- **Özellikler tablosunun tamamı:** Ölçü, ağırlık, malzeme, batarya ve şarj, uyumluluk, sertifikalar, paket içeriği.
- **Açıklama görselleri:** Teknik detayların çoğu buradadır; her görseli açıp oku. Açıklama genellikle ayrı bir adresten yüklenir (sayfa verisinde `descriptionUrl` / `pcDescUrl` gibi bir alan).
- **Yorumlar:** Özellikle 1-3 yıldızlıları oku; zayıf noktaları, SSS'yi ve itirazları buradan çıkar. Ürünün yorumu yoksa bunu açıkça yaz, satıcı puanını ve ürün kategorisinin bilinen sorunlarını kullan ve bunları "kategori bilgisi" diye işaretle.
- **Kargo:** Türkiye'ye gönderim seçenekleri, ücretleri ve teslim süreleri.
- **Görseller:** Hepsini `01-urun/aliexpress-gorseller/`'e indir. İndirilen dosyanın gerçek biçimini kontrol et (`.jpg` uzantılı WebP gelebilir). Bu görseller yalnızca üretim referansıdır; sitede ve Instagram'da kullanılmaz.

Sayfa CAPTCHA ya da giriş ekranı gösterirse aşmaya çalışma; kullanıcıdan sayfanın ekran görüntülerini ya da "farklı kaydet" çıktısını iste. Bu, Aşama 4 dışındaki tek izinli sorudur.

**Çıktı: `01-urun/urun-bilgisi.md`**

- Teknik özellik tablosu; her satırda kaynağı (hangi görsel ya da sayfa alanı).
- Kutu içeriği; doğrulanamayan kalemler işaretli.
- **Bilinmeyenler:** satıcının vermediği bilgiler.
- **Kanıtlanabilir iddialar** ve **kullanılmayacak iddialar** (gerekçesiyle). Örnek: "su geçirmez" yalnızca IP derecesi varsa; "doğa dostu" yalnızca malzeme destekliyorsa; sağlık iddiaları (stres, uyku, bağışıklık) hiçbir koşulda. Site, Instagram ve reklamlardaki her teknik iddia bu dosyadaki bir satıra dayanır.
- Zayıf noktalar ve her birine verilecek cevap.

## Aşama 3: Türkiye pazar analizi

**Çıktı: `01-urun/turkiye-pazar-analizi.md`**

- **Hedef kitle:** 2-3 persona. Her biri için yaş, yaşam tarzı, Instagram davranışı, satın alma tetikleyicisi ve en büyük itirazı.
- **Rakip taraması:** Trendyol, Hepsiburada, Amazon.com.tr ve n11'de aynı ya da benzer ürünler. Tabloda fiyat aralığı, puan ve yorum sayısı, en sık şikâyet. Yorumlarını okuyamadığın bir rakip için şikâyet sütununa ürün tipinin bilinen sorununu yaz ve bunu belirt.
- **Konumlandırma:**
  - Türkçe ürün adı (marka + kısa tanım).
  - Tek cümlelik vaat.
  - 3 ana fayda. Fayda, özelliğin müşteriye sonucudur: "5000 mAh" özellik, "Bir şarjla tüm hafta" faydadır.
  - "İtiraz → cevap" tablosu.
- **Fiyat:**
  - Maliyet kalemleri: ürün, uluslararası kargo, gümrük ve vergi (güncel posta ve hızlı kargo kurallarını araştır, kaynağını yaz), paketleme, yurt içi kargo, ödeme komisyonu, taksit komisyonu, iade karşılığı, KDV.
  - 3 seçenek (agresif, dengeli, premium) ve önerin.
  - Her seçenek için: `reklam öncesi birim kâr = KDV hariç fiyat − birim maliyet − komisyonlar`, `marj = birim kâr ÷ KDV dahil fiyat`, `başa baş ROAS = 1 ÷ marj`, `başa baş CPA = birim kâr`.
  - Psikolojik fiyat ve 1-2-3 adet paket fiyatları.
- **Teslimat:** AliExpress'ten doğrudan gönderimi (süre, kargo, vergi) Türkiye'de stok tutmakla karşılaştır. Sitedeki teslim süresi vaadi bu karara göre belirlenir; kararı `KARARLAR.md`'ye yaz.
- **Teklif:** Paket indirimi, kapıda ödeme (ek ücret varsa tutarı), 12 aya varan taksit; mantıklıysa hediye ya da ücretsiz kargo eşiği.
- **Takvim:** Önümüzdeki 60 gündeki özel günler ve indirim dönemleri; kampanya dilinde kullanılacak ifadeler.
- **Reklam açıları:** 6 açı, her biri için tek cümlelik hook.
- **Yasal çerçeve:** Mesafeli satış, 14 günlük cayma hakkı, indirimli fiyatta "son 30 günün en düşük fiyatı" kuralı, ürün iddiaları ve karşılaştırmalı reklam sınırları, KVKK, ETBİS, elektrikli ürünse CE ve Türkçe kılavuz yükümlülüğü.

## Aşama 4: Tek soru turu

Ürünü ve pazarı öğrendikten sonra **tek mesajda**, numaralı olarak sor. Her soruya önerini ekle ki kullanıcı "önerilenler" ya da "1:B, 4:A" yazarak cevap verebilsin. Ön tercihlerde doldurulmuş maddeleri sorma; mesajın başında hangilerini aynen kullandığını söyle.

```
Ürünü inceledim: <tek cümle ürün özeti> · Türkiye'de en güçlü satış açısı: <tek cümle>.
Kararlarını etkileyen bulgular: <en fazla 3 madde>
Başlamadan şu kararları istiyorum. Hepsinde önerimle devam etmem için "önerilenler" yazman yeterli.

1) Marka adı
   A) <isim>: <neden> · Instagram: @<kullanıcı-adı>
   B) ...
   C) ...
   Önerim: A

2) Satış fiyatı (birim maliyet ≈ X TL)
   A) Agresif: ... TL (başa baş ROAS ...)
   B) Dengeli: ... TL (başa baş ROAS ... · başa baş CPA ...)
   C) Premium: ... TL (başa baş ROAS ...)
   Paketler: 2 adet ... TL, 3 adet ... TL · Önerim: B

3) Ürün sayfası adresi: /<slug>   (reklamlar buraya yönlenecek)

4) Tasarım yönü
   A) <2-3 kelime: renkler ve his>
   B) <2-3 kelime: renkler ve his>
   Önerim: A

5) WhatsApp destek numarası (boş bırakırsan +90 5XX XXX XX XX yer tutucusunu kullanırım)

[Yalnızca anahtar bulunamadıysa]
6) Görseller için Gemini API anahtarı gerekiyor. Proje klasöründeki .env dosyasına
   GEMINI_API_KEY=... satırını ekleyip "tamam" yazman yeterli. Anahtarı sohbete yazma.
```

Cevaptan sonra bir daha soru sorma. Eksik kalan maddeleri kendi önerinle doldur.

## Aşama 5: Marka sistemi

**Çıktı: `02-marka/MARKA.md` + `02-marka/logo/`**

- **Logo:** Kodla çizilmiş SVG; görsel modeliyle üretilmez.
  - Wordmark: seçilen başlık fontunun harfleri eğriye çevrilerek (ör. `fontTools`) SVG path olarak yazılır; böylece font yüklenmeden her yerde aynı görünür.
  - Simge: tek başına kullanılabilen, ürünün silüetinden türetilmiş basit bir işaret.
  - Koyu ve açık zemin sürümleri.
  - 1080×1080 profil fotoğrafı PNG'si: simge ortada, alanın yaklaşık %70'inde (daire kırpmada kesilmez).
- **Renk token'ları:** 1 ana renk, 1 vurgu rengi, nötrler ve kontrast bölüm için bir koyu renk; CSS değişkeni olarak. Her metin/zemin çiftinin WCAG AA kontrastını (normal metin 4,5:1) kontrol et. Site, story, post ve reklamlar aynı token'ları kullanır.
- **Tipografi:** En fazla 2 Google Fonts ailesi, Türkçe karakterleri (ğ ü ş ı İ ö ç) eksiksiz destekleyen, `latin-ext` alt kümesiyle. Gövde en az 400, başlık 600-800, görsel üstü metin en az 500 ağırlık. Tip ölçeği tanımla (ör. 12/14/16/20/28/40/56).
- **İkonlar:** Tek bir çizgi ikon ailesi (Lucide ya da Phosphor). Emoji ikon yok.
- **Yazım kuralları:**
  - "Sen" diye hitap; kısa cümle.
  - Ünlem işareti kullanılmaz (indirim rozetleri dahil).
  - "Devrim", "mucize", "eşsiz", "en iyi", "mükemmel" gibi doğrulanamayan nitelemeler kullanılmaz.
  - Rakam ve teknik iddia yalnızca `urun-bilgisi.md`'de karşılığı varsa yazılır.
- **Fotoğraf stili:** İngilizce, sabit bir blok: ışık (yön, saat), renk paleti, malzemeler ve dokular, mekân, lens, aksesuar listesi, yasak öğeler (görselde yazı, logo, stok fotoğraf pozları). Bu blok her görsel promptunun sonuna aynen eklenir; tüm görseller aynı çekimden çıkmış gibi görünür.

### Arayüz kuralları

Kullanılmaz:
- Mor-mavi gradyanlar, buzlu cam (glassmorphism) kartlar, dekoratif blob ve parıltılar.
- Her bölümün ortalanmış düzeni.
- Aynı boyutta tekrarlanan 3'lü kart ızgarası (sayfada en fazla bir kez).
- Hazır UI kitinin değiştirilmemiş varsayılan teması; varsayılan "Inter + mavi buton".
- Kameraya gülümseyen stok fotoğraf insanları.

Kullanılır:
- Tek vurgu rengi; yalnızca birincil buton, rozet ve küçük vurgularda.
- En az bir bölümde asimetrik ızgara (ör. 5/7 sütun).
- Tek köşe yarıçapı ölçeği (ör. 8 / 14 / 22 px ve hap biçimi).
- Bölüm dikey boşluğu mobilde en az 64 px, masaüstünde en az 112 px.
- Ürünün silüetinden türeyen bir şekil motifi; butonlarda, rozetlerde ve görsel çerçevelerinde tekrar eder.
- Yapı referansı olarak tek ürün odaklı DTC siteleri (Oura, Ember, Our Place, Ridge): tam genişlik ürün fotoğrafı, az sayıda büyük başlık, düşük renk sayısı. Tasarımları kopyalanmaz.

## Aşama 6: Görsel üretimi (Nano Banana 2.1)

Tüm görseller Google **Nano Banana 2.1** ile Gemini API üzerinden üretilir; başka görsel modeli kullanılmaz.

- **Model kimliği:** `gemini-nano-banana-2.1`. Başlamadan `models.list()` ile doğrula; hata verirse güncel kimliği ve parametreleri Gemini API dokümanından al.
- **Toplu üretim (Batch API):** Önce tüm çekim listesini `scripts/cekim-listesi.json`'a yaz. 1-2 kareyi doğrudan üreterek ürün sadakatini ve stili doğrula. Kalan bütün kareleri **tek bir Batch API işiyle** gönder: eşzamanlı çağrıya göre yaklaşık %50 daha ucuzdur ve genellikle dakikalar içinde döner. Yeniden üretimleri de toplu gönder.

`scripts/gorsel_uret.py` (tek kare, doğrulama):

```python
from google import genai
from google.genai import types
from PIL import Image

client = genai.Client()  # anahtarı GEMINI_API_KEY'den ya da .env'den okur
refs = [Image.open(p) for p in referans_yollari]  # AliExpress ürün görselleri
resp = client.models.generate_content(
    model="gemini-nano-banana-2.1",
    contents=[*refs, prompt],
    config=types.GenerateContentConfig(
        response_modalities=["IMAGE"],
        image_config=types.ImageConfig(aspect_ratio="4:5", image_size="2K"),
    ),
)
```

`scripts/gorsel_batch.py` (toplu):

```python
istekler = [
    types.InlinedRequest(
        contents=[types.Content(role="user", parts=[*ref_parcalari, types.Part.from_text(text=prompt)])],
        config=types.GenerateContentConfig(
            response_modalities=["IMAGE"],
            image_config=types.ImageConfig(aspect_ratio=oran, image_size="2K"),
        ),
    )
    for prompt, oran, ref_parcalari in cekimler
]
job = client.batches.create(model="gemini-nano-banana-2.1", src=istekler,
                            config={"display_name": "urun-gorselleri"})
# client.batches.get(name=job.name).state → JOB_STATE_SUCCEEDED olana kadar 30 sn arayla bekle.
# Sonuçlar job.dest.inlined_responses içinde, gönderim sırasıyla gelir.
```

### Kurallar

- **Ürüne sadakat:** Ürünün göründüğü her istekte AliExpress fotoğraflarını referans olarak ver. Promptta ürünü ayrıca tarif et: form, renk, tuşlar, portlar, ekran, oranlar. Ürünün üzerinde satıcı logosu, filigran ya da bizim logomuz olmaz (müşteriye giden ürün logosuzdur).
- **Ürün üzerindeki metin ve rakamlar** (ekran değerleri, tuş simgeleri) promptta açıkça yazılır; yazılmazsa model referanstaki anlamsız değerleri kopyalar.
- **Gerçek boyut:** Ürünün yaklaşık boyunu santimetreyle ve tanıdık bir nesneyle kıyaslayarak yaz; yazılmazsa sahnelerde ürün olduğundan büyük çıkar.
- **Görselde yazı olmaz:** Logo, fiyat, slogan HTML/CSS ile eklenir. Arka planda okunabilir yazı (kitap adı, not kâğıdı, ambalaj) da olmaz; ambalaj sade ve yazısızdır.
- **Promptlar İngilizce** yazılır ve `MARKA.md`'deki fotoğraf stili bloğuyla biter.
- **Kontrol:** Her görseli açıp şu listeye göre bak: ürün formu ve detayları, eller (beş parmak, doğal duruş), okunabilir yazı izi, ürün ölçeği, ortam (Türk evi), renk tonu tutarlılığı. Kusurluyu yeniden üret; kare başına en fazla 3 deneme, sonra en iyisini seç. Elenenleri `_elenen` ekiyle sakla.
- **Kayıt:** Her üretimi `03-gorseller/_log.jsonl`'a yaz: id, dosya, model, oran, saat, mod (doğrudan/batch), prompt.
- **Site için hazırla:** WebP ya da AVIF, en az iki genişlik. PNG orijinaller saklanır.

### Çekim listesi (35-45 görsel)

| Bölüm | Adet | Oran | Not |
|---|---|---|---|
| Anasayfa banner | 4 aday → 1 seçilir | 16:9 masaüstü + 4:5 mobil | Mobil sürüm, seçilen sahnenin dikey kompozisyonudur. Slogan ve buton için ürünün üstüne binmeyen gerçek bir negatif alan. Seçim gerekçesi `KARARLAR.md`'ye. |
| Öne çıkan özellikler | 1 | 4:5 | Sade, premium ürün sahnesi. |
| Fayda / kontrast bölüm | 1-2 | 4:5 | Ürün kullanımda, Türk ev ya da yaşam bağlamında. |
| Ürün galerisi | 6 | 1:1, 2K | 1) açık nötr fonda stüdyo 2) farklı açı 3) detay yakın plan 4) ellerde kullanım 5) yaşam ortamı 6) ölçek ya da kutu içeriği flatlay |
| Müşteri fotoğrafı yer tutucuları | 8 | 3:4 | Aşağıdaki kurallara uy. |
| Instagram ek sahneleri | 3-5 | 4:5 | Post kompozisyonları için. |
| Reklam sahneleri | 2-4 | 4:5 ve 9:16 | Problem anı (ürünsüz) ve kullanım anı. 9:16'da üst %15 ve alt %35 sade bırakılır. |

### Müşteri fotoğrafı yer tutucuları

Yorum kartlarında gerçek müşteri fotoğrafları gelene kadar kullanılır. Telefonla çekilmiş gibi görünmeleri için: orta segment telefon, hafif yamuk kadraj, otomatik pozlama, pencere ışığına karışan lamba ışığı, hafif sensör gürültüsü, arka planda gündelik dağınıklık, profesyonel stil yok.

Ortamlar Türk evlerinden: parke ya da halı, petek, mutfak tezgâhı, balkon, ofis masası, araba içi, yazısız kargo kutusu. 8 karenin her biri farklı mekânda, farklı ışıkta ve günün farklı saatinde. Yüz görünmez ya da kısmen görünür (el, kol, omuz).

## Aşama 7: Web sitesi

### Teknik yapı

- **Altyapı:** Next.js (App Router) ve TypeScript. Stil için Tailwind ya da CSS Modules; Aşama 5'teki arayüz kurallarına uyar.
- **İçerik tek kaynakta:** `site/content/` altında `ayarlar.ts` (marka, fiyat, paketler, taksit oranları, slug, WhatsApp, Meta Pixel ID, `demoModu: true`, şirket bilgileri), `urun.ts`, `yorumlar.ts`, `sosyal-kanit.ts`, `sss.ts`. Sayı ve fiyat başka hiçbir dosyada sabit yazılmaz.
- **Çalıştırma:** `cd site && npm install && npm run dev` ile http://localhost:3000. README'de çalıştırma ve içerik değiştirme anlatılır.
- **Türkçe:** `<html lang="tr">`. Fiyatlar `Intl.NumberFormat('tr-TR')` ile ("1.299,90 TL"). Büyük harf dönüşümü `toLocaleUpperCase('tr-TR')` ile ("i" → "İ"). Tarihler "14 Kasım Cuma" biçiminde.
- **Önce mobil:** Trafik Instagram'ın uygulama içi tarayıcısından gelir. Tasarımı 390 px'te kur, sonra genişlet. Hover'a dayalı etkileşim ve açılır pencere yok. Dokunma alanları en az 44 px; form alanlarında yazı en az 16 px (iOS yakınlaştırmasını önler).
- **Hız:** Mobil LCP 2,5 sn altı hedeflenir. `next/image`; hero görseli `<picture>` ile tek kaynaktan (yalnızca ekrana uyan kompozisyon iner) ve `fetchPriority="high"`; `font-display: swap`; galeri tembel yüklenir.
- **Erişilebilirlik:** AA kontrast, görünür focus, Türkçe alt metinler. `prefers-reduced-motion` açıksa kayan yazı ve animasyonlar durur.
- **Ölçümleme:** `lib/analytics.ts` içinde Meta Pixel olayları: PageView, ViewContent, AddToCart, InitiateCheckout, AddPaymentInfo, Purchase. Pixel ID boşsa olaylar yalnızca `console.debug` ile yazılır. Gelen UTM parametreleri saklanır ve sipariş kaydına eklenir.

### Sayfalar

| Adres | Sayfa |
|---|---|
| `/` | Anasayfa |
| `/<slug>` | Ürün sayfası (reklamların hedefi) |
| `/odeme` | Tek sayfalık ödeme |
| `/siparis-alindi` | Teşekkür ve sipariş numarası |
| `/siparis-takip` | Sipariş takip |
| `/iletisim` | İletişim |
| `/mesafeli-satis-sozlesmesi`, `/iade-ve-degisim`, `/kvkk`, `/gizlilik` | Yasal sayfalar; şablon metin, şirket bilgileri köşeli parantezli yer tutucu |

### Her sayfada

- **Duyuru çubuğu:** En üstte 32-36 px, şu mesajlar sonsuz ve yumuşak kayar: "12 aya varan taksit · Ücretsiz kargo · Güvenli ödeme · 14 gün iade · Kapıda ödeme". Üzerine gelince ya da dokununca durur.
- **Header:** Logo, menü (Ürün, Sipariş Takip, İletişim), adet rozetli sepet ikonu.
- **Sepet:** Sağdan açılan çekmece; sayfa değişmez, içinden ödemeye geçilir. Tek adet varsa "2. adedi ekle" önerisi.
- **WhatsApp butonu:** Sabit; tıklanınca "Merhaba, <ürün> hakkında bilgi almak istiyorum" mesajı hazır gelir. Sayfanın kendi WhatsApp butonu ya da sabit alt çubukla çakışmaz.
- **Footer** (güven sinyali olarak eksiksiz): logo ve tek cümlelik marka tanımı; sayfa ve yasal sayfa linkleri; Visa, Mastercard, Troy, American Express logoları (SVG); "256-bit SSL ile güvenli ödeme" rozeti; şirket unvanı, adres, MERSİS, vergi ve ETBİS yer tutucuları; WhatsApp, e-posta, çalışma saatleri.

### Anasayfa

1. **Hero:** Tam genişlikte seçilen banner. Negatif alanda küçük üst etiket, en fazla 6 kelimelik ürüne özel slogan (masaüstünde en fazla 2 satır, 40-56 px) ve **"Keşfet"** butonu (ürün sayfasına). Mobilde 4:5 kompozisyon; buton ekranın alt üçte birinde.
2. **Öne çıkan özellikler:** Solda ürün görseli; sağda üst başlık, ürünü özetleyip faydaları anlatan bir paragraf ve altında 3-4 satırlık HTML liste (ikon, kalın kısa başlık, tek satır açıklama).
3. **Kontrast bölüm:** Koyu ya da ana renk zemin. Önce müşterinin bugünkü alternatifinin (ör. sprey, kablolu cihaz) 2-3 somut sorunu, sonra ürünün bunları nasıl çözdüğü; 3-4 özellik çip olarak; yanında ürün kullanımda görseli.
4. **Müşteri değerlendirmeleri:** Önce rakam satırı ("1.400+ teslim edilen sipariş · 300+ müşteri yorumu · 4,9/5 ortalama puan"); altında mobilde parmakla kaydırılan fotoğraflı yorum kartları. Her kartta 5 yıldız, fotoğraf, tek paragraf yorum, "Burcu A." biçiminde isim, şehir, tarih, varyant ve "Doğrulanmış alıcı" rozeti.
5. **Kapanış:** Slogan ve **"Hemen Sipariş Ver"** (ürün sayfasına).

### Ürün sayfası

Mobilde "Hemen Al" butonunun üst kenarı en fazla 1,5 ekran yüksekliğindedir (390×844'te ≤ 1.266 px). Galeri, ürün adı, puan ve fiyat bu alanın içindedir.

1. **Galeri:** 6 görsel. Masaüstünde büyük ana görsel ve küçük önizlemeler; mobilde kaydırılan carousel ve nokta göstergesi. Dokununca tam ekran büyütme.
2. **Ürün adı:** Kalın; altında yıldızlar ve "4,9 (312 değerlendirme)". Bu yazıya dokununca sayfa yorumlara kayar.
3. **Özellikler:** 3-4 ikonlu çip.
4. **Değişen kanıt satırı:** Birkaç saniyede bir yumuşak geçişle: "Sevilen ürün · 1.300+ memnun müşteri" · "Şu an 5 kişi ödeme adımında" (3-9 arası yavaşça değişir) · "Son 30 günün en düşük fiyatı".
5. **Fiyat:** Büyük güncel fiyat, üstü çizili eski fiyat, indirim yüzdesi rozeti; altında "12 aya varan taksit · aylık X TL'den başlayan"; gece yarısı sıfırlanan kampanya sayacı.
6. **Paket seçimi:** 1, 2, 3 adet; birinde "En çok tercih edilen" etiketi; adet başı fiyat. Varyant varsa seçimi burada.
7. **Butonlar:** **"Hemen Al"** (birincil, doğrudan ödemeye) ve **"Sepete Ekle"** (ikincil, çekmeceyi açar).
8. **Güven rozetleri:** Ücretsiz kargo · 12 aya varan taksit · 14 gün iade.
9. **Teslimat tahmini:** "Bugün 16:00'ya kadar verilen siparişler aynı gün kargoda · Tahmini teslimat: 14-16 Kasım". Tarih o güne göre hesaplanır, hafta sonlarını atlar, Aşama 3'teki teslimat kararına uyar.
10. **Açılır paneller:** Ürün Özellikleri / Teknoloji · Kutu İçeriği · Kargo ve Teslimat Süreci · İade ve Değişim.
11. **Kullanıcı deneyimleri:** Fotoğraflı yorum şeridi; altında "Müşteriler ne diyor": puan dağılımı çubukları, sayılarıyla en çok bahsedilen konular, tek cümlelik özet. Konular sayfadaki yorumların içeriğiyle örtüşür.
12. **Karşılaştırma tablosu:** "Sıradan Ürünler" ve "<Marka>" sütunları, 6-8 satır, ✓/✗. Bizim sütunumuz vurgulu. Rakip marka adı yok; bizim her ✓ satırımız `urun-bilgisi.md`'ye dayanır.
13. **SSS:** 6 soru, akordeon; gerçek itirazlardan: kargo süresi, kullanım, garanti ve iade, ödeme ve kapıda ödeme, ölçü ve uyumluluk, ürüne özgü güvenlik.
14. **Güven şeridi:** WhatsApp destek · ürüne uygun doğru bir rozet ("Doğa dostu" yalnızca kanıtlıysa; değilse ör. "Türkçe kullanım kılavuzu") · 1.300+ mutlu müşteri · Güvenli ödeme.
15. **Yorum duvarı:** 15 yorum (8 fotoğraflı, 7 fotoğrafsız, karışık), masonry; ilk 6'sı görünür, "Daha fazla göster" butonu.
16. **Sabit alt çubuk (mobil):** Satın alma butonları ekrandan çıkınca altta fiyat ve "Hemen Al".
17. **Aciliyet:** Sayfada en fazla 3 öğe (kampanya sayacı, "Bu fiyatla son 23 adet", sabit çubukta kısa hatırlatma). Kırmızı renk ve yanıp sönme kullanılmaz.

### Yorum metinleri

- 40-80 kelime; her yorum ürünü kendi kullanım anından anlatır (nerede, neyi sevdi, neye yaradı).
- Ses tonu değişir: kimi günlük, kimi ölçülü; biri "ilk başta tereddüt ettim ama..." diye başlar, biri hediye almıştır, biri kargo hızından söz eder.
- Aynı kalıpla başlamaz; emoji en fazla bir yorumda.
- Farklı yaş ve şehirlerden "Ad S." isimler; son 60 gün içinde tarihler; satın alınan varyant ya da paket.
- Anasayfadakilerin hepsi 5★. Ürün sayfasındaki 15 yorumdan 1-2'si 4★ ve küçük, yapıcı bir not içerir (4,9 ortalamasıyla tutarlı).
- Rakamlar her yerde aynıdır ve `sosyal-kanit.ts`'ten okunur: 1.400+ teslim edilen sipariş, 1.300+ mutlu müşteri, 312 yorum, 4,9/5.

### Ödeme (`/odeme`): demo modu

- **Form:** Tek sayfa, üyeliksiz. Ad soyad, telefon (+90 maskeli), e-posta, il (81 il listesi), ilçe, açık adres.
- **Ödeme:** Kart (maskeli form; altında tek çekim, 3, 6, 9, 12 ay taksit seçenekleri aylık tutar ve toplamla) ve kapıda ödeme (ek ücret açıkça yazılı).
- **Diğer:** Sipariş özeti masaüstünde sağda, mobilde üstte açılır-kapanır. "İndirim kodun mu var?" linki. Güven rozetleri ve **"Siparişi Tamamla"**. Hata mesajları Türkçe, alanın hemen altında; ilk hatalı alana odaklanılır.
- **Demo:** Kart bilgisi hiçbir yere gönderilmez, hiçbir yerde saklanmaz. Butonun altında küçük "Demo ödeme · tahsilat yapılmaz" notu; `demoModu` ile kapanır.
- **Gönderim sonrası:** Sipariş numarası (ör. `SP-24831`); sipariş özeti localStorage'a; `/siparis-alindi`'ye yönlendirme. Bu sayfada özet, tahmini teslimat, "Siparişini WhatsApp'tan onayla" butonu ve takip linki.

### Sipariş takip ve iletişim

- **Takip:** Sipariş numarası ve telefonun son 4 hanesiyle sorgu. Çizelge: Sipariş Alındı → Hazırlanıyor → Kargoya Verildi → Dağıtımda → Teslim Edildi; kargo firması ve örnek takip numarası. Demoda durum oluşturulma zamanına göre ilerler; `SP-10001` örnek siparişi her zaman çalışır.
- **İletişim:** WhatsApp birincil kanal; e-posta, çalışma saatleri, kısa form (gönderince teşekkür mesajı) ve SSS linkleri.

### Demo içerik

Yorumlar, satış sayıları, canlı sayaçlar ve stok/aciliyet mesajları örnek içeriktir. Hepsi `yorumlar.ts` ve `sosyal-kanit.ts`'te durur ve `demo: true` işaretlidir. Sitenin görünümünden bu yüzden hiçbir şey eksiltilmez.

README'de "Yayına almadan önce" bölümü:
- Bu içerikler gerçek reklam trafiğinden önce gerçek verilerle değiştirilir ya da kaldırılır. Sahte yorum ve sahte kıtlık, 6502 sayılı Kanun ile Ticari Reklam ve Haksız Ticari Uygulamalar Yönetmeliği'ne aykırıdır; Meta reklam politikalarına da takılır.
- "Son 30 günün en düşük fiyatı" ibaresi gerçek fiyat geçmişine bağlanır.
- Yasal sayfalar şablondur; avukat ya da mali müşavir kontrol eder.

## Aşama 8: Kalite kontrol

1. **Üretim derlemesiyle** (`next build && next start`) sunucuyu çalıştır. Her sayfanın Playwright ile 390×844 ve 1440×900 tam sayfa ekran görüntüsünü `05-kontrol/`'e al; sabit öğeleri (header, WhatsApp, alt çubuk) görüntü sırasında gizle. Her görüntüyü açıp bak.
2. **Otomatik kontroller:** yatay taşma (`scrollWidth > clientWidth`), kırık görsel, konsol hatası, iç linklerin HTTP durumu, mobilde "Hemen Al" konumu. Sonuçlar `05-kontrol/rapor.json`'a.
3. **Uçtan uca akış:** Ürün sayfası → paket seç → Sepete Ekle → Hemen Al → boş formla gönder (hata mesajları) → formu doldur → Siparişi Tamamla → teşekkür → aynı numarayla takip. Her adımın ekran görüntüsü. localStorage'da kart verisi olmadığını doğrula.
4. **Görsel düzeltme turu:** Ekran görüntülerini şu listeyle gözden geçir; bulduğun her sorunu `05-kontrol/KONTROL.md`'ye (sayfa · sorun · düzeltme) yaz, düzelt ve görüntüleri yeniden al:
   - Başlıklarda tek kelimelik son satır ya da anlamı bölen satır kırılması.
   - Sabit öğelerin içerikle ya da birbiriyle çakışması.
   - Görselsiz uzun metin blokları, içi boş renk alanları.
   - Aynı boyutta tekrar eden kart ızgaraları.
   - Aynı türden bölümler arasında tutarsız boşluk ve hizalama.
   - 44 px altı dokunma alanı, 16 px altı form yazısı, AA altı kontrast.
   - Görselde ürünün üstüne binen metin.
5. **Lighthouse (mobil):** Anasayfa ve ürün sayfası için performans, erişilebilirlik ve LCP `SUREC.md`'ye. LCP 2,5 sn üstündeyse nedenini ve denenenleri yaz.

## Aşama 9: Instagram profil paketi

Tüm tasarımlar **kodla** üretilir: sitenin renk ve font token'larıyla HTML/CSS şablonları, Playwright ile PNG. Fiyat, puan ve müşteri sayısı gibi rakamlar şablona elle yazılmaz; `site/content/` dosyalarından okunur. Sitedeki fotoğraflar kullanılır; yeni Nano Banana sahnesi yalnızca gerektiğinde üretilir.

### Profil (`04-instagram/profil/`)

- `profil.md`: kullanıcı adı önerisi (ve 2 yedek); isim alanı (marka + aranacak anahtar kelime); en fazla 150 karakterlik bio (3-4 satır: değer önerisi, güven unsuru, CTA; en fazla 2 emoji); UTM'li bio linki.
- Profil fotoğrafı: Aşama 5'teki PNG.

### Öne çıkanlar (`04-instagram/one-cikanlar/`)

- 5 öne çıkan: **İletişim · Özellikler · Yorumlar · Kargo & İade · Nasıl Kullanılır** (ürüne göre biri "SSS" olabilir).
- **Kapaklar:** 1080×1920; simge ortadaki 1:1 alanda; aynı ikon ailesi ve marka renkleri.
- **Story'ler:** Her öne çıkan için 2-3, toplam 10-15, 1080×1920. Kritik öğeler üst ve alt 250 px'te olmaz. Yorum story'lerinde sitedeki yorum kartları kullanılır. İletişim story'sinde WhatsApp, e-posta, çalışma saatleri ve site adresi bulunur.

### 12 post (`04-instagram/postlar/`)

- **Boyut:** 1080×1350 (4:5). Profil ızgarası 3:4 kırptığı için kritik öğeler sağ ve sol kenardan en az 60 px içeride.
- **Izgara:** 4 sıra × 3 sütun; fotoğraf ağırlıklı ve tipografi ağırlıklı kareler dönüşümlü. İlk görünen 9 karede en az 4 ürün fotoğrafı, 1 teklif ve 1 müşteri yorumu bulunur.
- **İçerik karışımı:** Tanıtım, ana fayda, özellik detayı, nasıl kullanılır, müşteri yorumu, karşılaştırma, itiraz cevabı (SSS), teklif, yaşam tarzı, kutu içeriği, marka hikâyesi, CTA.
- **Açıklamalar (`aciklamalar.md`):** Her post için ilk satır hook, 3-5 satır metin, sonda CTA ve 5-10 hashtag. Paylaşım sırası ızgara sırasının tersidir.
- **Önizleme (`profil-onizleme.html`):** Telefon çerçevesinde profil fotoğrafı, bio, öne çıkan halkaları ve 3:4 ızgara. Instagram logosu kullanılmaz; sade, genel bir arayüz.

## Aşama 10: Reklam kreatifleri (4 statik + 2 hareketli)

Her kreatif farklı bir açıyı test eder ve iki boyutta üretilir: 4:5 (1080×1350, akış) ve 9:16 (1080×1920, story/reels). 9:16'da üst %14 ve alt %35 metinsiz kalır (Reels arayüzü kapatır). Rakamlar `site/content/`'ten okunur.

| # | Açı | Tür |
|---|---|---|
| 1 | Problem → çözüm | Statik |
| 2 | Müşteri yorumu / UGC (telefon fotoğrafı + yorum kartı) | Statik |
| 3 | Sıradan ürün vs <Marka> | Statik |
| 4 | Teklif (paket indirimi + ücretsiz kargo + taksit) | Statik |
| 5 | Özellik demosu: 3 fayda sırayla | Hareketli, 6-10 sn |
| 6 | Sosyal kanıt: sayaç animasyonu + akan yorum kartları | Hareketli, 6-10 sn |

- **Hareketli kreatifler:** HTML/CSS animasyonu; zaman çizelgesi kare kare ilerletilir (`document.getAnimations()` ile `currentTime` ayarlanır ya da GSAP timeline `seek`). Her kare Playwright ile alınır, ffmpeg ile 30 fps, H.264, `yuv420p` MP4'e çevrilir (`-pix_fmt yuv420p -movflags +faststart`, ses yok). Hook ilk 1 saniyede gelir; video sessizken de anlaşılır.
- Metin, kreatifte ürünün üstüne binmez.

**`04-instagram/reklamlar/REKLAMLAR.md`**, her kreatif için:
- Açı ve test hipotezi (beklenen etkisiyle).
- Hedef persona.
- Birincil metin (kritik mesaj ilk 125 karakterde).
- Başlık (en fazla 40 karakter).
- CTA butonu.
- UTM'li hedef URL: `/<slug>?utm_source=instagram&utm_medium=paid&utm_campaign=lansman&utm_content=kreatif-N`.
- Demo sosyal kanıt (yorum, müşteri sayısı) içeren kreatiflerin gerçek veri gelmeden yayına alınmayacağı notu.

**Test planı:**
- Tek kampanya, geniş hedefleme, 6 kreatif aynı reklam setinde. Günlük bütçe, kreatif başına başa baş CPA'nın en az 3-4 katı veri toplayacak şekilde; test 3-4 gün.
- Metrikler ve hedefleri: hook oranı (3 sn izlenme ÷ gösterim), link CTR, CPC, sepete ekleme oranı, CPA ve ROAS (Aşama 3'teki başa baş değerleriyle karşılaştırmalı).
- Durdurma ve ölçekleme kuralları; eşikler TL ve yüzde olarak.
- Kazanan kreatiften 3 yeni varyant fikri.

## Aşama 11: Teslim özeti

Proje kökünde `TESLIM.html` oluştur ve sonunda tarayıcıda aç. İçerik:

1. **Özet:** Ürün, marka, fiyat ve 3 maddelik konumlandırma.
2. **Site:** http://localhost:3000 linki; mobil ve masaüstü ekran görüntüleri (sayfalar arasında geçiş).
3. **Instagram:** Profil önizlemesi, öne çıkan kapakları, tüm story'ler ve postlar.
4. **Reklamlar:** 6 kreatif (videolar sayfada oynatılır), metinleri ve test planı özeti.
5. **Süreç:** `SUREC.md`'den toplam süre, aşama süreleri, üretilen ve elenen görsel sayısı, tahmini API maliyeti (varsayımıyla), üretilen dosya sayısı, Lighthouse sonuçları ve açık kalan konular.

## Son mesaj

Kısa tut:
- Neler üretildi.
- Site nasıl çalıştırılır (`cd site && npm run dev`).
- `TESLIM.html`'in yolu.
- Yayına almadan önce yapılması gereken 3 iş.
- Hedefin tutmadığı yerler (ör. LCP), varsa.

## Değişmez kurallar

- Ürüne dair uydurma özellik, rakam ya da iddia kullanma; her teknik bilgi `urun-bilgisi.md`'ye dayanır.
- AliExpress görsellerini ve satıcının marka adını sitede ve Instagram'da kullanma.
- Karşılaştırmalarda rakip marka adı kullanma.
- CAPTCHA ya da giriş ekranlarını aşmaya çalışma.
- API anahtarını hiçbir dosyaya, loga ya da mesaja yazma.
- Aşama 4 dışında soru sorma (tek istisna: link yoksa link, sayfa erişilemezse ekran görüntüsü).
