/* Passer discount et taxes en paramètre ici permet de respecter le principe Open Closed, on peut à la création de l'object pricer définir les règles que l'on souhaite, sans avoir à modifier le code de createPricer */
export const createPricer =
  ({
    discount = identityPriceModifier,
    taxes = identityPriceModifier,
  }: { discount?: PriceModifier; taxes?: PriceModifier } = {}) =>
  ({ unitaryPrice, articleCount }) => {
    const finalPrice = computePrice({
      discount,
      taxes,
      unitaryPrice,
      articleCount,
    });
    return priceToString(finalPrice);
  };

type PriceModifier = {
  (price: number): number;
};

const identityPriceModifier: PriceModifier = (price) => price;

const priceToString = (price: number) => `${price.toFixed(2)} €`;

export const createDiscount =
  ({
    discountAmountInPercent,
    minPrice,
  }: {
    discountAmountInPercent: number;
    minPrice: number;
  }): PriceModifier =>
  (price: number) => {
    return price > minPrice
      ? price * (1 - discountAmountInPercent / 100)
      : price;
  };

export const createTaxesModifier =
  (taxesInPercent: number): PriceModifier =>
  (price: number) =>
    price + (taxesInPercent / 100) * price;

const computePrice = ({
  discount,
  taxes,
  unitaryPrice,
  articleCount,
}: {
  discount: PriceModifier;
  taxes: PriceModifier;
  unitaryPrice: number;
  articleCount: number;
}) => {
  const price = taxes(discount(articleCount * unitaryPrice));

  return Math.round(price * 100) / 100;
};
