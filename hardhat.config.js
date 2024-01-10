require("@nomiclabs/hardhat-waffle");

// Add your Hardhat network configurations
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.20",
  networks: {
    goerli: {
      url: "https://rpc.goerli.mudit.blog/",
      accounts: {
        mnemonic: "your twelve word mnemonic phrase here",
      },
    },
    localhost: {
      gas: 2000000,
    },
  },
};
