const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

console.log(process.env);

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const app = express();
app.use(bodyParser.json());
app.use(cors())

app.post("/chat", async (req, res) => {
  const { prompt } = req.body;

  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: prompt,
  });
  res.send(completion.data.choices[0].text);
});

const port = 3000;
app.listen(port, () => {
  console.log(`I can heeeeeaaaar yoooooouuuuu on port ${port}`);
});