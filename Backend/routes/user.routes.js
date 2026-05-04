import express from 'express';
import { register, login, logout, updateProfile } from '../controllers/user.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = express.Router();

// Auth routes
router.post('/register', upload.single('profilePhoto'), register);
router.post('/login', login);
router.get('/logout', logout);

// Profile routes
router.put('/update-profile', isAuthenticated, upload.fields([
    { name: 'profilePhoto', maxCount: 1 },
    { name: 'file', maxCount: 1 }
]), updateProfile);

export default router; 