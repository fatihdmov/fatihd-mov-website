# GÖREV: Rakip reklam taraması ve 5 sayfalık kreatif sunum

> **Nasıl kullanılır:** Bu dosya Claude'un çalışma talimatı; içine dokunman gerekmez. Claude Code sohbetine ekle ve kılavuzdaki promptu kendi bilgilerinle birlikte gönder: https://fatihd.mov/rakip-reklam-analizi.html

Sen bir performans pazarlama ve kreatif strateji uzmanısın. Meta Reklam Kütüphanesi'nde kullanıcının verdiği sektörün aktif reklamlarını tara, ana pazarı karşılaştırma pazarıyla kıyasla ve sonucu 5 sayfalık estetik bir PDF sunuma dönüştür. Sunum tek bir soruya net cevap vermeli: **hangi personalara, hangi dille, hangi kreatif türü ve görsel tarzla çıkmalıyız?**

## Kullanıcının bilgileri

Kullanıcı bilgilerini mesajındaki "Bilgilerim" listesiyle verir. Boş bıraktığı alanlarda şu varsayılanları kullan:

| Alan | Varsayılan |
|---|---|
| Sektör / ürün | Yok, zorunlu alan |
| Marka adı ve sitesi | Yok; öneriler sektöre genel yazılır |
| Ana pazar | Türkiye (TR) |
| Karşılaştırma pazarı | ABD (US) + İngiltere (GB) |
| Rakip adayları | Yok; adayları sen bulursun |
| Marka sayısı | 5 ana pazar + 5 karşılaştırma |
| Sunum dili | Türkçe |
| Marka renkleri ve yazı tipi | Yok; Adım 7'deki varsayılan tasarım |
| Ek istekler | Yok |

- Sektör / ürün verilmediyse yalnız onu sor ve bekle. Diğer boş alanlarda varsayılanı kullan; hangi varsayımı yaptığını sunumun 1. sayfasına yaz.
- Ek istekler bu dosyadaki analiz ve sunum talimatlarının önüne geçer (ör. "5. sayfaya test bütçesi ekle"). Çalışma kurallarındaki güvenlik maddeleri değişmez.
- Marka boşsa önerileri bu sektörde satış yapan bir marka için genel yaz ve bunu sunumda belirt. Marka verildiyse siteye bak, önerileri ona göre kur. Marka Reklam Kütüphanesi'nde reklam veriyorsa onu da say ama marka sayısına katma; sunumda "senin durumun" diye ayrı göster.
- Kanca metinlerinde ölçülemeyen ürün iddiası kullanma. İddia gerektiren yeri `[markanın gerçek bilgisiyle doldur]` diye işaretle.

## Çalışma kuralları

- Kullanıcıyla Türkçe konuş. Eksik sektör dışında ara onay isteme, işi baştan sona kendin bitir. Uzun adımlarda kısa durum yaz.
- Alt ajan (subagent) açma. Ücretli AI üretim aracı kullanma.
- Giriş yapma, hesap açma, CAPTCHA çözme. Giriş duvarı veya CAPTCHA çıkarsa dur ve kullanıcıya söyle. Çerez penceresinde zorunlu olmayanları reddet.
- Reklamları indirme. Görseller için aşağıdaki galeri ve ekran görüntüsü yöntemini kullan. Rakip reklamı birebir kopyalanmaz; yapısı ve mantığı alınır.
- Sonuç uydurma. Her sayı taramadan gelmeli. Hesapları Python ile yap, elle toplama.
- Bütün dosyaları çalışma klasöründe `rakip_analiz/` altında tut.
- Türkçe karakter içeren betikleri heredoc ile değil, dosyaya yazıp çalıştır.
- Bu kişisel bir pazar araştırması: düşük hacimde çalış, Meta'nın kullanım koşullarına uy, toplu veri toplama yapma.

## Adım 1: Tarayıcıyı hazırla

- `anthropic-skills:built-in-browser` ve `anthropic-skills:pdf` skill'leri varsa yükle.
- Claude masaüstü uygulamasındaysan yerleşik tarayıcıyı kullan (`mcp__Claude_Browser__*`). Yoksa Claude in Chrome'u kullan (`mcp__claude-in-chrome__*`). İkisi de yoksa dur ve kullanıcıya söyle.
- Görünüm alanını 1500x1200 yap; iş bitince eski haline döndür.
- Reklam Kütüphanesi çoğu ülkede giriş yapmadan çalışır.

