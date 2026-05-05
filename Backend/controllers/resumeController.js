import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { parseResume } from "../utils/resumeParser.js";
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

export const parseAndUpdateResume = async (req, res) => {
    try {
        const file = req.file;

        // 1. Check req.file exists
        if (!file) {
            return res.status(400).json({
                message: "No resume file uploaded",
                success: false
            });
        }

        // 2. Check req.file.mimetype
        if (file.mimetype !== 'application/pdf') {
            return res.status(400).json({
                message: "Only PDF files are supported",
                success: false
            });
        }

        // 3. Check file size <= 5MB
        const MAX_SIZE = 5 * 1024 * 1024;
        if (file.size > MAX_SIZE) {
            return res.status(400).json({
                message: "File size must be less than 5MB",
                success: false
            });
        }

        // 4. Call resumeParser
        const parsedData = await parseResume(file.buffer);

        // 5. Upload the PDF to Cloudinary
        const uploadFromBuffer = (buffer) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: "resumes", resource_type: "raw" },
                    (error, result) => {
                        if (result) {
                            resolve(result);
                        } else {
                            reject(error);
                        }
                    }
                );
                const readableStream = new Readable();
                readableStream.push(buffer);
                readableStream.push(null);
                readableStream.pipe(stream);
            });
        };

        const cloudinaryResponse = await uploadFromBuffer(file.buffer);

        // 6. Find user by req.id
        const userId = req.id;
        let user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        // 7. Update the user document
        if (parsedData.fullname) user.fullname = parsedData.fullname;
        if (parsedData.phoneNumber) {
            // Strip non-numeric characters since User schema expects a Number type
            const numericPhone = parsedData.phoneNumber.replace(/\D/g, '');
            if (numericPhone) {
                user.phoneNumber = Number(numericPhone);
            }
        }
        if (parsedData.bio) user.profile.bio = parsedData.bio;
        if (parsedData.skills && Array.isArray(parsedData.skills) && parsedData.skills.length > 0) {
            user.profile.skills = parsedData.skills;
        }
        
        if (cloudinaryResponse && cloudinaryResponse.secure_url) {
            user.profile.resume = cloudinaryResponse.secure_url;
            user.profile.resumeOriginalName = file.originalname;
        }

        // 8. Save user
        await user.save();

        // Prepare user object without password
        const userWithoutPassword = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

        return res.status(200).json({
            success: true,
            message: "Resume parsed and profile updated successfully",
            parsedData,
            user: userWithoutPassword
        });

    } catch (error) {
        console.error("Error in parseAndUpdateResume:", error);
        return res.status(500).json({
            message: error.message || "Internal Server Error",
            success: false
        });
    }
};
