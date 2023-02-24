const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

const tasksSchema = new mongoose.Schema({
    task: {
        type: String,
        required: [true, "Please enter task to do."],
    },
    
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'users',
        required: true
    },
    
    timestamp: {
        type: Date,
        default: Date.now()
    },
    
    complete: {
        type: Boolean,
        default: false
    },
})

const Task = mongoose.model("tasks",tasksSchema)
module.exports = Task