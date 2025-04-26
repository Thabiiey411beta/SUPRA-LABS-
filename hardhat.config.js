require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    supraTestnet: {
      url: "https://rpc-testnet.supra.com",
      accounts: [process.env.PRIVATE_KEY.replace(/\s/g, "")],
      chainId: 128,
    },
  },
};
