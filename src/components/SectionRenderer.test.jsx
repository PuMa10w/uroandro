import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import SectionRenderer from './SectionRenderer';

vi.mock('./LandingPage', () => () => {
  const mockReact = require('react');
  return mockReact.createElement('div', null, 'LandingPage');
});

vi.mock('./ToolsSection', () => () => {
  const mockReact = require('react');
  return mockReact.createElement('div', null, 'ToolsSection');
});

vi.mock('./FavoritesPage', () => () => {
  const mockReact = require('react');
  return mockReact.createElement('div', null, 'FavoritesPage');
});

vi.mock('./EmergencyPage', () => () => {
  const mockReact = require('react');
  return mockReact.createElement('div', null, 'EmergencyPage');
});

vi.mock('./SitemapPage', () => () => {
  const mockReact = require('react');
  return mockReact.createElement('div', null, 'SitemapPage');
});

vi.mock('./CalculatorsPage', () => () => {
  const mockReact = require('react');
  return mockReact.createElement('div', null, 'CalculatorsPage');
});

vi.mock('./GamesPage', () => () => {
  const mockReact = require('react');
  return mockReact.createElement('div', null, 'GamesPage');
});

vi.mock('./SurgeryPage', () => () => {
  const mockReact = require('react');
  return mockReact.createElement('div', null, 'SurgeryPage');
});

vi.mock('./MetaphylaxisPage', () => () => {
  const mockReact = require('react');
  return mockReact.createElement('div', null, 'MetaphylaxisPage');
});

vi.mock('./UroHumorPage', () => () => {
  const mockReact = require('react');
  return mockReact.createElement('div', null, 'UroHumorPage');
});

vi.mock('../sections/PediatricUrology', () => () => {
  const mockReact = require('react');
  return mockReact.createElement('div', null, 'PediatricUrology');
});

describe('SectionRenderer', () => {
  const baseProps = {
    activeSubsection: null,
    selectedDiseaseId: null,
    favorites: {},
    toggleFavorite: vi.fn(),
    viewHistory: [],
    clearHistory: vi.fn(),
    onCloseDisease: vi.fn(),
    onNavigate: vi.fn(),
  };

  it('renders urology subsection selector cards', () => {
    render(<SectionRenderer {...baseProps} activeSection="urology" />);

    expect(screen.getByText('УРОЛОГИЯ')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Мочекаменная/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Инфекции/i })).toBeInTheDocument();
  });

  it('opens a urology subsection with the neutral subsection source', () => {
    const onNavigate = vi.fn();

    render(<SectionRenderer {...baseProps} activeSection="urology" onNavigate={onNavigate} />);

    fireEvent.click(screen.getByRole('button', { name: /Инфекции/i }));

    expect(onNavigate).toHaveBeenCalledWith('urology', 'infections', null, {
      source: 'section_subsection',
    });
  });

  it('opens an andrology subsection with the neutral subsection source', () => {
    const onNavigate = vi.fn();

    render(<SectionRenderer {...baseProps} activeSection="andrology" onNavigate={onNavigate} />);

    fireEvent.click(screen.getByRole('button', { name: /Эндокринология/i }));

    expect(onNavigate).toHaveBeenCalledWith('andrology', 'endocrine', null, {
      source: 'section_subsection',
    });
  });
});
