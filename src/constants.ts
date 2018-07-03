import { MARKETProtocolConfig } from '@marketprotocol/types';

export const constants = {
  MAX_DIGITS_IN_UNSIGNED_256_INT: 78,
  NETWORK_ID_RINKEBY: 4,
  NETWORK_ID_TRUFFLE: 4447,
  PROVIDER_URL_TRUFFLE: 'http://localhost:9545',
  PROVIDER_URL_RINKEBY: 'https://rinkeby.infura.io/cbHh1p8RT4Q6E97F4gVi',
  NULL_ADDRESS: '0x0000000000000000000000000000000000000000'
};

/**
 * networkId: The id of the underlying ethereum network your provider is connected to.
 * (1-mainnet, 3-ropsten, 4-rinkeby, 42-kovan, 50-testrpc)
 * gasPrice: Gas price to use with every transaction
 * marketContractRegistryAddress: The address of the MARKET Protocol registry to use
 * marketContractFactoryAddress: The address of the MARKET Protocol factory to use
 * marketCollateralPoolFactoryAddress: The address of a
 * MARKET Protocol collateral pool factory to use.
 * mktTokenAddress: The address of the MARKET Protocol token (MKT) to use
 * orderWatcherConfig: All the configs related to the orderWatcher
 */
export const configRinkeby: MARKETProtocolConfig = {
  networkId: 4,
  marketContractRegistryAddress: '0xd265af45edb633c4cfcd2e09dc9527bd53bd5ece',
  marketContractFactoryAddress: '0xc08bb40b09619b7b547df9b6e5b8716cbc8c22ed',
  marketCollateralPoolFactoryAddress: '0xe9fd3a700ea865111ea396ec5ac0984816e86999',
  marketTokenAddress: '0xd0620d683d744d16928844d4070475aa4974eea4'
};
