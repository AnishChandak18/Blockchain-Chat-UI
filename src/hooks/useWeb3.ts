import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { CHAT_CONTRACT_ABI } from '../contracts/ChatContract';
import { Message } from '../types';

const CONTRACT_ADDRESS = '0x123...'; // Replace with your deployed contract address

export function useWeb3() {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [address, setAddress] = useState<string>('');
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      setProvider(provider);
    }
  }, []);

  const connect = useCallback(async () => {
    if (!provider) return;

    try {
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CHAT_CONTRACT_ABI,
        signer
      );

      setSigner(signer);
      setAddress(address);
      setContract(contract);
      setIsConnected(true);
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  }, [provider]);

  const disconnect = useCallback(() => {
    setSigner(null);
    setAddress('');
    setIsConnected(false);
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    if (!contract) return;

    try {
      const tx = await contract.sendMessage(content);
      await tx.wait();
      return tx.hash;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }, [contract]);

  const getMessages = useCallback(async (): Promise<Message[]> => {
    if (!contract) return [];

    try {
      const messages = await contract.getMessages();
      return messages.map((msg: any, index: number) => ({
        id: index.toString(),
        sender: msg.sender,
        content: msg.content,
        timestamp: Number(msg.timestamp) * 1000,
        txHash: '', // Transaction hash is not stored in the contract
      }));
    } catch (error) {
      console.error('Error fetching messages:', error);
      return [];
    }
  }, [contract]);

  return {
    address,
    isConnected,
    connect,
    disconnect,
    sendMessage,
    getMessages,
  };
}