import { Link, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/auth.service';
import { AuthProvider, useAuth } from '../context/AuthContext';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import Landing from '../components/LandingPage.jsx';
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
    navigate('/');
  };

  const { user } = useAuth();

    return (
        <>
            {user ? (
                // Render Navbar and the rest of the page if the user is logged in
                <>
                    <Navbar />
                    <Outlet />
                    <Footer />
                </>
            ) : (
                // Render a fallback landing component if the user is not logged in
                <Landing />
            )}
        </>
    );
}

export default Root;
