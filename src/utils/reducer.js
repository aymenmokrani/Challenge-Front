export const initialState = {
    users: []
}


const reducer = (state, action) => {
    switch (action.type) {
        case "SET_USERS":
            return {
                ...state,
                users: action.payload
            }
        case "ADD_USER":
            return {
                ...state, 
                users: [...state.users, action.payload]
            }
        case "DEL_USER":
            const idx = state.users.map(it => (it.name)).indexOf(action.payload)
            if(idx !== -1) {
                state.users.splice(idx, 1)
            }
            return {
                ...state,
            }
        case "UPD_NAME":
            const indx = state.users.map(it => (it.name)).indexOf(action.payload[0])
            if (indx > -1) {state.users[indx] = {...state.users[indx], name: action.payload[1]}}
            return {
                ...state,
            }
        default: return state
    }
}


export default reducer