//title
//content
//type
//available_to
//reward
//date_end
//quizzes [
//{
//  question:
//  answers: []
//  correct_answer:
//} 
// company {
//   _id:
//   company_name:
//   email:
// }
// reference_link
//]

var mongoose = require('mongoose');

var contentSchema = mongoose.Schema({
    title: String,
    content: String,
    type: String,
    available_to: Array,
    reward: Number,
    date_end: Date,
    quizzes: Array,
    company: Object,
    reference_link: String,
    date_created: Date,
});

var Content = mongoose.model('Content', contentSchema);

module.exports = Content;