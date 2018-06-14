import { createOrderHashAsync, signOrderHashAsync, tradeOrderAsync } from '../src/lib/Order';

/**
 * Order
 */
describe('Order', () => {
  it('Order has create order function', () => {
    expect(typeof createOrderHashAsync).toEqual('function');
  });

  it('Order has sign order hash function', () => {
    expect(typeof signOrderHashAsync).toEqual('function');
  });

  it('Order has trade order function', () => {
    expect(typeof tradeOrderAsync).toEqual('function');
  });
});
