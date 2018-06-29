import Web3 from 'web3';

import { Market } from '../src/';
import { MARKETProtocolConfig } from '../src/types/Configs';
import { constants } from '../src/constants';

/**
 * Market
 */
describe('Market class', () => {
  it('Market is instantiable', () => {
    const config: MARKETProtocolConfig = {
      networkId: constants.NETWORK_ID_RINKEBY
    };
    const market = new Market(new Web3.providers.HttpProvider('http://localhost:9545'), config);
    expect(market).toBeInstanceOf(Market);
  });
});
