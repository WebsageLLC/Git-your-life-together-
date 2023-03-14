const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const projectSchema = new Schema({
    title:{
        type: String,
        required: true,
        minlength: 1,
        maxlength: 70,
        trim: true,
    },
    description:{
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
        trim: true,
    },
    projectAuthor:{
        type: String, 
        required: true,
        trim: true,
    },
    steps: [
        {
            _id: {
                type: String,
                dropDups: true,
                unique: true,
            },
            stepText: {
                type: String,
                required: true,
                minlength: 1,
                maxlength: 280, 
            },
            completed: {
                type: Boolean,
                required: false,
            },
            createdAt: {
                type: Date,
                default: Date.now,
                get: (timestamp) => dateFormat(timestamp),
              },
        },
    ],


    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
});

const Project = model('Project', projectSchema);

module.exports = Project;