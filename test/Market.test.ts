import Web3 from 'web3';
import { Market } from '../src/Market';

/**
 * Market
 */
describe('Market class', () => {
  it('Market is instantiable', () => {
    expect(new Market(new Web3.providers.HttpProvider('http://localhost:9545'))).toBeInstanceOf(
      Market
    );
  });
});
