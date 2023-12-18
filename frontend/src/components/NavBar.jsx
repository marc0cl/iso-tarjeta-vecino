import React from "react";
import { AppBar, Avatar, Box, Button, Container, Divider, Grid, IconButton, ListItemIcon, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { Link, useNavigate } from "react-router-dom";
import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { logout } from "../services/auth.service";
import { useAuth } from "../context/AuthContext";

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard'];

const Navbar = () => {

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
  
    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/auth');
    };

    const { user } = useAuth();

    const isAdmin = () => {
        if (user.roles[0].name === 'admin') {
            return true;
        }
    }

    console.log(user);

    return (
        <>
        <AppBar position="static" sx={{backgroundColor: 'red'}}>
        <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <h3 style={{margin: '5px'}}>TARJETA VECINO</h3>
        </Grid>
        <Container maxWidth="xl">
            <Toolbar disableGutters>
            <AccountBalanceIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.2rem',
                color: 'inherit',
                textDecoration: 'none',
                }}
            >
                MUNICIPALIDAD
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                >
                <MenuIcon />
                </IconButton>
                <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                    display: { xs: 'block', md: 'none' },
                }}
                >
                
                <MenuItem onClick={handleCloseNavMenu}>
                    <Link to="/">
                        <Button onClick={handleCloseNavMenu} sx={{ padding: '0px 20px', color: 'black', textTransform: 'none' }}>Inicio</Button>
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                    <Link to="/Beneficios">
                        <Button onClick={handleCloseNavMenu} sx={{ padding: '0px 20px', color: 'black', textTransform: 'none' }}>Beneficios</Button>
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                    <Link to="/Novedades">
                        <Button onClick={handleCloseNavMenu} sx={{ padding: '0px 20px', color: 'black', textTransform: 'none' }}>Novedades</Button>
                    </Link>
                </MenuItem>
                </Menu>
            </Box>
                <AccountBalanceIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                    mr: 2,
                    display: { xs: 'flex', md: 'none' },
                    flexGrow: 1,
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.2rem',
                    color: 'inherit',
                    textDecoration: 'none',
                    }}
                >
                    MUNICIPALIDAD
                </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, paddingLeft: '50px' }}>
                    <Link to="/">
                        <Button onClick={handleCloseNavMenu} sx={{ padding: '0px 20px', color: 'white', textTransform: 'none' }}>Inicio</Button>
                    </Link>
                    <Link to="/Beneficios">
                        <Button onClick={handleCloseNavMenu} sx={{ padding: '0px 20px', color: 'white', textTransform: 'none' }}>Beneficios</Button>
                    </Link>
                    <Link to="/Novedades">
                        <Button onClick={handleCloseNavMenu} sx={{ padding: '0px 20px', color: 'white', textTransform: 'none' }}>Novedades</Button>
                    </Link>
                </Box>

                <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="Remy Sharp" />
                    </IconButton>
                    </Tooltip>
                    <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                    >
                    {isAdmin() ? (
                        <MenuItem key={"notifications"} onClick={handleCloseUserMenu}>
                            <Link to="/notificaciones">
                                <Typography>Notificaciones</Typography>
                            </Link>
                        </MenuItem>
                    ) : (
                        // Código para el caso "else"
                        <></>
                    )}
                    <MenuItem key={"logout"} onClick={handleCloseUserMenu}>
                        <Link onClick={handleLogout}>
                            <Typography>Cerrar Sesión</Typography>
                        </Link>
                    </MenuItem>
                    </Menu>
                </Box>
                </Toolbar>
            </Container>
        </AppBar>
        </>
    )
}

export default Navbar;

/*{settings.map((setting) => (
    <MenuItem key={setting} onClick={handleCloseUserMenu}>
    <Typography textAlign="center">{setting}</Typography>
    </MenuItem>
))}*/