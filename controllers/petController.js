// import Pet from "../models/Pet.js";

// export const getPets = async (req, res) => {
//   const pets = await Pet.find({ user: req.user.id });
//   res.json(pets);
// };

// export const addPet = async (req, res) => {
//   const { name, breed, age } = req.body;
//   const pet = await Pet.create({ user: req.user.id, name, breed, age });
//   res.status(201).json(pet);
// };

// export const updatePet = async (req, res) => {
//   const pet = await Pet.findById(req.params.id);
//   if (!pet) return res.status(404).json({ message: "Not found" });
//   if (pet.user.toString() !== req.user.id) return res.status(401).json({ message: "Unauthorized" });

//   pet.name = req.body.name;
//   pet.breed = req.body.breed;
//   pet.age = req.body.age;
//   await pet.save();
//   res.json(pet);
// };

// export const deletePet = async (req, res) => {
//   const pet = await Pet.findById(req.params.id);
//   if (!pet) return res.status(404).json({ message: "Not found" });
//   if (pet.user.toString() !== req.user.id) return res.status(401).json({ message: "Unauthorized" });

//   await pet.deleteOne();
//   res.json({ message: "Deleted" });
// };

const Pet = require("../models/Pet");

exports.getPets = async (req, res) => {
  const pets = await Pet.find({ user: req.user.id });
  res.json(pets);
};

exports.addPet = async (req, res) => {
  const { name, breed, age } = req.body;
  const pet = await Pet.create({ user: req.user.id, name, breed, age });
  res.status(201).json(pet);
};

exports.updatePet = async (req, res) => {
  const pet = await Pet.findById(req.params.id);
  if (!pet) return res.status(404).json({ message: "Not found" });
  if (pet.user.toString() !== req.user.id) return res.status(401).json({ message: "Unauthorized" });

  pet.name = req.body.name;
  pet.breed = req.body.breed;
  pet.age = req.body.age;
  await pet.save();
  res.json(pet);
};

exports.deletePet = async (req, res) => {
  const pet = await Pet.findById(req.params.id);
  if (!pet) return res.status(404).json({ message: "Not found" });
  if (pet.user.toString() !== req.user.id) return res.status(401).json({ message: "Unauthorized" });

  await pet.deleteOne();
  res.json({ message: "Deleted" });
};
