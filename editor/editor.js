// Redalio – návrh editoru (fáze 10). Interaktivní prototyp: žádná AI, žádné odesílání dat,
// průběh i ceny jsou simulované. Ukázkové weby skládá funkce webHTML() z dat v ../data.js.
(function () {
  'use strict';
  var R = window.REDALIO;
  var $ = function (id) { return document.getElementById(id); };
  var st = { web: null, kredit: 100, stranka: 'uvod', pohled: 'nahled', mobil: false, bezi: false, tab: 'chat' };
  var kc = function (n) { return n.toFixed(2).replace('.', ',') + ' Kč'; };
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var ik = function (id, cls) { return '<svg class="ik' + (cls ? ' ' + cls : '') + '"><use href="#i-' + id + '"/></svg>'; };
  var cekej = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };

  // ---------- ukázkový web (srcdoc v iframu) ----------
  var BARVY = {
    restaurace: '#a8432a', kadernictvi: '#8a4f68', cestovka: '#1d6a86', remeslnik: '#2f5d50', fotograf: '#6d5a48', obecny: '#5a5f8a'
  };
  function paleta(web) {
    if (web.paleta === 'tmava') return { bg: '#16130f', bg2: '#1f1b16', ink: '#f4ede3', muted: '#b9ab9a', line: '#2e2820', ak: '#d1aa5e', akInk: '#16130f', karta: '#1f1b16' };
    return { bg: '#faf6f0', bg2: '#f2ebe1', ink: '#2a211a', muted: '#6f6256', line: '#e6ddd1', ak: BARVY[web.o.klic], akInk: '#ffffff', karta: '#ffffff' };
  }
  function stranky(web) {
    var o = web.o, s = [{ k: 'uvod', n: 'Úvod', cesta: '/' }, { k: 'nabidka', n: o.nabidkaNazev, cesta: '/' + o.nabidkaNazev.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, '-') }];
    if (web.galerie) s.push({ k: 'galerie', n: 'Galerie', cesta: '/galerie' });
    s.push({ k: 'kontakt', n: 'Kontakt', cesta: '/kontakt' });
    return s;
  }
  function webHTML(web, stranka) {
    var o = web.o, p = paleta(web), s = stranky(web);
    var nav = s.map(function (x) { return '<a href="#" data-str="' + x.k + '"' + (x.k === stranka ? ' class="akt"' : '') + '>' + esc(x.n) + '</a>'; }).join('');
    var heroBg = o.hero ? "background-image:linear-gradient(180deg,rgba(20,12,6,.25),rgba(20,12,6,.72)),url('" + o.hero + "')" : 'background:linear-gradient(135deg,' + p.ak + ',#1c1917)';
    var polozky = function (kolik) {
      return '<div class="mriz">' + o.polozky.slice(0, kolik).map(function (x) {
        return '<article class="pol">' + (x.foto ? '<div class="pf" style="background-image:url(\'' + x.foto + '\')"></div>' : '<div class="pf bez"><span>' + esc(x.n.charAt(0)) + '</span></div>') +
          '<div class="pt"><h3>' + esc(x.n) + '</h3><p>' + esc(x.p) + '</p><b>' + esc(x.c) + '</b></div></article>';
      }).join('') + '</div>';
    };
    var galerie = function () {
      return '<section class="sek"><div class="w"><p class="nad">Galerie</p><h2>Jak to u nás vypadá</h2><div class="gal">' +
        o.galerie.map(function (g, i) { return '<div class="g g' + i + '" style="background-image:url(\'' + g + '\')"></div>'; }).join('') + '</div></div></section>';
    };
    var kontakt = '<section class="sek kon"><div class="w kgrid"><div><p class="nad">Kontakt</p><h2>' + esc(o.kontaktNadpis || 'Zastavte se') + '</h2><p class="m">' + [o.kontakt.adresa, o.kontakt.tel, o.kontakt.doba].filter(Boolean).map(esc).join('<br>') + '</p></div>' +
      '<div class="kk"><p class="m" style="margin:0 0 12px">Napište nám, ozveme se do druhého dne.</p><div class="pole">Jméno</div><div class="pole">E-mail nebo telefon</div><div class="pole vys">Zpráva</div><a href="#" class="btn" data-str="kontakt">Odeslat</a><p class="drob">Formulář je v ukázce jen pro vzhled.</p></div></div></section>';
    var obsah = '';
    if (stranka === 'uvod') {
      obsah = '<section class="hero" style="' + heroBg + '"><div class="w"><p class="nad sv">' + esc(o.stitek) + '</p><h1>' + esc(o.nazev) + '</h1><p class="sl">' + esc(o.slogan) + '</p><a href="#" class="btn" data-str="kontakt">' + esc(o.cta) + '</a></div></section>' +
        '<section class="vyh"><div class="w">' + o.vyhody.map(function (v) { return '<span>' + esc(v) + '</span>'; }).join('') + '</div></section>' +
        '<section class="sek"><div class="w"><p class="nad">' + esc(o.nabidkaNazev) + '</p><h2>' + esc(o.nabidkaUvod) + '</h2>' + polozky(3) + '<p style="margin-top:28px"><a href="#" class="odk" data-str="nabidka">Celá nabídka →</a></p></div></section>' +
        (web.galerie ? galerie() : '') + kontakt;
    } else if (stranka === 'nabidka') {
      obsah = '<section class="hlav"><div class="w"><p class="nad">' + esc(o.obor) + '</p><h1>' + esc(o.nabidkaNazev) + '</h1><p class="m">' + esc(o.nabidkaUvod) + '</p></div></section>' +
        '<section class="sek" style="padding-top:8px"><div class="w"><div class="seznam">' + o.polozky.map(function (x) { return '<div class="ri"><div><b>' + esc(x.n) + '</b><span>' + esc(x.p) + '</span></div><i></i><em>' + esc(x.c) + '</em></div>'; }).join('') + '</div>' + polozky(4) + '</div></section>';
    } else if (stranka === 'galerie') {
      obsah = '<section class="hlav"><div class="w"><p class="nad">' + esc(o.nazev) + '</p><h1>Galerie</h1></div></section>' + galerie();
    } else {
      obsah = '<section class="hlav"><div class="w"><p class="nad">' + esc(o.nazev) + '</p><h1>Kontakt</h1></div></section>' + kontakt;
    }
    var css = ':root{color-scheme:' + (web.paleta === 'tmava' ? 'dark' : 'light') + '}*{box-sizing:border-box}html{-webkit-text-size-adjust:100%}body{margin:0;background:' + p.bg + ';color:' + p.ink + ';font:400 16px/1.6 Inter,system-ui,sans-serif;-webkit-font-smoothing:antialiased;overflow-x:hidden;transition:background .4s,color .4s}' +
      'a{color:inherit;text-decoration:none}.w{max-width:1080px;margin:0 auto;padding:0 32px}' +
      'header{position:sticky;top:0;z-index:5;background:' + p.bg + 'e6;backdrop-filter:blur(10px);border-bottom:1px solid ' + p.line + '}header .w{display:flex;align-items:center;gap:24px;height:64px}' +
      '.lg{font:600 1.3rem/1 Fraunces,Georgia,serif;letter-spacing:-.01em;white-space:nowrap}nav{display:flex;gap:22px;margin-left:auto;font-size:.92rem;color:' + p.muted + '}nav a.akt,nav a:hover{color:' + p.ink + '}' +
      '.btn{display:inline-block;background:' + p.ak + ';color:' + p.akInk + ';padding:13px 24px;border-radius:4px;font-weight:500;font-size:.95rem}header .btn{padding:9px 16px;font-size:.88rem}' +
      '.hero{min-height:620px;display:flex;align-items:flex-end;background-size:cover;background-position:center;color:#fff;padding:0 0 84px}.hero h1{font:600 clamp(2.8rem,7vw,5rem)/1 Fraunces,Georgia,serif;letter-spacing:-.02em;margin:10px 0 18px}.hero .sl{font-size:1.15rem;max-width:520px;margin:0 0 30px;opacity:.92}' +
      '.nad{text-transform:uppercase;letter-spacing:.28em;font-size:.76rem;font-weight:600;margin:0;color:' + p.ak + '}.nad.sv{color:#fff;opacity:.9}' +
      '.vyh{border-bottom:1px solid ' + p.line + ';background:' + p.bg2 + '}.vyh .w{display:flex;flex-wrap:wrap;gap:12px 40px;justify-content:center;padding:22px 32px;font-size:.92rem;color:' + p.muted + '}.vyh span::before{content:"✦ ";color:' + p.ak + '}' +
      '.sek{padding:88px 0}.sek h2{font:600 clamp(1.6rem,3.6vw,2.4rem)/1.15 Fraunces,Georgia,serif;margin:12px 0 0;max-width:640px;letter-spacing:-.01em}.m{color:' + p.muted + '}' +
      '.mriz{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:22px;margin-top:40px}.pol{background:' + p.karta + ';border:1px solid ' + p.line + ';border-radius:6px;overflow:hidden}.pf{aspect-ratio:4/3;background:' + p.bg2 + ' center/cover}.pf.bez{display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,' + p.ak + ',#1c1917)}.pf.bez span{font:600 3rem Fraunces,serif;color:rgba(255,255,255,.35)}' +
      '.pt{padding:16px 18px 20px}.pt h3{margin:0;font:600 1.15rem/1.3 Fraunces,Georgia,serif}.pt p{margin:4px 0 10px;color:' + p.muted + ';font-size:.9rem}.pt b{color:' + p.ak + ';font-weight:600}.odk{color:' + p.ak + ';font-weight:500}' +
      '.gal{display:grid;grid-template-columns:repeat(3,1fr);grid-auto-rows:200px;gap:12px;margin-top:36px}.g{background:' + p.bg2 + ' center/cover;border-radius:4px}.g0{grid-row:span 2}.g3,.g5{grid-column:span 2}' +
      '.kon{background:' + p.bg2 + '}.kgrid{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:start}.kk{background:' + p.karta + ';border:1px solid ' + p.line + ';border-radius:6px;padding:26px}.pole{border:1px solid ' + p.line + ';border-radius:4px;padding:11px 14px;color:' + p.muted + ';font-size:.9rem;margin-bottom:10px;background:' + p.bg + '}.pole.vys{height:90px}.drob{font-size:.78rem;color:' + p.muted + ';margin:12px 0 0}' +
      '.hlav{padding:72px 0 24px}.hlav h1{font:600 clamp(2.4rem,6vw,3.6rem)/1.05 Fraunces,Georgia,serif;margin:12px 0 10px;letter-spacing:-.02em}' +
      '.seznam{max-width:720px}.ri{display:flex;align-items:baseline;gap:12px;padding:16px 0;border-bottom:1px solid ' + p.line + '}.ri b{font:600 1.1rem Fraunces,Georgia,serif;display:block}.ri span{color:' + p.muted + ';font-size:.88rem}.ri i{flex:1;border-bottom:1px dotted ' + p.muted + ';opacity:.5;transform:translateY(-4px)}.ri em{font-style:normal;color:' + p.ak + ';font-weight:600;white-space:nowrap}' +
      'footer{border-top:1px solid ' + p.line + ';padding:28px 0;font-size:.84rem;color:' + p.muted + '}footer .w{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap}' +
      '@media (max-width:640px){.w{padding:0 20px}nav{display:none}header .w{justify-content:space-between}.hero{min-height:560px;padding-bottom:56px}.sek{padding:60px 0}.kgrid{grid-template-columns:1fr;gap:28px}.gal{grid-template-columns:1fr 1fr;grid-auto-rows:140px}.g3,.g5{grid-column:span 1}.g0{grid-row:span 1}.vyh .w{justify-content:flex-start;gap:8px 20px;padding:18px 20px}.ri{flex-wrap:wrap}.ri i{display:none}}';
    return '<!doctype html><html lang="cs"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
      '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">' +
      '<style>' + css + '</style></head><body><header><div class="w"><a href="#" class="lg" data-str="uvod">' + esc(o.nazev) + '</a><nav>' + nav + '</nav><a href="#" class="btn" data-str="kontakt">' + esc(o.cta) + '</a></div></header>' +
      obsah + '<footer><div class="w"><span>© 2026 ' + esc(o.nazev) + (o.mesto ? ' · ' + esc(o.mesto) : '') + '</span><span>Vytvořeno v Redaliu</span></div></footer>' +
      '<script>document.addEventListener("click",function(e){var a=e.target.closest("a");if(!a)return;e.preventDefault();if(a.dataset.str)parent.postMessage({redalioStranka:a.dataset.str},"*")});<\/script></body></html>';
  }

  // ---------- náhled ----------
  var iframe = $('web');
  function vykresli(animace) {
    if (!st.web) return;
    $('prazdno').hidden = true;
    iframe.hidden = false;
    if (animace) iframe.style.opacity = '0';
    iframe.srcdoc = webHTML(st.web, st.stranka);
    iframe.onload = function () { iframe.style.opacity = '1'; };
    var n = (stranky(st.web).filter(function (x) { return x.k === st.stranka; })[0] || { n: 'Úvod' }).n;
    $('vyber-jm').textContent = n; $('m-vyber-jm').textContent = n;
    if (typeof ukazAdresu === 'function') ukazAdresu();
    if (st.pohled === 'stranky') kresliStranky();
  }
  window.addEventListener('message', function (e) {
    if (e.source !== iframe.contentWindow || !e.data || !e.data.redalioStranka) return;
    nastavStranku(e.data.redalioStranka);
  });
  function nastavStranku(k) { if (!st.web) return; st.stranka = k; nastavPohled('nahled'); vykresli(true); }
  function nastavPohled(p) {
    st.pohled = p;
    ['p-nahled', 'm-nahled'].forEach(function (id) { $(id).setAttribute('aria-selected', p === 'nahled'); });
    ['p-stranky', 'm-stranky'].forEach(function (id) { $(id).setAttribute('aria-selected', p === 'stranky'); });
    $('stranky').classList.toggle('ukaz', p === 'stranky');
    if (p === 'stranky') kresliStranky();
  }
  function kresliStranky() {
    var el = $('stranky');
    if (!st.web) { el.innerHTML = '<h3>Stránky</h3><p class="pod">Zatím žádné. Napište vlevo, jaký web chcete.</p>'; return; }
    var o = st.web.o;
    var foto = { uvod: o.hero, nabidka: (o.polozky[0] || {}).foto, galerie: o.galerie[1], kontakt: o.galerie[2] || o.hero };
    el.innerHTML = '<h3>Stránky webu</h3><p class="pod">' + esc(o.nazev) + ' · ' + stranky(st.web).length + ' stránky</p><div class="mrizka">' +
      stranky(st.web).map(function (x) { var f = foto[x.k]; return '<button class="str" data-k="' + x.k + '"><div class="nah' + (f ? '' : ' bez') + '"' + (f ? ' style="background-image:url(\'' + f + '\')"' : '') + '></div><b>' + esc(x.n) + '</b><span>' + esc(x.cesta) + '</span></button>'; }).join('') + '</div>';
    el.querySelectorAll('.str').forEach(function (b) { b.addEventListener('click', function () { nastavStranku(b.dataset.k); }); });
  }

  // ---------- chat ----------
  var zpravy = $('zpravy');
  function dolu() { zpravy.scrollTop = zpravy.scrollHeight; }
  function pridej(html, cls) { var d = document.createElement('div'); d.className = 'zp ' + cls; d.innerHTML = html; zpravy.appendChild(d); dolu(); return d; }
  function zpravaJa(text, prilohy) {
    var d = pridej('<div class="bublina">' + esc(text) + '</div>', 'ja');
    if (prilohy && prilohy.length) {
      var box = document.createElement('div'); box.className = 'pril-zpr';
      prilohy.forEach(function (p) {
        if (p.obr && p.url) { var img = document.createElement('img'); img.alt = p.nazev; img.title = p.nazev; img.src = p.url; box.appendChild(img); }
        else { var x = document.createElement('span'); x.className = 'soub'; x.textContent = 'Příloha: ' + p.nazev; box.appendChild(x); }
      });
      d.appendChild(box); dolu();
    }
  }
  function prubeh(kroky) {
    var d = pridej('<div class="prubeh">' + kroky.map(function (k) { return '<div class="krok"><span class="st"><span class="tecka"></span></span><span>' + esc(k) + '</span></div>'; }).join('') +
      '<button type="button" class="souhrn">' + ik('ok') + '<span class="sh"></span></button></div>', 'ai');
    var box = d.querySelector('.prubeh');
    box.querySelector('.souhrn').addEventListener('click', function () { box.classList.toggle('zavreny'); });
    return {
      krok: function (i) {
        box.querySelectorAll('.krok').forEach(function (el, j) {
          el.className = 'krok' + (j < i ? ' hotovo' : j === i ? ' bezi' : '');
          el.querySelector('.st').innerHTML = j < i ? ik('ok') : j === i ? '<span class="toc"></span>' : '<span class="tecka"></span>';
          el.lastElementChild.className = j === i ? 'trpyt' : '';
        });
        dolu();
      },
      hotovo: function (s) { box.querySelector('.sh').textContent = 'Hotovo za ' + s + ' s · ' + kroky.length + ' kroků'; box.classList.add('zavreny'); }
    };
  }
  function odpoved(odstavce, cena, vratit) {
    var d = pridej('<div class="text">' + odstavce.map(function (p) { return /^<span class="ukazka-pozn-in">/.test(p) ? '<p class="ukazka-pozn">' + p + '</p>' : '<p>' + p + '</p>'; }).join('') + '</div>' +
      '<div class="pata"><button class="ikb" data-a="palec" aria-pressed="false" aria-label="Dobrá odpověď" title="Dobrá odpověď">' + ik('palec') + '</button>' +
      '<button class="ikb" data-a="dolu" aria-pressed="false" aria-label="Špatná odpověď" title="Špatná odpověď">' + ik('palec', 'otoc') + '</button>' +
      '<button class="ikb" data-a="kopie" aria-label="Kopírovat" title="Kopírovat">' + ik('kopie') + '</button>' +
      '<button class="ikb" data-a="zpet" aria-label="Vrátit zpět" title="Vrátit zpět"' + (vratit ? '' : ' disabled') + '>' + ik('zpet') + '</button>' +
      '<span class="cena" title="Cena této zprávy">' + (cena ? kc(cena) : 'zdarma') + '</span></div>', 'ai');
    d.querySelector('.otoc').style.transform = 'scaleY(-1)';
    d.querySelectorAll('.pata .ikb').forEach(function (b) {
      b.addEventListener('click', function () {
        var a = b.dataset.a;
        if (a === 'palec' || a === 'dolu') {
          var zap = b.getAttribute('aria-pressed') !== 'true';
          d.querySelectorAll('[data-a=palec],[data-a=dolu]').forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
          b.setAttribute('aria-pressed', String(zap));
          if (zap) toast(a === 'palec' ? 'Díky, zapamatuji si to.' : 'Díky. Napište, co mám udělat jinak.');
        } else if (a === 'kopie') {
          var t = d.querySelector('.text').innerText;
          try { if (navigator.clipboard) navigator.clipboard.writeText(t).catch(function () {}); } catch (e) { /* bez schránky */ }
          toast('Zkopírováno');
        } else if (a === 'zpet' && vratit && !st.bezi) {
          vratit(); b.disabled = true;
        }
      });
    });
    return d;
  }
  function kartaWebu(o) {
    var d = pridej('<div class="karta-web"><div class="hl"><span class="ok"><i>' + ik('ok') + '</i>' + esc(o.karta) + '</span></div>' +
      '<div class="foto' + (o.hero ? '' : ' bez') + '"' + (o.hero ? ' style="background-image:url(\'' + o.hero + '\')"' : '') + '><span>' + esc(o.nazev) + '</span></div>' +
      '<div class="detaily"><ul>' + stranky(st.web).map(function (x) { return '<li>' + esc(x.n) + ' <span style="color:var(--soft)">' + esc(x.cesta) + '</span></li>'; }).join('') + '<li>fotky z fotobanky Redalia, texty česky</li></ul></div>' +
      '<div class="adr-radek">Adresa: <b class="adr-txt">' + esc(st.web.adresa) + '.redalio.com</b><button type="button" class="odkaz-btn" data-a="adr">Změnit</button></div>' +
      '<div class="tl"><button type="button" data-a="det">Detaily</button><button type="button" data-a="nah" class="aktivni">Zobrazeno</button></div></div>', 'ai');
    d.querySelector('[data-a=det]').addEventListener('click', function (e) { var x = d.querySelector('.detaily'); x.classList.toggle('ukaz'); e.currentTarget.textContent = x.classList.contains('ukaz') ? 'Skrýt' : 'Detaily'; });
    d.querySelector('[data-a=adr]').addEventListener('click', function (e) { e.stopPropagation(); if (window.innerWidth <= 820) prepniTab('nahled'); setTimeout(function () { otevriAdresu(); }, 30); });
    d.querySelector('[data-a=nah]').addEventListener('click', function () { st.stranka = 'uvod'; nastavPohled('nahled'); vykresli(true); prepniTab('nahled'); });
  }
  function navrhy(seznam) {
    var el = $('navrhy'); el.innerHTML = '';
    seznam.forEach(function (t) { var b = document.createElement('button'); b.type = 'button'; b.className = 'cip'; b.textContent = t; b.addEventListener('click', function () { odeslat(t); }); el.appendChild(b); });
    zpravy.style.scrollBehavior = 'auto'; dolu(); zpravy.style.scrollBehavior = '';
  }
  function nastavKredit(n) {
    st.kredit = n; $('menu-kredit').textContent = kc(n);
    $('kredit-info').textContent = st.web ? 'Kredit ' + kc(n) : '';
  }
  function stavba(text) {
    $('stavba-text').textContent = text || '';
    $('stavba').classList.toggle('ukaz', !!text);
  }

  // ---------- simulace ----------
  async function postav(text, prilohy) {
    var klic = R.poznejObor(text), t0 = Date.now();
    var vlastni = (prilohy || []).filter(function (p) { return p.obr && p.url; }).map(function (p) { return p.url; });
    var o = klic ? Object.assign({}, R.OBORY[klic]) : R.obecnyWeb(text, vlastni);
    if (klic && vlastni.length) { o.hero = vlastni[0]; o.galerie = vlastni.concat(o.galerie).slice(0, 6); }
    var popis = o.obecny ? o.popisWebu + ' <strong>' + esc(o.nazev) + '</strong>' : '<strong>' + esc(o.karta.replace('Přidán ', '')) + '</strong>';
    pridej('<div class="text"><p>Rozumím. Postavím ' + popis + ' s úvodem, stránkou „' + esc(o.nabidkaNazev) + '“ a kontaktem.' +
      (vlastni.length ? ' Vaši fotku dám na úvod.' : '') + '</p></div>', 'ai');
    var kroky = ['Promýšlím strukturu webu', vlastni.length ? 'Zpracovávám vaše fotky' : 'Vybírám fotky z fotobanky', 'Stavím úvodní stránku', 'Stavím stránku „' + o.nabidkaNazev + '“', 'Přidávám kontakt a patičku'];
    var pr = prubeh(kroky);
    $('prazdno').hidden = true; $('kostra').classList.add('ukaz');
    for (var i = 0; i < kroky.length; i++) { pr.krok(i); stavba(kroky[i] + '…'); await cekej(850); }
    st.web = { o: o, paleta: 'zakladni', galerie: false, adresa: navrhAdresy(o.nazev) }; st.stranka = 'uvod';
    $('kostra').classList.remove('ukaz'); stavba(''); vykresli(true); ukazAdresu();
    pr.hotovo(Math.round((Date.now() - t0) / 1000));
    $('projekt-jm').textContent = o.nazev; $('menu-jm').textContent = o.nazev;
    kartaWebu(o);
    var cena = 1.84; nastavKredit(st.kredit - cena);
    odpoved(['Web <strong>' + esc(o.nazev) + '</strong> je hotový: úvod s velkou fotkou, stránka „' + esc(o.nabidkaNazev) + '“ a kontakt. Všechno česky.',
      o.obecny ? 'Texty a fotky jsou zatím ukázkové. Napište, co tam má být, a pošlete svoje fotky (tlačítko „Fotky a soubory“ nebo je sem přetáhněte).'
        : 'Název, ceny, adresa a telefon jsou zatím ukázkové. Pošlete mi ty skutečné a hned je přepíšu. Můžu taky změnit barvy nebo přidat galerii.',
      '<span class="ukazka-pozn-in">Tohle je ukázka vzhledu. Skutečné Redalio postaví web přesně podle vašeho zadání.</span>'], cena, null);
    navrhy(['Změň barvy na tmavé a zlaté', 'Přidej galerii fotek']);
    $('vstup').placeholder = 'Napište úpravu…';
    if (window.innerWidth <= 820 && st.tab !== 'nahled') $('t-bod').classList.add('ukaz');
  }
  async function uprav(text, prilohy) {
    var t = text.toLowerCase(), o = st.web.o, pred = JSON.parse(JSON.stringify(st.web));
    var druh = /barv|tmav|zlat|světl|svetl/.test(t) ? 'barvy' : /galer|fotk/.test(t) ? 'galerie' : '';
    var vlastni = (prilohy || []).filter(function (p) { return p.obr && p.url; }).map(function (p) { return p.url; });
    if (vlastni.length) {
      var t1 = Date.now(), pr1 = prubeh(['Zpracovávám vaše fotky', 'Přidávám je do galerie']);
      for (var j = 0; j < 2; j++) { pr1.krok(j); stavba(['Zpracovávám vaše fotky…', 'Přidávám je do galerie…'][j]); await cekej(700); }
      st.web.o = Object.assign({}, o, { galerie: vlastni.concat(o.galerie).slice(0, Math.max(6, vlastni.length)) });
      st.web.galerie = true; st.stranka = 'galerie'; stavba(''); vykresli(true);
      pr1.hotovo(Math.round((Date.now() - t1) / 1000));
      var c1 = 0.88; nastavKredit(st.kredit - c1);
      var zp1 = function () { st.web = pred; if (!stranky(st.web).some(function (x) { return x.k === st.stranka; })) st.stranka = 'uvod'; vykresli(true); pridej('<div class="text"><p style="color:var(--muted)">Vráceno na předchozí verzi.</p></div>', 'ai'); toast('Vráceno zpět'); };
      odpoved(['Vaše fotky (' + vlastni.length + ') jsem dal do <strong>galerie</strong>. Zůstávají jen ve vašem prohlížeči, nikam se neposílají.'], c1, zp1);
      navrhy(['Změň barvy na tmavé a zlaté']);
      return;
    }
    if (!druh) {
      await cekej(500);
      odpoved(['V téhle ukázce umím změnit <strong>barvy</strong>, přidat <strong>galerii</strong> a vložit vaše fotky. Skutečné Redalio udělá i úpravu „' + esc(text) + '“.'], 0, null);
      navrhy(['Změň barvy na tmavé a zlaté', 'Přidej galerii fotek']);
      return;
    }
    if (druh === 'galerie' && !o.galerie.length) {
      await cekej(500);
      odpoved(['Pro tenhle obor nemám v naší fotobance vhodné fotky. Pošlete mi svoje přes tlačítko + a galerii z nich poskládám.'], 0, null);
      return;
    }
    if (druh === 'galerie' && st.web.galerie) { await cekej(400); odpoved(['Galerie už na webu je, najdete ji na úvodu i jako samostatnou stránku.'], 0, null); return; }
    var t0 = Date.now();
    var kroky = druh === 'barvy' ? ['Volím novou paletu', 'Přebarvuji všechny stránky'] : ['Vybírám 6 fotek z fotobanky', 'Přidávám galerii na úvod', 'Zakládám stránku „Galerie“'];
    var pr = prubeh(kroky);
    for (var i = 0; i < kroky.length; i++) { pr.krok(i); stavba(kroky[i] + '…'); await cekej(800); }
    if (druh === 'barvy') st.web.paleta = st.web.paleta === 'tmava' ? 'zakladni' : 'tmava';
    else { st.web.galerie = true; st.stranka = 'uvod'; }
    stavba(''); vykresli(true);
    if (druh === 'galerie') setTimeout(function () { try { var d = iframe.contentDocument; var g = d && d.querySelector('.gal'); if (g) g.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch (e) { /* jiný původ */ } }, 450);
    pr.hotovo(Math.round((Date.now() - t0) / 1000));
    var cena = druh === 'barvy' ? 0.62 : 0.88; nastavKredit(st.kredit - cena);
    var zpet = function () { st.web = pred; if (!stranky(st.web).some(function (x) { return x.k === st.stranka; })) st.stranka = 'uvod'; vykresli(true); pridej('<div class="text"><p style="color:var(--muted)">Vráceno na předchozí verzi.</p></div>', 'ai'); toast('Vráceno zpět'); };
    odpoved(druh === 'barvy' ? (st.web.paleta === 'tmava' ? ['Hotovo. Web je teď <strong>tmavý se zlatými akcenty</strong>, působí večerně a slavnostně. Fotky i texty zůstaly.', 'Kdyby se vám nelíbil, klikněte na šipku zpět pod touto zprávou.'] : ['Vráceno ke světlým barvám.'])
      : ['Přidal jsem <strong>galerii</strong> se šesti fotkami: na úvod a jako samostatnou stránku „Galerie“ v menu.'], cena, zpet);
    navrhy(druh === 'barvy' ? ['Přidej galerii fotek', 'Vrať světlé barvy'] : ['Změň barvy na tmavé a zlaté']);
  }
  async function odeslat(text, prilohyZvenku) {
    text = (text || '').trim();
    if (!text || st.bezi) return;
    V.zastav();
    var pril = prilohyZvenku || V.polozky(); V.vycisti();
    var v = zpravyVitej(); if (v) v.remove();
    zpravaJa(text, pril); $('vstup').value = ''; velikost(); stavOdeslat();
    $('navrhy').innerHTML = '';
    st.bezi = true; stavOdeslat();
    try { if (!st.web) await postav(text, pril); else await uprav(text, pril); } finally { st.bezi = false; stavOdeslat(); }
  }
  function zpravyVitej() { return zpravy.querySelector('.vitej'); }
  function vitej() {
    var d = pridej('<div class="vitej"><h2>Co dnes postavíme?</h2><p>Popište web vlastními slovy, nebo začněte oborem.</p><div class="cipy"></div></div>', 'ai vitej');
    ['kadernictvi', 'restaurace', 'cestovka', 'remeslnik', 'fotograf'].forEach(function (k) {
      var b = document.createElement('button'); b.type = 'button'; b.className = 'cip'; b.textContent = R.OBORY[k].obor;
      b.addEventListener('click', function () { $('vstup').value = R.OBORY[k].zadani; velikost(); stavOdeslat(); $('vstup').focus(); });
      d.querySelector('.cipy').appendChild(b);
    });
  }

  // ---------- ovládání ----------
  var vstup = $('vstup');
  function velikost() { vstup.style.height = 'auto'; vstup.style.height = Math.min(vstup.scrollHeight, 180) + 'px'; }
  function stavOdeslat() { $('odeslat').setAttribute('aria-disabled', (!vstup.value.trim() || st.bezi) ? 'true' : 'false'); }
  vstup.addEventListener('input', function () { velikost(); stavOdeslat(); });
  vstup.addEventListener('keydown', function (e) { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); odeslat(vstup.value); } });
  $('skladac').addEventListener('submit', function (e) { e.preventDefault(); odeslat(vstup.value); });
  var V = RedalioVstup.init({ pole: $('skladac'), text: vstup, plus: $('plus'), soubor: $('soubor'), seznam: $('prilohy'), mic: $('mic'), micStav: $('mic-stav'),
    toast: function (t) { toast(t); }, zmena: function () { velikost(); stavOdeslat(); } });

  var toastT;
  function toast(t) { var el = $('toast'); el.textContent = t; el.classList.add('ukaz'); clearTimeout(toastT); toastT = setTimeout(function () { el.classList.remove('ukaz'); }, 2600); }
  var PLATBY = 'Platby připravujeme, kredit zatím přiděluje Redalio.';
  $('koupit').addEventListener('click', function () { toast(PLATBY); });
  $('m-koupit').addEventListener('click', function () { zavriPop(); toast(PLATBY); });
  var sdil = function () { zavriPop(); toast(st.web ? 'Sdílení odkazu jen pro čtení: v návrhu zatím nefunguje.' : 'Nejdřív postavte web.'); };
  $('sdilet').addEventListener('click', sdil); $('m-sdilet').addEventListener('click', sdil);
  $('publikovat').addEventListener('click', function () { toast(st.web ? 'Zveřejnění na vlastní adrese připravujeme.' : 'Nejdřív postavte web.'); });
  $('historie').addEventListener('click', function () { toast('Historie verzí: každou úpravu jde vrátit šipkou pod zprávou.'); });
  $('skryt-chat').addEventListener('click', function () { var c = document.querySelector('.plocha'), s = c.style.gridTemplateColumns === '0px 1fr'; c.style.gridTemplateColumns = s ? '' : '0px 1fr'; document.querySelector('.chat').style.visibility = s ? '' : 'hidden'; $('skryt-chat').setAttribute('aria-pressed', String(!s)); });
  $('nastaveni').addEventListener('click', function () { zavriPop(); toast('Nastavení webu (název, adresa, heslo) bude tady.'); });
  $('novy-web').addEventListener('click', function () { location.hash = ''; location.reload(); });
  ['p-nahled', 'm-nahled'].forEach(function (id) { $(id).addEventListener('click', function () { nastavPohled('nahled'); }); });
  ['p-stranky', 'm-stranky'].forEach(function (id) { $(id).addEventListener('click', function () { nastavPohled('stranky'); }); });
  $('zarizeni').addEventListener('click', function () {
    st.mobil = !st.mobil; $('ram').classList.toggle('mobil', st.mobil);
    $('zarizeni').innerHTML = ik(st.mobil ? 'mobil' : 'pc'); $('zarizeni').setAttribute('aria-label', st.mobil ? 'Přepnout na počítač' : 'Přepnout na mobil'); $('zarizeni').title = $('zarizeni').getAttribute('aria-label');
  });
  var obnov = function () { if (st.web) vykresli(true); else toast('Zatím není co obnovit.'); };
  $('obnovit').addEventListener('click', obnov); $('m-obnovit').addEventListener('click', obnov);

  // rozbalovací menu
  var otevrene = null;
  function zavriPop() { if (!otevrene) return; otevrene.pop.classList.remove('ukaz'); otevrene.btn.setAttribute('aria-expanded', 'false'); otevrene = null; }
  function otevriPop(btn, pop, zarovnat) {
    if (otevrene && otevrene.pop === pop) { zavriPop(); return; }
    zavriPop();
    var r = btn.getBoundingClientRect();
    pop.style.top = (r.bottom + 6) + 'px';
    pop.classList.add('ukaz');
    var w = pop.offsetWidth, left = zarovnat === 'stred' ? r.left + r.width / 2 - w / 2 : r.left;
    pop.style.left = Math.max(8, Math.min(left, window.innerWidth - w - 8)) + 'px';
    btn.setAttribute('aria-expanded', 'true'); otevrene = { btn: btn, pop: pop };
  }
  $('projekt').addEventListener('click', function (e) { e.stopPropagation(); otevriPop($('projekt'), $('menu-projekt')); });
  function menuStranek(btn) {
    var pop = $('menu-stranky');
    var s = st.web ? stranky(st.web) : [{ k: 'uvod', n: 'Úvod', cesta: '/' }];
    pop.innerHTML = s.map(function (x) { return '<button class="polozka" data-k="' + x.k + '"' + (x.k === st.stranka ? ' aria-current="true"' : '') + '>' + esc(x.n) + '<span style="margin-left:auto;color:var(--soft);font-size:.8rem">' + esc(x.cesta) + '</span></button>'; }).join('');
    pop.querySelectorAll('.polozka').forEach(function (b) { b.addEventListener('click', function () { zavriPop(); if (st.web) nastavStranku(b.dataset.k); else toast('Nejdřív postavte web.'); }); });
    otevriPop(btn, pop, 'stred');
  }
  $('vyber-stranky').addEventListener('click', function (e) { e.stopPropagation(); menuStranek($('vyber-stranky')); });
  $('m-vyber').addEventListener('click', function (e) { e.stopPropagation(); menuStranek($('m-vyber')); });
  document.addEventListener('click', function (e) { if (otevrene && !otevrene.pop.contains(e.target)) zavriPop(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') zavriPop(); });
  window.addEventListener('resize', zavriPop);

  // adresa webu <nazev>.redalio.com: návrh ze zadání, kontrola pravidel a (simulované) dostupnosti
  var REZERVOVANE = ['www', 'api', 'ukazka', 'vzor', 'vzory', 'mail', 'admin', 'app', 'novy', 'u', 'redalio', 'static', 'cdn', 'test', 'podpora', 'help', 'blog', 'status'];
  var OBSAZENE = ['bistro', 'studio', 'kadernictvi', 'restaurace', 'fotograf', 'cestovka', 'instalater', 'baloun', 'dominika'];
  function slug(t) { return String(t || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''); }
  function navrhAdresy(nazev) {
    var sl = slug(nazev).split('-').filter(Boolean), n = '';
    for (var i = 0; i < sl.length; i++) { var d = n ? n + '-' + sl[i] : sl[i]; if (d.length > 22) break; n = d; }
    if (n.length < 3) n = (n + '-web').replace(/^-/, '');
    var z = n, k = 2; while (OBSAZENE.indexOf(z) >= 0 || REZERVOVANE.indexOf(z) >= 0) z = n + '-' + (k++);
    return z;
  }
  function overAdresu(a) {
    if (!a) return { ok: false, t: 'Napište název, třeba „' + (st.web ? st.web.adresa : 'mujweb') + '“.' };
    if (!/^[a-z0-9-]+$/.test(a)) return { ok: false, t: 'Jen malá písmena a–z, číslice a pomlčka.' };
    if (a.length < 3 || a.length > 30) return { ok: false, t: 'Název musí mít 3 až 30 znaků.' };
    if (/^-|-$/.test(a) || a.indexOf('--') >= 0) return { ok: false, t: 'Pomlčka nesmí být na začátku, na konci ani dvakrát za sebou.' };
    if (REZERVOVANE.indexOf(a) >= 0) return { ok: false, t: 'Tenhle název si Redalio nechává pro sebe.' };
    if (st.web && a === st.web.adresa) return { ok: true, t: 'Tohle je současná adresa.', stejna: true };
    if (OBSAZENE.indexOf(a) >= 0) return { ok: false, t: 'Adresa ' + a + '.redalio.com je obsazená. Zkuste třeba ' + a + '-' + (st.web ? 'web' : '2') + '.' };
    return { ok: true, t: 'Volná: ' + a + '.redalio.com' };
  }
  function ukazAdresu() {
    if (!st.web) return;
    $('url-lista').hidden = false; $('url-sub').textContent = st.web.adresa;
    var c = (stranky(st.web).filter(function (x) { return x.k === st.stranka; })[0] || { cesta: '/' }).cesta;
    $('url-cesta').textContent = c === '/' ? '' : c;
    document.querySelectorAll('.adr-txt').forEach(function (el) { el.textContent = st.web.adresa + '.redalio.com'; });
  }
  function kontrolaAdresy() {
    var v = slug($('adr-vstup').value).slice(0, 30), r = overAdresu(v);
    if ($('adr-vstup').value !== v && document.activeElement === $('adr-vstup')) { /* nechat psát, převod až při uložení */ }
    $('adr-stav').textContent = r.t; $('adr-stav').className = 'adr-stav ' + (r.ok ? (r.stejna ? '' : 'ok') : 'chyba');
    $('adr-ulozit').disabled = !r.ok || !!r.stejna;
    return { v: v, r: r };
  }
  function otevriAdresu() {
    if (!st.web) { toast('Nejdřív postavte web.'); return; }
    var btn = $('url-zmenit');
    $('adr-vstup').value = st.web.adresa; kontrolaAdresy();
    otevriPop(btn, $('menu-adresa'));
    var pop = $('menu-adresa'), r = btn.getBoundingClientRect();
    pop.style.left = Math.max(8, Math.min(r.right - pop.offsetWidth, window.innerWidth - pop.offsetWidth - 8)) + 'px';
    setTimeout(function () { $('adr-vstup').focus(); $('adr-vstup').select(); }, 20);
  }
  $('url-zmenit').addEventListener('click', function (e) { e.stopPropagation(); otevriAdresu(); });
  $('menu-adresa').addEventListener('click', function (e) { e.stopPropagation(); });
  $('adr-vstup').addEventListener('input', kontrolaAdresy);
  $('adr-vstup').addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); $('adr-ulozit').click(); } });
  $('adr-ulozit').addEventListener('click', function () {
    var k = kontrolaAdresy(); if (!k.r.ok || k.r.stejna) return;
    var stara = st.web.adresa; st.web.adresa = k.v; ukazAdresu(); zavriPop();
    toast('Adresa změněna na ' + k.v + '.redalio.com');
    pridej('<div class="text"><p style="color:var(--muted)">Adresa webu je teď <strong style="color:var(--ink)">' + esc(k.v) + '.redalio.com</strong>. Odkazy na ' + esc(stara) + '.redalio.com se přesměrují.</p></div>', 'ai');
  });
  $('url-kopie').addEventListener('click', function () {
    var u = 'https://' + st.web.adresa + '.redalio.com' + $('url-cesta').textContent;
    try { if (navigator.clipboard) navigator.clipboard.writeText(u).catch(function () {}); } catch (e) { /* bez schránky */ }
    toast('Adresa zkopírována: ' + u.replace('https://', ''));
  });
  $('url-odkaz').addEventListener('click', function (e) {
    e.preventDefault();
    toast('V ukázce web na ' + st.web.adresa + '.redalio.com ještě není. Ve skutečném Redaliu se tu otevře v nové kartě.');
  });

  // mobil: přepínač Chat | Náhled
  function prepniTab(t) {
    st.tab = t; document.body.classList.toggle('tab-nahled', t === 'nahled');
    $('t-chat').setAttribute('aria-selected', t === 'chat'); $('t-nahled').setAttribute('aria-selected', t === 'nahled');
    if (t === 'nahled') $('t-bod').classList.remove('ukaz');
  }
  $('t-chat').addEventListener('click', function () { prepniTab('chat'); });
  $('t-nahled').addEventListener('click', function () { prepniTab('nahled'); });

  // start: zadání z úvodu (#zadani=…) nebo obor z galerie (#obor=…)
  nastavKredit(st.kredit);
  vitej();
  var h = new URLSearchParams(location.hash.slice(1)), z = h.get('zadani'), ob = h.get('obor');
  if (!z && ob && R.OBORY[ob]) z = R.OBORY[ob].zadani;
  var zUvodu = h.get('prilohy') ? RedalioVstup.nactiZUvodu() : null;
  if (z) { history.replaceState(null, '', location.pathname); setTimeout(function () { odeslat(z, zUvodu && zUvodu.length ? zUvodu : null); }, 450); }
  else vstup.focus();
})();
