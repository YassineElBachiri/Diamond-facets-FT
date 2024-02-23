// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.24",
// };



require('@nomiclabs/hardhat-waffle')

module.exports = {
  solidity: '0.8.20',
  settings: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
}


// require("@nomiclabs/hardhat-waffle");

// module.exports = {
//   solidity: "0.8.4",
//   networks: {
//     hardhat: hardhatConfig,
  
//   },
// };