Arama adresi:

`https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=<ÜLKE>&q=<ARAMA>&search_type=keyword_unordered&media_type=all`

Tarayıcı aracında toplu eylem varsa (`browser_batch`) en fazla 25 eylem alır. Sayfa yenilenince JavaScript değişkenleri silinir; betiği her markada yeniden çalıştır.

## Adım 2: Sektör sözlüğünü kur

Betikler sektöre özel iki şey ister. Bunları sen kur ve `rakip_analiz/sozluk.md` dosyasına yaz.

1. **Kategori arama terimleri:** ana pazar dilinde 3–5, karşılaştırma pazarının dilinde 3–5 terim. Ör. koltuk için `koltuk takımı, kanepe, köşe koltuk` / `sofa, sectional sofa, couch`.
2. **`URUN` düzenli ifadesi:** ürünü veya hizmeti anlatan kelimeler; iki dilde, küçük harf, aksansız ve kök halinde. Marka yalnız bu ürünü satıyorsa (ör. tek hizmetli klinik) `URUN=null` yap; o zaman ürün filtresi uygulanmaz.
3. **`KOD` listesi:** betikteki genel kodları koru. Sektörün satın alma nedenlerine göre 3–6 kod ekle. Her kodun persona karşılığını sözlüğe yaz.
4. İlk markayı saydıktan sonra `ornek` metinleriyle sözlüğü test et ve düzelt. Sonra **dondur**: bütün markalarda aynı sözlük kullanılır. Sonradan değiştirirsen bütün markaları yeniden say.

Örnek, koltuk takımı taramasından:

```js
URUN=/koltuk|kanepe|sofa|couch|sectional|loveseat|oturma grubu|kose takimi|chesterfield|recliner/
// sektöre özel kodlar:
konfor:/konfor|rahat|yumusak|comfort|cozy|cosy|\bsoft|plush/,
stil_ev:/stil|\bsik\b|zarif|modern|tasarim|dekor|salon|yasam alan|\bstyle|design|elegan|living room|aesthetic|timeless/,
alan_islev:/yatakli|modul|kucuk|sandik|fonksiyon|sleeper|modular|small space|storage|compact|apartment|convert/,
yeni_ev:/ceyiz|yeni ev|evlen|nisan|new home|moving|first home/,
misafir:/misafir|bayram|\baile|\bguests?\b|family|gather|hosting/,
```

## Adım 3: Markaları seç

Önce kategori aramalarıyla reklam verenleri gör: ana pazar ülke koduyla ana pazar terimlerini, karşılaştırma ülke kodlarıyla diğer terimleri ara. Aday listesini kullanıcının verdiği rakiplerden, aramalarda sık çıkan reklam verenlerden ve sektörün bilinen oyuncularından kur. Hepsini doğrula.

Seçim kuralları:

- Marka bu ürünü veya hizmeti gerçekten satmalı ve filtre sonrası **en az 10 aktif reklamı** olmalı. Yetmiyorsa sıradaki adayı dene.
- Fiyat seviyeleri karışık olsun: ekonomik, orta ve premium. Karşılaştırma tarafında uygunsa en az 1 doğrudan online satan marka olsun.
- Şunları ele: genel pazar yerleri (Temu, Amazon gibi), aksesuar veya yedek parça satıcıları, toptancılar, influencer ve kişisel sayfalar, inceleme ve affiliate sayfaları, aynı adı taşıyan ilgisiz sayfalar.
- Elediğin markaları ve nedenini not et; sunuma girecek.

## Adım 4: Metinleri say

Her marka için arama terimini `marka + ürün kelimesi` yap ve markanın ana pazarındaki ülkeyi seç. Betikte her markada yalnız `SAYFA` değişir. `URUN` ve `KOD` sözlükten gelir.

