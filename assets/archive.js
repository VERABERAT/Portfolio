'use strict';
// Record archive homepage.
// Behance / App Store linki: her projede "link": { "type": "behance" | "store", "url": "" }.
// url boşsa buton gizli kalır; linki yapıştırınca proje sayfasının üstünde ve ana sayfada görünür. Content (translations, projects) carried over from portfolio.js.
const translations = {
  "tr": {
    "skip": "İşlere geç",
    "work": "İşler",
    "about": "Hakkımda",
    "contact": "İletişim",
    "edition": "PORTFOLYO",
    "intro": "Tasarımcı & Art Director",
    "selected": "Uygulamalar & görsel denemeler",
    "archive": "Projeler",
    "drag": "Sürükle",
    "note": "D’S Damat, Kolpa AI ve Lumio kapakları yapay zekâ ile üretildi.",
    "brandWork": "Marka işleri",
    "dsPosts": "Postlar",
    "dsReelsNote": "Oynatmak için kaydır; ses için hoparlöre dokun",
    "igFollow": "Takip et",
    "storeLink": "App Store’da indir",
    "behanceLink": "Behance’te gör",
    "webSliders": "Web sitesi slider’ları",
    "film": "Film",
    "banner": "Banner",
    "packaging": "Ambalaj",
    "credits": "Ekip",
    "crProd": "Prodüksiyon",
    "crDir": "Yönetmen",
    "crDop": "Görüntü yönetmeni",
    "crCd": "Kreatif direktör",
    "crEdit": "Kurgu",
    "crTalent": "Oyuncular",
    "yatsanNote": "Altavia’da Yatsan için üretildi. Bazı ürün sahneleri yapay zekâ ile üretildi.",
    "dsNote": "Altavia’da D’S Damat için üretildi. Görseller ve videolar yapay zekâ ile üretildi; 12 posttan 6’sı ve 5 reels.",
    "brandTitle": "Çalıştığım<br> markalar",
    "independentLink": "Kişisel projeler ↓",
    "apps": "Kendi uygulamam",
    "statement": "Tasarımcı &<br> Art Director",
    "bio": "Altavia’da Junior Art Director olarak çalışıyorum. Görsel tasarım, yapay zekâ ile görsel üretimi ve video işleri yapıyorum.",
    "bio2": "Kolpa AI ve Lumio, tasarlayıp geliştirdiğim kendi uygulamalarım.",
    "cv": "Özgeçmişi indir ↗︎",
    "experience": "Deneyim",
    "visual": "Görsel Tasarımcı",
    "digital": "Dijital Tasarımcı",
    "brand": "Freelance Marka Tasarımcısı",
    "brands": "Diğer marka işleri: Odeabank.",
    "practice": "Çalışma alanları",
    "art": "Sanat yönetimi",
    "ai": "AI görsel üretimi",
    "motion": "Hareketli grafik & kurgu",
    "products": "Uygulama tasarımı",
    "visualStudy": "Görsel deneme",
    "p1": "Kampanya ve sosyal medya tasarımı.",
    "p2": "Yapay zekâ ile görsel ve video üretimi.",
    "p3": "Hareketli grafik ve video kurgu.",
    "p4": "Arayüz tasarımı ve SwiftUI geliştirme.",
    "lab": "Lab",
    "labTitle": "Kendi<br> araçlarım",
    "labIntro": "Ajanstaki üretimi hızlandırmak için yazdığım eklentiler ve araçlar.",
    "lab1": "After Effects için yapay zekâ paneli. Türkçe yazılan isteği ExtendScript koduna çevirip seçili katmana uygular.",
    "lab1t": "Geliştiriliyor",
    "lab2": "Ajans kampanyaları için Photoshop eklentileri. Google Sheets’ten haftalık şablonlara metin ve görsel aktarır; post formatını Content-Aware Fill ile story’ye çevirir.",
    "lab2t": "Ajansta kullanımda",
    "lab3": "Kendi geliştirdiğim macOS temizlik ve bakım uygulaması.",
    "lab3t": "Kişisel uygulama",
    "lab4": "Yapay zekâ ile video ve görsel üretimi için 18 gruptan oluşan 304 komutluk prompt kütüphanesi ve komut seçerek prompt kuran araç.",
    "lab4t": "Kişisel araç",
    "wellaFeed": "Profil görünümü",
    "wellaNote": "Altavia’da Wella Professionals Türkiye için üretildi. Görseller ve videolar yapay zekâ ile üretildi.",
    "instaLink": "Instagram’da gör",
    "hello": "Bana yaz",
    "cvShort": "Özgeçmiş ↓",
    "top": "Başa dön ↑",
    "close": "Kapat ×",
    "next": "Sonraki proje →",
    "roleLabel": "Rolüm",
    "focusLabel": "Kapsam"
  },
  "en": {
    "skip": "Skip to work",
    "work": "Work",
    "about": "About",
    "contact": "Contact",
    "edition": "PORTFOLIO",
    "intro": "Designer & Art Director",
    "selected": "Apps & visual studies",
    "archive": "Projects",
    "drag": "Drag",
    "note": "The D’S Damat, Kolpa AI and Lumio covers were created with AI.",
    "brandWork": "Brand work",
    "dsPosts": "Posts",
    "dsReelsNote": "Scroll to play; tap the speaker for sound",
    "igFollow": "Follow",
    "storeLink": "Download on the App Store",
    "behanceLink": "View on Behance",
    "webSliders": "Website sliders",
    "film": "Film",
    "banner": "Banner",
    "packaging": "Packaging",
    "credits": "Credits",
    "crProd": "Production",
    "crDir": "Directors",
    "crDop": "Director of photography",
    "crCd": "Creative direction",
    "crEdit": "Editing",
    "crTalent": "Talent",
    "yatsanNote": "Made for Yatsan at Altavia. Some product scenes were created with AI.",
    "dsNote": "Made for D’S Damat at Altavia. Images and videos were created with AI; 6 of the 12 posts and 5 reels.",
    "brandTitle": "Brands I’ve<br> worked with",
    "independentLink": "Personal projects ↓",
    "apps": "My own app",
    "statement": "Designer &<br> Art Director",
    "bio": "I work as a Junior Art Director at Altavia. My work includes visual design, AI-generated imagery and video.",
    "bio2": "Kolpa AI and Lumio are my own apps, which I design and develop.",
    "cv": "Download résumé ↗︎",
    "experience": "Experience",
    "visual": "Visual Designer",
    "digital": "Digital Designer",
    "brand": "Freelance Brand Designer",
    "brands": "Other brand work: Odeabank.",
    "practice": "What I do",
    "art": "Art direction",
    "ai": "AI image creation",
    "motion": "Motion & editing",
    "products": "App design",
    "visualStudy": "Visual study",
    "p1": "Campaign and social media design.",
    "p2": "Images and video created with AI.",
    "p3": "Motion graphics and video editing.",
    "p4": "Interface design and SwiftUI development.",
    "lab": "Lab",
    "labTitle": "Tools<br> I build",
    "labIntro": "Plugins and tools I write to speed up production at the agency.",
    "lab1": "An AI panel for After Effects. It turns a plain-language request into ExtendScript and applies it to the selected layer.",
    "lab1t": "In progress",
    "lab2": "Photoshop plugins for agency campaigns. They pull copy and images from Google Sheets into weekly templates and turn post formats into stories with Content-Aware Fill.",
    "lab2t": "In use at the agency",
    "lab3": "A macOS cleaning and maintenance app I develop.",
    "lab3t": "Personal app",
    "lab4": "A 304-command prompt library in 18 groups for AI video and image generation, plus a tool that builds prompts from selected commands.",
    "lab4t": "Personal tool",
    "wellaFeed": "Profile view",
    "wellaNote": "Made for Wella Professionals Turkey at Altavia. Images and videos were created with AI.",
    "instaLink": "View on Instagram",
    "hello": "Get in touch",
    "cvShort": "Résumé ↓",
    "top": "Back to top ↑",
    "close": "Close ×",
    "next": "Next project →",
    "roleLabel": "My role",
    "focusLabel": "Scope"
  }
};
// Proje verisi data/projects.js dosyasından gelir (admin paneli bu dosyayı düzenler).
const DATA = window.PORTFOLIO || { categories: [], projects: [] };
const projects = DATA.projects.filter(p => !p.hidden);
const extra = projects.map(p => ({ kind: p.kind, status: p.status, cat: p.cat }));



