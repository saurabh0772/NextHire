import { Job } from "../models/job.model.js";
import { format } from "date-fns";

export const getRecruiterAnalytics = async (req, res) => {
    try {
        const recruiterId = req.id;
        
        const jobs = await Job.find({ created_by: recruiterId })
            .populate('company', 'name')
            .populate({
                path: 'applications',
                populate: {
                    path: 'applicant',
                    select: 'profile.skills fullname'
                }
            });

        if (!jobs || jobs.length === 0) {
            return res.status(200).json({
                success: true,
                analytics: {
                    totalJobs: 0,
                    totalApplications: 0,
                    totalAccepted: 0,
                    totalRejected: 0,
                    totalPending: 0,
                    statusBreakdown: {},
                    applicationsByJob: [],
                    skillsFrequency: [],
                    applicationTrend: [],
                    topPerformingJob: null
                }
            });
        }

        const totalJobs = jobs.length;
        let totalApplications = 0;
        let totalAccepted = 0;
        let totalRejected = 0;
        let totalPending = 0;

        const applicationsByJob = jobs.map(job => {
            const total = job.applications.length;
            totalApplications += total;

            const accepted = job.applications.filter(a => a.status === 'accepted').length;
            const rejected = job.applications.filter(a => a.status === 'rejected').length;
            const pending = job.applications.filter(a => a.status === 'pending').length;

            totalAccepted += accepted;
            totalRejected += rejected;
            totalPending += pending;

            return {
                jobTitle: job.title,
                company: job.company?.name || 'N/A',
                total,
                accepted,
                rejected,
                pending
            };
        }).sort((a, b) => b.total - a.total);

        const statusBreakdown = {
            pending: totalPending,
            accepted: totalAccepted,
            rejected: totalRejected
        };

        // Skills Frequency
        const skillsMap = {};
        const allApplications = [];
        
        jobs.forEach(job => {
            job.applications.forEach(app => {
                allApplications.push(app);
                if (app.applicant?.profile?.skills) {
                    app.applicant.profile.skills.forEach(skill => {
                        const s = skill.trim();
                        const key = s.toLowerCase();
                        if (!skillsMap[key]) {
                            skillsMap[key] = { skill: s, count: 0 };
                        }
                        skillsMap[key].count += 1;
                    });
                }
            });
        });

        const skillsFrequency = Object.values(skillsMap)
            .sort((a, b) => b.count - a.count)
            .slice(0, 10);

        // Application Trend
        const trendMap = {};
        allApplications.forEach(app => {
            if (app.createdAt) {
                const month = format(new Date(app.createdAt), 'MMM yyyy');
                if (!trendMap[month]) {
                    trendMap[month] = { month, count: 0, dateObj: new Date(app.createdAt) };
                }
                trendMap[month].count += 1;
            }
        });

        // Sort chronologically
        const applicationTrend = Object.values(trendMap)
            .sort((a, b) => a.dateObj - b.dateObj)
            .map(item => ({ month: item.month, count: item.count }));

        // Top Performing Job
        let topPerformingJob = null;
        if (jobs.length > 0) {
            const topJob = jobs.reduce((prev, current) => 
                (prev.applications.length > current.applications.length) ? prev : current
            );
            
            if (topJob.applications.length > 0) {
                const total = topJob.applications.length;
                const accepted = topJob.applications.filter(a => a.status === 'accepted').length;
                topPerformingJob = {
                    title: topJob.title,
                    company: topJob.company?.name || 'N/A',
                    totalApplications: total,
                    acceptanceRate: (accepted / total * 100).toFixed(1) + '%'
                };
            }
        }

        return res.status(200).json({
            success: true,
            analytics: {
                totalJobs,
                totalApplications,
                totalAccepted,
                totalRejected,
                totalPending,
                statusBreakdown,
                applicationsByJob,
                skillsFrequency,
                applicationTrend,
                topPerformingJob
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Server error in analytics." });
    }
}
