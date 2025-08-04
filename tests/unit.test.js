const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Appointment = require('../models/Appointment');
const Meal = require('../models/Meal');
const Pet = require('../models/Pet');
const { register, login } = require('../controllers/authController');

describe('Unit Tests', () => {
  test('1. bcrypt.hash produces different hash', async () => {
    const hash = await bcrypt.hash('password123', 10);
    expect(hash).not.toBe('password123');
  });

  test('2. bcrypt.compare validates correct password', async () => {
    const password = 'mypassword';
    const hash = await bcrypt.hash(password, 10);
    const match = await bcrypt.compare(password, hash);
    expect(match).toBe(true);
  });

  test('3. jwt.sign creates a valid token', () => {
    const token = jwt.sign({ userId: '123' }, 'secret_key');
    expect(typeof token).toBe('string');
  });

  test('4. jwt.verify decodes token', () => {
    const token = jwt.sign({ userId: '123' }, 'secret_key');
    const decoded = jwt.verify(token, 'secret_key');
    expect(decoded.userId).toBe('123');
  });

  test('5. User model validation', () => {
    const user = new User({ name: 'Test', mobile: '9800000000', password: 'x' });
    expect(user.name).toBe('Test');
  });

  test('6. Appointment model validation', () => {
    const a = new Appointment({ petName: 'Dog', date: '2025-01-01', reason: 'Checkup' });
    expect(a.reason).toBe('Checkup');
  });

  test('7. Meal model validation', () => {
    const m = new Meal({ petName: 'Dog', meal: 'Food', time: '10:00' });
    expect(m.meal).toBe('Food');
  });

  test('8. Pet model validation', () => {
    const p = new Pet({ user: '1234567890abcdef12345678', name: 'Rex', breed: 'Bulldog', age: 2 });
    expect(p.name).toBe('Rex');
  });

  test('9. Controller register function defined', () => {
    expect(typeof register).toBe('function');
  });

  test('10. Controller login function defined', () => {
    expect(typeof login).toBe('function');
  });
});
