import React from "react";
import Navbar from '../components/Navbar';
import StepForm from '../components/StepsList';
const Steps = () => {
    return (
        <div className="container-fluid">
            <Navbar />



            <div className="container mt-3" style={{ backgroundColor: 'white', height: '45rem' }}>
                <div className="row p-5">
                    <h2 id="projectName">Project Name: Steps</h2>
                </div>

                <div className="row d-flex align-items-center justify-content-center">
                    <h5 className="col-4">Buy instrument</h5>
                    <button className="btn btn-outline col-1 mx-2" type="button" data-bs-toggle="modal"
                        data-bs-target="#exampleModal2">Edit</button>
                    <button className="btn btn-delete col-1 mx-2 p-2">Completed</button>
                </div>

                {/* Modal */}
                <div className="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Step</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">

                                <form className="row g-3">
                                    <div className="col-12">
                                        <label for="stepNewDescription" className="form-label">New Description</label>
                                        <input type="" className="form-control" id="inputProjectDescription" />
                                    </div>
                                    {/* <div className="col-12">
                                    <label for="projectDescription" className="form-label">Budget</label>
                                    <input type="" className="form-control" id="inputStepBudget"/>
                                </div>  */}
                                    {/* 
                                <input type="submit" value="signup" className="signup-button" />
                                <br> */}
                                </form>
                                <div className="modal-footer mt-4">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-main">Save Step</button>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>

                <div className="row d-flex align-items-center justify-content-center mt-3">
                    <h5 className="col-4">Search for free classes</h5>

                    <button className="btn btn-outline col-1 mx-2">Edit</button>
                    <button className="btn btn-delete col-1 mx-2 p-2">Completed</button>
                </div>

                <div className="row d-flex align-items-center justify-content-center mt-5">
                    {/* <button className="btn btn-main col-2">Add New Project</button>  */}

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
                                <StepForm/>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">

                                <form className="row g-3">
                                    <div className="col-12">
                                        <label for="projectDescription" className="form-label">Description</label>
                                        <input type="" className="form-control" id="inputProjectDescription" />
                                    </div>
                                    {/* <div className="col-12">
                                    <label for="projectDescription" className="form-label">Budget</label>
                                    <input type="" className="form-control" id="inputStepBudget"/>
                                </div> */}

                                    {/* <input type="submit" value="signup" className="signup-button" />
                                <br> */}
                                </form>
                                <div className="modal-footer mt-4">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-main">Save Step</button>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>

                <div>
                    <div className="row p-5 mt-5 text-center">
                        <h5 className="col-12 mb-3" id="helpChatGPT">Feeling stuck? Ask Chat GPT for help...</h5>
                        <textarea className="form-control col-12 mb-3" aria-label="With textarea"></textarea>

                        <button type="submit" className="col-12 btn btn-main">
                            Ask
                        </button>
                    </div>
                    {/* <br />
          <p>{response}</p> */}

                </div>

            </div>
            
        </div>
    );
};

export default Steps;