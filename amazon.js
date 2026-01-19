const trigger = document.getElementById("deliverTrigger");
const select = document.getElementById("countrySelect");
const text = document.getElementById("countryText");

trigger.addEventListener("click", () => { 
  select.focus();
  select.click();
});

select.addEventListener("change", () => {
  text.textContent = select.value;
});

/* ================= HERO SLIDESHOW ================= */

const heroSlides = document.querySelectorAll(".slide");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let heroIndex = 0;
let slideInterval;

function showHeroSlide(index) {
  heroSlides.forEach((slide, i) => {
    slide.style.display = i === index ? "block" : "none";
  });
}

function nextHeroSlide() {
  heroIndex = (heroIndex + 1) % heroSlides.length;
  showHeroSlide(heroIndex);
}

function prevHeroSlide() {
  heroIndex = (heroIndex - 1 + heroSlides.length) % heroSlides.length;
  showHeroSlide(heroIndex);
}

function startAutoSlide() {
  slideInterval = setInterval(nextHeroSlide, 4000);
}

function stopAutoSlide() {
  clearInterval(slideInterval);
}

nextBtn.addEventListener("click", () => {
  nextHeroSlide();
  stopAutoSlide();
  startAutoSlide();
});

prevBtn.addEventListener("click", () => {
  prevHeroSlide();
  stopAutoSlide();
  startAutoSlide();
});

showHeroSlide(heroIndex);
startAutoSlide();

const languageBtn = document.querySelector(".language");
const dropdown = document.querySelector(".lang-drop-down");
const langText = document.querySelector("#lang span");

// toggle dropdown
languageBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  dropdown.classList.toggle("show");
});

// select language
dropdown.querySelectorAll("div").forEach(item => {
  item.addEventListener("click", () => {
    const selected = item.textContent;

    if (selected === "English") langText.textContent = "EN";
    if (selected === "French") langText.textContent = "FR";
    if (selected === "Spanish") langText.textContent = "ES";

    dropdown.classList.remove("show");
  });
});

// close when clicking outside
document.addEventListener("click", () => {
  dropdown.classList.remove("show");
});

/* To program the search bar */
const categoryButtons = document.querySelectorAll(".product-category");
const searchForm = document.querySelector(".search-wrapper form");
const searchInput = searchForm.querySelector("input[type='search']");
const suggestionsBox = document.getElementById("search-suggestions");
const notFound = document.getElementById("not-found");
//search suggestions positioning
function positionSearchBox() {
  const rect = searchInput.getBoundingClientRect();

  suggestionsBox.style.top = rect.bottom + "px";
  suggestionsBox.style.left = rect.left + "px";
  suggestionsBox.style.width = rect.width + "px";
}
//search suggestions
const searchable = [
  ...document.querySelectorAll(".product-category"),
  ...document.querySelectorAll("[data-search]")
];

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase().trim();
  suggestionsBox.innerHTML = "";

  if (!query) {
  suggestionsBox.classList.remove("show");
  suggestionsBox.hidden = true;
  notFound.hidden = true;
  suggestionsBox.style.display = "none";
  suggestionsBox.style.display = "block";
  return;
}

  let matches = 0;

  searchable.forEach(item => {
    const text =
      item.dataset?.search || item.textContent;

    if (text.toLowerCase().includes(query)) {
      const li = document.createElement("li");
      li.textContent = text;

      li.onclick = () => {
  searchInput.value = text;

  // if this is a category button
  if (item.classList.contains("product-category")) {
    const index = [...categoryButtons].indexOf(item);
    if (index !== -1) {
      item.click(); // activates slide properly
    }
  } else {
    const parentSlide = item.closest(".product-display-slide");

if (parentSlide) {
  const slideIndex = [...productSlides].indexOf(parentSlide);

  if (slideIndex !== -1) {
    showProductSlide(slideIndex);

    setTimeout(() => {
      item.scrollIntoView({ behavior: "smooth", block: "start" });
      
      //Highlight the found item
      item.classList.add("search-highlight");
setTimeout(() => {
  item.classList.remove("search-highlight");
}, 1200);
    }, 300);
  }
}
  }

  suggestionsBox.hidden = true;
};

      suggestionsBox.appendChild(li);
      matches++;
    }
  });
  suggestionsBox.hidden = false;
suggestionsBox.classList.toggle("show", matches > 0);

notFound.hidden = matches > 0;
notFound.classList.toggle("show", matches === 0);
});

//Submit search
searchForm.addEventListener("submit", e => {
  e.preventDefault();

  const query = searchInput.value.toLowerCase().trim();
  if (!query) return;

  let found = false;

  // 🔍 search product display sections
  document.querySelectorAll("[data-search]").forEach(section => {
    const keywords = section.dataset.search.toLowerCase();

    if (keywords.includes(query)) {
      found = true;

      section.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
      
      section.classList.add("search-highlight");

setTimeout(() => {
  section.classList.remove("search-highlight");
}, 1200);
    }
  });

  // 🔍 search category buttons (slide switching)
  categoryButtons.forEach((btn, index) => {
    if (btn.textContent.toLowerCase().includes(query)) {
      found = true;

      btn.click(); // switch slide
      setTimeout(() => {
        document
          .getElementById("product-display-wrapper")
          .scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  });

  notFound.hidden = found;
  notFound.classList.toggle("show", !found);
  suggestionsBox.hidden = true;
});
//search suggestions list styling still
searchInput.addEventListener("focus", positionSearchBox);
searchInput.addEventListener("input", positionSearchBox);
window.addEventListener("resize", positionSearchBox);
/* Arrow scrolling */
document.querySelectorAll(".horizontal-products").forEach(section => {
  const scroll = section.querySelector(".h-scroll");
  const next = section.querySelector(".h-next");
  const prev = section.querySelector(".h-prev");

  next?.addEventListener("click", () => {
    scroll.scrollBy({ left: 300, behavior: "smooth" });
  });

  prev?.addEventListener("click", () => {
    scroll.scrollBy({ left: -300, behavior: "smooth" });
  });
});

/* ================= PRODUCT DISPLAY SLIDES ================= */

const productSlides = document.querySelectorAll(".product-display-slide");

let currentProductSlide = 0;

function showProductSlide(index) {
  productSlides.forEach((slide, i) => {
    slide.classList.remove("active", "prev", "next");

    if (i === index) slide.classList.add("active");
    else if (i < index) slide.classList.add("prev");
    else slide.classList.add("next");
  });

  currentProductSlide = index;
}

categoryButtons.forEach((btn, index) => {
  btn.addEventListener("click", () => {

    // remove active from all
    categoryButtons.forEach(b => b.classList.remove("active"));

    // activate clicked one
    btn.classList.add("active");

    showProductSlide(index);
  });
});

showProductSlide(0);

// ================= CART BADGE =================

function updateCartBadge() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);

  const badge = document.getElementById('cart-count');
  if (badge) badge.innerText = totalQty;
}

//Cart badge update. Runs on page load
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
});

const cartIcon = document.getElementById('cartIcon');

cartIcon?.addEventListener('click', () => {
  window.location.href = 'cart.html';
});