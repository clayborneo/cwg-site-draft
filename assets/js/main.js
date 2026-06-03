document.addEventListener('DOMContentLoaded', () => {
  const backBtn = document.createElement('button');
  backBtn.className = 'back-to-top';
  backBtn.setAttribute('aria-label', 'Back to top');
  backBtn.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>';
  document.body.appendChild(backBtn);
  backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  window.addEventListener('scroll', () => {
    backBtn.classList.toggle('visible', window.scrollY > 600);
  }, { passive: true });


  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
  }

  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === 'index.html' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  const heroPlay = document.getElementById('hero-play');
  const heroWrapper = document.getElementById('hero-video');
  if (heroPlay && heroWrapper) {
    heroPlay.addEventListener('click', () => {
      const video = heroWrapper.querySelector('.hero-video-player');
      const poster = heroWrapper.querySelector('.hero-video-poster');
      const overlay = heroWrapper.querySelector('.hero-video-overlay');
      if (video) {
        video.style.display = 'block';
        if (poster) poster.style.display = 'none';
        if (overlay) overlay.style.display = 'none';
        video.play();
      }
    });
  }

  const modal = document.getElementById('bio-modal');
  if (modal) {
    const photo = modal.querySelector('.bio-modal-photo');
    const name = modal.querySelector('.bio-modal-name');
    const title = modal.querySelector('.bio-modal-title');
    const creds = modal.querySelector('.bio-modal-creds');
    const body = modal.querySelector('.bio-modal-body');
    const closeBtn = modal.querySelector('.bio-modal-close');

    function openBio(card) {
      const bio = card.querySelector('.bio-text');
      if (!bio) return;
      name.textContent = card.dataset.name || '';
      title.textContent = card.dataset.title || '';
      creds.textContent = card.dataset.creds || '';
      const photoUrl = card.dataset.photo;
      if (photoUrl) {
        photo.style.backgroundImage = `url('${photoUrl}')`;
        photo.innerHTML = '';
      } else {
        photo.style.backgroundImage = '';
        photo.innerHTML = '<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z"/></svg>';
      }
      body.innerHTML = bio.innerHTML;
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeBio() {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
    document.querySelectorAll('.team-card[data-name]').forEach(card => {
      card.addEventListener('click', () => openBio(card));
      card.style.cursor = 'pointer';
      const url = card.dataset.photo;
      const photoEl = card.querySelector('.team-photo');
      if (url && photoEl) {
        const img = new Image();
        img.onload = () => {
          photoEl.style.backgroundImage = `url('${url}')`;
          photoEl.classList.remove('placeholder');
          photoEl.innerHTML = '';
        };
        img.src = url;
      }
    });
    closeBtn.addEventListener('click', closeBio);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeBio(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.classList.contains('open')) closeBio(); });
  }
});
