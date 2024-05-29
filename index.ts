import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";
import { getDestinationAI } from "./backend/ai";
//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.get("/destination", async (req: Request, res: Response) => {
  const loc: string = req.query.location as string;
  console.log(`Request destination: ${loc}`);
  const output = await getDestinationAI(loc);
  res.json(output);
});

app.listen(port, () => {});
