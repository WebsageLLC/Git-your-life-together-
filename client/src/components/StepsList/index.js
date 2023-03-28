import React,{ useState } from 'react';
import { DELETE_STEP, UPDATE_STEP } from '../../utils/mutations';
import { useQuery } from '@apollo/client';
import { QUERY_PROJECT, QUERY_ME } from '../../utils/queries';
import { useMutation } from '@apollo/client';


//full copy of UNEDITED code at bottom
//michael changing delete to update so that complete button doesn't delete, but instead changes boolean value

const StepList = ({ projectId }) => {
 
  const [stepText, setStepText] = useState('');
  const [stepId, setStepId] = useState('');

  const [updateStep] = useMutation(UPDATE_STEP,
    {
      update(cache, { data: {
        updateStep } }) {
        try {
          cache.writeQuery({
            query: QUERY_PROJECT,
            data: { project: updateStep },
          });
        } catch (e) {
          console.error(e);
        }
      },
    });


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
   
    try {
   
      const { data } = await updateStep({
        variables:
        {
          stepText: stepText,
          stepId: stepId,
        },
      });
      setStepText('');
      setStepId('');
    } catch (err) {
    
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'stepText' && value.length <= 280) {
        setStepText(value);
    }
    if (name === 'stepId' && value.length <= 280) {
      setStepId(value);
  }
};


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
                  <button type="button" className="btn btn-main col-1 m-5 mx-2" data-bs-toggle="modal" data-bs-target={`#exampleModal2${step._id}`}  >Edit</button>


                <div className="modal fade" id={`exampleModal2${step._id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Update Your Step</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">



                        <form
                          className="flex-row g-3 justify-center justify-space-between-md align-center"
                        onSubmit={handleUpdateStep}
                        >

                          <div className="col-12 col-lg-9"
                          >
                            <label for="projectTitle" className="form-label"
                           
                            >
                              Step Text</label>

                            <textarea
                              name="text"
                             
                              value={stepText}
                              placeholder= {stepText}
                              className='form-control'
                            onChange={handleChange}
                            ></textarea>
                    

                          </div>

                          <div className="modal-footer mt-4">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <div className="col-12 col-lg-3">
                              <button className="btn btn-main" type="submit" data-bs-dismiss="modal"
                               name="stepId"
                               value={step._id}
                                onClick={handleChange}>
                                Update Step
                              </button>
                            </div>
                            {error && (
                              <div className="col-12 my-3 bg-danger text-white p-3">
                                {error.message}
                              </div>
                            )}

                          </div>

                        </form>

                      </div>
                    </div>
                  </div>
                </div>
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