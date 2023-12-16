import { Button, Divider, Grid, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { getBenefit, updateBenefit } from '../services/benefit.service';
import { useEffect, useState } from 'react';
import React from 'react';

export default function BenefitUpdateForm(id) {

    const [benefit, setBenefit] = useState({});

    useEffect(() => {
        console.log(id);
        getBenefit(id.id).then((response) => {
            setBenefit(response);
        });
    }, []);

    const { register, handleSubmit, formState: {errors}, reset, setValue } = useForm();




    const onSubmit = async (data) => {
        const res = await updateBenefit(benefit._id, data);
        console.log(res);
        //reset();
    };

    return (
        <>
        <Typography align='center' variant="h4" gutterBottom>
            Editar beneficio
        </Typography>
        <form id="caja" onSubmit={handleSubmit(onSubmit)}>
                <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                >
                    <Grid item>
                            <TextField
                                margin="dense"
                                label="Nombre"
                                variant="outlined"
                                fullWidth
                                autoComplete='off'
                                defaultValue={benefit.name}
                                {...register("name", {required: true})}
                            />
                    </Grid>
                    <Grid item>
                        <TextField
                            margin="dense"
                            label="Descripcion"
                            variant="outlined"
                            fullWidth
                            name="description"
                            autoComplete='off'
                            defaultValue={benefit.description}
                            {...register("description", {required: true})}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            margin="dense"
                            label="Descuento"
                            variant="outlined"
                            fullWidth
                            name="discount"
                            autoComplete='off'
                            type='number'
                            defaultValue={benefit.discount}
                            {...register("discount", {required: true, valueAsNumber: true, min: 0, max: 100})}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            margin="dense"
                            label="Empresa"
                            variant="outlined"
                            fullWidth
                            name="company"
                            autoComplete='off'
                            defaultValue={benefit.company}
                            {...register("company", {required: true})}
                        />
                    </Grid>
                    <Divider />
                    <Button
                        id="terminar_registro"
                        color="success"
                        size="large"
                        variant="contained"
                        margin="dense"
                        type="submit"
                    >
                        Terminar Registro
                    </Button>
                </Grid>
            </form>
            </>
    );
}
