import { ethers } from "hardhat";

async function main() {
  const PatentRegistry = await ethers.getContractFactory("PatentRegistry");
  const patent = await PatentRegistry.deploy()
  await patent.waitForDeployment();

  console.log(`PatentRegistry deployed to: ${patent.target}`); 

  // PatentRegistry deployed to: 0xE610d1bd643cd32600BF4402CC9E00f4887682Ed
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});



// SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/0396cb651a6841589f2f1e0b44f014a6
// PRIVATE_KEY=a867ba282b6f2f1464da2db2df6804f813962811d3f5151445953938fc5d0695
// ETHERSCAN_API_KEY=WD4HEIPWMDUH9NJGX8RYWN1196TYRE9RI9
// VITE_APP_APKIT_PROJECT_ID=9ae66a3a5795776468024f08e1ba4ace
