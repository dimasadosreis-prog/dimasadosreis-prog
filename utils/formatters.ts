
export const formatFCFA = (value: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XOF', // CFA Franc
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value).replace('XOF', 'FCFA');
};

export const formatPercent = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value / 100);
};
