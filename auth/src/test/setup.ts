import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';


let mongo: any;

//This would run before all our test

beforeAll(async ()=>{
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