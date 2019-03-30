const path = require("path");
var HDWalletProvider = require("truffle-hdwallet-provider");

let myUrl = "https://rinkeby.infura.io/v3/959da529e18f4d269aed4c9846f584eb";
let mnemo = "link sound coconut general pioneer intact path gloom solar broccoli lock very";

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*", // match any network
      websockets: true
    },
    ganabarna: {
      host: "192.168.43.149", // Random IP for example purposes (do not use)
      port: 7545,
      network_id: 5777,        // Ethereum public network
      // optional config values:
      // gas
      // gasPrice
      // from - default address to use for any transaction Truffle makes during migrations
      // provider - web3 provider instance Truffle should use to talk to the Ethereum network.
      //          - function that returns a web3 provider instance (see below.)
      //          - if specified, host and port are ignored.
      // skipDryRun: - true if you don't want to test run the migration locally before the actual migration (default is false)
      // timeoutBlocks: - if a transaction is not mined, keep waiting for this number of blocks (default is 50)
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(mnemo,myUrl);
      },
      network_id: 4,
      gas: 3000000,
      gasPrice: 15000000000
    }
  }
};
