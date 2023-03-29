import React, { useState } from 'react';
//import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { REMOVE_PROJECT, UPDATE_PROJECT, COMPLETED_PROJECT } from '../../utils/mutations';
import { QUERY_PROJECT, QUERY_ME } from '../../utils/queries';
// import ProjectForm from '../ProjectForm';

const ProjectsList = ({
  projects,
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

    } catch (err) {

      console.error(err);
    }
  };


  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [projectId, setProjectId] = useState('');

  const [updateProject] = useMutation(UPDATE_PROJECT,
    {
      update(cache, { data: {
        updateProject } }) {
        try {
          cache.writeQuery({
            query: QUERY_ME,
            data: { me: updateProject },
          });
        } catch (e) {
          console.error(e);
        }
      },
    });


  const handleUpdateProject = async (event) => {
    event.preventDefault();

    try {

      const { data } = await updateProject({
        variables:
        {
          projectId: projectId,
          title: title,
          description: description,
        },
      });
      setTitle('');
      setDescription('');
      setProjectId('');
    } catch (err) {

      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'title' && value.length <= 280) {
      setTitle(value);
    }
    if (name === 'description' && value.length <= 280) {
      setDescription(value);
    }
    if (name === 'projectId' && value.length <= 280) {
      setProjectId(value);
    }
  };


  const [completedProject] = useMutation(COMPLETED_PROJECT,
    {
      update(cache, { data: {
        completedProject } }) {
        try {
          cache.writeQuery({
            query: QUERY_ME,
            data: { me: completedProject },
          });
        } catch (e) {
          console.error(e);
        }
      },
    });

  const handleCompletedProject = async (updatedProject) => {

    try {
      console.log("LINE 121!!!!!")
      console.log(updatedProject._id)
      console.log(updatedProject.completed)
      let projectId = updatedProject._id;
      let completed = updatedProject.completed;
      console.log(completed);
      const { data } = await completedProject({

        variables:
        {
          projectId: projectId,
          completed: completed,
        },
      });
    } catch (err) {
      let projectId = updatedProject._id;
      let completed = updatedProject.completed;
      console.log(completed)
      console.log(projectId)
      console.error(err);
    }
  };

  const handleUpdateFalse = (project) => {
    if (!project.completed) {
      const updatedProject = {
        ...project,
        completed: true
      };
      console.log(updatedProject)
      handleCompletedProject(updatedProject)
    }
    return project
  };

  const handleUpdateTrue = (project) => {
    if (project.completed) {
      const updatedProject = {
        ...project,
        completed: false
      };
      console.log(updatedProject)
      handleCompletedProject(updatedProject)
    }
    return project
  };










  return (
    <div>
      {showTitle && <h3>{title}</h3>}

      <div className="container " style={{ backgroundColor: 'white' }}>
        <div className="row p-5">
          <h2 className='col-10'>Projects</h2>

          <button type="button" className="btn btn-main col-2" data-bs-toggle="modal" data-bs-target="#exampleModal">Add New Project</button>

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

                        <span className={project.completed ? "row completed" : "row notCompleted"} style={{ fontSize: '1rem' }}>
                          <h5 className='col-8'>{project.title}</h5>
                          <p className=''> {project.description}</p>
                        </span>

                      </Link>

                    </>
                  )}
                </h2>

                <button type="button" className="btn btn-main col-1 m-5 mx-1" data-bs-toggle="modal" data-bs-target={`#exampleModal2${project._id}`}  >Edit</button>


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
                          onSubmit={handleUpdateProject}
                        >

                          <div className="col-12 col-lg-9"
                          >
                            <label for="projectTitle" className="form-label"

                            >
                              Project Title</label>

                            <input
                              name="title"

                              value={title}
                              placeholder={project.title}
                              className='form-control'
                              onChange={handleChange}
                            ></input>

                            <label for="projectDescription" className="form-label">Description</label>

                            <textarea
                              name="description"
                              placeholder={project.description}
                              value={description}
                              className="form-control w-100"
                              style={{ lineHeight: '1.5', resize: 'vertical' }}
                              onChange={handleChange}
                            ></textarea>

                          </div>

                          <div className="modal-footer mt-4">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <div className="col-12 col-lg-3">
                              <button className="btn btn-main" type="submit" data-bs-dismiss="modal"
                                name="projectId"
                                value={project._id}
                                onClick={handleChange}>
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

                <button className="btn btn-delete col-1 m-5 mx-1 text-center" onClick={() => handleRemoveProject(project)} >Delete</button>






                {project.completed ?
                  <button className="btn btn-secondary col-1 m-5 mx-2" onClick={() => {
                    handleUpdateTrue(project)
                  }}
                  >Completed</button> :
                  <button className="btn btn-success col-1 m-5 mx-2"
                    onClick={() => {
                      handleUpdateFalse(project)
                    }}>
                    Complete</button>}

              </div>
            ))}
        </div>
      </div >
    </div>
  );
};

export default ProjectsList;