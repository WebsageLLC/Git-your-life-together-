import React from 'react';
//import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProjectsList from '../components/ProjectsList';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import { Link } from 'react-router-dom';
import logo from '../assets/GYLTlogo.png';
import error from '../assets/error.png';

import Auth from '../utils/auth';

const Landing = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/landing" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <div className="container-fluid">
        <nav className="navbar">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              <img className="d-inline-block animate__animated animate__rotateIn" src={logo} alt="Logo" height="50rem" />
            </a>
            <ul className="nav justify-content-end">
              <Link to="/login"><button className="btn btn-outline me-2" type="button">Log In</button></Link>
              <Link to="/signup"><button className="btn btn-main" type="button">Sign Up</button></Link>
            </ul>
          </div>
        </nav>
        <div className="row align-content-center" style={{ height: '45rem' }}>
          <div className='col-12 col-md-6 d-flex justify-content-center align-content-center' style={{
            flexWrap: 'wrap'
          }}>
            <h4 className='text-center'>
              You need to be logged in to see this<br></br> Use the navigation links above to
              sign up or log in!
            </h4>
          </div>
          <div className='col-12 col-md-6 d-flex justify-content-center'>
            <img className="" src={error} alt="Logo" height="400rem" />
          </div>


        </div>
      </div>
    );
  }
  return (
    <div className="container-fluid">
      <Navbar />
      <ProjectsList
        projects={user.projects}
        title={`${user.username}'s projects:`}
        showTitle={false}
        showUsername={false}
      />
    </div>
  );
};

export default Landing;