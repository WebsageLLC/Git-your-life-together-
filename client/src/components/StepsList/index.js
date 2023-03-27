import React from 'react';
import { DELETE_STEP } from '../../utils/mutations';
import { useQuery } from '@apollo/client';
import { QUERY_PROJECT, QUERY_ME } from '../../utils/queries';
import { useMutation } from '@apollo/client';

//full copy of UNEDITED code at bottom
//michael changing delete to update so that complete button doesn't delete, but instead changes boolean value

const StepList = ({ projectId }) => {
 

  const { loading, data } = useQuery(QUERY_PROJECT, {
    variables: { projectId }
  })
  const [deleteStep, { error }] = useMutation(DELETE_STEP)

  const project = data?.project || {};
  console.log(project)
  
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!project.steps.length) {
    return <h3>No Steps Yet!</h3>;
  }


  const handleDeleteStep = async (projectId) => {

    try {
      const { data } = await deleteStep({
        variables:
        {
          projectId: project._id,
          stepId: projectId._id
        },
      });
    } catch (err) {
    
      console.error(err);
    }
  }



  return (
    <>
      <div className='row ms-5'>
        <h4 className="row ps-5" > Steps</h4>
        <div className="flex-row">
          {project.steps &&
            project.steps.map((step) => (
              <div key={step._id} id={step._id} className="col-12 ">
                <div className=" ps-5 mt-1 mb-5">
                  <h5 style={{ color: '#3120E0' }}><strong>- {step.stepText}</strong></h5>

                  <h5 >
                    <span style={{ fontSize: '0.825rem' }}>{step.createdAt}
                    </span>
                  </h5>
                  <div className="col-6" >
                    <button className="btn btn-delete m-5 mx-2" onClick={() => handleDeleteStep(step)}>Complete</button>
                  </div>
                  <hr style={{ color: 'coral', width: '50rem' }}></hr>

                </div>

              </div>
            ))}
        </div>
      </div>
    </>
  );
};

// const StepList = ({ projectId }) => {
 

//   const { loading, data } = useQuery(QUERY_PROJECT, {
//     variables: { projectId }
//   })
//   const [deleteStep, { error }] = useMutation(DELETE_STEP)

//   const project = data?.project || {};
//   console.log(project)
  
//   if (loading) {
//     return <div>Loading...</div>;
//   }
//   if (!project.steps.length) {
//     return <h3>No Steps Yet!</h3>;
//   }


//   const handleDeleteStep = async (projectId) => {

//     try {
//       const { data } = await deleteStep({
//         variables:
//         {
//           projectId: project._id,
//           stepId: projectId._id
//         },
//       });
//     } catch (err) {
    
//       console.error(err);
//     }
//   }



//   return (
//     <>
//       <div className='row ms-5'>
//         <h4 className="row ps-5" > Steps</h4>
//         <div className="flex-row">
//           {project.steps &&
//             project.steps.map((step) => (
//               <div key={step._id} id={step._id} className="col-12 ">
//                 <div className=" ps-5 mt-1 mb-5">
//                   <h5 style={{ color: '#3120E0' }}><strong>- {step.stepText}</strong></h5>

//                   <h5 >
//                     <span style={{ fontSize: '0.825rem' }}>{step.createdAt}
//                     </span>
//                   </h5>
//                   <div className="col-6" >
//                     <button className="btn btn-delete m-5 mx-2" onClick={() => handleDeleteStep(step)}>Complete</button>
//                   </div>
//                   <hr style={{ color: 'coral', width: '50rem' }}></hr>

//                 </div>

//               </div>
//             ))}
//         </div>
//       </div>
//     </>
//   );
// };

export default StepList;