import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';

function AskChatGPT() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = { prompt };

    try {
      const response = await axios.post("/chat", data);
      setResponse(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-fluid">
      <Navbar />
      <div className="container mt-3" style={{ backgroundColor: 'white', height: '45rem' }}>
        <div className="row p-5 text-center">
          <h5 className="col-12 mb-3" id="helpChatGPT">Feeling stuck? Ask Chat GPT for help</h5>

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
          <p>{response}</p>
        </div>
      </div>

    </div>
  );
};

export default AskChatGPT;