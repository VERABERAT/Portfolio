# Berat Erdoğan — Portfolio

Editöryal düzen, plak sandığı galerisi, yay tabanlı hareket.
**Statik HTML + vanilla JS.** Build adımı, paket yöneticisi, framework yok.
Tek dış bağımlılık Google Fonts (Instrument Serif + Inter Tight).

Canlı: <https://beraterdogan.studio> — `main`'e her push Vercel'de otomatik deploy olur.

## Yapı

```
.
├── index.html    # hero · plak galerisi · dizin · hakkında · iletişim
├── project.html  # proje detayı — ?p=<slug> hangi projenin açılacağını belirler
├── admin.html    # tarayıcıda çalışan içerik paneli (deploy edilir ama noindex)
├── style.css     # tüm tasarım sistemi; iki sayfa da bunu kullanır
├── data.js       # TÜM içerik: projeler, profil, deneyim. tek kaynak.
├── doodles.js    # paylaşılan el çizimi SVG doodle seti
├── motion.js     # yay, smooth scroll, satır bölme, reveal
├── vinyl.js      # plak sandığı galerisi
├── site.js       # index.html davranışı
├── project.js    # project.html davranışı
├── og.svg        # Open Graph paylaşım görseli (1200x630)
├── vercel.json   # güvenlik başlıkları + görsel/font cache
├── robots.txt / sitemap.xml
└── images/       # proje kapakları ve galeri medyası
```

## Tasarım sistemi

Tüm token'lar `style.css` içindeki `:root`'ta:

| Token | Açık | Koyu | Not |
|---|---|---|---|
| `--paper` / `--ink` | `#FFFFFF` / `#000000` | `#000000` / `#FFFFFF` | 21:1 |
| `--accent` | `#E5261A` | `#E5261A` | 4.54:1 / 4.62:1 — AA, her iki zeminde |
| `--muted` | `#6C6C6C` | `#909090` | 5.25:1 / 6.58:1 — AA |
| `--well` | `#F4F4F4` | `#0D0D0D` | görsel arkası |
| `--display` | Instrument Serif | başlıklar |
| `--sans` | Inter Tight | metin |
| `--energy` | `cubic-bezier(0.32, 0.72, 0, 1)` | yay olmayan her geçiş |
| `--gut` / `--sec` | `rem` tabanlı | kullanıcı yazı boyutunu büyütünce layout birlikte ölçeklenir |

Tipografi kuralı: **büyüdükçe tracking sıkışır** (`-.04em` başlıkta, `0` gövdede),
**büyüdükçe leading sıkışır** (`.92` başlıkta, `1.55` gövdede).

Saf siyah/beyaz. Kağıt grain yok — sıcak kağıt efektiydi, `multiply` beyazı
`#F7F7F7`'ye çekiyordu, siyahta `screen` ile hiçbir şey yapmıyordu. Geri
istersen `style.css`'teki nota bak.

**Koyu tema** `prefers-color-scheme: dark` ile otomatik; sadece `:root`
token'ları değişiyor, başka hiçbir kural dokunmuyor. Tek temaya kilitlemek
için o `@media` bloğunu sil (açıkta kalır) ya da içindeki değerleri `:root`'a
taşı (koyuda kalır).

Eski kart paleti (`--yellow`, `--navy`, `--mint`, `--sky`, `--forest`, `--mono`)
duruyor — artık plak etiketi renkleri, ikisinde de okunuyor. Hepsi kendi
ink'iyle AA geçiyor.

## Hareket

Kütüphane yok. `motion.js` şunları verir:

- **`Motion.Spring`** — kritik sönümlü yay (`response 0.35`, `damping 1.0`).
  Kural: animasyon **ekrandaki anlık değerden** başlar, hedeften değil. Kullanıcı
  hareketin ortasında müdahale edince zıplama olmaz. Taşma (`damping 0.8`) sadece
  momentum taşıyan etkileşimlerde — flick bırakma. Buton ve tuş hareketi taşmaz.
