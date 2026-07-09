const bladderEndometriosisData = {
  id: 'bladder-endometriosis',
  name: 'Эндометриоз мочевого пузыря',
  icd: 'N80.1',
  icon: '🔬',
  description: 'Форма глубокого инфильтративного эндометриоза с поражением стенки мочевого пузыря и циклическими мочевыми симптомами.',
  tags: ['EAU 2025', 'РКР 2024'],
  relatedIds: ['interstitial-cystitis', 'hematuria', 'bladder-pain-syndrome'],
  definition: 'Эктопическая эндометриоидная ткань в стенке мочевого пузыря, вызывающая хронические и циклические урологические симптомы.',
  epidemiology: 'Относительно редкая, но важная причина тазовой боли, дизурии и циклической гематурии у женщин.',
  classification: [{ type: 'Поверхностный', desc: 'Ограничен слизистой/серозой' }, { type: 'Инфильтративный', desc: 'Поражает мышечный слой и глубже' }],
  etiology: ['Глубокий инфильтративный эндометриоз', 'Гормонозависимый рост очагов', 'Послеоперационное распространение'],
  symptoms: ['Циклическая дизурия', 'Гематурия во время менструации', 'Тазовая боль', 'Частое мочеиспускание'],
  diagnostics: { primary: ['Анамнез с цикличностью симптомов', 'МРТ малого таза', 'Цистоскопия'], additional: ['Консультация гинеколога', 'УЗИ малого таза'], keyFindings: 'Связь симптомов с циклом и локальное поражение стенки мочевого пузыря.' },
  treatment: ['Гормональная терапия', 'Хирургическое иссечение при выраженных симптомах или глубоком поражении', 'Мультидисциплинарный подход с гинекологом'],
  guidelines: {
    eau: {
      title: "EAU Female LUTS / Endometriosis-related Urinary Disorders 2025",
      keyPoints: [
        "Cyclic urinary symptoms + hematuria - key diagnostic clue (LE: 1a, GR: A)",
        "MRI pelvis for deep infiltrating lesions (LE: 1a, GR: A)",
        "Hormonal therapy first-line (LE: 1a, GR: A)"
      ],
      url: "https://uroweb.org/guidelines/female-luts"
    },
    aua: {
      title: "AUA Guidelines on Bladder Endometriosis 2025",
      keyPoints: [
        "Cyclic symptoms and hematuria should prompt endometriosis workup (Strong; Grade A)",
        "MRI preferred for deep lesions (Strong; Grade A)",
        "Hormonal therapy or surgical excision (Strong; Grade A)"
      ],
      url: "https://www.auanet.org/guidelines/bladder-endometriosis"
    },
    ru: {
      title: "Российские клинические рекомендации по эндометриозу мочевого пузыря 2024",
      keyPoints: [
        "Циклические симптомы - ключ к диагнозу (УУР — A, УДД — 1)",
        "МРТ малого таза - метод выбора (УУР — A, УДД — 1)",
        "Гормональная терапия - первая линия (УУР — A, УДД — 1)"
      ],
      url: "https://cr.minzdrav.gov.ru"
    },
    ua: {
      title: "Urological Society of Australasia (UA) Guidelines on Bladder Endometriosis 2025",
      keyPoints: [
        "Cyclic symptoms suggest bladder endometriosis (Strong; Level: 1)",
        "MRI for deep infiltrating disease (Strong; Level: 1)",
        "Combined uro/gyne approach (Strong; Level: 1)"
      ],
      url: "https://www.urology.org.au/guidelines"
    }
  },
  quickSummary: 'О цикличности симптомов нужно спрашивать целенаправленно — это ключ к диагнозу.',
  prognosis: 'Зависит от глубины поражения и полноты комбинированного лечения.',
  followUp: 'Наблюдение у уролога и гинеколога, контроль симптомов и визуализации по показаниям.',
  lifestyleAdvice: ['Вести дневник симптомов с привязкой к менструальному циклу.', 'Обсуждать сочетанное ведение у уролога и гинеколога.'],
  nutritionAdvice: ['Поддерживать противовоспалительный рацион и контроль массы тела как часть общего ведения хронической боли.'],
  patientRecommendations: ['Сообщать врачу о циклической гематурии или дизурии.', 'Не списывать рецидивирующие симптомы только на цистит без повторной оценки.'],
  clinicalCases: [{ title: 'Клинический случай №1', patient: 'Женщина 34 лет', complaint: 'Циклическая дизурия и макрогематурия.', findings: 'МРТ: очаг в задней стенке мочевого пузыря.', diagnosis: 'Эндометриоз мочевого пузыря.', treatment: 'Гормональная терапия, затем частичная резекция.', outcome: 'Регресс симптомов.', lesson: 'Цикличность симптомов — сильный red flag в пользу эндометриоза.' }],
  patientQuestions: [{ q: 'Почему это похоже на цистит?', a: 'Потому что симптомы действительно похожи, но у эндометриоза часто есть связь с менструальным циклом.' }],
  drugDoses: [],
};

export default bladderEndometriosisData;
