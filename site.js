/* ============================================================
   index.html behaviour.
   Content comes from data.js; admin.html's localStorage override
   still wins, so live preview keeps working exactly as before.
   ============================================================ */
(function () {
  // doodles live in a hidden <defs>; <use href="#d-box"> pulls from it
  injectDoodleDefs();

  /* ---------- data ---------- */
  let DATA = window.PORTFOLIO ? JSON.parse(JSON.stringify(window.PORTFOLIO))
                              : { projects: [], profile: {}, experience: [] };
  try { const ov = localStorage.getItem('portfolio_data'); if (ov) DATA = JSON.parse(ov); } catch (e) {}
  const projects = DATA.projects || [];
  const profile = DATA.profile || {};
  const experience = DATA.experience || [];

  /* ---------- i18n ---------- */
  const LANG = (localStorage.getItem('portfolio_lang') === 'en') ? 'en' : 'tr';
  document.documentElement.lang = LANG;
  const t = (v) => (v && typeof v === 'object' && !Array.isArray(v)) ? (v[LANG] ?? v.tr ?? v.en ?? '') : (v ?? '');
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

  const UI = {
    nWork:      { tr: 'işler', en: 'work' },
    nIndex:     { tr: 'dizin', en: 'index' },
    nAbout:     { tr: 'hakkında', en: 'about' },
    nContact:   { tr: 'iletişim', en: 'contact' },
    heroKicker: { tr: 'portfolyo — istanbul', en: 'portfolio — istanbul' },
    reelBtn:    { tr: "showreel'i izle", en: 'watch the showreel' },
    heroLede:   { tr: 'marka kimliği ile motion arasındaki boşluğu kapatırım. az sözle çok şey.',
                  en: 'i close the gap between brand identity and motion. much, said simply.' },
    heroWorks:  { tr: 'iş', en: 'works' },
    heroCue:    { tr: 'plakları çevir →', en: 'flip through the records →' },
    workHead:   { tr: 'seçilmiş işler', en: 'selected work' },
    workHint:   { tr: 'sürükle, kaydır ya da ok tuşlarını kullan', en: 'drag, scroll or use the arrow keys' },
    indexHead:  { tr: 'dizin', en: 'index' },
    aboutHead:  { tr: 'hakkında', en: 'about' },
    expHead:    { tr: 'nerelerde çalıştım', en: "where i've worked" },
    footNote:   { tr: 'istanbul · full-time & remote', en: 'istanbul · full-time & remote' },
    all:        { tr: 'hepsi', en: 'all' },
    openProj:   { tr: '{p} projesini aç', en: 'open the {p} project' },
    sleeveOf:   { tr: '{p} — {c} projesinin kapağı', en: 'cover of {p} — {c}' }
  };
  document.querySelectorAll('[data-ui]').forEach(el => { const v = UI[el.dataset.ui]; if (v) el.textContent = t(v); });

  const langBtn = document.getElementById('langToggle');
  langBtn.setAttribute('aria-pressed', String(LANG === 'en'));   // pressed = english is on
  langBtn.setAttribute('aria-label', LANG === 'tr' ? 'switch to english' : "türkçe'ye geç");
  document.querySelectorAll('#langToggle span[data-l]').forEach(s => s.classList.toggle('on', s.dataset.l === LANG));
  langBtn.addEventListener('click', () => {
    localStorage.setItem('portfolio_lang', LANG === 'tr' ? 'en' : 'tr');
    location.reload();
  });

  /* ---------- helpers ---------- */
  const slugify = (s) => (s || '').toLowerCase()
    .replace(/[ıİ]/g, 'i').replace(/[ğĞ]/g, 'g').replace(/[üÜ]/g, 'u')
    .replace(/[şŞ]/g, 's').replace(/[öÖ]/g, 'o').replace(/[çÇ]/g, 'c')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const slugOf = (p) => p.slug || slugify(p.t);
  const hrefOf = (p) => 'project.html?p=' + encodeURIComponent(slugOf(p));
  const fill = (s, p) => s.replace('{p}', p.t).replace('{c}', t(p.c));

  /* ---------- the crate ---------- */
  const stage = document.getElementById('crateStage');

  // A project with a preview gets a 3–8s silent loop on its sleeve —
  // research on motion portfolios is unanimous that the grid should
  // move. The cover stays as the poster, so nothing flashes empty.
  function loopHTML(p, cls) {
    if (!p.preview) return '';
    const poster = p.cover ? ` poster="${esc(p.cover)}"` : '';
    return `<video class="${cls}" muted loop playsinline preload="none"${poster} aria-hidden="true">
      ${p.preview.webm ? `<source src="${esc(p.preview.webm)}" type="video/webm">` : ''}
      ${p.preview.mp4 ? `<source src="${esc(p.preview.mp4)}" type="video/mp4">` : ''}
    </video>`;
  }

  function sleeveHTML(p) {
    if (p.cover) {
      const webp = p.coverWebp ? `<source srcset="${p.coverWebp}" type="image/webp">` : '';
      const alt = p.coverAlt ? t(p.coverAlt) : fill(t(UI.sleeveOf), p);
      // designed sleeves are square, photo covers are 16:10 — the real
      // ratio has to be declared or the box shifts while loading
      return `<picture>${webp}<img src="${p.cover}" alt="${esc(alt)}"
        width="${p.coverW || 1200}" height="${p.coverH || 750}"
        loading="lazy" decoding="async"></picture>`;
    }
    // no cover: a typographic sleeve, with the project's doodle as its mark
    return `<span class="rec__type">
        <small>${esc(t(p.c))}</small>
        <b>${esc(p.t)}</b>
        <svg viewBox="0 0 200 200" aria-hidden="true"><use href="#${esc(p.doodle || 'd-spark')}"/></svg>
      </span>`;
  }

  // Off-stage records carry `inert`: they leave the tab order and the
  // accessibility tree together. aria-hidden alone would have hidden
  // links that were still focusable, which is worse than doing nothing.
  stage.innerHTML = projects.map((p, i) => {
    const col = p.color || 'mono';
    return `<article class="rec" id="rec-${i}"${i === 0 ? '' : ' inert'}
        style="--label:var(--${col}); --labelink:var(--${col}-ink); --sleeve:var(--${col}); --sleeveink:var(--${col}-ink)">
      <span class="rec__vinyl" aria-hidden="true">
        <span class="rec__label"><small>berat. rec</small><b>${esc(p.t)}</b><small>${esc(p.y || '')}</small></span>
      </span>
      <span class="rec__sleeve">${sleeveHTML(p)}${loopHTML(p, 'rec__loop')}</span>
      <span class="rec__meta" aria-hidden="true"><b>${esc(p.t)}</b><span>${esc(t(p.c))} · ${esc(p.y || '')}</span></span>
      <a href="${hrefOf(p)}" aria-label="${esc(fill(t(UI.openProj), p))}"></a>
    </article>`;
  }).join('');

  const crate = document.getElementById('crate');
  const ticks = document.getElementById('ticks');
  ticks.innerHTML = projects.map((_, i) => `<span class="tick${i === 0 ? ' on' : ''}"></span>`).join('');
  const tickEls = [...ticks.children];

  const prevBtn = document.getElementById('prevRec');
  const nextBtn = document.getElementById('nextRec');
  const nowPlaying = document.getElementById('nowPlaying');

  // Declared before initVinyl on purpose: its onActive fires during
  // construction and reaches for this — a `let` further down would
  // still be in its temporal dead zone and throw.
  let crateVisible = false;

  const gallery = window.initVinyl(crate, projects, {
    onOpen: (i, p) => go(hrefOf(p)),
    onActive: (i, p) => {
      tickEls.forEach((el, n) => el.classList.toggle('on', n === i));
      stage.querySelectorAll('.rec').forEach((el, n) => { el.inert = n !== i; });
      prevBtn.disabled = i === 0;
      nextBtn.disabled = i === projects.length - 1;
      nowPlaying.textContent = `${p.t} — ${t(p.c)}, ${p.y} (${i + 1}/${projects.length})`;
      tagRecord(i);   // whoever is active is the one that flies out next
      syncLoops();
    }
  });

  function syncLoops() {
    stage.querySelectorAll('.rec').forEach((el) => {
      const v = el.querySelector('.rec__loop');
      if (!v) return;
      const on = crateVisible && el.classList.contains('is-active') && !window.Motion.reduced.matches;
      if (on) { v.play().then(() => el.classList.add('is-playing')).catch(() => {}); }
      else { v.pause(); el.classList.remove('is-playing'); }
    });
  }
  new IntersectionObserver(([e]) => { crateVisible = e.isIntersecting; syncLoops(); },
    { threshold: 0.35 }).observe(crate);
  if (gallery) {
    prevBtn.addEventListener('click', () => gallery.goTo(gallery.target - 1));
    nextBtn.addEventListener('click', () => gallery.goTo(gallery.target + 1));
  }

  /* ---------- dizin: list + filters + pointer preview ---------- */
  const idxList = document.getElementById('idxList');
  idxList.innerHTML = projects.map(p => `
    <li class="idx__row" data-cat="${esc(t(p.c))}" data-cover="${esc(p.coverWebp || p.cover || '')}"
        data-loop-webm="${esc(p.preview?.webm || '')}" data-loop-mp4="${esc(p.preview?.mp4 || '')}">
      <a href="${hrefOf(p)}">
        <span class="idx__y">${esc(p.y || '')}</span>
        <span class="idx__t">${esc(p.t)}</span>
        <span class="idx__c">${esc(t(p.c))}</span>
      </a>
    </li>`).join('');

  // categories are collected from the data, never hard-coded
  const cats = [...new Set(projects.map(p => t(p.c)).filter(Boolean))].sort();
  const filters = document.getElementById('filters');
  filters.innerHTML = [{ v: '*', l: t(UI.all) }].concat(cats.map(c => ({ v: c, l: c })))
    .map((c, i) => `<button class="filter" data-v="${esc(c.v)}" aria-pressed="${i === 0}">${esc(c.l)}</button>`).join('');

  filters.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter');
    if (!btn) return;
    const v = btn.dataset.v;
    filters.querySelectorAll('.filter').forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
    flipFilter(v);
  });

  // FLIP: measure First, apply the change, measure Last, Invert, Play.
  // Rows that leave fold shut; rows that stay glide to their new slot
  // from where they visibly were — no jump cut.
  function flipFilter(v) {
    const rows = [...idxList.querySelectorAll('.idx__row')];
    const want = (r) => v === '*' || r.dataset.cat === v;
    if (window.Motion.reduced.matches || !rows[0].animate) {
      rows.forEach(r => { r.hidden = !want(r); });
      return;
    }
    const first = new Map(rows.filter(r => !r.hidden).map(r => [r, r.getBoundingClientRect().top]));
    const leaving = rows.filter(r => !r.hidden && !want(r));
    const entering = rows.filter(r => r.hidden && want(r));
    const ease = 'cubic-bezier(0.32, 0.72, 0, 1)';

    leaving.forEach(r => {
      const h = r.offsetHeight;
      r.animate([{ height: h + 'px', opacity: 1 }, { height: '0px', opacity: 0 }],
                { duration: 380, easing: ease }).onfinish = () => { r.hidden = true; };
    });
    entering.forEach((r, i) => {
      r.hidden = false;
      r.animate([{ opacity: 0, transform: 'translateY(1.2rem)' }, { opacity: 1, transform: 'none' }],
                { duration: 520, delay: 120 + i * 45, easing: ease, fill: 'backwards' });
    });
    requestAnimationFrame(() => {
      first.forEach((top, r) => {
        if (leaving.includes(r)) return;
        const dy = top - r.getBoundingClientRect().top;
        if (Math.abs(dy) < 1) return;
        r.animate([{ transform: `translateY(${dy}px)` }, { transform: 'none' }],
                  { duration: 520, easing: ease });
      });
    });
  }

  // The preview trails the pointer on a lerp instead of snapping to it,
  // and leans into the direction of travel (capped at 7deg). A project
  // with a loop plays it here too.
  const peek = document.getElementById('idxPeek');
  let peekKey = '', px = 0, py = 0, tx = 0, ty = 0, tilt = 0, peekRaf = 0, peekOn = false;
  function peekLoop() {
    const dx = tx - px;
    px += dx * 0.16; py += (ty - py) * 0.16;
    tilt += (Math.max(-7, Math.min(7, dx * 0.12)) - tilt) * 0.12;
    peek.style.transform = `translate3d(${px}px, ${py}px, 0) translate(-50%, -50%) rotate(${tilt}deg) scale(${peekOn ? 1 : .86})`;
    if (peekOn || Math.abs(dx) > 0.5 || Math.abs(tilt) > 0.1) peekRaf = requestAnimationFrame(peekLoop);
    else peekRaf = 0;
  }
  idxList.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return;
    const row = e.target.closest('.idx__row');
    if (!row || !row.dataset.cover) { peekOn = false; peek.classList.remove('on'); return; }
    const key = row.dataset.cover + row.dataset.loopWebm;
    if (key !== peekKey) {
      peekKey = key;
      const webm = row.dataset.loopWebm, mp4 = row.dataset.loopMp4;
      peek.innerHTML = (webm || mp4) && !window.Motion.reduced.matches
        ? `<video muted loop playsinline autoplay poster="${esc(row.dataset.cover)}">
             ${webm ? `<source src="${esc(webm)}" type="video/webm">` : ''}
             ${mp4 ? `<source src="${esc(mp4)}" type="video/mp4">` : ''}</video>`
        : `<img src="${esc(row.dataset.cover)}" alt="" decoding="async">`;
    }
    if (!peekOn) { px = e.clientX; py = e.clientY; }    // first frame: appear under the pointer
    tx = e.clientX; ty = e.clientY;
    peekOn = true; peek.classList.add('on');
    if (!peekRaf) peekRaf = requestAnimationFrame(peekLoop);
  });
  idxList.addEventListener('pointerleave', () => { peekOn = false; peek.classList.remove('on'); });

  /* ---------- hakkında ---------- */
  document.getElementById('heroCount').textContent = String(projects.length).padStart(2, '0');
  document.getElementById('aboutH').textContent = t(profile.aboutH) || '';
  document.getElementById('aboutBio').innerHTML = (profile.bio || [])
    .map(b => `<p class="about__p">${t(b)}</p>`).join('');
  document.getElementById('skills').innerHTML = (profile.skills || [])
    .map(s => `<li>${esc(s)}</li>`).join('');
  document.getElementById('counters').innerHTML = (profile.counters || [])
    .map(c => `<div><dt>${esc(c.v)}</dt><dd>${esc(t(c.l))}</dd></div>`).join('');
  document.getElementById('expList').innerHTML = experience.map(e => `
    <li>
      <b>${esc(e.role)} <span class="at">@ ${esc(e.org)}</span></b>
      <time>${esc(t(e.date))}</time>
      <p>${t(e.note)}</p>
    </li>`).join('');

  /* ---------- iletişim ---------- */
  document.getElementById('contactH').textContent = t(profile.contactH) || '';
  document.getElementById('mailText').textContent = profile.email || '';
  document.getElementById('mail').href = 'mailto:' + (profile.email || '');
  document.getElementById('avail').innerHTML = t(profile.avail) || '';
  document.getElementById('socials').innerHTML = Object.entries(profile.socials || {})
    .map(([k, v]) => `<li><a href="${esc(v)}" target="_blank" rel="noopener">${esc(k)}</a></li>`).join('');
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------- motion ---------- */
  document.querySelectorAll('.counters dt').forEach(el => window.Motion.countUp(el));

  const heroName = document.getElementById('heroName');
  window.Motion.splitChars(heroName, { step: 0.04, from: 0.1 });
  requestAnimationFrame(() => document.documentElement.classList.add('is-loaded'));

  window.Motion.reveal(document);
  const scroller = window.Motion.smoothScroll({ lerp: 0.165 });

  // in-page anchors go through the smooth scroller so they share its feel
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const el = document.querySelector(a.getAttribute('href'));
      if (!el) return;
      e.preventDefault();
      const y = el.getBoundingClientRect().top + window.scrollY - 70;
      if (scroller) scroller.scrollTo(y);
      else window.scrollTo({ top: y, behavior: window.Motion.reduced.matches ? 'auto' : 'smooth' });
      history.replaceState(null, '', a.getAttribute('href'));
    });
  });

  /* ---------- page transition ----------
     @view-transition in the stylesheet drives the navigation, so
     links are left alone — no click interception, middle-click and
     ctrl-click keep working. All this does is put the name on the
     right record so the browser knows what morphs into what. */
  // The class names are literals, not consts: onActive calls this
  // during gallery init, which runs before anything declared down
  // here would be initialised.
  function tagRecord(i) {
    stage.querySelectorAll('.vt-sleeve, .vt-vinyl')
      .forEach(el => el.classList.remove('vt-sleeve', 'vt-vinyl'));
    const rec = stage.children[i];
    if (!rec) return;
    rec.querySelector('.rec__sleeve').classList.add('vt-sleeve');
    rec.querySelector('.rec__vinyl').classList.add('vt-vinyl');
  }

  // Remember which record was opened, so coming back lands on it
  // instead of snapping to the first one.
  const LAST = 'portfolio_last_record';
  function slugAt(i) { return projects[i] ? slugOf(projects[i]) : ''; }

  function go(href) { location.href = href; }   // let the browser transition

  // pageswap fires before the outgoing page is snapshotted — the one
  // moment where naming the element still affects the transition.
  addEventListener('pageswap', (e) => {
    if (!e.viewTransition) return;
    let slug = '';
    try { slug = new URL(e.activation.entry.url).searchParams.get('p') || ''; } catch (_) {}
    const i = projects.findIndex(p => slugOf(p) === slug);
    if (i < 0) return;
    try { sessionStorage.setItem(LAST, slug); } catch (_) {}
    crate.classList.add('is-swapping');   // flatten and unclip for the snapshot
    tagRecord(i);
  });

  // is-swapping is set on the way out. If the page comes back from
  // bfcache this script does not re-run, so clear it on restore or
  // the crate stays unclipped with its neighbours hidden.
  addEventListener('pageshow', () => crate.classList.remove('is-swapping'));
  addEventListener('pagereveal', () => crate.classList.remove('is-swapping'));

  // Coming back: open on the record we left from and name it, so the
  // hero record on the project page morphs back into the crate.
  let startAt = 0, cameBack = false;
  try {
    const back = sessionStorage.getItem(LAST);
    cameBack = !!back;
    const i = projects.findIndex(p => slugOf(p) === back);
    if (i > 0) startAt = i;
  } catch (_) {}

  if (gallery && startAt > 0) {
    gallery.jumpTo(startAt);   // onActive tags it
  } else if (gallery && !cameBack && !window.Motion.reduced.matches) {
    // First visit: the crate starts at the back and riffles forward to
    // the first record as it comes into view — a thumb through a crate.
    // Once only, and never when coming back from a project.
    gallery.jumpTo(projects.length - 1);
    const introIO = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      introIO.disconnect();
      gallery.goTo(0);
    }, { threshold: 0.45 });
    introIO.observe(crate);
  }

  /* ---------- showreel ----------
     Empty until profile.reel is set in data.js. When it is, a button
     appears under the name and opens the reel with sound in a native
     <dialog> — focus trap and Esc come free. */
  const reelBtn = document.getElementById('reelBtn');
  const reel = document.getElementById('reel');
  const reelVideo = document.getElementById('reelVideo');
  if (profile.reel && profile.reel.src && reel.showModal) {
    reelBtn.hidden = false;
    if (profile.reel.poster) reelVideo.poster = profile.reel.poster;
    reelBtn.addEventListener('click', () => {
      if (!reelVideo.src) reelVideo.src = profile.reel.src;
      reel.showModal();
      reelVideo.play().catch(() => {});
    });
    const close = () => { reelVideo.pause(); reel.close(); };
    document.getElementById('reelClose').addEventListener('click', close);
    reel.addEventListener('click', (e) => { if (e.target === reel) close(); });
    reel.addEventListener('close', () => reelVideo.pause());
  }
})();
