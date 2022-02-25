import {APP_CHANGE_VALUE} from '../../constants/actionTypes'

const INITIAL_STATE = {
    user: null,
}

const appReducer = (state= INITIAL_STATE, action) => {
    switch(action.type){
        case APP_CHANGE_VALUE:
            return {
                ...state,
                [action.property]: action.payload
            }
            default:
                return state
    }
}

export default appReducer