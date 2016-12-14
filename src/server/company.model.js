var mongoose = require('mongoose');

var companySchema = mongoose.Schema({
    company_name: String,
    email: String,
    password: String,
    date_joined: Date,
});

var Company = mongoose.model('Company', companySchema);

module.exports = Company;