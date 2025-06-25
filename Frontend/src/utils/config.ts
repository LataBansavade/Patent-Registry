// Frontend/src/utils/config.ts
interface Config {
    VITE_PINATA_JWT: string;
    VITE_PINATA_API_KEY: string;
    VITE_PINATA_SECRET_API_KEY: string;
    SEPOLIA_RPC_URL: string;
  }
  
  let config: Config | null = null;
  
  export const getConfig = async (): Promise<Config> => {
    if (config) return config;
    
    const response = await fetch('/config.json');
    config = await response.json();
    return config!;
  };