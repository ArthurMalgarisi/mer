import { STORAGE_CHANGE_VALUE, STORAGE_CHANGE_CHILD_VALUE, STORAGE_CHANGE_USERDATA_CHILD_VALUE } from '../../constants/actionTypes'

const INITIAL_STATE = {
    showDetails: false,
    productDetails: {
        key: '', name: '', price: '', amount: ''
    },
    productsList: null,
    edit: false,
}



const storage = ( state = INITIAL_STATE, action ) => {
    switch(action.type) {
        case STORAGE_CHANGE_VALUE:
            return {
                ...state,
                [ action.property ]: action.payload,
            }
        case STORAGE_CHANGE_CHILD_VALUE:
            return {
                ...state,
                [action.key]: {
                    ...state[action.key],
                    [action.property]: action.payload,
            }
        }
        case STORAGE_CHANGE_USERDATA_CHILD_VALUE:
            return {
                ...state,
                productDetails: {
                    ...state.productDetails,
                    [ action.key ]: {
                    ...state.productDetails[action.key],                   
                    [action.property]: action.payload,
                    }
                }
            }

        default:
            return state
    }
}

export default storage