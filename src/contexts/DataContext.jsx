import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [allDiseases, setAllDiseases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadedSections, setLoadedSections] = useState(new Set());

  const loadSection = useCallback(async (section) => {
    if (loadedSections.has(section)) return;
    
    setLoading(true);
    try {
      const module = await import(`./${section}Data.js`);
      const data = module.default || module[Object.keys(module)[1]];
      setAllDiseases(prev => [...prev, ...data]);
      setLoadedSections(prev => new Set([...prev, section]));
    } catch (err) {
      console.error(`Failed to load ${section} data:`, err);
    } finally {
      setLoading(false);
    }
  }, [loadedSections]);

  return (
    <DataContext.Provider value={{ allDiseases, loading, loadSection, loadedSections }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
}