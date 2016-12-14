var mongoose = require('mongoose');

var departmentSchema = mongoose.Schema({
    department: String,
});

var Department = mongoose.model('Department', departmentSchema);

module.exports = Department;