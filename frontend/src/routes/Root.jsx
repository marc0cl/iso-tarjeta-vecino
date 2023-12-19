import { Link, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/auth.service';
import { AuthProvider, useAuth } from '../context/AuthContext';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import Landing from '../components/LandingPage.jsx';
import '../styles/Landing.css'
import { Button } from '@mui/material';
import LoginForm from "../components/LoginForm.jsx";

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
                <>
                    <Navbar />
                    <Outlet />
                    <Footer />
                </>
            ) : (
                <Landing/>
            )}
        </>
    );
}

export default Root;
