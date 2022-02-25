import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { Div } from '../../components'
import DetailsDialogUser from "./Details/DetalisDialogUser";
import {USERS_CHANGE_VALUE} from '../../constants/actionTypes'
import {changeVisibleDetailsDialog, loadUsersList} from './action' 

const User = () => {

    const dispatch = useDispatch()

    const products= useSelector( state => state.users.userList)

    const [open, setOpen] = useState(false); 

    const handleOpen = (data) => {
        dispatch(changeVisibleDetailsDialog(true, data));
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if(!products){
            dispatch(loadUsersList())
        }
    }, [])

    return (

        <Div sx={{ width: '100%', display: "flex", justifyContent: 'center' }}>
        <Grid container direction='column' sx={{ width: '80%' }} >
            <Grid container item   sx={{  backgroundColor: '#fff', border: 2, borderRadius: 1, mb: 1, mt: 2}}>
                    <Grid item xs= {6} sx={{ display: "flex", alignItems: 'center', justifyContent: 'center'}} >
                        <Typography>
                           Usuários
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sx={{ display: "flex", alignItems: 'center', justifyContent: 'center'}}>
                        <Typography>
                            Situação
                        </Typography>
                    </Grid> 
                </Grid>
            <Grid container item direction='column'  sx={{  backgroundColor: '#fff', border: 2, borderRadius: 1}}>
                { products && products.map(primary => (
                <Grid container item key={primary.uid}>
                    <Grid item xs= {6} sx={{ display: "flex", alignItems: 'center', justifyContent: 'center'}} >
                        <Typography>
                            {primary.profile.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sx={{ display: "flex", alignItems: 'center', justifyContent: 'center'}} onClick={() => handleOpen(primary) }>
                        <Typography>
                            {primary.accessControl.situation}
                        </Typography>
                    </Grid>    
                </Grid> 
                ))}  
           </Grid>
        </Grid>
         <DetailsDialogUser
         open={open}
         onClose={handleClose}
        />
         </Div>
        
    )
}

export default User;