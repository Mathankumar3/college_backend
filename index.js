import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import studentRoutes from "./routes/student.js";
import companyRoutes from "./routes/company.js";
import adminRoutes from "./routes/admin.js";
import applicationRoutes from "./routes/application.js";
import jobRoutes from "./routes/job.js";
import interviewRoutes from "./routes/interview.js";
import placementDriveRoutes from "./routes/placementDrive.js";
import academicRecordRoutes from "./routes/academicRecord.js";
import cors from "cors"; // Add this import

dotenv.config();
const app = express();

// app.use(
//   cors({
//     origin: "http://localhost:5173", // Allow requests from your frontend
//     credentials: true, // If you use cookies or auth headers
//   })
// );
app.use(cors());

app.use(express.json());
connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/interviews", interviewRoutes);
app.use("/api/placement-drives", placementDriveRoutes);
app.use("/api/academic-records", academicRecordRoutes);

const PORT = process.env.PORT || 4009;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
