// Redalio – společné ovládání pole se zadáním (úvod i editor):
//  - přílohy: tlačítko „Fotky a soubory“, přetažení do pole i na stránku, vložení Ctrl+V; fotky jako miniatury.
//    Soubory zůstávají jen v tomto prohlížeči, nikam se neodesílají.
//  - diktování: Web Speech API (cs-CZ), spouští se jen kliknutím. Kde ho prohlížeč nemá (Firefox), tlačítko
//    zůstane a po kliknutí slušně vysvětlí proč ne.
(function () {
  'use strict';
  var CSS = '.pril-seznam{display:flex;flex-wrap:wrap;gap:8px;margin:2px 0 6px}.pril-seznam:empty{display:none}' +
    '.pril-pol{position:relative;display:inline-flex;align-items:center;gap:8px;height:52px;max-width:220px;padding:0 30px 0 6px;border:1px solid #ebe5de;border-radius:12px;background:#faf8f5;font-size:.8rem;color:#5c554e}' +
    '.pril-pol img{width:40px;height:40px;object-fit:cover;border-radius:8px;flex:none;display:block}' +
    '.pril-pol .typ{width:40px;height:40px;border-radius:8px;background:#efe9e2;display:inline-flex;align-items:center;justify-content:center;font:600 .64rem/1 Inter,sans-serif;color:#7a6f64;flex:none;letter-spacing:.04em}' +
    '.pril-pol .jm{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}' +
    '.pril-pol .pryc{position:absolute;top:4px;right:4px;width:22px;height:22px;border-radius:50%;border:0;background:transparent;color:#8a8178;cursor:pointer;font-size:15px;line-height:1}' +
    '.pril-pol .pryc:hover{background:#efe9e2;color:#2a2520}' +
    '.btn-pril{display:inline-flex;align-items:center;gap:6px;height:34px;padding:0 12px 0 9px;border-radius:999px;border:1px solid #e6e0d9;background:#fff;color:#5c554e;font:500 .84rem/1 Inter,sans-serif;cursor:pointer;white-space:nowrap;flex:none}' +
    '.btn-pril:hover{color:#1d1a17;border-color:#d3ccc4}.btn-pril svg{width:16px;height:16px}' +
    '.btn-mic{width:34px;height:34px;border-radius:50%;border:1px solid #e6e0d9;background:#fff;color:#5c554e;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;flex:none;position:relative}' +
    '.btn-mic:hover{color:#1d1a17;border-color:#d3ccc4}.btn-mic svg{width:17px;height:17px}' +
    '.btn-mic.nahrava{background:#d93025;border-color:#d93025;color:#fff}' +
    '.btn-mic.nahrava::after{content:"";position:absolute;inset:-5px;border-radius:50%;border:2px solid rgba(217,48,37,.45);animation:mic-puls 1.2s ease-out infinite}' +
    '@keyframes mic-puls{from{transform:scale(.9);opacity:1}to{transform:scale(1.35);opacity:0}}' +
    '.mic-stav{display:inline-flex;align-items:center;gap:6px;font-size:.8rem;color:#b3261e;font-weight:500;white-space:nowrap}.mic-stav[hidden]{display:none!important}' +
    '.mic-stav i{width:8px;height:8px;border-radius:50%;background:#d93025;animation:mic-blik 1s steps(2) infinite}@keyframes mic-blik{50%{opacity:.25}}' +
    '.tahani{outline:2px dashed #ff8022;outline-offset:3px;background-color:#fff8f2!important}' +
    '.vstup-toast{position:fixed;left:50%;bottom:24px;transform:translateX(-50%) translateY(20px);background:#1d1a17;color:#fff;font:500 .88rem/1.4 Inter,sans-serif;padding:10px 16px;border-radius:12px;max-width:calc(100vw - 32px);opacity:0;pointer-events:none;transition:opacity .2s,transform .2s;z-index:100;text-align:center}' +
    '.vstup-toast.ukaz{opacity:1;transform:translateX(-50%)}' +
    '@media (prefers-reduced-motion:reduce){.btn-mic.nahrava::after,.mic-stav i{animation:none}}';
  var st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);

  var MAX = 8;
  function pripona(n) { var m = /\.([a-z0-9]{1,5})$/i.exec(n || ''); return m ? m[1].toUpperCase() : 'SOUBOR'; }
  var vlastniToast;
  function toastVychozi(t) {
    if (!vlastniToast) { vlastniToast = document.createElement('div'); vlastniToast.className = 'vstup-toast'; vlastniToast.setAttribute('role', 'status'); document.body.appendChild(vlastniToast); }
    vlastniToast.textContent = t; vlastniToast.classList.add('ukaz');
    clearTimeout(vlastniToast._t); vlastniToast._t = setTimeout(function () { vlastniToast.classList.remove('ukaz'); }, 3200);
  }

  // c: { pole, text, plus, soubor, seznam, mic, micStav, toast, zmena }
  function init(c) {
    var toast = c.toast || toastVychozi, zmena = c.zmena || function () {};
    var polozky = [];
    function kresli() {
      c.seznam.innerHTML = '';
      polozky.forEach(function (p, i) {
        var d = document.createElement('span'); d.className = 'pril-pol';
        if (p.obr) { var img = document.createElement('img'); img.alt = ''; img.src = p.url; d.appendChild(img); }
        else { var t = document.createElement('span'); t.className = 'typ'; t.textContent = pripona(p.nazev); d.appendChild(t); }
        var j = document.createElement('span'); j.className = 'jm'; j.textContent = p.nazev; d.appendChild(j);
        var x = document.createElement('button'); x.type = 'button'; x.className = 'pryc'; x.textContent = '×';
        x.setAttribute('aria-label', 'Odebrat ' + p.nazev); x.title = 'Odebrat';
        x.addEventListener('click', function () { if (polozky[i].obr && polozky[i].mojeUrl) URL.revokeObjectURL(polozky[i].url); polozky.splice(i, 1); kresli(); zmena(); });
        d.appendChild(x); c.seznam.appendChild(d);
      });
    }
    function pridej(files) {
      var seznam = Array.prototype.slice.call(files || []), pridano = 0;
      seznam.forEach(function (f) {
        if (polozky.length >= MAX) return;
        var obr = /^image\//.test(f.type || '');
        polozky.push({ nazev: f.name || 'vlozeny-obrazek.png', obr: obr, url: obr ? URL.createObjectURL(f) : '', mojeUrl: obr, soubor: f });
        pridano++;
      });
      if (seznam.length > pridano) toast('Najednou jde přiložit nejvýš ' + MAX + ' souborů.');
      if (pridano) { kresli(); zmena(); }
    }
    c.plus.addEventListener('click', function () { c.soubor.click(); });
    c.soubor.addEventListener('change', function () { pridej(c.soubor.files); c.soubor.value = ''; });
    // přetažení: kamkoli na stránku, pole se zvýrazní
    var hloubka = 0;
    function maSoubory(e) { var t = e.dataTransfer && e.dataTransfer.types; return !!t && Array.prototype.indexOf.call(t, 'Files') >= 0; }
    document.addEventListener('dragenter', function (e) { if (!maSoubory(e)) return; e.preventDefault(); hloubka++; c.pole.classList.add('tahani'); });
    document.addEventListener('dragover', function (e) { if (!maSoubory(e)) return; e.preventDefault(); e.dataTransfer.dropEffect = 'copy'; });
    document.addEventListener('dragleave', function (e) { if (!maSoubory(e)) return; hloubka = Math.max(0, hloubka - 1); if (!hloubka) c.pole.classList.remove('tahani'); });
    document.addEventListener('drop', function (e) { if (!maSoubory(e)) return; e.preventDefault(); hloubka = 0; c.pole.classList.remove('tahani'); pridej(e.dataTransfer.files); });
    // Ctrl+V: vložený obrázek nebo soubor
    c.text.addEventListener('paste', function (e) {
      var cd = e.clipboardData; if (!cd || !cd.files || !cd.files.length) return;
      if (!(cd.getData('text') || '').trim()) e.preventDefault();
      pridej(cd.files);
    });

    // diktování
    var SR = window.SpeechRecognition || window.webkitSpeechRecognition, rec = null, zaklad = '', placeholder = '';
    c.mic.title = SR ? 'Diktovat (mikrofon)' : 'Diktování: v tomto prohlížeči nejde';
    function stavMic(on) {
      c.mic.classList.toggle('nahrava', on); c.mic.setAttribute('aria-pressed', on ? 'true' : 'false');
      c.mic.setAttribute('aria-label', on ? 'Zastavit diktování' : 'Diktovat'); c.mic.title = on ? 'Zastavit diktování' : 'Diktovat (mikrofon)';
      if (c.micStav) c.micStav.hidden = !on;
      if (on) { placeholder = c.text.placeholder; c.text.placeholder = 'Mluvte, píšu…'; } else if (placeholder) { c.text.placeholder = placeholder; placeholder = ''; }
    }
    var CHYBY = {
      'not-allowed': 'Mikrofon je zablokovaný. Povolte ho v prohlížeči (ikona vedle adresy) a zkuste to znovu.',
      'service-not-allowed': 'Diktování tu prohlížeč nepovolil. Zkuste Chrome nebo Edge, nebo text napište.',
      'no-speech': 'Nic jsem neslyšel. Klikněte na mikrofon a zkuste to znovu.',
      'audio-capture': 'Nenašel jsem mikrofon. Je připojený?',
      'network': 'Diktování teď nejde, prohlížeč se nespojil se svou službou na převod řeči.',
      'language-not-supported': 'Prohlížeč neumí diktovat česky.'
    };
    function zastav() { if (rec) { try { rec.stop(); } catch (e) { /* už stojí */ } } }
    c.mic.addEventListener('click', function () {
      if (!SR) { toast('Diktování tenhle prohlížeč neumí. Funguje v Chrome, Edge a Safari, tady prosím text napište.'); return; }
      if (rec) { zastav(); return; }
      try { rec = new SR(); } catch (e) { rec = null; toast('Diktování se nepodařilo spustit.'); return; }
      rec.lang = 'cs-CZ'; rec.interimResults = true; rec.continuous = true;
      zaklad = c.text.value && !/\s$/.test(c.text.value) ? c.text.value + ' ' : c.text.value;
      rec.onresult = function (e) {
        var hotove = '', rozpracovane = '';
        for (var i = 0; i < e.results.length; i++) { var r = e.results[i]; if (r.isFinal) hotove += r[0].transcript; else rozpracovane += r[0].transcript; }
        c.text.value = zaklad + hotove + rozpracovane; zmena();
      };
      rec.onerror = function (e) { var m = CHYBY[e.error]; if (m) toast(m); };
      rec.onend = function () { rec = null; stavMic(false); zmena(); };
      try { rec.start(); stavMic(true); } catch (e) { rec = null; stavMic(false); toast('Diktování se nepodařilo spustit.'); }
    });

    return {
      polozky: function () { return polozky.slice(); },
      pridej: pridej,
      vycisti: function () { polozky = []; kresli(); },
      zastav: zastav,
      diktovaniJde: !!SR
    };
  }

  // Předání příloh z úvodu do editoru: zmenšené fotky jen v sessionStorage tohoto prohlížeče.
  function zmensi(p) {
    return new Promise(function (ok) {
      if (!p.obr) { ok({ nazev: p.nazev, obr: false, url: '' }); return; }
      var img = new Image();
      img.onload = function () {
        try {
          var k = Math.min(1, 1600 / Math.max(img.naturalWidth, img.naturalHeight));
          var cv = document.createElement('canvas'); cv.width = Math.round(img.naturalWidth * k); cv.height = Math.round(img.naturalHeight * k);
          cv.getContext('2d').drawImage(img, 0, 0, cv.width, cv.height);
          ok({ nazev: p.nazev, obr: true, url: cv.toDataURL('image/jpeg', 0.84) });
        } catch (e) { ok({ nazev: p.nazev, obr: false, url: '' }); }
      };
      img.onerror = function () { ok({ nazev: p.nazev, obr: false, url: '' }); };
      img.src = p.url;
    });
  }
  function ulozProEditor(polozky) {
    return Promise.all(polozky.map(zmensi)).then(function (data) {
      try { sessionStorage.setItem('redalio-prilohy', JSON.stringify(data)); return true; }
      catch (e) { try { sessionStorage.setItem('redalio-prilohy', JSON.stringify(data.map(function (d) { return { nazev: d.nazev, obr: false, url: '' }; }))); } catch (e2) { /* bez úložiště */ } return false; }
    });
  }
  function nactiZUvodu() {
    try { var s = sessionStorage.getItem('redalio-prilohy'); sessionStorage.removeItem('redalio-prilohy'); return s ? JSON.parse(s) : []; }
    catch (e) { return []; }
  }

  window.RedalioVstup = { init: init, ulozProEditor: ulozProEditor, nactiZUvodu: nactiZUvodu };
})();
