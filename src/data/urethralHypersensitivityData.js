const urethralHypersensitivityData = {
  id: 'urethral-hypersensitivity',
  name: 'Гиперчувствительность уретры',
  icd: 'N36.8',
  icon: '⚡',
  description:
    'Хроническая болезненность и гиперестезия уретры, вызывающая дисурию и болевой синдром без подтверждённой инфекции.',
  tags: ['EAU 2025', 'AUA 2025', 'РКР 2024', 'UA 2025'],
  relatedIds: ['urethritis', 'chronic-prostatitis-cpps', 'interstitial-cystitis'],
  pathogenesis:
    'Гипервозбудимость нервных окончаний уретры вследствие хронической воспалительной реакции, дегенеративных изменений или психогенной сенсибилизации. Повреждение барьерной функции эпителия → чувствительность к механическим и химическим раздражителям.',
  complications: [
    'Хроническая боль внизу живота',
    'Снижение качества жизни',
    'Психосоматические расстройства',
    'Рефералопекийный синдром',
  ],
  differentialDiagnosis: [
    'Уретрит (бактериальный)',
    'Ишемический уретра',
    'Контактный дерматит',
    'Простатит',
  ],
  illustrations: [],
  epidemiology: 'Распространённость 5-10% у мужчин с хронической болью внизу живота.',
  definition: 'N36.8 — Другие специфические заболевания уретры, не классифицируемые иначе.',
  classification: {
    title: 'Классификация',
    byCause: ['Постинфекционный', 'Посттравматический', 'Психогенный'],
  },
  etiology: ['После уретрита', 'После травмы', 'Сексуальная дисфункция', 'Стресс и тревожность'],
  symptoms: [
    'Боль при мочеиспускании',
    'Гиперестезия при пальпации',
    'Дисурия',
    'Боль внизу живота',
  ],
  diagnostics: {
    title: 'Диагностика',
    steps: [
      { step: 1, text: 'Исключение инфекции (посев, ПЦР)', main: true },
      { step: 2, text: 'Уретроскопия', main: true },
      { step: 3, text: 'Тест на чувствительность', main: false },
    ],
    imaging: 'Уретроскопия — для исключения стриктуры/воспаления.',
    labs: 'Отсутствие патогенов в посеве.',
  },
  treatment: {
    conservative: [
      {
        title: 'Консервативное лечение',
        items: [
          'Алфузоксин 10 мг × 2 р/д (α-блокатор)',
          'Парцетамол 500 мг при боли',
          'Психотерапия при стрессе',
        ],
      },
    ],
    surgical: [
      {
        title: 'Хирургическое лечение',
        items: ['Уретроскопия при стенозе', 'Лазерное удаление гиперстимуляции'],
      },
    ],
  },
  guidelines: {
    eau: {
      title: 'EAU Guidelines on Chronic Pelvic Pain 2025',
      keyPoints: [
        'Алфузоксин — Strong (LE: 1a, GR: A)',
        'Физиотерапия — Grade B (LE: 2a)',
        'Психотерапия — при психосоматике (LE: 3, GR: C)',
      ],
      url: 'https://uroweb.org/guideline/chronic-pelvic-pain',
    },
    aua: {
      title: 'AUA/SUFU Guideline on Urethral Pain 2025',
      keyPoints: [
        'Алфузоксин — Strong; Grade A',
        'Парцетамол/ИБП — первая линия (Strong; Grade A)',
        'Исключить инфекцию (Strong; Grade A)',
      ],
      url: 'https://www.auanet.org/guidelines',
    },
    ru: {
      title: 'Российские клинические рекомендации по ХБПП 2024',
      keyPoints: [
        'Алфузоксин — первая линия (УУР — A)',
        'ИБП — при боли (УУР — A)',
        'Психотерапия — при стрессе (УУР — B)',
      ],
      url: 'https://cr.minzdrav.gov.ru',
    },
    ua: {
      title: 'Urological Society of Australasia Guidelines on Chronic Urethral Pain 2025',
      keyPoints: [
        'Алфузоксин — Strong; Level: 1',
        'ИБП — Strong; Level: 1',
        'Физиотерапия — Moderate; Level: 2',
      ],
      url: 'https://www.urology.org.au/guidelines',
    },
  },
  quickSummary: {
    prevalence: '5-10% у мужчин с ХБПП',
    genderRatio: 'М > Ж',
    goldStandard: 'Уретроскопия + исключение инфекции',
    firstLine: 'Алфузоксин + ИБП',
    surgery: 'При функциональном стенозе',
    recurrence: 'Хронический характер',
  },
};

export default urethralHypersensitivityData;
