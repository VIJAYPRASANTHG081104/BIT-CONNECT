const express = require('express');
const {createPost,getAllPost} = require("../controllers/post");

const {authUser} = require("../middlewares/auth");

const router = express.Router();

router.post("/createpost",authUser,createPost);

router.get("/getallpost",getAllPost);

module.exports = router;