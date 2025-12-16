window.addEventListener("load", function () {
    document.body.classList.add("page-loaded");
});

/* ---------- SLIDER SETUP ---------- */
const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slider img");

let currentSlide = 0;
let startX = 0;
let isDragging = false;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove("active"));
    slides[index].classList.add("active");
}

/* ---------- AUTO SLIDE ---------- */
let autoSlide = setInterval(nextSlide, 4000);

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function pauseAutoSlide() {
    clearInterval(autoSlide);
    autoSlide = setInterval(nextSlide, 4000);
}

/* pause auto-slide on interaction */
slider.addEventListener("touchstart", pauseAutoSlide);
slider.addEventListener("mousedown", pauseAutoSlide);

/* ---------- TOUCH (mobile) ---------- */
slider.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
});

slider.addEventListener("touchend", e => {
    const endX = e.changedTouches[0].clientX;
    handleSwipe(startX, endX);
});

/* ---------- MOUSE (desktop) ---------- */
slider.addEventListener("mousedown", e => {
    isDragging = true;
    startX = e.clientX;
});

slider.addEventListener("mouseup", e => {
    if (!isDragging) return;
    isDragging = false;
    handleSwipe(startX, e.clientX);
});

/* ---------- LOGIC ---------- */
function handleSwipe(start, end) {
    const diff = start - end;

    if (diff > 50) {
        currentSlide = (currentSlide + 1) % slides.length;
    } else if (diff < -50) {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    }

    showSlide(currentSlide);
}