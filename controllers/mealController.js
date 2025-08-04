// const Meal = require('../models/Meal');

// // GET all meals
// exports.getMeals = async (req, res) => {
//   try {
//     const meals = await Meal.find();
//     res.json(meals);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // CREATE meal
// exports.createMeal = async (req, res) => {
//   try {
//     const { petName, meal, time } = req.body;
//     const newMeal = new Meal({ petName, meal, time });
//     await newMeal.save();
//     res.status(201).json(newMeal);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // UPDATE meal
// exports.updateMeal = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { petName, meal, time } = req.body;
//     const updatedMeal = await Meal.findByIdAndUpdate(
//       id,
//       { petName, meal, time },
//       { new: true }
//     );
//     res.json(updatedMeal);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // DELETE meal
// exports.deleteMeal = async (req, res) => {
//   try {
//     await Meal.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Meal deleted' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
const Meal = require('../models/Meal');

exports.getMeals = async (req, res) => {
  try {
    const meals = await Meal.find();
    res.json(meals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createMeal = async (req, res) => {
  try {
    const { petName, meal, time } = req.body;
    const newMeal = new Meal({ petName, meal, time });
    await newMeal.save();
    res.status(201).json(newMeal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateMeal = async (req, res) => {
  try {
    const { id } = req.params;
    const { petName, meal, time } = req.body;
    const updatedMeal = await Meal.findByIdAndUpdate(
      id,
      { petName, meal, time },
      { new: true }
    );
    res.json(updatedMeal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteMeal = async (req, res) => {
  try {
    await Meal.findByIdAndDelete(req.params.id);
    res.json({ message: 'Meal deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
