import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { DataContext } from "../../context/DataProvider";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { GrAddCircle } from "react-icons/gr";

const server = "http://localhost:5000";

const TaskList = () => {
  const { account, setAccount } = useContext(DataContext);
  const [addTodo, setAddTodo] = useState("");
  const [task, setTask] = useState([]);
  const [isEditable, setIsEditable] = useState(false);
  // console.log(task)

  useEffect(() => {
    const getTasks = async () => {
      try {
        axios
          .get(server + "/api/getAllTaskByUser/" + account.user._id)
          .then((res) => {
            if (res.status === 200) {
              setTask(res.data);
            }
          })
          .catch((e) => {
            console.log(e.message);
          });
      } catch (error) {
        console.log(error.message);
      }
    };

    getTasks();
  }, []);

  const handleTodo = (e) => {
    setAddTodo(e.target.value);
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!addTodo) return null;

    try {
      axios
        .post(server + "/api/createTask", {
          task: addTodo,
          user: account.user._id,
        })
        .then((res) => {
          if (res.status === 200) {
            setTask((prev) => [...prev, res.data.newTask]);
            setAddTodo("");
          }
        })
        .catch((e) => {
          console.log(e.message);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteTodo = async (item) => {
    try {
      axios.delete(server + "/api/deleteTodo/" + item._id).then((res) => {
        if (res.status === 200) {
          setTask((prev) => prev.filter((todo) => todo._id != item._id));
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const completeTodo = async (item) => {
    try {
      axios
        .put(server + "/api/completeTodo/" + item._id)
        .then((res) => {
          const copy = [];
          task.map((todo) => {
            if (todo._id === item._id) {
              todo.complete = res.data.updateTask.complete;
              copy.push(todo);
            } else {
              copy.push(todo);
            }
          });
          setTask(copy);
          // setTask((prev) => {
          //   prev.map((todo) => {
          //     if (todo._id === item._id) {
          //       todo.complete = res.data.updateTask.complete;
          //     }
          //   });
          //   return [...prev];
          // });
          console.log(task);
        })
        .catch((e) => {
          console.log(e.message);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="main-container">
        <div className="container">
          {/* <label className="labelAdd" htmlFor="">Enter a task</label> */}
          <form className="addForm" onSubmit={(e) => addTask(e)}>
            <input
              value={addTodo}
              onChange={(e) => handleTodo(e)}
              autoFocus="on"
              type="text"
              placeholder="Enter a To Do...."
              className="addtask"
            />
            <GrAddCircle
              onClick={(e) => addTask(e)}
              type="submit"
              size={100}
              className="addIcon"
            />
          </form>
        </div>
        <div className="content">
          {task.length > 0 ? (
            <>
              {task.map((item) => {
                return (
                  <>
                    <div key={item._id} className="cont">
                      <div className="item">
                        <div className="left">
                          <input
                            onClick={() => completeTodo(item)}
                            type="checkbox"
                            checked={item.complete ? "checked" : ""}
                            className="check-box"
                            onChange={()=>console.log()}
                          />
                          <span
                            className={"taskName"}
                            style={
                              item.complete
                                ? { textDecoration: "line-through" }
                                : null
                            }
                          >
                            {item.task}
                          </span>
                        </div>
                        <div className="right">
                          {/* <FiEdit size={26} className="Icon" /> */}
                          <AiOutlineDelete
                            onClick={() => deleteTodo(item)}
                            size={35}
                            className="Icon"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default TaskList;
