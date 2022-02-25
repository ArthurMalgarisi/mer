import { combineReducers } from 'redux'
import signUp from '../components/SignUp/reducer'
import signIn from '../components/SignIn/reducer'
import storage from '../components/Storage/reducer'
import users from '../components/User/reducer'
import appReducer from '../screens/User/reducer'

export default combineReducers ({
    signUp,
    signIn,
    storage,
    users,
    appReducer,
})