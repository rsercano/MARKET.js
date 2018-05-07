<img src="https://github.com/MARKETProtocol/dApp/blob/master/src/img/MARKETProtocol-Light.png?raw=true" align="middle">

[![Build Status](https://api.travis-ci.org/MARKETProtocol/backend.svg?branch=master)](https://travis-ci.org/MARKETProtocol/backend) [![Coverage Status](https://coveralls.io/repos/github/MARKETProtocol/backend/badge.svg?branch=master)](https://coveralls.io/github/MARKETProtocol/backend?branch=master)

MARKET Protocol has been created to provide a secure, flexible, open source foundation for decentralized trading on the Ethereum blockchain. We provide the pieces necessary to create a decentralized exchange, including the requisite clearing and collateral pool infrastructure, enabling third parties to build applications for trading.

# MARKET.js

Take a look at our [docs](https://docs.marketprotocol.io) for a little more explanation.

Join our [Discord Community](https://www.marketprotocol.io/discord) to interact with members of our dev staff and other contributors.

MARKET.js is a library for interacting with MARKET Protocol Smart Contracts. 

## Functionality
- Orders 
  - generating and signing
  - filling and cancelling
  - verifying signature
  - calculating remaining Qtys
- Collateral
  - checking a users unallocated collateral balances
  - checking a users allocated collateral
  - calculation of needed collateral
  - wrapper for ERC20 token functionality.
- Positions
  - querying users open positions (qty and price)
  - PnL calculations
- Events
  - Fills
  - Collateral Deposit / Withdraw
  - Contract Settlement
  - Cancelled / Expired orders
- Contract Registry
- MKT Token Access to contracts
- more coming soon!

