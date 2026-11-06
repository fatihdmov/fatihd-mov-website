/*
 * DROPS VERİTABANI
 * ------------------------------------------------------------
 * Her yeni Instagram videosu için buraya YENİ BİR OBJE ekle.
 * Liste otomatik olarak tarihe göre sıralanır; en yeni olan
 * "Son İçerik" (Latest Drop) kartında otomatik gösterilir.
 *
 * resources[].type:
 *   "guide" -> path bir HTML sayfası, yeni sekmede açılır (belge/kılavuz)
 *   "file"  -> path indirilecek bir dosya (pdf, zip, ...)
 *   "text"  -> text alanı doğrudan sitede kopyalanabilir kutu olarak gösterilir
 * ------------------------------------------------------------
 */

const DROPS = [
  {
    slug: "meta-reklam-analizi",
    date: "2026-11-06",
    tag: "Claude Code",
    title: "Meta Reklam Analizi: Ads Manager Dosyasından Karar Sunumu",
    description:
      "Ads Manager'dan indirdiğin dosyayı ve .md dosyasını Claude Code'a sürükle, \"başla\" yaz: her reklama istatistikle tek bir karar versin (kapat, bekle, bütçe ekle, bütçeyi kaydır, varyant üret), ne harcadığını ve ne kadar ciro getirdiğini yan yana yazsın, yatay PDF sunum hazırlasın. Prompt yok, soru sormaz.",
    instagramUrl: "https://instagram.com/fatihd.mov",
    resources: [
      {
        type: "guide",
        label: "Kurulumu Gör",
        filename: "meta-reklam-analizi.html",
        path: "meta-reklam-analizi.html"
      },
      {
        type: "file",
        label: ".md Dosyasını İndir",
        filename: "meta-reklam-analizi-prompt.md",
        path: "assets/downloads/meta-reklam-analizi/meta-reklam-analizi-prompt.md"
      }
    ]
  },
  {
    slug: "rakip-reklam-analizi",
    date: "2026-11-04",
    tag: "Claude Code",
    title: "Rakip Reklam Analizi: Meta Reklam Kütüphanesi'nden 5 Sayfalık Sunum — Prompt",
    description:
      "Claude Code'a .md dosyasını ekle ve bilgilerini yaz: sektöründeki 10 markanın aktif Meta reklamlarını tarasın, kime hangi dille konuştuklarını çıkarsın ve çekilecek 5 kreatifle birlikte PDF sunum hazırlasın. Her sektöre uyarlanır.",
    instagramUrl: "https://instagram.com/fatihd.mov",
    resources: [
      {
        type: "guide",
        label: "Promptu Al & Kurulumu Gör",
        filename: "rakip-reklam-analizi.html",
        path: "rakip-reklam-analizi.html"
      },
      {
        type: "file",
        label: ".md Dosyasını İndir",
        filename: "rakip-reklam-analizi-prompt.md",
        path: "assets/downloads/rakip-reklam-analizi/rakip-reklam-analizi-prompt.md"
      }
    ]
  },
  {
    slug: "windrop",
    date: "2026-11-01",
    tag: "Claude Code",
    title: "Windrop: iPhone'dan Windows'a Tek Tuşla Gönder — Prompt",
    description:
      "Videodaki Windrop'u kendi bilgisayarına kurdurman için hazırladığım Claude Code promptu. Fotoğraflar'da Paylaş → Windrop deyince dosyalar ev ağından Windows'a gelir; iPhone'daki kestirme kurulumu da adım adım içinde.",
    instagramUrl: "https://instagram.com/fatihd.mov",
    resources: [
      {
        type: "guide",
        label: "Promptu Al & Kurulumu Gör",
        filename: "windrop.html",
        path: "windrop.html"
      }
    ]
  },
  {
    slug: "homepod-windows",
    date: "2026-10-31",
    tag: "Claude Code",
    title: "HomePod 2'yi Windows'a Bağla — Prompt",
    description:
      "Videodaki programı kendi bilgisayarına göre yazdırman için hazırladığım Claude Code promptu. Masaüstünde klasör açmaktan ilk ses testine kadar adım adım kurulum da içinde.",
    instagramUrl: "https://instagram.com/fatihd.mov",
    resources: [
      {
        type: "guide",
        label: "Promptu Al & Kurulumu Gör",
        filename: "homepod.html",
        path: "homepod.html"
      }
    ]
  },
  {
    slug: "is-bulma-ajani",
    date: "2026-08-29",
    tag: "AI Agent",
    title: "İş Bulma Ajanı — Aktarım Kiti",
    description:
      "Videoda gösterdiğim otonom iş bulma / başvuru ajanını kendi bilgisayarında bir kodlama ajanına (Claude Code, Codex CLI vb.) kurdurman için hazırladığım kılavuz. İçinde kopyalanacak talimat metni ve adım adım kullanım rehberi var.",
    instagramUrl: "https://instagram.com/fatihd.mov",
    resources: [
      {
        type: "guide",
        label: "Kılavuzu Aç & Talimatı Kopyala",
        filename: "kilavuz.html",
        path: "assets/guides/is-bulma-ajani/kilavuz.html"
      }
    ]
  }

  // Örnek — yeni video eklerken bu şablonu kopyala:
  // {
  //   slug: "yeni-video-slug",
  //   date: "2026-09-05",
  //   tag: "Otomasyon",
  //   title: "Video Başlığı",
  //   description: "Kısa açıklama.",
  //   instagramUrl: "https://instagram.com/p/xxxxx",
  //   resources: [
  //     { type: "file", label: "Dosyayı İndir", filename: "dosya.pdf", path: "assets/downloads/dosya.pdf" },
  //     { type: "guide", label: "Kılavuzu Aç", filename: "kilavuz.html", path: "assets/guides/xxx/kilavuz.html" },
  //     { type: "text", label: "Talimatı Kopyala", text: "..." }
  //   ]
  // }
];
