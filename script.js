const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 10);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.2 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

const particlesContainer = document.getElementById('particles');
for (let i = 0; i < 75; i += 1) {
  const p = document.createElement('span');
  p.className = 'particle';
  p.style.left = `${Math.random() * 100}%`;
  p.style.top = `${Math.random() * 100}%`;
  p.style.animationDuration = `${12 + Math.random() * 18}s`;
  p.style.animationDelay = `${Math.random() * 10}s`;
  p.style.opacity = `${0.15 + Math.random() * 0.7}`;
  particlesContainer.appendChild(p);
}

const prices = document.querySelectorAll('.price');
const toggle = document.getElementById('priceToggle');
toggle.addEventListener('change', () => {
  prices.forEach((price) => {
    const value = toggle.checked ? price.dataset.year : price.dataset.month;
    price.textContent = `$${value}`;
  });
});

const counters = document.querySelectorAll('[data-count]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting || entry.target.dataset.done) return;
    entry.target.dataset.done = '1';
    const target = Number(entry.target.dataset.count);
    let current = 0;
    const step = Math.max(1, Math.round(target / 45));
    const tick = () => {
      current += step;
      if (current >= target) current = target;
      entry.target.textContent = `${current}${entry.target.dataset.suffix || ''}`;
      if (current < target) requestAnimationFrame(tick);
    };
    tick();
  });
}, { threshold: 0.5 });

counters.forEach((counter) => counterObserver.observe(counter));

const tabs = document.querySelectorAll('.tab');
tabs.forEach((tab) => tab.addEventListener('click', () => {
  tabs.forEach((t) => t.classList.remove('active'));
  tab.classList.add('active');
}));

window.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth) * 100;
  const y = (e.clientY / window.innerHeight) * 100;
  document.documentElement.style.setProperty('--mx', `${x}%`);
  document.documentElement.style.setProperty('--my', `${y}%`);
});
