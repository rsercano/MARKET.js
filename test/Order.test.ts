import { Order } from '../src/lib/Order';

/**
 * Order
 */
describe('Order class', () => {
  it('Order is instantiable', () => {
    expect(new Order()).toBeInstanceOf(Order);
  });
});
