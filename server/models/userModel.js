const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter name"],
        minlength: [3,"Name must be of minimum 3 characters"],
        maxlength: [30,"Name must be of maximum 30 characters"]
    },
    email: {
        type: String,
        required: [true, "Please enter email"],
        unique: [true, "Email already exists"],
    },
    password: {
        type: String,
        required: [true, "Please enter password"],
        minlength: [6, "Password must be of minimum 6 characters"]
    },
    profilePic: {
        type: String
    },
    contact: {
        type: String,
        required: [true, "Please enter contact"],
        length: [13,"Contact must be of 13 characters including country code"]
    }
})

userSchema.pre("save", async function(next) {
    if(this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// userSchema.methods.comparePassword = async function(enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password);
// }

const User = mongoose.model("users", userSchema);
module.exports = User;