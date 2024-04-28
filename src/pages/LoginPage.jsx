import "../pages_css/LoginPage.css";
import React, { useState } from "react";
import loginImage from "../resources/loginImage.png";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../auth/userApis.js";


const LoginPage = () => {
  const navigate = useNavigate();


  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const notify = (value) => {
    toast(value);
  };

  const signInBtnHandler = async () => {
    if (!userDetails.email || !userDetails.password) {
      if (!userDetails.email && userDetails.password) {
        notify("Please Enter the Email First !!");
      } else if (!userDetails.password && userDetails.email) {
        notify("Please Enter the Password First !!");
      } else {
        notify("Please Enter the Given Fields First !!");
      }
      return;
    }
    const response = await loginUser(userDetails);
    if(!response){
      return;
    }
    const token = response.data.token;
    const userName = response.data.name;
    const userId = response.data.userId;
    localStorage.setItem("token",JSON.stringify(token));
    localStorage.setItem("name",JSON.stringify(userName));
    localStorage.setItem("userId",JSON.stringify(userId));
    navigate('/jobPage');
  };

  return (
    <div className="registerContainer">
      <div className="loginForm">
        <div className="inputForm">
          <h2>Already have an account?</h2>
          <p>Your personal job finder is here</p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: ".8rem",
              width: "85%",
              marginTop: "2rem",
            }}
          >
            <input
              style={{ height: "34px", padding: ".5rem" }}
              type="email"
              placeholder="Email"
              value={userDetails.email}
              onInput={(e) =>
                setUserDetails({
                  ...userDetails,
                  email: e.target.value,
                })
              }
            />
            <input
              style={{ height: "34px", padding: ".5rem" }}
              type="password"
              placeholder="Password"
              value={userDetails.password}
              onInput={(e) =>
                setUserDetails({
                  ...userDetails,
                  password: e.target.value,
                })
              }
            />
          </div>
          <div style={{cursor:"pointer"}} className="signInBtn" onClick={signInBtnHandler}>
            Sign in
          </div>
          <p style={{ fontSize: "12px", marginTop: ".3rem" }}>
            Don’t have an account?
            <Link to={"/SignUp"}>
              <span
                style={{
                  marginLeft: ".2rem",
                  color: "blue",
                  fontWeight: "600",
                }}
              >
                Sign Up
              </span>
            </Link>
          </p>
        </div>
      </div>
      <div className="loginImgContainer">
        <img src={loginImage} className="loginImg" alt=""/>
        <p className="imgTitle">Your Personal Job Finder</p>
      </div>
    </div>
  );
};

export default LoginPage;
