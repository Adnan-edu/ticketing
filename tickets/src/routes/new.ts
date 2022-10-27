import express from 'express';

const routers = express.Router();

routers.post('/api/tickets', (req, res) => {
  res.sendStatus(200);
});

export { routers as createTicketRouter };
