import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Landing from './Landing';
import Auth from '../utils/auth';
import logo from '../assets/GYLTlogo.png';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    // for email and password
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <div className="container-fluid">
      <nav className="navbar">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <img src={logo} alt="Logo" height="50" className="d-inline-block" /></Link>
          <ul className="nav justify-content-end">
            <Link to="/signup"><button className="btn btn-main" type="button">Sign Up</button></Link>
          </ul>
        </div>
      </nav>

      <div className="container text-center my-5" style={{ height: '45rem', width: '40rem' }}>
        <div className="">
          <div className="card">
            <h4 className="card-header bg-dark text-light p-2">Log in</h4>
            <div className="card-body">
              {data ? (
                <Landing />
              ) : (
                <form onSubmit={handleFormSubmit}>
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
                    Log In
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

export default Login;
