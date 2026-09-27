# fonts/

Helvetica Now dosyalarının yeri. Monotype'tan lisanslı, repoya
konmadı ve dışarıdan çekilmiyor.

Lisanslı webfont'ları aldığında buraya şu adlarla koy:

```
HelveticaNowDisplay-Bold.woff2
HelveticaNowDisplay-Regular.woff2
HelveticaNowText-Regular.woff2
HelveticaNowText-Medium.woff2
```

Sonra `style.css`'in en üstündeki `@font-face` bloğunun yorumunu kaldır.
Başka hiçbir şeye dokunman gerekmiyor — bütün kurallar zaten
`--display` / `--sans` üzerinden geçiyor.

Dosyalar gelene kadar stack `Helvetica Neue` → `Helvetica` → `Arial`
sırasıyla düşüyor. Üçü de metrik olarak uyumlu, yani dosyaları
eklediğinde düzen kaymaz; macOS/iOS'ta zaten Helvetica Neue çıkıyor,
Windows'ta Arial.
