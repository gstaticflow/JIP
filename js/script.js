// ===================================
// JIP Pro Finish - Main JavaScript
// ===================================

document.addEventListener('DOMContentLoaded', function() {

    // ===================================
    // Mobile Menu Toggle
    // ===================================
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });

        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    }

    // ===================================
    // Smooth Scrolling for Navigation
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Don't prevent default for empty hash links
            if (href === '#' || href === '') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===================================
    // Sticky Header on Scroll
    // ===================================
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        }

        lastScroll = currentScroll;
    });

    // ===================================
    // FAQ Accordion
    // ===================================
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');

            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });

            // Open clicked item if it wasn't active
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });

    // ===================================
    // Portfolio Filtering
    // ===================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter portfolio items
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');

                if (category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // ===================================
    // Contact Form Handling
    // ===================================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Don't prevent default - let Formspree handle it
            // But validate first

            // Get form values for validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;

            // Basic validation
            if (!name || !email || !phone || !message) {
                e.preventDefault();
                showNotification('Please fill in all required fields.', 'error');
                return false;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                e.preventDefault();
                showNotification('Please enter a valid email address.', 'error');
                return false;
            }

            // Phone validation (basic)
            const phoneRegex = /^[\d\s\-\(\)]+$/;
            if (!phoneRegex.test(phone)) {
                e.preventDefault();
                showNotification('Please enter a valid phone number.', 'error');
                return false;
            }

            // Show submitting message
            showNotification('Sending your message...', 'info');

            // Form will submit to Formspree
            // Formspree will redirect to their thank you page or return to your site
        });
    }

    // ===================================
    // Notification System
    // ===================================
    function showNotification(message, type = 'info') {
        // Remove any existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            max-width: 300px;
        `;

        // Add to page
        document.body.appendChild(notification);

        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }

    // Add notification animations to page
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // ===================================
    // Scroll Animations
    // ===================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('.service-card, .feature-item, .testimonial-card, .portfolio-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ===================================
    // Active Navigation Link
    // ===================================
    const sections = document.querySelectorAll('section[id]');

    function highlightNavigation() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);

            if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-menu a').forEach(link => {
                    link.style.color = '';
                });
                navLink.style.color = '#f4c430';
            }
        });
    }

    window.addEventListener('scroll', highlightNavigation);

    // ===================================
    // Initialize on Load
    // ===================================
    console.log('JIP Pro Finish website loaded successfully!');

    // Set initial active state for portfolio filter
    const firstFilterBtn = document.querySelector('.filter-btn[data-filter="interior-painting"]');
    if (firstFilterBtn) {
        firstFilterBtn.classList.add('active');
    }

    // Initialize portfolio items - show only interior-painting by default
    portfolioItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (category !== 'interior-painting') {
            item.style.display = 'none';
        }
    });

    // Highlight current navigation on load
    highlightNavigation();
});

// ===================================
// Lazy Loading Images (Optional Enhancement)
// ===================================
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ===================================
// Phone Number Click Tracking (Analytics)
// ===================================
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', function() {
        console.log('Phone link clicked:', this.getAttribute('href'));
        // You can add analytics tracking here
        // Example: gtag('event', 'phone_click', { phone_number: this.getAttribute('href') });
    });
});

// ===================================
// Email Click Tracking (Analytics)
// ===================================
document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', function() {
        console.log('Email link clicked:', this.getAttribute('href'));
        // You can add analytics tracking here
        // Example: gtag('event', 'email_click', { email: this.getAttribute('href') });
    });
});

// ===================================
// Lightbox Gallery
// ===================================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.querySelector('.lightbox-caption');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');

let currentImageIndex = 0;
let galleryImages = [];

// Collect all gallery images
function initLightbox() {
    const portfolioItems = document.querySelectorAll('.portfolio-item img');
    galleryImages = Array.from(portfolioItems);

    portfolioItems.forEach((img, index) => {
        img.addEventListener('click', function() {
            currentImageIndex = index;
            openLightbox(this);
        });
    });
}

function openLightbox(img) {
    lightbox.style.display = 'block';
    lightboxImg.src = img.src;
    const caption = img.alt || img.closest('.portfolio-item').querySelector('h4')?.textContent || '';
    lightboxCaption.textContent = caption;
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = ''; // Re-enable scrolling
}

function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    openLightbox(galleryImages[currentImageIndex]);
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    openLightbox(galleryImages[currentImageIndex]);
}

// Event listeners
if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
}

if (lightboxPrev) {
    lightboxPrev.addEventListener('click', showPrevImage);
}

if (lightboxNext) {
    lightboxNext.addEventListener('click', showNextImage);
}

// Close lightbox when clicking outside the image
if (lightbox) {
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (lightbox.style.display === 'block') {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            showPrevImage();
        } else if (e.key === 'ArrowRight') {
            showNextImage();
        }
    }
});

// Initialize lightbox
initLightbox();

// ===================================
// Service Gallery Carousel
// ===================================
function initServiceGalleries() {
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        const gallery = card.querySelector('.service-gallery');
        if (!gallery) return;

        const images = gallery.querySelectorAll('img');
        if (images.length <= 1) return;

        let currentIndex = 0;

        // Auto-rotate images
        setInterval(() => {
            images[currentIndex].classList.remove('active');
            images[currentIndex].style.opacity = '0';

            currentIndex = (currentIndex + 1) % images.length;

            images[currentIndex].classList.add('active');
            images[currentIndex].style.opacity = '1';
        }, 3000); // Change image every 3 seconds

        // Make gallery images clickable
        images.forEach((img, index) => {
            img.addEventListener('click', function() {
                const allGalleryImages = document.querySelectorAll('.service-gallery img, .portfolio-item img');
                galleryImages = Array.from(allGalleryImages);
                currentImageIndex = Array.from(allGalleryImages).indexOf(this);
                openLightbox(this);
            });
        });
    });
}

// Initialize service galleries
initServiceGalleries();
