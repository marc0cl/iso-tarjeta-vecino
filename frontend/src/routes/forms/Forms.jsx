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
          
            }
        });
    }

    

    return (
        <>
        
            <h1 style={{ color: 'black' }}>Listado de formularios</h1>
            <Grid container spacing={1} style={{ padding: '20px' }}>
                {forms?.map((form) => (
                    <Grid item key={form._id} xs={2} md={2} alignItems="center">
                        <Card>
                            <CardContent>
                                {/* Personaliza la presentación según la estructura de tu formulario */}
                                <h2 style={{ margin: '0px' }}>{form.title}</h2>
                                {/* Agrega enlace a los detalles */}
                                <Link component={RouterLink} to={`/forms/${form._id}`}>
                                    <IconButton color={form.estado === 1 ? 'success' : form.estado === 0 ? 'error' : 'warning'} aria-label="info">
                                        <InfoIcon />
                                    </IconButton>
                                </Link>
                                
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default Forms;
