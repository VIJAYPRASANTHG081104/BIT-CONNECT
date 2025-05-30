import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import Dots from "../../svg/dots";
import ReactsPopup from "./ReactsPopup";
import CreateComment from "./CreateComment";
import PostMenu from "./PostMenu";
import { getReacts, reactPost } from "../../functions/post";
import Comment from "./Comment";

const Post = ({ post, user, profile }) => {
  const [visible, setVisible] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [reacts, setReacts] = useState();
  const [check, setCheck] = useState();
  const [total, setTotal] = useState(0);
  const [comments, setComments] = useState([]);
  const [count, setCount] = useState(1);
  const [checkSaved, setCheckSaved] = useState();

  useEffect(() => {
    getPostReacts();
  }, [post]);

  useEffect(() => {
    setComments(post?.comments);
  }, [post]);
  console.log(post);
  const getPostReacts = async () => {
    const res = await getReacts(post._id, user.token);
    setReacts(res.reacts);
    setCheck(res?.check);
    setTotal(res.total);
    setCheckSaved(res.checkSaved);
  };
  const reactHandler = async (type) => {
    reactPost(post._id, type, user.token);
    if (check == type) {
      setCheck();
      let index = reacts.findIndex((x) => x.react == check);
      if (index !== -1) {
        setReacts([...reacts, (reacts[index].count = --reacts[index].count)]);
        setTotal((prev) => --prev);
      }
    } else {
      setCheck(type);
      let index = reacts.findIndex((x) => x.react == type);
      let index1 = reacts.findIndex((x) => x.react == check);
      if (index !== -1) {
        setReacts([...reacts, (reacts[index].count = ++reacts[index].count)]);
        setTotal((prev) => ++prev);
      }
      if (index1 != -1) {
        setReacts([...reacts, (reacts[index1].count = --reacts[index1].count)]);
        setTotal((prev) => --prev);
      }
    }
  };

  const showMore = () => {
    setCount((prev) => prev + 3);
  };

  const postRef = useRef(null);
  return (
    <div
      ref={postRef}
      className="post"
      style={{ width: `${profile && "100%"}` }}
    >
      <div className="post_header">
        <Link
          to={`/profile/${post.user.username}`}
          className="post_header_left"
        >
          <img src={post.user.picture} alt="" />
          <div className="header_col">
            <div className="post_profile_name">
              {post.user.first_name} {post.user.last_name}
              <div className="updated_p">
                {post.type == "profilePicture" &&
                  `updated ${
                    post.user.gender === "male" ? "his" : "her"
                  } profile picture`}
                {post.type == "coverPicture" &&
                  `updated ${
                    post.user.gender === "male" ? "his" : "her"
                  } cover picture`}
              </div>
            </div>
            <div className="post_profile_privacy_date">
              <Moment fromNow interval={30}>
                {post.createdAt}
              </Moment>
            </div>
          </div>
        </Link>
        <div
          className="post_header_right hover1"
          onClick={() => setShowMenu((prev) => !prev)}
        >
          <Dots color="#828387" />
        </div>
      </div>
      {post.background ? (
        <div
          className="post_bg"
          style={{ backgroundImage: `url(${post.background})` }}
        >
          <div className="post_bg_text">{post.text}</div>
        </div>
      ) : post.type === null ? (
        <>
          <div className="post_text">{post.text}</div>
          {post.images && post.images.length && (
            <div
              className={
                post.images.length === 1
                  ? "grid_1"
                  : post.images.length === 2
                  ? "grid_2"
                  : post.images.length === 3
                  ? "grid_3"
                  : post.images.length === 4
                  ? "grid_4"
                  : post.images.length >= 5 && "grid_5"
              }
            >
              {post.images.slice(0, 5).map((image, i) => (
                <img src={image.url} key={i} alt="" className={`img-${i}`} />
              ))}
              {post.images.length > 5 && (
                <div className="more-pics-shadow">
                  +{post.images.length - 5}
                </div>
              )}
            </div>
          )}
        </>
      ) : post.type === "profilePicture" ? (
        <div className="post_profile_wrap">
          <div className="post_updated_bg">
            <img src={post.user.cover} alt="" />
          </div>
          <img
            src={post.images[0].url}
            alt=""
            className="post_updated_picture"
          />
        </div>
      ) : (
        <div className="post_cover_wrap">
          <img src={post.images[0].url} alt="" />
        </div>
      )}
      <div className="post_infos">
        <div className="reacts_count">
          <div className="reacts_count_imgs">
            {reacts &&
              reacts.sort((a, b) => {
                return b.count - a.count;
              }) &&
              reacts
                .slice(0, 3)
                .map(
                  (react, index) =>
                    react.count > 0 && (
                      <img
                        src={`../../../reacts/${react.react}.svg`}
                        key={index}
                        alt=""
                      />
                    )
                )}
          </div>
          <div className="reacts_count_num">{total && total}</div>
        </div>
        <div className="to_right">
          <div className="comments_count">{comments.length} comments</div>
          <div className="share_count">1 share</div>
        </div>
      </div>
      <div className="post_actions">
        <ReactsPopup
          visible={visible}
          setVisible={setVisible}
          postId={post._id}
          check={check}
          setCheck={setCheck}
          reactHandler={reactHandler}
        />
        <div
          className="post_action hover1"
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
          onClick={() => reactHandler(check ? check : "like")}
        >
          {check ? (
            <img
              src={`../../../reacts/${check}.svg`}
              alt=""
              className="small_react"
              style={{
                width: "10px",
              }}
            />
          ) : (
            <i className="fa-regular fa-thumbs-up"></i>
          )}
          <span
            style={{
              textTransform: "capitalize",
              color: `${
                check === "like"
                  ? "#4267b2"
                  : check === "love"
                  ? "#f63459"
                  : check === "haha"
                  ? "#f7b125"
                  : check === "sad"
                  ? "#f7b125"
                  : check === "wow"
                  ? "#f7b125"
                  : check === "angry"
                  ? "#e4605a"
                  : ""
              }`,
            }}
          >
            {check ? check : "Like"}
          </span>
        </div>
        <div className="post_action hover1">
          <i className="fa-regular fa-comment"></i>
          <span>Comment</span>
        </div>
        <div className="post_action hover1">
          <i className="fa-solid fa-share"></i>
          <span>Share</span>
        </div>
      </div>
      <div className="comments_wrap">
        <div className="comments_order"></div>
        <CreateComment
          user={user}
          postId={post._id}
          setComments={setComments}
          setCount={setCount}
        />
        {comments &&
          comments
            .sort((a, b) => {
              return new Date(b.commentAt) - new Date(a.commentAt);
            })
            .slice(0, count)
            .map((comment, index) => (
              <Comment
                token={user.token}
                postId={post._id}
                username={user.username}
                comment={comment}
                key={index}
                setCount={setCount}
                setComments={setComments}
              />
            ))}
        {count < comments.length && (
          <div className="view_comments" onClick={showMore}>
            View more comments
          </div>
        )}
      </div>
      {showMenu && (
        <PostMenu
          userId={user.id}
          postUserId={post.user._id}
          imagesLength={post?.images?.length}
          setShowMenu={setShowMenu}
          postId={post._id}
          token={user.token}
          setCheckSaved={setCheckSaved}
          checkSaved={checkSaved}
          images={post.images}
          postRef={postRef}
        />
      )}
    </div>
  );
};

export default Post;
