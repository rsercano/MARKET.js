import {
  depositCollateralAsync,
  getUserAccountBalanceAsync,
  settleAndCloseAsync,
  withdrawCollateralAsync
} from '../src/lib/Collateral';

import {
  ERC20,
  MarketCollateralPool,
  MarketContract,
  MarketContractRegistry
} from '@marketprotocol/types';

import { getCollateralPoolContractAddressAsync } from '../src/lib/Contract';

import { getContractAddress } from './utils';
import { BigNumber } from 'bignumber.js';
/**
 * Collateral
 */
describe('Collateral', () => {
  const TRUFFLE_NETWORK_ID = `4447`;
  const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:9545'));
  let maker: string;
  let marketContractRegistryAddress: string;
  let marketContractRegistry: MarketContractRegistry;
  let contractAddresses: string[];
  let marketContractAddress: string;
  let deployedMarketContract: MarketContract;
  let collateralPoolAddress: string;
  let collateralTokenAddress: string;
  let collateralToken: ERC20;

  beforeAll(async () => {
    maker = web3.eth.accounts[0];
    marketContractRegistryAddress = getContractAddress(
      'MarketContractRegistry',
      TRUFFLE_NETWORK_ID
    );
    marketContractRegistry = await MarketContractRegistry.createAndValidate(
      web3,
      marketContractRegistryAddress
    );
    contractAddresses = await marketContractRegistry.getAddressWhiteList;
    marketContractAddress = contractAddresses[0];
    deployedMarketContract = await MarketContract.createAndValidate(web3, marketContractAddress);
    collateralPoolAddress = await deployedMarketContract.MARKET_COLLATERAL_POOL_ADDRESS;
    collateralTokenAddress = await deployedMarketContract.COLLATERAL_TOKEN_ADDRESS;
    collateralToken = await ERC20.createAndValidate(web3, collateralTokenAddress);
    const tokenBalance: BigNumber = await collateralToken.balanceOf(maker);
    await collateralToken.approveTx(collateralPoolAddress, tokenBalance).send({ from: maker });
  });

  it('Balance after depositCollateralAsync call is correct', async () => {
    const depositAmount: BigNumber = new BigNumber(10);
    const oldBalance: BigNumber = await collateralToken.balanceOf(collateralPoolAddress);
    await depositCollateralAsync(web3.currentProvider, collateralPoolAddress, depositAmount, {
      from: maker
    });
    const newBalance: BigNumber = await collateralToken.balanceOf(collateralPoolAddress);
    expect(newBalance.sub(oldBalance)).toEqual(depositAmount);
  });

  it('getUserAccountBalanceAsync returns correct user balance', async () => {
    const oldUserBalance: BigNumber = await getUserAccountBalanceAsync(
      web3.currentProvider,
      collateralPoolAddress,
      maker
    );

    const depositAmount: BigNumber = new BigNumber(100);
    await depositCollateralAsync(web3.currentProvider, collateralPoolAddress, depositAmount, {
      from: maker
    });
    const newUserBalance: BigNumber = await getUserAccountBalanceAsync(
      web3.currentProvider,
      collateralPoolAddress,
      maker
    );
    expect(newUserBalance.sub(oldUserBalance)).toEqual(depositAmount);
  });

  it('withdrawCollateralAsync should withdraw correct amount', async () => {
    const withdrawAmount: BigNumber = new BigNumber(10);
    const depositAmount: BigNumber = new BigNumber(100);
    await depositCollateralAsync(web3.currentProvider, collateralPoolAddress, depositAmount, {
      from: maker
    });
    const oldBalance: BigNumber = await collateralToken.balanceOf(maker);
    await withdrawCollateralAsync(web3.currentProvider, collateralPoolAddress, withdrawAmount, {
      from: maker
    });
    const newBalance: BigNumber = await collateralToken.balanceOf(maker);
    expect(oldBalance.add(withdrawAmount)).toEqual(newBalance);
  });
  it('Settle and Close should fail', async () => {
    try {
      await settleAndCloseAsync(web3.currentProvider, collateralPoolAddress, { from: maker });
    } catch (e) {
      expect(e.toString()).toMatch('revert');
    }
  });
});
