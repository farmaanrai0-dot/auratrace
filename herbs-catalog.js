// Comprehensive Herb Catalog for AuraTrace
// Contains existing herbs plus famous and useful herbs with descriptions and images

const herbsCatalog = [
  // Existing AuraTrace Herbs
  {
    id: 'ashwagandha',
    name: 'Ashwagandha',
    scientificName: 'Withania somnifera',
    category: 'Adaptogen',
    description: 'Ancient medicinal herb classified as an adaptogen, meaning it can help your body manage stress. Ashwagandha also provides numerous other benefits for your body and brain, including boosting brain function, lowering blood sugar and cortisol levels, and helping fight symptoms of anxiety and depression.',
    benefits: ['Reduces stress and anxiety', 'Improves sleep quality', 'Enhances muscle strength', 'Supports cognitive function', 'Balances thyroid hormones'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Withania_somnifera.jpg/1280px-Withania_somnifera.jpg',
    traditionalUse: 'Used in Ayurvedic medicine for over 3,000 years as a Rasayana (rejuvenator) to increase energy and improve overall health.',
    dosage: '300-500mg daily of root extract',
    precautions: 'Consult doctor if pregnant, breastfeeding, or have thyroid conditions'
  },
  {
    id: 'arjuna',
    name: 'Arjuna',
    scientificName: 'Terminalia arjuna',
    category: 'Cardiovascular Support',
    description: 'A powerful herb traditionally used in Ayurvedic medicine for heart health. The bark of the Arjuna tree contains compounds that may help strengthen heart muscles, improve cardiovascular function, and maintain healthy blood pressure levels.',
    benefits: ['Supports heart health', 'Maintains healthy blood pressure', 'Strengthens cardiac muscles', 'Antioxidant properties', 'Supports healthy cholesterol levels'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Terminalia_arjuna_-_Kolkata.jpg/1280px-Terminalia_arjuna_-_Kolkata.jpg',
    traditionalUse: 'Named after Arjuna from the Mahabharata epic, traditionally used to treat heart conditions and improve cardiac function.',
    dosage: '500-1000mg bark extract daily',
    precautions: 'Consult doctor before use if taking heart medications'
  },
  {
    id: 'brahmi',
    name: 'Brahmi',
    scientificName: 'Bacopa monnieri',
    category: 'Brain Health',
    description: 'A perennial herb traditionally used in Ayurvedic medicine as a brain tonic. Brahmi is known for its ability to improve cognitive function, enhance memory, and promote mental clarity. It contains powerful antioxidants that protect brain cells from damage.',
    benefits: ['Enhances memory and learning', 'Reduces anxiety and stress', 'Improves concentration', 'Neuroprotective properties', 'Supports mental clarity'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Bacopa_monnieri_-_Kolkata.jpg/1280px-Bacopa_monnieri_-_Kolkata.jpg',
    traditionalUse: 'Used by ancient scholars to memorize long scriptures and enhance learning capabilities.',
    dosage: '300-600mg daily',
    precautions: 'May interact with certain medications, consult healthcare provider'
  },
  {
    id: 'giloy',
    name: 'Giloy',
    scientificName: 'Tinospora cordifolia',
    category: 'Immunity Booster',
    description: 'A powerful immunomodulator herb known as "Amrita" or the root of immortality in Ayurveda. Giloy helps purify blood, fight bacteria, and combat various diseases. It is particularly effective in boosting immunity and fighting recurrent infections.',
    benefits: ['Boosts immune system', 'Anti-inflammatory properties', 'Detoxifies blood', 'Fights respiratory infections', 'Supports liver health'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Tinospora_cordifolia.jpg/1280px-Tinospora_cordifolia.jpg',
    traditionalUse: 'Used in traditional medicine to treat fevers, infections, and as a general health tonic.',
    dosage: '500-1000mg daily or as decoction',
    precautions: 'Avoid during pregnancy, consult doctor for autoimmune conditions'
  },
  {
    id: 'apamarga',
    name: 'Apamarga',
    scientificName: 'Achyranthes aspera',
    category: 'Digestive Health',
    description: 'A medicinal herb traditionally used for digestive and urinary health. Apamarga Kshara (alkaline preparation) is particularly known for its diuretic properties and ability to support urinary tract health while maintaining digestive comfort.',
    benefits: ['Supports urinary health', 'Aids digestion', 'Diuretic properties', 'Anti-inflammatory', 'Supports kidney function'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Achyranthes_aspera.jpg/1280px-Achyranthes_aspera.jpg',
    traditionalUse: 'Traditionally used in Ayurvedic formulations for urinary and digestive support.',
    dosage: 'As per practitioner recommendation',
    precautions: 'Consult Ayurvedic practitioner for proper dosage'
  },
  {
    id: 'ayush-kwath',
    name: 'Ayush Kwath',
    scientificName: 'Herbal Decoction Blend',
    category: 'Respiratory Support',
    description: 'A classical Ayurvedic herbal decoction recommended by AYUSH Ministry for respiratory health. This potent blend includes Tulsi, Dalchini, Sunthi, and Krishna Marich - herbs known for their immune-boosting and respiratory support properties.',
    benefits: ['Boosts respiratory health', 'Strengthens immunity', 'Anti-viral properties', 'Supports lung function', 'Fights seasonal infections'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Ocimum_tenuiflorum_Tulsi.jpg/1280px-Ocimum_tenuiflorum_Tulsi.jpg',
    traditionalUse: 'Traditional kadha (herbal decoction) used for centuries to treat respiratory conditions and boost immunity.',
    dosage: '3-5g boiled in water, consumed as tea',
    precautions: 'Avoid excessive use, consult doctor if pregnant'
  },

  // Famous and Useful Herbs
  {
    id: 'turmeric',
    name: 'Turmeric',
    scientificName: 'Curcuma longa',
    category: 'Anti-inflammatory',
    description: 'The golden spice of India, turmeric contains curcumin, a powerful compound with strong anti-inflammatory and antioxidant properties. It has been used for thousands of years in traditional medicine and is now backed by modern science for its numerous health benefits.',
    benefits: ['Powerful anti-inflammatory', 'Strong antioxidant', 'Supports joint health', 'Aids digestion', 'Supports brain function'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Turmeric_powder.jpg/1280px-Turmeric_powder.jpg',
    traditionalUse: 'Used in Ayurvedic and traditional Chinese medicine for over 4,000 years as a healing herb.',
    dosage: '500-2000mg curcumin daily with black pepper',
    precautions: 'May interact with blood thinners, consult doctor before surgery'
  },
  {
    id: 'tulsi',
    name: 'Tulsi (Holy Basil)',
    scientificName: 'Ocimum sanctum',
    category: 'Adaptogen',
    description: 'Sacred plant in Hinduism known as "The Queen of Herbs" or "Holy Basil." Tulsi is a powerful adaptogen that helps the body adapt to stress and promotes mental balance. It is revered for its spiritual significance and medicinal properties.',
    benefits: ['Reduces stress and anxiety', 'Supports respiratory health', 'Boosts immunity', 'Balances blood sugar', 'Promotes longevity'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Ocimum_tenuiflorum_Tulsi.jpg/1280px-Ocimum_tenuiflorum_Tulsi.jpg',
    traditionalUse: 'Sacred plant used in daily rituals and traditional medicine for thousands of years.',
    dosage: '2-3 fresh leaves daily or 300-600mg extract',
    precautions: 'Avoid during pregnancy, may slow blood clotting'
  },
  {
    id: 'ginger',
    name: 'Ginger',
    scientificName: 'Zingiber officinale',
    category: 'Digestive Aid',
    description: 'A flowering plant whose rhizome (ginger root) is widely used as a spice and traditional medicine. Ginger contains gingerol, a bioactive compound with powerful medicinal properties including anti-inflammatory, antioxidant, and digestive benefits.',
    benefits: ['Aids digestion', 'Reduces nausea', 'Anti-inflammatory', 'Supports immune health', 'Relieves muscle pain'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Ginger.jpg/1280px-Ginger.jpg',
    traditionalUse: 'Used in traditional medicine for over 2,000 years to treat various ailments.',
    dosage: '1-3g fresh ginger daily or 500-1000mg extract',
    precautions: 'May interact with blood thinners, consult doctor if pregnant'
  },
  {
    id: 'neem',
    name: 'Neem',
    scientificName: 'Azadirachta indica',
    category: 'Skin Health',
    description: 'A versatile medicinal tree known as "Village Pharmacy" in India. Every part of the neem tree has medicinal properties. Neem is particularly renowned for its benefits for skin health, blood purification, and as a natural pesticide.',
    benefits: ['Supports skin health', 'Blood purifying', 'Antibacterial properties', 'Supports liver health', 'Promotes wound healing'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Azadirachta_indica_%28Neem%29.jpg/1280px-Azadirachta_indica_%28Neem%29.jpg',
    traditionalUse: 'Used in Ayurvedic medicine for over 4,500 years for various health conditions.',
    dosage: 'As per practitioner recommendation',
    precautions: 'Avoid during pregnancy, may affect fertility'
  },
  {
    id: 'triphala',
    name: 'Triphala',
    scientificName: 'Three Fruit Blend',
    category: 'Digestive Health',
    description: 'A traditional Ayurvedic formula consisting of three fruits: Amalaki (Amla), Bibhitaki, and Haritaki. Triphala is a powerful digestive tonic that supports overall health, gentle detoxification, and regular bowel movements without causing dependency.',
    benefits: ['Supports digestion', 'Gentle detoxification', 'Rich in antioxidants', 'Supports immune health', 'Promotes regularity'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Phyllanthus_emblica.jpg/1280px-Phyllanthus_emblica.jpg',
    traditionalUse: 'Used in Ayurvedic medicine for centuries as a daily health tonic and digestive aid.',
    dosage: '500-1000mg before bed or as directed',
    precautions: 'May cause loose stools initially, adjust dosage accordingly'
  },
  {
    id: 'amla',
    name: 'Amla (Indian Gooseberry)',
    scientificName: 'Phyllanthus emblica',
    category: 'Antioxidant',
    description: 'One of the most important herbs in Ayurvedic medicine, Amla is known as a powerful rejuvenator. It contains extremely high levels of vitamin C and antioxidants, supports immune function, promotes hair health, and aids digestion.',
    benefits: ['Highest natural vitamin C source', 'Powerful antioxidant', 'Supports hair health', 'Boosts immunity', 'Aids digestion'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Phyllanthus_emblica.jpg/1280px-Phyllanthus_emblica.jpg',
    traditionalUse: 'Used in Ayurvedic medicine for thousands of years as a Rasayana (rejuvenator).',
    dosage: '1-2 fresh fruits daily or 500-1000mg powder',
    precautions: 'May interact with certain medications, consult doctor'
  },
  {
    id: 'shatavari',
    name: 'Shatavari',
    scientificName: 'Asparagus racemosus',
    category: 'Women Health',
    description: 'A powerful adaptogenic herb traditionally used to support women health throughout all stages of life. Shatavari means "she who possesses 100 husbands," referring to its rejuvenating effects on the female reproductive system.',
    benefits: ['Supports women health', 'Hormonal balance', 'Lactation support', 'Reduces stress', 'Anti-inflammatory'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Asparagus_racemosus.jpg/1280px-Asparagus_racemosus.jpg',
    traditionalUse: 'Used in Ayurvedic medicine for women health for over 2,000 years.',
    dosage: '500-1000mg daily',
    precautions: 'Avoid during pregnancy, consult doctor for hormone-sensitive conditions'
  },
  {
    id: 'guduchi',
    name: 'Guduchi (Giloy)',
    scientificName: 'Tinospora cordifolia',
    category: 'Immunity Booster',
    description: 'One of the most valued rejuvenating herbs in Ayurvedic medicine. Guduchi is known for its powerful immunomodulatory properties, ability to detoxify the body, and support liver function. It is considered one of the three Amrit (ambrosia) herbs in Ayurveda.',
    benefits: ['Boosts immunity', 'Liver protective', 'Anti-inflammatory', 'Detoxifying', 'Supports respiratory health'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Tinospora_cordifolia.jpg/1280px-Tinospora_cordifolia.jpg',
    traditionalUse: 'Used in Ayurvedic medicine for thousands of years as a rejuvenator and immunity booster.',
    dosage: '500-1000mg daily or as decoction',
    precautions: 'Consult doctor for autoimmune conditions'
  },
  {
    id: 'moringa',
    name: 'Moringa',
    scientificName: 'Moringa oleifera',
    category: 'Nutritional Powerhouse',
    description: 'Often called the "Miracle Tree" or "Tree of Life," Moringa is incredibly nutritious. Every part of the tree is edible and medicinal. It contains over 90 nutrients, 46 antioxidants, and all essential amino acids, making it one of nature most complete foods.',
    benefits: ['Extremely nutritious', 'Powerful antioxidant', 'Supports energy levels', 'Anti-inflammatory', 'Supports blood sugar control'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Moringa_oleifera_-_Kolkata.jpg/1280px-Moringa_oleifera_-_Kolkata.jpg',
    traditionalUse: 'Used in traditional medicine for thousands of years across Asia and Africa.',
    dosage: '1-3 teaspoons powder daily',
    precautions: 'May interact with thyroid medications, consult doctor'
  },
  {
    id: 'licorice',
    name: 'Licorice',
    scientificName: 'Glycyrrhiza glabra',
    category: 'Respiratory Support',
    description: 'A sweet-tasting herb used traditionally for respiratory and digestive health. Licorice root contains glycyrrhizin, a compound with anti-inflammatory and antiviral properties. It is particularly beneficial for throat health and soothing respiratory discomfort.',
    benefits: ['Soothes throat', 'Supports respiratory health', 'Anti-inflammatory', 'Aids digestion', 'Supports adrenal function'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Glycyrrhiza_glabra_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen.jpg/1280px-Glycyrrhiza_glabra_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen.jpg',
    traditionalUse: 'Used in traditional Chinese and Ayurvedic medicine for thousands of years.',
    dosage: '200-400mg extract daily',
    precautions: 'Avoid long-term use, may raise blood pressure'
  },
  {
    id: 'cinnamon',
    name: 'Cinnamon',
    scientificName: 'Cinnamomum verum',
    category: 'Blood Sugar Support',
    description: 'A fragrant spice with powerful medicinal properties. Cinnamon is rich in antioxidants and has been shown to help regulate blood sugar levels, support heart health, and provide anti-inflammatory benefits. It is one of the oldest spices known to mankind.',
    benefits: ['Supports blood sugar control', 'Powerful antioxidant', 'Anti-inflammatory', 'Supports heart health', 'Antimicrobial properties'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Cinnamon_bark.jpg/1280px-Cinnamon_bark.jpg',
    traditionalUse: 'Used in traditional medicine for over 4,000 years as a healing spice.',
    dosage: '1-6g daily (1/2 to 1 teaspoon)',
    precautions: 'Cassia cinnamon contains coumarin, use Ceylon cinnamon for long-term use'
  },
  {
    id: 'cardamom',
    name: 'Cardamom',
    scientificName: 'Elettaria cardamomum',
    category: 'Digestive Aid',
    description: 'Known as the "Queen of Spices," cardamom is prized for its aromatic seeds and digestive benefits. It helps alleviate digestive discomfort, freshens breath, and contains powerful antioxidants. Cardamom is also known for its calming properties.',
    benefits: ['Aids digestion', 'Freshens breath', 'Antioxidant properties', 'Supports respiratory health', 'Calming effect'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cardamom_-_Kolkata.jpg/1280px-Cardamom_-_Kolkata.jpg',
    traditionalUse: 'Used in Ayurvedic medicine and as a culinary spice for thousands of years.',
    dosage: '1-2 pods daily or 1/4 teaspoon powder',
    precautions: 'Generally safe, consult doctor for gallstone conditions'
  },
  {
    id: 'fenugreek',
    name: 'Fenugreek',
    scientificName: 'Trigonella foenum-graecum',
    category: 'Blood Sugar Support',
    description: 'A medicinal herb with culinary uses, fenugreek seeds are rich in fiber and beneficial compounds. It is traditionally used to support blood sugar control, increase milk production in breastfeeding mothers, and support digestive health.',
    benefits: ['Supports blood sugar control', 'Supports lactation', 'Aids digestion', 'Supports testosterone levels', 'Anti-inflammatory'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Trigonella_foenum-graecum0.jpg/1280px-Trigonella_foenum-graecum0.jpg',
    traditionalUse: 'Used in traditional medicine for thousands of years across various cultures.',
    dosage: '5-10g seeds daily or 500-1000mg extract',
    precautions: 'May interact with diabetes medications, monitor blood sugar'
  },
  {
    id: 'saffron',
    name: 'Saffron',
    scientificName: 'Crocus sativus',
    category: 'Mood Support',
    description: 'The world most expensive spice, saffron is derived from the crocus flower. Beyond its culinary uses, saffron has powerful mood-enhancing properties, supports eye health, and provides antioxidant benefits. It has been used in traditional medicine for millennia.',
    benefits: ['Supports mood balance', 'Antioxidant properties', 'Supports eye health', 'Aids digestion', 'Supports learning'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Saffron_crocus_sativus.jpg/1280px-Saffron_crocus_sativus.jpg',
    traditionalUse: 'Used in traditional medicine for over 3,000 years for various health conditions.',
    dosage: '30-50mg daily',
    precautions: 'Avoid high doses during pregnancy, may interact with medications'
  }
];

// Export for use in website
if (typeof module !== 'undefined' && module.exports) {
  module.exports = herbsCatalog;
}
