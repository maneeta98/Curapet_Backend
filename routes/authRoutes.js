// // const express = require("express");
// // const router = express.Router();
// // const { register, login } = require("../controllers/authController");

// // router.post("/register", register);
// // router.post("/login", login);

// // module.exports = router;

// const express = require("express");
// const { registerUser, loginUser } = require("../controllers/authController");

// const router = express.Router();

// // Use the controller functions
// router.post("/register", registerUser);
// router.post("/login", loginUser);

// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const { register, login } = require("../controllers/authController");

// // Route: /api/auth/register
// router.post("/register", register);

// // Route: /api/auth/login
// router.post("/login", login);

// module.exports = router;

const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");

// Make sure these functions exist and are exported
router.post("/register", register);
router.post("/login", login);

module.exports = router;
