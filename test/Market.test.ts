import Web3 from 'web3';
import { isUrl } from './utils';
import { toBeArray, toBeBoolean, toBeString } from 'jest-extended';
import { Market } from '../src/';
import { constants } from '../src/constants';
import { BigNumber } from 'bignumber.js';

// types
import { MARKETProtocolConfig } from '../src/types';

/**
 * Test for a valid address format.
 * @param {string} address   Address string to check.
 * @returns void
 */
function isValidAddress(address: string): void {
  expect(address).toBeString();
  expect(address).toMatch(new RegExp('^0x[a-fA-F0-9]+'));
  expect(address).toHaveLength(42);
}

/**
 * Market
 */
describe('Market class', () => {
  const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:9545'));
  const config: MARKETProtocolConfig = {
    networkId: constants.NETWORK_ID_TRUFFLE
  };

  let market: Market;
  let contractAddress: string;

  beforeAll(async () => {
    market = new Market(web3.currentProvider, config);
    const contractAddresses: string[] = await market.marketContractRegistry.getAddressWhiteList;
    contractAddress = contractAddresses[0];
  });

  it('Is instantiable', () => {
    expect(market).toBeInstanceOf(Market);
  });

  it('Returns a whitelist', async () => {
    const result = await market.getAddressWhiteListAsync();
    expect(result).toBeDefined();
    expect(result).toBeArray();
    result.forEach(element => {
      isValidAddress(element);
    });
  });

  it('Returns a collateral pool contract address', async () => {
    const result = await market.getCollateralPoolContractAddressAsync(contractAddress);
    isValidAddress(result);
  });

  it('Returns a oracle query URL', async () => {
    const result = await market.getOracleQueryAsync(contractAddress);
    expect(result).toBeDefined();
    expect(result).toBeString();
    expect(isUrl(result.replace(/^.*\((.*)\)/, '$1'))).toBe(true);
  });

  it('Returns a contract expiration', async () => {
    const result = await market.getContractExpirationAsync(contractAddress);
    expect(result).toBeDefined();
    expect(result.toNumber()).toBeNumber();
  });

  it('Returns a settlement status', async () => {
    const result = await market.isContractSettledAsync(contractAddress);
    expect(result).toBeDefined();
    expect(result).toBeBoolean();
  });

  it('Returns a contract name', async () => {
    const result = await market.getMarketContractNameAsync(contractAddress);
    expect(result).toBeDefined();
    expect(result).toBeString();
  });

  it('Returns a contract name', async () => {
    const result: BigNumber = await market.getMarketContractPriceDecimalPlacesAsync(
      contractAddress
    );
    expect(result).toBeDefined();
    expect(result.toNumber()).toBeNumber();
  });
});
