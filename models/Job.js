import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, enum: ["full-time", "internship"], required: true },
  postedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Job", jobSchema);
