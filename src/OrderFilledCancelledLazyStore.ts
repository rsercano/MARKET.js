import BigNumber from 'bignumber.js';
import * as _ from 'lodash';
import { MarketContractWrapper } from './contract_wrappers/MarketContractWrapper';

interface InstanceFilledCancelledStore {
  filledOrCancelledQty: {
    [orderHash: string]: BigNumber;
  };
}

export class OrderFilledCancelledLazyStore {

  private _stores: {
    [marketContractAddress: string]: InstanceFilledCancelledStore;
  } = {};

  private _marketContractWrapper: MarketContractWrapper;

  constructor(marketContractWrapper: MarketContractWrapper) {
    this._marketContractWrapper = marketContractWrapper;
  }
  
  public async getQtyAsync(marketContractAddress: string, orderHash: string): Promise<BigNumber> {
    if (_.isUndefined(this._stores[marketContractAddress])) {
      this._stores[marketContractAddress] = {
        filledOrCancelledQty: {}
      };
    }
    if (_.isUndefined(this._stores[marketContractAddress].filledOrCancelledQty[orderHash])) {
      const qty = await this._marketContractWrapper.getQtyFilledOrCancelledFromOrderAsync(
        marketContractAddress,
        orderHash
      );
      this.setQty(marketContractAddress, orderHash, qty);
    }
    const cachedQuantity = this._stores[marketContractAddress].filledOrCancelledQty[orderHash];
    return cachedQuantity;
  }

  public setQty(marketContractAddress: string, orderHash: string, quantity: BigNumber) {
    this._stores[marketContractAddress].filledOrCancelledQty[orderHash] = quantity;
  }

  public deleteQty(marketContractAddress: string, orderHash: string) {
    delete this._stores[marketContractAddress].filledOrCancelledQty[orderHash];
  }

  public deleteAll(): void {
    this._stores = {};
  }
}

