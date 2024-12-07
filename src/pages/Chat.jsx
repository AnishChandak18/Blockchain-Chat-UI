import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Paper,
  TextField,
  IconButton,
  Typography,
  AppBar,
  Toolbar,
  Button,
} from '@mui/material';
import { Send, Logout } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useWeb3 } from '../context/Web3Context';
import MessageList from '../components/MessageList';
import { shortenAddress } from '../utils/helpers';
import toast from 'react-hot-toast';

function Chat() {
  const [message, setMessage] = useState('');
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

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

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
      setMessage('');
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
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {shortenAddress(address)}
          </Typography>
          <Button color="inherit" onClick={handleDisconnect} startIcon={<Logout />}>
            Disconnect
          </Button>
        </Toolbar>
      </AppBar>

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
          
          <Box component="form" onSubmit={handleSend} sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                fullWidth
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                variant="outlined"
                size="small"
              />
              <IconButton type="submit" color="primary" disabled={!message.trim()}>
                <Send />
              </IconButton>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default Chat;