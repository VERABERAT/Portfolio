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

## Projeleri yönetmek (admin paneli)

Projeler `data/projects.js` dosyasında durur; site proje sayfalarını bu dosyadan üretir.
En kolay yol admin paneli: **https://beraterdogan.studio/admin**

1. GitHub'da bir fine-grained token oluştur: Repository access → yalnızca `VERABERAT/Portfolio`,
   Permissions → Contents: **Read and write**.
2. `/admin` sayfasında bu anahtarla giriş yap (anahtar yalnızca o tarayıcıda saklanır).
3. Proje ekle, sil, sırala, gizle; metinleri TR/EN düzenle; plak kapağı, reels, post, story,
   uygulama ekranı, web slider, büyük görsel, film, ekip, not ve buton bölümleri ekle.
4. **Kaydet ve yayınla**: yüklenen dosyalar ve `data/projects.js` tek bir commit olarak gider,
   Vercel 1–2 dakikada yayına alır.

Görseller tarayıcıda otomatik boyutlandırılır ve webp'ye çevrilir. Videolar olduğu gibi yüklenir;
25 MB altı önerilir. Silinen projelerin dosyaları repoda kalır.

## Spotify

Her projeye admin panelinden bir Spotify şarkı linki eklenebilir. Ziyaretçi plak kontrollerindeki
müzik düğmesine bastığında, öndeki plak dönerken o projenin şarkısı Spotify oynatıcısıyla çalar.
Çoğu ziyaretçi şarkının 30 saniyelik önizlemesini duyar; tam şarkı genellikle yalnızca tarayıcıda Spotify Premium ile giriş yapılmışsa çalar.
