//For The Modal/Login Form
const modal = document.querySelector(".modal_background");
const openBtn = document.querySelector("#open_modal");
const closeBtn = document.querySelector("#close_modal");

if(modal) {

function openModal() {
    modal.classList.add("show");
}

function closeModal() {
    modal.classList.remove("show");
}

openBtn.addEventListener("click", function() {
    if(sessionStorage.getItem("loggedIn") === "true") {
        window.location.href = "Profile.html";
    }else {
        openModal();
    }
});

closeBtn.addEventListener("click", closeModal);

//Closes Modal When User Clicks Outside the Modal Box
modal.addEventListener("click", function(event) {
    if(event.target === modal) {
        closeModal();
    }
});

//Closes Modal When User Clicks the Escape Key (desktops)
document.addEventListener("keydown", function(event) {
    if(event.key === "Escape") {
        closeModal();
    }
});

//Open Modal If User Was Redirected From Signup Page 
if(sessionStorage.getItem("openLogin") === "true") {
    openModal();
    sessionStorage.removeItem("openLogin");
}

}

/* For the Header Animation When Scrolling Up or Down */
const animae = document.querySelector("header");


if(animae) {
    window.addEventListener("scroll", function() {
        
        if(window.scrollY >= 100) {
            animae.classList.add("compact");
        }
        
        if(window.scrollY < 100) {
            animae.classList.remove("compact");
        }
        
    });
}

/* For The Slideshow */
const slides = document.querySelectorAll(".slide");

let i = 0;
let startX = 0;
let endX = 0;

if(slides.length > 0) {
    const slideshow = document.querySelector(".img");
    
    //Auto Sliding of the Slideshow
    function showSlide() {
        slides.forEach(function(slide) {
            slide.style.display = "none";
        });
        
        slides[i].style.display = "block";
        
    }
    
    showSlide();
    
    setInterval(function() {
        i++;
        
        if(i >= slides.length) {
            i = 0;
        }
        
        showSlide();
    }, 5000);
    
    //Manual Control Of The Slideshow 
    slideshow.addEventListener("touchstart", function(event) {
        startX = event.touches[0].clientX;
    });
    
    slideshow.addEventListener("touchend", function(event) {
        endX = event.changedTouches[0].clientX;
        
        if(endX < startX) {
            i++;
        
        if(i >= slides.length) {
            i = 0;
            
        }
        
        showSlide();
        
        }
        
        if(endX > startX) {
            i--;
            
            if(i < 0) {
                
                i = slides.length - 1;
            }
            
            showSlide();
        }
    });
}

/* Animation Logic Ends */

/* Page Functional Logic Begins */

//Signup Logic And Storage
const signup_form = document.querySelector("#form");
const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/;

if(signup_form) {
    
    signup_form.addEventListener("submit", function(event) {
        event.preventDefault();
        
        if(localStorage.getItem("account")) {
            
            signup_form.reset();
            
            alert("Already have an account. Please log in");
            
            sessionStorage.setItem("openLogin", "true");
            
            window.location.href = "index.html";
        }else {
            
            const firstName = document.getElementById("surname").value;
        const otherNames = document.getElementById("other_names").value;
        const userName = document.getElementById("user_name").value;
        const password = document.getElementById("Password").value;
        const location = document.getElementById("address").value;
        const city = document.getElementById("city").value;
        const state = document.getElementById("state").value;
        
        //Password Validation
        if(!passwordPattern.test(password)) {
            alert("Password must contain at least 8 characters, an uppercase letter, a lowercase letter, a number and a symbol.");
            return;
        }
        
        const account = {
            Surname: firstName,
            MiddleNames: otherNames,
            Username: userName,
            Password: password,
            Address: location,
            City: city,
            State: state
        };
        localStorage.setItem("account", JSON.stringify(account));
        
        alert("Sign-up Successful!");
        
        sessionStorage.setItem("loggedIn", "true");
        
        window.location.href = "index.html";
        }
        
        
    });
}

