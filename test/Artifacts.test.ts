import { constants } from '../src/constants';
import { MARKETProtocolArtifacts } from '../src/MARKETProtocolArtifacts';

describe('Artifacts', () => {
  it('contracts are deployed to local truffle instance', () => {
    let marketProtocolArtifacts: MARKETProtocolArtifacts = new MARKETProtocolArtifacts(
      constants.NETWORK_ID_TRUFFLE
    );
    expect(marketProtocolArtifacts.marketTokenArtifact).toBeDefined();
    if (marketProtocolArtifacts.marketTokenArtifact) {
      let networks = marketProtocolArtifacts.marketTokenArtifact.networks;
      expect(networks[constants.NETWORK_ID_TRUFFLE]).toBeDefined();
    }
  });
});
