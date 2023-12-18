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
        <Typography align='center' variant="h4" color="black" gutterBottom sx={{'@media (max-width: 600px)': {paddingTop: '20px'}}}>
            Mensaje a enviar
        </Typography>
        <form 
            id="caja" 
            onSubmit={handleSubmit(onSubmit)} 
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}
        >
                <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{display: 'block', width: '100%', maxHeight: 600, backgroundColor: 'white', maxWidth: 540, padding:'20px' }}
                >
                    <Grid item>
                        <TextField
                            margin="dense"
                            label="Asunto"
                            variant="outlined"
                            fullWidth
                            name="asunto"
                            autoComplete='off'
                            {...register("asunto", {required: true})}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            margin="dense"
                            label="Mensaje"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={8}
                            name="mensaje"
                            autoComplete='off'
                            {...register("mensaje", {required: true})}
                        />
                    </Grid>
                    <Button
                        id="terminar_registro"
                        color="success"
                        size="large"
                        variant="contained"
                        margin="dense"
                        type="submit"
                        sx={{marginTop: '10px'}}
                    >
                        Enviar
                    </Button>
                </Grid>
            </form>
            </>
    );
}
