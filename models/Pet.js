import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: String,
  breed: String,
  age: Number,
});

export default mongoose.model("Pet", petSchema);
