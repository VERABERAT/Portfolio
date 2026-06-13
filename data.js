/* ============================================================
   PORTFOLIO DATA — single source of truth
   index.html · project.html · admin.html all read this.
   Admin panel rewrites the JSON between DATA-START / DATA-END
   and commits this file to GitHub (Vercel auto-deploys).
   localStorage key "portfolio_data" overrides this at runtime
   so in-browser edits preview instantly.
   ============================================================ */
window.PORTFOLIO =
/* DATA-START */
{
  "projects": [
    {
      "slug": "vera",
      "t": "vera",
      "c": "display typeface",
      "y": "2025",
      "color": "navy",
      "doodle": "d-type",
      "desc": "sıkışık, kalın, keskin köşeli display tipografi. dikkat ister, dikkat alır.",
      "tags": ["typography", "type design", "display"],
      "link": "https://www.behance.net/gallery/246607835/VERA-Condensed-Bold-Display-Typeface",
      "media": [
        { "type": "image", "src": "images/vera/vera.jpg" }
      ]
    },
    {
      "slug": "ferm",
      "t": "ferm",
      "c": "ambalaj",
      "y": "2025",
      "color": "forest",
      "doodle": "d-sprout",
      "desc": "fermente ürün serisi için organik tipografi ve canlı bir ambalaj sistemi.",
      "tags": ["packaging", "fmcg", "print"],
      "link": "https://www.behance.net/gallery/244632009/FERM-360-Brand-Ecosystem-Web-UIUX-Design",
      "media": []
    },
    {
      "slug": "nutripaw",
      "t": "nutripaw",
      "c": "fmcg branding",
      "y": "2024",
      "color": "yellow",
      "doodle": "d-box",
      "desc": "organik pet food markası için bütüncül kimlik, ambalaj ve kampanya.",
      "tags": ["identity", "packaging", "campaign"],
      "link": "",
      "media": []
    },
    {
      "slug": "smart-locker",
      "t": "smart locker",
      "c": "ui / ux",
      "y": "2024",
      "color": "sky",
      "doodle": "d-eye",
      "desc": "akıllı kilit dolabı için dokunmatik arayüz konsepti. akış + ekranlar.",
      "tags": ["ui", "touchscreen", "flow"],
      "link": "",
      "media": [
        { "type": "image", "src": "images/smart-locker-interface/smart-locker-interface.jpg" }
      ]
    },
    {
      "slug": "canlani",
      "t": "canlanı",
      "c": "kampanya",
      "y": "2024",
      "color": "mint",
      "doodle": "d-wave",
      "desc": "kampanya filmi ve key visual serisi. 6sn / 15sn / 30sn versiyonlar.",
      "tags": ["motion", "key visual", "campaign"],
      "link": "",
      "media": []
    },
    {
      "slug": "decay-creates-life",
      "t": "decay creates life",
      "c": "editöryal",
      "y": "2024",
      "color": "forest",
      "doodle": "d-flower",
      "desc": "bozulma ve yenilenme üzerine kavramsal seri. ai görseller + photoshop.",
      "tags": ["ai", "editorial", "concept"],
      "link": "",
      "media": []
    },
    {
      "slug": "imece-market",
      "t": "imece market",
      "c": "marka sistemi",
      "y": "2025",
      "color": "navy",
      "doodle": "d-box",
      "desc": "üretim & finans platformu için marka sistemi ve dashboard arayüzü.",
      "tags": ["system", "dashboard", "identity"],
      "link": "",
      "media": [
        { "type": "image", "src": "images/i-mece-market-2025-production-finance/i-mece-market-2025-production-finance.jpg" }
      ]
    },
    {
      "slug": "miu-miu",
      "t": "miu miu",
      "c": "kampanya",
      "y": "2024",
      "color": "yellow",
      "doodle": "d-spark",
      "desc": "sezonluk kampanya için key visual ve motion kurgular.",
      "tags": ["motion", "fashion", "campaign"],
      "link": "",
      "media": [
        { "type": "video", "src": "images/miu-miu/miu-miu.mp4" }
      ]
    },
    {
      "slug": "kasten-meets-ankara",
      "t": "kasten meets ankara",
      "c": "sanat yönetimi",
      "y": "2024",
      "color": "sky",
      "doodle": "d-tent",
      "desc": "ankara için kültürel kampanyanın instagram serisi — carousel + reels.",
      "tags": ["social", "carousel", "reels"],
      "link": "",
      "media": []
    },
    {
      "slug": "odeabank",
      "t": "odeabank",
      "c": "kurumsal kimlik",
      "y": "2024",
      "color": "mint",
      "doodle": "d-cloud",
      "desc": "kurumsal iletişim kampanyası. baskı + dijital uygulamalar.",
      "tags": ["corporate", "identity"],
      "link": "",
      "media": []
    }
  ],
  "profile": {
    "aboutH": "statik markayla motion arasına köprü kurarım.",
    "bio": [
      "<b>berat erdoğan</b> — statik markalama ile motion arasındaki boşluğu kapatan bir art director. midjourney ve firefly gibi generative ai araçlarını kreatif akışa entegre ederek üretimi hızlandırır.",
      "konsept geliştirmeden sosyal medya adaptasyonuna kadar uçtan uca kampanya tasarımı. teknik hassasiyet + modern, tipografik estetik. az sözle çok şey."
    ],
    "skills": ["brand identity", "motion graphics", "social media", "typography", "figma", "after effects", "midjourney", "firefly"],
    "counters": [
      { "v": "03+", "l": "yıl deneyim" },
      { "v": "04", "l": "ajans / stüdyo" },
      { "v": "%40", "l": "ai ile hız" },
      { "v": "★", "l": "full-time'a açık" }
    ],
    "contactH": "birlikte basit ama güçlü bir şey yapalım.",
    "email": "losberat@icloud.com",
    "avail": "görsel tasarım, marka, motion ya da sosyal medya projen için açığım. <mark>full-time</mark> ve remote çalışmaya hazırım.",
    "socials": {
      "behance": "https://www.behance.net/beraterdoan1",
      "instagram": "https://www.instagram.com/__bertab/?hl=tr",
      "linkedin": "https://www.linkedin.com/in/beraterdogan"
    }
  },
  "experience": [
    { "role": "art director", "org": "kasten kolektif", "date": "ara 2024 — ara 2025", "doodle": "d-tent",
      "note": "büyük ölçekli sergiler için görsel kimlik adaptasyonu. 20+ baskı &amp; dijital varlık, ai ile %40 daha hızlı üretim." },
    { "role": "art director", "org": "yup agency", "date": "haz — eyl 2024", "doodle": "d-wave",
      "note": "sosyal medya kampanyaları (%20 etkileşim artışı), motion grafik ve kısa video (reels / shorts)." },
    { "role": "brand designer · freelance", "org": "tus bodrum", "date": "2023", "doodle": "d-spark",
      "note": "sıfırdan görsel kimlik: logo, renk paleti, tipografi kuralları ve sezonluk sosyal medya dili." },
    { "role": "digital designer", "org": "notivent app", "date": "haz — eki 2023", "doodle": "d-box",
      "note": "mobil uygulama lansmanı için görsel strateji ve app store tanıtım varlıkları." }
  ]
}
/* DATA-END */
;
