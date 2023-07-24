const { Schema, model } = require('mongoose');
const Substep = require('./Substep')
const dateFormat = require('../utils/dateFormat');
const mongoose = require('mongoose');

const stepSchema = new Schema({
    // _id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //   },
     stepText: {
      type: String,
      required: 'You must have a title',
      minlength: 1,
      maxlength: 70,
      trim: true,
    },
    // description: {
    //   type: String,
    //   required: 'You must have a description',
    //   minlength: 1,
    //   maxlength: 500,
    //   trim: true,
    // },
    completed: {
      type: Boolean,
      required: false,
    },
    substeps: [{ type: Schema.Types.ObjectId, ref: 'Substep' }],
    project: { type: Schema.Types.ObjectId, ref: 'Project' }, 
  }); // Reference to Substep model

const Step = model('Step', stepSchema);

module.exports = Step;