import request from 'supertest';
import app from '../src/app.js';
import promisePool from '../src/utils/database.js';

// Remember to turn Metropolia VPN on
let testUserId;

afterAll(async () => {
  await promisePool.end();
});

describe('POST /api/v1/users', () => {
  it('should create a new user', async () => {
    const testUser = {
      first_name: 'jest',
      last_name: 'test',
      address: 'jesteri',
      email: 'jest@test.fi',
      password: 'password',
      phone: '0405222123',
      city: 'Jest City',
      postal_code: '12345',
    };
    const res = await request(app).post('/api/v1/users').send(testUser);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message', 'New user added.');
    testUserId = res.body.result.user_id;
  });
});

describe('DELETE /api/v1/users/:id', () => {
  it('should delete a user', async () => {
    const res = await request(app).delete(`/api/v1/users/${testUserId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'User deleted successfully');
  });

  it('should return 404 for non-existing user', async () => {
    const res = await request(app).delete(`/api/v1/users/99991`);
    expect(res.statusCode).toBe(404);
  });
});
