import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import {
  createPlacementDrive,
  getPlacementDrives,
  updatePlacementDrive,
} from "../controllers/placementDriveController.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", roleMiddleware(["admin"]), createPlacementDrive);
router.get(
  "/",
  roleMiddleware(["student", "company", "admin"]),
  getPlacementDrives
);
router.put("/:id", roleMiddleware(["admin"]), updatePlacementDrive);

export default router;
