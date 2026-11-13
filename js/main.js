// ==========================================================
// fatihd.mov — main.js
// ==========================================================

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initReveal();
  initTyping();
  initHeroParallax();
  initFinder();
  initContactForm();
  initProcessAnimation();
  initServiceCtaLinks();
  initShare();
});

/* ---------------- Inline icon set (feather-style, currentColor) ---------------- */
const SVG_OPEN = '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">';
const ICON_PATHS = {
  external: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
  copy: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
  check: '<polyline points="20 6 9 17 4 12"/>',
  link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
  arrowRight: '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
  chevronDown: '<polyline points="6 9 12 15 18 9"/>',
  play: '<polygon points="6 3 20 12 6 21 6 3"/>',
  chart: '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
  eye: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
  send: '<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>',
  speaker: '<rect x="4" y="2" width="16" height="20" rx="2"/><circle cx="12" cy="14" r="4"/><line x1="12" y1="6" x2="12.01" y2="6"/>',
  briefcase: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
  image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>',
  terminal: '<polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>',
  user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>'
};
function icon(name){ return ICON_PATHS[name] ? SVG_OPEN + ICON_PATHS[name] + '</svg>' : ''; }

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

  // Güvenlik ağı: intersection tetiklenmezse içerik kalıcı görünmez kalmasın.
  setTimeout(() => {
    document.querySelectorAll('.reveal:not(.in)').forEach(el => el.classList.add('in'));
  }, 2500);
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
    'Markalar için AI ile video üretiyorum.',
    'Meta reklamlarını AI ile yönetiyorum.',
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

/* ==========================================================
   İÇERİK BULUCU (ana sayfa): Claude Code içerikleri + Gemini promptları
   tek listede, Türkçe karakter duyarsız arama ve tür filtresi.
   ========================================================== */

// "İş", "is", "IŞ", "ıs" hepsi aynı şeye dönüşür.
function normalizeTr(str){
  return String(str || '')
    .toLocaleLowerCase('tr-TR')
    .replace(/ı/g, 'i').replace(/ş/g, 's').replace(/ğ/g, 'g')
    .replace(/ü/g, 'u').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}
function slugify(str){ return normalizeTr(str).replace(/ /g, '-'); }

const GROUPS = {
  claude: { label: 'Claude Code', heading: 'claude code · en yeni üstte' },
  gemini: { label: 'Gemini', heading: 'gemini promptları' }
};
const GEMINI_PREVIEW = 5; // "Hepsi" görünümünde ilk kaç Gemini satırı açık dursun

function daysAgo(iso){
  const d = new Date(iso + 'T00:00:00');
  const today = new Date(); today.setHours(0,0,0,0);
  return Math.round((today - d) / 86400000);
}
function relativeDate(iso){
  const diff = daysAgo(iso);
  if(diff <= 0) return 'bugün';
  if(diff === 1) return 'dün';
  if(diff < 14) return `${diff} gün önce`;
  const d = new Date(iso + 'T00:00:00');
  const opts = { day:'numeric', month:'long' };
  if(d.getFullYear() !== new Date().getFullYear()) opts.year = 'numeric';
  return d.toLocaleDateString('tr-TR', opts);
}

function buildCatalog(){
  const drops = (typeof DROPS !== 'undefined' ? DROPS : [])
    .slice().sort((a, b) => String(b.date).localeCompare(String(a.date)));
  const prompts = typeof PROMPTS !== 'undefined' ? PROMPTS : [];

  const dropItems = drops.map((d, i) => {
    const resources = d.resources || [];
    const primary = resources.find(r => r.type === 'guide') || resources.find(r => r.type === 'file') || null;
    const kinds = resources.map(r => {
      if(r.type === 'guide') return 'kılavuz';
      if(r.type === 'file'){ const ext = (r.filename || r.path || '').split('.').pop(); return `.${ext}`; }
      return 'prompt';
    });
    return {
      kind: 'drop', group: 'claude', id: d.slug,
      title: d.title, summary: d.summary || d.description || '',
      date: d.date, isNew: i === 0 && daysAgo(d.date) <= 7,
      icon: d.icon || 'terminal', reelUrl: d.reelUrl || '',
      primary, kinds: [...new Set(kinds)],
      textResources: resources.filter(r => r.type === 'text'),
      fields: [normalizeTr(d.title), normalizeTr(`${d.keywords || ''} ${d.tag || ''} ${d.slug}`), normalizeTr(d.summary || d.description)]
    };
  });

  const promptItems = prompts.map(p => {
    const isLink = p.type === 'link';
    return {
      kind: isLink ? 'link' : 'prompt', group: 'gemini', id: 'p-' + slugify(p.title),
      title: p.title, items: p.items || [],
      fields: [normalizeTr(p.title), normalizeTr(p.keywords), normalizeTr((p.items || []).map(it => it.label).join(' '))]
    };
  });

  return [...dropItems, ...promptItems];
}

