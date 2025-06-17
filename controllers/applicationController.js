import Application from "../models/Application.js";
import { sendEmail } from "../utils/sendEmail.js";

export const submitApplication = async (req, res) => {
  const { jobId } = req.body;
  try {
    const application = new Application({ student: req.user._id, job: jobId });
    await application.save();
    await sendEmail(
      req.user.email,
      "Application Submitted",
      "Your application has been submitted successfully."
    );
    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getApplications = async (req, res) => {
  try {
    const applications = await Application.find().populate("student job");
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateApplicationStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    await sendEmail(
      application.student.email,
      "Application Status Updated",
      `Your application status is now: ${status}`
    );
    res.json(application);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
