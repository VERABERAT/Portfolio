# Berat Erdoğan — Portfolio

Statik HTML, CSS ve JavaScript portfolyo. Türkçe / İngilizce, siyah-beyaz tasarım,
plak arşivi ve yerel animasyon kütüphaneleri içerir. Kurulum ya da build adımı yoktur.

Canlı: https://beraterdogan.studio

## Klasör yapısı

```
Portfolio/
├── index.html              Ana sayfa (tek sayfa, tüm projeler burada)
├── Berat-Erdogan-CV.pdf    Özgeçmiş
├── assets/
│   ├── archive.js          Projeler, TR/EN metinler, plak arşivi, proje penceresi
│   ├── archive.css         Plak arşivi, proje penceresi ve mockup stilleri
│   ├── portfolio.css       Temel stiller
│   ├── vinyl.css           Alt bölümler
│   ├── vinyl/              Plak görseli + her projenin plak kapağı (<anahtar>-cover.webp)
│   ├── work/<anahtar>/     Her projenin görselleri ve videoları
│   ├── vendor/             GSAP, ScrollTrigger, SplitText, CustomEase, Lenis
│   └── fonts/              Inter ve lisansı
├── docs/
│   ├── plak-promptlari.md  Her proje için klasik plak etiketi promptları
│   ├── DESIGN.md           Tasarım kuralları
│   └── VERCEL.md           Yayın notları
├── _arsiv/eski-site/       Önceki sitenin tüm dosyaları (yayına çıkmaz)
├── vercel.json             Güvenlik başlıkları, önbellek, eski adres yönlendirmeleri
└── .vercelignore           _arsiv ve docs yayına dahil edilmez
```

Proje anahtarları (`assets/work/` ve `assets/vinyl/` altında aynı ad):
`ds-damat`, `yatsan`, `koton`, `toshiba`, `tetra-pak`, `derby`, `aytac`, `pek-food`,
`kolpa`, `lumio`, `ferm`, `imece`, `smart-locker`, `vera`, `miu-miu`, `form-motion`.

## Bilgisayarında açmak

1. Depoyu indir:
   - Terminalle: `git clone https://github.com/VERABERAT/Portfolio.git`
   - Ya da GitHub Desktop → File → Clone repository → `VERABERAT/Portfolio`
   - Ya da GitHub sayfasında Code → Download ZIP
2. Klasörde yerel sunucu başlat (herhangi biri):
   ```sh
   cd Portfolio
   python3 -m http.server 8000
   # veya
   npx serve .
   ```
3. Tarayıcıda http://localhost:8000 adresini aç.

`index.html` dosyasına çift tıklamak yerine yerel sunucu kullan; videolar ve
bazı tarayıcı özellikleri `file://` üzerinden düzgün çalışmaz.

## Yeni proje eklemek

1. Görselleri `assets/work/<anahtar>/` içine koy (webp önerilir; videolar 720p mp4 + webm).
2. Plak kapağını `assets/vinyl/<anahtar>-cover.webp` olarak ekle (kare, 800×800).
3. `assets/archive.js` içinde:
   - `projects` dizisine proje nesnesini ekle (`title`, `year`, `image`, `media: "<anahtar>"`, `tr`, `en`).
   - `extra` dizisinde aynı sıraya `kind` ve `status` satırını ekle.
4. `index.html` içinde, `#production` penceresine `<div class="p-media" data-project="<anahtar>" hidden>` bloğunu ekle.
   Mevcut bloklar (reels, post, story, web slider, film) örnek olarak kullanılabilir.
5. Marka listesinde tıklanabilir olsun istersen `data-open="<anahtar>"` butonu ekle.

## Yayın

Vercel bu depoyu izler. `main` dalına gönderilen her commit otomatik olarak
canlıya çıkar. Eski `project.html` ve `admin.html` adresleri ana sayfaya yönlendirilir.

Helvetica Now yalnızca ziyaretçinin cihazında varsa kullanılır; diğer cihazlarda
projeye dahil edilen Inter kullanılır.
