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
      {/*  */}
    </div>
  );
};

export default HomeLeft;
