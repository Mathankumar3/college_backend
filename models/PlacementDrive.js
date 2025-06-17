import mongoose from "mongoose";

const placementDriveSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  companies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Company" }],
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
  status: {
    type: String,
    enum: ["upcoming", "ongoing", "completed"],
    default: "upcoming",
  },
});

export default mongoose.model("PlacementDrive", placementDriveSchema);
