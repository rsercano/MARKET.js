import Web3 from 'web3';

// Types
import { Provider } from '@0xproject/types';
import { MarketContract, MarketContractRegistry } from '@marketprotocol/types';

/**
 * Get all whilelisted contracts
 * @param {Provider} provider               Web3 provider instance.
 * @param {string} marketContractAddress    address of the Market contract
 * @returns {Promise<string>}               the user's currently unallocated token balance
 */
export async function getAddressWhiteListAsync(
  provider: Provider,
  marketContractAddress: string
): Promise<string[]> {
  const web3: Web3 = new Web3();
  web3.setProvider(provider);
  const marketContractRegistry: MarketContractRegistry = await MarketContractRegistry.createAndValidate(
    web3,
    marketContractAddress
  );

  try {
    const getAddressWhiteListResult = await marketContractRegistry.getAddressWhiteList;
    console.log(
      `${marketContractAddress} address has the following whitelist: ${getAddressWhiteListResult}`
    );
    return getAddressWhiteListResult;
  } catch (error) {
    console.log(error);
    return []; // TODO Need better error handling
  }
}

/**
 * Gets the collateral pool contract address
 * @param {Provider} provider               Web3 provider instance.
 * @param {string} marketContractAddress    address of the Market contract
 * @returns {Promise<string>}               the user's currently unallocated token balance
 */
export async function getCollateralPoolContractAddressAsync(
  provider: Provider,
  marketContractAddress: string
): Promise<string> {
  const web3: Web3 = new Web3();
  web3.setProvider(provider);

  // Get the MarketContract
  const marketContract: MarketContract = await MarketContract.createAndValidate(
    web3,
    marketContractAddress
  );

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
