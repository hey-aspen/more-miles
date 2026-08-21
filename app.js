(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const nav = document.querySelector('[data-nav]');
  const menuButton = document.querySelector('.menu-toggle');

  const syncNav = () => nav?.classList.toggle('scrolled', window.scrollY > 24);
  syncNav();
  window.addEventListener('scroll', syncNav, { passive: true });

  menuButton?.addEventListener('click', () => {
    const open = nav.classList.toggle('menu-visible');
    document.body.classList.toggle('menu-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
  });
  nav?.querySelectorAll('nav a').forEach((link) => link.addEventListener('click', () => {
    nav.classList.remove('menu-visible');
    document.body.classList.remove('menu-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  }));

  if (!reduceMotion && window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });
    intro
      .to('.boot i', { width: '100%', duration: .65, ease: 'power2.inOut' })
      .to('.boot span', { y: -14, opacity: 0, duration: .35 }, '-=.05')
      .to('.boot', { yPercent: -100, duration: .9 }, '-=.12')
      .from('.title-line b', { yPercent: 120, duration: 1.15, stagger: .1 }, '-=.56')
      .from('.hero-kicker, .hero-bottom, .hero-index, .scroll-note', { y: 18, opacity: 0, duration: .75, stagger: .08 }, '-=.7');

    gsap.to('.hero-media img', {
      scale: 1.13,
      yPercent: 8,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 }
    });
    gsap.to('.hero-copy', {
      yPercent: 14,
      opacity: .1,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: '45% center', end: 'bottom top', scrub: 1 }
    });

    document.querySelectorAll('[data-split]').forEach((heading) => {
      gsap.from(heading, {
        y: 70,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: { trigger: heading, start: 'top 82%', once: true }
      });
    });

    gsap.from('.story-deck', {
      y: 35, opacity: 0, duration: .9,
      scrollTrigger: { trigger: '.story-head', start: 'top 75%', once: true }
    });
    gsap.from('.story-art', {
      clipPath: 'inset(18% 8% 18% 8%)',
      duration: 1.35,
      ease: 'power3.inOut',
      scrollTrigger: { trigger: '.story-art', start: 'top 83%', once: true }
    });
    gsap.to('.infinity-mascot', {
      yPercent: -9,
      rotation: 2,
      ease: 'none',
      scrollTrigger: { trigger: '.story-art', start: 'top bottom', end: 'bottom top', scrub: 1.2 }
    });

    const counter = document.querySelector('[data-count]');
    if (counter) {
      const state = { value: 0 };
      gsap.to(state, {
        value: Number(counter.dataset.count),
        duration: 1.8,
        ease: 'power2.out',
        onUpdate: () => { counter.textContent = state.value.toFixed(1); },
        scrollTrigger: { trigger: counter, start: 'top 86%', once: true }
      });
    }

    gsap.from('.screen-panel', {
      y: 110,
      rotation: (index) => [-2.5, 2, -1][index] || 0,
      opacity: 0,
      duration: 1.2,
      stagger: .15,
      ease: 'power4.out',
      scrollTrigger: { trigger: '.screen-gallery', start: 'top 80%', once: true }
    });
    gsap.to('.phone-shot img', {
      yPercent: -20,
      ease: 'none',
      scrollTrigger: { trigger: '.screen-gallery', start: 'top bottom', end: 'bottom top', scrub: 1.1 }
    });
    gsap.to('.finish-mascot', {
      yPercent: -7,
      rotation: 3,
      ease: 'none',
      scrollTrigger: { trigger: '.finish-stage', start: 'top bottom', end: 'bottom top', scrub: 1 }
    });
    gsap.from('.privacy-facts span', {
      x: 38, opacity: 0, stagger: .1, duration: .7,
      scrollTrigger: { trigger: '.privacy-facts', start: 'top 84%', once: true }
    });
    gsap.to('.finale-track', {
      rotationZ: 9,
      xPercent: -8,
      ease: 'none',
      scrollTrigger: { trigger: '.finale', start: 'top bottom', end: 'bottom top', scrub: 1.2 }
    });

    document.querySelectorAll('.tilt-card').forEach((card) => {
      card.addEventListener('pointermove', (event) => {
        const rect = card.getBoundingClientRect();
        const rx = ((event.clientY - rect.top) / rect.height - .5) * -4;
        const ry = ((event.clientX - rect.left) / rect.width - .5) * 4;
        gsap.to(card, { rotateX: rx, rotateY: ry, duration: .45, ease: 'power2.out', overwrite: true });
      });
      card.addEventListener('pointerleave', () => gsap.to(card, { rotateX: 0, rotateY: 0, duration: .65, ease: 'power3.out' }));
    });

    document.querySelectorAll('.magnetic').forEach((element) => {
      element.addEventListener('pointermove', (event) => {
        const rect = element.getBoundingClientRect();
        gsap.to(element, { x: (event.clientX - rect.left - rect.width / 2) * .14, y: (event.clientY - rect.top - rect.height / 2) * .14, duration: .35 });
      });
      element.addEventListener('pointerleave', () => gsap.to(element, { x: 0, y: 0, duration: .55, ease: 'elastic.out(1,.35)' }));
    });
  } else {
    document.querySelector('.boot')?.remove();
  }

  const cursor = document.querySelector('.cursor');
  if (cursor && window.matchMedia('(pointer: fine)').matches && !reduceMotion) {
    window.addEventListener('pointermove', (event) => {
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;
      cursor.style.opacity = '1';
    });
    document.querySelectorAll('a, button, .tilt-card').forEach((target) => {
      target.addEventListener('pointerenter', () => cursor.classList.add('active'));
      target.addEventListener('pointerleave', () => cursor.classList.remove('active'));
    });
  }
})();
