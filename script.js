/* ===================================================================
   BROTO — v2 script.js
   GSAP + ScrollTrigger: navegação do trilho, animações de entrada,
   dial de crescimento, carrossel de depoimentos e formulário.
   =================================================================== */

const PAGE_DATA = [
  { id: 'page-01', num: '01', label: 'Início' },
  { id: 'page-02', num: '02', label: 'Nossa frase' },
  { id: 'page-03', num: '03', label: 'Abordagem' },
  { id: 'page-04', num: '04', label: 'Especialidades' },
  { id: 'page-05', num: '05', label: 'Crescer' },
  { id: 'page-06', num: '06', label: 'Equipe' },
  { id: 'page-07', num: '07', label: 'Ambiente' },
  { id: 'page-08', num: '08', label: 'Depoimentos' },
  { id: 'page-09', num: '09', label: 'Guia' },
  { id: 'page-10', num: '10', label: 'Vamos começar' },
];

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

/* -------------------------------------------------------------
   1) Monta o trilho lateral (desktop) e o menu mobile
   ------------------------------------------------------------- */
function buildRailNav() {
  const railNav = document.getElementById('railNav');
  const mobileMenu = document.getElementById('mobileMenu');

  PAGE_DATA.forEach((p) => {
    const a = document.createElement('a');
    a.href = `#${p.id}`;
    a.className = 'rail-item';
    a.dataset.target = p.id;
    a.innerHTML = `<span class="rn">${p.num}</span><span class="rl">${p.label}</span>`;
    railNav.appendChild(a);

    const m = a.cloneNode(true);
    mobileMenu.appendChild(m);
  });

  // botão "agendar consulta" também no menu mobile
  const railCta = document.querySelector('.rail-cta');
  if (railCta) mobileMenu.appendChild(railCta.cloneNode(true));
}

/* -------------------------------------------------------------
   2) Estado ativo do trilho conforme o scroll (ScrollTrigger)
   ------------------------------------------------------------- */
function setupActiveTracking() {
  const railItems = document.querySelectorAll('.rail-item, .mobile-menu .rail-item');
  const mobilePageNum = document.getElementById('mobilePageNum');

  function setActive(pageId, num) {
    railItems.forEach((el) => {
      el.classList.toggle('active', el.dataset.target === pageId);
    });
    if (mobilePageNum) mobilePageNum.textContent = num;
  }

  PAGE_DATA.forEach((p) => {
    const section = document.getElementById(p.id);
    if (!section) return;

    if (window.ScrollTrigger) {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 55%',
        end: 'bottom 55%',
        onEnter: () => setActive(p.id, p.num),
        onEnterBack: () => setActive(p.id, p.num),
      });
    }
  });

  setActive(PAGE_DATA[0].id, PAGE_DATA[0].num);
}

/* -------------------------------------------------------------
   3) Animações de entrada por página (efeito "virar a página")
   ------------------------------------------------------------- */
function setupPageRevealAnimations() {
  const targets = document.querySelectorAll(
    '.page-title, .pillars, .spec-grid, .growth-wrap, .team-grid, .env-grid, .testi-wrap, .guide-grid, .form-card, .impact-page h2, .impact-page p'
  );

  if (!window.gsap || !window.ScrollTrigger) {
    targets.forEach((el) => el.classList.add('reveal-el'));
    return;
  }

  targets.forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 34, rotateX: reduceMotion ? 0 : -4 },
      {
        opacity: 1, y: 0, rotateX: 0,
        duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%' },
      }
    );
  });

  // cascata nos cartões dentro das grades
  document.querySelectorAll('.spec-grid, .pillars, .team-grid, .guide-grid').forEach((grid) => {
    gsap.fromTo(
      grid.children,
      { opacity: 0, y: 24 },
      {
        opacity: 1, y: 0, duration: .7, ease: 'power2.out', stagger: 0.08,
        scrollTrigger: { trigger: grid, start: 'top 85%' },
      }
    );
  });
}

/* -------------------------------------------------------------
   4) Animação de entrada do herói (linha a linha)
   ------------------------------------------------------------- */
function setupHeroIntro() {
  const badge = document.querySelector('.hero-page .badge-pill');
  const lines = document.querySelectorAll('.hero-title .line span');
  const lead = document.querySelector('.hero-page .lead');
  const ctas = document.querySelector('.hero-page .ctas');
  const visual = document.querySelector('.hero-visual');

  if (!window.gsap) return;

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  tl.fromTo(badge, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .5 })
    .fromTo(lines, { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: .9, stagger: .15 }, '-=.25')
    .fromTo(lead, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .7 }, '-=.5')
    .fromTo(ctas, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .7 }, '-=.5')
    .fromTo(visual, { opacity: 0, scale: .9 }, { opacity: 1, scale: 1, duration: .9 }, '-=.6');
}

