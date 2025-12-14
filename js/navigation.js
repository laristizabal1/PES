// ==================== SMOOTH SCROLL ====================
function initSmoothScroll() {
    // Ya está manejado por CSS (scroll-behavior: smooth en html)
    // Este archivo está disponible para futuras funcionalidades de navegación
}

// ==================== ACTIVE MENU HIGHLIGHT ====================
function updateActiveMenuItem() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-menu a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
}

// ==================== NAVBAR SCROLL EFFECT ====================
function initNavbarScrollEffect() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });
}

// ==================== INICIALIZACIÓN ====================
document.addEventListener('DOMContentLoaded', () => {
    initSmoothScroll();
    updateActiveMenuItem();
    initNavbarScrollEffect();
});
