import React, { useState, useRef } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import Logo from "../../svg/logo.jsx";
import Search from "../../svg/search.jsx";
import HomeActive from "../../svg/homeActive.jsx";
import Friends from "../../svg/friends.jsx";
import Market from "../../svg/market.jsx";
import Gaming from "../../svg/gaming.jsx";
import Watch from "../../svg/watch.jsx";
import Menu from "../../svg/menu.jsx";
import ArrowDown from "../../svg/arrowDown.jsx";
import Messenger from "../../svg/messenger.jsx";
import Notification from "../../svg/notifications.jsx";

import { useSelector } from "react-redux";
import SearchMenu from "./SearchMenu.jsx";
import AllMenu from "./AllMenu.jsx";
import clickOutSide from "../../helper/clickOutSide.js";
import UserMenu from "./userMenu/index.jsx";
import Home from "../../svg/home.jsx";
const Header = ({page}) => {
  const user = useSelector((state) => state.user);
  const color = "#65676b";

  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const [showAllMenu, setShowMenu] = useState(false);
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
            <Logo />
          </div>
        </Link>
        <div className="search search1" onClick={() => setShowSearchMenu(true)}>
          <Search color={color} />
          <input
            type="text"
            placeholder="Search Facebook"
            className="hide_input"
          />
        </div>
      </div>
      {showSearchMenu && (
        <SearchMenu setShowSearchMenu={setShowSearchMenu} color={color} />
      )}
      <div className="header_middle">
        <Link to="/" className={`middle_icon ${page === 'home'?"active":"hover1"}`}>
         {page === 'home'? <HomeActive />:<Home color={color}/>}
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Friends color={color} />
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Watch color={color} />
          <div className="middle_notification">8+</div>
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Market color={color} />
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Gaming color={color} />
        </Link>
      </div>
      <div className="header_right">
        <Link to="/profile" className={`profile_link hover1 ${page === "profile" ? "active_link":""}`}>
          <img src={user?.picture} alt="user_img" />
          <span>{user?.first_name}</span>
        </Link>
        <div className={`circle_icon hover1  ${showAllMenu && 'active_header'}`} ref={allMenu}>
          <div onClick={() => setShowMenu((prev) => !prev)}>
            <Menu />
          </div>
          {showAllMenu && <AllMenu />}
        </div>
        <div className="circle_icon hover1">
          <Messenger />
        </div>
        <div className="circle_icon hover1">
          <Notification />
          <div className="right_notification">8</div>
        </div>
        <div className="circle_icon hover1" ref={usermenu}>
          <div onClick={() => setShowUserMenu((prev) => !prev)}>
            <ArrowDown />
          </div>
          {showuserMenu && <UserMenu user={user} />}
        </div>
      </div>
    </header>
  );
};

export default Header;
