import { Box, Button, Divider, Grid, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
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
        <Grid container sx={{alignItems:'center'}}>
            <Grid item xs={12} md={6} >
                <h1>Lista de Usuarios</h1>
                <Box
                    sx={{ width: '100%', height: 400, maxWidth: 360, backgroundColor:'white' }}
                >
                    <List>
                        {users?.map((user) => (
                        <>
                            {user.firstName && user.roles[0].name === 'user' ? (
                            <ListItem disablePadding key={user._id}>
                                <ListItemText primary={user.firstName} sx={{color: 'black'}}/>
                                <Button
                                    variant="outlined"
                                    onClick={() => select(user)}
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
                                <ListItemText primary={user.firstName} sx={{color: 'black'}}/>
                                <Button
                                    variant="outlined"
                                    onClick={() => quitar(user)}
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