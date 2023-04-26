import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';

function AskChatGPT({ showNavbar = true }) {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = { prompt };

    try {
      const response = await axios.post("http://localhost:8000/chat", data);
      setResponse(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-fluid">
      {showNavbar && <Navbar />}
      <div className="container mt-3" style={{ backgroundColor: 'white' }}>
        <div className="row p-5 text-center">
          <h4 className="col-12 mb-3" id="helpChatGPT">Feeling stuck? Ask Chat GPT for help.</h4>
          <h6 className="col-12 mb-3" id="helpChatGPT">(Be patient, this can take up to 10 seconds.)</h6>
          <form onSubmit={handleSubmit}>
            <textarea className="form-control col-12 mb-3"
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <button type="submit" className="col-12 btn btn-main">
              Ask
            </button>

          </form>
          <br />
          {response &&
            <div className="col-12 mt-3">
              <pre className="response" style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>{response}</pre>
            </div>
          }
        </div>
      </div>

    </div>
  );
};

export default AskChatGPT;