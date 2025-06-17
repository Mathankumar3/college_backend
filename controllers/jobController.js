import Job from "../models/Job.js";

export const postJob = async (req, res) => {
  const { title, description, type } = req.body;
  try {
    const job = new Job({ company: req.user._id, title, description, type });
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("company");
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
