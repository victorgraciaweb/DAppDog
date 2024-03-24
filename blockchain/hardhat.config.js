require("@nomiclabs/hardhat-waffle");

//const fs = require('fs')
//const privateKey = fs.readFileSync(".secret").toString().trim();

module.exports = {
  solidity: "0.8.19",
  paths: {
    artifacts: "./artifacts",
    sources: "./contracts",
    cache: "./cache",
    tests: "./test"
  },
  //defaultNetwork: "ganache",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545"
    },
    /*polygon: {
      url: "https://rpc-mumbai.maticvigil.com/v1/9022222eb5b9e65029359f8eff4098beed29aeb1",
      accounts: [privateKey]
    },
    hardhat: {
    },*/
  },
};