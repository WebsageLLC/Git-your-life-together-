import React from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_STEP } from '../../utils/mutations';
import { QUERY_PROJECT, QUERY_ME } from '../../utils/queries';

const StepList = ({ projects, steps = [] }) => {

  // if (!steps.length) {
  //   return <h3>No Steps Yet</h3>;
  // }
  // const ProjectsList = ({
  //   projects,
  //   title,
  //   showTitle,
  //   showUsername,
  // }) => {
    const [removeStep, {error}] = useMutation(DELETE_STEP, 
      {
        update(cache, { data: { 
          removeStep} }) {
            try {
              cache.writeQuery({ 
                  query: QUERY_ME, 
                  data: {me: removeStep}, 
                });
              } catch(e) {
                console.error(e);
              }
                },
              });
             
              const handleRemoveStep = async (project) => {
                try {
                  const { data } = await removeStep({ 
                    variables:
                    {
                   stepId: project._id},
                  });
                  
                  console.log(project)
                } catch (err) {
                  console.log(project)
                  console.log(project._id)
                  console.log(steps._id)
            
                  console.error(err);
                }
              };
              
    

  return (
    <>
      <h3
        className="p-5 display-inline-block"
        style={{ borderBottom: '1px dotted #1a1a1a' }}
      >
        Steps
      </h3>
      <div className="flex-row my-4">
        {steps &&
          steps.map((step) => (
            <div key={step._id} className="col-12 mb-3 pb-3">
              <div className="p-3 bg-dark text-light">
                <h5 className="card-header">
                  <span style={{ fontSize: '0.825rem' }}>
                    on {step.createdAt}
                  </span>
                </h5>
                <button className="btn btn-outline col-1 m-5 mx-2">Edit</button>
                <button className="btn btn-delete col-1 m-5 mx-2" onClick={() => handleRemoveStep(step)}  >Delete</button>
                <p className="card-body">{step.stepText}</p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default StepList;