// ==================== PARTICLE GENERATION (tsParticles) ====================
if (typeof tsParticles !== 'undefined') {
  tsParticles.load("particleContainer", {
    fpsLimit: 60,
    interactivity: {
      detectsOn: "window",
      events: {
        onClick: { enable: true, mode: "push" },
        onHover: { enable: true, mode: "grab", parallax: { enable: true, force: 60, smooth: 10 } },
        resize: true
      },
      modes: {
        push: { quantity: 4 },
        grab: { distance: 200, links: { opacity: 0.8, color: "#38bdf8" } }
      }
    },
    particles: {
      color: { value: "#0ea5e9" },
      links: {
        color: "#38bdf8",
        distance: 150,
        enable: true,
        opacity: 0.4,
        width: 1
      },
      collisions: { enable: false },
      move: {
        direction: "none",
        enable: true,
        outModes: { default: "bounce" },
        random: true,
        speed: 1.5,
        straight: false
      },
      number: { density: { enable: true, area: 800 }, value: 80 },
      opacity: {
        value: 0.6,
        animation: { enable: true, speed: 1, minimumValue: 0.1 }
      },
      shape: { type: "circle" },
      size: {
        value: { min: 1, max: 3 },
        animation: { enable: true, speed: 2, minimumValue: 0.5 }
      }
    },
    detectRetina: true
  });
}

// ==================== TYPING ANIMATION ====================
const typingTexts = ["Impact-Driven Data Analyst", "Solution-Oriented Thinker", "Machine Learning Enthusiast"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.querySelector(".typing-text");
const typingSpeed = 100;
const delayBetweenTexts = 2000;

function typeAnimation() {
  const currentText = typingTexts[textIndex];

  if (!isDeleting && charIndex <= currentText.length) {
    typingElement.textContent = currentText.slice(0, charIndex);
    charIndex++;
    setTimeout(typeAnimation, typingSpeed);
  } else if (isDeleting && charIndex >= 0) {
    typingElement.textContent = currentText.slice(0, charIndex);
    charIndex--;
    setTimeout(typeAnimation, typingSpeed / 2);
  } else if (!isDeleting && charIndex > currentText.length) {
    isDeleting = true;
    setTimeout(typeAnimation, delayBetweenTexts);
  } else if (isDeleting && charIndex < 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % typingTexts.length;
    charIndex = 0;
    setTimeout(typeAnimation, 500);
  }
}

typeAnimation();

// ==================== CONTACT FORM HANDLER (Formspree) ====================
(function () {
  var form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var btn = document.getElementById('contactSubmitBtn');
    var status = document.getElementById('formStatus');

    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    status.className = 'cp-status';
    status.style.display = 'none';

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    })
      .then(function (r) {
        if (r.ok) {
          status.className = 'cp-status success';
          status.style.display = 'block';
          status.innerHTML =
            '<i class="fas fa-check-circle" style="margin-right:8px;font-size:1.1rem;"></i>' +
            "Message sent successfully! I'll get back to you soon 🎉";
          form.reset();
          btn.innerHTML = '<i class="fas fa-check"></i> Sent!';
          setTimeout(function () {
            btn.disabled = false;
            btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
          }, 4500);
        } else {
          throw new Error('Server error');
        }
      })
      .catch(function () {
        status.className = 'cp-status error';
        status.style.display = 'block';
        status.innerHTML =
          '<i class="fas fa-exclamation-triangle" style="margin-right:8px;"></i>' +
          'Oops! Something went wrong. Please try again.';
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      });
  });
})();

// ==================== MOBILE MENU TOGGLE ====================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navLinkItems = document.querySelectorAll('.nav-link');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
  });

  navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
    });
  });
}

// ==================== SCROLL ANIMATIONS ====================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

const animatedElements = document.querySelectorAll(
  '.skill-card, .project-card, .cert-card, .achievement-card, .education-card, .stat, .about-card, .info-card, .training-card'
);

animatedElements.forEach(element => {
  element.style.opacity = '0';
  element.style.transform = 'translateY(30px)';
  element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(element);
});

// ==================== NAVBAR BACKGROUND ON SCROLL ====================
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.style.boxShadow = '0 5px 30px rgba(14, 165, 233, 0.2)';
    header.classList.add('scrolled');
  } else {
    header.style.boxShadow = 'none';
    header.classList.remove('scrolled');
  }
});

// ==================== SMOOTH SCROLL FOR ANCHOR LINKS ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 70;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ==================== ENHANCED PROJECT CARD INTERACTIONS ====================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
  card.addEventListener('mouseenter', function () {
    this.style.borderColor = 'rgba(56, 189, 248, 1)';
  });

  card.addEventListener('mouseleave', function () {
    this.style.borderColor = 'rgba(56, 189, 248, 0.2)';
  });
});

// ==================== STATS COUNTER ANIMATION ====================
const stats = document.querySelectorAll('.stat h3');
let statsAnimated = false;

const statsObserver = new IntersectionObserver(function (entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting && !statsAnimated) {
      statsAnimated = true;
      stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        const increment = target / 50;
        let current = 0;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            stat.textContent = target + (stat.textContent.includes('+') ? '+' : '');
            clearInterval(timer);
          } else {
            stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : '');
          }
        }, 30);
      });
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.about-stats');
if (statsSection) {
  statsObserver.observe(statsSection);
}

// ==================== ACTIVE NAV LINK INDICATOR ====================
window.addEventListener('scroll', () => {
  let current = '';
  const sections = document.querySelectorAll('section');

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinkItems.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
});

// ==================== SKILL BAR ANIMATION ====================
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bars = entry.target.querySelectorAll('.skill-bar-fill');
      bars.forEach(bar => {
        const pct = bar.getAttribute('data-pct');
        bar.style.width = pct + '%';
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

const skillsSection = document.querySelector('.skills-section');
if (skillsSection) skillObserver.observe(skillsSection);


// ==================== CONSOLE MESSAGE ====================
console.log('%cWelcome to Putluru Om Sai Nandan Reddy\'s Portfolio!', 'font-size: 20px; color: #0ea5e9; font-weight: bold;');
console.log('%cData Analyst | Computer Science Professional | Problem Solver', 'font-size: 14px; color: #38bdf8;');