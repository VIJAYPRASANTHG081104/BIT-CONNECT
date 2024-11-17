const postModel = require("../models/post");
const userModel = require("../models/userModel");
const createPost = async (req, res) => {
  try {
    const post = await new postModel(req.body).save();
    await post.populate("user", "first_name last_name cover picture username");
    res.status(200).send(post);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const getAllPost = async (req, res) => {
  try {
    const data = await postModel
      .find()
      .populate("user", "first_name last_name picture username gender")
      .sort({
        createdAt: "desc",
      });
    return res.status(200).send(data);

    // const followingTemp = await userModel
    //   .findById(req.user.id)
    //   .select("following");
    // const following = followingTemp.following;
    // const promises = following.map((user) => {
    //   return postModel
    //     .find({ user: user })
    //     .populate("user", "first_name last_name picture username cover")
    //     .populate("comments.commentBy", "first_name last_name picture username")
    //     .sort({ createdAt: -1 })
    //     .limit(10);
    // });

    // const followingPost = await Promise.all(promises).flat();
    // console.log(followingPost)
    // const userPost = await postModel
    //   .find({ user: req.user.id })
    //   .populate("user", "first_name last_name picture username cover")
    //   .populate("comments.commentBy", "first_name last_name picture username")
    //   .sort({ createdAt: -1 })
    //   .limit(10);
    //   console.log(userPost);
    //   followingPost.push(...[...userPost]);
    //   followingPost.sort((a,b)=>{
    //     return b.createdAt - a.createdAt;
    //   })
    //   return res.status(200).send(followingPost);
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

const comment = async (req, res) => {
  console.log(req.user.id);
  try {
    const { comment, image, postId } = req.body;

    let newComments = await postModel
      .findByIdAndUpdate(
        postId,
        {
          $push: {
            comments: {
              comment: comment,
              image: image,
              commentBy: req.user.id,
              commentAt: new Date(),
            },
          },
        },
        { new: true }
      )
      .populate("comments.commentBy", "first_name picture username");
    // console.log(newComments)
    return res.status(200).send(newComments.comments);
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};
const deleteComment = async (req, res) => {
  try {
    const { postId, commentId } = req.body;
    const deletedData = await postModel.findByIdAndUpdate(
      postId,
      {
        $pull: {
          comments: { _id: commentId },
        },
      },
      { new: true }
    );
    return res.status(200).send(deletedData.comments);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      message: error.message,
    });
  }
};

const savePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const user = await userModel.findById(req.user.id);
    const check = user?.savedPosts.find(
      (post) => post.post.toString() == postId
    );
    if (check) {
      await userModel.findByIdAndUpdate(req.user.id, {
        $pull: {
          savedPosts: {
            _id: check._id,
          },
        },
      });
    } else {
      await userModel.findByIdAndUpdate(req.user.id, {
        $push: {
          savedPosts: {
            post: postId,
            savedAt: new Date(),
          },
        },
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

const deletePost = async (req, res) => {
  try {
    console.log("heheheheh");
    const data = await postModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({ status: "ok" });
  } catch (error) {}
};

module.exports = {
  createPost,
  getAllPost,
  comment,
  deleteComment,
  savePost,
  deletePost,
};
