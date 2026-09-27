# Klasik plak etiketi promptları

Sitedeki her proje bir plakla temsil ediliyor. Aynı görsel iki yerde kullanılıyor:

- **Ön yüz:** plağın ortasındaki yuvarlak kâğıt etiket. Görsel daireye kırpılır, tam ortasında küçük bir delik vardır, alt kısmında proje adının yazdığı beyaz bir şerit durur.
- **Arka yüz:** görsel plağın tamamını kaplayan daire olarak gösterilir. Üstte küçük bir numara etiketi, ortada daha büyük bir delik vardır.

Bu yüzden her prompt aynı kalıbı kullanıyor: **1:1 kare, kareyi kenardan kenara dolduran yuvarlak etiket, logo üst yarıda.**

## Nasıl kullanılır

1. Nano Banana Pro'yu (veya referans görsel alan başka bir modeli) kullan. Oran **1:1**, en az **2048×2048**.
2. Logo olan her üretimde markanın **resmî logosunu referans görsel olarak ekle.** Promptlar logoyu referanstan birebir kullanmasını istiyor. Yapay zekâ logoları kendi başına çizdiğinde harfleri bozar.
3. Aşağıdaki **ortak kuralları** her promptun sonuna ekle.
4. Çıkan görselleri `proje-anahtari.png` adıyla gönder, örneğin `toshiba.png`, `ds-damat.png`. Plak kapaklarını `assets/vinyl/<anahtar>-cover.webp` olarak ben yerleştiririm.

## Ortak kurallar (her promptun sonuna ekle)

```
Format: perfectly square 1:1 image, 2048×2048. The circular record label fills the whole frame edge to edge — the circle touches all four sides; the four corners outside the circle are plain matte black.
View: flat, perfectly top-down, orthographic; no perspective, no shadow, no vinyl grooves visible, no hands, no props.
Material: printed paper record label from the 1960s–70s — matte uncoated offset paper, very subtle paper grain, slight ink misregistration, faint aging, no gloss.
Safe zone (critical):
- Main logo or title sits in the upper half, centred horizontally, between 14% and 42% of the height from the top, no wider than 65% of the width.
- The exact centre is the spindle hole: a clean circle of about 4% of the width, plus an empty margin of 10% around it. Nothing important may touch it.
- The band from 68% to 84% of the height will be covered by a white strip on the website — use it only for decorative rim text or pattern.
- Keep all text at least 6% away from the outer edge of the circle.
Secondary typography, in small caps: "SIDE A" on the left of the spindle hole, "33⅓ RPM" on the right, and along the lower rim "BERAT ERDOĞAN · PORTFOLIO · 2026".
Logo: use the attached reference logo exactly as provided — same letterforms, proportions and colours. Do not redraw, restyle, distort, translate or add effects to it.
No watermarks, no extra brand names, no fake text, no gibberish.
```

## Proje promptları

### D'S Damat — `ds-damat`
```
Classic 1960s soul-label style record label for D'S Damat, a Turkish menswear and tuxedo brand. Deep jet-black label with an ivory inner ring and a thin gold-foil pinstripe circle, like a tuxedo satin lapel. The D'S Damat logo from the reference, in ivory, sits at the top. Beneath it, small elegant serif caps: "THE TUXEDO SESSIONS". Refined, black-tie, evening mood.
```

### Yatsan — `yatsan`
```
Mid-century record label for Yatsan, a Turkish mattress and sleep brand. Warm cream paper label with soft concentric rings in chocolate brown, suggesting calm breathing and deep sleep. The Yatsan logo from the reference, in its original brown, sits at the top. Small caps subtitle beneath: "SLEEP SESSIONS". Quiet, warm, bedroom-at-dawn palette.
```

### Koton — `koton`
```
Minimal 1970s fashion-label record label for Koton. Bone-white label with a single thin black inner ring and generous empty space, like a luxury fashion catalogue. The Koton logo from the reference, in black, sits at the top. Small caps beneath: "KOTON.SA — NOW LIVE" in black, and a tiny Arabic line "متاح الآن" set as secondary text. Editorial, clean, high-fashion.
```

### Toshiba — `toshiba`
```
Bold Blue Note–inspired record label for Toshiba air conditioning. Split label: upper half in Toshiba red, lower half in off-white, divided by a clean horizontal line. The Toshiba logo from the reference, in white, sits in the red upper half. A small caps line beneath the logo: "AIR SESSIONS". Subtle abstract airflow lines curve through the lower half in light grey.
```

### Tetra Pak — `tetra-pak`
```
Clean Scandinavian record label for Tetra Pak. Off-white label with a deep Tetra Pak blue outer ring and a faint repeating triangle pattern in pale blue. The Tetra Pak logo from the reference, with its tagline, sits at the top. Small caps beneath: "PROTECTS WHAT'S GOOD". Fresh, natural feel with a thin green leaf-line accent, hinting at a renewable, forest-grown package.
```

