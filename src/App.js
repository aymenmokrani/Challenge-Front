import { useEffect, useState } from "react";
import "./App.css";
import { useDataLayerValue } from "./utils/DataLayer";
import { TextField, Button } from "@material-ui/core";
import UserBar from "./components/UserBar/UserBar";
import { getAllUsers, addUser } from "./controllers/userController";

function App() {
  const [{ users }, dispatch] = useDataLayerValue();
  const [userField, setUserField] = useState("");

  useEffect(() => {
    // GET ALL USERS
    getAllUsers(dispatch);
  }, []);

  return (
    <div className="App">
      <h1>MERN Challenge List App :) </h1>
      <hr />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextField
          label="Enter a new challenge"
          variant="outlined"
          value={userField}
          onChange={(e) => setUserField(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          style={{ margin: "20px 0" }}
          onClick={() => {
            addUser(dispatch, userField);
            setUserField("");
          }}
          disabled={!userField.trim().length}
        >
          Add Challenges
        </Button>
      </div>
      <hr />
      <div
        className="listUsers"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <h3>My list of challenges</h3>
        {!users.length ? (
          <span>no users yet</span>
        ) : (
          users?.map((user) => (
            <UserBar key={Math.random()} name={user.name} dispatch={dispatch} />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
