import request from 'supertest';
import { app } from '../../app';
import { signinRouter } from '../signin';

it('Responds with details about the current user', async () => {
 
  const cookie = await global.signin();

  const response = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie) //You can set different headers here
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual('test@test.com');
});
