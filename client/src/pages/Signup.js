import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';
import logo from '../assets/GYLTlogo.png';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.table(formState);

    try {
      const { error, data } = await addUser({
        variables: { ...formState },
      });
      console.error(error)
      console.log(data)
      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="container-fluid">
      <nav className="navbar">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <img src={logo} alt="Logo" height="50" className="d-inline-block" /></Link>
          <ul className="nav justify-content-end">
            <Link to="/login"><button className="btn btn-main" type="button">Log In</button></Link>
          </ul>
        </div>
      </nav>

      <div className="container text-center my-5" style={{ height: '40rem', width: '40rem' }}>
        <div className="">
          <div className="card">
            <h4 className="card-header bg-dark text-light p-2">Sign Up</h4>
            <div className="card-body">
              {data ? (
                <p>
                  Success! You may now head{' '}
                  <Link to="/landing">back to your landing page.</Link>
                </p>
              ) : (
                <form onSubmit={handleFormSubmit}>
                  <input
                    className="form-input m-2"
                    placeholder="Username"
                    name="username"
                    type="text"
                    value={formState.name}
                    onChange={handleChange}
                  />
                  <input
                    className="form-input m-2"
                    placeholder="Email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                  />
                  <input
                    className="form-input m-2"
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={formState.password}
                    onChange={handleChange}
                  />
                  <button
                    className="btn btn-main m-2"
                    style={{ cursor: 'pointer' }}
                    type="submit"
                  >
                    Sign Up
                  </button>
                </form>
              )}

              {error && (
                <div className="my-3 p-3 bg-danger text-white">
                  {error.message}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
