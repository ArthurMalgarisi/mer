import { SIGN_UP_CHANGE_EMAIL, SIGN_UP_CHANGE_NAME, SIGN_UP_CHANGE_PASSWORD, SIGN_UP_CHANGE_PHONE,
         SIGN_UP_CHANGE_SHOWDIALOG } from "../../constants/actionTypes";
import { getReducer } from '../../utils';
import { firebase } from '../../utils'
import { logOff } from "../../screens/User/actions";

export function signUp() {
    return dispatch => {
        if(validateInputs(dispatch)){
            const { name, email, phone, password } =getReducer('signUp')
            firebase.auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
              const user = userCredential.user;
              console.log("signUp" ,user) 
              const userData = {
                  accessControl: {
                      adm: false, 
                      situation: 'Pendente'
                  },
                  profile: {
                      email,
                      name,
                      phone, 
                  },
                  uid: user.uid
              }
              firebase.firestore.doc(`users/${user.uid}`).set(userData)
              .then(() => {
                dispatch({ type: SIGN_UP_CHANGE_SHOWDIALOG, payload: true}) 
                
              }) 
              .catch(error => {
                  console.log("singUp", error)
              })  
            })
            .catch(error => {
                console.log("signUp",error)
            })
        }
    }
}
function validateInputs( dispatch ) {
        const { name, email, phone, password } = getReducer( 'signUp' )
        let isValid = true

        if (name === '') {
            isValid = false
            dispatch({ type: SIGN_UP_CHANGE_NAME, payload: name, error: 'Preencha o nome' })
        }

        if (email === '') {
            isValid = false
            dispatch({ type: SIGN_UP_CHANGE_EMAIL, payload: email, error: 'Preencha o e-mail' })
        }

        if (phone === '') {
            isValid = false
            dispatch({ type: SIGN_UP_CHANGE_PHONE, payload: phone, error: 'Preencha o telefone' })
        }

        if (password === '') {
            isValid = false
            dispatch({ type: SIGN_UP_CHANGE_PASSWORD, payload: password, error: 'Preencha a senha' })
        }
        return isValid
}