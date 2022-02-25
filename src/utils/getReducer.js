import getDotObject from './getDotObject'
import store from './store'

/**
 * Gets a value from a reducer, the first param is the name of the reducer, and the next ones are subvalues of the reducer. You can pass any number of params
 * 
 * Ex: `getReducer('user', 'profile', 'address', city)` will access the user reducer, then the profile object inside the reducer,
 * then the address obj inside the profile object, then the city value
 * 
 * ---
 * 
 * @param { string } name - Reducer name
 * @param { string } args - Subvalues of the reducer to read
 * @returns { * } The read value
*/
export default function getReducer(name, ...args) {
    const value = store.getState()[name]
    return args.length > 0 ? getDotObject(value, args.join('.')) : value
}