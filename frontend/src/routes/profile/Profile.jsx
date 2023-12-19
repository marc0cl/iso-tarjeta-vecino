import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import jwtDecode from 'jwt-decode';
import { getUserByEmail } from '../../services/user.service';
import "../../styles/Profile.css"
import UpdateProfileForm from "../../components/UpdateProfileForm.jsx";

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const [editing, setEditing] = useState(false); // Nuevo estado para manejar si se está editando

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

    const handleEditClick = () => {
        setEditing(true); // Cambia a la vista de edición
    };

    const handleCancelEdit = () => {
        setEditing(false); // Vuelve a la vista del perfil
    };

    if (editing) {
        // Si se está editando, muestra el formulario
        return <UpdateProfileForm user={user} onCancel={handleCancelEdit} />;
    }

    const getApplicationStatusClassName = (status) => {
        switch (status) {
            case 'Aprobado':
                return 'status-aprobado';
            case 'Rechazado':
                return 'status-rechazado';
            default:
                return 'status-otro';
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
            <button onClick={handleEditClick} className="edit-button">
                Actualizar Campos
            </button>
            <div className="profile-content">
                <div className="info-section">
                    <h2>Información Pública</h2>
                    <p><strong>Nombre Completo:</strong> {fullName}</p>
                    <p><strong>Género:</strong> {user.gender}</p>
                    <p className={`info-section ${getApplicationStatusClassName(user.applicationStatus)}`}>
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
