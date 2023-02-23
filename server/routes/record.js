const express = require('express');
const router = express();
const {signupUser} = require('../controllers/userController')

router.route("/signup").post(signupUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);