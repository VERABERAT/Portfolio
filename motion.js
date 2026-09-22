/* ============================================================
   MOTION CORE — no libraries, no build step.
   Everything here is interruptible: animations read the value
   that is currently on screen, never the target they were
   heading for. Grab something mid-flight and it keeps its
   velocity instead of snapping.
   ============================================================ */
(function () {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------- critically damped spring ----------
     response = how long it takes to cover the distance (s)
     damping  = 1.0 settles with no overshoot; < 1 overshoots.
     Only give overshoot to things that carry momentum
     (a flick, a release) — a menu that bounces feels wrong.  */
  function Spring(value, { response = 0.35, damping = 1.0, onUpdate, onRest } = {}) {
    this.v = value;          // current, on-screen value
    this.target = value;
    this.vel = 0;
    this.response = response;
    this.damping = damping;
    this.onUpdate = onUpdate;
    this.onRest = onRest;
    this._raf = 0;
    this._last = 0;
  }

  Spring.prototype.set = function (target) {
    this.target = target;
    if (reduced.matches) {                 // reduced motion: no spring at all
      this.v = target; this.vel = 0;
      this.onUpdate && this.onUpdate(this.v);
      this.onRest && this.onRest(this.v);
      return;
    }
    if (!this._raf) { this._last = performance.now(); this._tick(this._last); }
  };

  // jump without animating (resize, first paint, teleport)
  Spring.prototype.jump = function (value) {
    this.stop();
    this.v = this.target = value; this.vel = 0;
    this.onUpdate && this.onUpdate(this.v);
  };

  Spring.prototype.stop = function () {
    if (this._raf) cancelAnimationFrame(this._raf);
    this._raf = 0;
  };

  Spring.prototype._tick = function (now) {
    const dt = Math.min((now - this._last) / 1000, 1 / 30);  // clamp: tab switches
    this._last = now;

    const w = (2 * Math.PI) / this.response;   // angular frequency
    const z = this.damping;
    const d = this.target - this.v;
    // semi-implicit euler — stable at the frame rates we care about
    this.vel += (w * w * d - 2 * z * w * this.vel) * dt;
    this.v += this.vel * dt;

    this.onUpdate && this.onUpdate(this.v);

    if (Math.abs(this.target - this.v) < 0.0005 && Math.abs(this.vel) < 0.0005) {
      this.v = this.target; this.vel = 0;
      this.onUpdate && this.onUpdate(this.v);
      this._raf = 0;
      this.onRest && this.onRest(this.v);
      return;
    }
    this._raf = requestAnimationFrame((t) => this._tick(t));
  };

  /* ---------- smooth scroll ----------
     A lerp between where the page is and where the wheel asked
     it to be. Native scrolling stays the source of truth, so
     anchors, the keyboard and the scrollbar all keep working. */
  function smoothScroll({ lerp = 0.165 } = {}) {
    if (reduced.matches || !matchMedia('(hover: hover) and (pointer: fine)').matches) return null;

    let target = window.scrollY;
    let current = target;
    let running = false;
    const max = () => document.documentElement.scrollHeight - innerHeight;

    function frame() {
      current += (target - current) * lerp;
      if (Math.abs(target - current) < 0.4) { current = target; running = false; }
      window.scrollTo(0, current);
      if (running) requestAnimationFrame(frame);
    }

    addEventListener('wheel', (e) => {
      if (e.ctrlKey) return;                       // pinch-zoom
      if (e.target.closest('[data-native-scroll]')) return;
      e.preventDefault();
      target = Math.max(0, Math.min(max(), target + e.deltaY));
      if (!running) { running = true; requestAnimationFrame(frame); }
    }, { passive: false });

    // anything that moves the page outside the wheel resyncs us
    addEventListener('scroll', () => { if (!running) target = current = window.scrollY; }, { passive: true });
    addEventListener('resize', () => { target = current = window.scrollY; });
    return { scrollTo: (y) => { target = Math.max(0, Math.min(max(), y)); if (!running) { running = true; requestAnimationFrame(frame); } } };
  }

  /* ---------- split text into animatable lines ----------
     Wraps each rendered line in <span class="line"><span>…</span></span>
     so the inner span can be pushed below its own overflow and
     rise into place. Re-splits on resize because line breaks move. */
  function splitLines(el) {
    if (!el.dataset.srcText) el.dataset.srcText = el.textContent.trim();
    const text = el.dataset.srcText;
    const words = text.split(/\s+/);
    el.innerHTML = words.map(w => `<span class="w">${w}</span>`).join(' ');

    const tops = new Map();
    el.querySelectorAll('.w').forEach(w => {
      const top = Math.round(w.offsetTop);
      if (!tops.has(top)) tops.set(top, []);
      tops.get(top).push(w.textContent);
    });
    el.innerHTML = [...tops.values()]
      .map(line => `<span class="line"><span>${line.join(' ')}</span></span>`).join('');
    return el.querySelectorAll('.line > span').length;
  }

  /* ---------- reveal on enter ----------
     Lines rise from 120% of their own height, 0.7s, 0.06s apart. */
  function reveal(root = document) {
    const targets = root.querySelectorAll('[data-reveal]');
    if (!targets.length) return;

    targets.forEach(el => {
      if (el.dataset.reveal === 'lines' && !reduced.matches) splitLines(el);
    });

    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        el.querySelectorAll('.line > span').forEach((ln, i) => {
          ln.style.transitionDelay = (i * 0.06) + 's';
        });
        el.classList.add('is-in');
        io.unobserve(el);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

    targets.forEach(el => io.observe(el));

    // line breaks change on resize — re-split what hasn't played yet
    let rt;
    addEventListener('resize', () => {
      clearTimeout(rt);
      rt = setTimeout(() => {
        root.querySelectorAll('[data-reveal="lines"]:not(.is-in)').forEach(el => {
          if (!reduced.matches) splitLines(el);
        });
      }, 200);
    });
  }

  /* ---------- split into characters ----------
     Each character sits in its own mask so it can rise out of it.
     Words stay unbroken (white-space: nowrap) so a line never wraps
     mid-word, and the full text is kept for screen readers. */
  function splitChars(el, { step = 0.035, from = 0 } = {}) {
    if (el.dataset.split) return el.querySelectorAll('.ch > span').length;
    el.dataset.split = '1';
    // innerText, not textContent: a <br> has to read as a space, or
    // "berat<br>erdoğan" is announced as one word
    const label = (el.innerText || el.textContent).trim().replace(/\s+/g, ' ');
    let i = 0;
    const walk = (node) => {
      [...node.childNodes].forEach(n => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(tok => {
            if (!tok) return;
            if (/^\s+$/.test(tok)) { frag.append(' '); return; }
            const w = document.createElement('span'); w.className = 'wd';
            [...tok].forEach(c => {
              const ch = document.createElement('span'); ch.className = 'ch';
              const inner = document.createElement('span');
              inner.textContent = c;
              inner.style.setProperty('--d', (from + i++ * step).toFixed(3) + 's');
              ch.append(inner); w.append(ch);
            });
            frag.append(w);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && !n.classList.contains('sr')) walk(n);
      });
    };
    walk(el);
    el.setAttribute('aria-label', label);
    [...el.children].forEach(c => c.setAttribute('aria-hidden', 'true'));
    return i;
  }

  /* ---------- count a number up when it enters ----------
     Keeps whatever surrounds the digits ("03+", "%40") and pads to
     the original width so the layout never jitters while counting. */
  function countUp(el, { dur = 1200 } = {}) {
    const raw = el.textContent;
    const m = raw.match(/\d+/);
    if (!m || reduced.matches) return;
    const end = +m[0], width = m[0].length;
    const [pre, post] = [raw.slice(0, m.index), raw.slice(m.index + width)];
    el.textContent = pre + '0'.padStart(width, '0') + post;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (now) => {
        const p = Math.min((now - t0) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 4);            // quartic out: fast, then settles
        el.textContent = pre + String(Math.round(end * eased)).padStart(width, '0') + post;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    io.observe(el);
  }

  window.Motion = { Spring, smoothScroll, reveal, splitLines, splitChars, countUp, reduced };
})();
