import { useEffect, useState } from "react";
import { getBenefits } from "../services/benefit.service";
import { Card, CardContent, Grid, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import InfoIcon from '@mui/icons-material/Info';

const BenefitPopular = () => { 

    const [benefits, setBenefits] = useState([]);
    const [popular, setPopular] = useState([]);

    useEffect(() => {
        getBenefits().then((response) => {
            setBenefits(response);
            const lastFourBenefits = response.slice(Math.max(response.length - 4, 0));
            setPopular(lastFourBenefits);
        });
        //setRechazados([item, ...rechazados]);
    }, []);

    return (
        <>
            <Grid container spacing={1}>
                {popular.map((benefit) => (
                    <Grid item key={benefit._id} xs={12} md={3} alignItems="center">
                        <Card>
                        <CardContent>
                            <h2 style={{ margin: '0px' }}>Nombre: </h2>
                            <p style={{ margin: '0px', marginBottom: '0px' }}>{benefit.name}</p>
                            <h2 style={{ margin: '0px' }}>Empresa: </h2>
                            <p style={{ margin: '0px' }}>{benefit.company}</p> 
                            <h2 style={{ margin: '0px' }}>Descuento: </h2>
                            <p style={{ margin: '0px' }}>{benefit.discount}</p>
                            <Link to={`/beneficios/${benefit._id}`}>
                                <IconButton color="success" aria-label="info">
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

}

export default BenefitPopular;