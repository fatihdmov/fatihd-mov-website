"""
Paylaşım görselleri (og:image) üretici
------------------------------------------------------------
Instagram, WhatsApp vb. link önizlemesinde görünen 1200x630
kapakları Claude Code temasıyla üretir ve sayfaların <head>
kısmına gerekli meta etiketlerini ekler.

Yeni sayfa eklediğinde PAGES listesine bir satır ekle, sonra
site klasöründe çalıştır:

    python tools/og/make.py

Görseller assets/og/<slug>.png olarak yazılır. Chrome veya
Edge gerekir. Etiketi zaten olan sayfaya tekrar dokunmaz.
"""

import html
import os
import pathlib
import subprocess
import tempfile

SITE = "https://fatihd.mov"
ROOT = pathlib.Path(__file__).resolve().parents[2]
TEMPLATE = pathlib.Path(__file__).with_name("template.html")

# (sayfa yolu, slug, başlık, alt satır)
PAGES = [
    ("index.html", "fatihd-mov", "Videolardaki kaynaklar", "Prompt, kılavuz ve dosyalar tek yerde"),
    ("ajan-ofisi.html", "ajan-ofisi", "Dijital ajan ofisi", "Claude Code projelerin tek panelde bir ekip"),
    ("eticaret-markasi.html", "eticaret-markasi", "Bir linkten e-ticaret markası", "Site, Instagram paketi ve 6 reklam kreatifi"),
    ("durus-kocu.html", "durus-kocu", "Duruş koçu", "Kamburlaşınca ekran bulanıklaşsın"),
    ("bilgisayar-saglik-kontrolu.html", "bilgisayar-saglik-kontrolu", "Bilgisayar sağlık kontrolü", "Disk, ekran kartı ve işlemci testi, PDF rapor"),
    ("meta-reklam-analizi.html", "meta-reklam-analizi", "Meta reklam analizi", "Her reklama tek karar, PDF sunum"),
    ("rakip-reklam-analizi.html", "rakip-reklam-analizi", "Rakip reklam analizi", "10 markanın reklamları, çekilecek 5 kreatif"),
    ("windrop.html", "windrop", "Windrop", "iPhone'dan Windows'a AirDrop gibi gönder"),
    ("homepod.html", "homepod-windows", "HomePod 2 → Windows", "Bilgisayarının sesi HomePod'dan çalsın"),
    ("assets/guides/is-bulma-ajani/kilavuz.html", "is-bulma-ajani", "İş bulma ajanı", "İlanları bulup başvuran ajanı kur"),
]

BROWSERS = [
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    r"C:\Program Files\Microsoft\Edge\Application\msedge.exe",
]


def browser():
    for path in BROWSERS:
        if os.path.exists(path):
            return path
    raise SystemExit("Chrome veya Edge bulunamadı.")


def render(slug, title, sub, out):
    size = 68 if len(title) <= 24 else 56
    page = (TEMPLATE.read_text(encoding="utf-8")
            .replace("{{SLUG}}", html.escape(slug))
            .replace("{{TITLE}}", html.escape(title))
            .replace("{{SUB}}", html.escape(sub))
            .replace("{{SIZE}}", str(size)))
    with tempfile.TemporaryDirectory() as tmp:
        src = pathlib.Path(tmp, "og.html")
        src.write_text(page, encoding="utf-8")
        subprocess.run([
            browser(), "--headless=new", "--disable-gpu", "--hide-scrollbars",
            "--force-device-scale-factor=1", "--window-size=1200,630",
            "--virtual-time-budget=6000", f"--screenshot={out}", src.as_uri(),
        ], check=True, capture_output=True)


def add_tags(page_path, slug):
    path = ROOT / page_path
    text = path.read_text(encoding="utf-8")
    if 'property="og:image"' in text:
        return False
    url = SITE + "/" if page_path == "index.html" else f"{SITE}/{page_path}"
    crlf = "\r\n" in text
    tags = ("\r\n" if crlf else "\n").join([
        '<meta property="og:type" content="website">',
        '<meta property="og:site_name" content="fatihd.mov">',
        f'<meta property="og:url" content="{url}">',
        f'<meta property="og:image" content="{SITE}/assets/og/{slug}.png">',
        '<meta property="og:image:width" content="1200">',
        '<meta property="og:image:height" content="630">',
        '<meta name="twitter:card" content="summary_large_image">',
    ])
    # açıklama satırının hemen altına; yoksa <title> satırının altına
    lines = text.split("\n")
    anchor = next((i for i, l in enumerate(lines) if 'name="description"' in l), None)
    if anchor is None:
        anchor = next(i for i, l in enumerate(lines) if "<title>" in l)
    lines.insert(anchor + 1, tags + ("\r" if crlf else ""))
    path.write_text("\n".join(lines), encoding="utf-8", newline="")
    return True


def main():
    out_dir = ROOT / "assets" / "og"
    out_dir.mkdir(parents=True, exist_ok=True)
    for page_path, slug, title, sub in PAGES:
        out = out_dir / f"{slug}.png"
        render(slug, title, sub, out)
        tagged = add_tags(page_path, slug)
        print(f"{out.relative_to(ROOT)}  {'etiket eklendi' if tagged else 'etiket zaten var'}")


if __name__ == "__main__":
    main()
