import { Grid } from "@mui/material";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

const Footer = () => {

    return (
      <>
      <Grid container style={{ backgroundColor: 'red', position: 'fixed', bottom: 0}}>
        <Grid item xs={6} sx={{paddingLeft: '20px'}}>
          <h4 style={{margin: '5px'}}>2023© Municipalidad </h4>
        </Grid>
        <Grid item xs={6} sx={{ alignItems: 'end', justifyContent: 'end'}}>
          <h4 style={{margin: '5px', paddingRight: '20px', textAlign: 'end'}}>
            Redes Sociales
            <InstagramIcon sx={{color: 'white', fontSize: '20px', paddingLeft: '10px'}}/>
            <FacebookIcon sx={{color: 'white', fontSize: '20px'}}/>
            <TwitterIcon sx={{color: 'white', fontSize: '20px'}}/>
          </h4>
        </Grid>
        </Grid>
      </>  
    )
}

export default Footer;
		
	