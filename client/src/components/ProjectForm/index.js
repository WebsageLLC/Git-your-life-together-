import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_PROJECT } from '../../utils/mutations';
import { QUERY_PROJECT, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const ProjectForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    // const [characterCount, setCharacterCount] = useState(0);

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
                data: { me: { ...me, Projects: [...me.Projects, addProject] } },
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
                    projectAuthor: Auth.getProfile().data.username,
                },
            });

            setTitle('');
            setDescription('');
        } catch (err) {
            console.error(err);
        }
    };

    // const handleChange = (event) => {
    //     const { name, value } = event.target;

    //     if (name === 'title' && value.length <= 280) {
    //         setTitle(value);
    //         // setCharacterCount(value.length);
    //     }

    //     if (name === 'description' && value.length <= 280) {
    //         setTitle(value);
    //         // setCharacterCount(value.length);
    //     }

    // };

    return (
        <div>
            <h3>Add a Project</h3>

            {Auth.loggedIn() ? (
                <>
                    <form
                        className="flex-row justify-center justify-space-between-md align-center"
                        onSubmit={handleFormSubmit}
                    >
                        <div className="col-12 col-lg-9">
                            <input name="title" placeholder='add title' className='form-input'></input>
                            <textarea
                                name="description"
                                placeholder="Here's a new Project..."
                                // value={description}
                                className="form-input w-100"
                                style={{ lineHeight: '1.5', resize: 'vertical' }}
                            // onChange={handleChange}
                            ></textarea>
                        </div>

                        <div className="col-12 col-lg-3">
                            <button className="btn btn-primary btn-block py-3" type="submit">
                                Add Project
                            </button>
                        </div>
                        {error && (
                            <div className="col-12 my-3 bg-danger text-white p-3">
                                {error.message}
                            </div>
                        )}
                    </form>
                </>
            ) : (
                <p>
                    You need to be logged in to share your Projects. Please{' '}
                    <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
                </p>
            )}
        </div>
    );
};

export default ProjectForm;