// Her kelime en az bir alanda geçmeli; başlıkta geçen daha üstte çıkar.
function scoreItem(item, tokens){
  let score = 0;
  for(const t of tokens){
    const [title, keywords, rest] = item.fields;
    if(title.split(' ').some(w => w.startsWith(t))) score += 5;
    else if(title.includes(t)) score += 4;
    else if(keywords.includes(t)) score += 3;
    else if(rest.includes(t)) score += 1;
    else return 0;
  }
  return score;
}

function initFinder(){
  const list = document.getElementById('finder-list');
  if(!list) return;
  const input = document.getElementById('finder-input');
  const clearBtn = document.getElementById('finder-clear');
  const chipsWrap = document.getElementById('finder-chips');
  const countEl = document.getElementById('finder-count');
  const box = document.getElementById('finder-box');

  const catalog = buildCatalog();
  const params = new URLSearchParams(location.search);
  const state = {
    q: params.get('q') || '',
    tur: GROUPS[params.get('tur')] ? params.get('tur') : 'hepsi',
    showAllGemini: false
  };

  // chips
  const counts = { hepsi: catalog.length };
  Object.keys(GROUPS).forEach(g => { counts[g] = catalog.filter(it => it.group === g).length; });
  const chipDefs = [{ key: 'hepsi', label: 'Hepsi' }, ...Object.keys(GROUPS).map(k => ({ key: k, label: GROUPS[k].label }))];
  chipsWrap.innerHTML = chipDefs.map(c =>
    `<button type="button" class="tag-pill" data-tur="${c.key}" aria-pressed="false">${escapeHtml(c.label)}<span class="n">${counts[c.key]}</span></button>`
  ).join('');

  input.value = state.q;

  function syncUrl(){
    const p = new URLSearchParams();
    if(state.q.trim()) p.set('q', state.q.trim());
    if(state.tur !== 'hepsi') p.set('tur', state.tur);
    const qs = p.toString();
    history.replaceState(null, '', location.pathname + (qs ? '?' + qs : '') + location.hash);
  }

  function paint(){
    const tokens = normalizeTr(state.q).split(' ').filter(Boolean);
    chipsWrap.querySelectorAll('.tag-pill').forEach(b => {
      const on = b.dataset.tur === state.tur;
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    clearBtn.hidden = !state.q;

    let pool = catalog.filter(it => state.tur === 'hepsi' || it.group === state.tur);
    let html = '';
    let shown = 0;

    if(tokens.length){
      const results = pool
        .map((it, idx) => ({ it, idx, s: scoreItem(it, tokens) }))
        .filter(r => r.s > 0)
        .sort((a, b) => b.s - a.s || a.idx - b.idx)
        .map(r => r.it);
      shown = results.length;
      html = results.map(renderItem).join('');
      countEl.textContent = `${shown} sonuç`;
      if(!shown) html = renderEmpty(state.q);
    } else {
      Object.keys(GROUPS).forEach(g => {
        const groupItems = pool.filter(it => it.group === g);
        if(!groupItems.length) return;
        const collapse = state.tur === 'hepsi' && g === 'gemini' && !state.showAllGemini && groupItems.length > GEMINI_PREVIEW + 2;
        const visible = collapse ? groupItems.slice(0, GEMINI_PREVIEW) : groupItems;
        html += `<div class="finder-group">${escapeHtml(GROUPS[g].heading)}<span class="n">(${groupItems.length})</span></div>`;
        html += visible.map(renderItem).join('');
        if(collapse){
          html += `<button type="button" class="finder-more" data-more="gemini">+ ${groupItems.length - GEMINI_PREVIEW} prompt daha göster</button>`;
        }
        shown += groupItems.length;
      });
      countEl.textContent = `${shown} içerik`;
    }
    list.innerHTML = html;
  }

  input.addEventListener('input', () => { state.q = input.value; paint(); syncUrl(); });
  input.addEventListener('keydown', (e) => {
    if(e.key === 'Escape'){ state.q = ''; input.value = ''; paint(); syncUrl(); }
    if(e.key === 'Enter'){ input.blur(); } // mobilde klavyeyi kapat, sonuçlar görünsün
  });
  clearBtn.addEventListener('click', () => { state.q = ''; input.value = ''; paint(); syncUrl(); input.focus(); });
  box.addEventListener('click', (e) => { if(!e.target.closest('button')) input.focus(); });

  chipsWrap.addEventListener('click', (e) => {
    const btn = e.target.closest('.tag-pill');
    if(!btn) return;
    state.tur = btn.dataset.tur;
    paint(); syncUrl();
  });

  list.addEventListener('click', (e) => {
    const more = e.target.closest('[data-more]');
    if(more){ state.showAllGemini = true; paint(); return; }
    const reset = e.target.closest('[data-reset]');
    if(reset){ state.q = ''; state.tur = 'hepsi'; input.value = ''; paint(); syncUrl(); input.focus(); }
  });

  // "/" veya Ctrl/Cmd+K → aramaya odaklan (Claude Code'daki gibi)
  document.addEventListener('keydown', (e) => {
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName) || document.activeElement.isContentEditable;
    if((e.key === '/' && !typing) || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k')){
      e.preventDefault();
      input.focus();
      input.select();
      if(input.getBoundingClientRect().top < 0 || input.getBoundingClientRect().top > innerHeight) {
        document.getElementById('icerikler').scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });

  // örnek arama kelimeleri, kutu boşken placeholder'da döner
  const examples = ['reklam', 'iphone', 'araba', 'homepod', 'linkedin', 'iş bulma', 'düğün', 'excel'];
  let exIndex = 0;
  setInterval(() => {
    if(input.value || document.activeElement === input) return;
    exIndex = (exIndex + 1) % examples.length;
    input.placeholder = `ara… örn. "${examples[exIndex]}"`;
  }, 2600);

  paint();

  // #slug ile gelindiyse o satırı bul, aç ve vurgula
  const target = location.hash && location.hash.length > 1 ? decodeURIComponent(location.hash.slice(1)) : '';
  const targetItem = catalog.find(it => it.id === target);
  if(targetItem){
    state.q = ''; input.value = '';
    state.tur = 'hepsi'; state.showAllGemini = true;
    paint();
    const el = document.getElementById(target);
    if(el){
      if(el.tagName === 'DETAILS') el.open = true;
      el.classList.add('flash');
      const go = () => setTimeout(() => el.scrollIntoView({ block: 'start', behavior: 'instant' }), 30);
      if(document.readyState === 'complete') go(); else window.addEventListener('load', go, { once: true });
    }
  }
}

function renderItem(it){
  if(it.kind === 'drop') return renderDropItem(it);
  if(it.kind === 'link') return renderLinkItem(it);
  return renderPromptItem(it);
}

function renderDropItem(it){
  const p = it.primary;
  const href = p ? encodeURI(p.path) : (it.reelUrl || '#');
  const dl = p && p.type === 'file' ? ' download' : '';
  const reel = it.reelUrl
    ? `<a class="item-reel" href="${escapeHtml(it.reelUrl)}" target="_blank" rel="noopener">${icon('play')} video</a>`
    : '';
  return `
    <article class="item" id="${escapeHtml(it.id)}">
      <div class="item-row">
        <span class="item-icon" aria-hidden="true">${icon(it.icon)}</span>
        <div class="item-main">
          <h3 class="item-title"><a class="item-link" href="${href}"${dl}>${escapeHtml(it.title)}</a>${it.isNew ? '<span class="badge-new">YENİ</span>' : ''}</h3>
          <p class="item-sub">${escapeHtml(it.summary)}</p>
          <div class="item-meta"><span>${relativeDate(it.date)}</span><span>${escapeHtml(it.kinds.join(' + '))}</span>${reel}</div>
        </div>
        <span class="item-go" aria-hidden="true">${icon('arrowRight')}</span>
      </div>
    </article>`;
}

function renderLinkItem(it){
  const url = (it.items[0] || {}).url || '#';
  let host = '';
  try { host = new URL(url).hostname.replace(/^www\./, ''); } catch(e){ /* no-op */ }
  return `
    <article class="item" id="${escapeHtml(it.id)}">
      <div class="item-row">
        <span class="item-icon muted" aria-hidden="true">${icon('link')}</span>
        <div class="item-main">
          <h3 class="item-title"><a class="item-link" href="${escapeHtml(url)}" target="_blank" rel="noopener">${escapeHtml(it.title)}</a></h3>
          <div class="item-meta"><span>link</span><span>${escapeHtml(host)}</span></div>
        </div>
        <span class="item-go" aria-hidden="true">${icon('external')}</span>
      </div>
    </article>`;
}

function renderPromptItem(it){
  const n = it.items.length;
  const blocks = it.items.map(item => {
    const id = storeCopyText(item.text);
    return `
      <div class="prompt-item">
        <div class="prompt-item-head">
          <span class="prompt-item-label">${escapeHtml(item.label)}</span>
          <button type="button" class="copy-btn" data-copy-resource="${id}">${icon('copy')} Kopyala</button>
        </div>
        <div class="prompt-item-text">${escapeHtml(item.text)}</div>
      </div>`;
  }).join('');
  return `
    <details class="item" id="${escapeHtml(it.id)}">
      <summary class="item-row">
        <span class="item-icon muted" aria-hidden="true">${icon('image')}</span>
        <span class="item-main">
          <span class="item-title">${escapeHtml(it.title)}</span>
          <span class="item-meta"><span>${n} prompt</span><span>aç ve kopyala</span></span>
        </span>
        <span class="item-go" aria-hidden="true">${icon('chevronDown')}</span>
      </summary>
      <div class="item-body">${blocks}</div>
    </details>`;
}

function renderEmpty(q){
  return `
    <div class="finder-empty">
      <div class="cmd">$ grep "${escapeHtml(q.trim())}" → sonuç yok</div>
      <p>Farklı bir kelime dene ya da <button type="button" data-reset>tüm içerikleri göster</button>.<br>
      Yine bulamazsan <a href="https://instagram.com/fatihd.mov" target="_blank" rel="noopener">Instagram'dan DM at</a>, linki göndereyim.</p>
    </div>`;
}

/* ---------------- Copy helpers ---------------- */
let COPY_SEQ = 0;
const COPY_TEXT = {};
function storeCopyText(text){
  const id = 'c' + (COPY_SEQ++);
  COPY_TEXT[id] = text;
  return id;
}

document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-copy-resource]');
  if(!btn) return;
  e.preventDefault();
  const text = COPY_TEXT[btn.dataset.copyResource];
  if(text) copyToClipboard(text, btn);
});

