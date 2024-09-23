import React, { useRef } from "react";
import { useSelector } from "react-redux";
import clickOutSide from "../../helper/clickOutSide";

const OldCovers = ({ photos, setCoverPicture, setShow }) => {
  const user = useSelector((state) => state.user);
  const ref = useRef(null);
  clickOutSide(ref, () => setShow(false));

  return (
    <div className="blur">
      <div className="postBox selectCoverBox" ref={ref}>
        <div className="box_header">
          <div className="small_circle" onClick={() => setShow(false)}>
            <i className="fa-solid fa-x"></i>
          </div>
          <span>Select photo</span>
        </div>
        <div className="selectCoverBox_links">
          <div className="selectCoverBox_link">Recent Photos</div>
          <div className="selectCoverBox_link">Photo Albums</div>
        </div>
        <div className="old_pictures_wrap scrollbar">
          <div className="old_pictures">
            {photos &&
              photos
                .filter(
                  (img) => img.folder === `${user.username}/cover_pictures`
                )
                .map((img) => (
                  <img
                    src={img.secure_url}
                    key={img.public_id}
                    alt={img.filename}
                    style={{ width: "100px" }}
                    onClick={() => {
                      setCoverPicture(img.secure_url);
                      setShow(false);
                    }}
                  />
                ))}
          </div>
          <div className="old_pictures">
            {photos &&
              photos
                .filter((img) => img.folder !== `${user.username}/post_images`)
                .map((img) => (
                  <img
                    src={img.secure_url}
                    key={img.public_id}
                    alt={img.filename}
                    style={{ width: "100px" }}
                    onClick={() => {
                      setCoverPicture(img.secure_url);
                      setShow(false);
                    }}
                  />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OldCovers;
