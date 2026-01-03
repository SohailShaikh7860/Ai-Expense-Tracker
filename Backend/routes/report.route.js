import express from "express";
import { authToken } from "../middleware/auth.js";
import { generateAllSimpleReports } from "../controllers/AiReportController.js";
import { transport } from "../config/nodeMailer.js";

const router = express.Router();

router.use(authToken);

// Test route - trigger report generation for all users
router.post('/generate-all-simple', generateAllSimpleReports);

export default router;
