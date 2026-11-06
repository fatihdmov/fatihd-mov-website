/*
 * CLAUDE CODE İÇERİKLERİ (ana sayfadaki listenin üst grubu)
 * ------------------------------------------------------------
 * Her yeni Instagram videosu için buraya YENİ BİR OBJE ekle.
 * Liste tarihe göre otomatik sıralanır; en yeni olan en üstte
 * "YENİ" etiketiyle görünür (7 günden eskiyse etiket düşer).
 *
 * title    -> listede görünen kısa ad (videoda söylediğin adla aynı olsun)
 * summary  -> tek cümlelik açıklama
 * keywords -> aramada eşleşsin istediğin kelimeler; görünmez.
 *             Türkçe karakter fark etmez ("is bulma" = "iş bulma").
 *             Videoda geçen kelimeleri ve eş anlamlılarını yaz.
 * icon     -> chart | eye | send | speaker | briefcase | image | terminal
 * reelUrl  -> videonun Instagram linki (https://www.instagram.com/reel/XXXX/)
 *
 * resources[].type:
 *   "guide" -> path bir HTML sayfası; satıra tıklayınca bu sayfa açılır
 *   "file"  -> path indirilecek bir dosya (pdf, zip, md ...)
 *   "text"  -> text alanı kopyalanabilir kutu olarak gösterilir
 * ------------------------------------------------------------
 */

const DROPS = [
  {
    slug: "meta-reklam-analizi",
    date: "2026-11-06",
    title: "Meta reklam analizi",
    summary: "Ads Manager dosyanı Claude Code'a ver: her reklama tek bir karar versin, harcama ile ciroyu yan yana koyup PDF sunum hazırlasın.",
    keywords: "meta ads manager facebook instagram reklam reklamlarım kendi reklam roas cpa ciro harcama excel xlsx kampanya kreatif bütçe karar pdf sunum analiz e-ticaret",
    icon: "chart",
    reelUrl: "https://www.instagram.com/reel/DfZWK5WuQWz/",
    resources: [
      { type: "guide", label: "Kurulumu Gör", path: "meta-reklam-analizi.html" },
      { type: "file", label: ".md Dosyasını İndir", filename: "meta-reklam-analizi-prompt.md", path: "assets/downloads/meta-reklam-analizi/meta-reklam-analizi-prompt.md" }
    ]
  },
  {
    slug: "rakip-reklam-analizi",
    date: "2026-11-04",
    title: "Rakip reklam analizi",
    summary: "Meta Reklam Kütüphanesi'nde sektöründeki 10 markanın reklamlarını tarar, çekmen gereken 5 kreatifle birlikte PDF sunum hazırlar.",
    keywords: "rakip rakipler kazanan kreatif meta reklam kütüphanesi ad library facebook instagram reklam persona sektör marka yüksek roas pdf sunum analiz prompt",
    icon: "eye",
    reelUrl: "https://www.instagram.com/reel/DfUDnoSu0ll/",
    resources: [
      { type: "guide", label: "Promptu Al & Kurulumu Gör", path: "rakip-reklam-analizi.html" },
      { type: "file", label: ".md Dosyasını İndir", filename: "rakip-reklam-analizi-prompt.md", path: "assets/downloads/rakip-reklam-analizi/rakip-reklam-analizi-prompt.md" }
    ]
  },
  {
    slug: "windrop",
    date: "2026-11-01",
    title: "Windrop: iPhone'dan Windows'a gönder",
    summary: "iPhone'da Paylaş → Windrop deyince fotoğraf ve videolar ev ağından Windows bilgisayarına gelir. AirDrop gibi, kurulumu Claude yapar.",
    keywords: "windrop airdrop iphone ios ipad apple windows bilgisayar pc laptop dosya fotoğraf video gönder aktar paylaş kestirme shortcuts prompt",
    icon: "send",
    reelUrl: "https://www.instagram.com/reel/DfMQyUvO0j5/",
    resources: [
      { type: "guide", label: "Promptu Al & Kurulumu Gör", path: "windrop.html" }
    ]
  },
  {
    slug: "homepod-windows",
    date: "2026-10-31",
    title: "HomePod 2'yi Windows'a bağla",
    summary: "HomePod'u Windows bilgisayarında düşük gecikmeyle hoparlör olarak kullan. Programı Claude Code senin bilgisayarına göre yazar.",
    keywords: "homepod home pod apple airplay hoparlör ses müzik gecikme windows bilgisayar pc bluetooth prompt",
    icon: "speaker",
    reelUrl: "https://www.instagram.com/reel/DfIZeRsuIVG/",
    resources: [
      { type: "guide", label: "Promptu Al & Kurulumu Gör", path: "homepod.html" }
    ]
  },
  {
    slug: "is-bulma-ajani",
    date: "2026-08-30",
    title: "İş bulma ajanı",
    summary: "İlanları bulup başvuruya hazırlayan kişisel iş arama panelini kendi bilgisayarına kurdur. CV'ni verirsin, gerisini ajan kurar.",
    keywords: "iş bulma iş arama ilan başvuru cv özgeçmiş kariyer linkedin kariyer.net panel ajan agent otomasyon codex talimat",
    icon: "briefcase",
    reelUrl: "https://www.instagram.com/reel/DcqnCfNsrX4/",
    resources: [
      { type: "guide", label: "Kılavuzu Aç & Talimatı Kopyala", path: "assets/guides/is-bulma-ajani/kilavuz.html" }
    ]
  }

  // Yeni video eklerken bu şablonu kopyala ve EN ÜSTE yapıştır:
  // {
  //   slug: "yeni-video",
  //   date: "2026-11-10",
  //   title: "Kısa ad",
  //   summary: "Tek cümlelik açıklama.",
  //   keywords: "videoda geçen kelimeler eş anlamlılar",
  //   icon: "terminal",
  //   reelUrl: "https://www.instagram.com/reel/XXXX/",
  //   resources: [
  //     { type: "guide", label: "Kurulumu Gör", path: "yeni-video.html" },
  //     { type: "file", label: ".md Dosyasını İndir", filename: "dosya.md", path: "assets/downloads/yeni-video/dosya.md" }
  //   ]
  // }
];
