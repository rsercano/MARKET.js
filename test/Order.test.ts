import { Order } from "../src/lib/Order";

/**
 * Contract
 */
describe("Order class", () => {
  it("Order is instantiable", () => {
    expect(new Order()).toBeInstanceOf(Order);
  });
});
