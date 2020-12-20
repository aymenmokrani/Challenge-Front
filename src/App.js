import { useEffect } from 'react';
import './App.css';
import { useDataLayerValue } from './utils/DataLayer';
import axios from 'axios'


function App() {

  const [{ name }, dispatch] = useDataLayerValue()

  console.log(name);

  

  useEffect(() => {
    try {
      axios.get('api/getname').then(response => {
        dispatch({
          type: "SET_NAME",
          payload: response.data
        })
      }).catch(error => {
        if (error.response.status === 404) {
          console.log("api was not found");
        }
      })
    } catch (error) {
      console.log(error.message);
    }
  }, [])
  


  return (
    <div className="App">
      <h1>look what I'm getting from server {`=>`} {name} :) </h1>
    </div>
  );
}

export default App;
