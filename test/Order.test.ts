import { createOrderHash, signOrderHash, tradeOrder } from '../src/lib/Order';

/**
 * Order
 */
describe('Order', () => {
  it('Order has create order function', () => {
    expect(typeof createOrderHash).toEqual('function');
  });

  it('Order has sign order hash function', () => {
    expect(typeof signOrderHash).toEqual('function');
  });

  it('Order has trade order function', () => {
    expect(typeof tradeOrder).toEqual('function');
  });
});
