// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const connectDB = require('./config/db');  // path to your connectDB file

// const authRoutes = require('./routes/authRoutes');
// const petsRoutes = require('./routes/petsRoutes');
// const appointmentsRoutes = require('./routes/appointmentsRoutes');

// const app = express();

// app.use(cors({
//   origin: 'http://localhost:5173',
//   credentials: true,
// }));
// app.use(express.json());

// app.use('/api/auth', authRoutes);
// app.use('/api/pets', petsRoutes);
// app.use('/api/appointments', appointmentsRoutes);

// app.get('/', (req, res) => res.send('🐾 Cura Pet API running'));

// const PORT = process.env.PORT || 5000;

// connectDB()
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error('Failed to connect to DB:', err);
//   });


import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;

