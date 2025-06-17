import Application from "../models/Application.js";
import PlacementDrive from "../models/PlacementDrive.js";

export const generateReport = async () => {
  try {
    const applications = await Application.find().populate("student job");
    const placementDrives = await PlacementDrive.find().populate(
      "companies participants"
    );

    const totalApplications = applications.length;
    const placedStudents = applications.filter(
      (app) => app.status === "hired"
    ).length;
    const successRate = totalApplications
      ? (placedStudents / totalApplications) * 100
      : 0;
    const totalDrives = placementDrives.length;

    return {
      totalApplications,
      placedStudents,
      successRate,
      totalDrives,
      drives: placementDrives.map((drive) => ({
        name: drive.name,
        participants: drive.participants.length,
        companies: drive.companies.length,
        status: drive.status,
      })),
    };
  } catch (error) {
    throw new Error("Error generating report");
  }
};
