// const mongoose = require('mongoose');

// const appointmentSchema = new mongoose.Schema({
//   pet: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet' },
//   date: Date,
//   reason: String
// });

// module.exports = mongoose.model('Appointment', appointmentSchema);


const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  petName: { type: String, required: true },
  date: { type: String, required: true },
  reason: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);

