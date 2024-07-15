import React, { useState } from "react";
import { FaUser, FaLock, FaSignInAlt, FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { login } from "../actions/userAction.js";
import "../Css/Login.css";
import { useNavigate } from "react-router-dom";
const Login = React.memo(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
    navigate("/chp-entry");
  };

  const handleClearForm = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <h1 className="heading-login">KORADI TPS LOGIN</h1>
      <main className="main-component-login">
        <div className="login-form">
          <div className="input-group">
            <FaUser className="icon" />
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <FaLock className="icon" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="button-group">
            <button className="submit-button" onClick={handleLogin}>
              <FaSignInAlt /> Submit
            </button>
            <button className="clear-button" onClick={handleClearForm}>
              <FaTimes /> Clear Form
            </button>
          </div>
        </div>
      </main>
    </>
  );
});

Login.displayName = "Login";

export default Login;
