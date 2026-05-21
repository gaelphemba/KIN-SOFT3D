/* Header scroll effect */
const header = document.getElementById('header');
const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');
const navLinks = siteNav ? siteNav.querySelectorAll('a') : [];
const navDropdown = document.getElementById('navDropdown');
const domainesToggle = document.getElementById('domainesToggle');

if (header) {
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 60);
    });
}

/* Domaines dropdown */
if (domainesToggle && navDropdown) {
    domainesToggle.addEventListener('click', e => {
        e.stopPropagation();
        const open = navDropdown.classList.toggle('open');
        domainesToggle.setAttribute('aria-expanded', open);
    });

    document.addEventListener('click', () => {
        navDropdown.classList.remove('open');
        domainesToggle.setAttribute('aria-expanded', 'false');
    });
}

/* Mobile nav */
if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
        const open = siteNav.classList.toggle('open');
        navToggle.classList.toggle('open', open);
        navToggle.setAttribute('aria-expanded', open);
    });
}

function closeMobileNav() {
    if (!siteNav || !navToggle) return;
    siteNav.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    if (navDropdown) navDropdown.classList.remove('open');
    if (domainesToggle) domainesToggle.setAttribute('aria-expanded', 'false');
}

navLinks.forEach(link => {
    link.addEventListener('click', closeMobileNav);
});

/* Active nav link on scroll (home page only) */
const sections = document.querySelectorAll('section[id], .domaine-card[id]');

function setActiveNav() {
    if (!sections.length || !siteNav) return;
    const scrollY = window.scrollY + 120;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollY >= top && scrollY < top + height) {
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
            if (domainesToggle) {
                const domainIds = ['domaines', 'loisir', 'education', 'formation', 'tourisme', 'locations'];
                domainesToggle.classList.toggle('active', domainIds.includes(id));
            }
        }
    });
}

if (sections.length) {
    window.addEventListener('scroll', setActiveNav);
    setActiveNav();
}

/* Reveal on scroll */
const revealEls = document.querySelectorAll('.reveal');

if (revealEls.length) {
    const revealObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach(el => revealObserver.observe(el));
}

/* Video modal */
const videoModal = document.getElementById('videoModal');
const openVideoBtn = document.getElementById('openVideo');
const closeVideoBackdrop = document.getElementById('closeVideo');
const closeVideoBtn = document.getElementById('closeVideoBtn');
const trailerVideo = document.getElementById('trailerVideo');

if (videoModal && trailerVideo) {
    function openModal() {
        videoModal.classList.add('open');
        videoModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        trailerVideo.play().catch(() => {});
    }

    function closeModal() {
        videoModal.classList.remove('open');
        videoModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        trailerVideo.pause();
        trailerVideo.currentTime = 0;
    }

    if (openVideoBtn) openVideoBtn.addEventListener('click', openModal);
    if (closeVideoBackdrop) closeVideoBackdrop.addEventListener('click', closeModal);
    if (closeVideoBtn) closeVideoBtn.addEventListener('click', closeModal);

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && videoModal.classList.contains('open')) {
            closeModal();
        }
    });
}

/* Contact form feedback */
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', e => {
        e.preventDefault();
        const btn = e.target.querySelector('button[type="submit"]');
        const original = btn.textContent;
        btn.textContent = 'Message envoyé ✓';
        btn.disabled = true;
        setTimeout(() => {
            btn.textContent = original;
            btn.disabled = false;
            e.target.reset();
        }, 2500);
    });
}
