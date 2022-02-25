import { SIGN_UP_CHANGE_EMAIL, SIGN_UP_CHANGE_NAME, SIGN_UP_CHANGE_PASSWORD, SIGN_UP_CHANGE_PHONE,
         SIGN_UP_CHANGE_SHOWDIALOG } from "../../constants/actionTypes";

const INITIAL_STATE = {
    name: '',
    nameError:'',
    email: '',
    emailError: '',
    phone: '',
    phoneError:'',
    password: '',
    passwordError:'',
    showDialog:false,
}

const signUp = ( state = INITIAL_STATE, action ) => {
    switch(action.type) {
        case SIGN_UP_CHANGE_NAME:
            return {
                ...state,
                name: action.payload,
                nameError: action.error    
            }
        case SIGN_UP_CHANGE_EMAIL:
            return {
                ...state,
                email: action.payload,
                emailError: action.error
            }
        case SIGN_UP_CHANGE_PHONE:
            return {
                ...state,
                phone: action.payload,
                phoneError: action.error
            }
        case SIGN_UP_CHANGE_PASSWORD:
            return {
                ...state,
                password: action.payload,
                passwordError: action.error
            }
        case SIGN_UP_CHANGE_SHOWDIALOG:
            return {
                ...state,
                showDialog: action.payload,
            }
        default:
            return state
    }
}

export default signUp