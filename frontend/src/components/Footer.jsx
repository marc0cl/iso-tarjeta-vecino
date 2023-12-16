import { Grid } from "@mui/material";

const Footer = () => {

    return (
      <>
      <Grid container sx={{ backgroundColor: 'red', position: 'fixed', bottom: 0 }}>
        <Grid item xs={6} sx={{paddingLeft: '20px'}}>
          <h4 style={{margin: '5px'}}>2023© Municipalidad </h4>
        </Grid>
        <Grid item xs={6} sx={{ alignItems: 'end', justifyContent: 'end'}}>
          <h4 style={{margin: '5px', paddingRight: '20px', textAlign: 'end'}}>Redes Sociales</h4>
        </Grid>
        </Grid>
      </>  
    )
}

export default Footer;
		
	