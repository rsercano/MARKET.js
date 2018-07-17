import { Artifact } from '@marketprotocol/types';
import { constants } from './constants';
import { Utils } from './lib/Utils';

const abisPath = '@marketprotocol/abis/build/contracts';
const MarketCollateralPoolFactory = require(`${abisPath}/MarketCollateralPoolFactory.json`);
const MarketContractFactoryOraclize = require(`${abisPath}/MarketContractFactoryOraclize.json`);
const MarketContractRegistry = require(`${abisPath}/MarketContractRegistry.json`);
const MarketToken = require(`${abisPath}/MarketToken.json`);
const MathLib = require(`${abisPath}/MathLib.json`);
const OrderLib = require(`${abisPath}/OrderLib.json`);

/**
 * Contains artifacts from solidity deployments
 */
export class MARKETProtocolArtifacts {
  // region Members
  // *****************************************************************
  // ****                     Members                             ****
  // *****************************************************************
  public orderLibArtifact: Artifact;
  public mathLibArtifact: Artifact;
  public marketTokenArtifact: Artifact;
  public marketContractRegistryArtifact: Artifact;
  public marketContractFactoryOraclizeArtifact: Artifact;
  public marketCollateralPoolFactoryArtifact: Artifact;
  // endregion // members

  // region Constructors
  // *****************************************************************
  // ****                     Constructors                        ****
  // *****************************************************************
  constructor(networkId: number) {
    if (networkId === constants.NETWORK_ID_TRUFFLE) {
      this.orderLibArtifact = Utils.loadArtifact('./build/contracts/OrderLib.json');
      this.mathLibArtifact = Utils.loadArtifact('./build/contracts/MathLib.json');
      this.marketTokenArtifact = Utils.loadArtifact('./build/contracts/MarketToken.json');
      this.marketContractRegistryArtifact = Utils.loadArtifact(
        './build/contracts/MarketContractRegistry.json'
      );
      this.marketContractFactoryOraclizeArtifact = Utils.loadArtifact(
        './build/contracts/MarketContractFactoryOraclize.json'
      );
      this.marketCollateralPoolFactoryArtifact = Utils.loadArtifact(
        './build/contracts/MarketCollateralPoolFactory.json'
      );
    } else {
      this.orderLibArtifact = OrderLib;
      this.mathLibArtifact = MathLib;
      this.marketTokenArtifact = MarketToken;
      this.marketContractRegistryArtifact = MarketContractRegistry;
      this.marketContractFactoryOraclizeArtifact = MarketContractFactoryOraclize;
      this.marketCollateralPoolFactoryArtifact = MarketCollateralPoolFactory;
    }
  }
}
