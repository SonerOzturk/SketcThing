import React from 'react';

interface InfoWindowContentProps {
  name: string;
  vicinity?: string;
  rating?: number;
  userRatingsTotal?: number;
}

export const createInfoWindowContent = ({
  name,
  vicinity,
  rating,
  userRatingsTotal
}: InfoWindowContentProps): string => {
  return `
    <div class="p-2">
      <h3 class="font-bold">${name}</h3>
      ${vicinity ? `<p>${vicinity}</p>` : ''}
      ${rating ? `<p>Puan: ${rating} ⭐</p>` : ''}
      ${userRatingsTotal ? `<p>Değerlendirme Sayısı: ${userRatingsTotal}</p>` : ''}
    </div>
  `;
};