// Strings added for the record-archive homepage.
Object.assign(translations.tr, {
  loading: 'Plaklar hazırlanıyor', typeLabel: 'Tür', yearLabel: 'Yıl', statusLabel: 'Durum',
  summaryLabel: 'Proje', madeLabel: 'Yaptıklarım', nextLabel: 'Sıradaki',
  hint: '← → gez · Space çevir · Enter aç', flip: 'Çevir'
});
Object.assign(translations.en, {
  loading: 'Preparing records', typeLabel: 'Type', yearLabel: 'Year', statusLabel: 'Status',
  summaryLabel: 'Project', madeLabel: 'What I did', nextLabel: 'Up next',
  hint: '← → browse · Space flip · Enter open', flip: 'Flip'
});

const categories = DATA.categories.filter(c => extra.some(x => x.cat === c.id));

const RECORD = 'assets/vinyl/vinyl-record.webp';

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const gs = window.gsap;
const ST = window.ScrollTrigger;
const Split = window.SplitText;
const reduce = matchMedia('(prefers-reduced-motion: reduce)');
const fine = matchMedia('(pointer: fine) and (hover: hover)');
const moving = () => !!gs && !reduce.matches;
if (gs) {
  [ST, Split, window.CustomEase].filter(Boolean).forEach(p => gs.registerPlugin(p));
  window.CustomEase?.create('energy', '.32,.72,0,1');
  document.documentElement.classList.add('gsap');
}
const ease = window.CustomEase ? 'energy' : 'power3.out';

