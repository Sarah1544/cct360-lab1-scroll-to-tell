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
    // For each scene, measure how far its top is from the top of the window.
    // Normally every layer scrolls with the page (speed 1). To make a layer
    // scroll SLOWER we push it back down by part of that distance.
    //   speed 1   = moves with the page (closest, e.g. near mountains)
    //   speed 0.5 = moves at half the page speed
    //   speed 0   = pinned to the window (furthest away, e.g. stars)
    // Because the layers move at different speeds they slide past each
    // other, which is the parallax illusion of depth.
    scenes.forEach(function (scene) {
        const rect = scene.getBoundingClientRect();
        const offset = rect.top; // px from window top; negative once scrolled past

        // only bother while the scene is on or near the screen
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;

        scene.querySelectorAll(".layer").forEach(function (layer) {
            const speed = parseFloat(layer.dataset.speed);
            const shift = -offset * (1 - speed);
            layer.style.transform = "translateY(" + shift + "px)";
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
