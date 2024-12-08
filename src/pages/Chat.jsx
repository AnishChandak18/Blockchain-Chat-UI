import { useState, useEffect } from 'react';
import { Box, Container, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useWeb3 } from '../context/Web3Context';
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';
import Header from '../components/Header';
import toast from 'react-hot-toast';

function Chat() {
  const [messages, setMessages] = useState([]);
  const { address, disconnect, sendMessage, getMessages } = useWeb3();
  const navigate = useNavigate();

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const fetchedMessages = await getMessages();
      setMessages(fetchedMessages);
    } catch (error) {
      toast.error('Failed to fetch messages');
    }
  };

  const handleSend = async (message) => {
    try {
      toast.loading('Sending message...');
      const txHash = await sendMessage(message);
      
      const newMessage = {
        id: Date.now().toString(),
        sender: address,
        content: message,
        timestamp: Date.now(),
        txHash: txHash || '',
      };
      
      setMessages((prev) => [...prev, newMessage]);
      toast.success('Message sent successfully!');
    } catch (error) {
      toast.error('Failed to send message');
    }
  };

  const handleDisconnect = () => {
    disconnect();
    navigate('/login');
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header address={address} onDisconnect={handleDisconnect} />
      
      <Container maxWidth="md" sx={{ flex: 1, py: 2, display: 'flex', flexDirection: 'column' }}>
        <Paper
          elevation={3}
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          <MessageList messages={messages} currentAddress={address} />
          <MessageInput onSendMessage={handleSend} isConnected={true} />
        </Paper>
      </Container>
    </Box>
  );
}

export default Chat;