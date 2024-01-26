import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
export default function AnonymousLayout() {
  const {currentUser}  = useAuth();
  return (
    currentUser?<Navigate to="/" replace />:<Outlet/>
  )
}
