// // // // // const express = require("express");
// // // // // const cors = require("cors");
// // // // // const mongoose = require("mongoose");
// // // // // const authRoutes = require("./routes/authRoutes");
// // // // // const appointmentRoutes = require("./routes/appointmentRoutes");
// // // // // const mealRoutes = require("./routes/mealRoutes");

// // // // // const app = express();

// // // // // mongoose
// // // // //   .connect("mongodb://localhost:27017/cura-pet", {
// // // // //     useNewUrlParser: true,
// // // // //     useUnifiedTopology: true,
// // // // //   })
// // // // //   .then(() => console.log("MongoDB connected"))
// // // // //   .catch((err) => console.error("MongoDB error:", err));

// // // // // app.use(cors({
// // // // //   origin: 'http://localhost:5173',
// // // // //   credentials: true,
// // // // // }));
// // // // // app.use(express.json());

// // // // // // Routes
// // // // // app.use("/api/auth", authRoutes);
// // // // // app.use("/api/appointments", appointmentRoutes);
// // // // // app.use("/api/meals", mealRoutes);

// // // // // const PORT = 5050;
// // // // // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// // // // const express = require("express");
// // // // const cors = require("cors");
// // // // const mongoose = require("mongoose");
// // // // const authRoutes = require("./routes/authRoutes");
// // // // const appointmentRoutes = require("./routes/appointmentRoutes");
// // // // const mealRoutes = require("./routes/mealRoutes");

// // // // const app = express();

// // // // // MongoDB connection
// // // // mongoose
// // // //   .connect("mongodb://localhost:27017/cura-pet")
// // // //   .then(() => console.log("MongoDB connected"))
// // // //   .catch((err) => console.error("MongoDB error:", err));

// // // // // Middleware
// // // // app.use(
// // // //   cors({
// // // //     origin: "http://localhost:5173", // frontend URL
// // // //     credentials: true,
// // // //   })
// // // // );
// // // // app.use(express.json());

// // // // // Health-check endpoint
// // // // app.get("/api/health", (req, res) => {
// // // //   res.json({ status: "OK", message: "Cura-Pet backend is running" });
// // // // });

// // // // // Routes
// // // // app.use("/api/auth", authRoutes);
// // // // app.use("/api/appointments", appointmentRoutes);
// // // // app.use("/api/meals", mealRoutes);

// // // // // 404 Handler for unknown routes
// // // // app.use((req, res, next) => {
// // // //   res.status(404).json({ message: "Route not found" });
// // // // });

// // // // // Error handler
// // // // app.use((err, req, res, next) => {
// // // //   console.error("Server error:", err);
// // // //   res.status(500).json({ message: "Internal server error" });
// // // // });

// // // // // Start the server
// // // // const PORT = 5050;
// // // // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



// // // const express = require("express");
// // // const cors = require("cors");
// // // const mongoose = require("mongoose");
// // // const authRoutes = require("./routes/authRoutes");
// // // const appointmentRoutes = require("./routes/appointmentRoutes");
// // // const mealRoutes = require("./routes/mealRoutes");

// // // const app = express();

// // // mongoose.connect("mongodb://localhost:27017/cura-pet")
// // //   .then(() => console.log("MongoDB connected"))
// // //   .catch(err => console.error("MongoDB error:", err));

// // // app.use(
// // //   cors({
// // //     origin: "*", 
// // //   })
// // // );


// // // // Routes
// // // app.use("/api/auth", authRoutes);
// // // app.use("/api/appointments", appointmentRoutes);
// // // app.use("/api/meals", mealRoutes);

// // // const PORT = 5050;
// // // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));






// // const express = require("express");
// // const cors = require("cors");
// // const mongoose = require("mongoose");
// // const authRoutes = require("./routes/authRoutes");
// // const appointmentRoutes = require("./routes/appointmentRoutes");
// // const mealRoutes = require("./routes/mealRoutes");

// // const app = express();

// // // MongoDB Connection
// // mongoose.connect("mongodb://localhost:27017/cura-pet")
// //   .then(() => console.log("MongoDB connected"))
// //   .catch(err => console.error("MongoDB error:", err));

// // // CORS Middleware
// // app.use(
// //   cors({
// //     origin: "http://localhost:5175", // match your Vite port
// //     credentials: true,
// //   })
// // );

// // // Body Parser Middleware (IMPORTANT!)
// // app.use(express.json());

// // // Routes
// // app.use("/api/auth", authRoutes);
// // app.use("/api/appointments", appointmentRoutes);
// // app.use("/api/meals", mealRoutes);

// // // Start Server
// // const PORT = 5050;
// // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const authRoutes = require("./routes/authRoutes");
// const appointmentRoutes = require("./routes/appointmentRoutes");
// const mealRoutes = require("./routes/mealRoutes");

// const app = express();

// mongoose
//   .connect("mongodb://localhost:27017/cura-pet")
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error("MongoDB error:", err));

// // CORS
// app.use(
//   cors({
//     origin: "http://localhost:5175", // update to match your frontend
//     credentials: true,
//   })
// );

// // **IMPORTANT - Must be before your routes**
// app.use(express.json());

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/appointments", appointmentRoutes);
// app.use("/api/meals", mealRoutes);

// const PORT = 5050;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// index.js
const mongoose = require('mongoose');
const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 5050;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/cura_pet';

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('DB Connection Error:', err);
  });
y