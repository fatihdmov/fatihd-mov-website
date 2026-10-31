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
