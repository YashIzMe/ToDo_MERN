const express = require('express');
const router = express();
const {signupUser, loginUser} = require('../controllers/userController')

router.route("/signup").post(signupUser);
router.route("/login").post(loginUser);
// router.post("/logout:id", loginUser);



module.exports = router;