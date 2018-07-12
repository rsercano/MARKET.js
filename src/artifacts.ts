import { Artifact } from '@marketprotocol/types';

let OrderLibArtifact;
let MathLibArtifact;
let MarketTokenArtifact;
let MarketContractRegistryArtifact;
let MarketContractFactoryOraclize;
let MarketCollateralPoolFactory;

// TODO: this is pretty hacky, but does work.  Need a more elegant solution

try {
  // attempt to import from local build
  OrderLibArtifact = require('../build/contracts/OrderLib.json');
  MathLibArtifact = require('../build/contracts/MathLib.json');
  MarketTokenArtifact = require('../build/contracts/MarketToken.json');
  MarketContractRegistryArtifact = require('../build/contracts/MarketContractRegistry.json');
  MarketContractFactoryOraclize = require('../build/contracts/MarketContractFactoryOraclize.json');
  MarketCollateralPoolFactory = require('../build/contracts/MarketCollateralPoolFactory.json');
} catch (e) {
  // if not found, use artifacts from abis repo
  OrderLibArtifact = require('@marketprotocol/abis/build/contracts/OrderLib.json');
  MathLibArtifact = require('@marketprotocol/abis/build/contracts/MathLib.json');
  MarketTokenArtifact = require('@marketprotocol/abis/build/contracts/MarketToken.json');
  MarketContractRegistryArtifact = require('@marketprotocol/abis/build/contracts/MarketContractRegistry.json');
  MarketContractFactoryOraclize = require('@marketprotocol/abis/build/contracts/MarketContractFactoryOraclize.json');
  MarketCollateralPoolFactory = require('@marketprotocol/abis/build/contracts/MarketCollateralPoolFactory.json');
}

export const artifacts = {
  OrderLibArtifact: OrderLibArtifact as Artifact,
  MathLibArtifact: MathLibArtifact as Artifact,
  MarketTokenArtifact: MarketTokenArtifact as Artifact,
  MarketContractRegistryArtifact: MarketContractRegistryArtifact as Artifact,
  MarketContractFactoryOraclizeArtifact: MarketContractFactoryOraclize as Artifact,
  MarketCollateralPoolFactoryArtifact: MarketCollateralPoolFactory as Artifact
};