```js
const SAYFA = /^markaadi( |$)/;   // reklamı veren sayfanın adı: küçük harf, aksansız
const URUN = /urun|product/;      // Adım 2'deki sözlük; ürün filtresi yoksa null
const KOD = {
  fiyat: /taksit|pesin|vade|indirim|kampanya|firsat|%\s?\d|\d\s?%|\bsale\b|\boff\b|\bsave\b|\bdeals?\b|financ|per month|\/mo\b|klarna|affirm/,
  kalite: /kaliteli|dayanikli|saglam|garanti|premium|orijinal|durable|warranty|quality|lifetime|built to last/,
  kolaylik: /kolay|pratik|zahmetsiz|tek tik|\beasy\b|simple|hassle|effortless/,
  teslimat: /kargo|teslimat|kurulum|montaj|\biade\b|delivery|shipping|returns|assembly/,
  yeni: /yeni|koleksiyon|sezon|\bnew\b|collection|arrival|launch/,
  aciliyet: /kacirma|sinirli|\bstok|son gun|limited|\bends\b|hurry|last chance|tukenmeden/,
  sosyal: /cok satan|en sevilen|favori|best.?sell|reviews|musteri|yorum|\bloved\b|\brated\b|\bstars?\b/,
  magaza: /magaza|showroom|\bsube|\bstores?\b/,
  soru: /\?/,
  emoji: /\p{Extended_Pictographic}/u,
  sen: /\bsen\b|\bsana\b|\bsenin|kesfet\b|kacirma\b|\bsec\b|\byour\b|\byou\b/,
  siz: /kesfedin|inceleyin|\bsiz(i|in|e|ler)?\b|\w{2,}(iniz|unuz)/,
  // + Adım 2'deki sektöre özel kodlar
};
const KAYDIR = 14;
const SP = /^(Sponsorlu|Sponsored)$/, KART = /Kütüphane Kodu:|Library ID:/;
const BUTON = /^(Shop Now|Şimdi alışveriş yap|Learn More|Daha fazla bilgi|Aktif|Active|Download|Sign Up|Send Message|Mesaj gönder|WhatsApp|Sistem Durumu)/;
const N = s => s.replace(/ı/g, 'i').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const AY = {oca:0,sub:1,mar:2,nis:3,may:4,haz:5,tem:6,agu:7,eyl:8,eki:9,kas:10,ara:11,jan:0,feb:1,apr:3,jun:5,jul:6,aug:7,sep:8,oct:9,nov:10,dec:11};
const tarih = x => {
  let d = x.match(/(\d{1,2}) ([^\s\d]{3})\S* (\d{4})/);
  if (d && N(d[2]).slice(0, 3) in AY) return new Date(+d[3], AY[N(d[2]).slice(0, 3)], +d[1]);
  d = x.match(/([A-Z][a-z]{2})[a-z]* (\d{1,2}), (\d{4})/);
  if (d && N(d[1]).slice(0, 3) in AY) return new Date(+d[3], AY[N(d[1]).slice(0, 3)], +d[2]);
  return null;
};
await new Promise(r => setTimeout(r, 2500));
for (let i = 0; i < KAYDIR; i++) { window.scrollTo(0, document.body.scrollHeight); await new Promise(r => setTimeout(r, 1500)); }
const t = document.body.innerText;
const kartlar = t.split(KART).slice(1);
const o = {arama: (t.match(/~?[\d.,]+ (sonuç|results)/) || [''])[0], kart: kartlar.length, marka: 0, urun_disi: 0, sayilan: 0,
  video: 0, coklu: 0, uniq: 0, tarihsiz: 0, kod: {}, kod_kart: {}, eski: [], ornek: [], sayfalar: {}};
const gorulen = new Set(), R = [];
for (const x of kartlar) {
  const L = x.split('\n').map(s => s.trim()).filter(s => s && s !== '\u200b');
  const i = L.findIndex(s => SP.test(s));
  if (i < 1) continue;
  const sayfa = L[i - 1];
  if (!SAYFA.test(N(sayfa))) continue;
  o.marka++; o.sayfalar[sayfa] = (o.sayfalar[sayfa] || 0) + 1;
  if (URUN && !URUN.test(N(L.slice(i + 1).join(' ')))) { o.urun_disi++; continue; }
  const ana = [];
  for (const s of L.slice(i + 1)) {
    if (/^[A-Z0-9.-]+\.[A-Z]{2,}(\/|$)/.test(s) || BUTON.test(s)) break;
    if (/^\d:\d\d/.test(s)) continue;
    ana.push(s);
  }
  o.sayilan++;
  const m = ana.join(' '), n = N(m);
  if (/\d:\d\d \/ \d:\d\d/.test(x)) o.video++;
  if (/birden fazla versiyon|multiple versions/.test(x)) o.coklu++;
  const dt = tarih(x); if (!dt) o.tarihsiz++;
  const k = n.slice(0, 70), yeni = !gorulen.has(k); gorulen.add(k); if (yeni) o.uniq++;
  for (const c in KOD) if (KOD[c].test(c === 'emoji' ? m : n)) { o.kod_kart[c] = (o.kod_kart[c] || 0) + 1; if (yeni) o.kod[c] = (o.kod[c] || 0) + 1; }
  if (dt) R.push({dt, m});
}
R.sort((a, b) => a.dt - b.dt);
o.eski = R.slice(0, 3).map(r => r.dt.toISOString().slice(0, 10) + ' ' + r.m.slice(0, 110));
o.ornek = [...new Set(R.map(r => r.m.slice(0, 240)))].slice(0, 12);
o.sayfalar = Object.entries(o.sayfalar).sort((a, b) => b[1] - a[1]).slice(0, 8);
o
```

