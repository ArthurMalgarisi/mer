import { USERS_CHANGE_VALUE } from "../../constants/actionTypes";
import { firebase, getReducer } from "../../utils";

export function changeVisibleDetailsDialog(show, data) {
    return dispatch => { 
        dispatch({ type: USERS_CHANGE_VALUE, property: 'showDetails', payload: show })
        dispatch({ type: USERS_CHANGE_VALUE, property: 'edit', payload: true})
        if (show) dispatch({ type: USERS_CHANGE_VALUE, property: 'userData', payload: data})
        else setTimeout(() => { dispatch({ type: USERS_CHANGE_VALUE, property: 'userData', payload: null }) }, 250)
    }}

export function loadUsersList() {
    return dispatch => {
        firebase.firestore.collection('users').get()
        .then(snap => {
            const data = snap.docs.map(doc => doc.data())
            dispatch({ type: USERS_CHANGE_VALUE, property: 'userList', payload: data})
        })
        .catch(error => {
            console.log("loadUsersList" ,error)
        })
    }
}

export function editUsersList(data) {
    return dispatch => {
        firebase.firestore.doc(`users/${data.uid}`).update(data)
        .then(() => {
            const userList = getReducer("users", "userList")
            let updateList = JSON.parse(JSON.stringify(userList))
            updateList = updateList.map(users =>  users.uid === data.uid ? data : users)
            dispatch({ type: USERS_CHANGE_VALUE, property: 'userList', payload: updateList })
            dispatch(changeVisibleDetailsDialog(false))
        })
        .catch(error => {
            console.log("editUsersList", error)
        })
    }
}

export function deleteUsers(data) {
    return dispatch => {
        firebase.firestore.doc(`users/${data.uid}`).delete()
        .then(() => {
            const userList = getReducer("users", "userList")
            let updateList = JSON.parse(JSON.stringify(userList))
            updateList = updateList.filter(users => users.uid !== data.uid)
            dispatch({ type: USERS_CHANGE_VALUE, property: 'userList', payload: updateList })
            dispatch(changeVisibleDetailsDialog(false))
        })
        .catch(error => {
            console.log("deleteUsers", error)
        })
    }
}