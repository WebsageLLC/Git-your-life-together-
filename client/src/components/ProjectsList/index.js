import React, { useState } from 'react';
//import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import noProject from '../../assets/noProjects.png';
import ProjectForm from '../ProjectForm';

const ProjectsList = ({
  projects,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!projects.length) {
    return (
      <div className="container mt-3" style={{ backgroundColor: 'white', height: '100rem' }}>
        <div className="row p-5 text-center">
          <h2>No Projects yet!</h2>
        </div>
        <div className="row d-flex align-items-center justify-content-center mt-0">
          <button type="button" className="btn btn-main col-2" data-bs-toggle="modal" data-bs-target="#exampleModal">Add New Project</button>
        </div>
        <div className='d-flex justify-content-center mt-5'>
          <img className="" src={noProject} alt="Logo" height="500rem" />
        </div>

        <ProjectForm />

        {/* Modal */}
        {/* <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Add New Project</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">

                <form className="row g-3">
                  <div className="col-12">
                    <label for="projectTitle" className="form-label">Project Title</label>
                    <input type="" className="form-control" id="inputProjectTitle" />
                  </div>
                  <div className="col-12">
                    <label for="projectDescription" className="form-label">Description</label>
                    <input type="" className="form-control" id="inputProjectDescription" />
                  </div>

                  <div className="col-12">
                    <label for="inputState" className="form-label">Choose an optional Template</label>
                    <select id="inputState" className="form-select">
                      <option selected>Choose an option...</option>
                      <option value="language">Language</option>
                      <option value="savings">Savings Goal</option>
                      <option value="instrument">Instrument</option>
                    </select>
                  </div>
                </form>

                <div className="modal-footer mt-4">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-main">Save Project</button>
                </div>

              </div>
            </div>
          </div>
        </div> */}
      </div>)
  }
  return (
    <div>
      {showTitle && <h3>{title}</h3>}

      <div className="container mt-3" style={{ backgroundColor: 'white', height: '45rem' }}>
        <div className="row p-5">
          <h2>Projects</h2>
        </div>

        <div className="row d-flex align-items-center justify-content-center">

          {projects &&
            projects.map((project) => (
              <div key={project._id} className="row">
                <h2 className="col-2 p-2 ms-5">
                  {showUsername ? (
                    // <Link
                    //   className=""
                    //   to={`/profiles/${project.projectAuthor}`}
                    // >
                    {/* {project.projectAuthor} <br />
                      <span style={{ fontSize: '1rem' }}>
                        had this project on {project.createdAt}
                      </span> */}
                    // </Link>
                  ) : (
                    <>
                      <Link to="/steps" className="" style={{ textDecoration: 'none', color: 'black' }}>

                        <span style={{ fontSize: '1rem' }}>
                          <h5>{project.title}</h5>
                          {/* <p> {project.description}</p> */}
                        </span>
                      </Link>
                    </>
                  )}
                </h2>

                <button className="btn btn-outline col-1 m-5 mx-2">Edit</button>
                <button className="btn btn-delete col-1 m-5 mx-2">Delete</button>
                {/* <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/projects/${project._id}`}
            >
              Click to view steps.
            </Link> */}
              </div>
            ))}




          {/* PROGRESS BAR
          <div className="progress col-3 mx-3 p-0" role="progressbar" aria-label="Example with label" aria-valuenow="50"
            aria-valuemin="0" aria-valuemax="100">
            <div className="progress-bar"
              style={{ width: '50%', backgroundImage: 'linear-gradient(to right, #3120E0,  #21E1E1)' }}>
              50%
            </div>
          </div> */}


        </div>

        <div className="row d-flex align-items-center justify-content-center mt-5">
          {/* <button className="btn btn-main col-2">Add New Project</button>  */}

          <button type="button" className="btn btn-main col-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Add New Project
          </button>
        </div>
        {/* Modal */}
        <ProjectForm />
        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Add New Project</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">

                <form className="row g-3">
                  <div className="col-12">
                    <label for="projectTitle" className="form-label">Project Title</label>
                    <input type="" className="form-control" id="inputProjectTitle" />
                  </div>
                  <div className="col-12">
                    <label for="projectDescription" className="form-label">Description</label>
                    <input type="" className="form-control" id="inputProjectDescription" />
                  </div>

                  <div className="col-12">
                    <label for="inputState" className="form-label">Choose an optional Template</label>
                    <select id="inputState" className="form-select">
                      <option selected>Choose an option...</option>
                      <option value="language">Language</option>
                      <option value="savings">Savings Goal</option>
                      <option value="instrument">Instrument</option>
                    </select>
                  </div>

                  {/* <input type="submit" value="signup" className="signup-button" />
                            <br>  */}
                </form>
                <div className="modal-footer mt-4">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-main">Save Project</button>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div >
    </div>
  );
};

export default ProjectsList;