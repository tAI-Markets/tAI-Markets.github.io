/* tAI Markets — homepage scroll motion (Rekord-derived; DESIGN-SYSTEM.md "Motion").
   IntersectionObserver only: one-shot .reveal/.reveal-stagger at ~20% visibility,
   700ms .countup on KPI values. Pin and rails are pure CSS (theme.css).
   No library. Reduced motion: everything renders final-state immediately. */
(function () {
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var home = document.body.hasAttribute('data-motion-home');
    var targets = document.querySelectorAll('.reveal, .reveal-stagger, .countup');
    if (!home || !targets.length) return;

    if (reduced || !('IntersectionObserver' in window)) {
        targets.forEach(function (el) {
            el.classList.add('is-inview');
            if (el.classList.contains('countup') && !el.hasAttribute('data-count-snap')) setFinal(el);
        });
        return;
    }

    // Stagger: assign --i to children (max 6) of .reveal-stagger containers.
    document.querySelectorAll('.reveal-stagger').forEach(function (group) {
        var kids = group.children;
        for (var i = 0; i < kids.length && i < 6; i++) kids[i].style.setProperty('--i', i);
    });

    function setFinal(el) {
        var to = parseFloat(el.getAttribute('data-count-to') || '0');
        var dec = parseInt(el.getAttribute('data-count-decimals') || '0', 10);
        el.textContent = (el.getAttribute('data-count-prefix') || '') +
            to.toFixed(dec) + (el.getAttribute('data-count-suffix') || '');
    }

    function countUp(el) {
        if (el.hasAttribute('data-count-snap')) return; // authored text (e.g. "T+0") stays
        var to = parseFloat(el.getAttribute('data-count-to') || '0');
        var dec = parseInt(el.getAttribute('data-count-decimals') || '0', 10);
        var pre = el.getAttribute('data-count-prefix') || '';
        var suf = el.getAttribute('data-count-suffix') || '';
        var dur = 700;
        var t0 = null;
        function frame(t) {
            if (t0 === null) t0 = t;
            var p = Math.min((t - t0) / dur, 1);
            var eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
            el.textContent = pre + (to * eased).toFixed(dec) + suf;
            if (p < 1) requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
    }

    var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            var el = entry.target;
            if (el.classList.contains('countup')) countUp(el);
            else el.classList.add('is-inview');
            io.unobserve(el); // play once
        });
    }, { threshold: 0.2 });

    targets.forEach(function (el) { io.observe(el); });
})();
