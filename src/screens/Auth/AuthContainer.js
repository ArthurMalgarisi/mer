import {useState} from 'react';
import { SignIn, SignUp, Div } from '../../components';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function AuthContainer() {
 const [ screen, setScreen ] = useState("login")  
  return (
    <Div sx={{ backgroundColor: '#5d6870', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Div sx={{ backgroundColor: '#fff',p: 2, borderRadius: 3, width: 350}}>
        <Div sx={{ mb: 2, display: 'flex', justifyContent: 'center'}}>
          <Typography fontFamily={ 'monospace' } variant= 'h4' >
            Estoque Web
          </Typography>
        </Div>
        <Div sx={{ display: "flex", justifyContent: 'space-evenly', mb: 2 }}>
          <Button sx={{ width: 130, borderRadius: 2 }} variant={screen === 'cadastro' ? "contained" : "outlined"} onClick={() => setScreen('login') } >Login</Button>
          <Button sx={{ width: 130, borderRadius: 2 }} variant={screen === 'login' ? "contained" : "outlined"} onClick={() => setScreen('cadastro')} >Cadastro</Button>
        </Div >
          { screen === 'cadastro' ? <SignUp/> : null }
          { screen === 'login' ? <SignIn/> : null }
      </Div>
    </Div>
  );
}

export default AuthContainer;
