import React, { useMemo } from 'react';
import DiseaseSection from '../components/DiseaseSection';
import { getSectionDiseases } from '../data/sectionData';

const UrologyPain = ({
  favorites,
  onToggleFavorite,
  onNavigate,
  selectedDiseaseId,
  viewHistory,
}) => {
  const data = useMemo(
    () => getSectionDiseases('urology', 'pain', ['bladder-pain-syndrome', 'malakoplakia']),
    []
  );

  return (
    <DiseaseSection
      data={data}
      title="БОЛЕВОЙ СИНДРОМ В УРОЛОГИИ"
      subtitle="Болевой синдром мочевого пузыря, малакоплакия"
      favorites={favorites}
      onToggleFavorite={onToggleFavorite}
      onNavigate={onNavigate}
      selectedDiseaseId={selectedDiseaseId}
      viewHistory={viewHistory}
    />
  );
};

export default UrologyPain;
