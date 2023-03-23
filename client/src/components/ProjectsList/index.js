import React, { useState } from 'react';
//import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { REMOVE_PROJECT } from '../../utils/mutations';
import { QUERY_PROJECT, QUERY_ME } from '../../utils/queries';
// import ProjectForm from '../ProjectForm';

const ProjectsList = ({
  projects,
  title,
  showTitle,
  showUsername,
}) => {

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
      console.log(project)
    } catch (err) {
      console.log(project)
      console.log(project._id)
      console.error(err);
    }
  };


  return (
    <div>
      {showTitle && <h3>{title}</h3>}

      <div className="container " style={{ backgroundColor: 'white', }}>
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
                <button className="btn btn-outline col-1 m-5 mx-2">Edit</button>

                <button className="btn btn-delete col-1 m-5 mx-2" onClick={() => handleRemoveProject(project)} >Delete</button>

              </div>
           
            ))}




        </div>

        {/* Modal */}
        {/* <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">

      <ProjectForm/>

        </div> */}
      </div >
    </div>
  );
};

export default ProjectsList;