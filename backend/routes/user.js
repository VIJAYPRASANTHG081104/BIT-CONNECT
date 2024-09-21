const express = require("express");
const {
  register,
  login,
  activateAccount,
  sendVerification,
  findUser,
  sendResetPasswordCode,
  validateResetcode,
  changePassword,
  getProfile,
  updateProfilePicture,
  updateProfileCover,
  updateDetails,
  addFriend,
  cancelRequest,
  follow,
  unfollow,
  acceptRequest,
  unFriend,
  deleteRequest
} = require("../controllers/user");
const { authUser } = require("../middlewares/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/activate", authUser, activateAccount);
router.post("/sendverification", authUser, sendVerification);
router.post("/finduser", findUser);
router.post("/sendresetpasswordcode", sendResetPasswordCode);
router.post("/validateresetcode",validateResetcode);
router.post("/changepassword",changePassword);
router.get("/getProfile/:username",authUser,getProfile);
router.put("/updateProfilePicture",authUser,updateProfilePicture);
router.put("/updateCover",authUser,updateProfileCover)
router.put("/updateDetails",authUser,updateDetails)
router.put("/addFriend/:id",authUser,addFriend);
router.put("/cancelRequest/:id",authUser,cancelRequest);
router.put("/follow/:id",authUser,follow);
router.put("/unfollow/:id",authUser,unfollow);
router.put("/acceptRequest/:id",authUser,acceptRequest);
router.put("/unFriend/:id",authUser,unFriend);
router.put("/deleteRequest/:id",authUser,deleteRequest);

module.exports = router;
