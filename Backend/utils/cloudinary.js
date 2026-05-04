import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '../.env') });

console.log('Environment variables:', {
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET?.slice(0, 5) + '...' // Only show first 5 chars for security
});

// Check if Cloudinary credentials are present
const requiredEnvVars = ['CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
    console.error('Missing required Cloudinary environment variables:', missingEnvVars);
    throw new Error('Cloudinary configuration is incomplete');
}

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            throw new Error('No file path provided');
        }

        if (!fs.existsSync(localFilePath)) {
            throw new Error(`File not found at path: ${localFilePath}`);
        }

        console.log("Attempting to upload file:", localFilePath);
        console.log("File type:", localFilePath.endsWith('.pdf') ? 'PDF' : 'Image');

        // Upload the file on cloudinary
        const options = {
            resource_type: localFilePath.endsWith('.pdf') ? "raw" : "image",
            folder: localFilePath.endsWith('.pdf') ? "resumes" : "profile_photos",
            use_filename: true,
            unique_filename: true
        };
        
        console.log("Upload options:", options);
        const response = await cloudinary.uploader.upload(localFilePath, options);

        // For PDFs, modify the URL to ensure it's accessible
        if (localFilePath.endsWith('.pdf')) {
            // Get the cloud name from environment variables
            const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
            // Extract the public_id from the response, removing any .pdf extension if present
            const publicId = response.public_id.endsWith('.pdf') 
                ? response.public_id 
                : response.public_id + '.pdf';
            // Construct the direct download URL for PDFs
            response.url = `https://res.cloudinary.com/${cloudName}/raw/upload/${publicId}`;
            console.log("Modified PDF URL:", response.url);
        }

        // File has been uploaded successfully
        console.log("File uploaded to Cloudinary successfully!");
        console.log("Upload response:", {
            url: response.url,
            public_id: response.public_id,
            format: response.format,
            resource_type: response.resource_type
        });
        
        // Remove the locally saved temporary file
        fs.unlinkSync(localFilePath);
        console.log("Local file cleaned up:", localFilePath);
        
        return response;
    } catch (error) {
        console.error("Detailed Cloudinary upload error:");
        console.error("Error name:", error.name);
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
        
        // Clean up local file if it exists
        if (localFilePath && fs.existsSync(localFilePath)) {
            try {
                fs.unlinkSync(localFilePath);
                console.log("Cleaned up local file after error:", localFilePath);
            } catch (cleanupError) {
                console.error("Failed to clean up local file:", cleanupError);
            }
        }
        
        throw error; // Re-throw the error to be handled by the caller
    }
}

export { uploadOnCloudinary }; 