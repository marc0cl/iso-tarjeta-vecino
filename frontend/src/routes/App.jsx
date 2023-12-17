import { Box, Button, Card, Grid } from "@mui/material";
import BenefitPopular from "../components/BenefitPopular";
import { Link } from "react-router-dom";

function App() {
  
  return (
    <>
      <Box sx={{padding:'20px 80px 10px'}}>
        <Grid container sx={{ backgroundColor: 'white'}}>
          <Grid item xs={12} md={6} sx={{ display: 'grid', alignItems: 'center', justifyContent: 'center'}}>
            <Grid sx={{padding: '30px 40px', maxWidth: '800px'}}>
              <img src="/public/Municipalidad.jpg" alt="logo" width="100%" />
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} sx={{ padding: '20px', alignItems: 'center', justifyContent: 'center', color: 'black'}}>
            <h1 style={{margin: '50px 10px', width: '100%'}}>TARJETA VECINO</h1>
            <p style={{margin: '50px 10px', overflowWrap: 'break-word', fontSize:'20px'}}>Bienvenido al portal tarjeta vecino de tu municipalidad, donde puedes encontrar una gran cantidad de beneficios para que puedas disfrutar<br/><br/>Crea tu cuenta y rellena tu formulario para poder obtener tu tarjeta vecino</p>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{padding:'10px 80px 20px'}}>
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

export default App;
