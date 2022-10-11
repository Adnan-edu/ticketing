import express from "express";
import 'express-async-errors';
import { json } from "body-parser";
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signupRouter } from "./routes/signup";
import { signoutRouter } from "./routes/signout";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";
import mongoose from "mongoose";
import cookieSession from "cookie-session";

const app = express();
//express trust traffic as being secured even though it's coming from the proxy
app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({
  signed: false,    //JWT already encrypted, disable encryption
  secure: true      //Only be used over HTTPS connections
}));

app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.all('*', async(req, res)=>{
  throw new NotFoundError();
})
app.use(errorHandler);

const start = async () => {
  try{
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    console.log('Connected to mongo db');
  }catch(err){
    console.log(err);
  }
  app.listen(3000, () => {
    console.log("Listening on port 3000!");
  });
};
start();