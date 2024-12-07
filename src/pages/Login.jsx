import { Box, Button, Container, Typography, Paper } from '@mui/material';
import { AccountBalanceWallet } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useWeb3 } from '../context/Web3Context';

const MotionPaper = motion(Paper);

function Login() {
  const navigate = useNavigate();
  const { connect } = useWeb3();

  const handleConnect = async () => {
    const success = await connect();
    if (success) {
      navigate('/chat');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <MotionPaper
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          elevation={3}
          sx={{ p: 4, width: '100%', textAlign: 'center' }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome to Web3 Chat
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Connect your wallet to start chatting on the blockchain
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<AccountBalanceWallet />}
            onClick={handleConnect}
            sx={{ mt: 2 }}
          >
            Connect Wallet
          </Button>
        </MotionPaper>
      </Box>
    </Container>
  );
}
