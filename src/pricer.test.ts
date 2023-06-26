import { describe, test, expect } from "vitest";
import { pricer } from "./pricer";

describe("pricer", () => {
  test("one article, one euro, no taxes", () => {
    expect(pricer({ unitaryPrice: 1, articleCount: 1, taxes: 0 })).toEqual(
      "1.00 €"
    );
  });
  test("two articles, one euro, no taxes", () => {
    expect(pricer({ unitaryPrice: 1, articleCount: 2, taxes: 0 })).toEqual(
      "2.00 €"
    );
  });

  test("1 article, 2 euros, no taxes", () => {
    expect(pricer({ unitaryPrice: 2, articleCount: 1, taxes: 0 })).toEqual(
      "2.00 €"
    );
  });

  test("1 article, 2.5 euros, no taxes", () => {
    expect(pricer({ unitaryPrice: 2.5, articleCount: 1, taxes: 0 })).toEqual(
      "2.50 €"
    );
  });

  test("3 articles à 1,21 € et taxe 5 %", () => {
    expect(pricer({ unitaryPrice: 1.21, articleCount: 3, taxes: 5 })).toEqual(
      "3.81 €"
    );
  });

  test("3 articles à 1,21 € et taxe 20 %", () => {
    expect(pricer({ unitaryPrice: 1.21, articleCount: 3, taxes: 20 })).toEqual(
      "4.36 €"
    );
  });

  test("1000€ HT = remise 3%", () => {
    expect(pricer({ unitaryPrice: 345, articleCount: 5, taxes: 10 })).toEqual(
      "1840.58 €"
    );
  });

  test("1000€ HT = remise 5%", () => {
    expect(pricer({ unitaryPrice: 1299, articleCount: 5, taxes: 10 })).toEqual(
      "6787.28 €"
    );
  });
});
