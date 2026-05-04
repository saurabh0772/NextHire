import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';
import { Users } from 'lucide-react';

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
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
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
                {/* Header */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-2">
                        <Users className="h-8 w-8 text-blue-400" />
                        <h1 className="text-3xl font-bold">
                            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                                Job Applicants
                            </span>
                        </h1>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-slate-400">Review and manage applications for this position</p>
                        <div className="px-4 py-2 rounded-lg bg-white/5 backdrop-blur-lg border border-white/10">
                            <span className="text-slate-400">Total Applications: </span>
                            <span className="text-white font-semibold">{applicants?.applications?.length || 0}</span>
                        </div>
                    </div>
                </div>

                {/* Table Section */}
                <div className="rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 p-6">
                    <ApplicantsTable />
                </div>
            </div>
        </div>
    )
}

export default Applicants