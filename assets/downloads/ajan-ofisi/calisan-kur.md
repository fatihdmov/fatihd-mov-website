# İlk 4 Çalışanınızı Kurmak: Başlangıç Prompt'ları

> Bu prompt'lar size hazır bir çalışan vermez. Claude'un size soru sormasını ve **sizin** cevaplarınıza göre
> çalışanın iş tanımını (CLAUDE.md) yazmasını sağlar. Kendi işinize göre değiştirin.

## Klasör yapısı

```
Masaüstü/
├── claude projelerim/
│   ├── video editörü/
│   ├── muhasebeci/
│   ├── yazılımcı/
│   └── fotoğrafçı/
└── ofis/            ← en sonda, ajan-ofisi-kur.md bu klasöre konur
```

Her klasörü Claude Code'da ayrı açın. (Masaüstü uygulamasında klasör seçerek, terminalde o klasöre girip `claude` yazarak.)

---

## 1. Evrensel prompt: "İş görüşmesi"

Her yeni klasörde ilk mesaj olarak bunu yapıştırın. `[ROL]` kısmını değiştirin.

```
Bu klasörde benim [ROL] çalışanım olacaksın. Henüz kod yazma.

Önce benimle bir iş görüşmesi yap. Soruları TEK TEK sor, cevabımı bekle:
1. Bu işte tam olarak neyi senden bekliyorum? Bana 3 örnek görev sor.
2. Hangi dosyalarla çalışacaksın, nereden alacaksın, sonucu nereye koyacaksın?
3. Çıktı nasıl görünmeli? (dil, ton, format, uzunluk)
4. KESİNLİKLE yapmaman gereken şeyler neler?
5. Hangi işleri yapmadan önce bana sormalısın?
6. Bir dış servise ya da araca ihtiyacın var mı? (Varsa en güvenli, en az yetkili şekilde nasıl bağlarız?)

Görüşme bitince bu klasöre şu başlıklarla kısa ve net bir CLAUDE.md yaz:
- Kimsin ve kime çalışıyorsun
- Görevlerin
- Nasıl çalışırsın (adım adım)
- Çıktı kuralları
- YAPMA listesi
- Onay gerektiren işler
- Bittiğinde vereceğin rapor (ne yapıldı, dosyalar nerede, onay bekleyen ne var)

CLAUDE.md'yi 60 satırı geçirme. Her görevde okunacak, gereksiz uzunluk token yakar.
Yazdıktan sonra bana göster ve onay iste.
```

**Neden işe yarıyor?** Claude'a "muhasebeci ol" demek yetmez. Sizin muhasebecinizin ne yapacağını Claude bilemez.
Görüşme, sizin kafanızdaki işi Claude'un okuyabileceği bir iş tanımına çevirir.

---

## 2. Muhasebeci: sadece okur, hiçbir şeye dokunmaz

**Öğrettiği ders:** sınır koymak. Çalışan ne kadar az yetkiyle iş görebiliyorsa o kadar güvenlidir.

Klasöre örnek bir dosya koyun: bankadan indirilen ekstre (CSV/Excel) ya da birkaç fatura PDF'i. **Gerçek kart numarası veya şifre içeren dosya koymayın.**

Görüşmeden sonra CLAUDE.md'de mutlaka olması gerekenler:

```
## YAPMA
- Hiçbir dosyayı silme veya değiştirme. Kaynak dosyalar sadece okunur.
- Banka, ödeme veya muhasebe sistemlerine bağlanma.
- Rakam tahmin etme. Veri yoksa "veri yok" yaz.
- Yatırım tavsiyesi verme.

## Rapor
- Bu ayın toplam gelir ve gideri, en büyük 5 gider kalemi, geçen aya göre fark.
- Raporu ofis-ciktilari/ klasörüne yaz.
```

Ofiste bu çalışana sadece `Read, Glob, Grep` aracı verilir. Yani isteseniz de dosya yazamaz.

**Test görevi:** `Bu klasördeki ekstreden bu ayın gider özetini çıkar. En çok nereye para gitmiş?`

---

## 3. Video Editörü: bilgisayarınızdaki bir aracı kullanır

**Öğrettiği ders:** Claude'a bilgisayarınızdaki bir programı kullandırmak ve bu izni dar tutmak.

Gerekli araç: **Remotion**. Videoyu kodla üreten bir araç: siz ne istediğinizi yazarsınız, Claude videonun kodunu yazar,
Remotion bunu mp4'e çevirir. Çalışması için **Node.js** gerekir. İlk mesaj olarak şunu yazın:

```
Bu klasörde Remotion ile video üretmek istiyorum. Bilgisayarımda Node.js var mı kontrol et;
yoksa nasıl kuracağımı adım adım anlat. Sonra bu klasöre boş bir Remotion projesi kur.
```

> **Lisans:** Remotion bireyler ve küçük ekipler için ücretsizdir; büyük şirketler ücretli lisans alır.
> Güncel koşulları remotion.dev sitesinden okuyun.