//Also From the Signup Page. Redirects to Home Page and Opens the Login Modal 
const loginLink = document.getElementById("Login_link");

if(loginLink) {
    loginLink.addEventListener("click", function() {
        
        sessionStorage.setItem("openLogin", "true");
        
        window.location.href = "index.html";
    
    });
}

//Login Logic And Authentication
const login_form = document.querySelector("#form1");

if (login_form) {
    login_form.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const username = document.getElementById("username").value;
        const user_password = document.getElementById("password").value;
        
        const account = JSON.parse(localStorage.getItem("account"));
        
        if(!account) {
            alert("No account was found. Please sign up first");
            return;
        }
        
        if(username === account.Username && user_password === account.Password) {
            sessionStorage.setItem("loggedIn", "true");
            alert("Login Successful!");
            
            login_form.reset();
        modal.classList.remove("show");
        }else {
            alert("Incorrect Username or Password");
        }
        
    });
}

/* The Purchasing/Buy Logic */
const Buy = document.getElementById("buy");

if(Buy) {
    Buy.addEventListener("click", function() {
        if(sessionStorage.getItem("loggedIn") !== "true") {
            alert("Please Log in or Sign up before buying");
            return;
        }
        
        const account = JSON.parse(localStorage.getItem("account"));
        
        if(!account) {
            alert("Account could not be found. Please Sign up to create an account");
            return;
        }
        
        const surname = account.Surname;
        const middleName = account.MiddleNames;
        const username = account.Username;
        const address = account.Address;
        const city = account.City;
        const state = account.State;
        
        const price = 25000;
        
        const message =
    "Hello FashionHub! I would like to buy a product.\n\n" +
    "Customer Information:\n" +
    "Name: " + surname + " " + middleName + "\n" +
    "Username: " + username + "\n" +
    "Address: " + address + "\n" +
    "City: " + city + "\n" +
    "State: " + state + "\n\n" +
    "Price: ₦" + price.toLocaleString() + "\n\n" +
    "Please let me know how I can proceed with my order.";
    
    const whatsappURL = `https://wa.me/2349066674073?text=${encodeURIComponent(message)}`;

window.open(whatsappURL, "_blank");
    });
}

/* Cart Logic And It's DOM */

//The Cart Logic
function addToCart(name, price, image, link) {
    if(sessionStorage.getItem("loggedIn") === "true") {
        const product= {
            Name: name,
            Price: price,
            Image: image,
            Link: link
        };
        
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        
        cart.push(product);
        
        localStorage.setItem("cart", JSON.stringify(cart));
        
    }else {
        alert("Please log in or sign up to add products to your cart");
        
        sessionStorage.setItem("openLogin", "true");
        
        window.location.href = "../index.html";
    }
}

//The Cart DOM 
const cartStore = document.querySelector(".cart_store");

let html = "";

if(cartStore) {
    
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    for(let i = 0; i < cart.length; i++) {
        
        html += `<a href="${cart[i].Link}">   <div class="product"> <img src="${cart[i].Image}" alt="${cart[i].Name}">   <div class="product_name">  <h3>${cart[i].Name}</h3>  <p class="price">${cart[i].Price}</p>   </div></div></a>  <button class="action_button" onclick="removeCart(${i})">remove</button>`;
    }
    cartStore.innerHTML = html;
}

//To Remove An Item From The Cart 
function removeCart(index) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    cart.splice(index, 1);
    
    localStorage.setItem("cart", JSON.stringify(cart));
    
    location.reload();
}

/* Profile Page Logic/DOM */

//It's Here
const Profile = document.querySelector(".profile_info");

let profile_html = "";