const stage = $('.stage');
const dialog = $('#production');
window.PortfolioMedia?.render(projects, $('.p-next', dialog));
const scribble = $('.scribble path');
let lang = 'tr', current = 0, lenis, busy = false, returnFocus, drag = null, blockClick = 0;
let visible = true, paused = false;
try { const s = localStorage.getItem('portfolio-language'); if (s === 'tr' || s === 'en') lang = s; } catch {}

/* ---------- Build discs ---------- */
const discs = projects.map((p, i) => {
  const b = document.createElement('button');
  b.className = 'disc';
  b.type = 'button';
  b.dataset.index = i;
  b.innerHTML =
    '<span class="disc-body">' +
      '<span class="disc-face disc-front"><span class="platter"><img src="' + RECORD + '" alt="" draggable="false">' +
        '<span class="disc-label"><img src="' + p.image + '" alt="" draggable="false"><b>' + p.title + '</b></span><span class="disc-hole"></span></span></span>' +
      '<span class="disc-face disc-back"><img src="' + p.image + '" alt="" draggable="false"><span class="disc-index">BE—' + String(i + 1).padStart(3, '0') + '</span><span class="disc-hole"></span></span>' +
    '</span>';
  stage.append(b);
  return b;
});
/* ---------- Category chips ---------- */
const catNav = $('.cat-nav');
const catButtons = categories.map(c => {
  const first = extra.findIndex(x => x.cat === c.id);
  const count = extra.filter(x => x.cat === c.id).length;
  const b = document.createElement('button');
  b.type = 'button'; b.className = 'cat'; b.dataset.cat = c.id;
  b.innerHTML = '<span class="cat-name"></span><sup>' + String(count).padStart(2, '0') + '</sup>';
  b.addEventListener('click', () => { if (first > -1 && first !== current) select(first); });
  catNav.append(b);
  return b;
});
function syncCats() {
  catNav.setAttribute('aria-label', lang === 'tr' ? 'Kategoriler' : 'Categories');
  catButtons.forEach((b, k) => {
    $('.cat-name', b).textContent = categories[k][lang];
    b.setAttribute('aria-pressed', String(extra[current].cat === categories[k].id));
  });
}
const spins = gs ? discs.map(d => gs.to($('.platter', d), { rotation: '+=360', duration: 24, repeat: -1, ease: 'none', paused: true })) : [];

function syncSpin() {
  const run = moving() && visible && !paused && !document.hidden && !dialog.open && !drag?.active && !document.body.classList.contains('is-loading');
  spins.forEach((t, i) => (run && i === current ? t.play() : t.pause()));
  const btn = $('.motion-toggle');
  btn.disabled = reduce.matches || !gs;
  btn.setAttribute('aria-pressed', String(paused));
  btn.textContent = paused ? '▷' : 'Ⅱ';
  const label = reduce.matches ? (lang === 'tr' ? 'Azaltılmış hareket açık' : 'Reduced motion is on')
    : paused ? (lang === 'tr' ? 'Plak hareketini başlat' : 'Resume record motion')
    : (lang === 'tr' ? 'Plak hareketini durdur' : 'Pause record motion');
  btn.setAttribute('aria-label', label); btn.title = label;
  syncMusic();
}
$('.motion-toggle').addEventListener('click', () => { paused = !paused; syncSpin(); });

