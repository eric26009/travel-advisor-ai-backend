import express, { Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import { unknownDestinationRouter } from './routes';
import cors from 'cors';

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3000'] // Whitelist the domains you want to allow
  })
);
app.use('/travel', unknownDestinationRouter);

app.get('/', async (req: Request, res: Response) => {
  res
    .status(200)
    .send(
      '<div><h2>Tomato Egg Project API<h2> <h3>Created by Eric Feldman & Steve Chen<h3/></div>'
    );
});

app.listen(port, () => {
  console.log('Server listening on Port', port);
});
