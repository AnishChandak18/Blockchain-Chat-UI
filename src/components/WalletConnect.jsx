import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import { AccountBalanceWallet, Logout } from '@mui/icons-material';
import { shortenAddress } from '../utils/mockData';

export const WalletConnect = ({
  isConnected,
  address,
  onConnect,
  onDisconnect,
}) => {
  return (
    <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
      {isConnected ? (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AccountBalanceWallet color="success" />
            <Typography>{shortenAddress(address)}</Typography>
          </Box>
          <Button
            onClick={onDisconnect}
            color="error"
            startIcon={<Logout />}
            size="small"
          >
            Disconnect
          </Button>
        </Box>
      ) : (
        <Button
          onClick={onConnect}
          variant="contained"
          fullWidth
          startIcon={<AccountBalanceWallet />}
        >
          Connect Wallet
        </Button>
      )}
    </Box>
  );
}