import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_PROJECT } from '../../utils/queries';

const StepList = ({ projectId }) => {

  const { loading, data } = useQuery(QUERY_PROJECT, {
    variables: { projectId },
})



  const [deleteStep, { error }] = useMutation(DELETE_STEP,
    {
      update(cache, { data: {
        deleteStep } }) {
        try {
          cache.writeQuery({
            query: QUERY_ME,
            data: { me: deleteStep },
          });
        } catch (e) {
          console.error(e);
        }
      },
    });

  const handleDeleteStep = async (project, step) => {
    try {
      const { data } = await deleteStep({
        variables:
          { 
            projectId: project._id,
            stepId: step._id
          },
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (!steps.length) {
    return <h3>No Steps Yet</h3>;
  }

 

  return (
    <>
      <div className='row ms-5'>
        <h4 className="row ps-5" > Steps</h4>
        <div className="flex-row">
          {project.steps &&
            project.steps.map((step) => (
              <div key={step._id} className="col-12 ">
                <div className=" ps-5 mt-1 mb-5">
                  <h5 style={{ color: '#3120E0' }}><strong>- {step.stepText}</strong></h5>

                  <h5 >
                    <span style={{ fontSize: '0.825rem' }}>{step.createdAt}
                    </span>
                  </h5>
                  <hr style={{ color: 'coral', width: '50rem' }}></hr>

                </div>
                <div className="col-6" >
                  <button className="btn btn-delete m-5 mx-2" onClick={() => handleDeleteStep(step)}>Complete</button>
                </div>
                <hr style={{ color: 'coral', width: '70%' }}></hr>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default StepList;