const herbEntries = [
  {
    name: 'Ashwagandha',
    botanical: 'Withania somnifera',
    aliases: ['Indian ginseng', 'winter cherry', 'ashwaganda'],
    summary: 'An Ayurvedic herb traditionally used in restorative and stress-support routines.',
    uses: ['Traditional use: restorative routines and general vitality', 'Research interest: stress, sleep and exercise outcomes vary by extract and study'],
    cautions: ['Avoid in pregnancy unless a qualified clinician advises otherwise', 'Use caution with thyroid, autoimmune or liver conditions'],
    interactions: 'May interact with sedatives, thyroid medicines, immunosuppressants and diabetes or blood-pressure medicines. Ask a pharmacist before use.',
    evidence: 'Evidence is condition-specific and product-specific; traditional use is not proof of treatment.'
  },
  {
    name: 'Brahmi',
    botanical: 'Bacopa monnieri',
    aliases: ['Bacopa', 'water hyssop', 'brahmi herb'],
    summary: 'A wetland herb traditionally used in Ayurvedic memory and concentration routines.',
    uses: ['Traditional use: memory, learning and calm-focus routines', 'Research interest: some cognitive outcomes, with variable evidence'],
    cautions: ['May cause digestive upset or increased tiredness', 'Seek advice for thyroid disease, slow heart rate or gastrointestinal conditions'],
    interactions: 'Ask a pharmacist about sedatives, thyroid medicines and medicines affected by liver enzymes.',
    evidence: 'Human studies exist, but results cannot be generalised to every preparation.'
  },
  {
    name: 'Chamomile',
    botanical: 'Matricaria chamomilla',
    aliases: ['German chamomile', 'camomile'],
    summary: 'A flowering herb commonly used in teas and calming evening routines.',
    uses: ['Traditional use: soothing tea and digestive comfort', 'Research interest: relaxation and mild digestive symptoms'],
    cautions: ['Avoid if allergic to ragweed, daisies or related plants', 'Seek advice before use around surgery or during pregnancy'],
    interactions: 'May increase bleeding risk with anticoagulants and may add to sedative effects.',
    evidence: 'Evidence varies by preparation; tea, essential oil and concentrated extract are not interchangeable.'
  },
  {
    name: 'Peppermint',
    botanical: 'Mentha x piperita',
    aliases: ['mint', 'peppermint leaf'],
    summary: 'An aromatic herb used fresh, dried and in some regulated preparations.',
    uses: ['Traditional use: digestive comfort and refreshing beverages', 'Research interest: some irritable-bowel symptoms for specific enteric-coated products'],
    cautions: ['May worsen reflux or heartburn', 'Keep concentrated oils away from children and never swallow essential oil without professional advice'],
    interactions: 'Ask a pharmacist about medicines affected by stomach acid or liver enzymes.',
    evidence: 'Any evidence for a specific product should not be transferred to ordinary tea or fresh leaves.'
  },
  {
    name: 'Lemon Balm',
    botanical: 'Melissa officinalis',
    aliases: ['melissa', 'balm mint'],
    summary: 'A lemon-scented herb used in calming teas and culinary preparations.',
    uses: ['Traditional use: relaxation and digestive comfort', 'Research interest: mood, sleep and cognition in small studies'],
    cautions: ['May cause drowsiness or digestive upset', 'Seek advice for thyroid conditions, pregnancy or breastfeeding'],
    interactions: 'May add to sedative effects and may affect thyroid medicines. Ask a pharmacist if taking regular medication.',
    evidence: 'Evidence is preliminary for many proposed uses.'
  },
  {
    name: 'Valerian',
    botanical: 'Valeriana officinalis',
    aliases: ['valerian root', 'garden heliotrope'],
    summary: 'A root traditionally used in evening and sleep-support routines.',
    uses: ['Traditional use: relaxation and sleep routines', 'Research interest: insomnia outcomes are mixed'],
    cautions: ['Do not combine with alcohol or other sedatives', 'Do not drive if drowsy; seek advice for liver disease or before surgery'],
    interactions: 'May interact with sleeping tablets, anxiety medicines, opioids and other sedatives.',
    evidence: 'Study results are inconsistent and products vary considerably.'
  },
  {
    name: 'Turmeric',
    botanical: 'Curcuma longa',
    aliases: ['curcumin', 'haldi', 'turmeric root'],
    summary: 'A culinary rhizome widely used in South Asian food and traditional practices.',
    uses: ['Traditional use: culinary and general wellness routines', 'Research interest: joint discomfort and inflammation markers for some extracts'],
    cautions: ['Use caution with gallstones, bile-duct disease, reflux or bleeding disorders', 'High-dose extracts are not the same as food amounts'],
    interactions: 'Ask a pharmacist about anticoagulants, antiplatelets, diabetes medicines and gallbladder medicines.',
    evidence: 'Curcumin research is extract-specific; food turmeric should not be presented as a treatment.'
  },
  {
    name: 'Ginger',
    botanical: 'Zingiber officinale',
    aliases: ['ginger root', 'adrak'],
    summary: 'A culinary spice and traditional herb used fresh, dried or as a tea.',
    uses: ['Traditional use: digestive comfort and warming preparations', 'Research interest: nausea in some situations and menstrual discomfort'],
    cautions: ['May cause heartburn or mouth irritation', 'Use caution with gallstones and before surgery'],
    interactions: 'Ask a pharmacist about anticoagulants, antiplatelets and diabetes medicines.',
    evidence: 'Evidence depends on dose, formulation and the specific symptom.'
  },
  {
    name: 'Tulsi',
    botanical: 'Ocimum tenuiflorum',
    aliases: ['holy basil', 'tulasi', 'sacred basil'],
    summary: 'An aromatic basil traditionally valued in Ayurvedic household routines.',
    uses: ['Traditional use: calming, respiratory and daily wellness routines', 'Research interest: stress and metabolic markers remain preliminary'],
    cautions: ['Avoid medicinal doses in pregnancy unless advised', 'Use caution with bleeding disorders and diabetes'],
    interactions: 'May interact with anticoagulants and diabetes medicines; ask a pharmacist before concentrated extracts.',
    evidence: 'Traditional use and early research should be clearly separated.'
  },
  {
    name: 'Milk Thistle',
    botanical: 'Silybum marianum',
    aliases: ['silymarin', 'st marys thistle', 'milk thistle seed'],
    summary: 'A flowering plant whose seeds are used in some traditional liver-focused products.',
    uses: ['Traditional use: digestive and liver-support routines', 'Research interest: liver outcomes are mixed and condition-specific'],
    cautions: ['Avoid or seek advice if allergic to the daisy family', 'Medical liver disease requires clinical assessment'],
    interactions: 'Ask a pharmacist about medicines processed by the liver and diabetes medicines.',
    evidence: 'It should not be marketed as a liver treatment or detox cure.'
  },
  {
    name: 'Echinacea',
    botanical: 'Echinacea purpurea',
    aliases: ['coneflower', 'purple coneflower'],
    summary: 'A flowering plant used in some seasonal wellness products.',
    uses: ['Traditional use: seasonal wellness routines', 'Research interest: cold prevention and duration results are inconsistent'],
    cautions: ['Avoid if allergic to the daisy family', 'Use caution with autoimmune conditions or immunosuppressive treatment'],
    interactions: 'Ask a pharmacist about immunosuppressants and medicines processed by the liver.',
    evidence: 'Different Echinacea species and plant parts are not equivalent.'
  },
  {
    name: 'Sage',
    botanical: 'Salvia officinalis',
    aliases: ['common sage', 'garden sage'],
    summary: 'A culinary herb traditionally used in teas, food and oral-care preparations.',
    uses: ['Traditional use: digestive and throat-comfort routines', 'Research interest: memory and menopausal symptoms remain preliminary'],
    cautions: ['Avoid high-dose essential oil; use caution in pregnancy and seizure disorders'],
    interactions: 'Ask a pharmacist about anticonvulsants and medicines affected by liver enzymes.',
    evidence: 'Food use and concentrated extracts have different safety profiles.'
  },
  {
    name: 'Nettle',
    botanical: 'Urtica dioica',
    aliases: ['stinging nettle', 'nettle leaf', 'nettle root'],
    summary: 'A common edible plant used after safe preparation and in traditional herbal products.',
    uses: ['Traditional use: spring greens and urinary or joint-support routines', 'Research interest: prostate and joint outcomes are product-specific'],
    cautions: ['Do not use fresh without proper preparation', 'Use caution with kidney, heart or blood-pressure conditions'],
    interactions: 'May interact with diuretics, blood-pressure medicines, diabetes medicines and anticoagulants.',
    evidence: 'Leaf and root products are different materials and should not be conflated.'
  },
  {
    name: 'Rosemary',
    botanical: 'Salvia rosmarinus',
    aliases: ['rosemary leaf', 'Rosmarinus officinalis'],
    summary: 'A fragrant culinary herb used fresh, dried and in traditional preparations.',
    uses: ['Traditional use: culinary, digestive and aromatic routines', 'Research interest: memory and scalp applications are still limited'],
    cautions: ['Avoid concentrated oil by mouth; use caution with seizure disorders and pregnancy'],
    interactions: 'Ask a pharmacist about anticoagulants and anticonvulsants before concentrated use.',
    evidence: 'Normal food use is not equivalent to a medicinal-dose extract.'
  },
  {
    name: 'Licorice',
    botanical: 'Glycyrrhiza glabra',
    aliases: ['liquorice', 'licorice root', 'mulethi'],
    summary: 'A sweet-tasting root found in traditional preparations and confectionery.',
    uses: ['Traditional use: throat and digestive preparations', 'Research interest: specific products and symptoms only'],
    cautions: ['Avoid medicinal doses with high blood pressure, heart or kidney disease', 'Long-term or high-dose use can lower potassium'],
    interactions: 'Can interact with diuretics, steroids, digoxin, blood-pressure medicines and many others. Ask a pharmacist.',
    evidence: 'This is a high-priority safety herb; more is not better.'
  },
  {
    name: 'Fenugreek',
    botanical: 'Trigonella foenum-graecum',
    aliases: ['methi', 'fenugreek seed'],
    summary: 'A culinary seed used in South Asian food and traditional preparations.',
    uses: ['Traditional use: culinary and digestive routines', 'Research interest: blood glucose and lactation evidence is mixed'],
    cautions: ['May cause digestive symptoms or allergy; avoid medicinal doses in pregnancy unless advised'],
    interactions: 'May lower blood glucose and interact with anticoagulants. Ask a pharmacist if taking medication.',
    evidence: 'Food use and concentrated seed extracts are not interchangeable.'
  },
  {
    name: 'Dandelion',
    botanical: 'Taraxacum officinale',
    aliases: ['dandelion root', 'dandelion leaf'],
    summary: 'A familiar edible plant used in teas and traditional digestive routines.',
    uses: ['Traditional use: digestive and diuretic routines', 'Research interest: limited clinical evidence for many claims'],
    cautions: ['Avoid or seek advice with bile-duct blockage, gallstones or daisy-family allergy'],
    interactions: 'Ask a pharmacist about diuretics, lithium, diabetes medicines and medicines affected by potassium.',
    evidence: 'Leaf, root and roasted preparations differ in chemistry and use.'
  },
  {
    name: 'Ginkgo',
    botanical: 'Ginkgo biloba',
    aliases: ['ginkgo leaf', 'maidenhair tree'],
    summary: 'A tree leaf used in standardised extracts and traditional East Asian practices.',
    uses: ['Traditional use: circulation and cognitive-support routines', 'Research interest: dementia and circulation results are not conclusive'],
    cautions: ['Avoid around surgery and use caution with seizure disorders or bleeding risk'],
    interactions: 'May interact with anticoagulants, antiplatelets, anticonvulsants and some antidepressants.',
    evidence: 'Standardisation matters; leaf products are not all equivalent.'
  },
  {
    name: 'St Johns Wort',
    botanical: 'Hypericum perforatum',
    aliases: ['St John’s wort', 'hypericum'],
    summary: 'A flowering herb with significant medicine-interaction concerns.',
    uses: ['Traditional use: mood-support preparations', 'Research interest: mild to moderate depression in specific standardised products'],
    cautions: ['Do not self-start for depression; seek professional advice', 'Can increase sun sensitivity'],
    interactions: 'Interacts with many medicines, including the contraceptive pill, anticoagulants, transplant medicines, HIV medicines and antidepressants. Ask a pharmacist first.',
    evidence: 'This herb should never be sold with casual medicine advice.'
  }
];

