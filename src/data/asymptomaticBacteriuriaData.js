const asymptomaticBacteriuriaData = {
  id: 'asymptomatic-bacteriuria',
  name: 'Бессимптомная бактериурия',
  icd: 'R82.7',
  icon: 'CheckCircle',
  description:
    'Наличие бактерий в моче без симптомов ИМП. В большинстве случаев не требует антибактериального лечения.',
  tags: ['EAU UTI 2026', 'stewardship', 'бактериурия'],
  relatedIds: ['recurrent-uti', 'uti-unspecified', 'cystitis'],

  definition:
    'Рост значимого титра бактерий в моче при отсутствии дизурии, боли, лихорадки и других клинических признаков инфекционного воспаления мочевых путей.',
  epidemiology:
    'Частота повышается с возрастом, при сахарном диабете, нейрогенной дисфункции и длительной катетеризации.',
  etiology: [
    'Колонизация мочевых путей без активной воспалительной реакции',
    'Катетер-ассоциированная колонизация',
    'Сопутствующие урологические и метаболические факторы',
  ],
  symptoms: ['Клинические симптомы ИМП отсутствуют'],
  classification: {
    title: 'Клинические группы',
    byType: [
      'У небеременных пациентов',
      'У беременных',
      'Перед инвазивными урологическими манипуляциями',
    ],
  },
  diagnostics: {
    title: 'Диагностика',
    steps: [
      { step: 1, text: 'Оценка отсутствия клинических симптомов ИМП', main: true },
      { step: 2, text: 'Подтверждающий посев мочи', main: true },
      { step: 3, text: 'Стратификация: лечить/не лечить по показаниям', main: true },
    ],
    imaging: 'Инструментальные методы — только при подозрении на структурную патологию.',
    labs: 'Посев мочи, ОАМ; повторная верификация по клиническому сценарию.',
  },
  treatment: {
    conservative: [
      {
        title: 'Базовая тактика',
        items: [
          'Не лечить антибиотиками бессимптомную бактериурию у большинства групп.',
          'Лечить перед инвазивными урологическими вмешательствами и у беременных.',
        ],
      },
    ],
    metaphylaxis: [
      'Избегать необоснованных повторных посевов без симптомов.',
      'Соблюдать принципы антибиотик-стewardship.',
    ],
  },
  guidelines: {
    eau: {
      title: 'EAU Urological Infections 2026',
      keyPoints: [
        'ASB обычно не требует антибактериальной терапии (LE: 1a, GR: A).',
        'Исключения: беременность и подготовка к урологическим вмешательствам, нарушающим слизистую (LE: 1a, GR: A).',
      ],
      url: 'https://uroweb.org/guidelines/urological-infections',
    },
    aua: {
      title: 'AUA Guidelines on Asymptomatic Bacteriuria 2025',
      keyPoints: [
        'Do NOT screen or treat ASB in nonpregnant adults (Strong; Grade A).',
        'Screen and treat before invasive urologic procedures (Strong; Grade A).',
        'Screen and treat in pregnancy (Strong; Grade A).',
      ],
      url: 'https://www.auanet.org/guidelines/asymptomatic-bacteriuria',
    },
    ru: {
      title: 'Российские клинические рекомендации по бессимптомной бактериурии 2024',
      keyPoints: [
        'Не лечить без показания (УУР — A, УДД — 1).',
        'Лечить при беременности (УУР — A, УДД — 1).',
        'Лечить перед инвазивными вмешательствами (УУР — A, УДД — 1).',
      ],
      url: 'https://cr.minzdrav.gov.ru',
    },
    ua: {
      title: 'Urological Society of Australasia (UA) Guidelines on ASB 2025',
      keyPoints: [
        'No screening or treatment in nonpregnant adults (Strong; Level: 1).',
        'Treatment before urologic procedures with mucosal disruption (Strong; Level: 1).',
        'Treatment in pregnancy mandatory (Strong; Level: 1).',
      ],
      url: 'https://www.urology.org.au/guidelines',
    },
  },
};

export default asymptomaticBacteriuriaData;
