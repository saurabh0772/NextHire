import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { parseAndUpdateResume } from "../controllers/resumeController.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.route("/parse").post(isAuthenticated, upload.single('resume'), parseAndUpdateResume);

export default router;
