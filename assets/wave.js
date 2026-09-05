/* tAI Markets — hero particle-wave backdrop.
   A field of ink dots riding a slow traveling wave: the index tape as a
   living surface. Canvas is corner-anchored and masked in CSS so it fades
   out before it meets the headline. Static frame under prefers-reduced-motion;
   the loop pauses when offscreen or the tab is hidden. No dependencies. */
(function () {
    var canvas = document.getElementById('hero-wave');
    if (!canvas || !canvas.getContext) return;
    var ctx = canvas.getContext('2d');
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var INK = '17,17,16';
    var W = 0, H = 0;

    function resize() {
        var rect = canvas.getBoundingClientRect();
        W = Math.max(1, Math.round(rect.width));
        H = Math.max(1, Math.round(rect.height));
        canvas.width = W * dpr;
        canvas.height = H * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        draw(0); // also serves as the reduced-motion still
    }

    var ROWS = 26, COLS = 130;

    function draw(t) {
        ctx.clearRect(0, 0, W, H);
        for (var r = 0; r < ROWS; r++) {
            var v = r / (ROWS - 1);
            var edge = Math.min(v, 1 - v) * 2; // first/last rows dissolve
            for (var c = 0; c < COLS; c++) {
                var u = c / (COLS - 1);
                var y = H * (0.14 + 0.64 * v)
                    + H * 0.22 * (0.3 + 0.7 * Math.sin(v * Math.PI)) * Math.sin(u * 6.0 + t * 0.9 + v * 2.2)
                    + H * 0.07 * Math.sin(u * 12.5 - t * 0.6 + v * 4.1)
                    + H * 0.04 * Math.sin(u * 3.1 + t * 0.35 + v * 1.3);
                var crest = (Math.sin(u * 6.0 + t * 0.9 + v * 2.2) + 1) / 2;
                var alpha = (0.12 + 0.58 * crest) * (0.35 + 0.65 * edge);
                ctx.fillStyle = 'rgba(' + INK + ',' + alpha.toFixed(3) + ')';
                ctx.fillRect(u * W, y, 1.5, 1.5);
            }
        }
    }

    var running = false, rafId = 0, t0 = performance.now(), last = 0;
    function frame(now) {
        rafId = 0;
        if (!running) return;
        if (now - last >= 33) { // ~30fps: it is a slow field, not a game
            last = now;
            draw((now - t0) / 1000);
        }
        rafId = requestAnimationFrame(frame);
    }
    function start() {
        if (reduced || running) return;
        running = true;
        rafId = requestAnimationFrame(frame);
    }
    function stop() {
        running = false;
        if (rafId) { cancelAnimationFrame(rafId); rafId = 0; }
    }

    window.addEventListener('resize', resize, { passive: true });
    document.addEventListener('visibilitychange', function () {
        if (document.hidden) stop(); else start();
    });
    if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (entries) {
            if (entries[0].isIntersecting) start(); else stop();
        }, { threshold: 0 }).observe(canvas);
    } else {
        start();
    }
    resize();
    start();
})();
