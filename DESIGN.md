# DESIGN.md

> Saf beyaz kağıt, saf siyah mürekkep, bir kırmızı nokta. İşin önüne hiçbir şey geçmez.

Bu dosya `beraterdogan.studio`'nun tasarım sözleşmesi. Kod bunu takip eder, tersi değil.
Değerler uydurma değil — hepsi `style.css`'ten alındı ve tarayıcıda ölçüldü.

---

## 1. Visual Theme & Atmosphere

**Style**: Swiss / International Typographic — editöryal portfolyo
**Keywords**: grotesk, saf kontrast, ızgara, sessiz, plak, el değmişlik, ölçülü hareket, beyaz alan
**Tone**: Kendinden emin ve sakin — **NOT** dekoratif, gradyanlı, "tech startup", kalabalık
**Feel**: İyi basılmış bir plak kataloğu. Sayfa bağırmaz; sandıktaki plaklar konuşur.

**Interaction Tier**: **L2+** (L3'e yakın)
Kaydırma reveal + sürüklenebilir 3D galeri + sayfalar arası shared-element morph var.
Scroll-pin, scroll-jacking ve WebGL **yok** — bilinçli tercih (bkz. §8).

**Dependencies**: **CSS + vanilla JS. Sıfır kütüphane.** GSAP yok, Lenis yok, Barba yok,
Three.js yok. Build adımı yok, paket yöneticisi yok. Toplam ek JS ~12 KB.

---

## 2. Color Palette & Roles

```css
:root {
  /* Surface */
  --paper:  #FFFFFF;   /* sayfa zemini — saf beyaz, kırılmaz */
  --ink:    #000000;   /* başlık ve gövde — saf siyah */
  --well:   #F4F4F4;   /* görsel/medya arkası */

  /* Line & text */
  --line:   color-mix(in srgb, var(--ink) 16%, transparent);  /* ayraç */
  --muted:  #6C6C6C;   /* ikincil metin — 5.25:1, AA */

  /* Accent — tek renk, tek iş */
  --accent: #E5261A;   /* 4.54:1 beyaz üzerinde, AA */

  /* rgba() için rgb yardımcıları */
  --paper-rgb:  255, 255, 255;
  --ink-rgb:    0, 0, 0;
  --accent-rgb: 229, 38, 26;

  /* Plak — sayfanın kağıt/mürekkep olmayan tek yüzeyi */
  --vinyl-a: #191919;  --vinyl-b: #0D0D0D;  --vinyl-c: #141414;
  --vinyl-rim:   rgba(255, 255, 255, .07);
  --vinyl-sheen: rgba(255, 255, 255, .13);
  --vinyl-cast:  rgba(0, 0, 0, .55);
  --spindle:     rgba(0, 0, 0, .25);

  /* Plak etiketi paleti — projelerin kendi renkleri */
  --yellow: #FFD93D;  --yellow-ink: #2B2B2B;   /* 10.28:1 */
  --navy:   #1B1B3A;  --navy-ink:   #E8924A;   /*  6.83:1 */
  --mint:   #AEEBD0;  --mint-ink:   #8B2E2E;   /*  6.17:1 */
  --sky:    #6BC5F0;  --sky-ink:    #1B2B4A;   /*  7.29:1 */
  --forest: #1B4D3E;  --forest-ink: #EDE5B6;   /*  7.57:1 */
  --mono:   #FFFFFF;  --mono-ink:   #000000;   /*    21:1 */
}
```

**Color Rules**

1. Her renk CSS değişkeninden gelir. Kuralların içinde **sabit hex yok** — tek istisna
   `:root` tanımları ve plak oluk gradyanının kendi token'ları.
2. Zemin **daima** `--paper`, yazı **daima** `--ink`. Gri zemin yok, kırık beyaz yok.
   Ölçüm: düz alanlar `rgb(255,255,255)` / `rgb(0,0,0)` dönmeli.
3. `--accent` sayfada **seyrek** kullanılır: hero noktası, aktif tick, ok işaretleri,
   focus halkası. Bir ekranda 3'ten fazla kırmızı görünüyorsa fazladır.
4. Etiket renkleri **sadece** plak kılıfı ve etiketinde yaşar. Sayfa kromuna sızmaz.
5. Yeni renk eklenmez. Bir şey öne çıkmalıysa boşluk veya ağırlıkla çıkar, renkle değil.

**Karanlık tema yok.** Tek tema. Her kural `--paper`/`--ink` üzerinden türediği için
ileride tersine çevirmek istenirse iki token'lık iş.

---

## 3. Typography Rules

**Font Stack** — dışarıdan hiçbir font çekilmez. Sitenin **sıfır dış font isteği** vardır.

```css
--display: 'Helvetica Now Display', 'Helvetica Neue', Helvetica, Arial, 'Liberation Sans', sans-serif;
--sans:    'Helvetica Now Text',    'Helvetica Neue', Helvetica, Arial, 'Liberation Sans', sans-serif;
```

Helvetica Now, Monotype'tan **lisanslı ticari** bir fonttur. Repoda yok ve CDN'den
çekilmez. Lisanslı `woff2` dosyaları `fonts/` içine konup `style.css`'in başındaki
`@font-face` bloğunun yorumu kaldırılınca devreye girer (bkz. `fonts/README.md`).
O zamana kadar stack Helvetica Neue → Helvetica → Arial'a düşer; üçü de metrik
uyumludur, yani dosyalar eklendiğinde **düzen kaymaz**.

| Role | Font | Size | Weight | Line height | Tracking |
|---|---|---|---|---|---|
| Hero H1 | display | `clamp(3.5rem, 15vw, 14rem)` | 700 | `.9` | `-.045em` |
| Contact H2 | display | `clamp(2.2rem, 8vw, 6rem)` | 700 | `.9` | `-.045em` |
| Section H2 | display | `clamp(1.8rem, 5vw, 3.4rem)` | 700 | `1` | `-.035em` |
| Project title (detay) | display | `clamp(2.6rem, 8vw, 6.5rem)` | 700 | `.94` | `-.04em` |
| Dizin satırı | display | `clamp(1.35rem, 3.5vw, 2.2rem)` | 700 | `1.05` | `-.025em` |
| Lede | sans | `clamp(1.1rem, 2.2vw, 1.55rem)` | 400 | `1.4` | `-.01em` |
| Body | sans | `clamp(1rem, .95rem + .2vw, 1.125rem)` | 400 | `1.55` | `0` |
| Label / eyebrow | sans | `.78–.875rem` | 500 | `1.4` | `.06–.12em` + uppercase |

**Typography Rules**

- **Ters orantı kuralı.** Boyut büyüdükçe tracking sıkışır (`-.045em` → `0`) ve
  leading sıkışır (`.9` → `1.55`). Tek bir `letter-spacing` değeri her yerde yanlıştır.
- Başlık ağırlığı **daima 700**. Helvetica 400'de hero boyutunda cılız durur.
- Etiketler uppercase + pozitif tracking; **gövde metni asla uppercase değil**.
- Boşluklar `px` değil `rem`/`em`. Kullanıcı tarayıcı yazı boyutunu büyütünce
  layout birlikte ölçeklenir.
- **NEVER use**: ikinci bir dekoratif font, serif başlık, script/handwriting,
  Comic Sans, sistem-ui fallback'ine bırakılmış çıplak `sans-serif`.

**Text Decoration** — `text-decoration-rules.md` karar tablosu, saf kontrast + Swiss
tonu için: **hiçbir başlıkta gradyan yok, text-shadow yok, outline/stroke yok.**
Tek dekorasyon hero'nun sonundaki kırmızı nokta (`.5em`, çünkü Helvetica'nın noktası
karedir ve 14rem'de blok gibi durur).

---

## 4. Component Stylings

### Navigation (sticky, cam)

```css
.nav {
  position: fixed; inset: 0 0 auto 0; z-index: 900;
  display: flex; align-items: center; justify-content: space-between;
  padding: 1.1rem var(--gut);
  font-size: .875rem; font-weight: 500;
  background: color-mix(in srgb, var(--paper) 72%, transparent);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid var(--glass-edge);
}
.nav__links a { position: relative; color: var(--muted); transition: color .3s var(--energy); }
.nav__links a::after {            /* hover'da soldan açılan alt çizgi */
  content: ""; position: absolute; left: 0; right: 0; bottom: -.28em; height: 1px;
  background: currentColor; transform: scaleX(0); transform-origin: left;
  transition: transform .5s var(--energy);
}
.nav__links a:hover { color: var(--ink); }
.nav__links a:hover::after { transform: scaleX(1); }
.nav__links a:focus-visible { outline: 3px solid var(--accent); outline-offset: 3px; }

/* backdrop-filter yoksa yarı saydam zemin okunmaz — opsiyonel değil */
@supports not (backdrop-filter: blur(1px)) { .nav, .lang { background: var(--paper); } }
@media (prefers-reduced-transparency: reduce) {
  .nav, .lang { background: var(--paper); backdrop-filter: none; -webkit-backdrop-filter: none; }
}
```

### Filter pill (dizin kategorileri)

```css
.filter {
  font-size: .8rem; font-weight: 500; padding: .4rem 1rem; border-radius: 999px;
  border: 1px solid var(--line); color: var(--muted);
  transition: color .35s var(--energy), border-color .35s var(--energy),
              background .35s var(--energy);
}
.filter:hover                  { color: var(--ink); border-color: var(--ink); }
.filter:focus-visible          { outline: 3px solid var(--accent); outline-offset: 3px; }
.filter:active                 { transform: scale(.97); transition: transform 100ms ease-out; }
.filter[aria-pressed="true"]   { background: var(--ink); border-color: var(--ink); color: var(--paper); }
.filter[disabled]              { opacity: .3; pointer-events: none; }
```

### Transport button (plak ileri/geri)

```css
.ctrl {
  width: 2.75rem; height: 2.75rem; border-radius: 50%;
  border: 1px solid var(--line); color: var(--muted);
  display: grid; place-items: center;
  transition: border-color .4s var(--energy), color .4s var(--energy),
              transform .4s var(--energy);
}
.ctrl:hover         { border-color: var(--ink); color: var(--ink); }
.ctrl:focus-visible { outline: 3px solid var(--accent); outline-offset: 3px; }
.ctrl:active        { transform: scale(.94); transition: transform 100ms ease-out; }
.ctrl[disabled]     { opacity: .3; pointer-events: none; }   /* uçlarda */
```

### Underline link (CTA, sosyal, "tam dosya")

```css
.ulink {
  display: inline-flex; align-items: baseline; gap: .5rem; font-weight: 500;
  border-bottom: 1px solid var(--line); padding-bottom: .15rem;
  transition: gap .5s var(--energy), border-color .4s var(--energy);
}
.ulink:hover         { gap: 1rem; border-color: var(--ink); }   /* ok açılır */
.ulink:focus-visible { outline: 3px solid var(--accent); outline-offset: 3px; }
.ulink:active        { transform: scale(.98); transition: transform 100ms ease-out; }
.ulink i             { font-style: normal; color: var(--accent); }
```

### Record (plak — sitenin imza bileşeni)

```css
.rec__sleeve {                     /* kılıf: kapak görseli ya da tipografik */
  position: absolute; inset: 0; z-index: 2; overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--ink) 22%, transparent);
  background: var(--sleeve, var(--ink));
  box-shadow: var(--shadow);
}
.rec__vinyl {                      /* plak: kılıfın arkasından çıkar */
  position: absolute; inset: 0; z-index: 1; border-radius: 50%;
  overflow: hidden;                /* dönen kare parlama taşmasın */
  transform: translateX(22%);
  transition: transform .8s var(--energy);
  background: repeating-radial-gradient(circle at 50% 50%,
    var(--vinyl-a) 0 1px, var(--vinyl-b) 1px 2.5px, var(--vinyl-c) 2.5px 4px);
  box-shadow: 0 1rem 2.5rem -.8rem var(--vinyl-cast),
              inset 0 0 0 1px var(--vinyl-rim);
}
.rec.is-active .rec__vinyl { transform: translateX(46%); }
.rec a { position: absolute; inset: 0; z-index: 3; }   /* kılıfın ÜSTÜNDE */
```

`.rec a`'nın `z-index: 3` olması zorunlu: kılıf 2'de ve kapak görseli tıklamayı yutar.

### Record sleeve (kılıf sanatı)

Her projenin kılıfı ya **gerçek iş** (foto kapak) ya da **tasarlanmış vektör
kılıf**tır. Placeholder yoktur.

Tasarlanmış kılıflar `images/<slug>/sleeve.svg`, 1200×1200 kare, ve hepsi aynı
üç kuralı paylaşır:

1. Zemin projenin etiket rengi, çizim o rengin ink'i. **Sadece bu iki renk.**
2. Mobilya sabittir: sol üstte kategori (30px, `letter-spacing 7`),
   sol altta başlık (700) ve yıl.
3. Ortadaki fikir projeye özeldir ve **işi anlatır**, süs değildir.

| Proje | Fikir |
|---|---|
| ferm | Kavanozda yükselen fermantasyon kabarcıkları + sıvı çizgisi |
| nutripaw | Baskı ızgarası (halftone) üstünde pati — ambalaj = baskı |
| miu miu | Kayan tipografi tekrarları — kampanyanın 6/15/30sn kurguları |
| kasten meets ankara | Kesişen iki daire; "MEETS" kesişimin içinde |
| yazgıya inat yazı | Her iki kenardan taşan brutalist tipografi |
| tus bodrum | Ufukta batan güneş + dalga çizgileri |

**Kural**: kılıf AI ile üretilmez. Portfolyoda bir kılıf ya yapılan işi gösterir
ya da onu tipografik/geometrik olarak yorumlar. Üretilmiş görsel, var olmayan
bir işi temsil eder.

Foto kapaklar 16:10, tasarlanmış kılıflar 1:1. Oran `coverW`/`coverH` ile
bildirilir; yüklenirken kutu kaymasın.

```css
.rec__sleeve img { width: 100%; height: 100%; object-fit: cover; }
```

### Index row (dizin satırı)

```css
.idx__row a {
  display: grid; grid-template-columns: 4.5rem 1fr auto; gap: 1.5rem;
  align-items: baseline; padding: 1.15rem 0;
  transition: padding-left .55s var(--energy), color .35s var(--energy);
}
.idx__row a:hover         { padding-left: 1rem; }        /* satır sağa kayar */
.idx__row a:focus-visible { outline: 3px solid var(--accent); outline-offset: 3px; }
```

---

## 5. Layout Principles

**Container**
- Metin ağırlıklı bloklar: `max-width: 68rem`, ortalanmış
- Tam genişlik bölümler (hero, sandık, dizin): kenar boşluğu `--gut`
- Ölçü boşlukları: `--gut: clamp(1.4rem, 5vw, 5rem)` · `--sec: clamp(5rem, 13vh, 10rem)`

**Grid**
- Hakkında: `1.15fr 1fr`, 860px altında tek sütun
- Proje hero: `1.25fr 1fr`, 860px altında tek sütun (plak yukarı alınır)
- Dizin: `4.5rem 1fr auto` — yıl / başlık / kategori

**Ölçü satırı**
- Gövde: `46ch` · Lede: `30ch` · Proje açıklaması: `44ch` · İletişim başlığı: `14ch`

**Rhythm**
- Bölümler arası `--sec`, üstte `1px solid var(--line)` ayraç
- Bütün boşluklar `rem`/`em` — `px` yok

---

## 6. Depth & Elevation

Sayfanın kendisi **düzdür**. Kağıt üzerindeki mürekkep gölge yapmaz.
Gölge yalnızca fiziksel nesnelerde vardır — plak kılıfı ve dizin önizlemesi.

```css
--shadow: 0 1.5rem 3rem -1rem color-mix(in srgb, var(--ink) 34%, transparent);
```

| Katman | Kullanım |
|---|---|
| `0` — düz | Bölümler, metin, ayraçlar. Gölge **yok**. |
| `1` — `--shadow` | Plak kılıfı, dizin hover önizlemesi |
| `2` — iç gölge | Plak halkası (`--vinyl-rim`) ve iğne deliği (`--spindle`) |
| `900` — cam | Sticky nav ve dil düğmesi, `backdrop-filter` ile |
| `10` — geçiş | Morph sırasında plak çifti (`::view-transition-group`) |

Kart yükseltme yok, hover'da "kalkan" kutu yok, katmanlı gölge yığını yok.

---

## 7. Animation & Interaction

### Dependencies

**Hiçbiri.** `motion.js` (yay + smooth scroll + satır bölme + reveal) ve `vinyl.js`
(sandık) toplam ~12 KB, kütüphanesiz. Sayfa geçişi tarayıcının kendi
View Transitions API'si, 0 KB.

### Base setup

```css
--energy: cubic-bezier(0.32, 0.72, 0, 1);   /* yay olmayan HER geçiş bunu kullanır */
```

Tek imza eğrisi. Sayfada ikinci bir easing yoktur.

### Yay (spring) — dokunulabilir her şey

```js
// kritik sönümlü: response 0.35s, damping 1.0
// KURAL: animasyon hedeften değil, EKRANDAKİ ANLIK DEĞERDEN başlar.
// Kullanıcı hareketin ortasında müdahale edince zıplama olmaz.
this.vel += (w * w * (this.target - this.v) - 2 * z * w * this.vel) * dt;
this.v   += this.vel * dt;
```

- `damping 1.0` — buton, ok tuşu, tık. Taşma yok.
- `damping 0.8` — **yalnızca** momentum taşıyan bırakma (flick). Menüde taşma yanlış hissettirir.
- `dt` 1/30'a clamp'lenir; sekme arka plana alınıp dönünce sıçrama olmaz.

### Entrance animation

```css
/* satırlar kendi taşmalarından yükselir */
[data-reveal] .line { overflow: hidden; padding-bottom: .16em; margin-bottom: -.16em; }
[data-reveal] .line > span { transform: translateY(130%); transition: transform .7s var(--energy); }
[data-reveal].is-in .line > span { transform: translateY(0); }
```

Satır aralığı `0.06s` stagger. `padding-bottom`/negatif `margin` şart:
`overflow: hidden` + `line-height .9` alt uzantıları keser (ğ, ş, g, y).

### Scroll behavior

- Lerp `0.165` smooth scroll, **yalnızca** `(hover: hover) and (pointer: fine)` cihazlarda.
- Native scroll kaynak doğrudur; anchor, klavye ve scrollbar çalışmaya devam eder.
- `IntersectionObserver` ile reveal, `threshold .15`, `rootMargin 0 0 -8% 0`.
- **Scroll-jacking yok, pin yok, parallax yok.**

### Hover & focus

```css
:focus-visible { outline: 3px solid var(--accent); outline-offset: 3px; border-radius: 2px; }
:focus:not(:focus-visible) { outline: none; }
/* geri bildirim pointerdown'da, click'te değil */
.ctrl:active, .filter:active, .ulink:active { transform: scale(.97); transition: transform 100ms ease-out; }
```

### Special effects

**1 · Plak sandığı** — tek bir float `pos` sandıktaki indeks. x, dönüş, derinlik,
ölçek ve opaklık hepsi `i - pos`'tan türer. Wheel, sürükleme, tık, ok tuşları ve
focus aynı değeri iter ve birbirini kesebilir. Uçlarda lastik gibi geri çeker
(`0.35` katsayı); fırlatma ileri projekte edilip en yakın plağa yerleşir.
Düz daire olduğu için **CSS 3D yeter — Three.js kullanılmaz.**

**2 · Sayfa geçişi (shared element morph)** — açılan plak sandıktan proje
sayfasının hero'suna morph eder.

```css
@view-transition { navigation: auto; }
::view-transition-group(*) { animation-duration: .62s; animation-timing-function: var(--energy); }
.vt-sleeve { view-transition-name: rec-sleeve; }
.vt-vinyl  { view-transition-name: rec-vinyl; }
```

Bir `view-transition-name` belgede **tekil** olmak zorundadır; isim daima aktif
plağı takip eder. `pageswap` anında `.is-swapping` sandığı düzleştirir ve
kırpmayı kaldırır, yoksa tarayıcı 3D döndürülmüş, kesilmiş bir kare yakalar.

**3 · Dizin önizlemesi** — imleç satırların üzerinde gezerken kapak görseli takip eder.
`(hover: none)` ve 860px altında tamamen kapalı.

### Motion v2 — neden ve ne

Motion designer portfolyoları üzerine araştırmanın (School of Motion, OlafMotion,
Fastio) ortak kuralları: **uzmanlık ismin yanında söylenir, showreel ilk ekrandadır,
grid hareket eder (3–8 sn sessiz döngüler), her proje rolünü ve künyesini açıkça
yazar, animasyon işin önüne geçmez.** Bu sürüm bunlara göre kuruldu:

| Hareket | Tetik | Nasıl |
|---|---|---|
| İsim harf harf maskesinden yükselir, 9°'den düzelir | yükleme | `splitChars` + `--d` gecikmesi, 40ms aralık |
| Nokta en son düşer, **sayfadaki tek taşma** | yükleme | `cubic-bezier(.34,1.56,.64,1)` — düşen bir şey |
| Uzmanlık satırı: motion designer ↔ art director | sürekli, 6 sn | CSS `roll`, ekran okuyucuya tam metin |
| Okuma ilerlemesi çizgisi | kaydırma | `animation-timeline: scroll(root)` |
| Bölüm başlıkları soldan silinerek gelir | görünüme giriş | `view()` + `clip-path` |
| Dizin satırları tek tek gelir | görünüme giriş | her satır kendi `view()` zaman çizgisi |
| Satır üstüne gelince mürekkeple dolar | hover | `scaleY` ile `::before` |
| Önizleme imleci yayla takip eder, hıza göre eğilir (≤7°) | pointer | rAF lerp, döngü videosu varsa oynar |
| Filtre değişince satırlar kapanır / kayar | tık | FLIP, Web Animations API |
| Sandık ilk görünüşte arkadan öne karıştırılır | görünüme giriş | mevcut yay, bir kez, geri dönüşte asla |
| Aktif plağın kılıfında sessiz döngü oynar | aktif + görünür | sadece o an görünüyorsa, aksi hâlde duraklatılır |
| Galeri görselleri diyafram gibi açılır | görünüme giriş | `clip-path inset` + `scale 1.14 → 1` |
| Sayaçlar sayar | görünüme giriş | quartic-out, genişlik sabit (titreme yok) |

Kaydırmaya bağlı her şey tarayıcının kendi `animation-timeline`'ı ile çalışır —
JS yok, compositor thread'de. Desteklemeyen tarayıcıda her şey yerinde durur.
**Parallax ve scroll-jacking yok**; kaydırma okuyucunundur.

### Fluid interaction — Apple, *Designing Fluid Interfaces*

Sürüklenebilir her şey bu kurallara uyar. Değerler ölçüldü, göz kararı değil.

| Kural | Uygulama |
|---|---|
| Hareketin ortasında yakalanabilir | `pointerdown` yayı durdurur, sürükleme **ekrandaki** değerden başlar |
| 1:1 takip, tutulan yerden | `startPos − (x − startX) / gap`, pointer capture ile |
| Hız son olaydan değil, geçmişten | son 90ms'deki örnekler; parmak durduysa hız 0 — hareketsiz bırakılan plak fırlamaz |
| Momentum izdüşümü | Apple'ın fonksiyonu: `(v/1000)·d/(1−d)`, `d = 0.995` → sert fırlatma 1–2 plak |
| **Hız devri** | bırakma hızı yaya başlangıç hızı olarak verilir; ilk kare `v/60` kadar ilerler, dikiş yok |
| Taşma sadece momentumla | fırlatılırsa `damping 0.8`, düğme/tuşla `1.0` |
| Kenarlarda lastik bant | `(x·d·c)/(d + c·|x|)`, `d = 0.6`, `c = 0.55` — kademeli, asla sert durmaz |
| Basınca tepki | `:active` → `scale .975`, 100ms ease-out; bırakınca `--energy` ile geri. `scale` ayrı özellik, yayın `transform`'unu ezmez. iOS için boş `touchstart` dinleyicisi şart |
| Açıldığı yere kapanır | reel butondan büyür, Esc/kapat ile aynı butona küçülür, odak butona döner |
| Neredeyim? | nav aktif bölümü `aria-current` ile gösterir |
| Kenar etkisi, sabit çizgi değil | nav'ın camı ve alt çizgisi yalnızca içerik altından geçince belirir |
| Cam üstünde canlı yazı | nav linkleri düz gri değil, mürekkep %80 |

**Bulunan ve düzeltilen hata:** yay saati `performance.now()` ile başlıyordu; bir
sonraki `requestAnimationFrame` damgası karenin *başlangıcı* olduğu için ilk `dt`
negatif çıkıyor ve **her yay bir kare geriye seğiriyordu**. Artık ilk kare nominal
1/60 adımla başlar, `dt` asla negatif olmaz.

### Reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .001ms !important; animation-iteration-count: 1 !important;
    transition-duration: 200ms !important;
  }
  [data-reveal] .line > span { transform: none; }
  [data-reveal]        { opacity: 0; transition: opacity 200ms linear; }
  [data-reveal].is-in  { opacity: 1; }
  .rec.is-active .rec__vinyl::before { animation: none; }   /* plak dönmez */
}
```

JS tarafı da uyar: `Motion.Spring.set()` azaltılmış harekette yay çalıştırmadan
doğrudan hedefe geçer, `smoothScroll()` hiç kurulmaz.

---

## 8. Do's and Don'ts

### Do

1. Her rengi CSS değişkeninden al. Yeni bir renk gerekiyorsa önce `:root`'a token yaz.
2. Tracking'i boyuta göre ayarla — büyükte negatif, gövdede sıfır.
3. Boşlukları `rem`/`em` ile ver, `px` ile değil.
4. Her etkileşimli elemana `:focus-visible` ver; custom cursor klavye kullanıcısına yardım etmez.
5. Geri bildirimi `pointerdown`'da göster (`:active`), `click`'te değil.
6. Yeni her hareketi `prefers-reduced-motion` bloğuna da ekle.
7. Dokunmatikte hedefleri ≥ 44×44px tut (`@media (pointer: coarse)`).
8. Kapak görseline `width`/`height` + `aspect-ratio` ver; yüklenirken layout zıplamasın.
9. Kapak `alt` metni projenin ne olduğunu söylesin — "görsel" değil.
10. Sahne dışı/gizli interaktif içeriği `inert` ile kapat, `aria-hidden` ile değil.

### Don't

1. **Zemini kırma.** Krem, gri, kırık beyaz yok. `--paper` saf beyaz kalır.
2. **Gradyan metin, text-shadow, outline yazı yok.** Kontrast zaten 21:1.
3. **İkinci dekoratif font ekleme.** Helvetica stack'i dışına çıkma.
4. **Kütüphane ekleme.** GSAP, Lenis, Barba, Three.js — hiçbiri. Build adımı yok.
5. **Tam ekran sürekli dönen arka plan animasyonu ekleme** (Aurora/Silk/plazma vb.).
   Vestibüler rahatsızlık yapar ve saf kontrast fikrini öldürür.
6. **Parallax, otomatik dönen carousel, imleç takip eden parçacık efekti ekleme.**
   Portfolyoda işin önüne geçer.
7. **Scroll-jacking / section pin kullanma.** Kaydırma kullanıcınındır.
8. **Plak kılıfının içine cam/blur koyma.** Cam sadece kromda: nav ve dil düğmesi.
9. **Etiket renklerini sayfa kromuna taşıma.** Onlar projelerin, sitenin değil.
10. **Doodle'ların `stroke-dashoffset` çizimine dokunma.** İyi çalışıyor.

---

### prefers-contrast: more

Cam kalkar (düz beyaz nav), `--muted` `#3A3A3A`'ya (11.6:1), `--line` mürekkep %45'e
koyulaşır, nav'a tam siyah alt çizgi gelir.

