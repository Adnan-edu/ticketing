import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import request from 'supertest';
import jwt from 'jsonwebtoken';

declare global{
    var signin: ()=>string[];
}


let mongo: any;

jest.mock('../nats-wrapper');

//This would run before all our test

beforeAll(async ()=>{
    process.env.JWT_KEY = 'asdf';
    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();
    await mongoose.connect(mongoUri, {});

});

//This would run before each of our test

beforeEach(async ()=>{
    jest.clearAllMocks();
    const collections = await mongoose.connection.db.collections();
    for(let collection of collections){
        await collection.deleteMany({});
    }
});

afterAll(async () => {
	if (mongo) {
	await mongo.stop();
	}
	await mongoose.connection.close();
});

global.signin =  ()=>{
// Building a JWT payload.  { id, email }
const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com',
  };

  // Creating the JWT!
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Building session Object. { jwt: MY_JWT }
  const session = { jwt: token };

  // Turning that session into JSON
  const sessionJSON = JSON.stringify(session);

  // Taking JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64');

  // Returning a string thats the cookie with the encoded data
  return [`session=${base64}`];
}