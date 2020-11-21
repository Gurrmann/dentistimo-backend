var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var dentistrySchema = new Schema({

    name   : {type: String, required: true, unique: true},
    adress : {type: String, required: true},
    owner  : {type: String, required: true},
    city   : {type: String, required: true},
    dentists : {type: Number, required: true},

    coordinates : ({

        longitude : {type: Number, required: true},
        latitude  : {type: Number, required: true}

    }),

    opening_hours : ({

        monday   : {type: String, required: true},
        tuesday   : {type: String, required: true},
        wednesday  : {type: String, required: true},
        thursday  : {type: String, required: true},
        friday  : {type: String, required: true}

    })
});

module.exports = mongoose.model('dentistries', dentistrySchema);
