const User = require('../models/userModel');
const ErrorHandler = require('../utils/errorHandler');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const cookie = require('cookie-parser');
dotenv.config();

//Signup user
exports.signupUser = async (req, res, next) => {

    const { name, email, password, profilePic, contact } = req.body;

    const user = await User.findOne({ email });
    if (user) {
        return next(new ErrorHandler("Email already exists", 401));
    }

    const newUser = await User.create({
        name,
        email,
        password,
        profilePic,
        contact
    })

    return res.json({ status: true, newUser });

};

// Login user
exports.loginUser = async (req, res, next) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return next(new ErrorHandler("User doesn't exist", 401));
    }
    // console.log(user);
    let isPasswordMatched = await bcrypt.compare(password ,user.password);
    
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Password doesn't match", 401));
    }

    if(isPasswordMatched) {
        const payload = {
            id: user._id,
            name: user.name
        }
        const access_token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: '1d'
        });

        return res.cookie('access_token', access_token, {
            httpOnly: true
        }).status(200).json({
            msg: "Login Success"
        })
    }

};

exports.updateUser = async (req, res, next) => {
    const { name, email, password, profilePic, contact } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        const updatedUser = await User.update({name: name})
    }

};
