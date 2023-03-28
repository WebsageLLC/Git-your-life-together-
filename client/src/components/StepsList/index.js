import React from 'react';
import { useState } from 'react';
import { DELETE_STEP, UPDATE_STEP, COMPLETED_STEP } from '../../utils/mutations';
import { useQuery } from '@apollo/client';
import { QUERY_PROJECT, QUERY_ME } from '../../utils/queries';
import { useMutation } from '@apollo/client';

//full copy of UNEDITED code at bottom
//michael changing delete to update so that complete button doesn't delete, but instead changes boolean value

const StepList = ({ projectId }) => {
  const [updateStep] = useMutation(UPDATE_STEP)
  const [completedStep] = useMutation(COMPLETED_STEP)

  const [stepText, setStepText] = useState('');
  const [stepId, setStepId] = useState('');

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
  const handleUpdateStep = async (event) => {
    event.preventDefault();
    console.log(project._id)
    console.log(stepText)
    console.log(stepId)
    try {
      const { data } = await updateStep({
        variables:
        {
          projectId: project._id,
          stepId: stepId,
          stepText: stepText,
        },
      });
    } catch (err) {

      console.error(err);
    }
  }
  const handleChange = (event) => {
    console.log("LINE 73!!")
    const { name, value } = event.target;
    if (name === 'stepText' && value.length <= 280) {
      setStepText(value);
      console.log(value)
    }
    if (name === 'stepId' && value.length <= 280) {
      setStepId(value);
      console.log(value)
    }

  };


 
  const handleCompletedStep = async (updatedStep) => {
   
    console.log(updatedStep)
    console.log(project._id)
    console.log(updatedStep.completed)
    console.log(updatedStep._id)
    let stepId= updatedStep._id;
    let completed= updatedStep.completed;
    try { 
      const { data } = await completedStep({
      
        variables:
        {
          projectId: project._id,
          stepId: stepId,
         completed: completed
        },
      });
    } catch (err) {

      console.error(err);
    }
  }

  const handleUpdateFalse = (step) => {
    if( !step.completed){
      const updatedStep ={
        ...step,
        completed: true
      };
      console.log(updatedStep)
       handleCompletedStep(updatedStep)
  }
  return step
  };

  const handleUpdateTrue = (step) => {
    if( step.completed){
      const updatedStep ={
        ...step,
        completed: false
      };
      console.log(updatedStep)
       handleCompletedStep(updatedStep)
  }
  return step
  };







  return (
    <>
      <div className='row ms-5'>
        <h4 className="row ps-5" > Steps</h4>
        <div className="flex-row">
          {project.steps &&
            project.steps.map((step) => (
              <div key={step._id} id={step._id} className="col-12 ">
                <div className={step.completed ?
                " completed ps-5 mt-1 mb-5" : " notcompleted ps-5 mt-1 mb-5"}> 
                  <h5 style={{ color: '#3120E0' }}><strong>- {step.stepText}</strong></h5>

                  <h5 >
                    <span style={{ fontSize: '0.825rem' }}>{step.createdAt}
                    </span>
                  </h5>
                  <div className="col-6" >
                    <button className="btn btn-delete m-5 mx-2" onClick={() => handleDeleteStep(step)}>Complete</button>
                    <button className="btn btn-main m-5 mx-2" data-bs-toggle="modal" data-bs-target={`#exampleModal2${step._id}`} >Edit</button>




                    {step.completed ?
                    <button className="btn btn-secondary m-5 mx-2"  
                    onClick={() => {
                      handleUpdateTrue(step)}}>Completed: true</button> :
                  <button className="btn btn-secondary m-5 mx-2"  
                  onClick={() => {
                    handleUpdateFalse(step)}}> Completed: false</button>
                    }

                  </div>
                  <hr style={{ color: 'coral', width: '50rem' }}></hr>



                  <div className="modal fade" id={`exampleModal2${step._id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1 className="modal-title fs-5" id="exampleModalLabel">Update Your Step</h1>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          <form
                            className="flex-row justify-center justify-space-between-md align-center"
                            onSubmit={handleUpdateStep}
                          >
                            <div className="col-12 col-lg-9">
                              <textarea
                                name="stepText"
                                placeholder={step.stepText}
                                value={stepText}
                                className="form-input w-100"
                                style={{ lineHeight: '1.5', resize: 'vertical' }}
                                onChange={handleChange}
                              ></textarea>
                            </div>

                            <div className="modal-footer mt-4">

                              <button type="submit" className="btn btn-main" data-bs-dismiss="modal"
                                name="stepId"
                                value={step._id}
                                onClick={handleChange}>
                                Save Step</button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>











                







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