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
    heroKicker: { tr: 'art director · istanbul', en: 'art director · istanbul' },
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

  function sleeveHTML(p) {
    if (p.cover) {
      const webp = p.coverWebp ? `<source srcset="${p.coverWebp}" type="image/webp">` : '';
      const alt = p.coverAlt ? t(p.coverAlt) : fill(t(UI.sleeveOf), p);
      return `<picture>${webp}<img src="${p.cover}" alt="${esc(alt)}"
        width="1200" height="750" loading="lazy" decoding="async"></picture>`;
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
    const col = p.color || 'cream';
    return `<article class="rec" id="rec-${i}"${i === 0 ? '' : ' inert'}
        style="--label:var(--${col}); --labelink:var(--${col}-ink); --sleeve:var(--${col}); --sleeveink:var(--${col}-ink)">
      <span class="rec__vinyl" aria-hidden="true">
        <span class="rec__label"><small>berat. rec</small><b>${esc(p.t)}</b><small>${esc(p.y || '')}</small></span>
      </span>
      <span class="rec__sleeve">${sleeveHTML(p)}</span>
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

  const gallery = window.initVinyl(crate, projects, {
    onOpen: (i, p) => go(hrefOf(p)),
    onActive: (i, p) => {
      tickEls.forEach((el, n) => el.classList.toggle('on', n === i));
      stage.querySelectorAll('.rec').forEach((el, n) => { el.inert = n !== i; });
      prevBtn.disabled = i === 0;
      nextBtn.disabled = i === projects.length - 1;
      nowPlaying.textContent = `${p.t} — ${t(p.c)}, ${p.y} (${i + 1}/${projects.length})`;
    }
  });
  if (gallery) {
    prevBtn.addEventListener('click', () => gallery.goTo(gallery.target - 1));
    nextBtn.addEventListener('click', () => gallery.goTo(gallery.target + 1));
  }

  /* ---------- dizin: list + filters + pointer preview ---------- */
  const idxList = document.getElementById('idxList');
  idxList.innerHTML = projects.map(p => `
    <li class="idx__row" data-cat="${esc(t(p.c))}" data-cover="${esc(p.coverWebp || p.cover || '')}">
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
    idxList.querySelectorAll('.idx__row').forEach(row => {
      row.hidden = !(v === '*' || row.dataset.cat === v);
    });
  });

  const peek = document.getElementById('idxPeek');
  let peekSrc = '';
  idxList.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return;
    const row = e.target.closest('.idx__row');
    if (!row || !row.dataset.cover) { peek.classList.remove('on'); return; }
    if (row.dataset.cover !== peekSrc) {
      peekSrc = row.dataset.cover;
      peek.innerHTML = `<img src="${esc(peekSrc)}" alt="" loading="lazy" decoding="async">`;
    }
    peek.style.left = e.clientX + 'px';
    peek.style.top = e.clientY + 'px';
    peek.classList.add('on');
  });
  idxList.addEventListener('pointerleave', () => peek.classList.remove('on'));

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
     View Transitions is native, so this costs nothing and simply
     does not run where it is unsupported. */
  function go(href) {
    if (!document.startViewTransition || window.Motion.reduced.matches) { location.href = href; return; }
    document.startViewTransition(() => { location.href = href; });
  }
  document.querySelectorAll('a[href^="project.html"]').forEach(a => {
    a.addEventListener('click', (e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault(); go(a.getAttribute('href'));
    });
  });
})();
