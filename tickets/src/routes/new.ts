import express, {Request, Response} from 'express';
import { requireAuth, validateRequest } from '@adnan-edu-tickets/common';
import { body } from 'express-validator';
const routers = express.Router();

routers.post('/api/tickets', requireAuth, 
[
  body('title').not().isEmpty().withMessage('Title is required'),
  body('price')
    .isFloat({ gt: 0 })
    .withMessage('Price must be greater than 0'),
],
validateRequest,
(req: Request, res: Response) => {
  res.sendStatus(200);
});

export { routers as createTicketRouter };
