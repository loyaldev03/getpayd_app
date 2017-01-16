var mongoose = require('mongoose');

var transferTokensSchema = mongoose.Schema({
    number_of_tokens: Number,
    send_user: Object,
    receive_user: Object,
    time: Date
});

var TransferTokens = mongoose.model('TransferTokens', transferTokensSchema);

module.exports = TransferTokens;