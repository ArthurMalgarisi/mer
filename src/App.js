import { MainContainer, AuthContainer } from './screens'
import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { firebase } from './utils'
import { loadUserData } from './screens/User/actions'
import { Grid } from '@mui/material'
import { display } from '@mui/system'

function App() {
  const userData = useSelector(state => state.appReducer.user)
  const dispatch = useDispatch()

  useEffect(() => {
    const authListener = firebase.auth.onAuthStateChanged(user => {
    dispatch(loadUserData(user))
    })

    return() => {
      authListener()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (userData) {
    return (
      <>
        {  userData.accessControl?.situation === "Aprovado" ? <MainContainer/>:<AuthContainer/>}
      </>
    );
  }

  return <h1>Carregando...</h1>
}

export default App;