const globalReferenceHerbs = [
  'Aloe vera', 'Anise', 'Artichoke', 'Astragalus', 'Basil', 'Bay leaf', 'Bee balm', 'Bilberry', 'Black cohosh', 'Black cumin',
  'Black pepper', 'Blessed thistle', 'Borage', 'Calendula', 'Cardamom', 'Cayenne', 'Celery seed', 'Chasteberry', 'Chickweed', 'Cinnamon',
  'Clove', 'Coriander', 'Cranberry', 'Cumin', 'Damiana', 'Dill', 'Elderberry', 'Elderflower', 'Elecampane', 'Fennel',
  'Feverfew', 'Frankincense', 'Garlic', 'Gotu kola', 'Green tea', 'Hawthorn', 'Hibiscus', 'Hops', 'Horseradish', 'Hyssop',
  'Jasmine', 'Juniper', 'Kava', 'Kelp', 'Kudzu', 'Lavender', 'Marshmallow root', 'Meadowsweet', 'Moringa', 'Mugwort',
  'Mullein', 'Myrrh', 'Oat straw', 'Olive leaf', 'Oregano', 'Passionflower', 'Pau d’arco', 'Parsley', 'Passion fruit leaf', 'Pennyroyal',
  'Plantain leaf', 'Pomegranate', 'Red clover', 'Rhodiola', 'Rooibos', 'Saffron', 'Saint Johns wort', 'Schisandra', 'Shatavari', 'Skullcap',
  'Slippery elm', 'Spearmint', 'Spirulina', 'Star anise', 'Suma', 'Tarragon', 'Thyme', 'Tribulus', 'Uva ursi', 'Valerian',
  'Wheatgrass', 'White willow', 'Wild yam', 'Witch hazel', 'Wormwood', 'Yarrow', 'Yerba mate', 'Yohimbe', 'Zest of lemon', 'Ziziphus'
];

