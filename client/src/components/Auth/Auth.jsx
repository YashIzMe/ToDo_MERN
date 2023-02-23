import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

const Auth = () => {

  const navigation = useNavigate();

  let [authMode, setAuthMode] = useState("signin");
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);
  const [showImage, setShowImage] = useState(null);
  console.log(image)
  const changeAuthMode = () => {
    setEmail("");
    setPassword("");
    setUserName("");
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };
  
  const handleLogin = () => {
    console.log(email);
    console.log(password);
    navigation('/home');
  }

  const handleSignUp = () => {
    console.log(userName);
    console.log(email);
    console.log(password);
  }

  // SIGN IN
  if (authMode === "signin") {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={(e) => e.preventDefault()}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary cursor" onClick={changeAuthMode}>
                Sign Up
              </span>
            </div>
            
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                required
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                required
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button style={{marginTop: 15}} type="submit" className="btn btn-primary" onClick={() => handleLogin()}>
                Login
              </button>
            </div>
            <p className="text-center mt-2">
              Reset <Link to="reset">password?</Link>
            </p>
          </div>
        </form>
      </div>
    );
  }

  // SIGN UP
  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={(e) => e.preventDefault()}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary cursor" onClick={changeAuthMode}>
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
          <div className="form-group mt-3">
              <label className="center">upload profile photo</label>
              <label className="profile-container" htmlFor="fileInput">
                {image? <img src={showImage} className="profileImage" alt="userImage" /> : <FaUserCircle className="profileImage"/>}
              </label>
              <input
                required
                type="file"
                className="form-control mt-1"
                placeholder="Enter email"
                id="fileInput"
                style={{display: "none"}}
                
                accept="image/*"
                onChange={(e) => {
                  setShowImage(URL.createObjectURL(e.target.files[0]))
                  setImage(e.target.files[0])
                }}
              />
            </div>
            <label>Full Name</label>
            <input
              required
              type="text"
              className="form-control mt-1"
              placeholder="e.g John Doe"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              required
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              required
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button style={{marginTop: 15}} type="submit" className="btn btn-primary" onClick={() => handleSignUp()}>
              Register
            </button>
          </div>
          
        </div>
      </form>
    </div>
  );
}

export default Auth;
