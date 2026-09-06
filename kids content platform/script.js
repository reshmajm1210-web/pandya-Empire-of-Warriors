(() => {
  const nav = document.querySelector('.site-header');
  const toggle = document.querySelector('.menu-toggle');
  const links = document.querySelector('.nav-links');
  const toast = document.querySelector('.toast');
  let toastTimer;

  const notify = (message) => {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
  };

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });

  document.querySelectorAll('.nav-links a').forEach((link) => link.addEventListener('click', () => {
    links.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));

  document.querySelectorAll('a[href^="#"]').forEach((link) => link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) { event.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  }));

  document.querySelectorAll('.category-card').forEach((card) => card.addEventListener('click', () => {
    notify(`${card.dataset.category} adventures are on their way — explore the featured picks!`);
    document.querySelector('#featured').scrollIntoView({ behavior: 'smooth' });
  }));

  document.querySelectorAll('.age-card').forEach((card) => card.addEventListener('click', () => {
    document.querySelectorAll('.age-card').forEach((item) => item.classList.remove('active'));
    card.classList.add('active');
    notify(`${card.dataset.age} selected — age-based discovery is part of our future vision.`);
  }));

  document.querySelectorAll('.play').forEach((button) => button.addEventListener('click', () => {
    notify(`“${button.dataset.title}” is a prototype preview. Full play experiences are coming soon!`);
  }));

  document.querySelectorAll('.create-trigger').forEach((button) => button.addEventListener('click', () => {
    notify('Creator features are coming soon. We can’t wait to see what you share!');
  }));

  addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 8), { passive: true });
})();
