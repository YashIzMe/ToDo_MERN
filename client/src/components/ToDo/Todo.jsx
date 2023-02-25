import React, { useState } from "react";
import Header from "./Header";
import TaskList from "./TaskList";

const Todo = () => {
    return (
        <>
            <Header />
            <TaskList />
        </>
    );
}

export default Todo;