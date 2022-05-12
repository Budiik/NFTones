
const hre = require("hardhat");

async function main() {
  
  const NFTones = await hre.ethers.getContractFactory("NFTones");
  const nftones = await NFTones.deploy();

  await nftones.deployed();

  console.log("NFTones deployed to:", nftones.address);
  const receipt = await nftones.deployTransaction.wait();
  console.log('gasUsed: ' + receipt.gasUsed._hex);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


  // UNITS OF GAS * CURRENT GAS PRICE * CURRENT ETH PRICE = deploy price
  // npx hardhat run scripts/deployNFTones.js
