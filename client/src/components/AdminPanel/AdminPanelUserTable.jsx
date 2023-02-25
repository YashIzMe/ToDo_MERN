import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import Header from "./AdminHeader";
import { Link } from "react-router-dom";

const server = "http://localhost:5000";

const AdminPanelUserTable = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    axios.get(server + "/api/getAllUsers").then((res) => {
      setUserData(res.data.data);
      console.log(userData);
    });
  }, []);

  return (
    <>
      <Header />
      <div className="Linker">
        <Link className="Linker2" to={"/adminPanelTasks"}>
          Go to Tasks Table
        </Link>
      </div>
      {userData.length > 0 ? (
        <div className="table-responsive">
        <table className="table ">
          <thead>
            <tr>
              <th scope="col">Sr. No.</th>
              <th scope="col">User ID</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Contact</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((item, i) => {
              return (
                <tr key={i}>
                  <th scope="row">{i}</th>
                  <td scope="row">{item._id}</td>
                  <td scope="row">{item.name}</td>
                  <td scope="row">{item.email}</td>
                  <td scope="row">{item.contact}</td>
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

export default AdminPanelUserTable;
