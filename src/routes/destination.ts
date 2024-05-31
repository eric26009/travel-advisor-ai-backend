import { Router, Request, Response, NextFunction } from 'express';

import { knownDestination, unknownDestination } from '../controllers';

const unknownDestinationRouter = Router();

unknownDestinationRouter.get('/unknown', unknownDestination);
unknownDestinationRouter.get('/known', knownDestination);

export { unknownDestinationRouter };
