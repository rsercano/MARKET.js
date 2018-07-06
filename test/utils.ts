import { join } from 'path';
import { readFileSync } from 'fs';

/**
 * Pulls a contract address fom a truffle artifact .json file.  Assumes these files
 * are located in MARKET.js/build/contracts.  Currently no error handling is present.
 * @param {string} contractName full class name of contract i.e MarketContractOraclize
 * @param {string | number} networkID Network id for desired address ('4447' for Truffle)
 * @returns {string} contract address hex
 */
export function getContractAddress(contractName: string, networkID: string | number): string {
  const filePath = join(__dirname, '../build/contracts/' + contractName + '.json');
  const abi = JSON.parse(readFileSync(filePath, `utf-8`));
  return abi.networks[networkID].address;
}

/**
 * Checks if the given string is a url.
 * https://stackoverflow.com/questions/8667070/javascript-regular-expression-to-validate-url
 * 
 * @param {String} url  The given URL address.
 * @returns {Boolean}
 */
export function isUrl(url: string): boolean {
  return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(url);
};