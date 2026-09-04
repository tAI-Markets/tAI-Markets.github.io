/* tAI Markets — shared nav toggle. Same chrome on every page (DESIGN-SYSTEM.md).
   Drawer: full-width panel under the bar; Escape + hamburger close; body scroll
   locks while open; closing resets at ≥861px where inline nav returns. */
(function () {
    var btn = document.querySelector('.nav-toggle');
    var drawer = document.getElementById('nav-drawer');
    if (!btn || !drawer) return;

    function setOpen(open) {
        drawer.classList.toggle('open', open);
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        document.body.classList.toggle('nav-locked', open);
    }

    btn.addEventListener('click', function () {
        setOpen(!drawer.classList.contains('open'));
    });
    drawer.addEventListener('click', function (e) {
        if (e.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') setOpen(false);
    });
    var mq = window.matchMedia('(min-width: 861px)');
    var onChange = function (e) { if (e.matches) setOpen(false); };
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else mq.addListener(onChange);
})();
