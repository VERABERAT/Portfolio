# Berat Erdoğan — Portfolio

El çizimi dilde, tek renk tam ekran kartlardan oluşan portfolyo sitesi.
**Statik HTML + vanilla JS.** Build adımı, paket yöneticisi, framework yok.
Tek dış bağımlılık Google Fonts'tan gelen **Shantell Sans**.

Canlı: <https://beraterdogan.studio> — `main`'e her push Vercel'de otomatik deploy olur.

## Yapı

```
.
├── index.html     # ana sayfa: hero, işler grid'i, proje kartları, hakkında, deneyim, iletişim
├── project.html   # proje detay sayfası — ?p=<slug> ile hangi projenin açılacağı belirlenir
├── admin.html     # tarayıcıda çalışan içerik paneli (deploy edilir ama noindex)
├── data.js        # TÜM içerik: projeler, profil, deneyim. tek kaynak.
├── doodles.js     # paylaşılan el çizimi SVG doodle seti
├── og.svg         # Open Graph paylaşım görseli (1200x630)
├── vercel.json    # güvenlik başlıkları + görsel/font cache
├── robots.txt / sitemap.xml
└── images/        # proje kapakları ve galeri medyası
```

### Dosyalar ne iş yapar

**`data.js`** — sitenin tek içerik kaynağı. `window.PORTFOLIO` objesini
`DATA-START` / `DATA-END` yorumları arasında JSON olarak tutar; üç sayfa da
bunu okur. Çok dilli alanlar `{ "tr": "...", "en": "..." }` objesi,
dilden bağımsız alanlar (slug, yıl, renk, doodle, tags) düz string.

Proje şeması:

```js
{
  slug: "vera",                        // url: project.html?p=vera
  t: "vera",                           // başlık
  c: { tr: "tipografi", en: "typography" },  // kategori — filtre buradan toplanır
  y: "2025",                           // yıl
  color: "navy",                       // kart paleti: yellow|navy|mint|sky|forest|cream
  doodle: "d-type",                    // doodles.js'teki id
  cover: "images/vera/vera.jpg",       // opsiyonel kapak; yoksa doodle'a düşer
  coverAlt: { tr: "...", en: "..." },  // opsiyonel; yoksa başlık+kategoriden üretilir
  desc: { tr: "...", en: "..." },
  tags: ["typography", "display"],
  link: "https://behance.net/...",     // opsiyonel dış bağlantı
  media: [                             // detay sayfası galerisi
    { type: "image", src: "images/vera/vera.jpg" },
    { type: "video", src: "images/x/x.mp4" },
    { type: "embed", src: "https://www.behance.net/embed/project/123?ilo0=1" }
  ]
}
```

**`doodles.js`** — el çizimi SVG doodle'ların ortak sözlüğü.
`injectDoodleDefs()` hepsini gizli bir `<defs>` olarak sayfaya basar,
sonra her yerde `<use href="#d-sun"/>` ile çağrılır. `doodleSVG(id)`
admin önizlemesi için tek başına bir `<svg>` string'i döner.

**`project.html`** — tek bir şablon, tüm projeler için. `?p=<slug>` ile
`data.js`'ten projeyi bulur; hero + galeri + önceki/sonraki navigasyonunu
çizer. Slug bulunamazsa "proje bulunamadı" ekranı gösterir.

**`admin.html`** — build'siz içerik paneli. `data.js`'i düzenler ve
sonucu `localStorage`'a (`portfolio_data`) yazar; `index.html` ve
`project.html` açılışta bu anahtarı okuyup üzerine yazar, böylece
değişiklikler deploy etmeden canlı önizlenir. Kalıcı hale getirmek için
panelden üretilen JSON `data.js` içine, `DATA-START`/`DATA-END` arasına
yapıştırılır. Arama motorlarına kapalı (`noindex` + `robots.txt`).

## Yerelde çalıştırma

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

`index.html`'e çift tıklamak da çalışır, ama `file://` üzerinde
bazı tarayıcılar `data.js`/`doodles.js` yüklemesini kısıtlayabilir;
yerel sunucu daha güvenli.

## İçerik ekleme

1. `images/<slug>/` klasörü aç, kapak ve galeri dosyalarını koy.
   Dosya adı: küçük harf, tire, Türkçe karakter yok.
   Kapak için `webp` (+ `jpg` fallback), < 300 KB.
2. `data.js`'e projeyi ekle — ya da `admin.html`'i açıp panelden gir.
3. `sitemap.xml`'e `project.html?p=<slug>` girdisini ekle.

## Deploy

Vercel repo'ya bağlı: `main`'e push → otomatik production deploy.
Ayarlar `vercel.json`'da (güvenlik başlıkları, görsel ve font için
uzun `Cache-Control`).
