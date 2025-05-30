import React, { useState, useRef } from "react";
import "./style.css";
import EmojiPickerBackground from "./EmojiPickerBackground";
import AddToYourPost from "./AddToYourPost";
import ImagePreview from "./ImagePreview";
import clickOutSide from "../../helper/clickOutSide";
import PulseLoader from "react-spinners/PulseLoader";
import { createPost } from "../../functions/post";
import PostError from "./PostError";
import dataURItoBlob from "../../helper/dataURItoBlob";
import { uploadImages } from "../../functions/uploadImages";

const CreatePostPopup = ({ user, setVisible, post, dispatch, profile }) => {
  const [text, setText] = useState("");
  const [showPrev, setShowPrev] = useState(true);
  const [images, setImages] = useState([]);
  const [background, setbackground] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const popup = useRef(null);
  clickOutSide(popup, () => {
    setVisible(false);
  });
  console.log(post)
  const postSubmit = async () => {
    if (background) {
      setLoading(true);
      const res = await createPost(
        null,
        background,
        text,
        null,
        user.id,
        user.token
      );
      setLoading(false);
      if (res.status === "ok") {
        dispatch({
          type: profile ? "PROFILE_POST" : "POST_SUCCESS",
          payload: [res.data, ...post],
        });
        setbackground("");
        setText("");
        setVisible(false);
      } else {
        setError(res);
      }
    } else if (images && images.length) {
      setLoading(true);
      const postImages = images.map((img) => {
        return dataURItoBlob(img);
      });

      const path = `${user.username}/post_images`;
      const formData = new FormData();
      formData.append("path", path);
      postImages.forEach((images) => {
        formData.append("file", images);
      });
      const response = await uploadImages(formData, path, user.token);

      const res = await createPost(
        null,
        null,
        text,
        response,
        user.id,
        user.token
      );
      if (res.status === "ok") {
        dispatch({
          type: profile ? "PROFILE_POST" : "POST_SUCCESS",
          payload: [res.data, ...post],
        });
        setLoading(false);
        setText("");
        setVisible(false);
      } else {
        setError(res);
      }
    } else if (text) {
      setLoading(true);
      const res = await createPost(null, null, text, null, user.id, user.token);
      setLoading(false);
      if (res.status === "ok") {
        dispatch({
          type: profile ? "PROFILE_POST" : "POST_SUCCESS",
          payload: [res.data, ...post],
        });
        setbackground("");
        setText("");
        setVisible(false);
      }
    } else {
    }
  };
  return (
    <div className="blur">
      {error && <PostError error={error} setError={setError} />}
      <div className="postBox" ref={popup}>
        <div className="box_profile">
          <img src={user.picture} className="box_profile_img" alt="" />
          <div className="box_col">
            <div className="box_profile_name">
              {user.first_name}
              {user.last_name}
            </div>
          </div>
          <div className="small_circle" onClick={() => setVisible(false)}>
            <i className="fa-solid fa-x"></i>
          </div>
        </div>
        <br />
        {showPrev ? (
          <>
            <EmojiPickerBackground
              user={user}
              text={text}
              setText={setText}
              setbackground={setbackground}
              background={background}
              setShowPrev={setShowPrev}
            />
          </>
        ) : (
          <ImagePreview
            text={text}
            user={user}
            setText={setText}
            images={images}
            setImages={setImages}
            setShowPrev={setShowPrev}
            setError={setError}
          />
        )}
        {loading ? <PulseLoader color="#fff" size={5} /> : ""}
        <button className="post_submit" onClick={() => postSubmit()}>
          Post
        </button>
      </div>
    </div>
  );
};

export default CreatePostPopup;
