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
Desktop margin clamp(20px,4vw,72px), max content 1900px. Hero name has two staggered lines. Work anchor opens the brand section with an oversized design/art direction heading and a two-column typographic brand list (one column on mobile). Independent projects follow at #independent: title/control row, centered vinyl-and-sleeve composition with adjacent records, three track selectors, title/summary and minimal concept note. Existing profile, experience, practice, contact sections retained. Section spacing 64–100px; 12/20/32/48px internal rhythm. Detail view uses artwork plus text, stacked on mobile.

## 6. Depth & Elevation
White remains genuinely white. No panel shadows. Depth comes from the generated LP grooves, sleeve occlusion, actual overlapping layers, small rotation and scale of adjacent records. Record texture is generated artwork, never a CSS reconstruction of a physical record or a CD image.

## 7. Animation & Interaction
GSAP 3.15, SplitText, ScrollTrigger, CustomEase, Flip and Lenis, all local. Energy curve (.32,.72,0,1). Six coordinated moments: (1) masked hero word/character entrance, (2) record/sleeve convergence on first scroll, (3) active vinyl rotation and sleeve reveal, (4) drag/inertial settling and track change, (5) Flip cover-to-detail transition, (6) staggered section typography plus magnetic link/cursor response. No forced scrolling, no endless full-page animation. Rotation pauses offscreen, in a hidden document, while dragging and in the dialog. Pointer processing is limited to animation frames. One lightweight scroll scene; no WebGL required for the supplied request. Reduced-motion disables smooth scroll, rotations, parallax and character motion; content and all controls remain usable.

## 8. Do's and Don'ts
Copy must stay brief, factual and restrained in Turkish and English. Use the user's actual role, employer, project function and contribution. Remove slogans, self-praise, elaborate production claims and repeated explanations. Examples: “Tasarımcı & Art Director”, “Çalıştığım markalar”, “Kişisel projeler”, “Yapay zekâ destekli mesaj analizi.” Keep the short AI-cover disclosure. Avoid “independent vision”, “visual worlds”, “end to end”, “let’s make it happen” and similar promotional phrasing.

Do keep pure black/white; use generated project-specific covers; keep authentic vinyl scale/center labels; use local font/assets; preserve Turkish glyphs and keyboard/touch navigation; keep truthful project descriptions.

Don't introduce any accent color; don't use CD rainbows or large CD holes; don't pass concept artwork as delivered client work; don't invent Behance URLs; don't download unlicensed Helvetica fonts; don't hide content if JavaScript fails; don't replace the pointer on touch screens; don't hijack vertical scrolling; don't add expensive decorative 3D scenes; don't crop name accents.

## 9. Responsive Behavior
Desktop >900px: layered gallery, two-column detail/profile. Tablet 600–900px: smaller records, compact header. Mobile <600px: generous single record width with adjacent peeks, single-column details, 44px minimum tap targets, no pointer/magnetic effects. Horizontal drag preserves vertical touch scrolling. No page-level horizontal overflow. Motion/opacity must never be the only indication of selection.
