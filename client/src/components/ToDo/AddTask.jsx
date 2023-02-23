import React, { useState } from "react";
import { GrAddCircle } from 'react-icons/gr'

const AddTask = () => {

  const [addTodo, setAddTodo] = useState("");

  const handleTodo = (e) => {
    setAddTodo(e.target.value);
  }

  return (
    <div className="main-container">
      <div className="container">
        {/* <label className="labelAdd" htmlFor="">Enter a task</label> */}
        <input onChange={(e) => handleTodo(e)} autoFocus="on" type="text" placeholder="Enter a To Do...." className="addtask" />
        <GrAddCircle size={100} className="addIcon" />
      </div>
    </div>
  );
};

export default AddTask;