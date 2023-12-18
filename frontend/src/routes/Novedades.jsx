import { Box, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import BenefitPopular from "../components/BenefitPopular";

const Novedades = () => {
    return (
        <>
        <Box sx={{padding:'10px 80px 20px', '@media (max-width: 600px)': {padding: '20px 40px 10px'}}}>
            <Grid container>
                <Grid item xs={6}>
                    <h1 style={{margin: '20px', color: 'black'}}>Últimos beneficios agregados</h1>
                </Grid>
                <Grid item xs={6} sx={{ display: 'flex', alignItems: 'end', justifyContent: 'end'}}>
                    <Link to="/Beneficios">
                    <Button sx={{ padding: '20px', color: 'black'}}>ver todos</Button>
                    </Link>
                </Grid>
            </Grid>
            <BenefitPopular />
        </Box>
        </>
    );
}

export default Novedades;