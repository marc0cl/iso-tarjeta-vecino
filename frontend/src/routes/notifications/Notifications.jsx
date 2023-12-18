import { Box, Button, Divider, Grid, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import NotificationForm from "../../components/NotificationForm";
import { getUsers } from "../../services/user.service";
import { useEffect, useState } from "react";
import { FixedSizeList } from 'react-window';

const Notification = () => {

    const [users, setUsers] = useState([]);
    const [selected, setSelected] = useState([]);
    const [emails, setEmails] = useState([]);

    useEffect(() => {
        getUsers().then((response) => {
            setUsers(response);
        });
    }, []);

    const select = (user) => { 
        setSelected([...selected, user]);
        setUsers(users.filter((u) => u._id !== user._id));
        setEmails([...emails, user.email]);
    }

    const quitar = (user) => {
        setUsers([user, ...users]);
        setSelected(selected.filter((u) => u._id !== user._id));
        setEmails(emails.filter((email) => email !== user.email));
    }

    return(
        <>
        <Grid container sx={{padding:'20px 80px 10px', '@media (max-width: 600px)': {padding: '20px 40px 10px'}}}>
            <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography align='center' variant="h4" color="black" gutterBottom>
                    Lista de Usuarios
                </Typography>
                <Box
                    sx={{ width: '100%', maxHeight: 600, maxWidth: 540, backgroundColor: 'white', overflowY: 'auto'}}
                >
                    <List sx={{padding: '20px'}}>
                        <ListItem disablePadding>
                            <ListItemText primary="RUT USUARIO" secondary="NOMBRE USUARIO" sx={{color: 'black', borderColor: 'black', border: '1px solid black' , padding: '5px'}}/>
                        </ListItem>
                        {users?.map((user) => (
                        <>
                            {user.firstName && user.roles[0].name === 'user' ? (
                            <ListItem disablePadding key={user._id}>
                                <ListItemText primary={user.rut} secondary={user.firstName + ' ' + user.lastName} sx={{color: 'black', borderColor: 'black', border: '1px solid black', padding: '5px'}}/>
                                <Button
                                    variant="outlined"
                                    onClick={() => select(user)}
                                    sx={{marginLeft: '10px'}}
                                >
                                    Selecionar
                                </Button>
                            </ListItem>
                            ) : ( <></>)}      
                        </>
                        ))}
                        <Divider />
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
            <Grid item xs={12} md={6}>
                <NotificationForm emails={emails}/>
            </Grid>
        </Grid>
        </>
    ) 
    
}

export default Notification;