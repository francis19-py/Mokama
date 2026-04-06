/* ============================================================
   MOKAMA ENTERPRISE LIMITED — Main JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- NAVBAR SCROLL ---- */
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    if (window.scrollY > 400) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---- HAMBURGER MENU ---- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  /* ---- ACTIVE NAV LINK ON SCROLL ---- */
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a');

  const observerNav = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navItems.forEach(a => a.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observerNav.observe(s));

  /* ---- HERO PARTICLES ---- */
  const particlesContainer = document.getElementById('particles');
  const particleCount = 30;

  for (let i = 0; i < particleCount; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const size = Math.random() * 8 + 3;
    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      animation-duration: ${Math.random() * 12 + 8}s;
      animation-delay: ${Math.random() * 10}s;
    `;
    particlesContainer.appendChild(p);
  }

  /* ---- SCROLL ANIMATIONS (AOS-like) ---- */
  const aosElements = document.querySelectorAll('[data-aos]');

  const aosObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute('data-aos-delay') || 0;
        setTimeout(() => {
          entry.target.classList.add('aos-animate');
        }, parseInt(delay));
        aosObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  aosElements.forEach(el => {
    el.classList.add('aos-animate');
    aosObserver.observe(el);
  });

  /* ---- COUNTER ANIMATION ---- */
  const counters = document.querySelectorAll('.stat-num');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'));
        const duration = 1800;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = Math.floor(current);
        }, 16);

        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

  /* ---- SMOOTH SCROLL FOR NAV LINKS ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ---- CONTACT FORM ---- */
  const form = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      btn.disabled = true;

      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        btn.disabled = false;
        form.reset();
        formSuccess.classList.add('show');
        setTimeout(() => formSuccess.classList.remove('show'), 5000);
      }, 1800);
    });
  }

  /* ---- TYPING EFFECT FOR HERO TAGLINE ---- */
  const tagline = document.querySelector('.hero-tagline');
  if (tagline) {
    const text = tagline.textContent;
    tagline.textContent = '';
    tagline.style.opacity = '1';
    tagline.style.animation = 'none';

    let i = 0;
    const typeSpeed = 40;

    function typeWriter() {
      if (i < text.length) {
        tagline.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, typeSpeed);
      }
    }

    // Start typing after hero title animations
    setTimeout(typeWriter, 1200);
  }

  /* ---- NAVBAR LINK ACTIVE STYLE ---- */
  const style = document.createElement('style');
  style.textContent = `
    .nav-links a.active {
      color: var(--gold) !important;
    }
    .nav-links a.active::after {
      width: 100% !important;
    }
  `;
  document.head.appendChild(style);

  /* ---- SERVICE CARD TILT EFFECT ---- */
  const serviceCards = document.querySelectorAll('.service-card');

  serviceCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;
      card.style.transform = `translateY(-6px) perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ---- CLIENT CARD HOVER PULSE ---- */
  const clientCards = document.querySelectorAll('.client-card');

  clientCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const icon = card.querySelector('.client-icon');
      icon.style.transform = 'scale(1.15) rotate(-5deg)';
      icon.style.transition = 'transform 0.3s ease';
    });
    card.addEventListener('mouseleave', () => {
      const icon = card.querySelector('.client-icon');
      icon.style.transform = '';
    });
  });

  /* ---- SCROLL PROGRESS BAR ---- */
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed;
    top: 0; left: 0;
    height: 3px;
    background: linear-gradient(90deg, #F5A623, #ffd166);
    z-index: 9999;
    width: 0%;
    transition: width 0.1s linear;
  `;
  document.body.prepend(progressBar);

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = `${progress}%`;
  });

  /* ---- SECTION ENTRANCE GLOW ---- */
  const sectionHeaders = document.querySelectorAll('.section-header');

  const glowObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelector('.section-divider').style.animation = 'expandDivider 0.6s ease forwards';
      }
    });
  }, { threshold: 0.5 });

  sectionHeaders.forEach(h => glowObserver.observe(h));

  const dividerStyle = document.createElement('style');
  dividerStyle.textContent = `
    @keyframes expandDivider {
      from { width: 0; }
      to { width: 60px; }
    }
    .section-divider { width: 0; }
  `;
  document.head.appendChild(dividerStyle);

});
