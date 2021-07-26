const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const connection = require('../db-config');

autoIncrement.initialize(connection);

const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    taskDescription: {
        type: String,
    },
    completed: {
        type: Boolean,
        default: false
    }
});

taskSchema.plugin(autoIncrement.plugin, 'Task');
module.exports = mongoose.model('Task', taskSchema);