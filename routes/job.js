import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import {
  postJob,
  getJobs,
  updateJob,
  deleteJob,
} from "../controllers/jobController.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", roleMiddleware(["company"]), postJob);
router.get("/", roleMiddleware(["student", "company", "admin"]), getJobs);

// router.put("/:id", authMiddleware, updateJob); // Add this
// router.delete("/:id", authMiddleware, deleteJob); // Add this

router.put("/:id", roleMiddleware(["company"]), updateJob);
router.delete("/:id", roleMiddleware(["company"]), deleteJob);

export default router;
