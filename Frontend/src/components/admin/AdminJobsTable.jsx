import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { setAllAdminJobs } from '@/redux/jobSlice'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Briefcase, Users, Eye, Edit2 } from 'lucide-react'

const AdminJobsTable = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);

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
    }, [dispatch])

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'active':
                return 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50';
            case 'closed':
                return 'bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400 border-rose-200 dark:border-rose-800/50';
            case 'draft':
                return 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400 border-amber-200 dark:border-amber-800/50';
            default:
                return 'bg-brand-50 text-brand-600 dark:bg-brand-900/20 dark:text-brand-400 border-brand-200 dark:border-brand-800/50';
        }
    };

    const filterJobs = allAdminJobs?.filter(job => {
        if (!searchJobByText) return true;
        return job.title.toLowerCase().includes(searchJobByText.toLowerCase()) || job.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
    }) || [];

    return (
        <div className="w-full overflow-x-auto">
            <Table>
                <TableHeader className="bg-slate-50 dark:bg-slate-800/50">
                    <TableRow className="border-slate-200 dark:border-slate-800 hover:bg-transparent">
                        <TableHead className="text-slate-600 dark:text-slate-400 font-bold">Title</TableHead>
                        <TableHead className="text-slate-600 dark:text-slate-400 font-bold">Company</TableHead>
                        <TableHead className="text-slate-600 dark:text-slate-400 font-bold">Status</TableHead>
                        <TableHead className="text-slate-600 dark:text-slate-400 font-bold">Applicants</TableHead>
                        <TableHead className="text-slate-600 dark:text-slate-400 font-bold">Posted Date</TableHead>
                        <TableHead className="text-right text-slate-600 dark:text-slate-400 font-bold">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterJobs.length === 0 ? (
                        <TableRow className="border-slate-200 dark:border-slate-800">
                            <TableCell colSpan={6} className="text-center py-16">
                                <div className="flex flex-col items-center justify-center space-y-3">
                                    <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-2">
                                        <Briefcase className="h-8 w-8 text-slate-400 dark:text-slate-500" />
                                    </div>
                                    <p className="text-lg font-bold text-slate-900 dark:text-white">No jobs found</p>
                                    <p className="text-slate-500 font-medium max-w-sm">You haven't posted any jobs yet or none match your search.</p>
                                    <Button 
                                        onClick={() => navigate("/recruiter/jobs/create")}
                                        className="mt-4 bg-brand-50 text-brand-600 hover:bg-brand-100 dark:bg-brand-900/30 dark:text-brand-400 dark:hover:bg-brand-900/50 font-bold rounded-xl"
                                    >
                                        Post your first job
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : (
                        filterJobs.map((job) => (
                            <TableRow key={job._id} className="border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                <TableCell className="font-bold text-slate-900 dark:text-white">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-brand-50 dark:bg-brand-900/20 text-brand-500 flex items-center justify-center shrink-0">
                                            <Briefcase className="h-4 w-4" />
                                        </div>
                                        <span className="line-clamp-1">{job.title}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <span className="font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg line-clamp-1 w-fit">
                                        {job.company?.name || 'Unknown'}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <Badge className={`${getStatusColor(job.status || 'Active')} font-bold uppercase tracking-wider text-[10px] px-3`} variant="outline">
                                        {job.status || 'Active'}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300">
                                        <Users className="h-4 w-4 text-brand-500" />
                                        {job.applications?.length || 0}
                                    </div>
                                </TableCell>
                                <TableCell className="text-slate-500 font-medium text-sm">
                                    {new Date(job.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        onClick={() => navigate(`/recruiter/jobs/${job._id}/applicants`)}
                                        className="bg-brand-50 hover:bg-brand-100 text-brand-600 dark:bg-brand-900/20 dark:hover:bg-brand-900/40 dark:text-brand-400 font-semibold rounded-lg text-xs"
                                    >
                                        <Eye className="h-4 w-4 mr-1.5" />
                                        Applicants
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default AdminJobsTable