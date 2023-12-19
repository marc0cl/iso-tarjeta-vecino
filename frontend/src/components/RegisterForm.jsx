import { useForm } from 'react-hook-form';
import { createUser } from '../services/user.service';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';

function RegisterForm() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        data.roles = ['user'];

        createUser(data)
            .then((response) => {
                console.log(response);
                // Verifica si la respuesta es exitosa
                if (response[0].state === 'Success') {
                    console.log("SALIO BIEEEEEEEEEEEEEEEEEN");
                    navigate('/profile');
                }
            })
            .catch(error => {
                console.error(error);
            });
    };


    return (
        <div className="register-container">
            <h2>Registrarse</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="register-form">
                <div className="input-group">
                    <label htmlFor="rut">RUT</label>
                    <input id="rut" type="text" {...register('rut', { required: 'El RUT es requerido' })} />
                    {errors.rut && <span className="error-message">{errors.rut.message}</span>}
                </div>
                <div className="input-group">
                    <label htmlFor="firstName">Nombre</label>
                    <input id="firstName" type="text" {...register('firstName', { required: 'El nombre es requerido' })} />
                    {errors.firstName && <span className="error-message">{errors.firstName.message}</span>}
                </div>
                <div className="input-group">
                    <label htmlFor="lastName">Apellido</label>
                    <input id="lastName" type="text" {...register('lastName', { required: 'El apellido es requerido' })} />
                    {errors.lastName && <span className="error-message">{errors.lastName.message}</span>}
                </div>
                <div className="input-group">
                    <label htmlFor="gender">Género</label>
                    <select id="gender" {...register('gender', { required: 'El género es requerido' })}>
                        <option value="">Seleccione...</option>
                        <option value="female">Femenino</option>
                        <option value="male">Masculino</option>
                        <option value="other">Otro</option>
                    </select>
                    {errors.gender && <span className="error-message">{errors.gender.message}</span>}
                </div>
                <div className="input-group">
                    <label htmlFor="email">Correo Electrónico</label>
                    <input id="email" type="email" {...register('email', { required: 'El correo electrónico es requerido' })} />
                    {errors.email && <span className="error-message">{errors.email.message}</span>}
                </div>
                <div className="input-group">
                    <label htmlFor="location">Ubicación</label>
                    <input id="location" type="text" {...register('location', { required: 'La ubicación es requerida' })} />
                    {errors.location && <span className="error-message">{errors.location.message}</span>}
                </div>
                <div className="input-group">
                    <label htmlFor="password">Contraseña</label>
                    <input id="password" type="password" {...register('password', { required: 'La contraseña es requerida' })} />
                    {errors.password && <span className="error-message">{errors.password.message}</span>}
                </div>
                <button type="submit" className="submit-button">Registrarse</button>
            </form>
        </div>
    );
}

export default RegisterForm;
