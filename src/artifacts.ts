import * as OrderLibArtifact from '../build/contracts/OrderLib.json';
import * as MarketTokenArtifact from '../build/contracts/MarketToken.json';
import * as MarketContractRegistryArtifact from '../build/contracts/MarketContractRegistry.json';
import * as MarketContractFactoryOraclize from '../build/contracts/MarketContractFactoryOraclize.json';
import * as MarketCollateralPoolFactory from '../build/contracts/MarketCollateralPoolFactory.json';
import { Artifact } from './types/Artifact';

export const artifacts = {
  OrderLibArtifact: OrderLibArtifact as Artifact,
  MarketTokenArtifact: MarketTokenArtifact as Artifact,
  MarketContractRegistryArtifact: MarketContractRegistryArtifact as Artifact,
  MarketContractFactoryOraclize: MarketContractFactoryOraclize as Artifact,
  MarketCollateralPoolFactory: MarketCollateralPoolFactory as Artifact
};
