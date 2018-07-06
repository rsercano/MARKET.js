import * as _ from 'lodash';
import Web3 from 'web3';

// Types
import { MarketContractOraclize } from '@marketprotocol/types';

/**
 * Wrapper for our MarketContract objects.  This wrapper exposes all needed functionality of the
 * MarketContract itself and stores the created MarketContract objects in a mapping for easy reuse.
 */
export class MarketContractOraclizeWrapper {
  // region Members
  // *****************************************************************
  // ****                     Members                             ****
  // *****************************************************************
  private readonly _marketContractOracleizeByAddress: { [address: string]: MarketContractOraclize };
  private readonly _web3: Web3;
  // endregion // members

  // region Constructors
  // *****************************************************************
  // ****                     Constructors                        ****
  // *****************************************************************
  constructor(web3: Web3) {
    this._web3 = web3;
    this._marketContractOracleizeByAddress = {};
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
  public async getOracleQuery(marketContractOraclizeAddress: string): Promise<string> {
    const marketContractOraclize: MarketContractOraclize = await this._getMarketContractOraclizeAsync(
      marketContractOraclizeAddress
    );
    return marketContractOraclize.ORACLE_QUERY;
  }
  // endregion //Public Methods

  // region Private Methods
  // *****************************************************************
  // ****                     Private Methods                     ****
  // *****************************************************************
  /**
   * Allow for retrieval or creation of a given MarketContractOraclize
   * @param {string} marketContractOraclizeAddress    Address of MarketContractOraclize
   * @returns {Promise<MarketContractOraclize>}       MarketContractOraclize object
   * @private
   */
  private async _getMarketContractOraclizeAsync(
    marketContractOraclizeAddress: string
  ): Promise<MarketContractOraclize> {
    const normalizedMarketAddress = marketContractOraclizeAddress.toLowerCase();
    let marketContractOraclize = this._marketContractOracleizeByAddress[normalizedMarketAddress];
    if (!_.isUndefined(marketContractOraclize)) {
      return marketContractOraclize;
    }
    marketContractOraclize = new MarketContractOraclize(this._web3, marketContractOraclizeAddress);
    this._marketContractOracleizeByAddress[normalizedMarketAddress] = marketContractOraclize;
    return marketContractOraclize;
  }
  // endregion //Private Methods
}
