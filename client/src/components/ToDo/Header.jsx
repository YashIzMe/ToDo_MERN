import React, { useState } from "react";
import { FaUserCircle } from 'react-icons/fa';
import { GrLogout } from 'react-icons/gr'

const Header = () => {
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
            <GrLogout className="logoutIcon" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
