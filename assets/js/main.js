/**
 * Main JavaScript File
 * Handles: Custom Cursor, Animations, and Interactions.
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // Check if GSAP is loaded to prevent runtime errors
    if (typeof gsap === 'undefined') {
        console.error("GSAP library is missing.");
        return;
    }

    initCustomCursor();
    initIntroAnimations();
});

/**
 * 1. Custom Cursor Logic
 * Uses gsap.quickTo for high-performance mouse tracking.
 */
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    
    // Safety Check: If cursor element doesn't exist, stop execution.
    if (!cursor) return;

    // quickTo is much more performant than .to() for mouse movement
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power2.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power2.out" });

    // Update cursor position
    window.addEventListener('mousemove', (e) => {
        xTo(e.clientX);
        yTo(e.clientY);
    });

    // Hover Effects (Scale Up)
    const hoverTargets = document.querySelectorAll('a, button, .video-card, .about-img-wrapper, .blog-card');
    
    hoverTargets.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('hovered'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('hovered'));
    });
}

/**
 * 2. Intro Animations
 * Squenced animations for Hero section elements.
 */
function initIntroAnimations() {
    const tl = gsap.timeline({ 
        defaults: { ease: "power4.out" } 
    });

    // A. Reveal Hero Title
    if (document.querySelector('.reveal-text')) {
        tl.to(".reveal-text", {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.2,
            delay: 0.2
        });
    }

    // B. Animate Marquee (Slide Up)
    if (document.querySelector('.marquee-container')) {
        tl.from(".marquee-container", {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        }, "-=0.8"); // Overlap with previous animation
    }

    // C. Fade in 'About' section subtly
    const aboutSection = document.querySelector("#about");
    if (aboutSection) {
        tl.from(aboutSection, {
            opacity: 0,
            y: 30,
            duration: 1,
            ease: "power2.out"
        }, "-=0.5");
    }
}