import Web3 from 'web3';

// import { deployMarketContractOraclize } from '../src/lib/Deployment';
import { MarketContractFactoryOraclize } from '../src/types/MarketContractFactoryOraclize';
import { join } from 'path';
import { readFileSync } from 'fs';

describe('Deploy Test', () => {
  it('Deploys', async () => {
    const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:9545'));
    const filePath = join(__dirname, '../build/contracts/' + 'MarketContractFactoryOraclize.json');
    const abi = JSON.parse(readFileSync(filePath, `utf-8`));

    console.log(abi.networks['4447'].address); // for sure a better way to accomplish this.
    const marketContractFactory = await MarketContractFactoryOraclize.createAndValidate(
      web3,
      abi.networks['4447'].address
    );
  });
});
