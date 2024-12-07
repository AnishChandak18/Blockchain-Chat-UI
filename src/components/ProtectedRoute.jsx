import { Navigate } from 'react-router-dom';
import { useWeb3 } from '../context/Web3Context';

function ProtectedRoute({ children }) {
  const { isConnected } = useWeb3();

  if (!isConnected) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
