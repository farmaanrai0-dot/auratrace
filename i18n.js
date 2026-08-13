const auraLanguages = {
  en: { label: 'English', dir: 'ltr' },
  zh: { label: '中文', dir: 'ltr' },
  es: { label: 'Español', dir: 'ltr' },
  hi: { label: 'हिन्दी', dir: 'ltr' },
  ar: { label: 'العربية', dir: 'rtl' },
  bn: { label: 'বাংলা', dir: 'ltr' },
  pt: { label: 'Português', dir: 'ltr' },
  ru: { label: 'Русский', dir: 'ltr' },
  ur: { label: 'اردو', dir: 'rtl' },
  fr: { label: 'Français', dir: 'ltr' },
  de: { label: 'Deutsch', dir: 'ltr' }
};

const translations = {
  zh: {
    'Homepage': '首页', 'Ready stock': '现货', 'Growing model': '种植模式', 'Herb dictionary': '草药词典', 'Education': '教育', 'Herb guidance': '草药指导', 'Batch passport': '批次档案',
    'Light mode': '浅色模式', 'Dark mode': '深色模式', 'See ready stock': '查看现货', 'Reserve a future harvest': '预订未来收成', 'Farm visits': '农场参观', 'Evidence pages': '证据页面', 'Responsible guidance': '负责任的指导',
    'Search a herb. Start with the evidence and the cautions.': '搜索草药，从证据和注意事项开始。', 'Search by common name, botanical name or alias': '按常用名、植物学名或别名搜索', 'Check passport': '查询档案', 'No verified public record found': '未找到经过验证的公开记录', 'Read this first:': '请先阅读：',
    'Traditional use and research': '传统用途与研究', 'Important cautions': '重要注意事项', 'Medicine interactions:': '药物相互作用：', 'Evidence note:': '证据说明：', 'Send education request': '发送教育请求'
  },
  es: {
    'Homepage': 'Inicio', 'Ready stock': 'Stock disponible', 'Growing model': 'Modelo de cultivo', 'Herb dictionary': 'Diccionario de hierbas', 'Education': 'Educación', 'Herb guidance': 'Orientación sobre hierbas', 'Batch passport': 'Pasaporte del lote',
    'Light mode': 'Modo claro', 'Dark mode': 'Modo oscuro', 'See ready stock': 'Ver stock disponible', 'Reserve a future harvest': 'Reservar una cosecha futura', 'Farm visits': 'Visitas a la finca', 'Evidence pages': 'Páginas de evidencia', 'Responsible guidance': 'Orientación responsable',
    'Search a herb. Start with the evidence and the cautions.': 'Busca una hierba. Empieza por la evidencia y las precauciones.', 'Search by common name, botanical name or alias': 'Buscar por nombre común, botánico o alias', 'Check passport': 'Consultar pasaporte', 'No verified public record found': 'No se encontró un registro público verificado', 'Read this first:': 'Lee esto primero:',
    'Traditional use and research': 'Uso tradicional e investigación', 'Important cautions': 'Precauciones importantes', 'Medicine interactions:': 'Interacciones con medicamentos:', 'Evidence note:': 'Nota sobre la evidencia:', 'Send education request': 'Enviar solicitud educativa'
  },
  hi: {
    'Homepage': 'होमपेज', 'Ready stock': 'तैयार स्टॉक', 'Growing model': 'खेती मॉडल', 'Herb dictionary': 'हर्ब डिक्शनरी', 'Education': 'शिक्षा', 'Herb guidance': 'हर्ब मार्गदर्शन', 'Batch passport': 'बैच पासपोर्ट',
    'Light mode': 'लाइट मोड', 'Dark mode': 'डार्क मोड', 'See ready stock': 'तैयार स्टॉक देखें', 'Reserve a future harvest': 'भविष्य की फसल बुक करें', 'Farm visits': 'फार्म विजिट', 'Evidence pages': 'साक्ष्य पृष्ठ', 'Responsible guidance': 'जिम्मेदार मार्गदर्शन',
    'Search a herb. Start with the evidence and the cautions.': 'हर्ब खोजें। साक्ष्य और सावधानियों से शुरुआत करें।', 'Search by common name, botanical name or alias': 'सामान्य, वनस्पति या उपनाम से खोजें', 'Check passport': 'पासपोर्ट देखें', 'No verified public record found': 'कोई सत्यापित सार्वजनिक रिकॉर्ड नहीं मिला', 'Read this first:': 'पहले यह पढ़ें:',
    'Traditional use and research': 'पारंपरिक उपयोग और शोध', 'Important cautions': 'महत्वपूर्ण सावधानियां', 'Medicine interactions:': 'दवाओं के साथ परस्पर प्रभाव:', 'Evidence note:': 'साक्ष्य नोट:', 'Send education request': 'शैक्षिक अनुरोध भेजें'
  },
  ar: {
    'Homepage': 'الرئيسية', 'Ready stock': 'المخزون الجاهز', 'Growing model': 'نموذج الزراعة', 'Herb dictionary': 'قاموس الأعشاب', 'Education': 'التثقيف', 'Herb guidance': 'إرشادات الأعشاب', 'Batch passport': 'جواز الدفعة',
    'Light mode': 'الوضع الفاتح', 'Dark mode': 'الوضع الداكن', 'See ready stock': 'عرض المخزون الجاهز', 'Reserve a future harvest': 'احجز حصاداً مستقبلياً', 'Farm visits': 'زيارات المزرعة', 'Evidence pages': 'صفحات الأدلة', 'Responsible guidance': 'إرشاد مسؤول',
    'Search a herb. Start with the evidence and the cautions.': 'ابحث عن عشبة وابدأ بالأدلة والتحذيرات.', 'Search by common name, botanical name or alias': 'ابحث بالاسم الشائع أو النباتي أو الاسم البديل', 'Check passport': 'فحص الجواز', 'No verified public record found': 'لم يتم العثور على سجل عام موثق', 'Read this first:': 'اقرأ هذا أولاً:',
    'Traditional use and research': 'الاستخدام التقليدي والبحث', 'Important cautions': 'تحذيرات مهمة', 'Medicine interactions:': 'التفاعلات مع الأدوية:', 'Evidence note:': 'ملاحظة الأدلة:', 'Send education request': 'إرسال طلب تثقيفي'
  },
  bn: {
    'Homepage': 'হোমপেজ', 'Ready stock': 'প্রস্তুত স্টক', 'Growing model': 'চাষের মডেল', 'Herb dictionary': 'ভেষজ অভিধান', 'Education': 'শিক্ষা', 'Herb guidance': 'ভেষজ নির্দেশনা', 'Batch passport': 'ব্যাচ পাসপোর্ট',
    'Light mode': 'লাইট মোড', 'Dark mode': 'ডার্ক মোড', 'See ready stock': 'প্রস্তুত স্টক দেখুন', 'Reserve a future harvest': 'ভবিষ্যৎ ফসল সংরক্ষণ করুন', 'Farm visits': 'খামার পরিদর্শন', 'Evidence pages': 'প্রমাণের পৃষ্ঠা', 'Responsible guidance': 'দায়িত্বশীল নির্দেশনা',
    'Search a herb. Start with the evidence and the cautions.': 'একটি ভেষজ খুঁজুন। প্রমাণ ও সতর্কতা দিয়ে শুরু করুন।', 'Search by common name, botanical name or alias': 'সাধারণ, উদ্ভিদবৈজ্ঞানিক নাম বা উপনামে খুঁজুন', 'Check passport': 'পাসপোর্ট দেখুন', 'No verified public record found': 'কোনও যাচাইকৃত পাবলিক রেকর্ড পাওয়া যায়নি', 'Read this first:': 'প্রথমে এটি পড়ুন:',
    'Traditional use and research': 'ঐতিহ্যবাহী ব্যবহার ও গবেষণা', 'Important cautions': 'গুরুত্বপূর্ণ সতর্কতা', 'Medicine interactions:': 'ওষুধের পারস্পরিক প্রভাব:', 'Evidence note:': 'প্রমাণের নোট:', 'Send education request': 'শিক্ষামূলক অনুরোধ পাঠান'
  },
  pt: {
    'Homepage': 'Início', 'Ready stock': 'Stock disponível', 'Growing model': 'Modelo de cultivo', 'Herb dictionary': 'Dicionário de ervas', 'Education': 'Educação', 'Herb guidance': 'Orientação sobre ervas', 'Batch passport': 'Passaporte do lote',
    'Light mode': 'Modo claro', 'Dark mode': 'Modo escuro', 'See ready stock': 'Ver stock disponível', 'Reserve a future harvest': 'Reservar colheita futura', 'Farm visits': 'Visitas à quinta', 'Evidence pages': 'Páginas de evidência', 'Responsible guidance': 'Orientação responsável',
    'Search a herb. Start with the evidence and the cautions.': 'Pesquise uma erva. Comece pelas evidências e precauções.', 'Search by common name, botanical name or alias': 'Pesquisar por nome comum, botânico ou alias', 'Check passport': 'Consultar passaporte', 'No verified public record found': 'Não foi encontrado um registo público verificado', 'Read this first:': 'Leia isto primeiro:',
    'Traditional use and research': 'Uso tradicional e investigação', 'Important cautions': 'Precauções importantes', 'Medicine interactions:': 'Interações medicamentosas:', 'Evidence note:': 'Nota de evidência:', 'Send education request': 'Enviar pedido educativo'
  },
  ru: {
    'Homepage': 'Главная', 'Ready stock': 'Готовый запас', 'Growing model': 'Модель выращивания', 'Herb dictionary': 'Справочник трав', 'Education': 'Обучение', 'Herb guidance': 'Сведения о травах', 'Batch passport': 'Паспорт партии',
    'Light mode': 'Светлая тема', 'Dark mode': 'Тёмная тема', 'See ready stock': 'Смотреть готовый запас', 'Reserve a future harvest': 'Зарезервировать будущий урожай', 'Farm visits': 'Посещение фермы', 'Evidence pages': 'Страницы доказательств', 'Responsible guidance': 'Ответственная информация',
    'Search a herb. Start with the evidence and the cautions.': 'Найдите траву. Начните с доказательств и предупреждений.', 'Search by common name, botanical name or alias': 'Поиск по обычному, ботаническому имени или псевдониму', 'Check passport': 'Проверить паспорт', 'No verified public record found': 'Проверенная публичная запись не найдена', 'Read this first:': 'Сначала прочитайте:',
    'Traditional use and research': 'Традиционное применение и исследования', 'Important cautions': 'Важные предупреждения', 'Medicine interactions:': 'Взаимодействие с лекарствами:', 'Evidence note:': 'Примечание о доказательствах:', 'Send education request': 'Отправить образовательный запрос'
  },
  ur: {
    'Homepage': 'ہوم پیج', 'Ready stock': 'تیار اسٹاک', 'Growing model': 'کاشت کا ماڈل', 'Herb dictionary': 'جڑی بوٹیوں کی لغت', 'Education': 'تعلیم', 'Herb guidance': 'جڑی بوٹیوں کی رہنمائی', 'Batch passport': 'بیچ پاسپورٹ',
    'Light mode': 'روشن موڈ', 'Dark mode': 'ڈارک موڈ', 'See ready stock': 'تیار اسٹاک دیکھیں', 'Reserve a future harvest': 'مستقبل کی فصل محفوظ کریں', 'Farm visits': 'فارم کا دورہ', 'Evidence pages': 'شواہد کے صفحات', 'Responsible guidance': 'ذمہ دار رہنمائی',
    'Search a herb. Start with the evidence and the cautions.': 'جڑی بوٹی تلاش کریں، شواہد اور احتیاط سے آغاز کریں۔', 'Search by common name, botanical name or alias': 'عام، نباتاتی نام یا عرف سے تلاش کریں', 'Check passport': 'پاسپورٹ دیکھیں', 'No verified public record found': 'تصدیق شدہ عوامی ریکارڈ نہیں ملا', 'Read this first:': 'پہلے یہ پڑھیں:',
    'Traditional use and research': 'روایتی استعمال اور تحقیق', 'Important cautions': 'اہم احتیاطیں', 'Medicine interactions:': 'ادویات کے ساتھ تعامل:', 'Evidence note:': 'شواہد کا نوٹ:', 'Send education request': 'تعلیمی درخواست بھیجیں'
  },
  fr: {
    'Homepage': 'Accueil', 'Ready stock': 'Stock disponible', 'Growing model': 'Modèle de culture', 'Herb dictionary': 'Dictionnaire des plantes', 'Education': 'Éducation', 'Herb guidance': 'Conseils sur les plantes', 'Batch passport': 'Passeport du lot',
    'Light mode': 'Mode clair', 'Dark mode': 'Mode sombre', 'See ready stock': 'Voir le stock disponible', 'Reserve a future harvest': 'Réserver une récolte future', 'Farm visits': 'Visites de la ferme', 'Evidence pages': 'Pages sur les preuves', 'Responsible guidance': 'Conseils responsables',
    'Search a herb. Start with the evidence and the cautions.': 'Cherchez une plante. Commencez par les preuves et les précautions.', 'Search by common name, botanical name or alias': 'Rechercher par nom courant, botanique ou alias', 'Check passport': 'Vérifier le passeport', 'No verified public record found': 'Aucun registre public vérifié trouvé', 'Read this first:': 'À lire en premier :',
    'Traditional use and research': 'Usage traditionnel et recherche', 'Important cautions': 'Précautions importantes', 'Medicine interactions:': 'Interactions médicamenteuses :', 'Evidence note:': 'Note sur les preuves :', 'Send education request': 'Envoyer une demande éducative'
  },
  de: {
    'Homepage': 'Startseite', 'Ready stock': 'Sofort verfügbar', 'Growing model': 'Anbaumodell', 'Herb dictionary': 'Kräuterlexikon', 'Education': 'Bildung', 'Herb guidance': 'Kräuterberatung', 'Batch passport': 'Chargenpass',
    'Light mode': 'Heller Modus', 'Dark mode': 'Dunkler Modus', 'See ready stock': 'Verfügbaren Bestand ansehen', 'Reserve a future harvest': 'Künftige Ernte reservieren', 'Farm visits': 'Hofbesuche', 'Evidence pages': 'Evidenzseiten', 'Responsible guidance': 'Verantwortungsvolle Beratung',
    'Search a herb. Start with the evidence and the cautions.': 'Suchen Sie ein Kraut. Beginnen Sie mit Belegen und Vorsichtshinweisen.', 'Search by common name, botanical name or alias': 'Nach gebräuchlichem, botanischem Namen oder Alias suchen', 'Check passport': 'Pass prüfen', 'No verified public record found': 'Kein verifizierter öffentlicher Eintrag gefunden', 'Read this first:': 'Bitte zuerst lesen:',
    'Traditional use and research': 'Traditionelle Verwendung und Forschung', 'Important cautions': 'Wichtige Vorsichtshinweise', 'Medicine interactions:': 'Wechselwirkungen mit Arzneimitteln:', 'Evidence note:': 'Hinweis zur Evidenz:', 'Send education request': 'Bildungsanfrage senden'
  }
};

