import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuthStore from '../../../store/authStore';

export default function ProtectedRoute() {
  const token = useAuthStore((state) => state.token);
  const isInitialized = useAuthStore((state) => state.isInitialized);
  const location = useLocation();
  if (!isInitialized) return <div className="grid min-h-screen place-items-center bg-slate-50"><div className="h-9 w-9 animate-spin rounded-full border-3 border-slate-200 border-t-brand-600" aria-label="Проверяем сессию" /></div>;
  return token ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
}
