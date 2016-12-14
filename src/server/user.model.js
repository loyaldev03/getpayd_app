// first name
// last name
// employee id
// department 
// {
//     _id:
//     department:
// }
// email to invite
// tokens
// available_tokens
// rewards[
// {
//   reward:{

//   }
//   number:
// }
// ]
// activities[
// {
//     user
//     content
        // {
        //   content object
        // }
//     points_awarded
//     date    
// }
// company
// {
//     _id:
//     company_name:
//     email:
//     password:
// }
// ]

var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    employee_id: String,
    department: Object,
    password: String,
    email: String,
    date_joined: Date,
    tokens: Number,
    available_tokens: Number,
    rewards: Array,
    activities: Array,
    company: Object
});

var User = mongoose.model('User', userSchema);

module.exports = User;