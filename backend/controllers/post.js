const postModel = require("../models/post");
const createPost = async (req, res) => {
  console.log("heheeheheh"+req.body);
  try {
    const post = await new postModel(req.body).save();
    res.status(200).send({ msg: "Post created", post: post });
  } catch (error) {
    return res.status(500).send({ msg: error.message });
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
  } catch (error) {
    return res.status(500).send({
      msg: error.message,
    });
  }
};

module.exports = {
  createPost,
  getAllPost,
};
