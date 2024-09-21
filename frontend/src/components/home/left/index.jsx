import React, { useState } from "react";
import "./style.css";
import LeftLink from "./leftLink";
import { left } from "../../../data/home";
import { Link } from "react-router-dom";
import ArrowDow1 from "../../../svg/arrowDow1";
import Shortcut from "./shortcut.jsx";
const HomeLeft = ({ user }) => {
  const [visible, setVisible] = useState(false);
  return (
    <div className="left_home scrollbar">
      <Link to="/profile" className="left_link hover1">
        <img src={user?.picture} alt="" />
        <span>
          {user?.first_name}
          {user?.last_name}
        </span>
      </Link>
      {left.slice(0, 8).map((link, i) => {
        return (
          <LeftLink
            key={i}
            img={link.img}
            text={link.text}
            notification={link?.notification}
          />
        );
      })}
      {!visible && (
        <div className="left_link  hover1" onClick={()=>{
            setVisible(true)
        }}>
          <div className="small_circle">
            <ArrowDow1 />
          </div>
          <span>See more</span>
        </div>
      )}
      {visible && (
        <div className="more_left">
          {left.slice(8, left.length).map((link, i) => {
            return (
              <LeftLink
                key={i}
                img={link.img}
                text={link.text}
                notification={link?.notification}
              />
            );
          })}
          <div className="left_link hover1" onClick={()=>{
            setVisible(false)
        }}>
            <div className="small_circle rotate360">
              <ArrowDow1 />
            </div>
            <span>Show less</span>
          </div>
        </div>
      )}
      <div className="splitter"></div>
      <div className="shortcut">
        <div className="heading">
            Your Shortcuts
        </div>
        <div className="edit_shortcut">
            edit
        </div>
      </div>
      <div className="shortcut_list">
        <Shortcut
             link="http://www.google.com"
             img='../../images/ytb.png'
             name="Youtube"
        />
        <Shortcut
             link="http://www.google.com"
             img='../../images/insta.png'
             name="Intagram"
        />
      </div>
      <div className= {`fb_copyright ${visible && "relative_fb_copyright"}`}>
        <Link to={'/'}>Privacy </Link><span>.</span>
        <Link to={'/'}>Terms </Link><span>.</span>
        <Link to={'/'}>Advertising </Link><span>.</span>
        <Link to={'/'}>Ad Choices <i className="ad_choices_icon"></i></Link><span>.</span>
        <Link to={'/'}>Cookies </Link><span>.</span>
        <Link to={'/'}>More </Link><span>.</span><br/>
        Andio@2024
      </div>
    </div>
  );
};

export default HomeLeft;
