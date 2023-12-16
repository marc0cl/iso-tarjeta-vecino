import { Box, Grid } from "@mui/material";

function App() {
  
  return (
    <>
      <Box sx={{padding:'20px 80px 10px'}}>
        <Grid container sx={{ backgroundColor: 'white'}}>
          <Grid item xs={6} sx={{ alignItems: 'center', justifyContent: 'center'}}>
            <img src="/public/Municipalidad.jpg" alt="logo" width="100%" />
          </Grid>
          <Grid item xs={6} sx={{ alignItems: 'center', justifyContent: 'center', color: 'black'}}>
            <h2 style={{margin: '5px', width: '100%'}}>TARJETA VECINO</h2>
            <p style={{margin: '5px', overflowWrap: 'break-word'}}>asdalskdjsalkjdalksjdlaksjdlaksjdlaksjdlaksjdlakdjalksdjlaskdjlakfjsldkfjsldkfjlsdkfjslkfjsldkfjlsdkfjsldkfjsldkfjslkfjlskdjflskfjlskjflskdjflskjflskjflskjslkjsldkjf</p>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{padding:'10px 80px 20px'}}>
        <Grid container sx={{ backgroundColor: 'white'}}>
          <h2 style={{margin: '5px', color: 'black', width: '100%'}}>Beneficios Destacados</h2>
          <Grid item xs={3} sx={{ alignItems: 'center', justifyContent: 'center', color: 'black'}}>
            <p>Beneficio 1</p>
          </Grid>
          <Grid item xs={3} sx={{ alignItems: 'center', justifyContent: 'center', color: 'black'}}>
            <p>Beneficio 2</p>
          </Grid>
          <Grid item xs={3} sx={{ alignItems: 'center', justifyContent: 'center', color: 'black'}}>
            <p>Beneficio 3</p>
          </Grid>
          <Grid item xs={3} sx={{ alignItems: 'center', justifyContent: 'center', color: 'black'}}>
            <p>Beneficio 4</p>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default App;
