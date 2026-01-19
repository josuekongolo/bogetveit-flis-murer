/**
 * BOGETVEIT FLIS & MURER
 * Main JavaScript File
 */

(function() {
    'use strict';

    // ===========================================
    // DOM Elements
    // ===========================================
    const navToggle = document.getElementById('navToggle');
    const nav = document.getElementById('nav');
    const backToTop = document.getElementById('backToTop');
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const formError = document.getElementById('formError');
    const header = document.querySelector('.header');

    // ===========================================
    // Mobile Navigation
    // ===========================================
    if (navToggle && nav) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            nav.classList.toggle('active');

            // Prevent body scroll when menu is open
            document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking on a link
        const navLinks = nav.querySelectorAll('.nav__link');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && !navToggle.contains(e.target) && nav.classList.contains('active')) {
                navToggle.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // ===========================================
    // Header Scroll Effect
    // ===========================================
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        // Add shadow on scroll
        if (header) {
            if (currentScroll > 50) {
                header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
            } else {
                header.style.boxShadow = '';
            }
        }

        lastScroll = currentScroll;
    });

    // ===========================================
    // Back to Top Button
    // ===========================================
    if (backToTop) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });

        // Scroll to top on click
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===========================================
    // Smooth Scroll for Anchor Links
    // ===========================================
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Skip if it's just "#" or empty
            if (href === '#' || href === '') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();

                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===========================================
    // Contact Form Handling
    // ===========================================
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Get form data
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                address: document.getElementById('address').value.trim(),
                projectType: document.getElementById('projectType').value,
                description: document.getElementById('description').value.trim(),
                siteVisit: document.getElementById('siteVisit').checked
            };

            // Basic validation
            if (!formData.name || !formData.email || !formData.phone || !formData.projectType || !formData.description) {
                showFormMessage('error', 'Vennligst fyll ut alle påkrevde felt.');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                showFormMessage('error', 'Vennligst oppgi en gyldig e-postadresse.');
                return;
            }

            // Phone validation (Norwegian format)
            const phoneRegex = /^(\+47)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{3}$|^\d{8}$/;
            if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
                showFormMessage('error', 'Vennligst oppgi et gyldig telefonnummer.');
                return;
            }

            // Disable submit button
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sender...';

            try {
                // Simulate form submission (replace with actual API call)
                await simulateFormSubmission(formData);

                // Show success message
                showFormMessage('success');

                // Reset form
                contactForm.reset();

            } catch (error) {
                console.error('Form submission error:', error);
                showFormMessage('error', 'Noe gikk galt. Vennligst prøv igjen eller ring oss direkte.');
            } finally {
                // Re-enable submit button
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        });
    }

    /**
     * Show form message (success or error)
     */
    function showFormMessage(type, customMessage) {
        if (formSuccess) formSuccess.classList.remove('show');
        if (formError) formError.classList.remove('show');

        if (type === 'success' && formSuccess) {
            formSuccess.classList.add('show');
            formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else if (type === 'error' && formError) {
            if (customMessage) {
                formError.innerHTML = `<strong>Feil:</strong> ${customMessage}`;
            }
            formError.classList.add('show');
            formError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        // Auto-hide after 10 seconds
        setTimeout(function() {
            if (formSuccess) formSuccess.classList.remove('show');
            if (formError) formError.classList.remove('show');
        }, 10000);
    }

    /**
     * Simulate form submission
     * Replace this with actual API call (e.g., Resend API)
     */
    function simulateFormSubmission(formData) {
        return new Promise(function(resolve, reject) {
            // Simulate network delay
            setTimeout(function() {
                // For demo purposes, always succeed
                // In production, send to Resend API or your backend
                console.log('Form data submitted:', formData);

                // Example Resend API integration:
                /*
                fetch('https://api.resend.com/emails', {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer YOUR_API_KEY',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        from: 'noreply@bogetveit-flis.no',
                        to: 'post@bogetveit-flis.no',
                        subject: `Ny henvendelse: ${formData.projectType}`,
                        html: `
                            <h2>Ny henvendelse fra nettsiden</h2>
                            <p><strong>Navn:</strong> ${formData.name}</p>
                            <p><strong>E-post:</strong> ${formData.email}</p>
                            <p><strong>Telefon:</strong> ${formData.phone}</p>
                            <p><strong>Adresse:</strong> ${formData.address || 'Ikke oppgitt'}</p>
                            <p><strong>Prosjekttype:</strong> ${formData.projectType}</p>
                            <p><strong>Ønsker befaring:</strong> ${formData.siteVisit ? 'Ja' : 'Nei'}</p>
                            <p><strong>Beskrivelse:</strong></p>
                            <p>${formData.description}</p>
                        `
                    })
                })
                .then(response => {
                    if (response.ok) resolve();
                    else reject(new Error('API error'));
                })
                .catch(reject);
                */

                resolve();
            }, 1500);
        });
    }

    // ===========================================
    // Intersection Observer for Animations
    // ===========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.service-card, .benefit-item, .value-card, .project-card').forEach(function(el) {
        observer.observe(el);
    });

    // ===========================================
    // Lazy Loading Images
    // ===========================================
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        document.querySelectorAll('img[loading="lazy"]').forEach(function(img) {
            img.src = img.src;
        });
    } else {
        // Fallback for older browsers
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');

        const lazyImageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src;
                    lazyImageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(function(img) {
            lazyImageObserver.observe(img);
        });
    }

    // ===========================================
    // Phone Number Click Tracking
    // ===========================================
    document.querySelectorAll('a[href^="tel:"]').forEach(function(link) {
        link.addEventListener('click', function() {
            // Track phone clicks (can integrate with analytics)
            console.log('Phone link clicked:', this.href);
        });
    });

    // ===========================================
    // Email Link Click Tracking
    // ===========================================
    document.querySelectorAll('a[href^="mailto:"]').forEach(function(link) {
        link.addEventListener('click', function() {
            // Track email clicks (can integrate with analytics)
            console.log('Email link clicked:', this.href);
        });
    });

    // ===========================================
    // Active Navigation Highlight
    // ===========================================
    function setActiveNav() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav__link');

        navLinks.forEach(function(link) {
            const href = link.getAttribute('href');
            link.classList.remove('nav__link--active');

            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                link.classList.add('nav__link--active');
            }
        });
    }

    setActiveNav();

    // ===========================================
    // Scroll to hash on page load
    // ===========================================
    if (window.location.hash) {
        setTimeout(function() {
            const target = document.querySelector(window.location.hash);
            if (target) {
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }, 100);
    }

})();