/* ---------- Spotify: plak dönerken projenin şarkısını çal ---------- */
// Spotify iFrame API: https://developer.spotify.com/documentation/embeds/references/iframe-api
const musicBtn = $('.music-toggle');
const dock = $('.spotify-dock');
let musicOn = false, spotify = null, spotifyReady = false, loadedUrl = '', musicPlaying = false;
const hasMusic = projects.some(p => p.spotify);
if (musicBtn) musicBtn.hidden = !hasMusic;
function musicLabel() {
  if (!musicBtn) return;
  const l = musicOn ? (lang === 'tr' ? 'Müziği kapat' : 'Turn music off') : (lang === 'tr' ? 'Müziği aç' : 'Turn music on');
  musicBtn.setAttribute('aria-pressed', String(musicOn)); musicBtn.setAttribute('aria-label', l); musicBtn.title = l;
}
function loadSpotify(cb) {
  if (spotify) return cb();
  window.onSpotifyIframeApiReady = api => {
    const el = document.createElement('div'); $('.spotify-slot', dock).append(el);
    api.createController(el, { url: projects[current].spotify || projects.find(p => p.spotify).spotify, width: '100%', height: 80 }, c => {
      spotify = c;
      c.addListener('ready', () => { spotifyReady = true; cb(); });
      c.addListener('playback_update', e => { musicPlaying = !e.data.isPaused; });
    });
  };
  const s = document.createElement('script'); s.src = 'https://open.spotify.com/embed/iframe-api/v1'; s.async = true;
  s.onerror = () => { musicOn = false; dock.hidden = true; musicLabel(); };
  document.head.append(s);
}
function syncMusic() {
  if (!musicOn || !spotifyReady) return;
  const url = projects[current].spotify;
  const shouldPlay = !!url && visible && !paused && !document.hidden && !dialog.open;
  if (!shouldPlay) { if (musicPlaying) { spotify.pause(); musicPlaying = false; } return; }
  if (url !== loadedUrl) { loadedUrl = url; spotify.loadEntity(url); musicPlaying = true; setTimeout(() => { if (loadedUrl === url && musicPlaying) spotify.play(); }, 700); }
  else if (!musicPlaying) { spotify.resume(); musicPlaying = true; }
}
if (musicBtn) musicBtn.addEventListener('click', () => {
  musicOn = !musicOn; musicLabel();
  if (musicOn) {
    dock.hidden = false;
    loadSpotify(() => { loadedUrl = ''; syncMusic(); });
  } else {
    if (spotify) spotify.pause();
    musicPlaying = false;
    dock.hidden = true;
  }
});
musicLabel();
new IntersectionObserver(e => { visible = e[0].isIntersecting; syncSpin(); }, { threshold: .05 }).observe(stage);
document.addEventListener('visibilitychange', syncSpin);

/* ---------- Layout ---------- */
const mobile = () => innerWidth <= 600;
function offsetOf(i) {
  let o = i - current;
  const n = discs.length;
  if (o > n / 2) o -= n;
  if (o < -n / 2) o += n;
  return o;
}
function layout(animate = true, dx = 0) {
  const size = discs[0].offsetWidth || 400;
  const gap = size * (mobile() ? 1.02 : .92);
  discs.forEach((d, i) => {
    const o = offsetOf(i), active = o === 0;
    const tilt = mobile() ? 'rotateX(24deg) rotateZ(-10deg)' : 'rotateX(38deg) rotateZ(-18deg)';
    const x = o * gap + dx, y = -o * size * (mobile() ? .04 : .08), s = active ? 1 : .74;
    d.setAttribute('aria-current', String(active));
    d.tabIndex = active ? 0 : -1;
    d.setAttribute('aria-label', projects[i].title + (active ? '' : (lang === 'tr' ? ' — seç' : ' — select')));
    d.style.zIndex = active ? 3 : 2 - Math.abs(o);
    const t = 'translate3d(' + x + 'px,' + y + 'px,0) ' + tilt + ' scale(' + s + ')';
    if (gs) gs.to(d, { transform: t, opacity: Math.abs(o) > 1 ? 0 : 1, duration: animate && moving() ? 1 : 0, ease, overwrite: 'auto' });
    else d.style.transform = t;
  });
}

/* Hand-drawn loop around the front record */
function scribblePath() {
  const turns = 1.12, steps = 140, ph = Math.random() * 6.28, ph2 = Math.random() * 6.28;
  let d = '';
  for (let k = 0; k <= steps; k++) {
    const t = (k / steps) * turns * Math.PI * 2;
    const r = 50 * (1 + .045 * Math.sin(3 * t + ph) + .025 * Math.sin(7 * t + ph2) - .05 * (k / steps));
    const x = Math.cos(t) * r * 1.02, y = Math.sin(t) * r;
    d += (k ? 'L' : 'M') + x.toFixed(2) + ' ' + y.toFixed(2);
  }
  return d;
}
function drawScribble() {
  scribble.setAttribute('d', scribblePath());
  scribble.parentNode.style.rotate = '';
  if (!moving()) { scribble.style.strokeDasharray = ''; scribble.style.strokeDashoffset = ''; return; }
  const len = scribble.getTotalLength();
  gs.fromTo(scribble, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 1.1, delay: .35, ease: 'power2.inOut', overwrite: true });
}

