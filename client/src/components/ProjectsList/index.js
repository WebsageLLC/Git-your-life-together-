import React, { useState } from 'react';
//import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { REMOVE_PROJECT, UPDATE_PROJECT } from '../../utils/mutations';
import { QUERY_PROJECT, QUERY_ME } from '../../utils/queries';
// import ProjectForm from '../ProjectForm';

const ProjectsList = ({
  projects,
  title,
  showTitle,
  showUsername,
}) => {
  console.log(projects);

  const [removeProject, { error }] = useMutation(REMOVE_PROJECT,
    {
      update(cache, { data: {
        removeProject } }) {
        try {
          cache.writeQuery({
            query: QUERY_ME,
            data: { me: removeProject },
          });
        } catch (e) {
          console.error(e);
        }
      },
    });

  const handleRemoveProject = async (project) => {
    try {
      const { data } = await removeProject({
        variables:
          { projectId: project._id },
      });
      // console.log(project)
    } catch (err) {
      // console.log(project)
      // console.log(project._id)
      console.error(err);
    }
  };


  // const [updateProject] = useMutation(UPDATE_PROJECT)
















  return (
    <div>
      {showTitle && <h3>{title}</h3>}

      <div className="container " style={{ backgroundColor: 'white' }}>
        <div className="row p-5">
          <h2 className='col-10'>Projects</h2>
        </div>

        <div className="row d-flex  align-items-center justify-content-center">

          {projects &&
            projects.map((project) => (
              <div key={project._id} className="row align-items-center">
                <h2 className="col-6 p-2 ms-5">
                  {showUsername ? (
                    <p>No projects to display</p>

                  ) : (
                    <>
                      <Link to="/steps" className="" state={{ projectId: project, steps: project.steps }} style={{ textDecoration: 'none', color: 'black' }}>

                        <span className="row" style={{ fontSize: '1rem' }}>
                          <h5 className='col-8'>{project.title}</h5>
                          <p className=''> {project.description}</p>
                        </span>
                      </Link>
                      <hr></hr>
                    </>
                  )}
                </h2>  
               
                <button type="button" className="btn btn-main col-1 m-5 mx-2" data-bs-toggle="modal" data-bs-target={`#exampleModal2${project._id}`}  >Edit</button>
                
               
                <div className="modal fade" id={`exampleModal2${project._id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Update Your Project</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">


              
                      <form
                                    className="flex-row g-3 justify-center justify-space-between-md align-center"
                                    // onSubmit={handleFormSubmit}
                                >
                                  
                                    <div className="col-12 col-lg-9">
                                        <label for="projectTitle" className="form-label">Project Title</label>

                                        <input
                                            name="title"
                                            placeholder={project.title}
                                            value={project.title}
                                            className='form-control'
                                            // onChange={handleChange}
                                        ></input>

                                        <label for="projectDescription" className="form-label">Description</label>

                                        <textarea
                                            name="description"
                                            placeholder={project.description}
                                            value={project.description}
                                            className="form-control w-100"
                                            style={{ lineHeight: '1.5', resize: 'vertical' }}
                                            // onChange={handleChange}
                                        ></textarea>

                                    </div>

                                    <div className="modal-footer mt-4">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <div className="col-12 col-lg-3">
                                            <button className="btn btn-main" type="submit" data-bs-dismiss="modal">
                                                Update Project
                                            </button>
                                        </div>
                                        {error && (
                                            <div className="col-12 my-3 bg-danger text-white p-3">
                                                {error.message}
                                            </div>
                                        )}

                                    </div>
                                    
                                </form>

                      </div>
                    </div>
                  </div>
                </div>

               














                <button className="btn btn-delete col-1 m-5 mx-2" onClick={() => handleRemoveProject(project)} >Delete</button>

              </div>

            ))}




        </div>


      </div >
    </div>
  );
};

export default ProjectsList;