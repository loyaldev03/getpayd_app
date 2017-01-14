var mongoose = require('mongoose');

var pointsAwardedSchema = mongoose.Schema({
    points_awarded: Number,
    task_id: String,
    user: Object,
    time: Date
});

var PointsAwarded = mongoose.model('PointsAwarded', pointsAwardedSchema);

module.exports = PointsAwarded;