// import Job from "../models/Job.js";

// export const postJob = async (req, res) => {
//   const { title, description, type } = req.body;
//   try {
//     const job = new Job({ company: req.user._id, title, description, type });
//     await job.save();
//     res.status(201).json(job);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };

// export const getJobs = async (req, res) => {
//   try {
//     const jobs = await Job.find().populate("company");
//     res.json(jobs);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };

// export const updateJob = async (req, res) => {
//   const { id } = req.params;
//   const { title, description, type } = req.body;
//   try {
//     const job = await Job.findById(id);
//     if (!job) return res.status(404).json({ message: "Job not found" });

//     // Check if the requesting user is the job's company
//     if (job.company.toString() !== req.user._id.toString()) {
//       return res
//         .status(403)
//         .json({ message: "Not authorized to update this job" });
//     }

//     // Update only provided fields
//     if (title) job.title = title;
//     if (description) job.description = description;
//     if (type) job.type = type;

//     await job.save();
//     res.json(job);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };

// export const deleteJob = async (req, res) => {
//   const { id } = req.params;
//   try {
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ message: "Invalid job ID format" });
//     }
//     const job = await Job.findById(id);
//     if (!job) return res.status(404).json({ message: "Job not found" });

//     if (job.company.toString() !== req.user._id.toString()) {
//       return res
//         .status(403)
//         .json({ message: "Not authorized to delete this job" });
//     }

//     await Job.findByIdAndDelete(id); // Replace remove() with findByIdAndDelete
//     res.status(204).send();
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };

import Job from "../models/Job.js";
import mongoose from "mongoose";

export const postJob = async (req, res) => {
  const { title, description, type } = req.body;
  try {
    // Validate required fields
    if (!title || !description || !type) {
      return res
        .status(400)
        .json({ message: "Title, description, and type are required" });
    }
    if (!["full-time", "internship"].includes(type)) {
      return res
        .status(400)
        .json({ message: "Type must be 'full-time' or 'internship'" });
    }

    const job = new Job({ company: req.user._id, title, description, type });
    const savedJob = await job.save();
    res.status(201).json(savedJob);
  } catch (error) {
    console.error("Post job error:", error); // Log the full error
    res.status(500).json({ message: "Server error", error: error.message });
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

export const updateJob = async (req, res) => {
  const { id } = req.params;
  const { title, description, type } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid job ID format" });
    }
    const job = await Job.findById(id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.company.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this job" });
    }

    if (title) job.title = title;
    if (description) job.description = description;
    if (type) job.type = type;

    await job.save();
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid job ID format" });
    }
    const job = await Job.findById(id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.company.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this job" });
    }

    await Job.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    console.error("Delete job error:", error); // Log the full error
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
