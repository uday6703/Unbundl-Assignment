/**
 * Clove Dental Landing Page - JavaScript
 * Features: Mobile menu, smooth scroll, FAQ accordion, back to top button
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // MOBILE MENU TOGGLE
    // ===================================
    const menuBtn = document.querySelector('.menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', function() {
            menuBtn.classList.toggle('open');
            navMenu.classList.toggle('show');
        });

        // Close menu when clicking on a nav link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                menuBtn.classList.remove('open');
                navMenu.classList.remove('show');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!menuBtn.contains(e.target) && !navMenu.contains(e.target)) {
                menuBtn.classList.remove('open');
                navMenu.classList.remove('show');
            }
        });
    }

    // ===================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===================================
    // FAQ ACCORDION
    // ===================================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', function() {
                // Close other open FAQs
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current FAQ
                item.classList.toggle('active');
            });
        }
    });

    // ===================================
    // FEATURE ITEMS ACCORDION (Why Choose Section)
    // ===================================
    const featureItems = document.querySelectorAll('.feature-item');

    featureItems.forEach(item => {
        item.addEventListener('click', function() {
            const toggle = this.querySelector('.feature-toggle');
            
            // Toggle the + to - and vice versa
            if (toggle.textContent === '+') {
                // Close all other feature items
                featureItems.forEach(other => {
                    const otherToggle = other.querySelector('.feature-toggle');
                    if (otherToggle) otherToggle.textContent = '+';
                    other.classList.remove('active');
                });
                
                toggle.textContent = '−';
                this.classList.add('active');
            } else {
                toggle.textContent = '+';
                this.classList.remove('active');
            }
        });
    });

    // ===================================
    // BACK TO TOP BUTTON
    // ===================================
    const backToTopBtn = document.getElementById('backToTop');

    if (backToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        // Scroll to top when clicked
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===================================
    // TESTIMONIAL CARD SELECTION
    // ===================================
    const testimonialCards = document.querySelectorAll('.testimonial-card');

    testimonialCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove active class from all cards
            testimonialCards.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked card
            this.classList.add('active');
        });
    });

    // ===================================
    // FORM SUBMISSION HANDLING
    // ===================================
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = {};
            
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            // Basic validation
            let isValid = true;
            const inputs = form.querySelectorAll('input[required]');
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#EF4444';
                } else {
                    input.style.borderColor = '';
                }
            });
            
            if (isValid) {
                // Show success message (in a real application, you would send this to a server)
                alert('Thank you for your submission! We will contact you shortly.');
                form.reset();
            } else {
                alert('Please fill in all required fields.');
            }
        });
    });

    // ===================================
    // INPUT FOCUS ANIMATION
    // ===================================
    const inputs = document.querySelectorAll('input[type="text"], input[type="tel"], input[type="email"]');

    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });

    // ===================================
    // HEADER SCROLL EFFECT
    // ===================================
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
        }
        
        lastScroll = currentScroll;
    });

    // ===================================
    // PAUSE STATS ANIMATION ON HOVER
    // ===================================
    const statsContent = document.querySelector('.stats-content');

    if (statsContent) {
        statsContent.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });

        statsContent.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
    }

    // ===================================
    // LAZY LOADING IMAGES (Basic Implementation)
    // ===================================
    const lazyImages = document.querySelectorAll('img[data-src]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers without IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }

    // ===================================
    // CITY CARD HOVER EFFECT
    // ===================================
    const cityCards = document.querySelectorAll('.city-card');

    cityCards.forEach(card => {
        card.addEventListener('click', function() {
            // In a real application, this would navigate to the clinic listing for that city
            const cityName = this.querySelector('.city-name').textContent;
            alert(`Viewing clinics in ${cityName}`);
        });
    });

    // ===================================
    // CAPTCHA REFRESH (Simulated)
    // ===================================
    const captchaDisplays = document.querySelectorAll('.captcha-text, .captcha-display-inline');

    captchaDisplays.forEach(display => {
        display.addEventListener('click', function() {
            // Generate random 4-digit number
            const newCaptcha = Math.floor(1000 + Math.random() * 9000);
            this.textContent = newCaptcha;
        });
    });

    // ===================================
    // INITIALIZE - Add loaded class to body
    // ===================================
    document.body.classList.add('loaded');

    console.log('Clove Dental Landing Page - JavaScript Loaded Successfully');
});

// ===================================
// UTILITY FUNCTIONS
// ===================================

/**
 * Debounce function to limit how often a function can fire
 */
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

/**
 * Throttle function to limit how often a function can fire
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
