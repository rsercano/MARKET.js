import {
  depositCollateralAsync,
  settleAndCloseAsync,
  withdrawCollateralAsync
} from '../src/lib/Collateral';

/**
 * Collateral
 */
describe('Collateral', () => {
  it('Collateral has depositCollateralAsync function', () => {
    expect(typeof depositCollateralAsync).toEqual('function');
  });

  it('Collateral has withdrawCollateralAsync function', () => {
    expect(typeof withdrawCollateralAsync).toEqual('function');
  });

  it('Collateral has settleAndCloseAsync function', () => {
    expect(typeof settleAndCloseAsync).toEqual('function');
  });
});
