import { Button, Divider, Grid, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { updateBenefit } from '../services/benefit.service';

export default function BenefitForm() {

    const { register, handleSubmit, formState: {errors}, reset } = useForm();

    const onSubmit = async (data) => {
        const res = await updateBenefit(data);
        console.log(res);
        reset();
    };

    return (
        <>
        <Typography align='center' variant="h4" gutterBottom>
            Crear beneficio
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
                            name="name"
                            autoComplete='off'
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
