/* ============================================================
   SHARED HAND-DRAWN DOODLES
   Used by index.html (cards), project.html (detail) and
   admin.html (doodle picker). Single source so the set stays
   consistent everywhere.
   ============================================================ */
(function () {
  // id -> { label, paths }  (paths = inner SVG markup, viewBox 0 0 200 200)
  const D = {
    "d-sun":    { label: "güneş",   paths: `<circle class="doodle" cx="100" cy="100" r="42"/><path class="doodle" d="M88 96 q4 6 8 0 M112 96 q4 6 8 0 M86 118 q14 12 28 0"/><path class="doodle" d="M100 40 v-22 M100 182 v-22 M40 100 h-22 M182 100 h-22 M58 58 l-15 -15 M142 58 l15 -15 M58 142 l-15 15 M142 142 l15 15"/>` },
    "d-sprout": { label: "fidan",   paths: `<path class="doodle" d="M40 150 q60 -10 120 0"/><path class="doodle" d="M100 150 q-2 -40 0 -60"/><path class="doodle" d="M100 96 q-34 -2 -40 -30 q30 -4 40 26"/><path class="doodle" d="M100 104 q34 -2 40 -30 q-30 -4 -40 26"/>` },
    "d-flower": { label: "çiçek",   paths: `<path class="doodle doodle--thin" d="M30 130 q70 -8 140 2"/><path class="doodle doodle--thin" d="M100 132 q4 -22 -2 -40"/><path class="doodle doodle--thin" d="M70 70 q-10 -22 14 -30 q22 6 16 28 q22 -10 30 12 q-6 22 -28 16 q14 20 -8 30 q-22 -6 -16 -28 q-22 10 -30 -12 q8 -22 28 -16z"/><path class="doodle doodle--thin" d="M98 134 q-26 6 -40 22 M102 134 q24 8 36 24"/>` },
    "d-heart":  { label: "kalp+ok", paths: `<path class="doodle" d="M100 150 C60 118 56 86 74 74 q22 -14 26 14 q4 -28 26 -14 c18 12 14 44 -26 76z"/><path class="doodle" d="M48 60 L150 150 M150 150 l2 -22 M150 150 l-22 2 M48 60 l-16 4 M48 60 l4 -16"/>` },
    "d-bag":    { label: "torba",   paths: `<path class="doodle" d="M55 95 L150 88 L158 150 L60 156 Z"/><path class="doodle" d="M92 95 q12 -34 28 -2"/><path class="doodle" d="M92 118 q5 5 10 0 M120 116 q5 5 10 0 M96 134 q14 10 28 -2"/>` },
    "d-tent":   { label: "çadır",   paths: `<path class="doodle" d="M40 150 L100 60 L160 150 Z"/><path class="doodle" d="M100 60 L100 150 M78 150 q22 -40 44 0"/>` },
    "d-eye":    { label: "göz",     paths: `<path class="doodle" d="M40 100 q60 -52 120 0 q-60 52 -120 0z"/><circle class="doodle" cx="100" cy="100" r="18"/>` },
    "d-type":   { label: "harf Aa", paths: `<path class="doodle" d="M55 150 L85 60 L115 150 M66 122 h38"/><path class="doodle" d="M150 110 q-20 -14 -28 4 q-8 18 8 24 q18 6 20 -14 v-20 M150 104 v46"/>` },
    "d-spark":  { label: "yıldız",  paths: `<path class="doodle" d="M100 50 v100 M50 100 h100 M64 64 l72 72 M136 64 l-72 72"/>` },
    "d-cloud":  { label: "bulut",   paths: `<path class="doodle" d="M60 130 q-26 0 -22 -22 q2 -18 22 -14 q4 -26 32 -22 q22 2 22 24 q24 -6 28 16 q4 18 -18 18z"/>` },
    "d-box":    { label: "kutu",    paths: `<path class="doodle" d="M55 80 L100 64 L145 80 L145 138 L100 156 L55 138 Z"/><path class="doodle" d="M55 80 L100 98 L145 80 M100 98 V156"/>` },
    "d-wave":   { label: "dalga",   paths: `<path class="doodle" d="M40 120 q15 -45 30 0 q15 45 30 0 q15 -45 30 0 q15 45 30 0"/>` }
  };

  window.DOODLES = D;
  window.doodleList = Object.keys(D).map(id => ({ id, label: D[id].label }));

  // Inject a hidden <svg><defs> with every doodle as a <g id="...">
  window.injectDoodleDefs = function () {
    if (document.getElementById('doodle-defs')) return;
    const defs = Object.entries(D)
      .map(([id, d]) => `<g id="${id}">${d.paths}</g>`).join('');
    const wrap = document.createElement('div');
    wrap.innerHTML = `<svg id="doodle-defs" width="0" height="0" style="position:absolute" aria-hidden="true"><defs>${defs}</defs></svg>`;
    document.body.appendChild(wrap.firstChild);
  };

  // Return a standalone inline <svg> string for a doodle (used by admin preview)
  window.doodleSVG = function (id) {
    const d = D[id] || D['d-spark'];
    return `<svg viewBox="0 0 200 200" aria-hidden="true">${d.paths}</svg>`;
  };
})();
