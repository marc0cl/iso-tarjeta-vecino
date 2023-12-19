import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  if (localStorage.getItem('user')) {
    return (
      <>
        <h2>Ya estas logeado!</h2>
        <button onClick={() => navigate('/profile')}>Ir al perfil</button>
      </>
    );
  }

  return (
    <div>
      <h2></h2>
      <LoginForm />
    </div>
  );
}

export default Login;
