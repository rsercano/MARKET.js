import { Settlement } from "../src/lib/Settlement";

/**
 * Settlement
 */
describe("Settlement class", () => {
  it("Settlement is instantiable", () => {
    expect(new Settlement()).toBeInstanceOf(Settlement);
  });
});
