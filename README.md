# Berat Erdoğan — Portfolio

Statik HTML, CSS ve JavaScript portfolyo. Türkçe / İngilizce, siyah-beyaz tasarım,
plak galerisi ve yerel animasyon kütüphaneleri içerir.

Canlı: https://beraterdogan.studio

## Güncel dosyalar

- `index.html`: ana sayfa.
- `assets/archive.js`: metinler, projeler, dil seçimi, plak arşivi, proje görünümü ve animasyonlar.
- `assets/portfolio.css`, `assets/vinyl.css`: temel stiller ve alt bölümler.
- `assets/archive.css`: plak arşivi (ana galeri), yükleme ekranı ve proje görünümü.
- `assets/vinyl/`: plak görseli ve proje kapakları.
- `assets/vendor/`: GSAP, eklentileri ve Lenis.
- `assets/fonts/`: Inter ve lisans dosyası.
- `Berat-Erdogan-CV.pdf`: özgeçmiş.
- `DESIGN.md`: güncel tasarım kuralları.

Ana sayfadaki Kolpa AI ve Lumio kişisel uygulamalardır. Form & Motion, yapay
zekâ ile hazırlanmış ve bu şekilde etiketlenmiş bir görsel denemedir.
Marka bölümü mevcut iş görselleri sağlandıkça genişletilebilir.

Helvetica Now yalnızca ziyaretçinin cihazında varsa kullanılır. Dosyası
dağıtılmaz; diğer cihazlarda projeye dahil edilen Inter kullanılır.

## Yayın

Vercel bu depoyu izler. `main` dalına gönderilen commit otomatik production
yayını başlatır. `vercel.json` depo kökünü yayınlar; kurulum ve build adımı
yoktur. Mevcut güvenlik başlıkları ve görsel/font önbellek ayarları korunmuştur.

## Yerel önizleme

```sh
python3 -m http.server 8000
```

Ardından http://localhost:8000 adresini aç.

## Mevcut proje arşivi

Önceki sitenin `project.html`, `project.js`, `data.js`, `admin.html`,
`images/` ve ilgili dosyaları aynı yollarında tutulur. Bu proje detayları
mevcut bağlantılarla açılabilir. Eski admin paneli yalnızca bu arşivin
`data.js` içeriğini düzenler; yeni ana sayfanın içeriği
`assets/archive.js` içindedir.
