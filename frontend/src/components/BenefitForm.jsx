import { Button, Divider, Grid, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { createBenefit } from '../services/benefit.service';
import Swal from 'sweetalert2';
import WithReactContent from 'sweetalert2-react-content';

export default function BenefitForm() {

    const { register, handleSubmit, formState: {errors}, reset } = useForm();

    const MySwal = WithReactContent(Swal);

    const onSubmit = async (data) => {
        const res = await createBenefit(data);
        console.log(res);
        if (res.state === 'Success') {
            MySwal.fire({
                title: "Beneficio creado",
                icon: "success",
            });
            reset();
        }
        else {
            MySwal.fire({
                title: "No se pudo crear el beneficio",
                icon: "error",
            });
        }

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