if(Profile) {
    const Profile_info = JSON.parse(localStorage.getItem("account"));
    
        
    function addProfile() {
    
    if (!Profile_info) {
            
            sessionStorage.setItem("openLogin", "true");
            window.location.href = "index.html";
            
            return;
        }
        
        
        profile_html = `<div><h3>First Name:</h3> <p>${Profile_info.Surname}</p></div>  <div><h3>Other Names:</h3> <p>${Profile_info.MiddleNames}</p></div>   <div><h3>Username:</h3> <p>${Profile_info.Username}</p></div>   <div><h3>Location/Address:</h3> <p>${Profile_info.Address}</p></div>   <div><h3>City:</h3> <p>${Profile_info.City}</p></div>   <div><h3>State:</h3> <p>${Profile_info.State}</p></div>`;
    
    Profile.innerHTML = profile_html;
    }
    
    addProfile();
    
}

/* Search Bar Function and Logic */

//Search Bar
const search_input = document.getElementById("search_products");
const submit_search = document.getElementById("search_button");


//Category Pages To Search
const category_pages = [
    "male_fashion.html",
    "female_fashion.html",
    "shoes.html",
    "accessories.html",
    "bag.html",
    "female_shoes.html"
];

function loadCategory(url) {
    return fetch(url)
    .then(function(response) {
        return response.text();
    })
    .then(function(html) {
        const parser = new DOMParser;
        
        const page = parser.parseFromString(
            html,
            "text/html"
        );
        
        const product_cards = page.querySelectorAll(".product");
        
        const products = [];
        
        product_cards.forEach(function(card) {
            const link = card.closest("a");
            const name = card.querySelector(".product_name h3");
            const price = card.querySelector(".price");
            
            if(link && name && price) {
                products.push({
                    name: name.textContent.trim(),
                    price: price.textContent.trim(),
                    url: link.getAttribute("href")
                });
            }
        });
        
        return products;
    });
    
}


const all_products = [];

Promise.all(
    category_pages.map(function(url) {
        return loadCategory(url);
    })
)
    .then(function(category_results) {
        category_results.forEach(function(products) {
            all_products.push(...products);
        });

    })
    .catch(function(error) {
        console.log("Error loading products:", error);
    });
    
 
 //Search Suggestion
const suggestions = document.getElementById("search_suggestions");

if (search_input && suggestions) {
    search_input.addEventListener("input", function() {
        const search_text = search_input.value
            .trim()
            .toLowerCase();

        suggestions.innerHTML = "";

        if (search_text === "") {
            suggestions.style.display = "none";
            return;
        }

        const matches = all_products.filter(function(product) {
            return product.name.toLowerCase().includes(search_text);
        });

        matches.forEach(function(product) {
            const item = document.createElement("li");

            item.textContent = product.name + " - " + product.price;

            item.addEventListener("click", function() {
                window.location.href = product.url;
            });

            suggestions.appendChild(item);
        });

        suggestions.style.display =
            matches.length > 0 ? "block" : "none";
    });
}

//Submitting The Search (Clicking The Submit Button)

function searchProducts() {
    const search_text = search_input.value
        .trim()
        .toLowerCase();

    if (search_text === "") {
        return;
    }

    const match = all_products.find(function(product) {
        return product.name.toLowerCase().includes(search_text);
    });

    if (match) {
        window.location.href = match.url;
    }
}

if (submit_search && search_input) {
    submit_search.addEventListener("click", searchProducts);

    search_input.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            searchProducts();
        }
    });
}

//Search Suggestions Codes When User Clicks Elsewhere On The Screen

document.addEventListener("click", function(event) {
    const search_area = document.querySelector(".search");

    if (
        search_area &&
        !search_area.contains(event.target) &&
        suggestions
    ) {
        suggestions.style.display = "none";
    }
});

/* For The Newsletter */
const newsLetter = document.getElementById("newsletter");

if(newsLetter) {
    newsLetter.addEventListener("submit", function(event) {
        event.preventDefault();
        
        alert("You have subscribed");
        
        newsLetter.reset();
    })
}