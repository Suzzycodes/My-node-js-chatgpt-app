import { Configuration, OpenAIApi } from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";


const app = express();
const port = 8000;
app.use(bodyParser.json());
app.use(cors());


app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });


  const configuration = new Configuration({
    organization: "org-N7UjzOn9IXbcFD87bSxudpZj",
    apiKey: "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",
  });
  const openai = new OpenAIApi(configuration);


  app.post("/", async (request, response) => {
    const { chats } = request.body;

    const result = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a SuzzyGPT. You can answer my questions",
          },
          ...chats,
        ],
      });
    
      response.json({
        output: result.data.choices[0].message,
      });
    
  });

  
