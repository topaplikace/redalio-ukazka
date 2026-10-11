// Redalio – prototyp fáze 10: simulovaná data ukázkových webů.
// Fotky jen z naší fotobanky (seznam redalio/chat/fotky.json, CDN Levnocestování). Nic se nikam neodesílá.
(function () {
  var CDN = 'https://cdn-src.levnocestovani.eu/fotobanka/';
  function f(s) { return CDN + s; }
  var OBORY = {
    restaurace: {
      klic: 'restaurace', obor: 'Restaurace', nazev: 'Bistro U Lípy', mesto: 'Olomouc',
      zadani: 'Web pro rodinnou restauraci v Olomouci. Domácí kuchyně, polední menu, letní terasa a rezervace stolu.',
      stitek: 'Restaurace', slogan: 'Domácí kuchyně, letní terasa a polední menu každý všední den.',
      cta: 'Rezervovat stůl', hero: f('recko/ostrovy/kreta/restaurace-chania-kreta.jpg'),
      nabidkaNazev: 'Jídelní lístek', nabidkaUvod: 'Vaříme z čerstvých surovin od místních dodavatelů. Lístek měníme podle sezóny.',
      polozky: [
        { n: 'Grilované kuřecí špízy', p: 's pečenými bramborami a jogurtovým dipem', c: '219 Kč', foto: f('potraviny/obedy-a-vecere/grilovane-kureci-souvlaki.jpg') },
        { n: 'Dýňová polévka', p: 'krémová, s opraženou pohankou', c: '89 Kč', foto: f('potraviny/polevky/dynova-polevka-s-pohankou.jpg') },
        { n: 'Zapečené těstoviny', p: 's hovězím ragú a bešamelem', c: '239 Kč', foto: f('potraviny/obedy-a-vecere/pastitsio-jidlo.jpg') },
        { n: 'Grilovaná ryba', p: 's bylinkovými bramborami a citronem', c: '289 Kč', foto: f('chorvatsko/a-traditional-plate-of-grilled-fish-and-sides-in-croatian-restaurant-croatia.jpg') }
      ],
      vyhody: ['Polední menu 11–14 h', 'Terasa pro 40 hostů', 'Dětský koutek'],
      galerie: [f('ostatni/restaurace-1.jpg'), f('ostatni/restaurace-pratele.jpg'), f('ostatni/romanticka-vecere-more-zapad-slunce.jpg'), f('francie/pariz/bistro-francie.jpg'), f('recko/ostrovy/kos/greece-taverna-5.jpg'), f('potraviny/vecere-s-paella-jidlo.jpg')],
      kontakt: { adresa: 'Lipová 12, Olomouc', tel: '+420 600 000 000', doba: 'Po–Ne 11.00–22.00' },
      ikona: 'talir', karta: 'Přidán web restaurace'
    },
    kadernictvi: {
      klic: 'kadernictvi', obor: 'Kadeřnictví', nazev: 'Studio Vlnka', mesto: 'Brno',
      zadani: 'Web pro malé kadeřnictví v Brně. Ceník střihů a barvení, objednání termínu a fotky salonu.',
      stitek: 'Kadeřnictví a péče', slogan: 'Střih, barva a chvíle klidu v centru Brna.',
      cta: 'Objednat termín', hero: f('ostatni/tropicke-lazne-ostatni.jpg'),
      nabidkaNazev: 'Ceník', nabidkaUvod: 'Ceny jsou orientační, přesnou cenu řekneme po konzultaci.',
      polozky: [
        { n: 'Dámský střih a foukaná', p: 'konzultace, mytí, střih, styling', c: 'od 590 Kč', foto: f('ostatni/lazne-ostatni.jpg') },
        { n: 'Barvení', p: 'jednobarevné i melír', c: 'od 1 190 Kč', foto: f('aktivity/spa-wellness-masaze.jpg') },
        { n: 'Pánský střih', p: 'střih strojkem i nůžkami', c: '390 Kč', foto: f('bali/masaze.jpg') },
        { n: 'Regenerační péče', p: 'maska a masáž hlavy', c: '450 Kč', foto: f('maledivy/maledivy-spa.jpg') }
      ],
      vyhody: ['Objednání online', 'Bezamoniakové barvy', 'Parkování u salonu'],
      galerie: [f('ostatni/lazne-ostatni.jpg'), f('ostatni/tropicke-lazne-ostatni.jpg'), f('aktivity/spa-wellness-masaze.jpg'), f('maledivy/maledivy-spa.jpg'), f('bali/masaze.jpg'), f('aktivity/sauna.jpg')],
      kontakt: { adresa: 'Údolní 8, Brno', tel: '+420 600 000 000', doba: 'Út–So 9.00–19.00' },
      ikona: 'nuzky', karta: 'Přidán web kadeřnictví'
    },
    cestovka: {
      klic: 'cestovka', obor: 'Cestovka', nazev: 'Ostrovy s Martinou', mesto: 'Praha',
      zadani: 'Web pro malou cestovku, která vozí lidi na řecké ostrovy. Nabídka zájezdů, termíny a poptávka.',
      stitek: 'Cestovní kancelář', slogan: 'Malé skupiny, řecké ostrovy a průvodkyně, která je zná jako svoje boty.',
      cta: 'Poptat zájezd', hero: f('francie/korsika/plaz-saleccia-korsika.jpg'),
      nabidkaNazev: 'Zájezdy', nabidkaUvod: 'Termíny od května do října, skupiny nejvýš 12 lidí.',
      polozky: [
        { n: 'Chios', p: '8 dní, skalnaté zátoky a vesničky', c: 'od 18 900 Kč', foto: f('recko/ostrovy/chios/plaz-mavra-volia-chios.jpg') },
        { n: 'Zakynthos', p: '8 dní, pláže a západy slunce', c: 'od 16 400 Kč', foto: f('recko/ostrovy/zakynthos/plaz-vassilikos-zakynhtos.jpg') },
        { n: 'Kos a Nisyros', p: '10 dní, dva ostrovy', c: 'od 21 300 Kč', foto: f('recko/ostrovy/kos/plaz-mandraki-na-ostrove-nysiros-kos.jpg') },
        { n: 'Kréta', p: '10 dní, hory i moře', c: 'od 22 900 Kč', foto: f('recko/ostrovy/kreta/jezero-vulismenskeho-ajos-nikolaos-kreta.jpg') }
      ],
      vyhody: ['Skupiny do 12 lidí', 'Česká průvodkyně', 'Letenka v ceně'],
      galerie: [f('recko/ostrovy/chios/plaz-mavra-volia-chios.jpg'), f('recko/ostrovy/zakynthos/plaz-vassilikos-zakynhtos.jpg'), f('ostatni/taverna-v-recku-3-ostatni.jpg'), f('recko/ostrovy/santorini/horse-na-santorini.jpg'), f('ostatni/zena-na-skale-s-vyhledem-na-more-vylet.jpg'), f('recko/ostrovy/kos/greece-taverna-5.jpg')],
      kontakt: { adresa: 'Vinohradská 30, Praha', tel: '+420 600 000 000', doba: 'Po–Pá 9.00–17.00' },
      ikona: 'letadlo', karta: 'Přidán web cestovky'
    },
    remeslnik: {
      klic: 'remeslnik', obor: 'Řemeslník', nazev: 'Instalatér Dvořák', mesto: 'Plzeň',
      zadani: 'Web pro instalatéra v Plzni a okolí. Služby, ceník výjezdu, havarijní linka a kontaktní formulář.',
      stitek: 'Voda, topení, plyn', slogan: 'Opravy a instalace v Plzni a okolí. Při havárii přijedu do hodiny.',
      cta: 'Zavolat', hero: '',
      nabidkaNazev: 'Služby', nabidkaUvod: 'Výjezd po Plzni 390 Kč, práce podle skutečného času.',
      polozky: [
        { n: 'Havárie vody', p: 'nonstop, výjezd do hodiny', c: 'od 890 Kč', foto: '' },
        { n: 'Výměna baterie', p: 'kuchyň i koupelna', c: 'od 690 Kč', foto: '' },
        { n: 'Kotle a topení', p: 'servis a revize', c: 'od 1 490 Kč', foto: '' },
        { n: 'Rekonstrukce koupelny', p: 'rozvody vody a odpadů', c: 'dohodou', foto: '' }
      ],
      vyhody: ['Nonstop linka', 'Záruka 2 roky', 'Faktura i pro firmy'],
      galerie: [],
      kontakt: { adresa: 'Plzeň a okolí do 30 km', tel: '+420 600 000 000', doba: 'Nonstop' },
      ikona: 'klic', karta: 'Přidán web řemeslníka'
    },
    fotograf: {
      klic: 'fotograf', obor: 'Fotograf', nazev: 'Klára Fotí', mesto: 'Liberec',
      zadani: 'Web pro svatební fotografku z Liberce. Portfolio, balíčky a ceny, volné termíny a kontakt.',
      stitek: 'Svatební fotografka', slogan: 'Fotky, ke kterým se budete vracet. Svatby, páry a rodiny.',
      cta: 'Volné termíny', hero: f('ostatni/svatba-v-karibiku.jpg'),
      nabidkaNazev: 'Balíčky', nabidkaUvod: 'Každý balíček obsahuje upravené fotky v online galerii.',
      polozky: [
        { n: 'Obřad', p: '3 hodiny, 150 fotek', c: '9 900 Kč', foto: f('chorvatsko/svatba-v-chorvatsku.jpg') },
        { n: 'Celý den', p: '10 hodin, 500 fotek', c: '24 900 Kč', foto: f('maledivy/svatba-na-maledivach.jpg') },
        { n: 'Páry', p: '1,5 hodiny venku', c: '3 900 Kč', foto: f('ostatni/par-na-pesi-den-v-tropickem-lese-ostatni.jpg') },
        { n: 'Rodina', p: '1 hodina, 40 fotek', c: '2 900 Kč', foto: f('aktivity/turistika-s-detmi.jpg') }
      ],
      vyhody: ['Fotky do 3 týdnů', 'Online galerie', 'Cestuji po celé ČR'],
      galerie: [f('ostatni/svatba-v-karibiku.jpg'), f('bali/svatba-bali.jpg'), f('mauricius/svatba-na-mauriciu.jpg'), f('recko/ostrovy/rhodos/svatba-na-rhodosu.jpg'), f('recko/ostrovy/zakynthos/svatba-na-zakynthu.jpg'), f('nizozemsko/holandsko/keukenhof-gardens-nizozemsko.jpg')],
      kontakt: { adresa: 'Liberec, focení po celé ČR', tel: '+420 600 000 000', doba: 'Odpovídám do 24 hodin' },
      ikona: 'foto', karta: 'Přidán web fotografky'
    }
  };
  // Obor poznáváme jen podle jasných slov. Dřív /vlas/ chytalo „vlastní“, /oprav/ „opravdu“, /foto/ „fotky“.
  function poznejObor(text) {
    var t = (text || '').toLowerCase();
    if (/kadeřn|kadern|vlasy|vlasů|vlasov|střih|strih|barber|holičstv|holicstv/.test(t)) return 'kadernictvi';
    if (/cestovk|cestovní kancel|cestovni kancel|zájezd|zajezd/.test(t)) return 'cestovka';
    if (/fotograf|focení|foceni|svatební foto|svatebni foto/.test(t)) return 'fotograf';
    if (/řemesl|remesl|instalatér|instalater|elektrikář|elektrikar|truhlář|truhlar|zedník|zednik|topenář|topenar|opravář|opravar/.test(t)) return 'remeslnik';
    if (/restaura|bistro|kavárn|kavarn|hospod|pizzer|jídeln|jideln|polední menu|poledni menu/.test(t)) return 'restaurace';
    return '';
  }

  // Zadání mimo pět ukázkových oborů: obecný osobní nebo firemní web, název a nadpis ze zadání.
  var NEUTRALNI = ['aktivity/odpocinek-u-jezera.jpg', 'ostatni/zena-na-skale-s-vyhledem-na-more-vylet.jpg', 'francie/francouzske-alpy/jezero-tignes-fr-alpy.jpg',
    'velka-britanie/anglie/lake-district-national-park-anglie.jpg', 'makedonie/zena-na-horach-makedonie.jpg', 'nizozemsko/holandsko/keukenhof-gardens-nizozemsko.jpg',
    'aktivity/joga.jpg', 'ceska-republika/liberec/jizerka-jizerske-hory.jpg'].map(f);
  var PREDLOZKY = /^(v|ve|na|z|ze|u|do|od|k|ke|po|při|pri|nad|pod|za|před|pred)$/i;
  function nominativ(w) {
    if (/ovi$/.test(w)) return w.slice(0, -3);
    if (/ice$/.test(w)) return w.slice(0, -3) + 'ika';
    if (/ce$/.test(w)) return w.slice(0, -2) + 'ka';
    if (/ře$/.test(w)) return w.slice(0, -2) + 'ra';
    if (/ze$/.test(w)) return w.slice(0, -2) + 'ga';
    if (/ii$/.test(w)) return w.slice(0, -1) + 'e';
    if (/ě$/.test(w)) return w.slice(0, -1) + 'a';
    if (/ku$/.test(w)) return w.slice(0, -1) + 'a';
    return w;
  }
  function velke(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }
  function jmenoZeZadani(text) {
    var slova = (text || '').replace(/[.,!?;:„“"()]/g, ' ').split(/\s+/).filter(Boolean);
    for (var i = 1; i < slova.length; i++) {
      var w = slova[i];
      if (!/^[A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ][a-záčďéěíňóřšťúůýž]{2,}$/.test(w)) continue;
      if (PREDLOZKY.test(slova[i - 1])) continue; // „v Olomouci“, „z Brna“ = místo, ne jméno
      return nominativ(w);
    }
    return '';
  }
  var VYPLN = /^(může|muze|mohla|mohl|můžu|muzu|můžeme|muzeme|bude|budu|by|bych|si|se|řešit|resit|psát|psat|sdílet|sdilet|ukazovat|ukázat|ukazat|sepisovat|zapisovat|mít|mit|dávat|davat|svoje|své|sve|svůj|svuj|moje|mé|me|naše|nase|jeho|její|jeji|ty|ten|ta|to)$/i;
  function temaZeZadani(text) {
    var t = (text || '').replace(/[„“"()!?]/g, ' ').replace(/\s+/g, ' ').trim().replace(/[.;:]+$/, ''), m, tema = '';
    if ((m = t.match(/(?:^|\s)o\s+(.+)$/i))) tema = 'o ' + m[1];
    else if ((m = t.match(/(?:^|\s)(?:kde|na kterém|na kterem|ve kterém|ve kterem|abych|aby)\s+(.+)$/i))) {
      var s = m[1].split(' '); while (s.length && VYPLN.test(s[0])) s.shift(); tema = s.join(' ');
    } else if ((m = t.match(/(?:^|\s)(?:web|stránk[uy]|blog)\s+(?:pro|na)\s+(.+)$/i))) { var s2 = m[1].split(' '); while (s2.length && VYPLN.test(s2[0])) s2.shift(); tema = s2.join(' '); }
    var slova = tema.split(' ').filter(Boolean);
    if (slova.length > 6) slova = slova.slice(0, 6);
    return slova.join(' ').replace(/[,.]+$/, '');
  }
  function obecnyWeb(text, vlastniFotky) {
    var t = (text || '').toLowerCase();
    var firma = /firm|s\.r\.o|služb|sluzb|obchod|e-?shop|prodej|podnik|živnost|zivnost|zakázk|zakazk/.test(t);
    var jmeno = jmenoZeZadani(text), tema = temaZeZadani(text);
    if (jmeno && tema && tema.toLowerCase().indexOf(jmeno.toLowerCase().slice(0, 4)) === 0) tema = '';
    var nazev = jmeno && tema ? jmeno + ' — ' + tema : jmeno ? jmeno : tema ? velke(tema) : (firma ? 'Vaše firma' : 'Váš nový web');
    var h = 0; for (var i = 0; i < t.length; i++) h = (h * 31 + t.charCodeAt(i)) >>> 0;
    var k = h % NEUTRALNI.length, fotky = NEUTRALNI.slice(k).concat(NEUTRALNI.slice(0, k));
    var vlastni = (vlastniFotky || []).filter(Boolean);
    var tem = tema ? ' Téma: ' + tema + '.' : '';
    return {
      klic: 'obecny', obecny: true, firma: firma, obor: firma ? 'Firemní web' : 'Osobní web', nazev: nazev, mesto: '',
      zadani: text, stitek: firma ? 'Firemní web' : 'Osobní web',
      slogan: (firma ? 'Co děláme, pro koho a jak nás zastihnout.' : 'Zápisky, plány a inspirace na jednom místě.') + tem,
      cta: firma ? 'Nezávazně poptat' : 'Napsat mi', hero: vlastni[0] || fotky[0],
      nabidkaNazev: firma ? 'Služby' : 'Zápisky',
      nabidkaUvod: firma ? 'Každou zakázku nejdřív probereme, cenu řekneme předem.' : 'Krátké texty o tom, co mě zrovna zaměstnává. Nové přibývají průběžně.',
      polozky: firma ? [
        { n: 'Konzultace', p: 'probereme, co potřebujete', c: 'zdarma', foto: fotky[1] },
        { n: 'Realizace', p: 'od návrhu po předání', c: 'dohodou', foto: fotky[2] },
        { n: 'Servis', p: 'když je potřeba něco doladit', c: 'dohodou', foto: fotky[3] },
        { n: 'Na míru', p: 'cokoli, co v nabídce nevidíte', c: 'dohodou', foto: fotky[4] }
      ] : [
        { n: 'Proč tenhle web vznikl', p: 'první zápis a pár slov na úvod', c: '11. 10. 2026', foto: vlastni[1] || fotky[1] },
        { n: 'Co mě inspiruje', p: 'místa, lidé a věci, které dávají sílu', c: '4. 10. 2026', foto: vlastni[2] || fotky[2] },
        { n: 'Malé kroky', p: 'co se povedlo tento měsíc', c: '27. 9. 2026', foto: fotky[3] },
        { n: 'Plány na příští rok', p: 'seznam, ke kterému se budu vracet', c: '20. 9. 2026', foto: fotky[4] }
      ],
      vyhody: firma ? ['Odpověď do druhého dne', 'Cena předem', 'Faktura i pro firmy'] : ['Osobní zápisky', 'Fotky a inspirace', 'Kontakt jen pro blízké'],
      galerie: vlastni.concat(fotky).slice(0, 6),
      kontakt: firma ? { adresa: 'Adresu doplníte jednou větou', tel: '+420 600 000 000', doba: 'Po–Pá 9.00–17.00' } : { adresa: 'Napište přes formulář', tel: '', doba: 'Odpovídám obvykle do pár dnů' },
      kontaktNadpis: firma ? 'Ozvěte se' : 'Napište mi',
      ikona: 'foto', karta: 'Přidán web „' + nazev + '“', popisWebu: (firma ? 'firemní web' : 'osobní web')
    };
  }
  window.REDALIO = { CDN: CDN, OBORY: OBORY, poznejObor: poznejObor, obecnyWeb: obecnyWeb };
})();
