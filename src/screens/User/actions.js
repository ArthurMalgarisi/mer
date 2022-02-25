import { APP_CHANGE_VALUE } from "../../constants/actionTypes";
import { firebase } from '../../utils'

export function loadUserData(user) {
    return dispatch => {
        if (!user) {
            dispatch({ type: APP_CHANGE_VALUE, property: 'user', payload: {} })
            return
        }
        firebase.firestore.collection('users').doc(user.uid).get()
        .then(doc => {
            const data = doc.data()
            console.log("loadUserData",data)

            if (!doc.exists) {
                console.log('Os dados da sua conta não existem')
                dispatch(logOff())
                return
            }


            if (data.accessControl.situation !== "Aprovado"){
                console.log('Sua conta ainda não foi verificada por nossa equipe ou foi desativada')
                dispatch(logOff())
                return
            }

            dispatch({ type: APP_CHANGE_VALUE, property: 'user', payload: data })

        })
        .catch(error => {
            console.log("loadUserData",error)
        })
    }
}

export function logOff() {
    return dispatch => {
        firebase.auth.signOut()
        .then(() => {
            dispatch({ type: APP_CHANGE_VALUE, property: 'user', payload: {} })
            console.log("Deslogado com sucesso.")
        })
        .catch(error => {
            console.log("ERROR AO DESLOGAR", error)
        })
    }
}