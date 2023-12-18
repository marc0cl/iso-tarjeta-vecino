import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { login } from '../services/auth.service';
import '../styles/Login.css';

function LoginForm() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        login(data).then(() => {
            navigate('/profile');
        }).catch(error => {
            console.error(error);
        });
    };

    return (
        <div className="login-container">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="login-form">
                <div className="input-group">
                    <label htmlFor="email">Correo Electrónico</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        {...register('email', { required: 'El correo electrónico es requerido' })}
                    />
                    {errors.email && <span className="error-message">{errors.email.message}</span>}
                </div>
                <div className="input-group">
                    <label htmlFor="password">Contraseña</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        {...register('password', { required: 'La contraseña es requerida' })}
                    />
                    {errors.password && <span className="error-message">{errors.password.message}</span>}
                </div>
                <button type="submit" className="submit-button">Iniciar Sesión</button>
                <p className="forgot-password">
                    <a href="/forgot-password">¿Olvidaste tu contraseña?</a>
                </p>
            </form>
        </div>
    );
}

export default LoginForm;
