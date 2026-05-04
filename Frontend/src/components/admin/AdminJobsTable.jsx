import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { setAllAdminJobs } from '@/redux/jobSlice'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Briefcase, Users } from 'lucide-react'

const AdminJobsTable = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { allAdminJobs } = useSelector(store => store.job);

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/admin/jobs`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setAllAdminJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllJobs();
    }, [])

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'active':
                return 'bg-green-500/10 text-green-500 hover:bg-green-500/20';
            case 'closed':
                return 'bg-red-500/10 text-red-500 hover:bg-red-500/20';
            case 'draft':
                return 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20';
            default:
                return 'bg-slate-500/10 text-slate-500 hover:bg-slate-500/20';
        }
    };

    return (
        <Table>
            <TableHeader>
                <TableRow className="border-white/10 hover:bg-white/5">
                    <TableHead className="text-slate-400">Title</TableHead>
                    <TableHead className="text-slate-400">Company</TableHead>
                    <TableHead className="text-slate-400">Status</TableHead>
                    <TableHead className="text-slate-400">Applications</TableHead>
                    <TableHead className="text-slate-400">Posted</TableHead>
                    <TableHead className="text-right text-slate-400">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {!allAdminJobs || allAdminJobs.length === 0 ? (
                    <TableRow className="border-white/10">
                        <TableCell colSpan={6} className="text-center text-slate-400 py-10">
                            <div className="flex flex-col items-center gap-2">
                                <Briefcase className="h-8 w-8 text-slate-500" />
                                <p>No jobs found</p>
                                <Button 
                                    onClick={() => navigate("/recruiter/jobs/create")}
                                    variant="link" 
                                    className="text-blue-400 hover:text-blue-300"
                                >
                                    Post your first job
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                ) : (
                    allAdminJobs.map((job) => (
                        <TableRow key={job._id} className="border-white/10 hover:bg-white/5">
                            <TableCell className="font-medium">
                                <div className="flex items-center gap-2">
                                    <Briefcase className="h-4 w-4 text-slate-400" />
                                    <span className="text-white">{job.title}</span>
                                </div>
                            </TableCell>
                            <TableCell className="text-slate-400">{job.company?.name}</TableCell>
                            <TableCell>
                                <Badge className={getStatusColor(job.status)} variant="outline">
                                    {job.status}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-1.5 text-slate-400">
                                    <Users className="h-4 w-4" />
                                    <span>{job.applications?.length || 0}</span>
                                </div>
                            </TableCell>
                            <TableCell className="text-slate-400">
                                {new Date(job.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="text-right">
                                <Button
                                    variant="ghost"
                                    onClick={() => navigate(`/recruiter/jobs/${job._id}/applicants`)}
                                    className="text-slate-400 hover:text-white hover:bg-white/5"
                                >
                                    View Applications
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    )
}

export default AdminJobsTable