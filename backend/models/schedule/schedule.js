import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
  professionalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Professional",
    require: true,
  },
  clinicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Clinic",
    require: true,
  },
  date: { type: String },
  slot: { type: String },
  status: {
    type: String,
    enum: ["pendente", "confirmado", "cancelado"],
    default: "pendente",
  },
});

export const Schedule = mongoose.model("Schedule", scheduleSchema);
