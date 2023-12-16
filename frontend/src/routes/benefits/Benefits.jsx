import { useEffect, useState } from "react";
import { deleteBenefit, getBenefits } from "../../services/benefit.service";
import { Button, Card, CardContent, Divider, Grid, Icon, IconButton, Link, List, ListItem } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import Swal from 'sweetalert2';
import WithReactContent from 'sweetalert2-react-content';

const Beneficios = () => {

    const [benefits, setBenefits] = useState([]);

    useEffect(() => {
        getBenefits().then((response) => {
            setBenefits(response);
        });
    }, []);

    const MySwal = WithReactContent(Swal);

    function handleDeleteBenefit(id) {
        MySwal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteBenefit(id).then((response) => {
                    MySwal.fire("Deleted!", "Your file has been deleted.", "success");
                    setBenefits(benefits.filter((benefit) => benefit._id !== id));
                });
            }
        });
    }

    return (
        <>
            <Link href="/benefits/create" underline="none">
                <Button variant="contained" color="primary" style={{margin: '20px'}}>Crear beneficio</Button>
            </Link>
            <h1>Listado de beneficios</h1>
            <Grid container spacing={1} style={{padding: '20px'}}>
                {benefits?.map((benefit) => (
                    <Grid item key={benefit._id} xs={2} md={2} alignItems="center">
                        <Card>
                            <CardContent>
                                <h2 style={{margin: '0px'}}>Nombre: </h2> <p style={{margin: '0px', marginBottom: '0px'}}>{benefit.name}</p>
                                <h2 style={{margin: '0px'}}>Empresa: </h2> <p style={{margin: '0px'}}>{benefit.company}</p>
                                <Link href={`/benefits/${benefit._id}`}>
                                    <IconButton color='success' aria-label="info">
                                        <InfoIcon />
                                    </IconButton>
                                </Link>
                                <Link href={`/benefits/edit/${benefit._id}`}>
                                    <IconButton color='info' aria-label="edit">
                                        <EditIcon />
                                    </IconButton>
                                </Link>
                                <IconButton onClick={()=>{handleDeleteBenefit(benefit._id)}} color='error' aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
}

export default Beneficios;