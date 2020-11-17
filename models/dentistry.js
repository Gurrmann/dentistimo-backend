var mongoose = require('mongoose');
const dentistrySchema = new Schema({
    coordinate:{
        unique: true,
        required: true,
        longitude: {
            type:Number,
            required:true},
        latitude: {
            type:Number,
            required:true}
    },
    address: { 
        type:String,
        required:true
    },
    name:{ 
        type:String,
        required:true,
        unique: true
    },
    city:{
        type:String,
        required:true,
    },
    owner:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
    },
    openinghours: {
        required:true,
        monday:{
            starttime: Date,
            endtime: Date},
        tuesday:{starttime: Date,
            endtime: Date},
        wednesday:{starttime: Date,
            endtime: Date},
        thursday:{starttime: Date,
            endtime: Date},
        friday:{starttime: Date,
            endtime: Date}
    }
})
module.exports = mongoose.model('dentistries', dentistrySchema);
