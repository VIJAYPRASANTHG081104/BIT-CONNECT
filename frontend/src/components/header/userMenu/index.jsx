import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const UserMenu = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    Cookies.set("user", null);
    navigate("/login");
  };
  return (
    <div className="mmenu">
      <div>
        <Link to={"/profile"} className="mmenu_header hover3">
          <img src={user?.picture} alt="" />
          <div className="mmenu_col">
            <span>
              {user?.first_name}
              {user?.last_name}
            </span>
            <span>See your profile</span>
          </div>
        </Link>
        <div className="mmenu_splitter"></div>
        <div className="mmenu_item hover3">
          <div className="small_circle">
            <i className="dark_filled_icon"></i>
          </div>
          <span>Dark Mode</span>
          <div className="rArrow">
            {/* <i className="right_icon"></i> */}
            <div className="darkBtn">
              <input hidden type="checkbox" id="darkmode-toggle"/>
              <label htmlFor="darkmode-toggle"></label>
            </div>
          </div>
        </div>
        <div className="mmenu_item hover3" onClick={() => logout()}>
          <div className="small_circle">
            <i className="logout_filled_icon"></i>
          </div>
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
