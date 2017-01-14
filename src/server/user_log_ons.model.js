var mongoose = require('mongoose');

var userLogOnsSchema = mongoose.Schema({
    user_id: String,
    company_id: String,
    department_id: String,
    time: Date
});

var UserLogOns = mongoose.model('UserLogOns', userLogOnsSchema);

module.exports = UserLogOns;