import React from "react";
import Navbar from '../components/Navbar';
import StepList from '../components/StepsList';
import StepForm from '../components/StepForm';
import { useLocation } from "react-router-dom";
import { QUERY_PROJECT } from '../utils/queries';
import { useQuery } from '@apollo/client';
import AskChatGPT from '../components/AskChatGPT';



const Steps = () => {
    const location = useLocation()

    const { projectId } = location.state
    const { loading, data } = useQuery(QUERY_PROJECT, {
        variable: { projectId: projectId },
    })


    const project = data?.project || {};
    console.log(project)

    if (loading) {
        return <div>loading...</div>;
    }

    return (
        <div className="container-fluid">
            <Navbar />

            <div className="container mt-3" style={{ backgroundColor: 'white' }}>
                <div className="row  p-5 ">
                    <div className="col-10">
                        <h2 id="projectName">Project: {projectId.title}</h2>
                        <h5>{projectId.description}</h5>
                    </div>
                    <div className="col-2">
                        <button type="button" className="btn btn-main px-4" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Add New Step
                        </button>
                    </div>
                    {/* <h6>Project author: {projectId.projectAuthor}</h6> */}
                </div>

                <StepList steps={projectId.steps} />

                {/* Modal */}
                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">

                                <h1 className="modal-title fs-5" id="exampleModalLabel">Add a New Step</h1>

                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>

                            <StepForm projectId={projectId._id} />

                        </div>
                    </div>
                </div>

                <div>
                    <div className="row p-2 mt-2 text-center">
                        {/* <h5 className="col-12 mb-3" id="helpChatGPT">Feeling stuck? Ask Chat GPT for help...</h5> */}
                        <AskChatGPT showNavbar={false} />
                        {/* <textarea className="form-control col-12 mb-3" aria-label="With textarea"></textarea>

                                <button type="submit" className="col-12 btn btn-main">
                                    Ask
                                </button> */}
                    </div>


                </div>

            </div>

        </div>
    );
};

export default Steps;