var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var timeSlotSchema = new Schema({
    available : {type: Boolean, required : true},
    start_time : {type: Number, required : true},
    end_time : {type: Number, required : true},
    dentistry : {type: Schema.Types.ObjectId, ref : 'Dentistry', required : true}
})

module.exports = mongoose.model('timeSlots', timeSlotSchema);