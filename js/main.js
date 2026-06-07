const toggleBtn = document.getElementById("theme-toggle");
if(localStorage.getItem("theme") === "dark"){
    document.body.classList.add("dark-mode");
}

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    if(document.body.classList.contains("dark-mode")){
        localStorage.setItem("theme", "dark");
    }else{
        localStorage.setItem("theme", "light");
    }

});

window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if(window.scrollY > 50){
        navbar.classList.add("scrolled");
    }else{
        navbar.classList.remove("scrolled");
    }

});

window.addEventListener("scroll", () => {
    console.log("Scroll détecté");
});

const topBtn = document.getElementById("topBtn");
window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }   
});

topBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


//    COUNTERS AU SCROLL
const counters = document.querySelectorAll(".counter");
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            const counter = entry.target;
            const target = +counter.getAttribute("data-target");
            let count = 0;
            const increment = target / 200;
            const updateCounter = () => {
                count += increment;
                if(count < target){
                    counter.innerText = Math.ceil(count);
                    requestAnimationFrame(updateCounter);
                }else{
                    counter.innerText = target;
                }
            };
            updateCounter();
         counterObserver.unobserve(counter);
        }
    });
}, {
    threshold: 0.5
});
    counters.forEach(counter => {
    counterObserver.observe(counter);
});
const fadeElements = document.querySelectorAll(".fade-in");
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }
    });
});

    fadeElements.forEach(el => {
    observer.observe(el);
});

const buttons = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll(".freelance-card");
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const filter = button.getAttribute("data-filter");
        cards.forEach(card => {
            if(filter === "all" || card.getAttribute("data-category") === filter){
                card.style.display = "block";
            }else{
                card.style.display = "none";
            }
        });
    });
});

const form = document.getElementById("contactForm");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;

    // Champ de validation pour l'email
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    // message d'erreur
    const emailError = document.getElementById("emailError");
    const messageError = document.getElementById("messageError");
    const successMessage = document.getElementById("successMessage");
    const nameError = document.getElementById("nameError");

        // Reinitialisation des messages d'erreur
    nameError.textContent  = "";
    emailError.textContent = "";
    messageError.textContent = "";
    successMessage.textContent = "";

        // Nom obligatoire
    if (name.value.trim() === ""){
        nameError.textContent = "Le nom est obligatoire.";
        valid = false;
    }

    // Email obligatoire et format valide regex pour l'email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value)){
        emailError.textContent = "Veuillez entrer un email valide.";
        valid = false;
    } else if (!emailRegex.test(email.value)){
        emailError.textContent = "Veuillez entrer un email valide.";
        valid = false;
    }

    // message obligatoire et au moins 20 caractères
    if (message.value.trim() === ""){
        messageError.textContent = "Le message est obligatoire.";
        valid = false;
    } else if (message.value.trim().length < 20){
        messageError.textContent = "Le message doit contenir au moins 20 caractères.";
        valid = false;
    }

    if (valid){
        successMessage.textContent = "Votre message a été envoyé avec succès !";
        form.reset();
    }
});
