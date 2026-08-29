const glow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', e => { glow.style.left = `${e.clientX}px`; glow.style.top = `${e.clientY}px`; });

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const projectPreviews = {
  ima: { src: 'ima-cover-art.png', alt: 'Editorial artwork about IMA\'s agricultural system', label: 'IMA', title: 'IMA — Agricultural Registry', description: 'Redesign of a public system that organizes properties, producers, and inspection workflows.', tags: ['Product Design', 'Design System', 'Figma', 'React'] },
  alumni: { src: 'alumni-cover-art.png', alt: 'Editorial artwork about the Alumni ESAL UFLA community', label: 'ALUMNI', title: 'Alumni ESAL UFLA', description: 'A platform that brings alumni together and turns connection into impact for education.', tags: ['UX/UI Design', 'Web Design', 'Community'] },
  eco: { src: 'eco-cover-art.png', alt: 'Editorial artwork about forests, data, and carbon credits', label: 'ECO', title: 'Eco — Carbon Credits', description: 'A B2B marketplace connecting conservation, businesses, and environmental impact with transparency.', tags: ['Product Design', 'Web B2B', 'Marketplace'] }
};
Object.entries(projectPreviews).forEach(([project, preview]) => {
  const visual = document.querySelector(`[data-project="${project}"] .project-visual`);
  if (!visual) return;
  const label = visual.querySelector('.case-preview-label');
  const image = new Image();
  image.className = 'project-preview';
  image.src = preview.src;
  image.alt = preview.alt;
  const action = document.createElement('a');
  action.className = 'project-preview-action';
  action.href = `case.html?project=${project}`;
  action.setAttribute('aria-label', `Open ${preview.title} case study`);
  action.innerHTML = `<b aria-hidden="true">↗</b>`;
  visual.replaceChildren(image, action);
  const card = visual.closest('.project');
  card.querySelector('.project-info')?.remove();
  const heading = document.createElement('div');
  heading.className = 'project-card-heading';
  heading.innerHTML = `<span>${project === 'ima' ? '01' : project === 'alumni' ? '02' : '03'} / PROJECT</span><h3>${preview.title}</h3>`;
  const footer = document.createElement('div');
  footer.className = 'project-card-footer';
  footer.innerHTML = `<p>${preview.description}</p><div>${preview.tags.map(tag => `<i>${tag}</i>`).join('')}</div>`;
  visual.before(heading);
  visual.after(footer);
});

const rotatingPhrase = document.querySelector('.rotating-phrase');
if (rotatingPhrase) {
  const phrases = [
    'every detail creates impact.',
    'every detail builds connection.',
    'every detail makes a difference.'
  ];
  let phraseIndex = 0;
  setInterval(() => {
    rotatingPhrase.classList.add('is-changing');
    setTimeout(() => {
      phraseIndex = (phraseIndex + 1) % phrases.length;
      rotatingPhrase.textContent = phrases[phraseIndex];
      rotatingPhrase.classList.remove('is-changing');
    }, 350);
  }, 5000);
}

document.querySelectorAll('.magnetic').forEach(el => {
  el.addEventListener('pointermove', e => {
    const r = el.getBoundingClientRect();
    el.style.transform = `translate(${(e.clientX-r.left-r.width/2)*.12}px, ${(e.clientY-r.top-r.height/2)*.12}px)`;
  });
  el.addEventListener('pointerleave', () => el.style.transform = '');
});

const cases = {
  ima: { tag:'PRODUCT DESIGN · DESIGN SYSTEM', title:'IMA — Agricultural Registry', text:'A government system for the Minas Gerais Agricultural Institute. The project organized complex workflows and created a consistent visual foundation that improves product velocity and user clarity.', stats:['3,500+ Figma connections','800+ variables','45+ components'] },
  alumni: { tag:'UX/UI · COMMUNITY', title:'Alumni ESAL UFLA', text:'A digital experience designed to bring generations of alumni together and turn connection into tangible impact for education.', stats:['R$2M+ raised','Active community','Responsive experience'] },
  eco: { tag:'PRODUCT DESIGN · WEB', title:'Eco — Carbon Credits', text:'A complete carbon-credit trading platform featuring a marketplace, impact metrics, and transparent transactions.', stats:['8.5M+ t CO₂','Real-time dashboard','Certified marketplace'] }
};
const modal = document.querySelector('.case-modal');
document.querySelectorAll('.project-trigger').forEach(btn => btn.addEventListener('click', () => {
  const data = cases[btn.closest('.project').dataset.project];
  modal.querySelector('.modal-tag').textContent = data.tag;
  modal.querySelector('h2').textContent = data.title;
  modal.querySelector('p').textContent = data.text;
  modal.querySelector('.modal-stats').innerHTML = data.stats.map(item => `<span>${item}</span>`).join('');
  modal.showModal();
}));
modal.querySelector('.modal-close').addEventListener('click', () => modal.close());
modal.addEventListener('click', e => { if (e.target === modal) modal.close(); });
