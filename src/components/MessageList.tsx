import React from 'react';
import { MessageBubble } from './MessageBubble';
import { Message } from '../types';

interface MessageListProps {
  messages: Message[];
  currentAddress: string;
}

export const MessageList: React.FC<MessageListProps> = ({ messages, currentAddress }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          message={message}
          isOwn={message.sender === currentAddress}
        />
      ))}
    </div>
  );
};