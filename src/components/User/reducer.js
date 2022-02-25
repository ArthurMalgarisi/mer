import { USERS_CHANGE_CHILD_VALUE, USERS_CHANGE_VALUE, USERS_CHANGE_USERDATA_CHILD_VALUE} from '../../constants/actionTypes'

const INITIAL_STATE = {
    showDetails: false,
    userData: null,
    userList: null,
    edit: false,
}

const users = ( state = INITIAL_STATE, action ) => {
    switch(action.type) {
        case USERS_CHANGE_VALUE:
            return {
                ...state,
                [ action.property ]: action.payload,
            }
        case USERS_CHANGE_CHILD_VALUE:
            return {
                ...state,
                [action.key]: {
                    ...state[action.key],
                    [action.property]: action.payload,
            }
        }
        case USERS_CHANGE_USERDATA_CHILD_VALUE:
            return {
                ...state,
                userData: {
                    ...state.userData,
                    [ action.key ]: {
                    ...state.userData[action.key],
                    [action.property]: action.payload,
                    }
                }
            }

        default:
            return state
    }
}

export default users