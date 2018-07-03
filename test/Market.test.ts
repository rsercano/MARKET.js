import Web3 from 'web3';

// Types
import { MARKETProtocolConfig } from '@marketprotocol/types';
import { toBeArray, toBeString } from 'jest-extended';

import { Market } from '../src/';
import { configRinkeby, constants } from '../src/constants';

// Deployed contracts on Rinkeby
const MARKET_CONTRACT_ADDRESS = '0xb97b05f8f65733bfffca1ab210d94197dbd3d1ef';
const COLLATERAL_POOL_CONTRACT_ADDRESS = '0xf8d557eeb0e4961a3de2ada3f18c80792dff4dae';

/**
 * Market
 */
describe('Market class', () => {
  it('Is instantiable', () => {
    const config: MARKETProtocolConfig = {
      networkId: constants.NETWORK_ID_TRUFFLE
    };
    const market = new Market(
      new Web3.providers.HttpProvider(constants.PROVIDER_URL_TRUFFLE),
      config
    );
    expect(market).toBeInstanceOf(Market);
  });
  it('Returns a whitelist', async () => {
    const market = new Market(
      new Web3.providers.HttpProvider(constants.PROVIDER_URL_RINKEBY),
      configRinkeby
    );
    const result = await market.getAddressWhiteListAsync();
    console.log(result);
    expect(result).toBeDefined();
    expect(result).toBeArray();
    expect(result).toContain(MARKET_CONTRACT_ADDRESS);
    result.forEach(element => {
      expect(element).toBeString();
      expect(element).toMatch(new RegExp('^0x.*'));
      expect(element).toHaveLength(42);
    });
  });
  it('Returns a collateral pool contract address', async () => {
    const market = new Market(
      new Web3.providers.HttpProvider(constants.PROVIDER_URL_RINKEBY),
      configRinkeby
    );
    const result = await market.getCollateralPoolContractAddressAsync(MARKET_CONTRACT_ADDRESS);
    console.log(result);
    expect(result).toBe(COLLATERAL_POOL_CONTRACT_ADDRESS);
    expect(result).toBeString();
    expect(result).toMatch(new RegExp('^0x.*'));
    expect(result).toHaveLength(42);
  });
});
