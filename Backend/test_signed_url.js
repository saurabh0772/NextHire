import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const testSignedUrl = async () => {
    try {
        const publicId = "resumes/1777869556973-Saurabh_Kumar_Resume_rfeelr.pdf";
        const signedUrl = cloudinary.utils.url(publicId, {
            resource_type: "raw",
            sign_url: true
        });
        console.log("Signed URL:", signedUrl);
        
        const res = await fetch(signedUrl);
        console.log("Fetch status:", res.status, res.statusText);
    } catch (e) {
        console.error("Error:", e);
    }
};

testSignedUrl();
