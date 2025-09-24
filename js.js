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





















// ========== CONTACT FORM FUNCTIONALITY ==========
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener los valores del formulario
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value;
        
        // Validar campos requeridos
        if (!name || !phone || !service || !message) {
            alert('Please fill in all required fields (*)');
            return;
        }
        
        // Crear el asunto del correo
        const serviceText = document.getElementById('service').options[document.getElementById('service').selectedIndex].text;
        const subject = `New Project Estimate Request - ${serviceText}`;
        
        // Crear el cuerpo del correo
        const body = `Hello Adonis,

I would like to request a free estimate for your services.

Project Details:
- Name: ${name}
- Phone: ${phone}
- Email: ${email || 'Not provided'}
- Service Needed: ${serviceText}
- Project Description: ${message}

Please contact me at your earliest convenience.

Thank you!`;

        // Codificar para URL
        const encodedSubject = encodeURIComponent(subject);
        const encodedBody = encodeURIComponent(body);
        
        // Crear el link de mailto
        const mailtoLink = `mailto:adonisaromero@icloud.com?subject=${encodedSubject}&body=${encodedBody}`;
        
        // Cambiar texto del botón mientras procesa
        const submitButton = this.querySelector('.form__submit-button');
        const originalText = submitButton.querySelector('.button__text').textContent;
        
        submitButton.querySelector('.button__text').textContent = 'Opening Email...';
        submitButton.disabled = true;
        
        // Abrir el cliente de correo
        setTimeout(() => {
            window.location.href = mailtoLink;
            
            // Resetear el formulario después de 2 segundos
            setTimeout(() => {
                contactForm.reset();
                submitButton.querySelector('.button__text').textContent = originalText;
                submitButton.disabled = false;
                
                // Mostrar mensaje de confirmación
                alert('Thank you! Your email client is opening with your message pre-filled. Please click "Send" to complete your request.');
            }, 2000);
            
        }, 1000);
    });
}

// ========== SMOOTH SCROLL FOR NAVIGATION ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========== SMOOTH SCROLL FOR NAVIGATION ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});
