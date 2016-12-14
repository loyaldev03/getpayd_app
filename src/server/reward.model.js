//name
//cost
//details
//available_to
//date_end
// company
// {
//   _id:
//   company_name:
//   email:
// }
var mongoose = require('mongoose');

var rewardSchema = mongoose.Schema({
    name: String,
    cost: Number,
    details: String,
    available_to: Array,
    date_end: Date,
    company: Object
});

var Reward = mongoose.model('Reward', rewardSchema);

module.exports = Reward;