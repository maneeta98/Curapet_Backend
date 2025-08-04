// const Appointment = require('../models/Appointment');

// // GET all appointments
// exports.getAppointments = async (req, res) => {
//   try {
//     const appointments = await Appointment.find();
//     res.json(appointments);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // CREATE appointment
// exports.createAppointment = async (req, res) => {
//   try {
//     const { petName, date, reason } = req.body;
//     const newAppointment = new Appointment({ petName, date, reason });
//     await newAppointment.save();
//     res.status(201).json(newAppointment);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // UPDATE appointment
// exports.updateAppointment = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { petName, date, reason } = req.body;
//     const updatedAppointment = await Appointment.findByIdAndUpdate(
//       id,
//       { petName, date, reason },
//       { new: true }
//     );
//     res.json(updatedAppointment);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // DELETE appointment
// exports.deleteAppointment = async (req, res) => {
//   try {
//     await Appointment.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Appointment deleted' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
const Appointment = require('../models/Appointment');

exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createAppointment = async (req, res) => {
  try {
    const { petName, date, reason } = req.body;
    const newAppointment = new Appointment({ petName, date, reason });
    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { petName, date, reason } = req.body;
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      { petName, date, reason },
      { new: true }
    );
    res.json(updatedAppointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAppointment = async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Appointment deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
