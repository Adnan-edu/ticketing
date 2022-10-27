import express from "express";
import 'express-async-errors';
import { json } from "body-parser";

import { errorHandler, NotFoundError } from '@adnan-edu-tickets/common';
import cookieSession from "cookie-session";
import { createTicketRouter } from "./routes/new";



const app = express();
//express trust traffic as being secured even though it's coming from the proxy
app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({
  signed: false,    //JWT already encrypted, disable encryption
  secure: process.env.NODE_ENV !== 'test'      //Only be used over HTTPS connections
}));
app.use(createTicketRouter);
app.all('*', async(req, res)=>{
  throw new NotFoundError();
})
app.use(errorHandler);

export { app };