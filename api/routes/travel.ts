import { Router } from 'express';

import { activity, destination } from '../controllers';
import { checkAccessCode } from '../middleware';

const travelRouter = Router();

travelRouter.get('/destination', checkAccessCode, destination);
travelRouter.get('/activity', checkAccessCode, activity);

export { travelRouter };