/* Guide pages: copy a block's text by id */
document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-copy-from]');
  if(!btn) return;
  const source = document.getElementById(btn.dataset.copyFrom);
  if(source) copyToClipboard(source.textContent, btn);
});

function copyToClipboard(text, btn, doneLabel){
  const original = btn.innerHTML;
  const done = () => {
    btn.innerHTML = `${icon('check')} ${doneLabel || 'Kopyalandı'}`;
    btn.classList.add('copied');
    setTimeout(() => {
      btn.innerHTML = original;
      btn.classList.remove('copied');
    }, 1800);
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

/* ---------------- Guide pages: send link to your computer ---------------- */
function initShare(){
  document.querySelectorAll('[data-share]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const url = location.href.split('#')[0].split('?')[0];
      if(navigator.share && matchMedia('(pointer: coarse)').matches){
        try { await navigator.share({ title: document.title, url }); } catch(e){ /* kullanıcı vazgeçti */ }
        return;
      }
      copyToClipboard(url, btn, 'Link kopyalandı');
    });
  });
}

/* ---------------- Service CTA -> pre-fill contact topic ---------------- */
function initServiceCtaLinks(){
  document.querySelectorAll('a[data-topic]').forEach(link => {
    link.addEventListener('click', () => {
      const select = document.getElementById('f-topic');
      if(!select) return;
      const wanted = link.dataset.topic;
      const match = [...select.options].find(o => o.value === wanted);
      if(match) select.value = wanted;
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

/* ---------------- Contact form → contact.fatihdemirel@gmail.com (FormSubmit) ---------------- */
const CONTACT_EMAIL = 'contact.fatihdemirel@gmail.com';

function initContactForm(){
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if(!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    if(data._honey) return; // bot

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Gönderiliyor...';

    data._subject = `fatihd.mov — ${data.topic || 'İletişim'}: ${data.name || ''}`.trim();
    data._replyto = data.email;
    delete data._honey;

    try{
      const res = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      });
      const json = await res.json().catch(() => ({}));
      if(res.ok && String(json.success) === 'true'){
        status.textContent = '✓ Mesajın ulaştı, en kısa sürede dönüş yapacağım.';
        status.className = 'form-status show ok';
        form.reset();
      } else {
        throw new Error(json.message || 'Form gönderilemedi');
      }
    } catch(err){
      status.innerHTML = `✗ Mesaj gönderilemedi. Doğrudan <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a> adresine yazabilir ya da Instagram'dan DM atabilirsin.`;
      status.className = 'form-status show err';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Mesajı Gönder';
    }
  });
}

/* ---------------- utils ---------------- */
function escapeHtml(str){
  return String(str).replace(/[&<>"']/g, (c) => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[c]));
}
