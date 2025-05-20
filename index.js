const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Configuration, OpenAIApi } = require('openai');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY
}));

app.post("/ask", async (req, res) => {
  const { question } = req.body;
  const chat = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You're an expert in C programming." },
      { role: "user", content: question }
    ]
  });
  res.json({ answer: chat.data.choices[0].message.content });
});

app.listen(3000, () => console.log("Backend running on port 3000"));
