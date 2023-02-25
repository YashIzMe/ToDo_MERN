import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from 'react-icons/fa';
import { GrLogout } from 'react-icons/gr';
import axios from "axios";
import { DataContext } from "../../context/DataProvider";

axios.defaults.withCredentials = true;

const server = "http://localhost:5000";

const Header = ( ) => {
  const { account, setAccount } = useContext(DataContext);
  const navigate = useNavigate();

  const logoutUser = async () => {
    axios.post(server + "/api/logout").then(res => {
      console.log("Logout Successfully");
      navigate("/");
    }).catch((e) => {
      console.log(e.message)
    })
  }

  return(
    <header>
      <div className="header">
        <div className="title">TODO List</div>
        <div className="right-part">
          <div className="edit-profile">
            <button className="imageBtn"><img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" className="image" alt="" /></button>
            {/* <p className="text-center">Edit Profile</p> */}
          </div>
          <div className="Logout">
            <GrLogout onClick={() => logoutUser()} className="logoutIcon" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
