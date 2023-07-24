const { Schema, model } = require('mongoose');

const substepSchema = new Schema({
   ssText:{
        type: String,
        required: 'You must have a description',
        minlength: 1,
        maxlength: 500,
        trim: true
    },

    Completed:{
        type: Boolean,
        default: false
    },

    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      }


});

const Substep = model('Substep', substepSchema);

module.exports = Substep;