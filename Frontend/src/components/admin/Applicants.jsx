import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';
import { Users, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {applicants} = useSelector(store=>store.application);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
                dispatch(setAllApplicants(res.data.job));
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllApplicants();
    }, [params.id, dispatch]);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-12">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28">
                {/* Header */}
                <div className='flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10'>
                    <div className='flex items-center gap-4'>
                        <Button 
                            onClick={() => navigate("/recruiter/jobs")} 
                            variant="outline" 
                            className="h-10 w-10 p-0 rounded-xl border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <div>
                            <div className="flex items-center gap-3">
                                <div className="bg-brand-100 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400 p-2 rounded-xl">
                                    <Users className="h-6 w-6" />
                                </div>
                                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                                    Job Applicants
                                </h1>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 font-medium mt-2">Review and manage applications for this position</p>
                        </div>
                    </div>
                    <div className="px-5 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3">
                        <span className="text-slate-500 dark:text-slate-400 font-medium">Total Applications: </span>
                        <span className="text-brand-600 dark:text-brand-400 font-extrabold text-xl">{applicants?.applications?.length || 0}</span>
                    </div>
                </div>

                {/* Table Section */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm">
                    <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
                        <ApplicantsTable />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Applicants