const express = require('express');
const router = express();
const {signupUser, loginUser, updateUser, getAllUsers} = require('../controllers/userController')
const {createTask,updateTask, getAllTasks} = require('../controllers/taskController')

router.route("/signup").post(signupUser);
router.route("/login").post(loginUser);
router.put("/updateUser",updateUser);
router.get("/getAllUsers",getAllUsers);

router.route("/createTask").post(createTask);
router.put("/updateTask/:id",updateTask);
router.get("/getAllTasks",getAllTasks);


module.exports = router;