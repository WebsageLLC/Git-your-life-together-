import React, { useState } from 'react';
//import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import noProject from '../../assets/noProjects.png';
import ProjectForm from '../ProjectForm';
import { useMutation } from '@apollo/client';
import { REMOVE_PROJECT } from '../../utils/mutations';
import { QUERY_PROJECT, QUERY_ME } from '../../utils/queries';

const ProjectsList = ({
  projects,
  title,
  showTitle,
  showUsername,
}) => {
  const [removeProject, {error}] = useMutation(REMOVE_PROJECT, 
    {
      update(cache, { data: { 
        removeProject} }) {
          try {
            cache.writeQuery({ 
                query: QUERY_ME, 
                data: {me: removeProject}, 
              });
            } catch(e) {
              console.error(e);
            }
              },
            });
     
            const handleRemoveProject = async (project) => {
              try {
                const { data } = await removeProject({ 
                  variables: 
                  {projectId: project._id},
                });
                console.log(project)
              } catch (err) {
                console.log(project)
                console.log(project._id)
                console.error(err);
              }
            };
    
  

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

        
      </div>)
  }
  return (
    <div>
      {showTitle && <h3>{title}</h3>}

      <div className="container mt-3" style={{ backgroundColor: 'white', }}>
        <div className="row p-5">
          <h2>Projects</h2>
        </div>

        <div className="row d-flex align-items-center justify-content-center">

          {projects &&
            projects.map((project) => (
              <div key={project._id} className="row">
                <h2 className="col-2 p-2 ms-5">
                  {showUsername ? (
                    <p>No projects to display</p>
                
                  ) : (
                    <>
                      <Link to="/steps" className="" state={{projectId: project, steps: project.steps}}   style={{ textDecoration: 'none', color: 'black' }}>

                        <span style={{ fontSize: '1rem' }}>
                          <h5>{project.title}</h5>
                          <p> {project.description}</p>
                        </span>
                      </Link>
                    </>
                  )}
                </h2>
                <button className="btn btn-outline col-1 m-5 mx-2">Edit</button>
                <button className="btn btn-delete col-1 m-5 mx-2" onClick={() => handleRemoveProject(project)} >Delete</button>
              
              </div>
            ))}




        </div>

        <div className="row d-flex align-items-center justify-content-center mt-5">
         

          <button type="button" className="btn btn-main col-2 mb-5" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Add New Project
          </button>
        </div>

        {/* Modal */}
        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">

          <ProjectForm />

        </div>
      </div >
    </div>
  );
};

export default ProjectsList;