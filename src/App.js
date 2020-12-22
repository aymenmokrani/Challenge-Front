import { useEffect, useState } from 'react';
import './App.css';
import { useDataLayerValue } from './utils/DataLayer';
import { TextField, Button } from '@material-ui/core';
import UserBar from './components/UserBar/UserBar';
import axios from 'axios'
import { deleteOne, getAllUsers, addUser } from './controllers/userController'

function App() {




  // const server = "https://whispering-basin-81140.herokuapp.com"
  const server= "http://localhost:4000"
  const [{ users }, dispatch] = useDataLayerValue()
  const [userField, setUserField] = useState('')


  

  // const addUser = async () => {
  //   try {
  //     const user = await axios.post(`${server}/users`, {name: userField})
  //     dispatch({
  //       type: "SET_USERS",
  //       payload: [...users, {name: userField}]
  //     }) 
  //   } catch (error) {
  //     console.log(error);
  //   }
    // setUserField('')
  // }


  useEffect(() => {
      // GET ALL USERS
      getAllUsers(dispatch)
      
  }, [])
  


  return (
    <div className="App">
      <Button variant="contained" onClick={() => deleteOne(dispatch)}>try here</Button>
      <h1>look what I'm getting from server :) </h1>
      <hr/>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <TextField label="user name" 
                  variant="outlined" 
                  value={userField}
                  onChange={(e) => setUserField(e.target.value)} 
                  />
        <Button variant="contained" 
                color="primary" 
                style={{margin: '20px 0'}}
                onClick={() => {addUser(dispatch, userField); setUserField('')}}
                disabled={!userField.trim().length}
                >Add User</Button>
      </div>
      <hr/>
      <div className="listUsers" style={{display: 'flex', flexDirection: 'column'}}>
      <h3>List of users here</h3>
      {/* <UserBar name="book"/> */}
      {
        !users.length ? <span>no users yet</span> :
        users?.map(user => (
          <UserBar key={Math.random()} 
                   name={user.name}
                   dispatch={dispatch}
                   />
          // <span key={idx}>{user.name}</span>
        ))
      }
      </div>
      
    </div>
  );
}

export default App;
