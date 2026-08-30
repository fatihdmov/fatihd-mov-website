// ==========================================================
// fatihd.mov — main.js
// ==========================================================

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initReveal();
  initTyping();
  renderLatestDrop();
  renderLibrary();
  renderPrompts();
  initContactForm();
  initServicesAccordion();
  initProcessAnimation();
  initSpotlight('.spot');
  initHeroParallax();
});

/* ---------------- Inline icon set (feather-style, currentColor) ---------------- */
const ICONS = {
  external: '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>',
  download: '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
  copy: '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
  check: '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  instagram: '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>',
  search: '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
  link: '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
  arrowRight: '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
  file: '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>'
};
function icon(name){ return ICONS[name] || ''; }

/* ---------------- Mobile nav ---------------- */
function initNav(){
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if(!toggle || !links) return;
  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
    toggle.textContent = links.classList.contains('open') ? '✕' : '☰';
  });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    links.classList.remove('open');
    toggle.textContent = '☰';
  }));
}

/* ---------------- Scroll reveal ---------------- */
function initReveal(){
  const items = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting){
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach(el => io.observe(el));

  // Güvenlik ağı: herhangi bir nedenle intersection tetiklenmezse
  // (ör. çok hızlı scroll, tarayıcı garipliği) içerik kalıcı görünmez kalmasın.
  setTimeout(() => {
    document.querySelectorAll('.reveal:not(.in)').forEach(el => el.classList.add('in'));
  }, 2500);
}

/* ---------------- Mouse spotlight (premium hover glow) ---------------- */
function initSpotlight(selector){
  if(matchMedia('(pointer: coarse)').matches) return; // dokunmatikte anlamsız
  document.querySelectorAll(selector).forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', ((e.clientX - rect.left) / rect.width) * 100 + '%');
      card.style.setProperty('--my', ((e.clientY - rect.top) / rect.height) * 100 + '%');
    });
  });
}

/* ---------------- Hero portrait parallax ---------------- */
function initHeroParallax(){
  const hero = document.querySelector('.hero');
  const portrait = document.querySelector('.portrait-frame');
  if(!hero || !portrait) return;
  if(matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if(matchMedia('(pointer: coarse)').matches) return;

  hero.addEventListener('mousemove', (e) => {
    const r = hero.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    portrait.style.transform = `translate(${x * 16}px, ${y * 16}px)`;
  });
  hero.addEventListener('mouseleave', () => { portrait.style.transform = ''; });
}

/* ---------------- Hero terminal typing effect ---------------- */
function initTyping(){
  const el = document.getElementById('typed-line');
  if(!el) return;
  const phrases = [
    'AI Agent geliştiriyorum.',
    'Otomasyon kılavuzları paylaşıyorum.',
    'Instagram\'da AI içerikleri üretiyorum.',
    'Markalarla iş birliği yapıyorum.'
  ];
  let pIndex = 0, cIndex = 0, deleting = false;

  function tick(){
    const current = phrases[pIndex];
    if(!deleting){
      cIndex++;
      el.textContent = current.slice(0, cIndex);
      if(cIndex === current.length){
        deleting = true;
        setTimeout(tick, 1400);
        return;
      }
    } else {
      cIndex--;
      el.textContent = current.slice(0, cIndex);
      if(cIndex === 0){
        deleting = false;
        pIndex = (pIndex + 1) % phrases.length;
      }
    }
    setTimeout(tick, deleting ? 35 : 55);
  }
  tick();
}

/* ---------------- Resource rendering (shared: latest drop + library) ---------------- */
let RESOURCE_SEQ = 0;
const RESOURCE_TEXT = {};

function resourceIconName(type){
  if(type === 'guide') return 'external';
  if(type === 'file') return 'download';
  if(type === 'text') return 'copy';
  return 'link';
}

// size: "primary" (latest drop, bigger button) | "mini" (library grid)
function renderResourceButton(res, size){
  const cls = size === 'primary' ? 'btn btn-primary' : 'mini-btn';
  if(res.type === 'guide'){
    return `<a class="${cls}" href="${encodeURI(res.path)}" target="_blank" rel="noopener">${icon('external')} ${escapeHtml(res.label)}</a>`;
  }
  if(res.type === 'file'){
    return `<a class="${cls}" href="${encodeURI(res.path)}" download>${icon('download')} ${escapeHtml(res.label)}</a>`;
  }
  if(res.type === 'text'){
    const id = 'res-txt-' + (RESOURCE_SEQ++);
    RESOURCE_TEXT[id] = res.text;
    return `<button class="${cls}" data-copy-resource="${id}">${icon('copy')} ${escapeHtml(res.label)}</button>`;
  }
  return '';
}

// Latest-drop card gets an extra inline text preview block for "text" resources.
function renderResourceTextBlocks(resources){
  return resources.filter(r => r.type === 'text').map(res => {
    const id = 'res-txt-' + (RESOURCE_SEQ++);
    RESOURCE_TEXT[id] = res.text;
    return `
      <div class="prompt-item">
        <div class="prompt-item-head">
          <span class="prompt-item-label">${escapeHtml(res.label)}</span>
          <button class="copy-btn" data-copy-resource="${id}">${icon('copy')} Kopyala</button>
        </div>
        <div class="prompt-item-text">${escapeHtml(res.text)}</div>
      </div>`;
  }).join('');
}

document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-copy-resource]');
  if(!btn) return;
  const text = RESOURCE_TEXT[btn.dataset.copyResource];
  if(text) copyToClipboard(text, btn);
});

