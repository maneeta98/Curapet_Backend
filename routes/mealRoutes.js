// // const express = require('express');
// // const {
// //   getMeals,
// //   createMeal,
// //   updateMeal,
// //   deleteMeal
// // } = require('../controllers/mealController');

// // const router = express.Router();

// // router.get('/', getMeals);
// // router.post('/', createMeal);
// // router.put('/:id', updateMeal);      // Added update route
// // router.delete('/:id', deleteMeal);

// // module.exports = router;

// router.post("/", async (req, res) => {
//   try {
//     const { petName, mealTime, food } = req.body;
//     if (!petName || !mealTime || !food) {
//       return res.status(400).json({ error: "All fields are required" });
//     }

//     const newMeal = new MealPlan({ petName, mealTime, food });
//     await newMeal.save();
//     res.status(201).json(newMeal);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


const express = require("express");
const router = express.Router();
const MealPlan = require("../models/Meal");

// Create a meal plan
router.post("/", async (req, res) => {
  try {
    const { petName, mealTime, food } = req.body;
    const newMeal = new MealPlan({ petName, mealTime, food });
    await newMeal.save();
    res.status(201).json(newMeal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all meal plans
router.get("/", async (req, res) => {
  try {
    const meals = await MealPlan.find();
    res.json(meals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
