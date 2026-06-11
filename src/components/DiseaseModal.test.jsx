import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import DiseaseModal from './DiseaseModal';

const mockPreloadDiseaseBatch = vi.fn();

vi.mock('framer-motion', () => ({
  motion: new Proxy({}, {
    get: (_, tag) => {
      const mockReact = require('react');
      const Component = ({ children, whileHover, whileTap, whileInView, initial, animate, exit, transition, viewport, layout, ...props }) => (
        mockReact.createElement(tag, props, children)
      );
      Component.displayName = `motion.${String(tag)}`;
      return Component;
    },
  }),
  AnimatePresence: ({ children }) => {
    const mockReact = require('react');
    return mockReact.createElement(mockReact.Fragment, null, children);
  },
}));

vi.mock('./diseaseIcons', () => ({
  diseaseIcons: {},
}));

vi.mock('../data', () => ({
  diseaseById: {
    related: {
      id: 'related',
      name: 'Связанная нозология',
      section: 'urology',
      subsection: 'stones',
    },
    hypogonadism: {
      id: 'hypogonadism',
      name: 'Мужской гипогонадизм',
      section: 'andrology',
      subsection: 'endocrine',
    },
    'male-infertility': {
      id: 'male-infertility',
      name: 'Мужское бесплодие',
      section: 'andrology',
      subsection: 'fertility',
    },
    varicocele: {
      id: 'varicocele',
      name: 'Варикоцеле',
      section: 'andrology',
      subsection: 'fertility',
    },
    azoospermia: {
      id: 'azoospermia',
      name: 'Азооспермия',
      section: 'andrology',
      subsection: 'fertility',
    },
    'erectile-dysfunction': {
      id: 'erectile-dysfunction',
      name: 'Эректильная дисфункция',
      section: 'andrology',
      subsection: 'sexual',
    },
  },
  sectionNames: {
    urology: 'Урология',
    andrology: 'Андрология',
    emergency: 'Экстренные состояния',
    surgery: 'Хирургия',
  },
  subsectionLabels: {
    stones: 'Мочекаменная болезнь',
    fertility: 'Фертильность',
    endocrine: 'Эндокринология',
    sexual: 'Сексуальная медицина',
  },
  allDiseases: [],
  searchDiseases: () => [],
}));

vi.mock('../data/lazyData', () => ({
  preloadDiseaseBatch: (...args) => mockPreloadDiseaseBatch(...args),
}));

const baseDisease = {
  id: 'stone',
  name: 'Мочекаменная болезнь',
  icd: 'N20',
  section: 'urology',
  subsection: 'stones',
  icon: '💎',
  tags: ['EAU', 'AUA'],
  definition: 'Определение заболевания',
  epidemiology: 'Эпидемиология',
  etiology: ['Причина 1'],
  symptoms: ['Симптом 1'],
  complications: ['Осложнение 1'],
  diagnostics: {
    title: 'Диагностика',
    steps: [{ step: 1, text: 'Шаг диагностики', main: true }],
    imaging: 'УЗИ',
    labs: 'ОАМ',
  },
  treatment: {
    conservative: [{ title: 'Консервативно', items: ['Пить воду'] }],
    surgical: [{ title: 'Хирургия', items: ['Удаление'] }],
  },
  guidelines: {
    consensus: ['Общий консенсус'],
    eau: { title: 'EAU', keyPoints: ['Пункт EAU'], url: 'https://example.com/eau' },
  },
  quickSummary: { firstLine: 'Первая линия' },
  relatedIds: ['related'],
  patientQuestions: [{ q: 'Что это?', a: 'Ответ' }],
  lastReviewed: '2026-04-20',
  evidenceVersion: 'Guideline sync 2026.04',
};

const endocrineDisease = {
  ...baseDisease,
  id: 'hypogonadism',
  name: 'Мужской гипогонадизм',
  section: 'andrology',
  subsection: 'endocrine',
  diagnostics: {
    title: 'Диагностика',
    steps: [{ step: 1, text: 'Гормональный профиль', main: true }],
    imaging: 'По показаниям',
    labs: 'Тестостерон, ЛГ, ФСГ, пролактин',
  },
  whenToRefer: {
    toEndocrinology: ['Нужна эндокринная интерпретация'],
  },
  followUp: {
    schedule: ['Контроль симптомов и уровней тестостерона'],
    monitoring: ['Гематокрит и клинический ответ'],
  },
};

const fertilityDisease = {
  ...baseDisease,
  id: 'azoospermia',
  name: 'Азооспермия',
  section: 'andrology',
  subsection: 'fertility',
  whenToRefer: {
    toReproductiveSpecialist: ['Нужен couple pathway'],
    toGenetics: ['Нужна генетика'],
  },
};

