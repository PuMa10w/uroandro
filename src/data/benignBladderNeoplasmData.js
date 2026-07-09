const benignBladderNeoplasmData = {
  id: 'benign-bladder-neoplasm',
  name: 'Доброкачественное новообразование мочевого пузыря',
  icd: 'D30.3',
  icon: 'Shield',
  description:
    'Доброкачественные опухоли мочевого пузыря, требующие морфологической верификации и эндоскопического наблюдения.',
  tags: ['МКБ-10 D30.3', 'онкоурология', 'эндоскопия'],
  relatedIds: ['bladder-cancer', 'bladder-carcinoma-in-situ', 'hematuria', 'urogenital-fistula'],

  definition:
    'D30.3 - доброкачественные новообразования мочевого пузыря, включая папилломы и иные неинвазивные доброкачественные образования.',
  epidemiology:
    'Выявляются реже злокачественных опухолей, нередко проявляются макрогематурией или обнаруживаются случайно при цистоскопии.',
  symptoms: [
    'Макро/микрогематурия',
    'Раздражающие симптомы нижних мочевых путей',
    'Иногда бессимптомное течение',
  ],
  diagnostics: {
    title: 'Диагностика',
    steps: [
      { step: 1, text: 'УЗИ мочевого пузыря и верхних мочевых путей', main: true },
      { step: 2, text: 'Цистоскопия с трансуретральной резекцией/биопсией', main: true },
      { step: 3, text: 'Гистологическая верификация', main: true },
    ],
    imaging: 'КТ-урография по показаниям для дифференциальной диагностики и оценки верхних мочевых путей.',
    labs: 'ОАМ, цитология мочи по клинической ситуации.',
  },
  treatment: {
    surgery: [
      'Трансуретральное эндоскопическое удаление образования с последующей морфологией.',
      'Дальнейшее наблюдение по графику цистоскопии в зависимости от гистологии.',
    ],
    conservative: [
      {
        title: 'Послеоперационный контроль',
        items: ['Мониторинг рецидива симптомов и гематурии', 'Плановая эндоскопическая оценка'],
      },
    ],
  },
  guidelines: {
    eau: {
      title: "EAU Guidelines on Non-Muscle Invasive Bladder Cancer 2025",
      keyPoints: [
        "Benign lesions require biopsy for confirmation (LE: 2a, GR: B)",
        "Follow-up cystoscopy every 3-6 months for non-malignant tumors (LE: 3, GR: C)",
        "Laser fulguration effective for small papillary lesions (LE: 2a, GR: B)"
      ],
      url: "https://uroweb.org/guideline/bladder-cancer"
    },
    aua: {
      title: "AUA Guidelines on Bladder Tumors 2025",
      keyPoints: [
        "Biopsy for all suspicious lesions (Strong; Grade A)",
        "Fulguration for small benign tumors (Strong; Grade A)",
        "Surveillance cystoscopy every 6-12 months (Strong; Grade A)"
      ],
      url: "https://www.auanet.org/guidelines/bladder-tumors"
    },
    ru: {
      title: "Российские клинические рекомендации по доброкачественным опухолям мочевого пузыря 2024",
      keyPoints: [
        "Гистология обязательна (УУР — A, УДД — 1)",
        "Фулгурация при папилломах (УУР — A, УДД — 1)",
        "Наблюдение каждые 6-12 мес. (УУР — A, УДД — 1)"
      ],
      url: "https://cr.minzdrav.gov.ru"
    },
    ua: {
      title: "Urological Society of Australasia (UA) Guidelines on Bladder Lesions 2025",
      keyPoints: [
        "Biopsy for all lesions, even if benign-appearing (Strong; Level: 1)",
        "Fulguration for small papillary tumors (Strong; Level: 1)",
        "Surveillance imaging at 6-12 months (Strong; Level: 1)"
      ],
      url: "https://www.urology.org.au/guidelines"
    }
  },
};

export default benignBladderNeoplasmData;
