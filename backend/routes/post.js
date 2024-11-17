const express = require("express");
const {
  createPost,
  getAllPost,
  comment,
  deleteComment,
  savePost,
  deletePost
} = require("../controllers/post");

const { authUser } = require("../middlewares/auth");

const router = express.Router();

router.post("/createpost", authUser, createPost);
router.get("/getallpost", authUser, getAllPost);
router.put("/comment", authUser, comment);
router.put("/deleteComment", authUser, deleteComment);
router.put("/savePost/:id", authUser, savePost);
router.delete("/deletePost/:id", authUser, deletePost);


module.exports = router;
