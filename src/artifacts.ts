let OrderLibArtifact = require('../build/contracts/OrderLib.json');
let MarketTokenArtifact = require('../build/contracts/MarketToken.json');
let MarketContractRegistryArtifact = require('../build/contracts/MarketContractRegistry.json');
let MarketContractFactoryOraclize = require('../build/contracts/MarketContractFactoryOraclize.json');
let MarketCollateralPoolFactory = require('../build/contracts/MarketCollateralPoolFactory.json');

import { Artifact } from './types/Artifact';

export const artifacts = {
  OrderLibArtifact: OrderLibArtifact as Artifact,
  MarketTokenArtifact: MarketTokenArtifact as Artifact,
  MarketContractRegistryArtifact: MarketContractRegistryArtifact as Artifact,
  MarketContractFactoryOraclizeArtifact: MarketContractFactoryOraclize as Artifact,
  MarketCollateralPoolFactoryArtifact: MarketCollateralPoolFactory as Artifact
};
