import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import {
  updateCompanyProfile,
  getCompanyProfile,
} from "../controllers/companyController.js";

const router = express.Router();

router.use(authMiddleware);
router.use(roleMiddleware(["company"]));

router.put("/profile", updateCompanyProfile);
router.get("/profile", getCompanyProfile);

export default router;
