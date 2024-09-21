import { useRef, useState } from "react";
import ProfilePicture from "../../components/profilePicture";

const ProfilePictureInfos = ({ profile, vistor, photos, othername }) => {
  const [show, setShow] = useState(false);
  const pRef = useRef(null);
  // console.log(pRef)
  const changePicture = (pictureUrl) => {
    pRef.current.style.backgroundImage = `url(${pictureUrl})`;
  };
  return (
    <div className="profile_img_wrap">
      {show && (
        <ProfilePicture
          photos={photos}
          changePicture={changePicture}
          setShow={setShow}
        />
      )}
      <div className="profile_w_left">
        <div className="profile_w_img">
          <div
            ref={pRef}
            className="profile_w_bg"
            style={{
              backgroundSize: "cover",
              backgroundImage: `url(${profile.picture})`,
            }}
          ></div>
          {!vistor && (
            <div
              className="profile_circle hover1"
              onClick={() => setShow(true)}
            >
              <i className="camera_filled_icon"></i>
            </div>
          )}
        </div>
        <div className="profile_w_col">
          <div className="profile_name">
            {profile.first_name} {profile.last_name}
            <div className="othername">{othername && `(${othername})`}</div>
          </div>
          <div className="profile_friend_count"></div>
          <div className="profile_friend_imgs"></div>
        </div>
      </div>
      {vistor ? (
        ""
      ) : (
        <div className="profile_w_right">
          <div className="blue_btn">
            <img src="../../../icons/plus.png" alt="" className="invert" />
            <span>Add to story</span>
          </div>
          <div className="gray_btn">
            <i className="edit_icon"></i>
            <span>Edit profile</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePictureInfos;
