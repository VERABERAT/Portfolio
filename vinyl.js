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

    /* ---------- drag / swipe ---------- */
    let dragging = false, startX = 0, startPos = 0, lastX = 0, lastT = 0, vel = 0, moved = 0;

    root.addEventListener('pointerdown', (e) => {
      if (e.button != null && e.button !== 0) return;
      dragging = true; moved = 0;
      startX = lastX = e.clientX;
      startPos = spring.v;                 // from where it IS, not where it was going
      lastT = performance.now();
      vel = 0;
      spring.stop();
      root.setPointerCapture(e.pointerId);
      root.classList.add('is-dragging');
    });

    root.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      const gap = spacing();
      moved += Math.abs(e.clientX - lastX);
      const now = performance.now();
      const dt = Math.max(now - lastT, 1);
      vel = ((e.clientX - lastX) / dt) / gap * 1000;   // index units per second
      lastX = e.clientX; lastT = now;
      // rubber-band past the ends instead of a hard stop
      let p = startPos - (e.clientX - startX) / gap;
      if (p < 0) p = p * 0.35;
      if (p > last) p = last + (p - last) * 0.35;
      paint(p);
      spring.jump(p);
    });

    function endDrag(e) {
      if (!dragging) return;
      dragging = false;
      root.classList.remove('is-dragging');
      try { root.releasePointerCapture(e.pointerId); } catch (_) {}
      // project the flick forward, then settle on the nearest record
      const projected = spring.v - vel * 0.22;
      goTo(Math.round(projected), { momentum: Math.abs(vel) > 0.6 });
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
    return {
      goTo,
      get index() { return active; },
      get target() { return Math.round(spring.target); }
    };
  };
})();
