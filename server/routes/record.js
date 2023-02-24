const express = require('express');
const router = express();
const {signupUser, loginUser} = require('../controllers/userController')
const {createTask,updateTask} = require('../controllers/taskController')

router.route("/signup").post(signupUser);
router.route("/login").post(loginUser);
router.route("/createTask").post(createTask);
//router.route("/updateTask/:id").post(updateTask);
//router.route("/logout").get(logoutUser);
router.put("/updateTask/:id",updateTask)

module.exports = router;