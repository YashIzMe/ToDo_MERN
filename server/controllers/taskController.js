const Task = require("../models/taskModel");
const ErrorHandler = require("../utils/errorHandler");

//Create Task
exports.createTask = async (req, res, next) => {
  const { task, user } = req.body;

  const newTask = await Task.create({
    task,
    user,
  });

  return res.status(200).json({ status: true, newTask });
};

exports.updateTask = async (req, res, next) => {
  const { task, user, complete } = req.body;
  const taskId = req.params.id;
  const updateTask = await Task.findOne({ _id: taskId });
  console.log(taskId);
  if (updateTask) {
    const newTask = await Task.findOneAndUpdate(
      { _id: taskId },
      {
        task: task,
        user: user,
        complete: complete,
      }
    );

    return res.json({ status: true, newTask });
  } else {
    return next(new ErrorHandler("Task doesn't exist", 401));
  }
};

// get task by user
exports.getTaskByUser = async (req, res) => {
  const id = req.params.id;
  try {
    const task = await Task.find({ user: id });

    if (!task) {
      return res.status(404).json({ msg: "No Task Exists" });
    }
    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({error: "Something Went Wrong"});
  }
};

// delete todo
exports.deleteToDo = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await Task.findByIdAndDelete({_id:id});
        return res.status(200).json({ success: true, data });
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

// complete todo
exports.completeTodo = async (req, res) => {
    const id = req.params.id;
    try {
        const task = await Task.findOne({_id: id});
        if(!task) {
            return res.status(404).json({msg: "Task Not Found"});
        }
        let isComplete = !task.complete;
        const updateTask = await Task.findByIdAndUpdate({ _id:id }, { complete:isComplete });
        return res.status(200).json({
            updateTask
        });
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}