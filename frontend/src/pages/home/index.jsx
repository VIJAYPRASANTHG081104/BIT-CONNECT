import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/header";
import HomeLeft from "../../components/home/left";
import { useSelector } from "react-redux";
import RightHome from "../../components/home/right";
import Stories from "../../components/home/stories";
import "./style.css";
import CreatePost from "../../components/createPost";
import SendVerification from "../../components/home/sendVerification";
import Post from "../../components/post";

const Home = ({ setVisible, post, getAllPosts }) => {
  const user = useSelector((state) => state.user);
  const [height, setHeight] = useState();
  const home_middle = useRef(null);
  useEffect(() => {
    setHeight(home_middle.current.clientHeight);
  }, [post]);
  return (
    <div className="home" style={{ height: `${height + 80}px` }}>
      <Header page={"home"} getAllPosts={getAllPosts} />
      {/* <HomeLeft user={user}/> */}
      <div className="home_middle" ref={home_middle}>
        <Stories />
        <CreatePost setVisible={setVisible} user={user} />
        {user.Verfied === false && <SendVerification user={user} />}
        <br />
        {post.map((pos, index) => (
          <Post user={user} post={pos} key={index} />
        ))}
      </div>
      <RightHome user={user} />
    </div>
  );
};

export default Home;
