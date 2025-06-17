import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import {
  getDashboard,
  generateAdminReport,
} from "../controllers/adminController.js";

const router = express.Router();

router.use(authMiddleware);
router.use(roleMiddleware(["admin"]));

router.get("/dashboard", getDashboard);
router.get("/report", generateAdminReport);

export default router;
