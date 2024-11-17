const ReactModel = require("../models/React");
const mongoose = require("mongoose");
const userModel = require("../models/userModel");
const reactPost = async (req, res) => {
  try {
    const { postId, react } = req.body;
    const check = await ReactModel.findOne({
      postRef: postId,
      reactBy: new mongoose.Types.ObjectId(req.user.id),
    });
    if (check == null) {
      const newReact = new ReactModel({
        react: react,
        postRef: postId,
        reactBy: req.user.id,
      });
      await newReact.save();
    } else {
      if (check.react == react) {
        await ReactModel.findByIdAndDelete(check._id);
      } else {
        await ReactModel.findByIdAndUpdate(
          check._id,
          {
            react: react,
          },
          { new: true }
        );
      }
    }
    return res.status(200).send({});
  } catch (error) {
    return res.status(500).send({ err: error.message });
  }
};

const getReacts = async (req, res) => {
  try {
    const reactsArray = await ReactModel.find({
      postRef: req.params.id,
    });

    // const check = await ReactModel.findOne({
    //   postRef: req.params.id,
    //   reactBy: req.user.id,
    // });
    const check = reactsArray.find((x) => x.reactBy.toString() == req.user.id);
    const newReacts = reactsArray.reduce((group, react) => {
      let key = react["react"];
      group[key] = group[key] || [];
      group[key].push(react);
      return group;
    }, {});
    const reacts = [
      {
        react: "like",
        count: newReacts.like ? newReacts.like.length : 0,
      },
      {
        react: "love",
        count: newReacts.love ? newReacts.love.length : 0,
      },
      {
        react: "haha",
        count: newReacts.haha ? newReacts.haha.length : 0,
      },
      {
        react: "sad",
        count: newReacts.sad ? newReacts.sad.length : 0,
      },
      {
        react: "wow",
        count: newReacts.wow ? newReacts.wow.length : 0,
      },
      {
        react: "angry",
        count: newReacts.angry ? newReacts.angry.length : 0,
      },
    ];

    const user = await userModel.findById(req.user.id);
    const checkSaved = user?.savedPosts.find(
      (x) => x.post.toString() === req.params.id
    );
    return res
      .status(200)
      .send({
        reacts,
        check: check?.react,
        total: reactsArray.length,
        checkSaved: checkSaved ? true : false,
      });
  } catch (error) {}
};

module.exports = {
  reactPost,
  getReacts,
};
