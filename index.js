// index.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes'); // Your auth routes

dotenv.config();

const app = express();

// ✅ Middleware must come before routes
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests

// ✅ Test root route
app.get('/', (req, res) => {
  res.send('🐾 Cura Pet API is running');
});

// // ✅ Test POST route to check req.body is working
// app.post('/post', (req, res) => {
//   console.log('📥 Received body:', req.body);
//   res.status(200).json({
//     success: true,
//     received: req.body
//   });
// });

// ✅ Auth routes
// app.use('/api/auth', authRoutes);

// ✅ Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
  });
})
.catch((err) => {
  console.error('MongoDB connection failed:', err.message);
});
