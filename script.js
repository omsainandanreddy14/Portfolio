// ==================== PARTICLE GENERATION ====================
function createParticles() {
  const container = document.getElementById('particleContainer');
  if (!container) return;

  const particleCount = 30;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    const randomX = Math.random() * window.innerWidth;
    const randomDelay = Math.random() * 10;
    const randomDuration = 15 + Math.random() * 10;
    const randomOpacity = 0.3 + Math.random() * 0.5;

    particle.style.left = randomX + 'px';
    particle.style.bottom = '-10px';
    particle.style.animationDelay = randomDelay + 's';
    particle.style.animationDuration = randomDuration + 's';
    particle.style.opacity = randomOpacity;
    particle.style.width = (1 + Math.random() * 3) + 'px';
    particle.style.height = particle.style.width;
    particle.style.boxShadow = `0 0 ${5 + Math.random() * 10}px rgba(56, 189, 248, 0.8)`;

    container.appendChild(particle);
  }
}

// Create particles on page load
createParticles();

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

// ==================== CONTACT FORM HANDLER ====================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    const statusEl = document.getElementById('contactStatus');
    const btn = contactForm.querySelector('button');

    // Create mailto link with form data
    const mailtoLink = `mailto:omsainandanreddy@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

    // UX: show feedback immediately before the browser opens the email client
    if (statusEl) {
      statusEl.textContent = 'Opening your email client with your message...';
      statusEl.classList.add('show');
    }
    if (btn) {
      btn.disabled = true;
      btn.style.opacity = '0.85';
    }

    // Use a short delay so the user can see the status update
    setTimeout(() => {
      window.location.href = mailtoLink;
    }, 250);

    // Let the user send the email from their email client.
    // (When using `mailto:`, we can't guarantee the email was actually delivered.)
    setTimeout(() => {
      contactForm.reset();
      if (btn) {
        btn.disabled = false;
        btn.style.opacity = '';
      }
    }, 1500);
  });
}

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
  } else {
    header.style.boxShadow = 'none';
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
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinkItems.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.style.color = 'rgb(56, 189, 248)';
    } else {
      link.style.color = '';
    }
  });
});

// ==================== CONSOLE MESSAGE ====================
console.log('%cWelcome to Putluru Om Sai Nandan Reddy\'s Portfolio!', 'font-size: 20px; color: #0ea5e9; font-weight: bold;');
console.log('%cData Analyst | Computer Science Professional | Problem Solver', 'font-size: 14px; color: #38bdf8;');