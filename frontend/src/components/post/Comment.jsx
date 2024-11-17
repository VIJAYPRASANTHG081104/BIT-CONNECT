import Moment from "react-moment";
import { deleteComment } from "../../functions/post";

const Comment = ({
  comment,
  username,
  postId,
  token,
//   setCount,
//   setComments,
}) => {
  const handleDelete = async () => {
    const data = await deleteComment(postId, comment._id, token);
  };
  return (
    <div className="comment">
      <img src={comment.commentBy?.picture} alt="" className="comment_img" />
      <div className="comment_col">
        <div className="comment_wrap">
          <div className="comment_name">
            {comment.commentBy?.first_name} {comment.commentBy?.last_name}
          </div>
          <div className="comment_text">{comment.comment}</div>
        </div>
        {comment.image && (
          <img src={comment.image} alt="" className="comment_image" />
        )}
        <div className="comment_actions">
          <span>Like </span>
          <span>Reply </span>
          <span>
            <Moment fromNow interval={30}>
              {comment.commentAt}
            </Moment>
          </span>
        </div>
      </div>
      {username === comment.commentBy.username && (
        <div className="delete hover1" onClick={handleDelete}>
          <i className="fa-solid fa-trash"></i>
        </div>
      )}
    </div>
  );
};

export default Comment;
