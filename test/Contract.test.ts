import { Contract } from '../src/';

/**
 * Contract
 */
describe('Contract class', () => {
  it('Contract is instantiable', () => {
    expect(new Contract()).toBeInstanceOf(Contract);
  });
});
