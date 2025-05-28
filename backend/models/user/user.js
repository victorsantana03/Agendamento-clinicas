import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  cellphone: String,
  birth: Date,
});

export const User = mongoose.model("User", userSchema);
