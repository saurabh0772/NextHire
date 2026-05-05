import { Job } from "../models/job.model.js";
import { User } from "../models/user.model.js";
import { generateFirstQuestion, continueInterview } from "../utils/interviewAI.js";

export const startInterview = async (req, res) => {
    try {
        const { jobId } = req.body;
        
        if (!jobId) {
            return res.status(400).json({ message: "Job ID is required", success: false });
        }

        const job = await Job.findById(jobId).populate("company");
        if (!job) {
            return res.status(404).json({ message: "Job not found", success: false });
        }

        const user = await User.findById(req.id);
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        const jobData = {
            title: job.title,
            description: job.description,
            requirements: job.requirements,
            companyName: job.company?.name || "our company"
        };

        const userProfile = {
            fullname: user.fullname,
            bio: user.profile?.bio || "",
            skills: user.profile?.skills || []
        };

        const firstQuestionText = await generateFirstQuestion(jobData, userProfile);

        return res.status(200).json({
            success: true,
            message: firstQuestionText,
            jobData: {
                title: jobData.title,
                companyName: jobData.companyName
            },
            questionNumber: 1
        });

    } catch (error) {
        console.error("Error in startInterview:", error);
        return res.status(500).json({ message: error.message || "Internal Server Error", success: false });
    }
};

export const sendMessage = async (req, res) => {
    try {
        const { jobId, userAnswer, conversationHistory, questionNumber } = req.body;

        if (!jobId || !userAnswer || !conversationHistory || questionNumber === undefined) {
            return res.status(400).json({ message: "Missing required fields", success: false });
        }

        const job = await Job.findById(jobId).populate("company");
        if (!job) {
            return res.status(404).json({ message: "Job not found", success: false });
        }

        const user = await User.findById(req.id);
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        const jobData = {
            title: job.title,
            description: job.description,
            requirements: job.requirements,
            companyName: job.company?.name || "our company"
        };

        const userProfile = {
            fullname: user.fullname,
            bio: user.profile?.bio || "",
            skills: user.profile?.skills || []
        };

        const responseText = await continueInterview(
            jobData, 
            userProfile, 
            conversationHistory, 
            userAnswer, 
            questionNumber
        );

        let isCompleted = false;
        let score = null;

        if (responseText.includes("SCORE:")) {
            isCompleted = true;
            const scoreMatch = responseText.match(/SCORE:\s*(\d+)\/10/);
            if (scoreMatch) {
                score = parseInt(scoreMatch[1]);
            }
        }

        return res.status(200).json({
            success: true,
            message: responseText,
            questionNumber: questionNumber + 1,
            isCompleted,
            score
        });

    } catch (error) {
        console.error("Error in sendMessage:", error);
        return res.status(500).json({ message: error.message || "Internal Server Error", success: false });
    }
};
