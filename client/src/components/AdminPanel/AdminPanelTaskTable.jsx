import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import Header from "./AdminHeader";
import { Link } from "react-router-dom";

const server = "http://localhost:5000";

const AdminPanelTask = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    axios.get(server + "/api/getAllTasks").then((res) => {
      setUserData(res.data.data);
      console.log(userData);
    });
  }, []);

  return (
    <>
      <Header />

      <div className="Linker">
        <Link className="Linker2" to={"/adminPanelUsers"}>
          Go to Users Table
        </Link>
      </div>
      {userData.length > 0 ? (
        <div className="table-responsive">
          <table className="table mx-2">
            <thead>
              <tr>
                <th scope="col">Sr. No.</th>
                <th scope="col">User ID</th>
                <th scope="col">Task</th>
                <th scope="col">Complete</th>
                <th scope="col">Created On</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((item, i) => {
                return (
                  <tr key={i}>
                    <th scope="row">{i}</th>
                    <td scope="row">{item.user}</td>
                    <td scope="row">{item.task}</td>
                    <td scope="row">{item.complete ? "True" : "False"}</td>
                    <td scope="row">{item.timestamp}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <>
          <div>Loading...</div>
        </>
      )}
    </>
  );
};

export default AdminPanelTask;
