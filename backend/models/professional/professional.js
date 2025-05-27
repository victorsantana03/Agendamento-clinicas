import mongoose from "mongoose";

const professionalSchema = new mongoose.Schema({
  name: String,
  especialty: String,
  clinicId: { type: mongoose.Schema.Types.ObjectId, ref: "Clinic" },
  agenda: Array,
});

export const Professional = mongoose.model("Professional", professionalSchema);
