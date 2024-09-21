import { useRef, useState } from "react";
import "./style.css";
import UpdateProfilePicture from "./UpdateProfilePicture";
import clickOutSide from "../../helper/clickOutSide";
import { useSelector } from "react-redux";

const ProfilePicture = ({ setShow, changePicture, photos }) => {
  const refInput = useRef(null);
  const popUp = useRef(null);
  // clickOutSide(popUp, () => setShow(false));
  const user = useSelector((state) => state.user);
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
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
    reader.onload = (event) => {
      setImage(event.target.result);
    };
  };
  console.log(image)
  return (
    <div className="blur">
      <input
        type="file"
        ref={refInput}
        hidden
        onChange={handleImage}
        accept="image/jpeg,image/png,image/webp,image/gif"
      />
      <div className="postBox pictureBox" ref={popUp}>
        <div className="box_header">
          <div className="small_circle" onClick={() => setShow(false)}>
            <i className="exit_icon"></i>
          </div>
          <span>Update profile picture</span>
        </div>
        <div className="update_picture_wrap">
          <div className="update_picture_buttons">
            <button
              className="light_blue_btn"
              onClick={() => refInput.current.click()}
            >
              <i className="plus_icon filter_blue"></i>
              Upload photo
            </button>
            <button className="gray_btn">
              <i className="frame_icon"></i>
              Add frame
            </button>
          </div>
        </div>
        {error && (
          <div className="postError comment_error">
            <div className="postError_error">{error}</div>
            <button className="blue_btn" onClick={() => setError("")}>
              Try again
            </button>
          </div>
        )}
        <div className="old_pictures_wrap scrollbar">
          <h4>Your profile pictures</h4>
          <div className="old_pictures">
            {photos
              .filter(
                (img) => img.folder === `${user.username}/profile_pictures`
              )
              .map((img) => (
                <img
                  src={img.secure_url}
                  key={img.public_id}
                  alt={img.filename}
                  style={{width:"100px"}}
                  onClick={()=>setImage(img.secure_url)}
                />
              ))}
          </div>
          <h4>Other pictures</h4>
          <div className="old_pictures">
          {photos
            .filter((img) => img.folder !== `${user.username}/profile_pictures`)
            .map((img) => (
              <img
                src={img.secure_url}
                key={img.public_id}
                alt={img.filename}
                style={{width:"100px"}}
                onClick={()=>setImage(img.secure_url)}
              />
            ))}
          </div>
        </div>
      </div>
      {image && (
        <UpdateProfilePicture
          setImage={setImage}
          image={image}
          setError={setError}
          setShow={setShow}
          changePicture={changePicture}
        />
      )}
    </div>
  );
};

export default ProfilePicture;
