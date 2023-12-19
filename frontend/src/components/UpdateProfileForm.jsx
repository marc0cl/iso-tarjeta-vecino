import React, { useState } from 'react';
import axios from 'axios';
import "../styles/UpdateProfile.css"

const UpdateProfileForm = ({ user, onCancel, onUpdate }) => {
    const [formData, setFormData] = useState({
        // Inicializa el estado del formulario con los datos del usuario
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

    const handleSubmit = (event) => {
        event.preventDefault();
        onUpdate(formData);
    };

    return (
        <div className="update-profile-form">
            <form onSubmit={handleSubmit}>
                {/* Agrega aquí más campos si son necesarios */}
                <input type="text" name="rut" value={formData.rut} onChange={handleInputChange} required />
                <input type="password" name="password" placeholder="Contraseña actual" onChange={handleInputChange} required />
                <input type="password" name="newPassword" placeholder="Nueva contraseña" onChange={handleInputChange} />
                <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
                <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
                <select name="gender" value={formData.gender} onChange={handleInputChange} required>
                    <option value="male">Masculino</option>
                    <option value="female">Femenino</option>
                    <option value="other">Otro</option>
                </select>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                <input type="text" name="location" value={formData.location} onChange={handleInputChange} required />
                <select name="roles" value={formData.roles[0]} onChange={handleInputChange} required>
                    <option value="user">Usuario</option>
                    <option value="admin">Administrador</option>
                    {/* Añade más roles según sean necesarios */}
                </select>
                {user.roles.includes('admin') && (
                    <select name="applicationStatus" value={formData.applicationStatus} onChange={handleInputChange} required>
                        <option value="aprobado">Aprobado</option>
                        <option value="rechazado">Rechazado</option>
                        <option value="pendiente">Pendiente</option>
                        {/* Añade más estados según sean necesarios */}
                    </select>
                )}
                <input type="submit" value="Actualizar perfil" />
                <button type="button" onClick={onCancel}>Cancelar</button>
            </form>
        </div>
    );
};


export default UpdateProfileForm;
