import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();
        // Aquí agregarías la lógica para el inicio de sesión
    };

    const navigateToRegister = () => {
        navigate('/register'); // Suponiendo que tienes una ruta '/register' para el registro
    };

    return (
        <div className="login-page">
            <div className="welcome-section">
                <h1>WELCOME</h1>
                {/* Puedes agregar más elementos gráficos aquí */}
            </div>
            <div className="login-section">
                <h2>SIGN IN</h2>
                <form onSubmit={handleLogin}>
                    <input type="text" placeholder="Username" required />
                    <input type="password" placeholder="Password" required />
                    <button type="submit">Login</button>
                    <button type="button" onClick={navigateToRegister}>Register</button>
                    <a href="/forgot-password">Forgot password?</a>
                </form>
            </div>
        </div>
    );
}
