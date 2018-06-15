import { join } from 'path';
import { readFileSync } from 'fs';

export function getContractAddress(contractName: string, networkID: string): string {
  const filePath = join(__dirname, '../build/contracts/' + contractName + '.json');
  const abi = JSON.parse(readFileSync(filePath, `utf-8`));
  return abi.networks[networkID].address;
}
