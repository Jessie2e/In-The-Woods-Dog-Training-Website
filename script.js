// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const mainNav = document.getElementById('main-nav');
    const navLinks = document.querySelectorAll('.nav-list a');

    const toggleMenu = () => {
        mobileToggle.classList.toggle('active');
        mainNav.classList.toggle('active');
    };

    mobileToggle.addEventListener('click', toggleMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Sticky Header Shrink Effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Update Copyright Year
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Form Submission Handling
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = bookingForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            
            btn.textContent = 'Sending Request...';
            btn.style.opacity = '0.7';
            
            setTimeout(() => {
                btn.textContent = 'Request Sent!';
                bookingForm.reset();
                
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.opacity = '1';
                }, 3000);
            }, 1500);
        });
    }
});