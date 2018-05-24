import { Contract } from "../src/lib/Contract";

/**
 * Contract
 */
describe("Contract class", () => {
  it("Contract is instantiable", () => {
    expect(new Contract()).toBeInstanceOf(Contract);
  });
});
