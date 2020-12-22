import axios from 'axios'
const server = "https://whispering-basin-81140.herokuapp.com/users"
// const server= "http://localhost:4000/users"



//GET USERS
  //AL
export const getAllUsers = async (dispatch) => {
    try {
        const users = await axios.get(`${server}`)
        dispatch({
            type: "SET_USERS",
            payload: users.data
        })
    } catch (error) {
        console.log(error.message);
    }
    
}

// POST USER
export const addUser = async (dispatch, name) => {
    try {
        await axios.post(`${server}`, {name})
        dispatch({
            type: "ADD_USER",
            payload: {name}
        })
    } catch (error) {
        console.log(error.message);
    }
}

// PUT USER
export const updateUser = async (dispatch, oldName, newName) => {
    try {
        await axios.put(`${server}/${oldName}`, {name: newName})
        dispatch({
            type: "UPD_NAME",
            payload: [oldName, newName]
        })
        return true
    } catch (error) {
        console.log(error.response);
        return false
    }
}


// DELETE USER
  //ONE
export const deleteOne = async (dispatch, name) => {
    try {
        await axios.delete(`${server}/${name}`)    
        dispatch({
            type: "DEL_USER",
            payload: name
        })
    } catch (error) {
        console.log(error.message)
    }
}