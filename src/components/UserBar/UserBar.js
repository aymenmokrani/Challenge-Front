import React, { useState, useEffect } from "react";
import "./userBar.scss";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import axios from "axios";
import { deleteOne, updateUser } from "../../controllers/userController";

function UserBar({ name, dispatch }) {
  const [active, setActive] = useState(false);
  const [currentName, setCurrentName] = useState(name);
  const [textField, setTextFied] = useState(name);

  const editSave = async () => {
    if (!active) {
      // Active Edit
      setActive(!active);
    } else {
      // Save Edit
      if (currentName !== textField) {
        try {
          const response = await updateUser(dispatch, name, textField);
          if (response) {
            // SAVED !
            setCurrentName(textField);
          } else {
            // NOT SAVED
            setTextFied(currentName);
          }
        } catch (error) {
          console.log(error.message);
        }
      }
      setActive(!active);
    }
  };

  useEffect(() => {
    let mounted = true;

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="userBar">
      <input
        type="text"
        value={textField}
        onChange={(e) => setTextFied(e.target.value)}
        className={!active ? "disabled" : ""}
        readOnly={!active}
      />
      <div className="actions">
        <div className="edit" onClick={editSave}>
          {!active ? <EditIcon /> : <SaveIcon />}
        </div>
        <div className="del" onClick={() => deleteOne(dispatch, currentName)}>
          <DeleteIcon />
        </div>
      </div>
    </div>
  );
}

export default UserBar;
