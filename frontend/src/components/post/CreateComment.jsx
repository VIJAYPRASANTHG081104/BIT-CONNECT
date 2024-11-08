import EmojiPicker from "emoji-picker-react";
import React, { useEffect, useState,useRef } from "react";


const CreateComment = ({ user }) => {
  const imgInput = useRef(null);
  const textRef = useRef(null);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [picker, setPicker] = useState(false);
  const [cursorPosition, setCursorPosition] = useState();
  const [commentImage, setCommentImage] = useState("");

  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);

  const handleEmoji = (e) => {
    const ref = textRef.current;
    ref.focus();
    const start = text.substring(0, ref.selectionStart);
    const end = text.substring(ref.selectionStart);
    const newText = start + e.emoji + end;
    setText(newText);
    setCursorPosition(start.length + emoji.length);
  };

  const handleImage = (e) => {
    let file = e.target.files[0];
    if (
      file.type !== "image/png" &&
      file.type !== "image/jpeg" &&
      file.type !== "image/webp" &&
      file.type !== "image/gif"
    ) {
      setError(`${file.name} type is not supported...`);
      return;
    } else if (file.size > 1024 * 1024 * 5) {
      setError(`${file.name} size is high...`);
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload=(event) => {
      setCommentImage(event.target.result);
    };
   
  };
  return (
    <div className="comments_wrap">
      <div className="create_comment">
        <img src={user?.picture} alt="" />
        <div className="comment_input_wrap">
          {picker && (
            <div className="comment_emoji_picker">
              <EmojiPicker onEmojiClick={handleEmoji} />
            </div>
          )}
          <input
            accept="image/png,image/gif,image/jpeg,image/webp"
            type="file"
            ref={imgInput}
            hidden
            onChange={(e)=>handleImage(e)}
          />
          {
            error && (
                <div className="postError comment_error">
                    <div className="postError_error">{error}</div> 
                    <button className="blue_btn" onClick={()=>setError("")}>Try again</button>
                </div> 
            )
          }
          <input
            type="text"
            ref={textRef}
            value={text}
            placeholder="Write a comment..."
            onChange={(e) => setText(e.target.value)}
          />
          <div
            className="comment_circle_icon hover3"
            onClick={() => {
              setPicker((prev) => !prev);
            }}
          >
            <i className="emoji_icon"></i>
          </div>
          <div className="comment_circle_icon hover2" onClick={()=>imgInput.current.click()}>
            <i className="camera_icon"></i>
          </div>
          <div className="comment_circle_icon hover2">
            <i className="gif_icon"></i>
          </div>
          <div className="comment_circle_icon hover2">
            <i className="sticker_icon"></i>
          </div>
        </div>
      </div>
      {
        commentImage && (
            <div className="comment_img_preview">
                <img src={commentImage}  alt=""/>
                <div className="small_white_circle" onClick={()=>setCommentImage("")}>
                    <i className="fa-solid fa-x"></i>
                </div>
            </div>
        )
      }
    </div>
  );
};

export default CreateComment;
