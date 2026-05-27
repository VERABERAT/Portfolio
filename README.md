# Berat Erdoğan — Portfolio

Brutalist portfolio site. Statik HTML + Tailwind (CDN) + Google Fonts.

## Yapı

```
.
├── index.html        # Tek sayfalık site
├── og.svg            # Open Graph paylaşım görseli (1200x630)
├── vercel.json       # Vercel başlıkları & cache
├── robots.txt
├── sitemap.xml
├── images/           # Proje görselleri (sen ekleyeceksin)
└── .gitignore
```

## Yerelde çalıştırma

`index.html` dosyasına çift tıkla. Build adımı yok.

## Vercel'e deploy (3 yol)

### A. En hızlı — Drag & drop
1. https://vercel.com/new adresine git
2. Bu klasörü pencereye sürükle
3. **Deploy** → bitti. URL: `<isim>.vercel.app`

### B. GitHub üzerinden (önerilen)
```bash
cd "/Users/beraterdogan/Desktop/PortfolioWeb Sitesi"
git init
git add .
git commit -m "init: portfolio"
gh repo create berat-portfolio --public --source=. --push
```
Sonra Vercel'de **Import Project** → repo'yu seç → Deploy.
GitHub'a her `git push` otomatik yeni deploy üretir.

### C. Vercel CLI
```bash
npm i -g vercel
cd "/Users/beraterdogan/Desktop/PortfolioWeb Sitesi"
vercel        # preview
vercel --prod # production
```

## Custom domain
Vercel → Project → **Settings → Domains** → kendi alan adını ekle (ör. `beraterdogan.com`).
Yayına alındıktan sonra `index.html` ve `sitemap.xml` içindeki
`beraterdogan.vercel.app` URL'sini gerçek domain ile değiştir.

## Görsel ekleme
`images/` klasörüne her proje için kapak görseli koy:
```
images/vera.jpg
images/ferm.jpg
images/nutripaw.jpg
```
Dosya adı: küçük harf, tire, Türkçe karakter yok. Format: `webp` / `jpg`, < 300 KB.
