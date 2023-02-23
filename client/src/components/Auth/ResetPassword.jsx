import React, { useState } from "react";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleResetPassword = () => {
    console.log(password);
    console.log(confirmPassword);
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <div className="Auth-form-title">Reset Password</div>
          <div className="text-center">
            <Link className="link-primary" to="/">
              Go Back
            </Link>
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              required
              type="password"
              className="form-control mt-1"
              placeholder="Enter a new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Confirm Password</label>
            <input
              required
              type="text"
              className="form-control mt-1"
              placeholder="Enter Password again"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button
              type="submit"
              style={{marginTop: 15, marginBottom: 10}}
              className="btn btn-primary"
              onClick={() => handleResetPassword()}
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
