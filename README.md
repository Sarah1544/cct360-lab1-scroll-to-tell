# One Day on the Trail — CCT360 Lab 1: Scroll to Tell

A single-page website that tells a short story through scrolling, built with HTML and CSS only.

**How it works**
- Four full-height sections, each with its own background image set to `background-attachment: fixed`, separated by normal text sections. Because the images stay pinned while the text scrolls over them, the layers appear to move at different speeds (class 2, slides 65–72).
- Captions are positioned absolutely inside each `position: relative` section; cards are centred with flexbox.
- CSS transitions animate the cards and the button on hover.

**Files**
- `index.html` — page structure
- `css/styles.css` — all styling
- `images/image-01.jpg` … `image-04.jpg` — background scenes (original artwork by the author, made from CSS shapes and SVG)

Layout pattern adapted from the CCT360 class 2 parallax demo by Nimrah Syed.
