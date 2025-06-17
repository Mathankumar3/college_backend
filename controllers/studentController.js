import Student from "../models/Student.js";

export const updateProfile = async (req, res) => {
  const { name, rollNumber, branch, resume, coverLetter } = req.body;
  try {
    const student = await Student.findOneAndUpdate(
      { user: req.user._id },
      { name, rollNumber, branch, resume, coverLetter },
      { new: true }
    );
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getProfile = async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.user._id });
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
