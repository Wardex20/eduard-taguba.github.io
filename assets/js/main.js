/* ============================================================
   LUXURY PORTFOLIO EFFECTS - REFINED
============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    // 1. INITIAL PAGE FADE IN
    setTimeout(() => {
        document.documentElement.classList.remove("is-loading");
        document.body.classList.add("page-loaded");
    }, 300);

    // 2. MOBILE MENU LOGIC (Fixed: One single instance)
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevents accidental double triggers
            menuToggle.classList.toggle('is-active');
            nav.classList.toggle('is-active');
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = nav.classList.contains('is-active') ? 'hidden' : '';
        });

        // Close menu when clicking links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('is-active');
                nav.classList.remove('is-active');
                document.body.style.overflow = '';
            });
        });
    }

    // 3. SCROLL REVEAL SYSTEM (Intersection Observer)
    const revealElements = document.querySelectorAll(
        ".section-title, p, .about-text, .about-media, .work-card, .skill, .skills-icons img, .contact-info, .contact-form"
    );

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("reveal-active");
            }
        });
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

    revealElements.forEach((el) => {
        el.classList.add("reveal");
        revealObserver.observe(el);
    });

    // 4. HERO ENTRANCE
    const hero = document.querySelector(".hero-section");
    if (hero) {
        [...hero.children].forEach((el, index) => {
            el.style.transitionDelay = `${index * 0.2 + 0.5}s`;
            el.classList.add("hero-reveal");
        });
    }

    // 5. TYPEWRITER EFFECT
    const textElement = document.getElementById("typewriter");
    if (textElement) {
        const words = ["DESIGNER", "VIDEO EDITOR"];
        let wordIndex = 0;
        let charIndex = words[0].length;
        let isDeleting = true;

        function type() {
            const currentWord = words[wordIndex];
            if (isDeleting) {
                textElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                textElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 40 : 80;
            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                typeSpeed = 1500;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 300;
            }
            setTimeout(type, typeSpeed);
        }
        setTimeout(type, 2000);
    }

    // 6. FORMSPREE SUBMISSION
    const form = document.getElementById("contact-form");
    const status = document.getElementById("form-status");
    const submitBtn = document.getElementById("submit-btn");

    if (form) {
        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            submitBtn.innerHTML = "SENDING...";
            submitBtn.disabled = true;

            const data = new FormData(event.target);
            fetch(event.target.action, {
                method: 'POST',
                body: data,
                headers: { 'Accept': 'application/json' }
            }).then(response => {
                if (response.ok) {
                    status.innerHTML = "SUCCESS! I'LL GET BACK TO YOU SOON.";
                    status.style.display = "block";
                    submitBtn.innerHTML = "SENT!";
                    form.reset();
                } else {
                    status.innerHTML = "ERROR: PLEASE TRY AGAIN.";
                    status.style.display = "block";
                    submitBtn.innerHTML = "SEND MESSAGE";
                    submitBtn.disabled = false;
                }
            }).catch(() => {
                status.innerHTML = "NETWORK ERROR.";
                status.style.display = "block";
                submitBtn.disabled = false;
            });
        });
    }
});