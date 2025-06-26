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

