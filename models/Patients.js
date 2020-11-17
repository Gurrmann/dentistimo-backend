var mongoose = require('mongoose');
const patientSchema = new Schema({
    ssn:{
        type: Number,
        unique: true,
        required: true,
        maxlength: 10,
        minlength: 10
    },
    phone:{
        type:Number,
        required:true,
    },
    name: { type: String },
     
    email:{
        type: String,
        unique:true,
        required: true,
        maxlength: 30},
    });

module.exports = mongoose.model('patients', patientSchema);
