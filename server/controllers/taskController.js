const Task = require('../models/taskModel');
const ErrorHandler = require('../utils/errorHandler');

//Create Task
exports.createTask = async (req, res, next) => {
    const {task, user} = req.body

    const newTask = await Task.create({
        task,
        user
    })

    return res.json({ status: true, newTask });
}

exports.updateTask = async (req, res, next) => {
    const {task, user, complete} = req.body
    const taskId = req.params.id
    const updateTask = await Task.findOne({ _id:taskId });
    console.log(taskId)
    if (updateTask){
        const newTask = await Task.findOneAndUpdate({ _id:taskId },{
            task:task,
            user:user,
            complete:complete
        })

    return res.json({ status: true, newTask });
    }
    else{
        return next(new ErrorHandler("Task doesn't exist", 401));
    }
    
    

}

//Get all tasks
exports.getAllTasks = async (req,res,next) => {
    try {

        const allTasks = await Task.find({});
        return res.status(200).json({ data: allTasks });

    } catch (err) {

        return res.status(400).json({ error_msg: err.message });
      
    }
}