/* ---------- Content ---------- */
function setLink(el, p) {
  const l = p.link || {};
  el.hidden = !l.url;
  if (!l.url) { el.removeAttribute('href'); return; }
  el.href = l.url;
  $('span', el).textContent = translations[lang][l.type === 'store' ? 'storeLink' : l.type === 'instagram' ? 'instaLink' : 'behanceLink'];
}
function fillArchive(animate) {
  const p = projects[current], d = p[lang], x = extra[current];
  $('.credits-title').textContent = p.title;
  $('.c-type').textContent = x.kind[lang];
  setLink($('.c-link'), p);
  syncCats();
  $('.c-year').textContent = p.year || '2026';
  $('.c-role').textContent = d.role;
  $('.c-focus').textContent = d.focus;
  $('.n-summary').textContent = d.summary;
  $('.n-focus').textContent = d.role;
  $('.count-now').textContent = String(current + 1).padStart(2, '0');
  $('.count-all').textContent = String(projects.length).padStart(2, '0');
  const flipped = discs[current].classList.contains('flipped');
  $('.flip-toggle').setAttribute('aria-pressed', String(flipped));
  stage.setAttribute('aria-label', (lang === 'tr' ? 'Proje galerisi: ' : 'Project gallery: ') + p.title + ', ' + (current + 1) + ' / ' + projects.length);
  if (animate && moving()) {
    gs.fromTo(['.credits-title', '.credits-rows > div'], { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: .6, stagger: .05, ease, overwrite: true });
    gs.fromTo('.note', { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: .6, stagger: .08, delay: .1, ease, overwrite: true });
  }
}
function setFlip(d, on, animate = true) {
  d.classList.toggle('flipped', on);
  if (gs) gs.to($('.disc-body', d), { rotationY: on ? 180 : 0, rotationX: 0, duration: animate && moving() ? 1 : 0, ease, overwrite: true });
}
function select(i, animate = true) {
  setFlip(discs[current], false, animate);
  current = (i + projects.length) % projects.length;
  layout(animate); fillArchive(animate); drawScribble(); syncSpin();
}
function flip() {
  setFlip(discs[current], !discs[current].classList.contains('flipped'));
  $('.flip-toggle').setAttribute('aria-pressed', String(discs[current].classList.contains('flipped')));
}

