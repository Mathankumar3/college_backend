import AcademicRecord from "../models/AcademicRecord.js";

export const updateAcademicRecord = async (req, res) => {
  const { gpa, transcript, achievements } = req.body;
  try {
    const academicRecord = await AcademicRecord.findOneAndUpdate(
      { student: req.user._id },
      { gpa, transcript, achievements },
      { new: true, upsert: true }
    );
    res.json(academicRecord);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getAcademicRecords = async (req, res) => {
  try {
    const academicRecords = await AcademicRecord.find().populate("student");
    res.json(academicRecords);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
