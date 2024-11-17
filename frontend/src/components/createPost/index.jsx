import "./style.css";
const CreatePost = ({ setVisible, user, profile }) => {
  return (
    <div className="createPost" onClick={() => setVisible(true)}>
      <div className="createPost_header">
        <img src={user?.picture} alt="" />
        <div className="open_post hover1">
          What do you want to tell us, {user?.first_name}
        </div>
      </div>
      <div className="createPost_body">
        <div className="createPost_icon hover1">
        <i className="fa-solid fa-photo-film"></i>
          Photo/Video
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
