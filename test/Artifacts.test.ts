import { artifacts } from '../src/artifacts';
import { constants } from '../src/constants';

describe('Artifacts', () => {
  it('contracts are deployed to local truffle instance', () => {
    expect(artifacts.MarketTokenArtifact.networks[constants.NETWORK_ID_TRUFFLE]).toBeDefined();
  });
});
