/* ============================================================
   project.html — one template, every project.
   ?p=<slug> picks it out of data.js.
   ============================================================ */
(function () {
  injectDoodleDefs();

  let DATA = window.PORTFOLIO ? JSON.parse(JSON.stringify(window.PORTFOLIO)) : { projects: [] };
  try { const ov = localStorage.getItem('portfolio_data'); if (ov) DATA = JSON.parse(ov); } catch (e) {}
  const projects = DATA.projects || [];

  const LANG = (localStorage.getItem('portfolio_lang') === 'en') ? 'en' : 'tr';
  document.documentElement.lang = LANG;
  const t = (v) => (v && typeof v === 'object' && !Array.isArray(v)) ? (v[LANG] ?? v.tr ?? v.en ?? '') : (v ?? '');
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

  const UI = {
    back:      { tr: 'tüm işler', en: 'all work' },
    visuals:   { tr: 'görseller', en: 'visuals' },
    soon:      { tr: 'bu proje için görsel yakında eklenecek.', en: 'visuals for this project are coming soon.' },
    onBehance: { tr: "behance'de gör", en: 'view on behance' },
    fullCase:  { tr: "behance'de tam dosya", en: 'full case on behance' },
    notFound:  { tr: 'böyle bir proje bulunamadı.', en: 'no such project found.' },
    backHome:  { tr: 'tüm işlere dön', en: 'back to all work' },
    prev:      { tr: 'önceki', en: 'prev' },
    next:      { tr: 'sonraki', en: 'next' },
    home:      { tr: 'ana sayfa', en: 'home' },
    shot:      { tr: '{p} projesinden görsel {n}', en: 'image {n} from {p}' },
    details:   { tr: 'künye', en: 'details' },
    credits:   { tr: 'emeği geçenler', en: 'credits' },
    role:      { tr: 'rolüm', en: 'my role' },
    client:    { tr: 'müşteri', en: 'client' },
    year:      { tr: 'yıl', en: 'year' },
    category:  { tr: 'kategori', en: 'category' },
    tools:     { tr: 'araçlar', en: 'tools' },
    deliver:   { tr: 'teslimler', en: 'deliverables' }
  };
  document.querySelectorAll('[data-ui]').forEach(el => { const v = UI[el.dataset.ui]; if (v) el.textContent = t(v); });

  const langBtn = document.getElementById('langToggle');
  langBtn.setAttribute('aria-pressed', String(LANG === 'en'));
  langBtn.setAttribute('aria-label', LANG === 'tr' ? 'switch to english' : "türkçe'ye geç");
  document.querySelectorAll('#langToggle span[data-l]').forEach(s => s.classList.toggle('on', s.dataset.l === LANG));
  langBtn.addEventListener('click', () => {
    localStorage.setItem('portfolio_lang', LANG === 'tr' ? 'en' : 'tr');
    location.reload();
  });

  const slugify = (s) => (s || '').toLowerCase()
    .replace(/[ıİ]/g, 'i').replace(/[ğĞ]/g, 'g').replace(/[üÜ]/g, 'u')
    .replace(/[şŞ]/g, 's').replace(/[öÖ]/g, 'o').replace(/[çÇ]/g, 'c')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const slugOf = (p) => p.slug || slugify(p.t);

  const want = new URLSearchParams(location.search).get('p');
  const idx = projects.findIndex(p => slugOf(p) === want);
  const p = projects[idx];
  const app = document.getElementById('app');

  function embedUrl(src) {
    try {
      const u = new URL(src, location.href);
      const host = u.hostname.replace(/^www\./, '');
      if (host === 'youtu.be') return 'https://www.youtube.com/embed' + u.pathname;
      if (host === 'youtube.com') {
        const id = u.searchParams.get('v');
        return id ? 'https://www.youtube.com/embed/' + id : src;
      }
      if (host === 'vimeo.com') {
        const id = u.pathname.split('/').filter(Boolean).pop();
        if (id) return 'https://player.vimeo.com/video/' + id;
      }
    } catch (e) {}
    return src;
  }

  function mediaHTML(m, n) {
    if (!m || !m.src) return '';
    if (m.type === 'video') {
      const poster = m.poster ? ` poster="${esc(m.poster)}"` : '';
      const dim = (m.w && m.h) ? ` width="${m.w}" height="${m.h}"` : '';
      return `<figure class="shot"><video src="${esc(m.src)}"${poster}${dim} controls playsinline preload="none"></video></figure>`;
    }
    if (m.type === 'embed') {
      return `<figure class="shot shot--embed"><iframe src="${esc(embedUrl(m.src))}" loading="lazy"
        title="${esc(p.t)} — ${n}" allow="autoplay; fullscreen; picture-in-picture"></iframe></figure>`;
    }
    const alt = t(UI.shot).replace('{p}', p.t).replace('{n}', n);
    // declared size reserves the box, so a tall case study does not shove
    // the page around while it streams in
    const dim = (m.w && m.h) ? ` width="${m.w}" height="${m.h}"` : '';
    return `<figure class="shot"><img src="${esc(m.src)}" alt="${esc(alt)}"${dim} loading="lazy" decoding="async"></figure>`;
  }

  if (!p) {
    document.title = (LANG === 'en' ? 'project not found' : 'proje bulunamadı') + ' — berat.';
    app.innerHTML = `<section class="pempty">
      <p>${esc(t(UI.notFound))}</p>
      <a class="ulink" href="index.html#work">${esc(t(UI.backHome))} <i>→</i></a>
    </section>`;
    return;
  }

  document.title = p.t + ' — berat.';
  const desc = t(p.desc);
  if (desc) document.querySelector('meta[name="description"]').setAttribute('content', desc);
  // crawlers that run JS (Google) pick these up; LinkedIn/X do not run JS
  // and keep the static site card from project.html
  const setMeta = (sel, v) => { const el = document.querySelector(sel); if (el && v) el.setAttribute('content', v); };
  setMeta('meta[property="og:title"]', p.t + ' — berat.');
  setMeta('meta[property="og:description"]', desc);

  const col = p.color || 'mono';
  const media = (p.media || []).map((m, i) => mediaHTML(m, i + 1)).join('');
  const ext = (p.link && p.link !== '#')
    ? `<a class="ulink phero__cta" href="${esc(p.link)}" target="_blank" rel="noopener">${esc(t(UI.fullCase))} <i>↗</i></a>` : '';

  const sleeve = p.cover
    ? `<picture>${p.coverWebp ? `<source srcset="${esc(p.coverWebp)}" type="image/webp">` : ''}
        <img src="${esc(p.cover)}" alt="${esc(p.coverAlt ? t(p.coverAlt) : p.t + ' — ' + t(p.c))}"
             width="${p.coverW || 1200}" height="${p.coverH || 750}" decoding="async"></picture>`
    : `<span class="rec__type"><small>${esc(t(p.c))}</small><b>${esc(p.t)}</b>
        <svg viewBox="0 0 200 200" aria-hidden="true"><use href="#${esc(p.doodle || 'd-spark')}"/></svg></span>`;

  function metaHTML() {
    const rows = [
      [UI.role, t(p.role)], [UI.client, t(p.client)], [UI.category, t(p.c)],
      [UI.year, p.y], [UI.tools, (p.tools || []).join(', ')], [UI.deliver, t(p.deliverables)]
    ].filter(([, v]) => v);
    const det = `<dl><p class="pmeta__h">${esc(t(UI.details))}</p>${rows.map(([k, v]) =>
      `<div><dt>${esc(t(k))}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>`;
    const cred = (p.credits || []).length ? `<dl><p class="pmeta__h">${esc(t(UI.credits))}</p>${p.credits.map(c =>
      `<div><dt>${esc(t(c.role))}</dt><dd${c.me ? ' class="me"' : ''}>${esc(c.name)}</dd></div>`).join('')}</dl>` : '';
    return `<section class="pmeta">${det}${cred}</section>`;
  }

  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];
  const pnav = projects.length > 1 ? `
    <nav class="pnav" aria-label="proje navigasyonu">
      <a href="project.html?p=${encodeURIComponent(slugOf(prev))}"><small><i>←</i> ${esc(t(UI.prev))}</small><b>${esc(prev.t)}</b></a>
      <a class="next" href="project.html?p=${encodeURIComponent(slugOf(next))}"><small>${esc(t(UI.next))} <i>→</i></small><b>${esc(next.t)}</b></a>
    </nav>` : '';

  app.innerHTML = `
    <section class="phero">
      <div class="phero__copy">
        <p class="phero__meta">${esc(t(p.c))} · ${esc(p.y || '')}</p>
        <h1 class="phero__title kinetic" id="ptitle">${esc(p.t)}</h1>
        <p class="phero__desc" data-reveal="lines">${esc(desc)}</p>
        <ul class="phero__tags">${(p.tags || []).map(tag => `<li>${esc(tag)}</li>`).join('')}</ul>
        ${ext}
      </div>
      <div class="phero__rec" aria-hidden="true"
           style="--label:var(--${col}); --labelink:var(--${col}-ink); --sleeve:var(--${col}); --sleeveink:var(--${col}-ink)">
        <span class="rec__vinyl vt-vinyl"><span class="rec__label"><small>berat. rec</small><b>${esc(p.t)}</b><small>${esc(p.y || '')}</small></span></span>
        <span class="rec__sleeve vt-sleeve">${sleeve}</span>
      </div>
    </section>

    ${metaHTML()}

    ${media
      ? `<section class="gallery"><h2 class="gallery__h">${esc(t(UI.visuals))}</h2>${media}</section>`
      : `<section class="pempty"><p>${esc(t(UI.soon))}</p>${(p.link && p.link !== '#')
          ? `<a class="ulink" href="${esc(p.link)}" target="_blank" rel="noopener">${esc(t(UI.onBehance))} <i>↗</i></a>` : ''}</section>`}

    ${pnav}

    <footer class="foot">
      <span>© <span id="y"></span> berat erdoğan</span>
      <a class="ulink" href="index.html">${esc(t(UI.home))}</a>
    </footer>`;

  document.getElementById('y').textContent = new Date().getFullYear();

  // so index.html opens on this record and the morph runs in reverse
  try { sessionStorage.setItem('portfolio_last_record', slugOf(p)); } catch (e) {}
  window.Motion.splitChars(document.getElementById('ptitle'), { step: 0.035, from: 0.15 });
  requestAnimationFrame(() => document.documentElement.classList.add('is-loaded'));
  window.Motion.reveal(document);
  window.Motion.smoothScroll({ lerp: 0.165 });
})();
