import express from 'express';
import { requireAuth } from '@adnan-edu-tickets/common';

const routers = express.Router();

routers.post('/api/tickets', requireAuth, (req, res) => {
  res.sendStatus(200);
});

export { routers as createTicketRouter };
