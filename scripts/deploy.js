// scripts/deploy.js
const hre = require("hardhat");

async function main() {
  // Compile the contracts
  await hre.run("compile"); 

  // Get the ContractFactory for the ERC20Package
  const ERC20Package = await hre.ethers.getContractFactory("ERC20Package");

  // Deploy the ERC20Package contract
  const erc20Package = await ERC20Package.deploy();
  await erc20Package.deployed();

  console.log("ERC20Package deployed to:", erc20Package.address);

  // Get the ContractFactory for the Diamond contract
  const Diamond = await hre.ethers.getContractFactory("Diamond");

  // Deploy the Diamond contract with the owner's address
  const diamond = await Diamond.deploy(process.env.OWNER_ADDRESS);
  await diamond.deployed();

  console.log("Diamond deployed to:", diamond.address);

  // Define the function selectors for the ERC20 functions you want to expose
  const selectors = [
    "totalSupply()",
    "balanceOf(address)",
    "transfer(address,uint256)",
    "allowance(address,address)",
    "approve(address,uint256)",
    "transferFrom(address,address,uint256)"
   ].map(hre.ethers.utils.id);

  // Define the facet cut
  const cut = {
    facetAddress: erc20Package.address,
    functionSelectors: selectors
  };

  // Add the ERC20 facet to the diamond
  await diamond.diamondCut(cut);

  console.log("ERC20 facet added to the diamond.");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

module.exports = main;