/* ---------------- Latest drop ---------------- */
function getSortedDrops(){
  return [...DROPS].sort((a,b) => new Date(b.date) - new Date(a.date));
}

function renderLatestDrop(){
  const mount = document.getElementById('latest-drop-mount');
  if(!mount) return;
  const drops = getSortedDrops();
  if(drops.length === 0){
    mount.innerHTML = `<p class="term-out">Henüz içerik eklenmedi. Yakında burada olacak.</p>`;
    return;
  }
  const d = drops[0];
  const primaryResources = d.resources.filter(r => r.type !== 'text');
  const previewFile = (d.resources.find(r => r.filename) || {}).filename || `${d.slug}.md`;

  mount.innerHTML = `
    <div class="latest-preview">
      <div class="lp-bar"><span class="lp-dot r"></span><span class="lp-dot y"></span><span class="lp-dot g"></span></div>
      <div class="lp-body">
        <div class="lp-line">${icon('file')} <span>${escapeHtml(previewFile)}</span></div>
        <div class="lp-line dim">// aç, oku, talimatı kopyala</div>
        <div class="lp-line dim">// kendi ajanına yapıştır</div>
      </div>
    </div>
    <div class="latest-body">
      <span class="latest-tag">${escapeHtml(d.tag)}</span>
      <h3>${escapeHtml(d.title)}</h3>
      <p>${escapeHtml(d.description)}</p>
      ${renderResourceTextBlocks(d.resources)}
      <div class="latest-meta">${formatDate(d.date)} tarihli video için hazırlandı</div>
    </div>
    <div class="latest-actions">
      ${primaryResources.map(r => renderResourceButton(r, 'primary')).join('')}
      ${d.instagramUrl ? `<a class="btn btn-ghost" href="${d.instagramUrl}" target="_blank" rel="noopener">${icon('instagram')} Videoyu Gör</a>` : ''}
    </div>
  `;
}

