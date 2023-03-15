import React from "react";
import Navbar from '../components/Navbar';
import StepForm from '../components/StepsList';
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

            <div className="container mt-3" style={{ backgroundColor: 'white', height: '45rem' }}>
                <div className="row p-5">
                    <h2 id="projectName">Project Name: {projectId.title}</h2>
                    <h5>Project description: {projectId.description}</h5>
                    <h6>Project author: {projectId.projectAuthor}</h6>
                    
                </div>
                
                        <div className="row d-flex align-items-center justify-content-center mt-3">
                            <h5 className="col-4">{projectId.steps.map((step) => (
                    <div key={step._id} className="col-12 mb-3 pb-3">
                        <h6>Step: {step.stepText}</h6>
                        <h6>Date: {step.createdAt}</h6>
                        <h6>{step.completed}</h6>
                        <button className="btn btn-outline col-1 mx-1 w-25">Edit</button>
                            <button className="btn btn-delete col-1 mx-2 p-1 w-25">Completed</button></div>
                       ))}</h5>

                            
                        </div>

                        <div className="row d-flex align-items-center justify-content-center mt-5">

                            <button type="button" className="btn btn-main col-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Add New Step
                            </button>
                        </div>
                        {/* Modal */}
                        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">

                                        <h1 className="modal-title fs-5" id="exampleModalLabel">Add a New Step</h1>
                                        <StepForm projectId={projectId} project={project} />
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">



                                    </div>

                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="row p-2 mt-2 text-center">
                                {/* <h5 className="col-12 mb-3" id="helpChatGPT">Feeling stuck? Ask Chat GPT for help...</h5> */}
                                <AskChatGPT showNavbar={false} />
                                <textarea className="form-control col-12 mb-3" aria-label="With textarea"></textarea>

                                <button type="submit" className="col-12 btn btn-main">
                                    Ask
                                </button>
                            </div>


                        </div>

                    </div>
            
        </div>
            );
};

            export default Steps;