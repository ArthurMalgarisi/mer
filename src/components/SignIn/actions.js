import { SIGN_IN_CHANGE_VALUE } from "../../constants/actionTypes";
import { firebase, getReducer } from '../../utils';

export function signIn() {
    return dispatch => {
        const { email, password } = getReducer( 'signIn' )
        let isValid = true

        if (email === '') {
            isValid = false
            dispatch({ type: SIGN_IN_CHANGE_VALUE, property: 'email', payload: email, error: 'Preencha o e-mail' })
        }

        if (password === '') {
            isValid = false
            dispatch({ type: SIGN_IN_CHANGE_VALUE, property: 'password' ,payload: password, error: 'Preencha a senha' })
        }

        if (isValid) {
            dispatch({ type: SIGN_IN_CHANGE_VALUE, property: 'loading', payload: true })

            firebase.auth.signInWithEmailAndPassword( email, password)
            .catch(error => {
                dispatch({ type: SIGN_IN_CHANGE_VALUE, property: 'loading', payload: false })
                console.log("signIn" ,error)
            })
        }
    }
}