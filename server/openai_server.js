const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(cors())

const openaiApi = axios.create({
  baseURL: "https://api.openai.com/v1/",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
  }
});

app.post("/chat", async (req, res) => {
  const { prompt } = req.body;

  const response = await openaiApi.post("completions", {
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 500,
  });

  res.send(response.data.choices[0].text);
});

const port = 3000;
app.listen(port, () => {
  console.log(`I can heeeeeaaaar yoooooouuuu on port ${port}`);
});