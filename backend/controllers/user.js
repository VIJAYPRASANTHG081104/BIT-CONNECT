const model = require("../models/userModel");
const postModel = require("../models/post");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  validationEmail,
  validateLength,
  validateUserName,
} = require("../helper/validation");
const { generatetoken } = require("../helper/token");
const Code = require("../models/code");
const { generateCode } = require("../helper/generateCode");
const { sendVerificationEmail } = require("../helper/mailer");
const register = async (req, res) => {
  console.log(req.body);
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      username,
      bYear,
      bMonth,
      bDay,
      gender,
    } = req.body;
    if (!validationEmail(email)) {
      return res.status(400).send({ msg: "Enter the valide email" });
    }
    const check = await model.findOne({ email: email });
    if (check) {
      return res.status(400).send({ msg: "Email already Exist!" });
    }
    if (validateLength(first_name, 3, 30)) {
      return res.status(400).send({
        msg: "First Name must be between 3 and 30 character",
      });
    }
    if (validateLength(last_name, 3, 30)) {
      return res.status(400).send({
        msg: "Last Name must be between 3 and 30 character",
      });
    }
    if (validateLength(password, 6, 40)) {
      return res.status(400).send({
        msg: "Password must be atleast 6 character",
      });
    }
    const cryptedPassword = await bcrypt.hash(password, 10);
    const tempUsername = first_name + last_name;
    let newUserName = await validateUserName(tempUsername);

    const user = new model({
      first_name,
      last_name,
      email,
      username: newUserName,
      password: cryptedPassword,
      bYear,
      bMonth,
      bDay,
      gender,
    });
    await user.save();
    const emailVerificationToken = generatetoken(
      {
        id: user._id.toString(),
      },
      "30m"
    );

    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    sendVerificationEmail(user.email, user.first_name, url);

    const token = generatetoken({ id: user._id.toString() }, "7d");
    return res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      Verfied: user.Verfied,
      msg: "Register Success",
    });
    // return res.send(emailVerificationToken)
  } catch (error) {
    res.status(500).json({ msg: "user not created", error: error.message });
  }
};

const login = async (req, res) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;
    const user = await model.findOne({ email });
    if (!user) {
      return res.send({ msg: " No user found" });
    }
    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      return res
        .status(400)
        .send({ msg: "Invalid credentials.Please try again." });
    }
    const token = generatetoken({ id: user._id.toString() }, "7d");
    return res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      Verfied: user.Verfied,
      msg: "Register Success",
    });
  } catch (error) {
    res.status(500).send({ err: error });
  }
};

const activateAccount = async (req, res) => {
  try {
    const validId = req.user.id;
    console.log(validId);
    const { token } = req.body;

    const user = jwt.verify(token, process.env.TOKEN_SECRET);
    // console.log(user);
    if (validId !== user.id) {
      return res.status(500).send({ msg: "Your not allowed to use this link" });
    }
    const check = await model.findById(user.id);
    if (check.Verfied === true) {
      return res.status(400).send({ msg: "This email is already verified" });
    } else {
      await model.findByIdAndUpdate(user.id, { Verfied: true });
      return res
        .status(200)
        .send({ msg: "Account has been activated successfully " });
    }
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};
const sendVerification = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await model.findById(id);
    if (user.Verfied === true) {
      res.status(400).send({ msg: "The account is already verified" });
    }
    const emailVerificationToken = generatetoken(
      {
        id: user._id.toString(),
      },
      "50m"
    );
    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    sendVerificationEmail(user.email, user.first_name, url);
    return res
      .status(200)
      .send({ msg: "Link send to email", activateLink: url });
  } catch (error) {
    return res.status(500).send({ msg: error });
  }
};
const findUser = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await model.findOne({ email }).select("-password");
    if (!user) {
      res.status(400).send({ msg: "Email does not exist" });
    }
    console.log(user.picture);
    return res.status(200).send({
      picture: user.picture,
      email: user.email,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: error.message });
  }
};

