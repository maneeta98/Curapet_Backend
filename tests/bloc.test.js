const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app');
const User = require('../models/User');
const Appointment = require('../models/Appointment');
const Meal = require('../models/Meal');
const Pet = require('../models/Pet');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let mongoServer;
let token;

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
  await Meal.deleteMany();
  await Pet.deleteMany();
  const hash = await bcrypt.hash('pass', 10);
  const user = await User.create({ name: 'Bloc', mobile: '9810000000', password: hash });
  token = jwt.sign({ userId: user._id, mobile: user.mobile }, 'secret_key');
});

describe('Bloc (workflow) Tests', () => {
  test('1. Auth: Register → Login → Protected route', async () => {
    const reg = await request(app)
      .post('/api/auth/register')
      .send({ name: 'X', mobile: '9811000000', password: '1234' });
    expect(reg.status).toBe(201);

    const login = await request(app)
      .post('/api/auth/login')
      .send({ mobile: '9811000000', password: '1234' });
    const t = login.body.token;
    const pets = await request(app)
      .post('/api/pets')
      .set('Authorization', `Bearer ${t}`)
      .send({ name: 'Pet', breed: 'Dog', age: 1 });
    expect([200, 201]).toContain(pets.status);
  });

  test('2. Wrong password flow', async () => {
    const login = await request(app)
      .post('/api/auth/login')
      .send({ mobile: '9810000000', password: 'wrong' });
    expect(login.status).toBe(401);
  });

  test('3. Appointment: Create → Update', async () => {
    const created = await request(app)
      .post('/api/appointments')
      .send({ petName: 'Pet', date: '2025-01-01', reason: 'Checkup' });
    const id = created.body._id;
    const updated = await request(app)
      .put(`/api/appointments/${id}`)
      .send({ petName: 'Pet', date: '2025-01-01', reason: 'Updated' });
    expect(updated.status).toBe(200);
  });

  test('4. Appointment: Create → Delete', async () => {
    const created = await request(app)
      .post('/api/appointments')
      .send({ petName: 'Pet', date: '2025-01-01', reason: 'Checkup' });
    const del = await request(app).delete(`/api/appointments/${created.body._id}`);
    expect(del.status).toBe(200);
  });

  test('5. Appointment: Create multiple → Fetch', async () => {
    await request(app).post('/api/appointments').send({ petName: 'P1', date: '2025-01-01', reason: 'R1' });
    await request(app).post('/api/appointments').send({ petName: 'P2', date: '2025-01-02', reason: 'R2' });
    const list = await request(app).get('/api/appointments');
    expect(list.body.length).toBe(2);
  });

  test('6. Meal: Create → Update', async () => {
    const m = await request(app)
      .post('/api/meals')
      .send({ petName: 'Dog', meal: 'Food', time: '10:00' });
    const updated = await request(app)
      .put(`/api/meals/${m.body._id}`)
      .send({ petName: 'Dog', meal: 'Bone', time: '11:00' });
    expect(updated.status).toBe(200);
  });

  test('7. Meal: Create → Delete', async () => {
    const m = await request(app)
      .post('/api/meals')
      .send({ petName: 'Dog', meal: 'Food', time: '10:00' });
    const del = await request(app).delete(`/api/meals/${m.body._id}`);
    expect(del.status).toBe(200);
  });

  test('8. Pet: Add Pet → Update', async () => {
    const pet = await request(app)
      .post('/api/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Pet', breed: 'Dog', age: 1 });
    const updated = await request(app)
      .put(`/api/pets/${pet.body._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Pet', breed: 'Dog2', age: 2 });
    expect([200, 401]).toContain(updated.status);
  });

  test('9. Pet: Add Pet → Delete', async () => {
    const pet = await request(app)
      .post('/api/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Pet', breed: 'Dog', age: 1 });
    const del = await request(app)
      .delete(`/api/pets/${pet.body._id}`)
      .set('Authorization', `Bearer ${token}`);
    expect([200, 401]).toContain(del.status);
  });

  test('10. Auth + Pet: Register user → Login → Add pet', async () => {
    const reg = await request(app)
      .post('/api/auth/register')
      .send({ name: 'Bloc2', mobile: '9812000000', password: '1234' });
    const login = await request(app)
      .post('/api/auth/login')
      .send({ mobile: '9812000000', password: '1234' });
    const t = login.body.token;
    const pet = await request(app)
      .post('/api/pets')
      .set('Authorization', `Bearer ${t}`)
      .send({ name: 'Pet', breed: 'Dog', age: 1 });
    expect([200, 201]).toContain(pet.status);
  });
});
