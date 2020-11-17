var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var dentistrySchema = new Schema({

    name   : {type: String, required: true, unique: true},
    adress : {type: String, required: true, unique: true},
    owner  : {type: String, required: true, unique: true},
    city   : {type: String, required: true, unique: true},

    coordinates : ({

        longitude : {type: Number, required: true},
        latitude  : {type: Number, required: true}

    }),

    opening_hours : ({

        monday    : ({
            start : {type: Number, required: true},
            end   : {type: Number, required: true}
        }),
        tuesday   : ({
            start : {type: Number, required: true},
            end   : {type: Number, required: true}
        }),
        wednesday : ({
            start : {type: Number, required: true},
            end   : {type: Number, required: true}
        }),
        thursday  : ({
            start : {type: Number, required: true},
            end   : {type: Number, required: true}
        }),
        friday    : ({
            start : {type: Number, required: true},
            end   : {type: Number, required: true}
        })
    })
});

module.exports = mongoose.model('dentistries', dentistrySchema);
