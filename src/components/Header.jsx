import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Logout } from '@mui/icons-material';
import { shortenAddress } from '../utils/helpers';

function Header({ address, onDisconnect }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {shortenAddress(address)}
        </Typography>
        <Button 
          color="inherit" 
          onClick={onDisconnect} 
          startIcon={<Logout />}
        >
          Disconnect
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;