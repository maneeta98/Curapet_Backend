const express = require('express');
const app = express();
const cors = require('cors');
require('./config/db')();

app.use(cors());
app.use(express.json());

app.use('/api/pets', require('./routes/pets'));
app.use('/api/appointments', require('./routes/appointments'));

module.exports = app;
