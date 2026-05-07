import {User} from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
        const file = req.file;

        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: 'User already exists with this email',
                success: false,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Upload profile photo to Cloudinary if provided
        let profilePhoto = "";
        if (file) {
            const cloudinaryResponse = await uploadOnCloudinary(file.path);
            if (cloudinaryResponse) {
                profilePhoto = cloudinaryResponse.url;
            }
        }

        // Create user with profile photo
        const user = await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {
                profilePhoto
            }
        });

        const tokenData = { userId: user._id };
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        const isProduction = process.env.NODE_ENV === 'production' || process.env.FRONTEND_URL?.includes('vercel.app');

        return res.status(201)
            .cookie("token", token, { 
                maxAge: 24 * 60 * 60 * 1000, 
                httpOnly: true, 
                sameSite: isProduction ? "None" : "Lax",
                secure: isProduction ? true : false
            })
            .json({
                message: "Account created successfully",
                success: true,
                user: {
                    _id: user._id,
                    fullname: user.fullname,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    role: user.role,
                    profile: user.profile
                },
                token
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false,
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false,
            });
        }

        // Check if role is correct
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account does not exist with current role",
                success: false
            });
        }

        const tokenData = { userId: user._id };
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

        const isProduction = process.env.NODE_ENV === 'production' || process.env.FRONTEND_URL?.includes('vercel.app');
        
        return res.status(200)
            .cookie("token", token, { 
                maxAge: 24 * 60 * 60 * 1000, 
                httpOnly: true, 
                sameSite: isProduction ? "None" : "Lax",
                secure: isProduction ? true : false
            })
            .json({
                message: `Welcome back, ${user.fullname}`,
                success: true,
                user,
                token // Return token in body for cross-domain local storage fallback
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

export const logout = async (req, res) => {
    try {
        const isProduction = process.env.NODE_ENV === 'production' || process.env.FRONTEND_URL?.includes('vercel.app');

        return res.status(200).cookie("token", "", { 
            maxAge: 0,
            httpOnly: true, 
            sameSite: isProduction ? "None" : "Lax",
            secure: isProduction ? true : false
        }).json({
            message: "Logged out successfully",
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

export const updateProfile = async (req, res) => {
    try {
        if (req.fileValidationError) {
            return res.status(400).json({
                message: req.fileValidationError,
                success: false
            });
        }

        console.log("Files received:", req.files);
        console.log("Body received:", req.body);
        console.log("Request headers:", req.headers);

        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const files = req.files || {};
        console.log("Files object:", files);
        const { profilePhoto, resume } = files;
        console.log("Profile photo:", profilePhoto);
        console.log("Resume file:", resume);

        const userId = req.id;
        console.log("User ID:", userId);
        let user = await User.findById(userId);

        if (!user) {
            console.log("User not found for ID:", userId);
            return res.status(400).json({
                message: "User not found",
                success: false
            });
        }

        // Upload new profile photo to Cloudinary if provided
        if (profilePhoto?.[0]) {
            try {
                console.log("Uploading profile photo to Cloudinary...");
                console.log("Profile photo path:", profilePhoto[0].path);
                const cloudinaryResponse = await uploadOnCloudinary(profilePhoto[0].path);
                console.log("Cloudinary response for profile photo:", cloudinaryResponse);
                
                if (cloudinaryResponse?.url) {
                    user.profile.profilePhoto = cloudinaryResponse.url;
                } else {
                    return res.status(400).json({
                        message: "Failed to upload profile photo to cloud storage",
                        success: false
                    });
                }
            } catch (uploadError) {
                console.error("Profile photo upload error:", uploadError);
                return res.status(400).json({
                    message: "Failed to upload profile photo",
                    success: false
                });
            }
        }

        // Upload resume if provided
        if (resume?.[0]) {
            try {
                console.log("Resume upload attempt - File details:", {
                    filename: resume[0].originalname,
                    mimetype: resume[0].mimetype,
                    size: resume[0].size,
                    path: resume[0].path
                });

                const cloudinaryResponse = await uploadOnCloudinary(resume[0].path);
                console.log("Resume upload successful:", cloudinaryResponse);
                
                if (cloudinaryResponse?.url) {
                    user.profile.resume = cloudinaryResponse.url;
                    user.profile.resumeOriginalName = resume[0].originalname;
                    console.log("Resume URL saved to user profile:", cloudinaryResponse.url);
                } else {
                    console.error("No URL in Cloudinary response");
                    return res.status(400).json({
                        message: "Failed to upload resume - No URL received",
                        success: false
                    });
                }
            } catch (uploadError) {
                console.error("Detailed resume upload error:", {
                    error: uploadError.message,
                    stack: uploadError.stack
                });
                return res.status(400).json({
                    message: "Failed to upload resume: " + uploadError.message,
                    success: false
                });
            }
        }

        // Update user data
        if(fullname) user.fullname = fullname;
        if(email) user.email = email;
        if(phoneNumber) user.phoneNumber = phoneNumber;
        if(skills) user.profile.skills = skills.split(",").map(skill => skill.trim());
        if(bio) user.profile.bio = bio;

        await user.save();

        // Clean up response data
        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

        return res.status(200).json({
            message: "Profile updated successfully",
            user,
            success: true
        });
    } catch (error) {
        console.error("Update profile error:", error);
        res.status(500).json({ 
            message: error.message || "Internal Server Error", 
            success: false 
        });
    }
};

export const getUser = async (req, res) => {
    try {
        const userId = req.id;
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false
            });
        }

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

        return res.status(200).json({
            user,
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
}
