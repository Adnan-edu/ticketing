import express from "express";
import 'express-async-errors';
import { json } from "body-parser";
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signupRouter } from "./routes/signup";
import { signoutRouter } from "./routes/signout";
import { errorHandler, NotFoundError } from '@adnan-edu-tickets/common';
import cookieSession from "cookie-session";



const app = express();
//express trust traffic as being secured even though it's coming from the proxy
app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({
  signed: false,    //JWT already encrypted, disable encryption
  secure: process.env.NODE_ENV !== 'test'      //Only be used over HTTPS connections
}));

app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.all('*', async(req, res)=>{
  throw new NotFoundError();
})
app.use(errorHandler);

export { app };