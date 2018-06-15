import { Provider } from '@0xproject/types';
import Web3 from 'web3';
import { MarketCollateralPoolFactory } from '../types/MarketCollateralPoolFactory';
import { MarketContractFactoryOraclize } from '../types/MarketContractFactoryOraclize';
import { BigNumber } from 'bignumber.js';
import { ITxParams } from '../types/typechain-runtime';

/**
 * calls our factory that deploys a MarketContractOraclize and then adds it to
 * the MarketContractRegistry.
 * @param {Provider} provider                     Web3 provider instance.
 * @param {string} marketContractFactoryAddress
 * @param {string} contractName
 * @param {string} collateralTokenAddress
 * @param {BigNumber[]} contractSpecs
 * @param {string} oracleDataSource
 * @param {string} oracleQuery
 * @param {ITxParams} txParams
 * @returns {Promise<string | BigNumber>}         deployed address of the new Market Contract.
 */
export async function deployMarketContractOraclize(
  provider: Provider,
  marketContractFactoryAddress: string,
  contractName: string,
  collateralTokenAddress: string,
  contractSpecs: BigNumber[], // not sure why this is a big number from the typedefs?
  oracleDataSource: string,
  oracleQuery: string,
  txParams: ITxParams = {}
): Promise<string | BigNumber> {
  const web3: Web3 = new Web3();
  web3.setProvider(provider);

  const marketContractFactory: MarketContractFactoryOraclize = new MarketContractFactoryOraclize(
    web3,
    marketContractFactoryAddress
  );

  await marketContractFactory
    .deployMarketContractOraclizeTx(
      contractName,
      collateralTokenAddress,
      contractSpecs,
      oracleDataSource,
      oracleQuery
    )
    .send(txParams);

  // next release of market-solidity will have indexed creator arg for MarketContractCreatedEvent
  const eventLog = await marketContractFactory
    .MarketContractCreatedEvent({ creator: txParams.from })
    .watchFirst({});

  return eventLog.args.contractAddress;
}
