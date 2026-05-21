/* Header scroll effect */
const header = document.getElementById('header');
const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');
const navLinks = siteNav.querySelectorAll('a');

window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
});

/* Mobile nav */
navToggle.addEventListener('click', () => {
    const open = siteNav.classList.toggle('open');
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', open);
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        siteNav.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
    });
});

/* Active nav link on scroll */
const sections = document.querySelectorAll('section[id]');

function setActiveNav() {
    const scrollY = window.scrollY + 120;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollY >= top && scrollY < top + height) {
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
        }
    });
}

window.addEventListener('scroll', setActiveNav);
setActiveNav();

/* Reveal on scroll */
const revealEls = document.querySelectorAll('.reveal');

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

/* Video modal */
const videoModal = document.getElementById('videoModal');
const openVideoBtn = document.getElementById('openVideo');
const closeVideoBackdrop = document.getElementById('closeVideo');
const closeVideoBtn = document.getElementById('closeVideoBtn');
const trailerVideo = document.getElementById('trailerVideo');

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

openVideoBtn.addEventListener('click', openModal);
closeVideoBackdrop.addEventListener('click', closeModal);
closeVideoBtn.addEventListener('click', closeModal);

document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && videoModal.classList.contains('open')) {
        closeModal();
    }
});

/* Contact form feedback */
document.querySelector('.contact-form').addEventListener('submit', e => {
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
