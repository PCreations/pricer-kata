export const pricer = ({
  unitaryPrice,
  articleCount,
  taxes,
}: {
  unitaryPrice: number;
  articleCount: number;
  taxes: number;
}) => {
  let priceHT = articleCount * unitaryPrice;
  if (priceHT > 5000) {
    priceHT = priceHT * 0.95;
  } else if (priceHT > 1000) {
    priceHT = priceHT * 0.97;
  }
  let finalPrice = priceHT + (taxes / 100) * priceHT;
  finalPrice = Math.round(finalPrice * 100) / 100;
  return `${finalPrice.toFixed(2)} €`;
};
