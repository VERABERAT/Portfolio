/* ============================================================
   PORTFOLIO DATA — single source of truth
   index.html · project.html · admin.html all read this.
   Translatable fields are { "tr": "...", "en": "..." } objects;
   resolve with t() in the pages. Language-neutral fields
   (tags, skills, slug, year, color, doodle, email, socials)
   stay as plain strings.
   Admin panel rewrites the JSON between DATA-START / DATA-END.
   localStorage "portfolio_data" overrides at runtime (live preview).
   ============================================================ */
window.PORTFOLIO =
/* DATA-START */
{
  "projects": [
    {
      "slug": "vera",
      "t": "vera",
      "c": { "tr": "display tipografi", "en": "display typeface" },
      "y": "2025",
      "color": "navy",
      "doodle": "d-type",
      "desc": {
        "tr": "sıkışık, kalın, keskin köşeli display tipografi. dikkat ister, dikkat alır.",
        "en": "a condensed, heavy, sharp-cornered display typeface. demands attention, earns it."
      },
      "tags": ["typography", "type design", "display"],
      "link": "https://www.behance.net/gallery/246607835/VERA-Condensed-Bold-Display-Typeface",
      "media": [
        { "type": "image", "src": "images/vera/vera.jpg" },
        { "type": "embed", "src": "https://www.behance.net/embed/project/246607835?ilo0=1" }
      ]
    },
    {
      "slug": "ferm",
      "t": "ferm",
      "c": { "tr": "ambalaj", "en": "packaging" },
      "y": "2025",
      "color": "forest",
      "doodle": "d-sprout",
      "desc": {
        "tr": "fermente ürün serisi için organik tipografi ve canlı bir ambalaj sistemi.",
        "en": "organic typography and a lively packaging system for a fermented product line."
      },
      "tags": ["packaging", "fmcg", "print"],
      "link": "https://www.behance.net/gallery/244632009/FERM-360-Brand-Ecosystem-Web-UIUX-Design",
      "media": [
        { "type": "embed", "src": "https://www.behance.net/embed/project/242331839?ilo0=1" },
        { "type": "embed", "src": "https://www.behance.net/embed/project/243459673?ilo0=1" },
        { "type": "embed", "src": "https://www.behance.net/embed/project/244631009?ilo0=1" }
      ]
    },
    {
      "slug": "nutripaw",
      "t": "nutripaw",
      "c": { "tr": "fmcg branding", "en": "fmcg branding" },
      "y": "2024",
      "color": "yellow",
      "doodle": "d-box",
      "desc": {
        "tr": "organik pet food markası için bütüncül kimlik, ambalaj ve kampanya.",
        "en": "holistic identity, packaging and campaign for an organic pet food brand."
      },
      "tags": ["identity", "packaging", "campaign"],
      "link": "https://www.behance.net/gallery/242252719/x",
      "media": [
        { "type": "embed", "src": "https://www.behance.net/embed/project/242252719?ilo0=1" }
      ]
    },
    {
      "slug": "smart-locker",
      "t": "smart locker",
      "c": { "tr": "ui / ux", "en": "ui / ux" },
      "y": "2024",
      "color": "sky",
      "doodle": "d-eye",
      "desc": {
        "tr": "akıllı kilit dolabı için dokunmatik arayüz konsepti. akış + ekranlar.",
        "en": "touchscreen interface concept for a smart locker. flows + screens."
      },
      "tags": ["ui", "touchscreen", "flow"],
      "link": "",
      "media": [
        { "type": "image", "src": "images/smart-locker-interface/smart-locker-interface.jpg" }
      ]
    },
    {
      "slug": "canlani",
      "t": "canlanı",
      "c": { "tr": "kampanya", "en": "campaign" },
      "y": "2024",
      "color": "mint",
      "doodle": "d-wave",
      "desc": {
        "tr": "kampanya filmi ve key visual serisi. 6sn / 15sn / 30sn versiyonlar.",
        "en": "campaign film and key visual series. 6s / 15s / 30s cuts."
      },
      "tags": ["motion", "key visual", "campaign"],
      "link": "",
      "media": []
    },
    {
      "slug": "decay-creates-life",
      "t": "decay creates life",
      "c": { "tr": "editöryal", "en": "editorial" },
      "y": "2024",
      "color": "forest",
      "doodle": "d-flower",
      "desc": {
        "tr": "bozulma ve yenilenme üzerine kavramsal seri. ai görseller + photoshop.",
        "en": "a conceptual series on decay and renewal. ai imagery + photoshop."
      },
      "tags": ["ai", "editorial", "concept"],
      "link": "",
      "media": []
    },
    {
      "slug": "imece-market",
      "t": "imece market",
      "c": { "tr": "marka sistemi", "en": "brand system" },
      "y": "2025",
      "color": "navy",
      "doodle": "d-box",
      "desc": {
        "tr": "üretim & finans platformu için marka sistemi ve dashboard arayüzü.",
        "en": "brand system and dashboard interface for a production & finance platform."
      },
      "tags": ["system", "dashboard", "identity"],
      "link": "https://www.behance.net/gallery/242251305/x",
      "media": [
        { "type": "image", "src": "images/i-mece-market-2025-production-finance/i-mece-market-2025-production-finance.jpg" },
        { "type": "embed", "src": "https://www.behance.net/embed/project/242251305?ilo0=1" }
      ]
    },
    {
      "slug": "miu-miu",
      "t": "miu miu",
      "c": { "tr": "kampanya", "en": "campaign" },
      "y": "2024",
      "color": "yellow",
      "doodle": "d-spark",
      "desc": {
        "tr": "sezonluk kampanya için key visual ve motion kurgular.",
        "en": "key visuals and motion edits for a seasonal campaign."
      },
      "tags": ["motion", "fashion", "campaign"],
      "link": "",
      "media": [
        { "type": "video", "src": "images/miu-miu/miu-miu.mp4" }
      ]
    },
    {
      "slug": "kasten-meets-ankara",
      "t": "kasten meets ankara",
      "c": { "tr": "sanat yönetimi", "en": "art direction" },
      "y": "2024",
      "color": "sky",
      "doodle": "d-tent",
      "desc": {
        "tr": "ankara için kültürel kampanyanın instagram serisi — carousel + reels.",
        "en": "instagram series for a cultural campaign for ankara — carousel + reels."
      },
      "tags": ["social", "carousel", "reels"],
      "link": "https://www.behance.net/gallery/242239553/x",
      "media": [
        { "type": "embed", "src": "https://www.behance.net/embed/project/242239553?ilo0=1" }
      ]
    },
    {
      "slug": "yazgiya-inat-yazi",
      "t": "yazgıya inat yazı",
      "c": { "tr": "sergi · poster", "en": "exhibition · poster" },
      "y": "2025",
      "color": "forest",
      "doodle": "d-type",
      "desc": {
        "tr": "sergi kimliği ve poster serisi — tipografi odaklı, brutalist bir görsel dil.",
        "en": "exhibition identity and poster series — a typography-led, brutalist visual language."
      },
      "tags": ["poster", "typography", "exhibition", "print"],
      "link": "https://www.behance.net/gallery/242240151/x",
      "media": [
        { "type": "embed", "src": "https://www.behance.net/embed/project/242240151?ilo0=1" }
      ]
    },
    {
      "slug": "tus-bodrum",
      "t": "tus bodrum",
      "c": { "tr": "marka kimliği · menü", "en": "brand identity · menu" },
      "y": "2024",
      "color": "yellow",
      "doodle": "d-spark",
      "desc": {
        "tr": "otel & restoran için sıfırdan görsel kimlik, logo ve menü tasarımı.",
        "en": "visual identity from scratch, logo and menu design for a hospitality brand."
      },
      "tags": ["branding", "identity", "menu", "hospitality"],
      "link": "https://www.behance.net/gallery/242243045/x",
      "media": [
        { "type": "embed", "src": "https://www.behance.net/embed/project/242243045?ilo0=1" }
      ]
    },
    {
      "slug": "odeabank",
      "t": "odeabank",
      "c": { "tr": "kurumsal kimlik", "en": "corporate identity" },
      "y": "2024",
      "color": "mint",
      "doodle": "d-cloud",
      "desc": {
        "tr": "kurumsal iletişim kampanyası. baskı + dijital uygulamalar.",
        "en": "corporate communication campaign. print + digital applications."
      },
      "tags": ["corporate", "identity"],
      "link": "",
      "media": []
    }
  ],
  "profile": {
    "aboutH": { "tr": "statik markayla motion arasına köprü kurarım.", "en": "i bridge static branding and motion." },
    "bio": [
      {
        "tr": "<b>berat erdoğan</b> — statik markalama ile motion arasındaki boşluğu kapatan bir art director. midjourney ve firefly gibi generative ai araçlarını kreatif akışa entegre ederek üretimi hızlandırır.",
        "en": "<b>berat erdoğan</b> — an art director closing the gap between static branding and motion. integrates generative ai tools like midjourney and firefly into the creative workflow to speed production up."
      },
      {
        "tr": "konsept geliştirmeden sosyal medya adaptasyonuna kadar uçtan uca kampanya tasarımı. teknik hassasiyet + modern, tipografik estetik. az sözle çok şey.",
        "en": "end-to-end campaign design, from concept development to social media adaptation. technical precision + a modern, typographic aesthetic. much, said simply."
      }
    ],
    "skills": ["brand identity", "motion graphics", "social media", "typography", "figma", "after effects", "midjourney", "firefly"],
    "counters": [
      { "v": "03+", "l": { "tr": "yıl deneyim", "en": "years experience" } },
      { "v": "04", "l": { "tr": "ajans / stüdyo", "en": "agencies / studios" } },
      { "v": "%40", "l": { "tr": "ai ile hız", "en": "faster with ai" } },
      { "v": "★", "l": { "tr": "full-time'a açık", "en": "open to full-time" } }
    ],
    "contactH": { "tr": "birlikte basit ama güçlü bir şey yapalım.", "en": "let's make something simple but strong." },
    "email": "losberat@icloud.com",
    "avail": {
      "tr": "görsel tasarım, marka, motion ya da sosyal medya projen için açığım. <mark>full-time</mark> ve remote çalışmaya hazırım.",
      "en": "open for visual, brand, motion or social media projects. available <mark>full-time</mark> and remote."
    },
    "socials": {
      "behance": "https://www.behance.net/beraterdoan1",
      "instagram": "https://www.instagram.com/__bertab/?hl=tr",
      "linkedin": "https://www.linkedin.com/in/beraterdogan"
    }
  },
  "experience": [
    {
      "role": "art director", "org": "kasten kolektif",
      "date": { "tr": "ara 2024 — ara 2025", "en": "dec 2024 — dec 2025" }, "doodle": "d-tent",
      "note": {
        "tr": "büyük ölçekli sergiler için görsel kimlik adaptasyonu. 20+ baskı &amp; dijital varlık, ai ile %40 daha hızlı üretim.",
        "en": "visual identity adaptation for large-scale exhibitions. 20+ print &amp; digital assets, 40% faster production with ai."
      }
    },
    {
      "role": "art director", "org": "yup agency",
      "date": { "tr": "haz — eyl 2024", "en": "jun — sep 2024" }, "doodle": "d-wave",
      "note": {
        "tr": "sosyal medya kampanyaları (%20 etkileşim artışı), motion grafik ve kısa video (reels / shorts).",
        "en": "social media campaigns (20% more engagement), motion graphics and short-form video (reels / shorts)."
      }
    },
    {
      "role": "brand designer · freelance", "org": "tus bodrum",
      "date": { "tr": "2023", "en": "2023" }, "doodle": "d-spark",
      "note": {
        "tr": "sıfırdan görsel kimlik: logo, renk paleti, tipografi kuralları ve sezonluk sosyal medya dili.",
        "en": "visual identity from scratch: logo, colour palette, typography rules and a seasonal social media language."
      }
    },
    {
      "role": "digital designer", "org": "notivent app",
      "date": { "tr": "haz — eki 2023", "en": "jun — oct 2023" }, "doodle": "d-box",
      "note": {
        "tr": "mobil uygulama lansmanı için görsel strateji ve app store tanıtım varlıkları.",
        "en": "visual strategy for a mobile app launch and app store promo assets."
      }
    }
  ]
}
/* DATA-END */
;
