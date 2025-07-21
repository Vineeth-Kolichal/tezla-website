document.addEventListener("DOMContentLoaded", function () {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll(".nav-link");

    for (const link of navLinks) {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjusted for fixed navbar
                    behavior: "smooth"
                });
            }
        });
    }

    // Hero Section Animation
    anime({
        targets: '.hero-section h1',
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 800,
        delay: 300,
        easing: 'easeOutQuad'
    });

    anime({
        targets: '.hero-section p',
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 800,
        delay: 500,
        easing: 'easeOutQuad'
    });

    anime({
        targets: '.hero-section .btn-primary',
        scale: [0.8, 1],
        opacity: [0, 1],
        duration: 800,
        delay: 700,
        easing: 'easeOutElastic(1, .8)'
    });


    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2 // A little more of the element should be visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const animationType = target.dataset.animation;

                if (animationType === 'stagger-cards') {
                    anime({
                        targets: target.querySelectorAll('.card'),
                        translateY: [30, 0],
                        opacity: [0, 1],
                        delay: anime.stagger(200),
                        easing: 'easeOutQuad'
                    });
                } else if (animationType === 'fade-in') {
                    anime({
                        targets: target,
                        translateY: [30, 0],
                        opacity: [0, 1],
                        duration: 800,
                        easing: 'easeOutQuad'
                    });
                } else if (animationType === 'stagger-icons') {
                    anime({
                        targets: target.querySelectorAll('.icon-box'),
                        scale: [0.5, 1],
                        opacity: [0, 1],
                        delay: anime.stagger(150),
                        easing: 'easeOutElastic(1, .8)'
                    });
                }

                observer.unobserve(target);
            }
        });
    }, observerOptions);

    // Add data-attributes to sections that need animation
    document.querySelector('#products .container').dataset.animation = 'stagger-cards';
    document.querySelector('#why-choose-us .container').dataset.animation = 'stagger-icons';
    document.querySelector('.about-section').dataset.animation = 'fade-in';
    document.querySelector('.contact-section').dataset.animation = 'fade-in';

    document.querySelectorAll('[data-animation]').forEach(el => {
        observer.observe(el);
    });

    // Animate section titles
    const sectionTitles = document.querySelectorAll('.section-padding h2');
    sectionTitles.forEach(title => {
        observer.observe(title);
        title.dataset.animation = 'fade-in';
    });

    // Testimonial Carousel Animation
    const testimonialCarousel = document.getElementById('testimonialCarousel');
    testimonialCarousel.addEventListener('slide.bs.carousel', function (e) {
        const activeItem = e.relatedTarget;
        anime.set(activeItem.children, { opacity: 0 });
        anime({
            targets: activeItem.children,
            opacity: [0, 1],
            duration: 800,
            easing: 'easeInOutQuad'
        });
    });

    // Contact Form Submission
    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(form);
        const scriptURL = 'https://script.google.com/macros/s/AKfycbzXsohj3MS3SSqB3Bzn8XZ4KolV841YyuU_CygUWhYZshj9vAHhPNZ7rlL-IuBzkAI6/exec'; // <-- PASTE YOUR URL HERE

        formStatus.textContent = 'Sending...';

        fetch(scriptURL, { method: 'POST', body: formData })
            .then(response => response.json())
            .then(data => {
                if (data.result === 'success') {
                    formStatus.textContent = 'Message sent successfully!';
                    formStatus.style.color = 'green';
                    form.reset();
                } else {
                    throw new Error(data.error || 'Unknown error');
                }
            })
            .catch(error => {
                formStatus.textContent = 'An error occurred. Please try again.';
                formStatus.style.color = 'red';
                console.error('Error!', error.message);
            });
    });
});