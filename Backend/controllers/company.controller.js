import { Company } from '../models/company.model.js'
import { Job } from '../models/job.model.js'
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import path from 'path';

export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required",
                success: false
            });
        }
        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({
                message: "You can't add same company",
                success: false
            });
        }
        company = await Company.create({
            name: companyName,
            userId: req.id
        });
        return res.status(201).json({
            message: "company registered",
            company,
            success: true
        })
    } catch (error) {
        console.log(error);

    }
};


export const getCompany = async (req, res) => {
    try {
        const userId = req.id; //logged in
        const companies = await Company.find({ userId });

        if (!companies) {
            return res.status(404).json({
                message: "companies not found",
                success: false
            });
        }

        return res.status(200).json({
            companies,
            success:true
        })
    } catch (error) {
        console.log(error);

    }
}


// get company by id

export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "company not found",
                success: false
            });
        }
        return res.status(200).json({
            company,
            success: true
        })
    } catch (error) {
        console.log(error);

    }
}


export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        const file = req.file;

        const updateData = { name, description, website, location };

        if (file) {
            const cloudinaryResponse = await uploadOnCloudinary(file.path);
            if (cloudinaryResponse?.url) {
                updateData.logo = cloudinaryResponse.url;
            } else {
                return res.status(400).json({
                    message: "Failed to upload logo to cloud storage",
                    success: false
                });
            }
        }

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if(!company){
            return res.status(404).json({
                message:"Company not found",
                success:false
            })
        }

        return res.status(200).json({
            message:"company info updated",
            company,
            success:true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

// New controller to get past recruiters (companies who posted jobs)
export const getPastRecruiters = async (req, res) => {
    try {
        // Get distinct company IDs from jobs
        const companyIds = await Job.distinct('company');

        // Fetch company details for these IDs
        const companies = await Company.find({ _id: { $in: companyIds } });

        return res.status(200).json({
            companies,
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};
