import { Box } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import MessageBubble from './MessageBubble';

function MessageList({ messages, currentAddress }) {
  return (
    <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
      <AnimatePresence>
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <MessageBubble
              message={message}
              isOwn={message.sender === currentAddress}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </Box>
  );
}

export default MessageList;