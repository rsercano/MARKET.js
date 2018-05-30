import { Collateral } from "../src/lib/Collateral";

/**
 * Collateral
 */
describe("Collateral class", () => {
  it("Collateral is instantiable", () => {
    expect(new Collateral()).toBeInstanceOf(Collateral);
  });
});
