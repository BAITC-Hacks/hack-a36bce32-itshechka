import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuthStore from '../../../store/authStore';

export default function ProtectedRoute() {
  const token = useAuthStore((state) => state.token);
  const location = useLocation();
  return token ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
}
