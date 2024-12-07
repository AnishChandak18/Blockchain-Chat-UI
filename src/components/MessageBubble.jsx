import { Paper, Typography, Link, Box } from '@mui/material';
import { Launch } from '@mui/icons-material';
import { shortenAddress } from '../utils/helpers';

function MessageBubble({ message, isOwn }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isOwn ? 'flex-end' : 'flex-start',
        mb: 2,
      }}
    >
      <Paper
        elevation={1}
        sx={{
          maxWidth: '70%',
          p: 2,
          bgcolor: isOwn ? 'primary.main' : 'grey.100',
          color: isOwn ? 'white' : 'text.primary',
        }}
      >
        <Typography variant="caption" display="block" gutterBottom>
          {shortenAddress(message.sender)}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {message.content}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="caption">
            {new Date(message.timestamp).toLocaleTimeString()}
          </Typography>
          {message.txHash && (
            <Link
              href={`https://etherscan.io/tx/${message.txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <Launch sx={{ fontSize: 12, ml: 0.5 }} />
            </Link>
          )}
        </Box>
      </Paper>
    </Box>
  );
}

export default MessageBubble;