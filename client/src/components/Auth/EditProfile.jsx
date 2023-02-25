import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DataContext } from "../../context/DataProvider";
import fire from "../firebase";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

const server = "http://localhost:5000";

const EditProfile = () => {
  const storage = getStorage();
  const metadata = {
    contentType: "image/jpg" || "image/jpeg" || "image/png",
  };

  const { account, setAccount } = useContext(DataContext);
  // console.log(account);
  let [authMode, setAuthMode] = useState("signin");
  const [cookieValue, setCookieValue] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [showImage, setShowImage] = useState(null);
  const [contact, setContact] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [percent, setPercent] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);

  // const imageURL = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  useEffect(() => {
    setUserName(account.user.name);
    setContact(account.user.contact);
    console.log(account)
    setShowImage(account.user.profilePic);
    setEmail(account.user.email);
  }, []);

  const editProfile = () => {
    if (image) {
      const storageRef = ref(storage, `/photos/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          ); // update progress
          setPercent(percent);
        },
        (err) => console.log(err),
        () => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            console.log(url);
            setImageUrl(url);
            setShowImage(url);
            axios.put(server + "/api/updateUser", {
              email: email,
              name: userName,
              profilePic: url
            }).then((res) => {
              if(res.status) {
                setAccount(res.data);
                alert("Updated Successfully");
              }
            }).catch(e => {
              console.log(e.message);
            });
          });
        },
      );
    } else {
      axios.put(server + "/api/updateUser", {
        email: email,
        name: userName,
        profilePic: showImage
      }).then((res) => {
        if(res.status) {
          setAccount(res.data);
          alert("Updated Successfully");
        }
      }).catch(e => {
        console.log(e.message);
      });
    }
  
    
  };

  return (
    <>
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={(e) => e.preventDefault()}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Edit Profile</h3>
              <p><Link className="goback" to="/home">Go Back</Link></p>
            <div className="form-group mt-3">
              <div className="form-group mt-3">
                <label className="center">upload profile photo</label>
                <label className="profile-container" htmlFor="fileInput">
                  
                    <img
                      src={showImage}
                      className="profileImage"
                      alt="userImage"
                    />
                  
                </label>
                <input
                  type="file"
                  className="form-control mt-1"
                  placeholder="Enter email"
                  id="fileInput"
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={(e) => {
                    setShowImage(URL.createObjectURL(e.target.files[0]));
                    setImage(e.target.files[0]);
                  }}
                />
              </div>
              <label>Full Name</label>
              <input
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
                readOnly
                type="email"
                className={"form-control mt-1 "}
                placeholder="Email Address"
                value={account.user.email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ backgroundColor: "#EEEEEE", outline: "none" }}
              />
              {emailError && <div className="text-danger">{emailError}</div>}
            </div>

            <div className="form-group mt-3">
              <label>Enter Your Contact No.</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="+9198944XXXXX"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button
                style={{ marginTop: 15 }}
                type="submit"
                className="btn btn-primary"
                onClick={(e) => editProfile(e)}
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProfile;
