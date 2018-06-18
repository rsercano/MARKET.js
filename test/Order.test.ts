import {
  createOrderHashAsync,
  isValidSignatureAsync,
  signOrderHashAsync,
  tradeOrderAsync
} from '../src/lib/Order';
import { getContractAddress } from './utils';
import Web3 from 'web3';
import { Order, SignedOrder } from '../src/types/Order';
import { MarketContractRegistry } from '@marketprotocol/types';
import { BigNumber } from 'bignumber.js';

const TRUFFLE_NETWORK_ID = `4447`;
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:9545'));

/**
 * Order
 */
describe('Order', () => {
  it('Order has create order function', () => {
    expect(typeof createOrderHashAsync).toEqual('function');
  });

  it('Order has sign order hash function', () => {
    expect(typeof signOrderHashAsync).toEqual('function');
  });

  it('Order has trade order function', () => {
    expect(typeof tradeOrderAsync).toEqual('function');
  });

  it('Signs an order', async () => {
    const marketContractRegistryAddress = getContractAddress(
      'MarketContractRegistry',
      TRUFFLE_NETWORK_ID
    );
    const orderLibAddress = getContractAddress('OrderLib', TRUFFLE_NETWORK_ID);
    const marketContractRegistry: MarketContractRegistry = await MarketContractRegistry.createAndValidate(
      web3,
      marketContractRegistryAddress
    );

    const contractAddresses: string[] = await marketContractRegistry.getAddressWhiteList;
    const marketContractAddress = contractAddresses[0];

    console.log(marketContractAddress);
    const expirationTimeStamp: BigNumber = new BigNumber(Math.floor(Date.now() / 1000) + 60 * 60);
    const makerAccount = web3.eth.accounts[1];

    const order: Order = {
      // TODO: should we create a nicer constructor for Order?
      contractAddress: marketContractAddress,
      expirationTimestamp: expirationTimeStamp, // '', makerAccount, 0, 1, 100000, 1, '', 0
      feeRecipient: '',
      maker: makerAccount,
      makerFee: new BigNumber(0),
      orderQty: 100,
      price: new BigNumber(100000),
      remainingQty: 100,
      salt: new BigNumber(0),
      taker: '',
      takerFee: new BigNumber(0)
    };

    const orderHash: string | BigNumber = await createOrderHashAsync(
      web3.currentProvider,
      orderLibAddress,
      order
    );

    const signedOrder: SignedOrder = {
      // TODO: should we create a nicer constructor for Order and a signed order form an order!
      contractAddress: marketContractAddress,
      expirationTimestamp: expirationTimeStamp, // '', makerAccount, 0, 1, 100000, 1, '', 0
      feeRecipient: '',
      maker: makerAccount,
      makerFee: new BigNumber(0),
      orderQty: 100,
      price: new BigNumber(100000),
      remainingQty: 100,
      salt: new BigNumber(0),
      taker: '',
      takerFee: new BigNumber(0),
      ecSignature: await signOrderHashAsync(web3.currentProvider, String(orderHash), makerAccount)
    };

    expect(
      await isValidSignatureAsync(
        web3.currentProvider,
        orderLibAddress,
        signedOrder,
        orderHash.toString()
      )
    ).toBe(true);
  });
});
