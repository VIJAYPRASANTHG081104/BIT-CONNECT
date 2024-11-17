import React, { useState, useEffect, useReducer, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { profileReducer } from "../../functions/reducer";
import axios from "axios";
import Header from "../../components/header";
import Cover from "./Cover";
import "./style.css";
import ProfilePictureInfos from "./ProfilePictureInfos";
import ProfileMenu from "./ProfileMenu";
import CreatePost from "../../components/createPost/index";
import Post from "../../components/post/index";
import Friends from "./Friends";
import { useMediaQuery } from "react-responsive";
import Intro from "../../components/intro";
import CreatePostPopup from "../../components/createPostPopup";

const Profile = ({getAllPosts}) => {
  const [visible,setVisible] = useState(false);
  const navigate = useNavigate();
  const [othername, setOtherName] = useState();
  const user = useSelector((state) => state.user);
  const { username } = useParams();
  const [photos, setPhotos] = useState({});
  var userName = username === undefined ? user.username : username;
  const [{ loading, error, profile }, dispatch] = useReducer(profileReducer, {
    loading: false,
    profile: {},
    error: "",
  });
  console.log(profile);
  const path = `${userName}/*`;
  const max = 30;
  const sort = "desc";
  useEffect(() => {
    getProfile();
  }, [userName]);
  useEffect(() => {
    setOtherName(profile?.details?.otherName);
  }, [profile]);
  var vistor = userName == user.username ? false : true;
  const getProfile = async () => {
    try {
      dispatch({
        type: "PROFILE_REQUEST",
      });
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BACKEND_URL}/getProfile/${userName}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (data.ok == false) {
        navigate("/profile");
      } else {
        try {
          const { data } = await axios.post(
            `${import.meta.env.VITE_API_BACKEND_URL}/listImages`,
            { path, sort, max },
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          setPhotos(data);
        } catch (error) {
          console.log(error);
        }
        dispatch({
          type: "PROFILE_SUCCESS",
          payload: data,
        });
      }
    } catch (error) {
      dispatch({
        type: "PROFILE_ERROR",
        payload: error.response.data.message,
      });
    }
  };
  const profileTop = useRef(null);
  const leftSide = useRef(null);
  const [height, setHeight] = useState();
  const [leftHeight, setLeftHeight] = useState();
  const [scrollHeight, setScrollHeight] = useState();
  useEffect(() => {
    setHeight(profileTop.current.clientHeight + 300);
    setLeftHeight(leftSide.current.clientHeight);
    window.addEventListener("scroll", getScroll, { passive: true });
  }, [loading, scrollHeight]);
  const check = useMediaQuery({
    query: "(min-width:901px)",
  });
  const getScroll = () => {
    setScrollHeight(window.scrollY);
  };
  return (
    <div className="profile">
      {visible && (
        <CreatePostPopup
          setVisible={setVisible}
          user={user}
          post={profile?.post}
          dispatch={dispatch}
          profile
        />
      )}
      <Header page={"profile"} getAllPosts={getAllPosts}/>
      <div className="profile_top" ref={profileTop}>
        <div className="profile_container">
          <Cover
            cover={profile.cover}
            vistor={vistor}
            photos={photos.resources}
          />
          <ProfilePictureInfos
            photos={photos.resources}
            profile={profile}
            vistor={vistor}
            othername={othername}
          />
          {/* <ProfileMenu /> */}
        </div>
      </div>
      <div className="profile_bottom">
        <div className="profile_container">
          <div className="bottom_container">
            {/* <PplYouMayKnow /> */}
            <div className="profile_grid">
              <div className="profile_left" ref={leftSide}>
                <Intro
                  vistor={vistor}
                  detailss={profile.details}
                  setOtherName={setOtherName}
                />
                {/* <Photos photos={photos} /> */}
                <Friends friends={profile.friends} />
                <div className={"relative_fb_copyright"}>Andio@2024</div>
              </div>
              <div className="profile_right">
                {!vistor && (
                  <CreatePost
                    user={user}
                    profile={true}
                    setVisible={setVisible}
                  />
                )}
                <br />
                <div className="post profilePt">
                  {profile.post && profile.post.length ? (
                    profile.post.map((post, index) => {
                      return (
                        <Post
                          user={user}
                          key={post._id}
                          post={post}
                          profile={profile}
                        />
                      );
                    })
                  ) : (
                    <div className="no_post">No post available</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
