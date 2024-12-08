export interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: number;
  txHash: string;
}

export interface WalletState {
  address: string;
  isConnected: boolean;
}

declare global {
  interface Window {
    ethereum?: any;
  }
}