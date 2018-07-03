import { BigNumber } from 'bignumber.js';
import * as _ from 'lodash';
import Web3 from 'web3';

// Types
import { ITxParams, MarketContract, Order, SignedOrder } from '@marketprotocol/types';

/**
 * Wrapper for our MarketContract objects.  This wrapper exposes all needed functionality of the
 * MarketContract itself and stores the created MarketContract objects in a mapping for easy reuse.
 */
export class MarketContractWrapper {
  // region Members
  // *****************************************************************
  // ****                     Members                             ****
  // *****************************************************************
  private readonly _marketContractsByAddress: { [address: string]: MarketContract };
  private readonly _web3: Web3;

  // endregion // members
  // region Constructors
  // *****************************************************************
  // ****                     Constructors                        ****
  // *****************************************************************

  constructor(web3: Web3) {
    this._web3 = web3;
    this._marketContractsByAddress = {};
  }
  // endregion//Constructors
  // region Properties
  // *****************************************************************
  // ****                     Properties                          ****
  // *****************************************************************
  // endregion //Properties

  // region Public Methods
  // *****************************************************************
  // ****                     Public Methods                      ****
  // *****************************************************************
  /**
   * Cancels an order in the given quantity.
   * @param   order                          The order you wish to cancel.
   * @param   cancelQty                      The amount of the order that you wish to fill.
   * @param   txParams                       Transaction params of web3.
   * @returns {Promise<BigNumber | number>}  The quantity cancelled.
   */
  public async cancelOrderAsync(
    order: Order,
    cancelQty: BigNumber,
    txParams: ITxParams = {}
  ): Promise<BigNumber | number> {
    const marketContract: MarketContract = await this._getMarketContractAsync(
      order.contractAddress
    );
    const txHash: string = await marketContract
      .cancelOrderTx(
        [order.maker, order.taker, order.feeRecipient],
        [order.makerFee, order.takerFee, order.price, order.expirationTimestamp, order.salt],
        order.orderQty,
        cancelQty
      )
      .send(txParams);

    const blockNumber: number = Number(this._web3.eth.getTransaction(txHash).blockNumber);
    return new Promise<BigNumber | number>((resolve, reject) => {
      const stopEventWatcher = marketContract
        .OrderCancelledEvent({ maker: order.maker })
        .watch({ fromBlock: blockNumber, toBlock: blockNumber }, (err, eventLog) => {
          if (err) {
            console.log(err);
          }
          if (eventLog.transactionHash === txHash) {
            stopEventWatcher()
              .then(function() {
                return resolve(eventLog.args.cancelledQty);
              })
              .catch(reject);
          }
        });
    });
  }

  /**
   * Trades an order and returns success or error.
   * @param   signedOrder                     An object that conforms to the SignedOrder interface. The
   *                                          signedOrder you wish to validate.
   * @param   fillQty                         The amount of the order that you wish to fill.
   * @param   txParams                        Transaction params of web3.
   * @returns {Promise<BigNumber | number>}   The filled quantity.
   */
  public async tradeOrderAsync(
    signedOrder: SignedOrder,
    fillQty: BigNumber,
    txParams: ITxParams = {}
  ): Promise<BigNumber | number> {
    // assert.isSchemaValid('SignedOrder', signedOrder, schemas.SignedOrderSchema);

    const marketContract: MarketContract = await this._getMarketContractAsync(
      signedOrder.contractAddress
    );
    const txHash: string = await marketContract
      .tradeOrderTx(
        // orderAddresses
        [signedOrder.maker, signedOrder.taker, signedOrder.feeRecipient],
        // unsignedOrderValues
        [
          signedOrder.makerFee,
          signedOrder.takerFee,
          signedOrder.price,
          signedOrder.expirationTimestamp,
          signedOrder.salt
        ],
        signedOrder.orderQty,
        fillQty,
        signedOrder.ecSignature.v,
        signedOrder.ecSignature.r,
        signedOrder.ecSignature.s
      )
      .send(txParams);

    const blockNumber: number = Number(this._web3.eth.getTransaction(txHash).blockNumber);

    return new Promise<BigNumber | number>((resolve, reject) => {
      const stopEventWatcher = marketContract
        .OrderFilledEvent({ maker: signedOrder.maker })
        .watch({ fromBlock: blockNumber, toBlock: blockNumber }, (err, eventLog) => {
          // Validate this tx hash matches the tx we just created above.
          if (err) {
            console.log(err);
          }

          if (eventLog.transactionHash === txHash) {
            stopEventWatcher()
              .then(function() {
                return resolve(eventLog.args.filledQty);
              })
              .catch(reject);
          }
        });
    });
    // TODO: listen for error events marketContract.ErrorEvent()
  }

  /**
   * Returns the qty that is no longer available to trade for a given order/
   * @param   marketContractAddress   The address of the Market contract.
   * @param   orderHash               Hash of order to find filled and cancelled qty.
   * @returns {Promise<BigNumber>}    A BigNumber of the filled or cancelled quantity.
   */
  public async getQtyFilledOrCancelledFromOrderAsync(
    marketContractAddress: string,
    orderHash: string
  ): Promise<BigNumber> {
    const marketContract: MarketContract = await this._getMarketContractAsync(
      marketContractAddress
    );
    return marketContract.getQtyFilledOrCancelledFromOrder(orderHash);
  }

  // endregion //Public Methods

  // region Private Methods
  // *****************************************************************
  // ****                     Private Methods                     ****
  // *****************************************************************
  /**
   * Allow for retrieval or creation of a given MarketContract
   * @param {string} marketAddress        address of MarketContract
   * @returns {Promise<MarketContract>}   MarketContract object
   * @private
   */
  private async _getMarketContractAsync(marketAddress: string): Promise<MarketContract> {
    const normalizedMarketAddress = marketAddress.toLowerCase();
    let tokenContract = this._marketContractsByAddress[normalizedMarketAddress];
    if (!_.isUndefined(tokenContract)) {
      return tokenContract;
    }
    tokenContract = new MarketContract(this._web3, marketAddress);
    this._marketContractsByAddress[normalizedMarketAddress] = tokenContract;
    return tokenContract;
  }
  // endregion //Private Methods
}
