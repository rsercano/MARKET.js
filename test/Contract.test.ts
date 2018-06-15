import { getCollateralPoolContractAddressAsync } from '../src/lib/Contract';

/**
 * Contract
 */
describe('Contract class', () => {
  it('Contract has getUserAccountBalanceAsync function', () => {
    expect(typeof getCollateralPoolContractAddressAsync).toEqual('function');
  });
});
