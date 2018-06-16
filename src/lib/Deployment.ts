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

  const txHash = await marketContractFactory
    .deployMarketContractOraclizeTx(
      contractName,
      collateralTokenAddress,
      contractSpecs,
      oracleDataSource,
      oracleQuery
    )
    .send(txParams);

  const blockNumber: number = Number(web3.eth.getTransaction(txHash).blockNumber);

  return new Promise<string | BigNumber>((resolve, reject) => {
    const stopEventWatcher = marketContractFactory
      .MarketContractCreatedEvent({})
      .watch({ fromBlock: blockNumber, toBlock: blockNumber }, (err, eventLog) => {
        // Validate this tx hash matches the tx we just created above.
        if (err) {
          console.log(err);
        }

        if (eventLog.transactionHash === txHash) {
          resolve(eventLog.args.contractAddress);
          stopEventWatcher()
            .then(function() {
              return resolve(eventLog.args.contractAddress);
            })
            .catch(reject);
        }
      });
  });
}

/**
 * Calls our factory to create a new MarketCollateralPool that is then linked to the supplied
 * marketContractAddress.
 * @param {Provider} provider
 * @param {string} marketCollateralPoolAddress
 * @param {string} marketContractAddress
 * @param {ITxParams} txParams
 * @returns {Promise<string>}                   transaction has of successful deployment.
 */
export async function deployMarketCollateralPool(
  provider: Provider,
  marketCollateralPoolAddress: string,
  marketContractAddress: string,
  txParams: ITxParams = {}
): Promise<string> {
  const web3: Web3 = new Web3();
  web3.setProvider(provider);

  const marketCollateralPoolFactory: MarketCollateralPoolFactory = new MarketCollateralPoolFactory(
    web3,
    marketCollateralPoolAddress
  );

  return marketCollateralPoolFactory
    .deployMarketCollateralPoolTx(marketContractAddress)
    .send(txParams);
}
