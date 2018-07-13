import { Artifact } from '@marketprotocol/types';
import { constants } from './constants';
const path = require('path');

export class MARKETProtocolArtifacts {
  public orderLibArtifact: Artifact;
  public mathLibArtifact: Artifact;
  public marketTokenArtifact: Artifact;
  public marketContractRegistryArtifact: Artifact;
  public marketContractFactoryOraclizeArtifact: Artifact;
  public marketCollateralPoolFactoryArtifact: Artifact;

  private readonly _trufflePath: string = '../';
  private readonly _abisPath: string = '@marketprotocol/abis';

  constructor(networkId: number) {
    let filePath: string;
    if (networkId === constants.NETWORK_ID_TRUFFLE) {
      filePath = this._trufflePath;
    } else {
      filePath = this._abisPath;
    }
    const fullPath: string = path.join(filePath, '/build/contracts/');
    console.log('Attempting to import artifacts from ' + fullPath);

    this.orderLibArtifact = require(path.join(fullPath + 'OrderLib.json'));
    this.mathLibArtifact = require(path.join(fullPath + 'MathLib.json'));
    this.marketTokenArtifact = require(path.join(fullPath + 'MarketToken.json'));
    this.marketContractRegistryArtifact = require(path.join(
      fullPath + 'MarketContractRegistry.json'
    ));
    this.marketContractFactoryOraclizeArtifact = require(path.join(
      fullPath + 'MarketContractFactoryOraclize.json'
    ));
    this.marketCollateralPoolFactoryArtifact = require(path.join(
      fullPath + 'MarketCollateralPoolFactory.json'
    ));
  }
}
