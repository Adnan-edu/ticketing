import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import request from 'supertest';

declare global{
    function signin(): Promise<string[]>;
}


let mongo: any;

//This would run before all our test

beforeAll(async ()=>{
    process.env.JWT_KEY = 'asdf';
    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();
    await mongoose.connect(mongoUri, {});

});

//This would run before each of our test

beforeEach(async ()=>{
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

global.signin = async ()=>{
    const email = 'test@test.com';
    const password = 'password';

    const response = await request(app)
                            .post('/api/users/signup')
                            .send({
                                email, password
                            }).expect(201);

    const cookie = response.get('Set-Cookie');
    return cookie;
}