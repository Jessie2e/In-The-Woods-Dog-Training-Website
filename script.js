// script.js

document.addEventListener('DOMContentLoaded', () => {
    const mobileToggle = document.getElementById('mobile-toggle');
    const mainNav = document.getElementById('main-nav');
    const navLinks = document.querySelectorAll('.nav-list a');
    const header = document.getElementById('header');
    const yearSpan = document.getElementById('year');

    const reduceMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    ).matches;


    // =========================================
    // MOBILE NAVIGATION
    // =========================================

    const setMenuState = (isOpen) => {
        if (!mobileToggle || !mainNav) return;

        mobileToggle.classList.toggle('active', isOpen);
        mainNav.classList.toggle('active', isOpen);

        mobileToggle.setAttribute(
            'aria-expanded',
            String(isOpen)
        );

        mobileToggle.setAttribute(
            'aria-label',
            isOpen ? 'Close navigation' : 'Open navigation'
        );

        document.body.classList.toggle('menu-open', isOpen);
    };


    if (mobileToggle && mainNav) {

        mobileToggle.addEventListener('click', () => {
            const isCurrentlyOpen =
                mainNav.classList.contains('active');

            setMenuState(!isCurrentlyOpen);
        });


        // Close menu after choosing a navigation item
        navLinks.forEach((link) => {
            link.addEventListener('click', () => {
                setMenuState(false);
            });
        });


        // Close with Escape
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                setMenuState(false);
            }
        });


        // Close if user clicks outside menu
        document.addEventListener('click', (event) => {
            if (!mainNav.classList.contains('active')) return;

            const clickedInsideNav =
                mainNav.contains(event.target);

            const clickedToggle =
                mobileToggle.contains(event.target);

            if (!clickedInsideNav && !clickedToggle) {
                setMenuState(false);
            }
        });


        // If user rotates phone / expands browser,
        // reset mobile menu
        window.addEventListener('resize', () => {
            if (window.innerWidth > 992) {
                setMenuState(false);
            }
        });
    }



    // =========================================
    // STICKY HEADER SHRINK EFFECT
    // =========================================

    let scrollTicking = false;

    const updateHeader = () => {

        if (header) {
            header.classList.toggle(
                'scrolled',
                window.scrollY > 28
            );
        }

        scrollTicking = false;
    };


    updateHeader();


    window.addEventListener(
        'scroll',
        () => {

            if (!scrollTicking) {

                window.requestAnimationFrame(
                    updateHeader
                );

                scrollTicking = true;
            }

        },
        { passive: true }
    );



    // =========================================
    // HERO ENTRANCE ANIMATION
    // =========================================

    if (
        !reduceMotion &&
        Element.prototype.animate
    ) {

        const heroPieces =
            document.querySelectorAll(
                '.hero-content h1, .hero-sub, .hero-actions'
            );


        heroPieces.forEach((element, index) => {

            element.animate(

                [
                    {
                        opacity: 0,
                        transform: 'translateY(16px)'
                    },
                    {
                        opacity: 1,
                        transform: 'translateY(0)'
                    }
                ],

                {
                    duration: 650,
                    delay: 90 + index * 110,
                    easing: 'cubic-bezier(.2,.75,.25,1)',
                    fill: 'both'
                }

            );

        });


        const heroImage =
            document.querySelector(
                '.hero-image-wrapper'
            );


        if (heroImage) {

            heroImage.animate(

                [
                    {
                        opacity: 0.72,
                        transform: 'scale(1.025)'
                    },
                    {
                        opacity: 1,
                        transform: 'scale(1)'
                    }
                ],

                {
                    duration: 900,
                    easing: 'cubic-bezier(.2,.75,.25,1)',
                    fill: 'both'
                }

            );

        }
    }



    // =========================================
    // SCROLL REVEAL ANIMATIONS
    // =========================================

    const revealTargets =
        document.querySelectorAll(
            `
            .section-header,
            .service-card,
            .about-text,
            .about-image,
            .testimonial-card,
            .contact-info,
            .contact-form-wrapper,
            .video-wrapper
            `
        );


    // Slight stagger for service cards
    document
        .querySelectorAll(
            '.services-grid .service-card'
        )
        .forEach((card, index) => {

            card.style.setProperty(
                '--reveal-delay',
                `${index * 90}ms`
            );

        });


    // Slight stagger for video cards
    document
        .querySelectorAll(
            '.video-grid .video-wrapper'
        )
        .forEach((video, index) => {

            video.style.setProperty(
                '--reveal-delay',
                `${index * 70}ms`
            );

        });


    revealTargets.forEach((element) => {
        element.classList.add('reveal');
    });


    if (
        !reduceMotion &&
        'IntersectionObserver' in window
    ) {

        const observer =
            new IntersectionObserver(

                (entries, obs) => {

                    entries.forEach((entry) => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        entry.target.classList.add(
                            'is-visible'
                        );

                        obs.unobserve(entry.target);

                    });

                },

                {
                    threshold: 0.12,
                    rootMargin:
                        '0px 0px -40px 0px'
                }

            );


        revealTargets.forEach((element) => {
            observer.observe(element);
        });

    } else {

        revealTargets.forEach((element) => {
            element.classList.add('is-visible');
        });

    }



    // =========================================
    // COPYRIGHT YEAR
    // =========================================

    if (yearSpan) {
        yearSpan.textContent =
            new Date().getFullYear();
    }

    // =========================================
// GALLERY SCROLL ANIMATION
// =========================================

const gallerySection = document.getElementById('gallery');

if (gallerySection && !reduceMotion) {

    const galleryObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {
                    gallerySection.classList.add('gallery-in-view');
                } else {
                    /*
                     * Removing the class means the animation
                     * can replay if you scroll away and back.
                     */
                    gallerySection.classList.remove('gallery-in-view');
                }

            });

        },
        {
            threshold: 0.3,
            rootMargin: '0px 0px -10% 0px'
        }
    );

    galleryObserver.observe(gallerySection);
}
});