## 9. Responsive Behavior

| Breakpoint | Ne değişir |
|---|---|
| `> 1440px` | Sandık aralığı `clientWidth * .42`, maks 420px; plak maks 330px |
| `≤ 1440px` | Ölçekleme `clamp()` ile sürekli; sabit kırılma yok |
| `≤ 860px` | Hakkında ve proje hero tek sütuna düşer; plak yukarı alınır; dizin önizlemesi kapanır; sandık ofseti 0'a iner |
| `≤ 768px` | Sandık aralığı ve plak boyutu küçülür (`clamp` alt sınırları) |
| `≤ 720px` | `.nav__links` gizlenir; marka + dil düğmesi kalır |
| `≤ 600px` | Tek sütun, `--gut` 1.4rem'e iner |

**Kurallar**
- Yatay taşma **sıfır** olmalı. Ölçüm: `document.documentElement.scrollWidth - innerWidth === 0`.
- `(pointer: coarse)` altında her etkileşimli hedef ≥ 44px yüksekliğinde.
  Pill'ler `min-height` ile büyür; metin linkleri görünümünü korur, görünmez
  `::after` ile hit alanı kazanır.
- Sandık `touch-action: pan-y` — dikey kaydırma native kalır, galeri onu çalmaz.
- Hero `100svh` kullanır, `100vh` değil; mobil tarayıcı çubuğu zıplatmaz.

