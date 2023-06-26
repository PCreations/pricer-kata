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
  if (priceHT > 1000) {
    priceHT = priceHT * 0.97;
  }
  const finalPrice = priceHT + (taxes / 100) * priceHT;
  return `${finalPrice.toFixed(2)} €`;
};
