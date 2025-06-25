import 'hardhat/types/config';
import 'hardhat/types/runtime';

declare module 'hardhat/types/runtime' {
  interface HardhatRuntimeEnvironment {
    ethers: {
      provider: any;
      getContractFactory: any;
      getSigners: () => Promise<any[]>;
      // Add other ethers methods you need
    };
  }
}