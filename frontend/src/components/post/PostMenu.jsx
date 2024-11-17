import { useRef, useState } from "react";
import MenuItem from "./MenuItem";
import useOnClickOutside from "../../helper/clickOutSide";
import { deletePost, savePost } from "../../functions/post";
import { saveAs } from "file-saver";

const PostMenu = ({
  postUserId,
  userId,
  imagesLength,
  setShowMenu,
  postId,
  token,
  setCheckSaved,
  checkSaved,
  images,
  postRef,
}) => {
  const [test, setTest] = useState(postUserId === userId ? true : false);
  console.log(checkSaved);
  const menu = useRef(null);
  useOnClickOutside(menu, () => setShowMenu(false));
  const saveHandler = async () => {
    savePost(postId, token);
    if (checkSaved) {
      setCheckSaved(false);
    } else {
      setCheckSaved(true);
    }
  };

  const downloadImages = () => {
    images.map((img) => {
      saveAs(img.url, "image.jpg");
    });
  };

  const deleteHandler = async () => {
    const res = await deletePost(postId, token);
    if (res.status === "ok") {
      postRef.current.style.display = "none";
    }
  };
  return (
    <ul className="post_menu" ref={menu}>
      <div onClick={() => saveHandler()}>
        {checkSaved ? (
          <MenuItem
            icon="save_icon"
            title="Unsave Post"
            subtitle="Remove this from your saved items."
          />
        ) : (
          <MenuItem
            icon="save_icon"
            title="Save Post"
            subtitle="Add this to your saved items."
          />
        )}
      </div>
      <div className="line"></div>
    
      {imagesLength && (
        <div onClick={() => downloadImages()}>
          <MenuItem icon="download_icon" title="Download" />
        </div>
      )}
      {imagesLength && (
        <MenuItem icon="fullscreen_icon" title="Enter Fullscreen" />
      )}
      
      {test && (
        <div onClick={deleteHandler}>
          <MenuItem
            icon="trash_icon"
            title="Move to trash"
            subtitle="items in your trash are deleted after 30 days"
          />
        </div>
      )}
      {!test && <div className="line"></div>}
    </ul>
  );
};

export default PostMenu;
