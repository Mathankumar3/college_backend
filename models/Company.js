import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  contactEmail: { type: String, required: true },
  contactNumber: { type: String },
  website: { type: String },
});

export default mongoose.model("Company", companySchema);
