const express = require('express');
const router = express();
const {signupUser, loginUser, logoutUser, getAllUsers, updateUser} = require('../controllers/userController')
const {createTask,updateTask, getTaskByUser, deleteToDo, completeTodo, getAllTasks} = require('../controllers/taskController');
const { Authorization } = require("../middleware/Authorization");

router.route("/signup").post(signupUser);
router.route("/login").post(loginUser);
router.put("/updateUser",updateUser);
router.get("/getAllUsers",getAllUsers);

router.route("/createTask").post(Authorization, createTask);
router.route("/logout").post(Authorization, logoutUser);
router.put("/updateTask/:id", Authorization, updateTask);
router.get("/getAllTaskByUser/:id", Authorization, getTaskByUser);
router.delete("/deleteTodo/:id", Authorization, deleteToDo);
router.put("/completeTodo/:id", Authorization, completeTodo);
router.get("/getAllTasks",getAllTasks);

module.exports = router;