/* -------------------------------------------------------------
   5) Dial de crescimento (seção "Crescer")
   ------------------------------------------------------------- */
function setupGrowthDial() {
  const phases = [
    { age: '0–2 anos', title: 'Primeiros passos.', text: 'Os primeiros exames, o primeiro sorriso, os primeiros passos. Acompanhamos cada marco com atenção redobrada.', pct: 20 },
    { age: '3–5 anos', title: 'Tempo de descobertas.', text: 'A curiosidade se expande — fala, imaginação e as primeiras perguntas sobre o mundo.', pct: 40 },
    { age: '6–9 anos', title: 'Construindo autonomia.', text: 'Escola, amizades e novas responsabilidades marcam essa fase de independência crescente.', pct: 60 },
    { age: '10–12 anos', title: 'Novos mundos.', text: 'O corpo começa a mudar. Um cuidado atento e sem julgamentos faz toda a diferença aqui.', pct: 80 },
    { age: 'Adolescência', title: 'Novas versões de si.', text: 'Identidade, autonomia e saúde emocional em primeiro plano — seguimos ao lado.', pct: 100 },
  ];

  const ruler = document.getElementById('ruler');
  const phaseAge = document.getElementById('phaseAge');
  const phaseTitle = document.getElementById('phaseTitle');
  const phaseText = document.getElementById('phaseText');
  const dialFill = document.getElementById('dialFill');
  const seedIcon = document.getElementById('seedIcon');
  const sparks = document.querySelectorAll('.spark');
  if (!ruler) return;

  const CIRC = 502.65;
  const seedScales = [0.6, 0.75, 0.9, 1.05, 1.2];

  phases.forEach((p, i) => {
    const b = document.createElement('button');
    b.className = 'tick' + (i === 0 ? ' active' : '');
    b.textContent = p.age;
    b.addEventListener('click', () => setPhase(i));
    ruler.appendChild(b);
  });

  function setPhase(i) {
    const p = phases[i];
    ruler.querySelectorAll('.tick').forEach((t, idx) => t.classList.toggle('active', idx === i));
    phaseAge.textContent = p.age;
    phaseTitle.textContent = p.title;
    phaseText.textContent = p.text;
    dialFill.style.strokeDashoffset = CIRC * (1 - p.pct / 100);
    if (seedIcon) seedIcon.style.transform = `scale(${seedScales[i]})`;
    sparks.forEach((s) => {
      const stage = parseInt(s.getAttribute('data-stage'), 10);
      s.classList.toggle('show', stage <= i);
    });
  }
  setPhase(0);
}

/* -------------------------------------------------------------
   6) Carrossel de depoimentos
   ------------------------------------------------------------- */
function setupTestimonials() {
  const track = document.getElementById('testiTrack');
  const dotsWrap = document.getElementById('testiDots');
  if (!track) return;

  const cards = track.children.length;
  const perView = () => (window.innerWidth >= 860 ? 1 : 1);

  function buildDots() {
    dotsWrap.innerHTML = '';
    const total = Math.max(1, cards - perView() + 1);
    for (let i = 0; i < total; i++) {
      const d = document.createElement('button');
      if (i === 0) d.classList.add('active');
      d.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(d);
    }
  }
  function goTo(i) {
    const cardWidth = track.children[0].getBoundingClientRect().width + 20;
    track.scrollTo({ left: i * cardWidth, behavior: reduceMotion ? 'auto' : 'smooth' });
    [...dotsWrap.children].forEach((d, idx) => d.classList.toggle('active', idx === i));
  }
  buildDots();
  window.addEventListener('resize', buildDots);
}

/* -------------------------------------------------------------
   7) Menu mobile (hamburger) + fechamento ao navegar
   ------------------------------------------------------------- */
function setupMobileMenu() {
  const burger = document.getElementById('burgerBtn');
  const menu = document.getElementById('mobileMenu');
  if (!burger) return;

  burger.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
  });
  menu.addEventListener('click', (e) => {
    if (e.target.closest('a')) {
      menu.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    }
  });
}

/* -------------------------------------------------------------
   8) Formulário de contato (sem envio real — landing estática)
   ------------------------------------------------------------- */
function setupForm() {
  const form = document.getElementById('clinicForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('formDefault').style.display = 'none';
    document.getElementById('formSuccess').classList.add('show');
  });
}

/* -------------------------------------------------------------
   Boot
   ------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  buildRailNav();
  setupActiveTracking();
  setupHeroIntro();
  setupPageRevealAnimations();
  setupGrowthDial();
  setupTestimonials();
  setupMobileMenu();
  setupForm();
});
