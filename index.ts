import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.get("/", (req: Request, res: Response) => {
  res.send("Init Test Server");
});

app.listen(port, () => {
  console.log(`Server is live at http://localhost:${port}`);
});
