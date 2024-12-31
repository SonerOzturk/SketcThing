export const getRatingColor = (rating: number): string => {
  const minRating = 1;
  const maxRating = 5;
  const hue = ((rating - minRating) / (maxRating - minRating)) * 120;
  return `hsl(${hue}, 75%, 50%)`;
};