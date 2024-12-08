import { ethers } from 'ethers';
import { CONTRACT_ADDRESS } from './constants';
import { CHAT_CONTRACT_ABI } from '../contracts/ChatContract';

export const getProvider = () => {
  if (window.ethereum) {
    return new ethers.BrowserProvider(window.ethereum);
  }
  return null;
};

export const getContract = async (provider) => {
  try {
    const signer = await provider.getSigner();
    return new ethers.Contract(CONTRACT_ADDRESS, CHAT_CONTRACT_ABI, signer);
  } catch (error) {
    console.error('Error getting contract:', error);
    return null;
  }
};