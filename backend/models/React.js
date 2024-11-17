const mongoose = require("mongoose");

const reactSchema = new mongoose.Schema({
  react: {
    type: String,
    enum: ["like", "love", "haha", "sad", "angry", "wow"],
    required: true,
  },
  postRef: {
    type: mongoose.Schema.ObjectId,
    ref: "post",
  },
  reactBy: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
  },
});

const react = mongoose.model("Reacts", reactSchema);

module.exports = react;
