import { Collateral } from '../src/';

/**
 * Collateral
 */
describe('Collateral class', () => {
  it('Collateral is instantiable', () => {
    expect(new Collateral()).toBeInstanceOf(Collateral);
  });
});
