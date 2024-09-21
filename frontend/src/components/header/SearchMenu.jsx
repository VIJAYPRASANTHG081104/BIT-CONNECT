import React, { useEffect, useRef, useState } from "react";
import Return from "../../svg/return.jsx";
import Search from "../../svg/search";
import clickOutSide from "../../helper/clickOutSide.js";
const SearchMenu = ({ color, setShowSearchMenu }) => {
  const [iconVisible, setIconVisible] = useState(true);
  const menu = useRef(null);
  const input = useRef(null);

  clickOutSide(menu, () => {
    setShowSearchMenu(false);
  });
  useEffect(()=>{
    input.current.focus();
  },[])
  return (
    <div className="header_left search_area scrollbar" ref={menu}>
      <div className="search_wrap">
        <div className="header_logo">
          <div className="circle hover1" onClick={()=>setShowSearchMenu(false)}>
            <Return color={color} />
          </div>
        </div>
        <div
          className="search"
          onClick={() => {
            input.current.focus();
          }}
        >
          {iconVisible && (
            <div>
              <Search color={color} />
            </div>
          )}
          <input type="text" placeholder="search Facebook" ref={input} onBlur={()=>setIconVisible(true)} onFocus={()=>setIconVisible(false)}/>
        </div>
      </div>
      <div className="search_history_header">
        <span>Recent search</span>
        <a>Edit</a>
      </div>
      <div className="search_history"></div>
      <div className="search_result_scrollbar"></div>
    </div>
  );
};

export default SearchMenu;
