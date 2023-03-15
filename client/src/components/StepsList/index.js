import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_STEP } from '../../utils/mutations';
import Auth from '../../utils/auth';

const StepForm = ({ projectId }) => {
  const [addStepText, setAddStepText] = useState({
        projectId: projectId._id,
          stepText: "",
          completed: false
  });
  
  const {stepText, completed} = addStepText
  const [characterCount, setCharacterCount] = useState(0);

  const [addStep, { error }] = useMutation(ADD_STEP);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
console.log("line24")
console.log(projectId._id)
console.log(projectId)
console.log(stepText)
console.log(completed)
    try {
      console.log("line 27")
      const { data } = await addStep({
        variables: {
          projectId,
          ...addStepText,
        },
        
      });
      console.log("line33")
      setAddStepText('');
    } catch (err) {
      console.log("line36")
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log("line42")
    if (name === 'stepText' && value.length <= 280) {
      setAddStepText({
        ...addStepText, [name]:value,
      });
      setCharacterCount(value.length);
      
    }
  };

  return (
    <div>
      <h4>What are your thoughts on this thought?</h4>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }` }
          >
            Character Count: {characterCount}/280
            {error && <span className="ml-2">{error.message}</span>}
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="stepText"
                placeholder="Add your step..."
                value={stepText}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
            <div className="modal-footer mt-4">
                                    <button type="submit" className="btn btn-secondary" data-bs-dismiss="modal" >Close</button>
                                    <button type="submit" className="btn btn-main"  >Save Step</button>
                                </div>
            
            </div>
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your thoughts. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default StepForm;