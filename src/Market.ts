import Web3 from 'web3';

import { Provider } from '@0xproject/types';

export class Market {
  private _web3: Web3;

  /**
   * Instantiates a new Market instance that provides the public interface to the Market library.
   * @param   provider    The Provider instance you would like the Market library to use
   *                      for interacting with the Ethereum network.
   * @return  An instance of the Market class.
   */
  constructor(provider: Provider) {
    this._web3 = new Web3();
    this._web3.setProvider(provider);
  }
}
