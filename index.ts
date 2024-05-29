import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";
import { ChatOpenAI } from "@langchain/openai";

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

const chatModel = new ChatOpenAI({ apiKey: process.env.OPEN_AI_API_KEY });

app.get("/", (req: Request, res: Response) => {
  res.send(test());
});

const test = async () => {
  return await chatModel.invoke("Hello!").catch((e) => console.log(e.message));
};

app.listen(port, () => {
  console.log(test());
});
