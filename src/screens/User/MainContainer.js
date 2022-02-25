import {useState} from 'react';
import { User, Div, Storage } from '../../components';
import Button from '@mui/material/Button';
import { logOff } from '../User/actions'
import { useDispatch, useSelector } from 'react-redux'

function MainContainer() {

    const dispatch = useDispatch()
    const [ screen, setScreen ] = useState("storage")  
    const handleLogOff = () => {
        dispatch(logOff())
    }
    const userData = useSelector( state => state.appReducer.user )
    const isAdm = userData.accessControl?.adm
    console.log("adm", userData)
    return(
<Div sx={{ backgroundColor: '#5d6870', height: '100vh' , display: 'flex', flexDirection: 'row'}}>
    <Div sx={{ display: "flex", height: '100vh' ,flexDirection: 'column', backgroundColor: '#fff', borderRadius: 1, border: 1, width: 113, pt: 1}}>
        { isAdm && <Button sx={{ width: 100, borderRadius: 1, ml: '0.2vh'}} variant={screen === 'user' ? "outlined" : "text"} onClick={() => setScreen('user') } >Usuario</Button> }        <Button sx={{ width: 100, borderRadius: 1, ml: '0.2vh' }} variant={screen === 'storage' ? "outlined" : "text"} onClick={() => setScreen('storage')} >Estoque</Button>
        <Button sx={{ width: 100, borderRadius: 1, bottom: 5 , position: 'fixed', ml: '0.19vh' }} color='error' variant= 'contained' onClick={handleLogOff} >Sair</Button>
    </Div >
    <Div sx={{ p: 0.1, borderRadius: 1, width: 1, justifyContent: 'center', display: 'flex' }}>
        { screen === 'user' ? <User/> : null }
        { screen === 'storage' ? <Storage/> : null }
    </Div>
</Div>
    );
}

export default MainContainer;