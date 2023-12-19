import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import jwtDecode from 'jwt-decode';
import { getUserByEmail } from '../../services/user.service';
import "../../styles/Profile.css"

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

                if (response[0] && response[0].user) {
                    setUser(response[0].user);
                } else {
                    setError('No se pudo cargar la información del usuario.');
                }
            } catch (error) {
                setError('Error al procesar los datos del usuario.');
            }
        };

        fetchUserData();
    }, []);

    const getApplicationStatusStyle = (status) => {
        switch (status) {
            case 'aprobado':
                return { color: 'green' };
            case 'rechazado':
                return { color: 'red' };
            default:
                return { color: 'yellow' };
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!user) {
        return <div>Cargando...</div>;
    }

    const fullName = `${user.firstName} ${user.lastName}`;

    return (
        <div className="profile-container">
            <h1 className="profile-header">Perfil del Usuario</h1>
            <div className="profile-content">
                <div className="info-section">
                    <h2>Información Pública</h2>
                    <p><strong>Nombre Completo:</strong> {fullName}</p>
                    <p><strong>Género:</strong> {user.gender}</p>
                    <p className={getApplicationStatusStyle(user.applicationStatus)}>
                        <strong>Estado de Aplicación:</strong> {user.applicationStatus}
                    </p>
                </div>
                <div className="info-section">
                    <h2>Información Privada</h2>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Ubicación:</strong> {user.location}</p>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
