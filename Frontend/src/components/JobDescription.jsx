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
import { Briefcase, Building2, IndianRupee, MapPin, Users, Calendar, Bot, ChevronLeft, DollarSign } from 'lucide-react';
import InterviewChatbot from './shared/InterviewChatbot';
import { useNavigate } from 'react-router-dom';

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);
    const [openChatbot, setOpenChatbot] = useState(false);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
            toast.error(error.response?.data?.message || "Failed to apply");
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
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
            <Navbar />
            
            {/* Header Banner */}
            <div className='bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 pt-24 pb-8'>
                <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <button onClick={() => navigate(-1)} className='flex items-center gap-2 text-slate-500 hover:text-brand-600 mb-6 font-medium text-sm transition-colors'>
                        <ChevronLeft size={16} />
                        Back to jobs
                    </button>
                    
                    <div className='flex flex-col md:flex-row md:items-center justify-between gap-6'>
                        <div className='flex items-center gap-6'>
                            <div className='w-20 h-20 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center p-3 shadow-sm'>
                                {singleJob?.company?.logo ? (
                                    <img 
                                        src={`${singleJob?.company?.logo}?t=${new Date().getTime()}`} 
                                        alt={singleJob?.company?.name} 
                                        className='w-full h-full object-contain'
                                    />
                                ) : (
                                    <Building2 className='w-10 h-10 text-brand-500' />
                                )}
                            </div>
                            <div>
                                <h1 className='text-3xl font-extrabold text-slate-900 dark:text-white leading-tight'>{singleJob?.title}</h1>
                                <p className='text-lg text-slate-600 dark:text-slate-300 font-medium mt-1'>{singleJob?.company?.name}</p>
                                <div className='flex flex-wrap items-center gap-3 mt-3'>
                                    <Badge variant="secondary" className="bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-400 border-none rounded-md px-3 py-1 font-semibold">
                                        {singleJob?.position} Positions
                                    </Badge>
                                    <Badge variant="secondary" className="bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 border-none rounded-md px-3 py-1 font-semibold">
                                        {singleJob?.jobType}
                                    </Badge>
                                    <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-none rounded-md px-3 py-1 font-semibold flex items-center gap-1">
                                        <DollarSign size={14} className="mr-0.5" />
                                        {singleJob?.salary} LPA
                                    </Badge>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-4 md:mt-0">
                            {user?.role === 'student' && (
                                <Button
                                    onClick={() => setOpenChatbot(true)}
                                    variant="outline"
                                    className="border-violet-200 bg-violet-50 text-violet-700 hover:bg-violet-100 hover:text-violet-800 dark:border-violet-800/30 dark:bg-violet-900/20 dark:text-violet-400 dark:hover:bg-violet-900/40 rounded-xl h-12 font-bold transition-all"
                                >
                                    <Bot className="mr-2 h-5 w-5" />
                                    AI Interview Prep
                                </Button>
                            )}
                            <Button
                                onClick={isApplied ? null : applyJobHandler}
                                disabled={isApplied}
                                className={`rounded-xl h-12 px-8 font-bold text-base transition-all ${isApplied 
                                    ? 'bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-400 cursor-not-allowed' 
                                    : 'bg-brand-600 hover:bg-brand-700 text-white shadow-md shadow-brand-500/20 hover:-translate-y-0.5'
                                }`}
                            >
                                {isApplied ? 'Already Applied' : 'Apply Now'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Details */}
            <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8'>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                    
                    {/* Left Column - Details */}
                    <div className='lg:col-span-2 space-y-8'>
                        <div className='bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm'>
                            <h2 className='text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2'>
                                <Briefcase className="text-brand-500" />
                                Job Description
                            </h2>
                            <div className='prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 whitespace-pre-wrap leading-relaxed'>
                                {singleJob?.description}
                            </div>
                        </div>

                        <div className='bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm'>
                            <h2 className='text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2'>
                                <Users className="text-brand-500" />
                                Requirements
                            </h2>
                            <div className='prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 whitespace-pre-wrap leading-relaxed'>
                                {singleJob?.requirements}
                            </div>
                        </div>
                    </div>
                    
                    {/* Right Column - Meta Data */}
                    <div className='space-y-6'>
                        <div className='bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm'>
                            <h3 className='font-bold text-slate-900 dark:text-white mb-6'>Job Overview</h3>
                            <div className='space-y-6'>
                                <div className='flex gap-4'>
                                    <div className='bg-slate-50 dark:bg-slate-800 p-3 rounded-xl text-brand-600 dark:text-brand-400 shrink-0'>
                                        <Calendar className='h-5 w-5' />
                                    </div>
                                    <div>
                                        <p className='text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1'>Date Posted</p>
                                        <p className='font-medium text-slate-900 dark:text-white'>{singleJob?.createdAt?.split("T")[0]}</p>
                                    </div>
                                </div>
                                
                                <div className='flex gap-4'>
                                    <div className='bg-slate-50 dark:bg-slate-800 p-3 rounded-xl text-brand-600 dark:text-brand-400 shrink-0'>
                                        <MapPin className='h-5 w-5' />
                                    </div>
                                    <div>
                                        <p className='text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1'>Location</p>
                                        <p className='font-medium text-slate-900 dark:text-white'>{singleJob?.location}</p>
                                    </div>
                                </div>

                                <div className='flex gap-4'>
                                    <div className='bg-slate-50 dark:bg-slate-800 p-3 rounded-xl text-brand-600 dark:text-brand-400 shrink-0'>
                                        <Building2 className='h-5 w-5' />
                                    </div>
                                    <div>
                                        <p className='text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1'>Experience Required</p>
                                        <p className='font-medium text-slate-900 dark:text-white'>{singleJob?.experience} years</p>
                                    </div>
                                </div>

                                <div className='flex gap-4'>
                                    <div className='bg-slate-50 dark:bg-slate-800 p-3 rounded-xl text-brand-600 dark:text-brand-400 shrink-0'>
                                        <IndianRupee className='h-5 w-5' />
                                    </div>
                                    <div>
                                        <p className='text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1'>Salary Offered</p>
                                        <p className='font-medium text-slate-900 dark:text-white'>{singleJob?.salary} LPA</p>
                                    </div>
                                </div>
                                
                                <div className='flex gap-4'>
                                    <div className='bg-slate-50 dark:bg-slate-800 p-3 rounded-xl text-brand-600 dark:text-brand-400 shrink-0'>
                                        <Users className='h-5 w-5' />
                                    </div>
                                    <div>
                                        <p className='text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1'>Total Applicants</p>
                                        <p className='font-medium text-slate-900 dark:text-white'>{singleJob?.applications?.length || 0}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <InterviewChatbot open={openChatbot} setOpen={setOpenChatbot} job={singleJob} />
        </div>
    )
}

export default JobDescription