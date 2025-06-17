import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import { postJob, getJobs } from "../controllers/jobController.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", roleMiddleware(["company"]), postJob);
router.get("/", roleMiddleware(["student", "company", "admin"]), getJobs);

export default router;
