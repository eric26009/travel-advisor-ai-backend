import { getDestinationAI } from './backend/ai';
import express, {
  Express,
  Request,
  Response,
  Application,
  NextFunction
} from 'express';
import dotenv from 'dotenv';

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.get('/', async (req: Request, res: Response) => {
  res.send(
    '<div><h2>Tomato Egg Project API<h2> <h3>Created by Eric Feldman & Steve Chen<h3/></div>'
  );
});

app.get(
  '/destination',
  async (req: Request, res: Response, next: NextFunction) => {
    const { location, type, month } = req.query;
    console.log(location, type, month);
    if (!location || !type || !month) {
      res.status(400).json({ error: 'Missing required parameters' });
    }
    const payload = {
      startingLocation: location as string,
      type: type as string,
      monthOfTravel: month as string
    };

    await getDestinationAI(payload, res, next);
  }
);

app.listen(port, () => {
  console.log('Server listening on Port', port);
});
