var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dentistSchema = new Schema ({
    dentist_name : {type: String, required: true},
    lunch_start  : {type: String, required: true},
    break_start  : {type: String, required: true}
});

module.exports = mongoose.model('dentists', dentistSchema);