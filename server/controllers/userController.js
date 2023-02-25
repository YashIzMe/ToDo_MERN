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
        // return next(new ErrorHandler("Email already exists", 401));
        return res.status(401).json({err: "Email already exists"})
    }

    if(password.length<6) {
        return res.status(401).json({msg: "Password must be atleast 6 character long."})
    }

    if(contact.length<13) {
        return res.status(401).json({msg: "Contact must be of 13 characters including country code"})
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
            msg: "Login Success",
            user
        })
    }

};

exports.getAllUsers = async (req,res,next) => {
    try {

        const allUsers = await User.find({});
        return res.status(200).json({ data: allUsers });

    } catch (err) {

        return res.status(400).json({ error_msg: err.message });
      
    }
}

exports.updateUser = async (req, res, next) => {
    let { name, email, profilePic, contact } = req.body;
    const user = await User.findOne({ email });
    if (user) {

        const updatedUser = await User.findOneAndUpdate({email:user.email},{
            name: name?name:user.name,
            profilePic: profilePic?profilePic:user.profilePic,
            contact: contact?contact:user.contact
        },
        {
            new: true
        })
        return res.status(200).json({ data: updatedUser });
    }
    return res.status(400).json({ error_msg: "err.message "});

};
