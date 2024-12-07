import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { ethers } from 'ethers';
import { CHAT_CONTRACT_ABI } from '../contracts/ChatContract';
import toast from 'react-hot-toast';

const CONTRACT_ADDRESS = '0x123...'; // Replace with your deployed contract address
const Web3Context = createContext(null);

export function Web3Provider({ children }) {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [address, setAddress] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      setProvider(provider);
    }
  }, []);

  const connect = useCallback(async () => {
    if (!provider) {
      toast.error('Please install MetaMask!');
      return;
    }

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
      return true;
    } catch (error) {
      console.error('Error connecting wallet:', error);
      toast.error('Failed to connect wallet');
      return false;
    }
  }, [provider]);

  const disconnect = useCallback(() => {
    setSigner(null);
    setAddress('');
    setContract(null);
    setIsConnected(false);
  }, []);

  const sendMessage = useCallback(async (content) => {
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

  const getMessages = useCallback(async () => {
    if (!contract) return [];

    try {
      const messages = await contract.getMessages();
      return messages.map((msg, index) => ({
        id: index.toString(),
        sender: msg.sender,
        content: msg.content,
        timestamp: Number(msg.timestamp) * 1000,
        txHash: '',
      }));
    } catch (error) {
      console.error('Error fetching messages:', error);
      return [];
    }
  }, [contract]);

  return (
    <Web3Context.Provider
      value={{
        address,
        isConnected,
        connect,
        disconnect,
        sendMessage,
        getMessages,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
}

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};