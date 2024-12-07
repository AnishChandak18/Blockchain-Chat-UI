import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Message } from '../types';
import { shortenAddress } from '../utils/mockData';

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isOwn }) => {
  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[70%] rounded-lg p-3 ${
          isOwn ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
        }`}
      >
        <div className="text-sm opacity-75 mb-1">
          {shortenAddress(message.sender)}
        </div>
        <p className="mb-2">{message.content}</p>
        <div className="flex items-center text-xs opacity-75 space-x-2">
          <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
          <a
            href={`https://etherscan.io/tx/${message.txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:opacity-100"
          >
            <ExternalLink size={12} className="ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
};