globalReferenceHerbs.forEach((name) => {
  if (!herbEntries.some((entry) => normalise(entry.name) === normalise(name))) {
    herbEntries.push({
      name,
      botanical: 'Reference index entry - botanical identity to verify',
      aliases: [],
      summary: 'Included as a global reference entry. AuraTrace has not yet published a detailed evidence or safety profile for this plant.',
      uses: ['No use summary published yet - traditional names and uses vary by region and preparation.'],
      cautions: ['Do not use this index entry as a safety recommendation.', 'Wait for a verified profile or consult a qualified professional.'],
      interactions: 'Not assessed in this reference entry. Ask a pharmacist before using any herb with medicines.',
      evidence: 'Detailed botanical, evidence and safety review pending.'
    });
  }
});

const searchInput = document.getElementById('herb-search');
const dictionaryResults = document.getElementById('dictionary-results');
const dictionaryStatus = document.getElementById('dictionary-status');

function normalise(value) {
  return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9 ]/g, '').trim();
}

function distance(left, right) {
  const row = Array.from({ length: right.length + 1 }, (_, index) => index);
  for (let rowIndex = 1; rowIndex <= left.length; rowIndex += 1) {
    let diagonal = row[0];
    row[0] = rowIndex;
    for (let columnIndex = 1; columnIndex <= right.length; columnIndex += 1) {
      const above = row[columnIndex];
      row[columnIndex] = left[rowIndex - 1] === right[columnIndex - 1]
        ? diagonal
        : Math.min(diagonal + 1, row[columnIndex] + 1, row[columnIndex - 1] + 1);
      diagonal = above;
    }
  }
  return row[right.length];
}

