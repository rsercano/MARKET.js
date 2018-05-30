# make targets for MARKETProtocol/MARKET.js


# prerequisites
#   mkdir $(DEV)/MARKETProtocol
#   cd $(DEV)/MARKETProtocol
#   git clone git@github.com:MARKETProtocol/MARKET.js.git
#   git clone https://github.com/MARKETProtocol/ethereum-bridge.git

# path to oraclize/ethereum-bridge
EB_PATH=../ethereum-bridge

# default target
default:
	pwd

install_truffle:
	npm i -g truffle@4.1.8

# install required dependencies
install_deps:
	npm i # for market.js
	cd $(EB_PATH) ; npm install # for ethereum-bridge

# open truffle console with a local development blockchain
start_console:
	truffle develop

# start ethereum bridge
start_bridge:
	cd $(EB_PATH) ; node bridge -H localhost:9545 -a 9 --dev


# truffle console commands
#
#   migrate

# TODO: add example project
