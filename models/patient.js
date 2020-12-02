var mongoose = require('mongoose');
const patientSchema = new Schema({

    name: { type: String }

});

module.exports = mongoose.model('patients', patientSchema);
