import { Provider } from '@0xproject/types';
import Web3 from 'web3';
import { MarketContract } from '../types/MarketContract';

/**
 * Gets the collateral pool contract address
 * @param {Provider} provider               Web3 provider instance.
 * @param {string} marketContractAddress    address of the MarketCollateralPool
 * @returns {Promise<string>}               the user's currently unallocated token balance
 */
export async function getCollateralPoolContractAddressAsync(
  provider: Provider,
  marketContractAddress: string
): Promise<string> {
  const web3: Web3 = new Web3();
  web3.setProvider(provider);

  // Get the MarketContract
  const marketContract: MarketContract = new MarketContract(web3, marketContractAddress);

  try {
    // Retrieve the collateral pool contract address
    const collateralPoolContractAddress = await marketContract.MARKET_COLLATERAL_POOL_ADDRESS;
    console.log(
      `${marketContractAddress} collateral pool contract address is ${collateralPoolContractAddress}`
    );
    return collateralPoolContractAddress;
  } catch (error) {
    console.log(error);
    return ''; // TODO Need better error handling
  }
}
