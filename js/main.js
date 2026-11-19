/**
 * PORTFOLIO - ILYES CHOUITER
 * JavaScript Principal - Simple & Fonctionnel
 */

// ========================================
// DOM ELEMENTS
// ========================================
const header = document.querySelector('header');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileNav = document.querySelector('.mobile-nav');
const backToTop = document.querySelector('.back-to-top');
const contactForm = document.getElementById('contactForm');

// ========================================
// HEADER & NAVIGATION
// ========================================

// Mobile menu toggle
function toggleMobileMenu() {
    mobileMenuBtn.classList.toggle('active');
    mobileNav.classList.toggle('active');
    document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
}

// Close mobile menu when clicking outside
function closeMobileMenuOnClick(e) {
    if (!mobileNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileMenuBtn.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Scroll effect for header
function handleScroll() {
    const scrollY = window.pageYOffset;
    
    // Add scrolled class to header
    if (scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Show/hide back to top button
    if (scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
    
    // Close mobile menu on scroll
    if (mobileNav.classList.contains('active')) {
        mobileMenuBtn.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Update active nav link
    updateActiveNavLink();
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            const navLinks = document.querySelectorAll('.desktop-nav a, .mobile-nav a');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Smooth scroll for anchor links
function smoothScroll(e, link) {
    const href = link.getAttribute('href');
    if (href === '#') return;
    
    const target = document.querySelector(href);
    if (!target) return;
    
    e.preventDefault();
    
    const headerHeight = header.offsetHeight;
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
    
    // Close mobile menu after click
    if (mobileNav.classList.contains('active')) {
        toggleMobileMenu();
    }
}

// ========================================
// CONTACT FORM
// ========================================

function handleContactFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi...';
    
    // Simulate form submission (replace with real API call if needed)
    setTimeout(() => {
        // Show success notification
        showNotification('Merci ! Votre message a été envoyé avec succès.', 'success');
        
        // Reset form
        form.reset();
        
        // Reset button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }, 1500);
}

// Show notification
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${type === 'success' ? '#43e97b' : '#fa709a'};
        color: white;
        padding: 15px 20px;
        border-radius: 50px;
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-family: 'Poppins', sans-serif;
        font-size: 14px;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
    
    // Add keyframes if not exists
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

// ========================================
// TYPING EFFECT
// ========================================

function initTypingEffect() {
    const typingText = document.querySelector('.typing-text');
    const cursor = document.querySelector('.typing-cursor');
    
    if (!typingText || !cursor) return;
    
    const text = typingText.textContent;
    const words = ['Étudiant en Informatique', 'Spécialiste Cybersécurité', 'Passionné par la Tech'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    // Start typing after page loads
    setTimeout(type, 500);
}

// ========================================
// ANIMATIONS ON SCROLL
// ========================================

function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.section-title, .about-text p, .about-info, .interests-card, .skills-category, .experience-item, .certif-card, .project-card, .contact-method, .social-links'
    );
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Set initial styles
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

// ========================================
// SKILL BARS ANIMATION
// ========================================

function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.style.width;
            }
        });
    }, {
        threshold: 0.5
    });
    
    skillBars.forEach(bar => {
        bar.style.width = '0';
        observer.observe(bar);
    });
}

// ========================================
// COUNTER ANIMATION
// ========================================

function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    if (counters.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    counters.forEach(counter => {
        counter.textContent = '0';
        observer.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.textContent) || 0;
    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ========================================
// INITIALIZE
// ========================================

function init() {
    // Header and navigation
    mobileMenuBtn?.addEventListener('click', toggleMobileMenu);
    document.addEventListener('click', closeMobileMenuOnClick);
    
    // Scroll events
    window.addEventListener('scroll', handleScroll);
    
    // Smooth scroll for all anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => smoothScroll(e, link));
    });
    
    // Contact form
    contactForm?.addEventListener('submit', handleContactFormSubmit);
    
    // Typing effect
    initTypingEffect();
    
    // Scroll animations
    initScrollAnimations();
    
    // Skill bars animation
    initSkillBars();
    
    // Initialize scroll (for header state on page load)
    handleScroll();
    
    console.log('✅ Portfolio initialisé avec succès !');
}

// Run on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ========================================
// EXPORT FOR DEBUGGING
// ========================================

window.Portfolio = {
    init,
    toggleMobileMenu,
    handleScroll,
    smoothScroll,
    handleContactFormSubmit,
    showNotification
};
