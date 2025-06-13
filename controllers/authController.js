const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// exports.register = async (req, res) => {
//   try {
//     const { name, mobile, password } = req.body;

//     const existingUser = await User.findOne({ mobile });
//     if (existingUser) return res.status(400).json({ message: 'Mobile already registered' });

//     const hashed = await bcrypt.hash(password, 10);

//     const newUser = new User({ name, mobile, password: hashed });
//     await newUser.save();

//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.login = async (req, res) => {
//   try {
//     const { mobile, password } = req.body;

//     const user = await User.findOne({ mobile });
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     const match = await bcrypt.compare(password, user.password);
//     if (!match) return res.status(401).json({ message: 'Incorrect password' });

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });

//     res.json({
//       token,
//       user: { id: user._id, name: user.name, mobile: user.mobile }
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
