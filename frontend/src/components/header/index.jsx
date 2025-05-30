import React, { useState, useRef } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import Logo from "../../../public/images/logo.png";
import Search from "../../svg/search.jsx";
import { useSelector } from "react-redux";
import SearchMenu from "./SearchMenu.jsx";
import clickOutSide from "../../helper/clickOutSide.js";
import UserMenu from "./userMenu/index.jsx";
import Home from "../../svg/home.jsx";
const Header= ({page,getAllPosts}) => {
  const user = useSelector((state) => state.user);
  const color = "#65676b";

  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const [showuserMenu, setShowUserMenu] = useState(false);

  const allMenu = useRef();

  clickOutSide(allMenu, () => {
    setShowMenu(false);
  });
  
  const usermenu = useRef();
  clickOutSide(usermenu, () => {
    setShowUserMenu(false);
  });
  return (
    <header>
      <div className="header_left">
        <Link to="/" className="header_logo">
          <div className="circle">
            <img src={Logo} alt=""/>
          </div>
        </Link>
        <div className="search search1" onClick={() => setShowSearchMenu(true)}>
          <Search color={color} />
          <input
            type="text"
            placeholder="Search"
            className="hide_input"
          />
        </div>
      </div>
      {showSearchMenu && (
        <SearchMenu setShowSearchMenu={setShowSearchMenu} color={color} />
      )}
      <div className="header_middle">
        <Link to="/" className="middle_icon" onClick={getAllPosts}>
         {page === 'home'? <i className="fa-solid fa-house"></i>:<Home color={color}/>}
        </Link>
      </div>
      <div className="header_right">
        <Link to="/profile" className={`profile_link hover1 ${page === "profile" ? "active_link":""}`}>
          <img src={user?.picture} alt="user_img" />
          <span>{user?.first_name}</span>
        </Link>
        <div className="circle_icon hover1" ref={usermenu}>
          <div onClick={() => setShowUserMenu((prev) => !prev)}>
            {/* <ArrowDown />
             */}
             <i className="fa-solid fa-droplet"></i>
          </div>
          {showuserMenu && <UserMenu user={user} />}
        </div>
      </div>
    </header>
  );
};

export default Header;
