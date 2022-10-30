import express from "express";
import 'express-async-errors';
import { json } from "body-parser";

import { errorHandler, NotFoundError, currentUser } from '@adnan-edu-tickets/common';
import cookieSession from "cookie-session";
import { createTicketRouter } from "./routes/new";
import { showTicketRouter } from "./routes/show";



const app = express();
//express trust traffic as being secured even though it's coming from the proxy
app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({
  signed: false,    //JWT already encrypted, disable encryption
  secure: process.env.NODE_ENV !== 'test'      //Only be used over HTTPS connections
}));
app.use(currentUser);
app.use(createTicketRouter);
app.use(showTicketRouter);

app.all('*', async(req, res)=>{
  throw new NotFoundError();
})
app.use(errorHandler);

export { app };