import { Message } from '../types';

export const shortenAddress = (address: string): string => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const generateMockTxHash = (): string => {
  return '0x' + Array.from({ length: 64 }, () => 
    Math.floor(Math.random() * 16).toString(16)
  ).join('');
};

export const mockMessages: Message[] = [
  {
    id: '1',
    sender: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    content: 'Hello, this is my first blockchain message!',
    timestamp: Date.now() - 3600000,
    txHash: '0x1234...abcd'
  },
  {
    id: '2',
    sender: '0x123d35Cc6634C0532925a3b844Bc454e4438f123',
    content: 'Welcome to the decentralized chat!',
    timestamp: Date.now() - 1800000,
    txHash: '0x5678...efgh'
  }
];