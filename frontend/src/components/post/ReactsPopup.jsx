import React, { useState } from "react";
const ReactsPopup = ({ visible, setVisible,reactHandler}) => {
  const reactArray = [
    {
      name: "like",
      image: "../../../public/reacts/like.gif",
    },
    {
      name: "love",
      image: "../../../public/reacts/love.gif",
    },
    {
      name: "haha",
      image: "../../../public/reacts/haha.gif",
    },
    {
      name: "wow",
      image: "../../../public/reacts/wow.gif",
    },
    {
      name: "sad",
      image: "../../../public/reacts/sad.gif",
    },
    {
      name: "angry",
      image: "../../../public/reacts/angry.gif",
    },
  ];

  return (
    <>
      {visible && (
        <div
          className="reacts_popup"
          onMouseOver={() => {
            setTimeout(() => {
              setVisible(true);
            }, 500);
          }}
          onMouseLeave={() => {
            setTimeout(() => {
              setVisible(false);
            }, 500);
          }}
        >
          {reactArray.map((react, i) => (
            <div
              className="react"
              key={i}
              onClick={() => reactHandler(react.name)}
            >
              <img src={react.image} alt="" />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ReactsPopup;
