const User = require('../models/userModel');
const ErrorHandler = require('../utils/errorHandler');

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

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Password doesn't match", 401));
    }

};

exports.updateUser = async (req, res, next) => {
    const { name, email, profilePic, contact } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        const updatedUser = await User.findOneAndUpdate(user,{name: name})
    }

};
