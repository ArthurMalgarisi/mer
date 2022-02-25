import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { SIGN_UP_CHANGE_EMAIL, SIGN_UP_CHANGE_NAME, SIGN_UP_CHANGE_PASSWORD, SIGN_UP_CHANGE_PHONE,
         SIGN_UP_CHANGE_SHOWDIALOG } from "../../constants/actionTypes";
import Button from '@mui/material/Button';
import { signUp } from './actions'
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React, { useState } from 'react';
import Dialog from "@mui/material/Dialog";

const SignUp = () => {

    const [open, setOpen] = useState(false); 
    
    const dispatch = useDispatch()
    const name = useSelector( state => state.signUp.name )
    const email = useSelector( state => state.signUp.email )
    const phone = useSelector( state => state.signUp.phone )
    const password = useSelector( state => state.signUp.password )
    const nameError = useSelector( state => state.signUp.nameError )
    const emailError = useSelector( state => state.signUp.emailError )
    const phoneError = useSelector( state => state.signUp.phoneError )
    const passwordError = useSelector( state => state.signUp.passwordError )
    const showDialog = useSelector( state => state.signUp.showDialog)

    const handleChangeName = (value) => {
        dispatch({ type: SIGN_UP_CHANGE_NAME, payload: value })
    }
    const handleChangeEmail = (value) => {
        dispatch({ type: SIGN_UP_CHANGE_EMAIL, payload: value })
    }
    const handleChangePhone = (value) => {
        dispatch({ type: SIGN_UP_CHANGE_PHONE, payload: value })
    }
    const handleChangePassword = (value) => {
        dispatch({ type: SIGN_UP_CHANGE_PASSWORD, payload: value })
    }

    const handleClose = () => {
        dispatch({ type: SIGN_UP_CHANGE_SHOWDIALOG, payload: false});
    };
    
    const handleRegister = () =>{
        dispatch( signUp() )

    }

    return (

        <>
        <Grid container direction='column' rowSpacing={ 3 }>
            <Grid item sx={{ display: 'flex', justifyContent: 'space-evenly'}}>
                <TextField value={ name } label='Nome*' fullWidth onChange={ event => handleChangeName( event.target.value ) } 
                    error={ Boolean( nameError ) } helperText={ nameError }
                />
            </Grid>
            <Grid item sx={{ display: 'flex', justifyContent: 'space-evenly'}}>
                <TextField value={ email } label='E-mail*' fullWidth onChange={ event => handleChangeEmail( event.target.value ) } 
                    error={ Boolean( emailError ) } helperText={ emailError }
                />
            </Grid>
            <Grid item sx={{ display: 'flex', justifyContent: 'space-evenly'}}>
                <TextField value={ phone } label='Telefone*' fullWidth onChange={ event => handleChangePhone( event.target.value ) } 
                    error={ Boolean( phoneError ) } helperText={ phoneError }
                />
            </Grid>
            <Grid item sx={{ display: 'flex', justifyContent: 'space-evenly'}}>
                <TextField value={ password } label='Senha*' type= "password" fullWidth onChange={ event => handleChangePassword( event.target.value ) } 
                    error={ Boolean( passwordError ) } helperText={ passwordError }
                />
            </Grid>

            <Grid item sx={{ display: "flex", justifyContent: 'space-evenly'}}>
                <Button variant="contained" size='large' onClick={ handleRegister }> Cadastrar </Button>  
            </Grid>
        </Grid>
        <Dialog open={ showDialog } onClose={ handleClose } maxWidth='xs' sx={{ borderRadius: 1,alignItems: 'center', display: 'flex', justifyContent: 'space-evenly'}}>
            <Typography sx={{ m: 1}}>
                Sua conta foi criada, agora basta aguardar a aprovação do cadastro por um administrador para que você possa utilizar o sistema.
            </Typography>
        </Dialog>
        </>
    )
}

export default SignUp