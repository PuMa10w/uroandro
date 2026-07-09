const adrenalIncidentalomaData = {
  id: 'adrenal-incidentaloma',
  name: 'Инциденталома надпочечника',
  icd: 'E27.8',
  icon: '🧭',
  description: 'Случайно выявленное образование надпочечника, требующее оценки гормональной активности и онкологического риска.',
  tags: ['ESE 2023', 'EAU 2025'],
  relatedIds: ['adrenal-cancer', 'paraganglioma-bladder', 'hyperprolactinemia-male'],
  definition: 'Образование надпочечника, обнаруженное случайно при визуализации, выполненной не по поводу adrenal disease.',
  epidemiology: 'Частота растёт с возрастом и доступностью КТ/МРТ.',
  classification: [{ type: 'Гормонально-активная', desc: 'Кортизол, альдостерон, катехоламины и др.' }, { type: 'Неактивная', desc: 'Без явной гормональной секреции' }],
  etiology: ['Аденома', 'Гиперплазия', 'Адренокортикальный рак', 'Метастаз', 'Феохромоцитома'],
  symptoms: ['Часто нет симптомов', 'Иногда признаки гормональной гиперсекреции', 'Боль при крупных размерах'],
  diagnostics: { primary: ['КТ/МРТ надпочечников', 'Скрининг на гормональную активность'], additional: ['Метанефрины', 'Тест с дексаметазоном', 'Альдостерон/ренин по показаниям'], keyFindings: 'Нужно определить размер, плотность, washout и гормональную активность.' },
  treatment: ['Наблюдение при малых неактивных образованиях', 'Адреналэктомия при подозрении на злокачественность или гормональную активность'],
  guidelines: {
    eau: {
      title: "EAU Guidelines on Adrenal Incidentaloma 2025",
      keyPoints: [
        "Non-functioning adenomas <4 cm — follow-up imaging at 6-12 months (LE: 3, GR: C)",
        "Cortisol excess screening — essential in all incidentalomas (LE: 1a, GR: A)",
        "Aldosterone-producing adenomas — confirm with aldosterone-renin ratio (LE: 1a, GR: A)",
        "Surgery indicated for functioning or suspected malignant lesions (LE: 2a, GR: B)",
        "Follow-up intervals: small non-functioning — 1 year, large or functional — 3-6 months"
      ],
      url: "https://uroweb.org/guideline/adrenal-disease"
    },
    aua: {
      title: "AUA Guidelines on Adrenal Mass 2025",
      keyPoints: [
        "Rule out pheochromocytoma before any procedure (Strong; Grade A)",
        "Cortisol excess screening — mandatory (Strong; Grade A)",
        "Subclinical Cushing’s — consider surgery in young patients (Moderate; Grade B)",
        "Imaging follow-up every 1-2 years for non-functioning masses (Strong; Grade A)"
      ],
      url: "https://www.auanet.org/guidelines/adrenal-mass"
    },
    ru: {
      title: "Российские клинические рекомендации по инциденталоме 2024",
      keyPoints: [
        "Гормональный скрининг у всех (УУР — A, УДД — 1)",
        "Наблюдение при нефункционирующих <4 см (УУР — A, УДД — 1)",
        "Оперативное лечение при функционирующих (УУР — A, УДД — 1)",
        "Метанефриновый тест при подозрении на феохромоцитому (УУР — A, УДД — 1)"
      ],
      url: "https://cr.minzdrav.gov.ru"
    },
    ua: {
      title: "Urological Society of Australasia (UA) Guidelines on Adrenal Incidentaloma 2025",
      keyPoints: [
        "Cortisol excess assessment in all incidentalomas (Strong; Level: 1)",
        "Aldosterone-producing adenomas — confirm with ARR (Strong; Level: 1)",
        "Non-functioning masses <4 cm — imaging follow-up at 12 months (Strong; Level: 1)",
        "Selective adrenalectomy for functioning lesions (Strong; Level: 1)"
      ],
      url: "https://www.urology.org.au/guidelines"
    }
  },
  quickSummary: 'Каждая инциденталома должна быть оценена на гормональную активность и malignant potential.',
  prognosis: 'В большинстве случаев благоприятный, если исключена активная или злокачественная природа.',
  followUp: 'Повторная визуализация и гормональный контроль по размеру и риску.',
  lifestyleAdvice: ['Контролировать давление, массу тела и метаболические факторы.', 'Не игнорировать рекомендованное гормональное обследование.'],
  nutritionAdvice: ['При доказанном гиперкортицизме важны коррекция веса и углеводного обмена.'],
  patientRecommendations: ['Не все опухоли надпочечника опасны, но каждая требует правильного первичного разбора.'],
  clinicalCases: [{ title: 'Клинический случай №1', patient: 'Женщина 63 лет', complaint: 'Жалоб нет.', findings: 'На КТ живота случайно выявлено образование надпочечника 2.2 см низкой плотности.', diagnosis: 'Неактивная аденома надпочечника.', treatment: 'Наблюдение.', outcome: 'Без роста и гормональной активности.', lesson: 'Не каждая инциденталома требует операции, но каждая требует стратификации риска.' }],
  patientQuestions: [{ q: 'Это рак?', a: 'Не обязательно. Большинство небольших инциденталом — доброкачественные, но их нужно оценивать по правилам.' }],
  drugDoses: [],
};

export default adrenalIncidentalomaData;
