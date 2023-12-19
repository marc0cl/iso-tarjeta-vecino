import React, { useState } from 'react';
import "../styles/UpdateProfile.css"
import { updateUser } from '../services/user.service.js';

const UpdateProfileForm = ({ user, onCancel, onUpdate }) => {
    const [formData, setFormData] = useState({
        rut: user.rut,
        password: '',
        newPassword: '',
        firstName: user.firstName,
        lastName: user.lastName,
        gender: user.gender,
        email: user.email,
        location: user.location,
        roles: user.roles,
        applicationStatus: user.applicationStatus,
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(user);
        console.log("DATOS ", formData);
        const [data, error] = await updateUser(user._id, formData);
        if (error) {
            console.error("Error al actualizar:", error);
            // Puedes manejar los errores de manera más detallada aquí
        } else {
            onUpdate(data);
        }
    };


    return (
        <div className="update-profile-form">
            <form onSubmit={handleSubmit}>
                <input type="text" name="rut" value={formData.rut} onChange={handleInputChange} required />
                <input type="password" name="password" placeholder="Contraseña actual" onChange={handleInputChange} required />
                <input type="password" name="newPassword" placeholder="Nueva contraseña" onChange={handleInputChange} />
                <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
                <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
                <select name="gender" value={formData.gender} onChange={handleInputChange} required>
                    <option value="Hombre">Masculino</option>
                    <option value="Mujer">Femenino</option>
                    <option value="Otro">Otro</option>
                </select>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                <input type="text" name="location" value={formData.location} onChange={handleInputChange} required />
                <input type="submit" value="Actualizar perfil" />
                <button type="button" onClick={onCancel}>Cancelar</button>
            </form>
        </div>
    );
};


export default UpdateProfileForm;
