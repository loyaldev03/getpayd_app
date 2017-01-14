var mongoose = require('mongoose');

var taskCompletedSchema = mongoose.Schema({
    task: Object,
    user: Object,
    points_awarded: Number,
    time: Date
});

var TaskCompleted = mongoose.model('TaskCompleted', taskCompletedSchema);

module.exports = TaskCompleted;