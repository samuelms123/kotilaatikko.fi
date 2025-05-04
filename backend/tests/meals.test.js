import request from 'supertest';
import app from '../src/app.js';
import promisePool from '../src/utils/database.js';

// Remember to turn Metropolia VPN on

afterAll(async () => {
  await promisePool.end();
});

describe('GET /api/v1/meals', () => {
  it('should return a list of meals', async () => {
    const res = await request(app).get('/api/v1/meals');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('GET /api/v1/meals/:id', () => {
  it('should return a meal by ID', async () => {
    const res = await request(app).get('/api/v1/meals/5');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', 5);
  });

  it('should return 404 for non-existing meal', async () => {
    const res = await request(app).get('/api/v1/meals/9999');
    expect(res.statusCode).toBe(404);
  });
});
