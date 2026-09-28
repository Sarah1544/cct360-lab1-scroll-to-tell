# One Day on the Trail — CCT360 Lab 1: Scroll to Tell

A single-page website that tells a short story through scrolling.

**Techniques used**
- Parallax: every `.layer` inside a `.scene` moves at its own `data-speed` using `transform: translateY()` on scroll (`js/script.js`).
- Progressive reveal: `.reveal` elements fade / slide / scale in via CSS transitions when an `IntersectionObserver` sees them.
- Scroll progress bar tied to `window.scrollY`.
- Layered layouts: absolutely positioned SVG mountains, CSS-only sun, moon, clouds and stars stacked with `z-index`.

No image files are used; all artwork is CSS and inline SVG.

Built with help from an AI assistant (Claude) for scaffolding; code reviewed and adapted by the author.
