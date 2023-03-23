import React, { useState } from 'react';
import { Link, Navigate, redirect, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_STEP } from '../../utils/mutations';
import { QUERY_PROJECT, QUERY_ME } from '../../utils/queries';
import Auth from '../../utils/auth';

const StepForm = ({ projectId }) => {
  console.log(projectId)
  const [stepText, setStepText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addOneMoreStep, { error }] = useMutation(ADD_STEP);
  const navigate = useNavigate()
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("HELLO")
    try {

      const { data } = await addOneMoreStep({
        variables: {
          projectId,
          stepText,
          completed: false,
        },
      });

      setStepText('');
     
      document.location.reload();

    // refreshPage();
      
    } catch (err) {
      console.error(err);
     
    }

  };
  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'stepText' && value.length <= 280) {
      setStepText(value);
      setCharacterCount(value.length);
    }
    
  };


  // function refreshPage() {
  //   navigate("/landing", { refresh: true })
  //   window.location.reload(false);
  //}

  return (
    <div>
      {Auth.loggedIn() ? (
        <>

          <div className="modal-body">
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

              <div className="modal-footer mt-4">
                <button type="submit" className="btn btn-secondary" data-bs-dismiss="modal" >Close</button>
                <button type="submit" className="btn btn-main">Save Step</button>
              </div>
            </form>
          </div>
        </>
      ) : (
        <p>
          You need to be logged in to share your thoughts. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
}

export default StepForm;