import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
import "@typechain/hardhat";
import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-chai-matchers";


dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL || "",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  },
  typechain: {
    outDir: "typechain-types",
    target: "ethers-v6"
  }
};

export default config;




// SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/0396cb651a6841589f2f1e0b44f014a6
// ETHERSCAN_API_KEY=WD4HEIPWMDUH9NJGX8RYWN1196TYRE9RI9
