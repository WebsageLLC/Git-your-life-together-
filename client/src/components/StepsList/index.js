import React from 'react';

const StepList = ({ steps = [] }) => {
  if (!steps.length) {
    return <h3>No Steps Yet</h3>;
  }

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
                <p className="card-body">{step.stepText}</p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default StepList;
