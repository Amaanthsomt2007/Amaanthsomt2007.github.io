// -----------------------------
// GLOBAL VARIABLES
// -----------------------------
const nav = document.querySelector("nav ul");
const navLinks = document.querySelectorAll("nav a");
const isMobile = window.innerWidth <= 768;

// -----------------------------
// DESKTOP NAV EFFECTS
// -----------------------------
if (!isMobile) {
  // Add pulse animation to nav links on load
  navLinks.forEach(link => {
    link.classList.add("nav-pulse");
    // Remove pulse after animation completes
    setTimeout(() => link.classList.remove("nav-pulse"), 1000);
    // Hover glow effect
    link.classList.add("nav-glow");
  });

  // Add bounce effect to nav when page loads
  nav.classList.add("nav-bounce");
}

// -----------------------------
// MOBILE NAV SMOOTH HIDE/SHOW WITH THRESHOLD
// -----------------------------
if (isMobile) {
  let lastScroll = window.scrollY;
  let navY = 0;
  let targetY = 0;
  const speed = 0.15;
  const scrollThreshold = 20;

  const animateNav = () => {
    navY += (targetY - navY) * speed;
    nav.style.transform = `translateY(${navY}px)`;
    nav.style.opacity = 1 - (navY / 120);
    requestAnimationFrame(animateNav);
  };
  animateNav();

  window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;

    if (currentScroll < 40) {
      targetY = 0; // Always visible near top
    } else {
      const scrollDiff = currentScroll - lastScroll;
      if (scrollDiff > scrollThreshold) targetY = 120; // Scroll down → hide
      else if (scrollDiff < -scrollThreshold) targetY = 0; // Scroll up → show
    }

    lastScroll = currentScroll;
  });
}

// -----------------------------
// STAGGER ANIMATION FOR ELEMENTS ON LOAD
// -----------------------------
document.addEventListener("DOMContentLoaded", () => {
  const staggerElems = document.querySelectorAll(".stagger");
  staggerElems.forEach((el, i) => {
    setTimeout(() => el.classList.add("show"), i * 150);
  });
});

// -----------------------------
// FLOATING PARALLAX ELEMENTS (DESKTOP ONLY)
// -----------------------------
if (!isMobile) {
  const floatElems = document.querySelectorAll(".float-parallax");
  window.addEventListener("mousemove", e => {
    const x = e.clientX;
    const y = e.clientY;
    floatElems.forEach(el => {
      const speed = el.dataset.speed || 0.05;
      el.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
  });
}

// -----------------------------
// SMOOTH PAGE TRANSITION FADE-IN
// -----------------------------
window.addEventListener("load", () => {
  document.body.classList.add("page-loaded");
});

// -----------------------------
// SCROLL GLOW ON ELEMENTS
// -----------------------------
const glowElems = document.querySelectorAll(".glow-on-scroll");
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("glow-visible");
      else entry.target.classList.remove("glow-visible");
    });
  },
  { threshold: 0.3 }
);
glowElems.forEach(el => observer.observe(el));