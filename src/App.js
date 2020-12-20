import { useEffect, useState } from 'react';
import './App.css';
import { useDataLayerValue } from './utils/DataLayer';
import axios from 'axios'
import { CircularProgress, TextField, Button } from '@material-ui/core';


function App() {


  const server = "https://whispering-basin-81140.herokuapp.com"
  const [{ name }, dispatch] = useDataLayerValue()
  const [userField, setUserField] = useState('')

  const addUser = async () => {
    try {
      const response = await axios.post(`${server}/users/create`, {name: userField})
      console.log(response);  
    } catch (error) {
      console.log(error.reponse);
    }
    
  }

  useEffect(() => {
    try {
      axios.get(`${server}/api/getname`).then(response => {
        dispatch({
          type: "SET_NAME",
          payload: response.data
        })
      }).catch(error => {
        console.log(error);
        const status = error.response.status
        if (status && status === 404) {
          console.log("api was not found");
        }
      })
    } catch (error) {
      console.log(error.message);
    }
  }, [])
  


  return (
    <div className="App">
      
      <h1>look what I'm getting from server :) </h1>
      <h1>{name ? name : <CircularProgress />}</h1> 
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
                onClick={addUser}
                >Add User</Button>
      </div>
      <hr/>
      <div className="listUsers" style={{display: 'flex', flexDirection: 'column'}}>
      <h3>List of users here</h3>
      <span>user 1</span>
      <span>user 1</span>
      <span>user 1</span>
      </div>
      
    </div>
  );
}

export default App;
