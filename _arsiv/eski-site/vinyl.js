/* ============================================================
   PLAK GALERİSİ — a crate of records you flick through.
   CSS 3D transforms only; a record is a flat disc, so there is
   nothing here Three.js would do better for 150 KB.

   Position is one number: `pos`, a float index into the crate.
   Everything else (x, rotation, depth, scale, opacity) is
   derived from `i - pos`. A spring owns `pos`, so a drag, a
   wheel, a click and a keypress all push the same value and
   can interrupt one another mid-flight.
   ============================================================ */
(function () {
  const { Spring, reduced } = window.Motion;

  window.initVinyl = function initVinyl(root, records, { onOpen, onActive } = {}) {
    if (!root || !records.length) return null;

    const els = [...root.querySelectorAll('.rec')];
    const last = records.length - 1;
    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

    let pos = 0;
    let active = -1;

    // spacing shrinks on narrow screens so neighbours stay on stage
    const spacing = () => clamp(root.clientWidth * 0.42, 190, 420);
    // the crate is flipped through from the front: the record you are
    // looking at sits left of centre, the rest of the stack runs right.
    const shift = () => (root.clientWidth > 860 ? -root.clientWidth * 0.15 : 0);

    function paint(p) {
      pos = p;
      const gap = spacing();
      const off = shift();
      els.forEach((el, i) => {
        const d = i - p;                  // signed distance from centre
        const ad = Math.abs(d);
        if (ad > 3.4) { el.style.visibility = 'hidden'; return; }
        el.style.visibility = 'visible';

        const x = d * gap + off;
        const rotY = clamp(d * -16, -42, 42);
        // the front record is pulled toward the viewer so the vinyl it
        // slides out never ends up behind the next sleeve
        const z = 90 - ad * 230;
        const scale = 1 - Math.min(ad * 0.13, 0.42);
        const opacity = ad > 2.6 ? Math.max(0, (3.4 - ad) / 0.8) : 1 - Math.min(ad * 0.22, 0.62);

        el.style.transform =
          `translate3d(${x}px, ${Math.abs(d) * 14}px, ${z}px) rotateY(${rotY}deg) scale(${scale})`;
        el.style.opacity = opacity;
        el.style.zIndex = String(100 - Math.round(ad * 10));
        el.style.pointerEvents = ad < 0.5 ? 'auto' : 'none';
      });

      const near = clamp(Math.round(p), 0, last);
      if (near !== active) {
        active = near;
        els.forEach((el, i) => el.classList.toggle('is-active', i === near));
        onActive && onActive(near, records[near]);
      }
    }

    const spring = new Spring(0, { response: 0.42, damping: 1.0, onUpdate: paint });

    function goTo(i, { momentum = false } = {}) {
      spring.damping = momentum ? 0.8 : 1.0;   // overshoot only on a release
      spring.set(clamp(i, 0, last));
    }

    /* ---------- wheel / trackpad ----------
       Horizontal intent drives the crate; vertical intent is left
       to the page so the gallery never traps the scroll. */
    let wheelAcc = 0, wheelTimer = 0;
    root.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      wheelAcc += e.deltaX;
      clearTimeout(wheelTimer);
      wheelTimer = setTimeout(() => { wheelAcc = 0; }, 140);
      if (Math.abs(wheelAcc) > 60) {
        goTo(Math.round(spring.target) + Math.sign(wheelAcc));
        wheelAcc = 0;
      }
    }, { passive: false });

    /* ---------- drag / swipe ----------
       Built to Apple's fluid-interface rules (Designing Fluid
       Interfaces, WWDC 2018):
       - grab from the presentation value, never the target
       - track 1:1, respecting where the crate was grabbed
       - velocity from a short history, not the last event
       - progressive rubber-band past the ends
       - project momentum forward with Apple's deceleration function
       - hand the release velocity to the spring: no seam */
    let dragging = false, startX = 0, startPos = 0, moved = 0;
    let hist = [];                                   // [{x, t}] for velocity

    // Apple's rubber band: the further past the edge, the less it follows.
    // `dim` is how far (in records) it may ever stretch.
    const rubber = (over, dim = 0.6, c = 0.55) =>
      (over * dim * c) / (dim + c * Math.abs(over));

    // Apple's momentum projection, from the WWDC sample code.
    // 0.995 sits between scroll-feel (0.998) and snappy (0.99): a firm
    // flick travels one to two records, not the whole crate.
    const project = (v, d = 0.995) => v * d / (1 - d) / 1000;

    function releaseVelocity() {
      // only samples from the last 90ms count — a finger that stopped
      // before lifting has no velocity, however fast it moved earlier
      const now = performance.now();
      const recent = hist.filter(h => now - h.t < 90);
      if (recent.length < 2) return 0;
      const a = recent[0], b = recent[recent.length - 1];
      const dt = (b.t - a.t) / 1000;
      return dt > 0 ? (b.x - a.x) / dt : 0;         // px/s
    }

    root.addEventListener('pointerdown', (e) => {
      if (e.button != null && e.button !== 0) return;
      dragging = true; moved = 0;
      startX = e.clientX;
      startPos = spring.v;                 // from where it IS, not where it was going
      hist = [{ x: e.clientX, t: performance.now() }];
      spring.stop();                       // catch it mid-flight
      root.setPointerCapture(e.pointerId);
      root.classList.add('is-dragging');
    });

    root.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      const gap = spacing();
      moved += Math.abs(e.clientX - hist[hist.length - 1].x);
      hist.push({ x: e.clientX, t: performance.now() });
      if (hist.length > 8) hist.shift();
      let p = startPos - (e.clientX - startX) / gap;
      if (p < 0) p = rubber(p);
      if (p > last) p = last + rubber(p - last);
      spring.jump(p);                      // paints via onUpdate
    });

    function endDrag(e) {
      if (!dragging) return;
      dragging = false;
      root.classList.remove('is-dragging');
      try { root.releasePointerCapture(e.pointerId); } catch (_) {}
      const gap = spacing();
      const v = -releaseVelocity() / gap;   // records per second; right drag = backwards
      const target = clamp(Math.round(spring.v + project(v)), 0, last);
      spring.damping = Math.abs(v) > 0.6 ? 0.8 : 1.0;   // bounce only if it was thrown
      spring.set(target, v);                // velocity handoff
    }
    root.addEventListener('pointerup', endDrag);
    root.addEventListener('pointercancel', endDrag);

    // a drag must not fire the link it started on
    root.addEventListener('click', (e) => {
      if (moved > 8) { e.preventDefault(); e.stopPropagation(); moved = 0; }
    }, true);

    /* ---------- click a neighbour to bring it forward ---------- */
    els.forEach((el, i) => {
      el.addEventListener('click', (e) => {
        if (i !== active) { e.preventDefault(); goTo(i); }
        else if (onOpen) { e.preventDefault(); onOpen(i, records[i], el); }
      });
    });

    /* ---------- keyboard ---------- */
    root.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); goTo(Math.round(spring.target) + 1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(Math.round(spring.target) - 1); }
      else if (e.key === 'Home') { e.preventDefault(); goTo(0); }
      else if (e.key === 'End') { e.preventDefault(); goTo(last); }
      else if (e.key === 'Enter' || e.key === ' ') {
        if (onOpen) { e.preventDefault(); onOpen(active, records[active], els[active]); }
      }
    });

    // keep a record centred when it receives focus by tab
    els.forEach((el, i) => el.addEventListener('focusin', () => goTo(i)));

    addEventListener('resize', () => paint(spring.v));
    paint(0);
    if (reduced.matches) root.classList.add('is-reduced');

    // `target` is where the crate is heading, `index` is where it has
    // settled. Transport buttons must read `target`, or a second click
    // before the spring lands re-issues the move it just made.
    // jumpTo lands on a record with no animation — used when the page
    // opens on the record the visitor last looked at.
    function jumpTo(i) { spring.jump(clamp(i, 0, last)); }

    return {
      goTo,
      jumpTo,
      get index() { return active; },
      get target() { return Math.round(spring.target); }
    };
  };
})();
