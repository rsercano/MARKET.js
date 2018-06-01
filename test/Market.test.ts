import Web3 from 'web3';

import { Market } from '../src/';

/**
 * Market
 */
describe('Market class', () => {
  it('Market is instantiable', () => {
    const market = new Market(new Web3.providers.HttpProvider('http://localhost:9545'));
    expect(market).toBeInstanceOf(Market);
  });
});
