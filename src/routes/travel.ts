import { Router } from 'express';

import { knownDestination, unknownDestination } from '../controllers';
import { checkAccessCode } from '../middleware';

const unknownDestinationRouter = Router();

unknownDestinationRouter.get('/unknown', checkAccessCode, unknownDestination);
unknownDestinationRouter.get('/known', checkAccessCode, knownDestination);

export { unknownDestinationRouter };
