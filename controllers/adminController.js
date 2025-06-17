import Application from "../models/Application.js";
import { generateReport } from "../utils/generateReport.js";

export const getDashboard = async (req, res) => {
  try {
    const applications = await Application.find().populate("student job");
    const totalApplications = applications.length;
    const placedStudents = applications.filter(
      (app) => app.status === "hired"
    ).length;
    const successRate = totalApplications
      ? (placedStudents / totalApplications) * 100
      : 0;

    res.json({ totalApplications, placedStudents, successRate });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const generateAdminReport = async (req, res) => {
  try {
    const report = await generateReport();
    res.json({ report });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
