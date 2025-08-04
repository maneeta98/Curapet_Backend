// // // const bcrypt = require("bcryptjs");
// // // const jwt = require("jsonwebtoken");
// // // const User = require("../models/User");

// // // const JWT_SECRET = "secret123"; // use dotenv in production

// // // // Register
// // // exports.register = async (req, res) => {
// // //   try {
// // //     const { name, mobile, password } = req.body;

// // //     const existingUser = await User.findOne({ mobile });
// // //     if (existingUser) {
// // //       return res.status(400).json({ message: "Mobile already registered" });
// // //     }

// // //     const hashedPassword = await bcrypt.hash(password, 10);

// // //     const user = new User({ name, mobile, password: hashedPassword });
// // //     await user.save();

// // //     res.status(201).json({ message: "Registration successful" });
// // //   } catch (error) {
// // //     console.error("Register error:", error);
// // //     res.status(500).json({ message: "Server error" });
// // //   }
// // // };

// // // // Login
// // // exports.login = async (req, res) => {
// // //   try {
// // //     const { mobile, password } = req.body;

// // //     const user = await User.findOne({ mobile });
// // //     if (!user) return res.status(400).json({ message: "Invalid credentials" });

// // //     const isMatch = await bcrypt.compare(password, user.password);
// // //     if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

// // //     const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });

// // //     res.json({ token, user: { name: user.name, mobile: user.mobile } });
// // //   } catch (error) {
// // //     console.error("Login error:", error);
// // //     res.status(500).json({ message: "Server error" });
// // //   }
// // // };

// // const express = require("express");
// // const bcrypt = require("bcryptjs");
// // const jwt = require("jsonwebtoken");
// // const User = require("../models/User"); // your user model

// // const router = express.Router();

// // // REGISTER
// // router.post("/register", async (req, res) => {
// //   try {
// //     const { name, mobile, password } = req.body;

// //     // Check if user already exists
// //     const existing = await User.findOne({ mobile });
// //     if (existing) {
// //       return res.status(400).json({ message: "Mobile already registered" });
// //     }

// //     // Hash password
// //     const hashedPassword = await bcrypt.hash(password, 10);

// //     const newUser = new User({
// //       name,
// //       mobile,
// //       password: hashedPassword,
// //     });

// //     await newUser.save();
// //     res.status(201).json({ message: "User registered successfully" });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ message: "Server error" });
// //   }
// // });

// // // LOGIN
// // router.post("/login", async (req, res) => {
// //   try {
// //     const { mobile, password } = req.body;

// //     const user = await User.findOne({ mobile });
// //     if (!user) return res.status(400).json({ message: "User not found" });

// //     const isMatch = await bcrypt.compare(password, user.password);
// //     if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

// //     // Create JWT token
// //     const token = jwt.sign({ id: user._id }, "secretkey", { expiresIn: "1h" });

// //     res.json({ token, message: "Login successful" });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ message: "Server error" });
// //   }
// // });

// // module.exports = router;


// const User = require("../models/User");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// exports.register = async (req, res) => {
//   try {
//     const { name, mobile, password } = req.body;

//     // check if user exists
//     const existingUser = await User.findOne({ mobile });
//     if (existingUser) {
//       return res.status(400).json({ message: "Mobile already registered" });
//     }

//     // hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({ name, mobile, password: hashedPassword });
//     await newUser.save();

//     res.status(201).json({
//       message: "User registered successfully",
//       user: { id: newUser._id, name: newUser.name, mobile: newUser.mobile },
//     });
//   } catch (error) {
//     console.error("Register Error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// exports.login = async (req, res) => {
//   try {
//     const { mobile, password } = req.body;
//     const user = await User.findOne({ mobile });
//     if (!user) {
//       return res.status(401).json({ message: "Invalid mobile or password" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid mobile or password" });
//     }

//     const token = jwt.sign(
//       { userId: user._id, mobile: user.mobile },
//       "secret_key",
//       { expiresIn: "1d" }
//     );

//     res.json({
//       message: "Login successful",
//       token,
//       user: { id: user._id, name: user.name, mobile: user.mobile },
//     });
//   } catch (error) {
//     console.error("Login Error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { name, mobile, password } = req.body;

    const existingUser = await User.findOne({ mobile });
    if (existingUser) {
      return res.status(400).json({ message: "Mobile already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, mobile, password: hashedPassword });
    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      user: { id: newUser._id, name: newUser.name, mobile: newUser.mobile },
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { mobile, password } = req.body;
    const user = await User.findOne({ mobile });
    if (!user) {
      return res.status(401).json({ message: "Invalid mobile or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid mobile or password" });
    }

    const token = jwt.sign(
      { userId: user._id, mobile: user.mobile },
      "secret_key",
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, mobile: user.mobile },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

