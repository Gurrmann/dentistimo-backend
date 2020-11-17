var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dentistSchema = new Schema ({
    dentist_name : {type: String, required: true, unique: true}
});

module.exports = mongoose.model('dentists', dentistSchema);