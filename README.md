# Berat Erdoğan — Portfolio

Statik portfolio sitesi. Build adımı yok, framework yok, vanilla HTML/CSS/JS + `data.js`.

## Dosya yapısı

```
.
├── index.html        # Ana sayfa (hero + proje kartları + about/experience/contact)
├── project.html      # Tekil proje sayfası (`project.html?p=<slug>`)
├── admin.html        # Tarayıcı içi içerik editörü (localStorage + isteğe bağlı GitHub publish)
├── data.js           # Tek kaynak veri dosyası (`window.PORTFOLIO`)
├── doodles.js        # SVG doodle tanımları + inject yardımcıları
├── images/           # Proje görselleri / videoları
├── og.svg            # Open Graph görseli
├── robots.txt        # Arama motoru kuralları
├── sitemap.xml       # Site haritası
└── vercel.json       # Güvenlik ve cache header ayarları
```

## Çalıştırma

Build yok. Yerelde çalıştırmak için `index.html` dosyasını açman yeterli.

## Veri akışı

- Site içeriği `data.js` içindeki `window.PORTFOLIO` objesinden okunur.
- `admin.html`, aynı şemayı düzenler.
- `localStorage` içinde `portfolio_data` varsa, runtime’da `data.js` verisini override eder (canlı önizleme davranışı).

## Yayın

Repo `main` branch’e push edildiğinde Vercel otomatik deploy eder.
