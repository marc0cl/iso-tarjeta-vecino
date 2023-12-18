import React, { useState, useEffect } from 'react';
import { getUserByEmail } from '../../services/user.service.js'; // Asegúrate de que la ruta de importación sea correcta

const UserProfile = ({ userEmail }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            const [userData, userError] = await getUserByEmail(userEmail);
            if (userData) {
                setUser(userData);
            } else {
                setError(userError || 'No se pudo cargar la información del usuario.');
            }
        };

        fetchUserData();
    }, [userEmail]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!user) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <h1>Perfil del Usuario</h1>
            <p>RUT: {user.rut}</p>
            <p>Nombre: {user.firstName} {user.lastName}</p>
            <p>Género: {user.gender}</p>
            <p>Email: {user.email}</p>
            <p>Ubicación: {user.location}</p>
            {/* Renderizar más información del usuario según sea necesario */}
        </div>
    );
};

export default UserProfile;
