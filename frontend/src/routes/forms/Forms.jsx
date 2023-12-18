// src/routes/forms/Forms.jsx
import React, { useEffect, useState } from 'react';
import { getForms } from '../../services/form.service';
import { Button, Card, CardContent, Grid, IconButton, Link } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import Swal from 'sweetalert2';
import WithReactContent from 'sweetalert2-react-content';
import { Link as RouterLink } from 'react-router-dom';

const Forms = () => {
    const [forms, setForms] = useState([]);

    useEffect(() => {
        getForms().then((response) => {
            setForms(response);
        });
    }, []);

    const MySwal = WithReactContent(Swal);

    function handleDeleteForm(id) {
        MySwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                // Aquí deberías implementar la lógica para eliminar el formulario
                // deleteForm(id).then((response) => {
                //     MySwal.fire('Deleted!', 'Your file has been deleted.', 'success');
                //     setForms(forms.filter((form) => form._id !== id));
                // });
            }
        });
    }

    return (
        <>
            {/* Agrega el enlace para crear un nuevo formulario */}
            <Link component={RouterLink} to="/forms/create" underline="none">
                <Button variant="contained" color="primary" style={{ margin: '20px' }}>
                    Crear formulario
                </Button>
            </Link>
            <h1>Listado de formularios</h1>
            <Grid container spacing={1} style={{ padding: '20px' }}>
                {forms?.map((form) => (
                    <Grid item key={form._id} xs={2} md={2} alignItems="center">
                        <Card>
                            <CardContent>
                                {/* Personaliza la presentación según la estructura de tu formulario */}
                                <h2 style={{ margin: '0px' }}>{form.title}</h2>
                                <p style={{ margin: '0px', marginBottom: '0px' }}>{form.title}</p>
                                {/* Agrega enlace a los detalles */}
                                <Link component={RouterLink} to={`/forms/${form._id}`}>
                                    <IconButton color="success" aria-label="info">
                                        <InfoIcon />
                                    </IconButton>
                                </Link>
                                {/* Agrega enlace a la edición */}
                                <Link component={RouterLink} to={`/forms/edit/${form._id}`}>
                                    <IconButton color="info" aria-label="edit">
                                        <EditIcon />
                                    </IconButton>
                                </Link>
                                {/* Implementa la lógica para eliminar el formulario */}
                                <IconButton onClick={() => handleDeleteForm(form._id)} color="error" aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default Forms;