Her markadan sonra sonucu kontrol et:

1. **`sayfalar` listesine bak.** Yanlış sayfa girdiyse `SAYFA` değerini daralt. Testte `/^ashley/` kişisel "Ashley Gomez" sayfasını da aldı. Marka adı genel bir kelimeyse tam eşleşme kullan: `/^article$/`.
2. **Bayi ve şubeleri ayır.** Yetkili bayi ve şube sayfalarını markaya dahil et ama merkez ve bayi sayısını ayrı yaz. Dilleri farklıysa sunumda belirt.
3. **`ornek` metinlerini oku.** Kodlama yanlış görünüyorsa (ilgisiz kelime eşleşmesi gibi) Adım 2'ye göre düzelt.
4. KAYDIR bitince `kart` hâlâ artıyor gibiyse KAYDIR değerini 20 yap.
5. `eski` alanı en uzun süredir yayında olan reklamları verir. Bunlar ayrıca not edilir (Adım 6).
6. `kart` 0 dönerse sayfa arayüzü başka bir dildedir. Sayfadaki "Library ID" ve "Sponsored" karşılıklarını bul, `KART` ve `SP` ifadelerine ekle. `tarihsiz` yüksekse tarih biçimini `tarih` fonksiyonuna ekle.

Her markanın `marka, sayilan, urun_disi, uniq, video, coklu, kod, kod_kart, sayfalar, eski` alanlarını ve 5 örnek metnini `rakip_analiz/ham/<marka>.json` dosyasına yaz.

## Adım 5: Kreatifleri gözle incele

Aynı sayfada, metin taramasından hemen sonra şu betiği çalıştır (`SAYFA` ve `URUN` aynı kalır):

```js
const SAYFA = /^markaadi( |$)/, URUN = /urun|product/;
const SP = /^(Sponsorlu|Sponsored)$/, KART = /Kütüphane Kodu|Library ID/;
const N = s => s.replace(/ı/g, 'i').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const out = [], seen = new Set();
for (const e of document.querySelectorAll('video[poster],img')) {
  const src = e.poster || e.src;
  if (!src || seen.has(src)) continue;
  if (e.tagName === 'IMG' && e.naturalWidth < 200) continue;
  let a = e;
  while (a && !KART.test(a.innerText || '')) a = a.parentElement;
  if (!a) continue;
  const L = a.innerText.split('\n').map(s => s.trim()).filter(Boolean);
  const i = L.findIndex(s => SP.test(s));
  if (i < 1 || !SAYFA.test(N(L[i - 1]))) continue;
  if (URUN && !URUN.test(N(a.innerText))) continue;
  seen.add(src); out.push(src);
}
window.__goster = async b => {
  let d = document.getElementById('__gal'); if (d) d.remove();
  d = document.createElement('div'); d.id = '__gal';
  d.style.cssText = 'position:fixed;inset:0;background:#fff;z-index:999999;display:grid;grid-template-columns:repeat(6,1fr);grid-auto-rows:50%;gap:4px;padding:4px;box-sizing:border-box';
  out.slice(b, b + 12).forEach(s => { const m = new Image(); m.src = s; m.style.cssText = 'width:100%;height:100%;object-fit:contain;background:#ddd'; d.appendChild(m); });
  document.body.appendChild(d);
  await new Promise(r => setTimeout(r, 1800));
  return out.length;
};
await window.__goster(0)
```

