// const { Schema, model } = require('mongoose');
// const dateFormat = require('../utils/dateFormat');

// const guitarSchema = new Schema({
//     title:{
//         type: String= 'Learn to play an instrument',
//         required: true,
//         minlength: 1,
//         maxlength: 70,
//         trim: true,
//     },
//     description:{
//         type: String= 'This is how you learn to play an instrument',
//         required: true,
//         minlength: 1,
//         maxlength: 280,
//         trim: true,
//     },
//     projectAuthor:{
//         type: String='Git your life together', 
//         required: true,
//         trim: true,
//     },
//     steps: [
//         {
//             stepText: {
//                 type: String='Obtain a guitar: You can either buy or rent a guitar, or borrow one from a friend or family member to start practicing.',
//                 required: true,
//                 minlength: 1,
//                 maxlength: 500, 
//             },
//             completed: {
//                 type: Boolean,
//                 required: true,
//             },
//             createdAt: {
//                 type: Date,
//                 default: Date.now,
//                 get: (timestamp) => dateFormat(timestamp),
//               },
//         },
//         {
//             stepText: {
//                 type: String='Learn basic chords: Start by learning basic chords such as A, D, E, G, and C. There are many online resources and books available to help you learn chords.',
//                 required: true,
//                 minlength: 1,
//                 maxlength: 500, 
//             },
//             completed: {
//                 type: Boolean,
//                 required: true,
//             },
//             createdAt: {
//                 type: Date,
//                 default: Date.now,
//                 get: (timestamp) => dateFormat(timestamp),
//               },
//         },
//     ],


//     createdAt: {
//         type: Date,
//         default: Date.now,
//         get: (timestamp) => dateFormat(timestamp),
//       },
// });

// const Guitar = model('Guitar', guitarSchema);

// module.exports = Guitar;