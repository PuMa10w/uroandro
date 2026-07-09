const androgenResistanceSyndromeData = {
  id: 'androgen-resistance-syndrome',
  name: 'Синдром андрогенной резистентности',
  icd: 'E34.5',
  icon: '⚗️',
  description: 'Редкое состояние, при котором ткани неадекватно отвечают на андрогены из-за дефекта рецептора.',
  tags: ['EAU 2025', 'Endocrine 2024'],
  relatedIds: ['hypogonadism', 'kallmann-syndrome', 'klein-felter'],
  definition: 'Группа состояний, вызванных мутациями андрогенного рецептора, с вариабельной клинической картиной.',
  epidemiology: 'Редкое генетическое заболевание с диапазоном проявлений от полной до частичной резистентности.',
  classification: [{ type: 'Полная', desc: 'Полная нечувствительность к андрогенам' }, { type: 'Частичная', desc: 'Вариабельная степень вирилизации и репродуктивных нарушений' }],
  etiology: ['Мутации гена андрогенного рецептора'],
  symptoms: ['Нарушение полового развития', 'Бесплодие', 'Гинекомастия', 'Недостаточная вирилизация'],
  diagnostics: { primary: ['Генетическое тестирование', 'Тестостерон, ЛГ, ФСГ', 'Клиническая оценка фенотипа'], additional: ['Консультация генетика', 'УЗИ/МРТ по показаниям'], keyFindings: 'Несоответствие между уровнем андрогенов и клиническим фенотипом.' },
  treatment: ['Индивидуализированное мультидисциплинарное ведение', 'Генетическое консультирование', 'Психосексуальная поддержка', 'Репродуктивное консультирование'],
  guidelines: {
    eau: {
      title: "EAU Guidelines on Disorders of Sexual Development 2025",
      keyPoints: [
        "Genetic testing for androgen receptor mutations — first-line (LE: 1a, GR: A)",
        "Multidisciplinary care — endocrinology, urology, genetics, psychology (LE: 1a, GR: A)",
        "Testosterone levels vary inversely with receptor sensitivity (LE: 2a, GR: B)",
        "Fertility counseling — essential due to variable presentation (LE: 3, GR: C)"
      ],
      url: "https://uroweb.org/guidelines/dsd"
    },
    aua: {
      title: "AUA Guidelines on DSD and Hypogonadism 2025",
      keyPoints: [
        "Genetic testing — Strong; Grade A for suspected AR mutations",
        "Multidisciplinary team — Strong; Grade A",
        "Fertility preservation — consider before gonadectomy (Strong; Grade A)",
        "Psychosocial support — essential (Moderate; Grade B)"
      ],
      url: "https://www.auanet.org/guidelines/dsd"
    },
    ru: {
      title: "Российские клинические рекомендации по синдрому СРД 2024",
      keyPoints: [
        "Генетическое исследование (УУР — A, УДД — 1)",
        "Мультидисциплинарный подход (УУР — A, УДД — 1)",
        "Репродуктивное консультирование (УУР — B, УДД — 2)",
        "Психологическая поддержка (УУР — B, УДД — 2)"
      ],
      url: "https://cr.minzdrav.gov.ru"
    },
    ua: {
      title: "Urological Society of Australasia (UA) Guidelines on DSD 2025",
      keyPoints: [
        "Genetic testing for AR mutations — Strong; Level: 1",
        "Multidisciplinary care from diagnosis (Strong; Level: 1)",
        "Fertility counseling — consider preservation (Moderate; Level: 2)",
        "Psychosocial support — essential (Moderate; Level: 2)"
      ],
      url: "https://www.urology.org.au/guidelines"
    }
  },
  quickSummary: 'Редкая, но ключевая причина нарушений вирилизации и мужского бесплодия.',
  prognosis: 'Зависит от формы; качество жизни улучшается при раннем мультидисциплинарном сопровождении.',
  followUp: 'Длительное наблюдение у андролога, эндокринолога и генетика.',
  lifestyleAdvice: ['Нужна психологическая и генетическая поддержка семьи.', 'Важно наблюдение в специализированном центре.'],
  nutritionAdvice: ['Специфической диеты нет; акцент на поддержании здорового веса и метаболического статуса.'],
  patientRecommendations: ['Не откладывать генетическое консультирование при подозрении на DSD-синдром.', 'Обсуждать вопросы фертильности и long-term план заранее.'],
  clinicalCases: [{ title: 'Клинический случай №1', patient: 'Подросток 16 лет', complaint: 'Нарушение полового развития.', findings: 'Высокий тестостерон, диспропорция фенотипа.', diagnosis: 'Частичная андрогенная резистентность.', treatment: 'Мультидисциплинарное сопровождение.', outcome: 'Уточнён генетический диагноз и тактика наблюдения.', lesson: 'Гормоны без фенотипа и генетики не дают полного диагноза.' }],
  patientQuestions: [{ q: 'Это наследуется?', a: 'Да, синдром связан с генетическим дефектом и требует консультации генетика.' }],
  drugDoses: [],
};

export default androgenResistanceSyndromeData;
