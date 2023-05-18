import React from 'react';
import Navbar from '../components/Navbar';
import ProjectsList from '../components/ProjectsList';
import ProjectForm from '../components/ProjectForm/index';
import noProject from '../assets/noProjects.png'
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
      {/* <div className="row d-flex align-items-center justify-content-center mt-0">
        <button type="button" className="btn btn-main col-2" data-bs-toggle="modal" data-bs-target="#exampleModal">Add New Project</button>
      </div> */}
      {user.projects?.length > 0 ?
        (<ProjectsList
          projects={user.projects}
          title={`${user.username}'s projects:`}
          showTitle={false}
          showUsername={false}
        />) :
        (
          <div className="container mt-3" style={{ backgroundColor: 'white', height: '55rem' }}>
            <div className="row p-5 text-center">
              <h2>No Projects yet!</h2>
            </div>
            <div className="row d-flex align-items-center justify-content-center mt-0">
              <button type="button" className="btn btn-main col-2" data-bs-toggle="modal" data-bs-target="#exampleModal">Add New Project</button>
            </div>
            <div className='d-flex justify-content-center mt-5'>
              <img className="" src={noProject} alt="Logo" height="500rem" />
            </div>

          </div>
        )

      }
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">

        <ProjectForm />

      </div>
    </div>
  );
};

export default Landing;