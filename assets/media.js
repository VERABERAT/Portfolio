'use strict';
// Proje sayfası medya bloklarını data/projects.js içindeki "sections" verisinden üretir.
// Her bölüm türü, sitenin daha önce elle yazılmış HTML'iyle birebir aynı işaretlemeyi üretir.
(function () {
  const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const ICON = id => '<svg class="ig-i"><use href="#' + id + '"/></svg>';
  const BADGE = '<svg class="ig-badge" aria-label="Onaylı hesap"><use href="#ig-verified"/></svg>';

  // Çok dilli metin: "metin" | {t:"çeviriAnahtarı", text:"varsayılan"} | {tr:"..", en:".."}
  function txt(v, tag, attrs) {
    tag = tag || 'span'; attrs = attrs || '';
    if (v == null || v === '') return '<' + tag + attrs + '></' + tag + '>';
    if (typeof v === 'string') return '<' + tag + attrs + '>' + esc(v) + '</' + tag + '>';
    if (v.t) return '<' + tag + attrs + ' data-t="' + esc(v.t) + '">' + esc(v.text || '') + '</' + tag + '>';
    return '<' + tag + attrs + ' data-tr="' + esc(v.tr || '') + '" data-en="' + esc(v.en || v.tr || '') + '">' + esc(v.tr || '') + '</' + tag + '>';
  }
  function avatar(acc, extra) {
    const cls = 'ig-avatar' + (acc.avatarClass ? ' ' + acc.avatarClass : '');
    const style = acc.avatarBg ? ' style="background:' + esc(acc.avatarBg) + ';font-family:inherit;font-weight:700"' : '';
    const inner = acc.avatarImg ? '<img src="' + esc(acc.avatarImg) + '" alt="" style="width:100%;height:100%;border-radius:50%;object-fit:cover">' : '<span' + (acc.avatarBg ? ' style="border:0;padding:0"' : '') + '>' + esc(acc.avatar || '') + '</span>';
    return '<span class="' + cls + '" aria-hidden="true"' + style + '>' + inner + '</span>';
  }
  function capSpan(c) {
    if (c == null || c === '') return '';
    if (typeof c === 'string') return '<span lang="tr">' + esc(c) + '</span>';
    return '<span lang="' + esc(c.lang || 'tr') + '">' + esc(c.text) + '</span>';
  }
  function img(it, w, h) {
    return '<img src="' + esc(it.src) + '" alt="' + esc(it.alt || '') + '" width="' + (it.w || w) + '" height="' + (it.h || h) + '" loading="lazy" decoding="async">';
  }

  const R = {
    sub(s) {
      return '  <h4 class="case-sub">' + txt(s.left) + txt(s.right) + '</h4>\n';
    },
    reels(s, acc) {
      const n = s.items.length;
      const cls = 'case-reels' + (s.cols === 4 ? ' case-reels--4' : '');
      let o = '  <ul class="' + cls + '" aria-label="' + esc(s.label || '') + '">\n';
      s.items.forEach((it, i) => {
        const a = it.account || acc;
        o += '    <li><figure class="ig-reel">\n      <div class="ig-phone">\n'
          + '        <video muted loop playsinline preload="none" poster="' + esc(it.poster) + '" aria-label="' + esc(it.label || '') + '"><source src="' + esc(it.src) + '" type="video/mp4">'
          + (it.webm ? '<source src="' + esc(it.webm) + '" type="video/webm">' : '') + '</video>\n'
          + '        <div class="ig-ui" aria-hidden="true">\n          <span class="ig-top">Reels</span>\n'
          + '          <span class="ig-side">' + ICON('ig-heart') + ICON('ig-comment') + ICON('ig-share') + ICON('ig-more') + '</span>\n'
          + '          <div class="ig-bottom"><div class="ig-who">' + avatar(a) + '<b>' + esc(a.user) + '</b>' + (a.verified ? BADGE : '') + (a.follow === false ? '' : '<span class="ig-follow" data-t="igFollow">Takip et</span>') + '</div></div>\n'
          + '        </div>\n        <button class="ig-sound" type="button" aria-pressed="false" aria-label="Sesi aç">' + ICON('ig-muted') + '</button>\n'
          + '      </div>\n      <figcaption><span>' + esc(it.meta || '') + '</span>' + capSpan(it.caption) + '</figcaption>\n    </figure></li>\n';
      });
      return o + '  </ul>\n';
    },
    posts(s, acc) {
      let o = '  <ul class="case-grid" aria-label="' + esc(s.label || '') + '">\n';
      s.items.forEach(it => {
        const a = it.account || acc;
        o += '    <li><figure class="ig-post">\n'
          + '      <div class="ig-head">' + avatar(a) + '<span class="ig-user">' + esc(a.user) + '</span>' + (a.verified ? BADGE : '') + '<svg class="ig-i ig-more"><use href="#ig-more"/></svg></div>\n'
          + '      ' + img(it, 864, 1080) + '\n'
          + '      <div class="ig-actions" aria-hidden="true">' + ICON('ig-heart') + ICON('ig-comment') + ICON('ig-share') + '<svg class="ig-i ig-save"><use href="#ig-save"/></svg></div>\n'
          + '      <figcaption><b>' + esc(a.user) + '</b>' + (a.verified ? BADGE : '') + ' ' + capSpan(it.caption) + '</figcaption>\n'
          + '    </figure></li>\n';
      });
      return o + '  </ul>\n';
    },
    stories(s) {
      let o = '  <ul class="case-stories' + (s.few ? ' case-stories--few' : '') + '" aria-label="' + esc(s.label || '') + '">\n';
      s.items.forEach(it => {
        o += '    <li><figure class="story"><div class="web-phone">' + img(it, 720, 1280) + '</div><figcaption>' + esc(it.caption || '') + '</figcaption></figure></li>\n';
      });
      return o + '  </ul>\n';
    },
    sliders(s) {
      let o = '  <ul class="web-pairs" aria-label="' + esc(s.label || '') + '">\n';
      s.items.forEach(it => {
        o += '    <li><figure class="web-pair"><div class="web-browser"><div class="web-bar" aria-hidden="true"><i></i><i></i><i></i><span>' + esc(it.domain || s.domain || '') + '</span></div>'
          + img(it.desktop, 1688, 854) + '</div><div class="web-phone">' + img(it.mobile, 828, 1316) + '</div><figcaption>' + esc(it.caption || '') + '</figcaption></figure></li>\n';
      });
      return o + '  </ul>\n';
    },
    shots(s) {
      let o = '  <ul class="case-shots" aria-label="' + esc(s.label || '') + '">\n';
      s.items.forEach(it => {
        o += '    <li><figure class="app-shot">' + img(it, 600, 1300) + '<figcaption>' + esc(it.caption || '') + '</figcaption></figure></li>\n';
      });
      return o + '  </ul>\n';
    },
    covers(s) {
      let o = '  <ul class="case-covers" aria-label="' + esc(s.label || '') + '">\n';
      s.items.forEach(it => {
        const im = img(it, 808, 632);
        o += '    <li><figure class="case-cover">' + (it.href ? '<a href="' + esc(it.href) + '" target="_blank" rel="noreferrer">' + im + '</a>' : im) + '<figcaption>' + esc(it.caption || '') + '</figcaption></figure></li>\n';
      });
      return o + '  </ul>\n';
    },
    image(s) {
      const im = img(s, 1600, 1000);
      return '  <figure class="case-long">' + (s.href ? '<a href="' + esc(s.href) + '" target="_blank" rel="noreferrer">' + im + '</a>' : im) + '</figure>\n';
    },
    film(s) {
      return '  <figure class="case-film"><video controls playsinline preload="none" poster="' + esc(s.poster) + '" width="' + (s.w || 848) + '" height="' + (s.h || 480) + '" aria-label="' + esc(s.label || '') + '"><source src="' + esc(s.src) + '" type="video/mp4">' + (s.webm ? '<source src="' + esc(s.webm) + '" type="video/webm">' : '') + '</video></figure>\n';
    },
    credits(s) {
      let o = '  <dl class="case-credits">\n';
      s.items.forEach(it => {
        o += '    <div' + (it.me ? ' class="me"' : '') + '>' + txt(it.role, 'dt') + '<dd>' + esc(it.name) + '</dd></div>\n';
      });
      return o + '  </dl>\n';
    },
    note(s) { return '  ' + txt(s.text, 'p', ' class="case-note"') + '\n'; },
    link(s) {
      return '  <a class="store-link" href="' + esc(s.href) + '" target="_blank" rel="noreferrer">' + txt(s.text) + ' <i aria-hidden="true">↗︎</i></a>\n';
    },
    html(s) { return s.html.replace(/\s+$/, '') + '\n'; }
  };

  function renderProject(p) {
    const acc = p.account || {};
    let o = '  <div class="p-media" data-project="' + esc(p.media) + '" hidden>\n';
    (p.sections || []).forEach(s => {
      if (s.title) o += R.sub(s.title);
      const fn = R[s.type];
      if (fn) o += fn(s, s.account || acc);
    });
    return o + '  </div>\n';
  }

  window.PortfolioMedia = {
    renderProject,
    render(projects, before) {
      const html = projects.map(renderProject).join('');
      before.insertAdjacentHTML('beforebegin', html);
    },
    types: Object.keys(R)
  };
})();
