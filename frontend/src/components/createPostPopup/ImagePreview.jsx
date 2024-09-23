import { useRef } from "react";
import EmojiPickerBackground from "./EmojiPickerBackground";

const ImagePreview = ({
  text,
  user,
  setText,
  images,
  setImages,
  setShowPrev,
  setError
}) => {
  const ImageInput = useRef(null);
  const handleImage = (e) => {
    let files = Array.from(e.target.files);
    files.forEach((img) => {
      if (
        img.type !== "image/jpeg" &&
        img.type !== "image/png" &&
        img.type !== "image/gif" &&
        img.type !== "image/webp"
      ) {
        setError(
          `${img.name} format is unsupported! `
        );
        files = files.filter((item)=>item.name != item.name);
        return ;
      }
      else if(img.size>1024*1024 *5){
        setError(`${img.size} is size is too high`)
      }
    });
    files.forEach((img) => {
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = (e) => {
        setImages((images) => [...images, e.target.result]);
      };
    });
  };
  return (
    <div className="overflow_a scrollbar">
      <EmojiPickerBackground text={text} user={user} setText={setText} type2 />
      <div className="add_pics_wrap">
        <input
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp,image/gif"
          hidden
          ref={ImageInput}
          onChange={handleImage}
        />
        {images && images.length ? (
          <div className="add_pics_inside1 p0">
            <div className="preview_actions">
              <button>
                <i className="edit_icon"></i>
                Edit
              </button>
              <button onClick={() => ImageInput.current.click()}>
                <i className="addPhoto_icon"></i>
                Add Photos/Videos
              </button>
            </div>
            <div className="small_white_circle" onClick={() => setImages([])}>
              <i className="fa-solid fa-x"></i>
            </div>
            <div
              className={`${
                images.length === 1
                  ? "preview1"
                  : images.length === 2
                  ? "preview2"
                  : images.length === 3
                  ? "preview3"
                  : images.length === 4
                  ? "preview4"
                  : images.length === 5
                  ? "preview5"
                  : images.length % 2 === 0
                  ? "preview6"
                  : "preview6 singular_grid"
              }`}
            >
              {images.map((img, i) => {
                return <img src={img} key={i} alt="" />;
              })}
            </div>
          </div>
        ) : (
          <div className="add_pics_inside1">
            <div
              className="small_white_circle"
              onClick={() => setShowPrev(true)}
            >
              <i className="fa-solid fa-x"></i>
            </div>
            <div className="add_col" onClick={() => ImageInput.current.click()}>
              <div className="add_circle">
                <i className="addPhoto_icon"></i>
              </div>
              <span>Add Photo/Videos</span>
              <span>or drag and drop</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImagePreview;
