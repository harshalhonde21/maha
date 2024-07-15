import React, { Fragment, useEffect } from 'react';
import "../Css/Profile.css"
import { useDispatch, useSelector } from 'react-redux';
import { loginFail, setIsLoginFalse } from '../slices/userSlice.js';
import { isLogin } from "../actions/userAction.js";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";

const Profile = React.memo(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.user.user);

  useEffect(() => {
    dispatch(isLogin());
  }, [dispatch]); 

  const handleLogout = () => {
    dispatch(loginFail());
    dispatch(setIsLoginFalse());
    localStorage.removeItem('token'); 
    navigate("/");
    toast.success('Successfully Logout!')
  };

  return (
    <Fragment>
      <div className="profile-container">
        <h2 className="profile-heading">Profile</h2>
        <div>
          <p className="profile-info"><strong>Username:</strong> {user && user.name}</p>
          <p className="profile-info"><strong>Email:</strong> {user && user.email}</p>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </Fragment>
  )
});

Profile.displayName = 'Profile';

export default Profile;
