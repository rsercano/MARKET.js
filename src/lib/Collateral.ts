import { BigNumber } from 'bignumber.js';
import Web3 from 'web3';

// Types
import { Provider } from '@0xproject/types';
import {
  CollateralToken,
  ITxParams,
  MarketCollateralPool,
  MarketToken
} from '@marketprotocol/types';
import { MarketError } from '../types';
import { ERC20TokenContractWrapper } from '../contract_wrappers/ERC20TokenContractWrapper';

/**
 * deposits collateral to a traders account for a given contract address.
 * @param {Provider} provider                       Web3 provider instance.
 * @param {MarketToken} mktTokenContract            MarketToken contract
 * @param {string} collateralPoolContractAddress    address of the MarketCollateralPool
 * @param {string} collateralTokenAddress           Address of the CollateralToken
 * @param {BigNumber | number} depositAmount        amount of ERC20 collateral to deposit
 * @param {ITxParams} txParams                      transaction parameters
 * @returns {Promise<boolean>} true if successful
 */
export async function depositCollateralAsync(
  provider: Provider,
  mktTokenContract: MarketToken,
  collateralPoolContractAddress: string,
  collateralTokenAddress: string,
  depositAmount: BigNumber | number,
  txParams: ITxParams = {}
): Promise<boolean> {
  const web3: Web3 = new Web3();
  web3.setProvider(provider);

  const collateralPool: MarketCollateralPool = new MarketCollateralPool(
    web3,
    collateralPoolContractAddress
  );

  const collateralToken: CollateralToken = new CollateralToken(web3, collateralTokenAddress);

  // Ensure caller is enabled for contract
  const caller: string = String(txParams.from);
  const isUserEnabled = await mktTokenContract.isUserEnabledForContract(
    mktTokenContract.address,
    caller
  );
  if (!isUserEnabled) {
    return Promise.reject<boolean>(new Error(MarketError.UserNotEnabledForContract));
  }

  // Ensure caller has sufficient ERC20 token balance
  const erc20ContractWrapper: ERC20TokenContractWrapper = new ERC20TokenContractWrapper(web3);
  const callerMktBalance: BigNumber = new BigNumber(
    await erc20ContractWrapper.getBalanceAsync(collateralToken.address, caller)
  );
  if (callerMktBalance.isLessThan(depositAmount)) {
    return Promise.reject<boolean>(new Error(MarketError.InsufficientBalanceForTransfer));
  }

  // Ensure caller has approved sufficient amount
  const userAllowance: BigNumber = new BigNumber(
    await erc20ContractWrapper.getAllowanceAsync(
      collateralToken.address,
      caller,
      collateralPool.address
    )
  );
  if (userAllowance.isLessThan(depositAmount)) {
    return Promise.reject<boolean>(new Error(MarketError.InsufficientAllowanceForTransfer));
  }

  await collateralPool.depositTokensForTradingTx(depositAmount).send(txParams);
  return true;
}

/**
 * Gets the user's currently unallocated token balance
 * @param {Provider} provider                       Web3 provider instance.
 * @param {string} collateralPoolContractAddress    address of the MarketCollateralPool
 * @param {BigNumber | string} userAddress          address of user
 * @returns {Promise<BigNumber>}               the user's currently unallocated token balance
 */
export async function getUserAccountBalanceAsync(
  provider: Provider,
  collateralPoolContractAddress: string,
  userAddress: string
): Promise<BigNumber> {
  const web3: Web3 = new Web3();
  web3.setProvider(provider);

  // Get the MarketCollateralPool contract
  const collateralPool: MarketCollateralPool = new MarketCollateralPool(
    web3,
    collateralPoolContractAddress
  );

  try {
    // Retrieve the user's unallocated token balance
    const userUnallocatedTokenBalance = await collateralPool.getUserAccountBalance(userAddress);
    console.log(`${userAddress} unallocated token balance is ${userUnallocatedTokenBalance}`);
    return userUnallocatedTokenBalance;
  } catch (error) {
    console.log(error);
    return new BigNumber(NaN);
  }
}

/**
 * close all open positions post settlement and withdraws all collateral from a expired contract
 * @param {Provider} provider                       Web3 provider instance.
 * @param {string} collateralPoolContractAddress    address of the MarketCollateralPool
 * @param {ITxParams} txParams                      transaction parameters
 * @returns {Promise<boolean>} true if successful
 */
export async function settleAndCloseAsync(
  provider: Provider,
  collateralPoolContractAddress: string,
  txParams: ITxParams = {}
): Promise<boolean> {
  const web3: Web3 = new Web3();
  web3.setProvider(provider);

  const collateralPool: MarketCollateralPool = new MarketCollateralPool(
    web3,
    collateralPoolContractAddress
  );
  await collateralPool.settleAndCloseTx().send(txParams);
  return true;
}

/**
 * withdraws collateral from a traders account back to their own address.
 * @param {Provider} provider                       Web3 provider instance.
 * @param {string} collateralPoolContractAddress    address of the MarketCollateralPool
 * @param {BigNumber | number} withdrawAmount        amount of ERC20 collateral to withdraw
 * @param {ITxParams} txParams                      transaction parameters
 * @returns {Promise<boolean>} true if successful
 */
export async function withdrawCollateralAsync(
  provider: Provider,
  collateralPoolContractAddress: string,
  withdrawAmount: BigNumber | number,
  txParams: ITxParams = {}
): Promise<boolean> {
  const web3: Web3 = new Web3();
  web3.setProvider(provider);

  const collateralPool: MarketCollateralPool = new MarketCollateralPool(
    web3,
    collateralPoolContractAddress
  );

  // Ensure caller has sufficient collateral pool balance
  const caller: string = String(txParams.from);
  const balance = new BigNumber(await collateralPool.getUserAccountBalance(caller));
  if (balance.isLessThan(withdrawAmount)) {
    return Promise.reject<boolean>(new Error(MarketError.InsufficientBalanceForTransfer));
  }

  await collateralPool.withdrawTokensTx(withdrawAmount).send(txParams);
  return true;
}
