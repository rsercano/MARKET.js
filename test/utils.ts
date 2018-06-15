import { join } from 'path';
import { readFileSync } from 'fs';
import { BigNumber } from 'bignumber.js';

/**
 * Pulls a contract address fom a truffle artifcact .json file.  Assumes these files
 * are located in MARKET.js/build/contracts.  Currently no error handling is present.
 * @param {string} contractName full class name of contract i.e MarketContractOraclize
 * @param {string} networkID Network id for desired address ('4447' for Truffle)
 * @returns {string} contract address hex
 */
export function getContractAddress(contractName: string, networkID: string): string {
  const filePath = join(__dirname, '../build/contracts/' + contractName + '.json');
  const abi = JSON.parse(readFileSync(filePath, `utf-8`));
  return abi.networks[networkID].address;
}
