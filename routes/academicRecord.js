import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import {
  updateAcademicRecord,
  getAcademicRecords,
} from "../controllers/academicRecordController.js";

const router = express.Router();

router.use(authMiddleware);

router.put("/", roleMiddleware(["student", "admin"]), updateAcademicRecord);
router.get("/", roleMiddleware(["student", "admin"]), getAcademicRecords);

export default router;