/* ---------- Production view ---------- */
function fillProduction() {
  const p = projects[current], d = p[lang], x = extra[current], n = projects[(current + 1) % projects.length];
  const title = $('.p-title');
  title.innerHTML = '';
  const words = p.title.split(' ');
  const lines = p.title.length <= 9 || words.length < 2 ? [p.title] : [words.slice(0, -1).join(' '), words.at(-1)];
  lines.forEach((l, k) => { const o = document.createElement('span'), i = document.createElement('span'); o.className = 'line'; i.textContent = l + (k < lines.length - 1 ? ' ' : ''); o.append(i); title.append(o); });
  $('.p-role').textContent = d.role;
  $('.p-focus').textContent = d.focus;
  $('.p-type').textContent = x.kind[lang];
  $('.p-year').textContent = p.year || '2026';
  $('.p-status').textContent = x.status[lang];
  setLink($('.p-cta'), p);
  $('.p-image').src = p.image;
  $('.p-image').alt = p.title + (lang === 'tr' ? ' — plak kapağı' : ' — record cover');
  $('.p-desc').textContent = d.description;
  $$('.p-media').forEach(m => { m.hidden = m.dataset.project !== p.media; if (m.hidden) $$('video', m).forEach(v => v.pause()); });
  $('.p-next-title').textContent = n.title;
  $('.p-next-label-art img').src = n.image;
  $('.p-next').setAttribute('aria-label', (lang === 'tr' ? 'Sıradaki proje: ' : 'Next project: ') + n.title);
}
function revealProduction() {
  if (!moving()) return;
  gs.fromTo('.p-title .line > span', { yPercent: 110 }, { yPercent: 0, duration: 1.05, stagger: .08, ease, overwrite: true });
  gs.fromTo(['.p-credit', '.p-rows > div'], { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: .7, stagger: .05, delay: .25, ease, overwrite: true });
  gs.fromTo('.p-rows > div', { scaleX: .96 }, { scaleX: 1, duration: .9, stagger: .05, delay: .25, ease });
  gs.fromTo('.p-figure', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, delay: .35, ease, overwrite: true });
  gs.fromTo('.p-figure .plus', { scale: 0, rotation: -90 }, { scale: 1, rotation: 0, duration: .8, stagger: .06, delay: .7, ease });
}
function openProduction() {
  if (busy || dialog.open) return;
  busy = true; returnFocus = document.activeElement;
  fillProduction(); lenis?.stop(); document.documentElement.style.overflow = 'hidden';
  dialog.showModal(); dialog.scrollTop = 0; syncSpin();
  $('.p-close').focus({ preventScroll: true });
  try { history.replaceState(null, '', '#' + projects[current].title.toLowerCase().replace(/[^a-z0-9]+/g, '-')); } catch {}
  if (moving()) {
    gs.fromTo(dialog, { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: .9, ease, onComplete: () => { dialog.style.clipPath = ''; busy = false; } });
    revealProduction();
  } else busy = false;
}
function closeProduction() {
  if (!dialog.open || busy) return;
  busy = true;
  const done = () => {
    dialog.close(); dialog.style.clipPath = ''; stopReels(); document.documentElement.style.overflow = '';
    lenis?.start(); returnFocus?.focus({ preventScroll: true }); busy = false; syncSpin();
    try { history.replaceState(null, '', location.pathname + location.search); } catch {}
  };
  if (moving()) gs.to(dialog, { clipPath: 'inset(0 0 100% 0)', duration: .7, ease, onComplete: done });
  else done();
}
$('.p-close').addEventListener('click', closeProduction);
$$('[data-open]').forEach(b => b.addEventListener('click', () => {
  const i = projects.findIndex(p => p.media === b.dataset.open);
  if (i < 0 || dialog.open) return;
  select(i, false); openProduction();
}));
dialog.addEventListener('cancel', e => { e.preventDefault(); closeProduction(); });
$('.p-next').addEventListener('click', () => {
  if (busy) return; busy = true;
  const swap = () => {
    select(current + 1, false); fillProduction(); dialog.scrollTop = 0; revealProduction(); busy = false;
  };
  if (moving()) {
    gs.timeline({ onComplete: swap })
      .to('.p-next-disc', { yPercent: -60, rotation: 120, duration: .6, ease })
      .to(['.p-head', '.p-figure', '.p-body'], { opacity: 0, duration: .25 }, 0)
      .set(['.p-head', '.p-figure', '.p-body', '.p-next-disc'], { clearProps: 'all' });
  } else swap();
});

/* ---------- Input ---------- */
$('.prev').addEventListener('click', () => select(current - 1));
$('.next').addEventListener('click', () => select(current + 1));
$('.flip-toggle').addEventListener('click', flip);
stage.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); select(current + (e.key === 'ArrowRight' ? 1 : -1)); }
  else if (e.key === ' ' || e.key === 'Spacebar') { e.preventDefault(); flip(); }
  else if (e.key === 'Enter') { e.preventDefault(); openProduction(); }
});
discs.forEach((d, i) => d.addEventListener('click', () => {
  if (performance.now() < blockClick) return;
  if (i !== current) select(i); else openProduction();
}));
stage.addEventListener('pointerdown', e => { if (e.button === 0) drag = { id: e.pointerId, x: e.clientX, y: e.clientY, dx: 0, active: false, frame: 0 }; });
stage.addEventListener('pointermove', e => {
  if (!drag || e.pointerId !== drag.id) return;
  const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
  if (!drag.active && Math.abs(dy) > 12 && Math.abs(dy) > Math.abs(dx)) { drag = null; return; }
  if (!drag.active && Math.abs(dx) > 9) { drag.active = true; stage.setPointerCapture(e.pointerId); stage.classList.add('dragging'); syncSpin(); }
  if (!drag.active) return;
  drag.dx = dx; blockClick = performance.now() + 450;
  if (!drag.frame) drag.frame = requestAnimationFrame(() => { if (drag) { drag.frame = 0; layout(false, drag.dx * .8); } });
});
function endDrag(e) {
  if (!drag || e.pointerId !== drag.id) return;
  const f = drag; cancelAnimationFrame(f.frame); drag = null; stage.classList.remove('dragging');
  if (stage.hasPointerCapture(e.pointerId)) stage.releasePointerCapture(e.pointerId);
  if (!f.active) return;
  if (e.type !== 'pointercancel' && Math.abs(f.dx) > Math.min(70, stage.clientWidth * .1)) select(current + (f.dx < 0 ? 1 : -1));
  else { layout(); syncSpin(); }
}
stage.addEventListener('pointerup', endDrag);
stage.addEventListener('pointercancel', endDrag);
let wheelLock = 0;
stage.addEventListener('wheel', e => {
  if (Math.abs(e.deltaX) < Math.abs(e.deltaY) || Math.abs(e.deltaX) < 10) return;
  e.preventDefault(); if (performance.now() < wheelLock) return;
  wheelLock = performance.now() + 750; select(current + (e.deltaX > 0 ? 1 : -1));
}, { passive: false });
if (gs) stage.addEventListener('pointermove', e => {
  if (!fine.matches || !moving() || drag?.active) return;
  const r = stage.getBoundingClientRect();
  gs.to('.disc[aria-current=true] .disc-body', { rotationY: ((e.clientX - r.left) / r.width - .5) * 10 + (discs[current].classList.contains('flipped') ? 180 : 0), rotationX: -((e.clientY - r.top) / r.height - .5) * 8, duration: .8, ease: 'power3', overwrite: 'auto' });
});
stage.addEventListener('pointerleave', () => { if (gs) gs.to('.disc-body', { rotationX: 0, rotationY: (i, el) => el.parentNode.classList.contains('flipped') ? 180 : 0, duration: .8, ease }); });
new ResizeObserver(() => layout(false)).observe(stage);