/* ---------------- Library grid + search/filter ---------------- */
function renderLibrary(){
  const grid = document.getElementById('drop-grid');
  const searchInput = document.getElementById('drop-search');
  const tagFilterWrap = document.getElementById('tag-filter');
  if(!grid) return;

  const drops = getSortedDrops();
  const tags = ['Hepsi', ...new Set(drops.map(d => d.tag))];

  if(tagFilterWrap){
    tagFilterWrap.innerHTML = tags.map((t,i) =>
      `<button class="tag-pill${i===0 ? ' active':''}" data-tag="${escapeHtml(t)}">${escapeHtml(t)}</button>`
    ).join('');
  }

  let activeTag = 'Hepsi';
  let query = '';

  function paint(){
    const filtered = drops.filter(d => {
      const matchesTag = activeTag === 'Hepsi' || d.tag === activeTag;
      const matchesQuery = !query || (d.title + ' ' + d.description + ' ' + d.tag).toLowerCase().includes(query);
      return matchesTag && matchesQuery;
    });

    if(filtered.length === 0){
      grid.innerHTML = `<div class="empty-state">$ sonuç bulunamadı — farklı bir anahtar kelime dene</div>`;
      return;
    }

    grid.innerHTML = filtered.map(d => `
      <div class="drop-card spot">
        <span class="latest-tag">${escapeHtml(d.tag)}</span>
        <h4>${escapeHtml(d.title)}</h4>
        <p>${escapeHtml(d.description)}</p>
        <div class="dl-row">
          ${d.resources.filter(r => r.type !== 'text').map(r => renderResourceButton(r, 'mini')).join('')}
          ${d.instagramUrl ? `<a class="mini-btn" href="${d.instagramUrl}" target="_blank" rel="noopener">${icon('instagram')} Video</a>` : ''}
        </div>
        <div class="meta-row"><span>${formatDate(d.date)}</span><span>#${escapeHtml(d.slug)}</span></div>
      </div>
    `).join('');

    initSpotlight('.drop-card.spot');
  }

  if(tagFilterWrap){
    tagFilterWrap.addEventListener('click', (e) => {
      const btn = e.target.closest('.tag-pill');
      if(!btn) return;
      tagFilterWrap.querySelectorAll('.tag-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeTag = btn.dataset.tag;
      paint();
    });
  }

  if(searchInput){
    searchInput.addEventListener('input', (e) => {
      query = e.target.value.trim().toLowerCase();
      paint();
    });
  }

  paint();
}

/* ---------------- Prompt library (prompts.html) ---------------- */
function renderPrompts(){
  const grid = document.getElementById('prompt-grid');
  if(!grid || typeof PROMPTS === 'undefined') return;

  grid.innerHTML = PROMPTS.map((card, cardIndex) => {
    const isLink = card.type === 'link';
    const countLabel = isLink ? 'BAĞLANTI' : `${card.items.length} PROMPT İÇERİR`;

    const itemsHtml = card.items.map((item, itemIndex) => {
      if(isLink){
        return `
          <div class="prompt-item link-item">
            <a href="${escapeAttr(item.url)}" target="_blank" rel="noopener">${escapeHtml(item.url)}</a>
            <button class="copy-btn" data-copy-id="${cardIndex}-${itemIndex}">${icon('external')} Aç</button>
          </div>`;
      }
      const id = `p-${cardIndex}-${itemIndex}`;
      return `
        <div class="prompt-item">
          <div class="prompt-item-head">
            <span class="prompt-item-label">${escapeHtml(item.label)}</span>
            <button class="copy-btn" data-copy-target="${id}">${icon('copy')} Kopyala</button>
          </div>
          <div class="prompt-item-text" id="${id}">${escapeHtml(item.text)}</div>
        </div>`;
    }).join('');

    return `
      <div class="prompt-card spot">
        <div class="prompt-card-head">
          <h3>${escapeHtml(card.title)}</h3>
          <span class="prompt-count">${countLabel}</span>
        </div>
        ${itemsHtml}
      </div>`;
  }).join('');

  initSpotlight('.prompt-card.spot');

  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('.copy-btn');
    if(!btn) return;

    if(btn.dataset.copyId){
      const [ci, ii] = btn.dataset.copyId.split('-').map(Number);
      window.open(PROMPTS[ci].items[ii].url, '_blank', 'noopener');
      return;
    }

    const targetId = btn.dataset.copyTarget;
    const textEl = document.getElementById(targetId);
    if(!textEl) return;
    copyToClipboard(textEl.textContent, btn);
  });
}

