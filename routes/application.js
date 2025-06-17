import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import {
  submitApplication,
  getApplications,
  updateApplicationStatus,
} from "../controllers/applicationController.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", roleMiddleware(["student"]), submitApplication);
router.get(
  "/",
  roleMiddleware(["student", "company", "admin"]),
  getApplications
);
router.put(
  "/:id",
  roleMiddleware(["company", "admin"]),
  updateApplicationStatus
);

export default router;