Kurulum bitince evrensel "iş görüşmesi" prompt'unu verin. CLAUDE.md'de olması gerekenler:

```
## Görevlerin
- Verdiğim metinden kısa animasyonlu videolar üret (tanıtım, reels, bilgi kartı).
- Önce Remotion önizlemesini (Studio) göster, onaydan sonra mp4 üret.
- Stil: [renklerim, yazı tipim, logo dosyam] — her videoda aynı kalsın.

## YAPMA
- kaynak/ klasöründeki dosyaların (ses, logo, görüntü) üzerine yazma, silme. Her video yeni bir dosya.
- Remotion ve proje kurulumu dışında komut çalıştırma.
- Videoyu hiçbir yere yükleme, paylaşma.
```

Ofiste bu çalışana genel komut izni (`Bash`) değil, sadece Remotion komutlarına dar izin verilir:
`Bash(npx remotion:*)` ve kurulum için `Bash(npm install:*)`.

**Test görevi:** `Bu metinden 15 saniyelik, büyük yazılı bir tanıtım animasyonu üret: "Kendi dijital ofisini kur." Önce önizlemeyi göster.`

---

## 4. Fotoğrafçı: dış servise bağlanır (MCP)

**Öğrettiği ders:** MCP. Claude'a bir dış servisin "anahtarını" vermek ve kredi harcamasını sınırlamak.

1. claude.ai → **Ayarlar → Bağlayıcılar (Connectors)** bölümünden kullandığınız görsel üretim servisini bağlayın
   (Higgsfield, Kling vb.). Ya da servisin kendi sitesindeki MCP adresini Claude Code'a ekletin.
2. Claude Code'da `/mcp` yazın: bağlantının listede ve "bağlı" göründüğünü kontrol edin.

CLAUDE.md'de olması gerekenler:

```
## Görevlerin
- Ürün fotoğrafından (urunler/ klasörü) model üzerinde çekim görseli üret.
- Önce prompt'u yaz ve bana göster, onaydan sonra üret.

## Kredi kuralı
- Görev başına EN FAZLA 1 üretim. Daha fazlası için onay iste.
- Üretmeden önce kalan krediyi kontrol et ve raporda yaz.

## YAPMA
- Hiçbir şeyi yayınlama, paylaşma.
- Hesap ayarlarına, ödeme bilgilerine dokunma.
```

Ofiste bu çalışana sadece üretim ve listeleme araçları izin verilir. Yayınla, sil, abonelik gibi araçlar verilmez.

**Test görevi:** `urunler/ klasöründeki tişört fotoğrafı için stüdyo ışığında bir model çekimi prompt'u yaz. Onaylarsam üret.`

> **E-ticaret markanız varsa:** Aynı mantıkla Shopify gibi bir mağaza bağlantısıyla "Mağaza Müdürü" kurabilirsiniz.
> Kural aynı: sadece okuma araçları (satış, stok, en çok satanlar). Ürün, fiyat veya sipariş değiştiren hiçbir araç yok.

---

## 5. Yazılımcı: site yapar, yayınlamadan önce sorar

**Öğrettiği ders:** "taslak hazırla, onayı insan versin" kuralı.

CLAUDE.md'de olması gerekenler:

```
## Görevlerin
- Basit, tek sayfalık siteler ve açılış sayfaları yap (HTML/CSS ya da istediğim çatı).
- Değişiklikleri önce bilgisayarda çalıştırıp bana göster.

## Yayın kuralı
- Siteyi Vercel'e SADECE önizleme olarak yükleyebilirsin.
- Canlı (production) yayına almak için mutlaka bana sor.

## YAPMA
- Alan adı (domain) satın alma, ödeme sayfası açma.
- Şifre, API anahtarı veya token'ı koda ya da CLAUDE.md'ye yazma.
```

Vercel bağlantısı için iki yol var: Vercel'in resmi MCP bağlantısı ya da Vercel'in komut satırı aracı (CLI).
Claude'a sorun: `Bu klasörü Vercel'e bağlamak için en güvenli yol hangisi? Adım adım anlat.`

**Test görevi:** `Bana "Yakında açılıyoruz" yazan, e-posta bırakma kutusu olan sade bir açılış sayfası yap ve bilgisayarımda aç.`

---

## Son kontrol listesi (her çalışan için)

- [ ] Klasörde CLAUDE.md var, 60 satırı geçmiyor.
- [ ] YAPMA listesi ve onay gerektiren işler yazılı.
- [ ] Çalışan, test görevini o klasörde normal Claude Code'da başarıyla yaptı.
- [ ] En az 3-4 kez deneyip CLAUDE.md'yi düzelttiniz. (İlk seferde mükemmel olmaz, olması da gerekmez.)

Dört çalışan da hazırsa: `ofis` klasörünü açın, `ajan-ofisi-kur.md` dosyasını içine koyun ve ofisinizi kurdurun.