function copyToClipboard(text, btn){
  const original = btn.innerHTML;
  const done = () => {
    btn.innerHTML = `${icon('check')} Kopyalandı`;
    btn.classList.add('copied');
    setTimeout(() => {
      btn.innerHTML = original;
      btn.classList.remove('copied');
    }, 1600);
  };

  if(navigator.clipboard && window.isSecureContext){
    navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
  } else {
    fallbackCopy(text, done);
  }
}

function fallbackCopy(text, done){
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  try { document.execCommand('copy'); done(); } catch(e){ /* no-op */ }
  document.body.removeChild(ta);
}

function escapeAttr(str){
  return escapeHtml(str);
}

/* ---------------- Services accordion ---------------- */
function initServicesAccordion(){
  const wrap = document.getElementById('service-accordion');
  if(!wrap) return;
  const rows = wrap.querySelectorAll('.service-row');

  function setOpen(row, open){
    const body = row.querySelector('.service-row-body');
    const inner = row.querySelector('.service-row-body-inner');
    row.classList.toggle('active', open);
    row.querySelector('.service-row-head').setAttribute('aria-expanded', open ? 'true' : 'false');
    body.style.maxHeight = open ? inner.offsetHeight + 'px' : '0px';
  }

  rows.forEach((row) => {
    const head = row.querySelector('.service-row-head');
    head.addEventListener('click', () => {
      const willOpen = !row.classList.contains('active');
      rows.forEach(r => setOpen(r, false));
      if(willOpen) setOpen(row, true);
    });
  });

  // ilk kart açık başlasın
  if(rows[0]) setOpen(rows[0], true);

  window.addEventListener('resize', () => {
    rows.forEach(row => {
      if(row.classList.contains('active')) setOpen(row, true);
    });
  });
}

/* ---------------- Process section: scroll-drawn connector lines ---------------- */
function initProcessAnimation(){
  const container = document.querySelector('.process-steps');
  if(!container) return;
  const lines = container.querySelectorAll('.process-line');
  if(lines.length === 0) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        lines.forEach((line, i) => {
          setTimeout(() => line.classList.add('filled'), i * 180);
        });
        io.disconnect();
      }
    });
  }, { threshold: 0.35 });

  io.observe(container);
}

/* ---------------- Contact form (Formspree) ---------------- */
function initContactForm(){
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if(!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const endpoint = form.getAttribute('action');
    const isPlaceholder = !endpoint || endpoint.includes('YOUR_FORM_ID');

    if(isPlaceholder){
      status.textContent = '⚠ Form henüz bağlanmadı: js/main.js / index.html içindeki Formspree adresini kendi form ID\'inle değiştir. Bu arada mesajını doğrudan e-posta veya Instagram DM ile gönderebilirsin.';
      status.className = 'form-status show err';
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Gönderiliyor...';

    try{
      const res = await fetch(endpoint, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
      if(res.ok){
        status.textContent = '✓ Mesajın ulaştı, en kısa sürede dönüş yapacağım.';
        status.className = 'form-status show ok';
        form.reset();
      } else {
        throw new Error('Form gönderilemedi');
      }
    } catch(err){
      status.textContent = '✗ Bir şeyler ters gitti. Doğrudan e-posta ile ulaşabilirsin.';
      status.className = 'form-status show err';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Mesajı Gönder';
    }
  });
}

/* ---------------- utils ---------------- */
function formatDate(iso){
  const d = new Date(iso);
  return d.toLocaleDateString('tr-TR', { day:'2-digit', month:'long', year:'numeric' });
}
function escapeHtml(str){
  return String(str).replace(/[&<>"']/g, (c) => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[c]));
}