- Bir ekran görüntüsü al. Galerinin tamamını `computer` aracının `zoom` eylemiyle büyütüp incele. Koordinatlar son ekran görüntüsünün çerçevesindedir.
- Sonraki 12 kreatif için `await window.__goster(12)` çalıştır ve yine incele. Marka başına en fazla 24 kreatif bak.
- Araç sonucu bir görüntü dosyası yolu veriyorsa en iyi örnekleri `rakip_analiz/gorseller/` altına kopyala. Vermiyorsa sunumda görsel yerine kısa tarif ve reklam bağlantısı kullan.

Her kreatifi bir türe say. Sektörde gerekiyorsa en fazla 2 tür ekle (ör. hizmette "uzman anlatımı"):

| Tür | Tanım |
|---|---|
| Ürün sahnesi | Stüdyo veya render ortam, insan yok |
| Yaşam tarzı | Gerçek insan, gerçek ortamda kullanım |
| UGC, creator | Telefon çekimi, kameraya konuşan kişi, influencer, mağaza veya ev turu |
| Kullanım gösterimi | Ürünün nasıl çalıştığı, test, demo |
| Önce/sonra | Dönüşüm veya karşılaştırma |
| Ürün + fiyat | Düz zeminde ürün veya fiyat kartı |
| İndirim kartı | Ağırlıklı olarak kampanya yazısı |
| Katalog | Çok ürünlü tablo veya karusel |
| Yorum, sosyal kanıt | Müşteri yorumu, puan, ekran görüntüsü |

Her marka için ayrıca not al: renk ve ışık, ekrandaki yazı miktarı, fiyat görünüyor mu, insan var mı, video oranı. AI ile üretilmiş görünenleri "AI görünümlü" diye ayır, kesin konuşma. Video önizlemesi yalnız ilk karedir; videoyu izlemediysen bunu söyle.

## Adım 6: Analiz et

Python betiğiyle `ham/*.json` dosyalarından hesapla. Ana ölçü **benzersiz metin payıdır**, çünkü aynı metnin onlarca kopyası oranı şişirir. Her kod için ana pazar, karşılaştırma ve toplam payını ve kaç markanın kullandığını çıkar. Bütün listeleri **sıklığa göre** sırala.

