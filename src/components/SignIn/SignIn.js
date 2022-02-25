import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { SIGN_IN_CHANGE_VALUE } from "../../constants/actionTypes";
import Button from '@mui/material/Button';
import { signIn } from './actions'
import Grid from "@mui/material/Grid";

const SignIn = () => {

    const dispatch = useDispatch()
    const { email, emailError, password, passwordError } = useSelector( state => state.signIn )

    const handleChangeValue = (value, property ) => {
        dispatch({ type: SIGN_IN_CHANGE_VALUE, property: property , payload: value })
    }

    const handleLogin = () => {
        dispatch( signIn() )
    }

    return (
        <Grid container  direction='column' rowSpacing={ 3 }>
            <Grid item  sx={{ display: "flex", justifyContent: 'space-evenly'}}>
                <TextField value={ email } label='E-mail*' fullWidth
                    onChange={ event => handleChangeValue( event.target.value, "email" ) } 
                    error={ Boolean( emailError ) } helperText={ emailError }
                />
            </Grid>
            <Grid item  sx={{ display: "flex", justifyContent: 'space-evenly'}}>
                <TextField value={ password } label='Senha*' fullWidth type= "password"
                    onChange={ event => handleChangeValue( event.target.value, "password" ) }
                    error={ Boolean( passwordError ) } helperText={ passwordError }
                />
            </Grid>

            <Grid item sx={{ display: "flex", justifyContent: 'space-evenly' }}>
                <Button variant="contained" fullWidth size='large' onClick={ handleLogin }>Fazer Login</Button>
            </Grid>

        </Grid>
    )
}

export default SignIn