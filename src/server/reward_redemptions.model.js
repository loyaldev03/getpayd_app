var mongoose = require('mongoose');

var rewardRedemptionsSchema = mongoose.Schema({
    reward: Object,
    number_of_reward: Number,
    user: Object,
    time: Date
    time: Date
});

var rewardRedemptionsSchema = mongoose.Schema({
    reward: Object,
    number_of_reward: Number,
    user: Object,
    time: Date
    time: Date
});

var RewardRedemptions = mongoose.model('RewardRedemptions', rewardRedemptionsSchema);

module.exports = RewardRedemptions;
module.exports = RewardRedemptionss;
