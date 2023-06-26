import { describe, test, expect } from "vitest";
import { createDiscount, createPricer, createTaxesModifier } from "./pricer";

describe("pricer", () => {
  test("one article, one euro, no taxes", () => {
    const pricer = createPricer();
    expect(pricer({ unitaryPrice: 1, articleCount: 1 })).toEqual("1.00 €");
  });
  test("two articles, one euro, no taxes", () => {
    const pricer = createPricer();
    expect(pricer({ unitaryPrice: 1, articleCount: 2 })).toEqual("2.00 €");
  });

  test("1 article, 2 euros, no taxes", () => {
    const pricer = createPricer();
    expect(pricer({ unitaryPrice: 2, articleCount: 1 })).toEqual("2.00 €");
  });

  test("1 article, 2.5 euros, no taxes", () => {
    const pricer = createPricer();
    expect(pricer({ unitaryPrice: 2.5, articleCount: 1 })).toEqual("2.50 €");
  });

  test("3 articles à 1,21 € et taxe 5 %", () => {
    const pricer = createPricer({
      taxes: createTaxesModifier(5),
    });
    expect(pricer({ unitaryPrice: 1.21, articleCount: 3 })).toEqual("3.81 €");
  });

  test("3 articles à 1,21 € et taxe 20 %", () => {
    const pricer = createPricer({
      taxes: createTaxesModifier(20),
    });
    expect(pricer({ unitaryPrice: 1.21, articleCount: 3 })).toEqual("4.36 €");
  });

  test("1000€ HT = remise 3%", () => {
    const pricer = createPricer({
      discount: createDiscount({ discountAmountInPercent: 3, minPrice: 1000 }),
      taxes: createTaxesModifier(10),
    });
    expect(pricer({ unitaryPrice: 345, articleCount: 5 })).toEqual("1840.58 €");
  });

  test("5000€ HT = remise 5%", () => {
    const pricer = createPricer({
      discount: createDiscount({ discountAmountInPercent: 5, minPrice: 5000 }),
      taxes: createTaxesModifier(10),
    });
    expect(pricer({ unitaryPrice: 1299, articleCount: 5 })).toEqual(
      "6787.28 €"
    );
  });
});
