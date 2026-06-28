import React from 'react';
import { IconDownload } from '../icons';

/**
 * ExportDiseaseCard — кнопка экспорта карточки в PDF via браузерный print
 * Использует CSS @media print для стилизации
 */
export const ExportDiseaseCard = ({ disease }) => {
  const handleExport = () => {
    // Запускаем браузерный диалог печати → Save as PDF
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    if (!printWindow) return;
    
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>UroMed: ${disease.nameRu || disease.nameEn}</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap">
        <style>
          body { 
            font-family: 'Manrope', sans-serif; 
            background: #f8fafc; 
            color: #0f172a;
            padding: 2rem;
            max-width: 800px;
            margin: 0 auto;
          }
          h1 { color: #0891b2; margin-bottom: 0.5rem; }
          .icd { color: #64748b; font-weight: 500; }
          .section { margin-top: 1.5rem; }
          .section h2 { color: #0f172a; font-size: 1.1rem; margin-bottom: 0.5rem; }
          .warning { background: #fef2f2; border-left: 4px solid #ef4444; padding: 1rem; margin: 1rem 0; }
          @media print { body { padding: 0; } }
        </style>
      </head>
      <body>
        <h1>${disease.nameRu || disease.nameEn}</h1>
        ${disease.icd ? `<p class="icd">МКБ-10: ${disease.icd}</p>` : ''}
        ${disease.overview ? `<p>${disease.overview}</p>` : ''}
        ${disease.redFlags?.length ? `
          <div class="warning">
            <strong>Red Flags (неотложные):</strong>
            <ul>${disease.redFlags.map(f => `<li>${f}</li>`).join('')}</ul>
          </div>` : ''}
        <div class="section">
          <h2>Diagnostic Approach</h2>
          <p>Данные из EAU/AUA Guidelines, актуально на ${new Date().getFullYear()} год.</p>
        </div>
        <p style="margin-top: 2rem; color: #94a3b8; font-size: 0.875rem;">UroMed • ${new Date().toLocaleDateString('ru-RU')}</p>
        <script>window.onload = () => { window.print(); }</script>
      </body>
      </html>
    `;
    printWindow.document.write(html);
    printWindow.document.close();
  };
  
  return (
    <button
      type="button"
      className="btn-premium btn-premium-ghost"
      onClick={handleExport}
      aria-label="Экспорт в PDF"
    >
      <IconDownload size={16} />
      <span>PDF</span>
    </button>
  );
};

export default ExportDiseaseCard;