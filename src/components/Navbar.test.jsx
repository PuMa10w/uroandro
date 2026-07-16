import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import Navbar from './Navbar';
import { searchDiseases } from '../data';
import { trackSearch, trackSearchSelect, trackSymptomRoute } from '../utils/analytics';

vi.mock('framer-motion', () => ({
  motion: new Proxy(
    {},
    {
      get: (_, tag) => {
        const mockReact = require('react');
        const Component = ({
          children,
          initial,
          animate,
          exit,
          transition,
          whileHover,
          whileTap,
          viewport,
          layout,
          ...props
        }) => mockReact.createElement(tag, props, children);
        Component.displayName = `motion.${String(tag)}`;
        return Component;
      },
    }
  ),
  AnimatePresence: ({ children }) => {
    const mockReact = require('react');
    return mockReact.createElement(mockReact.Fragment, null, children);
  },
}));

vi.mock('../hooks/useLocalStorage', () => ({
  useDarkMode: () => [false, vi.fn()],
  useSearchHistory: () => [[], vi.fn(), vi.fn()],
}));

vi.mock('../data', () => ({
  searchDiseases: vi.fn(),
}));

vi.mock('../utils/analytics', () => ({
  trackSearch: vi.fn(),
  trackSearchSelect: vi.fn(),
  trackSymptomRoute: vi.fn(),
}));

describe('Navbar', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    searchDiseases.mockReset();
    trackSearch.mockReset();
    trackSearchSelect.mockReset();
    trackSymptomRoute.mockReset();
    searchDiseases.mockImplementation((query) => {
      if (!query || query.length < 2) return [];
      if (query === 'zz') return [];

      return [
        {
          id: 'urolithiasis',
          name: 'Мочекаменная болезнь',
          section: 'urology',
          subsection: 'stones',
          icd: 'N20',
          icon: '💎',
        },
      ];
    });
  });

  afterEach(() => {
    act(() => {
      vi.runOnlyPendingTimers();
    });
    vi.useRealTimers();
  });

  it('opens search and selects a disease from results', async () => {
    const onNavigate = vi.fn();

    render(
      <Navbar
        activeSection="home"
        setActiveSection={vi.fn()}
        setActiveSubsection={vi.fn()}
        onNavigate={onNavigate}
        favorites={{}}
        viewHistory={[]}
      />
    );

    fireEvent.click(screen.getByLabelText('Открыть поиск'));
    fireEvent.change(
      screen.getByLabelText('Поиск по названию, МКБ, симптому, аббревиатуре или идентификатору'),
      {
        target: { value: 'мо' },
      }
    );

    await act(async () => {
      vi.advanceTimersByTime(300);
    });

    expect(searchDiseases).toHaveBeenCalledWith('мо');
    expect(trackSearch).toHaveBeenCalledWith('мо', 1);

    const resultText = await screen.findByText('Мочекаменная болезнь');
    fireEvent.click(resultText.closest('button'));

    expect(onNavigate).toHaveBeenCalledWith('urology', 'stones', 'urolithiasis', {
      source: 'search',
    });
    expect(trackSearchSelect).toHaveBeenCalledWith('мо', 'urolithiasis');
  });

  it('shows no-results state for unmatched query', async () => {
    render(
      <Navbar
        activeSection="home"
        setActiveSection={vi.fn()}
        setActiveSubsection={vi.fn()}
        onNavigate={vi.fn()}
        favorites={{}}
        viewHistory={[]}
      />
    );

    fireEvent.click(screen.getByLabelText('Открыть поиск'));
    fireEvent.change(
      screen.getByLabelText('Поиск по названию, МКБ, симптому, аббревиатуре или идентификатору'),
      {
        target: { value: 'zz' },
      }
    );

    await act(async () => {
      vi.advanceTimersByTime(300);
    });

    await waitFor(() => {
      expect(screen.getByText('Ничего не найдено')).toBeInTheDocument();
    });

    expect(trackSearch).toHaveBeenCalledWith('zz', 0);
  });

  it('shows symptom-first andrology routes in search and navigates from a complaint', () => {
    const onNavigate = vi.fn();

    render(
      <Navbar
        activeSection="home"
        setActiveSection={vi.fn()}
        setActiveSubsection={vi.fn()}
        onNavigate={onNavigate}
        favorites={{}}
        viewHistory={[]}
      />
    );

    fireEvent.click(screen.getByLabelText('Открыть поиск'));

    expect(screen.getByText('По симптомам')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Плохая спермограмма'));

    expect(onNavigate).toHaveBeenCalledWith('andrology', 'fertility', 'male-infertility', {
      source: 'search_overlay_symptom',
    });
    expect(trackSymptomRoute).toHaveBeenCalledWith(
      'Плохая спермограмма',
      'male-infertility',
      'search_overlay'
    );
  });

  it('navigates to favorites when favorites button is clicked', () => {
    const onNavigate = vi.fn();

    render(
      <Navbar
        activeSection="home"
        setActiveSection={vi.fn()}
        setActiveSubsection={vi.fn()}
        onNavigate={onNavigate}
        favorites={{ a: true, b: false }}
        viewHistory={[]}
      />
    );

    fireEvent.click(screen.getByLabelText('Избранное: 1 нозологий'));

    expect(onNavigate).toHaveBeenCalledWith('favorites', null, null, { skipHistory: true });
  });

  it('shows retention-aware routes in search overlay and opens them', () => {
    const onNavigate = vi.fn();

    render(
      <Navbar
        activeSection="home"
        setActiveSection={vi.fn()}
        setActiveSubsection={vi.fn()}
        onNavigate={onNavigate}
        favorites={{}}
        viewHistory={[
          {
            id: 'urolithiasis',
            name: 'Мочекаменная болезнь',
            section: 'urology',
            subsection: 'stones',
            openCount: 4,
            icon: '💎',
          },
          {
            id: 'renal-colic',
            name: 'Почечная колика',
            section: 'urology',
            subsection: 'stones',
            openCount: 2,
            icon: '💎',
          },
        ]}
      />
    );

    fireEvent.click(screen.getByLabelText('Открыть поиск'));

    expect(screen.getByText('История')).toBeInTheDocument();
    expect(screen.getByText('Группы по истории')).toBeInTheDocument();

    fireEvent.click(screen.getAllByText('Мочекаменная болезнь')[0].closest('button'));

    expect(onNavigate).toHaveBeenCalledWith('urology', 'stones', 'urolithiasis', {
      source: 'search_retention',
    });

    fireEvent.click(screen.getByText('6 откр. из истории').closest('button'));

    expect(onNavigate).toHaveBeenCalledWith('urology', 'stones', null, {
      source: 'search_retention_cluster',
    });
  });
});
