const MathLib = artifacts.require(
  'market-solidity/contracts/libraries/MathLib.sol'
);
const OrderLib = artifacts.require(
  'market-solidity/contracts/libraries/OrderLib.sol'
);
const CollateralToken = artifacts.require(
  'market-solidity/contracts/tokens/CollateralToken.sol'
);
const MarketContractOraclize = artifacts.require(
  'market-solidity/contracts/oraclize/MarketContractOraclize.sol'
);
const MarketContractFactory = artifacts.require(
  'market-solidity/contracts/oraclize/MarketContractFactoryOraclize.sol'
);
const MarketCollateralPool = artifacts.require(
  'market-solidity/contracts/MarketCollateralPool.sol'
);
const MarketContractRegistry = artifacts.require(
  'market-solidity/contracts/MarketContractRegistry.sol'
);
const MarketToken = artifacts.require(
  'market-solidity/contracts/tokens/MarketToken.sol'
);

module.exports = function(deployer, network) {
  if (network !== 'live') {
    deployer.deploy(MathLib);
    deployer.deploy(OrderLib);
    deployer.deploy(MarketContractRegistry).then(function() {
      deployer.link(
        MathLib,
        MarketContractOraclize,
        MarketContractFactory
      );
      deployer.link(OrderLib, MarketContractFactory, MarketContractOraclize);

      // deploy MKT token
      const marketTokenToLockForTrading = 0; // for testing purposes, require no lock
      const marketTokenAmountForContractCreation = 0; //for testing purposes require no balance
      return deployer
        .deploy(
          MarketToken,
          marketTokenToLockForTrading,
          marketTokenAmountForContractCreation
        )
        .then(function() {
          // deploy collateral token for testing, a fake USD stable coin
          deployer.deploy(CollateralToken, 'Stable USD', 'USD', 1e9, 18);


          const daysToExpiration = 28;
          const expirationDate = new Date();
          expirationDate.setDate(expirationDate.getDate() + daysToExpiration);

          // deploy and set up main factory to create MARKET Protocol smart contracts.
          return MarketContractRegistry.deployed().then(function(
            marketContractRegistry
          ) {
            return deployer
              .deploy(
                MarketContractFactory,
                marketContractRegistry.address,
                MarketToken.address,
                {
                  gas: 6500000,
                  from: web3.eth.accounts[0]
                }
              )
              .then(function(factory) {
                // white list the factory
                return marketContractRegistry
                  .addFactoryAddress(factory.address)
                  .then(function() {
                    // deploy a single contract for testing purposes.
                    const gasLimit = 4000000; // gas limit for contract deployment
                    let quickExpirationTimeStamp =
                      Math.floor(Date.now() / 1000) + 60 * 60; // expires in an hour
                    return factory
                      .deployMarketContractOraclize(
                        'ETHUSD_' + new Date().toISOString().substring(0, 10),
                        CollateralToken.address,
                        [50000, 150000, 2, 1e18, quickExpirationTimeStamp],
                        'URL',
                        'json(https://api.kraken.com/0/public/Ticker?pair=ETHUSD).result.XETHZUSD.c.0',
                        { gas: gasLimit, from: web3.eth.accounts[0] }
                      )
                      .then(function(marketContractDeployResults) {
                        const marketContractDeployedAddress =
                          marketContractDeployResults.logs[0].args
                            .contractAddress;
                        return deployer
                          .deploy(
                            MarketCollateralPool,
                            marketContractDeployedAddress,
                            { gas: 2200000 }
                          )
                          .then(function(marketCollateralPool) {
                            return MarketContractOraclize.at(
                              marketContractDeployedAddress
                            ).then(function(marketContractInstance) {
                              return marketContractInstance.setCollateralPoolContractAddress(
                                marketCollateralPool.address
                              );
                            });
                          });
                      });
                  });
              });
          });
        });
    });
  }
};