/* ---------- Language ---------- */
function setLanguage(next) {
  lang = next; document.documentElement.lang = next;
  $$('[data-t]').forEach(el => { const v = translations[next][el.dataset.t]; if (v) el.innerHTML = v; });
  $$('[data-tr]').forEach(el => { el.textContent = next === 'en' ? el.dataset.en : el.dataset.tr; });
  if (typeof musicLabel === 'function') musicLabel();
  $$('[data-cv]').forEach(a => { a.href = next === 'en' ? 'Berat-Erdogan-CV-EN.pdf' : 'Berat-Erdogan-CV.pdf'; a.setAttribute('download', next === 'en' ? 'Berat-Erdogan-CV-EN.pdf' : 'Berat-Erdogan-CV.pdf'); });
  $$('[data-lang]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === next)));
  $('.prev').setAttribute('aria-label', next === 'tr' ? 'Önceki proje' : 'Previous project');
  $('.next').setAttribute('aria-label', next === 'tr' ? 'Sonraki proje' : 'Next project');
  $('.topbar-nav').setAttribute('aria-label', next === 'tr' ? 'Ana menü' : 'Main navigation');
  const labels = next === 'tr' ? ['01 / PROFİL', '02 / DENEYİM', '03 / ÜRETİM', '04 / LAB', '05 / İLETİŞİM'] : ['01 / PROFILE', '02 / EXPERIENCE', '03 / PRACTICE', '04 / LAB', '05 / CONTACT'];
  $$('.section .section-heading > span:last-child').forEach((el, i) => (el.textContent = labels[i]));
  fillArchive(false); layout(false); syncSpin();
  if (dialog.open) fillProduction();
  try { localStorage.setItem('portfolio-language', next); } catch {}
  if (ST) requestAnimationFrame(() => ST.refresh());
}
$$('[data-lang]').forEach(b => b.addEventListener('click', () => setLanguage(b.dataset.lang)));

/* ---------- Loader, then entrance ---------- */
function preload() {
  const srcs = [RECORD, ...projects.map(p => p.image)];
  let loaded = 0;
  const count = $('.loader-count'), shown = { v: 0 };
  const bump = () => {
    loaded++;
    const target = Math.round((loaded / srcs.length) * 100);
    if (moving()) gs.to(shown, { v: target, duration: .6, ease: 'power2.out', onUpdate: () => (count.textContent = Math.round(shown.v)) });
    else count.textContent = target;
  };
  const jobs = srcs.map(src => new Promise(res => { const i = new Image(); i.onload = i.onerror = () => { bump(); res(); }; i.src = src; }));
  const minTime = new Promise(r => setTimeout(r, moving() ? 1300 : 0));
  const maxTime = new Promise(r => setTimeout(r, 6000));
  return Promise.race([Promise.all([...jobs, minTime]), maxTime]);
}
function enter() {
  const finish = () => { document.body.classList.remove('is-loading'); syncSpin(); };
  if (!moving()) { finish(); drawScribble(); return; }
  gs.timeline({ defaults: { ease } })
    .to('.loader-count', { yPercent: -40, opacity: 0, duration: .5 })
    .to('.loader', { clipPath: 'inset(0 0 100% 0)', duration: .9, onComplete: finish }, .15)
    .from('.topbar > *', { y: -14, opacity: 0, duration: .7, stagger: .06 }, .5)
    .from('.disc', { y: '+=180', opacity: 0, duration: 1.3, stagger: .09, clearProps: 'opacity' }, .45)
    .from(['.credits-title', '.credits-rows > div', '.archive-note'], { y: 16, opacity: 0, duration: .7, stagger: .05 }, .8)
    .from('.note', { y: 16, opacity: 0, duration: .7, stagger: .08 }, .95)
    .from('.archive-foot > *', { y: 12, opacity: 0, duration: .6, stagger: .06 }, 1)
    .add(drawScribble, .9);
}

setLanguage(lang); select(0, false);
preload().then(() => document.fonts.ready).then(() => {
  if (dialog.open) return;
  enter();
  if (!gs || !ST) return;
  gs.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
    gs.utils.toArray('.reveal').forEach(el => gs.from(el, { y: 35, opacity: 0, duration: .8, ease, scrollTrigger: { trigger: el, start: 'top 93%', once: true } }));
    gs.fromTo('.reading-progress', { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: true } });
    gs.to('.credits, .notes', { y: -60, opacity: 0, ease: 'none', scrollTrigger: { trigger: '.archive', start: 'top top', end: '60% top', scrub: true } });
    const splits = [];
    if (Split) $$('.statement, .contact h2, .brand-intro h2').forEach(el => {
      splits.push(Split.create(el, { type: 'lines,words', mask: 'lines', autoSplit: true,
        onSplit: s => gs.from(s.words, { yPercent: 115, duration: 1, stagger: .06, ease, scrollTrigger: { trigger: el, start: 'top 92%', once: true } }) }));
    });
    let tick;
    if (window.Lenis) {
      lenis = new window.Lenis({ lerp: .1, smoothWheel: true, syncTouch: false, anchors: true });
      lenis.on('scroll', ST.update); tick = t => lenis?.raf(t * 1000);
      gs.ticker.add(tick); gs.ticker.lagSmoothing(0);
    }
    return () => { splits.forEach(s => s.revert()); if (tick) gs.ticker.remove(tick); lenis?.destroy(); lenis = undefined; };
  });
  ST.refresh();
});
reduce.addEventListener('change', () => { layout(false); syncSpin(); drawScribble(); });

