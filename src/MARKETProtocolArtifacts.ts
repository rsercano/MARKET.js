import { Artifact } from '@marketprotocol/types';
import { constants } from './constants';
import { join } from 'path';
import { Utils } from './lib/Utils';

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

  private readonly _trufflePath: string = './';
  private readonly _abisPath: string = 'node_modules/@marketprotocol/abis';
  // endregion // members

  // region Constructors
  // *****************************************************************
  // ****                     Constructors                        ****
  // *****************************************************************
  constructor(networkId: number) {
    let filePath: string;
    if (networkId === constants.NETWORK_ID_TRUFFLE) {
      filePath = this._trufflePath;
    } else {
      filePath = this._abisPath;
    }
    const fullPath: string = join(filePath, '/build/contracts/');
    console.log('Attempting to import artifacts from ' + fullPath);

    this.orderLibArtifact = Utils.loadArtifact(join(fullPath + 'OrderLib.json'));
    this.mathLibArtifact = Utils.loadArtifact(join(fullPath + 'MathLib.json'));
    this.marketTokenArtifact = Utils.loadArtifact(join(fullPath + 'MarketToken.json'));
    this.marketContractRegistryArtifact = Utils.loadArtifact(
      join(fullPath + 'MarketContractRegistry.json')
    );
    this.marketContractFactoryOraclizeArtifact = Utils.loadArtifact(
      join(fullPath + 'MarketContractFactoryOraclize.json')
    );
    this.marketCollateralPoolFactoryArtifact = Utils.loadArtifact(
      join(fullPath + 'MarketCollateralPoolFactory.json')
    );
  }
}
