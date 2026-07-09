// SOLUCIÓN A LA PÁGINA EN BLANCO: 
// Confirmamos que JS está activo para aplicar las animaciones de ocultar/mostrar.
// Si este archivo no carga en GitHub Pages, el CSS mostrará el contenido por defecto.
document.body.classList.add('js-enabled');

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Actualizar año en el footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Menú Móvil Mejorado
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li a');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if(navLinks.classList.contains('active')){
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });
    }

    // Cerrar menú móvil al hacer click y Smooth Scroll nativo
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            // Cierra el menú móvil
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
            }
        });
    });

    // 3. Efecto Navbar Glassmorphism al hacer Scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 4. Animaciones "Reveal" (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');
    
    // Si el navegador soporta IntersectionObserver
    if ('IntersectionObserver' in window) {
        const revealOptions = {
            threshold: 0.1, // Se activa antes para que no se sienta lento
            rootMargin: "0px 0px -50px 0px"
        };

        const revealOnScroll = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); // Solo anima una vez
                }
            });
        }, revealOptions);

        revealElements.forEach(el => {
            revealOnScroll.observe(el);
        });
    } else {
        // Fallback para navegadores muy antiguos: muestra todo de golpe
        revealElements.forEach(el => el.classList.add('active'));
    }

    // 5. Validación y feedback visual del botón del formulario
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML; // Guardamos el html para conservar el icono
            
            // Estado de carga
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            btn.style.opacity = '0.8';
            btn.style.cursor = 'not-allowed';
            btn.disabled = true;

            // Simulamos el envío a un servidor (1.5 segundos)
            setTimeout(() => {
                // Estado de éxito
                btn.innerHTML = '<i class="fas fa-check"></i> ¡Mensaje Enviado!';
                btn.style.backgroundColor = '#10b981'; // Verde moderno
                btn.style.boxShadow = '0 4px 14px rgba(16, 185, 129, 0.3)';
                contactForm.reset();
                
                // Restauramos el botón a la normalidad después de 3.5 segundos
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.backgroundColor = ''; // Vuelve al color del CSS
                    btn.style.boxShadow = '';
                    btn.style.opacity = '1';
                    btn.style.cursor = 'pointer';
                    btn.disabled = false;
                }, 3500);
            }, 1500);
        });
    }
});