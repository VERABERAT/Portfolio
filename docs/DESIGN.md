# Berat Erdoğan — Vinyl Archive

## 1. Visual Theme & Atmosphere
Pure black and white editorial portfolio centered on the user's identity as a designer and art director. Brand work comes first: Yatsan, D’S Damat, Trendyol and Wella, confirmed by the user. Show these as a typographic brand selection until real work assets are supplied; no invented campaign names, roles per brand, credits or deliverables. A separate collection of physical vinyl records presents his own apps Kolpa AI and Lumio plus the clearly labeled Form & Motion visual exploration. Large Swiss sans typography, precise alignment, clean empty space, tactile album artwork. Preserve the real biography, contact, résumé and TR/EN support. The user's confirmed direction governs the uploaded web-design guide: do not add colored accents, gradients, decorative backgrounds or unrelated features to meet effect quotas.

## 2. Color Palette & Roles
Only two UI tokens: `--white: #fff; --black: #000;` with RGB 255,255,255 and 0,0,0. Main surfaces white, text black; profile/contact invert the same pair. Hover/focus uses inversion or underline. Images are neutral monochrome; antialiasing and photographic vinyl groove highlights naturally contain neutral gray, never chromatic color. No cream, burgundy, red or colored links.

## 3. Typography Rules
Helvetica Now local faces remain the preferred font. No licensed webfont was supplied, so do not claim a downloaded Helvetica Now font. Self-host Inter Variable (SIL OFL, source https://rsms.me/inter/) as the actual reliable fallback, then Helvetica/Arial. No external font request at runtime. Include Latin Extended for Turkish.

| Role | Size | Weight | Leading | Tracking |
|---|---|---|---|---|
| Hero | clamp(66px, 12vw, 184px) | 650 | .94 | -.065em |
| Section headline | clamp(42px, 6.8vw, 104px) | 500 | 1 | -.055em |
| Project title | clamp(32px, 3vw, 48px) | 550 | 1.1 | -.04em |
| Body | 16–21px | 400 | 1.45 | -.02em |
| Controls | 14px | 450 | 1.4 | normal |
| Record metadata | 12px | 500 | 1.4 | .02em |

No serif, glow, gradient, shadow, simulated condensed glyphs or overlapping letters. 200% text enlargement remains usable.

## 4. Component Stylings
Navigation remains semantic anchors; hovered links underline and focused links get a 2px outline. Circular next/previous buttons: transparent default, black/white inverse hover, scale .94 on active, 2px outline on focus-visible; disabled controls have a dashed border and disabled cursor. Cards are keyboard-accessible buttons containing generated record texture and independent album artwork; active card gains a visible catalog marker. Inactive cards remain selectable. Native dialog manages focus and Escape. Cursor is a supplementary black/white indicator; native cursor remains available.

## 5. Layout Principles
Desktop margin clamp(20px,4vw,72px), max content 1900px. The homepage opens on the record archive (#archive), a full-viewport gallery modelled on a physical record shelf: a fixed centred top bar (BE© mark, İşler / Hakkımda / İletişim with an active dot, TR/EN), a credits table at top-left (project title, then Tür / Yıl / Rolüm / Kapsam rows on 1px rules), three tilted records in the centre with the front one circled by a hand-drawn black loop, two short centred notes below (Proje, Yaptıklarım), and a footer row with name + role, the 01 / 03 counter and controls (pause, Çevir, ←, →). The brand section follows at #work, then profile, experience, practice and contact. Opening a record shows the production view: a giant uppercase title, a role/scope credit line, Yıl / Tür / Durum rows, the cover inside four + corner marks, the description, and a "Sıradaki" block where the next record rises between rules. Section spacing 64–100px; 12/20/32/48px internal rhythm. Mobile stacks record, credits, notes and footer.

## 6. Depth & Elevation
White remains genuinely white. No panel shadows. Depth comes from the generated LP grooves, sleeve occlusion, actual overlapping layers, small rotation and scale of adjacent records. Record texture is generated artwork, never a CSS reconstruction of a physical record or a CD image.

## 7. Animation & Interaction
GSAP 3.15, SplitText, ScrollTrigger, CustomEase and Lenis, all local. Energy curve (.32,.72,0,1). Moments: (1) loader with a real image-loading counter (0–100), then a wipe; (2) records rising into place with a staggered entrance; (3) slow rotation of the front record and a hand-drawn loop redrawn on every change; (4) arrow keys, drag, horizontal wheel or the arrow buttons change record, Space or Çevir flips it to the picture side, Enter or click opens the production view; (5) production view wipes in with masked title lines and ruled rows, and "Sıradaki" swaps to the next project; (6) staggered section typography and scroll-linked fade of the credits. No forced scrolling, no endless full-page animation. Rotation pauses offscreen, in a hidden document, while dragging and in the production view. Reduced motion disables smooth scroll, the loader counter, rotation, flips and text motion; content and all controls remain usable. Without JavaScript the three covers show as a static list.

## 8. Do's and Don'ts
Copy must stay brief, factual and restrained in Turkish and English. Use the user's actual role, employer, project function and contribution. Remove slogans, self-praise, elaborate production claims and repeated explanations. Examples: “Tasarımcı & Art Director”, “Çalıştığım markalar”, “Kişisel projeler”, “Yapay zekâ destekli mesaj analizi.” Keep the short AI-cover disclosure. Avoid “independent vision”, “visual worlds”, “end to end”, “let’s make it happen” and similar promotional phrasing.

Do keep pure black/white; use generated project-specific covers; keep authentic vinyl scale/center labels; use local font/assets; preserve Turkish glyphs and keyboard/touch navigation; keep truthful project descriptions.

Don't introduce any accent color; don't use CD rainbows or large CD holes; don't pass concept artwork as delivered client work; don't invent Behance URLs; don't download unlicensed Helvetica fonts; don't hide content if JavaScript fails; don't replace the pointer on touch screens; don't hijack vertical scrolling; don't add expensive decorative 3D scenes; don't crop name accents.

## 9. Responsive Behavior
Desktop >900px: layered gallery, two-column detail/profile. Tablet 600–900px: smaller records, compact header. Mobile <600px: generous single record width with adjacent peeks, single-column details, 44px minimum tap targets, no pointer/magnetic effects. Horizontal drag preserves vertical touch scrolling. No page-level horizontal overflow. Motion/opacity must never be the only indication of selection.
