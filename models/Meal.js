const mongoose = require('mongoose');

const mealPlanSchema = new mongoose.Schema({
  petName: { type: String, required: true },
  mealTime: { type: String, required: true },
  food: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('MealPlan', mealPlanSchema);
