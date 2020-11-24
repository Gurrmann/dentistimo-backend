var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var appointmentSchema = new Schema ({
    patient_name : {type: String, required: true},
    time : {type: String, required: true},
    dentistry : {type: Schema.Types.ObjectId, ref: 'Dentistry', required: true}
});

module.exports = mongoose.model('appointments', appointmentSchema);