function applyAuraLanguage(languageCode) {
  const language = auraLanguages[languageCode] || auraLanguages.en;
  const dictionary = translations[languageCode] || {};
  document.documentElement.lang = languageCode;
  document.documentElement.dir = language.dir;

  document.querySelectorAll('[data-language-select]').forEach((select) => {
    select.value = languageCode;
  });

  document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT).nextNode;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach((node) => {
    const key = node.nodeValue.trim();
    if (dictionary[key]) node.nodeValue = node.nodeValue.replace(key, dictionary[key]);
  });

  document.querySelectorAll('[placeholder]').forEach((field) => {
    const translated = dictionary[field.getAttribute('placeholder')];
    if (translated) field.setAttribute('placeholder', translated);
  });
  localStorage.setItem('aura-language', languageCode);
}

function addLanguageSwitcher() {
  document.querySelectorAll('.header-actions').forEach((headerActions) => {
    if (headerActions.querySelector('[data-language-select]')) return;
    const label = document.createElement('label');
    label.className = 'language-picker';
    label.setAttribute('aria-label', 'Website language');
    const select = document.createElement('select');
    select.setAttribute('data-language-select', 'true');
    select.setAttribute('aria-label', 'Website language');
    Object.entries(auraLanguages).forEach(([code, language]) => {
      const option = document.createElement('option');
      option.value = code;
      option.textContent = language.label;
      select.appendChild(option);
    });
    select.addEventListener('change', () => window.location.reload());
    label.appendChild(select);
    headerActions.insertBefore(label, headerActions.querySelector('.theme-toggle'));
  });
}

const savedAuraLanguage = localStorage.getItem('aura-language') || 'en';
addLanguageSwitcher();
applyAuraLanguage(savedAuraLanguage);

document.querySelectorAll('[data-language-select]').forEach((select) => {
  select.addEventListener('change', () => {
    localStorage.setItem('aura-language', select.value);
    window.location.reload();
  });
});
