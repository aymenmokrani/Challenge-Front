import { useEffect } from 'react';
import './App.css';
import { useDataLayerValue } from './utils/DataLayer';
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress';


function App() {


  const server = "https://whispering-basin-81140.herokuapp.com"
  const [{ name }, dispatch] = useDataLayerValue()

  console.log(name);

  

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
    </div>
  );
}

export default App;