function scoreEntry(entry, query) {
  const values = [entry.name, entry.botanical, ...entry.aliases].map(normalise);
  if (!query) return 0;
  if (values.some((value) => value.startsWith(query))) return 0;
  if (values.some((value) => value.includes(query))) return 1;
  return Math.min(...values.map((value) => distance(query, value.split(' ')[0])));
}

function renderEntries(query = '') {
  const cleanQuery = normalise(query);
  const ranked = herbEntries
    .map((entry) => ({ entry, score: scoreEntry(entry, cleanQuery) }))
    .filter(({ score }) => !cleanQuery || score <= Math.max(2, Math.floor(cleanQuery.length / 3)))
    .sort((left, right) => left.score - right.score || left.entry.name.localeCompare(right.entry.name));

  dictionaryResults.innerHTML = ranked.length
    ? ranked.map(({ entry }) => `
      <article class="dictionary-card">
        <div class="dictionary-card-heading">
          <div><p class="eyebrow">${entry.botanical}</p><h3>${entry.name}</h3></div>
          <span class="dictionary-badge">Education</span>
        </div>
        <p>${entry.summary}</p>
        <h4>Traditional use and research</h4>
        <ul>${entry.uses.map((item) => `<li>${item}</li>`).join('')}</ul>
        <h4>Important cautions</h4>
        <ul>${entry.cautions.map((item) => `<li>${item}</li>`).join('')}</ul>
        <p><strong>Medicine interactions:</strong> ${entry.interactions}</p>
        <p class="dictionary-evidence"><strong>Evidence note:</strong> ${entry.evidence}</p>
      </article>
    `).join('')
    : '<p class="empty-state">No close match found. Try the botanical name, an alias or a shorter spelling.</p>';

  dictionaryStatus.textContent = cleanQuery
    ? `${ranked.length} close match${ranked.length === 1 ? '' : 'es'} for “${query}”.`
    : `${herbEntries.length} reference entries currently available in the living dictionary.`;
}

searchInput.addEventListener('input', (event) => renderEntries(event.target.value));
renderEntries();
