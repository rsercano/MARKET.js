<img src="https://github.com/MARKETProtocol/dApp/blob/master/src/img/MARKETProtocol-Light.png?raw=true" align="middle">

MARKET Protocol has been created to provide a secure, flexible, open source foundation for decentralized trading on the Ethereum blockchain. We provide the pieces necessary to create a decentralized exchange, including the requisite clearing and collateral pool infrastructure, enabling third parties to build applications for trading.

# MARKET.js

Take a look at our [docs](https://docs.marketprotocol.io) for a little more explanation.

Join our [Discord Community](https://marketprotocol.io/discord) to interact with members of our dev staff and other contributors.

MARKET.js is a library for interacting with MARKET Protocol Smart Contracts.

# Product Documentation & Flows
In order to reduce the "tribal knowledge" commonly associated with many projects, we're providing product documentation to help you better understand how MARKET.js works and our approach to development priorities.

# Product Flows
The initial alpha release of MARKET.js should satisfy the DEX happy path and deliver a steel thread through all phases of MARKET derivative trading. This functionality includes:

1. Contract creation and deployment
2. Collateral deposits for the transaction (ETH & MKT)
3. Execution and fills for the order, Maker & Taker
4. Settlement at expiration

The supporting documents are located in this repo, [PDF Product Flows](MARKETjs-Product-Flows.pdf), and online at [Lucidchart Product Flows](https://www.lucidchart.com/documents/view/f845b57f-7079-4786-bd47-e0eac1916722). If you need access to the online version, please open an issue with the details of your request.

The UML sequence diagrams will have a different fidelity depending upon the which level you view. Please reference the `Flow Detail` legend at the top of the page.