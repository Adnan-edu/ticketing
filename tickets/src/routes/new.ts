import express, {Request, Response} from 'express';
import { requireAuth, validateRequest } from '@adnan-edu-tickets/common';
import { body } from 'express-validator';
import {Ticket} from '../models/ticket'

const routers = express.Router();

routers.post('/api/tickets', requireAuth, 
[
  body('title').not().isEmpty().withMessage('Title is required'),
  body('price')
    .isFloat({ gt: 0 })
    .withMessage('Price must be greater than 0'),
],
validateRequest,
async (req: Request, res: Response) => {
  const {title, price} = req.body;
  const ticket = Ticket.build({
    title,
    price,
    userId: req.currentUser!.id 
  });
  await ticket.save();
  res.status(201).send(ticket);
});

export { routers as createTicketRouter };
