import express from 'express';
import {login, register, updateProfile, logout} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload, multipleUpload } from '../middlewares/multer.js';

const router = express.Router();

router.route("/register").post(multipleUpload, register);
router.route("/login").post(login);
router.route("/update-profile").put(isAuthenticated, multipleUpload, updateProfile);
router.route("/logout").get(logout);

export default router;