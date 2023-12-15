import { useEffect, useState } from "react";
import { getBenefits } from "../../services/benefit.service";
import { Button, Card, CardContent, Divider, Grid, Icon, IconButton, Link, List, ListItem } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';

const Beneficios = () => {

    const [benefits, setBenefits] = useState([]);

    useEffect(() => {
        getBenefits().then((response) => {
            setBenefits(response);
        });
    }, []);

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
                                <IconButton color='error' aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
                </>

    )
}

export default Beneficios;