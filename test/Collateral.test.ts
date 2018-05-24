import { Collateral } from "../src/lib/Collateral";

/**
 * Contract
 */
describe("Collateral class", () => {
  it("Collateral is instantiable", () => {
    expect(new Collateral()).toBeInstanceOf(Collateral);
  });
});
