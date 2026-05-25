import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const ProtectedRoute = ({ children, role }) => {
  const auth = useAuth();

  if (auth.loading) {
    return <div className="grid min-h-screen place-items-center text-slate-300">Loading secure session...</div>;
  }

  if (!auth.user) {
    return <Navigate to="/login" replace />;
  }

  if (role && auth.user.role !== role) {
    return <Navigate to={auth.user.role === 'admin' ? '/admin' : '/dashboard'} replace />;
  }

  return children;
};

export default ProtectedRoute;