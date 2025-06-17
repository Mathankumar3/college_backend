import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import {
  scheduleInterview,
  getInterviews,
  updateInterview,
} from "../controllers/interviewController.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", roleMiddleware(["company", "admin"]), scheduleInterview);
router.get("/", roleMiddleware(["student", "company", "admin"]), getInterviews);
router.put("/:id", roleMiddleware(["company", "admin"]), updateInterview);

export default router;
