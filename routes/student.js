import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import { updateProfile, getProfile } from "../controllers/studentController.js";

const router = express.Router();

router.use(authMiddleware);
router.use(roleMiddleware(["student"]));

router.put("/profile", updateProfile);
router.get("/profile", getProfile);

export default router;