const sendResetPasswordCode = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await model.findOne({ email: email }).select("-password");
    if (!user) {
      return res.status(400).send({ msg: "email does not exist" });
    }

    await Code.findOneAndDelete({ user: user._id });
    const code = generateCode(5);
    const saveCode = new Code({
      code: code,
      user: user._id,
    });
    await saveCode.save();
    // sendMail function :)
    // not return still
    return res.status(200).send({
      msg: "Mail reset code has been sent to your mail",
    });
  } catch (error) {
    return res.status(500).send({
      msg: error.message,
    });
  }
};

const validateResetcode = async (req, res) => {
  try {
    const { email, code } = req.body;
    const user = await model.findOne({ email });
    const DbCode = await Code.findOne({ user: user._id });
    if (DbCode.code.toString() !== code) {
      return res.status(400).send({
        msg: "verification is wrong",
      });
    }
    return res.status(200).send({ msg: "ok" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      msg: error.message,
    });
  }
};

const changePassword = async (req, res) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;

    const cryptedPassword = await bcrypt.hash(password, 10);
    await model.findOneAndUpdate(
      { email },
      {
        password: cryptedPassword,
      }
    );
    return res.status(200).send({
      msg: "successfull",
    });
  } catch (error) {
    return res.status(500).send({
      msg: error.message,
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await model.findById(req.user.id);
    const profile = await model.findOne({ username }).select("-password");
    const friendship = {
      friends: false,
      following: false,
      requestSent: false,
      requestReceived: false,
    };
    if (!profile) {
      return res.status(200).send({ ok: false });
    }

    if (
      user.friends.includes(profile._id) &&
      profile.friends.includes(user._id)
    ) {
      friendship.friends = true;
    }
    if (user.following.includes(profile._id)) {
      friendship.following = true;
    }
    if (user.requests.includes(profile._id)) {
      friendship.requestReceived = true;
    }
    if (profile.requests.includes(user._id)) {
      friendship.requestSent = true;
    }
    const post = await postModel
      .find({ user: profile._id })
      .populate("user")
      .sort({ createdAt: -1 });
    console.log(profile);
    console.log("after");
    console.log({ ...profile.toObject() });
    return res.status(200).send({ ...profile.toObject(), post, friendship });
  } catch (error) {
    return res.status(500).send({
      msg: error.message,
    });
  }
};

const updateProfilePicture = async (req, res) => {
  try {
    const { url } = req.body;
    await model.findByIdAndUpdate(req.user.id, {
      picture: url,
    });

    return res.status(200).send(url);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProfileCover = async (req, res) => {
  try {
    const { url } = req.body;
    await model.findByIdAndUpdate(req.user.id, {
      cover: url,
    });

    return res.status(200).send(url);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateDetails = async (req, res) => {
  try {
    const { infos } = req.body;
    const updated = await model.findByIdAndUpdate(
      req.user.id,
      {
        details: infos,
      },
      {
        new: true,
      }
    );
    return res.status(200).send(updated.details);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const follow = async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      const sender = await model.findById(req.user.id);
      const receiver = await model.findById(req.params.id);
      if (
        !receiver.requests.includes(sender._id) &&
        !receiver.friends.includes(sender._id)
      ) {
        // this syntax is allowed in mongoose
        // await receiver.updateOne({ $push: { requests: sender._id } });
        // await receiver.updateOne({ $push: { followers: sender._id } });
        // await sender.updateOne({ $push: { following: receiver._id } });
        await model.updateOne(
          { _id: receiver._id },
          { $push: { requests: sender._id } }
        );
        // await model.updateOne(
        //   { _id: sender.id },
        //   { $push: { following: receiver._id } }
        // );
        return res.status(200).json({ message: "request send successfully" });
      } else {
        return res.status(200).json({ message: "Already sended" });
      }
    } else {
      return res
        .status(200)
        .json({ message: "you can't send frd req to yourself!" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const cancelRequest = async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      const sender = await model.findById(req.user.id);
      const receiver = await model.findById(req.params.id);
      if (receiver.requests.includes(sender._id)) {
        await model.updateOne(
          { _id: receiver._id },
          { $pull: { requests: sender._id } }
        );
        // await model.updateOne(
        //   { _id: sender.id },
        //   { $pull: { following: receiver._id } }
        // );
        return res
          .status(200)
          .json({ message: "request canceled successfully" });
      } else {
        return res.status(200).json({ message: "Already canceled" });
      }
    } else {
      return res
        .status(200)
        .json({ message: "you can't cancel req to yourself!" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
// const follow = async (req, res) => {
//   try {
//     if (req.user.id !== req.params.id) {
//       const sender = await model.findById(req.user.id);
//       const receiver = await model.findById(req.params.id);
//       if (
//         !receiver.followers.includes(sender._id) &&
//         !sender.following.includes(receiver._id)
//       ) {
//         await model.updateOne(
//           { _id: receiver._id },
//           { $push: { followers: sender._id } }
//         );
//         await model.updateOne(
//           { _id: sender.id },
//           { $push: { following: receiver._id } }
//         );
//         return res.status(200).json({ message: "followed successfully" });
//       } else {
//         return res.status(200).json({ message: "Already following" });
//       }
//     } else {
//       return res.status(200).json({ message: "you can't follow to yourself!" });
//     }
//   } catch (error) {
//     return res.status(400).json({ message: error.message });
//   }
// };
// const unfollow = async (req, res) => {
//   try {
//     if (req.user.id !== req.params.id) {
//       const sender = await model.findById(req.user.id);
//       const receiver = await model.findById(req.params.id);
//       if (
//         receiver.followers.includes(sender._id) &&
//         sender.following.includes(receiver._id)
//       ) {
//         await model.updateOne(
//           { _id: receiver._id },
//           { $push: { followers: sender._id }, $pull: { requests: sender._id } }
//         );
//         await model.updateOne(
//           { _id: sender.id },
//           { $push: { following: receiver._id } }
//         );
//         return res.status(200).json({ message: "unfollowed successfully" });
//       } else {
//         return res.status(200).json({ message: "Already unfollowing" });
//       }
//     } else {
//       return res
//         .status(200)
//         .json({ message: "you can't unfollow to yourself!" });
//     }
//   } catch (error) {
//     return res.status(400).json({ message: error.message });
//   }
// };

const acceptRequest = async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      const receiver = await model.findById(req.user.id);
      const sender = await model.findById(req.params.id);
      if (receiver.requests.includes(sender._id)) {
        await model.updateOne(
          { _id: receiver._id },
          {
            $push: { following: sender._id, followers: sender._id },
            $pull: { requests: sender._id },
          }
        );
        await model.updateOne(
          { _id: sender.id },
          { $push: { followers: receiver._id, following: receiver._id } }
        );
        return res.status(200).json({ message: "accepted successfully" });
      } else {
        return res.status(200).json({ message: "Already accepted" });
      }
    } else {
      return res.status(200).json({ message: "you can't accept to yourself!" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const unfollow = async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      const sender = await model.findById(req.user.id);
      const receiver = await model.findById(req.params.id);
      if (
        receiver.friends.includes(sender._id) &&
        sender.friends.includes(receiver._id)
      ) {
        await model.updateOne(
          { _id: receiver._id },
          {
            $pull: {
              // friends: sender._id,
              following: sender._id,
              followers: sender._id,
            },
          }
        );
        await model.updateOne(
          { _id: sender.id },
          {
            $pull: {
              // friends: receiver._id,
              following: receiver._id,
              followers: receiver._id,
            },
          }
        );
        return res.status(200).json({ message: "unfriend successfully" });
      } else {
        return res.status(200).json({ message: "Already unfriend" });
      }
    } else {
      return res
        .status(200)
        .json({ message: "you can't unfriend to yourself!" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
const deleteRequest = async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      const receiver = await model.findById(req.user.id);
      const sender = await model.findById(req.params.id);
      if (receiver.requests.includes(sender._id)) {
        await model.updateOne(
          { _id: receiver._id },
          {
            $pull: {
              requests: sender.id,
              // followers: sender._id,
            },
          }
        );
        // await model.updateOne(
        //   { _id: sender.id },
        //   {
        //     $pull: {
        //       following: receiver._id,
        //     },
        //   }
        // );
        return res.status(200).json({ message: "deleted successfully" });
      } else {
        return res.status(200).json({ message: "Already deleted" });
      }
    } else {
      return res.status(200).json({ message: "you can't delete to yourself!" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
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
  // addFriend,
  cancelRequest,
  follow,
  unfollow,
  acceptRequest,
  // unFriend,
  deleteRequest,
};
