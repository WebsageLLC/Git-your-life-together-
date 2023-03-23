import React from 'react';

const StepList = ({ steps = [] }) => {
  if (!steps.length) {
    return <h3>No Steps Yet</h3>;
  }

  return (
    <>
      <div className='row ms-5'>
        <h4 className="row ps-5" > Steps</h4>
        <div className="flex-row">
          {steps &&
            steps.map((step) => (
              <div key={step._id} className="row align-items-center ps-5 mt-1 mb-5">
                <div className='col-6'>
                  <h5 style={{ color: '#3120E0' }}><strong> {step.stepText}</strong></h5>
                  <h5 >
                    <span style={{ fontSize: '0.825rem' }}>{step.createdAt}
                    </span>
                  </h5>
                </div>
                <div className="col-6" >
                  <button className="btn btn-delete m-5 mx-2">Completed</button>
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