// Keep the nav's active dot in step with the section in view.
const navLinks = $$('.topbar-nav a');
['archive', 'about', 'lab', 'contact'].forEach(id => {
  const el = document.getElementById(id);
  if (!el) return;
  new IntersectionObserver(es => es.forEach(en => {
    if (en.isIntersecting) navLinks.forEach(a => a.setAttribute('aria-current', String(a.getAttribute('href') === '#' + id)));
  }), { rootMargin: '-45% 0px -50% 0px' }).observe(el);
});

// Reels mockups: play muted while in view, speaker button toggles sound.
const reels = $$('.ig-reel video');
const soundLabel = on => on ? (lang === 'tr' ? 'Sesi kapat' : 'Mute') : (lang === 'tr' ? 'Sesi aç' : 'Unmute');
function setSound(btn, on) {
  btn.setAttribute('aria-pressed', String(on));
  btn.setAttribute('aria-label', soundLabel(on));
  btn.querySelector('use').setAttribute('href', on ? '#ig-sound' : '#ig-muted');
}
reels.forEach(v => {
  const btn = v.parentElement.querySelector('.ig-sound');
  setSound(btn, false);
  btn.addEventListener('click', () => {
    const on = v.muted;
    reels.forEach(o => { if (o !== v) { o.muted = true; setSound(o.parentElement.querySelector('.ig-sound'), false); } });
    v.muted = !on; setSound(btn, on);
    if (on) v.play().catch(() => {});
  });
  v.addEventListener('click', () => v.paused ? v.play().catch(() => {}) : v.pause());
});
$$('[data-lang]').forEach(b => b.addEventListener('click', () => reels.forEach(v => { const btn = v.parentElement.querySelector('.ig-sound'); setSound(btn, btn.getAttribute('aria-pressed') === 'true'); })));
function stopReels() {
  reels.forEach(v => { v.pause(); v.muted = true; setSound(v.parentElement.querySelector('.ig-sound'), false); });
  $$('.case-film video').forEach(v => v.pause());
}
const reelsObserver = new IntersectionObserver(es => es.forEach(({ target: v, isIntersecting }) => {
  if (isIntersecting && !reduce.matches) v.play().catch(() => {});
  else if (!isIntersecting) v.pause();
}), { threshold: .6 });
reels.forEach(v => reelsObserver.observe(v));
