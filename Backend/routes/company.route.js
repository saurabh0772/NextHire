import express from 'express';
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from '../middlewares/upload.js';
import { getCompanyById, getCompany, registerCompany, updateCompany, getPastRecruiters } from '../controllers/company.controller.js';

const router = express.Router();

router.route("/register").post(isAuthenticated, registerCompany);
router.route("/get").get(isAuthenticated, getCompany);
router.route("/get/:id").get(isAuthenticated, getCompanyById);
router.route("/update/:id").put(isAuthenticated, upload.single("file"), updateCompany);
router.route("/past-recruiters").get(getPastRecruiters);

export default router;
