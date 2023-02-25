const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

//Signup user
exports.signupUser = async (req, res, next) => {
  const { name, email, password, profilePic, contact } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    // return next(new ErrorHandler("Email already exists", 401));
    return res.status(401).json({ err: "Email already exists" });
  }

  if (password.length < 6) {
    return res
      .status(401)
      .json({ err: "Password must be atleast 6 character long." });
  }

  if (contact.length < 13) {
    return res
      .status(401)
      .json({ err: "Contact must be of 13 characters including country code" });
  }

  const newUser = await User.create({
    name,
    email,
    password,
    profilePic,
    contact,
  });

  return res.json({ status: true, newUser });
};

// Login user
exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ msg: "User Does not exists" });
  }
  // console.log(user);
  let isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    return res.status(401).json({ msg: "Password does not match" });
  }

  if (isPasswordMatched) {
    const payload = {
      id: user._id,
      name: user.name,
    };
    const access_token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    return res
      .cookie("access_token", access_token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .json({
        msg: "Login Success",
        user,
        access_token,
      });
  }
};

exports.logoutUser = async (req, res) => {
  res.clearCookie("access_token");
  res.send({ success: true });
};

exports.updateUser = async (req, res, next) => {
  let { name, email, profilePic, contact } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    const updatedUser = await User.findOneAndUpdate(
      { email: user.email },
      {
        name,
        profilePic,
        contact,
      },
      {
        new: true,
      }
    );
    return res.status(200).json({ user: updatedUser });
  }
  return res.status(400).json({ error_msg: "err.message " });
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find({});
    return res.status(200).json({ data: allUsers });
  } catch (err) {
    return res.status(400).json({ error_msg: err.message });
  }
};

// reset password
exports.resetPassword = async (req, res) => {
  try {
    const { userId, oldPassword, newPassword } = req.body;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ msg: "User Does not exists" });
    }
    const isMatched = await bcrypt.compare(oldPassword, user.password);
    if (isMatched === false) {
      return res.status(401).json({ msg: "Old Password does not match" });
    }
    const hasnewPassword = await bcrypt.hash(newPassword, 10);
    const updatedUserPassword = await User.findByIdAndUpdate(
      { _id: userId },
      {
        password: hasnewPassword,
      },
      {
        new: true,
      }
    );
    return res.status(200).json({ data: updatedUserPassword, success: true });
  } catch (error) {
    return res.status(400).json({ error_msg: error.message });
  }
};
