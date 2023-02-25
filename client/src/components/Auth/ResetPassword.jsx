import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { DataContext } from "../../context/DataProvider";

const server = "http://localhost:5000";
const ResetPassword = () => {
  const { account, setAccount } = useContext(DataContext);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleResetPassword = (e) => {
    e.preventDefault();
    try {
      axios.put(server + "/api/resetPassword", {
        userId: account.user._id,
        oldPassword,
        newPassword
      }).then(res => {
        alert("Password changed successfully!");
      }).catch(e => {
        alert(e.response.data.msg);
      })
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={(e) => e.preventDefault()}>
        <div className="Auth-form-content">
          <div className="Auth-form-title">Reset Password</div>
          <div className="text-center">
            <Link className="link-primary" to="/home">
              Go Back
            </Link>
          </div>
          <div className="form-group mt-3">
            <label>Old Password</label>
            <input
              required
              type="password"
              className="form-control mt-1"
              placeholder="Enter a old password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>New Password</label>
            <input
              required
              type="password"
              className="form-control mt-1"
              placeholder="Enter New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button
              type="submit"
              style={{marginTop: 15, marginBottom: 10}}
              className="btn btn-primary"
              onClick={(e) => handleResetPassword(e)}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
