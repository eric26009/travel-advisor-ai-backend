import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";
import { ChatOpenAI } from "@langchain/openai";

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

const chatModel = new ChatOpenAI({ apiKey: process.env.OPEN_AI_API_KEY });

app.get("/", async (req: Request, res: Response) => {
  const output = await test();
  res.json({ response: output });
});

const test = async () => {
  return await chatModel
    .invoke(
      `
  I want to go on a vacation but I do not know where I want to go yet. I am located in Seattle, WA. I am thinking of an international trip. I want to go during the month of June. Can you recommend 10 places for me to go? Can you return this as a json object, the location should have the key "location" and then why part should have the key "why".`
    )
    .then((out) => JSON.parse(out.content as string))
    .catch((e) => console.log(e.message));
};

app.listen(port, () => {});
