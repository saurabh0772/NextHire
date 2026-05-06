import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getRecruiterAnalytics } from "../controllers/analyticsController.js";

const router = express.Router();

router.route("/recruiter").get(isAuthenticated, getRecruiterAnalytics);

export default router;
