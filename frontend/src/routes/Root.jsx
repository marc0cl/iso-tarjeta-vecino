import { Link, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/auth.service';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { Button } from '@mui/material';

function Root() {
  return (
    <AuthProvider>
      <PageRoot />
    </AuthProvider>
  );
}

function PageRoot() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const { user } = useAuth();
  console.log('User:', user);

  return (
    <div>
      <div>
        <Link to="/">
          <Button variant="contained">Home</Button>
        </Link>
        <Link to="/benefits">
          <Button variant="contained">Beneficios</Button>
        </Link>
        {user && user.roles.some(role => role.name === 'admin') && (
          <Link to="/forms">
            <Button variant="contained">Formularios</Button>
          </Link>)}
        {user && user.roles.some(role => role.name === 'user') && (
          <Link to="/user-forms">
            <Button variant="contained">Formulario</Button>
          </Link>
        )}
        <Button onClick={handleLogout}>Cerrar sesion</Button>
      </div>
      <Outlet />
    </div>
  );
}

export default Root;
