import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  status: {
    type: String,
    enum: ["submitted", "reviewed", "shortlisted", "rejected", "hired"],
    default: "submitted",
  },
  submittedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Application", applicationSchema);
