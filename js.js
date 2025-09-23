// ========== MENÚ HAMBURGUESA (Mostrar/Ocultar) ==========
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

// Mostrar Menú
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

// Ocultar Menú
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

// ========== CERRAR MENÚ AL HACER CLICK EN UN LINK ==========
const navLinks = document.querySelectorAll('.nav__link');

function linkAction() {
    // Cuando hacemos click en un link, quitamos la clase show-menu
    navMenu.classList.remove('show-menu');
}
navLinks.forEach(link => link.addEventListener('click', linkAction));

// ========== CAMBIAR FONDO DEL HEADER AL HACER SCROLL ==========
function scrollHeader() {
    const header = document.getElementById('header');
    // Cuando el scroll es mayor a 50 viewport height, añade la clase scroll-header
    if (this.scrollY >= 50) {
        header.classList.add('scroll-header');
    } else {
        header.classList.remove('scroll-header');
    }
}
window.addEventListener('scroll', scrollHeader);


















// ========== REVEAL SECTIONS ON SCROLL ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
        }
    });
}, observerOptions);

// Observar todas las secciones con la clase 'section'
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});