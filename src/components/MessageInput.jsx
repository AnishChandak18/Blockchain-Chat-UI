import { useState } from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import { Send } from '@mui/icons-material';

function MessageInput({ onSendMessage, isConnected }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && isConnected) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={isConnected ? "Type your message..." : "Connect wallet to chat"}
          disabled={!isConnected}
          variant="outlined"
          size="small"
        />
        <IconButton type="submit" color="primary" disabled={!message.trim() || !isConnected}>
          <Send />
        </IconButton>
      </Box>
    </Box>
  );
}

export default MessageInput;