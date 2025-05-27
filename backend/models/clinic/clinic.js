import mongoose from "mongoose";

const clinicSchema = new mongoose.Schema({
  name: String,
  adress: String,
  especialty: String,
});

export const Clinic = mongoose.model("Clinic", clinicSchema);
