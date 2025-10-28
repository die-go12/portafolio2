window.addEventListener('DOMContentLoaded', () => {
  
  // ---- Scroll suave
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').substring(1);
      const el = document.getElementById(id);
      if(el){
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---- Footer year
  const yearEl = document.getElementById('year');
  if(yearEl){
    yearEl.textContent = new Date().getFullYear();
  }

// ---- Formulario mailto
window.sendMail = function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  // Construimos el cuerpo del correo con saltos de línea \n
  const body = `Hola, soy ${name} (${email}).\n\n${message}`;

  // Codificamos todo el cuerpo para que funcione correctamente en mailto
  window.location.href = `mailto:juan.lopez.v@upch.pe?subject=Contacto desde mi web&body=${encodeURIComponent(body)}`;

  return false;
}


  // ---- Animaciones hero y secciones
  const heroItems = document.querySelectorAll('.hero-content .title, .hero-content .lead, .hero-content .cta');
  heroItems.forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), i * 350);
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('section').forEach(sec => observer.observe(sec));

  // Parallax ligero hero
  const heroBg = document.querySelector('.hero-bg');
  if(heroBg){
    window.addEventListener('mousemove', e => {
      const x = (e.clientX / window.innerWidth - 0.5) * 10;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      heroBg.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  // ---- Skills 3D Cloud (TagCloud)
  const skills = [
    'Python', 'Java', 'JavaScript', 'FastAPI', 'Spring Boot', 
    'SQL', 'PostgreSQL', 'Git', 'Docker', 'Linux',
    'HTML', 'CSS', 'React', 'Node.js', 'REST API',
    'OOP', 'Testing', 'Postman', 'Async/Await', 'Redis'
  ];

  const cloudEl = document.getElementById('skillCloud');
  if(cloudEl){
    const radius = 180;
    const fragment = document.createDocumentFragment();
    const len = skills.length;

    skills.forEach((skill, i) => {
      const span = document.createElement('span');
      span.textContent = skill;

      const phi = Math.acos(-1 + (2*i+1)/len);
      const theta = Math.sqrt(len * Math.PI) * phi;
      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      span.dataset.x = x;
      span.dataset.y = y;
      span.dataset.z = z;

      span.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
      fragment.appendChild(span);
    });

    cloudEl.appendChild(fragment);

    let angleX = 0;
    let angleY = 0;
    const speed = 0.0015;

    function animateCloud(){
      angleX += speed;
      angleY += speed;

      cloudEl.querySelectorAll('span').forEach(span => {
        const x = parseFloat(span.dataset.x);
        const y = parseFloat(span.dataset.y);
        const z = parseFloat(span.dataset.z);

        const cosX = Math.cos(angleX);
        const sinX = Math.sin(angleX);
        const cosY = Math.cos(angleY);
        const sinY = Math.sin(angleY);

        const y1 = y * cosX - z * sinX;
        const z1 = y * sinX + z * cosX;
        const x1 = x * cosY + z1 * sinY;
        const z2 = -x * sinY + z1 * cosY;

        span.style.transform = `translate3d(${x1}px, ${y1}px, ${z2}px)`;
      });

      requestAnimationFrame(animateCloud);
    }

    animateCloud();
  }

  // ---- Lightbox para galería
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.querySelector('.lightbox-close');
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const imgSrc = item.getAttribute('data-img');
      lightboxImg.src = imgSrc;
      lightbox.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  });

  if(lightboxClose){
    lightboxClose.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      lightbox.style.display = 'none';
      document.body.style.overflow = 'auto';
    });
  }

  // Cerrar con clic fuera de la imagen
  if(lightbox){
    lightbox.addEventListener('click', (e) => {
      if(e.target === lightbox){
        e.preventDefault();
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
  }

  // Cerrar con tecla ESC
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && lightbox.style.display === 'flex'){
      lightbox.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });

});

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrollPercent = scrollTop / docHeight;
  document.body.style.setProperty("--scroll-percent", scrollPercent);
});

// Mostrar la Tierra solo en la última sección
const lastSection = document.querySelector('section:last-of-type');
const earth = document.querySelector('.earth-bg');

window.addEventListener('scroll', () => {
  const sectionTop = lastSection.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  if (sectionTop < windowHeight * 0.75) {
    document.body.classList.add('show-earth');
  } else {
    document.body.classList.remove('show-earth');
  }
});

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.querySelector('.lightbox-close');
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();   // evita que abra otra página
    const imgSrc = item.getAttribute('data-img');
    lightboxImg.src = imgSrc;
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  });
});

if(lightboxClose){
  lightboxClose.addEventListener('click', () => {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
  });
}

// Cerrar haciendo clic fuera de la imagen
lightbox.addEventListener('click', (e) => {
  if(e.target === lightbox){
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});

// Cerrar con tecla ESC
document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape' && lightbox.style.display === 'flex'){
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});
