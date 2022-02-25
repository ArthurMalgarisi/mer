/**
 * Reads a value inside a deep object, using a string address to enter the subvalues of the object
 * 
 * ---
 *  
 * @param { object } obj - Object to read the property value
 * @param { string } address - Property to access in the object (Ex: `a.b.c`)
 * @param { boolean } alwaysReturnVal - If true, return the prev available property (Ex: if a.b.c is undefined, return the value in a.b). If false, will return undefined if the prop is not found
 * @returns { * } Value read in the property
*/
export default function getDotObject(obj, address, alwaysReturnVal) {
    if (!address) return obj
    const addressArr = String(address).split('.')
    let value = obj

    addressArr.every(el => {
        if (value[el] !== undefined) {
            value = value[el]
            return true
        } else {
            if (!alwaysReturnVal) {
                value = undefined
            }
            return false
        }
    })
    return value
}