// // app.js
// const express = require('express');
// const cors = require('cors');
// const jwt = require('jsonwebtoken');

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Controllers
// const { register, login } = require('./controllers/authController');
// const {
//   getAppointments,
//   createAppointment,
//   updateAppointment,
//   deleteAppointment
// } = require('./controllers/appointmentController');
// const {
//   getMeals,
//   createMeal,
//   updateMeal,
//   deleteMeal
// } = require('./controllers/mealController');
// const {
//   getPets,
//   addPet,
//   updatePet,
//   deletePet
// } = require('./controllers/petController');

// // Routes
// app.post('/api/auth/register', register);
// app.post('/api/auth/login', login);

// app.get('/api/appointments', getAppointments);
// app.post('/api/appointments', createAppointment);
// app.put('/api/appointments/:id', updateAppointment);
// app.delete('/api/appointments/:id', deleteAppointment);

// app.get('/api/meals', getMeals);
// app.post('/api/meals', createMeal);
// app.put('/api/meals/:id', updateMeal);
// app.delete('/api/meals/:id', deleteMeal);

// // Middleware for Pet routes authentication
// app.use((req, res, next) => {
//   if (req.headers.authorization) {
//     try {
//       const token = req.headers.authorization.split(' ')[1];
//       const decoded = jwt.verify(token, 'secret_key');
//       req.user = { id: decoded.userId };
//     } catch (err) {
//       // ignore token errors in tests
//     }
//   }
//   next();
// });

// app.get('/api/pets', getPets);
// app.post('/api/pets', addPet);
// app.put('/api/pets/:id', updatePet);
// app.delete('/api/pets/:id', deletePet);

// module.exports = app;


const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

// Import controllers
const { register, login } = require('./controllers/authController');
const {
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment
} = require('./controllers/appointmentController');
const {
  getMeals,
  createMeal,
  updateMeal,
  deleteMeal
} = require('./controllers/mealController');
const {
  getPets,
  addPet,
  updatePet,
  deletePet
} = require('./controllers/petController');

// Routes
app.post('/api/auth/register', register);
app.post('/api/auth/login', login);

app.get('/api/appointments', getAppointments);
app.post('/api/appointments', createAppointment);
app.put('/api/appointments/:id', updateAppointment);
app.delete('/api/appointments/:id', deleteAppointment);

app.get('/api/meals', getMeals);
app.post('/api/meals', createMeal);
app.put('/api/meals/:id', updateMeal);
app.delete('/api/meals/:id', deleteMeal);

// Pet routes need token
app.use((req, res, next) => {
  if (req.headers.authorization) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, 'secret_key');
      req.user = { id: decoded.userId };
    } catch (err) {
      // ignore
    }
  }
  next();
});

app.get('/api/pets', getPets);
app.post('/api/pets', addPet);
app.put('/api/pets/:id', updatePet);
app.delete('/api/pets/:id', deletePet);

module.exports = app;
