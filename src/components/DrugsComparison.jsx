import React from 'react';
import { IconX } from '../icons';

/**
 * DrugsComparison — таблица сравнения препаратов
 * Компактный вид в модальном окне
 */
const DRUG_COMPARISONS = {
  tamsulosin_vs_silodosin: {
    title: 'Тамсулозин vs Силодозин',
    subtitle: 'α1-адреноблокаторы для СНМП',
    drugs: ['Тамсулозин', 'Силодозин'],
    comparison: [
      { feature: 'Селективность', tamsulosin: 'α1A/α1D', silodosin: 'α1A (более селективен)' },
      { feature: 'Доза', tamsulosin: '0,4 мг/сут', silodosin: '8 мг/сут' },
      { feature: 'Эякуляция', tamsulosin: '6-14% ↓', silodosin: '30-40% анэякуляция' },
      { feature: 'Головокружение', tamsulosin: '10-20%', silodosin: '15-25%' },
      { feature: 'Ортостатизм', tamsulosin: 'Умеренный', silodosin: 'Выше' },
      { feature: 'IVF-сохранение', tamsulosin: '↑', silodosin: '↓' },
      { feature: 'Фармакокинетика', tamsulosin: 'T1/2 8-11ч', silodosin: 'T1/2 11-20ч' },
    ],
  },
};

export const DrugsComparison = ({ drugId = 'tamsulosin_vs_silodosin', onClose }) => {
  const data = DRUG_COMPARISONS[drugId];
  if (!data) return null;

  return (
    <div className="drugs-comparison-overlay">
      <div className="drugs-comparison-modal">
        <div className="drugs-comparison-header">
          <div>
            <h2>{data.title}</h2>
            <p>{data.subtitle}</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Закрыть">
            <IconX size={20} />
          </button>
        </div>
        
        <table className="drugs-comparison-table">
          <thead>
            <tr>
              <th style={{ width: '28%' }}>Параметр</th>
              {data.drugs.map((d) => (
                <th key={d}>{d}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.comparison.map((row) => (
              <tr key={row.feature}>
                <td className="comparison-feature">{row.feature}</td>
                                <td>{row.tamsulosin || row[Object.keys(row)[1]]}</td>
                                <td>{row.silodosin || row[Object.keys(row)[2]]}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="drugs-comparison-footer">
          <p>Данные EAU Guidelines 2026 • Для мужчин &gt;40 лет с СНМП</p>
        </div>
      </div>
    </div>
  );
};

export default DrugsComparison;