import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import jwtDecode from 'jwt-decode';
import { getUserByEmail } from '../../services/user.service';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            const cookies = new Cookies();
            const accessToken = cookies.get('jwt-auth');

            if (!accessToken) {
                setError('No se encontró el token de acceso.');
                return;
            }

            try {
                const decoded = jwtDecode(accessToken);
                const response = await getUserByEmail(decoded.email);

                if (response.data) {
                    setUser(response.data);  // Asumiendo que la respuesta es { data: objetoDelUsuario }
                } else {
                    setError(response.error || 'No se pudo cargar la información del usuario.');
                }
            } catch (error) {
                setError('Error al procesar los datos del usuario.');
                console.error(error);
            }
        };

        fetchUserData();
    }, []);

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
