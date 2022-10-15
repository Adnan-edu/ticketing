import request from 'supertest'; //Fake a request to express application
import {app} from '../../app';


it('Returns a 201 on successful signup', async()=>{
    return request(app)
            .post('/api/users/signup')
            .send({
                email: 'test123@test.com',
                password: 'password'
            })
            .expect(201)
});

it('Returns a 400 with an invalid email', async()=>{
    return request(app)
            .post('/api/users/signup')
            .send({
                email: 'test123',
                password: 'password'
            })
            .expect(400)
});

it('Returns a 400 with an invalid password', async()=>{
    return request(app)
            .post('/api/users/signup')
            .send({
                email: 'test123@gmail.com',
                password: 'p'
            })
            .expect(400)
});

it('Returns a 400 with missing email and password', async()=>{
    await request(app)
            .post('/api/users/signup')
            .send({
                email:'test123@test.com'
            })
            .expect(400);

    await request(app)
            .post('/api/users/signup')
            .send({
                password: 'password'
            })
            .expect(400);
});