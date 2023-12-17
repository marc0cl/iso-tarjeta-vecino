import { Button, Divider, Grid, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import WithReactContent from 'sweetalert2-react-content';
import { sendMail } from '../services/notification.service';

export default function NotificationForm(emails) {

    console.log(emails.emails);

    const { register, handleSubmit, formState: {errors}, reset } = useForm();

    const MySwal = WithReactContent(Swal);

    const defaultEmails = ['miguee.cass@gmail.com', 'miguel.castillo1901@alumnos.ubiobio.cl'];

    const onSubmit = async (data) => {
        data.email = emails.emails;
        const res = await sendMail(data);
        console.log(res);
        if (res.state === 'Success') {
            MySwal.fire({
                title: "Correo enviado correctamente",
                icon: "success",
            });
            reset();
        }
        else {
            MySwal.fire({
                title: "No se pudo enviar el correo",
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
                            label="nombre"
                            variant="outlined"
                            fullWidth
                            name="nombre"
                            autoComplete='off'
                            {...register("nombre", {required: true})}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            margin="dense"
                            label="beneficio"
                            variant="outlined"
                            fullWidth
                            name="beneficio"
                            autoComplete='off'
                            {...register("beneficio", {required: true})}
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