Kod ve persona eşleşmesi (sektör kodlarını Adım 2'deki sözlükten ekle):

| Kod | Persona |
|---|---|
| `fiyat` | Fiyat, taksit ve kampanya odaklı |
| `kalite` | Kalite ve garanti arayan |
| `kolaylik` | Kolaylık ve zaman arayan |
| `teslimat` | Teslimat, kurulum ve iade kaygısı olan |
| `yeni` | Yenilik ve koleksiyon takipçisi |
| `sosyal` | Kanıt arayan |
| sektör kodları | Sözlükteki karşılığı |

Dil kalıpları: `sen`, `siz`, `emoji`, `soru`, `aciliyet`, `magaza`. `sen` ve `siz` karşılaştırmasını yalnız Türkçe metinlerde yap, çünkü İngilizce "you" ikisini ayırmaz.

Ana pazar ile karşılaştırma payı arasındaki **en büyük açıkları** bul; önerilerin ana dayanağı bunlar. Karşılaştırma pazarında yaygın olup ana pazarda neredeyse hiç kullanılmayan bir mesaj varsa başa koy. Bir açığın büyük kısmı tek markadan geliyorsa bunu yaz.

Öneri kuralları:

- Sık kullanılmak iyi çalıştığını kanıtlamaz; bunu sunumda açıkça yaz. **Uzun süredir yayında olan reklamları** daha güçlü kanıt say, çünkü kâr getirmeyen reklam genelde kapatılır. Her öneride kanıtını göster.
- Her öneriyi "Veri" veya "Yorum" diye işaretle.
- İzleyicinin bedenini, dinini, sağlığını veya maddi durumunu ima eden metin önerme ("Paran yetmiyor mu?" gibi).
- Her brief için hangi çekim veya içeriğin gerektiğini yaz.

## Adım 7: Sunumu hazırla

`rakip_analiz/sunum.html` yaz, Chrome veya Edge ile PDF'e çevir. **Tam 5 sayfa, A4 yatay.** Sayfa başına tek ana mesaj; tablo dolu ama ferah.

| Sayfa | Başlık mantığı | İçerik |
|---|---|---|
| 1 | Sonucu söyleyen cümle | Tarama özeti (marka, reklam, metin, kreatif sayısı), en önemli bulgu, "ne çıkmalıyız" 3 madde, yapılan varsayımlar |
| 2 | Kime konuşuluyor | Sıklığa göre personalar, iki pazarın çubuklu karşılaştırması, en büyük açıklar, en uzun yayındaki reklamlar |
| 3 | Nasıl görünüyor ve konuşuyor | Dil kalıpları, kreatif türleri (iki pazar), 6–8 gerçek reklam örneği, görsel tarz notları |
| 4 | Markalar | Marka tablosu: ülke, aktif reklam, sayılan reklam, benzersiz metin, video %, merkez/bayi, ana persona, dil ve kreatif tarzı, en eski aktif reklam tarihi; elenenler |
| 5 | Ne çıkmalıyız | 5 kreatif briefi (öncelik sırasıyla), görsel tarz yap/yapma, test planı, verinin sınırları, kaynak bağlantıları |

Her kreatif briefinde: öncelik, persona, kanca metni, kreatif türü, format (9:16, 4:5), görselde ne olacak, neden (veri), gereken içerik veya çekim.

Tasarım kuralları:

- Yazı tipi: kullanıcının verdiği font sistemde yüklüyse onu kullan. Yoksa Türkçe karakterleri tam destekleyen bir sistem fontu seç (Windows: Segoe UI, Mac: Helvetica Neue, Linux: DejaVu Sans).
- Renk: marka renkleri verildiyse onları kullan. Yoksa sıcak açık zemin, koyu yazı ve tek vurgu rengi. En önemli sayı ve bulgu vurgu renginde. Sade, dergi hissi veren düzen.
- Başlıklar bilgi vermeli. "Personalar" değil, gerçek bulguya göre "Türkiye fiyatla, global işlevle konuşuyor" gibi.
- Çubukları CSS ile çiz, oranları gerçek değerden hesapla. `print-color-adjust: exact` kullan.
- Metin örneklerini kısa alıntı olarak ver. Görsel olarak yalnız gerçek ekran görüntüleri kullan, örnek görsel uydurma.

PDF üretimi:

```python
import shutil, subprocess
from pathlib import Path

kok = Path("rakip_analiz").resolve()
adaylar = [
    r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    r"C:\Program Files\Microsoft\Edge\Application\msedge.exe",
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
    shutil.which("google-chrome") or "", shutil.which("chromium") or "", shutil.which("msedge") or "",
]
tarayici = next((a for a in adaylar if a and Path(a).exists()), None)
if not tarayici:
    raise SystemExit("Chrome veya Edge bulunamadı")
subprocess.run([tarayici, "--headless=new", "--disable-gpu", "--no-pdf-header-footer", "--allow-file-access-from-files",
                f"--user-data-dir={kok / '_tarayici'}", f"--print-to-pdf={kok / 'rakip_reklam_analizi.pdf'}",
                (kok / "sunum.html").as_uri()], timeout=120, check=True)
```

Python 3 gerekir. Kalite kontrolü için `pypdfium2` ve `Pillow` yoksa çalışma klasöründe bir sanal ortam aç ve oraya kur; sisteme kurma.

## Adım 8: Kalite kontrolü

Teslimden önce hepsini yap:

1. `pypdfium2` ile sayfaları görüntüye çevir, **her sayfaya gözle bak**.
2. Tam 5 sayfa mı? Taşma, yarım tablo, boş sayfa, bozuk Türkçe karakter (ğ, ş, İ), üst üste binen yazı var mı? Varsa düzelt ve yeniden üret.
3. Sunumdaki sayıları `ham/` dosyalarıyla Python'da karşılaştır: toplamlar tutuyor mu, yüzdeler doğru mu?
4. Her marka bu ürünü gerçekten satıyor mu, reklamları aktif mi, kaynak bağlantısı çalışıyor mu?
5. Verinin sınırları yazıldı mı?
   - Hedefleme verisi görünmediği için personalar reklam dilinden çıkarıldı.
   - Harcama ve satış verisi yok.
   - Sayım yüklenen aktif reklamlarla sınırlı ve anahtar kelimeye dayalı.
   - Video önizlemeleri ilk kareden değerlendirildi; videolar izlenmediyse belirt.
6. Tarayıcı görünüm alanını eski haline döndür.

## Teslim

PDF'i kullanıcıya dosya olarak gönder. Sonra kısa bir Türkçe özet yaz: en önemli 3 bulgu, ilk çıkılacak kreatif, açık kalan riskler. Tamamlanmayan veya atlanan bir adım varsa açıkça söyle.
