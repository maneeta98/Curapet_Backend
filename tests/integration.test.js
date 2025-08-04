const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app');
const User = require('../models/User');
const Appointment = require('../models/Appointment');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await User.deleteMany();
  await Appointment.deleteMany();
});

describe('Integration Tests', () => {
  test('1. POST /api/auth/register', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'John', mobile: '9800000000', password: '123456' });
    expect(res.status).toBe(201);
  });

  test('2. POST /api/auth/register (duplicate)', async () => {
    await User.create({ name: 'Jane', mobile: '9801111111', password: 'x' });
    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'Jane', mobile: '9801111111', password: 'x' });
    expect(res.status).toBe(400);
  });

  test('3. POST /api/auth/login valid', async () => {
    const hash = await bcrypt.hash('mypassword', 10);
    await User.create({ name: 'U', mobile: '9802222222', password: hash });
    const res = await request(app)
      .post('/api/auth/login')
      .send({ mobile: '9802222222', password: 'mypassword' });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  test('4. POST /api/auth/login invalid password', async () => {
    const hash = await bcrypt.hash('pass', 10);
    await User.create({ name: 'U', mobile: '9803333333', password: hash });
    const res = await request(app)
      .post('/api/auth/login')
      .send({ mobile: '9803333333', password: 'wrong' });
    expect(res.status).toBe(401);
  });

  test('5. POST /api/appointments', async () => {
    const res = await request(app)
      .post('/api/appointments')
      .send({ petName: 'Dog', date: '2025-01-01', reason: 'Checkup' });
    expect(res.status).toBe(201);
  });

  test('6. GET /api/appointments', async () => {
    const res = await request(app).get('/api/appointments');
    expect(res.status).toBe(200);
  });

  test('7. PUT /api/appointments/:id', async () => {
    const appt = await Appointment.create({ petName: 'Dog', date: '2025-01-01', reason: 'Checkup' });
    const res = await request(app)
      .put(`/api/appointments/${appt._id}`)
      .send({ petName: 'Dog', date: '2025-01-01', reason: 'Updated' });
    expect(res.status).toBe(200);
  });

  test('8. DELETE /api/appointments/:id', async () => {
    const appt = await Appointment.create({ petName: 'Dog', date: '2025-01-01', reason: 'Checkup' });
    const res = await request(app).delete(`/api/appointments/${appt._id}`);
    expect(res.status).toBe(200);
  });

  test('9. POST /api/meals', async () => {
    const res = await request(app)
      .post('/api/meals')
      .send({ petName: 'Dog', meal: 'Food', time: '10:00' });
    expect(res.status).toBe(201);
  });

  test('10. POST /api/pets with token', async () => {
    const user = await User.create({ name: 'P', mobile: '9804444444', password: 'x' });
    const token = jwt.sign({ userId: user._id, mobile: user.mobile }, 'secret_key');
    const res = await request(app)
      .post('/api/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Rex', breed: 'Husky', age: 2 });
    expect([200, 201]).toContain(res.status);
  });
});
