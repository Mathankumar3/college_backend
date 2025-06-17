import Interview from "../models/Interview.js";
import { sendEmail } from "../utils/sendEmail.js";

export const scheduleInterview = async (req, res) => {
  const { applicationId, date, time, format } = req.body;
  try {
    const interview = new Interview({
      application: applicationId,
      date,
      time,
      format,
    });
    await interview.save();
    await sendEmail(
      req.user.email,
      "Interview Scheduled",
      `Your interview is scheduled for ${date} at ${time}.`
    );
    res.status(201).json(interview);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find().populate("application");
    res.json(interviews);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateInterview = async (req, res) => {
  const { status, feedback } = req.body;
  try {
    const interview = await Interview.findByIdAndUpdate(
      req.params.id,
      { status, feedback },
      { new: true }
    );
    await sendEmail(
      req.user.email,
      "Interview Updated",
      `Interview status updated to: ${status}`
    );
    res.json(interview);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
