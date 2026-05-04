import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import Navbar from './shared/Navbar';
import { Briefcase, Building2, IndianRupee, MapPin, Users, Calendar } from 'lucide-react';

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });

            if (res.data.success) {
                setIsApplied(true);
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <Navbar />
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8'>
                <div className='rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 p-6'>
                    <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
                        <div>
                            <h1 className='text-3xl font-bold text-white'>{singleJob?.title}</h1>
                            <div className='flex items-center gap-2 mt-4 flex-wrap'>
                                <Badge className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">
                                    {singleJob?.postion} Positions
                                </Badge>
                                <Badge className="bg-cyan-500/10 text-cyan-500 hover:bg-cyan-500/20">
                                    {singleJob?.jobType}
                                </Badge>
                                <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
                                    {singleJob?.salary} LPA
                                </Badge>
                            </div>
                        </div>
                        <Button
                            onClick={isApplied ? null : applyJobHandler}
                            disabled={isApplied}
                            className={`${isApplied 
                                ? 'bg-slate-600 text-slate-300 cursor-not-allowed hover:bg-slate-600' 
                                : 'bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white'
                            }`}
                        >
                            {isApplied ? 'Already Applied' : 'Apply Now'}
                        </Button>
                    </div>

                    <div className='mt-8 space-y-6'>
                        <div className='border-b border-white/10 pb-4'>
                            <h2 className='text-xl font-semibold text-white mb-4'>Job Details</h2>
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                                <div className='flex items-center gap-2 text-slate-400'>
                                    <Briefcase className='h-5 w-5' />
                                    <span>Role:</span>
                                    <span className='text-white'>{singleJob?.title}</span>
                                </div>
                                <div className='flex items-center gap-2 text-slate-400'>
                                    <MapPin className='h-5 w-5' />
                                    <span>Location:</span>
                                    <span className='text-white'>{singleJob?.location}</span>
                                </div>
                                <div className='flex items-center gap-2 text-slate-400'>
                                    <Building2 className='h-5 w-5' />
                                    <span>Experience:</span>
                                    <span className='text-white'>{singleJob?.experience} years</span>
                                </div>
                                <div className='flex items-center gap-2 text-slate-400'>
                                    <IndianRupee className='h-5 w-5' />
                                    <span>Salary:</span>
                                    <span className='text-white'>{singleJob?.salary} LPA</span>
                                </div>
                                <div className='flex items-center gap-2 text-slate-400'>
                                    <Users className='h-5 w-5' />
                                    <span>Total Applicants:</span>
                                    <span className='text-white'>{singleJob?.applications?.length || 0}</span>
                                </div>
                                <div className='flex items-center gap-2 text-slate-400'>
                                    <Calendar className='h-5 w-5' />
                                    <span>Posted Date:</span>
                                    <span className='text-white'>{singleJob?.createdAt?.split("T")[0]}</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className='text-xl font-semibold text-white mb-4'>Job Description</h2>
                            <p className='text-slate-400 whitespace-pre-wrap'>{singleJob?.description}</p>
                        </div>

                        <div>
                            <h2 className='text-xl font-semibold text-white mb-4'>Requirements</h2>
                            <p className='text-slate-400 whitespace-pre-wrap'>{singleJob?.requirements}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobDescription