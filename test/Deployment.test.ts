import Web3 from 'web3';

import { deployMarketContractOraclize } from '../src/lib/Deployment';
import { MarketContractFactoryOraclize } from '../src/types/MarketContractFactoryOraclize';
import { BigNumber } from 'bignumber.js';
import { getContractAddress } from './utils';
import { ITxParams } from '../src/types/typechain-runtime';

const TRUFFLE_NETWORK_ID = `4447`;
const GAS_LIMIT = 4000000;

describe('Deploy Test', () => {
  it('Deploys', async () => {
    const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:9545'));
    const factoryAddress = getContractAddress('MarketContractFactoryOraclize', TRUFFLE_NETWORK_ID);
    const collateralTokenAddress = getContractAddress('CollateralToken', TRUFFLE_NETWORK_ID);
    const quickExpirationTimeStamp: BigNumber = new BigNumber(
      Math.floor(Date.now() / 1000) + 60 * 60
    ); // expires in an hour
    const contractSpecs = [
      new BigNumber(50000),
      new BigNumber(150000),
      new BigNumber(2),
      new BigNumber(1e18),
      quickExpirationTimeStamp
    ];
    const txParams: ITxParams = { from: web3.eth.accounts[0], gas: GAS_LIMIT };

    await deployMarketContractOraclize(
      web3.currentProvider,
      factoryAddress,
      'TestContract',
      collateralTokenAddress,
      contractSpecs,
      `URL`,
      'json(https://api.kraken.com/0/public/Ticker?pair=ETHUSD).result.XETHZUSD.c.0',
      txParams
    );
  });
});
