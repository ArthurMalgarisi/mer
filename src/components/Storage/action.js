import { STORAGE_CHANGE_VALUE } from "../../constants/actionTypes";
import { firebase, getReducer } from "../../utils";

export function changeVisibleDetailsDialog(show, data= null) {
    return dispatch => { 
        dispatch({ type: STORAGE_CHANGE_VALUE, property: 'showDetails', payload: show })
        if(data) {
            dispatch({ type: STORAGE_CHANGE_VALUE, property: 'productDetails', payload: data})
            dispatch({ type: STORAGE_CHANGE_VALUE, property: 'edit', payload: true})
        }
        if(!show) setTimeout(() => { dispatch({ type: STORAGE_CHANGE_VALUE, property: 'productDetails', payload: {key: '', name: '', price: '', amount: ''}}) }, 250)
    }}
    

export function loadStorageList() {
    return dispatch => {
        firebase.firestore.collection('storage').get()
        .then(snap => {
            const data = snap.docs.map(doc => doc.data())
            dispatch({ type: STORAGE_CHANGE_VALUE, property: 'productsList', payload: data})
        })
        .catch(error => {
            console.log("loadStorageList" ,error)
        })
    }
}

export function editStorageList(data) {
    return dispatch => {
        console.log(data)
        firebase.firestore.doc(`storage/${data.key}`).update(data)
        .then(() => {
            const productsList = getReducer("storage", "productsList")
            let updateList = JSON.parse(JSON.stringify(productsList))
            updateList = updateList.map(storage =>  storage.key === data.key ? data : storage)
            dispatch({ type: STORAGE_CHANGE_VALUE, property: 'productsList', payload: updateList })
            dispatch(changeVisibleDetailsDialog(false))
        })
        .catch(error => {
            console.log("editStorageList", error)
        })
    }
}

export function addAmount(data) {
    return dispatch => {
        firebase.firestore.doc(`storage/${data.key}`).update({amount: data.amount})
        .then(() => {
            const productsList = getReducer('storage', 'productsList')
            let updateList = JSON.parse(JSON.stringify(productsList))
            updateList = updateList.map(el =>  el.key === data.key ? data : el)
            dispatch({ type: STORAGE_CHANGE_VALUE, property: 'productsList', payload: updateList })  
        })
        .catch(error => {
            console.log("addAmount", error)
        })
    }
}

export function removeAmount(data) {
    return dispatch => {
        firebase.firestore.doc(`storage/${data.key}`).update({amount: data.amount})
        .then(() => {
            const productsList = getReducer('storage', 'productsList')
            let updateList = JSON.parse(JSON.stringify(productsList))
            updateList = updateList.map(el =>  el.key === data.key ? data : el)
            dispatch({ type: STORAGE_CHANGE_VALUE, property: 'productsList', payload: updateList })  
        })
        .catch(error => {
            console.log("removeAmount", error)
        })
    }
}

export function deleteStorage(key) {
    return dispatch => {
        firebase.firestore.doc(`storage/${key}`).delete()
        .then(() => {
            const productsList = getReducer("storage", "productsList")
            let updateList = JSON.parse(JSON.stringify(productsList))
            updateList = updateList.filter(storage => storage.key !== key)
            dispatch({ type: STORAGE_CHANGE_VALUE, property: 'productsList', payload: updateList })
        })
        .catch(error => {
            console.log("deleteStorage", error)
        })
    }
}

export function addProduct(data) {
    return dispatch => {
        const refDoc = firebase.firestore.collection('storage').doc()
        const dataProduct = {...data, key: refDoc.id, amount: parseFloat(data.amount), price: parseFloat(data.price.replace('R$ ', '').replace(',', '.'))}
        refDoc.set(dataProduct)
        .then(() => {
            const productsList = getReducer("storage", "productsList")
            let updateList = JSON.parse(JSON.stringify(productsList))
            updateList = [...updateList, dataProduct]
            dispatch({ type: STORAGE_CHANGE_VALUE, property: 'productsList', payload: updateList })
            dispatch(changeVisibleDetailsDialog(false));
        })
        .catch(error => {
            console.log("addProduct", error)
        })
    }
}