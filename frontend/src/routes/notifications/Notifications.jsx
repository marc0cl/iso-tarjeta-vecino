import { Box, Button, Divider, Grid, List, ListItem, ListItemButton, ListItemText, TextField, Typography } from "@mui/material";
import NotificationForm from "../../components/NotificationForm";
import { getUsers } from "../../services/user.service";
import { useEffect, useState } from "react";

const Notification = () => {

    const [users, setUsers] = useState([]);
    const [selected, setSelected] = useState([]);
    const [emails, setEmails] = useState([]);
    const [buscador, setBuscador] = useState("");
    const [aux, setAux] = useState([]);

    useEffect(() => {
        getUsers().then((response) => {
            setUsers(response);
        });
    }, []);

    const select = (user) => { 
        setSelected([...selected, user]);
        setUsers(users.filter((u) => u._id !== user._id));
        setAux(aux.filter((u) => u._id !== user._id));
        setEmails([...emails, user.email]);
    }

    const quitar = (user) => {
        setUsers([user, ...users]);
        setSelected(selected.filter((u) => u._id !== user._id));
        setEmails(emails.filter((email) => email !== user.email));
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setBuscador(value);
      };

    useEffect(() => {
        if (buscador.trim() !== "") {
          let result = users.filter((item) =>
            //item.rut.toString().includes(buscador.toString().trim())
            item.rut?.startsWith(buscador)
          );
          setAux(result);
        } else {
          setAux([]);
        }

      }, [buscador]);

    return(
        <>
        <Grid container sx={{padding:'20px 80px 10px', '@media (max-width: 600px)': {padding: '20px 40px 10px'}}}>
            <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography align='center' variant="h4" color="black" gutterBottom>
                    Lista de Usuarios
                </Typography>
                <Box
                    sx={{ width: '100%', maxWidth: 540, backgroundColor: 'white'}}
                >
                    <TextField
                        margin="dense"
                        label="Buscar por RUT"
                        variant="outlined"
                        name="buscador"
                        autoComplete='off'
                        onChange={handleInputChange}
                        sx={{margin: '15px 20px 0px'}}
                    />
                </Box>
                <Box
                    sx={{ width: '100%', maxHeight: 550, maxWidth: 540, backgroundColor: 'white', overflowY: 'auto'}}
                >
                    <List sx={{padding: '10px 20px 20px'}}>
                        <ListItem disablePadding>
                            <ListItemText primary="RUT USUARIO" secondary="NOMBRE USUARIO" sx={{color: 'black', borderColor: 'black', border: '1px solid black' , padding: '5px'}}/>
                        </ListItem>
                        {aux.length > 0 ? (
                            aux.map((user) => (
                                user.firstName && user.roles[0].name === 'user' && (
                                <ListItem disablePadding key={user._id}>
                                    <ListItemText primary={user.rut} secondary={user.firstName + ' ' + user.lastName} sx={{ color: 'black', borderColor: 'black', border: '1px solid black', padding: '5px' }} />
                                    <Button
                                    variant="outlined"
                                    onClick={() => select(user)}
                                    sx={{ marginLeft: '10px' }}
                                    >
                                    Seleccionar
                                    </Button>
                                </ListItem>
                                )
                            ))
                            ) : (
                            users.map((user) => (
                                user.firstName && user.roles[0].name === 'user' && (
                                <ListItem disablePadding key={user._id}>
                                    <ListItemText primary={user.rut} secondary={user.firstName + ' ' + user.lastName} sx={{ color: 'black', borderColor: 'black', border: '1px solid black', padding: '5px' }} />
                                    <Button
                                    variant="outlined"
                                    onClick={() => select(user)}
                                    sx={{ marginLeft: '10px' }}
                                    >
                                    Seleccionar
                                    </Button>
                                </ListItem>
                                )
                            ))
                        )}
                    </List>
                </Box>
            </Grid>
            <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography align='center' variant="h4" color="black" gutterBottom>
                    Usuarios Seleccionados
                </Typography>
                <Box
                    sx={{ width: '100%', maxHeight: 550, maxWidth: 540, backgroundColor: 'white', overflowY: 'auto'}}
                >
                    <List sx={{padding: '10px 20px 20px'}}>
                        <ListItem disablePadding>
                            <ListItemText primary="RUT USUARIO" secondary="NOMBRE USUARIO" sx={{color: 'black', borderColor: 'black', border: '1px solid black' , padding: '5px'}}/>
                        </ListItem>
                        {selected.map((user) => (
                            <ListItem disablePadding key={user._id}>
                                <ListItemText primary={user.rut} secondary={user.firstName + ' ' + user.lastName} sx={{color: 'black', borderColor: 'black', border: '1px solid black', padding: '5px'}}/>
                                <Button
                                    variant="outlined"
                                    onClick={() => quitar(user)}
                                    sx={{color: 'red', borderColor: 'red', border: '1px solid red', marginLeft: '10px'}}
                                >
                                    Quitar
                                </Button>
                            </ListItem>
                        ))} 
                    </List>
                </Box>
            </Grid>              
            <Grid item xs={12} md={4}>
                <NotificationForm emails={emails}/>
            </Grid>
        </Grid>
        </>
    ) 
    
}

export default Notification;