- **`Motion.smoothScroll`** — `lerp 0.165`. Sadece fine-pointer cihazlarda.
- **`Motion.reveal`** — satırlar kendi taşmalarından `120% → 0` yükselir,
  `0.7s`, `0.06s` arayla. Resize'da yeniden bölünür.
- Sayfa geçişi **View Transitions API** ile; desteklenmeyen tarayıcıda sessizce
  normal navigasyona düşer.
- `prefers-reduced-motion: reduce` altında hepsi 200ms opacity cross-fade olur.

## Plak galerisi (`vinyl.js`)

Konum tek bir sayı: `pos`, sandıktaki float indeks. x, dönüş, derinlik, ölçek ve
opaklık hepsi `i - pos`'tan türer. Bir yay `pos`'u tutar; wheel, sürükleme, tık,
ok tuşları ve focus aynı değeri iter, birbirini kesebilir.

Plak düz bir daire olduğu için CSS 3D transform yetiyor — Three.js'e gerek yok.
Kılıf kapak görselini taşır; kapağı olmayan proje tipografik kılıf alır,
doodle'ı da işaret olarak kullanır.

Erişilebilirlik: sahne dışındaki plaklar `inert` (hem tab sırasından hem
erişilebilirlik ağacından çıkar), aktif olan `aria-live` ile duyurulur.

## Veri (`data.js`)

`window.PORTFOLIO` objesi `DATA-START` / `DATA-END` yorumları arasında JSON.
Üç sayfa da bunu okur. Çok dilli alanlar `{ "tr": "...", "en": "..." }`,
dilden bağımsız alanlar düz string.

```js
{
  slug: "vera",                        // url: project.html?p=vera
  t: "vera",                           // başlık
  c: { tr: "tipografi", en: "typography" },  // kategori — dizin filtresi buradan toplanır
  y: "2025",
  color: "navy",                       // plak etiketi: yellow|navy|mint|sky|forest|mono
  doodle: "d-type",                    // doodles.js'teki id
  cover: "images/vera/cover.jpg",      // opsiyonel; yoksa tipografik kılıf
  coverWebp: "images/vera/cover.webp", // opsiyonel; varsa <picture> önce bunu dener
  coverAlt: { tr: "...", en: "..." },  // opsiyonel; yoksa başlık + kategoriden üretilir
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

`c` (kategori) küçük ve ortak bir sette tutulur — tipografi, ambalaj, kimlik,
kampanya, arayüz — ki dizin filtresinin gerçek kovaları olsun. Spesifik anlatım
`tags` içinde yaşar.

**`admin.html`** — build'siz içerik paneli. `data.js`'i düzenler ve sonucu
`localStorage`'a (`portfolio_data`) yazar; diğer iki sayfa açılışta bu anahtarı
okuyup üzerine yazar, böylece değişiklikler deploy etmeden canlı önizlenir.
Kalıcı hale getirmek için panelden üretilen JSON `data.js` içine,
`DATA-START`/`DATA-END` arasına yapıştırılır. Kaydederken proje objesi yerinde
güncellenir, yani panelin bilmediği alanlar kaybolmaz. Arama motorlarına kapalı.

> Paneldeki parola `localStorage`'da tutulan bir kolaylık kilidi, güvenlik değil —
> `data.js` zaten herkese açık. Gizli bir şey koyma.

## Yerelde çalıştırma

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

## İçerik ekleme

1. `images/<slug>/` klasörü aç. Kapak için 1200×750 `cover.webp` + `cover.jpg`
   üret (< 100 KB). Dosya adı: küçük harf, tire, Türkçe karakter yok.
2. `data.js`'e projeyi ekle — ya da `admin.html`'i açıp panelden gir.
3. `sitemap.xml`'e `project.html?p=<slug>` girdisini ekle.

## Deploy

Vercel repo'ya bağlı: `main`'e push → otomatik production deploy.
Ayarlar `vercel.json`'da (güvenlik başlıkları, görsel ve font için uzun
`Cache-Control`).
