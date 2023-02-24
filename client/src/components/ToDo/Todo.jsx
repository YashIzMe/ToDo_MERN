import React, { useState } from "react";
import AddTask from "./AddTask";
import Header from "./Header";
import TaskList from "./TaskList";

const Todo = () => {
    return (
        <>
            <Header />
            <AddTask />
            <TaskList />
        </>
    );
}

export default Todo;