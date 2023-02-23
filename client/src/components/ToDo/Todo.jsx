import React, { useState } from "react";
import AddTask from "./AddTask";
import Header from "./Header";

const Todo = () => {
    return (
        <>
            <Header />
            <AddTask />
        </>
    );
}

export default Todo;