describe('DiseaseModal', () => {
  beforeEach(() => {
    mockPreloadDiseaseBatch.mockReset();
  });

  it('renders header and overview content', () => {
    render(
      <DiseaseModal
        disease={baseDisease}
        allDiseases={[baseDisease]}
        currentIndex={0}
        onNavigate={vi.fn()}
        onClose={vi.fn()}
        onNavigateToDisease={vi.fn()}
      />
    );

    expect(screen.getAllByText('Мочекаменная болезнь').length).toBeGreaterThan(0);
    expect(screen.getAllByText('EAU').length).toBeGreaterThan(0);
    expect(screen.getByText('КРАТКО')).toBeInTheDocument();
    expect(screen.getByText('ФОКУС')).toBeInTheDocument();
  });

it('renders andrology pathway badges', () => {
    render(
      <DiseaseModal
        disease={fertilityDisease}
        allDiseases={[fertilityDisease]}
        currentIndex={0}
        onNavigate={vi.fn()}
        onClose={vi.fn()}
        onNavigateToDisease={vi.fn()}
      />
    );

    expect(screen.getAllByText('Фертильность').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Парный маршрут').length).toBeGreaterThan(0);
  });

  it('renders endocrine review markers for endocrine journeys', () => {
    render(
      <DiseaseModal
        disease={endocrineDisease}
        allDiseases={[endocrineDisease]}
        currentIndex={0}
        onNavigate={vi.fn()}
        onClose={vi.fn()}
        onNavigateToDisease={vi.fn()}
      />
    );

    expect(screen.getAllByText('Эндокринный обзор').length).toBeGreaterThan(0);
    expect(screen.getByText('Нуждается в наблюдении')).toBeInTheDocument();
  });

  it('switches tabs and renders diagnostics content', async () => {
    render(
      <DiseaseModal
        disease={baseDisease}
        allDiseases={[baseDisease]}
        currentIndex={0}
        onNavigate={vi.fn()}
        onClose={vi.fn()}
        onNavigateToDisease={vi.fn()}
      />
    );

    fireEvent.click(screen.getByRole('tab', { name: 'Диагностика' }));

    await waitFor(() => {
      expect(screen.getByText('Шаг диагностики')).toBeInTheDocument();
      expect(screen.getAllByText('УЗИ').length).toBeGreaterThan(0);
      expect(screen.getByText('ОАМ')).toBeInTheDocument();
    });
  });

  it('closes on Escape key', () => {
    const onClose = vi.fn();

    render(
      <DiseaseModal
        disease={baseDisease}
        allDiseases={[baseDisease]}
        currentIndex={0}
        onNavigate={vi.fn()}
        onClose={onClose}
        onNavigateToDisease={vi.fn()}
      />
    );

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });

  it('navigates with arrow keys', () => {
    const onNavigate = vi.fn();

    render(
      <DiseaseModal
        disease={baseDisease}
        allDiseases={[baseDisease, { ...baseDisease, id: 'stone-2', name: 'Камень 2' }]}
        currentIndex={0}
        onNavigate={onNavigate}
        onClose={vi.fn()}
        onNavigateToDisease={vi.fn()}
      />
    );

    fireEvent.keyDown(window, { key: 'ArrowRight' });
    fireEvent.keyDown(window, { key: 'ArrowLeft' });

    expect(onNavigate).toHaveBeenCalledWith(1);
    expect(onNavigate).toHaveBeenCalledWith(-1);
  });

  it('prefetches adjacent diseases on open', () => {
    render(
      <DiseaseModal
        disease={baseDisease}
        allDiseases={[
          { ...baseDisease, id: 'prev', name: 'Предыдущая' },
          baseDisease,
          { ...baseDisease, id: 'next', name: 'Следующая' },
        ]}
        currentIndex={1}
        onNavigate={vi.fn()}
        onClose={vi.fn()}
        onNavigateToDisease={vi.fn()}
      />
    );

    expect(mockPreloadDiseaseBatch).toHaveBeenCalledWith(['prev', 'next']);
  });

  it('locks body scroll while modal is mounted', () => {
    const { unmount } = render(
      <DiseaseModal
        disease={baseDisease}
        allDiseases={[baseDisease]}
        currentIndex={0}
        onNavigate={vi.fn()}
        onClose={vi.fn()}
        onNavigateToDisease={vi.fn()}
      />
    );

    expect(document.body.classList.contains('modal-open')).toBe(true);

    unmount();

    expect(document.body.classList.contains('modal-open')).toBe(false);
  });

  it('renders tabs and close button', () => {
    render(
      <DiseaseModal
        disease={baseDisease}
        allDiseases={[baseDisease]}
        currentIndex={0}
        onNavigate={vi.fn()}
        onClose={vi.fn()}
        onNavigateToDisease={vi.fn()}
      />
    );

    expect(screen.getAllByText('Диагностика').length).toBeGreaterThan(0);
    expect(screen.getByRole('button', { name: /Закрыть/i })).toBeInTheDocument();
  });

  it('renders andrology care markers', () => {
    render(
      <DiseaseModal
        disease={fertilityDisease}
        allDiseases={[fertilityDisease]}
        currentIndex={0}
        onNavigate={vi.fn()}
        onClose={vi.fn()}
        onNavigateToDisease={vi.fn()}
      />
    );

    expect(screen.getByText('Парный маршрут')).toBeInTheDocument();
  });
});
