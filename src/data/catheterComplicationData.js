const catheterComplicationData = {
  id: "catheter-complication-mechanical",
  name: "Механическое осложнение мочевого катетера",
  icd: "T83.5",
  icon: "⚠️",
  description: "Осложнения индвазивного мочехваточника: кровотечение, травма слизистой, экструз (выведение), инфицирование.",
  tags: ["EAU Urological Infections", "AUA Guidelines", "РКР 2024"],
  relatedIds: ["urethral-stricture", "hematuria", "urinary-retention"],
  definition: "Большие механические проблемы с мочехваточником, включая кровотечение, травму, экструз и необходимость замены.",
  epidemiology: "Частота кровотечения 1-2%, экструза 0.5-1% при длительном использовании.",
  symptoms: ["Гематурия", "Кровоточивость", "Дискомфорт в мошонке", "Отсутствие дренажа"],
  diagnostics: {
    primary: ["Визуальная оценка", "Цистоскопия", "УЗИ брюшной полости"],
    additional: ["КТ-урография при подозрении на повреждение стенки"],
  },
  treatment: ["Замена катетера", "Остановка кровотечения", "Антибиотики при инфицировании"],
  guidelines: {
    eau: {
      title: "EAU Guidelines on Urological Infections 2025",
      keyPoints: [
        "Routine catheter changes every 4-6 weeks (LE: 1a, GR: A)",
        "Immediate replacement if obstruction suspected (LE: 1a, GR: A)",
        "Antibiotic prophylaxis for long-term catheters (LE: 2a, GR: B)"
      ],
      url: "https://uroweb.org/guidelines/urological-infections"
    },
    aua: {
      title: "AUA Guidelines on Catheter Complications 2025",
      keyPoints: [
        "Change indwelling catheters every 4-6 weeks (Strong; Grade A)",
        "Replace immediately if retention or obstruction (Strong; Grade A)",
        "Culture and antibiotics for symptomatic infection (Strong; Grade A)"
      ],
      url: "https://www.auanet.org/guidelines/catheter-complications"
    },
    ru: {
      title: "Российские клинические рекомендации по мочехваточникам 2024",
      keyPoints: [
        "Смена катетера каждые 4-6 нед. (УУР — A, УДД — 1)",
        "Немедленная замена при экструзе (УУР — A, УДД — 1)",
        "Антибиотик при инфицировании (УУР — A, УДД — 1)"
      ],
      url: "https://cr.minzdrav.gov.ru"
    },
    ua: {
      title: "Urological Society of Australasia (UA) Guidelines on Catheter Care 2025",
      keyPoints: [
        "Regular changes every 4-6 weeks (Strong; Level: 1)",
        "Immediate replacement for complications (Strong; Level: 1)",
        "Antibiotic stewardship for infections (Strong; Level: 1)"
      ],
      url: "https://www.urology.org.au/guidelines"
    }
  },
};

export default catheterComplicationData;