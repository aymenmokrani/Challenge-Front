export const initialState = {
    name: '',
    users: []
}


const reducer = (state, action) => {
    switch (action.type) {
        case "SET_NAME":
            return {
                ...state,
                name: action.payload
            }
        case "SET_USERS":
            return {
                ...state,
                users: action.payload
            }
        default: return state
    }
}


export default reducer