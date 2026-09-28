// ==========================================================
// CCT360 Lab 1: Scroll to Tell
// Three scroll behaviours:
//   1. progress bar   - how far down the page you are
//   2. parallax       - each .layer moves at its own speed
//   3. reveal         - .reveal elements animate in when seen
// ==========================================================

// ---------- 1 + 2: things that update on every scroll ----------
const progressBar = document.getElementById("progress");
const scenes = document.querySelectorAll(".scene");

function onScroll() {
    // -- progress bar --
    // scrollY = how far we've scrolled; the max is page height minus window height
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const percent = (window.scrollY / maxScroll) * 100;
    progressBar.style.width = percent + "%";

    // -- parallax --
    // For each scene, work out how far the scene is from the middle of the
    // screen, then move each layer by a fraction of that (its data-speed).
    // A layer with speed 0.8 nearly follows the page (feels close);
    // speed 0.1 barely moves (feels far away).
    scenes.forEach(function (scene) {
        const rect = scene.getBoundingClientRect();
        // distance of the scene's top from the viewport top, in px
        const offset = rect.top;

        // only bother while the scene is on or near the screen
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;

        scene.querySelectorAll(".layer").forEach(function (layer) {
            const speed = parseFloat(layer.dataset.speed) || 0;
            // negative offset (scene scrolling up) -> layer shifts down a bit,
            // so the layers slide against each other
            layer.style.transform = "translateY(" + (-offset * speed) + "px)";
        });
    });
}

// requestAnimationFrame stops us doing the maths more than once per frame
let ticking = false;
window.addEventListener("scroll", function () {
    if (!ticking) {
        window.requestAnimationFrame(function () {
            onScroll();
            ticking = false;
        });
        ticking = true;
    }
});

// run once on load so the page is correct before the first scroll
onScroll();

// ---------- 3: progressive reveal ----------
// IntersectionObserver tells us when an element enters the viewport.
// We add the .visible class and CSS transitions do the animation.
const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
    function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); // animate once only
            }
        });
    },
    { threshold: 0.25 } // fire when 25% of the element is showing
);

revealElements.forEach(function (el) {
    observer.observe(el);
});