### Derby — `derby`
```
1960s barbershop-style record label for Derby shaving products. Emerald green label with a band of flowing black wave lines along the lower rim, echoing the Ocean Breeze cologne pack. The Derby logo from the reference sits at the top, in white. Small caps beneath: "OCEAN BREEZE". Crisp, cool, masculine grooming mood.
```

### Aytaç — `aytac`
```
Warm 1970s deli-counter record label for Aytaç, a Turkish charcuterie brand. Kraft-paper label with a deep aubergine purple outer ring. The Aytaç logo from the reference, with its red and blue @ emblem and purple ribbon, sits at the top. Small caps beneath in cream: "FLAVOUR SESSIONS". Appetising, warm, rustic kitchen mood.
```

### Pek Food — `pek-food`
```
Playful 1960s Italian pop record label for Pek Food. Tomato-red label with a basil-green inner ring and a faint vintage map of Italy printed in pale cream line art. Hand-lettered retro script at the top reading "Pek Food" (no reference logo; keep the lettering simple and legible). Small caps beneath: "VIAGGIO IN ITALIA". Cheerful, sunny, cartoon-adjacent but printed on paper.
```

### Kolpa AI — `kolpa`
```
Futuristic record label for Kolpa AI, a message-analysis app. Matte black label with an electric violet gradient ring and a subtle radar or waveform motif. The Kolpa logo from the reference, in violet, sits at the top. Small caps beneath: "RED FLAG ANALYZER". Night-time, neon, tech mood — still printed on paper, not glossy.
```

### Lumio — `lumio`
```
Minimal monochrome record label for Lumio, an AI journal app. Pure black label with a soft white halo ring glowing faintly around the centre, like a single lamp in a dark room. Lowercase wordmark "lumio." in clean white sans-serif at the top (use the reference logo if attached). Small lowercase line beneath: "close your mental tabs.". Calm, meditative, minimal.
```

### FERM — `ferm`
```
Organic record label for FERM kombucha. Warm amber and cream label with fermentation bubbles drawn in fine line art. The FERM. wordmark from the reference, in deep brick red, sits at the top. Small serif caps beneath: "DECAY CREATES LIFE". Natural, crafted, slightly wild — like a small-batch brewery label.
```

### İmece Market — `imece`
```
Underground event-flyer–style record label for İmece Market (UNITE Ankara, 2025). Black label with acid yellow-green typography. Bold grotesk title "İMECE MARKET" at the top in two lines, with small caps above it: "PRODUCTION & FINANCE CASE STUDY". Small caps line beneath: "UNITE ANKARA · 19–20.07.2025". Raw, youthful, club-night energy.
```

### Smart Locker — `smart-locker`
```
Technical Swiss-style record label for the Smart Locker kiosk interface. White label with a fine grey engineering grid and a thin black outer ring. At the top, a small black tag with white monospaced text "SYSTEM ARCHITECTURE", and beneath it the title "Smart Locker Interface." in bold neutral sans-serif. Small monospaced caps beneath: "1920 × 1080 · INDUSTRIAL TOUCH PANEL". Precise, rational, product-design mood.
```

### VERA — `vera`
```
Bold typographic record label for VERA, a condensed display typeface. Burnt-orange label with a cream inner ring. The word "VERA" set huge in the attached VERA typeface (reference image), in cream, across the top. Small caps beneath: "CONDENSED BOLD · DISPLAY TYPEFACE". Loud, confident, poster-like.
```

### Miu Miu — `miu-miu`
```
Sun-bleached 1970s summer record label for a Miu Miu fashion film produced by Kasten Kolektif. Pale sky-blue and sand-beige label with a thin bougainvillea-pink ring. The Miu Miu logo from the reference sits at the top in dark brown. Small caps beneath: "A FILM BY KASTEN KOLEKTIF". Dreamy, coastal, nostalgic Aegean summer mood.
```

### Form & Motion — `form-motion`
```
Abstract op-art record label for Form & Motion, a personal visual study. Black-and-white label with a single flowing ribbon form twisting around the centre, rendered in fine halftone. Title "FORM & MOTION" in small, widely tracked white caps at the top. Small caps beneath: "VISUAL STUDY". Sculptural, rhythmic, monochrome.
```

## Gönderdikten sonra

Görseller gelince her birini ben şöyle işleyeceğim:

1. Sitedeki daireye ve deliğe göre kontrol.
2. 800×800 webp'ye dönüştürme.
3. `assets/vinyl/` klasörüne yerleştirme.
4. Tarayıcıda ön ve arka yüzü test etme.
5. Canlıya alma.