---

## Bu spec'ten bilinçli sapmalar

`web-design` SKILL'i L2+ sayfalar için 6 zorunlu "signature" animasyon kategorisi
ve anasayfa için 3 "爆点" (WebGL/dev gradyan/imleç ışığı) şart koşuyor. Bunların
bir kısmı **uygulanmadı** ve bu bilinçli:

| SKILL şartı | Durum | Gerekçe |
|---|---|---|
| Background ambience katmanı (Aurora/Silk/Grainient) | **Yok** | Saf beyaz zemin kararıyla doğrudan çelişiyor |
| WebGL / Three.js signature moment | **Yok** | Plak düz daire; CSS 3D yetiyor. "Kütüphane ekleme" kuralı. |
| Gradyan metin / ShinyText / GradientText | **Yok** | Saf siyah-beyaz; kontrast zaten 21:1 |
| Custom cursor | **Yok** | Portfolyoda işin önüne geçiyor |
| lucide-react ikon kütüphanesi | **Yok** | Yeni bağımlılık; ikonlar inline SVG |
| Kapağı olmayan projelerde "düz renk bloğu yasak" | **Kısmen** | Tipografik kılıf kullanılıyor — placeholder değil, tasarım kararı |

Karşılanan SKILL şartları: Hero metin animasyonu, bölüm başlığı reveal, gövde
reveal, eleman seviyesi etkileşim (plak hover/active), interaktif bileşen
(sandık galerisi), tek imza easing, `prefers-reduced-motion` tam düşüş yolu,
sıfır sabit hex, tüm bileşen durumları, ≥44px dokunma hedefleri, mobilde sıfır
yatay taşma.
