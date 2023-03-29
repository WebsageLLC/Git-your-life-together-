import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_PROJECT } from '../../utils/mutations';
import { QUERY_PROJECT, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const ProjectForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [addProject, { error }] = useMutation(ADD_PROJECT, {
        update(cache, { data: { addProject } }) {
            try {
                const { Projects } = cache.readQuery({ query: QUERY_PROJECT });
                cache.writeQuery({
                    query: QUERY_PROJECT,
                    data: { Projects: [addProject, ...Projects] },
                });
            } catch (e) {
                console.error(e);
            }

            // update me object's cache
            const { me } = cache.readQuery({ query: QUERY_ME });
            cache.writeQuery({
                query: QUERY_ME,
                data: { me: { ...me, projects: [...me.projects, addProject] } },
            });
        },
    });

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await addProject({
                variables: {
                    title,
                    description,
                    completed: false,
                    projectAuthor: Auth.getProfile().data.username,

                },

            });
            setTitle('');
            setDescription('');
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

    };

    return (
        <div>

            {Auth.loggedIn() ? (
                <>

                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Add New Project</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>

                            <div className="modal-body">
                                <form
                                    className="flex-row"
                                    onSubmit={handleFormSubmit}
                                >
                                    <div className="col-12">
                                        <label for="projectTitle" className="form-label">Project Title</label>

                                        <input
                                            name="title"
                                            placeholder='Add project title here'
                                            value={title}
                                            className='form-control'
                                            onChange={handleChange}
                                        ></input>

                                        <label for="projectDescription" className="form-label">Description</label>

                                        <textarea
                                            name="description"
                                            placeholder="Here's a new Project..."
                                            value={description}
                                            className="form-control w-100"
                                            style={{ lineHeight: '1.5', resize: 'vertical' }}
                                            onChange={handleChange}
                                        ></textarea>

                                    </div>

                                    <div className="modal-footer col-12 mt-4">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                                        <button className="btn btn-main" type="submit" data-bs-dismiss="modal">
                                            Add Project
                                        </button>

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

                </>
            ) : (
                <p>
                    You need to be logged in to share your Projects. Please{' '}
                    <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
                </p>
            )
            }
        </div >
    );
};

export default ProjectForm;