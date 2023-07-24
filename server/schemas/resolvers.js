const { AuthenticationError } = require('apollo-server-express');
const { User, Project, Step, Substep } = require('../models');
const mongoose = require('mongoose');

const { signToken } = require('../utils/auth');
const { Error } = require('mongoose');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('projects')
    },
    //change users to show orgs in the future
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('projects');
    },
    //add orgs to show projects
    project: async (parent, { projectId }) => {
      return Project.findOne({ _id: projectId }).populate('steps');
    },
    step: async (parent, { stepId }) => {
      return Step.findOne({ _id: stepId }).populate('substeps');
    },
    //also chage to orgs
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('projects');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      console.log("tacobell")
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },


    // need to make sure its the right author
    addProject: async (parent, { userId, title, description, completed }, context) => {
      if (context.user) {
        const project = await Project.create({
          title,
          description,
          completed,
          projectAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
        
          { _id: context.user._id },
          { $addToSet: { projects: project._id } }
        );
        return project;
      }
      throw new AuthenticationError('You need to be logged in!');
    },


    // working now
    removeProject: async (parent, { projectId }, context) => {
      if (context.user) {
        const project = await Project.findOneAndDelete({
          _id: projectId,
          projectAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { projects: projectId } },

        );

        return project;
      }
      throw new AuthenticationError('You need to be logged in!');
    },


    // working with context/auth
    updateProject: async (parent, { projectId, title, description }, context) => {
      if (context.user) {
        const project = await Project.findByIdAndUpdate(projectId, {
          title: title,
          description: description,
         
        });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $set: { title, description } },
          { new: true }
        );
        return project;
      }
      throw new AuthenticationError('You need to be logged in!');
    },



    completedProject: async (parent, { projectId, completed }, context) => {
      if (context.user) {
        const project = await Project.findByIdAndUpdate(projectId, {
         
          completed: completed,
        });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $set: { completed } },
          { new: true }
        );
        return project;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    // add step working as well now
    addStep: async (parent, { projectId,stepId, completed, stepText }, context) => {
      if (context.user) {
        try{
        const step = await Step.create({
          stepText, completed, stepAuthor: context.user.username
        });

       const updatedProject= await Project.findByIdAndUpdate(
        projectId ,
          { $addToSet: { steps: step._id } },
          { new: true }
          
        );
        
        console.log("step._id", step._id);
                console.log("projectId", projectId);
                console.log(updatedProject)
        return updatedProject;

      } catch (error) {
        // Handle any potential errors here.
        console.error(error);
        throw error;
      }
      }
        // return Project.findOneAndUpdate(
        //   { _id: projectId },
        //   {
        //     $addToSet: {
        //       steps: { stepId,stepText, completed, stepAuthor: context.user.username },
        //     },
        //   },
        //   {
        //     new: true,
        //   }
        // );
      
      throw new AuthenticationError('You need to be logged in!');
    },

    // remove a step
    deleteStep: async (parent, { projectId, stepId }, context) => {
      if (context.user) {
        return Project.findOneAndUpdate(
          { _id: projectId },
          {
            $pull: {
              steps: {
                _id: stepId,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },


    // update step
    updateStep: async (parent, { projectId, stepId, stepText }, context) => {
      if (context.user) {
        const step = await Project.findOneAndUpdate(
          { _id: projectId, "steps._id": stepId },
          { 
           
            $set: {
              "steps.$.stepText": stepText,
             
            },
          },
          { runValidators: true, new: true }
        );
return step;
       
      }//closes if statement
      throw new AuthenticationError('You need to be logged in!');
    },
    // completed step
    completedStep: async (parent, { projectId, stepId, completed }, context) => {
      if (context.user) {
        const step = await Step.findByIdAndUpdate(stepId, {
         
          completed: completed,
        });
 
        return step;
      
       
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    // completed step
//     completedStep: async (parent, { projectId, stepId, completed }, context) => {
//       if (context.user) {
//         const step = await Project.findOneAndUpdate(
//           { _id: projectId, "steps._id": stepId },
//           { 
//             $set: {
//               "steps.$.completed": completed,
//             },
//           },
//           { runValidators: true, new: true }
//         );
// return step;
       
    //   }
    //   throw new AuthenticationError('You need to be logged in!');
    // },

  
    //   if (context.user) {
    //     try {
    //       const updatedStep = await Step.findByIdAndUpdate(
    //         stepId, // Use the correct field to find the Step document.
    //         {
    //           $addToSet: {
    //             substeps: { ssText, completed },
    //           },
    //         },
    //         {
    //           new: true,
    //         }
    //       );
  
    //       console.log(stepId); // You can log stepId here if needed.
    //       console.log(updatedStep);
    //       return updatedStep;
    //     } catch (error) {
    //       // Handle any potential errors here.
    //       console.error(error);
    //       throw error;
    //     }
    //   } else {
    //     throw new AuthenticationError('You need to be logged in!');
    //   }
    // },
    
          addSubstep: async (parent, { ssText, stepId, completed }, context) => {
            if (context.user) {
              try {
                const substep = await Substep.create({
                  ssText,
                  completed,
                });
        
                console.log('ADDSUB 226');
                console.log(stepId);
        
                // Update the Step model
                const updatedStep = await Step.findByIdAndUpdate(
                  stepId,
                  { $addToSet: { substeps: substep._id } },
                  { new: true }
                );
        
                console.log("substep._id", substep._id);
                console.log("stepId", stepId);
                console.log(updatedStep);
        
                // Fetch the updated project with populated substeps
                // const updatedProject = await Project.findById(updatedStep.project).populate({
                //   path: 'steps',
                //   populate: { path: 'substeps' },
                // });
        
                return updatedStep;
              } catch (error) {
                // Handle any potential errors here.
                console.error(error);
                throw error;
              }
            } else {
              throw new AuthenticationError('You need to be logged in!');
            }
        
          },
        
  
    
    
  },
};

module.exports = resolvers;






// without context addProject
// addProject: async (parent, { title, description, projectAuthor }) => {
//   const project = await Project.create({
//     title, 
//     description,
//     projectAuthor,
//   });
//  return project;
// }
