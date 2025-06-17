import mongoose from "mongoose";

const academicRecordSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  gpa: { type: Number, required: true },
  transcript: { type: String },
  achievements: [{ type: String }],
});

export default mongoose.model("AcademicRecord", academicRecordSchema);
