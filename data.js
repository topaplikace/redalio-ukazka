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
  function poznejObor(text) {
    var t = (text || '').toLowerCase();
    if (/kade|vlas|salon|střih|strih|barber/.test(t)) return 'kadernictvi';
    if (/cest|zájezd|zajezd|dovolen|ostrov|výlet|vylet/.test(t)) return 'cestovka';
    if (/foto/.test(t)) return 'fotograf';
    if (/řemesl|remesl|instal|elektr|truhl|zedn|malíř|malir|topen|oprav/.test(t)) return 'remeslnik';
    if (/restaur|bistro|jídl|jidl|kavár|kavar|hosp|menu|pizz/.test(t)) return 'restaurace';
    return '';
  }
  window.REDALIO = { CDN: CDN, OBORY: OBORY, poznejObor: poznejObor };
})();
