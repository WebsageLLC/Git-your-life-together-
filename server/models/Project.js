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
    completed: {
        type: Boolean,
        required: false,
    },
    steps: [{ type: Schema.Types.ObjectId, ref: 'Step' }],
   // substeps: [{ type: Schema.Types.ObjectId, ref: 'Substep' }],
    //     {
    //         stepText: {
    //             type: String,
    //             required: true,
    //             minlength: 1,
    //             maxlength: 800, 
    //         },
    //         completed: {
    //             type: Boolean,
    //             required: false,
    //         },
    //         createdAt: {
    //             type: Date,
    //             default: Date.now,
    //             get: (timestamp) => dateFormat(timestamp),
    //           },
    //           substeps:[
    //             {
                          
    //            ssText:{
    //             type: String,
    //             required: true,
    //             minlength: 1,
    //             maxlength: 800, 
    //             },
            
    //             Completed:{
    //             type: Boolean,
    //             required: false,
    //             },
    //             createdAt: {
    //                 type: Date,
    //                 default: Date.now,
    //                 get: (timestamp) => dateFormat(timestamp),
    //               },
    //         }
    //           ]
    //         },
    // ],
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
});

const Project = model('Project', projectSchema);

module.exports = Project;