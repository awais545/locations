var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var historySchema = new Schema({
    email:  {type: String, required: true, unique: true},
    history: [{ ltd: Number, lng: Number, _id: false }]
});
historySchema.plugin(timestamps);

module.exports = mongoose.model('UserHistory', historySchema);