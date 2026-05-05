import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { startInterview, sendMessage } from "../controllers/interviewController.js";

const router = express.Router();

router.route("/start").post(isAuthenticated, startInterview);
router.route("/message").post(isAuthenticated, sendMessage);

export default router;
