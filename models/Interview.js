import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema({
  application: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Application",
    required: true,
  },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  format: { type: String, enum: ["in-person", "virtual"], required: true },
  status: {
    type: String,
    enum: ["scheduled", "completed", "cancelled"],
    default: "scheduled",
  },
  feedback: { type: String },
});

export default mongoose.model("Interview", interviewSchema);
