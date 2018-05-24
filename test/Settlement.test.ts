import { Settlement } from "../src/lib/Settlement";

/**
 * Contract
 */
describe("Settlement class", () => {
  it("Settlement is instantiable", () => {
    expect(new Settlement()).toBeInstanceOf(Settlement);
  });
});
