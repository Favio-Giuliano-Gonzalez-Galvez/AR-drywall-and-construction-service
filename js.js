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



























// ========== CARRUSEL FUNCTIONALITY ==========
class GalleryCarousel {
    constructor(carouselId) {
        this.track = document.getElementById(`carousel-track-${carouselId}`);
        this.dotsContainer = document.getElementById(`carousel-dots-${carouselId}`);
        this.prevBtn = document.querySelector(`[data-carousel="${carouselId}"].carousel-btn--prev`);
        this.nextBtn = document.querySelector(`[data-carousel="${carouselId}"].carousel-btn--next`);
        
        this.slides = this.track.querySelectorAll('.carousel-slide');
        this.currentSlide = 0;
        this.totalSlides = this.slides.length;
        
        this.init();
    }
    
    init() {
        // Crear dots de navegación
        this.createDots();
        
        // Event listeners para botones
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());
        
        // Actualizar posición inicial
        this.updateCarousel();
    }
    
    createDots() {
        for (let i = 0; i < this.totalSlides; i++) {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            if (i === 0) dot.classList.add('active');
            
            dot.addEventListener('click', () => this.goToSlide(i));
            this.dotsContainer.appendChild(dot);
        }
    }
    
    updateCarousel() {
        // Mover el track
        this.track.style.transform = `translateX(-${this.currentSlide * 100}%)`;
        
        // Actualizar dots
        const dots = this.dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
    }
    
    next() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateCarousel();
    }
    
    prev() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateCarousel();
    }
    
    goToSlide(index) {
        this.currentSlide = index;
        this.updateCarousel();
    }
}

// Inicializar los carruseles cuando la página cargue
document.addEventListener('DOMContentLoaded', () => {
    // Carrusel 1: Installation (10 imágenes)
    new GalleryCarousel(1);
    
    // Carrusel 2: Finishing (4 imágenes)
    new GalleryCarousel(2);
});


















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
