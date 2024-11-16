import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  acceptRequest,
  cancelRequest,
  deleteRequest,
  follow,
  unfollow,
} from "../../functions/user";

const FriendShip = ({ friendshipp, profileid }) => {
  //   const [friendsMenu, setFriendsMenu] = useState(true);
  //   const friendship = {
  //     friends: false,
  //     following: false,
  //     requestSent: false,
  //     requestReceived: true,
  //   };
  const user = useSelector((state) => state.user);
  const [friendship, setFriendShip] = useState(friendshipp);
  console.log(friendship);

  const addfollowHandler = async () => {
    setFriendShip({ ...FriendShip, requestSent: true });
    await follow(profileid, user.token);
  };
  const cancelRequestHandler = async () => {
    setFriendShip({ ...FriendShip, requestSent: false });
    await cancelRequest(profileid, user.token);
  };
  const acceptRequestHandler = async () => {
    setFriendShip({ ...FriendShip, requestReceived: false, following: true });
    await acceptRequest(profileid, user.token);
  };
  const deleteRequestHandler = async () => {
    setFriendShip({ ...FriendShip, requestReceived: false });
    await deleteRequest(profileid, user.token);
  };
  const unfollowRequestHandler = async () => {
    setFriendShip({ ...FriendShip, following: false });
    await unfollow(profileid, user.token);
  };
  useEffect(() => {
    setFriendShip(friendshipp);
  }, [friendshipp]);
  return (
    <div className="friendship">
      {friendship?.following ? (
        <div className="friends_menu_wrap">
          <button className="gray_btn">
            <img src="../../../icons/friends.png" alt="" />
            <span>Unfollow</span>
          </button>
        </div>
      ) : !friendship?.requestSent && !friendship?.requestReceived ? (
        <div className="friends_menu_wrap">
          <button className="blue_btn" onClick={addfollowHandler}>
            <img src="../../../icons/addFriend.png" className="invert" alt="" />
            <span>Follow</span>
          </button>
        </div>
      ) : friendship?.requestSent ? (
        <button className="blue_btn" onClick={cancelRequestHandler}>
          <img
            src="../../../icons/cancelRequest.png"
            className="invert"
            alt=""
          />
          <span>Cancel Request</span>
        </button>
      ) : (
        friendship?.requestReceived && (
          <div className="friendrequest">
            <button className="blue_btn" onClick={acceptRequestHandler}>
              <img
                src="../../../icons/cancelRequest.png"
                className="invert"
                alt=""
              />
              <span>Accept Request</span>
            </button>
            <button className="gray_btn" onClick={deleteRequestHandler}>
              <img src="../../../icons/cancelRequest.png" alt="" />
              <span>Delete Request</span>
            </button>
          </div>
        )
      )}
      <button className={friendship?.following ? "blue_btn" : "gray_btn"} onClick={unfollowRequestHandler}>
        <img
          src="../../../icons/message.png"
          className={friendship?.following && "invert"}
        />
        <span>Message</span>
      </button>
    </div>
  );
};

export default FriendShip;
